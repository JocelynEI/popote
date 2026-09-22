import type { Ingredient, IngredientCategory, IngredientTag } from './types';

/**
 * Helper compact : i(id, fr, en, emoji, catégorie, tags, synonymes, options)
 * Les synonymes servent à l'autocomplétion (FR + EN, sans accents inutile : la recherche normalise).
 */
function i(
  id: string,
  fr: string,
  en: string,
  emoji: string,
  cat: IngredientCategory,
  tags: IngredientTag[] = [],
  syn: string[] = [],
  opts: { pantry?: boolean; quick?: boolean } = {},
): Ingredient {
  return { id, name: { fr, en }, emoji, cat, tags, syn, ...opts };
}

const Q = { quick: true };
const P = { pantry: true };

export const INGREDIENTS: Ingredient[] = [
  // --- Base placard (jamais manquante) ---
  i('salt', 'Sel', 'Salt', '🧂', 'spice', [], ['sel fin', 'gros sel'], P),
  i('pepper', 'Poivre', 'Pepper', '🌶️', 'spice', [], ['poivre noir', 'black pepper'], P),
  i('oil', 'Huile', 'Oil', '🫒', 'grocery', [], ['huile olive', "huile d'olive", 'olive oil', 'huile tournesol', 'vegetable oil'], P),
  i('flour', 'Farine', 'Flour', '🌾', 'grocery', ['gluten'], ['farine de blé', 'wheat flour'], P),
  i('sugar', 'Sucre', 'Sugar', '🍬', 'grocery', [], ['sucre en poudre', 'cassonade', 'brown sugar'], P),
  i('water', 'Eau', 'Water', '💧', 'grocery', [], [], P),

  // --- Crèmerie & œufs ---
  i('egg', 'Œufs', 'Eggs', '🥚', 'dairy', ['egg'], ['oeuf', 'oeufs', 'œuf', 'egg'], Q),
  i('milk', 'Lait', 'Milk', '🥛', 'dairy', ['milk'], ['lait demi-écrémé', 'lait entier'], Q),
  i('butter', 'Beurre', 'Butter', '🧈', 'dairy', ['milk'], ['beurre doux', 'beurre demi-sel'], Q),
  i('cream', 'Crème fraîche', 'Cream', '🥛', 'dairy', ['milk'], ['creme', 'crème', 'crème liquide', 'heavy cream', 'sour cream'], Q),
  i('yogurt', 'Yaourt nature', 'Plain yogurt', '🥣', 'dairy', ['milk'], ['yaourt', 'yogourt', 'yoghurt', 'yogurt'], Q),
  i('emmental', 'Fromage râpé', 'Grated cheese', '🧀', 'dairy', ['milk'], ['emmental', 'gruyère', 'gruyere', 'comté', 'cheddar', 'cheese', 'fromage'], Q),
  i('parmesan', 'Parmesan', 'Parmesan', '🧀', 'dairy', ['milk'], ['parmigiano', 'grana padano']),
  i('mozzarella', 'Mozzarella', 'Mozzarella', '🧀', 'dairy', ['milk'], ['mozza'], Q),
  i('goat_cheese', 'Fromage de chèvre', 'Goat cheese', '🧀', 'dairy', ['milk'], ['chèvre', 'chevre', 'buche de chevre']),
  i('feta', 'Feta', 'Feta', '🧀', 'dairy', ['milk'], []),
  i('cream_cheese', 'Fromage frais', 'Cream cheese', '🧀', 'dairy', ['milk'], ['saint moret', 'philadelphia', 'ricotta', 'fromage blanc']),

  // --- Viandes & poissons ---
  i('ham', 'Jambon', 'Ham', '🍖', 'meat', ['meat'], ['jambon blanc', 'jambon cuit'], Q),
  i('bacon', 'Lardons', 'Bacon', '🥓', 'meat', ['meat'], ['lardon', 'bacon', 'poitrine fumée'], Q),
  i('chicken', 'Poulet', 'Chicken', '🍗', 'meat', ['meat'], ['blanc de poulet', 'escalope de poulet', 'filet de poulet', 'chicken breast'], Q),
  i('ground_beef', 'Bœuf haché', 'Ground beef', '🥩', 'meat', ['meat'], ['viande hachée', 'steak haché', 'boeuf haché', 'minced beef'], Q),
  i('beef', 'Bœuf', 'Beef', '🥩', 'meat', ['meat'], ['boeuf', 'steak', 'bavette']),
  i('pork', 'Porc', 'Pork', '🥩', 'meat', ['meat'], ['côte de porc', 'filet mignon', 'échine']),
  i('sausage', 'Saucisses', 'Sausages', '🌭', 'meat', ['meat'], ['saucisse', 'chipolata', 'merguez', 'knacki']),
  i('chorizo', 'Chorizo', 'Chorizo', '🌭', 'meat', ['meat'], []),
  i('turkey', 'Dinde', 'Turkey', '🍗', 'meat', ['meat'], ['escalope de dinde']),
  i('salmon', 'Saumon', 'Salmon', '🐟', 'meat', ['fish'], ['pavé de saumon', 'saumon fumé']),
  i('white_fish', 'Poisson blanc', 'White fish', '🐟', 'meat', ['fish'], ['cabillaud', 'colin', 'lieu', 'merlu', 'cod']),
  i('shrimp', 'Crevettes', 'Shrimp', '🦐', 'meat', ['shellfish'], ['crevette', 'gambas', 'prawns']),

  // --- Légumes ---
  i('onion', 'Oignon', 'Onion', '🧅', 'veg', [], ['oignons', 'oignon jaune', 'oignon rouge'], Q),
  i('garlic', 'Ail', 'Garlic', '🧄', 'veg', [], ["gousse d'ail"], Q),
  i('shallot', 'Échalote', 'Shallot', '🧅', 'veg', [], ['echalote']),
  i('tomato', 'Tomates', 'Tomatoes', '🍅', 'veg', [], ['tomate', 'tomates cerises', 'tomato'], Q),
  i('potato', 'Pommes de terre', 'Potatoes', '🥔', 'veg', [], ['pomme de terre', 'patate', 'patates', 'potato'], Q),
  i('carrot', 'Carottes', 'Carrots', '🥕', 'veg', [], ['carotte', 'carrot'], Q),
  i('zucchini', 'Courgette', 'Zucchini', '🥒', 'veg', [], ['courgettes', 'courgette'], Q),
  i('eggplant', 'Aubergine', 'Eggplant', '🍆', 'veg', [], ['aubergines', 'aubergine']),
  i('bell_pepper', 'Poivron', 'Bell pepper', '🫑', 'veg', [], ['poivrons', 'poivron rouge', 'poivron vert', 'capsicum'], Q),
  i('mushroom', 'Champignons', 'Mushrooms', '🍄', 'veg', [], ['champignon', 'champignons de paris', 'mushroom'], Q),
  i('spinach', 'Épinards', 'Spinach', '🥬', 'veg', [], ['epinards', 'pousses d’épinard']),
  i('salad', 'Salade', 'Lettuce', '🥬', 'veg', [], ['laitue', 'batavia', 'mâche', 'roquette', 'salade verte'], Q),
  i('cucumber', 'Concombre', 'Cucumber', '🥒', 'veg', [], [], Q),
  i('leek', 'Poireau', 'Leek', '🥬', 'veg', [], ['poireaux']),
  i('broccoli', 'Brocoli', 'Broccoli', '🥦', 'veg', [], ['brocolis', 'brocoli']),
  i('cauliflower', 'Chou-fleur', 'Cauliflower', '🥦', 'veg', [], ['chou fleur']),
  i('cabbage', 'Chou', 'Cabbage', '🥬', 'veg', [], ['chou blanc', 'chou vert', 'chou rouge']),
  i('pumpkin', 'Courge', 'Squash', '🎃', 'veg', [], ['potiron', 'butternut', 'citrouille', 'pumpkin']),
  i('green_beans', 'Haricots verts', 'Green beans', '🫛', 'veg', [], ['haricot vert']),
  i('peas', 'Petits pois', 'Peas', '🫛', 'veg', [], ['petit pois']),
  i('corn', 'Maïs', 'Sweetcorn', '🌽', 'can', [], ['mais', 'corn']),
  i('avocado', 'Avocat', 'Avocado', '🥑', 'veg', [], ['avocats']),
  i('sweet_potato', 'Patate douce', 'Sweet potato', '🍠', 'veg', [], ['patates douces']),
  i('celery', 'Céleri', 'Celery', '🥬', 'veg', [], ['celeri', 'céleri branche']),
  i('radish', 'Radis', 'Radish', '🌱', 'veg', [], []),
  i('beetroot', 'Betterave', 'Beetroot', '🫜', 'veg', [], ['betteraves', 'beet']),
  i('fennel', 'Fenouil', 'Fennel', '🌿', 'veg', [], []),
  i('ginger', 'Gingembre', 'Ginger', '🫚', 'spice', [], []),

  // --- Fruits ---
  i('lemon', 'Citron', 'Lemon', '🍋', 'fruit', [], ['citrons', 'jus de citron', 'citron vert', 'lime'], Q),
  i('apple', 'Pommes', 'Apples', '🍎', 'fruit', [], ['pomme', 'apple'], Q),
  i('banana', 'Bananes', 'Bananas', '🍌', 'fruit', [], ['banane', 'banana'], Q),
  i('pear', 'Poires', 'Pears', '🍐', 'fruit', [], ['poire', 'pear']),
  i('orange', 'Oranges', 'Oranges', '🍊', 'fruit', [], ['orange'], Q),
  i('strawberry', 'Fraises', 'Strawberries', '🍓', 'fruit', [], ['fraise']),
  i('red_fruits', 'Fruits rouges', 'Berries', '🫐', 'frozen', [], ['framboises', 'myrtilles', 'mûres', 'berries', 'raspberries', 'blueberries']),
  i('chocolate', 'Chocolat', 'Chocolate', '🍫', 'grocery', ['milk'], ['chocolat noir', 'chocolat pâtissier', 'pépites de chocolat', 'dark chocolate']),
  i('raisins', 'Raisins secs', 'Raisins', '🍇', 'grocery', [], ['raisin sec']),

  // --- Féculents ---
  i('pasta', 'Pâtes', 'Pasta', '🍝', 'starch', ['gluten'], ['pates', 'spaghetti', 'penne', 'coquillettes', 'tagliatelles', 'macaroni', 'fusilli'], Q),
  i('rice', 'Riz', 'Rice', '🍚', 'starch', [], ['riz basmati', 'riz long', 'riz rond', 'riz arborio'], Q),
  i('bread', 'Pain', 'Bread', '🍞', 'starch', ['gluten'], ['baguette', 'pain de mie', 'pain rassis', 'toast'], Q),
  i('tortilla', 'Tortillas', 'Tortillas', '🫓', 'starch', ['gluten'], ['wrap', 'wraps', 'galette de blé']),
  i('couscous', 'Semoule', 'Couscous', '🍚', 'starch', ['gluten'], ['couscous', 'semoule de blé']),
  i('quinoa', 'Quinoa', 'Quinoa', '🌾', 'starch', [], []),
  i('lentils', 'Lentilles', 'Lentils', '🫘', 'starch', [], ['lentille', 'lentilles corail', 'lentilles vertes']),
  i('chickpeas', 'Pois chiches', 'Chickpeas', '🫘', 'can', [], ['pois chiche', 'garbanzo']),
  i('kidney_beans', 'Haricots rouges', 'Kidney beans', '🫘', 'can', [], ['haricot rouge']),
  i('noodles', 'Nouilles', 'Noodles', '🍜', 'starch', ['gluten'], ['nouilles chinoises', 'ramen', 'udon']),
  i('gnocchi', 'Gnocchis', 'Gnocchi', '🥟', 'starch', ['gluten'], ['gnocchi']),
  i('puff_pastry', 'Pâte feuilletée', 'Puff pastry', '🥐', 'dairy', ['gluten', 'milk'], ['pâte brisée', 'pate brisee', 'pate feuilletee', 'pâte à tarte', 'shortcrust']),
  i('pizza_dough', 'Pâte à pizza', 'Pizza dough', '🍕', 'dairy', ['gluten'], ['pate a pizza']),
  i('oats', "Flocons d'avoine", 'Oats', '🥣', 'grocery', ['gluten'], ['avoine', 'porridge', 'oatmeal']),

  // --- Conserves & épicerie ---
  i('canned_tomato', 'Tomates concassées', 'Canned tomatoes', '🥫', 'can', [], ['coulis de tomate', 'sauce tomate', 'passata', 'tomates pelées', 'pulpe de tomate'], Q),
  i('tomato_paste', 'Concentré de tomate', 'Tomato paste', '🥫', 'can', [], ['concentre de tomate']),
  i('tuna', 'Thon en boîte', 'Canned tuna', '🐟', 'can', ['fish'], ['thon', 'tuna'], Q),
  i('sardines', 'Sardines', 'Sardines', '🐟', 'can', ['fish'], ['sardine']),
  i('coconut_milk', 'Lait de coco', 'Coconut milk', '🥥', 'can', [], ['crème de coco']),
  i('stock', 'Bouillon cube', 'Stock cube', '🧊', 'grocery', [], ['bouillon', 'cube', 'stock', 'broth', 'fond de volaille']),
  i('soy_sauce', 'Sauce soja', 'Soy sauce', '🥢', 'grocery', ['soy', 'gluten'], ['soja', 'shoyu', 'tamari']),
  i('mustard', 'Moutarde', 'Mustard', '🟡', 'grocery', [], ['moutarde de dijon']),
  i('vinegar', 'Vinaigre', 'Vinegar', '🍶', 'grocery', [], ['vinaigre balsamique', 'balsamic']),
  i('honey', 'Miel', 'Honey', '🍯', 'grocery', ['honey'], []),
  i('jam', 'Confiture', 'Jam', '🍓', 'grocery', [], []),
  i('baking_powder', 'Levure chimique', 'Baking powder', '🧁', 'grocery', [], ['levure', 'bicarbonate']),
  i('vanilla', 'Vanille', 'Vanilla', '🌼', 'spice', [], ['sucre vanillé', 'extrait de vanille']),
  i('cocoa', 'Cacao en poudre', 'Cocoa powder', '🍫', 'grocery', [], ['cacao']),
  i('nuts', 'Noix', 'Walnuts', '🌰', 'grocery', ['nuts'], ['noix', 'noisettes', 'amandes', 'almonds', 'hazelnuts']),
  i('peanut_butter', 'Beurre de cacahuète', 'Peanut butter', '🥜', 'grocery', ['peanut'], ['cacahuete', 'cacahuètes', 'peanuts']),
  i('olives', 'Olives', 'Olives', '🫒', 'can', [], ['olive']),
  i('pesto', 'Pesto', 'Pesto', '🌿', 'can', ['milk', 'nuts'], []),
  i('tofu', 'Tofu', 'Tofu', '⬜', 'dairy', ['soy'], []),
  i('sesame', 'Graines de sésame', 'Sesame seeds', '⚪', 'grocery', ['sesame'], ['sésame']),

  // --- Épices & herbes ---
  i('herbs', 'Herbes de Provence', 'Dried herbs', '🌿', 'spice', [], ['thym', 'origan', 'romarin', 'thyme', 'oregano', 'rosemary']),
  i('parsley', 'Persil', 'Parsley', '🌿', 'spice', [], ['persil plat']),
  i('basil', 'Basilic', 'Basil', '🌿', 'spice', [], []),
  i('coriander', 'Coriandre', 'Coriander', '🌿', 'spice', [], ['cilantro']),
  i('chives', 'Ciboulette', 'Chives', '🌿', 'spice', [], []),
  i('curry', 'Curry', 'Curry powder', '🟠', 'spice', [], ['curry en poudre', 'garam masala']),
  i('paprika', 'Paprika', 'Paprika', '🟥', 'spice', [], []),
  i('cumin', 'Cumin', 'Cumin', '🟤', 'spice', [], []),
  i('cinnamon', 'Cannelle', 'Cinnamon', '🟤', 'spice', [], []),
  i('chili', 'Piment', 'Chili', '🌶️', 'spice', [], ['piment d’espelette', 'chili flakes', 'harissa']),
  i('nutmeg', 'Muscade', 'Nutmeg', '🟤', 'spice', [], ['noix de muscade']),

  // --- Surgelés ---
  i('frozen_veg', 'Légumes surgelés', 'Frozen vegetables', '🧊', 'frozen', [], ['poêlée', 'jardinière', 'frozen veg']),
];

export const INGREDIENT_BY_ID: Record<string, Ingredient> = Object.fromEntries(
  INGREDIENTS.map((x) => [x.id, x]),
);

export const PANTRY_IDS = new Set(INGREDIENTS.filter((x) => x.pantry).map((x) => x.id));
export const QUICK_FILL_IDS = INGREDIENTS.filter((x) => x.quick).map((x) => x.id);

/** Préfixe des ingrédients libres (hors base), utilisables dans le frigo et les recettes perso */
export const FREE_PREFIX = 'free:';

/** Libellé affichable d'un ingrédient, y compris libre */
export function ingredientDisplay(id: string, lang: 'fr' | 'en', label?: string): { name: string; emoji: string } {
  const ing = INGREDIENT_BY_ID[id];
  if (ing) return { name: ing.name[lang], emoji: ing.emoji };
  const raw = label ?? (id.startsWith(FREE_PREFIX) ? id.slice(FREE_PREFIX.length) : id);
  return { name: raw.charAt(0).toUpperCase() + raw.slice(1), emoji: '🥡' };
}
