import { PANTRY_IDS } from '../data/ingredients';
import { SUBSTITUTIONS, type Substitution } from '../data/substitutions';
import type { Course, Diet, Recipe } from '../data/types';
import { recipeFitsProfile, type Allergen } from './diets';

export interface MatchFilters {
  maxTime?: 15 | 30 | 60 | null;
  difficulty?: 1 | 2 | null;
  course?: Course | null;
  diets: Diet[];
  allergies: Allergen[];
}

export interface Substituted {
  missing: string;
  sub: Substitution;
}

export interface RecipeMatch {
  recipe: Recipe;
  /** ingrédients obligatoires manquants (hors placard, hors substitution possible) */
  missing: string[];
  /** manquants mais remplaçables avec ce qu'on a */
  substituted: Substituted[];
  /** ingrédients de l'utilisateur utilisés (obligatoires + optionnels, hors placard) */
  used: string[];
  /** produits bientôt périmés utilisés */
  usedUrgent: string[];
  /** disponibles / nécessaires (hors placard) */
  ratio: number;
}

export const MAX_MISSING = 2;

function isAvailable(id: string, available: Set<string>): boolean {
  return PANTRY_IDS.has(id) || available.has(id);
}

export function findSubstitution(id: string, available: Set<string>): Substitution | null {
  for (const sub of SUBSTITUTIONS[id] ?? []) {
    if (sub.with.every((w) => isAvailable(w, available))) return sub;
  }
  return null;
}

/** Évalue une recette par rapport aux ingrédients disponibles. */
export function evaluateRecipe(recipe: Recipe, available: Set<string>, urgent: Set<string> = new Set()): RecipeMatch {
  const missing: string[] = [];
  const substituted: Substituted[] = [];
  const used: string[] = [];
  let needed = 0;
  let have = 0;
  for (const ri of recipe.ingredients) {
    if (PANTRY_IDS.has(ri.id)) continue;
    if (available.has(ri.id)) used.push(ri.id);
    if (ri.optional) continue;
    needed++;
    if (available.has(ri.id)) {
      have++;
    } else {
      const sub = findSubstitution(ri.id, available);
      if (sub) {
        substituted.push({ missing: ri.id, sub });
        have += 0.8; // une substitution vaut un peu moins qu'un ingrédient exact
      } else missing.push(ri.id);
    }
  }
  return {
    recipe,
    missing,
    substituted,
    used,
    usedUrgent: used.filter((id) => urgent.has(id)),
    ratio: needed === 0 ? 1 : have / needed,
  };
}

function passesFilters(recipe: Recipe, f: MatchFilters): boolean {
  if (f.maxTime && recipe.time > f.maxTime) return false;
  if (f.difficulty && recipe.difficulty > f.difficulty) return false;
  if (f.course && recipe.course !== f.course) return false;
  return recipeFitsProfile(recipe, f.diets, f.allergies);
}

/** La recette utilise-t-elle suffisamment ce que l'utilisateur a vraiment ? (évite « salade de fruits » avec juste un citron) */
function isRelevant(m: RecipeMatch): boolean {
  const nonPantry = m.recipe.ingredients.filter((i) => !PANTRY_IDS.has(i.id));
  const requiredNonPantry = nonPantry.filter((i) => !i.optional).length;
  if (m.used.length === 0) return false;
  if (requiredNonPantry <= 1 && nonPantry.length > 1) return m.used.length >= 2;
  return true;
}

export interface MatchOptions {
  urgent?: Set<string>;
  /** recipeId -> nombre de jours depuis la dernière fois qu'elle a été cuisinée */
  recentlyCooked?: Map<string, number>;
  maxMissing?: number;
}

/**
 * Moteur de recherche principal.
 * Tri : moins de manquants > plus de produits urgents utilisés > meilleur ratio > pas cuisinée récemment > plus rapide.
 */
export function matchRecipes(
  recipes: Recipe[],
  available: Set<string>,
  filters: MatchFilters,
  opts: MatchOptions = {},
): RecipeMatch[] {
  const urgent = opts.urgent ?? new Set<string>();
  const recent = opts.recentlyCooked ?? new Map<string, number>();
  const maxMissing = opts.maxMissing ?? MAX_MISSING;
  const out: RecipeMatch[] = [];
  for (const r of recipes) {
    if (!passesFilters(r, filters)) continue;
    const m = evaluateRecipe(r, available, urgent);
    if (m.missing.length > maxMissing) continue;
    if (!isRelevant(m)) continue;
    out.push(m);
  }
  const recentPenalty = (id: string) => {
    const d = recent.get(id);
    return d !== undefined && d < 4 ? 1 : 0;
  };
  return out.sort(
    (a, b) =>
      a.missing.length - b.missing.length ||
      b.usedUrgent.length - a.usedUrgent.length ||
      recentPenalty(a.recipe.id) - recentPenalty(b.recipe.id) ||
      b.ratio - a.ratio ||
      b.used.length - a.used.length ||
      a.recipe.time - b.recipe.time,
  );
}

/**
 * « Ajoute des œufs → 14 recettes » : l'ingrédient qui compléterait le plus de recettes
 * auxquelles il ne manque qu'un seul ingrédient.
 */
export function bestUnlock(matches: RecipeMatch[]): { id: string; count: number } | null {
  const counts = new Map<string, number>();
  for (const m of matches) {
    if (m.missing.length === 1) counts.set(m.missing[0], (counts.get(m.missing[0]) ?? 0) + 1);
  }
  let best: { id: string; count: number } | null = null;
  for (const [id, count] of counts) if (!best || count > best.count) best = { id, count };
  return best;
}

/** Recettes « placard » faisables avec presque rien (état vide du premier lancement). */
export const PANTRY_RECIPE_IDS = ['pasta_garlic', 'omelette', 'fried_rice'];
