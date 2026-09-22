import { Icon, type IconName } from './Icon';
import * as Haptics from 'expo-haptics';
import type { ReactNode } from 'react';
import {
  ActivityIndicator,
  Pressable,
  type StyleProp,
  StyleSheet,
  Switch,
  Text,
  type TextProps,
  type TextStyle,
  View,
  type ViewStyle,
} from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';
import { FONTS, radius, shadow, space, TOUCH, useTheme } from '../theme/theme';

/** Plafond de mise à l'échelle du texte : suit le réglage du téléphone sans casser la mise en page. */
export const MAX_FONT_SCALE = 1.6;

export function haptic(kind: 'light' | 'success' = 'light') {
  if (kind === 'success') Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success).catch(() => {});
  else Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
}

export function Screen({ children, edges = ['top'], style }: { children: ReactNode; edges?: Edge[]; style?: StyleProp<ViewStyle> }) {
  const { c } = useTheme();
  return (
    <SafeAreaView edges={edges} style={[{ flex: 1, backgroundColor: c.bg }, style]}>
      {children}
    </SafeAreaView>
  );
}

type Variant = 'display' | 'h1' | 'h2' | 'h3' | 'body' | 'small' | 'label';
const VARIANTS: Record<Variant, TextStyle> = {
  display: { fontSize: 34, lineHeight: 40, fontWeight: '700', letterSpacing: -0.5 },
  h1: { fontSize: 28, fontWeight: '700', lineHeight: 34, letterSpacing: -0.3 },
  h2: { fontSize: 22, fontWeight: '700', lineHeight: 28 },
  h3: { fontSize: 18, fontWeight: '600', lineHeight: 24 },
  body: { fontSize: 16, lineHeight: 23 },
  small: { fontSize: 14, lineHeight: 19 },
  label: { fontSize: 12, fontWeight: '700', letterSpacing: 0.8, textTransform: 'uppercase' },
};
const DISPLAY: Variant[] = ['display', 'h1', 'h2', 'h3'];

/** Choisit la bonne police (Fraunces pour les titres, Nunito pour le texte) selon la graisse demandée. */
function fontFor(v: Variant, weight: TextStyle['fontWeight']): string {
  const w = Number(weight ?? 400);
  if (DISPLAY.includes(v)) return w >= 700 ? FONTS.display : FONTS.displaySemi;
  if (w >= 700) return FONTS.bodyBold;
  if (w >= 600) return FONTS.bodySemi;
  if (w >= 500) return FONTS.bodyMedium;
  return FONTS.body;
}

export function Txt({
  v = 'body',
  muted,
  color,
  style,
  ...rest
}: TextProps & { v?: Variant; muted?: boolean; color?: string }) {
  const { c } = useTheme();
  const flat = { ...(StyleSheet.flatten([VARIANTS[v], style]) ?? {}) };
  // grands emojis / gros chiffres : on évite que la hauteur de ligne coupe le texte
  if (flat.fontSize && (!flat.lineHeight || flat.lineHeight < flat.fontSize * 1.15)) flat.lineHeight = Math.round(flat.fontSize * 1.25);
  const fontFamily = flat.fontFamily ?? fontFor(v, flat.fontWeight);
  return (
    <Text
      maxFontSizeMultiplier={MAX_FONT_SCALE}
      {...rest}
      style={[flat, { fontFamily, fontWeight: undefined, color: color ?? flat.color ?? (muted ? c.textMuted : c.text) }]}
    />
  );
}


export function Button({
  title,
  onPress,
  kind = 'primary',
  icon,
  disabled,
  loading,
  style,
  a11yHint,
  small,
}: {
  title: string;
  onPress: () => void;
  kind?: 'primary' | 'secondary' | 'ghost' | 'danger';
  icon?: IconName;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  a11yHint?: string;
  small?: boolean;
}) {
  const { c } = useTheme();
  // CTA principal = Zeste d'Orange (texte Gris Poivre pour le contraste) ; secondaire = sauge douce
  const bg = kind === 'primary' ? c.accent : kind === 'secondary' ? c.primarySoft : kind === 'danger' ? c.dangerBg : 'transparent';
  const fg = kind === 'primary' ? c.onAccent : kind === 'danger' ? c.danger : c.primaryText;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityHint={a11yHint}
      accessibilityState={{ disabled: !!disabled || !!loading }}
      disabled={disabled || loading}
      onPress={() => {
        haptic();
        onPress();
      }}
      style={({ pressed }) => [
        styles.btn,
        small && styles.btnSmall,
        { backgroundColor: bg, opacity: disabled ? 0.45 : 1, transform: [{ scale: pressed ? 0.97 : 1 }] },
        kind === 'primary' && !disabled && shadow(c, 1),
        kind === 'ghost' && { borderWidth: 1.5, borderColor: c.border },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={fg} />
      ) : (
        <>
          {icon && <Icon name={icon} size={small ? 18 : 20} color={fg} style={{ marginRight: 8 }} />}
          <Txt v={small ? 'small' : 'body'} style={{ fontWeight: '700', textAlign: 'center' }} color={fg}>
            {title}
          </Txt>
        </>
      )}
    </Pressable>
  );
}

export function IconButton({
  icon,
  label,
  onPress,
  color,
  size = 24,
  style,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}) {
  const { c } = useTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={8}
      onPress={() => {
        haptic();
        onPress();
      }}
      style={({ pressed }) => [styles.iconBtn, { opacity: pressed ? 0.6 : 1 }, style]}
    >
      <Icon name={icon} size={size} color={color ?? c.text} />
    </Pressable>
  );
}

export function Chip({
  label,
  selected,
  onPress,
  onRemove,
  removeLabel,
  tone,
  locked,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  removeLabel?: string;
  tone?: 'danger' | 'warning' | 'success';
  locked?: boolean;
}) {
  const { c } = useTheme();
  const toneBg = tone === 'danger' ? c.dangerBg : tone === 'warning' ? c.warningBg : tone === 'success' ? c.successBg : undefined;
  const toneFg = tone === 'danger' ? c.danger : tone === 'warning' ? c.warning : tone === 'success' ? c.success : undefined;
  const bg = selected ? c.primarySoft : toneBg ?? c.surface;
  const fg = selected ? c.text : toneFg ?? c.text;
  const content = (
    <>
      {locked && <Icon name="lock-closed" size={13} color={fg} style={{ marginRight: 4 }} />}
      <Txt v="small" color={fg} style={{ fontWeight: '600' }}>
        {label}
      </Txt>
      {onRemove && (
        <Pressable accessibilityRole="button" accessibilityLabel={removeLabel ?? label} hitSlop={10} onPress={onRemove} style={{ marginLeft: 6 }}>
          <Icon name="close" size={16} color={fg} strokeWidth={2.5} />
        </Pressable>
      )}
    </>
  );
  if (!onPress) return <View style={[styles.chip, { backgroundColor: bg, borderColor: selected ? c.primary : tone ? bg : c.border }]}>{content}</View>;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: !!selected }}
      accessibilityLabel={label}
      onPress={() => {
        haptic();
        onPress();
      }}
      style={({ pressed }) => [styles.chip, { backgroundColor: bg, borderColor: selected ? c.primary : c.border, opacity: pressed ? 0.8 : 1 }]}
    >
      {content}
    </Pressable>
  );
}

export function Card({ children, style, onPress, a11yLabel }: { children: ReactNode; style?: StyleProp<ViewStyle>; onPress?: () => void; a11yLabel?: string }) {
  const { c } = useTheme();
  const base = [styles.card, { backgroundColor: c.surface }, shadow(c, 1), style];
  if (!onPress) return <View style={base}>{children}</View>;
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={a11yLabel} onPress={onPress} style={({ pressed }) => [...base, { transform: [{ scale: pressed ? 0.98 : 1 }] }]}>
      {children}
    </Pressable>
  );
}

export function Section({ title, children, right }: { title: string; children: ReactNode; right?: ReactNode }) {
  return (
    <View style={{ marginTop: space(6) }}>
      <View style={styles.sectionHead}>
        <Txt v="h2" accessibilityRole="header" style={{ flex: 1 }}>
          {title}
        </Txt>
        {right}
      </View>
      {children}
    </View>
  );
}

export function EmptyState({ emoji, illo, title, text, children }: { emoji?: string; illo?: ReactNode; title: string; text?: string; children?: ReactNode }) {
  return (
    <View style={styles.empty}>
      {illo ?? (
        <Text style={{ fontSize: 56 }} accessibilityElementsHidden importantForAccessibility="no">
          {emoji}
        </Text>
      )}
      <Txt v="h2" style={{ textAlign: 'center', marginTop: space(4) }}>
        {title}
      </Txt>
      {text ? (
        <Txt muted style={{ textAlign: 'center', marginTop: space(2) }}>
          {text}
        </Txt>
      ) : null}
      <View style={{ marginTop: space(5), alignSelf: 'stretch', gap: space(3) }}>{children}</View>
    </View>
  );
}

export function ToggleRow({ label, value, onChange, hint }: { label: string; value: boolean; onChange: (v: boolean) => void; hint?: string }) {
  const { c } = useTheme();
  return (
    <View style={styles.row}>
      <View style={{ flex: 1, paddingRight: space(3) }}>
        <Txt>{label}</Txt>
        {hint ? (
          <Txt v="small" muted>
            {hint}
          </Txt>
        ) : null}
      </View>
      <Switch
        accessibilityLabel={label}
        ios_backgroundColor={c.border}
        value={value}
        onValueChange={(v) => {
          haptic();
          onChange(v);
        }}
        trackColor={{ true: c.primary, false: c.border }}
        thumbColor="#FFFFFF"
      />
    </View>
  );
}

export function Stepper({ value, onChange, min = 1, max = 20, minusLabel, plusLabel }: { value: number; onChange: (n: number) => void; min?: number; max?: number; minusLabel: string; plusLabel: string }) {
  const { c } = useTheme();
  return (
    <View style={[styles.stepper, { borderColor: c.border }]} accessibilityRole="adjustable" accessibilityValue={{ now: value, min, max }}>
      <IconButton icon="remove" label={minusLabel} onPress={() => onChange(Math.max(min, value - 1))} color={c.primaryText} />
      <Txt v="h3" style={{ minWidth: 32, textAlign: 'center' }}>
        {value}
      </Txt>
      <IconButton icon="add" label={plusLabel} onPress={() => onChange(Math.min(max, value + 1))} color={c.primaryText} />
    </View>
  );
}

export const styles = StyleSheet.create({
  btn: {
    minHeight: TOUCH + 8,
    borderRadius: radius.pill,
    paddingHorizontal: space(5),
    paddingVertical: space(3),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnSmall: { minHeight: TOUCH, paddingHorizontal: space(4), paddingVertical: space(2) },
  iconBtn: { minWidth: TOUCH, minHeight: TOUCH, alignItems: 'center', justifyContent: 'center' },
  chip: {
    minHeight: 38,
    paddingHorizontal: space(3),
    paddingVertical: space(1.5),
    borderRadius: radius.pill,
    borderWidth: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  card: { borderRadius: radius.lg, padding: space(4) },
  sectionHead: { flexDirection: 'row', alignItems: 'center', marginBottom: space(3) },
  empty: { alignItems: 'center', paddingVertical: space(8), paddingHorizontal: space(4) },
  row: { flexDirection: 'row', alignItems: 'center', minHeight: TOUCH + 12, paddingVertical: space(2) },
  stepper: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderRadius: radius.pill, paddingHorizontal: space(1) },
  wrap: { flexDirection: 'row', flexWrap: 'wrap', gap: space(2) },
});
