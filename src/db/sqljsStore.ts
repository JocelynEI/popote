import type { Database, SqlJsStatic } from 'sql.js';

/**
 * Aperçu web uniquement : charge sql.js (fichiers servis depuis public/sqljs) et garde la base
 * dans IndexedDB du navigateur. Rien n'est envoyé sur internet.
 */
const IDB_NAME = 'mypopote-apercu';
const IDB_STORE = 'base';
const IDB_KEY = 'mypopote.db';

let engine: Database | null = null;
let timer: ReturnType<typeof setTimeout> | undefined;

/** Préfixe du site (« /popote » sur GitHub Pages), lu sur les scripts de l'export web. */
function baseUrl(): string {
  for (const s of Array.from(document.scripts)) {
    const i = s.src.indexOf('/_expo/');
    if (i >= 0) return new URL(s.src).pathname.slice(0, new URL(s.src).pathname.indexOf('/_expo/'));
  }
  return '';
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const el = document.createElement('script');
    el.src = src;
    el.onload = () => resolve();
    el.onerror = () => reject(new Error(`Chargement impossible : ${src}`));
    document.head.appendChild(el);
  });
}

function idb<T>(mode: IDBTransactionMode, run: (store: IDBObjectStore) => IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    const open = indexedDB.open(IDB_NAME, 1);
    open.onupgradeneeded = () => open.result.createObjectStore(IDB_STORE);
    open.onerror = () => reject(open.error);
    open.onsuccess = () => {
      const tx = open.result.transaction(IDB_STORE, mode);
      const req = run(tx.objectStore(IDB_STORE));
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
      tx.oncomplete = () => open.result.close();
    };
  });
}

export async function initSqlStore(): Promise<void> {
  if (engine) return;
  const base = baseUrl();
  const w = window as unknown as { initSqlJs?: (o: { locateFile: (f: string) => string }) => Promise<SqlJsStatic> };
  if (!w.initSqlJs) await loadScript(`${base}/sqljs/sql-wasm.js`);
  const SQL = await w.initSqlJs!({ locateFile: (f) => `${base}/sqljs/${f}` });
  let saved: Uint8Array | undefined;
  try {
    saved = (await idb<Uint8Array | undefined>('readonly', (s) => s.get(IDB_KEY) as IDBRequest<Uint8Array | undefined>)) ?? undefined;
  } catch {
    saved = undefined;
  }
  engine = new SQL.Database(saved);
  // si l'onglet passe en arrière-plan, on enregistre tout de suite
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') persistNow();
  });
}

export function sqlEngine(): Database {
  if (!engine) throw new Error('La base de l’aperçu web n’est pas encore prête.');
  return engine;
}

function persistNow() {
  clearTimeout(timer);
  if (!engine) return;
  const bytes = engine.export();
  // export() rouvre la base et remet les pragmas par défaut
  engine.exec('PRAGMA foreign_keys = ON;');
  idb('readwrite', (s) => s.put(bytes, IDB_KEY)).catch(() => {});
}

/** Enregistre la base peu après une écriture (les écritures rapprochées n'en font qu'une). */
export function persistSoon() {
  clearTimeout(timer);
  timer = setTimeout(persistNow, 300);
}
