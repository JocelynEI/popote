import { router } from 'expo-router';
import { useMemo, useState } from 'react';
import { FlatList, TextInput, View } from 'react-native';
import { Illo } from '../../components/Dish';
import { RecipeCard } from '../../components/RecipeCard';
import { Button, Chip, EmptyState, IconButton, MAX_FONT_SCALE, Screen, styles as ui, Txt } from '../../components/ui';
import type { Recipe } from '../../data/types';
import { listFavorites, listHistory } from '../../db/repo';
import { useAllRecipes, useData } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { key } from '../../logic/text';
import { usePremium } from '../../services/premium';
import { radius, space, useTheme } from '../../theme/theme';

type Seg = 'favorites' | 'history' | 'mine';

export default function MyRecipesScreen() {
  const { c } = useTheme();
  const { t, l, fmtDate } = useI18n();
  const { isPremium } = usePremium();
  const all = useAllRecipes();
  const favs = useData(listFavorites);
  const history = useData(() => listHistory(500));
  const [seg, setSeg] = useState<Seg>('favorites');
  const [q, setQ] = useState('');

  const byId = useMemo(() => new Map(all.map((r) => [r.id, r])), [all]);

  const rows: { recipe: Recipe; sub?: string; key: string }[] = useMemo(() => {
    let list: { recipe: Recipe; sub?: string; key: string }[] = [];
    if (seg === 'favorites') list = favs.map((id) => byId.get(id)).filter(Boolean).map((r) => ({ recipe: r!, key: r!.id }));
    if (seg === 'history')
      list = history
        .map((h) => ({ h, r: byId.get(h.recipe_id) }))
        .filter((x) => x.r)
        .map(({ h, r }) => ({ recipe: r!, sub: t('cookedOn', { date: fmtDate(h.cooked_at) }), key: String(h.id) }));
    if (seg === 'mine') list = all.filter((r) => r.custom).map((r) => ({ recipe: r, key: r.id }));
    const k = key(q);
    return k ? list.filter((x) => key(l(x.recipe.title)).includes(k)) : list;
  }, [seg, favs, history, all, byId, q, l, t, fmtDate]);

  const empty = seg === 'favorites' ? t('favoritesEmpty') : seg === 'history' ? t('historyEmpty') : t('mineEmpty');

  return (
    <Screen>
      <FlatList
        data={rows}
        keyExtractor={(x) => x.key}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: space(4), paddingBottom: space(24) }}
        ListHeaderComponent={
          <View style={{ marginBottom: space(3) }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Txt v="h1" accessibilityRole="header" style={{ flex: 1 }}>
                {t('recipesTitle')}
              </Txt>
              <IconButton icon="trophy-outline" label={t('progress')} onPress={() => router.push('/progress')} />
              <IconButton icon="calendar-outline" label={t('plannerTitle')} onPress={() => router.push(isPremium ? '/planner' : '/premium')} />
            </View>
            <View style={[ui.wrap, { marginTop: space(3) }]} accessibilityRole="tablist">
              <Chip label={`♡ ${t('segFavorites')}`} selected={seg === 'favorites'} onPress={() => setSeg('favorites')} />
              <Chip label={`🕘 ${t('segHistory')}`} selected={seg === 'history'} onPress={() => setSeg('history')} />
              <Chip label={`✍️ ${t('segMine')}`} selected={seg === 'mine'} onPress={() => setSeg('mine')} />
            </View>
            {seg === 'mine' && <Button title={t('newRecipe')} icon="add" onPress={() => router.push('/recipe-editor')} style={{ marginTop: space(3) }} />}
            <TextInput
              value={q}
              onChangeText={setQ}
              placeholder={t('search')}
              placeholderTextColor={c.textMuted}
              accessibilityLabel={t('search')}
              maxFontSizeMultiplier={MAX_FONT_SCALE}
              style={{ marginTop: space(3), borderRadius: radius.pill, paddingHorizontal: space(5), color: c.text, fontSize: 16, minHeight: 48, backgroundColor: c.surface, fontFamily: 'Inter_500Medium' }}
            />
          </View>
        }
        renderItem={({ item }) => (
          <View>
            {item.sub && (
              <Txt v="small" muted style={{ marginBottom: 4 }}>
                {item.sub}
              </Txt>
            )}
            <RecipeCard
              recipe={item.recipe}
              locked={!!item.recipe.premium && !isPremium}
              onPress={() => router.push(item.recipe.premium && !isPremium ? '/premium' : `/recipe/${item.recipe.id}`)}
            />
          </View>
        )}
        ListEmptyComponent={q ? null : <EmptyState illo={<Illo name={seg === 'favorites' ? 'cake' : seg === 'history' ? 'soup' : 'quiche'} size={140} />} title={empty} />}
        initialNumToRender={10}
      />
    </Screen>
  );
}
