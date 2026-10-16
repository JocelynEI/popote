/**
 * Rapport sur tout le catalogue (relecture humaine, pas un test) :
 * ingrédients « vedettes » de chaque recette et remplacements désormais refusés.
 * Lancer : npx tsx scripts/rapport-catalogue.ts
 */
import { INGREDIENT_BY_ID } from '../src/data/ingredients';
import { FREE_RECIPES } from '../src/data/recipes';
import { PREMIUM_RECIPES } from '../src/data/recipesPremium';
import { SUBSTITUTIONS } from '../src/data/substitutions';
import { starIngredients } from '../src/logic/matching';

const all = [...FREE_RECIPES, ...PREMIUM_RECIPES];
let blocked = 0;
const rows: string[] = [];
for (const r of all) {
  const stars = [...starIngredients(r)];
  const refused = stars.flatMap((id) => (SUBSTITUTIONS[id] ?? []).filter((s) => !s.keepsDish).map((s) => `${id}→${s.with.join('+')}`));
  blocked += refused.length;
  rows.push(`${r.id.padEnd(24)} | vedettes : ${stars.map((id) => INGREDIENT_BY_ID[id].name.fr).join(', ') || 'aucune'}${refused.length ? ` | refusés : ${refused.join(', ')}` : ''}`);
}
console.log(rows.join('\n'));
console.log(`\n${all.length} recettes, ${all.filter((r) => starIngredients(r).size === 0).length} sans ingrédient vedette, ${blocked} remplacements refusés.`);
