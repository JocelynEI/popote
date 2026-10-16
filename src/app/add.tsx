import { router } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Icon } from '../components/Icon';
import { Tip } from '../components/Tip';
import { useToast } from '../components/Toast';
import { Button, Chip, haptic, MAX_FONT_SCALE, Screen, styles as ui, Txt } from '../components/ui';
import { INGREDIENT_BY_ID } from '../data/ingredients';
import type { Ingredient } from '../data/types';
import { addFridgeItem, deleteFridgeItem, type FridgeItem, ingredientName, restoreFridgeItem } from '../db/repo';
import { useFridge } from '../hooks/useData';
import { useI18n } from '../i18n';
import { newFridgeEntries } from '../logic/fridge';
import { parseIngredientText, searchIngredients } from '../logic/ingredientSearch';
import { useDictation } from '../services/voice';
import { useSettings } from '../state/settings';
import { FONTS, radius, shadow, space, TOUCH, useTheme } from '../theme/theme';

/** Basiques du placard proposés en « Ajout rapide » (scroll horizontal) */
const QUICK_TAGS = ['pasta', 'rice', 'egg', 'cream', 'onion', 'tomato', 'emmental', 'potato', 'milk', 'butter', 'chicken', 'garlic', 'bread', 'zucchini', 'lemon'];
/** Produits montrés ici ; le reste est dans l'onglet Frigo. */
const MAX_CHIPS = 12;

/**
 * « Ajouter ce que j'ai » : saisie en phrase ou dictée, ajout rapide d'un appui.
 * Tout entre dans le frigo, sans date et sans doublon.
 */
export default function AddScreen() {
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const { settings, update } = useSettings();
  const toast = useToast();
  const fridge = useFridge();
  const [text, setText] = useState('');
  const [showTip, setShowTip] = useState(false);

  /** Ajoute au frigo les ingrédients qui n'y sont pas encore, sans date. */
  const add = (ids: string[]) => {
    const fresh = newFridgeEntries(ids, fridge.items);
    fresh.forEach((e) => addFridgeItem(e));
    if (fresh.length) {
      haptic();
      // une seule aide, après le tout premier ajout
      if (!settings.tipsSeen.includes('add1')) {
        setShowTip(true);
        update({ tipsSeen: [...settings.tipsSeen, 'add1'] });
      }
    }
    return fresh.length;
  };

  const remove = (it: FridgeItem) => {
    const snapshot = deleteFridgeItem(it.id);
    toast.show(t('deletedToast'), { onUndo: () => snapshot && restoreFridgeItem(snapshot) });
  };

  /** Validation de la saisie libre : « 2 œufs, un demi brocoli, du cheddar » -> 3 produits */
  const submitText = (value = text) => {
    const v = value.trim();
    if (!v) return;
    const { found, unknown } = parseIngredientText(v);
    const n = add(found.map((i) => i.id));
    if (n > 0) toast.show(t('addedSelectionToFridge', { n }));
    if (unknown.length) toast.show(t('notUnderstood', { list: unknown.join(', ') }));
    setText('');
  };

  const dictation = useDictation(lang, (spoken) => submitText(spoken));
  useEffect(() => {
    if (dictation.state === 'unavailable' || dictation.state === 'onlineOnly') toast.show(t('dictationUnavailable'));
    if (dictation.state === 'denied') toast.show(t('voiceDenied'));
  }, [dictation.state]); // eslint-disable-line react-hooks/exhaustive-deps

  // suggestions pendant la frappe (sur le dernier morceau de la phrase)
  const lastPart = text.split(/[,;]/).pop()?.trim() ?? '';
  const suggestions = useMemo(() => (lastPart.length >= 1 ? searchIngredients(lastPart, fridge.ids, 5).map((h) => h.ing) : []), [lastPart, fridge.ids]);

  const pickSuggestion = (ing: Ingredient) => {
    if (add([ing.id])) toast.show(t('addedSelectionToFridge', { n: 1 }));
    const parts = text.split(/[,;]/);
    parts.pop();
    const rest = parts.join(',').trim();
    setText(rest ? `${rest}, ` : '');
  };

  const name = (id: string) => `${INGREDIENT_BY_ID[id]?.emoji ?? ''} ${l(INGREDIENT_BY_ID[id]?.name ?? { fr: id, en: id })}`;
  const itemName = (it: FridgeItem) => `${(it.ingredient_id && INGREDIENT_BY_ID[it.ingredient_id]?.emoji) || '🥡'} ${ingredientName(it.ingredient_id, it.custom_name, lang)}`;
  const quick = QUICK_TAGS.filter((id) => !fridge.ids.has(id));

  const seeIdeas = () => {
    // le texte encore dans le champ est d'abord ajouté au frigo
    if (text.trim()) submitText();
    router.replace({ pathname: '/results', params: { fridge: '1' } });
  };

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(5), paddingBottom: 140 }} keyboardShouldPersistTaps="handled">
        {/* Saisie : texte libre + micro */}
        <View style={[styles.hero, { backgroundColor: c.surface, borderColor: text ? c.primary : 'transparent' }, shadow(c, 1)]}>
          <Icon name="search" size={22} color={c.primaryText} />
          <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={() => submitText()}
            placeholder={dictation.state === 'listening' ? t('dictating') : t('heroPlaceholder')}
            placeholderTextColor={c.textMuted}
            accessibilityLabel={t('searchA11y')}
            accessibilityHint={t('heroPlaceholder')}
            returnKeyType="done"
            submitBehavior="submit"
            autoCorrect={false}
            autoFocus
            maxFontSizeMultiplier={MAX_FONT_SCALE}
            style={[styles.heroInput, { color: c.text }]}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={t('dictate')}
            accessibilityState={{ busy: dictation.state === 'listening' }}
            onPress={() => (dictation.state === 'listening' ? dictation.stop() : dictation.start())}
            hitSlop={6}
            style={[styles.mic, { backgroundColor: dictation.state === 'listening' ? c.accent : c.primarySoft }]}
          >
            <Icon name="mic" size={22} color={dictation.state === 'listening' ? c.onAccent : c.primaryText} />
          </Pressable>
        </View>

        {suggestions.length > 0 && (
          <View style={[styles.suggest, { backgroundColor: c.surface }, shadow(c, 2)]}>
            {suggestions.map((ing) => (
              <Pressable
                key={ing.id}
                accessibilityRole="button"
                accessibilityLabel={l(ing.name)}
                onPress={() => pickSuggestion(ing)}
                style={({ pressed }) => [styles.suggestRow, { backgroundColor: pressed ? c.primarySoft : 'transparent' }]}
              >
                <Txt style={{ fontSize: 20 }}>{ing.emoji}</Txt>
                <Txt style={{ marginLeft: space(3), fontWeight: '500' }}>{l(ing.name)}</Txt>
                <View style={{ flex: 1 }} />
                <Icon name="add" size={18} color={c.primaryText} />
              </Pressable>
            ))}
          </View>
        )}

        {showTip && <Tip text={t('tipAfterAdd')} last onNext={() => setShowTip(false)} />}

        {/* Ajout rapide */}
        <Txt v="label" muted style={{ marginTop: space(7), marginBottom: space(3) }}>
          {t('quickAdd')}
        </Txt>
        <View style={ui.wrap}>
          {quick.map((id) => (
            <Chip key={id} label={`${name(id)}  +`} onPress={() => add([id])} />
          ))}
        </View>

        {/* Ce qui est déjà dans le frigo */}
        {fridge.items.length > 0 && (
          <>
            <Txt v="label" muted style={{ marginTop: space(7), marginBottom: space(3) }}>
              {t('inFridgeNow')} · {fridge.items.length}
            </Txt>
            <View style={ui.wrap}>
              {fridge.items.slice(0, MAX_CHIPS).map((it) => (
                <Chip
                  key={it.id}
                  selected
                  label={itemName(it)}
                  onRemove={() => remove(it)}
                  removeLabel={t('removeIngredientA11y', { name: ingredientName(it.ingredient_id, it.custom_name, lang) })}
                />
              ))}
              {fridge.items.length > MAX_CHIPS && <Chip label={t('moreInFridge', { n: fridge.items.length - MAX_CHIPS })} onPress={() => router.push('/fridge')} />}
            </View>
          </>
        )}
      </ScrollView>

      <View style={[styles.sticky, { backgroundColor: c.bg }]} pointerEvents="box-none">
        <Button title={t('seeIdeas')} icon="pot" onPress={seeIdeas} disabled={fridge.ids.size === 0 && !text.trim()} style={{ minHeight: 60 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingLeft: space(4),
    paddingRight: space(2),
    minHeight: 68,
    gap: space(3),
  },
  heroInput: { flex: 1, minWidth: 0, fontSize: 17, fontFamily: FONTS.body, paddingVertical: space(4) },
  mic: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  suggest: { borderRadius: radius.md, marginTop: space(2), paddingVertical: space(1), overflow: 'hidden' },
  suggestRow: { flexDirection: 'row', alignItems: 'center', minHeight: TOUCH + 4, paddingHorizontal: space(4) },
  sticky: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: space(5), paddingTop: space(3), paddingBottom: space(4) },
});
