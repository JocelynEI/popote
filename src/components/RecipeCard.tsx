import { Icon } from './Icon';
import { useEffect, useRef } from 'react';
import { Animated, Pressable, StyleSheet, View } from 'react-native';
import { ingredientDisplay } from '../data/ingredients';
import type { Recipe } from '../data/types';
import { useI18n } from '../i18n';
import type { RecipeMatch } from '../logic/matching';
import { radius, shadow, space, useTheme } from '../theme/theme';
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
  const pop = useRef(new Animated.Value(complete && !reduceMotion ? 0.6 : 1)).current;
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
  feedBadges: { position: 'absolute', left: space(3), bottom: space(3), right: space(3), flexDirection: 'row', flexWrap: 'wrap', gap: space(1.5) },
  badge: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.pill, paddingHorizontal: space(2.5), paddingVertical: 5 },
  fav: { position: 'absolute', top: space(3), right: space(3), width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  lock: { position: 'absolute', top: space(3), left: space(3), flexDirection: 'row', alignItems: 'center', borderRadius: radius.pill, paddingHorizontal: space(2.5), paddingVertical: 5 },
  row: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.lg, padding: space(2.5), marginBottom: space(3) },
});

/**
 * Carte du feed de résultats (spéc. UX/UI v2) :
 * image vue de dessus sur la moitié haute, badges flottants, favori en haut à droite, titre gourmand.
 */
export function FeedRecipeCard({
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
  const missingNames = missing.map((id) => ingredientDisplay(id, lang, recipe.ingredients.find((x) => x.id === id)?.label).name).join(', ');
  return (
    <View style={[{ borderRadius: radius.lg, backgroundColor: c.surface, marginBottom: space(5) }, shadow(c, 1)]}>
      <Pressable accessibilityRole="button" accessibilityLabel={a11y} onPress={() => (haptic(), onPress())} style={({ pressed }) => [{ transform: [{ scale: pressed ? 0.99 : 1 }] }]}>
        <View style={{ borderTopLeftRadius: radius.lg, borderTopRightRadius: radius.lg, overflow: 'hidden' }}>
          <DishArt recipe={recipe} radius={0} padding={0.06} style={{ height: 200, width: '100%' }} />
          {/* badges flottants */}
          <View style={styles.feedBadges}>
            {match && missing.length === 0 && <Badge bg={c.surface} fg={c.herb} icon="checkmark" label={t('badgeMatch')} />}
            {missing.length > 0 && <Badge bg={c.surface} fg={c.warning} label={t(missing.length === 1 ? 'badgeMissingOne' : 'badgeMissingN', { n: missing.length })} />}
            {recipe.time <= 15 && <Badge bg={c.accent} fg={c.onAccent} icon="zap" label={t('badgeQuick', { n: recipe.time })} />}
            {!!match?.usedUrgent.length && <Badge bg={c.surface} fg={c.danger} label={`⏳ ${t('badgeAntiWaste')}`} />}
          </View>
          {locked && (
            <View style={[styles.lock, { backgroundColor: c.surface }]}>
              <Icon name="lock-closed" size={14} color={c.text} />
              <Txt v="small" style={{ fontWeight: '700', marginLeft: 4 }}>
                Premium
              </Txt>
            </View>
          )}
        </View>
        <View style={{ padding: space(4), paddingTop: space(3) }}>
          <Txt v="h3" numberOfLines={2} style={{ fontSize: 20, lineHeight: 25, paddingRight: space(8) }}>
            {title}
          </Txt>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space(1.5), marginTop: space(1.5) }}>
            <Icon name="clock" size={15} color={c.textMuted} />
            <Txt v="small" muted>
              {t('minutes', { n: recipe.time })} · {recipe.difficulty === 1 ? t('difficultyEasy') : t('difficultyMedium')}
            </Txt>
          </View>
          {missing.length > 0 && (
            <Txt v="small" muted numberOfLines={1} style={{ marginTop: space(1) }}>
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
          hitSlop={8}
          style={[styles.fav, { backgroundColor: c.surface }, shadow(c, 1)]}
        >
          <Icon name={favorite ? 'heart' : 'heart-outline'} size={20} color={favorite ? c.accentText : c.text} />
        </Pressable>
      )}
    </View>
  );
}

function Badge({ label, bg, fg, icon }: { label: string; bg: string; fg: string; icon?: 'checkmark' | 'zap' }) {
  return (
    <View style={[styles.badge, { backgroundColor: bg }]}>
      {icon && <Icon name={icon} size={13} color={fg} strokeWidth={2.5} />}
      <Txt v="small" color={fg} style={{ fontWeight: '700', fontSize: 12.5, marginLeft: icon ? 4 : 0 }}>
        {label}
      </Txt>
    </View>
  );
}
