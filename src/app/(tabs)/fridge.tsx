import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, Pressable, TextInput, View } from 'react-native';
import { Illo } from '../../components/Dish';
import { ExpiryPill } from '../../components/Expiry';
import { useToast } from '../../components/Toast';
import { Button, EmptyState, IconButton, MAX_FONT_SCALE, Screen, Txt } from '../../components/ui';
import { INGREDIENT_BY_ID } from '../../data/ingredients';
import { deleteFridgeItem, type FridgeItem, ingredientName, resolveFridgeItem, restoreFridgeItem } from '../../db/repo';
import { useFridge } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { key } from '../../logic/text';
import { checkBadges } from '../../services/progress';
import { radius, shadow, space, useTheme } from '../../theme/theme';

export default function FridgeScreen() {
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const toast = useToast();
  const { items } = useFridge();
  const [q, setQ] = useState('');

  const filtered = useMemo(() => {
    const k = key(q);
    if (!k) return items;
    return items.filter((i) => key(ingredientName(i.ingredient_id, i.custom_name, lang)).includes(k));
  }, [items, q, lang]);

  const resolve = (it: FridgeItem, outcome: 'used' | 'wasted') => {
    resolveFridgeItem(it.id, outcome);
    toast.show(outcome === 'used' ? t('usedToast') : t('wastedToast'));
    checkBadges().forEach((b) => setTimeout(() => toast.show(t('badgeUnlocked', { name: `${b.emoji} ${l(b.title)}` })), 2600));
  };

  const remove = (it: FridgeItem) => {
    const snapshot = deleteFridgeItem(it.id);
    toast.show(t('deletedToast'), { onUndo: () => snapshot && restoreFridgeItem(snapshot) });
  };

  const renderItem = ({ item }: { item: FridgeItem }) => {
    const ing = item.ingredient_id ? INGREDIENT_BY_ID[item.ingredient_id] : undefined;
    const name = ing ? l(ing.name) : item.custom_name ?? '?';
    return (
      <View style={[{ backgroundColor: c.surface, borderRadius: radius.lg, padding: space(4), marginBottom: space(3) }, shadow(c, 1)]}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`${name}. ${t('changeDate')}`}
          onPress={() => router.push({ pathname: '/fridge-add', params: { id: String(item.id) } })}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Txt style={{ fontSize: 30, marginRight: space(3) }} accessibilityElementsHidden importantForAccessibility="no">
            {ing?.emoji ?? '🥡'}
          </Txt>
          <View style={{ flex: 1 }}>
            <Txt v="h3">{name}</Txt>
            <View style={{ marginTop: 4 }}>
              <ExpiryPill expiresAt={item.expires_at} />
            </View>
          </View>
          <IconButton icon="trash-outline" label={`${t('delete')} ${name}`} onPress={() => remove(item)} color={c.textMuted} />
        </Pressable>
        <View style={{ flexDirection: 'row', gap: space(2), marginTop: space(3) }}>
          <Button small kind="secondary" icon="checkmark" title={t('markUsed')} onPress={() => resolve(item, 'used')} style={{ flex: 1 }} a11yHint={name} />
          <Button small kind="danger" icon="trash-bin-outline" title={t('markWasted')} onPress={() => resolve(item, 'wasted')} style={{ flex: 1 }} a11yHint={name} />
        </View>
      </View>
    );
  };

  return (
    <Screen>
      <FlatList
        data={filtered}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: space(4), paddingBottom: space(24) }}
        ListHeaderComponent={
          <View style={{ marginBottom: space(4) }}>
            <Txt v="h1" accessibilityRole="header">
              {t('fridgeTitle')}
            </Txt>
            <View style={{ flexDirection: 'row', gap: space(2), marginTop: space(3) }}>
              <Button title={t('fridgeAdd')} icon="add" onPress={() => router.push('/fridge-add')} style={{ flex: 1 }} />
              <Button title={t('fridgeQuickFill')} kind="secondary" icon="grid-outline" onPress={() => router.push('/quick-fill')} style={{ flex: 1 }} />
            </View>
            {items.length > 8 && (
              <TextInput
                value={q}
                onChangeText={setQ}
                placeholder={t('fridgeSearch')}
                placeholderTextColor={c.textMuted}
                accessibilityLabel={t('fridgeSearch')}
                maxFontSizeMultiplier={MAX_FONT_SCALE}
                style={{ marginTop: space(3), borderWidth: 1, borderColor: c.border, borderRadius: radius.md, padding: space(3), color: c.text, fontSize: 16, minHeight: 48 }}
              />
            )}
          </View>
        }
        ListEmptyComponent={
          q ? null : (
            <EmptyState illo={<Illo name="salad" size={140} />} title={t('fridgeEmpty')} text={t('emptyText')}>
              <Button title={t('emptyQuickFill')} icon="grid-outline" onPress={() => router.push('/quick-fill')} />
            </EmptyState>
          )
        }
        initialNumToRender={12}
      />
    </Screen>
  );
}
