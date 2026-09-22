import type { Lang, RecipeIngredient, Unit } from '../data/types';

/** Unités « entières » : on arrondit à l'unité supérieure (1,5 œuf -> 2 œufs) */
const WHOLE_UNITS: Unit[] = ['pc', 'clove', 'can', 'slice', 'bunch', 'pinch'];

export function scaleQty(qty: number, unit: Unit, factor: number): number {
  const raw = qty * factor;
  if (WHOLE_UNITS.includes(unit)) return Math.max(1, Math.ceil(raw - 0.15));
  if (unit === 'tbsp' || unit === 'tsp') return Math.max(0.5, Math.round(raw * 2) / 2);
  // g / ml : arrondis « de cuisine »
  if (raw < 20) return Math.max(1, Math.round(raw));
  if (raw < 100) return Math.round(raw / 5) * 5;
  if (raw < 500) return Math.round(raw / 10) * 10;
  return Math.round(raw / 50) * 50;
}

const UNIT_LABELS: Record<Lang, Record<Unit, [string, string]>> = {
  fr: {
    g: ['g', 'g'],
    ml: ['ml', 'ml'],
    pc: ['', ''],
    tbsp: ['c. à soupe', 'c. à soupe'],
    tsp: ['c. à café', 'c. à café'],
    pinch: ['pincée', 'pincées'],
    slice: ['tranche', 'tranches'],
    clove: ['gousse', 'gousses'],
    can: ['boîte', 'boîtes'],
    bunch: ['bouquet', 'bouquets'],
  },
  en: {
    g: ['g', 'g'],
    ml: ['ml', 'ml'],
    pc: ['', ''],
    tbsp: ['tbsp', 'tbsp'],
    tsp: ['tsp', 'tsp'],
    pinch: ['pinch', 'pinches'],
    slice: ['slice', 'slices'],
    clove: ['clove', 'cloves'],
    can: ['can', 'cans'],
    bunch: ['bunch', 'bunches'],
  },
};

function fmtNumber(n: number, lang: Lang): string {
  const s = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return lang === 'fr' ? s.replace('.', ',') : s;
}

/** « 200 g », « 2 gousses », « 1,5 c. à soupe », « 3 » */
export function formatQty(ri: RecipeIngredient, factor: number, lang: Lang): string {
  if (ri.qty == null || !ri.unit) return '';
  const q = scaleQty(ri.qty, ri.unit, factor);
  const [one, many] = UNIT_LABELS[lang][ri.unit];
  const label = q > 1 ? many : one;
  if (ri.unit === 'g' || ri.unit === 'ml') {
    if (q >= 1000) return `${fmtNumber(q / 1000, lang)} ${ri.unit === 'g' ? 'kg' : 'L'}`;
    return `${fmtNumber(q, lang)} ${label}`;
  }
  return label ? `${fmtNumber(q, lang)} ${label}` : fmtNumber(q, lang);
}

export function clampServings(n: number): number {
  if (!Number.isFinite(n)) return 2;
  return Math.min(20, Math.max(1, Math.round(n)));
}

/** « 200 g », « 1,5 kg », « 2 c. à soupe », « 3 » -> { qty, unit } (null si vide/illisible) */
export function parseQtyInput(input: string): { qty: number; unit: Unit } | null {
  const s = input.trim().toLowerCase().replace(',', '.');
  if (!s) return null;
  const m = s.match(/^(\d+(?:\.\d+)?)\s*(.*)$/);
  if (!m) return null;
  const n = Number(m[1]);
  if (!Number.isFinite(n) || n <= 0 || n > 100000) return null;
  const u = m[2].normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/\./g, '').trim();
  if (!u) return { qty: n, unit: 'pc' };
  if (/^(g|gr|gramme?s?)$/.test(u)) return { qty: n, unit: 'g' };
  if (/^(kg|kilos?)$/.test(u)) return { qty: n * 1000, unit: 'g' };
  if (/^(ml)$/.test(u)) return { qty: n, unit: 'ml' };
  if (/^(cl)$/.test(u)) return { qty: n * 10, unit: 'ml' };
  if (/^(l|litres?|liters?)$/.test(u)) return { qty: n * 1000, unit: 'ml' };
  if (/^(cs|c a soupe|cuillere?s? a soupe|tbsp|tablespoons?)$/.test(u)) return { qty: n, unit: 'tbsp' };
  if (/^(cc|c a cafe|cuillere?s? a cafe|tsp|teaspoons?)$/.test(u)) return { qty: n, unit: 'tsp' };
  if (/^(pincees?|pinch(es)?)$/.test(u)) return { qty: n, unit: 'pinch' };
  if (/^(tranches?|slices?)$/.test(u)) return { qty: n, unit: 'slice' };
  if (/^(gousses?|cloves?)$/.test(u)) return { qty: n, unit: 'clove' };
  if (/^(boites?|cans?|tins?)$/.test(u)) return { qty: n, unit: 'can' };
  if (/^(bouquets?|bunch(es)?)$/.test(u)) return { qty: n, unit: 'bunch' };
  return { qty: n, unit: 'pc' };
}
