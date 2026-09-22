import { Alert, type AlertButton, Platform } from 'react-native';

/**
 * Sur le web (aperçu GitHub Pages), Alert.alert de React Native ne fait RIEN :
 * les boîtes de dialogue (achat Premium simulé, « J'ai cuisiné », fin des courses…) ne s'affichaient pas.
 * On le remplace par les boîtes natives du navigateur. Aucun effet sur iOS / Android.
 */
export function installWebAlert() {
  if (Platform.OS !== 'web' || typeof window === 'undefined') return;
  Alert.alert = (title: string, message?: string, buttons?: AlertButton[]) => {
    const text = [title, message].filter(Boolean).join('\n\n');
    const list = buttons ?? [];
    const actions = list.filter((b) => b.style !== 'cancel');
    const cancel = list.find((b) => b.style === 'cancel');
    if (actions.length === 0) {
      window.alert(text);
      cancel?.onPress?.();
      return;
    }
    if (actions.length === 1 && !cancel) {
      window.alert(text);
      actions[0].onPress?.();
      return;
    }
    // on propose les actions de la plus importante (la dernière) à la première
    for (const b of [...actions].reverse()) {
      if (window.confirm(`${text}\n\n→ ${b.text ?? 'OK'} ?`)) {
        b.onPress?.();
        return;
      }
    }
    cancel?.onPress?.();
  };
}
