import type { Recipe, Tool } from '../data/types';

export const TOOLS: Tool[] = ['oven', 'microwave', 'blender', 'multicooker'];

/** Mots des étapes (en français) qui trahissent un ustensile. « fourchette » ne compte pas pour le four. */
const CLUES: Record<Tool, RegExp> = {
  oven: /\b(four|fours)\b|enfourn|préchauff|gril du four|sous le gril|gratinez|\d+ ?°C/i,
  microwave: /micro-?ondes?/i,
  blender: /\bmix(ez|er|é|ée|és|ées|eur)\b|blender|robot/i,
  multicooker: /cookeo|autocuiseur|cocotte-minute|multicuiseur/i,
};

/** Ustensiles qu'on peut déduire des étapes d'une recette. */
export function inferTools(recipe: Pick<Recipe, 'steps'>): Tool[] {
  const text = recipe.steps.map((s) => s.text.fr).join(' ');
  return TOOLS.filter((tool) => CLUES[tool].test(text));
}

/**
 * La recette est-elle faisable avec les ustensiles de l'utilisateur ?
 * `owned` = null : il n'a pas répondu, on ne filtre rien. Recette sans liste d'ustensiles (perso) : jamais cachée.
 */
export function fitsTools(recipe: Pick<Recipe, 'tools'>, owned: Tool[] | null | undefined): boolean {
  if (!owned || !recipe.tools) return true;
  return recipe.tools.every((tool) => owned.includes(tool));
}
