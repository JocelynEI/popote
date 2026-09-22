import { createContext, type ReactNode, useCallback, useContext, useMemo } from 'react';
import { Alert } from 'react-native';
import { NO_NATIVE_EXTRAS } from '../runtime';
import { useSettings } from '../state/settings';

/** ⚠️ Créer le produit avec EXACTEMENT cet identifiant dans App Store Connect et Google Play Console. */
export const PREMIUM_SKU = 'mypopote_premium_lifetime';

export type BuyResult = 'ok' | 'cancelled' | 'error' | 'unavailable';

export interface PremiumCtx {
  isPremium: boolean;
  price: string | null;
  connected: boolean;
  /** true dans Expo Go : l'achat est simulé */
  simulated: boolean;
  buy: () => Promise<BuyResult>;
  restore: () => Promise<boolean>;
  /** mode test uniquement : repasser en version gratuite */
  resetSimulation?: () => void;
}

export const PremiumContext = createContext<PremiumCtx | null>(null);

/**
 * Expo Go : pas de module d'achat natif. On SIMULE l'achat pour pouvoir tester les écrans Premium.
 * Dans une vraie build (EAS), c'est NativePremiumProvider (expo-iap) qui est utilisé.
 */
function ExpoGoPremiumProvider({ children }: { children: ReactNode }) {
  const { settings, update } = useSettings();
  const buy = useCallback(
    () =>
      new Promise<BuyResult>((resolve) =>
        Alert.alert('Mode test', 'Achat simulé (aucun paiement) : activer Premium ?', [
          { text: 'Annuler', style: 'cancel', onPress: () => resolve('cancelled') },
          { text: 'Activer', onPress: () => (update({ premium: true }), resolve('ok')) },
        ]),
      ),
    [update],
  );
  const restore = useCallback(async () => settings.premium, [settings.premium]);
  const reset = useCallback(() => update({ premium: false }), [update]);
  const value = useMemo(
    () => ({ isPremium: settings.premium, price: '2,99 € (test)', connected: true, simulated: true, buy, restore, resetSimulation: reset }),
    [settings.premium, buy, restore, reset],
  );
  return <PremiumContext.Provider value={value}>{children}</PremiumContext.Provider>;
}

// chargé uniquement hors Expo Go (le module natif n'existe pas dans Expo Go)
const Provider: (p: { children: ReactNode }) => ReactNode = NO_NATIVE_EXTRAS
  ? ExpoGoPremiumProvider
  : // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('./premiumNative').NativePremiumProvider;

export function PremiumProvider({ children }: { children: ReactNode }) {
  return <Provider>{children}</Provider>;
}

export function usePremium(): PremiumCtx {
  const c = useContext(PremiumContext);
  if (!c) throw new Error('usePremium hors PremiumProvider');
  return c;
}
