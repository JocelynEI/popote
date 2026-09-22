import { INGREDIENTS } from '../data/ingredients';
import type { Ingredient, Lang } from '../data/types';
import { key, levenshtein } from './text';

interface Entry {
  ing: Ingredient;
  keys: string[];
}

const INDEX: Entry[] = INGREDIENTS.filter((x) => x.id !== 'water').map((ing) => ({
  ing,
  keys: Array.from(new Set([ing.name.fr, ing.name.en, ...ing.syn].map(key))),
}));

export interface SearchHit {
  ing: Ingredient;
  score: number;
}

/**
 * Autocomplétion : 0 = égalité exacte, 1 = préfixe du nom, 2 = préfixe d'un mot, 3 = contient.
 * Les ingrédients déjà sélectionnés sont exclus.
 */
export function searchIngredients(query: string, exclude: Set<string> = new Set(), limit = 8): SearchHit[] {
  const q = key(query);
  if (!q) return [];
  const hits: SearchHit[] = [];
  for (const e of INDEX) {
    if (exclude.has(e.ing.id)) continue;
    let best = Infinity;
    for (const k of e.keys) {
      if (k === q) best = Math.min(best, 0);
      else if (k.startsWith(q)) best = Math.min(best, 1);
      else if (k.split(' ').some((w) => w.startsWith(q))) best = Math.min(best, 2);
      else if (q.length >= 3 && k.includes(q)) best = Math.min(best, 3);
    }
    if (best < Infinity) hits.push({ ing: e.ing, score: best });
  }
  return hits.sort((a, b) => a.score - b.score || a.ing.name.fr.localeCompare(b.ing.name.fr)).slice(0, limit);
}

/** Suggestion « Vouliez-vous dire… ? » quand aucune correspondance */
export function didYouMean(query: string): Ingredient | null {
  const q = key(query);
  if (q.length < 3) return null;
  let best: { ing: Ingredient; d: number } | null = null;
  const max = q.length <= 5 ? 1 : 2;
  for (const e of INDEX) {
    for (const k of e.keys) {
      const d = levenshtein(q, k, max);
      if (d <= max && (!best || d < best.d)) best = { ing: e.ing, d };
    }
  }
  return best?.ing ?? null;
}

export function ingredientLabel(ing: Ingredient, lang: Lang): string {
  return ing.name[lang];
}

/** Mots vides retirés d'une saisie libre (« 2 œufs, un demi brocoli, du cheddar ») */
const STOP = new Set(
  'un une des du de la le les l d au aux et avec quelques peu reste restes demi moitie gros grosse petit petite petits petites bout morceau morceaux tranche tranches boite boites pot pots paquet sachet g kg ml cl l gr c cs cc a an some of and with half the pack can tin'
    .split(' '),
);

/**
 * Transforme une phrase en liste d'ingrédients connus.
 * Découpe sur , ; / + « et » « and », retire quantités et mots vides, puis cherche le meilleur ingrédient.
 * Renvoie les ingrédients reconnus et les morceaux non reconnus (pour « Vouliez-vous dire »).
 */
export function parseIngredientText(text: string): { found: Ingredient[]; unknown: string[] } {
  const parts = text
    .split(/[,;/+\n]|\bet\b|\band\b|\bpuis\b/i)
    .map((p) => p.trim())
    .filter(Boolean);
  const found: Ingredient[] = [];
  const unknown: string[] = [];
  const seen = new Set<string>();
  for (const part of parts) {
    const words = key(part.replace(/[0-9]+([.,][0-9]+)?/g, ' '))
      .split(' ')
      .filter((w) => w && !STOP.has(w));
    if (!words.length) continue;
    const q = words.join(' ');
    // essai sur l'expression entière, puis mot par mot (« brocoli cru » -> brocoli)
    let hit = searchIngredients(q, seen, 1)[0];
    if (!hit || hit.score > 2) {
      for (const w of words) {
        const h = searchIngredients(w, seen, 1)[0];
        if (h && h.score <= 2 && w.length >= 3) {
          hit = h;
          break;
        }
      }
    }
    const ing = hit && hit.score <= 2 ? hit.ing : didYouMean(q);
    if (ing && !seen.has(ing.id)) {
      seen.add(ing.id);
      found.push(ing);
    } else if (!ing) unknown.push(part);
  }
  return { found, unknown };
}
