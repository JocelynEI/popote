import { daysLeft } from './expiry';

/** Ce que la logique a besoin de savoir d'un produit du frigo (même forme que la base locale). */
export interface FridgeLike {
  ingredient_id: string | null;
  expires_at: string | null;
}

/**
 * Le frigo en trois blocs : à finir vite (2 jours ou moins, périmés compris), avec une date, sans date.
 * Dans les deux premiers, le plus proche de la date en premier.
 */
export function groupFridge<T extends FridgeLike>(items: T[], now = new Date()): { urgent: T[]; dated: T[]; undated: T[] } {
  const byDate = (a: T, b: T) => daysLeft(a.expires_at as string, now) - daysLeft(b.expires_at as string, now);
  const soon = (i: T) => !!i.expires_at && daysLeft(i.expires_at, now) <= 2;
  const urgent = items.filter(soon).sort(byDate);
  const dated = items.filter((i) => i.expires_at && !soon(i)).sort(byDate);
  const undated = items.filter((i) => !i.expires_at);
  return { urgent, dated, undated };
}

/**
 * Ce que l'accueil ajoute au frigo : les ingrédients pas encore présents, une seule fois chacun,
 * toujours sans date (la date se choisit dans le frigo, jamais préremplie).
 */
export function newFridgeEntries(ids: string[], existing: FridgeLike[]): { ingredientId: string; expiresAt: null }[] {
  const have = new Set(existing.map((i) => i.ingredient_id).filter(Boolean));
  return [...new Set(ids)].filter((id) => !have.has(id)).map((ingredientId) => ({ ingredientId, expiresAt: null }));
}

/** Ingrédients pris pour une recherche : tout le frigo, moins ceux décochés pour cette recherche. */
export function searchIngredientsFrom(fridgeIds: Set<string>, excluded: Set<string>): Set<string> {
  return new Set([...fridgeIds].filter((id) => !excluded.has(id)));
}
