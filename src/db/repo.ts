import { FREE_PREFIX, INGREDIENT_BY_ID } from '../data/ingredients';
import { key } from '../logic/text';
import type { Recipe } from '../data/types';
import { daysLeft, todayISO } from '../logic/expiry';
import { db } from './database';

// ---------- Notification de changement (les hooks se ré-exécutent) ----------
type Listener = () => void;
const listeners = new Set<Listener>();
let version = 0;
export function subscribe(l: Listener) {
  listeners.add(l);
  return () => listeners.delete(l);
}
export function getVersion() {
  return version;
}
export function emitChange() {
  version++;
  listeners.forEach((l) => l());
}

const nowIso = () => new Date().toISOString();

// ---------- Frigo ----------
export interface FridgeItem {
  id: number;
  ingredient_id: string | null;
  custom_name: string | null;
  expires_at: string | null;
  added_at: string;
}

export function listFridge(): FridgeItem[] {
  // produits avec date d'abord (les plus proches), puis sans date par ordre d'ajout
  return db().getAllSync<FridgeItem>(
    `SELECT * FROM fridge_items ORDER BY expires_at IS NULL, expires_at ASC, added_at DESC`,
  );
}

export function findFridgeDuplicate(ingredientId: string | null, customName: string | null): FridgeItem | null {
  if (ingredientId) return db().getFirstSync<FridgeItem>('SELECT * FROM fridge_items WHERE ingredient_id = ?', ingredientId);
  if (customName)
    return db().getFirstSync<FridgeItem>('SELECT * FROM fridge_items WHERE lower(custom_name) = lower(?)', customName);
  return null;
}

export function addFridgeItem(p: { ingredientId?: string | null; customName?: string | null; expiresAt?: string | null }): number {
  const res = db().runSync(
    'INSERT INTO fridge_items (ingredient_id, custom_name, expires_at, added_at) VALUES (?, ?, ?, ?)',
    p.ingredientId ?? null,
    p.customName?.trim() || null,
    p.expiresAt ?? null,
    nowIso(),
  );
  emitChange();
  return Number(res.lastInsertRowId);
}

/** Fusion d'un doublon : on garde la date la plus proche */
export function mergeFridgeItem(existing: FridgeItem, expiresAt: string | null) {
  const next =
    existing.expires_at && expiresAt ? (existing.expires_at < expiresAt ? existing.expires_at : expiresAt) : existing.expires_at ?? expiresAt;
  db().runSync('UPDATE fridge_items SET expires_at = ? WHERE id = ?', next, existing.id);
  emitChange();
}

export function addManyToFridge(ingredientIds: string[]) {
  const d = db();
  d.withTransactionSync(() => {
    for (const id of ingredientIds) {
      const exists = d.getFirstSync('SELECT id FROM fridge_items WHERE ingredient_id = ?', id);
      if (!exists) d.runSync('INSERT INTO fridge_items (ingredient_id, added_at) VALUES (?, ?)', id, nowIso());
    }
  });
  emitChange();
}

export function updateFridgeExpiry(id: number, expiresAt: string | null) {
  db().runSync('UPDATE fridge_items SET expires_at = ? WHERE id = ?', expiresAt, id);
  emitChange();
}

export function deleteFridgeItem(id: number): FridgeItem | null {
  const item = db().getFirstSync<FridgeItem>('SELECT * FROM fridge_items WHERE id = ?', id);
  db().runSync('DELETE FROM fridge_items WHERE id = ?', id);
  emitChange();
  return item;
}

export function restoreFridgeItem(item: FridgeItem) {
  db().runSync(
    'INSERT INTO fridge_items (id, ingredient_id, custom_name, expires_at, added_at) VALUES (?, ?, ?, ?, ?)',
    item.id,
    item.ingredient_id,
    item.custom_name,
    item.expires_at,
    item.added_at,
  );
  emitChange();
}

/** « Utilisé » ou « Jeté » : retire du frigo et journalise (pour les stats anti-gaspi). */
export function resolveFridgeItem(id: number, outcome: 'used' | 'wasted') {
  const d = db();
  const item = d.getFirstSync<FridgeItem>('SELECT * FROM fridge_items WHERE id = ?', id);
  if (!item) return;
  let finalOutcome: 'saved' | 'used' | 'wasted' = outcome;
  // un produit utilisé alors qu'il périmait dans ≤ 3 jours (ou déjà un peu dépassé) compte comme « sauvé »
  if (outcome === 'used' && item.expires_at && daysLeft(item.expires_at) <= 3) finalOutcome = 'saved';
  d.withTransactionSync(() => {
    d.runSync('DELETE FROM fridge_items WHERE id = ?', id);
    d.runSync(
      'INSERT INTO waste_log (ingredient_id, custom_name, outcome, at) VALUES (?, ?, ?, ?)',
      item.ingredient_id,
      item.custom_name,
      finalOutcome,
      nowIso(),
    );
  });
  emitChange();
}

/** Bouton « J'ai utilisé » après une recette : retire du frigo les ingrédients de la recette présents */
export function consumeRecipeIngredients(recipe: Recipe, ingredientIds: string[]) {
  const set = new Set(ingredientIds);
  // ingrédients connus + ingrédients libres (« free:… ») des recettes perso
  const items = listFridge().filter(
    (i) => (i.ingredient_id && set.has(i.ingredient_id)) || (!i.ingredient_id && i.custom_name && set.has(FREE_PREFIX + key(i.custom_name))),
  );
  items.forEach((i) => resolveFridgeItem(i.id, 'used'));
  return items.length;
}

// ---------- Courses ----------
export interface ShoppingItem {
  id: number;
  ingredient_id: string | null;
  custom_name: string | null;
  checked: number;
  recipe_id: string | null;
  added_at: string;
}

export function listShopping(): ShoppingItem[] {
  return db().getAllSync<ShoppingItem>('SELECT * FROM shopping_items ORDER BY checked ASC, added_at DESC');
}

export function addShopping(items: { ingredientId?: string | null; customName?: string | null; recipeId?: string | null }[]) {
  const d = db();
  let added = 0;
  d.withTransactionSync(() => {
    for (const it of items) {
      const dup = it.ingredientId
        ? d.getFirstSync('SELECT id FROM shopping_items WHERE ingredient_id = ? AND checked = 0', it.ingredientId)
        : d.getFirstSync('SELECT id FROM shopping_items WHERE lower(custom_name) = lower(?) AND checked = 0', it.customName ?? '');
      if (dup) continue;
      d.runSync(
        'INSERT INTO shopping_items (ingredient_id, custom_name, recipe_id, added_at) VALUES (?, ?, ?, ?)',
        it.ingredientId ?? null,
        it.customName?.trim() || null,
        it.recipeId ?? null,
        nowIso(),
      );
      added++;
    }
  });
  emitChange();
  return added;
}

export function toggleShopping(id: number) {
  db().runSync('UPDATE shopping_items SET checked = 1 - checked WHERE id = ?', id);
  emitChange();
}

export function deleteShopping(id: number): ShoppingItem | null {
  const it = db().getFirstSync<ShoppingItem>('SELECT * FROM shopping_items WHERE id = ?', id);
  db().runSync('DELETE FROM shopping_items WHERE id = ?', id);
  emitChange();
  return it;
}

export function restoreShopping(it: ShoppingItem) {
  db().runSync(
    'INSERT INTO shopping_items (id, ingredient_id, custom_name, checked, recipe_id, added_at) VALUES (?, ?, ?, ?, ?, ?)',
    it.id,
    it.ingredient_id,
    it.custom_name,
    it.checked,
    it.recipe_id,
    it.added_at,
  );
  emitChange();
}

/** Fin des courses : les articles cochés partent dans le frigo */
export function moveCheckedShoppingToFridge(): number {
  const d = db();
  const checked = d.getAllSync<ShoppingItem>('SELECT * FROM shopping_items WHERE checked = 1');
  d.withTransactionSync(() => {
    for (const it of checked) {
      const dup = it.ingredient_id ? d.getFirstSync('SELECT id FROM fridge_items WHERE ingredient_id = ?', it.ingredient_id) : null;
      if (!dup)
        d.runSync(
          'INSERT INTO fridge_items (ingredient_id, custom_name, added_at) VALUES (?, ?, ?)',
          it.ingredient_id,
          it.custom_name,
          nowIso(),
        );
    }
    d.runSync('DELETE FROM shopping_items WHERE checked = 1');
  });
  emitChange();
  return checked.length;
}

export function clearCheckedShopping() {
  db().runSync('DELETE FROM shopping_items WHERE checked = 1');
  emitChange();
}

// ---------- Favoris ----------
export function listFavorites(): string[] {
  return db()
    .getAllSync<{ recipe_id: string }>('SELECT recipe_id FROM favorites ORDER BY added_at DESC')
    .map((r) => r.recipe_id);
}
export function toggleFavorite(recipeId: string): boolean {
  const d = db();
  const exists = d.getFirstSync('SELECT recipe_id FROM favorites WHERE recipe_id = ?', recipeId);
  if (exists) d.runSync('DELETE FROM favorites WHERE recipe_id = ?', recipeId);
  else d.runSync('INSERT INTO favorites (recipe_id, added_at) VALUES (?, ?)', recipeId, nowIso());
  emitChange();
  return !exists;
}

// ---------- Historique ----------
export interface HistoryRow {
  id: number;
  recipe_id: string;
  servings: number;
  cooked_at: string;
}
export function listHistory(limit = 500): HistoryRow[] {
  return db().getAllSync<HistoryRow>('SELECT * FROM history ORDER BY cooked_at DESC LIMIT ?', limit);
}
export function addHistory(recipeId: string, servings: number) {
  db().runSync('INSERT INTO history (recipe_id, servings, cooked_at) VALUES (?, ?, ?)', recipeId, servings, nowIso());
  emitChange();
}
/** recipeId -> jours depuis la dernière cuisson (pour éviter de reproposer trop souvent) */
export function recentlyCookedMap(): Map<string, number> {
  const rows = db().getAllSync<{ recipe_id: string; last: string }>(
    'SELECT recipe_id, MAX(cooked_at) AS last FROM history GROUP BY recipe_id',
  );
  const now = Date.now();
  return new Map(rows.map((r) => [r.recipe_id, Math.floor((now - new Date(r.last).getTime()) / 86_400_000)]));
}

// ---------- Notes ----------
export function getNote(recipeId: string): string {
  return db().getFirstSync<{ text: string }>('SELECT text FROM notes WHERE recipe_id = ?', recipeId)?.text ?? '';
}
export function setNote(recipeId: string, text: string) {
  const t = text.trim();
  if (!t) db().runSync('DELETE FROM notes WHERE recipe_id = ?', recipeId);
  else
    db().runSync(
      'INSERT INTO notes (recipe_id, text, updated_at) VALUES (?, ?, ?) ON CONFLICT(recipe_id) DO UPDATE SET text = excluded.text, updated_at = excluded.updated_at',
      recipeId,
      t,
      nowIso(),
    );
  emitChange();
}

// ---------- Recettes perso ----------
export function listUserRecipes(): Recipe[] {
  return db()
    .getAllSync<{ json: string }>('SELECT json FROM user_recipes ORDER BY created_at DESC')
    .map((r) => JSON.parse(r.json) as Recipe);
}
export function saveUserRecipe(recipe: Recipe) {
  db().runSync(
    'INSERT INTO user_recipes (id, json, created_at) VALUES (?, ?, ?) ON CONFLICT(id) DO UPDATE SET json = excluded.json',
    recipe.id,
    JSON.stringify({ ...recipe, custom: true }),
    nowIso(),
  );
  emitChange();
}
export function deleteUserRecipe(id: string) {
  const d = db();
  d.withTransactionSync(() => {
    d.runSync('DELETE FROM user_recipes WHERE id = ?', id);
    d.runSync('DELETE FROM favorites WHERE recipe_id = ?', id);
    d.runSync('DELETE FROM notes WHERE recipe_id = ?', id);
    d.runSync('DELETE FROM meal_plan WHERE recipe_id = ?', id);
  });
  emitChange();
}

// ---------- Planning (Premium) ----------
export interface MealPlanRow {
  date: string;
  slot: 'lunch' | 'dinner';
  recipe_id: string;
}
export function listMealPlan(from: string, to: string): MealPlanRow[] {
  return db().getAllSync<MealPlanRow>('SELECT * FROM meal_plan WHERE date >= ? AND date <= ? ORDER BY date, slot', from, to);
}
export function setMealPlan(date: string, slot: 'lunch' | 'dinner', recipeId: string | null) {
  if (!recipeId) db().runSync('DELETE FROM meal_plan WHERE date = ? AND slot = ?', date, slot);
  else
    db().runSync(
      'INSERT INTO meal_plan (date, slot, recipe_id) VALUES (?, ?, ?) ON CONFLICT(date, slot) DO UPDATE SET recipe_id = excluded.recipe_id',
      date,
      slot,
      recipeId,
    );
  emitChange();
}

// ---------- Stats & badges ----------
export interface WasteCounts {
  saved: number;
  used: number;
  wasted: number;
}
export function wasteCounts(sinceIso?: string): WasteCounts {
  const rows = db().getAllSync<{ outcome: string; n: number }>(
    `SELECT outcome, COUNT(*) AS n FROM waste_log ${sinceIso ? 'WHERE at >= ?' : ''} GROUP BY outcome`,
    ...(sinceIso ? [sinceIso] : []),
  );
  const out: WasteCounts = { saved: 0, used: 0, wasted: 0 };
  rows.forEach((r) => ((out as unknown as Record<string, number>)[r.outcome] = r.n));
  return out;
}
export function cookedCount(sinceIso?: string): number {
  return (
    db().getFirstSync<{ n: number }>(
      `SELECT COUNT(*) AS n FROM history ${sinceIso ? 'WHERE cooked_at >= ?' : ''}`,
      ...(sinceIso ? [sinceIso] : []),
    )?.n ?? 0
  );
}
export function distinctCookedCount(): number {
  return db().getFirstSync<{ n: number }>('SELECT COUNT(DISTINCT recipe_id) AS n FROM history')?.n ?? 0;
}
export function monthlySeries(months = 6): { month: string; cooked: number; saved: number; wasted: number }[] {
  const out: { month: string; cooked: number; saved: number; wasted: number }[] = [];
  const now = new Date();
  for (let k = months - 1; k >= 0; k--) {
    const start = new Date(now.getFullYear(), now.getMonth() - k, 1);
    const end = new Date(now.getFullYear(), now.getMonth() - k + 1, 1);
    const a = start.toISOString();
    const b = end.toISOString();
    const cooked = db().getFirstSync<{ n: number }>('SELECT COUNT(*) AS n FROM history WHERE cooked_at >= ? AND cooked_at < ?', a, b)?.n ?? 0;
    const w = db().getAllSync<{ outcome: string; n: number }>(
      'SELECT outcome, COUNT(*) AS n FROM waste_log WHERE at >= ? AND at < ? GROUP BY outcome',
      a,
      b,
    );
    out.push({
      month: `${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`,
      cooked,
      saved: w.find((x) => x.outcome === 'saved')?.n ?? 0,
      wasted: w.find((x) => x.outcome === 'wasted')?.n ?? 0,
    });
  }
  return out;
}
export function topWasted(limit = 5): { name: string; n: number }[] {
  return db()
    .getAllSync<{ ingredient_id: string | null; custom_name: string | null; n: number }>(
      `SELECT ingredient_id, custom_name, COUNT(*) AS n FROM waste_log WHERE outcome = 'wasted'
       GROUP BY COALESCE(ingredient_id, custom_name) ORDER BY n DESC LIMIT ?`,
      limit,
    )
    .map((r) => ({ name: r.ingredient_id ?? r.custom_name ?? '?', n: r.n }));
}
export function unlockedBadges(): Map<string, string> {
  return new Map(
    db()
      .getAllSync<{ id: string; unlocked_at: string }>('SELECT * FROM badges')
      .map((b) => [b.id, b.unlocked_at]),
  );
}
export function unlockBadge(id: string) {
  db().runSync('INSERT OR IGNORE INTO badges (id, unlocked_at) VALUES (?, ?)', id, nowIso());
}

export function ingredientName(id: string | null, custom: string | null, lang: 'fr' | 'en'): string {
  if (id && INGREDIENT_BY_ID[id]) return INGREDIENT_BY_ID[id].name[lang];
  return custom ?? '?';
}

export { todayISO };
