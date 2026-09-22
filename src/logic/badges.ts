import type { L10n } from '../data/types';

export interface StatsSnapshot {
  cookedTotal: number;
  savedTotal: number;
  wastedTotal: number;
  customRecipes: number;
  favorites: number;
  /** le frigo a été entièrement vidé des produits urgents grâce à des recettes */
  fridgeCleared: boolean;
  distinctRecipesCooked: number;
}

export interface BadgeDef {
  id: string;
  emoji: string;
  title: L10n;
  desc: L10n;
  unlocked: (s: StatsSnapshot) => boolean;
}

export const BADGES: BadgeDef[] = [
  { id: 'first_cook', emoji: '👩‍🍳', title: { fr: 'Premier plat', en: 'First dish' }, desc: { fr: 'Cuisiner une première recette', en: 'Cook your first recipe' }, unlocked: (s) => s.cookedTotal >= 1 },
  { id: 'first_save', emoji: '🌱', title: { fr: 'Premier sauvetage', en: 'First rescue' }, desc: { fr: 'Utiliser un produit avant qu’il périme', en: 'Use a product before it expires' }, unlocked: (s) => s.savedTotal >= 1 },
  { id: 'cook_10', emoji: '🔟', title: { fr: '10 recettes', en: '10 recipes' }, desc: { fr: 'Cuisiner 10 recettes', en: 'Cook 10 recipes' }, unlocked: (s) => s.cookedTotal >= 10 },
  { id: 'cook_50', emoji: '🏅', title: { fr: 'Toque d’or', en: 'Golden toque' }, desc: { fr: 'Cuisiner 50 recettes', en: 'Cook 50 recipes' }, unlocked: (s) => s.cookedTotal >= 50 },
  { id: 'save_25', emoji: '♻️', title: { fr: 'Anti-gaspi', en: 'Waste warrior' }, desc: { fr: 'Sauver 25 produits', en: 'Rescue 25 products' }, unlocked: (s) => s.savedTotal >= 25 },
  { id: 'save_100', emoji: '🌍', title: { fr: 'Héros de la planète', en: 'Planet hero' }, desc: { fr: 'Sauver 100 produits', en: 'Rescue 100 products' }, unlocked: (s) => s.savedTotal >= 100 },
  { id: 'fridge_cleared', emoji: '🧊', title: { fr: 'Frigo nickel', en: 'Spotless fridge' }, desc: { fr: 'Utiliser tous les produits à consommer vite', en: 'Use every product about to expire' }, unlocked: (s) => s.fridgeCleared },
  { id: 'first_custom', emoji: '✍️', title: { fr: 'Chef créatif', en: 'Creative chef' }, desc: { fr: 'Ajouter ta première recette perso', en: 'Add your first own recipe' }, unlocked: (s) => s.customRecipes >= 1 },
  { id: 'explorer', emoji: '🧭', title: { fr: 'Explorateur', en: 'Explorer' }, desc: { fr: 'Cuisiner 15 recettes différentes', en: 'Cook 15 different recipes' }, unlocked: (s) => s.distinctRecipesCooked >= 15 },
];

/** Valeur moyenne estimée d'un produit sauvé (hypothèse affichée à l'utilisateur comme estimation). */
export const AVG_SAVED_VALUE_EUR = 1.3;

export function estimatedSavings(saved: number): number {
  return Math.round(saved * AVG_SAVED_VALUE_EUR);
}
