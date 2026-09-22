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
