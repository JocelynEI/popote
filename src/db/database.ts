import { openDatabaseSync, type SQLiteDatabase } from 'expo-sqlite';
import { Platform } from 'react-native';

export const DB_NAME = 'mypopote.db';
const SCHEMA_VERSION = 1;

let _db: SQLiteDatabase | null = null;

export function db(): SQLiteDatabase {
  if (!_db) {
    _db = openDatabaseSync(DB_NAME);
    migrate(_db);
  }
  return _db;
}

function migrate(d: SQLiteDatabase) {
  // WAL n'est pas disponible dans l'implémentation web (aperçus)
  if (Platform.OS !== 'web') d.execSync('PRAGMA journal_mode = WAL;');
  d.execSync('PRAGMA foreign_keys = ON;');
  const row = d.getFirstSync<{ user_version: number }>('PRAGMA user_version');
  const current = row?.user_version ?? 0;
  if (current < 1) {
    d.execSync(`
      CREATE TABLE IF NOT EXISTS fridge_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_id TEXT,
        custom_name TEXT,
        expires_at TEXT,
        added_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS shopping_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_id TEXT,
        custom_name TEXT,
        checked INTEGER NOT NULL DEFAULT 0,
        recipe_id TEXT,
        added_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS favorites (
        recipe_id TEXT PRIMARY KEY,
        added_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        recipe_id TEXT NOT NULL,
        servings INTEGER NOT NULL,
        cooked_at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_history_date ON history(cooked_at);
      CREATE TABLE IF NOT EXISTS notes (
        recipe_id TEXT PRIMARY KEY,
        text TEXT NOT NULL,
        updated_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS user_recipes (
        id TEXT PRIMARY KEY,
        json TEXT NOT NULL,
        created_at TEXT NOT NULL
      );
      CREATE TABLE IF NOT EXISTS waste_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ingredient_id TEXT,
        custom_name TEXT,
        outcome TEXT NOT NULL CHECK (outcome IN ('saved','used','wasted')),
        at TEXT NOT NULL
      );
      CREATE INDEX IF NOT EXISTS idx_waste_date ON waste_log(at);
      CREATE TABLE IF NOT EXISTS meal_plan (
        date TEXT NOT NULL,
        slot TEXT NOT NULL CHECK (slot IN ('lunch','dinner')),
        recipe_id TEXT NOT NULL,
        PRIMARY KEY (date, slot)
      );
      CREATE TABLE IF NOT EXISTS badges (
        id TEXT PRIMARY KEY,
        unlocked_at TEXT NOT NULL
      );
    `);
  }
  // futures migrations : if (current < 2) { ... }
  if (current < SCHEMA_VERSION) d.execSync(`PRAGMA user_version = ${SCHEMA_VERSION}`);
}

/** Liste des tables utilisateur (sert à l'export / import) */
export const USER_TABLES = [
  'fridge_items',
  'shopping_items',
  'favorites',
  'history',
  'notes',
  'user_recipes',
  'waste_log',
  'meal_plan',
  'badges',
] as const;
export type UserTable = (typeof USER_TABLES)[number];
export { SCHEMA_VERSION };
