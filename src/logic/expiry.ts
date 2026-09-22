/** Dates au format local YYYY-MM-DD (pas d'heure : on raisonne en jours). */

export function toISODate(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

export function fromISODate(s: string): Date {
  const [y, m, d] = s.split('-').map(Number);
  return new Date(y, m - 1, d);
}

export function todayISO(now = new Date()): string {
  return toISODate(now);
}

export function addDays(iso: string, n: number): string {
  const d = fromISODate(iso);
  d.setDate(d.getDate() + n);
  return toISODate(d);
}

/** Jours restants avant péremption (0 = aujourd'hui, négatif = périmé). */
export function daysLeft(expiresAt: string, now = new Date()): number {
  const a = fromISODate(todayISO(now)).getTime();
  const b = fromISODate(expiresAt).getTime();
  return Math.round((b - a) / 86_400_000);
}

export type ExpiryStatus = 'expired' | 'red' | 'orange' | 'green' | 'none';

/** rouge ≤ 1 jour, orange 2–3 jours, vert au-delà */
export function expiryStatus(expiresAt: string | null | undefined, now = new Date()): ExpiryStatus {
  if (!expiresAt) return 'none';
  const d = daysLeft(expiresAt, now);
  if (d < 0) return 'expired';
  if (d <= 1) return 'red';
  if (d <= 3) return 'orange';
  return 'green';
}

/** Un produit est « à utiliser vite » s'il périme dans 2 jours ou moins (et n'est pas déjà périmé). */
export function isUrgent(expiresAt: string | null | undefined, now = new Date()): boolean {
  if (!expiresAt) return false;
  const d = daysLeft(expiresAt, now);
  return d >= 0 && d <= 2;
}

/** Garde-fous de saisie */
export type DateCheck = 'ok' | 'past' | 'tooFar';
export function checkExpiryDate(expiresAt: string, now = new Date()): DateCheck {
  const d = daysLeft(expiresAt, now);
  if (d < 0) return 'past';
  if (d > 730) return 'tooFar';
  return 'ok';
}
