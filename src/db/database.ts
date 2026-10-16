import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';
import { DB_NAME, migrate } from './migrate';

export { DB_NAME, SCHEMA_VERSION, USER_TABLES, type UserTable } from './migrate';

let _db: SQLiteDatabase | null = null;

/** iOS / Android : expo-sqlite. L'aperçu web utilise database.web.ts (sql.js). */
export function db(): SQLiteDatabase {
  if (!_db) {
    _db = openDatabaseSync(DB_NAME);
    migrate(_db, false);
  }
  return _db;
}
