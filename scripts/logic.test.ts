/**
 * Tests de la logique métier (sans React Native).
 * Lancer : npm test
 */
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { INGREDIENT_BY_ID, INGREDIENTS, PANTRY_IDS, QUICK_FILL_IDS } from '../src/data/ingredients';
import { FREE_RECIPES } from '../src/data/recipes';
import { PREMIUM_RECIPES } from '../src/data/recipesPremium';
import { SUBSTITUTIONS } from '../src/data/substitutions';
import { recipeDiets, recipeFitsProfile } from '../src/logic/diets';
import { planEmptyFridge } from '../src/logic/emptyFridge';
import { addDays, checkExpiryDate, daysLeft, expiryStatus, isUrgent, todayISO } from '../src/logic/expiry';
import { didYouMean, parseIngredientText, searchIngredients } from '../src/logic/ingredientSearch';
import { bestUnlock, evaluateRecipe, matchRecipes, PANTRY_RECIPE_IDS } from '../src/logic/matching';
import { formatQty, parseQtyInput, scaleQty } from '../src/logic/scaling';
import { parseCommand } from '../src/services/voiceParse';
import appConfig from '../app.config';
import { CONTACT_EMAIL, DEVELOPER_NAME } from '../src/config';
import { en } from '../src/i18n/en';
import { fr } from '../src/i18n/fr';
import { BADGES, progressCards, visibleBadges } from '../src/logic/badges';
import { formatMessage } from '../src/logic/text';
import { groupFridge, newFridgeEntries, searchIngredientsFrom } from '../src/logic/fridge';
import { homeCards, namesPreview, namesSentence, pantryIdeas, quickIdeas } from '../src/logic/home';

const ALL = [...FREE_RECIPES, ...PREMIUM_RECIPES];
const noFilter = { diets: [], allergies: [] };

test('données : ids uniques et références valides', () => {
  assert.equal(new Set(INGREDIENTS.map((i) => i.id)).size, INGREDIENTS.length);
  assert.equal(new Set(ALL.map((r) => r.id)).size, ALL.length);
  for (const r of ALL) {
    assert.ok(r.steps.length > 0, `${r.id} sans étape`);
    for (const ri of r.ingredients) assert.ok(INGREDIENT_BY_ID[ri.id], `${r.id} : ingrédient inconnu ${ri.id}`);
    for (const s of r.steps) assert.ok(s.text.fr && s.text.en, `${r.id} : traduction manquante`);
  }
  for (const [k, subs] of Object.entries(SUBSTITUTIONS)) {
    assert.ok(INGREDIENT_BY_ID[k], `substitution : ${k}`);
    for (const s of subs) for (const w of s.with) assert.ok(INGREDIENT_BY_ID[w], `substitution ${k} -> ${w}`);
  }
  for (const id of PANTRY_RECIPE_IDS) assert.ok(FREE_RECIPES.some((r) => r.id === id));
  assert.ok(QUICK_FILL_IDS.length >= 24 && QUICK_FILL_IDS.length <= 36, `grille : ${QUICK_FILL_IDS.length}`);
});

test('recherche : accents, pluriels, synonymes', () => {
  assert.equal(searchIngredients('oeufs')[0]?.ing.id, 'egg');
  assert.equal(searchIngredients('œuf')[0]?.ing.id, 'egg');
  assert.equal(searchIngredients('Tomates')[0]?.ing.id, 'tomato');
  assert.equal(searchIngredients('courgettes')[0]?.ing.id, 'zucchini');
  assert.equal(searchIngredients('gruyere')[0]?.ing.id, 'emmental');
  assert.equal(searchIngredients('eggs')[0]?.ing.id, 'egg');
  assert.equal(didYouMean('courgete')?.id, 'zucchini');
  assert.equal(searchIngredients('oeuf', new Set(['egg'])).some((h) => h.ing.id === 'egg'), false);
});

test('base placard jamais manquante', () => {
  const m = evaluateRecipe(FREE_RECIPES.find((r) => r.id === 'omelette')!, new Set(['egg', 'butter']));
  assert.deepEqual(m.missing, []);
  assert.ok(PANTRY_IDS.has('salt'));
});

test('tri par ingrédients manquants puis produits urgents', () => {
  const avail = new Set(['egg', 'milk', 'bread', 'butter']);
  const res = matchRecipes(FREE_RECIPES, avail, noFilter, { urgent: new Set(['milk']) });
  assert.ok(res.length > 0);
  for (let i = 1; i < res.length; i++) assert.ok(res[i - 1].missing.length <= res[i].missing.length);
  assert.equal(res[0].missing.length, 0);
  assert.ok(res.every((m) => m.missing.length <= 2));
  // pain perdu : tout est là et utilise le lait urgent
  assert.ok(res.slice(0, 3).some((m) => m.recipe.id === 'french_toast'));
});

test('substitution : crème -> lait + beurre', () => {
  const r = FREE_RECIPES.find((x) => x.id === 'chicken_mustard')!;
  const m = evaluateRecipe(r, new Set(['chicken', 'mustard', 'milk', 'butter']));
  assert.deepEqual(m.missing, []);
  assert.equal(m.substituted[0]?.missing, 'cream');
});

test('pertinence : pas de salade de fruits avec juste un citron', () => {
  const res = matchRecipes(FREE_RECIPES, new Set(['lemon']), noFilter);
  assert.ok(!res.some((m) => m.recipe.id === 'fruit_salad'));
});

test('régimes déduits des ingrédients obligatoires', () => {
  const carbo = FREE_RECIPES.find((r) => r.id === 'carbonara')!;
  assert.ok(!recipeDiets(carbo).includes('vegetarian'));
  const dahl = FREE_RECIPES.find((r) => r.id === 'lentil_dahl')!;
  assert.ok(recipeDiets(dahl).includes('vegan'));
  assert.ok(!recipeFitsProfile(carbo, [], ['egg']));
  const res = matchRecipes(FREE_RECIPES, new Set(['pasta', 'bacon', 'egg', 'parmesan', 'garlic']), { diets: ['vegetarian'], allergies: [] });
  assert.ok(!res.some((m) => m.recipe.id === 'carbonara'));
});

test('ingrédient qui débloque le plus de recettes', () => {
  const res = matchRecipes(FREE_RECIPES, new Set(['milk', 'flour', 'butter', 'sugar']), noFilter);
  const u = bestUnlock(res);
  assert.equal(u?.id, 'egg');
  assert.ok((u?.count ?? 0) >= 2);
});

test('portions : arrondis de cuisine', () => {
  assert.equal(scaleQty(3, 'pc', 0.5), 2); // 1,5 œuf -> 2
  assert.equal(scaleQty(4, 'pc', 0.5), 2);
  assert.equal(scaleQty(200, 'g', 1.5), 300);
  assert.equal(scaleQty(250, 'g', 1 / 3), 85);
  assert.equal(scaleQty(1, 'tbsp', 0.5), 0.5);
  assert.equal(formatQty({ id: 'x', qty: 1000, unit: 'ml' }, 1, 'fr'), '1 L');
  assert.equal(formatQty({ id: 'x', qty: 2, unit: 'clove' }, 1, 'fr'), '2 gousses');
  assert.equal(formatQty({ id: 'x', qty: 1, unit: 'tbsp' }, 1.5, 'fr'), '1,5 c. à soupe');
});

test('saisie de quantité libre', () => {
  assert.deepEqual(parseQtyInput('200 g'), { qty: 200, unit: 'g' });
  assert.deepEqual(parseQtyInput('1,5 kg'), { qty: 1500, unit: 'g' });
  assert.deepEqual(parseQtyInput('2 c. à soupe'), { qty: 2, unit: 'tbsp' });
  assert.deepEqual(parseQtyInput('20 cl'), { qty: 200, unit: 'ml' });
  assert.deepEqual(parseQtyInput('3'), { qty: 3, unit: 'pc' });
  assert.equal(parseQtyInput('-2 g'), null);
  assert.equal(parseQtyInput('abc'), null);
});

test('péremption : codes couleur et garde-fous', () => {
  const now = new Date(2026, 8, 21, 10);
  const today = todayISO(now);
  assert.equal(daysLeft(today, now), 0);
  assert.equal(expiryStatus(addDays(today, -1), now), 'expired');
  assert.equal(expiryStatus(addDays(today, 1), now), 'red');
  assert.equal(expiryStatus(addDays(today, 2), now), 'orange');
  assert.equal(expiryStatus(addDays(today, 3), now), 'orange');
  assert.equal(expiryStatus(addDays(today, 4), now), 'green');
  assert.equal(expiryStatus(null, now), 'none');
  assert.ok(isUrgent(addDays(today, 2), now));
  assert.ok(!isUrgent(addDays(today, 3), now));
  assert.equal(checkExpiryDate(addDays(today, -3), now), 'past');
  assert.equal(checkExpiryDate(addDays(today, 800), now), 'tooFar');
});

test('vider le frigo : couvre les produits urgents', () => {
  const fridge = new Set(['egg', 'milk', 'bread', 'tomato', 'mozzarella', 'zucchini', 'onion', 'pasta', 'bacon', 'parmesan']);
  const urgent = new Set(['milk', 'zucchini', 'mozzarella']);
  const plan = planEmptyFridge(FREE_RECIPES, fridge, urgent, noFilter);
  assert.ok(plan.picks.length >= 2 && plan.picks.length <= 3);
  assert.ok(plan.coveredUrgent.length >= 2, JSON.stringify(plan.coveredUrgent));
  assert.equal(new Set(plan.picks.map((p) => p.recipe.id)).size, plan.picks.length);
});

test('commande vocale', () => {
  assert.equal(parseCommand('Suivant'), 'next');
  assert.equal(parseCommand('euh... précédent'), 'previous');
  assert.equal(parseCommand('répète'), 'repeat');
  assert.equal(parseCommand('lance le minuteur'), 'timer');
  assert.equal(parseCommand('next please'), 'next');
  assert.equal(parseCommand('bonjour'), null);
});

test('saisie en phrase : « 2 œufs, un demi brocoli, du cheddar »', () => {
  const r = parseIngredientText('2 œufs, un demi brocoli, du cheddar');
  assert.deepEqual(r.found.map((i) => i.id), ['egg', 'broccoli', 'emmental']);
  const r2 = parseIngredientText('des tomates et 200 g de pâtes + reste de poulet');
  assert.deepEqual(r2.found.map((i) => i.id), ['tomato', 'pasta', 'chicken']);
  assert.deepEqual(parseIngredientText('xyzzz').found, []);
});

// ——— V1.1 : les mots ———

test('textes : aucun « (s) », en français comme en anglais', () => {
  for (const [lang, dict] of Object.entries({ fr, en })) {
    for (const [k, v] of Object.entries(dict)) assert.ok(!/\((s|es)\)/.test(v), `${lang}.${k} contient encore « (s) » : ${v}`);
  }
});

test('textes : chaque pluriel porte sur un paramètre connu et a ses deux formes', () => {
  for (const [lang, dict] of Object.entries({ fr, en })) {
    for (const [k, v] of Object.entries(dict)) {
      for (const m of v.matchAll(/\{(\w+)\|/g)) assert.match(v, new RegExp(`\\{${m[1]}\\|[^|{}]*(\\{\\w+\\}[^|{}]*)*\\|[^{}]*(\\{\\w+\\}[^{}]*)*\\}`), `${lang}.${k}`);
    }
  }
});

test('pluriels : règle française (0 et 1 au singulier) et anglaise', () => {
  assert.equal(formatMessage('{n} {n|produit|produits}', { n: 0 }, 'fr'), '0 produit');
  assert.equal(formatMessage('{n} {n|produit|produits}', { n: 1 }, 'fr'), '1 produit');
  assert.equal(formatMessage('{n} {n|produit|produits}', { n: 2 }, 'fr'), '2 produits');
  assert.equal(formatMessage('{n} {n|item|items}', { n: 0 }, 'en'), '0 items');
  assert.equal(formatMessage('{n} {n|item|items}', { n: 1 }, 'en'), '1 item');
  assert.equal(formatMessage(fr.resultsSubtitle, { n: 3, k: 1 }, 'fr'), '3 recettes avec ton ingrédient');
  assert.equal(formatMessage(fr.resultsSubtitle, { n: 1, k: 11 }, 'fr'), '1 recette avec tes 11 ingrédients');
  assert.equal(formatMessage(en.resultsSubtitle, { n: 72, k: 11 }, 'en'), '72 recipes with your 11 ingredients');
});

test('progrès : on ne fête jamais un zéro, on salue ce qui a été fait', () => {
  const vide = progressCards({ monthSaved: 0, weekCooked: 0, weekSaved: 0 });
  assert.equal(vide.month, null);
  assert.equal(vide.week, null);
  const semaine = progressCards({ monthSaved: 0, weekCooked: 2, weekSaved: 0 });
  assert.equal(semaine.month, null);
  assert.deepEqual(semaine.week, { cooked: 2, saved: 0 });
  assert.equal(progressCards({ monthSaved: 3, weekCooked: 0, weekSaved: 1 }).month, 3);
  // aucun texte de l'appli ne fête un zéro ni ne reproche le gaspillage
  for (const k of ['statsWasteRate', 'statsWasted', 'statsTopWasted']) assert.ok(!(k in fr), `${k} existe encore`);
});

test('badges : seulement ceux obtenus, plus le prochain', () => {
  const debut = visibleBadges(new Set());
  assert.deepEqual(debut.map((b) => [b.def.id, b.got]), [['first_cook', false]]);
  const deux = visibleBadges(new Set(['first_cook', 'save_25']));
  assert.deepEqual(deux.map((b) => [b.def.id, b.got]), [['first_cook', true], ['save_25', true], ['first_save', false]]);
  assert.equal(visibleBadges(new Set(BADGES.map((b) => b.id))).filter((b) => !b.got).length, 0);
});

test('contact : une vraie adresse, éditeur R-Aclés', () => {
  assert.equal(CONTACT_EMAIL, 'jocelyn.lebon.ae@gmail.com');
  assert.equal(DEVELOPER_NAME, 'R-Aclés');
});

// ——— V1.2 : un seul frigo ———

test('frigo : trois blocs, le plus proche de la date en premier', () => {
  const now = new Date();
  const today = todayISO(now);
  const items = [
    { id: 1, ingredient_id: 'milk', expires_at: addDays(today, 5) },
    { id: 2, ingredient_id: 'egg', expires_at: null },
    { id: 3, ingredient_id: 'cream', expires_at: addDays(today, 0) },
    { id: 4, ingredient_id: 'tomato', expires_at: addDays(today, 2) },
    { id: 5, ingredient_id: 'ham', expires_at: addDays(today, -1) },
    { id: 6, ingredient_id: 'butter', expires_at: addDays(today, 3) },
  ];
  const g = groupFridge(items, now);
  assert.deepEqual(g.urgent.map((i) => i.id), [5, 3, 4]);
  assert.deepEqual(g.dated.map((i) => i.id), [6, 1]);
  assert.deepEqual(g.undated.map((i) => i.id), [2]);
});

test('accueil : ce qu’on tape entre dans le frigo, sans doublon et sans date préremplie', () => {
  const existing = [{ ingredient_id: 'egg', expires_at: null }];
  const add = newFridgeEntries(['egg', 'tomato', 'tomato', 'pasta'], existing);
  assert.deepEqual(add.map((e) => e.ingredientId), ['tomato', 'pasta']);
  assert.ok(add.every((e) => e.expiresAt === null));
});

test('résultats : décocher un produit ne touche pas au frigo', () => {
  const fridgeIds = new Set(['egg', 'tomato', 'pasta']);
  const search = searchIngredientsFrom(fridgeIds, new Set(['tomato']));
  assert.deepEqual([...search], ['egg', 'pasta']);
  assert.equal(fridgeIds.size, 3);
});

// ——— V1.2.1 : corrections ———

test('anglais : aucun texte resté en français', () => {
  for (const [k, v] of Object.entries(en)) assert.ok(!/[éèàùçêâôûîœ]/i.test(v), `en.${k} semble en français : ${v}`);
});

test('identifiant de l’appli : éditeur R-Aclés', () => {
  assert.equal(appConfig.ios?.bundleIdentifier, 'com.racles.mypopote');
  assert.equal(appConfig.android?.package, 'com.racles.mypopote');
});

// ——— V1.3 : l'accueil en cartes ———

test('accueil : ordre fixe des cartes', () => {
  assert.deepEqual(homeCards({ fridgeEmpty: false, urgentCount: 2 }), ['urgent', 'now', 'add', 'fill']);
  assert.deepEqual(homeCards({ fridgeEmpty: false, urgentCount: 0 }), ['now', 'add', 'fill']);
  assert.deepEqual(homeCards({ fridgeEmpty: true, urgentCount: 0 }), ['add', 'pantry', 'fill']);
});

test('accueil : trois idées tout de suite, jamais de recette Premium verrouillée', () => {
  const fridge = new Set(['egg', 'milk', 'butter', 'pasta', 'emmental', 'tomato', 'cream', 'onion']);
  const matches = matchRecipes(ALL, fridge, { ...noFilter, maxTime: null, difficulty: null, course: null });
  const { ideas, complete } = quickIdeas(matches, false);
  assert.equal(ideas.length, 3);
  assert.ok(complete);
  assert.ok(ideas.every((m) => m.missing.length === 0 && !m.recipe.premium));
  // rien de faisable : on propose les plus proches, en le disant
  const presque = quickIdeas(matchRecipes(ALL, new Set(['zucchini']), { ...noFilter, maxTime: null, difficulty: null, course: null }), false);
  assert.equal(presque.complete, false);
});

test('accueil : idées avec trois fois rien quand le frigo est vide', () => {
  const ideas = pantryIdeas(ALL);
  assert.equal(ideas.length, 3);
  assert.ok(ideas.every((m) => m.missing.length <= 2 && !m.recipe.premium && m.recipe.course === 'main'), JSON.stringify(ideas.map((m) => [m.recipe.id, m.missing])));
  const demandes = ideas.flatMap((m) => m.missing);
  assert.equal(new Set(demandes).size, demandes.length, 'deux idées demandent le même ingrédient');
  console.log('   idées de placard :', ideas.map((m) => `${m.recipe.id} (${m.missing.join(', ')}, ${m.recipe.time} min)`).join(' · '));
});

test('accueil : quatre produits à finir au plus, puis « et n autres »', () => {
  assert.deepEqual(namesPreview(['a', 'b']), { shown: ['a', 'b'], rest: 0 });
  assert.deepEqual(namesPreview(['a', 'b', 'c', 'd', 'e', 'f']), { shown: ['a', 'b', 'c', 'd'], rest: 2 });
});

test('accueil : la liste des produits à finir se lit comme une phrase', () => {
  const fr = { and: 'et', others: (n: number) => formatMessage('{n} {n|autre|autres}', { n }, 'fr') };
  assert.equal(namesSentence(['Crème'], fr), 'Crème');
  assert.equal(namesSentence(['Crème fraîche', 'Courgette'], fr), 'Crème fraîche et courgette');
  assert.equal(namesSentence(['Pâtes', 'Ail', 'ton placard'], fr), 'Pâtes, ail et ton placard');
  assert.equal(namesSentence(['Aa', 'Bb', 'Cc', 'Dd', 'Ee'], fr), 'Aa, bb, cc, dd et 1 autre');
});
