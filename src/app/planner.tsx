import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useMemo, useState } from 'react';
import { FlatList, Modal, Pressable, ScrollView, TextInput, View } from 'react-native';
import { DishArt } from '../components/Dish';
import { useToast } from '../components/Toast';
import { Button, Card, IconButton, MAX_FONT_SCALE, Screen, Txt } from '../components/ui';
import { PANTRY_IDS } from '../data/ingredients';
import { addShopping, listMealPlan, setMealPlan } from '../db/repo';
import { useAllRecipes, useData, useFridge } from '../hooks/useData';
import { useI18n } from '../i18n';
import { addDays, fromISODate, todayISO } from '../logic/expiry';
import { key } from '../logic/text';
import { usePremium } from '../services/premium';
import { radius, space, TOUCH, useTheme } from '../theme/theme';

type Slot = 'lunch' | 'dinner';

function mondayOf(iso: string): string {
  const d = fromISODate(iso);
  const day = (d.getDay() + 6) % 7;
  return addDays(iso, -day);
}

export default function PlannerScreen() {
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const { isPremium } = usePremium();
  const toast = useToast();
  const { add } = useLocalSearchParams<{ add?: string }>();
  const recipes = useAllRecipes();
  const fridge = useFridge();
  const [weekStart, setWeekStart] = useState(mondayOf(todayISO()));
  const [pending, setPending] = useState<string | undefined>(add);
  const [picking, setPicking] = useState<{ date: string; slot: Slot } | null>(null);
  const [q, setQ] = useState('');

  const days = useMemo(() => Array.from({ length: 7 }, (_, i) => addDays(weekStart, i)), [weekStart]);
  const plan = useData(() => listMealPlan(days[0], days[6]), [days]);
  const byId = useMemo(() => new Map(recipes.map((r) => [r.id, r])), [recipes]);
  const at = (date: string, slot: Slot) => plan.find((p) => p.date === date && p.slot === slot);

  useEffect(() => {
    if (!isPremium) router.replace('/premium');
  }, [isPremium]);
  if (!isPremium) return null;

  const onSlot = (date: string, slot: Slot) => {
    if (pending) {
      setMealPlan(date, slot, pending);
      setPending(undefined);
      return;
    }
    setPicking({ date, slot });
  };

  const generate = () => {
    const missing = new Set<string>();
    for (const p of plan) {
      const r = byId.get(p.recipe_id);
      r?.ingredients.filter((i) => !i.optional && !PANTRY_IDS.has(i.id) && !fridge.ids.has(i.id)).forEach((i) => missing.add(i.id));
    }
    const n = addShopping([...missing].map((id) => ({ ingredientId: id })));
    toast.show(t('plannerGenerated', { n }));
  };

  const dayLabel = (iso: string) =>
    fromISODate(iso).toLocaleDateString(lang === 'fr' ? 'fr-FR' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'short' });

  const pickList = recipes.filter((r) => (r.premium ? isPremium : true)).filter((r) => !q || key(l(r.title)).includes(key(q)));

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(4), paddingBottom: space(16) }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <IconButton icon="chevron-back" label={t('prevWeek')} onPress={() => setWeekStart(addDays(weekStart, -7))} />
          <Txt v="h3" style={{ flex: 1, textAlign: 'center' }}>
            {dayLabel(days[0])} → {dayLabel(days[6])}
          </Txt>
          <IconButton icon="chevron-forward" label={t('nextWeek')} onPress={() => setWeekStart(addDays(weekStart, 7))} />
        </View>
        {pending && byId.get(pending) && (
          <Card style={{ backgroundColor: c.surfaceAlt, marginVertical: space(2) }}>
            <Txt>
              {byId.get(pending)!.icon} {l(byId.get(pending)!.title)} → {t('plannerPick')}
            </Txt>
          </Card>
        )}
        {days.map((d) => (
          <View key={d} style={{ marginTop: space(4) }}>
            <Txt v="label" muted style={{ marginBottom: space(2) }}>
              {dayLabel(d)}
            </Txt>
            <View style={{ flexDirection: 'row', gap: space(2) }}>
              {(['lunch', 'dinner'] as Slot[]).map((slot) => {
                const p = at(d, slot);
                const r = p ? byId.get(p.recipe_id) : undefined;
                return (
                  <Pressable
                    key={slot}
                    accessibilityRole="button"
                    accessibilityLabel={`${dayLabel(d)}, ${t(slot)}: ${r ? l(r.title) : t('plannerEmptySlot')}`}
                    onPress={() => onSlot(d, slot)}
                    onLongPress={() => p && setMealPlan(d, slot, null)}
                    style={{ flex: 1, minHeight: TOUCH + 20, borderRadius: radius.md, borderWidth: 1, borderColor: r ? c.primary : c.border, backgroundColor: r ? c.surfaceAlt : c.surface, padding: space(2) }}
                  >
                    <Txt v="small" muted>
                      {t(slot)}
                    </Txt>
                    <Txt v="small" numberOfLines={2} style={{ fontWeight: r ? '700' : '400' }}>
                      {r ? `${r.icon} ${l(r.title)}` : t('plannerEmptySlot')}
                    </Txt>
                  </Pressable>
                );
              })}
            </View>
          </View>
        ))}
        <Button title={t('plannerToShopping')} icon="cart-outline" onPress={generate} disabled={!plan.length} style={{ marginTop: space(6) }} />
      </ScrollView>

      <Modal visible={!!picking} animationType="slide" onRequestClose={() => setPicking(null)} presentationStyle="pageSheet">
        <Screen edges={['top', 'bottom']}>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: space(3) }}>
            <Txt v="h2" style={{ flex: 1 }}>
              {t('plannerPick')}
            </Txt>
            <IconButton icon="close" label={t('close')} onPress={() => setPicking(null)} />
          </View>
          <TextInput
            value={q}
            onChangeText={setQ}
            placeholder={t('search')}
            placeholderTextColor={c.textMuted}
            accessibilityLabel={t('search')}
            maxFontSizeMultiplier={MAX_FONT_SCALE}
            style={{ marginHorizontal: space(4), borderWidth: 1, borderColor: c.border, borderRadius: radius.md, padding: space(3), color: c.text, fontSize: 16 }}
          />
          {picking && at(picking.date, picking.slot) && (
            <Button kind="danger" small title={t('plannerClear')} onPress={() => (setMealPlan(picking.date, picking.slot, null), setPicking(null))} style={{ margin: space(4), marginBottom: 0 }} />
          )}
          <FlatList
            data={pickList}
            keyExtractor={(r) => r.id}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={{ padding: space(4) }}
            renderItem={({ item }) => (
              <Pressable
                accessibilityRole="button"
                onPress={() => {
                  if (picking) setMealPlan(picking.date, picking.slot, item.id);
                  setPicking(null);
                  setQ('');
                }}
                style={{ minHeight: TOUCH + 4, flexDirection: 'row', alignItems: 'center', borderBottomColor: c.border, borderBottomWidth: 0.5 }}
              >
                <DishArt recipe={item} size={44} radius={12} padding={0.06} style={{ marginRight: space(3) }} />
                <Txt style={{ flex: 1 }}>{l(item.title)}</Txt>
                <Txt v="small" muted>
                  {t('minutes', { n: item.time })}
                </Txt>
              </Pressable>
            )}
          />
        </Screen>
      </Modal>
    </Screen>
  );
}
