import type { SQLiteDatabase } from 'expo-sqlite';
import type { Database, SqlValue } from 'sql.js';

type Param = string | number | null | Uint8Array;

/** Paramètres à la façon d'expo-sqlite : variadiques, tableau ou objet nommé. */
function params(args: unknown[]): Param[] | Record<string, Param> {
  const fix = (v: unknown): Param => (v === undefined ? null : typeof v === 'boolean' ? (v ? 1 : 0) : (v as Param));
  if (args.length === 1 && Array.isArray(args[0])) return args[0].map(fix);
  if (args.length === 1 && args[0] !== null && typeof args[0] === 'object' && !(args[0] instanceof Uint8Array)) {
    return Object.fromEntries(Object.entries(args[0] as Record<string, unknown>).map(([k, v]) => [k, fix(v)]));
  }
  return args.map(fix);
}

/**
 * Aperçu web : la base sql.js tourne dans la page, sans worker ni attente bloquante,
 * derrière les quelques méthodes synchrones d'expo-sqlite que l'appli utilise.
 * `onWrite` est appelé après chaque écriture (hors transaction en cours) pour sauvegarder la base.
 */
export function wrapSqlJs(d: Database, onWrite: () => void): SQLiteDatabase {
  let depth = 0;
  const changed = () => {
    if (depth === 0) onWrite();
  };
  const rows = <T,>(sql: string, args: unknown[]): T[] => {
    const st = d.prepare(sql);
    try {
      st.bind(params(args) as SqlValue[]);
      const out: T[] = [];
      while (st.step()) out.push(st.getAsObject() as T);
      return out;
    } finally {
      st.free();
    }
  };
  const api = {
    execSync(sql: string) {
      d.exec(sql);
      changed();
    },
    getAllSync<T>(sql: string, ...args: unknown[]): T[] {
      return rows<T>(sql, args);
    },
    getFirstSync<T>(sql: string, ...args: unknown[]): T | null {
      return rows<T>(sql, args)[0] ?? null;
    },
    runSync(sql: string, ...args: unknown[]) {
      const st = d.prepare(sql);
      try {
        st.bind(params(args) as SqlValue[]);
        while (st.step()) {
          /* une écriture ne renvoie pas de lignes */
        }
      } finally {
        st.free();
      }
      const changes = d.getRowsModified();
      const id = d.exec('SELECT last_insert_rowid()')[0]?.values[0]?.[0] ?? 0;
      changed();
      return { changes, lastInsertRowId: Number(id) };
    },
    withTransactionSync(fn: () => void) {
      d.exec('BEGIN');
      depth++;
      try {
        fn();
        depth--;
        d.exec('COMMIT');
      } catch (e) {
        depth--;
        d.exec('ROLLBACK');
        throw e;
      }
      onWrite();
    },
  };
  return api as unknown as SQLiteDatabase;
}
