import * as DocumentPicker from 'expo-document-picker';
import { File, Paths } from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import { db, SCHEMA_VERSION, USER_TABLES, type UserTable } from '../db/database';
import { emitChange } from '../db/repo';
import { loadSettings, type Settings } from '../state/settings';

/**
 * Sauvegarde manuelle : un fichier JSON partagé via la feuille de partage du système.
 * L'import est « tout ou rien » (transaction) avec une copie de sécurité faite juste avant.
 */

export interface BackupFile {
  app: 'mypopote';
  format: 1;
  schema: number;
  exportedAt: string;
  tables: Record<UserTable, Record<string, unknown>[]>;
  settings: Partial<Settings>;
}

/** Réglages qui ne voyagent PAS avec la sauvegarde (le statut premium se restaure via le store) */
const LOCAL_ONLY: (keyof Settings)[] = ['premium', 'notifAsked'];

export function buildBackup(): BackupFile {
  const d = db();
  const tables = {} as BackupFile['tables'];
  for (const t of USER_TABLES) tables[t] = d.getAllSync<Record<string, unknown>>(`SELECT * FROM ${t}`);
  const settings: Partial<Settings> = { ...loadSettings() };
  LOCAL_ONLY.forEach((k) => delete settings[k]);
  return { app: 'mypopote', format: 1, schema: SCHEMA_VERSION, exportedAt: new Date().toISOString(), tables, settings };
}

function writeJson(name: string, data: unknown, dir = Paths.cache): File {
  const f = new File(dir, name);
  if (f.exists) f.delete();
  f.create();
  f.write(JSON.stringify(data));
  return f;
}

export async function exportBackup(): Promise<void> {
  const date = new Date().toISOString().slice(0, 10);
  const f = writeJson(`mypopote-sauvegarde-${date}.json`, buildBackup());
  await Sharing.shareAsync(f.uri, { mimeType: 'application/json', dialogTitle: 'Mypopote', UTI: 'public.json' });
}

export function validateBackup(x: unknown): x is BackupFile {
  if (!x || typeof x !== 'object') return false;
  const b = x as Partial<BackupFile>;
  if (b.app !== 'mypopote' || b.format !== 1 || typeof b.schema !== 'number' || b.schema > SCHEMA_VERSION) return false;
  if (!b.tables || typeof b.tables !== 'object') return false;
  return USER_TABLES.every((t) => Array.isArray((b.tables as Record<string, unknown>)[t] ?? []));
}

const COLUMN_RE = /^[a-z_]+$/;

/** Remplace toutes les données par la sauvegarde, dans une transaction (rollback automatique en cas d'erreur). */
export function restoreBackup(b: BackupFile) {
  const d = db();
  d.withTransactionSync(() => {
    for (const t of USER_TABLES) {
      d.runSync(`DELETE FROM ${t}`);
      for (const row of b.tables[t] ?? []) {
        const cols = Object.keys(row).filter((c) => COLUMN_RE.test(c));
        if (!cols.length) continue;
        const values = cols.map((c) => {
          const v = row[c];
          return v === null || typeof v === 'string' || typeof v === 'number' ? v : String(v);
        });
        d.runSync(`INSERT INTO ${t} (${cols.join(',')}) VALUES (${cols.map(() => '?').join(',')})`, values as (string | number | null)[]);
      }
    }
  });
  emitChange();
}

export type PickResult = { status: 'cancelled' } | { status: 'invalid' } | { status: 'ok'; backup: BackupFile };

export async function pickBackup(): Promise<PickResult> {
  const res = await DocumentPicker.getDocumentAsync({ type: ['application/json', '*/*'], copyToCacheDirectory: true });
  if (res.canceled || !res.assets?.[0]) return { status: 'cancelled' };
  try {
    const text = await new File(res.assets[0].uri).text();
    const parsed: unknown = JSON.parse(text);
    return validateBackup(parsed) ? { status: 'ok', backup: parsed } : { status: 'invalid' };
  } catch {
    return { status: 'invalid' };
  }
}

/** Copie de sécurité de l'état actuel, conservée dans l'espace privé de l'app. */
export function safetyCopy() {
  writeJson('mypopote-avant-import.json', buildBackup(), Paths.document);
}
