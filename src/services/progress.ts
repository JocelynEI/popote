import { cookedCount, distinctCookedCount, listFavorites, listFridge, listUserRecipes, unlockBadge, unlockedBadges, wasteCounts } from '../db/repo';
import { BADGES, type BadgeDef, type StatsSnapshot } from '../logic/badges';
import { isUrgent } from '../logic/expiry';

export function snapshot(): StatsSnapshot {
  const w = wasteCounts();
  return {
    cookedTotal: cookedCount(),
    savedTotal: w.saved,
    wastedTotal: w.wasted,
    customRecipes: listUserRecipes().length,
    favorites: listFavorites().length,
    fridgeCleared: w.saved > 0 && !listFridge().some((i) => isUrgent(i.expires_at)),
    distinctRecipesCooked: distinctCookedCount(),
  };
}

/** Débloque les nouveaux badges et renvoie ceux qui viennent d'être obtenus. */
export function checkBadges(): BadgeDef[] {
  const s = snapshot();
  const have = unlockedBadges();
  const fresh = BADGES.filter((b) => !have.has(b.id) && b.unlocked(s));
  fresh.forEach((b) => unlockBadge(b.id));
  return fresh;
}

export function startOfWeekIso(now = new Date()): string {
  const d = new Date(now);
  const day = (d.getDay() + 6) % 7; // lundi = 0
  d.setDate(d.getDate() - day);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export function startOfMonthIso(now = new Date()): string {
  return new Date(now.getFullYear(), now.getMonth(), 1).toISOString();
}
