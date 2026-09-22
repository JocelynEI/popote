import { r } from './recipeHelper';
import type { Recipe } from './types';

/**
 * « Pack recettes + » (Premium). Cuisine du monde, desserts, batch cooking.
 * Lot initial — à compléter jusqu'à ~300 recettes.
 * Les recettes premium apparaissent dans les résultats avec un cadenas pour les non-premium (aperçu du titre uniquement).
 */
export const PREMIUM_RECIPES: Recipe[] = [
  r({
    id: 'p_pad_thai', premium: true, fr: 'Pad thaï aux crevettes', en: 'Shrimp pad thai', icon: '🍜', course: 'main', time: 25, diff: 2,
    ing: 'noodles 200 g; shrimp 200 g; egg 2; peanut_butter 1 tbsp?; soy_sauce 3 tbsp; lemon 1; sugar 1 tbsp; garlic 1 clove; coriander?; oil 2 tbsp',
    steps: [
      ['Faites tremper ou cuire les nouilles.', 'Soak or cook the noodles.', 5],
      ['Mélangez soja, sucre, citron (et beurre de cacahuète) pour la sauce.', 'Mix soy, sugar, lemon (and peanut butter) for the sauce.'],
      ['Faites sauter ail et crevettes, poussez de côté et brouillez les œufs.', 'Stir-fry garlic and shrimp, push aside and scramble the eggs.', 4],
      ['Ajoutez nouilles et sauce, faites sauter 2 minutes, servez avec coriandre.', 'Add noodles and sauce, toss 2 minutes, serve with coriander.', 2],
    ],
  }),
  r({
    id: 'p_moussaka', premium: true, fr: 'Moussaka rapide', en: 'Quick moussaka', icon: '🍆', course: 'main', time: 60, serv: 4, diff: 2,
    ing: 'eggplant 2; ground_beef 400 g; canned_tomato 400 g; onion 1; garlic 2 clove; cinnamon 1 pinch; milk 400 ml; butter 30 g; flour 30 g; emmental 50 g; oil 3 tbsp',
    steps: [
      ['Coupez les aubergines en tranches, faites-les dorer à l’huile ou au four.', 'Slice the eggplants and brown them in oil or in the oven.', 10],
      ['Faites revenir oignon, ail, viande, ajoutez tomates et cannelle, laissez réduire.', 'Sauté onion, garlic and beef, add tomatoes and cinnamon, reduce.', 15],
      ['Préparez une béchamel (beurre, farine, lait).', 'Make a béchamel (butter, flour, milk).', 5],
      ['Alternez aubergines et viande, couvrez de béchamel et fromage, enfournez à 190 °C.', 'Layer eggplant and meat, top with béchamel and cheese, bake at 190 °C.', 30],
    ],
  }),
  r({
    id: 'p_shepherd', premium: true, fr: 'Hachis parmentier', en: 'Cottage pie', icon: '🥔', course: 'main', time: 60, serv: 4,
    ing: 'potato 1000 g; ground_beef 500 g; onion 1; carrot 1?; milk 150 ml; butter 40 g; emmental 60 g?; herbs 1 tsp',
    steps: [
      ['Préparez une purée avec les pommes de terre, le lait et le beurre.', 'Make a mash with the potatoes, milk and butter.', 25],
      ['Faites revenir oignon, carotte et viande avec les herbes.', 'Sauté onion, carrot and beef with herbs.', 10],
      ['Mettez la viande dans un plat, couvrez de purée et de fromage, gratinez à 200 °C.', 'Put the meat in a dish, top with mash and cheese, bake at 200 °C.', 20],
    ],
  }),
  r({
    id: 'p_tajine', premium: true, fr: 'Tajine de poulet citron-olives', en: 'Chicken tagine with lemon & olives', icon: '🍲', course: 'main', time: 60, serv: 4,
    ing: 'chicken 600 g; onion 2; lemon 1; olives 15; garlic 2 clove; ginger 1 tsp; cumin 1 tsp; coriander?; water 300 ml; oil 2 tbsp; couscous 250 g?',
    steps: [
      ['Faites dorer le poulet dans l’huile, ajoutez oignons, ail et épices.', 'Brown the chicken in oil, add onions, garlic and spices.', 10],
      ['Ajoutez l’eau et le citron en quartiers, couvrez et laissez mijoter.', 'Add the water and lemon wedges, cover and simmer.', 40],
      ['Ajoutez les olives 10 minutes avant la fin, servez avec la coriandre.', 'Add the olives 10 minutes before the end, serve with coriander.'],
    ],
  }),
  r({
    id: 'p_poke', premium: true, fr: 'Poke bowl saumon', en: 'Salmon poke bowl', icon: '🍣', course: 'main', time: 25,
    ing: 'rice 150 g; salmon 200 g; avocado 1; cucumber 1?; carrot 1?; soy_sauce 3 tbsp; sesame 1 tbsp; lemon 1?; vinegar 1 tbsp',
    steps: [
      ['Faites cuire le riz, assaisonnez-le avec un peu de vinaigre et de sucre.', 'Cook the rice, season with a little vinegar and sugar.', 12],
      ['Coupez le saumon très frais en dés, faites-le mariner dans la sauce soja.', 'Dice the very fresh salmon and marinate in soy sauce.', 10],
      ['Dressez riz, saumon, avocat et crudités, parsemez de sésame.', 'Arrange rice, salmon, avocado and veg, top with sesame.'],
    ],
  }),
  r({
    id: 'p_batch_bolo', premium: true, fr: 'Batch cooking : sauce tomate de base ×3', en: 'Batch cooking: base tomato sauce ×3', icon: '🥫', course: 'main', time: 50, serv: 8,
    ing: 'canned_tomato 1200 g; onion 2; carrot 2; garlic 4 clove; herbs 2 tsp; oil 4 tbsp; sugar 1 tsp',
    steps: [
      ['Faites revenir oignons, carottes et ail finement hachés.', 'Sauté finely chopped onions, carrots and garlic.', 10],
      ['Ajoutez tomates, herbes, sucre, laissez mijoter à couvert.', 'Add tomatoes, herbs and sugar, simmer covered.', 35],
      ['Répartissez en 3 boîtes : pâtes, pizza, shakshuka. Se conserve 4 jours au frais ou 3 mois au congélateur.', 'Split into 3 boxes: pasta, pizza, shakshuka. Keeps 4 days chilled or 3 months frozen.'],
    ],
  }),
  r({
    id: 'p_tiramisu', premium: true, fr: 'Tiramisu express', en: 'Quick tiramisu', icon: '🍰', course: 'dessert', time: 25, serv: 4, diff: 2,
    ing: 'cream_cheese 250 g; egg 3; sugar 70 g; bread 8 slice?; cocoa 2 tbsp; water 200 ml',
    steps: [
      ['Fouettez les jaunes avec le sucre, ajoutez le fromage frais (mascarpone idéalement).', 'Whisk the yolks with sugar, add the cream cheese (mascarpone ideally).'],
      ['Montez les blancs en neige et incorporez-les.', 'Whisk the whites and fold them in.'],
      ['Alternez biscuits trempés dans du café et crème, finissez par le cacao.', 'Layer coffee-dipped biscuits and cream, finish with cocoa.'],
      ['Réservez au frais.', 'Chill.', 240],
    ],
  }),
  r({
    id: 'p_fondant', premium: true, fr: 'Fondant au chocolat', en: 'Chocolate fondant cake', icon: '🍫', course: 'dessert', time: 35, serv: 6,
    ing: 'chocolate 200 g; butter 150 g; egg 4; sugar 120 g; flour 50 g',
    steps: [
      ['Préchauffez le four à 180 °C. Faites fondre chocolat et beurre.', 'Preheat the oven to 180 °C. Melt the chocolate and butter.'],
      ['Fouettez œufs et sucre, ajoutez le chocolat puis la farine.', 'Whisk eggs and sugar, add chocolate then flour.'],
      ['Enfournez : le cœur doit rester fondant.', 'Bake: the centre should stay gooey.', 20],
    ],
  }),
  r({
    id: 'p_clafoutis', premium: true, fr: 'Clafoutis aux fruits', en: 'Fruit clafoutis', icon: '🍒', course: 'dessert', time: 45, serv: 6,
    ing: 'red_fruits 400 g; egg 3; milk 300 ml; flour 80 g; sugar 80 g; butter 10 g',
    steps: [
      ['Préchauffez le four à 180 °C, beurrez un plat et répartissez les fruits.', 'Preheat the oven to 180 °C, butter a dish and scatter the fruit.'],
      ['Fouettez œufs, sucre, farine puis lait.', 'Whisk eggs, sugar, flour, then milk.'],
      ['Versez sur les fruits et enfournez.', 'Pour over the fruit and bake.', 35],
    ],
  }),
  r({
    id: 'p_gazpacho', premium: true, fr: 'Gazpacho', en: 'Gazpacho', icon: '🍅', course: 'starter', time: 15, serv: 4,
    ing: 'tomato 6; cucumber 1; bell_pepper 1; garlic 1 clove; bread 1 slice?; oil 4 tbsp; vinegar 2 tbsp; salt',
    steps: [
      ['Coupez grossièrement tous les légumes.', 'Roughly chop all the vegetables.'],
      ['Mixez avec pain, huile, vinaigre et sel jusqu’à obtenir un velouté.', 'Blend with bread, oil, vinegar and salt until smooth.'],
      ['Servez très frais.', 'Serve well chilled.', 60],
    ],
  }),
  r({
    id: 'p_falafel', premium: true, fr: 'Falafels au four', en: 'Baked falafel', icon: '🧆', course: 'main', time: 40, serv: 3, diff: 2,
    ing: 'chickpeas 400 g; onion 1; garlic 2 clove; parsley 1 bunch; coriander?; cumin 2 tsp; flour 2 tbsp; oil 3 tbsp; yogurt 1?; tortilla 3?',
    steps: [
      ['Préchauffez le four à 200 °C.', 'Preheat the oven to 200 °C.'],
      ['Mixez grossièrement pois chiches, oignon, ail, herbes, cumin et farine.', 'Pulse chickpeas, onion, garlic, herbs, cumin and flour.'],
      ['Formez des boulettes, huilez-les et enfournez en les retournant à mi-cuisson.', 'Shape balls, oil them and bake, turning halfway.', 25],
      ['Servez dans des galettes avec une sauce au yaourt.', 'Serve in wraps with a yogurt sauce.'],
    ],
  }),
  r({
    id: 'p_empty_fridge_soup', premium: true, fr: 'Minestrone « fond de frigo »', en: '“Clear-the-fridge” minestrone', icon: '🥣', course: 'main', time: 40, serv: 4,
    ing: 'pasta 100 g; canned_tomato 400 g; onion 1; carrot 1?; zucchini 1?; celery 1?; kidney_beans 200 g?; green_beans 100 g?; stock 1; water 1000 ml; parmesan 30 g?',
    steps: [
      ['Faites revenir oignon et légumes en dés.', 'Sauté the onion and diced veg.', 6],
      ['Ajoutez tomates, eau, bouillon et haricots, laissez mijoter.', 'Add tomatoes, water, stock and beans, simmer.', 20],
      ['Ajoutez les petites pâtes et poursuivez la cuisson.', 'Add the small pasta and keep cooking.', 10],
      ['Servez avec du parmesan.', 'Serve with parmesan.'],
    ],
  }),
];
