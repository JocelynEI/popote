import type { Recipe } from '../data/types';
import { matchRecipes, type MatchFilters, type RecipeMatch } from '../logic/matching';

/**
 * Point d'entrée unique des suggestions de recettes.
 *
 * Aujourd'hui : moteur LOCAL (hors ligne, aucune donnée envoyée) sur la base de recettes embarquée.
 * L'interface est asynchrone pour qu'un autre moteur (par ex. une IA) puisse être branché plus tard
 * via `setRecipeEngine()` sans toucher aux écrans. ⚠️ Un moteur en ligne changerait la promesse
 * « 100 % local » : il faudrait alors mettre à jour la politique de confidentialité et les fiches stores.
 */
export interface SuggestInput {
  recipes: Recipe[];
  available: Set<string>;
  filters: MatchFilters;
  urgent?: Set<string>;
  recentlyCooked?: Map<string, number>;
}

export interface RecipeEngine {
  name: string;
  suggest(input: SuggestInput): Promise<RecipeMatch[]>;
}

export const localEngine: RecipeEngine = {
  name: 'local',
  async suggest({ recipes, available, filters, urgent, recentlyCooked }) {
    if (!available.size) return [];
    const m = matchRecipes(recipes, available, filters, { urgent, recentlyCooked });
    // rien de complet ou presque : on élargit à 3 ingrédients manquants
    return m.length ? m : matchRecipes(recipes, available, filters, { urgent, recentlyCooked, maxMissing: 3 });
  },
};

let current: RecipeEngine = localEngine;
export const getRecipeEngine = () => current;
export function setRecipeEngine(e: RecipeEngine) {
  current = e;
}
