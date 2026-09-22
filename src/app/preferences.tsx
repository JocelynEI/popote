import { Stack } from 'expo-router';
import { ScrollView, View } from 'react-native';
import { Illo } from '../components/Dish';
import { Button, Chip, Screen, Stepper, styles as ui, Txt } from '../components/ui';
import type { Diet } from '../data/types';
import { type TKey, useI18n } from '../i18n';
import { ALLERGENS, DIETS } from '../logic/diets';
import { useSettings } from '../state/settings';
import { space, useTheme } from '../theme/theme';
import { goBack } from '../navigation/goBack';

const DIET_KEYS: Record<Diet, TKey> = { vegetarian: 'dietVegetarian', vegan: 'dietVegan', glutenFree: 'dietGlutenFree', lactoseFree: 'dietLactoseFree' };

/** Écran unique et facultatif du premier lancement. Réutilisé depuis les réglages. */
export default function PreferencesScreen() {
  const { c } = useTheme();
  const { t } = useI18n();
  const { settings, update } = useSettings();

  const done = () => {
    update({ prefsDone: true });
    goBack();
  };

  return (
    <Screen edges={['bottom']}>
      <Stack.Screen
        options={{
          headerLeft: () => null,
          headerRight: () => (!settings.prefsDone ? <Button small kind="ghost" title={t('prefsSkip')} onPress={done} style={{ borderWidth: 0 }} /> : null),
        }}
      />
      <ScrollView contentContainerStyle={{ padding: space(5), gap: space(6) }}>
        <View>
          <Illo name="salad" size={110} />
          <Txt v="display" accessibilityRole="header" style={{ marginTop: space(3) }}>
            {t('prefsTitle')}
          </Txt>
          <Txt muted style={{ marginTop: space(2) }}>
            {t('prefsText')}
          </Txt>
        </View>

        <View>
          <Txt v="label" muted style={{ marginBottom: space(2) }}>
            {t('prefsDiet')}
          </Txt>
          <View style={ui.wrap}>
            {DIETS.map((d) => (
              <Chip
                key={d}
                label={t(DIET_KEYS[d])}
                selected={settings.diets.includes(d)}
                onPress={() => update({ diets: settings.diets.includes(d) ? settings.diets.filter((x) => x !== d) : [...settings.diets, d] })}
              />
            ))}
          </View>
        </View>

        <View>
          <Txt v="label" muted style={{ marginBottom: space(2) }}>
            {t('prefsAllergies')}
          </Txt>
          <View style={ui.wrap}>
            {ALLERGENS.map((a) => (
              <Chip
                key={a}
                label={t(`allergen_${a}` as TKey)}
                selected={settings.allergies.includes(a)}
                onPress={() =>
                  update({ allergies: settings.allergies.includes(a) ? settings.allergies.filter((x) => x !== a) : [...settings.allergies, a] })
                }
              />
            ))}
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Txt style={{ flex: 1 }}>{t('prefsServings')}</Txt>
          <Stepper value={settings.defaultServings} onChange={(n) => update({ defaultServings: n })} minusLabel={t('servingsMinus')} plusLabel={t('servingsPlus')} />
        </View>

        <Button title={settings.prefsDone ? t('save') : t('prefsStart')} icon="arrow-forward" onPress={done} />
        <Txt v="small" style={{ textAlign: 'center', color: c.textMuted }}>
          {t('privacyBadge')}
        </Txt>
      </ScrollView>
    </Screen>
  );
}
