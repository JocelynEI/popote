/**
 * Illustrations vectorielles des plats (vue de dessus, style « assiette »), dessinées pour Mypopote.
 * Rendu avec react-native-svg (SvgXml) : légères, nettes à toutes les tailles, sans droits d'auteur tiers.
 * viewBox 0 0 200 200.
 */

export type IlloKey =
  | 'pasta'
  | 'soup'
  | 'salad'
  | 'eggs'
  | 'cake'
  | 'curry'
  | 'pizza'
  | 'fish'
  | 'chicken'
  | 'pancakes'
  | 'toast'
  | 'fruit'
  | 'wrap'
  | 'hummus'
  | 'guac'
  | 'quiche'
  | 'gratin'
  | 'veggies'
  | 'noodles'
  | 'stew'
  | 'mousse';

const W = '#FFFFFF';
const plate = (inner = '#FBF4EA') =>
  `<ellipse cx="100" cy="106" rx="86" ry="84" fill="#5A3A22" opacity=".10"/>` +
  `<circle cx="100" cy="100" r="86" fill="${W}"/>` +
  `<circle cx="100" cy="100" r="70" fill="${inner}"/>`;
const bowl = (fill: string) =>
  `<ellipse cx="100" cy="106" rx="86" ry="84" fill="#5A3A22" opacity=".10"/>` +
  `<circle cx="100" cy="100" r="86" fill="#F4E6D6"/>` +
  `<circle cx="100" cy="100" r="78" fill="${W}"/>` +
  `<circle cx="100" cy="100" r="66" fill="${fill}"/>`;
const leaf = (x: number, y: number, r: number, c = '#4E9A57') =>
  `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="11" ry="6" fill="${c}"/><path d="M-9 0 H9" stroke="#2F6B3A" stroke-width="1.5" stroke-linecap="round"/></g>`;
const dots = (pts: [number, number][], c: string, r = 2.2) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="${c}"/>`).join('');

const ILLOS: Record<IlloKey, string> = {
  pasta:
    plate() +
    `<g fill="none" stroke-linecap="round" stroke-width="7">` +
    `<path d="M52 104c4-30 34-48 58-38s32 42 10 56-50 6-50-16 20-30 36-22 14 26-2 30" stroke="#EBB33F"/>` +
    `<path d="M62 124c-12-20-4-50 22-60s56 2 62 26-8 44-30 48" stroke="#F6CB5B"/>` +
    `<path d="M84 142c-22-6-34-26-26-46" stroke="#F6CB5B"/>` +
    `<path d="M120 60c22 8 30 30 22 48" stroke="#EBB33F"/></g>` +
    `<path d="M80 92c6-12 26-14 36-4s6 26-8 30-34-2-30-14c1-5 1-8 2-12z" fill="#D9442A"/>` +
    `<path d="M88 96c4-5 12-6 16-2" stroke="#F07C5A" stroke-width="3" fill="none" stroke-linecap="round"/>` +
    leaf(118, 86, -30) + leaf(106, 78, 40, '#5DAE62') +
    dots([[92, 112], [100, 118], [110, 110], [86, 104]], '#FFF3C4', 2.4),

  soup:
    bowl('#F0873A') +
    `<path d="M70 96c10-18 40-22 56-8s8 34-12 36-34-10-26-22 26-10 30 0" fill="none" stroke="#FFF1DC" stroke-width="7" stroke-linecap="round"/>` +
    `<rect x="120" y="70" width="12" height="12" rx="3" fill="#E7B15C" transform="rotate(15 126 76)"/>` +
    `<rect x="66" y="120" width="12" height="12" rx="3" fill="#E7B15C" transform="rotate(-12 72 126)"/>` +
    `<rect x="132" y="116" width="10" height="10" rx="3" fill="#D99A43"/>` +
    dots([[84, 74], [90, 80], [140, 96], [60, 102], [116, 138]], '#3F8A48', 2.6),

  salad:
    plate('#F5F9EE') +
    `<g><ellipse cx="78" cy="80" rx="30" ry="18" fill="#7CC36B" transform="rotate(-30 78 80)"/>` +
    `<ellipse cx="124" cy="78" rx="30" ry="18" fill="#5DAE62" transform="rotate(25 124 78)"/>` +
    `<ellipse cx="72" cy="122" rx="28" ry="17" fill="#5DAE62" transform="rotate(35 72 122)"/>` +
    `<ellipse cx="128" cy="124" rx="30" ry="18" fill="#8FD07A" transform="rotate(-30 128 124)"/>` +
    `<ellipse cx="100" cy="100" rx="26" ry="16" fill="#A6DB8C"/></g>` +
    `<circle cx="96" cy="72" r="13" fill="#E4432D"/><circle cx="96" cy="72" r="8" fill="#F27A5E"/>` +
    `<circle cx="134" cy="102" r="13" fill="#E4432D"/><circle cx="134" cy="102" r="8" fill="#F27A5E"/>` +
    `<circle cx="70" cy="100" r="11" fill="#CFE8B8" stroke="#4E9A57" stroke-width="3"/>` +
    `<circle cx="108" cy="130" r="11" fill="#CFE8B8" stroke="#4E9A57" stroke-width="3"/>` +
    `<rect x="84" y="104" width="12" height="12" rx="2" fill="#FFF8E7"/><rect x="112" y="86" width="11" height="11" rx="2" fill="#FFF8E7"/>`,

  eggs:
    plate() +
    `<path d="M50 94c-6-24 18-40 36-32 16-10 36 4 30 22 10 16-4 36-24 32-18 10-40-4-42-22z" fill="${W}" stroke="#F1E6D8" stroke-width="2"/>` +
    `<path d="M96 120c0-20 22-32 38-24 18-6 32 12 22 28 6 18-14 30-30 24-18 6-32-10-30-28z" fill="${W}" stroke="#F1E6D8" stroke-width="2"/>` +
    `<circle cx="80" cy="88" r="15" fill="#F7AE2B"/><circle cx="75" cy="83" r="5" fill="#FFD57A"/>` +
    `<circle cx="126" cy="122" r="15" fill="#F7AE2B"/><circle cx="121" cy="117" r="5" fill="#FFD57A"/>` +
    `<g stroke="#4E9A57" stroke-width="3" stroke-linecap="round"><path d="M112 70l8-6"/><path d="M122 76l9-4"/><path d="M60 128l8-5"/></g>` +
    dots([[100, 96], [104, 100], [140, 80], [70, 140], [58, 112]], '#3B2A20', 1.6),

  cake:
    plate('#FCEFF1') +
    `<circle cx="100" cy="100" r="56" fill="#6B3B22"/>` +
    `<circle cx="100" cy="100" r="46" fill="#7E4729"/>` +
    `<path d="M58 88c8 6 12-2 18 4s12-4 18 2 12-4 18 2 12-4 18 2 10-2 14 2" stroke="#5A2F19" stroke-width="3" fill="none"/>` +
    [0, 60, 120, 180, 240, 300]
      .map((a) => {
        const x = 100 + 34 * Math.cos((a * Math.PI) / 180);
        const y = 100 + 34 * Math.sin((a * Math.PI) / 180);
        return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="9" fill="#FFF3E6"/><circle cx="${x.toFixed(1)}" cy="${(y - 3).toFixed(1)}" r="5" fill="#E23B4E"/>`;
      })
      .join('') +
    `<circle cx="100" cy="100" r="11" fill="#FFF3E6"/>` +
    leaf(106, 94, -20, '#4E9A57'),

  curry:
    bowl('#F7F1E6') +
    `<path d="M34 100a66 66 0 0 1 132 0z" fill="#E99A2C" transform="rotate(-20 100 100)"/>` +
    dots([[80, 70], [104, 62], [124, 76], [92, 84], [132, 96], [70, 88]], '#F7C35F', 6) +
    dots([[96, 72], [116, 88]], '#C8561E', 5) +
    dots([[70, 124], [84, 134], [100, 140], [116, 132], [132, 122], [92, 122], [108, 120], [124, 110]], '#FFFFFF', 3) +
    leaf(84, 106, 30, '#4E9A57') + leaf(118, 108, -25, '#5DAE62'),

  pizza:
    `<ellipse cx="100" cy="106" rx="86" ry="84" fill="#5A3A22" opacity=".10"/>` +
    `<circle cx="100" cy="100" r="84" fill="#E8B06A"/><circle cx="100" cy="100" r="70" fill="#D9442A"/>` +
    `<path d="M50 94c10-12 18 6 30-4s16 8 28 0 20 6 30-2 12 10 18 10c-2 18-16 40-40 46-26 6-58-12-66-50z" fill="#FFE39A"/>` +
    `<path d="M60 76c10-16 30-22 46-20 12 2 10 12 24 14" fill="none" stroke="#FFE39A" stroke-width="12" stroke-linecap="round"/>` +
    dots([[78, 80], [124, 84], [100, 120], [72, 118], [132, 118]], '#B7321F', 11) +
    leaf(100, 92, 20) + leaf(86, 136, -40, '#5DAE62') +
    `<g stroke="#C7893F" stroke-width="2"><path d="M100 16v168"/><path d="M16 100h168"/></g>`,

  fish:
    plate('#EEF5F8') +
    `<rect x="46" y="72" width="92" height="52" rx="24" fill="#F58B68"/>` +
    `<g stroke="#FFD3C2" stroke-width="4" stroke-linecap="round" fill="none"><path d="M66 76c6 14 6 30 0 44"/><path d="M84 74c6 16 6 32 0 48"/><path d="M102 74c6 16 6 32 0 48"/><path d="M120 76c6 14 6 30 0 44"/></g>` +
    `<circle cx="140" cy="128" r="18" fill="#FFE066"/><circle cx="140" cy="128" r="13" fill="#FFF3A6"/>` +
    `<g stroke="#FFE066" stroke-width="2"><path d="M140 115v26"/><path d="M127 128h26"/></g>` +
    `<g stroke="#4E9A57" stroke-width="6" stroke-linecap="round"><path d="M60 138l30 6"/><path d="M62 148l30 4"/><path d="M94 150l24 2"/></g>` +
    leaf(58, 64, 30, '#5DAE62'),

  chicken:
    plate() +
    `<path d="M62 84c8-26 44-30 58-10 12 16 6 38-12 46l-18 10c-16 6-34-8-32-24 0-8 2-16 4-22z" fill="#C8702F"/>` +
    `<path d="M70 86c8-18 34-20 44-6" stroke="#E39A56" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    `<path d="M100 124l22 16" stroke="#F6EBDD" stroke-width="10" stroke-linecap="round"/>` +
    `<circle cx="128" cy="140" r="7" fill="#F6EBDD"/><circle cx="124" cy="146" r="7" fill="#F6EBDD"/>` +
    dots([[134, 78], [144, 86], [138, 96], [148, 104], [128, 90], [150, 94]], '#6FBF5E', 6) +
    `<path d="M56 130c10 8 26 12 38 10" stroke="#F3C74F" stroke-width="10" stroke-linecap="round" fill="none"/>`,

  pancakes:
    plate('#FFF6E0') +
    `<circle cx="100" cy="104" r="52" fill="#D98E3A"/><circle cx="100" cy="100" r="52" fill="#EDB15A"/>` +
    `<circle cx="100" cy="100" r="42" fill="#F4C46E"/>` +
    `<rect x="90" y="84" width="22" height="18" rx="4" fill="#FFF0B3"/>` +
    `<path d="M70 96c10 16 20-2 30 12s22-4 32 10" stroke="#9A4B16" stroke-width="7" fill="none" stroke-linecap="round" opacity=".85"/>` +
    dots([[128, 76], [136, 86], [70, 124]], '#3E4FA8', 7) +
    dots([[140, 130], [60, 80]], '#E23B4E', 7),

  toast:
    plate() +
    `<rect x="44" y="60" width="62" height="62" rx="16" fill="#C98B3E" transform="rotate(-12 75 91)"/>` +
    `<rect x="50" y="66" width="50" height="50" rx="12" fill="#F2C47A" transform="rotate(-12 75 91)"/>` +
    `<rect x="94" y="80" width="62" height="62" rx="16" fill="#C98B3E" transform="rotate(10 125 111)"/>` +
    `<rect x="100" y="86" width="50" height="50" rx="12" fill="#F2C47A" transform="rotate(10 125 111)"/>` +
    dots([[70, 84], [82, 96], [66, 100], [120, 104], [132, 118], [116, 124]], '#FFFFFF', 2.2) +
    dots([[140, 70], [150, 80]], '#E23B4E', 7) + dots([[58, 138]], '#3E4FA8', 7),

  fruit:
    bowl('#FFF1E4') +
    `<circle cx="78" cy="82" r="22" fill="#F58A1F"/><circle cx="78" cy="82" r="17" fill="#FFB347"/>` +
    `<g stroke="#F58A1F" stroke-width="2">${[0, 45, 90, 135].map((a) => `<path d="M78 82l${(17 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(17 * Math.sin((a * Math.PI) / 180)).toFixed(1)}M78 82l${(-17 * Math.cos((a * Math.PI) / 180)).toFixed(1)} ${(-17 * Math.sin((a * Math.PI) / 180)).toFixed(1)}"/>`).join('')}</g>` +
    `<path d="M118 70c12-4 24 6 20 20s-16 22-22 18-12-34 2-38z" fill="#E23B4E"/>` + dots([[124, 84], [130, 94], [122, 96]], '#FFD6A5', 1.5) +
    `<circle cx="120" cy="128" r="18" fill="#7CB342"/><circle cx="120" cy="128" r="12" fill="#C5E1A5"/>` + dots([[114, 124], [126, 124], [120, 134]], '#33691E', 1.6) +
    dots([[76, 122], [88, 130], [80, 136], [92, 118]], '#3E4FA8', 7),

  wrap:
    plate() +
    `<g transform="rotate(-20 100 100)"><rect x="40" y="76" width="120" height="48" rx="24" fill="#EBC98F"/>` +
    `<circle cx="146" cy="100" r="22" fill="#F4DDB0"/><circle cx="146" cy="100" r="16" fill="#E4432D"/>` +
    `<circle cx="146" cy="100" r="11" fill="#6FBF5E"/><circle cx="146" cy="100" r="6" fill="#F7C35F"/>` +
    `<path d="M50 86h70M52 112h66" stroke="#D9AE6A" stroke-width="3" stroke-linecap="round"/></g>` +
    `<circle cx="64" cy="140" r="12" fill="#FFF3E6"/><circle cx="64" cy="140" r="7" fill="#F2F2F2"/>` + leaf(140, 64, 20),

  hummus:
    bowl('#EED9A8') +
    `<path d="M100 60c30 0 44 22 36 44s-40 30-58 16-10-38 10-40 26 12 16 22" fill="none" stroke="#DDBF84" stroke-width="7" stroke-linecap="round"/>` +
    `<path d="M92 96c8-6 18-4 20 4s-10 14-18 10-8-10-2-14z" fill="#E6B84A" opacity=".85"/>` +
    dots([[80, 76], [128, 120], [70, 118], [118, 70]], '#E8D29C', 7) +
    dots([[100, 130], [132, 92], [66, 96]], '#C8561E', 1.8) + leaf(116, 104, -30),

  guac:
    bowl('#8DC26F') +
    `<path d="M100 60c30 0 44 22 36 44s-40 30-58 16-10-38 10-40 26 12 16 22" fill="none" stroke="#A9D98C" stroke-width="7" stroke-linecap="round"/>` +
    dots([[80, 80], [120, 124], [72, 116]], '#E4432D', 6) + dots([[110, 78], [90, 126]], '#FFF7E8', 4) + leaf(118, 100, -30, '#2F6B3A'),

  quiche:
    `<ellipse cx="100" cy="106" rx="86" ry="84" fill="#5A3A22" opacity=".10"/>` +
    Array.from({ length: 24 })
      .map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return `<circle cx="${(100 + 76 * Math.cos(a)).toFixed(1)}" cy="${(100 + 76 * Math.sin(a)).toFixed(1)}" r="11" fill="#D99A4A"/>`;
      })
      .join('') +
    `<circle cx="100" cy="100" r="74" fill="#E6AE5B"/><circle cx="100" cy="100" r="64" fill="#F6D27A"/>` +
    `<path d="M60 90c10-8 20 4 30-4s18 8 28 0 16 8 26 0" stroke="#EDB44E" stroke-width="6" fill="none" stroke-linecap="round"/>` +
    dots([[78, 110], [110, 120], [126, 96], [92, 80], [96, 130], [70, 86]], '#C0492B', 5) +
    leaf(118, 72, 20, '#4E9A57') + leaf(80, 128, -30, '#5DAE62'),

  gratin:
    `<ellipse cx="100" cy="108" rx="84" ry="70" fill="#5A3A22" opacity=".10"/>` +
    `<rect x="20" y="36" width="160" height="128" rx="30" fill="#C04A2B"/>` +
    `<rect x="32" y="48" width="136" height="104" rx="22" fill="#F0C063"/>` +
    [0, 1, 2]
      .map((row) =>
        [0, 1, 2, 3, 4]
          .map((col) => `<ellipse cx="${52 + col * 24}" cy="${72 + row * 28}" rx="15" ry="12" fill="${(row + col) % 2 ? '#E7A646' : '#F6D27A'}" stroke="#C98433" stroke-width="2"/>`)
          .join(''),
      )
      .join('') +
    dots([[64, 86], [112, 114], [140, 80], [88, 132]], '#8C4F1C', 3) + leaf(150, 130, 30),

  veggies:
    plate('#FFF4EC') +
    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
      .map((i) => {
        const a = (i / 12) * Math.PI * 2;
        const cols = ['#E4432D', '#5DAE62', '#7B3F8C', '#F7AE2B'];
        return `<circle cx="${(100 + 44 * Math.cos(a)).toFixed(1)}" cy="${(100 + 44 * Math.sin(a)).toFixed(1)}" r="15" fill="${cols[i % 4]}" stroke="${W}" stroke-width="2"/>`;
      })
      .join('') +
    [0, 1, 2, 3, 4, 5]
      .map((i) => {
        const a = (i / 6) * Math.PI * 2 + 0.3;
        const cols = ['#F27A5E', '#8FD07A', '#A569BD'];
        return `<circle cx="${(100 + 20 * Math.cos(a)).toFixed(1)}" cy="${(100 + 20 * Math.sin(a)).toFixed(1)}" r="12" fill="${cols[i % 3]}" stroke="${W}" stroke-width="2"/>`;
      })
      .join('') +
    leaf(100, 100, 30),

  noodles:
    bowl('#F3D9A4') +
    `<g fill="none" stroke="#F8E7B6" stroke-width="6" stroke-linecap="round">` +
    `<path d="M50 90c20-10 30 10 50 0s30 10 50 0"/><path d="M52 106c20-10 30 10 50 0s30 10 46 0"/><path d="M58 122c20-10 30 10 50 0s26 8 36 2"/></g>` +
    `<ellipse cx="124" cy="78" rx="16" ry="12" fill="${W}"/><circle cx="124" cy="78" r="7" fill="#F7AE2B"/>` +
    `<path d="M66 70l20 8" stroke="#E4432D" stroke-width="7" stroke-linecap="round"/>` +
    dots([[80, 134], [92, 140], [110, 136], [70, 128]], '#6FBF5E', 4) +
    `<g stroke="#5A3A22" stroke-width="4" stroke-linecap="round"><path d="M150 40L110 110"/><path d="M160 46L118 114"/></g>`,

  stew:
    bowl('#B8452A') +
    `<path d="M60 96c10-14 30-14 40-4s30 10 40-2" stroke="#D2663F" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    dots([[78, 80], [120, 76], [96, 118], [132, 110], [70, 112], [110, 96]], '#7A2418', 7) +
    dots([[88, 96], [126, 126], [84, 132]], '#F7C35F', 5) +
    `<ellipse cx="116" cy="136" rx="12" ry="8" fill="#FFF3E6"/>` + leaf(76, 72, 40) + leaf(130, 90, -20, '#5DAE62'),

  mousse:
    plate('#FCEFF1') +
    `<circle cx="100" cy="100" r="50" fill="#E9DDD3"/><circle cx="100" cy="100" r="44" fill="#6B3B22"/>` +
    `<path d="M68 100c6-18 22-26 34-20s24 2 30 16" stroke="#8A5334" stroke-width="7" fill="none" stroke-linecap="round"/>` +
    `<circle cx="100" cy="96" r="16" fill="#FFF6EC"/><circle cx="96" cy="92" r="6" fill="${W}"/>` +
    dots([[122, 118], [80, 120]], '#E23B4E', 6) + leaf(112, 82, -30),
};

/** Couleur de fond (pastel chaud) associée à chaque illustration */
export const ILLO_TINT: Record<IlloKey, string> = {
  pasta: '#FFE9C7',
  soup: '#FFE0CC',
  salad: '#E3F1D9',
  eggs: '#FFF1C9',
  cake: '#F9DDE2',
  curry: '#FFE6BF',
  pizza: '#FFDCD2',
  fish: '#DCEDF5',
  chicken: '#FBE3CE',
  pancakes: '#FFEFC7',
  toast: '#FCE7CF',
  fruit: '#FDE0E6',
  wrap: '#F7EAD3',
  hummus: '#F6EBD2',
  guac: '#E3F1D9',
  quiche: '#FFF0C9',
  gratin: '#FCE4CC',
  veggies: '#EDE3F4',
  noodles: '#FFEBCB',
  stew: '#F9DCD2',
  mousse: '#F3E0D6',
};

export function illoXml(key: IlloKey): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">${ILLOS[key]}</svg>`;
}

/** Illustration de chaque recette de la base (les recettes perso utilisent leur type de plat) */
const BY_RECIPE: Record<string, IlloKey> = {
  omelette: 'eggs',
  pasta_garlic: 'pasta',
  fried_rice: 'curry',
  french_toast: 'toast',
  crepes: 'pancakes',
  shakshuka: 'eggs',
  tuna_pasta: 'pasta',
  croque: 'toast',
  carbonara: 'pasta',
  bolognese: 'pasta',
  chicken_curry: 'curry',
  chickpea_curry: 'curry',
  lentil_dahl: 'soup',
  quiche: 'quiche',
  veg_quiche: 'quiche',
  ratatouille: 'veggies',
  veg_soup: 'soup',
  pumpkin_soup: 'soup',
  tomato_soup: 'soup',
  gratin_dauphinois: 'gratin',
  mash: 'gratin',
  fritatta: 'quiche',
  chili: 'stew',
  sin_carne: 'stew',
  risotto_mushroom: 'curry',
  fajitas: 'wrap',
  quesadilla: 'wrap',
  pizza: 'pizza',
  stir_fry_noodles: 'noodles',
  salmon_papillote: 'fish',
  fish_rice: 'fish',
  chicken_mustard: 'chicken',
  sausage_lentils: 'stew',
  couscous_veg: 'stew',
  mac_cheese: 'pasta',
  gnocchi_tomato: 'pasta',
  buddha_bowl: 'salad',
  tofu_stirfry: 'noodles',
  nicoise: 'salad',
  tomato_mozza: 'salad',
  carrot_salad: 'salad',
  cucumber_yogurt: 'salad',
  hummus: 'hummus',
  guacamole: 'guac',
  lentil_salad: 'salad',
  banana_bread: 'cake',
  apple_crumble: 'cake',
  yogurt_cake: 'cake',
  chocolate_mousse: 'mousse',
  rice_pudding: 'mousse',
  banana_pancakes: 'pancakes',
  baked_apples: 'fruit',
  fruit_salad: 'fruit',
  scrambled_eggs: 'eggs',
  eggs_cocotte: 'eggs',
  tortilla_espanola: 'quiche',
  egg_custard: 'mousse',
  ham_cheese_pasta: 'pasta',
  pesto_pasta: 'pasta',
  tomato_pasta: 'pasta',
  zucchini_pasta: 'pasta',
  salmon_pasta: 'pasta',
  broccoli_pasta: 'pasta',
  spinach_pasta: 'pasta',
  pasta_salad: 'salad',
  tuna_rice_salad: 'salad',
  chorizo_rice: 'curry',
  tabbouleh: 'salad',
  sauteed_potatoes: 'veggies',
  sausage_potatoes: 'stew',
  noodle_soup: 'soup',
  chicken_lemon_honey: 'chicken',
  chicken_tomato_rice: 'curry',
  chicken_basquaise: 'stew',
  chicken_wrap: 'wrap',
  turkey_cream: 'chicken',
  meatballs_tomato: 'stew',
  stuffed_tomatoes: 'veggies',
  beef_stirfry: 'noodles',
  honey_soy_pork: 'chicken',
  garlic_shrimp: 'fish',
  fish_curry: 'curry',
  roasted_veg: 'veggies',
  veg_curry: 'curry',
  zucchini_gratin: 'gratin',
  cauliflower_gratin: 'gratin',
  leek_potato_soup: 'soup',
  carrot_soup: 'soup',
  leek_tart: 'quiche',
  tomato_mustard_tart: 'quiche',
  avocado_toast: 'toast',
  mushroom_toast: 'toast',
  pizza_toast: 'pizza',
  sardine_spread: 'hummus',
  greek_salad: 'salad',
  coleslaw: 'salad',
  beet_salad: 'salad',
  pancakes: 'pancakes',
  chocolate_cake: 'cake',
  cookies: 'cake',
  apple_tart: 'cake',
  yogurt_honey: 'mousse',
  porridge: 'mousse',
  poached_pears: 'fruit',
  strawberries_cream: 'fruit',
  p_pad_thai: 'noodles',
  p_moussaka: 'gratin',
  p_shepherd: 'gratin',
  p_tajine: 'stew',
  p_poke: 'fish',
  p_batch_bolo: 'stew',
  p_tiramisu: 'mousse',
  p_fondant: 'cake',
  p_clafoutis: 'cake',
  p_gazpacho: 'soup',
  p_falafel: 'hummus',
  p_empty_fridge_soup: 'soup',
};

export function illoForRecipe(r: { id: string; course: 'starter' | 'main' | 'dessert' }): IlloKey {
  return BY_RECIPE[r.id] ?? (r.course === 'dessert' ? 'cake' : r.course === 'starter' ? 'salad' : 'stew');
}

export const ALL_ILLOS = Object.keys(ILLOS) as IlloKey[];
