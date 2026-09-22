import { Icon, type IconName } from '../../components/Icon';
import { activateKeepAwakeAsync, deactivateKeepAwake } from 'expo-keep-awake';
import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, Share, StyleSheet, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { DishArt } from '../../components/Dish';
import { useToast } from '../../components/Toast';
import { Button, Chip, haptic, IconButton, MAX_FONT_SCALE, Screen, Section, Stepper, styles as ui, Txt } from '../../components/ui';
import { ingredientDisplay, PANTRY_IDS } from '../../data/ingredients';
import type { Diet } from '../../data/types';
import {
  addHistory,
  addShopping,
  consumeRecipeIngredients,
  cookedCount,
  deleteUserRecipe,
  getNote,
  listFavorites,
  setNote,
  toggleFavorite,
} from '../../db/repo';
import { useData, useFridge, useRecipe } from '../../hooks/useData';
import { type TKey, useI18n } from '../../i18n';
import { ingredientConflicts, recipeAllergens, recipeDiets } from '../../logic/diets';
import { evaluateRecipe } from '../../logic/matching';
import { clampServings, formatQty } from '../../logic/scaling';
import { usePremium } from '../../services/premium';
import { checkBadges } from '../../services/progress';
import { useSettings } from '../../state/settings';
import { FONTS, radius, shadow, space, useTheme } from '../../theme/theme';

const DIET_KEYS: Record<Diet, TKey> = { vegetarian: 'dietVegetarian', vegan: 'dietVegan', glutenFree: 'dietGlutenFree', lactoseFree: 'dietLactoseFree' };

export default function RecipeScreen() {
  const { id, have } = useLocalSearchParams<{ id: string; have?: string }>();
  const recipe = useRecipe(id);
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const { settings, update } = useSettings();
  const { isPremium } = usePremium();
  const toast = useToast();
  const fridge = useFridge();
  const favs = useData(listFavorites);
  const [servings, setServings] = useState(clampServings(settings.defaultServings));
  const [note, setNoteText] = useState('');
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const [awake, setAwake] = useState(false);
  const insets = useSafeAreaInsets();
  // on relâche la mise en veille en quittant la fiche
  useEffect(() => () => void deactivateKeepAwake(AWAKE_TAG).catch(() => {}), []);

  useEffect(() => {
    if (id) setNoteText(getNote(id));
  }, [id]);

  const locked = !!recipe?.premium && !isPremium;
  useEffect(() => {
    if (locked) router.replace('/premium');
  }, [locked]);

  if (!recipe) {
    return (
      <Screen edges={['bottom']}>
        <Txt style={{ padding: space(4) }}>{t('recipeNotFound')}</Txt>
      </Screen>
    );
  }
  if (locked) return null;

  const isFav = favs.includes(recipe.id);
  const factor = servings / recipe.servings;
  // disponible = frigo + ingrédients choisis sur l'écran Cuisiner
  const available = new Set([...fridge.ids, ...(have ? have.split(',').filter(Boolean) : [])]);
  const match = evaluateRecipe(recipe, available, fridge.urgent);
  const subByMissing = new Map(match.substituted.map((s) => [s.missing, s.sub]));
  const diets = recipeDiets(recipe);
  const allergens = recipeAllergens(recipe);

  const lines = recipe.ingredients.map((ri) => {
    const d = ingredientDisplay(ri.id, lang, ri.label);
    return { ri, emoji: d.emoji, name: d.name, qty: formatQty(ri, factor, lang) };
  });

  const share = () => {
    const ingText = lines.map((x) => `• ${x.qty ? x.qty + ' ' : ''}${x.name}${x.ri.optional ? ` (${t('optional')})` : ''}`).join('\n');
    const steps = recipe.steps.map((s, i) => `${i + 1}. ${l(s.text)}`).join('\n');
    Share.share({ message: `${recipe.icon} ${l(recipe.title)}\n⏱ ${t('minutes', { n: recipe.time })} · ${t('servings', { n: servings })}\n\n${t('ingredients')}\n${ingText}\n\n${t('steps')}\n${steps}\n\n${t('shareRecipeFooter')}` }).catch(() => {});
  };

  const cooked = () => {
    addHistory(recipe.id, servings);
    const usedIds = recipe.ingredients.map((i) => i.id).filter((x) => fridge.ids.has(x) && !PANTRY_IDS.has(x));
    const after = () => {
      const fresh = checkBadges();
      fresh.forEach((b, i) => setTimeout(() => toast.show(t('badgeUnlocked', { name: `${b.emoji} ${l(b.title)}` })), 2700 * (i + 1)));
      // suggestion douce du Premium, une seule fois, après la 10e recette
      if (!isPremium && !settings.premiumNudgeShown && cookedCount() >= 10) {
        update({ premiumNudgeShown: true });
        setTimeout(
          () =>
            Alert.alert(t('premiumNudgeTitle'), t('premiumNudgeText'), [
              { text: t('backupReminderLater'), style: 'cancel' },
              { text: t('premiumNudgeCta'), onPress: () => router.push('/premium') },
            ]),
          600,
        );
      }
    };
    if (!usedIds.length) {
      toast.show(t('cookedToast'));
      after();
      return;
    }
    Alert.alert(t('consumeTitle'), t('consumeText'), [
      { text: t('consumeNo'), style: 'cancel', onPress: () => (toast.show(t('cookedToast')), after()) },
      {
        text: t('consumeYes'),
        onPress: () => {
          const n = consumeRecipeIngredients(recipe, usedIds);
          toast.show(t('consumedToast', { n }));
          after();
        },
      },
    ]);
  };

  const addMissing = () => {
    const n = addShopping(match.missing.map((m) => ({ ingredientId: m, recipeId: recipe.id })));
    toast.show(n ? t('shoppingAdded', { n }) : t('shoppingAlready'));
  };

  const toggleAwake = async () => {
    haptic();
    if (awake) {
      deactivateKeepAwake(AWAKE_TAG).catch(() => {});
      toast.show(t('keepAwakeOff'));
    } else {
      await activateKeepAwakeAsync(AWAKE_TAG).catch(() => {});
      toast.show(t('keepAwakeOn'));
    }
    setAwake(!awake);
  };

  const RoundBtn = ({ icon, label, onPress, color }: { icon: IconName; label: string; onPress: () => void; color?: string }) => (
    <IconButton icon={icon} label={label} onPress={onPress} color={color ?? c.text} size={20} style={[styles.round, { backgroundColor: c.surface }, shadow(c, 1)]} />
  );

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ paddingBottom: space(16) }} keyboardShouldPersistTaps="handled">
        {/* Grande image + Retour / Partager */}
        <View>
          <DishArt recipe={recipe} radius={0} padding={0.08} style={{ height: 340 + insets.top, width: '100%', paddingTop: insets.top }} />
          <View style={[styles.topBtns, { top: insets.top + space(2) }]}>
            <RoundBtn icon="arrow-back" label={t('back')} onPress={() => router.back()} />
            <View style={{ flexDirection: 'row', gap: space(2) }}>
              {recipe.custom && <RoundBtn icon="create-outline" label={t('edit')} onPress={() => router.push({ pathname: '/recipe-editor', params: { id: recipe.id } })} />}
              {recipe.custom && (
                <RoundBtn
                  icon="trash-outline"
                  label={t('delete')}
                  color={c.danger}
                  onPress={() =>
                    Alert.alert(t('deleteRecipeTitle'), t('deleteRecipeText'), [
                      { text: t('cancel'), style: 'cancel' },
                      { text: t('delete'), style: 'destructive', onPress: () => (deleteUserRecipe(recipe.id), router.back()) },
                    ])
                  }
                />
              )}
              <RoundBtn icon="share-outline" label={t('share')} onPress={share} />
              <RoundBtn icon={isFav ? 'heart' : 'heart-outline'} label={isFav ? t('favoriteRemove') : t('favoriteAdd')} color={isFav ? c.accentText : c.text} onPress={() => toggleFavorite(recipe.id)} />
            </View>
          </View>
        </View>

        <View style={[styles.sheet, { backgroundColor: c.bg }]}>
          <Txt v="display" accessibilityRole="header">
            {l(recipe.title)}
          </Txt>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space(1.5), marginTop: space(2) }}>
            <Icon name="clock" size={16} color={c.textMuted} />
            <Txt muted>
              {t('minutes', { n: recipe.time })} · {recipe.difficulty === 1 ? t('difficultyEasy') : t('difficultyMedium')}
            </Txt>
          </View>
          <View style={[ui.wrap, { marginTop: space(3) }]}>
            {diets.map((d) => (
              <Chip key={d} label={t(DIET_KEYS[d])} tone="success" />
            ))}
            {allergens.length > 0 && <Chip tone="warning" label={t('allergensWarn', { list: allergens.map((a) => t(`allergen_${a}` as TKey)).join(', ') })} />}
          </View>

          {/* Mode cuisson : écran allumé + plein écran */}
          <View style={{ flexDirection: 'row', gap: space(2), marginTop: space(5) }}>
            <Pressable
              accessibilityRole="switch"
              accessibilityState={{ checked: awake }}
              accessibilityLabel={t('keepAwake')}
              onPress={toggleAwake}
              style={[styles.modeBtn, { backgroundColor: awake ? c.primarySoft : c.surface, borderColor: awake ? c.primary : c.border }]}
            >
              <Icon name="sun" size={20} color={awake ? c.primaryText : c.text} />
              <Txt v="small" style={{ fontWeight: '600', marginLeft: space(2), flexShrink: 1 }}>
                {t('keepAwake')}
              </Txt>
            </Pressable>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={t('startCooking')}
              onPress={() => router.push({ pathname: '/cook/[id]', params: { id: recipe.id, servings: String(servings) } })}
              style={[styles.modeBtn, { backgroundColor: c.surface, borderColor: c.border }]}
            >
              <Icon name="maximize" size={20} color={c.text} />
              <Txt v="small" style={{ fontWeight: '600', marginLeft: space(2), flexShrink: 1 }}>
                {t('fullscreenCook')}
              </Txt>
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: space(6) }}>
            <Txt v="h2" style={{ flex: 1 }}>
              {t('ingredients')}
            </Txt>
            <Stepper value={servings} onChange={setServings} minusLabel={t('servingsMinus')} plusLabel={t('servingsPlus')} />
          </View>
          <Txt v="small" muted style={{ marginTop: space(1) }}>
            {t('servings', { n: servings })}
          </Txt>

          {/* Ingrédients : cases à cocher, manquants grisés */}
          <View style={{ marginTop: space(3) }}>
            {lines.map(({ ri, emoji, name, qty }) => {
              const pantry = PANTRY_IDS.has(ri.id);
              const has = pantry || available.has(ri.id);
              const isChecked = checked[ri.id] ?? has;
              const sub = subByMissing.get(ri.id);
              const conflict = ri.optional && ingredientConflicts(ri.id, settings.diets, settings.allergies);
              const missing = !has && !ri.optional;
              return (
                <Pressable
                  key={ri.id}
                  accessibilityRole="checkbox"
                  accessibilityState={{ checked: isChecked }}
                  accessibilityLabel={`${qty} ${name}${ri.optional ? `, ${t('optional')}` : ''}. ${has ? t('youHave') : t('youMiss')}${sub ? `. ${t('replaceWith', { note: l(sub.note) })}` : ''}`}
                  onPress={() => (haptic(), setChecked((m) => ({ ...m, [ri.id]: !isChecked })))}
                  style={[styles.ingRow, { borderBottomColor: c.border }]}
                >
                  <Icon name={isChecked ? 'checkbox' : 'square-outline'} size={24} color={isChecked ? c.primaryText : c.textMuted} />
                  <View style={{ flex: 1, marginLeft: space(3), opacity: missing ? 0.55 : 1 }}>
                    <Txt style={{ textDecorationLine: isChecked && !missing ? 'none' : 'none' }}>
                      <Txt>{emoji} </Txt>
                      {qty ? <Txt style={{ fontWeight: '700' }}>{qty} </Txt> : null}
                      {name}
                      {ri.optional ? <Txt muted> ({t('optional')})</Txt> : null}
                    </Txt>
                    {conflict ? (
                      <Txt v="small" color={c.warning}>
                        ⚠️ {t('conflictWarn')}
                      </Txt>
                    ) : null}
                    {sub && (
                      <Txt v="small" color={c.primaryText}>
                        ↪ {t('replaceWith', { note: l(sub.note) })}
                      </Txt>
                    )}
                  </View>
                  {missing && (
                    <View style={[styles.missTag, { backgroundColor: c.warningBg }]}>
                      <Icon name="cart-outline" size={14} color={c.warning} />
                      <Txt v="small" color={c.warning} style={{ fontWeight: '600', marginLeft: 4, fontSize: 12 }}>
                        {t('youMiss')}
                      </Txt>
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
          {match.missing.length > 0 && <Button kind="secondary" icon="cart-outline" title={t('addMissingToShopping')} onPress={addMissing} style={{ marginTop: space(4) }} />}

          {/* Étapes : très gros caractères, séparées par un filet */}
          <Txt v="h2" style={{ marginTop: space(8) }}>
            {t('steps')}
          </Txt>
          <View style={{ marginTop: space(2) }}>
            {recipe.steps.map((s, i) => (
              <View key={i} style={[styles.step, i > 0 && { borderTopColor: c.border, borderTopWidth: StyleSheet.hairlineWidth * 2 }]}>
                <Txt v="label" color={c.accentText}>
                  {t('stepOf', { i: i + 1, n: recipe.steps.length })}
                </Txt>
                <Txt style={{ fontSize: 18, lineHeight: 28, marginTop: space(2) }}>{l(s.text)}</Txt>
                {s.timer ? (
                  <View style={[styles.timerTag, { backgroundColor: c.primarySoft }]}>
                    <Icon name="timer-outline" size={16} color={c.primaryText} />
                    <Txt v="small" color={c.primaryText} style={{ fontWeight: '600', marginLeft: 6 }}>
                      {t('minutes', { n: s.timer })}
                    </Txt>
                  </View>
                ) : null}
              </View>
            ))}
          </View>

          <Button title={t('startCooking')} icon="flame-outline" onPress={() => router.push({ pathname: '/cook/[id]', params: { id: recipe.id, servings: String(servings) } })} style={{ marginTop: space(6) }} />

          <Section title={t('myNote')}>
            <TextInput
              value={note}
              onChangeText={setNoteText}
              onBlur={() => setNote(recipe.id, note)}
              placeholder={t('notePlaceholder')}
              placeholderTextColor={c.textMuted}
              accessibilityLabel={t('myNote')}
              multiline
              maxLength={1000}
              maxFontSizeMultiplier={MAX_FONT_SCALE}
              style={{ minHeight: 80, borderRadius: radius.md, padding: space(4), color: c.text, fontSize: 16, textAlignVertical: 'top', backgroundColor: c.surface, fontFamily: FONTS.body }}
            />
          </Section>

          <Button title={t('iCookedIt')} icon="checkmark-done" kind="secondary" onPress={cooked} style={{ marginTop: space(6) }} />
          <Button
            title={t('addToPlan')}
            kind="ghost"
            icon={isPremium ? 'calendar-outline' : 'lock-closed-outline'}
            onPress={() => router.push(isPremium ? { pathname: '/planner', params: { add: recipe.id } } : '/premium')}
            style={{ marginTop: space(3) }}
          />
        </View>
      </ScrollView>
    </Screen>
  );
}

const AWAKE_TAG = 'popote-recipe';

const styles = StyleSheet.create({
  round: { width: 44, height: 44, borderRadius: 22 },
  topBtns: { position: 'absolute', left: space(4), right: space(4), flexDirection: 'row', justifyContent: 'space-between' },
  sheet: { marginTop: -space(6), borderTopLeftRadius: radius.xl, borderTopRightRadius: radius.xl, paddingHorizontal: space(5), paddingTop: space(6) },
  modeBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', minHeight: 52, borderRadius: radius.pill, borderWidth: 1.5, paddingHorizontal: space(4) },
  ingRow: { flexDirection: 'row', alignItems: 'center', minHeight: 56, paddingVertical: space(3), borderBottomWidth: StyleSheet.hairlineWidth * 2 },
  missTag: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.pill, paddingHorizontal: space(2), paddingVertical: 3, marginLeft: space(2) },
  step: { paddingVertical: space(5) },
  timerTag: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start', borderRadius: radius.pill, paddingHorizontal: space(3), paddingVertical: 6, marginTop: space(3) },
});
