import { Icon } from '../../components/Icon';
import { useState } from 'react';
import { Alert, FlatList, Pressable, Share, TextInput, View } from 'react-native';
import { Illo } from '../../components/Dish';
import { useToast } from '../../components/Toast';
import { Button, EmptyState, haptic, IconButton, MAX_FONT_SCALE, Screen, Txt } from '../../components/ui';
import { INGREDIENT_BY_ID } from '../../data/ingredients';
import {
  addShopping,
  clearCheckedShopping,
  deleteShopping,
  ingredientName,
  listShopping,
  moveCheckedShoppingToFridge,
  restoreShopping,
  type ShoppingItem,
  toggleShopping,
} from '../../db/repo';
import { useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { searchIngredients } from '../../logic/ingredientSearch';
import { key } from '../../logic/text';
import { radius, space, TOUCH, useTheme } from '../../theme/theme';

export default function ShoppingScreen() {
  const { c } = useTheme();
  const { t, lang } = useI18n();
  const toast = useToast();
  const items = useData(listShopping);
  const [text, setText] = useState('');
  const checked = items.filter((i) => i.checked);

  const add = () => {
    const q = text.trim();
    if (!q) return;
    // si le texte correspond exactement à un ingrédient connu, on le relie (utile pour le frigo ensuite)
    const hit = searchIngredients(q, new Set(), 1)[0];
    const exact = hit && (key(hit.ing.name.fr) === key(q) || key(hit.ing.name.en) === key(q) || hit.score === 0);
    const n = addShopping([exact ? { ingredientId: hit.ing.id } : { customName: q }]);
    if (!n) toast.show(t('shoppingAlready'));
    setText('');
  };

  const finish = () => {
    Alert.alert(t('shoppingToFridgeTitle'), t('shoppingToFridgeText', { n: checked.length }), [
      { text: t('cancel'), style: 'cancel' },
      { text: t('shoppingToFridgeNo'), onPress: clearCheckedShopping },
      {
        text: t('shoppingToFridgeYes'),
        onPress: () => {
          const n = moveCheckedShoppingToFridge();
          toast.show(t('addedSelectionToFridge', { n }));
        },
      },
    ]);
  };

  const share = () => {
    const lines = items.filter((i) => !i.checked).map((i) => `• ${ingredientName(i.ingredient_id, i.custom_name, lang)}`);
    Share.share({ message: `${t('shoppingShareTitle')}\n\n${lines.join('\n')}\n\n${t('shareRecipeFooter')}` }).catch(() => {});
  };

  const renderItem = ({ item }: { item: ShoppingItem }) => {
    const name = ingredientName(item.ingredient_id, item.custom_name, lang);
    const emoji = item.ingredient_id ? INGREDIENT_BY_ID[item.ingredient_id]?.emoji : '🛒';
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', minHeight: TOUCH + 12, borderBottomColor: c.border, borderBottomWidth: 0.5 }}>
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: !!item.checked }}
          accessibilityLabel={t('checkA11y', { name })}
          onPress={() => {
            haptic();
            toggleShopping(item.id);
          }}
          style={{ flex: 1, flexDirection: 'row', alignItems: 'center', minHeight: TOUCH + 12 }}
        >
          <Icon name={item.checked ? 'checkbox' : 'square-outline'} size={26} color={item.checked ? c.primaryText : c.textMuted} />
          <Txt style={{ marginLeft: space(3), fontSize: 20 }} accessibilityElementsHidden importantForAccessibility="no">
            {emoji}
          </Txt>
          <Txt style={{ marginLeft: space(2), flex: 1, textDecorationLine: item.checked ? 'line-through' : 'none' }} muted={!!item.checked}>
            {name}
          </Txt>
        </Pressable>
        <IconButton
          icon="close"
          label={`${t('delete')} ${name}`}
          color={c.textMuted}
          onPress={() => {
            const snap = deleteShopping(item.id);
            toast.show(t('deletedToast'), { onUndo: () => snap && restoreShopping(snap) });
          }}
        />
      </View>
    );
  };

  return (
    <Screen>
      <FlatList
        data={items}
        keyExtractor={(i) => String(i.id)}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: space(4), paddingBottom: space(24) }}
        ListHeaderComponent={
          <View style={{ marginBottom: space(3) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Txt v="h1" accessibilityRole="header" style={{ flex: 1 }}>
                {t('shoppingTitle')}
              </Txt>
              {items.length > 0 && <IconButton icon="share-outline" label={t('share')} onPress={share} />}
            </View>
            <View style={{ flexDirection: 'row', gap: space(2), marginTop: space(3) }}>
              <TextInput
                value={text}
                onChangeText={setText}
                onSubmitEditing={add}
                returnKeyType="done"
                placeholder={t('shoppingAddPlaceholder')}
                placeholderTextColor={c.textMuted}
                accessibilityLabel={t('shoppingAddPlaceholder')}
                maxFontSizeMultiplier={MAX_FONT_SCALE}
                style={{ flex: 1, borderRadius: radius.pill, paddingHorizontal: space(5), color: c.text, fontSize: 16, minHeight: 52, backgroundColor: c.surface, fontFamily: 'Inter_500Medium' }}
              />
              <Button title={t('add')} onPress={add} disabled={!text.trim()} />
            </View>
            {checked.length > 0 && <Button title={t('shoppingFinish')} icon="bag-check-outline" kind="secondary" onPress={finish} style={{ marginTop: space(3) }} />}
          </View>
        }
        ListEmptyComponent={<EmptyState illo={<Illo name="fruit" size={140} />} title={t('shoppingEmpty')} text={t('shoppingEmptyHint')} />}
      />
    </Screen>
  );
}
