import { router } from 'expo-router';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Pressable, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import { Illo } from '../../components/Dish';
import { Icon } from '../../components/Icon';
import { Tip } from '../../components/Tip';
import { useToast } from '../../components/Toast';
import { Button, Chip, haptic, IconButton, MAX_FONT_SCALE, Screen, styles as ui, Txt } from '../../components/ui';
import { INGREDIENT_BY_ID } from '../../data/ingredients';
import type { Ingredient } from '../../data/types';
import { useFridge } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { parseIngredientText, searchIngredients } from '../../logic/ingredientSearch';
import { useDictation } from '../../services/voice';
import { useSettings } from '../../state/settings';
import { FONTS, radius, shadow, space, TOUCH, useTheme } from '../../theme/theme';

/** Basiques du placard proposés en « Ajout rapide » (scroll horizontal) */
const QUICK_TAGS = ['pasta', 'rice', 'egg', 'cream', 'onion', 'tomato', 'emmental', 'potato', 'milk', 'butter', 'chicken', 'garlic', 'bread', 'zucchini', 'lemon'];
const GUTTER = space(5);

/**
 * Écran 1 — L'inventaire spontané.
 * Objectif : saisir ses restes en moins de 3 secondes, puis « Créer ma Popote ».
 */
export default function HomeScreen() {
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const { settings, update } = useSettings();
  const toast = useToast();
  const fridge = useFridge();
  const inputRef = useRef<TextInput>(null);

  const [selected, setSelected] = useState<string[]>([]);
  const [text, setText] = useState('');
  const [includeSaved, setIncludeSaved] = useState(true);
  const [tipStep, setTipStep] = useState(settings.tipsSeen.includes('home2') ? -1 : 0);

  // Premier lancement : écran de préférences facultatif (une fois la navigation montée)
  useEffect(() => {
    if (settings.prefsDone) return;
    const id = setTimeout(() => router.push('/preferences'), 300);
    return () => clearTimeout(id);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const nextTip = () => {
    if (tipStep >= 2) {
      setTipStep(-1);
      update({ tipsSeen: [...settings.tipsSeen, 'home2'] });
    } else setTipStep(tipStep + 1);
  };

  const add = (ids: string[]) => {
    const fresh = ids.filter((id) => !selected.includes(id));
    if (fresh.length) {
      haptic();
      setSelected((s) => [...s, ...fresh.filter((id) => !s.includes(id))]);
    }
    return fresh.length;
  };

  /** Validation de la saisie libre : « 2 œufs, un demi brocoli, du cheddar » -> 3 puces */
  const submitText = (value = text) => {
    const v = value.trim();
    if (!v) return [];
    const { found, unknown } = parseIngredientText(v);
    const n = add(found.map((i) => i.id));
    if (n > 1) toast.show(t('parsedToast', { n }));
    if (unknown.length) toast.show(t('notUnderstood', { list: unknown.join(', ') }));
    setText('');
    return found.map((i) => i.id);
  };

  const dictation = useDictation(lang, (spoken) => submitText(spoken));
  useEffect(() => {
    if (dictation.state === 'unavailable' || dictation.state === 'onlineOnly') toast.show(t('dictationUnavailable'));
    if (dictation.state === 'denied') toast.show(t('voiceDenied'));
  }, [dictation.state]); // eslint-disable-line react-hooks/exhaustive-deps

  // suggestions pendant la frappe (sur le dernier morceau de la phrase)
  const lastPart = text.split(/[,;]/).pop()?.trim() ?? '';
  const suggestions = useMemo(
    () => (lastPart.length >= 1 ? searchIngredients(lastPart, new Set(selected), 5).map((h) => h.ing) : []),
    [lastPart, selected],
  );

  const pickSuggestion = (ing: Ingredient) => {
    add([ing.id]);
    const parts = text.split(/[,;]/);
    parts.pop();
    const rest = parts.join(',').trim();
    setText(rest ? `${rest}, ` : '');
  };

  const savedCount = fridge.ids.size;
  const total = new Set([...selected, ...(includeSaved ? [...fridge.ids] : [])]).size;
  const name = (id: string) => `${INGREDIENT_BY_ID[id]?.emoji ?? ''} ${l(INGREDIENT_BY_ID[id]?.name ?? { fr: id, en: id })}`;

  const create = () => {
    // le texte encore dans le champ est pris en compte
    const typed = text.trim() ? submitText() : [];
    const all = [...new Set([...selected, ...typed])];
    router.push({ pathname: '/results', params: { ing: all.join(','), fridge: includeSaved ? '1' : '0' } });
  };

  const quick = QUICK_TAGS.filter((id) => !selected.includes(id));

  return (
    <Screen>
      <ScrollView contentContainerStyle={{ paddingBottom: 150 }} keyboardShouldPersistTaps="handled">
        {/* Header : logo centré, profil à droite */}
        <View style={styles.header}>
          <IconButton icon="trophy-outline" label={t('progress')} onPress={() => router.push('/progress')} color={c.primaryText} size={22} style={styles.headerBtn} />
          <View style={styles.logo} accessibilityRole="header" accessible accessibilityLabel="Popote">
            <Icon name="pot" size={22} color={c.accent} />
            <Txt style={{ fontFamily: FONTS.display, fontSize: 26, lineHeight: 32, marginLeft: 6 }} color={c.primaryText}>
              Popote
            </Txt>
          </View>
          <IconButton icon="user" label={t('profile')} onPress={() => router.push('/settings')} color={c.primaryText} size={22} style={styles.headerBtn} />
        </View>

        <View style={{ paddingHorizontal: GUTTER }}>
          <Txt v="display" style={{ marginTop: space(6) }}>
            {t('homeTitle')}
          </Txt>
          <Txt muted style={{ marginTop: space(2) }}>
            {t('homeSubtitle')}
          </Txt>

          {tipStep === 0 && <Tip text={t('tip1')} onNext={nextTip} />}

          {/* Saisie héros : texte libre + micro */}
          <View style={[styles.hero, { backgroundColor: c.surface, borderColor: text ? c.primary : 'transparent' }, shadow(c, 1)]}>
            <Icon name="search" size={22} color={c.primaryText} />
            <TextInput
              ref={inputRef}
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
        </View>

        {/* Ajout rapide : scroll horizontal */}
        {tipStep === 1 && (
          <View style={{ paddingHorizontal: GUTTER }}>
            <Tip text={t('tip2')} onNext={nextTip} />
          </View>
        )}
        <Txt v="label" muted style={{ paddingHorizontal: GUTTER, marginTop: space(7), marginBottom: space(3) }}>
          {t('quickAdd')}
        </Txt>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: space(2), paddingHorizontal: GUTTER, paddingBottom: space(2) }}
          keyboardShouldPersistTaps="handled"
        >
          {quick.map((id) => (
            <Chip key={id} label={`${name(id)}  +`} onPress={() => add([id])} />
          ))}
        </ScrollView>

        {/* Zone « Mon frigo » : puces supprimables */}
        <View style={{ paddingHorizontal: GUTTER, marginTop: space(8) }}>
          <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
            <Txt v="h2" style={{ flex: 1 }}>
              {t('myFridgeZone')}
            </Txt>
            {selected.length > 0 && (
              <Pressable accessibilityRole="button" onPress={() => setSelected([])} hitSlop={8}>
                <Txt v="small" color={c.primaryText} style={{ fontWeight: '600' }}>
                  {t('clearSelection')}
                </Txt>
              </Pressable>
            )}
          </View>

          {selected.length ? (
            <View style={[ui.wrap, { marginTop: space(4) }]}>
              {selected.map((id) => (
                <Chip
                  key={id}
                  selected
                  label={name(id)}
                  onRemove={() => setSelected((s) => s.filter((x) => x !== id))}
                  removeLabel={t('removeIngredientA11y', { name: l(INGREDIENT_BY_ID[id]?.name ?? { fr: id, en: id }) })}
                />
              ))}
            </View>
          ) : (
            <View style={[styles.emptyZone, { borderColor: c.border }]}>
              <Illo name="salad" size={72} />
              <Txt muted style={{ flex: 1, marginLeft: space(3) }}>
                {t('myFridgeEmpty')}
              </Txt>
            </View>
          )}

          {savedCount > 0 ? (
            <Pressable
              accessibilityRole="switch"
              accessibilityState={{ checked: includeSaved }}
              onPress={() => (haptic(), setIncludeSaved(!includeSaved))}
              style={styles.includeRow}
            >
              <Icon name={includeSaved ? 'checkbox' : 'square-outline'} size={22} color={includeSaved ? c.primaryText : c.textMuted} />
              <Txt style={{ marginLeft: space(2), flex: 1 }}>{t('includeSaved', { n: savedCount })}</Txt>
            </Pressable>
          ) : (
            <Pressable accessibilityRole="button" onPress={() => router.push('/quick-fill')} style={styles.includeRow}>
              <Txt color={c.primaryText} style={{ fontWeight: '600' }}>
                {t('emptyQuickFill')} →
              </Txt>
            </Pressable>
          )}

          {/* Anti-gaspi : produits à finir vite */}
          {fridge.urgentItems.length > 0 && (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${t('urgentBannerA11y', { n: fridge.urgentItems.length })}. ${t('seeIdeas')}`}
              onPress={() => router.push('/empty-fridge')}
              style={[styles.urgent, { backgroundColor: c.accentSoft }]}
            >
              <Txt style={{ flex: 1 }} numberOfLines={2}>
                {t('urgentShort', {
                  list: fridge.urgentItems
                    .slice(0, 3)
                    .map((i) => (i.ingredient_id && INGREDIENT_BY_ID[i.ingredient_id] ? l(INGREDIENT_BY_ID[i.ingredient_id].name) : i.custom_name))
                    .join(', '),
                })}
              </Txt>
              <Txt v="small" color={c.accentText} style={{ fontWeight: '700', marginLeft: space(2) }}>
                {t('seeIdeas')} →
              </Txt>
            </Pressable>
          )}

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

      {/* CTA fixé en bas */}
      <View style={[styles.sticky, { backgroundColor: c.bg }]} pointerEvents="box-none">
        {tipStep === 2 && <Tip text={t('tip3')} last onNext={nextTip} />}
        <Button title={total > 0 ? `${t('ctaCreate')} · ${total}` : t('ctaCreate')} icon="pot" onPress={create} disabled={total === 0 && !text.trim()} style={{ minHeight: 60 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space(3), marginTop: space(2) },
  headerBtn: { width: TOUCH, height: TOUCH },
  logo: { flexDirection: 'row', alignItems: 'center' },
  hero: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.md,
    borderWidth: 1.5,
    paddingLeft: space(4),
    paddingRight: space(2),
    minHeight: 68,
    marginTop: space(6),
    gap: space(3),
  },
  heroInput: { flex: 1, minWidth: 0, fontSize: 17, fontFamily: FONTS.body, paddingVertical: space(4) },
  mic: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  suggest: { borderRadius: radius.md, marginTop: space(2), paddingVertical: space(1), overflow: 'hidden' },
  suggestRow: { flexDirection: 'row', alignItems: 'center', minHeight: TOUCH + 4, paddingHorizontal: space(4) },
  emptyZone: { flexDirection: 'row', alignItems: 'center', borderWidth: 1.5, borderStyle: 'dashed', borderRadius: radius.md, padding: space(4), marginTop: space(4) },
  includeRow: { flexDirection: 'row', alignItems: 'center', minHeight: TOUCH, marginTop: space(3) },
  urgent: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.md, padding: space(4), marginTop: space(5) },
  privacy: { flexDirection: 'row', alignItems: 'center', gap: space(2), marginTop: space(6), paddingVertical: space(2) },
  sticky: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: GUTTER, paddingTop: space(3), paddingBottom: space(4) },
});
