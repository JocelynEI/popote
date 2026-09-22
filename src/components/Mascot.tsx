import { useEffect, useRef, useState } from 'react';
import { Animated, Easing } from 'react-native';
import Svg, { Circle, Ellipse, G, Path, Rect } from 'react-native-svg';
import { useTheme } from '../theme/theme';

export type Mood = 'happy' | 'wow' | 'wink' | 'love';

/**
 * « Frigo », la mascotte de Mypopote : un réfrigérateur rond et souriant qui fait coucou.
 * Dessin original en SVG. Animations : il se balance, cligne des yeux et agite le bras
 * (désactivées si « réduire les animations » est activé).
 */
export function Mascot({ size = 220, mood = 'happy' }: { size?: number; mood?: Mood }) {
  const { c, reduceMotion } = useTheme();
  const bob = useRef(new Animated.Value(0)).current;
  const wave = useRef(new Animated.Value(0)).current;
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (reduceMotion) return;
    const b = Animated.loop(
      Animated.sequence([
        Animated.timing(bob, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(bob, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ]),
    );
    const w = Animated.loop(
      Animated.sequence([
        Animated.timing(wave, { toValue: 1, duration: 260, useNativeDriver: true }),
        Animated.timing(wave, { toValue: -0.4, duration: 260, useNativeDriver: true }),
        Animated.timing(wave, { toValue: 1, duration: 260, useNativeDriver: true }),
        Animated.timing(wave, { toValue: 0, duration: 260, useNativeDriver: true }),
        Animated.delay(1600),
      ]),
    );
    b.start();
    w.start();
    const id = setInterval(() => {
      setBlink(true);
      setTimeout(() => setBlink(false), 140);
    }, 3200);
    return () => {
      b.stop();
      w.stop();
      clearInterval(id);
    };
  }, [reduceMotion, bob, wave]);

  const ink = '#2D3142';
  const body = '#FFFFFF';
  const w = size;
  const h = size * 1.2;
  const eyesClosed = blink && mood !== 'wink';

  return (
    <Animated.View
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
      style={{ width: w, height: h, transform: [{ translateY: bob.interpolate({ inputRange: [0, 1], outputRange: [0, -8] }) }, { rotate: bob.interpolate({ inputRange: [0, 1], outputRange: ['-1.5deg', '1.5deg'] }) }] }}
    >
      {/* bras qui fait coucou : l'épaule est au centre de la vue, qui pivote */}
      <Animated.View
        style={{
          position: 'absolute',
          left: (162 / 200) * w - w * 0.16,
          top: (146 / 240) * h - w * 0.16,
          width: w * 0.32,
          height: w * 0.32,
          transform: [{ rotate: wave.interpolate({ inputRange: [-1, 1], outputRange: ['12deg', '-28deg'] }) }],
        }}
      >
        <Svg width="100%" height="100%" viewBox="0 0 60 60">
          <Path d="M30 30 C 38 26, 44 18, 48 10" stroke={ink} strokeWidth={4.5} strokeLinecap="round" fill="none" />
          <Circle cx={50} cy={8} r={7} fill={body} stroke={ink} strokeWidth={3.5} />
        </Svg>
      </Animated.View>

      <Svg width={w} height={h} viewBox="0 0 200 240">
        {/* ombre */}
        <Ellipse cx={100} cy={232} rx={62} ry={7} fill="#000" opacity={0.08} />
        {/* bras gauche posé */}
        <Path d="M36 150 C 22 160, 18 172, 20 182" stroke={ink} strokeWidth={5} strokeLinecap="round" fill="none" />
        <Circle cx={21} cy={186} r={8} fill={body} stroke={ink} strokeWidth={4} />
        {/* pieds */}
        <Rect x={58} y={214} width={26} height={16} rx={8} fill={ink} />
        <Rect x={116} y={214} width={26} height={16} rx={8} fill={ink} />
        {/* corps */}
        <Rect x={36} y={12} width={128} height={208} rx={34} fill={body} stroke={ink} strokeWidth={5} />
        {/* reflet */}
        <Rect x={50} y={26} width={10} height={48} rx={5} fill={c.primarySoft} />
        {/* séparation congélateur */}
        <Path d="M38 84 H162" stroke={ink} strokeWidth={5} />
        {/* poignées */}
        <Rect x={140} y={38} width={9} height={30} rx={4.5} fill={c.primary} />
        <Rect x={140} y={98} width={9} height={40} rx={4.5} fill={c.primary} />
        {/* magnets */}
        <Path d="M78 40 c -6 -8 -18 -2 -12 8 l 12 12 l 12 -12 c 6 -10 -6 -16 -12 -8 z" fill={c.accent} />
        <G transform="translate(104 34) rotate(20)">
          <Path d="M0 12 C 0 2, 10 -2, 18 0 C 18 10, 10 16, 0 12 Z" fill={c.primary} />
        </G>

        {/* visage */}
        {/* joues */}
        <Ellipse cx={66} cy={158} rx={11} ry={7} fill={c.accent} opacity={0.35} />
        <Ellipse cx={134} cy={158} rx={11} ry={7} fill={c.accent} opacity={0.35} />
        {/* yeux */}
        {mood === 'love' ? (
          <>
            <Path d="M78 128 c -5 -7 -15 -2 -10 6 l 10 10 l 10 -10 c 5 -8 -5 -13 -10 -6 z" fill={c.accent} />
            <Path d="M122 128 c -5 -7 -15 -2 -10 6 l 10 10 l 10 -10 c 5 -8 -5 -13 -10 -6 z" fill={c.accent} />
          </>
        ) : (
          <>
            {eyesClosed ? (
              <Path d="M68 134 q 10 6 20 0" stroke={ink} strokeWidth={4.5} strokeLinecap="round" fill="none" />
            ) : (
              <G>
                <Ellipse cx={78} cy={133} rx={9} ry={mood === 'wow' ? 12 : 11} fill={ink} />
                <Circle cx={81} cy={129} r={3.2} fill="#fff" />
              </G>
            )}
            {mood === 'wink' || eyesClosed ? (
              <Path d="M112 134 q 10 6 20 0" stroke={ink} strokeWidth={4.5} strokeLinecap="round" fill="none" />
            ) : (
              <G>
                <Ellipse cx={122} cy={133} rx={9} ry={mood === 'wow' ? 12 : 11} fill={ink} />
                <Circle cx={125} cy={129} r={3.2} fill="#fff" />
              </G>
            )}
          </>
        )}
        {/* bouche */}
        {mood === 'wow' ? (
          <Ellipse cx={100} cy={170} rx={10} ry={12} fill={ink} />
        ) : (
          <G>
            <Path d="M80 160 Q 100 186 120 160 Z" fill={ink} stroke={ink} strokeWidth={4} strokeLinejoin="round" />
            <Path d="M90 172 Q 100 164 110 172 Q 100 180 90 172 Z" fill={c.accent} />
          </G>
        )}
      </Svg>
    </Animated.View>
  );
}
