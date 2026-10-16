import type { RecipeMatch } from './matching';

/** Recettes Premium montrées (verrouillées) aux non-abonnés, pour donner une idée du pack. */
export const MAX_LOCKED = 2;

/**
 * Ce que l'écran des idées affiche : tout pour un abonné Premium ; sinon les recettes gratuites
 * et, au plus, les deux premières recettes Premium (verrouillées). L'ordre du moteur est gardé.
 */
export function visibleMatches(matches: RecipeMatch[], isPremium: boolean, maxLocked = MAX_LOCKED): RecipeMatch[] {
  let locked = 0;
  return matches.filter((m) => isPremium || !m.recipe.premium || ++locked <= maxLocked);
}

/** Deux groupes : faisables tout de suite, puis celles où il manque une ou deux choses. Ordre gardé. */
export function groupResults(matches: RecipeMatch[]): { now: RecipeMatch[]; almost: RecipeMatch[] } {
  return { now: matches.filter((m) => m.missing.length === 0), almost: matches.filter((m) => m.missing.length > 0) };
}

/** Met en minuscule la première lettre (pour une liste qui suit « Il manque : »). */
export function lowerFirst(s: string): string {
  return s ? s.charAt(0).toLocaleLowerCase() + s.slice(1) : s;
}
