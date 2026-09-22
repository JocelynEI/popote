import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, StyleSheet, Text, View } from 'react-native';
import Svg, { Ellipse, Path, Rect } from 'react-native-svg';
import { useI18n, type TKey } from '../i18n';
import { space, useTheme } from '../theme/theme';
import { Txt } from './ui';

const MESSAGES: TKey[] = ['loading1', 'loading2', 'loading3'];
const FALLING = ['🥕', '🧅', '🍅', '🥚', '🧀'];

/** Marmite vectorielle (même dessin que l'icône de l'appli) */
function Pot({ size, color, lid }: { size: number; color: string; lid: string }) {
  return (
    <Svg width={size} height={size * 0.8} viewBox="150 280 724 580">
      <Ellipse cx={512} cy={832} rx={300} ry={30} fill="#000" opacity={0.08} />
      <Rect x={170} y={520} width={110} height={64} rx={32} fill={lid} />
      <Rect x={744} y={520} width={110} height={64} rx={32} fill={lid} />
      <Path d="M230 480 H794 V690 C794 770 740 820 660 820 H364 C284 820 230 770 230 690 Z" fill={color} />
      <Path d="M230 600 H794" stroke="#000" strokeOpacity={0.08} strokeWidth={18} />
      <Path d="M200 480 C200 380 330 350 512 350 C694 350 824 380 824 480 Z" fill={color} />
      <Rect x={190} y={460} width={644} height={46} rx={23} fill={lid} />
      <Rect x={462} y={300} width={100} height={70} rx={30} fill={lid} />
      <Path d="M600 700 C600 640 650 610 690 610 C690 670 650 710 600 700 Z" fill="#82A98B" />
    </Svg>
  );
}

/**
 * Écran de transition « magique » : la marmite bout, les ingrédients sautent dedans,
 * et des messages drôles défilent. Respecte le réglage « réduire les animations ».
 */
export function MypopoteLoader() {
  const { c, reduceMotion } = useTheme();
  const { t } = useI18n();
  const [msg, setMsg] = useState(0);
  const lid = useRef(new Animated.Value(0)).current;
  const steam = useRef([0, 1, 2].map(() => new Animated.Value(0))).current;
  const drops = useRef(FALLING.map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const id = setInterval(() => setMsg((m) => (m + 1) % MESSAGES.length), 900);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    AccessibilityInfo.announceForAccessibility(t(MESSAGES[msg]));
  }, [msg, t]);

  useEffect(() => {
    if (reduceMotion) return;
    const lidLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(lid, { toValue: 1, duration: 180, useNativeDriver: true, easing: Easing.out(Easing.quad) }),
        Animated.timing(lid, { toValue: 0, duration: 220, useNativeDriver: true, easing: Easing.bounce }),
        Animated.delay(250),
      ]),
    );
    const steamLoops = steam.map((v, i) =>
      Animated.loop(Animated.sequence([Animated.delay(i * 350), Animated.timing(v, { toValue: 1, duration: 1200, useNativeDriver: true }), Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true })])),
    );
    const dropLoops = drops.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 380),
          Animated.timing(v, { toValue: 1, duration: 900, useNativeDriver: true, easing: Easing.in(Easing.quad) }),
          Animated.timing(v, { toValue: 0, duration: 0, useNativeDriver: true }),
          Animated.delay((FALLING.length - i) * 380),
        ]),
      ),
    );
    [lidLoop, ...steamLoops, ...dropLoops].forEach((a) => a.start());
    return () => [lidLoop, ...steamLoops, ...dropLoops].forEach((a) => a.stop());
  }, [reduceMotion, lid, steam, drops]);

  return (
    <View style={styles.wrap} accessibilityRole="progressbar" accessibilityLabel={t(MESSAGES[msg])}>
      <View style={{ width: 240, height: 250, alignItems: 'center', justifyContent: 'flex-end' }}>
        {/* ingrédients qui sautent dans la marmite */}
        {!reduceMotion &&
          drops.map((v, i) => {
            const fromX = (i - 2) * 46;
            return (
              <Animated.View
                key={i}
                style={{
                  position: 'absolute',
                  top: 10,
                  opacity: v.interpolate({ inputRange: [0, 0.1, 0.8, 1], outputRange: [0, 1, 1, 0] }),
                  transform: [
                    { translateX: v.interpolate({ inputRange: [0, 1], outputRange: [fromX, 0] }) },
                    { translateY: v.interpolate({ inputRange: [0, 0.35, 1], outputRange: [20, -10, 120] }) },
                    { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${i % 2 ? 200 : -200}deg`] }) },
                  ],
                }}
              >
                <Text style={{ fontSize: 30 }}>{FALLING[i]}</Text>
              </Animated.View>
            );
          })}
        {/* vapeur */}
        {!reduceMotion &&
          steam.map((v, i) => (
            <Animated.View
              key={i}
              style={{
                position: 'absolute',
                bottom: 150,
                left: 88 + i * 26,
                width: 10,
                height: 34,
                borderRadius: 5,
                backgroundColor: c.primary,
                opacity: v.interpolate({ inputRange: [0, 0.2, 1], outputRange: [0, 0.5, 0] }),
                transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, -40] }) }, { scaleX: v.interpolate({ inputRange: [0, 1], outputRange: [1, 1.8] }) }],
              }}
            />
          ))}
        <Animated.View style={{ transform: [{ translateY: lid.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) }, { rotate: lid.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '-3deg'] }) }] }}>
          <Pot size={200} color={c.accent} lid={c.text} />
        </Animated.View>
      </View>
      <Txt v="h2" style={{ textAlign: 'center', marginTop: space(6) }} accessibilityLiveRegion="polite">
        {t(MESSAGES[msg])}
      </Txt>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: space(6) },
});
