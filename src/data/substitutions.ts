import type { L10n } from './types';

export interface Substitution {
  /** ingrédients (tous requis) qui remplacent l'ingrédient manquant */
  with: string[];
  note: L10n;
}

/** ingrédient manquant -> remplacements possibles, par ordre de préférence */
export const SUBSTITUTIONS: Record<string, Substitution[]> = {
  cream: [
    { with: ['milk', 'butter'], note: { fr: 'Lait + une noix de beurre', en: 'Milk + a knob of butter' } },
    { with: ['yogurt'], note: { fr: 'Yaourt nature (hors du feu)', en: 'Plain yogurt (off the heat)' } },
    { with: ['cream_cheese'], note: { fr: 'Fromage frais détendu avec un peu d’eau', en: 'Cream cheese thinned with water' } },
    { with: ['coconut_milk'], note: { fr: 'Lait de coco (version sans lactose)', en: 'Coconut milk (dairy-free)' } },
  ],
  butter: [{ with: ['oil'], note: { fr: 'Huile (un peu moins que la quantité de beurre)', en: 'Oil (slightly less than the butter)' } }],
  shallot: [{ with: ['onion'], note: { fr: 'Oignon (un demi pour une échalote)', en: 'Onion (half per shallot)' } }],
  onion: [{ with: ['shallot'], note: { fr: 'Échalote', en: 'Shallot' } }],
  milk: [
    { with: ['coconut_milk'], note: { fr: 'Lait de coco', en: 'Coconut milk' } },
    { with: ['water', 'butter'], note: { fr: 'Eau + un peu de beurre', en: 'Water + a little butter' } },
  ],
  emmental: [
    { with: ['parmesan'], note: { fr: 'Parmesan', en: 'Parmesan' } },
    { with: ['mozzarella'], note: { fr: 'Mozzarella', en: 'Mozzarella' } },
  ],
  parmesan: [{ with: ['emmental'], note: { fr: 'Fromage râpé', en: 'Grated cheese' } }],
  mozzarella: [{ with: ['emmental'], note: { fr: 'Fromage râpé', en: 'Grated cheese' } }],
  goat_cheese: [{ with: ['feta'], note: { fr: 'Feta', en: 'Feta' } }],
  feta: [{ with: ['goat_cheese'], note: { fr: 'Fromage de chèvre', en: 'Goat cheese' } }],
  yogurt: [
    { with: ['cream'], note: { fr: 'Crème fraîche', en: 'Cream' } },
    { with: ['cream_cheese'], note: { fr: 'Fromage frais', en: 'Cream cheese' } },
  ],
  lemon: [{ with: ['vinegar'], note: { fr: 'Un trait de vinaigre', en: 'A dash of vinegar' } }],
  canned_tomato: [{ with: ['tomato'], note: { fr: 'Tomates fraîches concassées', en: 'Chopped fresh tomatoes' } }],
  tomato: [{ with: ['canned_tomato'], note: { fr: 'Tomates en boîte (en cuisson)', en: 'Canned tomatoes (for cooked dishes)' } }],
  tomato_paste: [{ with: ['canned_tomato'], note: { fr: 'Tomates concassées, réduites plus longtemps', en: 'Canned tomatoes, reduced longer' } }],
  ham: [
    { with: ['bacon'], note: { fr: 'Lardons', en: 'Bacon' } },
    { with: ['turkey'], note: { fr: 'Dinde', en: 'Turkey' } },
  ],
  bacon: [
    { with: ['ham'], note: { fr: 'Jambon', en: 'Ham' } },
    { with: ['chorizo'], note: { fr: 'Chorizo', en: 'Chorizo' } },
  ],
  chicken: [{ with: ['turkey'], note: { fr: 'Dinde', en: 'Turkey' } }],
  turkey: [{ with: ['chicken'], note: { fr: 'Poulet', en: 'Chicken' } }],
  ground_beef: [{ with: ['sausage'], note: { fr: 'Chair à saucisse', en: 'Sausage meat' } }],
  white_fish: [{ with: ['salmon'], note: { fr: 'Saumon', en: 'Salmon' } }],
  salmon: [{ with: ['white_fish'], note: { fr: 'Poisson blanc', en: 'White fish' } }],
  tuna: [{ with: ['sardines'], note: { fr: 'Sardines', en: 'Sardines' } }],
  pasta: [{ with: ['noodles'], note: { fr: 'Nouilles', en: 'Noodles' } }],
  noodles: [{ with: ['pasta'], note: { fr: 'Pâtes', en: 'Pasta' } }],
  couscous: [
    { with: ['quinoa'], note: { fr: 'Quinoa (sans gluten)', en: 'Quinoa (gluten-free)' } },
    { with: ['rice'], note: { fr: 'Riz', en: 'Rice' } },
  ],
  quinoa: [{ with: ['couscous'], note: { fr: 'Semoule', en: 'Couscous' } }],
  stock: [{ with: ['water', 'herbs'], note: { fr: 'Eau + herbes + une pincée de sel en plus', en: 'Water + herbs + extra salt' } }],
  honey: [{ with: ['sugar'], note: { fr: 'Sucre', en: 'Sugar' } }],
  spinach: [{ with: ['salad'], note: { fr: 'Salade (cuite rapidement)', en: 'Lettuce (quickly wilted)' } }],
  zucchini: [{ with: ['eggplant'], note: { fr: 'Aubergine', en: 'Eggplant' } }],
  eggplant: [{ with: ['zucchini'], note: { fr: 'Courgette', en: 'Zucchini' } }],
  potato: [{ with: ['sweet_potato'], note: { fr: 'Patate douce', en: 'Sweet potato' } }],
  sweet_potato: [
    { with: ['pumpkin'], note: { fr: 'Courge', en: 'Squash' } },
    { with: ['potato'], note: { fr: 'Pommes de terre', en: 'Potatoes' } },
  ],
  pumpkin: [{ with: ['sweet_potato'], note: { fr: 'Patate douce', en: 'Sweet potato' } }],
  parsley: [
    { with: ['coriander'], note: { fr: 'Coriandre', en: 'Coriander' } },
    { with: ['chives'], note: { fr: 'Ciboulette', en: 'Chives' } },
  ],
  basil: [{ with: ['herbs'], note: { fr: 'Herbes séchées', en: 'Dried herbs' } }],
  coriander: [{ with: ['parsley'], note: { fr: 'Persil', en: 'Parsley' } }],
  chives: [{ with: ['parsley'], note: { fr: 'Persil', en: 'Parsley' } }],
  kidney_beans: [{ with: ['chickpeas'], note: { fr: 'Pois chiches', en: 'Chickpeas' } }],
  chickpeas: [{ with: ['kidney_beans'], note: { fr: 'Haricots rouges', en: 'Kidney beans' } }],
  baking_powder: [],
  apple: [{ with: ['pear'], note: { fr: 'Poires', en: 'Pears' } }],
  pear: [{ with: ['apple'], note: { fr: 'Pommes', en: 'Apples' } }],
  strawberry: [{ with: ['red_fruits'], note: { fr: 'Fruits rouges', en: 'Berries' } }],
  red_fruits: [{ with: ['strawberry'], note: { fr: 'Fraises', en: 'Strawberries' } }],
  puff_pastry: [],
  tortilla: [{ with: ['bread'], note: { fr: 'Pain de mie aplati', en: 'Flattened sandwich bread' } }],
};
