import { createContext, useContext } from 'react';
import { Platform, type ViewStyle } from 'react-native';
import type { AccentTheme } from '../state/settings';

/**
 * Design system Popote (spécification UX/UI v2) :
 * Vert Sauge #82A98B · Zeste d'Orange #F28C38 · Crème d'Avoine #FDFBF7 · Surface #FFFFFF · Gris Poivre #2D3142.
 * Pour l'accessibilité (WCAG AA ≥ 4,5:1), le sauge et l'orange servent d'aplats ; le texte posé dessus
 * est en Gris Poivre, et le texte « couleur » utilise des variantes foncées (#4A7454, #A94F0E).
 */
export interface Palette {
  bg: string;
  surface: string;
  surfaceAlt: string;
  border: string;
  text: string;
  textMuted: string;
  primary: string; // Vert Sauge : header, liens, icônes actives (aplats)
  primaryText: string; // sauge foncée : texte / icônes sur fond clair (contraste AA)
  onPrimary: string; // texte posé sur primary
  primarySoft: string; // fond teinté sauge (puces, bandeaux)
  accent: string; // Zeste d'Orange : CTA principal, alertes, badge « Rapide »
  onAccent: string; // texte sur l'orange (Gris Poivre : 5,3:1)
  accentText: string; // orange foncé lisible sur fond clair
  accentSoft: string;
  herb: string;
  herbSoft: string;
  danger: string;
  warning: string;
  success: string;
  dangerBg: string;
  warningBg: string;
  successBg: string;
  overlay: string;
  shadow: string;
}

type Accent = { primary: string; primaryTextLight: string; primarySoftLight: string; primaryDark: string; primaryTextDark: string };

export const DEFAULT_ACCENT: AccentTheme = 'sage';

/** Couleur « primaire » (sage par défaut ; les autres sont des thèmes Premium) */
export const ACCENTS: Record<AccentTheme, Accent> = {
  sage: { primary: '#82A98B', primaryTextLight: '#4A7454', primarySoftLight: '#E6EFE8', primaryDark: '#9BC2A4', primaryTextDark: '#A9CFB1' },
  tomato: { primary: '#D9674A', primaryTextLight: '#B0472C', primarySoftLight: '#FBE6DF', primaryDark: '#F08F74', primaryTextDark: '#F5A48D' },
  blueberry: { primary: '#6F86D6', primaryTextLight: '#3F57B0', primarySoftLight: '#E4E9FA', primaryDark: '#9AAEF0', primaryTextDark: '#AEBEF5' },
  aubergine: { primary: '#9B6FB0', primaryTextLight: '#6E437F', primarySoftLight: '#F1E6F5', primaryDark: '#C49AD6', primaryTextDark: '#D1ADE0' },
};

export function makePalette(mode: 'light' | 'dark', accent: AccentTheme): Palette {
  const a = ACCENTS[accent] ?? ACCENTS.sage;
  if (mode === 'light')
    return {
      bg: '#FDFBF7', // Crème d'Avoine
      surface: '#FFFFFF',
      surfaceAlt: '#F6F2EA',
      border: '#ECE6DA',
      text: '#2D3142', // Gris Poivre
      textMuted: '#6B7280',
      primary: a.primary,
      primaryText: a.primaryTextLight,
      onPrimary: '#FFFFFF',
      primarySoft: a.primarySoftLight,
      accent: '#F28C38',
      onAccent: '#2D3142',
      accentText: '#A94F0E',
      accentSoft: '#FDEBDC',
      herb: '#4A7454',
      herbSoft: '#E6EFE8',
      danger: '#B3261E',
      warning: '#955000',
      success: '#2F7040',
      dangerBg: '#FDE8E4',
      warningBg: '#FFF1DA',
      successBg: '#E6F3E3',
      overlay: 'rgba(45,49,66,0.45)',
      shadow: '#000000',
    };
  return {
    bg: '#191B22',
    surface: '#23262F',
    surfaceAlt: '#2B2E38',
    border: '#383C48',
    text: '#F3F1EC',
    textMuted: '#B4B8C2',
    primary: a.primaryDark,
    primaryText: a.primaryTextDark,
    onPrimary: '#191B22',
    primarySoft: '#2A3530',
    accent: '#F28C38',
    onAccent: '#2D3142',
    accentText: '#F7A866',
    accentSoft: '#3A2C20',
    herb: '#A9CFB1',
    herbSoft: '#243029',
    danger: '#FF8A80',
    warning: '#FFB74D',
    success: '#8FD49D',
    dangerBg: '#3A1F1C',
    warningBg: '#3A2C18',
    successBg: '#1F3022',
    overlay: 'rgba(0,0,0,0.6)',
    shadow: '#000000',
  };
}

/** Géométrie : 16 px pour les cartes, pilule pour les boutons principaux */
export const radius = { sm: 10, md: 16, lg: 16, xl: 24, pill: 9999 };
export const space = (n: number) => n * 4;
/** zone tactile minimale (Apple HIG 44 pt) */
export const TOUCH = 44;

/** Polices (chargées dans le layout racine). Fraunces pour les titres, Inter pour le corps. */
export const FONTS = {
  display: 'Fraunces_700Bold',
  displaySemi: 'Fraunces_600SemiBold',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemi: 'Inter_600SemiBold',
  bodyBold: 'Inter_700Bold',
  bodyHeavy: 'Inter_700Bold',
};

/** Ombre diffuse et douce : équivalent de « 0 10px 25px -5px rgba(0,0,0,0.05) » */
export function shadow(c: Palette, level: 1 | 2 = 1): ViewStyle {
  return Platform.select<ViewStyle>({
    ios: { shadowColor: c.shadow, shadowOpacity: level === 1 ? 0.06 : 0.1, shadowRadius: level === 1 ? 12 : 20, shadowOffset: { width: 0, height: level === 1 ? 8 : 12 } },
    web: { boxShadow: level === 1 ? '0 10px 25px -5px rgba(0,0,0,0.07)' : '0 16px 36px -8px rgba(0,0,0,0.12)' } as ViewStyle,
    default: { elevation: level === 1 ? 2 : 4, shadowColor: c.shadow },
  })!;
}

export interface Theme {
  mode: 'light' | 'dark';
  c: Palette;
  reduceMotion: boolean;
}

export const ThemeContext = createContext<Theme>({ mode: 'light', c: makePalette('light', DEFAULT_ACCENT), reduceMotion: false });
export const useTheme = () => useContext(ThemeContext);
