import { INGREDIENT_BY_ID } from '../data/ingredients';
import type { Diet, IngredientTag, Recipe, RecipeIngredient } from '../data/types';

export type Allergen = Exclude<IngredientTag, 'meat' | 'fish' | 'honey'>;
export const ALLERGENS: Allergen[] = ['gluten', 'milk', 'egg', 'nuts', 'peanut', 'soy', 'sesame', 'shellfish'];
export const DIETS: Diet[] = ['vegetarian', 'vegan', 'glutenFree', 'lactoseFree'];

function tagsOf(items: RecipeIngredient[]): Set<IngredientTag> {
  const s = new Set<IngredientTag>();
  for (const ri of items) for (const t of INGREDIENT_BY_ID[ri.id]?.tags ?? []) s.add(t);
  return s;
}

/** Tags d'un seul ingrédient qui entrent en conflit avec un régime */
function dietConflicts(diet: Diet): IngredientTag[] {
  switch (diet) {
    case 'vegetarian':
      return ['meat', 'fish', 'shellfish'];
    case 'vegan':
      return ['meat', 'fish', 'shellfish', 'egg', 'milk', 'honey'];
    case 'glutenFree':
      return ['gluten'];
    case 'lactoseFree':
      return ['milk'];
  }
}

/** Régimes compatibles, calculés sur les ingrédients obligatoires uniquement. */
export function recipeDiets(recipe: Recipe): Diet[] {
  const tags = tagsOf(recipe.ingredients.filter((i) => !i.optional));
  return DIETS.filter((d) => !dietConflicts(d).some((t) => tags.has(t)));
}

export function recipeAllergens(recipe: Recipe): Allergen[] {
  const tags = tagsOf(recipe.ingredients.filter((i) => !i.optional));
  return ALLERGENS.filter((a) => tags.has(a));
}

/** L'ingrédient (souvent optionnel) est-il incompatible avec les régimes / allergies de l'utilisateur ? */
export function ingredientConflicts(ingredientId: string, diets: Diet[], allergies: Allergen[]): boolean {
  const tags = INGREDIENT_BY_ID[ingredientId]?.tags ?? [];
  if (allergies.some((a) => tags.includes(a))) return true;
  return diets.some((d) => dietConflicts(d).some((t) => tags.includes(t)));
}

export function recipeFitsProfile(recipe: Recipe, diets: Diet[], allergies: Allergen[]): boolean {
  const ok = recipeDiets(recipe);
  if (!diets.every((d) => ok.includes(d))) return false;
  const al = recipeAllergens(recipe);
  return !allergies.some((a) => al.includes(a));
}
