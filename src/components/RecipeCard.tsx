import { Icon } from './Icon';
import { useEffect, useState } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { ingredientDisplay } from '../data/ingredients';
import type { Recipe } from '../data/types';
import { useI18n } from '../i18n';
import type { RecipeMatch } from '../logic/matching';
import { lowerFirst } from '../logic/results';
import { FONTS, radius, shadow, space, useTheme } from '../theme/theme';
import { DishArt } from './Dish';
import { haptic, Txt } from './ui';

interface Props {
  recipe: Recipe;
  match?: RecipeMatch;
  locked?: boolean;
  onPress: () => void;
}

function useCardText(recipe: Recipe, match?: RecipeMatch, locked?: boolean) {
  const { t, l, lang } = useI18n();
  const complete = !!match && match.missing.length === 0;
  const missingNames = match?.missing.map((id) => ingredientDisplay(id, lang, recipe.ingredients.find((x) => x.id === id)?.label).name).join(', ');
  const status = match ? (complete ? t('badgeComplete') : t('badgeMissing', { list: missingNames ?? '' })) : null;
  const a11y = [
    locked ? t('lockedRecipe') : null,
    l(recipe.title),
    t('minutes', { n: recipe.time }),
    recipe.difficulty === 1 ? t('difficultyEasy') : t('difficultyMedium'),
    status,
    match?.usedUrgent.length ? t('badgeUrgent', { n: match.usedUrgent.length }) : null,
  ]
    .filter(Boolean)
    .join('. ');
  return { complete, status, a11y, title: l(recipe.title), t };
}

function StatusLine({ match, complete, status }: { match?: RecipeMatch; complete: boolean; status: string | null }) {
  const { c, reduceMotion } = useTheme();
  const [pop] = useState(() => new Animated.Value(complete && !reduceMotion ? 0.6 : 1));
  useEffect(() => {
    if (complete && !reduceMotion) Animated.spring(pop, { toValue: 1, friction: 4, useNativeDriver: true }).start();
  }, [complete, reduceMotion, pop]);
  if (!match || !status) return null;
  return (
    <Animated.View style={[styles.status, { backgroundColor: complete ? c.successBg : c.warningBg, transform: [{ scale: pop }] }]}>
      <Txt v="small" numberOfLines={1} color={complete ? c.success : c.warning} style={{ fontWeight: '800', fontSize: 12.5 }}>
        {status}
      </Txt>
    </Animated.View>
  );
}

/** Petite étiquette posée sur l'illustration */
function Tag({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return <View style={[styles.tag, { backgroundColor: dark ? 'rgba(43,29,20,0.85)' : 'rgba(255,255,255,0.92)' }]}>{children}</View>;
}

/** Carte verticale (grille 2 colonnes) */
export function RecipeTile({ recipe, match, locked, onPress, width }: Props & { width: number }) {
  const { c } = useTheme();
  const { complete, status, a11y, title, t } = useCardText(recipe, match, locked);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={() => (haptic(), onPress())}
      style={({ pressed }) => [{ width, transform: [{ scale: pressed ? 0.97 : 1 }] }]}
    >
      <View style={[{ borderRadius: radius.lg }, shadow(c, 1)]}>
        <DishArt recipe={recipe} size={width} radius={radius.lg} padding={0.1} />
        <View style={styles.tagRow}>
          <Tag>
            <Txt v="small" color="#2B1D14" style={{ fontWeight: '800', fontSize: 12 }}>
              ⏱ {t('minutes', { n: recipe.time })}
            </Txt>
          </Tag>
          {locked && (
            <Tag dark>
              <Icon name="lock-closed" size={12} color="#FFFFFF" />
            </Tag>
          )}
        </View>
        {match && match.usedUrgent.length > 0 && (
          <View style={[styles.urgentDot, { backgroundColor: c.danger }]}>
            <Txt v="small" color="#FFFFFF" style={{ fontWeight: '800', fontSize: 11 }}>
              ⏳ {match.usedUrgent.length}
            </Txt>
          </View>
        )}
      </View>
      <Txt v="h3" numberOfLines={2} style={{ marginTop: space(2.5), fontSize: 17, lineHeight: 21 }}>
        {title}
      </Txt>
      <StatusLine match={match} complete={complete} status={status} />
    </Pressable>
  );
}

/** Grande carte « L'idée du soir » */
export function HeroRecipe({ recipe, match, onPress, label }: Props & { label: string }) {
  const { c } = useTheme();
  const { complete, status, a11y, title, t } = useCardText(recipe, match);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${label}. ${a11y}`}
      onPress={() => (haptic(), onPress())}
      style={({ pressed }) => [{ borderRadius: radius.xl, backgroundColor: c.surface, transform: [{ scale: pressed ? 0.98 : 1 }] }, shadow(c, 2)]}
    >
      <View style={styles.hero}>
      <DishArt recipe={recipe} radius={0} style={{ height: 210, width: '100%' }} />
      <View style={{ padding: space(4) }}>
        <Txt v="label" color={c.primaryText}>
          ✨ {label}
        </Txt>
        <Txt v="h1" numberOfLines={2} style={{ marginTop: space(1) }}>
          {title}
        </Txt>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: space(2), marginTop: space(2), flexWrap: 'wrap' }}>
          <Txt v="small" muted style={{ fontWeight: '700' }}>
            ⏱ {t('minutes', { n: recipe.time })} · {recipe.difficulty === 1 ? t('difficultyEasy') : t('difficultyMedium')}
          </Txt>
          <StatusLine match={match} complete={complete} status={status} />
        </View>
      </View>
      </View>
    </Pressable>
  );
}

/** Carte horizontale (listes : favoris, historique, vider le frigo…) */
export function RecipeCard({ recipe, match, locked, onPress }: Props) {
  const { c } = useTheme();
  const { complete, status, a11y, title, t } = useCardText(recipe, match, locked);
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={a11y}
      onPress={() => (haptic(), onPress())}
      style={({ pressed }) => [styles.row, { backgroundColor: c.surface, transform: [{ scale: pressed ? 0.98 : 1 }] }, shadow(c, 1)]}
    >
      <DishArt recipe={recipe} size={88} radius={radius.md} padding={0.08} />
      <View style={{ flex: 1, marginLeft: space(3) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {locked && <Icon name="lock-closed" size={14} color={c.accentText} style={{ marginRight: 4 }} />}
          <Txt v="h3" numberOfLines={2} style={{ flex: 1 }}>
            {title}
          </Txt>
        </View>
        <Txt v="small" muted style={{ fontWeight: '700', marginTop: 2 }}>
          ⏱ {t('minutes', { n: recipe.time })} · {recipe.difficulty === 1 ? t('difficultyEasy') : t('difficultyMedium')}
        </Txt>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: space(1.5) }}>
          <StatusLine match={match} complete={complete} status={status} />
          {match && match.usedUrgent.length > 0 && (
            <View style={[styles.status, { backgroundColor: c.dangerBg }]}>
              <Txt v="small" color={c.danger} style={{ fontWeight: '800', fontSize: 12.5 }}>
                ⏳ {t('badgeUrgent', { n: match.usedUrgent.length })}
              </Txt>
            </View>
          )}
        </View>
      </View>
      <Icon name="chevron-forward" size={20} color={c.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  status: { alignSelf: 'flex-start', borderRadius: radius.pill, paddingHorizontal: space(2.5), paddingVertical: 3, marginTop: space(1.5), maxWidth: '100%' },
  tagRow: { position: 'absolute', top: space(2.5), left: space(2.5), right: space(2.5), flexDirection: 'row', justifyContent: 'space-between' },
  tag: { borderRadius: radius.pill, paddingHorizontal: space(2.5), paddingVertical: 4, flexDirection: 'row', alignItems: 'center' },
  urgentDot: { position: 'absolute', bottom: space(2.5), right: space(2.5), borderRadius: radius.pill, paddingHorizontal: space(2), paddingVertical: 3 },
  hero: { borderRadius: radius.xl, overflow: 'hidden' },
  compact: { borderRadius: radius.md, marginBottom: space(2.5) },
  compactInner: { flexDirection: 'row', alignItems: 'center', padding: space(2.5), minHeight: 92 },
  compactFav: { position: 'absolute', top: 0, right: 0, width: 44, height: 44, alignItems: 'center', justifyContent: 'center' },
  pill: { borderRadius: radius.pill, paddingHorizontal: space(2), paddingVertical: 1 },
  row: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.lg, padding: space(2.5), marginBottom: space(3) },
});

/**
 * Carte compacte de l'écran des idées (V1.4) : vignette de 72 px, titre sur deux lignes au plus,
 * temps et niveau, badges, ce qui manque, favori. Le grand visuel reste sur la fiche recette.
 */
export function CompactRecipeCard({
  recipe,
  match,
  locked,
  onPress,
  favorite,
  onToggleFavorite,
}: Props & { favorite?: boolean; onToggleFavorite?: () => void }) {
  const { c } = useTheme();
  const { a11y, title, t } = useCardText(recipe, match, locked);
  const { lang } = useI18n();
  const missing = match?.missing ?? [];
  const dimmed = missing.length > 0;
  const missingNames = missing.map((id) => lowerFirst(ingredientDisplay(id, lang, recipe.ingredients.find((x) => x.id === id)?.label).name)).join(', ');
  return (
    <View style={[styles.compact, { backgroundColor: c.surface }, shadow(c, 1)]}>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={a11y}
        onPress={() => (haptic(), onPress())}
        style={({ pressed }) => [styles.compactInner, { transform: [{ scale: pressed ? 0.99 : 1 }] }]}
      >
        <DishArt recipe={recipe} size={72} radius={12} padding={0.08} style={{ opacity: dimmed ? 0.45 : 1 }} />
        <View style={{ flex: 1, marginLeft: space(3), paddingRight: onToggleFavorite ? space(8) : 0 }}>
          <Txt numberOfLines={2} color={dimmed ? c.textMuted : undefined} style={{ fontFamily: FONTS.display, fontSize: 17, lineHeight: 21 }}>
            {title}
          </Txt>
          <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: space(1.5), marginTop: space(1) }}>
            <Txt v="small" muted>
              {t('minutes', { n: recipe.time })} · {recipe.difficulty === 1 ? t('difficultyEasy') : t('difficultyMedium')}
            </Txt>
            {!!match?.usedUrgent.length && <Pill bg={c.accentSoft} fg={c.accentText} label={t('badgeAntiWaste')} />}
            {/* un seul badge de mise en avant : anti-gaspi d'abord, sinon rapide */}
            {!dimmed && !match?.usedUrgent.length && recipe.time <= 15 && <Pill bg={c.accent} fg={c.onAccent} label={t('badgeQuickShort')} />}
            {locked && <Pill bg={c.text} fg={c.bg} label={`🔒 ${t('premiumLock')}`} />}
          </View>
          {dimmed && (
            <Txt v="small" color={c.accentText} numberOfLines={2} style={{ marginTop: 3, fontWeight: '600' }}>
              {t('badgeMissing', { list: missingNames })}
            </Txt>
          )}
        </View>
      </Pressable>
      {onToggleFavorite && (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={favorite ? t('favoriteRemove') : t('favoriteAdd')}
          accessibilityState={{ selected: !!favorite }}
          onPress={() => (haptic(), onToggleFavorite())}
          hitSlop={4}
          style={styles.compactFav}
        >
          <Icon name={favorite ? 'heart' : 'heart-outline'} size={20} color={favorite ? c.accentText : c.textMuted} />
        </Pressable>
      )}
    </View>
  );
}

function Pill({ label, bg, fg }: { label: string; bg: string; fg: string }) {
  return (
    <View style={[styles.pill, { backgroundColor: bg }]}>
      <Txt v="small" color={fg} style={{ fontWeight: '700', fontSize: 12 }}>
        {label}
      </Txt>
    </View>
  );
}
