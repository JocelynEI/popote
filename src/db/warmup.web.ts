import { initSqlStore } from './sqljsStore';

/** Aperçu web : charge sql.js et la base enregistrée dans le navigateur avant le premier écran. */
export async function warmupStorage(): Promise<void> {
  await initSqlStore();
}
