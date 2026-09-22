export type Lang = 'fr' | 'en';
export type L10n = { fr: string; en: string };

export type IngredientCategory =
  | 'dairy' // crèmerie & œufs
  | 'meat' // viandes & poissons
  | 'veg' // légumes
  | 'fruit'
  | 'starch' // féculents
  | 'can' // conserves
  | 'grocery' // épicerie
  | 'spice' // épices & herbes
  | 'frozen';

/** Tags d'allergènes / régimes, portés par l'ingrédient. Les régimes d'une recette en sont déduits automatiquement. */
export type IngredientTag =
  | 'meat'
  | 'fish'
  | 'shellfish'
  | 'egg'
  | 'milk'
  | 'gluten'
  | 'nuts'
  | 'peanut'
  | 'soy'
  | 'sesame'
  | 'honey';

export interface Ingredient {
  id: string;
  name: L10n;
  emoji: string;
  cat: IngredientCategory;
  tags: IngredientTag[];
  /** synonymes (déjà en minuscules), toutes langues confondues */
  syn: string[];
  /** fait partie de la "base placard" : jamais compté comme manquant */
  pantry?: boolean;
  /** proposé dans la grille « Remplir mon frigo rapidement » */
  quick?: boolean;
}

export type Unit = 'g' | 'ml' | 'pc' | 'tbsp' | 'tsp' | 'pinch' | 'slice' | 'clove' | 'can' | 'bunch';

export interface RecipeIngredient {
  id: string;
  qty?: number;
  unit?: Unit;
  optional?: boolean;
  /** libellé libre (ingrédients « free:… » des recettes perso) */
  label?: string;
}

export type Course = 'starter' | 'main' | 'dessert';
export type Diet = 'vegetarian' | 'vegan' | 'glutenFree' | 'lactoseFree';

export interface RecipeStep {
  text: L10n;
  /** minuteur suggéré pour cette étape, en minutes */
  timer?: number;
}

export interface Recipe {
  id: string;
  title: L10n;
  icon: string;
  course: Course;
  /** minutes, préparation + cuisson */
  time: number;
  difficulty: 1 | 2;
  servings: number;
  ingredients: RecipeIngredient[];
  steps: RecipeStep[];
  premium?: boolean;
  /** recette créée par l'utilisateur */
  custom?: boolean;
}
