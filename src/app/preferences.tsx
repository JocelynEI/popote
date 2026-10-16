import { Stack, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { Illo } from '../components/Dish';
import { Icon } from '../components/Icon';
import { IngredientSearch } from '../components/IngredientSearch';
import { Button, Chip, haptic, Screen, Stepper, styles as ui, Txt } from '../components/ui';
import { INGREDIENT_BY_ID } from '../data/ingredients';
import type { Diet, Tool } from '../data/types';
import { type TKey, useI18n } from '../i18n';
import { ALLERGENS, DIETS } from '../logic/diets';
import { TOOLS } from '../logic/tools';
import { goBack } from '../navigation/goBack';
import { useSettings } from '../state/settings';
import { radius, space, TOUCH, useTheme } from '../theme/theme';

const DIET_KEYS: Record<Diet, TKey> = { vegetarian: 'dietVegetarian', vegan: 'dietVegan', glutenFree: 'dietGlutenFree', lactoseFree: 'dietLactoseFree' };
const TOOL_KEYS: Record<Tool, TKey> = { oven: 'toolOven', microwave: 'toolMicrowave', blender: 'toolBlender', multicooker: 'toolMulticooker' };
const TOOL_EMOJI: Record<Tool, string> = { oven: '♨️', microwave: '📡', blender: '🌀', multicooker: '🍲' };
/** Ingrédients souvent cités comme « je n'aime pas », proposés d'un appui. */
const COMMON_DISLIKES = ['coriander', 'mushroom', 'bell_pepper', 'olives', 'eggplant', 'goat_cheese', 'cauliflower', 'celery', 'raisins', 'fennel', 'beetroot', 'chili'];
const STEPS = 3;

/**
 * Préférences, une question par écran : régime et allergies, ce que je n'aime pas, mes ustensiles.
 * Au premier lancement, « Passer » est toujours possible. Depuis les réglages, `step` ouvre une étape.
 */
export default function PreferencesScreen() {
  const { c } = useTheme();
  const { t, l } = useI18n();
  const { settings, update } = useSettings();
  const params = useLocalSearchParams<{ step?: string }>();
  const [step, setStep] = useState(() => Math.min(STEPS - 1, Math.max(0, Number(params.step ?? 0) || 0)));
  // ustensiles : la réponse n'est enregistrée qu'en validant cette étape (null = pas répondu)
  const [tools, setTools] = useState<Tool[]>(() => settings.tools ?? []);

  const extraDislikes = useMemo(() => settings.dislikes.filter((id) => !COMMON_DISLIKES.includes(id)), [settings.dislikes]);
  const toggleDislike = (id: string) =>
    update({ dislikes: settings.dislikes.includes(id) ? settings.dislikes.filter((x) => x !== id) : [...settings.dislikes, id] });
  const ingLabel = (id: string) => `${INGREDIENT_BY_ID[id]?.emoji ?? ''} ${INGREDIENT_BY_ID[id] ? l(INGREDIENT_BY_ID[id].name) : id}`;

  const finish = (patch: Partial<typeof settings> = {}) => {
    update({ ...patch, prefsDone: true });
    goBack();
  };
  const next = () => (step < STEPS - 1 ? setStep(step + 1) : finish({ tools }));

  return (
    <Screen edges={['bottom']}>
      <Stack.Screen
        options={{
          headerLeft: () => (step > 0 ? <IconBack onPress={() => setStep(step - 1)} label={t('back')} /> : null),
          headerTitle: () => <Dots step={step} />,
          headerRight: () =>
            !settings.prefsDone ? <Button small kind="ghost" title={t('prefsSkip')} onPress={() => finish()} style={{ borderWidth: 0 }} /> : null,
        }}
      />
      <ScrollView contentContainerStyle={{ padding: space(5), paddingBottom: 160 }} keyboardShouldPersistTaps="handled">
        {step === 0 && (
          <View style={{ gap: space(6) }}>
            <View>
              <Illo name="salad" size={96} />
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
                    onPress={() => update({ allergies: settings.allergies.includes(a) ? settings.allergies.filter((x) => x !== a) : [...settings.allergies, a] })}
                  />
                ))}
              </View>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Txt style={{ flex: 1 }}>{t('prefsServings')}</Txt>
              <Stepper value={settings.defaultServings} onChange={(n) => update({ defaultServings: n })} minusLabel={t('servingsMinus')} plusLabel={t('servingsPlus')} />
            </View>
          </View>
        )}

        {step === 1 && (
          <View>
            <Txt v="display" accessibilityRole="header">
              {t('dislikesTitle')}
            </Txt>
            <Txt muted style={{ marginTop: space(2), marginBottom: space(5) }}>
              {t('dislikesText')}
            </Txt>
            <IngredientSearch exclude={new Set(settings.dislikes)} onPick={(ing) => toggleDislike(ing.id)} placeholder={t('dislikesSearch')} />
            {extraDislikes.length > 0 && (
              <>
                <Txt v="label" muted style={{ marginTop: space(6), marginBottom: space(3) }}>
                  {t('dislikesYours')}
                </Txt>
                <View style={ui.wrap}>
                  {extraDislikes.map((id) => (
                    <Chip key={id} selected label={ingLabel(id)} onRemove={() => toggleDislike(id)} removeLabel={t('removeIngredientA11y', { name: ingLabel(id) })} />
                  ))}
                </View>
              </>
            )}
            <Txt v="label" muted style={{ marginTop: space(6), marginBottom: space(3) }}>
              {t('dislikesCommon')}
            </Txt>
            <View style={ui.wrap}>
              {COMMON_DISLIKES.filter((id) => INGREDIENT_BY_ID[id]).map((id) => (
                <Chip key={id} label={ingLabel(id)} selected={settings.dislikes.includes(id)} onPress={() => toggleDislike(id)} />
              ))}
            </View>
          </View>
        )}

        {step === 2 && (
          <View>
            <Txt v="display" accessibilityRole="header">
              {t('toolsTitle')}
            </Txt>
            <Txt muted style={{ marginTop: space(2), marginBottom: space(5) }}>
              {t('toolsText')}
            </Txt>
            {TOOLS.map((tool) => {
              const on = tools.includes(tool);
              return (
                <Pressable
                  key={tool}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: on }}
                  accessibilityLabel={t(TOOL_KEYS[tool])}
                  onPress={() => (haptic(), setTools(on ? tools.filter((x) => x !== tool) : [...tools, tool]))}
                  style={[styles.tool, { borderColor: on ? c.primary : c.border, backgroundColor: on ? c.primarySoft : c.surface }]}
                >
                  <Txt style={{ fontSize: 26, width: 36, textAlign: 'center' }}>{TOOL_EMOJI[tool]}</Txt>
                  <Txt style={{ flex: 1, fontWeight: '600', fontSize: 17 }}>{t(TOOL_KEYS[tool])}</Txt>
                  <Icon name={on ? 'checkbox' : 'square-outline'} size={26} color={on ? c.primaryText : c.textMuted} />
                </Pressable>
              );
            })}
            <Txt v="small" muted style={{ marginTop: space(2) }}>
              {t('toolsNote')}
            </Txt>
          </View>
        )}
      </ScrollView>

      <View style={[styles.sticky, { backgroundColor: c.bg }]}>
        <Button
          title={step < STEPS - 1 ? t('next') : settings.prefsDone ? t('save') : t('prefsStart')}
          icon={step < STEPS - 1 ? 'arrow-forward' : 'checkmark'}
          onPress={next}
          style={{ minHeight: 58 }}
        />
        {step === STEPS - 1 && (
          <Pressable accessibilityRole="button" onPress={() => finish({ tools: null })} style={styles.ghost}>
            <Txt color={c.primaryText} style={{ fontWeight: '600' }}>
              {t('toolsUnknown')}
            </Txt>
          </Pressable>
        )}
      </View>
    </Screen>
  );
}

/** Points d'avancement des trois étapes. */
function Dots({ step }: { step: number }) {
  const { c } = useTheme();
  const { t } = useI18n();
  return (
    <View accessible accessibilityLabel={t('stepOf', { i: step + 1, n: STEPS })} style={{ flexDirection: 'row', gap: 6 }}>
      {Array.from({ length: STEPS }, (_, i) => (
        <View key={i} style={{ width: i === step ? 22 : 8, height: 8, borderRadius: 4, backgroundColor: i === step ? c.accent : c.border }} />
      ))}
    </View>
  );
}

function IconBack({ onPress, label }: { onPress: () => void; label: string }) {
  const { c } = useTheme();
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} hitSlop={8} style={{ width: TOUCH, height: TOUCH, justifyContent: 'center' }}>
      <Icon name="chevron-back" size={24} color={c.primaryText} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tool: { flexDirection: 'row', alignItems: 'center', gap: space(3), borderWidth: 2, borderRadius: radius.lg, paddingHorizontal: space(4), minHeight: 64, marginBottom: space(2.5) },
  sticky: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: space(5), paddingTop: space(3), paddingBottom: space(4) },
  ghost: { alignItems: 'center', justifyContent: 'center', minHeight: TOUCH, marginTop: space(1) },
});
