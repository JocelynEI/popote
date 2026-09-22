import { View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { type IlloKey, ILLO_TINT, illoForRecipe, illoXml } from '../data/illustrations';
import type { Recipe } from '../data/types';
import { useTheme } from '../theme/theme';

const cache = new Map<IlloKey, string>();
function xml(k: IlloKey) {
  if (!cache.has(k)) cache.set(k, illoXml(k));
  return cache.get(k)!;
}

/** Illustration seule (sans fond) */
export function Illo({ name, size }: { name: IlloKey; size: number }) {
  return (
    <View accessibilityElementsHidden importantForAccessibility="no-hide-descendants" style={{ width: size, height: size }}>
      <SvgXml xml={xml(name)} width={size} height={size} />
    </View>
  );
}

/** Illustration d'une recette sur son fond pastel */
export function DishArt({
  recipe,
  size,
  radius = 24,
  style,
  padding = 0.12,
}: {
  recipe: Pick<Recipe, 'id' | 'course'>;
  size?: number;
  radius?: number;
  style?: StyleProp<ViewStyle>;
  padding?: number;
}) {
  const { mode } = useTheme();
  const key = illoForRecipe(recipe);
  const tint = ILLO_TINT[key];
  return (
    <View
      style={[
        { backgroundColor: tint, borderRadius: radius, alignItems: 'center', justifyContent: 'center', opacity: mode === 'dark' ? 0.92 : 1 },
        size ? { width: size, height: size } : null,
        style,
      ]}
    >
      <SvgXml xml={xml(key)} width={size ? size * (1 - padding * 2) : '76%'} height={size ? size * (1 - padding * 2) : '76%'} />
    </View>
  );
}
