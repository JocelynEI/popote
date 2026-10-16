import type { Recipe } from '../data/types';
import { evaluateRecipe, type RecipeMatch } from './matching';

/** Cartes de l'accueil, de haut en bas. */
export type HomeCard = 'urgent' | 'now' | 'add' | 'pantry' | 'fill';

/**
 * Ordre fixe des cartes de l'accueil (cahier des charges, 3.2).
 * Frigo rempli : à finir vite (s'il y en a), tout de suite, ajouter, remplir.
 * Frigo vide : ajouter d'abord, puis des idées avec trois fois rien, puis remplir.
 */
export function homeCards(p: { fridgeEmpty: boolean; urgentCount: number }): HomeCard[] {
  if (p.fridgeEmpty) return ['add', 'pantry', 'fill'];
  return [...(p.urgentCount > 0 ? (['urgent'] as const) : []), 'now', 'add', 'fill'];
}

/**
 * Les trois idées de la carte « Tout de suite » : d'abord les recettes faisables sans rien acheter,
 * sinon les plus proches. Jamais une recette Premium verrouillée.
 */
export function quickIdeas(matches: RecipeMatch[], isPremium: boolean, n = 3): { ideas: RecipeMatch[]; complete: boolean } {
  const open = matches.filter((m) => isPremium || !m.recipe.premium);
  const complete = open.filter((m) => m.missing.length === 0);
  return complete.length ? { ideas: complete.slice(0, n), complete: true } : { ideas: open.slice(0, n), complete: false };
}

/**
 * Idées quand le frigo est vide : sur tout le catalogue gratuit, les plats qui demandent le moins
 * de choses en plus du placard (deux au plus), les plus rapides d'abord. Pour varier, deux idées
 * ne demandent jamais le même ingrédient.
 */
export function pantryIdeas(recipes: Recipe[], n = 3): RecipeMatch[] {
  const candidates = recipes
    .filter((r) => !r.premium && !r.custom && r.course === 'main')
    .map((r) => evaluateRecipe(r, new Set()))
    .filter((m) => m.missing.length > 0 && m.missing.length <= 2)
    .sort((a, b) => a.missing.length - b.missing.length || a.recipe.time - b.recipe.time);
  const picked: RecipeMatch[] = [];
  const asked = new Set<string>();
  for (const m of candidates) {
    if (picked.length >= n) break;
    if (m.missing.some((id) => asked.has(id))) continue;
    picked.push(m);
    m.missing.forEach((id) => asked.add(id));
  }
  return picked;
}

/** Les produits à finir, nommés : quatre au plus, puis « et n autres ». */
export function namesPreview(names: string[], max = 4): { shown: string[]; rest: number } {
  return { shown: names.slice(0, max), rest: Math.max(0, names.length - max) };
}

/**
 * Liste de noms en phrase : « Crème, courgette et tomates », ou « … et 2 autres » au-delà de quatre.
 * Seul le premier nom garde sa majuscule. `et` et `autres` viennent des textes de l'appli.
 */
export function namesSentence(names: string[], words: { and: string; others: (n: number) => string }, max = 4): string {
  const lowered = names.map((n, i) => (i === 0 ? n : n.charAt(0).toLocaleLowerCase() + n.slice(1)));
  const { shown, rest } = namesPreview(lowered, max);
  if (rest > 0) return `${shown.join(', ')} ${words.and} ${words.others(rest)}`;
  if (shown.length <= 1) return shown.join('');
  return `${shown.slice(0, -1).join(', ')} ${words.and} ${shown[shown.length - 1]}`;
}
