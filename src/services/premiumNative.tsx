import { getAvailablePurchases, useIAP } from 'expo-iap';
import { type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useSettings } from '../state/settings';
import { type BuyResult, PremiumContext, PREMIUM_SKU } from './premium';

/**
 * Achat unique non consommable « Premium à vie » (2,99 €).
 * Aucun serveur : l'achat est vérifié par le store, puis le déblocage est enregistré localement.
 * « Restaurer mes achats » relit les achats du compte store (obligatoire sur iOS).
 *
 */
export function NativePremiumProvider({ children }: { children: ReactNode }) {
  const { settings, update } = useSettings();
  const pending = useRef<((r: BuyResult) => void) | null>(null);
  const [price, setPrice] = useState<string | null>(null);

  const { connected, products, fetchProducts, requestPurchase, finishTransaction, restorePurchases, availablePurchases } = useIAP({
    onPurchaseSuccess: async (purchase) => {
      if (purchase.productId === PREMIUM_SKU) {
        update({ premium: true });
        try {
          await finishTransaction({ purchase, isConsumable: false });
        } catch {
          /* la transaction sera re-proposée par le store au prochain lancement */
        }
        pending.current?.('ok');
        pending.current = null;
      }
    },
    onPurchaseError: (error) => {
      const cancelled = String(error?.code ?? '').toLowerCase().includes('cancel');
      pending.current?.(cancelled ? 'cancelled' : 'error');
      pending.current = null;
    },
  });

  useEffect(() => {
    if (connected) fetchProducts({ skus: [PREMIUM_SKU], type: 'in-app' }).catch(() => {});
  }, [connected, fetchProducts]);

  useEffect(() => {
    const p = products.find((x) => x.id === PREMIUM_SKU);
    if (p) setPrice(p.displayPrice);
  }, [products]);

  // Si le store signale un achat existant (réinstallation, nouveau téléphone), on débloque.
  useEffect(() => {
    if (availablePurchases.some((p) => p.productId === PREMIUM_SKU) && !settings.premium) update({ premium: true });
  }, [availablePurchases, settings.premium, update]);

  const buy = useCallback(async (): Promise<BuyResult> => {
    if (!connected) return 'unavailable';
    return new Promise<BuyResult>((resolve) => {
      pending.current = resolve;
      requestPurchase({
        type: 'in-app',
        request: { apple: { sku: PREMIUM_SKU }, google: { skus: [PREMIUM_SKU] } },
      }).catch(() => {
        pending.current?.('error');
        pending.current = null;
      });
    });
  }, [connected, requestPurchase]);

  /** true si un achat Premium a été retrouvé sur le compte store */
  const restore = useCallback(async (): Promise<boolean> => {
    try {
      await restorePurchases();
      const purchases = await getAvailablePurchases();
      const found = (purchases ?? []).some((p) => p.productId === PREMIUM_SKU);
      if (found) update({ premium: true });
      return found;
    } catch {
      return false;
    }
  }, [restorePurchases, update]);

  const value = useMemo(
    () => ({ isPremium: settings.premium, price, connected, simulated: false, buy, restore }),
    [settings.premium, price, connected, buy, restore],
  );
  return <PremiumContext.Provider value={value}>{children}</PremiumContext.Provider>;
}
