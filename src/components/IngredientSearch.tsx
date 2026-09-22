import { Icon } from './Icon';
import { forwardRef, useMemo, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';
import type { Ingredient } from '../data/types';
import { useI18n } from '../i18n';
import { didYouMean, searchIngredients } from '../logic/ingredientSearch';
import { radius, shadow, space, TOUCH, useTheme } from '../theme/theme';
import { haptic, MAX_FONT_SCALE, Txt } from './ui';

interface Props {
  exclude?: Set<string>;
  onPick: (ing: Ingredient) => void;
  /** permet d'ajouter un ingrédient libre (texte) */
  onFree?: (text: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}

/** Barre de recherche d'ingrédients avec autocomplétion, « Vouliez-vous dire… ? » et ingrédient libre. */
export const IngredientSearch = forwardRef<TextInput, Props>(function IngredientSearch(
  { exclude, onPick, onFree, placeholder, autoFocus },
  ref,
) {
  const { c } = useTheme();
  const { t, l } = useI18n();
  const [q, setQ] = useState('');
  const hits = useMemo(() => searchIngredients(q, exclude), [q, exclude]);
  const suggestion = useMemo(() => (q.trim().length >= 3 && hits.length === 0 ? didYouMean(q) : null), [q, hits.length]);

  const pick = (ing: Ingredient) => {
    haptic();
    onPick(ing);
    setQ('');
  };

  return (
    <View>
      <View style={[styles.inputWrap, { backgroundColor: c.surface }, shadow(c, 1)]}>
        <View style={[styles.searchIcon, { backgroundColor: c.primary }]}>
          <Icon name="search" size={18} color={c.onPrimary} />
        </View>
        <TextInput
          ref={ref}
          value={q}
          onChangeText={setQ}
          placeholder={placeholder ?? t('searchPlaceholder')}
          placeholderTextColor={c.textMuted}
          accessibilityLabel={t('searchA11y')}
          autoFocus={autoFocus}
          autoCorrect={false}
          returnKeyType="done"
          onSubmitEditing={() => hits[0] && pick(hits[0].ing)}
          maxFontSizeMultiplier={MAX_FONT_SCALE}
          style={[styles.input, { color: c.text }]}
        />
        {q ? (
          <Pressable accessibilityRole="button" accessibilityLabel={t('clearSelection')} onPress={() => setQ('')} hitSlop={10}>
            <Icon name="close-circle" size={20} color={c.textMuted} />
          </Pressable>
        ) : null}
      </View>

      {q.trim().length > 0 && (
        <View style={[styles.dropdown, { backgroundColor: c.surface }, shadow(c, 2)]}>
          {hits.map(({ ing }) => (
            <Pressable
              key={ing.id}
              accessibilityRole="button"
              accessibilityLabel={l(ing.name)}
              onPress={() => pick(ing)}
              style={({ pressed }) => [styles.hit, { backgroundColor: pressed ? c.primarySoft : 'transparent' }]}
            >
              <Txt style={{ fontSize: 22 }} accessibilityElementsHidden importantForAccessibility="no">
                {ing.emoji}
              </Txt>
              <Txt style={{ marginLeft: space(3), fontWeight: '700' }}>{l(ing.name)}</Txt>
            </Pressable>
          ))}
          {suggestion && (
            <Pressable accessibilityRole="button" onPress={() => pick(suggestion)} style={styles.hit}>
              <Txt color={c.primaryText}>{t('didYouMean', { name: `${suggestion.emoji} ${l(suggestion.name)}` })}</Txt>
            </Pressable>
          )}
          {onFree && hits.length === 0 && (
            <Pressable
              accessibilityRole="button"
              onPress={() => {
                onFree(q.trim());
                setQ('');
              }}
              style={styles.hit}
            >
              <Icon name="add-circle-outline" size={20} color={c.primaryText} />
              <Txt color={c.primaryText} style={{ marginLeft: space(2), flex: 1 }}>
                {t('addFreeIngredient', { q: q.trim() })}
              </Txt>
            </Pressable>
          )}
        </View>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  inputWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radius.pill,
    paddingLeft: space(2),
    paddingRight: space(4),
    minHeight: TOUCH + 16,
    gap: space(3),
  },
  searchIcon: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  input: { flex: 1, fontSize: 17, paddingVertical: space(3), fontFamily: 'Inter_500Medium' },
  dropdown: { borderRadius: radius.lg, marginTop: space(2), overflow: 'hidden', paddingVertical: space(1) },
  hit: { flexDirection: 'row', alignItems: 'center', minHeight: TOUCH + 4, paddingHorizontal: space(4) },
});
