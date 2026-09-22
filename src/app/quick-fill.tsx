import { useState } from 'react';
import { FlatList, Pressable, View } from 'react-native';
import { useToast } from '../components/Toast';
import { Button, haptic, Screen, Txt } from '../components/ui';
import { INGREDIENT_BY_ID, QUICK_FILL_IDS } from '../data/ingredients';
import { addManyToFridge } from '../db/repo';
import { useFridge } from '../hooks/useData';
import { useI18n } from '../i18n';
import { radius, space, useTheme } from '../theme/theme';
import { goBack } from '../navigation/goBack';

/** Grille « Remplir mon frigo rapidement » : ~30 produits courants à cocher d'un geste */
export default function QuickFillScreen() {
  const { c } = useTheme();
  const { t, l } = useI18n();
  const toast = useToast();
  const fridge = useFridge();
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const ids = QUICK_FILL_IDS.filter((id) => !fridge.ids.has(id));

  const toggle = (id: string) => {
    haptic();
    setPicked((p) => {
      const n = new Set(p);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
  };

  return (
    <Screen edges={['bottom']}>
      <FlatList
        data={ids}
        numColumns={3}
        keyExtractor={(id) => id}
        contentContainerStyle={{ padding: space(3), paddingBottom: space(28) }}
        ListHeaderComponent={
          <Txt muted style={{ margin: space(2), marginBottom: space(4) }}>
            {t('quickFillText')}
          </Txt>
        }
        renderItem={({ item: id }) => {
          const ing = INGREDIENT_BY_ID[id];
          const on = picked.has(id);
          return (
            <Pressable
              accessibilityRole="checkbox"
              accessibilityState={{ checked: on }}
              accessibilityLabel={l(ing.name)}
              onPress={() => toggle(id)}
              style={{
                flex: 1 / 3,
                margin: space(1.5),
                minHeight: 96,
                borderRadius: radius.md,
                borderWidth: 2,
                borderColor: on ? c.primary : c.border,
                backgroundColor: on ? c.surfaceAlt : c.surface,
                alignItems: 'center',
                justifyContent: 'center',
                padding: space(2),
              }}
            >
              <Txt style={{ fontSize: 32 }}>{ing.emoji}</Txt>
              <Txt v="small" style={{ textAlign: 'center', fontWeight: on ? '700' : '400' }} numberOfLines={2}>
                {l(ing.name)}
              </Txt>
              {on && (
                <Txt style={{ position: 'absolute', top: 6, right: 8 }} color={c.primaryText}>
                  ✓
                </Txt>
              )}
            </Pressable>
          );
        }}
      />
      <View style={{ position: 'absolute', left: space(4), right: space(4), bottom: space(8) }}>
        <Button
          title={t('quickFillAdd', { n: picked.size })}
          icon="checkmark"
          disabled={picked.size === 0}
          onPress={() => {
            addManyToFridge([...picked]);
            haptic('success');
            toast.show(t('addedSelectionToFridge', { n: picked.size }));
            goBack();
          }}
        />
      </View>
    </Screen>
  );
}
