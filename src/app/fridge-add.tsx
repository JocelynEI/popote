import { router, useLocalSearchParams } from 'expo-router';
import { useMemo, useState } from 'react';
import { Alert, ScrollView, View } from 'react-native';
import { DateChooser } from '../components/Expiry';
import { IngredientSearch } from '../components/IngredientSearch';
import { useToast } from '../components/Toast';
import { Button, Chip, Screen, Txt } from '../components/ui';
import { INGREDIENT_BY_ID } from '../data/ingredients';
import type { Ingredient } from '../data/types';
import { addFridgeItem, findFridgeDuplicate, listFridge, mergeFridgeItem, updateFridgeExpiry } from '../db/repo';
import { useI18n } from '../i18n';
import { checkExpiryDate } from '../logic/expiry';
import { requestPermission } from '../services/notifications';
import { useSettings } from '../state/settings';
import { space, useTheme } from '../theme/theme';

/** Ajout d'un produit au frigo (ou modification de sa date si ?id=…) */
export default function FridgeAddScreen() {
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const { settings, update } = useSettings();
  const toast = useToast();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const editing = useMemo(() => (id ? listFridge().find((i) => String(i.id) === id) : undefined), [id]);

  const [ing, setIng] = useState<Ingredient | null>(null);
  const [free, setFree] = useState<string | null>(null);
  const [date, setDate] = useState<string | null>(editing?.expires_at ?? null);

  const name = editing
    ? editing.ingredient_id
      ? l(INGREDIENT_BY_ID[editing.ingredient_id]?.name ?? { fr: '?', en: '?' })
      : editing.custom_name ?? ''
    : ing
      ? l(ing.name)
      : free ?? '';

  /** Demande de permission contextuelle, au premier produit daté */
  const maybeAskNotifications = () => {
    if (!date || settings.notifAsked) return;
    update({ notifAsked: true });
    Alert.alert(t('notifAskTitle'), t('notifAskText'), [
      { text: t('notifAskNo'), style: 'cancel' },
      { text: t('notifAskYes'), onPress: () => requestPermission(lang).catch(() => {}) },
    ]);
  };

  const finish = () => {
    toast.show(t('itemAdded', { name }));
    router.back();
    setTimeout(maybeAskNotifications, 400);
  };

  const doAdd = () => {
    const dup = findFridgeDuplicate(ing?.id ?? null, free);
    if (dup) {
      Alert.alert(t('duplicateTitle'), t('duplicateText', { name }), [
        { text: t('cancel'), style: 'cancel' },
        { text: t('addAnyway'), onPress: () => (addFridgeItem({ ingredientId: ing?.id, customName: free, expiresAt: date }), finish()) },
        { text: t('merge'), onPress: () => (mergeFridgeItem(dup, date), finish()) },
      ]);
      return;
    }
    addFridgeItem({ ingredientId: ing?.id, customName: free, expiresAt: date });
    finish();
  };

  const submit = () => {
    if (date) {
      const chk = checkExpiryDate(date);
      if (chk === 'tooFar') return Alert.alert(t('dateTooFar'));
      if (chk === 'past')
        return Alert.alert(t('datePastTitle'), t('datePastText'), [
          { text: t('cancel'), style: 'cancel' },
          { text: t('addAnyway'), onPress: () => (editing ? save() : doAdd()) },
        ]);
    }
    if (editing) save();
    else doAdd();
  };

  const save = () => {
    if (!editing) return;
    updateFridgeExpiry(editing.id, date);
    router.back();
    setTimeout(maybeAskNotifications, 400);
  };

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(4), gap: space(5) }} keyboardShouldPersistTaps="handled">
        {editing || ing || free ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: space(2) }}>
            <Chip
              selected
              label={`${ing?.emoji ?? (editing?.ingredient_id ? INGREDIENT_BY_ID[editing.ingredient_id]?.emoji : '🥡') ?? ''} ${name}`}
              onRemove={
                editing
                  ? undefined
                  : () => {
                      setIng(null);
                      setFree(null);
                    }
              }
              removeLabel={t('removeIngredientA11y', { name })}
            />
          </View>
        ) : (
          <IngredientSearch autoFocus onPick={setIng} onFree={setFree} />
        )}
        {free && (
          <Txt v="small" muted>
            {t('freeIngredientInfo')}
          </Txt>
        )}
        <DateChooser value={date} onChange={setDate} />
        <Button title={editing ? t('save') : t('add')} icon="checkmark" disabled={!editing && !ing && !free} onPress={submit} />
        <Txt v="small" style={{ color: c.textMuted, textAlign: 'center' }}>
          {t('privacyBadge')}
        </Txt>
      </ScrollView>
    </Screen>
  );
}
