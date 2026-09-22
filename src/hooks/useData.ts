import { useMemo, useSyncExternalStore } from 'react';
import { FREE_PREFIX, INGREDIENT_BY_ID } from '../data/ingredients';
import { FREE_RECIPES } from '../data/recipes';
import { PREMIUM_RECIPES } from '../data/recipesPremium';
import type { Recipe } from '../data/types';
import { getVersion, listFridge, listUserRecipes, subscribe } from '../db/repo';
import { isUrgent } from '../logic/expiry';
import { key } from '../logic/text';

/** Ré-exécute `fn` à chaque modification de la base locale. */
export function useData<T>(fn: () => T, deps: unknown[] = []): T {
  const v = useSyncExternalStore(subscribe, getVersion);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  return useMemo(fn, [v, ...deps]);
}

export const BUILTIN_RECIPES: Recipe[] = [...FREE_RECIPES, ...PREMIUM_RECIPES];

export function useAllRecipes(): Recipe[] {
  const user = useData(listUserRecipes);
  return useMemo(() => [...user, ...BUILTIN_RECIPES], [user]);
}

export function useRecipe(id: string | undefined): Recipe | undefined {
  const all = useAllRecipes();
  return useMemo(() => all.find((r) => r.id === id), [all, id]);
}

export function useFridge() {
  const items = useData(listFridge);
  return useMemo(() => {
    const ids = new Set<string>();
    const urgent = new Set<string>();
    for (const it of items) {
      // ingrédients libres : utilisables uniquement par les recettes perso (id « free:… »)
      const id = it.ingredient_id && INGREDIENT_BY_ID[it.ingredient_id] ? it.ingredient_id : it.custom_name ? FREE_PREFIX + key(it.custom_name) : null;
      if (!id) continue;
      ids.add(id);
      if (isUrgent(it.expires_at)) urgent.add(id);
    }
    const urgentItems = items.filter((it) => isUrgent(it.expires_at));
    return { items, ids, urgent, urgentItems };
  }, [items]);
}
