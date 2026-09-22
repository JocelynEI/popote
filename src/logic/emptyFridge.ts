import type { Recipe } from '../data/types';
import { evaluateRecipe, type MatchFilters, matchRecipes, type RecipeMatch } from './matching';

export interface EmptyFridgePlan {
  picks: RecipeMatch[];
  /** produits bientôt périmés couverts par le plan */
  coveredUrgent: string[];
  /** tous les produits du frigo utilisés */
  coveredAll: string[];
  uncoveredUrgent: string[];
}

/**
 * Mode « Vider le frigo » : choix glouton de 2 à 3 recettes distinctes (≤ 1 ingrédient manquant chacune)
 * maximisant d'abord les produits bientôt périmés couverts, puis le nombre total de produits utilisés.
 */
export function planEmptyFridge(
  recipes: Recipe[],
  fridge: Set<string>,
  urgent: Set<string>,
  filters: MatchFilters,
  maxRecipes = 3,
): EmptyFridgePlan {
  const candidates = matchRecipes(recipes, fridge, filters, { urgent, maxMissing: 1 });
  const picks: RecipeMatch[] = [];
  const coveredUrgent = new Set<string>();
  const coveredAll = new Set<string>();
  const pool = [...candidates];

  while (picks.length < maxRecipes && pool.length) {
    let bestIdx = -1;
    let bestScore = 0;
    pool.forEach((m, idx) => {
      const newUrgent = m.usedUrgent.filter((x) => !coveredUrgent.has(x)).length;
      const newAll = m.used.filter((x) => !coveredAll.has(x)).length;
      const score = newUrgent * 10 + newAll - m.missing.length * 2;
      if (score > bestScore) {
        bestScore = score;
        bestIdx = idx;
      }
    });
    if (bestIdx < 0) break;
    const [pick] = pool.splice(bestIdx, 1);
    picks.push(pick);
    pick.usedUrgent.forEach((x) => coveredUrgent.add(x));
    pick.used.forEach((x) => coveredAll.add(x));
  }

  return {
    picks,
    coveredUrgent: [...coveredUrgent],
    coveredAll: [...coveredAll],
    uncoveredUrgent: [...urgent].filter((x) => !coveredUrgent.has(x)),
  };
}

export { evaluateRecipe };
