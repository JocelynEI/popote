import { useState } from 'react';
import { TextInput, View } from 'react-native';
import { useI18n, type TKey } from '../i18n';
import { addDays, daysLeft, expiryStatus, todayISO, toISODate } from '../logic/expiry';
import { radius, space, useTheme } from '../theme/theme';
import { Chip, MAX_FONT_SCALE, styles as ui, Txt } from './ui';

/** Libellé texte de l'état (jamais uniquement la couleur, pour l'accessibilité) */
export function useExpiryLabel() {
  const { t } = useI18n();
  return (expiresAt: string | null): string => {
    if (!expiresAt) return t('noDate');
    const d = daysLeft(expiresAt);
    if (d < 0) return t('expired');
    if (d === 0) return t('expiresToday');
    if (d === 1) return t('expiresTomorrow');
    return t('expiresIn', { n: d });
  };
}

export function ExpiryPill({ expiresAt }: { expiresAt: string | null }) {
  const { c } = useTheme();
  const label = useExpiryLabel()(expiresAt);
  const st = expiryStatus(expiresAt);
  const [bg, fg, dot] =
    st === 'expired' || st === 'red'
      ? [c.dangerBg, c.danger, '🔴']
      : st === 'orange'
        ? [c.warningBg, c.warning, '🟠']
        : st === 'green'
          ? [c.successBg, c.success, '🟢']
          : [c.surface, c.textMuted, '⚪'];
  return (
    <View style={{ backgroundColor: bg, borderRadius: radius.pill, paddingHorizontal: space(2.5), paddingVertical: 3, alignSelf: 'flex-start' }}>
      <Txt v="small" color={fg} style={{ fontWeight: '700' }}>
        {dot} {label}
      </Txt>
    </View>
  );
}

const QUICK: { key: TKey; days: number | null }[] = [
  { key: 'dateToday', days: 0 },
  { key: 'dateTomorrow', days: 1 },
  { key: 'dateIn3', days: 3 },
  { key: 'dateIn7', days: 7 },
  { key: 'dateIn14', days: 14 },
  { key: 'dateIn30', days: 30 },
  { key: 'dateNone', days: null },
];

/** JJ/MM/AAAA -> YYYY-MM-DD, ou null si invalide */
export function parseUserDate(s: string): string | null {
  const m = s.trim().match(/^(\d{1,2})[/.-](\d{1,2})[/.-](\d{2,4})$/);
  if (!m) return null;
  const day = Number(m[1]);
  const month = Number(m[2]);
  let year = Number(m[3]);
  if (year < 100) year += 2000;
  const d = new Date(year, month - 1, day);
  if (d.getFullYear() !== year || d.getMonth() !== month - 1 || d.getDate() !== day) return null;
  return toISODate(d);
}

/** Choix rapide de date sans sélecteur natif : puces + saisie libre JJ/MM/AAAA */
export function DateChooser({ value, onChange }: { value: string | null; onChange: (iso: string | null) => void }) {
  const { c } = useTheme();
  const { t } = useI18n();
  const [custom, setCustom] = useState('');
  const [error, setError] = useState(false);
  const today = todayISO();
  return (
    <View>
      <Txt v="label" muted style={{ marginBottom: space(2) }}>
        {t('expiryDate')}
      </Txt>
      <View style={ui.wrap}>
        {QUICK.map((q) => {
          const iso = q.days === null ? null : addDays(today, q.days);
          return <Chip key={q.key} label={t(q.key)} selected={value === iso} onPress={() => onChange(iso)} />;
        })}
      </View>
      <TextInput
        value={custom}
        onChangeText={(s) => {
          setCustom(s);
          const iso = parseUserDate(s);
          setError(s.length >= 8 && !iso);
          if (iso) onChange(iso);
        }}
        placeholder={t('dateCustom')}
        placeholderTextColor={c.textMuted}
        keyboardType="numbers-and-punctuation"
        accessibilityLabel={t('dateCustom')}
        maxFontSizeMultiplier={MAX_FONT_SCALE}
        style={{
          marginTop: space(3),
          borderWidth: 1,
          borderColor: error ? c.danger : c.border,
          borderRadius: radius.md,
          padding: space(3),
          color: c.text,
          fontSize: 16,
          minHeight: 48,
        }}
      />
      {error && (
        <Txt v="small" color={c.danger} style={{ marginTop: space(1) }} accessibilityLiveRegion="polite">
          {t('dateInvalid')}
        </Txt>
      )}
    </View>
  );
}
