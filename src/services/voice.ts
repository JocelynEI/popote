import * as Speech from 'expo-speech';
import { useCallback, useState } from 'react';
import { NO_NATIVE_EXTRAS } from '../runtime';
import type { Lang } from '../data/types';

export { parseCommand, type VoiceCommand } from './voiceParse';
import type { VoiceCommand } from './voiceParse';

export type VoiceState = 'off' | 'listening' | 'unavailable' | 'denied' | 'onlineOnly';

/** Expo Go : pas de module natif de reconnaissance vocale -> commande vocale indisponible */
function useVoiceStub(_lang: Lang, _onCommand: (c: VoiceCommand) => void) {
  const [state, setState] = useState<VoiceState>('off');
  const start = useCallback(async () => setState('unavailable'), []);
  const stop = useCallback(() => setState('off'), []);
  return { state, start, stop };
}

export const useVoiceCommands: (lang: Lang, onCommand: (c: VoiceCommand) => void) => { state: VoiceState; start: () => Promise<void>; stop: () => void } =
  NO_NATIVE_EXTRAS
    ? useVoiceStub
    : // eslint-disable-next-line @typescript-eslint/no-require-imports
      require('./voiceNative').useVoiceCommandsNative;

type DictationHook = (lang: Lang, onText: (text: string) => void) => { state: VoiceState; start: () => Promise<void>; stop: () => void };

/** Dictée des ingrédients (micro du champ de saisie). Indisponible dans Expo Go et sur le web. */
export const useDictation: DictationHook = NO_NATIVE_EXTRAS
  ? useVoiceStub
  : // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('./voiceNative').useDictationNative;

/** Lecture à voix haute (synthèse vocale du système, aucune autorisation requise) */
export function speak(text: string, lang: Lang) {
  Speech.stop();
  Speech.speak(text, { language: lang === 'fr' ? 'fr-FR' : 'en-US', rate: 0.95 });
}
export function stopSpeaking() {
  Speech.stop();
}
