import { getLocales } from 'expo-localization';
import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react';
import type { L10n, Lang } from '../data/types';
import { useSettings } from '../state/settings';
import { en } from './en';
import { type Dict, fr, type TKey } from './fr';

const DICTS: Record<Lang, Dict> = { fr, en };

export function deviceLang(): Lang {
  try {
    const code = getLocales()[0]?.languageCode ?? 'fr';
    return code === 'fr' ? 'fr' : 'en';
  } catch {
    return 'fr';
  }
}

export type TParams = Record<string, string | number>;

export function translate(lang: Lang, key: TKey, params?: TParams): string {
  let s = DICTS[lang][key] ?? fr[key] ?? key;
  if (params) for (const [k, v] of Object.entries(params)) s = s.split(`{${k}}`).join(String(v));
  return s;
}

interface I18n {
  lang: Lang;
  t: (key: TKey, params?: TParams) => string;
  /** texte bilingue de la base de données */
  l: (x: L10n) => string;
  fmtDate: (iso: string) => string;
}

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const { settings } = useSettings();
  const lang: Lang = settings.lang === 'auto' ? deviceLang() : settings.lang;
  const t = useCallback((key: TKey, params?: TParams) => translate(lang, key, params), [lang]);
  const l = useCallback((x: L10n) => x[lang] || x.fr, [lang]);
  const fmtDate = useCallback(
    (iso: string) => new Date(iso.length === 10 ? `${iso}T12:00:00` : iso).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' }),
    [lang],
  );
  const value = useMemo(() => ({ lang, t, l, fmtDate }), [lang, t, l, fmtDate]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const c = useContext(I18nContext);
  if (!c) throw new Error('useI18n hors I18nProvider');
  return c;
}

export type { TKey };
