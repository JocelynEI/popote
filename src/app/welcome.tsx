import { router } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Animated, Easing, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { Mascot, type Mood } from '../components/Mascot';
import { Button, haptic, Screen, Txt } from '../components/ui';
import { type TKey, useI18n } from '../i18n';
import { useSettings } from '../state/settings';
import { FONTS, radius, shadow, space, useTheme } from '../theme/theme';
import { goBack } from '../navigation/goBack';

interface Slide {
  mood: Mood;
  title: TKey;
  says: TKey;
  props: string[];
}

const SLIDES: Slide[] = [
  { mood: 'happy', title: 'welcome1Title', says: 'welcome1Says', props: ['👋'] },
  { mood: 'wow', title: 'welcome2Title', says: 'welcome2Says', props: ['🥚', '🥦', '🧀', '🍅'] },
  { mood: 'wink', title: 'welcome3Title', says: 'welcome3Says', props: ['⏰', '🌱', '💶'] },
  { mood: 'love', title: 'welcome4Title', says: 'welcome4Says', props: ['🔒', '💚'] },
];

/** Petits objets qui flottent autour de Frigo */
function Floaters({ items, reduceMotion }: { items: string[]; reduceMotion: boolean }) {
  const anims = useRef(items.map(() => new Animated.Value(0))).current;
  useEffect(() => {
    if (reduceMotion) return;
    const loops = anims.map((v, i) =>
      Animated.loop(
        Animated.sequence([
          Animated.delay(i * 250),
          Animated.timing(v, { toValue: 1, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(v, { toValue: 0, duration: 1400, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ]),
      ),
    );
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [anims, reduceMotion]);
  const spots = [
    { left: '4%', top: '14%' },
    { right: '4%', top: '8%' },
    { left: '8%', top: '62%' },
    { right: '8%', top: '58%' },
  ] as const;
  return (
    <>
      {items.map((e, i) => (
        <Animated.View
          key={`${e}-${i}`}
          style={[
            { position: 'absolute' },
            spots[i % spots.length],
            { transform: [{ translateY: anims[i].interpolate({ inputRange: [0, 1], outputRange: [0, -12] }) }, { rotate: anims[i].interpolate({ inputRange: [0, 1], outputRange: ['-8deg', '8deg'] }) }] },
          ]}
        >
          <Text style={{ fontSize: 34 }}>{e}</Text>
        </Animated.View>
      ))}
    </>
  );
}

/**
 * Présentation au premier lancement : Frigo, la mascotte, explique l'appli dans une bulle.
 * 4 étapes, « Passer » toujours visible, texte qui s'écrit (sauf « réduire les animations »).
 */
export default function WelcomeScreen() {
  const { c, reduceMotion } = useTheme();
  const { t } = useI18n();
  const { settings, update } = useSettings();
  const { height } = useWindowDimensions();
  const [i, setI] = useState(0);
  const [typed, setTyped] = useState(0);
  const slide = SLIDES[i];
  const full = t(slide.says);
  const last = i === SLIDES.length - 1;
  const done = typed >= full.length;
  const pop = useRef(new Animated.Value(1)).current;

  // texte de la bulle qui s'écrit
  useEffect(() => {
    setTyped(reduceMotion ? full.length : 0);
    AccessibilityInfo.announceForAccessibility(`${t(slide.title)}. ${full}`);
    if (reduceMotion) return;
    pop.setValue(0.85);
    Animated.spring(pop, { toValue: 1, friction: 5, useNativeDriver: true }).start();
    const id = setInterval(() => setTyped((n) => (n >= full.length ? n : n + 2)), 22);
    return () => clearInterval(id);
  }, [i]); // eslint-disable-line react-hooks/exhaustive-deps

  const finish = () => {
    // on navigue d'abord : même si l'enregistrement échouait, l'utilisateur n'est jamais bloqué
    if (!settings.prefsDone) router.replace('/preferences');
    else goBack();
    update({ welcomeSeen: true });
  };

  const next = () => {
    haptic();
    if (!done) return setTyped(full.length); // 1er appui : on affiche tout le texte
    if (last) finish();
    else setI(i + 1);
  };

  const mascotSize = Math.min(220, height * 0.24);

  return (
    <Screen edges={['top', 'bottom']}>
      {/* barre du haut */}
      <View style={styles.top}>
        <Txt style={{ fontFamily: FONTS.display, fontSize: 22 }} color={c.primaryText}>
          Mypopote
        </Txt>
        {!last && (
          <Pressable accessibilityRole="button" onPress={finish} hitSlop={10} style={{ padding: space(2) }}>
            <Txt color={c.textMuted} style={{ fontWeight: '600' }}>
              {t('prefsSkip')}
            </Txt>
          </Pressable>
        )}
      </View>

      <View style={{ flex: 1, paddingHorizontal: space(5), justifyContent: 'center' }}>
        <Txt v="display" style={{ textAlign: 'center' }} accessibilityRole="header">
          {t(slide.title)}
        </Txt>

        {/* bulle */}
        <Pressable accessibilityRole="text" accessibilityLabel={full} onPress={() => setTyped(full.length)}>
          <Animated.View style={[styles.bubble, { backgroundColor: c.surface, transform: [{ scale: pop }] }, shadow(c, 2)]}>
            {/* texte complet invisible : la bulle garde sa taille pendant l'écriture */}
            <Txt style={styles.bubbleText} color="transparent">
              {full}
            </Txt>
            <Txt style={[styles.bubbleText, StyleSheet.absoluteFill, { padding: space(5) }]}>{full.slice(0, typed)}</Txt>
            <View style={[styles.tail, { borderTopColor: c.surface }]} />
          </Animated.View>
        </Pressable>

        {/* Frigo */}
        <View style={{ alignItems: 'center', marginTop: space(4) }}>
          <View style={[styles.halo, { backgroundColor: c.primarySoft, width: mascotSize * 1.25, height: mascotSize * 1.25, borderRadius: mascotSize }]} />
          <View style={{ width: mascotSize * 1.9, alignItems: 'center' }}>
            <Floaters key={i} items={slide.props} reduceMotion={reduceMotion} />
            <Mascot size={mascotSize} mood={slide.mood} />
          </View>
        </View>
      </View>

      {/* points + bouton */}
      <View style={{ paddingHorizontal: space(5), paddingBottom: space(4) }}>
        <View style={styles.dots} accessibilityLabel={t('stepOf', { i: i + 1, n: SLIDES.length })}>
          {SLIDES.map((_, k) => (
            <View key={k} style={[styles.dot, { backgroundColor: k === i ? c.accent : c.border, width: k === i ? 24 : 8 }]} />
          ))}
        </View>
        <Button title={last ? t('welcomeGo') : t('next')} icon={last ? 'pot' : 'arrow-forward'} onPress={next} style={{ minHeight: 60 }} />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: space(5), minHeight: 52 },
  bubble: { borderRadius: radius.xl, padding: space(5), marginTop: space(6) },
  bubbleText: { fontSize: 18, lineHeight: 27 },
  tail: {
    position: 'absolute',
    bottom: -14,
    alignSelf: 'center',
    width: 0,
    height: 0,
    borderLeftWidth: 14,
    borderRightWidth: 14,
    borderTopWidth: 16,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  },
  halo: { position: 'absolute', top: '12%' },
  dots: { flexDirection: 'row', justifyContent: 'center', gap: 6, marginBottom: space(4) },
  dot: { height: 8, borderRadius: 4 },
});
