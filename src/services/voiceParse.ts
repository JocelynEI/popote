import { normalize } from '../logic/text';

export type VoiceCommand = 'next' | 'previous' | 'repeat' | 'timer';

const PATTERNS: [VoiceCommand, RegExp][] = [
  ['next', /\b(suivant|suivante|apres|next|forward)\b/],
  ['previous', /\b(precedent|precedente|retour|avant|previous|back)\b/],
  ['repeat', /\b(repete|repeter|encore|repeat|again)\b/],
  ['timer', /\b(minuteur|chrono|timer)\b/],
];

export function parseCommand(transcript: string): VoiceCommand | null {
  const t = normalize(transcript);
  // on prend la DERNIÈRE commande prononcée
  let best: { cmd: VoiceCommand; idx: number } | null = null;
  for (const [cmd, re] of PATTERNS) {
    const m = [...t.matchAll(new RegExp(re.source, 'g'))].pop();
    if (m && m.index !== undefined && (!best || m.index > best.idx)) best = { cmd, idx: m.index };
  }
  return best?.cmd ?? null;
}

