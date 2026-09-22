import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useToast } from '../components/Toast';
import { Illo } from '../components/Dish';
import { Button, Card, haptic, Screen, Txt } from '../components/ui';
import { useI18n } from '../i18n';
import { usePremium } from '../services/premium';
import { space, useTheme } from '../theme/theme';
import { goBack } from '../navigation/goBack';

export default function PremiumScreen() {
  const { c } = useTheme();
  const { t } = useI18n();
  const { isPremium, price, connected, buy, restore, simulated, resetSimulation } = usePremium();
  const toast = useToast();
  const [busy, setBusy] = useState(false);

  const onBuy = async () => {
    setBusy(true);
    const res = await buy();
    setBusy(false);
    if (res === 'ok') {
      haptic('success');
      toast.show(t('premiumThanks'));
      goBack();
    } else if (res === 'unavailable') toast.show(t('premiumUnavailable'));
    else if (res === 'error') toast.show(t('premiumError'));
  };

  const features = [t('premiumF1'), t('premiumF2'), t('premiumF3'), t('premiumF4')];

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(5), gap: space(4) }}>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', marginBottom: space(2) }}>
            <Illo name="cake" size={96} />
            <Illo name="pasta" size={120} />
            <Illo name="fruit" size={96} />
          </View>
          <Txt v="display" accessibilityRole="header" style={{ textAlign: 'center' }}>
            {t('premiumTitle')}
          </Txt>
          <Txt muted style={{ textAlign: 'center', marginTop: space(2) }}>
            {t('premiumSubtitle')}
          </Txt>
        </View>
        <Card>
          {features.map((f) => (
            <Txt key={f} style={{ marginVertical: space(2) }}>
              {f}
            </Txt>
          ))}
        </Card>
        <Txt v="small" muted style={{ textAlign: 'center' }}>
          {t('premiumFree')}
        </Txt>
        {simulated && (
          <Txt v="small" muted style={{ textAlign: 'center' }}>
            {t('premiumTestMode')}
          </Txt>
        )}
        {isPremium ? (
          <>
            <Card style={{ backgroundColor: c.successBg }}>
              <Txt color={c.success} style={{ textAlign: 'center', fontWeight: '700' }}>
                {t('premiumActive')}
              </Txt>
            </Card>
            {simulated && resetSimulation && <Button kind="ghost" title={t('premiumTestReset')} onPress={resetSimulation} />}
          </>
        ) : (
          <>
            <Button title={t('premiumBuy', { price: price ?? '2,99 €' })} icon="star" onPress={onBuy} loading={busy} disabled={!connected && !busy} />
            {!connected && (
              <Txt v="small" muted style={{ textAlign: 'center' }}>
                {t('premiumUnavailable')}
              </Txt>
            )}
            <Button
              kind="ghost"
              title={t('restorePurchases')}
              onPress={async () => {
                const found = await restore();
                toast.show(found ? t('restoreOk') : t('restoreNone'));
                if (found) goBack();
              }}
            />
          </>
        )}
      </ScrollView>
    </Screen>
  );
}
