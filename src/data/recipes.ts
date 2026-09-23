import { r } from './recipeHelper';
import type { Recipe } from './types';

/**
 * Base de recettes GRATUITE.
 * Lot initial — à compléter jusqu'à ~300 recettes (même format, voir README > « Ajouter des recettes »).
 */
export const FREE_RECIPES: Recipe[] = [
  // ---------- Recettes « placard » (faisables avec presque rien) ----------
  r({
    id: 'omelette', fr: 'Omelette baveuse', en: 'Soft French omelette', icon: '🍳', course: 'main', time: 10,
    ing: 'egg 4; butter 10 g; salt; pepper; chives 1 tbsp?; emmental 30 g?',
    steps: [
      ['Battez les œufs avec sel et poivre (et la ciboulette).', 'Beat the eggs with salt and pepper (and the chives).'],
      ['Faites fondre le beurre dans une poêle à feu moyen.', 'Melt the butter in a pan over medium heat.'],
      ['Versez les œufs, remuez doucement en ramenant les bords vers le centre.', 'Pour in the eggs, gently pulling the edges to the centre.', 3],
      ['Ajoutez le fromage, pliez en deux et servez encore baveux.', 'Add the cheese, fold in half and serve while still soft.'],
    ],
  }),
  r({
    id: 'pasta_garlic', fr: "Pâtes à l'ail et à l'huile", en: 'Garlic & oil spaghetti', icon: '🍝', course: 'main', time: 15,
    ing: 'pasta 200 g; garlic 3 clove; oil 4 tbsp; chili 1 pinch?; parsley 1 tbsp?; parmesan 30 g?; salt',
    steps: [
      ['Faites cuire les pâtes dans une grande casserole d’eau salée.', 'Cook the pasta in a large pot of salted water.', 10],
      ['Pendant ce temps, faites dorer doucement l’ail émincé dans l’huile avec le piment.', 'Meanwhile, gently fry the sliced garlic in the oil with the chili.', 3],
      ['Égouttez les pâtes en gardant un peu d’eau de cuisson, mélangez avec l’huile à l’ail.', 'Drain, keeping a little pasta water, and toss with the garlic oil.'],
      ['Ajoutez persil et parmesan, servez aussitôt.', 'Add parsley and parmesan, serve immediately.'],
    ],
  }),
  r({
    id: 'fried_rice', fr: 'Riz sauté aux œufs', en: 'Egg fried rice', icon: '🍚', course: 'main', time: 15,
    ing: 'rice 250 g; egg 2; onion 1; soy_sauce 2 tbsp; oil 2 tbsp; peas 80 g?; carrot 1?; frozen_veg 150 g?',
    steps: [
      ['Utilisez du riz déjà cuit et refroidi (idéal : restes de la veille).', 'Use cooked, cooled rice (leftovers are ideal).'],
      ['Faites revenir l’oignon et les légumes dans l’huile à feu vif.', 'Stir-fry the onion and vegetables in the oil over high heat.', 4],
      ['Poussez sur le côté, brouillez les œufs dans la poêle.', 'Push aside and scramble the eggs in the pan.', 2],
      ['Ajoutez le riz et la sauce soja, faites sauter 3 minutes.', 'Add the rice and soy sauce, stir-fry for 3 minutes.', 3],
    ],
  }),
  r({
    id: 'french_toast', fr: 'Pain perdu', en: 'French toast', icon: '🍞', course: 'dessert', time: 15,
    ing: 'bread 6 slice; egg 2; milk 200 ml; sugar 2 tbsp; butter 20 g; cinnamon 1 pinch?; vanilla?',
    steps: [
      ['Fouettez œufs, lait, sucre (et cannelle ou vanille) dans une assiette creuse.', 'Whisk eggs, milk, sugar (and cinnamon or vanilla) in a shallow dish.'],
      ['Trempez les tranches de pain des deux côtés.', 'Dip the bread slices on both sides.'],
      ['Faites-les dorer au beurre 2 minutes par face.', 'Fry in butter for 2 minutes per side.', 4],
      ['Saupoudrez d’un peu de sucre et servez tiède.', 'Sprinkle with a little sugar and serve warm.'],
    ],
  }),
  r({
    id: 'crepes', fr: 'Crêpes', en: 'Crêpes', icon: '🥞', course: 'dessert', time: 30, serv: 4,
    ing: 'flour 250 g; egg 4; milk 500 ml; sugar 1 tbsp; butter 30 g; salt 1 pinch',
    steps: [
      ['Mettez la farine, le sucre et le sel dans un saladier, creusez un puits.', 'Put flour, sugar and salt in a bowl and make a well.'],
      ['Ajoutez les œufs, puis le lait petit à petit en fouettant pour éviter les grumeaux.', 'Add the eggs, then the milk gradually, whisking to avoid lumps.'],
      ['Incorporez le beurre fondu. Laissez reposer si vous avez le temps.', 'Stir in the melted butter. Rest the batter if you have time.', 15],
      ['Faites cuire les crêpes dans une poêle chaude légèrement huilée, 1 minute par face.', 'Cook in a hot, lightly oiled pan, 1 minute per side.'],
    ],
  }),
  r({
    id: 'shakshuka', fr: 'Shakshuka', en: 'Shakshuka', icon: '🍳', course: 'main', time: 25,
    ing: 'egg 4; canned_tomato 400 g; onion 1; bell_pepper 1?; garlic 2 clove; cumin 1 tsp; paprika 1 tsp?; oil 2 tbsp; coriander 1 tbsp?; feta 50 g?',
    steps: [
      ['Faites revenir oignon, poivron et ail dans l’huile.', 'Sauté onion, pepper and garlic in the oil.', 5],
      ['Ajoutez les épices puis les tomates, laissez mijoter.', 'Add the spices then the tomatoes, simmer.', 10],
      ['Creusez 4 puits, cassez-y les œufs, couvrez.', 'Make 4 wells, crack in the eggs, cover.', 6],
      ['Parsemez de coriandre et de feta, servez avec du pain.', 'Top with coriander and feta, serve with bread.'],
    ],
  }),
  r({
    id: 'tuna_pasta', fr: 'Pâtes au thon et tomate', en: 'Tuna tomato pasta', icon: '🍝', course: 'main', time: 20,
    ing: 'pasta 200 g; tuna 1 can; canned_tomato 400 g; onion 1; garlic 1 clove; herbs 1 tsp; oil 1 tbsp; olives 10?',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites revenir oignon et ail, ajoutez les tomates et les herbes, laissez réduire.', 'Sauté onion and garlic, add tomatoes and herbs, reduce.', 10],
      ['Ajoutez le thon émietté (et les olives) en fin de cuisson.', 'Add the flaked tuna (and olives) at the end.'],
      ['Mélangez avec les pâtes égouttées.', 'Toss with the drained pasta.'],
    ],
  }),
  r({
    id: 'croque', fr: 'Croque-monsieur', en: 'Croque-monsieur', icon: '🥪', course: 'main', time: 15,
    ing: 'bread 4 slice; ham 2 slice; emmental 60 g; butter 15 g; cream 2 tbsp?',
    steps: [
      ['Beurrez les tranches de pain à l’extérieur.', 'Butter the outside of the bread slices.'],
      ['Garnissez de jambon et fromage (et d’un peu de crème).', 'Fill with ham and cheese (and a little cream).'],
      ['Faites dorer à la poêle ou au four à 200 °C.', 'Toast in a pan or in the oven at 200 °C.', 8],
    ],
  }),
  // ---------- Plats ----------
  r({
    id: 'carbonara', fr: 'Pâtes carbonara', en: 'Pasta carbonara', icon: '🍝', course: 'main', time: 20,
    ing: 'pasta 200 g; bacon 150 g; egg 2; parmesan 50 g; pepper',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites dorer les lardons sans matière grasse.', 'Fry the bacon without added fat.', 5],
      ['Mélangez œufs, parmesan et beaucoup de poivre.', 'Mix eggs, parmesan and plenty of pepper.'],
      ['Hors du feu, mélangez pâtes, lardons et œufs avec un peu d’eau de cuisson pour une sauce crémeuse.', 'Off the heat, toss pasta, bacon and egg mix with a little pasta water for a creamy sauce.'],
    ],
  }),
  r({
    id: 'bolognese', fr: 'Spaghetti bolognaise', en: 'Spaghetti bolognese', icon: '🍝', course: 'main', time: 40, serv: 4,
    ing: 'pasta 400 g; ground_beef 400 g; canned_tomato 400 g; onion 1; carrot 1?; garlic 2 clove; tomato_paste 1 tbsp?; herbs 1 tsp; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon, carotte et ail dans l’huile.', 'Sauté onion, carrot and garlic in the oil.', 5],
      ['Ajoutez la viande et faites-la dorer.', 'Add the beef and brown it.', 5],
      ['Ajoutez tomates, concentré et herbes, laissez mijoter à couvert.', 'Add tomatoes, paste and herbs, simmer covered.', 25],
      ['Servez sur les pâtes cuites.', 'Serve over the cooked pasta.'],
    ],
  }),
  r({
    id: 'chicken_curry', fr: 'Curry de poulet au lait de coco', en: 'Coconut chicken curry', icon: '🍛', course: 'main', time: 30, serv: 3,
    ing: 'chicken 400 g; coconut_milk 400 ml; onion 1; garlic 2 clove; curry 2 tsp; ginger 1 tsp?; tomato 2?; rice 200 g; oil 1 tbsp; coriander?',
    steps: [
      ['Lancez la cuisson du riz.', 'Start cooking the rice.', 12],
      ['Faites revenir oignon, ail et gingembre, puis le poulet en morceaux.', 'Sauté onion, garlic and ginger, then the diced chicken.', 6],
      ['Ajoutez le curry, les tomates et le lait de coco. Laissez mijoter.', 'Add curry, tomatoes and coconut milk. Simmer.', 15],
      ['Servez avec le riz et la coriandre.', 'Serve with the rice and coriander.'],
    ],
  }),
  r({
    id: 'chickpea_curry', fr: 'Curry de pois chiches', en: 'Chickpea curry', icon: '🍛', course: 'main', time: 25, serv: 3,
    ing: 'chickpeas 400 g; coconut_milk 400 ml; canned_tomato 200 g; onion 1; garlic 2 clove; curry 2 tsp; spinach 100 g?; rice 200 g; oil 1 tbsp',
    steps: [
      ['Faites cuire le riz.', 'Cook the rice.', 12],
      ['Faites revenir oignon et ail, ajoutez le curry.', 'Sauté onion and garlic, add the curry.', 3],
      ['Ajoutez pois chiches égouttés, tomates et lait de coco, laissez mijoter.', 'Add drained chickpeas, tomatoes and coconut milk, simmer.', 15],
      ['Incorporez les épinards 2 minutes avant la fin. Servez avec le riz.', 'Stir in the spinach 2 minutes before the end. Serve with rice.'],
    ],
  }),
  r({
    id: 'lentil_dahl', fr: 'Dahl de lentilles corail', en: 'Red lentil dahl', icon: '🥣', course: 'main', time: 30, serv: 3,
    ing: 'lentils 200 g; coconut_milk 200 ml; canned_tomato 200 g; onion 1; garlic 2 clove; curry 2 tsp; ginger 1 tsp?; water 500 ml; lemon 1?',
    steps: [
      ['Faites revenir oignon, ail, gingembre et curry.', 'Sauté onion, garlic, ginger and curry.', 4],
      ['Ajoutez les lentilles rincées, les tomates et l’eau.', 'Add the rinsed lentils, tomatoes and water.'],
      ['Laissez cuire en remuant jusqu’à ce que les lentilles soient fondantes.', 'Simmer, stirring, until the lentils are soft.', 20],
      ['Ajoutez le lait de coco et un filet de citron.', 'Stir in the coconut milk and a squeeze of lemon.'],
    ],
  }),
  r({
    id: 'quiche', fr: 'Quiche lorraine', en: 'Quiche lorraine', icon: '🥧', course: 'main', time: 45, serv: 4, diff: 2,
    ing: 'puff_pastry 1; egg 3; cream 200 ml; milk 100 ml; bacon 200 g; emmental 50 g?; nutmeg 1 pinch?; pepper',
    steps: [
      ['Préchauffez le four à 200 °C. Étalez la pâte dans un moule et piquez-la.', 'Preheat the oven to 200 °C. Line a tin with the pastry and prick it.'],
      ['Faites dorer les lardons et répartissez-les sur la pâte.', 'Brown the bacon and spread it over the pastry.', 5],
      ['Battez œufs, crème, lait, muscade et poivre, versez sur la pâte, ajoutez le fromage.', 'Beat eggs, cream, milk, nutmeg and pepper, pour over, add cheese.'],
      ['Enfournez jusqu’à ce que ce soit doré.', 'Bake until golden.', 30],
    ],
  }),
  r({
    id: 'veg_quiche', fr: 'Quiche aux légumes du frigo', en: 'Fridge-veg quiche', icon: '🥧', course: 'main', time: 45, serv: 4, diff: 2,
    ing: 'puff_pastry 1; egg 3; cream 200 ml; zucchini 1?; spinach 100 g?; mushroom 150 g?; leek 1?; goat_cheese 100 g?; emmental 50 g?; salt; pepper',
    steps: [
      ['Préchauffez le four à 200 °C. Foncez le moule avec la pâte.', 'Preheat the oven to 200 °C. Line the tin with pastry.'],
      ['Faites revenir les légumes disponibles, coupés en petits morceaux.', 'Sauté whatever vegetables you have, finely chopped.', 8],
      ['Battez œufs et crème, salez, poivrez. Versez sur les légumes, ajoutez le fromage.', 'Beat eggs and cream, season. Pour over the vegetables, add cheese.'],
      ['Enfournez.', 'Bake.', 30],
    ],
  }),
  r({
    id: 'ratatouille', fr: 'Ratatouille', en: 'Ratatouille', icon: '🍆', course: 'main', time: 50, serv: 4,
    ing: 'zucchini 2; eggplant 1; bell_pepper 1; tomato 3; onion 1; garlic 2 clove; herbs 1 tsp; oil 3 tbsp',
    steps: [
      ['Coupez tous les légumes en dés.', 'Dice all the vegetables.'],
      ['Faites revenir oignon et poivron, puis aubergine et courgette.', 'Sauté onion and pepper, then eggplant and zucchini.', 10],
      ['Ajoutez tomates, ail et herbes, couvrez et laissez mijoter.', 'Add tomatoes, garlic and herbs, cover and simmer.', 30],
    ],
  }),
  r({
    id: 'veg_soup', fr: 'Soupe de légumes', en: 'Vegetable soup', icon: '🥣', course: 'starter', time: 35, serv: 4,
    ing: 'potato 2; carrot 2; leek 1?; zucchini 1?; onion 1; stock 1; water 1000 ml; cream 2 tbsp?',
    steps: [
      ['Épluchez et coupez les légumes en morceaux.', 'Peel and chop the vegetables.'],
      ['Mettez-les dans une casserole avec l’eau et le bouillon.', 'Put them in a pot with the water and stock cube.'],
      ['Laissez cuire jusqu’à ce qu’ils soient tendres.', 'Simmer until tender.', 25],
      ['Mixez, ajoutez un peu de crème si vous le souhaitez.', 'Blend, adding a little cream if you like.'],
    ],
  }),
  r({
    id: 'pumpkin_soup', fr: 'Velouté de courge', en: 'Squash soup', icon: '🎃', course: 'starter', time: 35, serv: 4,
    ing: 'pumpkin 800 g; onion 1; potato 1?; stock 1; water 800 ml; cream 3 tbsp?; nutmeg 1 pinch?',
    steps: [
      ['Coupez la courge et la pomme de terre en cubes, émincez l’oignon.', 'Cube the squash and potato, slice the onion.'],
      ['Faites cuire dans l’eau avec le bouillon.', 'Cook in the water with the stock cube.', 25],
      ['Mixez avec la crème et la muscade.', 'Blend with the cream and nutmeg.'],
    ],
  }),
  r({
    id: 'tomato_soup', fr: 'Soupe de tomates', en: 'Tomato soup', icon: '🍅', course: 'starter', time: 25, serv: 3,
    ing: 'canned_tomato 800 g; onion 1; garlic 1 clove; stock 1; water 300 ml; basil?; cream 2 tbsp?; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon et ail dans l’huile.', 'Sauté onion and garlic in the oil.', 4],
      ['Ajoutez tomates, eau et bouillon, laissez mijoter.', 'Add tomatoes, water and stock, simmer.', 15],
      ['Mixez, ajoutez basilic et crème.', 'Blend, add basil and cream.'],
    ],
  }),
  r({
    id: 'gratin_dauphinois', fr: 'Gratin dauphinois', en: 'Potato gratin', icon: '🥔', course: 'main', time: 75, serv: 4,
    ing: 'potato 1000 g; cream 250 ml; milk 250 ml; garlic 1 clove; butter 10 g; nutmeg 1 pinch?; salt; pepper',
    steps: [
      ['Préchauffez le four à 170 °C. Frottez un plat avec l’ail et beurrez-le.', 'Preheat the oven to 170 °C. Rub a dish with garlic and butter it.'],
      ['Coupez les pommes de terre en fines rondelles.', 'Slice the potatoes thinly.'],
      ['Portez lait et crème à frémissement avec sel, poivre et muscade, versez sur les pommes de terre.', 'Bring milk and cream to a simmer with seasoning, pour over potatoes.'],
      ['Enfournez jusqu’à ce que ce soit doré et fondant.', 'Bake until golden and tender.', 60],
    ],
  }),
  r({
    id: 'mash', fr: 'Purée maison', en: 'Mashed potatoes', icon: '🥔', course: 'main', time: 30, serv: 3,
    ing: 'potato 800 g; milk 150 ml; butter 40 g; nutmeg 1 pinch?; salt',
    steps: [
      ['Faites cuire les pommes de terre épluchées dans l’eau salée.', 'Boil the peeled potatoes in salted water.', 20],
      ['Égouttez et écrasez-les.', 'Drain and mash.'],
      ['Ajoutez le beurre puis le lait chaud petit à petit.', 'Add the butter, then the hot milk little by little.'],
    ],
  }),
  r({
    id: 'fritatta', fr: 'Frittata aux restes de légumes', en: 'Leftover veg frittata', icon: '🍳', course: 'main', time: 20,
    ing: 'egg 5; potato 1?; zucchini 1?; bell_pepper 1?; spinach 80 g?; onion 1?; emmental 40 g?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Faites revenir les légumes en petits dés dans une poêle allant au four.', 'Sauté the diced vegetables in an ovenproof pan.', 8],
      ['Versez les œufs battus assaisonnés, parsemez de fromage.', 'Pour in the seasoned beaten eggs, sprinkle with cheese.'],
      ['Cuisez à feu doux puis finissez sous le gril du four.', 'Cook gently, then finish under the grill.', 8],
    ],
  }),
  r({
    id: 'chili', fr: 'Chili con carne', en: 'Chili con carne', icon: '🌶️', course: 'main', time: 45, serv: 4,
    ing: 'ground_beef 400 g; kidney_beans 400 g; canned_tomato 400 g; onion 1; bell_pepper 1?; garlic 2 clove; cumin 1 tsp; chili 1 tsp; corn 150 g?; rice 250 g; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon, poivron et ail, puis la viande.', 'Sauté onion, pepper and garlic, then brown the beef.', 8],
      ['Ajoutez épices, tomates, haricots et maïs.', 'Add spices, tomatoes, beans and corn.'],
      ['Laissez mijoter à couvert.', 'Simmer covered.', 25],
      ['Servez avec du riz.', 'Serve with rice.'],
    ],
  }),
  r({
    id: 'sin_carne', fr: 'Chili sin carne', en: 'Veggie chili', icon: '🌶️', course: 'main', time: 35, serv: 4,
    ing: 'kidney_beans 800 g; canned_tomato 400 g; onion 1; bell_pepper 1; corn 150 g?; garlic 2 clove; cumin 1 tsp; chili 1 tsp; paprika 1 tsp?; rice 250 g; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon, poivron et ail.', 'Sauté onion, pepper and garlic.', 5],
      ['Ajoutez épices, tomates, haricots, maïs et laissez mijoter.', 'Add spices, tomatoes, beans and corn and simmer.', 20],
      ['Servez avec du riz.', 'Serve with rice.'],
    ],
  }),
  r({
    id: 'risotto_mushroom', fr: 'Risotto aux champignons', en: 'Mushroom risotto', icon: '🍄', course: 'main', time: 35, diff: 2, serv: 3,
    ing: 'rice 250 g; mushroom 250 g; onion 1; stock 1; water 800 ml; parmesan 50 g; butter 20 g; oil 1 tbsp',
    steps: [
      ['Faites chauffer l’eau avec le bouillon.', 'Heat the water with the stock cube.'],
      ['Faites revenir l’oignon, puis le riz jusqu’à ce qu’il soit nacré.', 'Sauté the onion, then the rice until translucent.', 3],
      ['Ajoutez le bouillon louche par louche en remuant, avec les champignons à mi-cuisson.', 'Add stock ladle by ladle, stirring; add mushrooms halfway.', 18],
      ['Hors du feu, ajoutez beurre et parmesan.', 'Off the heat, stir in butter and parmesan.'],
    ],
  }),
  r({
    id: 'fajitas', fr: 'Fajitas au poulet', en: 'Chicken fajitas', icon: '🌯', course: 'main', time: 25, serv: 3,
    ing: 'tortilla 6; chicken 400 g; bell_pepper 2; onion 1; paprika 1 tsp; cumin 1 tsp; lemon 1?; cream 3 tbsp?; avocado 1?; oil 1 tbsp',
    steps: [
      ['Coupez poulet, poivrons et oignon en lanières.', 'Slice chicken, peppers and onion into strips.'],
      ['Faites sauter le poulet avec les épices, puis les légumes.', 'Stir-fry the chicken with the spices, then the vegetables.', 10],
      ['Réchauffez les tortillas, garnissez avec crème, avocat et un filet de citron.', 'Warm the tortillas, fill with cream, avocado and a squeeze of lemon.'],
    ],
  }),
  r({
    id: 'quesadilla', fr: 'Quesadillas express', en: 'Quick quesadillas', icon: '🌮', course: 'main', time: 15,
    ing: 'tortilla 4; emmental 100 g; kidney_beans 150 g?; corn 80 g?; ham 2 slice?; bell_pepper 1?',
    steps: [
      ['Garnissez une moitié de chaque tortilla de fromage et de ce que vous avez.', 'Fill half of each tortilla with cheese and whatever you have.'],
      ['Repliez et faites dorer à la poêle sèche.', 'Fold and toast in a dry pan.', 5],
      ['Coupez en triangles.', 'Cut into wedges.'],
    ],
  }),
  r({
    id: 'pizza', fr: 'Pizza maison', en: 'Homemade pizza', icon: '🍕', course: 'main', time: 25, serv: 2,
    ing: 'pizza_dough 1; canned_tomato 150 g; mozzarella 125 g; ham 2 slice?; mushroom 100 g?; olives 8?; herbs 1 tsp',
    steps: [
      ['Préchauffez le four à 240 °C. Étalez la pâte.', 'Preheat the oven to 240 °C. Roll out the dough.'],
      ['Étalez la sauce tomate, ajoutez garnitures et mozzarella.', 'Spread the tomato, add toppings and mozzarella.'],
      ['Enfournez jusqu’à ce que la pâte soit dorée.', 'Bake until the crust is golden.', 12],
    ],
  }),
  r({
    id: 'stir_fry_noodles', fr: 'Nouilles sautées aux légumes', en: 'Veggie stir-fry noodles', icon: '🍜', course: 'main', time: 20,
    ing: 'noodles 200 g; carrot 1?; bell_pepper 1?; cabbage 150 g?; frozen_veg 200 g?; garlic 1 clove; soy_sauce 3 tbsp; honey 1 tsp?; oil 2 tbsp; egg 2?',
    steps: [
      ['Faites cuire les nouilles selon le paquet.', 'Cook the noodles as per the packet.', 4],
      ['Faites sauter l’ail et les légumes émincés à feu vif.', 'Stir-fry the garlic and sliced vegetables over high heat.', 5],
      ['Ajoutez nouilles, sauce soja et miel, mélangez 2 minutes.', 'Add noodles, soy sauce and honey, toss 2 minutes.', 2],
    ],
  }),
  r({
    id: 'salmon_papillote', fr: 'Saumon en papillote', en: 'Salmon en papillote', icon: '🐟', course: 'main', time: 25,
    ing: 'salmon 2; lemon 1; zucchini 1?; carrot 1?; herbs 1 tsp?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Préchauffez le four à 200 °C.', 'Preheat the oven to 200 °C.'],
      ['Déposez légumes en fines lamelles et saumon sur du papier cuisson, avec citron, huile et herbes.', 'Place thinly sliced veg and salmon on baking paper with lemon, oil and herbs.'],
      ['Fermez les papillotes et enfournez.', 'Seal the parcels and bake.', 15],
    ],
  }),
  r({
    id: 'fish_rice', fr: 'Poisson blanc, riz et sauce citron', en: 'White fish with lemon rice', icon: '🐟', course: 'main', time: 25,
    ing: 'white_fish 2; rice 150 g; lemon 1; butter 20 g; parsley?; salt; pepper',
    steps: [
      ['Faites cuire le riz.', 'Cook the rice.', 12],
      ['Poêlez le poisson au beurre, 3 à 4 minutes par face.', 'Pan-fry the fish in butter, 3–4 minutes per side.', 7],
      ['Déglacez avec le jus de citron, ajoutez le persil, servez sur le riz.', 'Deglaze with lemon juice, add parsley, serve over rice.'],
    ],
  }),
  r({
    id: 'chicken_mustard', fr: 'Poulet à la moutarde', en: 'Mustard cream chicken', icon: '🍗', course: 'main', time: 25,
    ing: 'chicken 300 g; cream 150 ml; mustard 2 tbsp; onion 1?; oil 1 tbsp; pasta 200 g?; rice 150 g?',
    steps: [
      ['Faites dorer le poulet (et l’oignon) dans l’huile.', 'Brown the chicken (and onion) in the oil.', 8],
      ['Ajoutez crème et moutarde, laissez épaissir.', 'Add cream and mustard, let it thicken.', 5],
      ['Servez avec des pâtes ou du riz.', 'Serve with pasta or rice.'],
    ],
  }),
  r({
    id: 'sausage_lentils', fr: 'Saucisses aux lentilles', en: 'Sausages with lentils', icon: '🌭', course: 'main', time: 40, serv: 3,
    ing: 'sausage 4; lentils 250 g; carrot 2; onion 1; stock 1; water 800 ml; herbs 1 tsp?',
    steps: [
      ['Faites dorer les saucisses, réservez.', 'Brown the sausages and set aside.', 6],
      ['Faites revenir oignon et carottes, ajoutez lentilles, eau et bouillon.', 'Sauté onion and carrots, add lentils, water and stock.'],
      ['Remettez les saucisses et laissez cuire à couvert.', 'Return the sausages and simmer covered.', 25],
    ],
  }),
  r({
    id: 'couscous_veg', fr: 'Couscous express aux légumes', en: 'Quick vegetable couscous', icon: '🍲', course: 'main', time: 30, serv: 3,
    ing: 'couscous 200 g; chickpeas 200 g; carrot 2; zucchini 1; onion 1; canned_tomato 200 g; cumin 1 tsp; stock 1; water 500 ml; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon et légumes coupés, ajoutez tomates, épices, eau et bouillon.', 'Sauté onion and chopped veg, add tomatoes, spices, water and stock.', 5],
      ['Ajoutez les pois chiches et laissez mijoter.', 'Add the chickpeas and simmer.', 20],
      ['Versez de l’eau bouillante sur la semoule (même volume), couvrez 5 minutes, égrainez.', 'Pour boiling water over the couscous (same volume), cover 5 minutes, fluff.', 5],
    ],
  }),
  r({
    id: 'mac_cheese', fr: 'Macaroni au fromage', en: 'Mac and cheese', icon: '🧀', course: 'main', time: 30, serv: 3,
    ing: 'pasta 250 g; milk 400 ml; butter 30 g; flour 30 g; emmental 150 g; mustard 1 tsp?; nutmeg 1 pinch?',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 9],
      ['Faites fondre le beurre, ajoutez la farine puis le lait en fouettant jusqu’à épaississement.', 'Melt the butter, add the flour, then whisk in the milk until thick.', 5],
      ['Ajoutez le fromage, la moutarde et la muscade, puis les pâtes.', 'Add cheese, mustard and nutmeg, then the pasta.'],
      ['Gratinez 10 minutes au four si vous le souhaitez.', 'Optionally grill for 10 minutes.', 10],
    ],
  }),
  r({
    id: 'gnocchi_tomato', fr: 'Gnocchis poêlés tomate-mozza', en: 'Pan-fried gnocchi with tomato & mozzarella', icon: '🥟', course: 'main', time: 20,
    ing: 'gnocchi 500 g; canned_tomato 300 g; mozzarella 125 g; garlic 1 clove; basil?; oil 1 tbsp',
    steps: [
      ['Faites dorer les gnocchis dans l’huile.', 'Pan-fry the gnocchi in the oil until golden.', 6],
      ['Ajoutez ail et tomates, laissez réduire.', 'Add garlic and tomatoes, reduce.', 6],
      ['Ajoutez la mozzarella en morceaux, couvrez jusqu’à ce qu’elle fonde.', 'Add torn mozzarella, cover until melted.', 3],
    ],
  }),
  r({
    id: 'buddha_bowl', fr: 'Bowl quinoa-légumes', en: 'Quinoa veggie bowl', icon: '🥗', course: 'main', time: 25,
    ing: 'quinoa 150 g; chickpeas 200 g; avocado 1?; carrot 1?; cucumber 1?; tomato 1?; feta 60 g?; lemon 1; oil 2 tbsp',
    steps: [
      ['Faites cuire le quinoa.', 'Cook the quinoa.', 12],
      ['Préparez les crudités, rincez les pois chiches.', 'Prep the raw veg, rinse the chickpeas.'],
      ['Assemblez, arrosez d’huile et de citron.', 'Assemble, dress with oil and lemon.'],
    ],
  }),
  r({
    id: 'tofu_stirfry', fr: 'Tofu sauté soja-sésame', en: 'Soy-sesame tofu stir-fry', icon: '🥢', course: 'main', time: 25,
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
    id: 'nicoise', fr: 'Salade niçoise', en: 'Niçoise salad', icon: '🥗', course: 'starter', time: 20,
    ing: 'salad 1; tuna 1 can; egg 2; tomato 2; green_beans 100 g?; olives 10?; potato 2?; oil 3 tbsp; vinegar 1 tbsp',
    steps: [
      ['Faites cuire les œufs durs (et les pommes de terre, haricots).', 'Hard-boil the eggs (and cook the potatoes and beans).', 10],
      ['Coupez tomates et œufs en quartiers.', 'Quarter the tomatoes and eggs.'],
      ['Assemblez avec la salade, le thon et les olives, assaisonnez.', 'Assemble with lettuce, tuna and olives, dress.'],
    ],
  }),
  r({
    id: 'tomato_mozza', fr: 'Salade tomate-mozzarella', en: 'Caprese salad', icon: '🍅', course: 'starter', time: 10,
    ing: 'tomato 3; mozzarella 125 g; basil?; oil 2 tbsp; salt; pepper',
    steps: [
      ['Coupez tomates et mozzarella en tranches.', 'Slice the tomatoes and mozzarella.'],
      ['Alternez-les dans un plat, ajoutez basilic, huile, sel et poivre.', 'Alternate on a plate, add basil, oil, salt and pepper.'],
    ],
  }),
  r({
    id: 'carrot_salad', fr: 'Carottes râpées', en: 'Grated carrot salad', icon: '🥕', course: 'starter', time: 10,
    ing: 'carrot 4; lemon 1; oil 2 tbsp; parsley?; raisins 30 g?',
    steps: [
      ['Râpez les carottes.', 'Grate the carrots.'],
      ['Assaisonnez avec citron, huile, sel et persil.', 'Dress with lemon, oil, salt and parsley.'],
    ],
  }),
  r({
    id: 'cucumber_yogurt', fr: 'Concombre au yaourt', en: 'Cucumber yogurt salad', icon: '🥒', course: 'starter', time: 10,
    ing: 'cucumber 1; yogurt 1; garlic 1 clove?; chives?; lemon 1?; salt',
    steps: [
      ['Coupez le concombre en fines rondelles, salez.', 'Thinly slice the cucumber and salt it.'],
      ['Mélangez avec le yaourt, l’ail, la ciboulette et un peu de citron.', 'Mix with yogurt, garlic, chives and a little lemon.'],
    ],
  }),
  r({
    id: 'hummus', fr: 'Houmous', en: 'Hummus', icon: '🫘', course: 'starter', time: 10, serv: 4,
    ing: 'chickpeas 400 g; lemon 1; garlic 1 clove; oil 3 tbsp; cumin 1 pinch?; sesame 1 tbsp?; water 3 tbsp',
    steps: [
      ['Égouttez les pois chiches en gardant un peu de jus.', 'Drain the chickpeas, keeping a little liquid.'],
      ['Mixez tous les ingrédients jusqu’à obtenir une texture lisse, en ajoutant de l’eau si besoin.', 'Blend everything until smooth, adding water as needed.'],
    ],
  }),
  r({
    id: 'guacamole', fr: 'Guacamole', en: 'Guacamole', icon: '🥑', course: 'starter', time: 10,
    ing: 'avocado 2; lemon 1; tomato 1?; onion 1?; coriander?; chili 1 pinch?; salt',
    steps: [
      ['Écrasez les avocats avec le jus de citron.', 'Mash the avocados with lemon juice.'],
      ['Ajoutez tomate, oignon, coriandre finement hachés, sel et piment.', 'Add finely chopped tomato, onion, coriander, salt and chili.'],
    ],
  }),
  r({
    id: 'lentil_salad', fr: 'Salade de lentilles', en: 'Lentil salad', icon: '🥗', course: 'starter', time: 30,
    ing: 'lentils 150 g; shallot 1; mustard 1 tsp; vinegar 1 tbsp; oil 3 tbsp; parsley?; carrot 1?; feta 60 g?',
    steps: [
      ['Faites cuire les lentilles, égouttez et laissez tiédir.', 'Cook the lentils, drain and cool.', 20],
      ['Préparez une vinaigrette moutarde-vinaigre-huile.', 'Make a mustard-vinegar-oil dressing.'],
      ['Mélangez avec l’échalote, la carotte, le persil (et la feta).', 'Toss with shallot, carrot, parsley (and feta).'],
    ],
  }),
  // ---------- Desserts ----------
  r({
    id: 'banana_bread', fr: 'Banana bread', en: 'Banana bread', icon: '🍌', course: 'dessert', time: 60, serv: 6,
    ing: 'banana 3; flour 200 g; egg 2; sugar 80 g; butter 80 g; baking_powder 1 tsp; nuts 50 g?; chocolate 50 g?',
    steps: [
      ['Préchauffez le four à 180 °C.', 'Preheat the oven to 180 °C.'],
      ['Écrasez les bananes bien mûres, mélangez avec œufs, sucre et beurre fondu.', 'Mash the ripe bananas, mix with eggs, sugar and melted butter.'],
      ['Ajoutez farine et levure (et noix ou chocolat), versez dans un moule à cake.', 'Add flour and baking powder (and nuts or chocolate), pour into a loaf tin.'],
      ['Enfournez.', 'Bake.', 45],
    ],
  }),
  r({
    id: 'apple_crumble', fr: 'Crumble aux pommes', en: 'Apple crumble', icon: '🍎', course: 'dessert', time: 45, serv: 4,
    ing: 'apple 4; flour 100 g; butter 70 g; sugar 80 g; cinnamon 1 pinch?; oats 30 g?',
    steps: [
      ['Préchauffez le four à 180 °C. Coupez les pommes en dés dans un plat.', 'Preheat the oven to 180 °C. Dice the apples into a dish.'],
      ['Sablez du bout des doigts farine, sucre et beurre froid (et avoine).', 'Rub flour, sugar and cold butter (and oats) into crumbs.'],
      ['Couvrez les fruits de crumble et enfournez.', 'Cover the fruit with crumble and bake.', 30],
    ],
  }),
  r({
    id: 'yogurt_cake', fr: 'Gâteau au yaourt', en: 'Yogurt cake', icon: '🍰', course: 'dessert', time: 45, serv: 6,
    ing: 'yogurt 1; egg 3; flour 250 g; sugar 150 g; oil 80 ml; baking_powder 1 tsp; lemon 1?; vanilla?',
    steps: [
      ['Préchauffez le four à 180 °C.', 'Preheat the oven to 180 °C.'],
      ['Mélangez yaourt, œufs, sucre puis farine, levure et huile (le pot de yaourt sert de mesure !).', 'Mix yogurt, eggs, sugar, then flour, baking powder and oil (use the yogurt pot to measure!).'],
      ['Versez dans un moule beurré et enfournez.', 'Pour into a greased tin and bake.', 35],
    ],
  }),
  r({
    id: 'chocolate_mousse', fr: 'Mousse au chocolat', en: 'Chocolate mousse', icon: '🍫', course: 'dessert', time: 20, serv: 4, diff: 2,
    ing: 'chocolate 200 g; egg 6; sugar 1 tbsp?; salt 1 pinch',
    steps: [
      ['Faites fondre le chocolat doucement.', 'Gently melt the chocolate.'],
      ['Séparez les blancs des jaunes. Mélangez les jaunes au chocolat tiédi.', 'Separate the eggs. Stir the yolks into the cooled chocolate.'],
      ['Montez les blancs en neige ferme avec le sel (et le sucre), incorporez délicatement.', 'Whisk the whites to stiff peaks with salt (and sugar), fold in gently.'],
      ['Réservez au frais au moins 2 heures.', 'Chill for at least 2 hours.', 120],
    ],
  }),
  r({
    id: 'rice_pudding', fr: 'Riz au lait', en: 'Rice pudding', icon: '🍚', course: 'dessert', time: 45, serv: 4,
    ing: 'rice 100 g; milk 1000 ml; sugar 80 g; vanilla?; cinnamon 1 pinch?',
    steps: [
      ['Portez le lait à ébullition avec la vanille.', 'Bring the milk to the boil with the vanilla.'],
      ['Ajoutez le riz et laissez cuire à feu très doux en remuant souvent.', 'Add the rice and cook very gently, stirring often.', 35],
      ['Ajoutez le sucre en fin de cuisson.', 'Stir in the sugar at the end.'],
    ],
  }),
  r({
    id: 'banana_pancakes', fr: 'Pancakes à la banane', en: 'Banana pancakes', icon: '🥞', course: 'dessert', time: 15,
    ing: 'banana 1; egg 2; flour 60 g?; oats 40 g?; baking_powder 1 pinch?; oil 1 tsp',
    steps: [
      ['Écrasez la banane, ajoutez les œufs (et farine ou avoine, levure).', 'Mash the banana, add the eggs (and flour or oats, baking powder).'],
      ['Faites cuire de petites louches dans une poêle huilée, 1 à 2 minutes par face.', 'Cook small ladlefuls in an oiled pan, 1–2 minutes per side.', 6],
    ],
  }),
  r({
    id: 'baked_apples', fr: 'Pommes au four', en: 'Baked apples', icon: '🍎', course: 'dessert', time: 35,
    ing: 'apple 2; butter 20 g; sugar 2 tbsp; cinnamon 1 pinch?; honey 1 tbsp?; nuts 20 g?',
    steps: [
      ['Préchauffez le four à 180 °C. Évidez les pommes.', 'Preheat the oven to 180 °C. Core the apples.'],
      ['Garnissez de beurre, sucre, cannelle (et noix), arrosez de miel.', 'Fill with butter, sugar, cinnamon (and nuts), drizzle with honey.'],
      ['Enfournez jusqu’à ce qu’elles soient fondantes.', 'Bake until soft.', 25],
    ],
  }),
  r({
    id: 'fruit_salad', fr: 'Salade de fruits', en: 'Fruit salad', icon: '🍓', course: 'dessert', time: 10, serv: 3,
    ing: 'apple 1?; banana 1?; orange 1?; pear 1?; strawberry 150 g?; lemon 1; sugar 1 tbsp?',
    steps: [
      ['Coupez tous les fruits disponibles en morceaux.', 'Chop whatever fruit you have.'],
      ['Arrosez de jus de citron (et d’un peu de sucre), mélangez et servez frais.', 'Drizzle with lemon juice (and a little sugar), toss and serve chilled.'],
    ],
  }),

  // ---------- Lot 2 : recettes du quotidien, peu d'ingrédients obligatoires ----------
  // Œufs
  r({
    id: 'scrambled_eggs', fr: 'Œufs brouillés crémeux', en: 'Creamy scrambled eggs', icon: '🍳', course: 'main', time: 10,
    ing: 'egg 4; butter 15 g; cream 1 tbsp?; chives 1 tbsp?; bread 2 slice?; salt; pepper',
    steps: [
      ['Battez les œufs avec sel et poivre.', 'Beat the eggs with salt and pepper.'],
      ['Faites fondre le beurre à feu doux, versez les œufs et remuez sans arrêt.', 'Melt the butter over low heat, add the eggs and stir constantly.', 4],
      ['Hors du feu, ajoutez la crème et la ciboulette. Servez sur du pain grillé.', 'Off the heat, stir in the cream and chives. Serve on toast.'],
    ],
  }),
  r({
    id: 'eggs_cocotte', fr: 'Œufs cocotte à la crème', en: 'Baked eggs with cream', icon: '🥚', course: 'starter', time: 15,
    ing: 'egg 4; cream 4 tbsp; ham 1 slice?; emmental 30 g?; chives 1 tbsp?; butter 10 g; salt; pepper',
    steps: [
      ['Préchauffez le four à 180 °C et beurrez 4 ramequins.', 'Preheat the oven to 180 °C and butter 4 ramekins.'],
      ['Mettez un peu de jambon et de crème au fond, cassez un œuf dans chaque ramequin.', 'Put a little ham and cream in each, then crack in an egg.'],
      ['Ajoutez fromage, sel, poivre et faites cuire au bain-marie au four.', 'Top with cheese, season and bake in a water bath.', 10],
    ],
  }),
  r({
    id: 'tortilla_espanola', fr: 'Tortilla espagnole', en: 'Spanish omelette', icon: '🥔', course: 'main', time: 35, serv: 3,
    ing: 'egg 5; potato 400 g; onion 1; oil 4 tbsp; salt',
    steps: [
      ['Coupez pommes de terre et oignon en fines tranches.', 'Thinly slice the potatoes and onion.'],
      ['Faites-les cuire doucement dans l’huile jusqu’à ce qu’ils soient tendres.', 'Cook them gently in the oil until tender.', 15],
      ['Mélangez-les aux œufs battus salés, remettez dans la poêle à feu doux.', 'Mix with the salted beaten eggs and return to the pan over low heat.', 8],
      ['Retournez à l’aide d’une assiette et faites cuire l’autre face.', 'Flip using a plate and cook the other side.', 3],
    ],
  }),
  r({
    id: 'egg_custard', fr: 'Œufs au lait', en: 'Baked egg custard', icon: '🍮', course: 'dessert', time: 50, serv: 4,
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
    id: 'ham_cheese_pasta', fr: 'Coquillettes jambon-fromage', en: 'Ham & cheese pasta', icon: '🧀', course: 'main', time: 15,
    ing: 'pasta 200 g; ham 2 slice; emmental 60 g; butter 15 g; cream 2 tbsp?; salt; pepper',
    steps: [
      ['Faites cuire les pâtes dans l’eau salée.', 'Cook the pasta in salted water.', 9],
      ['Égouttez, remettez dans la casserole avec le beurre (et la crème).', 'Drain and return to the pan with the butter (and cream).'],
      ['Ajoutez le jambon en dés et le fromage, mélangez jusqu’à ce qu’il fonde.', 'Add the diced ham and cheese, stir until melted.'],
    ],
  }),
  r({
    id: 'pesto_pasta', fr: 'Pâtes au pesto', en: 'Pesto pasta', icon: '🌿', course: 'main', time: 15,
    ing: 'pasta 200 g; pesto 3 tbsp; parmesan 30 g?; tomato 1?; basil 1 tbsp?; salt',
    steps: [
      ['Faites cuire les pâtes dans l’eau salée.', 'Cook the pasta in salted water.', 10],
      ['Égouttez en gardant un peu d’eau de cuisson.', 'Drain, keeping a little pasta water.'],
      ['Mélangez avec le pesto, un peu d’eau de cuisson, les tomates en dés et le parmesan.', 'Toss with the pesto, a splash of pasta water, diced tomato and parmesan.'],
    ],
  }),
  r({
    id: 'tomato_pasta', fr: 'Pâtes sauce tomate maison', en: 'Pasta with homemade tomato sauce', icon: '🍅', course: 'main', time: 25,
    ing: 'pasta 200 g; canned_tomato 400 g; garlic 2 clove; onion 1?; herbs 1 tsp?; basil 1 tbsp?; parmesan 30 g?; oil 2 tbsp; sugar 1 pinch; salt',
    steps: [
      ['Faites revenir l’ail (et l’oignon) dans l’huile.', 'Sauté the garlic (and onion) in the oil.', 3],
      ['Ajoutez tomates, herbes, sucre et sel, laissez réduire.', 'Add tomatoes, herbs, sugar and salt, simmer to reduce.', 15],
      ['Pendant ce temps, faites cuire les pâtes.', 'Meanwhile, cook the pasta.', 10],
      ['Mélangez, servez avec basilic et parmesan.', 'Toss together, serve with basil and parmesan.'],
    ],
  }),
  r({
    id: 'zucchini_pasta', fr: 'Pâtes à la courgette et au citron', en: 'Zucchini lemon pasta', icon: '🥒', course: 'main', time: 20,
    ing: 'pasta 200 g; zucchini 1; garlic 1 clove; lemon 1?; goat_cheese 60 g?; parmesan 30 g?; oil 2 tbsp; salt; pepper',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Râpez ou coupez la courgette en dés, faites-la revenir avec l’ail dans l’huile.', 'Grate or dice the zucchini, sauté with the garlic in the oil.', 6],
      ['Mélangez avec les pâtes, le zeste et le jus de citron, le fromage émietté.', 'Toss with the pasta, lemon zest and juice, and the crumbled cheese.'],
    ],
  }),
  r({
    id: 'salmon_pasta', fr: 'Pâtes au saumon et à la crème', en: 'Creamy salmon pasta', icon: '🐟', course: 'main', time: 20,
    ing: 'pasta 200 g; salmon 150 g; cream 150 ml; lemon 1?; chives 1 tbsp?; salt; pepper',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites chauffer la crème, ajoutez le saumon en morceaux et laissez cuire doucement.', 'Warm the cream, add the salmon in pieces and cook gently.', 5],
      ['Ajoutez un filet de citron et la ciboulette, mélangez aux pâtes.', 'Add a squeeze of lemon and the chives, toss with the pasta.'],
    ],
  }),
  r({
    id: 'broccoli_pasta', fr: 'Pâtes au brocoli et parmesan', en: 'Broccoli parmesan pasta', icon: '🥦', course: 'main', time: 20,
    ing: 'pasta 200 g; broccoli 1; garlic 2 clove; parmesan 40 g?; chili 1 pinch?; oil 3 tbsp; salt',
    steps: [
      ['Faites cuire pâtes et fleurettes de brocoli dans la même eau salée.', 'Cook the pasta and broccoli florets in the same salted water.', 10],
      ['Faites dorer l’ail (et le piment) dans l’huile.', 'Gently fry the garlic (and chili) in the oil.', 2],
      ['Égouttez, mélangez avec l’huile à l’ail et le parmesan en écrasant un peu le brocoli.', 'Drain, toss with the garlic oil and parmesan, lightly crushing the broccoli.'],
    ],
  }),
  r({
    id: 'spinach_pasta', fr: 'Pâtes épinards et fromage frais', en: 'Spinach & cream cheese pasta', icon: '🥬', course: 'main', time: 20,
    ing: 'pasta 200 g; spinach 150 g; cream_cheese 100 g; garlic 1 clove; parmesan 30 g?; nutmeg 1 pinch?; salt; pepper',
    steps: [
      ['Faites cuire les pâtes.', 'Cook the pasta.', 10],
      ['Faites tomber les épinards avec l’ail dans une poêle.', 'Wilt the spinach with the garlic in a pan.', 3],
      ['Ajoutez le fromage frais, un peu d’eau de cuisson, puis les pâtes. Assaisonnez.', 'Add the cream cheese, a splash of pasta water, then the pasta. Season.'],
    ],
  }),
  r({
    id: 'pasta_salad', fr: 'Salade de pâtes', en: 'Pasta salad', icon: '🥗', course: 'main', time: 20,
    ing: 'pasta 200 g; tomato 2; mozzarella 125 g?; ham 2 slice?; olives 10?; pesto 2 tbsp?; basil 1 tbsp?; vinegar 1 tbsp; oil 3 tbsp; salt',
    steps: [
      ['Faites cuire les pâtes, rincez-les à l’eau froide.', 'Cook the pasta, rinse under cold water.', 10],
      ['Coupez tomates, mozzarella et jambon en dés.', 'Dice the tomatoes, mozzarella and ham.'],
      ['Mélangez le tout avec l’huile, le vinaigre (ou le pesto) et le basilic.', 'Toss everything with the oil, vinegar (or pesto) and basil.'],
    ],
  }),

  // Riz, céréales, féculents
  r({
    id: 'tuna_rice_salad', fr: 'Salade de riz au thon', en: 'Tuna rice salad', icon: '🍚', course: 'main', time: 20,
    ing: 'rice 200 g; tuna 1 can; tomato 2; corn 150 g?; egg 2?; olives 10?; vinegar 1 tbsp; oil 3 tbsp; salt',
    steps: [
      ['Faites cuire le riz (et les œufs 10 min pour les durcir), laissez refroidir.', 'Cook the rice (and hard-boil the eggs for 10 min), let cool.', 12],
      ['Coupez les tomates et les œufs.', 'Chop the tomatoes and eggs.'],
      ['Mélangez riz, thon, légumes, huile et vinaigre.', 'Mix rice, tuna, vegetables, oil and vinegar.'],
    ],
  }),
  r({
    id: 'chorizo_rice', fr: 'Riz au chorizo et poivron', en: 'Chorizo & pepper rice', icon: '🥘', course: 'main', time: 30, serv: 3,
    ing: 'rice 200 g; chorizo 100 g; bell_pepper 1; onion 1; canned_tomato 200 g?; paprika 1 tsp?; stock 1?; water 500 ml; oil 1 tbsp',
    steps: [
      ['Faites revenir oignon, poivron et chorizo en dés.', 'Sauté onion, pepper and diced chorizo.', 5],
      ['Ajoutez le riz, remuez 1 minute, puis tomates, paprika, bouillon et eau.', 'Add the rice, stir for 1 minute, then tomatoes, paprika, stock and water.'],
      ['Couvrez et laissez cuire jusqu’à absorption.', 'Cover and cook until absorbed.', 18],
    ],
  }),
  r({
    id: 'tabbouleh', fr: 'Taboulé', en: 'Tabbouleh', icon: '🥗', course: 'starter', time: 20, serv: 4,
    ing: 'couscous 150 g; tomato 2; cucumber 1; lemon 1; parsley 1 bunch?; onion 1?; oil 4 tbsp; water 150 ml; salt',
    steps: [
      ['Versez l’eau bouillante salée sur la semoule, couvrez 5 minutes puis égrainez.', 'Pour boiling salted water over the couscous, cover 5 minutes, then fluff.', 5],
      ['Coupez tomates, concombre (et oignon) en petits dés, hachez le persil.', 'Finely dice tomatoes, cucumber (and onion), chop the parsley.'],
      ['Mélangez avec le jus de citron et l’huile, laissez reposer au frais.', 'Mix with the lemon juice and oil, chill before serving.'],
    ],
  }),
  r({
    id: 'sauteed_potatoes', fr: 'Pommes de terre sautées', en: 'Pan-fried potatoes', icon: '🥔', course: 'main', time: 30,
    ing: 'potato 600 g; garlic 2 clove?; onion 1?; parsley 1 tbsp?; bacon 100 g?; oil 3 tbsp; salt',
    steps: [
      ['Coupez les pommes de terre en dés.', 'Dice the potatoes.'],
      ['Faites-les dorer dans l’huile à feu moyen en remuant souvent.', 'Brown them in the oil over medium heat, stirring often.', 20],
      ['Ajoutez oignon, lardons et ail en fin de cuisson, parsemez de persil.', 'Add onion, bacon and garlic towards the end, sprinkle with parsley.', 5],
    ],
  }),
  r({
    id: 'sausage_potatoes', fr: 'Poêlée saucisses et pommes de terre', en: 'Sausage & potato skillet', icon: '🌭', course: 'main', time: 35,
    ing: 'sausage 4; potato 500 g; onion 1; bell_pepper 1?; herbs 1 tsp?; oil 2 tbsp; salt',
    steps: [
      ['Faites précuire les pommes de terre en dés 8 minutes dans l’eau salée.', 'Parboil the diced potatoes in salted water for 8 minutes.', 8],
      ['Faites dorer les saucisses dans l’huile, retirez-les et coupez-les.', 'Brown the sausages in the oil, remove and slice them.', 8],
      ['Faites rissoler pommes de terre, oignon et poivron, remettez les saucisses.', 'Fry the potatoes, onion and pepper, return the sausages.', 12],
    ],
  }),
  r({
    id: 'noodle_soup', fr: 'Soupe de nouilles', en: 'Noodle soup', icon: '🍜', course: 'main', time: 20,
    ing: 'noodles 150 g; stock 1; water 800 ml; soy_sauce 2 tbsp; egg 2?; carrot 1?; mushroom 100 g?; chicken 150 g?; ginger 1 tsp?',
    steps: [
      ['Portez l’eau à ébullition avec le bouillon, la sauce soja et le gingembre.', 'Bring the water to a boil with the stock, soy sauce and ginger.'],
      ['Ajoutez les légumes et le poulet en fines lamelles.', 'Add the vegetables and thinly sliced chicken.', 6],
      ['Ajoutez les nouilles (et les œufs mollets à part).', 'Add the noodles (and soft-boiled eggs cooked separately).', 4],
    ],
  }),

  // Viandes & poissons
  r({
    id: 'chicken_lemon_honey', fr: 'Poulet au miel et citron', en: 'Honey lemon chicken', icon: '🍗', course: 'main', time: 25,
    ing: 'chicken 300 g; honey 2 tbsp; lemon 1; garlic 1 clove; soy_sauce 1 tbsp?; rice 200 g?; oil 1 tbsp',
    steps: [
      ['Faites dorer le poulet en morceaux dans l’huile.', 'Brown the chicken pieces in the oil.', 8],
      ['Ajoutez ail, miel, jus de citron (et soja), laissez caraméliser.', 'Add garlic, honey, lemon juice (and soy), let it caramelise.', 5],
      ['Servez avec du riz.', 'Serve with rice.'],
    ],
  }),
  r({
    id: 'chicken_tomato_rice', fr: 'Riz au poulet et à la tomate', en: 'Chicken & tomato rice', icon: '🍛', course: 'main', time: 30, serv: 3,
    ing: 'chicken 300 g; rice 200 g; tomato 3; onion 1; garlic 1 clove?; paprika 1 tsp?; herbs 1 tsp?; stock 1?; water 500 ml; oil 1 tbsp; salt',
    steps: [
      ['Faites dorer le poulet en dés et l’oignon dans l’huile.', 'Brown the diced chicken and onion in the oil.', 6],
      ['Ajoutez les tomates en morceaux, l’ail et les épices, puis le riz.', 'Add the chopped tomatoes, garlic and spices, then the rice.'],
      ['Versez l’eau (et le bouillon), couvrez et laissez cuire jusqu’à absorption.', 'Pour in the water (and stock), cover and cook until absorbed.', 18],
    ],
  }),
  r({
    id: 'chicken_basquaise', fr: 'Poulet basquaise', en: 'Basque-style chicken', icon: '🫑', course: 'main', time: 40, serv: 3,
    ing: 'chicken 400 g; bell_pepper 2; canned_tomato 400 g; onion 1; garlic 2 clove; paprika 1 tsp?; chili 1 pinch?; rice 200 g?; oil 2 tbsp',
    steps: [
      ['Faites dorer le poulet dans l’huile, réservez.', 'Brown the chicken in the oil, set aside.', 6],
      ['Faites revenir oignon, poivrons et ail.', 'Sauté onion, peppers and garlic.', 6],
      ['Ajoutez tomates, épices et poulet, laissez mijoter à couvert.', 'Add tomatoes, spices and chicken, simmer covered.', 25],
    ],
  }),
  r({
    id: 'chicken_wrap', fr: 'Wraps poulet-crudités', en: 'Chicken salad wraps', icon: '🌯', course: 'main', time: 20,
    ing: 'tortilla 4; chicken 250 g; salad 1?; tomato 1?; yogurt 3 tbsp?; emmental 40 g?; paprika 1 tsp?; oil 1 tbsp',
    steps: [
      ['Faites cuire le poulet en lamelles avec le paprika.', 'Cook the sliced chicken with the paprika.', 8],
      ['Garnissez les tortillas de salade, tomate, poulet, fromage et yaourt.', 'Fill the tortillas with lettuce, tomato, chicken, cheese and yogurt.'],
      ['Roulez bien serré et coupez en deux.', 'Roll tightly and cut in half.'],
    ],
  }),
  r({
    id: 'turkey_cream', fr: 'Escalopes de dinde à la crème', en: 'Turkey in cream sauce', icon: '🍗', course: 'main', time: 25,
    ing: 'turkey 300 g; cream 150 ml; mushroom 200 g?; shallot 1?; mustard 1 tsp?; rice 200 g?; butter 15 g',
    steps: [
      ['Faites dorer les escalopes au beurre, réservez.', 'Brown the escalopes in butter, set aside.', 6],
      ['Faites revenir échalote et champignons dans la même poêle.', 'Sauté shallot and mushrooms in the same pan.', 5],
      ['Ajoutez crème et moutarde, remettez la dinde et laissez mijoter.', 'Add cream and mustard, return the turkey and simmer.', 6],
    ],
  }),
  r({
    id: 'meatballs_tomato', fr: 'Boulettes sauce tomate', en: 'Meatballs in tomato sauce', icon: '🍝', course: 'main', time: 40, serv: 3,
    ing: 'ground_beef 400 g; canned_tomato 400 g; onion 1; garlic 2 clove; egg 1?; bread 1 slice?; herbs 1 tsp?; pasta 250 g?; oil 2 tbsp; salt; pepper',
    steps: [
      ['Mélangez viande, œuf, pain émietté, sel et poivre, formez des boulettes.', 'Mix beef, egg, crumbled bread, salt and pepper, shape into balls.'],
      ['Faites-les dorer dans l’huile, réservez.', 'Brown them in the oil, set aside.', 8],
      ['Faites revenir oignon et ail, ajoutez tomates et herbes, puis les boulettes.', 'Sauté onion and garlic, add tomatoes and herbs, then the meatballs.'],
      ['Laissez mijoter, servez avec des pâtes.', 'Simmer and serve with pasta.', 20],
    ],
  }),
  r({
    id: 'stuffed_tomatoes', fr: 'Tomates farcies', en: 'Stuffed tomatoes', icon: '🍅', course: 'main', time: 50, serv: 4,
    ing: 'tomato 6; ground_beef 350 g; onion 1; garlic 1 clove; bread 1 slice?; herbs 1 tsp?; parsley 1 tbsp?; rice 150 g?; oil 1 tbsp; salt; pepper',
    steps: [
      ['Préchauffez le four à 180 °C. Coupez le chapeau des tomates et videz-les.', 'Preheat the oven to 180 °C. Cut the tops off the tomatoes and hollow them.'],
      ['Mélangez viande, oignon, ail, pain et herbes. Farcissez les tomates.', 'Mix beef, onion, garlic, bread and herbs. Stuff the tomatoes.'],
      ['Enfournez avec le riz cru et un peu d’eau au fond du plat.', 'Bake with the raw rice and a little water in the dish.', 40],
    ],
  }),
  r({
    id: 'beef_stirfry', fr: 'Bœuf sauté aux oignons', en: 'Beef & onion stir-fry', icon: '🥩', course: 'main', time: 20,
    ing: 'beef 300 g; onion 2; soy_sauce 3 tbsp; garlic 1 clove; bell_pepper 1?; ginger 1 tsp?; sesame 1 tbsp?; rice 200 g?; oil 2 tbsp',
    steps: [
      ['Coupez le bœuf en fines lamelles, les oignons en quartiers.', 'Slice the beef thinly and the onions into wedges.'],
      ['Saisissez le bœuf à feu très vif, réservez.', 'Sear the beef over very high heat, set aside.', 2],
      ['Faites sauter oignons, ail, poivron, remettez le bœuf avec le soja.', 'Stir-fry onions, garlic and pepper, return the beef with the soy sauce.', 5],
    ],
  }),
  r({
    id: 'honey_soy_pork', fr: 'Porc caramélisé miel-soja', en: 'Honey soy pork', icon: '🍖', course: 'main', time: 25,
    ing: 'pork 400 g; honey 2 tbsp; soy_sauce 3 tbsp; garlic 2 clove; sesame 1 tbsp?; rice 200 g?; oil 1 tbsp',
    steps: [
      ['Coupez le porc en morceaux et faites-le dorer dans l’huile.', 'Cut the pork into pieces and brown in the oil.', 8],
      ['Ajoutez ail, miel et soja, laissez caraméliser en remuant.', 'Add garlic, honey and soy, stir until caramelised.', 5],
      ['Parsemez de sésame, servez avec du riz.', 'Sprinkle with sesame, serve with rice.'],
    ],
  }),
  r({
    id: 'garlic_shrimp', fr: 'Crevettes à l’ail', en: 'Garlic butter shrimp', icon: '🦐', course: 'main', time: 15,
    ing: 'shrimp 300 g; garlic 3 clove; butter 30 g; lemon 1?; parsley 1 tbsp?; chili 1 pinch?; rice 200 g?',
    steps: [
      ['Faites fondre le beurre, ajoutez l’ail haché (et le piment).', 'Melt the butter, add the chopped garlic (and chili).', 1],
      ['Ajoutez les crevettes et faites-les sauter jusqu’à ce qu’elles soient roses.', 'Add the shrimp and cook until pink.', 4],
      ['Finissez avec citron et persil.', 'Finish with lemon and parsley.'],
    ],
  }),
  r({
    id: 'fish_curry', fr: 'Curry de poisson au lait de coco', en: 'Coconut fish curry', icon: '🐟', course: 'main', time: 30, serv: 3,
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
    id: 'roasted_veg', fr: 'Légumes rôtis au four', en: 'Oven-roasted vegetables', icon: '🥕', course: 'main', time: 40,
    ing: 'potato 2?; carrot 2?; zucchini 1?; bell_pepper 1?; sweet_potato 1?; onion 1?; eggplant 1?; herbs 1 tsp?; oil 3 tbsp; salt',
    steps: [
      ['Préchauffez le four à 200 °C. Coupez les légumes en morceaux de même taille.', 'Preheat the oven to 200 °C. Cut the vegetables into even pieces.'],
      ['Mélangez avec l’huile, le sel et les herbes sur une plaque.', 'Toss with oil, salt and herbs on a tray.'],
      ['Enfournez en remuant à mi-cuisson.', 'Roast, stirring halfway through.', 30],
    ],
  }),
  r({
    id: 'veg_curry', fr: 'Curry de légumes', en: 'Vegetable curry', icon: '🍛', course: 'main', time: 35, serv: 3,
    ing: 'coconut_milk 400 ml; curry 1 tbsp; onion 1; potato 2?; carrot 2?; cauliflower 1?; peas 100 g?; chickpeas 400 g?; rice 200 g?; oil 1 tbsp',
    steps: [
      ['Faites revenir l’oignon avec le curry.', 'Sauté the onion with the curry powder.', 3],
      ['Ajoutez les légumes en morceaux et le lait de coco.', 'Add the chopped vegetables and the coconut milk.'],
      ['Laissez mijoter à couvert jusqu’à ce que les légumes soient tendres.', 'Simmer covered until the vegetables are tender.', 25],
    ],
  }),
  r({
    id: 'zucchini_gratin', fr: 'Gratin de courgettes', en: 'Zucchini gratin', icon: '🥒', course: 'main', time: 45, serv: 3,
    ing: 'zucchini 3; egg 2; cream 100 ml; emmental 60 g; garlic 1 clove?; salt; pepper',
    steps: [
      ['Préchauffez le four à 180 °C. Coupez les courgettes en rondelles et faites-les revenir.', 'Preheat the oven to 180 °C. Slice and sauté the zucchini.', 8],
      ['Disposez-les dans un plat, versez œufs et crème battus, parsemez de fromage.', 'Place in a dish, pour over the beaten eggs and cream, top with cheese.'],
      ['Enfournez jusqu’à ce que ce soit doré.', 'Bake until golden.', 30],
    ],
  }),
  r({
    id: 'cauliflower_gratin', fr: 'Gratin de chou-fleur', en: 'Cauliflower cheese', icon: '🥦', course: 'main', time: 45, serv: 4,
    ing: 'cauliflower 1; milk 400 ml; butter 30 g; flour 30 g; emmental 80 g; nutmeg 1 pinch?; salt',
    steps: [
      ['Faites cuire les fleurettes de chou-fleur dans l’eau salée.', 'Boil the cauliflower florets in salted water.', 8],
      ['Faites une béchamel : beurre fondu + farine, puis le lait en fouettant jusqu’à épaississement.', 'Make a white sauce: melted butter + flour, then whisk in the milk until thick.', 6],
      ['Nappez le chou-fleur, parsemez de fromage et gratinez à 200 °C.', 'Cover the cauliflower, top with cheese and bake at 200 °C.', 20],
    ],
  }),
  r({
    id: 'leek_potato_soup', fr: 'Soupe poireaux-pommes de terre', en: 'Leek & potato soup', icon: '🥣', course: 'starter', time: 35, serv: 4,
    ing: 'leek 2; potato 400 g; stock 1; water 1000 ml; butter 15 g?; cream 2 tbsp?; salt',
    steps: [
      ['Émincez les poireaux et faites-les fondre (au beurre).', 'Slice the leeks and soften them (in butter).', 5],
      ['Ajoutez les pommes de terre en dés, l’eau et le bouillon.', 'Add the diced potatoes, water and stock.'],
      ['Laissez cuire puis mixez, ajoutez la crème.', 'Simmer, then blend and stir in the cream.', 25],
    ],
  }),
  r({
    id: 'carrot_soup', fr: 'Velouté de carottes au cumin', en: 'Carrot & cumin soup', icon: '🥕', course: 'starter', time: 35, serv: 4,
    ing: 'carrot 600 g; onion 1; stock 1; water 800 ml; cumin 1 tsp?; cream 2 tbsp?; oil 1 tbsp; salt',
    steps: [
      ['Faites revenir l’oignon dans l’huile avec le cumin.', 'Sauté the onion in the oil with the cumin.', 3],
      ['Ajoutez les carottes en rondelles, l’eau et le bouillon.', 'Add the sliced carrots, water and stock.'],
      ['Laissez cuire puis mixez, servez avec un peu de crème.', 'Simmer, then blend and serve with a little cream.', 25],
    ],
  }),
  r({
    id: 'leek_tart', fr: 'Tarte aux poireaux', en: 'Leek tart', icon: '🥧', course: 'main', time: 50, serv: 4,
    ing: 'puff_pastry 1; leek 3; egg 3; cream 200 ml; emmental 50 g?; bacon 100 g?; butter 15 g; nutmeg 1 pinch?; salt',
    steps: [
      ['Préchauffez le four à 180 °C. Faites fondre les poireaux émincés au beurre.', 'Preheat the oven to 180 °C. Soften the sliced leeks in butter.', 10],
      ['Étalez la pâte dans un moule, garnissez de poireaux (et lardons).', 'Line a tin with the pastry, fill with leeks (and bacon).'],
      ['Versez œufs et crème battus, parsemez de fromage, enfournez.', 'Pour over the beaten eggs and cream, top with cheese, bake.', 35],
    ],
  }),
  r({
    id: 'tomato_mustard_tart', fr: 'Tarte fine tomate-moutarde', en: 'Tomato mustard tart', icon: '🍅', course: 'main', time: 40, serv: 4,
    ing: 'puff_pastry 1; tomato 4; mustard 2 tbsp; emmental 50 g?; herbs 1 tsp?; oil 1 tbsp',
    steps: [
      ['Préchauffez le four à 200 °C. Étalez la pâte et tartinez-la de moutarde.', 'Preheat the oven to 200 °C. Roll out the pastry and spread with mustard.'],
      ['Disposez les tomates en rondelles, (le fromage), les herbes et un filet d’huile.', 'Arrange sliced tomatoes, (cheese), herbs and a drizzle of oil.'],
      ['Enfournez jusqu’à ce que la pâte soit dorée.', 'Bake until the pastry is golden.', 30],
    ],
  }),

  // Tartines & entrées
  r({
    id: 'avocado_toast', fr: 'Tartine avocat-œuf', en: 'Avocado egg toast', icon: '🥑', course: 'starter', time: 10,
    ing: 'bread 2 slice; avocado 1; egg 2?; lemon 1?; chili 1 pinch?; salt',
    steps: [
      ['Faites griller le pain (et cuire les œufs au plat ou mollets).', 'Toast the bread (and fry or soft-boil the eggs).', 5],
      ['Écrasez l’avocat avec citron et sel.', 'Mash the avocado with lemon and salt.'],
      ['Tartinez, posez l’œuf, parsemez de piment.', 'Spread on the toast, top with the egg and a pinch of chili.'],
    ],
  }),
  r({
    id: 'mushroom_toast', fr: 'Tartines champignons à la crème', en: 'Creamy mushroom toast', icon: '🍄', course: 'main', time: 15,
    ing: 'bread 4 slice; mushroom 250 g; cream 3 tbsp; garlic 1 clove; parsley 1 tbsp?; butter 10 g; salt',
    steps: [
      ['Faites revenir les champignons émincés au beurre avec l’ail.', 'Sauté the sliced mushrooms in butter with the garlic.', 6],
      ['Ajoutez la crème et laissez épaissir.', 'Add the cream and let it thicken.', 2],
      ['Versez sur le pain grillé, parsemez de persil.', 'Spoon onto toasted bread, sprinkle with parsley.'],
    ],
  }),
  r({
    id: 'pizza_toast', fr: 'Tartines façon pizza', en: 'Pizza toasts', icon: '🍕', course: 'main', time: 15,
    ing: 'bread 4 slice; canned_tomato 4 tbsp; mozzarella 125 g; ham 2 slice?; olives 6?; herbs 1 tsp?',
    steps: [
      ['Préchauffez le four en position gril.', 'Preheat the grill.'],
      ['Tartinez le pain de tomate, garnissez de jambon, mozzarella, olives et herbes.', 'Spread the bread with tomato, top with ham, mozzarella, olives and herbs.'],
      ['Faites gratiner.', 'Grill until bubbling.', 6],
    ],
  }),
  r({
    id: 'sardine_spread', fr: 'Rillettes de sardines', en: 'Sardine spread', icon: '🐟', course: 'starter', time: 10,
    ing: 'sardines 1 can; cream_cheese 100 g; lemon 1?; chives 1 tbsp?; bread 4 slice?; pepper',
    steps: [
      ['Égouttez les sardines et retirez l’arête centrale.', 'Drain the sardines and remove the backbone.'],
      ['Écrasez-les avec le fromage frais, le citron, la ciboulette et le poivre.', 'Mash with the cream cheese, lemon, chives and pepper.'],
      ['Servez frais sur du pain grillé.', 'Serve chilled on toast.'],
    ],
  }),
  r({
    id: 'greek_salad', fr: 'Salade grecque', en: 'Greek salad', icon: '🥗', course: 'starter', time: 10,
    ing: 'tomato 3; cucumber 1; feta 100 g; olives 10?; onion 1?; herbs 1 tsp?; oil 3 tbsp; salt',
    steps: [
      ['Coupez tomates, concombre et oignon en morceaux.', 'Chop the tomatoes, cucumber and onion.'],
      ['Ajoutez olives et feta en cubes.', 'Add the olives and cubed feta.'],
      ['Arrosez d’huile, parsemez d’herbes.', 'Drizzle with oil and sprinkle with herbs.'],
    ],
  }),
  r({
    id: 'coleslaw', fr: 'Coleslaw', en: 'Coleslaw', icon: '🥬', course: 'starter', time: 15, serv: 4,
    ing: 'cabbage 300 g; carrot 2; yogurt 3 tbsp; mustard 1 tsp; vinegar 1 tbsp; sugar 1 tsp; salt',
    steps: [
      ['Émincez finement le chou et râpez les carottes.', 'Finely shred the cabbage and grate the carrots.'],
      ['Mélangez yaourt, moutarde, vinaigre, sucre et sel.', 'Mix yogurt, mustard, vinegar, sugar and salt.'],
      ['Mélangez le tout et laissez reposer au frais.', 'Toss together and chill.'],
    ],
  }),
  r({
    id: 'beet_salad', fr: 'Salade de betterave', en: 'Beetroot salad', icon: '🫜', course: 'starter', time: 10,
    ing: 'beetroot 2; vinegar 1 tbsp; goat_cheese 60 g?; nuts 20 g?; shallot 1?; oil 2 tbsp; salt',
    steps: [
      ['Coupez la betterave cuite en dés.', 'Dice the cooked beetroot.'],
      ['Assaisonnez d’huile, de vinaigre et d’échalote hachée.', 'Dress with oil, vinegar and chopped shallot.'],
      ['Parsemez de chèvre émietté et de noix.', 'Top with crumbled goat cheese and walnuts.'],
    ],
  }),

  // Desserts
  r({
    id: 'pancakes', fr: 'Pancakes moelleux', en: 'Fluffy pancakes', icon: '🥞', course: 'dessert', time: 25, serv: 3,
    ing: 'flour 200 g; egg 2; milk 250 ml; sugar 2 tbsp; butter 20 g; baking_powder 1 tsp?; salt 1 pinch',
    steps: [
      ['Mélangez farine, sucre, levure et sel.', 'Mix flour, sugar, baking powder and salt.'],
      ['Ajoutez œufs, lait et beurre fondu, fouettez juste assez pour une pâte épaisse.', 'Add eggs, milk and melted butter, whisk just until a thick batter forms.'],
      ['Faites cuire des petites louches dans une poêle chaude, retournez quand des bulles apparaissent.', 'Cook small ladlefuls in a hot pan, flip when bubbles appear.', 10],
    ],
  }),
  r({
    id: 'chocolate_cake', fr: 'Gâteau au chocolat', en: 'Chocolate cake', icon: '🍫', course: 'dessert', time: 40, serv: 6,
    ing: 'chocolate 200 g; butter 150 g; egg 4; sugar 150 g; flour 50 g',
    steps: [
      ['Préchauffez le four à 180 °C. Faites fondre chocolat et beurre.', 'Preheat the oven to 180 °C. Melt the chocolate and butter.'],
      ['Fouettez œufs et sucre, ajoutez le chocolat fondu puis la farine.', 'Whisk eggs and sugar, add the melted chocolate then the flour.'],
      ['Versez dans un moule beurré et enfournez.', 'Pour into a buttered tin and bake.', 25],
    ],
  }),
  r({
    id: 'cookies', fr: 'Cookies aux pépites de chocolat', en: 'Chocolate chip cookies', icon: '🍪', course: 'dessert', time: 25, serv: 6,
    ing: 'flour 200 g; butter 100 g; sugar 100 g; egg 1; chocolate 100 g; baking_powder 1 tsp?; salt 1 pinch',
    steps: [
      ['Préchauffez le four à 180 °C. Mélangez beurre mou et sucre, puis l’œuf.', 'Preheat the oven to 180 °C. Cream the soft butter and sugar, then add the egg.'],
      ['Ajoutez farine, levure, sel et chocolat haché.', 'Add flour, baking powder, salt and chopped chocolate.'],
      ['Formez des boules sur une plaque et enfournez.', 'Shape into balls on a tray and bake.', 11],
    ],
  }),
  r({
    id: 'apple_tart', fr: 'Tarte fine aux pommes', en: 'Thin apple tart', icon: '🥧', course: 'dessert', time: 40, serv: 4,
    ing: 'puff_pastry 1; apple 3; sugar 2 tbsp; butter 20 g?; cinnamon 1 pinch?',
    steps: [
      ['Préchauffez le four à 200 °C. Étalez la pâte sur une plaque.', 'Preheat the oven to 200 °C. Roll the pastry onto a tray.'],
      ['Disposez les pommes en fines lamelles, saupoudrez de sucre (et cannelle), parsemez de beurre.', 'Arrange thin apple slices, sprinkle with sugar (and cinnamon), dot with butter.'],
      ['Enfournez jusqu’à ce que ce soit doré.', 'Bake until golden.', 25],
    ],
  }),
  r({
    id: 'yogurt_honey', fr: 'Yaourt miel et noix', en: 'Yogurt with honey & nuts', icon: '🍯', course: 'dessert', time: 5,
    ing: 'yogurt 2; honey 2 tbsp; nuts 30 g?; red_fruits 80 g?; banana 1?',
    steps: [
      ['Versez le yaourt dans des bols.', 'Spoon the yogurt into bowls.'],
      ['Arrosez de miel, ajoutez noix et fruits.', 'Drizzle with honey, add nuts and fruit.'],
    ],
  }),
  r({
    id: 'porridge', fr: 'Porridge', en: 'Porridge', icon: '🥣', course: 'dessert', time: 10,
    ing: 'oats 80 g; milk 300 ml; banana 1?; honey 1 tbsp?; cinnamon 1 pinch?; red_fruits 50 g?',
    steps: [
      ['Faites chauffer flocons et lait en remuant jusqu’à ce que ce soit crémeux.', 'Heat the oats and milk, stirring, until creamy.', 5],
      ['Servez avec banane, fruits, miel ou cannelle.', 'Serve topped with banana, fruit, honey or cinnamon.'],
    ],
  }),
  r({
    id: 'poached_pears', fr: 'Poires pochées', en: 'Poached pears', icon: '🍐', course: 'dessert', time: 30,
    ing: 'pear 4; sugar 100 g; water 700 ml; vanilla?; cinnamon 1 pinch?; chocolate 60 g?',
    steps: [
      ['Faites chauffer eau, sucre (et vanille, cannelle).', 'Heat the water with the sugar (and vanilla, cinnamon).'],
      ['Épluchez les poires et pochez-les dans le sirop frémissant.', 'Peel the pears and poach them in the simmering syrup.', 20],
      ['Servez tièdes, nappées de chocolat fondu.', 'Serve warm with melted chocolate.'],
    ],
  }),
  r({
    id: 'strawberries_cream', fr: 'Fraises à la crème', en: 'Strawberries and cream', icon: '🍓', course: 'dessert', time: 10,
    ing: 'strawberry 250 g; cream 150 ml; sugar 2 tbsp; vanilla?',
    steps: [
      ['Lavez et coupez les fraises, sucrez-les légèrement.', 'Wash and halve the strawberries, sweeten lightly.'],
      ['Fouettez la crème bien froide avec le reste du sucre (et la vanille).', 'Whip the well-chilled cream with the rest of the sugar (and vanilla).'],
      ['Servez les fraises avec la crème.', 'Serve the strawberries with the cream.'],
    ],
  }),
];
