import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Alert, ScrollView, TextInput, View } from 'react-native';
import { IngredientSearch } from '../components/IngredientSearch';
import { useToast } from '../components/Toast';
import { Button, Chip, IconButton, MAX_FONT_SCALE, Screen, Stepper, styles as ui, Txt } from '../components/ui';
import { FREE_PREFIX, ingredientDisplay } from '../data/ingredients';
import type { Course, Recipe, RecipeIngredient } from '../data/types';
import { saveUserRecipe } from '../db/repo';
import { useRecipe } from '../hooks/useData';
import { type TKey, useI18n } from '../i18n';
import { formatQty, parseQtyInput } from '../logic/scaling';
import { key } from '../logic/text';
import { checkBadges } from '../services/progress';
import { radius, space, useTheme } from '../theme/theme';

interface Row {
  id: string;
  label?: string;
  qtyText: string;
  optional: boolean;
}

const COURSES: { v: Course; k: TKey }[] = [
  { v: 'starter', k: 'courseStarter' },
  { v: 'main', k: 'courseMain' },
  { v: 'dessert', k: 'courseDessert' },
];

/** Création / modification d'une recette perso (gratuit). Elle entre dans le moteur de recherche. */
export default function RecipeEditor() {
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const toast = useToast();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const existing = useRecipe(id);

  const [title, setTitle] = useState(existing ? l(existing.title) : '');
  const [time, setTime] = useState(String(existing?.time ?? 30));
  const [servings, setServings] = useState(existing?.servings ?? 2);
  const [course, setCourse] = useState<Course>(existing?.course ?? 'main');
  const [rows, setRows] = useState<Row[]>(
    existing?.ingredients.map((ri) => ({ id: ri.id, label: ri.label, qtyText: ri.qty ? formatQty(ri, 1, lang) : '', optional: !!ri.optional })) ?? [],
  );
  const [stepsText, setStepsText] = useState(existing ? existing.steps.map((s) => l(s.text)).join('\n') : '');

  const inputStyle = { borderWidth: 1, borderColor: c.border, borderRadius: radius.md, padding: space(3), color: c.text, fontSize: 16, minHeight: 48 };

  const save = () => {
    const name = title.trim();
    const steps = stepsText
      .split('\n')
      .map((s) => s.trim())
      .filter(Boolean);
    if (!name) return Alert.alert(t('editorNeedName'));
    if (!rows.length) return Alert.alert(t('editorNeedIngredient'));
    if (!steps.length) return Alert.alert(t('editorNeedStep'));
    const minutes = Math.min(600, Math.max(1, parseInt(time, 10) || 30));
    const ingredients: RecipeIngredient[] = rows.map((r) => {
      const q = parseQtyInput(r.qtyText);
      return { id: r.id, ...(r.label ? { label: r.label } : {}), ...(q ? { qty: q.qty, unit: q.unit } : {}), ...(r.optional ? { optional: true } : {}) };
    });
    const recipe: Recipe = {
      id: existing?.id ?? `u_${Date.now().toString(36)}`,
      // une recette perso n'existe que dans la langue de saisie : on la duplique pour FR/EN
      title: { fr: name, en: name },
      icon: course === 'dessert' ? '🍰' : course === 'starter' ? '🥗' : '🍲',
      course,
      time: minutes,
      difficulty: 1,
      servings,
      ingredients,
      steps: steps.map((s) => ({ text: { fr: s, en: s } })),
      custom: true,
    };
    saveUserRecipe(recipe);
    checkBadges().forEach((b) => setTimeout(() => toast.show(t('badgeUnlocked', { name: `${b.emoji} ${l(b.title)}` })), 2600));
    toast.show(t('editorSaved'));
    router.back();
  };

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(4), gap: space(4), paddingBottom: space(16) }} keyboardShouldPersistTaps="handled">
        <View>
          <Txt v="label" muted style={{ marginBottom: space(2) }}>
            {t('editorName')}
          </Txt>
          <TextInput value={title} onChangeText={setTitle} maxLength={80} accessibilityLabel={t('editorName')} maxFontSizeMultiplier={MAX_FONT_SCALE} style={inputStyle} />
        </View>

        <View style={{ flexDirection: 'row', gap: space(4), alignItems: 'flex-end' }}>
          <View style={{ flex: 1 }}>
            <Txt v="label" muted style={{ marginBottom: space(2) }}>
              {t('editorTime')}
            </Txt>
            <TextInput value={time} onChangeText={(s) => setTime(s.replace(/[^0-9]/g, ''))} keyboardType="number-pad" maxLength={3} accessibilityLabel={t('editorTime')} maxFontSizeMultiplier={MAX_FONT_SCALE} style={inputStyle} />
          </View>
          <View>
            <Txt v="label" muted style={{ marginBottom: space(2) }}>
              {t('editorServings')}
            </Txt>
            <Stepper value={servings} onChange={setServings} minusLabel={t('servingsMinus')} plusLabel={t('servingsPlus')} />
          </View>
        </View>

        <View>
          <Txt v="label" muted style={{ marginBottom: space(2) }}>
            {t('editorCourse')}
          </Txt>
          <View style={ui.wrap}>
            {COURSES.map((x) => (
              <Chip key={x.v} label={t(x.k)} selected={course === x.v} onPress={() => setCourse(x.v)} />
            ))}
          </View>
        </View>

        <View style={{ zIndex: 10 }}>
          <Txt v="label" muted style={{ marginBottom: space(2) }}>
            {t('editorIngredients')}
          </Txt>
          <IngredientSearch
            exclude={new Set(rows.map((r) => r.id))}
            onPick={(ing) => setRows((rs) => [...rs, { id: ing.id, qtyText: '', optional: false }])}
            onFree={(q) => setRows((rs) => [...rs, { id: FREE_PREFIX + key(q), label: q, qtyText: '', optional: false }])}
          />
        </View>
        {rows.map((r, idx) => {
          const d = ingredientDisplay(r.id, lang, r.label);
          return (
            <View key={r.id} style={{ flexDirection: 'row', alignItems: 'center', gap: space(2) }}>
              <Txt style={{ fontSize: 22 }}>{d.emoji}</Txt>
              <Txt style={{ flex: 1 }} numberOfLines={1}>
                {d.name}
              </Txt>
              <TextInput
                value={r.qtyText}
                onChangeText={(s) => setRows((rs) => rs.map((x, i) => (i === idx ? { ...x, qtyText: s } : x)))}
                placeholder={t('editorIngredientQty')}
                placeholderTextColor={c.textMuted}
                accessibilityLabel={`${t('editorIngredientQty')} ${d.name}`}
                maxFontSizeMultiplier={MAX_FONT_SCALE}
                style={[inputStyle, { width: 120, minHeight: 44, padding: space(2) }]}
              />
              <Chip label={t('optional')} selected={r.optional} onPress={() => setRows((rs) => rs.map((x, i) => (i === idx ? { ...x, optional: !x.optional } : x)))} />
              <IconButton icon="close" label={t('removeIngredientA11y', { name: d.name })} onPress={() => setRows((rs) => rs.filter((_, i) => i !== idx))} color={c.textMuted} />
            </View>
          );
        })}

        <View>
          <Txt v="label" muted style={{ marginBottom: space(2) }}>
            {t('editorSteps')}
          </Txt>
          <TextInput
            value={stepsText}
            onChangeText={setStepsText}
            multiline
            maxLength={5000}
            accessibilityLabel={t('editorSteps')}
            maxFontSizeMultiplier={MAX_FONT_SCALE}
            style={[inputStyle, { minHeight: 160, textAlignVertical: 'top' }]}
          />
        </View>

        <Button title={t('save')} icon="checkmark" onPress={save} />
      </ScrollView>
    </Screen>
  );
}
