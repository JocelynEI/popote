import { ExpoSpeechRecognitionModule, useSpeechRecognitionEvent } from 'expo-speech-recognition';
import { useCallback, useEffect, useRef, useState } from 'react';
import type { Lang } from '../data/types';
import type { VoiceState } from './voice';
import { parseCommand, type VoiceCommand } from './voiceParse';

/**
 * Commande vocale du mode cuisine.
 * Confidentialité : on n'active la reconnaissance QUE si elle peut se faire sur l'appareil (hors ligne).
 */
export function useVoiceCommandsNative(lang: Lang, onCommand: (c: VoiceCommand) => void) {
  const [state, setState] = useState<VoiceState>('off');
  const activeRef = useRef(false);
  const lastRef = useRef<{ cmd: VoiceCommand; at: number } | null>(null);
  const cbRef = useRef(onCommand);
  cbRef.current = onCommand;

  const startSession = useCallback(() => {
    ExpoSpeechRecognitionModule.start({
      lang: lang === 'fr' ? 'fr-FR' : 'en-US',
      interimResults: true,
      continuous: true,
      requiresOnDeviceRecognition: true,
      contextualStrings: lang === 'fr' ? ['suivant', 'précédent', 'répète', 'minuteur'] : ['next', 'previous', 'repeat', 'timer'],
    });
  }, [lang]);

  useSpeechRecognitionEvent('result', (e) => {
    if (!activeRef.current) return;
    const cmd = parseCommand(e.results[0]?.transcript ?? '');
    if (!cmd) return;
    const now = Date.now();
    if (lastRef.current && lastRef.current.cmd === cmd && now - lastRef.current.at < 1500) return;
    lastRef.current = { cmd, at: now };
    cbRef.current(cmd);
  });

  // la reconnaissance s'arrête parfois toute seule (silence) : on relance tant que c'est actif
  useSpeechRecognitionEvent('end', () => {
    if (activeRef.current) setTimeout(() => activeRef.current && startSession(), 300);
  });

  useSpeechRecognitionEvent('error', (e) => {
    if (e.error === 'not-allowed') {
      activeRef.current = false;
      setState('denied');
    }
  });

  const start = useCallback(async () => {
    try {
      if (!ExpoSpeechRecognitionModule.isRecognitionAvailable()) return setState('unavailable');
      if (!ExpoSpeechRecognitionModule.supportsOnDeviceRecognition()) return setState('onlineOnly');
      const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!perm.granted) return setState('denied');
      activeRef.current = true;
      setState('listening');
      startSession();
    } catch {
      setState('unavailable');
    }
  }, [startSession]);

  const stop = useCallback(() => {
    activeRef.current = false;
    try {
      ExpoSpeechRecognitionModule.abort();
    } catch {
      /* rien */
    }
    setState('off');
  }, []);

  useEffect(() => () => stop(), [stop]);

  return { state, start, stop };
}


/** Dictée ponctuelle (champ de saisie de l'accueil) : renvoie la phrase reconnue, sur l'appareil uniquement. */
export function useDictationNative(lang: Lang, onText: (text: string) => void) {
  const [state, setState] = useState<VoiceState>('off');
  const cbRef = useRef(onText);
  cbRef.current = onText;
  const activeRef = useRef(false);

  useSpeechRecognitionEvent('result', (e) => {
    if (!activeRef.current) return;
    const txt = e.results[0]?.transcript ?? '';
    if (e.isFinal && txt) {
      activeRef.current = false;
      setState('off');
      cbRef.current(txt);
    }
  });
  useSpeechRecognitionEvent('end', () => {
    activeRef.current = false;
    setState('off');
  });
  useSpeechRecognitionEvent('error', (e) => {
    activeRef.current = false;
    setState(e.error === 'not-allowed' ? 'denied' : 'off');
  });

  const start = useCallback(async () => {
    try {
      if (!ExpoSpeechRecognitionModule.isRecognitionAvailable()) return setState('unavailable');
      if (!ExpoSpeechRecognitionModule.supportsOnDeviceRecognition()) return setState('onlineOnly');
      const perm = await ExpoSpeechRecognitionModule.requestPermissionsAsync();
      if (!perm.granted) return setState('denied');
      activeRef.current = true;
      setState('listening');
      ExpoSpeechRecognitionModule.start({ lang: lang === 'fr' ? 'fr-FR' : 'en-US', interimResults: false, continuous: false, requiresOnDeviceRecognition: true });
    } catch {
      setState('unavailable');
    }
  }, [lang]);

  const stop = useCallback(() => {
    try {
      ExpoSpeechRecognitionModule.stop();
    } catch {
      /* rien */
    }
  }, []);

  return { state, start, stop };
}
