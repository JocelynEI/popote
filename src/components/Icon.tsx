import Svg, { Circle as SvgCircle, Ellipse, Line, Path, Polyline, Rect } from 'react-native-svg';
import { ICONS, type IconNode } from './lucideIcons';
import { type StyleProp, View, type ViewStyle } from 'react-native';
import { useTheme } from '../theme/theme';

/**
 * Icônes « line art » (Lucide), trait 2 px, bouts arrondis.
 * Les noms historiques (style Ionicons) sont conservés pour ne pas toucher aux écrans.
 */
const MAP = {
  add: 'Plus',
  'add-circle-outline': 'CirclePlus',
  'arrow-back': 'ArrowLeft',
  'arrow-forward': 'ArrowRight',
  'bag-check-outline': 'ShoppingBag',
  'bulb-outline': 'Lightbulb',
  'calendar-outline': 'CalendarDays',
  cart: 'ShoppingCart',
  'cart-outline': 'ShoppingCart',
  checkmark: 'Check',
  'checkmark-circle': 'CircleCheck',
  'checkmark-done': 'CheckCheck',
  'chevron-back': 'ChevronLeft',
  'chevron-forward': 'ChevronRight',
  clock: 'Clock',
  close: 'X',
  'close-circle': 'CircleX',
  'create-outline': 'PenLine',
  'download-outline': 'Download',
  'ellipse-outline': 'Circle',
  'flame-outline': 'Flame',
  'grid-outline': 'LayoutGrid',
  heart: 'Heart',
  'heart-outline': 'Heart',
  'lock-closed': 'Lock',
  'lock-closed-outline': 'Lock',
  'lock-open-outline': 'LockOpen',
  'mail-outline': 'Mail',
  maximize: 'Maximize2',
  mic: 'Mic',
  'mic-off': 'MicOff',
  'mic-outline': 'Mic',
  minimize: 'Minimize2',
  'nutrition-outline': 'CookingPot',
  pause: 'Pause',
  play: 'Play',
  pot: 'CookingPot',
  remove: 'Minus',
  'remove-circle-outline': 'CircleMinus',
  restaurant: 'UtensilsCrossed',
  'restaurant-outline': 'UtensilsCrossed',
  search: 'Search',
  'settings-outline': 'Settings',
  'share-outline': 'Share2',
  'shield-checkmark-outline': 'ShieldCheck',
  snow: 'Snowflake',
  'snow-outline': 'Snowflake',
  sparkles: 'Sparkles',
  'sparkles-outline': 'Sparkles',
  square: 'Square',
  'square-outline': 'Square',
  checkbox: 'SquareCheck',
  star: 'Star',
  'star-outline': 'Star',
  stop: 'Square',
  sun: 'Sun',
  'timer-outline': 'Timer',
  'trash-bin-outline': 'Trash2',
  'trash-outline': 'Trash2',
  'trophy-outline': 'Trophy',
  user: 'UserRound',
  'volume-high-outline': 'Volume2',
  'volume-mute-outline': 'VolumeX',
  zap: 'Zap',
} as const;

export type IconName = keyof typeof MAP;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const TAGS: Record<IconNode[number][0], any> = { path: Path, circle: SvgCircle, rect: Rect, line: Line, polyline: Polyline, ellipse: Ellipse };

/** Icônes « pleines » : même dessin, remplissage de la couleur (favori actif, case cochée…) */
const FILLED: IconName[] = ['heart', 'star', 'lock-closed'];

export function Icon({
  name,
  size = 24,
  color,
  strokeWidth = 2,
  fill,
  style,
}: {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  fill?: string;
  style?: StyleProp<ViewStyle>;
}) {
  const { c } = useTheme();
  const node: IconNode = ICONS[MAP[name]] ?? ICONS.Circle;
  const col = color ?? c.text;
  const f = fill ?? (FILLED.includes(name) ? col : 'none');
  const el = (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={f} stroke={col} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
      {node.map(([tag, a], i) => {
        const Tag = TAGS[tag];
        return <Tag key={i} {...(a as object)} />;
      })}
    </Svg>
  );
  // conteneur non rétrécissable : l'icône garde sa taille à côté d'un champ en flex: 1
  return (
    <View style={[{ flexShrink: 0 }, style]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
      {el}
    </View>
  );
}
