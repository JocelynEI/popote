import Storage from 'expo-sqlite/kv-store';
import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';
import type { Diet } from '../data/types';
import type { Allergen } from '../logic/diets';

export type ThemePref = 'auto' | 'light' | 'dark';
export type LangPref = 'auto' | 'fr' | 'en';
export type AccentTheme = 'sage' | 'tomato' | 'blueberry' | 'aubergine';

export interface Settings {
  lang: LangPref;
  theme: ThemePref;
  accent: AccentTheme; // Premium (sauf 'sage')
  diets: Diet[];
  allergies: Allergen[];
  defaultServings: number;
  // onboarding
  prefsDone: boolean;
  tipsSeen: string[];
  privacyNoticeSeen: boolean;
  notifAsked: boolean;
  // notifications
  expiryNotif: boolean;
  expiryHour: number;
  expiryMinute: number;
  dinnerNotif: boolean;
  dinnerHour: number;
  recapNotif: boolean;
  // sauvegarde
  lastBackupAt: string | null;
  backupReminderAt: string | null;
  // premium
  premium: boolean;
  premiumNudgeShown: boolean;
  // mode cuisine
  cookFontScale: number;
  // filtres mémorisés
  lastMaxTime: 15 | 30 | 60 | null;
}

export const DEFAULT_SETTINGS: Settings = {
  lang: 'auto',
  theme: 'auto',
  accent: 'sage',
  diets: [],
  allergies: [],
  defaultServings: 2,
  prefsDone: false,
  tipsSeen: [],
  privacyNoticeSeen: false,
  notifAsked: false,
  expiryNotif: true,
  expiryHour: 17,
  expiryMinute: 30,
  dinnerNotif: false,
  dinnerHour: 18,
  recapNotif: true,
  lastBackupAt: null,
  backupReminderAt: null,
  premium: false,
  premiumNudgeShown: false,
  cookFontScale: 1,
  lastMaxTime: null,
};

const KEY = 'settings.v1';

export function loadSettings(): Settings {
  try {
    const raw = Storage.getItemSync(KEY);
    if (!raw) return DEFAULT_SETTINGS;
    const s = { ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) };
    // migration : anciennes couleurs des versions précédentes
    if (!['sage', 'tomato', 'blueberry', 'aubergine'].includes(s.accent)) s.accent = 'sage';
    return s;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(s: Settings) {
  Storage.setItemSync(KEY, JSON.stringify(s));
}

interface Ctx {
  settings: Settings;
  update: (patch: Partial<Settings>) => void;
  replaceAll: (s: Settings) => void;
}

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(loadSettings);
  const update = useCallback((patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      saveSettings(next);
      return next;
    });
  }, []);
  const replaceAll = useCallback((s: Settings) => {
    const next = { ...DEFAULT_SETTINGS, ...s };
    saveSettings(next);
    setSettings(next);
  }, []);
  const value = useMemo(() => ({ settings, update, replaceAll }), [settings, update, replaceAll]);
  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings(): Ctx {
  const c = useContext(SettingsContext);
  if (!c) throw new Error('useSettings hors SettingsProvider');
  return c;
}
