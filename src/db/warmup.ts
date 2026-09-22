import { openDatabaseAsync } from 'expo-sqlite';
import Storage from 'expo-sqlite/kv-store';
import { Platform } from 'react-native';

/**
 * Sur le web (aperçus uniquement), SQLite tourne dans un worker qui doit être initialisé
 * de façon asynchrone avant les appels synchrones. Sur iOS / Android : rien à faire.
 */
export async function warmupStorage(): Promise<void> {
  if (Platform.OS !== 'web') return;
  // base jetable : initialise le worker sans verrouiller le fichier de la vraie base
  const tmp = await openDatabaseAsync('warmup.db');
  await tmp.closeAsync();
  await Storage.getItem('settings.v1');
}
