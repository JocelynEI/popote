import { StyleSheet, View } from 'react-native';
import { useI18n } from '../i18n';
import { radius, space, useTheme } from '../theme/theme';
import { Button, Txt } from './ui';

/** Bulle d'aide affichée au premier lancement, en ligne (pas de superposition = lisible au lecteur d'écran) */
export function Tip({ text, last, onNext }: { text: string; last?: boolean; onNext: () => void }) {
  const { c } = useTheme();
  const { t } = useI18n();
  return (
    <View style={[styles.tip, { backgroundColor: c.accent }]} accessibilityLiveRegion="polite">
      <Txt style={{ flex: 1, fontWeight: '700' }} color={c.onAccent}>
        {text}
      </Txt>
      <Button small kind="secondary" title={last ? t('tipDone') : t('tipNext')} onPress={onNext} style={{ backgroundColor: '#FFFFFF' }} />
      <View style={[styles.arrow, { borderBottomColor: c.accent }]} />
    </View>
  );
}

const styles = StyleSheet.create({
  tip: { borderRadius: radius.md, padding: space(3), flexDirection: 'row', alignItems: 'center', gap: space(3), marginVertical: space(2) },
  arrow: {
    position: 'absolute',
    top: -8,
    left: 24,
    width: 0,
    height: 0,
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderBottomWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
});
