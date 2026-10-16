import { r } from './recipeHelper';
import type { Recipe } from './types';

/**
 * Base de recettes GRATUITE.
 * Lot initial — à compléter jusqu'à ~300 recettes (même format, voir README > « Ajouter des recettes »).
 */
export const FREE_RECIPES: Recipe[] = [
  // ---------- Recettes « placard » (faisables avec presque rien) ----------
  r({
    id: 'omelette', fr: 'Omelette baveuse', en: 'Soft French omelette', icon: '🍳', course: 'main', time: 10, tools: [],
    ing: 'egg 4; butter 10 g; salt; pepper; chives 1 tbsp?; emmental 30 g?',
    steps: [
      ['Battez les œufs avec sel et poivre (et la ciboulette).', 'Beat the eggs with salt and pepper (and the chives).'],
      ['Faites fondre le beurre dans une poêle à feu moyen.', 'Melt the butter in a pan over medium heat.'],
      ['Versez les œufs, remuez doucement en ramenant les bords vers le centre.', 'Pour in the eggs, gently pulling the edges to the centre.', 3],
      ['Ajoutez le fromage, pliez en deux et servez encore baveux.', 'Add the cheese, fold in half and serve while still soft.'],
    ],
  }),
  r({
    id: 'pasta_garlic', fr: "Pâtes à l'ail et à l'huile", en: 'Garlic & oil spaghetti', icon: '🍝', course: 'main', time: 15, tools: [],
    ing: 'pasta 200 g; garlic 3 clove; oil 4 tbsp; chili 1 pinch?; parsley 1 tbsp?; parmesan 30 g?; salt',
    steps: [
      ['Faites cuire les pâtes dans une grande casserole d’eau salée.', 'Cook the pasta in a large pot of salted water.', 10],
      ['Pendant ce temps, faites dorer doucement l’ail émincé dans l’huile avec le piment.', 'Meanwhile, gently fry the sliced garlic in the oil with the chili.', 3],
      ['Égouttez les pâtes en gardant un peu d’eau de cuisson, mélangez avec l’huile à l’ail.', 'Drain, keeping a little pasta water, and toss with the garlic oil.'],
      ['Ajoutez persil et parmesan, servez aussitôt.', 'Add parsley and parmesan, serve immediately.'],
    ],
  }),
  r({
    id: 'fried_rice', fr: 'Riz sauté aux œufs', en: 'Egg fried rice', icon: '🍚', course: 'main', time: 15, tools: [],
    ing: 'rice 250 g; egg 2; onion 1; soy_sauce 2 tbsp; oil 2 tbsp; peas 80 g?; carrot 1?; frozen_veg 150 g?',
    steps: [
      ['Utilisez du riz déjà cuit et refroidi (idéal : restes de la veille).', 'Use cooked, cooled rice (leftovers are ideal).'],
      ['Faites revenir l’oignon et les légumes dans l’huile à feu vif.', 'Stir-fry the onion and vegetables in the oil over high heat.', 4],
      ['Poussez sur le côté, brouillez les œufs dans la poêle.', 'Push aside and scramble the eggs in the pan.', 2],
      ['Ajoutez le riz et la sauce soja, faites sauter 3 minutes.', 'Add the rice and soy sauce, stir-fry for 3 minutes.', 3],
    ],
  }),
  r({
    id: 'french_toast', fr: 'Pain perdu', en: 'French toast', icon: '🍞', course: 'dessert', time: 15, tools: [],
    ing: 'bread 6 slice; egg 2; milk 200 ml; sugar 2 tbsp; butter 20 g; cinnamon 1 pinch?; vanilla?',
    steps: [
      ['Fouettez œufs, lait, sucre (et cannelle ou vanille) dans une assiette creuse.', 'Whisk eggs, milk, sugar (and cinnamon or vanilla) in a shallow dish.'],
      ['Trempez les tranches de pain des deux côtés.', 'Dip the bread slices on both sides.'],
      ['Faites-les dorer au beurre 2 minutes par face.', 'Fry in butter for 2 minutes per side.', 4],
      ['Saupoudrez d’un peu de sucre et servez tiède.', 'Sprinkle with a little sugar and serve warm.'],
    ],
  }),
  r({
    id: 'crepes', fr: 'Crêpes', en: 'Crêpes', icon: '🥞', course: 'dessert', time: 30, tools: [], serv: 4,
    ing: 'flour 250 g; egg 4; milk 500 ml; sugar 1 tbsp; butter 30 g; salt 1 pinch',
    steps: [
      ['Mettez la farine, le sucre et le sel dans un saladier, creusez un puits.', 'Put flour, sugar and salt in a bowl and make a well.'],
      ['Ajoutez les œufs, puis le lait petit à petit en fouettant pour éviter les grumeaux.', 'Add the eggs, then the milk gradually, whisking to avoid lumps.'],
      ['Incorporez le beurre fondu. Laissez reposer si vous avez le temps.', 'Stir in the melted butter. Rest the batter if you have time.', 15],
      ['Faites cuire les crêpes dans une poêle chaude légèrement huilée, 1 minute par face.', 'Cook in a hot, lightly oiled pan, 1 minute per side.'],
    ],
  }),
  r({
    id: 'shakshuka', fr: 'Shakshuka', en: 'Shakshuka', icon: '🍳', course: 'main', time: 25, tools: [],
    ing: 'egg 4; canned_tomato 400 g; onion 1; bell_pepper 1?; garlic 2 clove; cumin 1 tsp; paprika 1 tsp?; oil 2 tbsp; coriander 1 tbsp?; feta 50 g?',
    steps: [
      ['Faites revenir oignon, poivron et ail dans l’huile.', 'Sauté onion, pepper and garlic in the oil.', 5],
      ['Ajoutez les épices puis les tomates, laissez mijoter.', 'Add the spices then the tomatoes, simmer.', 10],
      ['Creusez 4 puits, cassez-y les œufs, couvrez.', 'Make 4 wells, crack in the eggs, cover.', 6],
      ['Parsemez de coriandre et de feta, servez avec du pain.', 'Top with coriander and feta, serve with bread.'],
    ],
  }),
  r({
    id: 'tuna_pasta', fr: 'Pâtes au thon et tomate', en: 'Tuna tomato pasta', icon: '🍝', course: 'main', time: 20, tools: [],
    ing: 'pasta 200 g; tuna 1 can; canned_tomato 400 g; onion 1; garlic 1 clove; herbs 1 tsp; oil 1 tbsp; olives 10?',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites revenir oignon et ail, ajoutez les tomates et les herbes, laissez réduire.', 'Sauté onion and garlic, add tomatoes and herbs, reduce.', 10],
      ['Ajoutez le thon émietté (et les olives) en fin de cuisson.', 'Add the flaked tuna (and olives) at the end.'],
      ['Mélangez avec les pâtes égouttées.', 'Toss with the drained pasta.'],
    ],
  }),
  r({
    id: 'croque', fr: 'Croque-monsieur', en: 'Croque-monsieur', icon: '🥪', course: 'main', time: 15, tools: ['oven'],
    ing: 'bread 4 slice; ham 2 slice; emmental 60 g; butter 15 g; cream 2 tbsp?',
    steps: [
      ['Beurrez les tranches de pain à l’extérieur.', 'Butter the outside of the bread slices.'],
      ['Garnissez de jambon et fromage (et d’un peu de crème).', 'Fill with ham and cheese (and a little cream).'],
      ['Faites dorer à la poêle ou au four à 200 °C.', 'Toast in a pan or in the oven at 200 °C.', 8],
    ],
  }),
  // ---------- Plats ----------
  r({
    id: 'carbonara', fr: 'Pâtes carbonara', en: 'Pasta carbonara', icon: '🍝', course: 'main', time: 20, tools: [],
    ing: 'pasta 200 g; bacon 150 g; egg 2; parmesan 50 g; pepper',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites dorer les lardons sans matière grasse.', 'Fry the bacon without added fat.', 5],
      ['Mélangez œufs, parmesan et beaucoup de poivre.', 'Mix eggs, parmesan and plenty of pepper.'],
      ['Hors du feu, mélangez pâtes, lardons et œufs avec un peu d’eau de cuisson pour une sauce crémeuse.', 'Off the heat, toss pasta, bacon and egg mix with a little pasta water for a creamy sauce.'],
    ],
  }),
  r({
    id: 'bolognese', fr: 'Spaghetti bolognaise', en: 'Spaghetti bolognese', icon: '🍝', course: 'main', time: 40, tools: [], serv: 4,
    ing: 'pasta 400 g; ground_beef 400 g; canned_tomato 400 g; onion 1; carrot 1?; garlic 2 clove; tomato_paste 1 tbsp?; herbs 1 tsp; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon, carotte et ail dans l’huile.', 'Sauté onion, carrot and garlic in the oil.', 5],
      ['Ajoutez la viande et faites-la dorer.', 'Add the beef and brown it.', 5],
      ['Ajoutez tomates, concentré et herbes, laissez mijoter à couvert.', 'Add tomatoes, paste and herbs, simmer covered.', 25],
      ['Servez sur les pâtes cuites.', 'Serve over the cooked pasta.'],
    ],
  }),
  r({
    id: 'chicken_curry', fr: 'Curry de poulet au lait de coco', en: 'Coconut chicken curry', icon: '🍛', course: 'main', time: 30, tools: [], serv: 3,
    ing: 'chicken 400 g; coconut_milk 400 ml; onion 1; garlic 2 clove; curry 2 tsp; ginger 1 tsp?; tomato 2?; rice 200 g; oil 1 tbsp; coriander?',
    steps: [
      ['Lancez la cuisson du riz.', 'Start cooking the rice.', 12],
      ['Faites revenir oignon, ail et gingembre, puis le poulet en morceaux.', 'Sauté onion, garlic and ginger, then the diced chicken.', 6],
      ['Ajoutez le curry, les tomates et le lait de coco. Laissez mijoter.', 'Add curry, tomatoes and coconut milk. Simmer.', 15],
      ['Servez avec le riz et la coriandre.', 'Serve with the rice and coriander.'],
    ],
  }),
  r({
    id: 'chickpea_curry', fr: 'Curry de pois chiches', en: 'Chickpea curry', icon: '🍛', course: 'main', time: 25, tools: [], serv: 3,
    ing: 'chickpeas 400 g; coconut_milk 400 ml; canned_tomato 200 g; onion 1; garlic 2 clove; curry 2 tsp; spinach 100 g?; rice 200 g; oil 1 tbsp',
    steps: [
      ['Faites cuire le riz.', 'Cook the rice.', 12],
      ['Faites revenir oignon et ail, ajoutez le curry.', 'Sauté onion and garlic, add the curry.', 3],
      ['Ajoutez pois chiches égouttés, tomates et lait de coco, laissez mijoter.', 'Add drained chickpeas, tomatoes and coconut milk, simmer.', 15],
      ['Incorporez les épinards 2 minutes avant la fin. Servez avec le riz.', 'Stir in the spinach 2 minutes before the end. Serve with rice.'],
    ],
  }),
  r({
    id: 'lentil_dahl', fr: 'Dahl de lentilles corail', en: 'Red lentil dahl', icon: '🥣', course: 'main', time: 30, tools: [], serv: 3,
    ing: 'lentils 200 g; coconut_milk 200 ml; canned_tomato 200 g; onion 1; garlic 2 clove; curry 2 tsp; ginger 1 tsp?; water 500 ml; lemon 1?',
    steps: [
      ['Faites revenir oignon, ail, gingembre et curry.', 'Sauté onion, garlic, ginger and curry.', 4],
      ['Ajoutez les lentilles rincées, les tomates et l’eau.', 'Add the rinsed lentils, tomatoes and water.'],
      ['Laissez cuire en remuant jusqu’à ce que les lentilles soient fondantes.', 'Simmer, stirring, until the lentils are soft.', 20],
      ['Ajoutez le lait de coco et un filet de citron.', 'Stir in the coconut milk and a squeeze of lemon.'],
    ],
  }),
  r({
    id: 'quiche', fr: 'Quiche lorraine', en: 'Quiche lorraine', icon: '🥧', course: 'main', time: 45, tools: ['oven'], serv: 4, diff: 2,
    ing: 'puff_pastry 1; egg 3; cream 200 ml; milk 100 ml; bacon 200 g; emmental 50 g?; nutmeg 1 pinch?; pepper',
    steps: [
      ['Préchauffez le four à 200 °C. Étalez la pâte dans un moule et piquez-la.', 'Preheat the oven to 200 °C. Line a tin with the pastry and prick it.'],
      ['Faites dorer les lardons et répartissez-les sur la pâte.', 'Brown the bacon and spread it over the pastry.', 5],
      ['Battez œufs, crème, lait, muscade et poivre, versez sur la pâte, ajoutez le fromage.', 'Beat eggs, cream, milk, nutmeg and pepper, pour over, add cheese.'],
      ['Enfournez jusqu’à ce que ce soit doré.', 'Bake until golden.', 30],
    ],
  }),
  r({
    id: 'veg_quiche', fr: 'Quiche aux légumes du frigo', en: 'Fridge-veg quiche', icon: '🥧', course: 'main', time: 45, tools: ['oven'], serv: 4, diff: 2,
    ing: 'puff_pastry 1; egg 3; cream 200 ml; zucchini 1?; spinach 100 g?; mushroom 150 g?; leek 1?; goat_cheese 100 g?; emmental 50 g?; salt; pepper',
    steps: [
      ['Préchauffez le four à 200 °C. Foncez le moule avec la pâte.', 'Preheat the oven to 200 °C. Line the tin with pastry.'],
      ['Faites revenir les légumes disponibles, coupés en petits morceaux.', 'Sauté whatever vegetables you have, finely chopped.', 8],
      ['Battez œufs et crème, salez, poivrez. Versez sur les légumes, ajoutez le fromage.', 'Beat eggs and cream, season. Pour over the vegetables, add cheese.'],
      ['Enfournez.', 'Bake.', 30],
    ],
  }),
  r({
    id: 'ratatouille', fr: 'Ratatouille', en: 'Ratatouille', icon: '🍆', course: 'main', time: 50, tools: [], serv: 4,
    ing: 'zucchini 2; eggplant 1; bell_pepper 1; tomato 3; onion 1; garlic 2 clove; herbs 1 tsp; oil 3 tbsp',
    steps: [
      ['Coupez tous les légumes en dés.', 'Dice all the vegetables.'],
      ['Faites revenir oignon et poivron, puis aubergine et courgette.', 'Sauté onion and pepper, then eggplant and zucchini.', 10],
      ['Ajoutez tomates, ail et herbes, couvrez et laissez mijoter.', 'Add tomatoes, garlic and herbs, cover and simmer.', 30],
    ],
  }),
  r({
    id: 'veg_soup', fr: 'Soupe de légumes', en: 'Vegetable soup', icon: '🥣', course: 'starter', time: 35, tools: ['blender'], serv: 4,
    ing: 'potato 2; carrot 2; leek 1?; zucchini 1?; onion 1; stock 1; water 1000 ml; cream 2 tbsp?',
    steps: [
      ['Épluchez et coupez les légumes en morceaux.', 'Peel and chop the vegetables.'],
      ['Mettez-les dans une casserole avec l’eau et le bouillon.', 'Put them in a pot with the water and stock cube.'],
      ['Laissez cuire jusqu’à ce qu’ils soient tendres.', 'Simmer until tender.', 25],
      ['Mixez, ajoutez un peu de crème si vous le souhaitez.', 'Blend, adding a little cream if you like.'],
    ],
  }),
  r({
    id: 'pumpkin_soup', fr: 'Velouté de courge', en: 'Squash soup', icon: '🎃', course: 'starter', time: 35, tools: ['blender'], serv: 4,
    ing: 'pumpkin 800 g; onion 1; potato 1?; stock 1; water 800 ml; cream 3 tbsp?; nutmeg 1 pinch?',
    steps: [
      ['Coupez la courge et la pomme de terre en cubes, émincez l’oignon.', 'Cube the squash and potato, slice the onion.'],
      ['Faites cuire dans l’eau avec le bouillon.', 'Cook in the water with the stock cube.', 25],
      ['Mixez avec la crème et la muscade.', 'Blend with the cream and nutmeg.'],
    ],
  }),
  r({
    id: 'tomato_soup', fr: 'Soupe de tomates', en: 'Tomato soup', icon: '🍅', course: 'starter', time: 25, tools: ['blender'], serv: 3,
    ing: 'canned_tomato 800 g; onion 1; garlic 1 clove; stock 1; water 300 ml; basil?; cream 2 tbsp?; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon et ail dans l’huile.', 'Sauté onion and garlic in the oil.', 4],
      ['Ajoutez tomates, eau et bouillon, laissez mijoter.', 'Add tomatoes, water and stock, simmer.', 15],
      ['Mixez, ajoutez basilic et crème.', 'Blend, add basil and cream.'],
    ],
  }),
  r({
    id: 'gratin_dauphinois', fr: 'Gratin dauphinois', en: 'Potato gratin', icon: '🥔', course: 'main', time: 75, tools: ['oven'], serv: 4,
    ing: 'potato 1000 g; cream 250 ml; milk 250 ml; garlic 1 clove; butter 10 g; nutmeg 1 pinch?; salt; pepper',
    steps: [
      ['Préchauffez le four à 170 °C. Frottez un plat avec l’ail et beurrez-le.', 'Preheat the oven to 170 °C. Rub a dish with garlic and butter it.'],
      ['Coupez les pommes de terre en fines rondelles.', 'Slice the potatoes thinly.'],
      ['Portez lait et crème à frémissement avec sel, poivre et muscade, versez sur les pommes de terre.', 'Bring milk and cream to a simmer with seasoning, pour over potatoes.'],
      ['Enfournez jusqu’à ce que ce soit doré et fondant.', 'Bake until golden and tender.', 60],
    ],
  }),
  r({
    id: 'mash', fr: 'Purée maison', en: 'Mashed potatoes', icon: '🥔', course: 'main', time: 30, tools: [], serv: 3,
    ing: 'potato 800 g; milk 150 ml; butter 40 g; nutmeg 1 pinch?; salt',
    steps: [
      ['Faites cuire les pommes de terre épluchées dans l’eau salée.', 'Boil the peeled potatoes in salted water.', 20],
      ['Égouttez et écrasez-les.', 'Drain and mash.'],
      ['Ajoutez le beurre puis le lait chaud petit à petit.', 'Add the butter, then the hot milk little by little.'],
    ],
  }),
  r({
    id: 'fritatta', fr: 'Frittata aux restes de légumes', en: 'Leftover veg frittata', icon: '🍳', course: 'main', time: 20, tools: ['oven'],
    ing: 'egg 5; potato 1?; zucchini 1?; bell_pepper 1?; spinach 80 g?; onion 1?; emmental 40 g?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Faites revenir les légumes en petits dés dans une poêle allant au four.', 'Sauté the diced vegetables in an ovenproof pan.', 8],
      ['Versez les œufs battus assaisonnés, parsemez de fromage.', 'Pour in the seasoned beaten eggs, sprinkle with cheese.'],
      ['Cuisez à feu doux puis finissez sous le gril du four.', 'Cook gently, then finish under the grill.', 8],
    ],
  }),
  r({
    id: 'chili', fr: 'Chili con carne', en: 'Chili con carne', icon: '🌶️', course: 'main', time: 45, tools: [], serv: 4,
    ing: 'ground_beef 400 g; kidney_beans 400 g; canned_tomato 400 g; onion 1; bell_pepper 1?; garlic 2 clove; cumin 1 tsp; chili 1 tsp; corn 150 g?; rice 250 g; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon, poivron et ail, puis la viande.', 'Sauté onion, pepper and garlic, then brown the beef.', 8],
      ['Ajoutez épices, tomates, haricots et maïs.', 'Add spices, tomatoes, beans and corn.'],
      ['Laissez mijoter à couvert.', 'Simmer covered.', 25],
      ['Servez avec du riz.', 'Serve with rice.'],
    ],
  }),
  r({
    id: 'sin_carne', fr: 'Chili sin carne', en: 'Veggie chili', icon: '🌶️', course: 'main', time: 35, tools: [], serv: 4,
    ing: 'kidney_beans 800 g; canned_tomato 400 g; onion 1; bell_pepper 1; corn 150 g?; garlic 2 clove; cumin 1 tsp; chili 1 tsp; paprika 1 tsp?; rice 250 g; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon, poivron et ail.', 'Sauté onion, pepper and garlic.', 5],
      ['Ajoutez épices, tomates, haricots, maïs et laissez mijoter.', 'Add spices, tomatoes, beans and corn and simmer.', 20],
      ['Servez avec du riz.', 'Serve with rice.'],
    ],
  }),
  r({
    id: 'risotto_mushroom', fr: 'Risotto aux champignons', en: 'Mushroom risotto', icon: '🍄', course: 'main', time: 35, tools: [], diff: 2, serv: 3,
    ing: 'rice 250 g; mushroom 250 g; onion 1; stock 1; water 800 ml; parmesan 50 g; butter 20 g; oil 1 tbsp',
    steps: [
      ['Faites chauffer l’eau avec le bouillon.', 'Heat the water with the stock cube.'],
      ['Faites revenir l’oignon, puis le riz jusqu’à ce qu’il soit nacré.', 'Sauté the onion, then the rice until translucent.', 3],
      ['Ajoutez le bouillon louche par louche en remuant, avec les champignons à mi-cuisson.', 'Add stock ladle by ladle, stirring; add mushrooms halfway.', 18],
      ['Hors du feu, ajoutez beurre et parmesan.', 'Off the heat, stir in butter and parmesan.'],
    ],
  }),
  r({
    id: 'fajitas', fr: 'Fajitas au poulet', en: 'Chicken fajitas', icon: '🌯', course: 'main', time: 25, tools: [], serv: 3,
    ing: 'tortilla 6; chicken 400 g; bell_pepper 2; onion 1; paprika 1 tsp; cumin 1 tsp; lemon 1?; cream 3 tbsp?; avocado 1?; oil 1 tbsp',
    steps: [
      ['Coupez poulet, poivrons et oignon en lanières.', 'Slice chicken, peppers and onion into strips.'],
      ['Faites sauter le poulet avec les épices, puis les légumes.', 'Stir-fry the chicken with the spices, then the vegetables.', 10],
      ['Réchauffez les tortillas, garnissez avec crème, avocat et un filet de citron.', 'Warm the tortillas, fill with cream, avocado and a squeeze of lemon.'],
    ],
  }),
  r({
    id: 'quesadilla', fr: 'Quesadillas express', en: 'Quick quesadillas', icon: '🌮', course: 'main', time: 15, tools: [],
    ing: 'tortilla 4; emmental 100 g; kidney_beans 150 g?; corn 80 g?; ham 2 slice?; bell_pepper 1?',
    steps: [
      ['Garnissez une moitié de chaque tortilla de fromage et de ce que vous avez.', 'Fill half of each tortilla with cheese and whatever you have.'],
      ['Repliez et faites dorer à la poêle sèche.', 'Fold and toast in a dry pan.', 5],
      ['Coupez en triangles.', 'Cut into wedges.'],
    ],
  }),
  r({
    id: 'pizza', fr: 'Pizza maison', en: 'Homemade pizza', icon: '🍕', course: 'main', time: 25, tools: ['oven'], serv: 2,
    ing: 'pizza_dough 1; canned_tomato 150 g; mozzarella 125 g; ham 2 slice?; mushroom 100 g?; olives 8?; herbs 1 tsp',
    steps: [
      ['Préchauffez le four à 240 °C. Étalez la pâte.', 'Preheat the oven to 240 °C. Roll out the dough.'],
      ['Étalez la sauce tomate, ajoutez garnitures et mozzarella.', 'Spread the tomato, add toppings and mozzarella.'],
      ['Enfournez jusqu’à ce que la pâte soit dorée.', 'Bake until the crust is golden.', 12],
    ],
  }),
  r({
    id: 'stir_fry_noodles', fr: 'Nouilles sautées aux légumes', en: 'Veggie stir-fry noodles', icon: '🍜', course: 'main', time: 20, tools: [],
    ing: 'noodles 200 g; carrot 1?; bell_pepper 1?; cabbage 150 g?; frozen_veg 200 g?; garlic 1 clove; soy_sauce 3 tbsp; honey 1 tsp?; oil 2 tbsp; egg 2?',
    steps: [
      ['Faites cuire les nouilles selon le paquet.', 'Cook the noodles as per the packet.', 4],
      ['Faites sauter l’ail et les légumes émincés à feu vif.', 'Stir-fry the garlic and sliced vegetables over high heat.', 5],
      ['Ajoutez nouilles, sauce soja et miel, mélangez 2 minutes.', 'Add noodles, soy sauce and honey, toss 2 minutes.', 2],
    ],
  }),
  r({
    id: 'salmon_papillote', fr: 'Saumon en papillote', en: 'Salmon en papillote', icon: '🐟', course: 'main', time: 25, tools: ['oven'],
    ing: 'salmon 2; lemon 1; zucchini 1?; carrot 1?; herbs 1 tsp?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Préchauffez le four à 200 °C.', 'Preheat the oven to 200 °C.'],
      ['Déposez légumes en fines lamelles et saumon sur du papier cuisson, avec citron, huile et herbes.', 'Place thinly sliced veg and salmon on baking paper with lemon, oil and herbs.'],
      ['Fermez les papillotes et enfournez.', 'Seal the parcels and bake.', 15],
    ],
  }),
  r({
    id: 'fish_rice', fr: 'Poisson blanc, riz et sauce citron', en: 'White fish with lemon rice', icon: '🐟', course: 'main', time: 25, tools: [],
    ing: 'white_fish 2; rice 150 g; lemon 1; butter 20 g; parsley?; salt; pepper',
    steps: [
      ['Faites cuire le riz.', 'Cook the rice.', 12],
      ['Poêlez le poisson au beurre, 3 à 4 minutes par face.', 'Pan-fry the fish in butter, 3–4 minutes per side.', 7],
      ['Déglacez avec le jus de citron, ajoutez le persil, servez sur le riz.', 'Deglaze with lemon juice, add parsley, serve over rice.'],
    ],
  }),
  r({
    id: 'chicken_mustard', fr: 'Poulet à la moutarde', en: 'Mustard cream chicken', icon: '🍗', course: 'main', time: 25, tools: [],
    ing: 'chicken 300 g; cream 150 ml; mustard 2 tbsp; onion 1?; oil 1 tbsp; pasta 200 g?; rice 150 g?',
    steps: [
      ['Faites dorer le poulet (et l’oignon) dans l’huile.', 'Brown the chicken (and onion) in the oil.', 8],
      ['Ajoutez crème et moutarde, laissez épaissir.', 'Add cream and mustard, let it thicken.', 5],
      ['Servez avec des pâtes ou du riz.', 'Serve with pasta or rice.'],
    ],
  }),
  r({
    id: 'sausage_lentils', fr: 'Saucisses aux lentilles', en: 'Sausages with lentils', icon: '🌭', course: 'main', time: 40, tools: [], serv: 3,
    ing: 'sausage 4; lentils 250 g; carrot 2; onion 1; stock 1; water 800 ml; herbs 1 tsp?',
    steps: [
      ['Faites dorer les saucisses, réservez.', 'Brown the sausages and set aside.', 6],
      ['Faites revenir oignon et carottes, ajoutez lentilles, eau et bouillon.', 'Sauté onion and carrots, add lentils, water and stock.'],
      ['Remettez les saucisses et laissez cuire à couvert.', 'Return the sausages and simmer covered.', 25],
    ],
  }),
  r({
    id: 'couscous_veg', fr: 'Couscous express aux légumes', en: 'Quick vegetable couscous', icon: '🍲', course: 'main', time: 30, tools: [], serv: 3,
    ing: 'couscous 200 g; chickpeas 200 g; carrot 2; zucchini 1; onion 1; canned_tomato 200 g; cumin 1 tsp; stock 1; water 500 ml; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon et légumes coupés, ajoutez tomates, épices, eau et bouillon.', 'Sauté onion and chopped veg, add tomatoes, spices, water and stock.', 5],
      ['Ajoutez les pois chiches et laissez mijoter.', 'Add the chickpeas and simmer.', 20],
      ['Versez de l’eau bouillante sur la semoule (même volume), couvrez 5 minutes, égrainez.', 'Pour boiling water over the couscous (same volume), cover 5 minutes, fluff.', 5],
    ],
  }),
  r({
    id: 'mac_cheese', fr: 'Macaroni au fromage', en: 'Mac and cheese', icon: '🧀', course: 'main', time: 30, tools: ['oven'], serv: 3,
    ing: 'pasta 250 g; milk 400 ml; butter 30 g; flour 30 g; emmental 150 g; mustard 1 tsp?; nutmeg 1 pinch?',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 9],
      ['Faites fondre le beurre, ajoutez la farine puis le lait en fouettant jusqu’à épaississement.', 'Melt the butter, add the flour, then whisk in the milk until thick.', 5],
      ['Ajoutez le fromage, la moutarde et la muscade, puis les pâtes.', 'Add cheese, mustard and nutmeg, then the pasta.'],
      ['Gratinez 10 minutes au four si vous le souhaitez.', 'Optionally grill for 10 minutes.', 10],
    ],
  }),
  r({
    id: 'gnocchi_tomato', fr: 'Gnocchis poêlés tomate-mozza', en: 'Pan-fried gnocchi with tomato & mozzarella', icon: '🥟', course: 'main', time: 20, tools: [],
    ing: 'gnocchi 500 g; canned_tomato 300 g; mozzarella 125 g; garlic 1 clove; basil?; oil 1 tbsp',
    steps: [
      ['Faites dorer les gnocchis dans l’huile.', 'Pan-fry the gnocchi in the oil until golden.', 6],
      ['Ajoutez ail et tomates, laissez réduire.', 'Add garlic and tomatoes, reduce.', 6],
      ['Ajoutez la mozzarella en morceaux, couvrez jusqu’à ce qu’elle fonde.', 'Add torn mozzarella, cover until melted.', 3],
    ],
  }),
  r({
    id: 'buddha_bowl', fr: 'Bowl quinoa-légumes', en: 'Quinoa veggie bowl', icon: '🥗', course: 'main', time: 25, tools: [],
    ing: 'quinoa 150 g; chickpeas 200 g; avocado 1?; carrot 1?; cucumber 1?; tomato 1?; feta 60 g?; lemon 1; oil 2 tbsp',
    steps: [
      ['Faites cuire le quinoa.', 'Cook the quinoa.', 12],
      ['Préparez les crudités, rincez les pois chiches.', 'Prep the raw veg, rinse the chickpeas.'],
      ['Assemblez, arrosez d’huile et de citron.', 'Assemble, dress with oil and lemon.'],
    ],
  }),
  r({
    id: 'tofu_stirfry', fr: 'Tofu sauté soja-sésame', en: 'Soy-sesame tofu stir-fry', icon: '🥢', course: 'main', time: 25, tools: [],
    ing: 'tofu 250 g; soy_sauce 3 tbsp; broccoli 1?; bell_pepper 1?; garlic 1 clove; ginger 1 tsp?; sesame 1 tbsp?; rice 150 g; oil 2 tbsp',
    steps: [
      ['Faites cuire le riz.', 'Cook the rice.', 12],
      ['Faites dorer le tofu en cubes dans l’huile.', 'Brown the cubed tofu in oil.', 6],
      ['Ajoutez légumes, ail, gingembre, puis la sauce soja.', 'Add veg, garlic, ginger, then soy sauce.', 5],
      ['Parsemez de sésame et servez sur le riz.', 'Sprinkle with sesame and serve over rice.'],
    ],
  }),
  // ---------- Entrées & salades ----------
  r({
    id: 'nicoise', fr: 'Salade niçoise', en: 'Niçoise salad', icon: '🥗', course: 'starter', time: 20, tools: [],
    ing: 'salad 1; tuna 1 can; egg 2; tomato 2; green_beans 100 g?; olives 10?; potato 2?; oil 3 tbsp; vinegar 1 tbsp',
    steps: [
      ['Faites cuire les œufs durs (et les pommes de terre, haricots).', 'Hard-boil the eggs (and cook the potatoes and beans).', 10],
      ['Coupez tomates et œufs en quartiers.', 'Quarter the tomatoes and eggs.'],
      ['Assemblez avec la salade, le thon et les olives, assaisonnez.', 'Assemble with lettuce, tuna and olives, dress.'],
    ],
  }),
  r({
    id: 'tomato_mozza', fr: 'Salade tomate-mozzarella', en: 'Caprese salad', icon: '🍅', course: 'starter', time: 10, tools: [],
    ing: 'tomato 3; mozzarella 125 g; basil?; oil 2 tbsp; salt; pepper',
    steps: [
      ['Coupez tomates et mozzarella en tranches.', 'Slice the tomatoes and mozzarella.'],
      ['Alternez-les dans un plat, ajoutez basilic, huile, sel et poivre.', 'Alternate on a plate, add basil, oil, salt and pepper.'],
    ],
  }),
  r({
    id: 'carrot_salad', fr: 'Carottes râpées', en: 'Grated carrot salad', icon: '🥕', course: 'starter', time: 10, tools: [],
    ing: 'carrot 4; lemon 1; oil 2 tbsp; parsley?; raisins 30 g?',
    steps: [
      ['Râpez les carottes.', 'Grate the carrots.'],
      ['Assaisonnez avec citron, huile, sel et persil.', 'Dress with lemon, oil, salt and parsley.'],
    ],
  }),
  r({
    id: 'cucumber_yogurt', fr: 'Concombre au yaourt', en: 'Cucumber yogurt salad', icon: '🥒', course: 'starter', time: 10, tools: [],
    ing: 'cucumber 1; yogurt 1; garlic 1 clove?; chives?; lemon 1?; salt',
    steps: [
      ['Coupez le concombre en fines rondelles, salez.', 'Thinly slice the cucumber and salt it.'],
      ['Mélangez avec le yaourt, l’ail, la ciboulette et un peu de citron.', 'Mix with yogurt, garlic, chives and a little lemon.'],
    ],
  }),
  r({
    id: 'hummus', fr: 'Houmous', en: 'Hummus', icon: '🫘', course: 'starter', time: 10, tools: ['blender'], serv: 4,
    ing: 'chickpeas 400 g; lemon 1; garlic 1 clove; oil 3 tbsp; cumin 1 pinch?; sesame 1 tbsp?; water 3 tbsp',
    steps: [
      ['Égouttez les pois chiches en gardant un peu de jus.', 'Drain the chickpeas, keeping a little liquid.'],
      ['Mixez tous les ingrédients jusqu’à obtenir une texture lisse, en ajoutant de l’eau si besoin.', 'Blend everything until smooth, adding water as needed.'],
    ],
  }),
  r({
    id: 'guacamole', fr: 'Guacamole', en: 'Guacamole', icon: '🥑', course: 'starter', time: 10, tools: [],
    ing: 'avocado 2; lemon 1; tomato 1?; onion 1?; coriander?; chili 1 pinch?; salt',
    steps: [
      ['Écrasez les avocats avec le jus de citron.', 'Mash the avocados with lemon juice.'],
      ['Ajoutez tomate, oignon, coriandre finement hachés, sel et piment.', 'Add finely chopped tomato, onion, coriander, salt and chili.'],
    ],
  }),
  r({
    id: 'lentil_salad', fr: 'Salade de lentilles', en: 'Lentil salad', icon: '🥗', course: 'starter', time: 30, tools: [],
    ing: 'lentils 150 g; shallot 1; mustard 1 tsp; vinegar 1 tbsp; oil 3 tbsp; parsley?; carrot 1?; feta 60 g?',
    steps: [
      ['Faites cuire les lentilles, égouttez et laissez tiédir.', 'Cook the lentils, drain and cool.', 20],
      ['Préparez une vinaigrette moutarde-vinaigre-huile.', 'Make a mustard-vinegar-oil dressing.'],
      ['Mélangez avec l’échalote, la carotte, le persil (et la feta).', 'Toss with shallot, carrot, parsley (and feta).'],
    ],
  }),
  // ---------- Desserts ----------
  r({
    id: 'banana_bread', fr: 'Banana bread', en: 'Banana bread', icon: '🍌', course: 'dessert', time: 60, tools: ['oven'], serv: 6,
    ing: 'banana 3; flour 200 g; egg 2; sugar 80 g; butter 80 g; baking_powder 1 tsp; nuts 50 g?; chocolate 50 g?',
    steps: [
      ['Préchauffez le four à 180 °C.', 'Preheat the oven to 180 °C.'],
      ['Écrasez les bananes bien mûres, mélangez avec œufs, sucre et beurre fondu.', 'Mash the ripe bananas, mix with eggs, sugar and melted butter.'],
      ['Ajoutez farine et levure (et noix ou chocolat), versez dans un moule à cake.', 'Add flour and baking powder (and nuts or chocolate), pour into a loaf tin.'],
      ['Enfournez.', 'Bake.', 45],
    ],
  }),
  r({
    id: 'apple_crumble', fr: 'Crumble aux pommes', en: 'Apple crumble', icon: '🍎', course: 'dessert', time: 45, tools: ['oven'], serv: 4,
    ing: 'apple 4; flour 100 g; butter 70 g; sugar 80 g; cinnamon 1 pinch?; oats 30 g?',
    steps: [
      ['Préchauffez le four à 180 °C. Coupez les pommes en dés dans un plat.', 'Preheat the oven to 180 °C. Dice the apples into a dish.'],
      ['Sablez du bout des doigts farine, sucre et beurre froid (et avoine).', 'Rub flour, sugar and cold butter (and oats) into crumbs.'],
      ['Couvrez les fruits de crumble et enfournez.', 'Cover the fruit with crumble and bake.', 30],
    ],
  }),
  r({
    id: 'yogurt_cake', fr: 'Gâteau au yaourt', en: 'Yogurt cake', icon: '🍰', course: 'dessert', time: 45, tools: ['oven'], serv: 6,
    ing: 'yogurt 1; egg 3; flour 250 g; sugar 150 g; oil 80 ml; baking_powder 1 tsp; lemon 1?; vanilla?',
    steps: [
      ['Préchauffez le four à 180 °C.', 'Preheat the oven to 180 °C.'],
      ['Mélangez yaourt, œufs, sucre puis farine, levure et huile (le pot de yaourt sert de mesure !).', 'Mix yogurt, eggs, sugar, then flour, baking powder and oil (use the yogurt pot to measure!).'],
      ['Versez dans un moule beurré et enfournez.', 'Pour into a greased tin and bake.', 35],
    ],
  }),
  r({
    id: 'chocolate_mousse', fr: 'Mousse au chocolat', en: 'Chocolate mousse', icon: '🍫', course: 'dessert', time: 20, tools: [], serv: 4, diff: 2,
    ing: 'chocolate 200 g; egg 6; sugar 1 tbsp?; salt 1 pinch',
    steps: [
      ['Faites fondre le chocolat doucement.', 'Gently melt the chocolate.'],
      ['Séparez les blancs des jaunes. Mélangez les jaunes au chocolat tiédi.', 'Separate the eggs. Stir the yolks into the cooled chocolate.'],
      ['Montez les blancs en neige ferme avec le sel (et le sucre), incorporez délicatement.', 'Whisk the whites to stiff peaks with salt (and sugar), fold in gently.'],
      ['Réservez au frais au moins 2 heures.', 'Chill for at least 2 hours.', 120],
    ],
  }),
  r({
    id: 'rice_pudding', fr: 'Riz au lait', en: 'Rice pudding', icon: '🍚', course: 'dessert', time: 45, tools: [], serv: 4,
    ing: 'rice 100 g; milk 1000 ml; sugar 80 g; vanilla?; cinnamon 1 pinch?',
    steps: [
      ['Portez le lait à ébullition avec la vanille.', 'Bring the milk to the boil with the vanilla.'],
      ['Ajoutez le riz et laissez cuire à feu très doux en remuant souvent.', 'Add the rice and cook very gently, stirring often.', 35],
      ['Ajoutez le sucre en fin de cuisson.', 'Stir in the sugar at the end.'],
    ],
  }),
  r({
    id: 'banana_pancakes', fr: 'Pancakes à la banane', en: 'Banana pancakes', icon: '🥞', course: 'dessert', time: 15, tools: [],
    ing: 'banana 1; egg 2; flour 60 g?; oats 40 g?; baking_powder 1 pinch?; oil 1 tsp',
    steps: [
      ['Écrasez la banane, ajoutez les œufs (et farine ou avoine, levure).', 'Mash the banana, add the eggs (and flour or oats, baking powder).'],
      ['Faites cuire de petites louches dans une poêle huilée, 1 à 2 minutes par face.', 'Cook small ladlefuls in an oiled pan, 1–2 minutes per side.', 6],
    ],
  }),
  r({
    id: 'baked_apples', fr: 'Pommes au four', en: 'Baked apples', icon: '🍎', course: 'dessert', time: 35, tools: ['oven'],
    ing: 'apple 2; butter 20 g; sugar 2 tbsp; cinnamon 1 pinch?; honey 1 tbsp?; nuts 20 g?',
    steps: [
      ['Préchauffez le four à 180 °C. Évidez les pommes.', 'Preheat the oven to 180 °C. Core the apples.'],
      ['Garnissez de beurre, sucre, cannelle (et noix), arrosez de miel.', 'Fill with butter, sugar, cinnamon (and nuts), drizzle with honey.'],
      ['Enfournez jusqu’à ce qu’elles soient fondantes.', 'Bake until soft.', 25],
    ],
  }),
  r({
    id: 'fruit_salad', fr: 'Salade de fruits', en: 'Fruit salad', icon: '🍓', course: 'dessert', time: 10, tools: [], serv: 3,
    ing: 'apple 1?; banana 1?; orange 1?; pear 1?; strawberry 150 g?; lemon 1; sugar 1 tbsp?',
    steps: [
      ['Coupez tous les fruits disponibles en morceaux.', 'Chop whatever fruit you have.'],
      ['Arrosez de jus de citron (et d’un peu de sucre), mélangez et servez frais.', 'Drizzle with lemon juice (and a little sugar), toss and serve chilled.'],
    ],
  }),

  // ---------- Lot 2 : recettes du quotidien, peu d'ingrédients obligatoires ----------
  // Œufs
  r({
    id: 'scrambled_eggs', fr: 'Œufs brouillés crémeux', en: 'Creamy scrambled eggs', icon: '🍳', course: 'main', time: 10, tools: [],
    ing: 'egg 4; butter 15 g; cream 1 tbsp?; chives 1 tbsp?; bread 2 slice?; salt; pepper',
    steps: [
      ['Battez les œufs avec sel et poivre.', 'Beat the eggs with salt and pepper.'],
      ['Faites fondre le beurre à feu doux, versez les œufs et remuez sans arrêt.', 'Melt the butter over low heat, add the eggs and stir constantly.', 4],
      ['Hors du feu, ajoutez la crème et la ciboulette. Servez sur du pain grillé.', 'Off the heat, stir in the cream and chives. Serve on toast.'],
    ],
  }),
  r({
    id: 'eggs_cocotte', fr: 'Œufs cocotte à la crème', en: 'Baked eggs with cream', icon: '🥚', course: 'starter', time: 15, tools: ['oven'],
    ing: 'egg 4; cream 4 tbsp; ham 1 slice?; emmental 30 g?; chives 1 tbsp?; butter 10 g; salt; pepper',
    steps: [
      ['Préchauffez le four à 180 °C et beurrez 4 ramequins.', 'Preheat the oven to 180 °C and butter 4 ramekins.'],
      ['Mettez un peu de jambon et de crème au fond, cassez un œuf dans chaque ramequin.', 'Put a little ham and cream in each, then crack in an egg.'],
      ['Ajoutez fromage, sel, poivre et faites cuire au bain-marie au four.', 'Top with cheese, season and bake in a water bath.', 10],
    ],
  }),
  r({
    id: 'tortilla_espanola', fr: 'Tortilla espagnole', en: 'Spanish omelette', icon: '🥔', course: 'main', time: 35, tools: [], serv: 3,
    ing: 'egg 5; potato 400 g; onion 1; oil 4 tbsp; salt',
    steps: [
      ['Coupez pommes de terre et oignon en fines tranches.', 'Thinly slice the potatoes and onion.'],
      ['Faites-les cuire doucement dans l’huile jusqu’à ce qu’ils soient tendres.', 'Cook them gently in the oil until tender.', 15],
      ['Mélangez-les aux œufs battus salés, remettez dans la poêle à feu doux.', 'Mix with the salted beaten eggs and return to the pan over low heat.', 8],
      ['Retournez à l’aide d’une assiette et faites cuire l’autre face.', 'Flip using a plate and cook the other side.', 3],
    ],
  }),
  r({
    id: 'egg_custard', fr: 'Œufs au lait', en: 'Baked egg custard', icon: '🍮', course: 'dessert', time: 50, tools: ['oven'], serv: 4,
    ing: 'milk 500 ml; egg 4; sugar 80 g; vanilla?',
    steps: [
      ['Préchauffez le four à 160 °C. Faites chauffer le lait (avec la vanille).', 'Preheat the oven to 160 °C. Heat the milk (with the vanilla).'],
      ['Fouettez œufs et sucre, versez le lait chaud dessus en remuant.', 'Whisk eggs and sugar, pour in the hot milk while stirring.'],
      ['Répartissez dans des ramequins et faites cuire au bain-marie.', 'Pour into ramekins and bake in a water bath.', 40],
      ['Laissez refroidir puis mettez au frais.', 'Cool, then chill.'],
    ],
  }),

  // Pâtes
  r({
    id: 'ham_cheese_pasta', fr: 'Coquillettes jambon-fromage', en: 'Ham & cheese pasta', icon: '🧀', course: 'main', time: 15, tools: [],
    ing: 'pasta 200 g; ham 2 slice; emmental 60 g; butter 15 g; cream 2 tbsp?; salt; pepper',
    steps: [
      ['Faites cuire les pâtes dans l’eau salée.', 'Cook the pasta in salted water.', 9],
      ['Égouttez, remettez dans la casserole avec le beurre (et la crème).', 'Drain and return to the pan with the butter (and cream).'],
      ['Ajoutez le jambon en dés et le fromage, mélangez jusqu’à ce qu’il fonde.', 'Add the diced ham and cheese, stir until melted.'],
    ],
  }),
  r({
    id: 'pesto_pasta', fr: 'Pâtes au pesto', en: 'Pesto pasta', icon: '🌿', course: 'main', time: 15, tools: [],
    ing: 'pasta 200 g; pesto 3 tbsp; parmesan 30 g?; tomato 1?; basil 1 tbsp?; salt',
    steps: [
      ['Faites cuire les pâtes dans l’eau salée.', 'Cook the pasta in salted water.', 10],
      ['Égouttez en gardant un peu d’eau de cuisson.', 'Drain, keeping a little pasta water.'],
      ['Mélangez avec le pesto, un peu d’eau de cuisson, les tomates en dés et le parmesan.', 'Toss with the pesto, a splash of pasta water, diced tomato and parmesan.'],
    ],
  }),
  r({
    id: 'tomato_pasta', fr: 'Pâtes sauce tomate maison', en: 'Pasta with homemade tomato sauce', icon: '🍅', course: 'main', time: 25, tools: [],
    ing: 'pasta 200 g; canned_tomato 400 g; garlic 2 clove; onion 1?; herbs 1 tsp?; basil 1 tbsp?; parmesan 30 g?; oil 2 tbsp; sugar 1 pinch; salt',
    steps: [
      ['Faites revenir l’ail (et l’oignon) dans l’huile.', 'Sauté the garlic (and onion) in the oil.', 3],
      ['Ajoutez tomates, herbes, sucre et sel, laissez réduire.', 'Add tomatoes, herbs, sugar and salt, simmer to reduce.', 15],
      ['Pendant ce temps, faites cuire les pâtes.', 'Meanwhile, cook the pasta.', 10],
      ['Mélangez, servez avec basilic et parmesan.', 'Toss together, serve with basil and parmesan.'],
    ],
  }),
  r({
    id: 'zucchini_pasta', fr: 'Pâtes à la courgette et au citron', en: 'Zucchini lemon pasta', icon: '🥒', course: 'main', time: 20, tools: [],
    ing: 'pasta 200 g; zucchini 1; garlic 1 clove; lemon 1?; goat_cheese 60 g?; parmesan 30 g?; oil 2 tbsp; salt; pepper',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Râpez ou coupez la courgette en dés, faites-la revenir avec l’ail dans l’huile.', 'Grate or dice the zucchini, sauté with the garlic in the oil.', 6],
      ['Mélangez avec les pâtes, le zeste et le jus de citron, le fromage émietté.', 'Toss with the pasta, lemon zest and juice, and the crumbled cheese.'],
    ],
  }),
  r({
    id: 'salmon_pasta', fr: 'Pâtes au saumon et à la crème', en: 'Creamy salmon pasta', icon: '🐟', course: 'main', time: 20, tools: [],
    ing: 'pasta 200 g; salmon 150 g; cream 150 ml; lemon 1?; chives 1 tbsp?; salt; pepper',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites chauffer la crème, ajoutez le saumon en morceaux et laissez cuire doucement.', 'Warm the cream, add the salmon in pieces and cook gently.', 5],
      ['Ajoutez un filet de citron et la ciboulette, mélangez aux pâtes.', 'Add a squeeze of lemon and the chives, toss with the pasta.'],
    ],
  }),
  r({
    id: 'broccoli_pasta', fr: 'Pâtes au brocoli et parmesan', en: 'Broccoli parmesan pasta', icon: '🥦', course: 'main', time: 20, tools: [],
    ing: 'pasta 200 g; broccoli 1; garlic 2 clove; parmesan 40 g?; chili 1 pinch?; oil 3 tbsp; salt',
    steps: [
      ['Faites cuire pâtes et fleurettes de brocoli dans la même eau salée.', 'Cook the pasta and broccoli florets in the same salted water.', 10],
      ['Faites dorer l’ail (et le piment) dans l’huile.', 'Gently fry the garlic (and chili) in the oil.', 2],
      ['Égouttez, mélangez avec l’huile à l’ail et le parmesan en écrasant un peu le brocoli.', 'Drain, toss with the garlic oil and parmesan, lightly crushing the broccoli.'],
    ],
  }),
  r({
    id: 'spinach_pasta', fr: 'Pâtes épinards et fromage frais', en: 'Spinach & cream cheese pasta', icon: '🥬', course: 'main', time: 20, tools: [],
    ing: 'pasta 200 g; spinach 150 g; cream_cheese 100 g; garlic 1 clove; parmesan 30 g?; nutmeg 1 pinch?; salt; pepper',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites tomber les épinards avec l’ail dans une poêle.', 'Wilt the spinach with the garlic in a pan.', 3],
      ['Ajoutez le fromage frais, un peu d’eau de cuisson, puis les pâtes. Assaisonnez.', 'Add the cream cheese, a splash of pasta water, then the pasta. Season.'],
    ],
  }),
  r({
    id: 'pasta_salad', fr: 'Salade de pâtes', en: 'Pasta salad', icon: '🥗', course: 'main', time: 20, tools: [],
    ing: 'pasta 200 g; tomato 2; mozzarella 125 g?; ham 2 slice?; olives 10?; pesto 2 tbsp?; basil 1 tbsp?; vinegar 1 tbsp; oil 3 tbsp; salt',
    steps: [
      ['Faites cuire les pâtes, rincez-les à l’eau froide.', 'Cook the pasta, rinse under cold water.', 10],
      ['Coupez tomates, mozzarella et jambon en dés.', 'Dice the tomatoes, mozzarella and ham.'],
      ['Mélangez le tout avec l’huile, le vinaigre (ou le pesto) et le basilic.', 'Toss everything with the oil, vinegar (or pesto) and basil.'],
    ],
  }),

  // Riz, céréales, féculents
  r({
    id: 'tuna_rice_salad', fr: 'Salade de riz au thon', en: 'Tuna rice salad', icon: '🍚', course: 'main', time: 20, tools: [],
    ing: 'rice 200 g; tuna 1 can; tomato 2; corn 150 g?; egg 2?; olives 10?; vinegar 1 tbsp; oil 3 tbsp; salt',
    steps: [
      ['Faites cuire le riz (et les œufs 10 min pour les durcir), laissez refroidir.', 'Cook the rice (and hard-boil the eggs for 10 min), let cool.', 12],
      ['Coupez les tomates et les œufs.', 'Chop the tomatoes and eggs.'],
      ['Mélangez riz, thon, légumes, huile et vinaigre.', 'Mix rice, tuna, vegetables, oil and vinegar.'],
    ],
  }),
  r({
    id: 'chorizo_rice', fr: 'Riz au chorizo et poivron', en: 'Chorizo & pepper rice', icon: '🥘', course: 'main', time: 30, tools: [], serv: 3,
    ing: 'rice 200 g; chorizo 100 g; bell_pepper 1; onion 1; canned_tomato 200 g?; paprika 1 tsp?; stock 1?; water 500 ml; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon, poivron et chorizo en dés.', 'Sauté onion, pepper and diced chorizo.', 5],
      ['Ajoutez le riz, remuez 1 minute, puis tomates, paprika, bouillon et eau.', 'Add the rice, stir for 1 minute, then tomatoes, paprika, stock and water.'],
      ['Couvrez et laissez cuire jusqu’à absorption.', 'Cover and cook until absorbed.', 18],
    ],
  }),
  r({
    id: 'tabbouleh', fr: 'Taboulé', en: 'Tabbouleh', icon: '🥗', course: 'starter', time: 20, tools: [], serv: 4,
    ing: 'couscous 150 g; tomato 2; cucumber 1; lemon 1; parsley 1 bunch?; onion 1?; oil 4 tbsp; water 150 ml; salt',
    steps: [
      ['Versez l’eau bouillante salée sur la semoule, couvrez 5 minutes puis égrainez.', 'Pour boiling salted water over the couscous, cover 5 minutes, then fluff.', 5],
      ['Coupez tomates, concombre (et oignon) en petits dés, hachez le persil.', 'Finely dice tomatoes, cucumber (and onion), chop the parsley.'],
      ['Mélangez avec le jus de citron et l’huile, laissez reposer au frais.', 'Mix with the lemon juice and oil, chill before serving.'],
    ],
  }),
  r({
    id: 'sauteed_potatoes', fr: 'Pommes de terre sautées', en: 'Pan-fried potatoes', icon: '🥔', course: 'main', time: 30, tools: [],
    ing: 'potato 600 g; garlic 2 clove?; onion 1?; parsley 1 tbsp?; bacon 100 g?; oil 3 tbsp; salt',
    steps: [
      ['Coupez les pommes de terre en dés.', 'Dice the potatoes.'],
      ['Faites-les dorer dans l’huile à feu moyen en remuant souvent.', 'Brown them in the oil over medium heat, stirring often.', 20],
      ['Ajoutez oignon, lardons et ail en fin de cuisson, parsemez de persil.', 'Add onion, bacon and garlic towards the end, sprinkle with parsley.', 5],
    ],
  }),
  r({
    id: 'sausage_potatoes', fr: 'Poêlée saucisses et pommes de terre', en: 'Sausage & potato skillet', icon: '🌭', course: 'main', time: 35, tools: [],
    ing: 'sausage 4; potato 500 g; onion 1; bell_pepper 1?; herbs 1 tsp?; oil 2 tbsp; salt',
    steps: [
      ['Faites précuire les pommes de terre en dés 8 minutes dans l’eau salée.', 'Parboil the diced potatoes in salted water for 8 minutes.', 8],
      ['Faites dorer les saucisses dans l’huile, retirez-les et coupez-les.', 'Brown the sausages in the oil, remove and slice them.', 8],
      ['Faites rissoler pommes de terre, oignon et poivron, remettez les saucisses.', 'Fry the potatoes, onion and pepper, return the sausages.', 12],
    ],
  }),
  r({
    id: 'noodle_soup', fr: 'Soupe de nouilles', en: 'Noodle soup', icon: '🍜', course: 'main', time: 20, tools: [],
    ing: 'noodles 150 g; stock 1; water 800 ml; soy_sauce 2 tbsp; egg 2?; carrot 1?; mushroom 100 g?; chicken 150 g?; ginger 1 tsp?',
    steps: [
      ['Portez l’eau à ébullition avec le bouillon, la sauce soja et le gingembre.', 'Bring the water to a boil with the stock, soy sauce and ginger.'],
      ['Ajoutez les légumes et le poulet en fines lamelles.', 'Add the vegetables and thinly sliced chicken.', 6],
      ['Ajoutez les nouilles (et les œufs mollets à part).', 'Add the noodles (and soft-boiled eggs cooked separately).', 4],
    ],
  }),

  // Viandes & poissons
  r({
    id: 'chicken_lemon_honey', fr: 'Poulet au miel et citron', en: 'Honey lemon chicken', icon: '🍗', course: 'main', time: 25, tools: [],
    ing: 'chicken 300 g; honey 2 tbsp; lemon 1; garlic 1 clove; soy_sauce 1 tbsp?; rice 200 g?; oil 1 tbsp',
    steps: [
      ['Faites dorer le poulet en morceaux dans l’huile.', 'Brown the chicken pieces in the oil.', 8],
      ['Ajoutez ail, miel, jus de citron (et soja), laissez caraméliser.', 'Add garlic, honey, lemon juice (and soy), let it caramelise.', 5],
      ['Servez avec du riz.', 'Serve with rice.'],
    ],
  }),
  r({
    id: 'chicken_tomato_rice', fr: 'Riz au poulet et à la tomate', en: 'Chicken & tomato rice', icon: '🍛', course: 'main', time: 30, tools: [], serv: 3,
    ing: 'chicken 300 g; rice 200 g; tomato 3; onion 1; garlic 1 clove?; paprika 1 tsp?; herbs 1 tsp?; stock 1?; water 500 ml; oil 1 tbsp; salt',
    steps: [
      ['Faites dorer le poulet en dés et l’oignon dans l’huile.', 'Brown the diced chicken and onion in the oil.', 6],
      ['Ajoutez les tomates en morceaux, l’ail et les épices, puis le riz.', 'Add the chopped tomatoes, garlic and spices, then the rice.'],
      ['Versez l’eau (et le bouillon), couvrez et laissez cuire jusqu’à absorption.', 'Pour in the water (and stock), cover and cook until absorbed.', 18],
    ],
  }),
  r({
    id: 'chicken_basquaise', fr: 'Poulet basquaise', en: 'Basque-style chicken', icon: '🫑', course: 'main', time: 40, tools: [], serv: 3,
    ing: 'chicken 400 g; bell_pepper 2; canned_tomato 400 g; onion 1; garlic 2 clove; paprika 1 tsp?; chili 1 pinch?; rice 200 g?; oil 2 tbsp',
    steps: [
      ['Faites dorer le poulet dans l’huile, réservez.', 'Brown the chicken in the oil, set aside.', 6],
      ['Faites revenir oignon, poivrons et ail.', 'Sauté onion, peppers and garlic.', 6],
      ['Ajoutez tomates, épices et poulet, laissez mijoter à couvert.', 'Add tomatoes, spices and chicken, simmer covered.', 25],
    ],
  }),
  r({
    id: 'chicken_wrap', fr: 'Wraps poulet-crudités', en: 'Chicken salad wraps', icon: '🌯', course: 'main', time: 20, tools: [],
    ing: 'tortilla 4; chicken 250 g; salad 1?; tomato 1?; yogurt 3 tbsp?; emmental 40 g?; paprika 1 tsp?; oil 1 tbsp',
    steps: [
      ['Faites cuire le poulet en lamelles avec le paprika.', 'Cook the sliced chicken with the paprika.', 8],
      ['Garnissez les tortillas de salade, tomate, poulet, fromage et yaourt.', 'Fill the tortillas with lettuce, tomato, chicken, cheese and yogurt.'],
      ['Roulez bien serré et coupez en deux.', 'Roll tightly and cut in half.'],
    ],
  }),
  r({
    id: 'turkey_cream', fr: 'Escalopes de dinde à la crème', en: 'Turkey in cream sauce', icon: '🍗', course: 'main', time: 25, tools: [],
    ing: 'turkey 300 g; cream 150 ml; mushroom 200 g?; shallot 1?; mustard 1 tsp?; rice 200 g?; butter 15 g',
    steps: [
      ['Faites dorer les escalopes au beurre, réservez.', 'Brown the escalopes in butter, set aside.', 6],
      ['Faites revenir échalote et champignons dans la même poêle.', 'Sauté shallot and mushrooms in the same pan.', 5],
      ['Ajoutez crème et moutarde, remettez la dinde et laissez mijoter.', 'Add cream and mustard, return the turkey and simmer.', 6],
    ],
  }),
  r({
    id: 'meatballs_tomato', fr: 'Boulettes sauce tomate', en: 'Meatballs in tomato sauce', icon: '🍝', course: 'main', time: 40, tools: [], serv: 3,
    ing: 'ground_beef 400 g; canned_tomato 400 g; onion 1; garlic 2 clove; egg 1?; bread 1 slice?; herbs 1 tsp?; pasta 250 g?; oil 2 tbsp; salt; pepper',
    steps: [
      ['Mélangez viande, œuf, pain émietté, sel et poivre, formez des boulettes.', 'Mix beef, egg, crumbled bread, salt and pepper, shape into balls.'],
      ['Faites-les dorer dans l’huile, réservez.', 'Brown them in the oil, set aside.', 8],
      ['Faites revenir oignon et ail, ajoutez tomates et herbes, puis les boulettes.', 'Sauté onion and garlic, add tomatoes and herbs, then the meatballs.'],
      ['Laissez mijoter, servez avec des pâtes.', 'Simmer and serve with pasta.', 20],
    ],
  }),
  r({
    id: 'stuffed_tomatoes', fr: 'Tomates farcies', en: 'Stuffed tomatoes', icon: '🍅', course: 'main', time: 50, tools: ['oven'], serv: 4,
    ing: 'tomato 6; ground_beef 350 g; onion 1; garlic 1 clove; bread 1 slice?; herbs 1 tsp?; parsley 1 tbsp?; rice 150 g?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Préchauffez le four à 180 °C. Coupez le chapeau des tomates et videz-les.', 'Preheat the oven to 180 °C. Cut the tops off the tomatoes and hollow them.'],
      ['Mélangez viande, oignon, ail, pain et herbes. Farcissez les tomates.', 'Mix beef, onion, garlic, bread and herbs. Stuff the tomatoes.'],
      ['Enfournez avec le riz cru et un peu d’eau au fond du plat.', 'Bake with the raw rice and a little water in the dish.', 40],
    ],
  }),
  r({
    id: 'beef_stirfry', fr: 'Bœuf sauté aux oignons', en: 'Beef & onion stir-fry', icon: '🥩', course: 'main', time: 20, tools: [],
    ing: 'beef 300 g; onion 2; soy_sauce 3 tbsp; garlic 1 clove; bell_pepper 1?; ginger 1 tsp?; sesame 1 tbsp?; rice 200 g?; oil 2 tbsp',
    steps: [
      ['Coupez le bœuf en fines lamelles, les oignons en quartiers.', 'Slice the beef thinly and the onions into wedges.'],
      ['Saisissez le bœuf à feu très vif, réservez.', 'Sear the beef over very high heat, set aside.', 2],
      ['Faites sauter oignons, ail, poivron, remettez le bœuf avec le soja.', 'Stir-fry onions, garlic and pepper, return the beef with the soy sauce.', 5],
    ],
  }),
  r({
    id: 'honey_soy_pork', fr: 'Porc caramélisé miel-soja', en: 'Honey soy pork', icon: '🍖', course: 'main', time: 25, tools: [],
    ing: 'pork 400 g; honey 2 tbsp; soy_sauce 3 tbsp; garlic 2 clove; sesame 1 tbsp?; rice 200 g?; oil 1 tbsp',
    steps: [
      ['Coupez le porc en morceaux et faites-le dorer dans l’huile.', 'Cut the pork into pieces and brown in the oil.', 8],
      ['Ajoutez ail, miel et soja, laissez caraméliser en remuant.', 'Add garlic, honey and soy, stir until caramelised.', 5],
      ['Parsemez de sésame, servez avec du riz.', 'Sprinkle with sesame, serve with rice.'],
    ],
  }),
  r({
    id: 'garlic_shrimp', fr: 'Crevettes à l’ail', en: 'Garlic butter shrimp', icon: '🦐', course: 'main', time: 15, tools: [],
    ing: 'shrimp 300 g; garlic 3 clove; butter 30 g; lemon 1?; parsley 1 tbsp?; chili 1 pinch?; rice 200 g?',
    steps: [
      ['Faites fondre le beurre, ajoutez l’ail haché (et le piment).', 'Melt the butter, add the chopped garlic (and chili).', 1],
      ['Ajoutez les crevettes et faites-les sauter jusqu’à ce qu’elles soient roses.', 'Add the shrimp and cook until pink.', 4],
      ['Finissez avec citron et persil.', 'Finish with lemon and parsley.'],
    ],
  }),
  r({
    id: 'fish_curry', fr: 'Curry de poisson au lait de coco', en: 'Coconut fish curry', icon: '🐟', course: 'main', time: 30, tools: [], serv: 3,
    ing: 'white_fish 400 g; coconut_milk 400 ml; curry 1 tbsp; onion 1; tomato 1?; ginger 1 tsp?; coriander 1 tbsp?; rice 200 g?; oil 1 tbsp',
    steps: [
      ['Faites revenir l’oignon avec le curry (et le gingembre).', 'Sauté the onion with the curry powder (and ginger).', 4],
      ['Ajoutez le lait de coco et la tomate, laissez frémir.', 'Add the coconut milk and tomato, simmer.', 8],
      ['Ajoutez le poisson en cubes et laissez cuire doucement.', 'Add the fish in chunks and cook gently.', 8],
      ['Servez avec riz et coriandre.', 'Serve with rice and coriander.'],
    ],
  }),

  // Légumes
  r({
    id: 'roasted_veg', fr: 'Légumes rôtis au four', en: 'Oven-roasted vegetables', icon: '🥕', course: 'main', time: 40, tools: ['oven'],
    ing: 'potato 2?; carrot 2?; zucchini 1?; bell_pepper 1?; sweet_potato 1?; onion 1?; eggplant 1?; herbs 1 tsp?; oil 3 tbsp; salt',
    steps: [
      ['Préchauffez le four à 200 °C. Coupez les légumes en morceaux de même taille.', 'Preheat the oven to 200 °C. Cut the vegetables into even pieces.'],
      ['Mélangez avec l’huile, le sel et les herbes sur une plaque.', 'Toss with oil, salt and herbs on a tray.'],
      ['Enfournez en remuant à mi-cuisson.', 'Roast, stirring halfway through.', 30],
    ],
  }),
  r({
    id: 'veg_curry', fr: 'Curry de légumes', en: 'Vegetable curry', icon: '🍛', course: 'main', time: 35, tools: [], serv: 3,
    ing: 'coconut_milk 400 ml; curry 1 tbsp; onion 1; potato 2?; carrot 2?; cauliflower 1?; peas 100 g?; chickpeas 400 g?; rice 200 g?; oil 1 tbsp',
    steps: [
      ['Faites revenir l’oignon avec le curry.', 'Sauté the onion with the curry powder.', 3],
      ['Ajoutez les légumes en morceaux et le lait de coco.', 'Add the chopped vegetables and the coconut milk.'],
      ['Laissez mijoter à couvert jusqu’à ce que les légumes soient tendres.', 'Simmer covered until the vegetables are tender.', 25],
    ],
  }),
  r({
    id: 'zucchini_gratin', fr: 'Gratin de courgettes', en: 'Zucchini gratin', icon: '🥒', course: 'main', time: 45, tools: ['oven'], serv: 3,
    ing: 'zucchini 3; egg 2; cream 100 ml; emmental 60 g; garlic 1 clove?; salt; pepper',
    steps: [
      ['Préchauffez le four à 180 °C. Coupez les courgettes en rondelles et faites-les revenir.', 'Preheat the oven to 180 °C. Slice and sauté the zucchini.', 8],
      ['Disposez-les dans un plat, versez œufs et crème battus, parsemez de fromage.', 'Place in a dish, pour over the beaten eggs and cream, top with cheese.'],
      ['Enfournez jusqu’à ce que ce soit doré.', 'Bake until golden.', 30],
    ],
  }),
  r({
    id: 'cauliflower_gratin', fr: 'Gratin de chou-fleur', en: 'Cauliflower cheese', icon: '🥦', course: 'main', time: 45, tools: ['oven'], serv: 4,
    ing: 'cauliflower 1; milk 400 ml; butter 30 g; flour 30 g; emmental 80 g; nutmeg 1 pinch?; salt',
    steps: [
      ['Faites cuire les fleurettes de chou-fleur dans l’eau salée.', 'Boil the cauliflower florets in salted water.', 8],
      ['Faites une béchamel : beurre fondu + farine, puis le lait en fouettant jusqu’à épaississement.', 'Make a white sauce: melted butter + flour, then whisk in the milk until thick.', 6],
      ['Nappez le chou-fleur, parsemez de fromage et gratinez à 200 °C.', 'Cover the cauliflower, top with cheese and bake at 200 °C.', 20],
    ],
  }),
  r({
    id: 'leek_potato_soup', fr: 'Soupe poireaux-pommes de terre', en: 'Leek & potato soup', icon: '🥣', course: 'starter', time: 35, tools: ['blender'], serv: 4,
    ing: 'leek 2; potato 400 g; stock 1; water 1000 ml; butter 15 g?; cream 2 tbsp?; salt',
    steps: [
      ['Émincez les poireaux et faites-les fondre (au beurre).', 'Slice the leeks and soften them (in butter).', 5],
      ['Ajoutez les pommes de terre en dés, l’eau et le bouillon.', 'Add the diced potatoes, water and stock.'],
      ['Laissez cuire puis mixez, ajoutez la crème.', 'Simmer, then blend and stir in the cream.', 25],
    ],
  }),
  r({
    id: 'carrot_soup', fr: 'Velouté de carottes au cumin', en: 'Carrot & cumin soup', icon: '🥕', course: 'starter', time: 35, tools: ['blender'], serv: 4,
    ing: 'carrot 600 g; onion 1; stock 1; water 800 ml; cumin 1 tsp?; cream 2 tbsp?; oil 1 tbsp; salt',
    steps: [
      ['Faites revenir l’oignon dans l’huile avec le cumin.', 'Sauté the onion in the oil with the cumin.', 3],
      ['Ajoutez les carottes en rondelles, l’eau et le bouillon.', 'Add the sliced carrots, water and stock.'],
      ['Laissez cuire puis mixez, servez avec un peu de crème.', 'Simmer, then blend and serve with a little cream.', 25],
    ],
  }),
  r({
    id: 'leek_tart', fr: 'Tarte aux poireaux', en: 'Leek tart', icon: '🥧', course: 'main', time: 50, tools: ['oven'], serv: 4,
    ing: 'puff_pastry 1; leek 3; egg 3; cream 200 ml; emmental 50 g?; bacon 100 g?; butter 15 g; nutmeg 1 pinch?; salt',
    steps: [
      ['Préchauffez le four à 180 °C. Faites fondre les poireaux émincés au beurre.', 'Preheat the oven to 180 °C. Soften the sliced leeks in butter.', 10],
      ['Étalez la pâte dans un moule, garnissez de poireaux (et lardons).', 'Line a tin with the pastry, fill with leeks (and bacon).'],
      ['Versez œufs et crème battus, parsemez de fromage, enfournez.', 'Pour over the beaten eggs and cream, top with cheese, bake.', 35],
    ],
  }),
  r({
    id: 'tomato_mustard_tart', fr: 'Tarte fine tomate-moutarde', en: 'Tomato mustard tart', icon: '🍅', course: 'main', time: 40, tools: ['oven'], serv: 4,
    ing: 'puff_pastry 1; tomato 4; mustard 2 tbsp; emmental 50 g?; herbs 1 tsp?; oil 1 tbsp',
    steps: [
      ['Préchauffez le four à 200 °C. Étalez la pâte et tartinez-la de moutarde.', 'Preheat the oven to 200 °C. Roll out the pastry and spread with mustard.'],
      ['Disposez les tomates en rondelles, (le fromage), les herbes et un filet d’huile.', 'Arrange sliced tomatoes, (cheese), herbs and a drizzle of oil.'],
      ['Enfournez jusqu’à ce que la pâte soit dorée.', 'Bake until the pastry is golden.', 30],
    ],
  }),

  // Tartines & entrées
  r({
    id: 'avocado_toast', fr: 'Tartine avocat-œuf', en: 'Avocado egg toast', icon: '🥑', course: 'starter', time: 10, tools: [],
    ing: 'bread 2 slice; avocado 1; egg 2?; lemon 1?; chili 1 pinch?; salt',
    steps: [
      ['Faites griller le pain (et cuire les œufs au plat ou mollets).', 'Toast the bread (and fry or soft-boil the eggs).', 5],
      ['Écrasez l’avocat avec citron et sel.', 'Mash the avocado with lemon and salt.'],
      ['Tartinez, posez l’œuf, parsemez de piment.', 'Spread on the toast, top with the egg and a pinch of chili.'],
    ],
  }),
  r({
    id: 'mushroom_toast', fr: 'Tartines champignons à la crème', en: 'Creamy mushroom toast', icon: '🍄', course: 'main', time: 15, tools: [],
    ing: 'bread 4 slice; mushroom 250 g; cream 3 tbsp; garlic 1 clove; parsley 1 tbsp?; butter 10 g; salt',
    steps: [
      ['Faites revenir les champignons émincés au beurre avec l’ail.', 'Sauté the sliced mushrooms in butter with the garlic.', 6],
      ['Ajoutez la crème et laissez épaissir.', 'Add the cream and let it thicken.', 2],
      ['Versez sur le pain grillé, parsemez de persil.', 'Spoon onto toasted bread, sprinkle with parsley.'],
    ],
  }),
  r({
    id: 'pizza_toast', fr: 'Tartines façon pizza', en: 'Pizza toasts', icon: '🍕', course: 'main', time: 15, tools: ['oven'],
    ing: 'bread 4 slice; canned_tomato 4 tbsp; mozzarella 125 g; ham 2 slice?; olives 6?; herbs 1 tsp?',
    steps: [
      ['Préchauffez le four en position gril.', 'Preheat the grill.'],
      ['Tartinez le pain de tomate, garnissez de jambon, mozzarella, olives et herbes.', 'Spread the bread with tomato, top with ham, mozzarella, olives and herbs.'],
      ['Faites gratiner.', 'Grill until bubbling.', 6],
    ],
  }),
  r({
    id: 'sardine_spread', fr: 'Rillettes de sardines', en: 'Sardine spread', icon: '🐟', course: 'starter', time: 10, tools: [],
    ing: 'sardines 1 can; cream_cheese 100 g; lemon 1?; chives 1 tbsp?; bread 4 slice?; pepper',
    steps: [
      ['Égouttez les sardines et retirez l’arête centrale.', 'Drain the sardines and remove the backbone.'],
      ['Écrasez-les avec le fromage frais, le citron, la ciboulette et le poivre.', 'Mash with the cream cheese, lemon, chives and pepper.'],
      ['Servez frais sur du pain grillé.', 'Serve chilled on toast.'],
    ],
  }),
  r({
    id: 'greek_salad', fr: 'Salade grecque', en: 'Greek salad', icon: '🥗', course: 'starter', time: 10, tools: [],
    ing: 'tomato 3; cucumber 1; feta 100 g; olives 10?; onion 1?; herbs 1 tsp?; oil 3 tbsp; salt',
    steps: [
      ['Coupez tomates, concombre et oignon en morceaux.', 'Chop the tomatoes, cucumber and onion.'],
      ['Ajoutez olives et feta en cubes.', 'Add the olives and cubed feta.'],
      ['Arrosez d’huile, parsemez d’herbes.', 'Drizzle with oil and sprinkle with herbs.'],
    ],
  }),
  r({
    id: 'coleslaw', fr: 'Coleslaw', en: 'Coleslaw', icon: '🥬', course: 'starter', time: 15, tools: [], serv: 4,
    ing: 'cabbage 300 g; carrot 2; yogurt 3 tbsp; mustard 1 tsp; vinegar 1 tbsp; sugar 1 tsp; salt',
    steps: [
      ['Émincez finement le chou et râpez les carottes.', 'Finely shred the cabbage and grate the carrots.'],
      ['Mélangez yaourt, moutarde, vinaigre, sucre et sel.', 'Mix yogurt, mustard, vinegar, sugar and salt.'],
      ['Mélangez le tout et laissez reposer au frais.', 'Toss together and chill.'],
    ],
  }),
  r({
    id: 'beet_salad', fr: 'Salade de betterave', en: 'Beetroot salad', icon: '🫜', course: 'starter', time: 10, tools: [],
    ing: 'beetroot 2; vinegar 1 tbsp; goat_cheese 60 g?; nuts 20 g?; shallot 1?; oil 2 tbsp; salt',
    steps: [
      ['Coupez la betterave cuite en dés.', 'Dice the cooked beetroot.'],
      ['Assaisonnez d’huile, de vinaigre et d’échalote hachée.', 'Dress with oil, vinegar and chopped shallot.'],
      ['Parsemez de chèvre émietté et de noix.', 'Top with crumbled goat cheese and walnuts.'],
    ],
  }),

  // Desserts
  r({
    id: 'pancakes', fr: 'Pancakes moelleux', en: 'Fluffy pancakes', icon: '🥞', course: 'dessert', time: 25, tools: [], serv: 3,
    ing: 'flour 200 g; egg 2; milk 250 ml; sugar 2 tbsp; butter 20 g; baking_powder 1 tsp?; salt 1 pinch',
    steps: [
      ['Mélangez farine, sucre, levure et sel.', 'Mix flour, sugar, baking powder and salt.'],
      ['Ajoutez œufs, lait et beurre fondu, fouettez juste assez pour une pâte épaisse.', 'Add eggs, milk and melted butter, whisk just until a thick batter forms.'],
      ['Faites cuire des petites louches dans une poêle chaude, retournez quand des bulles apparaissent.', 'Cook small ladlefuls in a hot pan, flip when bubbles appear.', 10],
    ],
  }),
  r({
    id: 'chocolate_cake', fr: 'Gâteau au chocolat', en: 'Chocolate cake', icon: '🍫', course: 'dessert', time: 40, tools: ['oven'], serv: 6,
    ing: 'chocolate 200 g; butter 150 g; egg 4; sugar 150 g; flour 50 g',
    steps: [
      ['Préchauffez le four à 180 °C. Faites fondre chocolat et beurre.', 'Preheat the oven to 180 °C. Melt the chocolate and butter.'],
      ['Fouettez œufs et sucre, ajoutez le chocolat fondu puis la farine.', 'Whisk eggs and sugar, add the melted chocolate then the flour.'],
      ['Versez dans un moule beurré et enfournez.', 'Pour into a buttered tin and bake.', 25],
    ],
  }),
  r({
    id: 'cookies', fr: 'Cookies aux pépites de chocolat', en: 'Chocolate chip cookies', icon: '🍪', course: 'dessert', time: 25, tools: ['oven'], serv: 6,
    ing: 'flour 200 g; butter 100 g; sugar 100 g; egg 1; chocolate 100 g; baking_powder 1 tsp?; salt 1 pinch',
    steps: [
      ['Préchauffez le four à 180 °C. Mélangez beurre mou et sucre, puis l’œuf.', 'Preheat the oven to 180 °C. Cream the soft butter and sugar, then add the egg.'],
      ['Ajoutez farine, levure, sel et chocolat haché.', 'Add flour, baking powder, salt and chopped chocolate.'],
      ['Formez des boules sur une plaque et enfournez.', 'Shape into balls on a tray and bake.', 11],
    ],
  }),
  r({
    id: 'apple_tart', fr: 'Tarte fine aux pommes', en: 'Thin apple tart', icon: '🥧', course: 'dessert', time: 40, tools: ['oven'], serv: 4,
    ing: 'puff_pastry 1; apple 3; sugar 2 tbsp; butter 20 g?; cinnamon 1 pinch?',
    steps: [
      ['Préchauffez le four à 200 °C. Étalez la pâte sur une plaque.', 'Preheat the oven to 200 °C. Roll the pastry onto a tray.'],
      ['Disposez les pommes en fines lamelles, saupoudrez de sucre (et cannelle), parsemez de beurre.', 'Arrange thin apple slices, sprinkle with sugar (and cinnamon), dot with butter.'],
      ['Enfournez jusqu’à ce que ce soit doré.', 'Bake until golden.', 25],
    ],
  }),
  r({
    id: 'yogurt_honey', fr: 'Yaourt miel et noix', en: 'Yogurt with honey & nuts', icon: '🍯', course: 'dessert', time: 5, tools: [],
    ing: 'yogurt 2; honey 2 tbsp; nuts 30 g?; red_fruits 80 g?; banana 1?',
    steps: [
      ['Versez le yaourt dans des bols.', 'Spoon the yogurt into bowls.'],
      ['Arrosez de miel, ajoutez noix et fruits.', 'Drizzle with honey, add nuts and fruit.'],
    ],
  }),
  r({
    id: 'porridge', fr: 'Porridge', en: 'Porridge', icon: '🥣', course: 'dessert', time: 10, tools: [],
    ing: 'oats 80 g; milk 300 ml; banana 1?; honey 1 tbsp?; cinnamon 1 pinch?; red_fruits 50 g?',
    steps: [
      ['Faites chauffer flocons et lait en remuant jusqu’à ce que ce soit crémeux.', 'Heat the oats and milk, stirring, until creamy.', 5],
      ['Servez avec banane, fruits, miel ou cannelle.', 'Serve topped with banana, fruit, honey or cinnamon.'],
    ],
  }),
  r({
    id: 'poached_pears', fr: 'Poires pochées', en: 'Poached pears', icon: '🍐', course: 'dessert', time: 30, tools: [],
    ing: 'pear 4; sugar 100 g; water 700 ml; vanilla?; cinnamon 1 pinch?; chocolate 60 g?',
    steps: [
      ['Faites chauffer eau, sucre (et vanille, cannelle).', 'Heat the water with the sugar (and vanilla, cinnamon).'],
      ['Épluchez les poires et pochez-les dans le sirop frémissant.', 'Peel the pears and poach them in the simmering syrup.', 20],
      ['Servez tièdes, nappées de chocolat fondu.', 'Serve warm with melted chocolate.'],
    ],
  }),
  r({
    id: 'strawberries_cream', fr: 'Fraises à la crème', en: 'Strawberries and cream', icon: '🍓', course: 'dessert', time: 10, tools: [],
    ing: 'strawberry 250 g; cream 150 ml; sugar 2 tbsp; vanilla?',
    steps: [
      ['Lavez et coupez les fraises, sucrez-les légèrement.', 'Wash and halve the strawberries, sweeten lightly.'],
      ['Fouettez la crème bien froide avec le reste du sucre (et la vanille).', 'Whip the well-chilled cream with the rest of the sugar (and vanilla).'],
      ['Servez les fraises avec la crème.', 'Serve the strawberries with the cream.'],
    ],
  }),
  // ---------- V1.6, lot A : les légumes qu'on jette le plus souvent ----------
  r({
    id: 'zucchini_fritters', fr: 'Galettes de courgette', en: 'Zucchini fritters', icon: '🥒', course: 'main', time: 25, tools: [],
    ing: 'zucchini 2; egg 2; flour 4 tbsp; emmental 50 g?; garlic 1 clove?; herbs 1 tsp?; oil 3 tbsp; salt; pepper',
    steps: [
      ['Râpez les courgettes, salez-les et laissez-les rendre leur eau 10 minutes, puis pressez-les dans un torchon.', 'Grate the zucchini, salt it and let it drain for 10 minutes, then squeeze it in a tea towel.', 10],
      ['Mélangez avec les œufs, la farine, le fromage, l’ail et les herbes.', 'Mix with the eggs, flour, cheese, garlic and herbs.'],
      ['Faites cuire des petits tas de pâte dans l’huile chaude, 3 minutes par face.', 'Fry small spoonfuls of batter in hot oil, 3 minutes per side.', 6],
      ['Égouttez sur du papier absorbant et servez avec une salade.', 'Drain on kitchen paper and serve with a salad.'],
    ],
  }),
  r({
    id: 'stuffed_zucchini', fr: 'Courgettes farcies', en: 'Stuffed zucchini', icon: '🥒', course: 'main', time: 50, tools: ['oven'], diff: 2,
    ing: 'zucchini 2; ground_beef 250 g; onion 1; garlic 1 clove; herbs 1 tsp; bread 1 slice?; egg 1?; emmental 40 g?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Préchauffez le four à 200 °C. Coupez les courgettes en deux dans la longueur et videz-les à la cuillère.', 'Preheat the oven to 200 °C (400 °F). Halve the zucchini lengthways and scoop out the flesh.'],
      ['Hachez la chair et faites-la revenir 8 minutes avec l’oignon, l’ail et la viande.', 'Chop the flesh and fry it for 8 minutes with the onion, garlic and meat.', 8],
      ['Hors du feu, ajoutez le pain émietté, l’œuf et les herbes. Garnissez les courgettes.', 'Off the heat, add the crumbled bread, egg and herbs. Fill the zucchini.'],
      ['Parsemez de fromage et enfournez 30 minutes.', 'Top with cheese and bake for 30 minutes.', 30],
    ],
  }),
  r({
    id: 'zucchini_soup', fr: 'Velouté de courgettes', en: 'Creamy zucchini soup', icon: '🥣', course: 'starter', time: 25, tools: ['blender'], serv: 3,
    ing: 'zucchini 3; onion 1; stock 1; water 600 ml; cream_cheese 2 tbsp?; garlic 1 clove?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Faites revenir l’oignon émincé dans l’huile.', 'Soften the sliced onion in the oil.', 3],
      ['Ajoutez les courgettes en rondelles, l’ail, l’eau et le bouillon. Laissez cuire 15 minutes.', 'Add the sliced zucchini, garlic, water and stock. Simmer for 15 minutes.', 15],
      ['Mixez avec le fromage frais, salez et poivrez.', 'Blend with the cream cheese, season with salt and pepper.'],
    ],
  }),
  r({
    id: 'eggplant_caviar', fr: 'Caviar d’aubergine', en: 'Smoky eggplant dip', icon: '🍆', course: 'starter', time: 45, tools: ['oven'],
    ing: 'eggplant 2; garlic 1 clove; oil 3 tbsp; lemon 1?; cumin 1 pinch?; parsley 1 tbsp?; salt; pepper',
    steps: [
      ['Préchauffez le four à 200 °C. Piquez les aubergines et enfournez-les entières 40 minutes.', 'Preheat the oven to 200 °C (400 °F). Prick the eggplants and roast them whole for 40 minutes.', 40],
      ['Coupez-les en deux et récupérez la chair à la cuillère.', 'Halve them and scoop out the flesh.'],
      ['Écrasez à la fourchette avec l’ail, l’huile, le citron et le cumin. Salez, poivrez.', 'Mash with a fork with the garlic, oil, lemon and cumin. Season.'],
      ['Servez frais avec du pain grillé.', 'Serve cold with toast.'],
    ],
  }),
  r({
    id: 'eggplant_parmigiana', fr: 'Aubergines à la parmesane', en: 'Eggplant parmigiana', icon: '🍆', course: 'main', time: 60, tools: ['oven'], diff: 2,
    ing: 'eggplant 2; canned_tomato 400 g; mozzarella 125 g; parmesan 40 g; garlic 1 clove; basil?; oil 4 tbsp; salt; pepper',
    steps: [
      ['Coupez les aubergines en tranches et faites-les dorer à la poêle dans l’huile.', 'Slice the eggplants and brown them in the oil.', 10],
      ['Faites mijoter les tomates avec l’ail 10 minutes, salez.', 'Simmer the tomatoes with the garlic for 10 minutes, season.', 10],
      ['Préchauffez le four à 200 °C. Alternez aubergines, sauce, mozzarella et parmesan dans un plat.', 'Preheat the oven to 200 °C (400 °F). Layer eggplant, sauce, mozzarella and parmesan in a dish.'],
      ['Enfournez 30 minutes, ajoutez le basilic en sortant du four.', 'Bake for 30 minutes, add the basil when it comes out.', 30],
    ],
  }),
  r({
    id: 'eggplant_pasta', fr: 'Pâtes aux aubergines', en: 'Eggplant pasta', icon: '🍝', course: 'main', time: 25, tools: [],
    ing: 'pasta 200 g; eggplant 1; canned_tomato 200 g; garlic 1 clove; oil 3 tbsp; basil?; parmesan 30 g?; salt; pepper',
    steps: [
      ['Coupez l’aubergine en dés et faites-la dorer dans l’huile.', 'Dice the eggplant and brown it in the oil.', 8],
      ['Ajoutez l’ail et les tomates, laissez mijoter.', 'Add the garlic and tomatoes, simmer.', 10],
      ['Pendant ce temps, faites cuire les pâtes.', 'Meanwhile, cook the pasta.', 10],
      ['Mélangez, servez avec le parmesan et le basilic.', 'Toss together and serve with parmesan and basil.'],
    ],
  }),
  r({
    id: 'leek_fondue', fr: 'Fondue de poireaux à la crème', en: 'Creamy braised leeks', icon: '🥬', course: 'main', time: 30, tools: [],
    ing: 'leek 3; butter 20 g; water 100 ml; cream 100 ml; egg 2?; nutmeg 1 pinch?; salt; pepper',
    steps: [
      ['Émincez les poireaux et lavez-les bien.', 'Slice the leeks and wash them well.'],
      ['Faites-les fondre à couvert dans le beurre avec l’eau, à feu doux.', 'Cook them gently in the butter and water, covered.', 20],
      ['Ajoutez la crème, salez, poivrez, ajoutez la muscade.', 'Stir in the cream, season, add the nutmeg.'],
      ['Servez tel quel, avec un œuf au plat ou du riz.', 'Serve as is, with a fried egg or some rice.'],
    ],
  }),
  r({
    id: 'leek_risotto', fr: 'Risotto aux poireaux', en: 'Leek risotto', icon: '🍚', course: 'main', time: 35, tools: [], diff: 2,
    ing: 'rice 160 g; leek 2; stock 1; water 800 ml; parmesan 40 g; butter 20 g; onion 1?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Faites chauffer l’eau avec le bouillon.', 'Heat the water with the stock.'],
      ['Faites revenir les poireaux émincés (et l’oignon) dans l’huile.', 'Soften the sliced leeks (and onion) in the oil.', 5],
      ['Ajoutez le riz, remuez 2 minutes, puis versez le bouillon louche par louche en remuant.', 'Add the rice, stir for 2 minutes, then add the stock a ladle at a time, stirring.', 18],
      ['Hors du feu, ajoutez le beurre et le parmesan.', 'Off the heat, stir in the butter and parmesan.'],
    ],
  }),
  r({
    id: 'leeks_vinaigrette', fr: 'Poireaux vinaigrette', en: 'Leeks vinaigrette', icon: '🥬', course: 'starter', time: 25, tools: [],
    ing: 'leek 3; mustard 1 tsp; vinegar 1 tbsp; oil 3 tbsp; egg 1?; shallot 1?; parsley 1 tbsp?; salt; pepper',
    steps: [
      ['Coupez les poireaux en tronçons et faites-les cuire dans l’eau salée (avec l’œuf, pour qu’il soit dur).', 'Cut the leeks into pieces and cook them in salted water (with the egg, to hard-boil it).', 15],
      ['Égouttez-les bien.', 'Drain them well.'],
      ['Mélangez la moutarde, le vinaigre, l’huile et l’échalote hachée.', 'Mix the mustard, vinegar, oil and chopped shallot.'],
      ['Nappez les poireaux tièdes, ajoutez l’œuf haché et le persil.', 'Pour over the warm leeks, top with the chopped egg and parsley.'],
    ],
  }),
  r({
    id: 'spinach_eggs', fr: 'Œufs aux épinards', en: 'Eggs nested in spinach', icon: '🥬', course: 'main', time: 15, tools: [],
    ing: 'spinach 200 g; egg 4; butter 10 g; garlic 1 clove?; cream 2 tbsp?; nutmeg 1 pinch?; salt; pepper',
    steps: [
      ['Faites tomber les épinards dans le beurre avec l’ail.', 'Wilt the spinach in the butter with the garlic.', 3],
      ['Ajoutez la crème, salez, poivrez, ajoutez la muscade.', 'Add the cream, salt, pepper and nutmeg.'],
      ['Creusez 4 nids, cassez-y les œufs, couvrez et laissez cuire.', 'Make 4 wells, crack in the eggs, cover and cook.', 5],
    ],
  }),
  r({
    id: 'spinach_gratin', fr: 'Gratin d’épinards', en: 'Spinach gratin', icon: '🥬', course: 'main', time: 35, tools: ['oven'],
    ing: 'spinach 400 g; cream 150 ml; egg 2; emmental 60 g; butter 10 g; garlic 1 clove?; nutmeg 1 pinch?; salt; pepper',
    steps: [
      ['Préchauffez le four à 200 °C. Faites tomber les épinards dans le beurre et égouttez-les bien.', 'Preheat the oven to 200 °C (400 °F). Wilt the spinach in the butter and drain well.', 4],
      ['Battez les œufs avec la crème, l’ail, la muscade, le sel et le poivre.', 'Beat the eggs with the cream, garlic, nutmeg, salt and pepper.'],
      ['Mélangez avec les épinards dans un plat et couvrez de fromage.', 'Mix with the spinach in a dish and cover with cheese.'],
      ['Enfournez 20 minutes.', 'Bake for 20 minutes.', 20],
    ],
  }),
  r({
    id: 'spinach_rice', fr: 'Riz aux épinards et à la feta', en: 'Spinach and feta rice', icon: '🍚', course: 'main', time: 25, tools: [],
    ing: 'rice 160 g; spinach 200 g; feta 100 g; onion 1; oil 2 tbsp; lemon 1?; garlic 1 clove?; salt; pepper',
    steps: [
      ['Faites cuire le riz.', 'Cook the rice.', 12],
      ['Faites revenir l’oignon dans l’huile, ajoutez l’ail et les épinards jusqu’à ce qu’ils tombent.', 'Soften the onion in the oil, add the garlic and spinach until wilted.', 5],
      ['Mélangez avec le riz, émiettez la feta et arrosez de citron.', 'Mix with the rice, crumble over the feta and add a squeeze of lemon.'],
    ],
  }),
  r({
    id: 'lettuce_soup', fr: 'Velouté de salade', en: 'Lettuce soup', icon: '🥣', course: 'starter', time: 25, tools: ['blender'], serv: 3,
    ing: 'salad 1; potato 2; onion 1; stock 1; water 700 ml; butter 10 g; cream 2 tbsp?; salt; pepper',
    steps: [
      ['Faites fondre l’oignon dans le beurre.', 'Soften the onion in the butter.', 3],
      ['Ajoutez les pommes de terre en dés, l’eau et le bouillon.', 'Add the diced potatoes, water and stock.', 15],
      ['Ajoutez la salade, même un peu flétrie.', 'Add the lettuce, even if it is a little wilted.', 3],
      ['Mixez avec la crème, salez et poivrez.', 'Blend with the cream, season.'],
    ],
  }),
  r({
    id: 'peas_french_style', fr: 'Petits pois à la française', en: 'French-style peas', icon: '🫛', course: 'main', time: 25, tools: [],
    ing: 'peas 400 g; salad 1; onion 1; butter 20 g; sugar 1 tsp; water 100 ml; bacon 100 g?; carrot 1?; salt; pepper',
    steps: [
      ['Faites fondre l’oignon émincé (et les lardons) dans le beurre.', 'Soften the sliced onion (and bacon) in the butter.', 4],
      ['Ajoutez les petits pois, la carotte en rondelles, la salade émincée (le cœur suffit), le sucre et l’eau.', 'Add the peas, sliced carrot, shredded lettuce (the heart is enough), sugar and water.'],
      ['Couvrez et laissez mijoter.', 'Cover and simmer.', 15],
    ],
  }),
  r({
    id: 'egg_crouton_salad', fr: 'Salade aux œufs et croûtons', en: 'Egg and crouton salad', icon: '🥗', course: 'starter', time: 20, tools: [],
    ing: 'salad 1; egg 2; bread 2 slice; mustard 1 tsp; vinegar 1 tbsp; oil 3 tbsp; bacon 80 g?; salt; pepper',
    steps: [
      ['Faites cuire les œufs dans l’eau bouillante, puis refroidissez-les.', 'Boil the eggs, then cool them.', 9],
      ['Coupez le pain en dés et faites-les dorer à la poêle avec un filet d’huile (et les lardons).', 'Dice the bread and fry it with a little oil (and the bacon).', 4],
      ['Préparez la vinaigrette : moutarde, vinaigre, huile.', 'Make the dressing: mustard, vinegar, oil.'],
      ['Mélangez la salade, les croûtons et les œufs coupés en quatre.', 'Toss the lettuce, croutons and quartered eggs.'],
    ],
  }),
  r({
    id: 'honey_glazed_carrots', fr: 'Carottes glacées au miel', en: 'Honey-glazed carrots', icon: '🥕', course: 'main', time: 20, tools: [],
    ing: 'carrot 500 g; honey 1 tbsp; butter 20 g; water 150 ml; cumin 1 pinch?; parsley 1 tbsp?; salt',
    steps: [
      ['Coupez les carottes en rondelles.', 'Slice the carrots.'],
      ['Mettez-les dans une poêle avec le beurre, le miel, l’eau et le sel.', 'Put them in a pan with the butter, honey, water and salt.'],
      ['Laissez cuire à couvert 10 minutes, puis à découvert jusqu’à ce que l’eau s’évapore et qu’elles brillent.', 'Cook covered for 10 minutes, then uncovered until the water has gone and they are glossy.', 15],
    ],
  }),
  r({
    id: 'panzanella', fr: 'Salade de pain et tomates (panzanella)', en: 'Bread and tomato salad (panzanella)', icon: '🥗', course: 'starter', time: 20, tools: [],
    ing: 'bread 150 g; tomato 3; vinegar 1 tbsp; oil 4 tbsp; cucumber 1?; onion 1?; basil?; salt; pepper',
    steps: [
      ['Coupez le pain rassis en cubes.', 'Cut the stale bread into cubes.'],
      ['Coupez les tomates, le concombre et l’oignon, salez et laissez-les rendre leur jus.', 'Chop the tomatoes, cucumber and onion, salt them and let the juices run.', 10],
      ['Mélangez avec le pain, l’huile et le vinaigre, laissez reposer.', 'Toss with the bread, oil and vinegar, leave to soak.', 5],
      ['Ajoutez le basilic au moment de servir.', 'Add the basil just before serving.'],
    ],
  }),
  r({
    id: 'stuffed_peppers', fr: 'Poivrons farcis au riz', en: 'Rice-stuffed peppers', icon: '🫑', course: 'main', time: 55, tools: ['oven'], diff: 2,
    ing: 'bell_pepper 2; rice 100 g; canned_tomato 200 g; onion 1; herbs 1 tsp; oil 1 tbsp; ground_beef 200 g?; emmental 40 g?; salt; pepper',
    steps: [
      ['Préchauffez le four à 190 °C. Faites cuire le riz.', 'Preheat the oven to 190 °C (375 °F). Cook the rice.', 10],
      ['Faites revenir l’oignon (et la viande) dans l’huile, ajoutez la moitié des tomates et les herbes.', 'Fry the onion (and meat) in the oil, add half the tomatoes and the herbs.', 8],
      ['Coupez le chapeau des poivrons, videz-les et garnissez-les du riz mélangé à la sauce.', 'Cut the tops off the peppers, seed them and fill with the rice mixed with the sauce.'],
      ['Versez le reste des tomates au fond du plat, parsemez de fromage et enfournez.', 'Pour the rest of the tomatoes into the dish, top with cheese and bake.', 35],
    ],
  }),
  r({
    id: 'mushrooms_parsley', fr: 'Champignons en persillade', en: 'Garlic and parsley mushrooms', icon: '🍄', course: 'main', time: 15, tools: [],
    ing: 'mushroom 400 g; garlic 2 clove; parsley 2 tbsp; butter 20 g; oil 1 tbsp; salt; pepper',
    steps: [
      ['Nettoyez et coupez les champignons.', 'Clean and slice the mushrooms.'],
      ['Faites-les sauter à feu vif dans l’huile jusqu’à ce que leur eau s’évapore.', 'Fry them over high heat in the oil until their water has evaporated.', 8],
      ['Ajoutez le beurre, l’ail et le persil hachés, laissez 2 minutes.', 'Add the butter, chopped garlic and parsley, cook for 2 minutes.', 2],
    ],
  }),
  r({
    id: 'roasted_broccoli', fr: 'Brocoli rôti', en: 'Roasted broccoli', icon: '🥦', course: 'main', time: 25, tools: ['oven'],
    ing: 'broccoli 1; oil 3 tbsp; garlic 1 clove?; parmesan 30 g?; lemon 1?; salt; pepper',
    steps: [
      ['Préchauffez le four à 220 °C.', 'Preheat the oven to 220 °C (425 °F).'],
      ['Coupez le brocoli en bouquets, mélangez avec l’huile, l’ail, le sel et le poivre.', 'Cut the broccoli into florets, toss with the oil, garlic, salt and pepper.'],
      ['Étalez sur une plaque et enfournez.', 'Spread on a tray and roast.', 20],
      ['Parsemez de parmesan et arrosez de citron.', 'Sprinkle with parmesan and squeeze over the lemon.'],
    ],
  }),
  r({
    id: 'roasted_cauliflower', fr: 'Chou-fleur rôti aux épices', en: 'Spiced roasted cauliflower', icon: '🥦', course: 'main', time: 35, tools: ['oven'],
    ing: 'cauliflower 1; cumin 1 tsp; oil 3 tbsp; paprika 1 tsp?; curry 1 tsp?; yogurt 100 g?; salt',
    steps: [
      ['Préchauffez le four à 220 °C.', 'Preheat the oven to 220 °C (425 °F).'],
      ['Détaillez le chou-fleur en bouquets, mélangez avec l’huile, les épices et le sel.', 'Cut the cauliflower into florets, toss with the oil, spices and salt.'],
      ['Enfournez en remuant à mi-cuisson.', 'Roast, stirring halfway through.', 30],
      ['Servez avec le yaourt légèrement salé.', 'Serve with the lightly salted yogurt.'],
    ],
  }),
  r({
    id: 'cabbage_bacon', fr: 'Chou poêlé aux lardons', en: 'Pan-fried cabbage with bacon', icon: '🥬', course: 'main', time: 30, tools: [],
    ing: 'cabbage 500 g; bacon 150 g; onion 1; butter 10 g; water 100 ml; cumin 1 pinch?; salt; pepper',
    steps: [
      ['Émincez finement le chou.', 'Finely shred the cabbage.'],
      ['Faites dorer les lardons et l’oignon.', 'Brown the bacon and onion.', 5],
      ['Ajoutez le chou, le beurre et l’eau, couvrez et laissez cuire en remuant de temps en temps.', 'Add the cabbage, butter and water, cover and cook, stirring now and then.', 20],
    ],
  }),
  r({
    id: 'green_beans_tomato', fr: 'Haricots verts à la tomate', en: 'Green beans with tomato', icon: '🫛', course: 'main', time: 25, tools: [],
    ing: 'green_beans 400 g; tomato 2; onion 1; garlic 1 clove; oil 2 tbsp; herbs 1 tsp?; salt; pepper',
    steps: [
      ['Faites cuire les haricots dans l’eau salée.', 'Cook the beans in salted water.', 8],
      ['Faites revenir l’oignon et l’ail, ajoutez les tomates en dés.', 'Fry the onion and garlic, add the diced tomatoes.', 5],
      ['Ajoutez les haricots et les herbes, mélangez quelques minutes.', 'Add the beans and herbs, stir for a few minutes.', 3],
    ],
  }),
  r({
    id: 'rostis', fr: 'Röstis de pommes de terre', en: 'Potato rosti', icon: '🥔', course: 'main', time: 30, tools: [],
    ing: 'potato 4; oil 3 tbsp; onion 1?; egg 1?; emmental 40 g?; salt; pepper',
    steps: [
      ['Râpez les pommes de terre et pressez-les dans un torchon pour enlever l’eau.', 'Grate the potatoes and squeeze them in a tea towel to remove the water.'],
      ['Mélangez avec l’oignon râpé, l’œuf, le fromage, le sel et le poivre.', 'Mix with the grated onion, egg, cheese, salt and pepper.'],
      ['Faites cuire des galettes dans l’huile chaude, 5 minutes par face.', 'Fry flat cakes in hot oil, 5 minutes per side.', 10],
    ],
  }),
  r({
    id: 'tomato_eggs', fr: 'Œufs brouillés à la tomate', en: 'Tomato and egg stir-fry', icon: '🍅', course: 'main', time: 15, tools: [],
    ing: 'egg 4; tomato 3; sugar 1 tsp; oil 2 tbsp; onion 1?; soy_sauce 1 tbsp?; chives 1 tbsp?; salt',
    steps: [
      ['Battez les œufs avec une pincée de sel, brouillez-les à peine dans l’huile et réservez.', 'Beat the eggs with a pinch of salt, barely scramble them in the oil and set aside.', 2],
      ['Faites fondre les tomates en quartiers avec l’oignon et le sucre.', 'Cook the tomato wedges with the onion and sugar until soft.', 5],
      ['Remettez les œufs, mélangez 1 minute, ajoutez la sauce soja et la ciboulette. Servez avec du riz.', 'Return the eggs, stir for 1 minute, add the soy sauce and chives. Serve with rice.'],
    ],
  }),
  // ---------- V1.6, lot B : placard, petit budget, végétarien ----------
  r({
    id: 'lentil_soup', fr: 'Soupe de lentilles corail', en: 'Red lentil soup', icon: '🥣', course: 'starter', time: 30, tools: ['blender'], serv: 3,
    ing: 'lentils 150 g; carrot 1; onion 1; cumin 1 tsp; stock 1; water 800 ml; oil 1 tbsp; canned_tomato 200 g?; coconut_milk 100 ml?; salt',
    steps: [
      ['Faites revenir l’oignon et la carotte dans l’huile.', 'Soften the onion and carrot in the oil.', 4],
      ['Ajoutez les lentilles rincées, le cumin, les tomates, l’eau et le bouillon.', 'Add the rinsed lentils, cumin, tomatoes, water and stock.', 20],
      ['Mixez (avec le lait de coco) et salez.', 'Blend (with the coconut milk) and season.'],
    ],
  }),
  r({
    id: 'chickpea_salad', fr: 'Salade de pois chiches', en: 'Chickpea salad', icon: '🥗', course: 'starter', time: 10, tools: [],
    ing: 'chickpeas 1 can; tomato 2; lemon 1; oil 3 tbsp; cucumber 1?; onion 1?; feta 80 g?; parsley 1 tbsp?; cumin 1 pinch?; salt; pepper',
    steps: [
      ['Rincez et égouttez les pois chiches.', 'Rinse and drain the chickpeas.'],
      ['Coupez les tomates, le concombre et l’oignon en petits dés.', 'Dice the tomatoes, cucumber and onion.'],
      ['Mélangez avec le citron, l’huile, le cumin, la feta et le persil.', 'Toss with the lemon juice, oil, cumin, feta and parsley.'],
    ],
  }),
  r({
    id: 'rice_beans', fr: 'Riz aux haricots rouges', en: 'Rice and beans', icon: '🍚', course: 'main', time: 30, tools: [],
    ing: 'rice 160 g; kidney_beans 1 can; onion 1; garlic 1 clove; water 350 ml; oil 1 tbsp; cumin 1 tsp?; paprika 1 tsp?; coconut_milk 200 ml?; stock 1?; salt',
    steps: [
      ['Faites revenir l’oignon et l’ail dans l’huile.', 'Fry the onion and garlic in the oil.', 3],
      ['Ajoutez le riz, les épices, les haricots égouttés, l’eau (ou en partie le lait de coco) et le bouillon.', 'Add the rice, spices, drained beans, water (or part coconut milk) and stock.'],
      ['Couvrez et laissez cuire à feu doux.', 'Cover and cook over low heat.', 15],
      ['Laissez reposer 5 minutes à couvert avant de servir.', 'Leave to rest, covered, for 5 minutes before serving.', 5],
    ],
  }),
  r({
    id: 'peanut_noodles', fr: 'Nouilles sauce cacahuète', en: 'Peanut noodles', icon: '🍜', course: 'main', time: 15, tools: [],
    ing: 'noodles 200 g; peanut_butter 3 tbsp; soy_sauce 2 tbsp; water 4 tbsp; lemon 1?; honey 1 tsp?; garlic 1 clove?; carrot 1?; cucumber 1?; chili 1 pinch?',
    steps: [
      ['Faites cuire les nouilles.', 'Cook the noodles.', 5],
      ['Mélangez le beurre de cacahuète, la sauce soja, le miel, le citron, l’ail et l’eau chaude jusqu’à obtenir une sauce lisse.', 'Whisk the peanut butter, soy sauce, honey, lemon, garlic and hot water into a smooth sauce.'],
      ['Mélangez avec les nouilles égouttées, ajoutez la carotte et le concombre en bâtonnets.', 'Toss with the drained noodles, add the carrot and cucumber cut into sticks.'],
    ],
  }),
  r({
    id: 'cacio_e_pepe', fr: 'Pâtes cacio e pepe', en: 'Cacio e pepe', icon: '🍝', course: 'main', time: 15, tools: [],
    ing: 'pasta 200 g; parmesan 60 g; pepper 1 tsp; butter 10 g?; salt',
    steps: [
      ['Faites cuire les pâtes dans peu d’eau salée, gardez une tasse d’eau de cuisson.', 'Cook the pasta in a little salted water, keep a cup of the cooking water.', 10],
      ['Faites griller le poivre concassé 1 minute dans une poêle sèche.', 'Toast the crushed pepper in a dry pan for 1 minute.'],
      ['Hors du feu, mélangez les pâtes, le poivre, le beurre et le parmesan en ajoutant l’eau de cuisson petit à petit pour une sauce crémeuse.', 'Off the heat, toss the pasta, pepper, butter and parmesan, adding the cooking water bit by bit for a creamy sauce.'],
    ],
  }),
  r({
    id: 'tuna_patties', fr: 'Galettes de thon', en: 'Tuna cakes', icon: '🐟', course: 'main', time: 30, tools: [],
    ing: 'tuna 1 can; potato 2; egg 1; flour 2 tbsp; oil 3 tbsp; onion 1?; parsley 1 tbsp?; lemon 1?; salt; pepper',
    steps: [
      ['Faites cuire les pommes de terre à l’eau, puis écrasez-les.', 'Boil the potatoes, then mash them.', 15],
      ['Mélangez avec le thon émietté, l’œuf, l’oignon haché, le persil et le citron.', 'Mix with the flaked tuna, egg, chopped onion, parsley and lemon.'],
      ['Formez des galettes, farinez-les et faites-les dorer 3 minutes par face.', 'Shape into cakes, dust with flour and fry for 3 minutes per side.', 6],
    ],
  }),
  r({
    id: 'sardine_pasta', fr: 'Pâtes aux sardines', en: 'Sardine pasta', icon: '🍝', course: 'main', time: 15, tools: [],
    ing: 'pasta 200 g; sardines 1 can; garlic 1 clove; oil 2 tbsp; bread 1 slice?; lemon 1?; parsley 1 tbsp?; chili 1 pinch?; salt',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites dorer le pain émietté dans un peu d’huile, réservez.', 'Fry the breadcrumbs in a little oil, set aside.', 3],
      ['Faites revenir l’ail, ajoutez les sardines égouttées et écrasez-les.', 'Fry the garlic, add the drained sardines and break them up.', 2],
      ['Mélangez avec les pâtes, le citron, le persil et la chapelure dorée.', 'Toss with the pasta, lemon, parsley and toasted crumbs.'],
    ],
  }),
  r({
    id: 'egg_curry', fr: 'Curry d’œufs', en: 'Egg curry', icon: '🍛', course: 'main', time: 25, tools: [],
    ing: 'egg 4; onion 1; canned_tomato 200 g; coconut_milk 200 ml; curry 2 tsp; oil 1 tbsp; garlic 1 clove?; ginger 1 tsp?; rice 160 g?; salt',
    steps: [
      ['Faites cuire les œufs dans l’eau bouillante, puis écalez-les.', 'Hard-boil the eggs, then peel them.', 9],
      ['Faites revenir l’oignon, l’ail, le gingembre et le curry dans l’huile.', 'Fry the onion, garlic, ginger and curry powder in the oil.', 4],
      ['Ajoutez les tomates et le lait de coco, laissez mijoter.', 'Add the tomatoes and coconut milk, simmer.', 10],
      ['Ajoutez les œufs coupés en deux et servez avec du riz.', 'Add the halved eggs and serve with rice.'],
    ],
  }),
  r({
    id: 'baked_potatoes', fr: 'Pommes de terre au four', en: 'Baked potatoes', icon: '🥔', course: 'main', time: 60, tools: ['oven'],
    ing: 'potato 4; cream 100 ml; oil 1 tbsp; chives 1 tbsp?; emmental 40 g?; bacon 80 g?; salt; pepper',
    steps: [
      ['Préchauffez le four à 200 °C. Lavez les pommes de terre, piquez-les et frottez-les d’huile et de sel.', 'Preheat the oven to 200 °C (400 °F). Wash the potatoes, prick them and rub with oil and salt.'],
      ['Enfournez jusqu’à ce qu’elles soient tendres.', 'Bake until tender.', 50],
      ['Ouvrez-les en deux, garnissez de crème, de ciboulette, de fromage ou de lardons dorés.', 'Split them open and top with cream, chives, cheese or fried bacon.'],
    ],
  }),
  r({
    id: 'couscous_chickpeas', fr: 'Semoule aux pois chiches et légumes', en: 'Couscous with chickpeas and vegetables', icon: '🍲', course: 'main', time: 25, tools: [],
    ing: 'couscous 150 g; chickpeas 1 can; carrot 1; onion 1; cumin 1 tsp; stock 1; water 300 ml; oil 2 tbsp; zucchini 1?; raisins 2 tbsp?; salt',
    steps: [
      ['Faites revenir l’oignon, la carotte et la courgette en dés dans l’huile.', 'Fry the onion, carrot and zucchini, diced, in the oil.', 8],
      ['Ajoutez les pois chiches, le cumin, les raisins, 100 ml d’eau et le bouillon.', 'Add the chickpeas, cumin, raisins, 100 ml of water and the stock.', 5],
      ['Versez 200 ml d’eau bouillante sur la semoule avec un filet d’huile, couvrez 5 minutes puis égrenez.', 'Pour 200 ml of boiling water over the couscous with a drizzle of oil, cover for 5 minutes, then fluff up.', 5],
      ['Servez la semoule avec les légumes.', 'Serve the couscous with the vegetables.'],
    ],
  }),
  r({
    id: 'quinoa_salad', fr: 'Salade de quinoa', en: 'Quinoa salad', icon: '🥗', course: 'starter', time: 20, tools: [],
    ing: 'quinoa 120 g; tomato 2; cucumber 1; lemon 1; oil 3 tbsp; feta 80 g?; avocado 1?; parsley 1 tbsp?; salt; pepper',
    steps: [
      ['Rincez le quinoa, faites-le cuire puis laissez-le refroidir.', 'Rinse the quinoa, cook it, then let it cool.', 12],
      ['Coupez les légumes en dés.', 'Dice the vegetables.'],
      ['Mélangez le tout avec le citron et l’huile, salez et poivrez.', 'Toss everything with the lemon and oil, season.'],
    ],
  }),
  r({
    id: 'tomato_rice', fr: 'Riz à la tomate', en: 'Tomato rice', icon: '🍚', course: 'main', time: 25, tools: [],
    ing: 'rice 160 g; canned_tomato 200 g; onion 1; garlic 1 clove; stock 1; water 250 ml; oil 1 tbsp; paprika 1 tsp?; salt',
    steps: [
      ['Faites revenir l’oignon et l’ail dans l’huile.', 'Fry the onion and garlic in the oil.', 3],
      ['Ajoutez le riz, remuez 1 minute, puis les tomates, l’eau, le bouillon et le paprika.', 'Add the rice, stir for 1 minute, then the tomatoes, water, stock and paprika.'],
      ['Couvrez et laissez cuire à feu doux.', 'Cover and cook over low heat.', 15],
    ],
  }),
  r({
    id: 'onion_soup', fr: 'Soupe à l’oignon gratinée', en: 'French onion soup', icon: '🧅', course: 'starter', time: 50, tools: ['oven'], diff: 2,
    ing: 'onion 4; butter 20 g; flour 1 tbsp; stock 1; water 800 ml; bread 4 slice; emmental 80 g; salt; pepper',
    steps: [
      ['Faites fondre les oignons émincés dans le beurre à feu doux, jusqu’à ce qu’ils soient bien dorés.', 'Cook the sliced onions gently in the butter until deep golden.', 20],
      ['Saupoudrez de farine, versez l’eau et le bouillon, laissez cuire.', 'Sprinkle with flour, add the water and stock, simmer.', 15],
      ['Allumez le gril du four. Versez dans des bols allant au four, posez le pain et couvrez de fromage.', 'Heat the oven grill. Pour into ovenproof bowls, add the bread and cover with cheese.'],
      ['Faites gratiner sous le gril.', 'Grill until bubbling.', 5],
    ],
  }),
  r({
    id: 'veggie_toastie', fr: 'Croque aux légumes à la poêle', en: 'Pan-fried veggie toastie', icon: '🥪', course: 'main', time: 15, tools: [],
    ing: 'bread 4 slice; emmental 60 g; tomato 1; butter 15 g; zucchini 1?; mushroom 2?; herbs 1 pinch?',
    steps: [
      ['Coupez la tomate (et la courgette, les champignons) en fines tranches.', 'Thinly slice the tomato (and zucchini, mushrooms).'],
      ['Garnissez deux tranches de pain de légumes, d’herbes et de fromage, refermez.', 'Top two slices of bread with vegetables, herbs and cheese, close.'],
      ['Beurrez l’extérieur et faites dorer à la poêle sous un couvercle, 3 minutes par face.', 'Butter the outside and fry under a lid, 3 minutes per side.', 6],
    ],
  }),
  r({
    id: 'lentil_patties', fr: 'Galettes de lentilles', en: 'Lentil patties', icon: '🫘', course: 'main', time: 35, tools: [],
    ing: 'lentils 150 g; onion 1; egg 1; cumin 1 tsp; flour 2 tbsp; oil 3 tbsp; bread 1 slice?; parsley 1 tbsp?; salt; pepper',
    steps: [
      ['Faites cuire les lentilles et égouttez-les bien (ou utilisez des restes).', 'Cook the lentils and drain them well (or use leftovers).', 20],
      ['Écrasez-les grossièrement avec l’oignon haché, l’œuf, la mie de pain, le cumin et le persil.', 'Roughly mash them with the chopped onion, egg, breadcrumbs, cumin and parsley.'],
      ['Formez des galettes, farinez-les et faites-les dorer 3 minutes par face.', 'Shape into patties, dust with flour and fry for 3 minutes per side.', 6],
    ],
  }),
  r({
    id: 'pasta_lentils', fr: 'Pâtes aux lentilles', en: 'Pasta with lentils', icon: '🍝', course: 'main', time: 35, tools: [],
    ing: 'pasta 160 g; lentils 100 g; onion 1; garlic 1 clove; stock 1; water 700 ml; oil 2 tbsp; carrot 1?; canned_tomato 200 g?; herbs 1 tsp?; parmesan 30 g?; salt',
    steps: [
      ['Faites revenir l’oignon, la carotte et l’ail dans l’huile.', 'Fry the onion, carrot and garlic in the oil.', 4],
      ['Ajoutez les lentilles, les tomates, les herbes, l’eau et le bouillon.', 'Add the lentils, tomatoes, herbs, water and stock.', 15],
      ['Ajoutez des pâtes courtes et laissez cuire en remuant, jusqu’à ce que ce soit crémeux.', 'Add short pasta and cook, stirring, until creamy.', 10],
      ['Servez avec le parmesan.', 'Serve with parmesan.'],
    ],
  }),
  r({
    id: 'tofu_scramble', fr: 'Tofu brouillé', en: 'Tofu scramble', icon: '⬜', course: 'main', time: 15, tools: [],
    ing: 'tofu 200 g; curry 1 tsp; oil 1 tbsp; onion 1?; bell_pepper 1?; spinach 50 g?; soy_sauce 1 tbsp?; salt; pepper',
    steps: [
      ['Faites revenir l’oignon et le poivron dans l’huile.', 'Fry the onion and pepper in the oil.', 4],
      ['Émiettez le tofu à la fourchette dans la poêle, ajoutez le curry et la sauce soja.', 'Crumble the tofu into the pan with a fork, add the curry powder and soy sauce.'],
      ['Faites chauffer en remuant, ajoutez les épinards à la fin.', 'Heat through, stirring, and add the spinach at the end.', 5],
    ],
  }),
  r({
    id: 'ham_cheese_crepes', fr: 'Crêpes jambon-fromage', en: 'Ham and cheese crepes', icon: '🥞', course: 'main', time: 30, tools: [],
    ing: 'flour 125 g; egg 2; milk 250 ml; ham 4 slice; emmental 80 g; butter 20 g; salt',
    steps: [
      ['Fouettez la farine, les œufs, le lait et une pincée de sel jusqu’à obtenir une pâte lisse.', 'Whisk the flour, eggs, milk and a pinch of salt into a smooth batter.'],
      ['Faites cuire de fines crêpes dans une poêle beurrée.', 'Cook thin crepes in a buttered pan.', 15],
      ['Garnissez chaque crêpe de jambon et de fromage, pliez-la et laissez fondre 1 minute.', 'Fill each crepe with ham and cheese, fold and let it melt for 1 minute.'],
    ],
  }),
  r({
    id: 'tortilla_pizza', fr: 'Pizza sur tortilla', en: 'Tortilla pizza', icon: '🍕', course: 'main', time: 15, tools: ['oven'],
    ing: 'tortilla 2; canned_tomato 100 g; mozzarella 125 g; herbs 1 pinch; oil 1 tbsp; ham 2 slice?; mushroom 3?; olives 6?',
    steps: [
      ['Préchauffez le four à 220 °C.', 'Preheat the oven to 220 °C (425 °F).'],
      ['Étalez la sauce tomate sur les tortillas, ajoutez les garnitures, la mozzarella, les herbes et un filet d’huile.', 'Spread the tomato over the tortillas, add the toppings, mozzarella, herbs and a drizzle of oil.'],
      ['Enfournez jusqu’à ce que ce soit doré.', 'Bake until golden.', 8],
    ],
  }),
  r({
    id: 'bean_tacos', fr: 'Tacos aux haricots rouges', en: 'Bean tacos', icon: '🌮', course: 'main', time: 20, tools: [],
    ing: 'tortilla 4; kidney_beans 1 can; onion 1; cumin 1 tsp; oil 1 tbsp; tomato 1?; avocado 1?; paprika 1 tsp?; emmental 40 g?; salad?; salt',
    steps: [
      ['Faites revenir l’oignon, ajoutez les haricots égouttés, les épices et un peu d’eau, écrasez grossièrement.', 'Fry the onion, add the drained beans, spices and a splash of water, roughly mash.', 6],
      ['Faites chauffer les tortillas à sec dans la poêle.', 'Warm the tortillas in a dry pan.', 2],
      ['Garnissez de haricots, de tomate, d’avocat, de salade et de fromage.', 'Fill with the beans, tomato, avocado, lettuce and cheese.'],
    ],
  }),
  r({
    id: 'chickpea_spinach_soup', fr: 'Soupe de pois chiches aux épinards', en: 'Chickpea and spinach soup', icon: '🥣', course: 'starter', time: 25, tools: [], serv: 3,
    ing: 'chickpeas 1 can; spinach 150 g; onion 1; garlic 1 clove; cumin 1 tsp; stock 1; water 700 ml; oil 1 tbsp; canned_tomato 200 g?; lemon 1?; salt',
    steps: [
      ['Faites revenir l’oignon, l’ail et le cumin dans l’huile.', 'Fry the onion, garlic and cumin in the oil.', 3],
      ['Ajoutez les pois chiches, les tomates, l’eau et le bouillon.', 'Add the chickpeas, tomatoes, water and stock.', 15],
      ['Ajoutez les épinards 2 minutes et arrosez de citron.', 'Stir in the spinach for 2 minutes and add a squeeze of lemon.', 2],
    ],
  }),
  r({
    id: 'gnocchi_spinach', fr: 'Gnocchis aux épinards', en: 'Creamy spinach gnocchi', icon: '🥟', course: 'main', time: 15, tools: [],
    ing: 'gnocchi 400 g; spinach 150 g; cream 150 ml; butter 10 g; garlic 1 clove?; parmesan 30 g?; nutmeg 1 pinch?; salt; pepper',
    steps: [
      ['Faites dorer les gnocchis dans le beurre.', 'Brown the gnocchi in the butter.', 5],
      ['Ajoutez l’ail et les épinards, laissez-les tomber.', 'Add the garlic and spinach and let it wilt.', 2],
      ['Versez la crème, laissez épaissir, puis ajoutez le parmesan, le sel, le poivre et la muscade.', 'Pour in the cream, let it thicken, then add the parmesan, salt, pepper and nutmeg.', 2],
    ],
  }),
  r({
    id: 'pasta_peas_bacon', fr: 'Pâtes aux petits pois et lardons', en: 'Pasta with peas and bacon', icon: '🍝', course: 'main', time: 20, tools: [],
    ing: 'pasta 200 g; peas 150 g; bacon 120 g; cream 100 ml?; onion 1?; parmesan 30 g?; salt; pepper',
    steps: [
      ['Faites cuire les pâtes, ajoutez les petits pois 4 minutes avant la fin.', 'Cook the pasta, adding the peas 4 minutes before the end.', 10],
      ['Faites dorer les lardons et l’oignon.', 'Brown the bacon and onion.', 5],
      ['Mélangez le tout avec la crème et le parmesan.', 'Toss everything with the cream and parmesan.'],
    ],
  }),
  r({
    id: 'sweet_potato_soup', fr: 'Velouté de patate douce', en: 'Sweet potato soup', icon: '🍠', course: 'starter', time: 30, tools: ['blender'], serv: 3,
    ing: 'sweet_potato 2; onion 1; stock 1; water 600 ml; oil 1 tbsp; coconut_milk 200 ml?; ginger 1 tsp?; curry 1 tsp?; salt',
    steps: [
      ['Faites revenir l’oignon (et le gingembre) dans l’huile.', 'Fry the onion (and ginger) in the oil.', 3],
      ['Ajoutez les patates douces en dés, le curry, l’eau et le bouillon.', 'Add the diced sweet potatoes, curry powder, water and stock.', 20],
      ['Mixez avec le lait de coco et salez.', 'Blend with the coconut milk and season.'],
    ],
  }),
  r({
    id: 'sweet_potato_wedges', fr: 'Frites de patate douce au four', en: 'Oven-baked sweet potato fries', icon: '🍠', course: 'main', time: 35, tools: ['oven'],
    ing: 'sweet_potato 2; oil 2 tbsp; paprika 1 tsp?; cumin 1 pinch?; yogurt 100 g?; garlic 1 clove?; salt',
    steps: [
      ['Préchauffez le four à 220 °C.', 'Preheat the oven to 220 °C (425 °F).'],
      ['Coupez les patates douces en quartiers, mélangez avec l’huile, les épices et le sel.', 'Cut the sweet potatoes into wedges, toss with the oil, spices and salt.'],
      ['Étalez sur une plaque et enfournez, en les retournant à mi-cuisson.', 'Spread on a tray and bake, turning halfway.', 30],
      ['Servez avec le yaourt mélangé à l’ail.', 'Serve with the yogurt mixed with garlic.'],
    ],
  }),
  // ---------- V1.6, lot C : viandes, poissons, cuisines du monde, desserts ----------
  r({
    id: 'chicken_stew', fr: 'Poulet mijoté aux légumes', en: 'Chicken and vegetable stew', icon: '🍗', course: 'main', time: 50, tools: [],
    ing: 'chicken 300 g; carrot 2; potato 3; onion 1; herbs 1 tsp; stock 1; water 400 ml; oil 1 tbsp; garlic 1 clove?; salt; pepper',
    steps: [
      ['Faites dorer le poulet en morceaux dans l’huile, réservez.', 'Brown the chicken pieces in the oil, set aside.', 6],
      ['Faites revenir l’oignon et l’ail, remettez le poulet, ajoutez les légumes en morceaux, les herbes, l’eau et le bouillon.', 'Fry the onion and garlic, return the chicken, add the vegetables in chunks, herbs, water and stock.', 3],
      ['Couvrez et laissez mijoter.', 'Cover and simmer.', 35],
    ],
  }),
  r({
    id: 'chicken_paprika', fr: 'Poulet au paprika', en: 'Chicken paprika', icon: '🍗', course: 'main', time: 30, tools: [],
    ing: 'chicken 300 g; onion 1; paprika 2 tsp; canned_tomato 200 g; oil 1 tbsp; bell_pepper 1?; cream 100 ml?; salt; pepper',
    steps: [
      ['Faites dorer le poulet en morceaux dans l’huile.', 'Brown the chicken pieces in the oil.', 6],
      ['Ajoutez l’oignon et le poivron émincés, puis le paprika.', 'Add the sliced onion and pepper, then the paprika.', 4],
      ['Ajoutez les tomates et laissez mijoter, puis finissez avec la crème.', 'Add the tomatoes and simmer, then finish with the cream.', 15],
    ],
  }),
  r({
    id: 'caesar_salad', fr: 'Salade façon César', en: 'Caesar-style salad', icon: '🥗', course: 'main', time: 25, tools: [],
    ing: 'salad 1; chicken 250 g; bread 2 slice; parmesan 40 g; mustard 1 tsp; oil 3 tbsp; yogurt 2 tbsp?; lemon 1?; garlic 1 clove?; salt; pepper',
    steps: [
      ['Faites dorer le poulet en lamelles.', 'Fry the chicken strips until golden.', 8],
      ['Faites dorer le pain en cubes dans un peu d’huile.', 'Fry the bread cubes in a little oil.', 3],
      ['Mélangez le yaourt, la moutarde, le citron, l’ail, l’huile et la moitié du parmesan râpé.', 'Mix the yogurt, mustard, lemon, garlic, oil and half the grated parmesan.'],
      ['Mélangez la salade, le poulet, les croûtons et la sauce, ajoutez le reste du parmesan.', 'Toss the lettuce, chicken, croutons and dressing, top with the rest of the parmesan.'],
    ],
  }),
  r({
    id: 'beef_carrots', fr: 'Bœuf aux carottes', en: 'Beef and carrot stew', icon: '🥩', course: 'main', time: 110, tools: [], diff: 2, serv: 3,
    ing: 'beef 500 g; carrot 5; onion 1; garlic 1 clove; flour 1 tbsp; stock 1; water 500 ml; herbs 1 tsp; oil 1 tbsp; salt; pepper',
    steps: [
      ['Faites dorer la viande en cubes dans l’huile, saupoudrez de farine.', 'Brown the diced beef in the oil, sprinkle with flour.', 8],
      ['Ajoutez l’oignon, l’ail, les carottes en rondelles, les herbes, l’eau et le bouillon.', 'Add the onion, garlic, sliced carrots, herbs, water and stock.'],
      ['Couvrez et laissez mijoter à feu très doux, en remuant de temps en temps.', 'Cover and simmer very gently, stirring now and then.', 90],
      ['Goûtez et rectifiez l’assaisonnement.', 'Taste and adjust the seasoning.'],
    ],
  }),
  r({
    id: 'pork_apples', fr: 'Porc aux pommes', en: 'Pork with apples', icon: '🥩', course: 'main', time: 30, tools: [],
    ing: 'pork 300 g; apple 2; onion 1; butter 15 g; cream 100 ml?; mustard 1 tsp?; salt; pepper',
    steps: [
      ['Faites dorer le porc dans le beurre, 4 minutes par face.', 'Brown the pork in the butter, 4 minutes per side.', 8],
      ['Ajoutez l’oignon émincé et les pommes en quartiers.', 'Add the sliced onion and apple wedges.', 10],
      ['Ajoutez la crème et la moutarde, laissez réduire.', 'Add the cream and mustard, let it reduce.', 2],
    ],
  }),
  r({
    id: 'rougail_saucisses', fr: 'Rougail saucisses', en: 'Sausage rougail', icon: '🌭', course: 'main', time: 45, tools: [],
    ing: 'sausage 4; tomato 4; onion 2; garlic 2 clove; ginger 1 tsp; oil 1 tbsp; chili 1 pinch?; rice 160 g?; salt',
    steps: [
      ['Piquez les saucisses et faites-les blanchir dans l’eau bouillante, puis coupez-les en rondelles.', 'Prick the sausages and blanch them in boiling water, then slice them.', 5],
      ['Faites-les dorer dans l’huile avec les oignons émincés.', 'Brown them in the oil with the sliced onions.', 8],
      ['Ajoutez l’ail, le gingembre, le piment et les tomates en dés, couvrez et laissez mijoter.', 'Add the garlic, ginger, chili and diced tomatoes, cover and simmer.', 25],
      ['Servez avec du riz.', 'Serve with rice.'],
    ],
  }),
  r({
    id: 'fish_tomato_olives', fr: 'Poisson à la tomate et aux olives', en: 'Fish with tomato and olives', icon: '🐟', course: 'main', time: 25, tools: [],
    ing: 'white_fish 300 g; canned_tomato 400 g; olives 12; garlic 1 clove; herbs 1 tsp; oil 1 tbsp; onion 1?; salt; pepper',
    steps: [
      ['Faites revenir l’ail et l’oignon, ajoutez les tomates, les olives et les herbes.', 'Fry the garlic and onion, add the tomatoes, olives and herbs.', 10],
      ['Posez le poisson sur la sauce, couvrez et laissez cuire.', 'Lay the fish on the sauce, cover and cook.', 8],
    ],
  }),
  r({
    id: 'salmon_lemon_cream', fr: 'Saumon à la crème citronnée', en: 'Salmon with lemon cream', icon: '🐟', course: 'main', time: 20, tools: [],
    ing: 'salmon 2; cream 100 ml; lemon 1; butter 10 g; chives 1 tbsp?; rice 160 g?; salt; pepper',
    steps: [
      ['Faites cuire le saumon dans le beurre, côté peau d’abord, puis 2 minutes de l’autre côté.', 'Cook the salmon in the butter, skin side first, then 2 minutes on the other side.', 7],
      ['Retirez-le, versez la crème et le jus de citron dans la poêle, laissez réduire.', 'Remove it, pour the cream and lemon juice into the pan and let it reduce.', 2],
      ['Ajoutez la ciboulette et nappez le saumon.', 'Add the chives and spoon over the salmon.'],
    ],
  }),
  r({
    id: 'tuna_corn_salad', fr: 'Salade thon, maïs et haricots rouges', en: 'Tuna, corn and bean salad', icon: '🥗', course: 'main', time: 10, tools: [],
    ing: 'tuna 1 can; kidney_beans 1 can; corn 150 g; vinegar 1 tbsp; oil 3 tbsp; onion 1?; tomato 1?; salt; pepper',
    steps: [
      ['Égouttez le thon, les haricots et le maïs.', 'Drain the tuna, beans and corn.'],
      ['Ajoutez l’oignon et la tomate coupés en dés.', 'Add the diced onion and tomato.'],
      ['Assaisonnez avec le vinaigre, l’huile, le sel et le poivre.', 'Dress with the vinegar, oil, salt and pepper.'],
    ],
  }),
  r({
    id: 'shrimp_fried_rice', fr: 'Riz sauté aux crevettes', en: 'Shrimp fried rice', icon: '🍤', course: 'main', time: 15, tools: [],
    ing: 'rice 250 g; shrimp 150 g; egg 1; onion 1; garlic 1 clove; soy_sauce 2 tbsp; oil 2 tbsp; peas 80 g?',
    steps: [
      ['Utilisez du riz déjà cuit et refroidi.', 'Use cooked, cooled rice.'],
      ['Faites sauter l’oignon, l’ail et les crevettes à feu vif.', 'Stir-fry the onion, garlic and shrimp over high heat.', 3],
      ['Poussez sur le côté et brouillez l’œuf dans la poêle.', 'Push aside and scramble the egg in the pan.', 1],
      ['Ajoutez le riz, les petits pois et la sauce soja, faites sauter 3 minutes.', 'Add the rice, peas and soy sauce, stir-fry for 3 minutes.', 3],
    ],
  }),
  r({
    id: 'breaded_fish', fr: 'Poisson pané maison', en: 'Homemade breaded fish', icon: '🐟', course: 'main', time: 20, tools: [],
    ing: 'white_fish 300 g; egg 1; flour 3 tbsp; bread 2 slice; oil 4 tbsp; lemon 1?; salt; pepper',
    steps: [
      ['Émiettez finement le pain sec (ou râpez-le).', 'Crumble the dry bread finely (or grate it).'],
      ['Passez le poisson dans la farine, puis dans l’œuf battu, puis dans la chapelure.', 'Dip the fish in flour, then beaten egg, then the breadcrumbs.'],
      ['Faites dorer dans l’huile, 3 à 4 minutes par face. Servez avec du citron.', 'Fry in the oil, 3 to 4 minutes per side. Serve with lemon.', 8],
    ],
  }),
  r({
    id: 'beef_kofta', fr: 'Keftas de bœuf, sauce yaourt', en: 'Beef kofta with yogurt sauce', icon: '🥩', course: 'main', time: 25, tools: [],
    ing: 'ground_beef 300 g; onion 1; cumin 1 tsp; oil 1 tbsp; parsley 1 tbsp?; coriander 1 tbsp?; yogurt 125 g?; garlic 1 clove?; lemon 1?; salt; pepper',
    steps: [
      ['Mélangez la viande avec l’oignon râpé, le cumin, les herbes, le sel et le poivre.', 'Mix the meat with the grated onion, cumin, herbs, salt and pepper.'],
      ['Formez des boulettes allongées.', 'Shape into long meatballs.'],
      ['Faites-les dorer à la poêle en les retournant.', 'Fry them, turning, until browned.', 8],
      ['Servez avec le yaourt mélangé à l’ail et au citron.', 'Serve with the yogurt mixed with garlic and lemon.'],
    ],
  }),
  r({
    id: 'turkey_mushrooms', fr: 'Dinde aux champignons', en: 'Turkey with mushrooms', icon: '🍗', course: 'main', time: 25, tools: [],
    ing: 'turkey 300 g; mushroom 250 g; onion 1; cream 100 ml; butter 10 g; oil 1 tbsp; parsley 1 tbsp?; salt; pepper',
    steps: [
      ['Faites dorer la dinde en lanières dans l’huile, réservez.', 'Brown the turkey strips in the oil, set aside.', 6],
      ['Faites revenir l’oignon et les champignons dans le beurre.', 'Fry the onion and mushrooms in the butter.', 6],
      ['Remettez la dinde, ajoutez la crème et laissez mijoter.', 'Return the turkey, add the cream and simmer.', 5],
    ],
  }),
  r({
    id: 'mexican_rice', fr: 'Riz à la mexicaine', en: 'Mexican-style rice', icon: '🌶️', course: 'main', time: 30, tools: [],
    ing: 'rice 160 g; corn 100 g; bell_pepper 1; onion 1; canned_tomato 200 g; cumin 1 tsp; paprika 1 tsp; stock 1; water 300 ml; oil 1 tbsp; ground_beef 200 g?; kidney_beans 1 can?; salt',
    steps: [
      ['Faites revenir l’oignon et le poivron (et la viande) dans l’huile.', 'Fry the onion and pepper (and the meat) in the oil.', 6],
      ['Ajoutez le riz et les épices, remuez 1 minute.', 'Add the rice and spices, stir for 1 minute.'],
      ['Ajoutez les tomates, l’eau, le bouillon, le maïs et les haricots, couvrez et laissez cuire.', 'Add the tomatoes, water, stock, corn and beans, cover and cook.', 18],
    ],
  }),
  r({
    id: 'chicken_peanut', fr: 'Poulet sauce cacahuète', en: 'Chicken in peanut sauce', icon: '🥜', course: 'main', time: 25, tools: [],
    ing: 'chicken 300 g; peanut_butter 3 tbsp; coconut_milk 200 ml; soy_sauce 1 tbsp; oil 1 tbsp; curry 1 tsp?; garlic 1 clove?; lemon 1?; rice 160 g?',
    steps: [
      ['Faites dorer le poulet en morceaux dans l’huile.', 'Brown the chicken pieces in the oil.', 6],
      ['Ajoutez l’ail et le curry, puis le lait de coco, le beurre de cacahuète et la sauce soja.', 'Add the garlic and curry powder, then the coconut milk, peanut butter and soy sauce.'],
      ['Laissez mijoter jusqu’à ce que la sauce nappe, ajoutez le citron. Servez avec du riz.', 'Simmer until the sauce coats the chicken, add the lemon. Serve with rice.', 10],
    ],
  }),
  r({
    id: 'minestrone', fr: 'Minestrone', en: 'Minestrone', icon: '🥣', course: 'starter', time: 40, tools: [], serv: 4,
    ing: 'carrot 1; zucchini 1; potato 1; onion 1; canned_tomato 200 g; pasta 80 g; garlic 1 clove; stock 1; water 1000 ml; oil 2 tbsp; celery 1?; kidney_beans 1 can?; parmesan 30 g?; salt; pepper',
    steps: [
      ['Faites revenir l’oignon, l’ail, la carotte et le céleri en dés dans l’huile.', 'Fry the diced onion, garlic, carrot and celery in the oil.', 5],
      ['Ajoutez la pomme de terre et la courgette en dés, les tomates, l’eau et le bouillon.', 'Add the diced potato and zucchini, tomatoes, water and stock.', 20],
      ['Ajoutez les pâtes et les haricots.', 'Add the pasta and beans.', 10],
      ['Servez avec du parmesan.', 'Serve with parmesan.'],
    ],
  }),
  r({
    id: 'thai_coconut_soup', fr: 'Soupe coco-poulet à la thaïe', en: 'Thai coconut chicken soup', icon: '🥥', course: 'starter', time: 25, tools: [],
    ing: 'coconut_milk 400 ml; chicken 200 g; ginger 1 tsp; lemon 1; soy_sauce 1 tbsp; stock 1; water 300 ml; mushroom 4?; coriander 1 tbsp?; chili 1 pinch?',
    steps: [
      ['Faites chauffer le lait de coco, l’eau, le bouillon et le gingembre.', 'Heat the coconut milk, water, stock and ginger.'],
      ['Ajoutez le poulet en fines lamelles et les champignons, laissez frémir.', 'Add the thinly sliced chicken and mushrooms, simmer.', 10],
      ['Ajoutez la sauce soja, le jus de citron, le piment et la coriandre.', 'Add the soy sauce, lemon juice, chili and coriander.'],
    ],
  }),
  r({
    id: 'green_shakshuka', fr: 'Shakshuka verte', en: 'Green shakshuka', icon: '🍳', course: 'main', time: 20, tools: [],
    ing: 'egg 4; spinach 200 g; garlic 1 clove; oil 2 tbsp; leek 1?; zucchini 1?; feta 60 g?; cumin 1 pinch?; salt; pepper',
    steps: [
      ['Faites revenir le poireau, la courgette et l’ail dans l’huile.', 'Fry the leek, zucchini and garlic in the oil.', 6],
      ['Ajoutez les épinards jusqu’à ce qu’ils tombent.', 'Add the spinach until wilted.', 3],
      ['Creusez des nids, cassez-y les œufs, couvrez et laissez cuire.', 'Make wells, crack in the eggs, cover and cook.', 6],
      ['Émiettez la feta par-dessus.', 'Crumble the feta on top.'],
    ],
  }),
  r({
    id: 'apple_compote', fr: 'Compote de pommes', en: 'Apple compote', icon: '🍎', course: 'dessert', time: 25, tools: [],
    ing: 'apple 4; water 4 tbsp; sugar 1 tbsp?; cinnamon 1 pinch?; vanilla?',
    steps: [
      ['Épluchez les pommes et coupez-les en morceaux.', 'Peel the apples and cut them into chunks.'],
      ['Faites-les cuire à couvert et à feu doux avec l’eau (et le sucre, la cannelle).', 'Cook them gently, covered, with the water (and sugar, cinnamon).', 15],
      ['Écrasez à la fourchette ou laissez en morceaux.', 'Mash with a fork or leave chunky.'],
    ],
  }),
  r({
    id: 'chocolate_cream', fr: 'Crème au chocolat', en: 'Chocolate pudding', icon: '🍫', course: 'dessert', time: 15, tools: [], serv: 4,
    ing: 'milk 500 ml; chocolate 100 g; sugar 40 g; flour 30 g',
    steps: [
      ['Mélangez la farine et le sucre avec un peu de lait froid.', 'Mix the flour and sugar with a little cold milk.'],
      ['Faites chauffer le reste du lait avec le chocolat en morceaux.', 'Heat the rest of the milk with the chocolate pieces.', 4],
      ['Ajoutez le mélange et faites épaissir sans cesser de remuer.', 'Add the mixture and stir constantly until thick.', 3],
      ['Versez dans des pots et laissez refroidir au frais.', 'Pour into pots and chill.'],
    ],
  }),
  r({
    id: 'mug_cake', fr: 'Mug cake au chocolat', en: 'Chocolate mug cake', icon: '☕', course: 'dessert', time: 5, tools: ['microwave'], serv: 1,
    ing: 'chocolate 40 g; butter 20 g; egg 1; sugar 1 tbsp; flour 2 tbsp; baking_powder 1 pinch?',
    steps: [
      ['Faites fondre le chocolat et le beurre dans une grande tasse au micro-ondes, 40 secondes.', 'Melt the chocolate and butter in a large mug in the microwave, 40 seconds.'],
      ['Ajoutez l’œuf, le sucre, la farine (et la levure), mélangez bien.', 'Add the egg, sugar, flour (and baking powder), mix well.'],
      ['Faites cuire 1 minute au micro-ondes : le centre doit rester moelleux.', 'Microwave for 1 minute: the centre should stay soft.'],
    ],
  }),
  r({
    id: 'red_fruit_crumble', fr: 'Crumble aux fruits rouges', en: 'Berry crumble', icon: '🫐', course: 'dessert', time: 40, tools: ['oven'], serv: 4,
    ing: 'red_fruits 400 g; flour 100 g; butter 70 g; sugar 70 g; oats 30 g?',
    steps: [
      ['Préchauffez le four à 190 °C.', 'Preheat the oven to 190 °C (375 °F).'],
      ['Versez les fruits dans un plat (encore surgelés, c’est possible).', 'Put the fruit in a dish (still frozen is fine).'],
      ['Sablez du bout des doigts la farine, le sucre, le beurre (et les flocons).', 'Rub the flour, sugar and butter (and oats) together with your fingertips.'],
      ['Émiettez sur les fruits et enfournez.', 'Scatter over the fruit and bake.', 30],
    ],
  }),
  r({
    id: 'caramel_bananas', fr: 'Bananes caramélisées', en: 'Caramelised bananas', icon: '🍌', course: 'dessert', time: 10, tools: [],
    ing: 'banana 2; butter 20 g; sugar 2 tbsp; cinnamon 1 pinch?; yogurt 100 g?',
    steps: [
      ['Coupez les bananes en deux dans la longueur.', 'Halve the bananas lengthways.'],
      ['Faites fondre le beurre et le sucre dans la poêle jusqu’à obtenir un caramel blond.', 'Melt the butter and sugar in the pan until lightly golden.', 3],
      ['Faites dorer les bananes 2 minutes par face, servez chaud (avec le yaourt).', 'Fry the bananas for 2 minutes per side, serve hot (with the yogurt).', 4],
    ],
  }),
  r({
    id: 'semolina_pudding', fr: 'Semoule au lait', en: 'Semolina pudding', icon: '🥛', course: 'dessert', time: 20, tools: [], serv: 4,
    ing: 'couscous 60 g; milk 500 ml; sugar 50 g; vanilla?; raisins 2 tbsp?; cinnamon 1 pinch?',
    steps: [
      ['Faites chauffer le lait avec le sucre et la vanille.', 'Heat the milk with the sugar and vanilla.', 4],
      ['Versez la semoule en pluie en remuant, laissez cuire à feu doux.', 'Pour in the semolina, stirring, and cook gently.', 8],
      ['Ajoutez les raisins, versez dans des bols et servez tiède ou froid.', 'Add the raisins, pour into bowls and serve warm or cold.'],
    ],
  }),
  r({
    id: 'cinnamon_oranges', fr: 'Oranges à la cannelle', en: 'Cinnamon oranges', icon: '🍊', course: 'dessert', time: 10, tools: [],
    ing: 'orange 3; cinnamon 1 pinch; honey 1 tbsp?; sugar 1 tsp?',
    steps: [
      ['Pelez les oranges à vif et coupez-les en rondelles.', 'Peel the oranges, removing the pith, and slice them.'],
      ['Saupoudrez de cannelle et arrosez de miel.', 'Sprinkle with cinnamon and drizzle with honey.'],
      ['Laissez au frais 10 minutes avant de servir.', 'Chill for 10 minutes before serving.', 10],
    ],
  }),
  r({
    id: 'carrot_cake', fr: 'Gâteau aux carottes', en: 'Carrot cake', icon: '🥕', course: 'dessert', time: 60, tools: ['oven'], diff: 2, serv: 6,
    ing: 'carrot 3; egg 3; sugar 120 g; oil 100 ml; flour 180 g; baking_powder 1 tsp; cinnamon 1 tsp; nuts 50 g?; raisins 30 g?',
    steps: [
      ['Préchauffez le four à 180 °C et huilez un moule.', 'Preheat the oven to 180 °C (350 °F) and oil a tin.'],
      ['Râpez finement les carottes.', 'Finely grate the carrots.'],
      ['Fouettez les œufs et le sucre, ajoutez l’huile, puis la farine, la levure et la cannelle.', 'Whisk the eggs and sugar, add the oil, then the flour, baking powder and cinnamon.'],
      ['Incorporez les carottes, les noix et les raisins, versez dans le moule et enfournez.', 'Fold in the carrots, nuts and raisins, pour into the tin and bake.', 40],
    ],
  }),
];
