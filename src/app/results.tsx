import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { ScrollView, SectionList, StyleSheet, View } from 'react-native';
import { Illo } from '../components/Dish';
import { MypopoteLoader } from '../components/MypopoteLoader';
import { CompactRecipeCard } from '../components/RecipeCard';
import { useToast } from '../components/Toast';
import { Button, Chip, EmptyState, IconButton, Screen, Txt } from '../components/ui';
import { INGREDIENT_BY_ID } from '../data/ingredients';
import type { Course, Diet, Recipe } from '../data/types';
import { addShopping, listFavorites, recentlyCookedMap, toggleFavorite } from '../db/repo';
import { useAllRecipes, useData, useFridge } from '../hooks/useData';
import { type TKey, useI18n } from '../i18n';
import { searchIngredientsFrom } from '../logic/fridge';
import { groupResults, visibleMatches } from '../logic/results';
import { bestUnlock, type RecipeMatch } from '../logic/matching';
import { getRecipeEngine } from '../services/recipeEngine';
import { usePremium } from '../services/premium';
import { useSettings } from '../state/settings';
import { radius, shadow, space, useTheme } from '../theme/theme';
import { goBack } from '../navigation/goBack';

const DIET_KEYS: Record<Diet, TKey> = { vegetarian: 'dietVegetarian', vegan: 'dietVegan', glutenFree: 'dietGlutenFree', lactoseFree: 'dietLactoseFree' };
const COURSE_KEYS: Record<Course, TKey> = { starter: 'courseStarter', main: 'courseMain', dessert: 'courseDessert' };

/** Écrans 2 et 3 : transition « magique » puis feed des suggestions */
export default function ResultsScreen() {
  const { c, reduceMotion } = useTheme();
  const { t, l } = useI18n();
  const { settings, update } = useSettings();
  const { isPremium } = usePremium();
  const toast = useToast();
  const { ing, fridge: useFridgeParam } = useLocalSearchParams<{ ing?: string; fridge?: string }>();
  const selected = useMemo(() => (ing ? ing.split(',').filter(Boolean) : []), [ing]);
  const recipes = useAllRecipes();
  const fridge = useFridge();
  const recent = useData(recentlyCookedMap);
  const favs = useData(listFavorites);

  const [loading, setLoading] = useState(true);
  const [matches, setMatches] = useState<RecipeMatch[]>([]);
  const [easy, setEasy] = useState(false);
  const [course, setCourse] = useState<Course | null>(null);
  // produits décochés pour cette recherche seulement : le frigo n'est pas modifié
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const toggleExcluded = (id: string) =>
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const available = useMemo(() => {
    const s = new Set(selected);
    if (useFridgeParam === '1') searchIngredientsFrom(fridge.ids, excluded).forEach((id) => s.add(id));
    return s;
  }, [selected, useFridgeParam, fridge.ids, excluded]);
  const fridgeChoices = useMemo(() => [...fridge.ids].filter((id) => INGREDIENT_BY_ID[id]), [fridge.ids]);

  const filters = useMemo(
    () => ({ maxTime: settings.lastMaxTime, difficulty: easy ? (1 as const) : null, course, diets: settings.diets, allergies: settings.allergies, dislikes: settings.dislikes, tools: settings.tools }),
    [settings.lastMaxTime, easy, course, settings.diets, settings.allergies, settings.dislikes, settings.tools],
  );

  // première recherche : animation minimale pour le plaisir (courte si « réduire les animations »)
  const [firstDone, setFirstDone] = useState(false);
  useEffect(() => {
    let alive = true;
    const started = Date.now();
    getRecipeEngine()
      .suggest({ recipes, available, filters, urgent: fridge.urgent, recentlyCooked: recent })
      .then((res) => {
        const wait = firstDone ? 0 : Math.max(0, (reduceMotion ? 300 : 2400) - (Date.now() - started));
        setTimeout(() => {
          if (!alive) return;
          setMatches(res);
          setLoading(false);
          setFirstDone(true);
        }, wait);
      })
      .catch(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [recipes, available, filters, fridge.urgent, recent]); // eslint-disable-line react-hooks/exhaustive-deps

  const visible = useMemo(() => visibleMatches(matches, isPremium), [matches, isPremium]);
  const sections = useMemo(() => {
    const g = groupResults(visible);
    return [
      { key: 'now', title: t('resultsReadyTitle'), data: g.now },
      { key: 'almost', title: t('resultsAlmostTitle'), data: g.almost },
    ].filter((sec) => sec.data.length > 0);
  }, [visible, t]);
  const complete = matches.filter((m) => m.missing.length === 0).length;
  const unlock = complete === 0 ? bestUnlock(matches) : null;

  const open = (r: Recipe) => (r.premium && !isPremium ? router.push('/premium') : router.push({ pathname: '/recipe/[id]', params: { id: r.id, have: selected.join(',') } }));

  if (loading && !firstDone) {
    return (
      <Screen edges={['top', 'bottom']}>
        <MypopoteLoader />
      </Screen>
    );
  }

  const header = (
    <View style={{ paddingHorizontal: space(4) }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: space(2) }}>
        <IconButton icon="arrow-back" label={t('back')} onPress={() => goBack()} style={[styles.round, { backgroundColor: c.surface }, shadow(c, 1)]} color={c.text} />
      </View>
      <Txt v="display" accessibilityRole="header" style={{ marginTop: space(4) }}>
        {t('resultsTitle')}
      </Txt>
      <Txt muted style={{ marginTop: space(1) }}>
        {t('resultsSubtitle', { n: visible.length, k: available.size })}
      </Txt>
      {useFridgeParam === '1' && fridgeChoices.length > 1 && (
        <View style={{ marginTop: space(3) }}>
          <Txt v="small" muted>
            {t('resultsUncheckHint')}
          </Txt>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: space(2), marginHorizontal: -space(4) }} contentContainerStyle={{ gap: space(2), paddingHorizontal: space(4) }}>
            {fridgeChoices.map((id) => (
              <Chip
                key={id}
                label={`${INGREDIENT_BY_ID[id].emoji} ${l(INGREDIENT_BY_ID[id].name)}`}
                selected={!excluded.has(id)}
                onPress={() => toggleExcluded(id)}
              />
            ))}
          </ScrollView>
        </View>
      )}
      <View style={[styles.filters, { marginTop: space(4) }]}>
        {([15, 30, 60] as const).map((n) => (
          <Chip key={n} label={t('filterTime', { n })} selected={settings.lastMaxTime === n} onPress={() => update({ lastMaxTime: settings.lastMaxTime === n ? null : n })} />
        ))}
        <Chip label={t('filterEasy')} selected={easy} onPress={() => setEasy(!easy)} />
      </View>
      <View style={[styles.filters, { marginTop: space(2) }]}>
        {(['starter', 'main', 'dessert'] as Course[]).map((k) => (
          <Chip key={k} label={t(COURSE_KEYS[k])} selected={course === k} onPress={() => setCourse(course === k ? null : k)} />
        ))}
        <Chip
          label={`${settings.diets.length ? settings.diets.map((d) => t(DIET_KEYS[d])).join(', ') : t('filterDiet')} ›`}
          selected={settings.diets.length > 0}
          onPress={() => router.push('/preferences')}
        />
      </View>

      {unlock && INGREDIENT_BY_ID[unlock.id] && (
        <View style={[styles.unlock, { backgroundColor: c.accentSoft }]}>
          <Txt v="h3">{t('noResultsTitle')}</Txt>
          <Txt style={{ marginTop: space(1) }}>
            {t('unlockHint', { name: `${INGREDIENT_BY_ID[unlock.id].emoji} ${l(INGREDIENT_BY_ID[unlock.id].name)}`, n: unlock.count })}
          </Txt>
          <Button
            small
            kind="secondary"
            icon="cart-outline"
            title={t('addToShopping')}
            onPress={() => {
              const n = addShopping([{ ingredientId: unlock.id }]);
              toast.show(n ? t('shoppingAdded', { n }) : t('shoppingAlready'));
            }}
            style={{ marginTop: space(3), alignSelf: 'flex-start', backgroundColor: c.surface }}
          />
        </View>
      )}
      <View style={{ height: space(5) }} />
    </View>
  );

  return (
    <Screen edges={['top']}>
      <SectionList
        sections={sections}
        keyExtractor={(m) => m.recipe.id}
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingBottom: space(16) }}
        stickySectionHeadersEnabled={false}
        initialNumToRender={8}
        windowSize={7}
        renderSectionHeader={({ section }) => (
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: space(2), paddingHorizontal: space(4), marginTop: section.key === 'almost' ? space(4) : 0, marginBottom: space(3) }}>
            <Txt v="h2" accessibilityRole="header" style={{ flexShrink: 1 }}>
              {section.title}
              <Txt v="small" muted style={{ fontWeight: '600' }}>
                {'  '}
                {section.data.length}
              </Txt>
            </Txt>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: space(4) }}>
            <CompactRecipeCard
              recipe={item.recipe}
              match={item}
              locked={!!item.recipe.premium && !isPremium}
              onPress={() => open(item.recipe)}
              favorite={favs.includes(item.recipe.id)}
              onToggleFavorite={() => toggleFavorite(item.recipe.id)}
            />
          </View>
        )}
        ListEmptyComponent={
          <EmptyState illo={<Illo name="veggies" size={140} />} title={t('resultsEmpty')} text={t('resultsEmptyText')}>
            <Button title={t('back')} kind="secondary" icon="arrow-back" onPress={() => goBack()} />
          </EmptyState>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  round: { width: 44, height: 44, borderRadius: 22 },
  unlock: { borderRadius: radius.lg, padding: space(4), marginTop: space(4) },
  filters: { flexDirection: 'row', flexWrap: 'wrap', gap: space(2) },
});
