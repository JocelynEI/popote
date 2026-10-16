import { router } from 'expo-router';
import { type ReactNode, useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { DishArt } from '../../components/Dish';
import { Icon } from '../../components/Icon';
import { Button, IconButton, Screen, Txt } from '../../components/ui';
import { INGREDIENT_BY_ID } from '../../data/ingredients';
import { ingredientName, recentlyCookedMap } from '../../db/repo';
import { useAllRecipes, useData, useFridge } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { homeCards, namesSentence, pantryIdeas, quickIdeas } from '../../logic/home';
import type { RecipeMatch } from '../../logic/matching';
import { usePremium } from '../../services/premium';
import { getRecipeEngine } from '../../services/recipeEngine';
import { useSettings } from '../../state/settings';
import { FONTS, radius, shadow, space, TOUCH, useTheme } from '../../theme/theme';

const GUTTER = space(5);

/**
 * Accueil en cartes (cahier des charges, 3.2), ordre donné par `homeCards` :
 * à finir vite → tout de suite → « Ajouter ce que j'ai » → remplir mon frigo.
 * Frigo vide : « Ajouter ce que j'ai » d'abord, puis des idées avec trois fois rien.
 */
export default function HomeScreen() {
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const { settings, update } = useSettings();
  const { isPremium } = usePremium();
  const fridge = useFridge();
  const recipes = useAllRecipes();
  const recent = useData(recentlyCookedMap);
  const [matches, setMatches] = useState<RecipeMatch[]>([]);

  useEffect(() => {
    if (settings.welcomeSeen && settings.prefsDone) return;
    // 1er lancement : présentation par Frigo, puis préférences (facultatives)
    const id = setTimeout(() => router.push(settings.welcomeSeen ? '/preferences' : '/welcome'), 300);
    return () => clearTimeout(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // idées à partir de tout le frigo (même moteur que l'écran des idées)
  useEffect(() => {
    let alive = true;
    getRecipeEngine()
      .suggest({
        recipes,
        available: fridge.ids,
        filters: { maxTime: null, difficulty: null, course: null, diets: settings.diets, allergies: settings.allergies, dislikes: settings.dislikes, tools: settings.tools },
        urgent: fridge.urgent,
        recentlyCooked: recent,
      })
      .then((res) => alive && setMatches(res))
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [recipes, fridge.ids, fridge.urgent, recent, settings.diets, settings.allergies, settings.dislikes, settings.tools]);

  const cards = homeCards({ fridgeEmpty: fridge.items.length === 0, urgentCount: fridge.urgentItems.length });
  const now = quickIdeas(matches, isPremium);
  const pantry = useMemo(() => pantryIdeas(recipes), [recipes]);
  const openCount = matches.filter((m) => isPremium || !m.recipe.premium).length;
  const urgentNames = fridge.urgentItems.map((i) => ingredientName(i.ingredient_id, i.custom_name, lang));
  const ingName = (id: string) => (INGREDIENT_BY_ID[id] ? l(INGREDIENT_BY_ID[id].name) : id);
  const sentence = (names: string[]) => namesSentence(names, { and: t('and'), others: (n) => t('andOthers', { n }) });

  const openRecipe = (m: RecipeMatch) => router.push({ pathname: '/recipe/[id]', params: { id: m.recipe.id } });

  const timeAndLevel = (m: RecipeMatch) => `${t('minutes', { n: m.recipe.time })} · ${t(m.recipe.difficulty === 1 ? 'difficultyEasy' : 'difficultyMedium')}`;

  const blocks: Record<string, ReactNode> = {
    urgent: (
      <Pressable
        key="urgent"
        accessibilityRole="button"
        accessibilityLabel={`${t('urgentCardTitle')} : ${sentence(urgentNames)}. ${t('urgentCardLink')}`}
        onPress={() => router.push('/empty-fridge')}
        style={({ pressed }) => [styles.card, { backgroundColor: c.accentSoft, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
      >
        <Txt v="label" color={c.accentText}>
          ⏳ {t('urgentCardTitle')}
        </Txt>
        <Txt style={{ marginTop: space(2), fontWeight: '600' }}>{sentence(urgentNames)}</Txt>
        <Txt v="small" color={c.accentText} style={{ marginTop: space(3), fontWeight: '700' }}>
          {t('urgentCardLink')} →
        </Txt>
      </Pressable>
    ),
    now: (
      <View key="now" style={[styles.card, { backgroundColor: c.surface }, shadow(c, 1)]}>
        <Txt v="label" color={c.primaryText}>
          {now.complete ? t('nowTitle') : t('nowTitleAlmost')}
        </Txt>
        {now.ideas.map((m, i) => (
          <RecipeRow key={m.recipe.id} first={i === 0} onPress={() => openRecipe(m)} m={m} meta={m.missing.length ? t('badgeMissing', { list: m.missing.map(ingName).join(', ') }) : timeAndLevel(m)} />
        ))}
        {openCount > 0 && (
          <Pressable accessibilityRole="button" onPress={() => router.push({ pathname: '/results', params: { fridge: '1' } })} style={styles.link} hitSlop={6}>
            <Txt v="small" color={c.primaryText} style={{ fontWeight: '700' }}>
              {t('seeAllIdeas', { n: openCount })} →
            </Txt>
          </Pressable>
        )}
      </View>
    ),
    add: <Button key="add" title={t('addWhatIHave')} icon="add" onPress={() => router.push('/add')} style={{ minHeight: 60, marginBottom: space(4) }} />,
    pantry: (
      <View key="pantry" style={[styles.card, { backgroundColor: c.surface }, shadow(c, 1)]}>
        <Txt v="label" color={c.primaryText}>
          {t('pantryTitle')}
        </Txt>
        {pantry.map((m, i) => (
          <RecipeRow key={m.recipe.id} first={i === 0} onPress={() => openRecipe(m)} m={m} meta={`${t('minutes', { n: m.recipe.time })} · ${sentence([...m.missing.map(ingName), t('yourPantry')])}`} />
        ))}
      </View>
    ),
    fill: (
      <Pressable
        key="fill"
        accessibilityRole="button"
        onPress={() => router.push('/quick-fill')}
        style={({ pressed }) => [styles.tile, { backgroundColor: c.primarySoft, transform: [{ scale: pressed ? 0.98 : 1 }] }]}
      >
        <Icon name="grid-outline" size={24} color={c.primaryText} />
        <View style={{ flex: 1, marginLeft: space(3) }}>
          <Txt style={{ fontWeight: '700' }}>{t('fillFridge')}</Txt>
          <Txt v="small" muted>
            {t('fillFridgeHint')}
          </Txt>
        </View>
        <Icon name="chevron-forward" size={20} color={c.primaryText} />
      </Pressable>
    ),
  };

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: space(10) }}>
        {/* En-tête : progrès, logo, réglages */}
        <View style={styles.header}>
          <IconButton icon="trophy-outline" label={t('progress')} onPress={() => router.push('/progress')} color={c.primaryText} size={22} style={styles.headerBtn} />
          <View style={styles.logo} accessibilityRole="header" accessible accessibilityLabel="Mypopote">
            <Icon name="pot" size={22} color={c.accent} />
            <Txt style={{ fontFamily: FONTS.display, fontSize: 26, lineHeight: 32, marginLeft: 6 }} color={c.primaryText}>
              Mypopote
            </Txt>
          </View>
          <IconButton icon="user" label={t('profile')} onPress={() => router.push('/settings')} color={c.primaryText} size={22} style={styles.headerBtn} />
        </View>

        <View style={{ paddingHorizontal: GUTTER }}>
          <Txt v="display" style={{ marginTop: space(4), marginBottom: fridge.items.length ? space(5) : space(2) }}>
            {t('homeTitle')}
          </Txt>
          {fridge.items.length === 0 && (
            <Txt muted style={{ marginBottom: space(5) }}>
              {t('homeSubtitle')}
            </Txt>
          )}

          {cards.map((k) => blocks[k])}

          {!settings.privacyNoticeSeen && (
            <Pressable accessibilityRole="button" accessibilityHint={t('close')} onPress={() => update({ privacyNoticeSeen: true })} style={styles.privacy}>
              <Txt v="small" muted style={{ flex: 1 }}>
                {t('privacyBadge')}
              </Txt>
              <Icon name="close" size={16} color={c.textMuted} />
            </Pressable>
          )}
        </View>
      </ScrollView>
    </Screen>
  );
}

/** Une recette dans une carte de l'accueil : vignette, titre, une ligne d'infos. */
function RecipeRow({ m, meta, first, onPress }: { m: RecipeMatch; meta: string; first: boolean; onPress: () => void }) {
  const { c } = useTheme();
  const { t, l } = useI18n();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${l(m.recipe.title)}. ${meta}`}
      onPress={onPress}
      style={({ pressed }) => [styles.recipeRow, { borderTopColor: c.border, borderTopWidth: first ? 0 : 1, opacity: pressed ? 0.7 : 1 }]}
    >
      <DishArt recipe={m.recipe} size={56} radius={14} padding={0.1} />
      <View style={{ flex: 1, marginLeft: space(3) }}>
        <Txt style={{ fontFamily: FONTS.display, fontSize: 17, lineHeight: 21 }} numberOfLines={2}>
          {l(m.recipe.title)}
        </Txt>
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', marginTop: 3, gap: space(2) }}>
          <Txt v="small" muted>
            {meta}
          </Txt>
          {m.usedUrgent.length > 0 && (
            <View style={[styles.badge, { backgroundColor: c.accentSoft }]}>
              <Txt v="small" color={c.accentText} style={{ fontWeight: '700', fontSize: 12 }}>
                {t('badgeAntiWaste')}
              </Txt>
            </View>
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space(3), marginTop: space(2) },
  headerBtn: { width: TOUCH, height: TOUCH },
  logo: { flexDirection: 'row', alignItems: 'center' },
  card: { borderRadius: radius.xl, padding: space(4), marginBottom: space(4) },
  recipeRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: space(2.5), minHeight: TOUCH },
  badge: { borderRadius: radius.pill, paddingHorizontal: space(2), paddingVertical: 1 },
  link: { marginTop: space(2), minHeight: TOUCH, justifyContent: 'center' },
  tile: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.xl, padding: space(4), minHeight: 72 },
  privacy: { flexDirection: 'row', alignItems: 'center', gap: space(2), marginTop: space(6), paddingVertical: space(2) },
});
