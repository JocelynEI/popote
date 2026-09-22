import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import { Illo } from '../components/Dish';
import { PopoteLoader } from '../components/PopoteLoader';
import { FeedRecipeCard } from '../components/RecipeCard';
import { useToast } from '../components/Toast';
import { Button, Chip, EmptyState, IconButton, Screen, Txt } from '../components/ui';
import { INGREDIENT_BY_ID } from '../data/ingredients';
import type { Course, Diet, Recipe } from '../data/types';
import { addShopping, listFavorites, recentlyCookedMap, toggleFavorite } from '../db/repo';
import { useAllRecipes, useData, useFridge } from '../hooks/useData';
import { type TKey, useI18n } from '../i18n';
import { DIETS } from '../logic/diets';
import { bestUnlock, type RecipeMatch } from '../logic/matching';
import { getRecipeEngine } from '../services/recipeEngine';
import { usePremium } from '../services/premium';
import { useSettings } from '../state/settings';
import { radius, shadow, space, useTheme } from '../theme/theme';

const DIET_KEYS: Record<Diet, TKey> = { vegetarian: 'dietVegetarian', vegan: 'dietVegan', glutenFree: 'dietGlutenFree', lactoseFree: 'dietLactoseFree' };
const COURSE_KEYS: Record<Course, TKey> = { starter: 'courseStarter', main: 'courseMain', dessert: 'courseDessert' };
const MAX_LOCKED = 2;

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

  const available = useMemo(() => {
    const s = new Set(selected);
    if (useFridgeParam === '1') fridge.ids.forEach((id) => s.add(id));
    return s;
  }, [selected, useFridgeParam, fridge.ids]);

  const filters = useMemo(
    () => ({ maxTime: settings.lastMaxTime, difficulty: easy ? (1 as const) : null, course, diets: settings.diets, allergies: settings.allergies }),
    [settings.lastMaxTime, easy, course, settings.diets, settings.allergies],
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

  const visible = useMemo(() => {
    let locked = 0;
    return matches.filter((m) => isPremium || !m.recipe.premium || ++locked <= MAX_LOCKED);
  }, [matches, isPremium]);
  const complete = matches.filter((m) => m.missing.length === 0).length;
  const unlock = complete === 0 ? bestUnlock(matches) : null;

  const open = (r: Recipe) => (r.premium && !isPremium ? router.push('/premium') : router.push({ pathname: '/recipe/[id]', params: { id: r.id, have: selected.join(',') } }));

  if (loading && !firstDone) {
    return (
      <Screen edges={['top', 'bottom']}>
        <PopoteLoader />
      </Screen>
    );
  }

  const header = (
    <View style={{ paddingHorizontal: space(4) }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: space(2) }}>
        <IconButton icon="arrow-back" label={t('back')} onPress={() => router.back()} style={[styles.round, { backgroundColor: c.surface }, shadow(c, 1)]} color={c.text} />
      </View>
      <Txt v="display" accessibilityRole="header" style={{ marginTop: space(4) }}>
        {t('resultsTitle')}
      </Txt>
      <Txt muted style={{ marginTop: space(1) }}>
        {t('resultsSubtitle', { n: visible.length, k: available.size })}
      </Txt>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: space(4), marginHorizontal: -space(4) }} contentContainerStyle={{ gap: space(2), paddingHorizontal: space(4), paddingBottom: space(2) }}>
        {([15, 30, 60] as const).map((n) => (
          <Chip key={n} label={`⏱ ${t('filterTime', { n })}`} selected={settings.lastMaxTime === n} onPress={() => update({ lastMaxTime: settings.lastMaxTime === n ? null : n })} />
        ))}
        <Chip label={t('filterEasy')} selected={easy} onPress={() => setEasy(!easy)} />
        {(['starter', 'main', 'dessert'] as Course[]).map((k) => (
          <Chip key={k} label={t(COURSE_KEYS[k])} selected={course === k} onPress={() => setCourse(course === k ? null : k)} />
        ))}
        {DIETS.map((d) => (
          <Chip
            key={d}
            label={t(DIET_KEYS[d])}
            selected={settings.diets.includes(d)}
            onPress={() => update({ diets: settings.diets.includes(d) ? settings.diets.filter((x) => x !== d) : [...settings.diets, d] })}
          />
        ))}
      </ScrollView>

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
      <FlatList
        data={visible}
        keyExtractor={(m) => m.recipe.id}
        ListHeaderComponent={header}
        contentContainerStyle={{ paddingBottom: space(16) }}
        initialNumToRender={4}
        windowSize={7}
        renderItem={({ item }) => (
          <View style={{ paddingHorizontal: space(4) }}>
            <FeedRecipeCard
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
            <Button title={t('back')} kind="secondary" icon="arrow-back" onPress={() => router.back()} />
          </EmptyState>
        }
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  round: { width: 44, height: 44, borderRadius: 22 },
  unlock: { borderRadius: radius.lg, padding: space(4), marginTop: space(4) },
});
