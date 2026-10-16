/** Minuscule, sans accents, ligatures dépliées, espaces normalisés. */
export function normalize(s: string): string {
  return s
    .toLowerCase()
    .replace(/œ/g, 'oe')
    .replace(/æ/g, 'ae')
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[’'`-]/g, ' ')
    .replace(/[^a-z0-9 ]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

/** Singularisation naïve FR/EN, mot par mot (tomates -> tomate, choux -> chou, berries -> berrie). */
export function singular(s: string): string {
  return s
    .split(' ')
    .map((w) => (w.length > 3 && /[sx]$/.test(w) ? w.slice(0, -1) : w))
    .join(' ');
}

export function key(s: string): string {
  return singular(normalize(s));
}

/** Distance de Levenshtein bornée (pour « Vouliez-vous dire… ? ») */
export function levenshtein(a: string, b: string, max = 3): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const prev = new Array(b.length + 1).fill(0).map((_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    let rowMin = Infinity;
    let diag = prev[0];
    prev[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = prev[j];
      prev[j] = Math.min(prev[j] + 1, prev[j - 1] + 1, diag + (a[i - 1] === b[j - 1] ? 0 : 1));
      diag = tmp;
      rowMin = Math.min(rowMin, prev[j]);
    }
    if (rowMin > max) return max + 1;
  }
  return prev[b.length];
}

/**
 * Remplit un texte de l'appli : pluriels puis paramètres.
 * Pluriel : « {n|produit|produits} » choisit la forme selon le paramètre n
 * (français : 0 et 1 au singulier ; anglais : 1 seul au singulier). Une forme peut contenir un paramètre :
 * « {k|ton ingrédient|tes {k} ingrédients} ».
 */
export function formatMessage(template: string, params: Record<string, string | number> | undefined, lang: 'fr' | 'en'): string {
  let s = template;
  if (params) {
    s = s.replace(/\{(\w+)\|([^|{}]*(?:\{\w+\}[^|{}]*)*)\|([^{}]*(?:\{\w+\}[^{}]*)*)\}/g, (m, name: string, one: string, many: string) => {
      if (!(name in params)) return m;
      const n = Math.abs(Number(params[name]));
      const singulier = lang === 'fr' ? n < 2 : n === 1;
      return singulier ? one : many;
    });
    for (const [k, v] of Object.entries(params)) s = s.split(`{${k}}`).join(String(v));
  }
  return s;
}
