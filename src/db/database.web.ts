import type { SQLiteDatabase } from 'expo-sqlite';
import { migrate } from './migrate';
import { wrapSqlJs } from './sqljsAdapter';
import { persistSoon, sqlEngine } from './sqljsStore';

export { DB_NAME, SCHEMA_VERSION, USER_TABLES, type UserTable } from './migrate';

let _db: SQLiteDatabase | null = null;

/**
 * Aperçu web : sql.js dans la page (voir sqljsStore.ts). expo-sqlite web passait par un worker
 * et une attente active qui figeait l'écran sur les téléphones.
 */
export function db(): SQLiteDatabase {
  if (!_db) {
    _db = wrapSqlJs(sqlEngine(), persistSoon);
    migrate(_db, true);
  }
  return _db;
}
