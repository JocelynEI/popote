import { router } from 'expo-router';
import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { Illo } from '../components/Dish';
import { RecipeCard } from '../components/RecipeCard';
import { Card, EmptyState, Screen, Txt } from '../components/ui';
import { INGREDIENT_BY_ID } from '../data/ingredients';
import { useAllRecipes, useFridge } from '../hooks/useData';
import { useI18n } from '../i18n';
import { planEmptyFridge } from '../logic/emptyFridge';
import { usePremium } from '../services/premium';
import { useSettings } from '../state/settings';
import { space, useTheme } from '../theme/theme';

/** Mode « Vider le frigo » (gratuit) : 2-3 recettes qui utilisent un max de produits bientôt périmés */
export default function EmptyFridgeScreen() {
  const { c } = useTheme();
  const { t, l } = useI18n();
  const { settings } = useSettings();
  const { isPremium } = usePremium();
  const recipes = useAllRecipes();
  const fridge = useFridge();

  const plan = useMemo(
    () =>
      planEmptyFridge(
        recipes.filter((r) => isPremium || !r.premium),
        fridge.ids,
        fridge.urgent,
        { diets: settings.diets, allergies: settings.allergies },
      ),
    [recipes, isPremium, fridge.ids, fridge.urgent, settings.diets, settings.allergies],
  );

  if (!plan.picks.length) {
    return (
      <Screen edges={['bottom']}>
        <EmptyState illo={<Illo name="veggies" size={140} />} title={t('emptyFridgeNone')} />
      </Screen>
    );
  }

  const name = (id: string) => `${INGREDIENT_BY_ID[id]?.emoji ?? ''} ${l(INGREDIENT_BY_ID[id]?.name ?? { fr: id, en: id })}`;

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(4), paddingBottom: space(16) }}>
        <Txt muted>{t('emptyFridgeIntro')}</Txt>
        {fridge.urgent.size > 0 && (
          <Card style={{ marginVertical: space(4), backgroundColor: c.successBg }}>
            <Txt v="h3" color={c.success}>
              {t('emptyFridgeCovered', { a: plan.coveredUrgent.length, b: fridge.urgent.size })}
            </Txt>
            {plan.uncoveredUrgent.length > 0 && (
              <Txt v="small" color={c.success} style={{ marginTop: space(1) }}>
                {t('emptyFridgeLeft', { list: plan.uncoveredUrgent.map(name).join(', ') })}
              </Txt>
            )}
          </Card>
        )}
        {plan.picks.map((m, i) => (
          <RecipeCard key={m.recipe.id} recipe={m.recipe} match={m} onPress={() => router.push(`/recipe/${m.recipe.id}`)} />
        ))}
      </ScrollView>
    </Screen>
  );
}
