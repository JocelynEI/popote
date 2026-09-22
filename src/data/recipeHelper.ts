import type { Course, Recipe, RecipeIngredient, Unit } from './types';

type StepTuple = [fr: string, en: string, timer?: number];

interface Def {
  id: string;
  fr: string;
  en: string;
  icon: string;
  course: Course;
  time: number;
  diff?: 1 | 2;
  serv?: number;
  /** "id qty unit; id qty; id; id?" — suffixe ? = optionnel, unité par défaut = pc */
  ing: string;
  steps: StepTuple[];
  premium?: boolean;
}

const UNITS: Unit[] = ['g', 'ml', 'pc', 'tbsp', 'tsp', 'pinch', 'slice', 'clove', 'can', 'bunch'];

export function parseIngredients(spec: string): RecipeIngredient[] {
  return spec
    .split(';')
    .map((s) => s.trim())
    .filter(Boolean)
    .map((part) => {
      const optional = part.endsWith('?');
      const [id, qtyStr, unitStr] = part.replace(/\?$/, '').trim().split(/\s+/);
      const ri: RecipeIngredient = { id };
      if (qtyStr) {
        ri.qty = Number(qtyStr);
        ri.unit = (unitStr as Unit) ?? 'pc';
        if (!UNITS.includes(ri.unit)) throw new Error(`Unité inconnue "${unitStr}" dans "${part}"`);
      }
      if (optional) ri.optional = true;
      return ri;
    });
}

export function r(d: Def): Recipe {
  return {
    id: d.id,
    title: { fr: d.fr, en: d.en },
    icon: d.icon,
    course: d.course,
    time: d.time,
    difficulty: d.diff ?? 1,
    servings: d.serv ?? 2,
    ingredients: parseIngredients(d.ing),
    steps: d.steps.map(([fr, en, timer]) => ({ text: { fr, en }, ...(timer ? { timer } : {}) })),
    ...(d.premium ? { premium: true } : {}),
  };
}
