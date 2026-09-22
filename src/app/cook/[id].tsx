import { useKeepAwake } from 'expo-keep-awake';
import * as Notifications from 'expo-notifications';
import { router, useLocalSearchParams } from 'expo-router';
import { useCallback, useEffect, useRef, useState } from 'react';
import { AccessibilityInfo, Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { useToast } from '../../components/Toast';
import { Button, haptic, IconButton, Screen, Txt } from '../../components/ui';
import { useRecipe } from '../../hooks/useData';
import { useI18n } from '../../i18n';
import { getPermissionStatus } from '../../services/notifications';
import { speak, stopSpeaking, useVoiceCommands, type VoiceCommand } from '../../services/voice';
import { useSettings } from '../../state/settings';
import { radius, space, useTheme } from '../../theme/theme';

interface Timer {
  id: number;
  label: string;
  total: number; // secondes
  endsAt: number | null; // timestamp si en cours
  remaining: number; // secondes restantes si en pause
  notifId?: string;
}

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.max(0, s) % 60).padStart(2, '0')}`;

export default function CookMode() {
  useKeepAwake(); // l'écran reste allumé pendant la recette
  const { id } = useLocalSearchParams<{ id: string; servings?: string }>();
  const recipe = useRecipe(id);
  const { c } = useTheme();
  const { t, l, lang } = useI18n();
  const { settings, update } = useSettings();
  const toast = useToast();
  const [i, setI] = useState(0);
  const [timers, setTimers] = useState<Timer[]>([]);
  const [now, setNow] = useState(Date.now());
  const [width, setWidth] = useState(1);
  const [reading, setReading] = useState(false);
  const nextTimerId = useRef(1);
  const scale = settings.cookFontScale;

  const steps = recipe?.steps ?? [];
  const step = steps[i];
  const last = i === steps.length - 1;

  // tic des minuteurs
  useEffect(() => {
    if (!timers.some((x) => x.endsAt)) return;
    const h = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(h);
  }, [timers]);

  // minuteurs terminés
  useEffect(() => {
    const done = timers.filter((x) => x.endsAt && x.endsAt <= now);
    if (!done.length) return;
    // au premier plan : on annule la notification de relais pour éviter un doublon
    done.forEach((d) => d.notifId && Notifications.cancelScheduledNotificationAsync(d.notifId).catch(() => {}));
    haptic('success');
    toast.show(`${t('timerDone')} (${done.map((d) => d.label).join(', ')})`);
    speak(t('timerDone'), lang);
    setTimers((ts) => ts.filter((x) => !done.includes(x)));
  }, [now, timers, t, lang, toast]);

  const go = useCallback(
    (n: number) => {
      const target = Math.max(0, Math.min(steps.length - 1, n));
      setI(target);
      haptic();
      if (steps[target]) AccessibilityInfo.announceForAccessibility(`${t('stepOf', { i: target + 1, n: steps.length })}. ${l(steps[target].text)}`);
    },
    [steps, t, l],
  );

  const startTimer = useCallback(
    async (minutes: number, label: string) => {
      const secs = Math.round(minutes * 60);
      let notifId: string | undefined;
      // si l'appli passe en arrière-plan, une notification locale prend le relais
      if ((await getPermissionStatus()) === 'granted') {
        notifId = await Notifications.scheduleNotificationAsync({
          content: { title: t('timerDone'), body: `${recipe ? l(recipe.title) : ''} — ${label}` },
          trigger: { type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL, seconds: secs, channelId: 'reminders' },
        }).catch(() => undefined);
      }
      setTimers((ts) => [...ts, { id: nextTimerId.current++, label, total: secs, endsAt: Date.now() + secs * 1000, remaining: secs, notifId }]);
    },
    [recipe, l, t],
  );

  const stopTimer = (tm: Timer) => {
    if (tm.notifId) Notifications.cancelScheduledNotificationAsync(tm.notifId).catch(() => {});
    setTimers((ts) => ts.filter((x) => x.id !== tm.id));
  };
  const togglePause = (tm: Timer) => {
    if (tm.notifId) Notifications.cancelScheduledNotificationAsync(tm.notifId).catch(() => {});
    setTimers((ts) =>
      ts.map((x) =>
        x.id !== tm.id
          ? x
          : x.endsAt
            ? { ...x, endsAt: null, remaining: Math.ceil((x.endsAt - Date.now()) / 1000), notifId: undefined }
            : { ...x, endsAt: Date.now() + x.remaining * 1000 },
      ),
    );
  };

  const onVoice = useCallback(
    (cmd: VoiceCommand) => {
      if (cmd === 'next') go(i + 1);
      if (cmd === 'previous') go(i - 1);
      if (cmd === 'repeat' && step) speak(l(step.text), lang);
      if (cmd === 'timer' && step?.timer) startTimer(step.timer, t('stepOf', { i: i + 1, n: steps.length }));
    },
    [go, i, step, l, lang, startTimer, t, steps.length],
  );
  const voice = useVoiceCommands(lang, onVoice);

  useEffect(() => {
    if (voice.state === 'denied') toast.show(t('voiceDenied'));
    if (voice.state === 'unavailable') toast.show(t('voiceUnavailable'));
    if (voice.state === 'onlineOnly') toast.show(t('voiceOnlineWarn'), { duration: 6000 });
  }, [voice.state, t, toast]);

  useEffect(() => () => stopSpeaking(), []);

  if (!recipe || !step) return null;

  const setScale = (s: number) => update({ cookFontScale: Math.round(Math.min(1.8, Math.max(0.8, s)) * 10) / 10 });

  return (
    <Screen edges={['top', 'bottom']}>
      {/* barre du haut */}
      <View style={styles.top}>
        <IconButton icon="close" label={t('close')} onPress={() => router.back()} />
        <Txt v="label" muted style={{ flex: 1, textAlign: 'center' }}>
          {t('stepOf', { i: i + 1, n: steps.length })}
        </Txt>
        <IconButton icon="remove-circle-outline" label={t('fontSmaller')} onPress={() => setScale(scale - 0.1)} />
        <IconButton icon="add-circle-outline" label={t('fontBigger')} onPress={() => setScale(scale + 0.1)} />
      </View>
      <View style={[styles.progress, { backgroundColor: c.surface }]}>
        <View style={{ width: `${((i + 1) / steps.length) * 100}%`, backgroundColor: c.primary, height: '100%', borderRadius: 3 }} />
      </View>

      {/* zone de texte : toucher la moitié droite = étape suivante */}
      <Pressable
        accessible={false}
        onLayout={(e) => setWidth(e.nativeEvent.layout.width)}
        onPress={(e) => {
          if (e.nativeEvent.locationX > width / 2) {
            if (!last) go(i + 1);
          } else go(i - 1);
        }}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: space(6), flexGrow: 1, justifyContent: 'center' }}>
          <Txt style={{ fontSize: 28 * scale, lineHeight: 38 * scale, fontWeight: '600' }} maxFontSizeMultiplier={2.2} accessibilityRole="text">
            {l(step.text)}
          </Txt>
          {step.timer ? (
            <Button
              kind="secondary"
              icon="timer-outline"
              title={t('timerStart', { n: step.timer })}
              onPress={() => startTimer(step.timer!, t('stepOf', { i: i + 1, n: steps.length }))}
              style={{ marginTop: space(6), alignSelf: 'flex-start' }}
            />
          ) : null}
          <Txt v="small" muted style={{ marginTop: space(8) }}>
            {t('tapRightHint')}
          </Txt>
        </ScrollView>
      </Pressable>

      {/* minuteurs en parallèle */}
      {timers.length > 0 && (
        <View style={{ paddingHorizontal: space(4), gap: space(2) }}>
          {timers.map((tm) => {
            const rem = tm.endsAt ? Math.ceil((tm.endsAt - now) / 1000) : tm.remaining;
            return (
              <View key={tm.id} style={[styles.timer, { backgroundColor: c.surfaceAlt }]} accessible accessibilityLabel={`${tm.label}, ${fmt(rem)}`}>
                <Txt v="h3" style={{ fontVariant: ['tabular-nums'], minWidth: 70 }}>
                  ⏱ {fmt(rem)}
                </Txt>
                <Txt v="small" muted style={{ flex: 1 }} numberOfLines={1}>
                  {tm.label}
                </Txt>
                <IconButton icon={tm.endsAt ? 'pause' : 'play'} label={tm.endsAt ? t('timerPause') : t('timerResume')} onPress={() => togglePause(tm)} />
                <IconButton icon="stop" label={t('timerStop')} onPress={() => stopTimer(tm)} />
              </View>
            );
          })}
        </View>
      )}

      {/* commandes */}
      <View style={styles.tools}>
        <IconButton
          icon={reading ? 'volume-mute-outline' : 'volume-high-outline'}
          label={reading ? t('stopReading') : t('readAloud')}
          onPress={() => {
            if (reading) stopSpeaking();
            else speak(l(step.text), lang);
            setReading(!reading);
          }}
        />
        <IconButton
          icon={voice.state === 'listening' ? 'mic' : 'mic-outline'}
          label={voice.state === 'listening' ? t('voiceOn') : t('voiceOff')}
          color={voice.state === 'listening' ? c.primaryText : undefined}
          onPress={() => (voice.state === 'listening' ? voice.stop() : voice.start())}
        />
        <IconButton icon="timer-outline" label={t('addTimer')} onPress={() => startTimer(5, t('addTimer').replace('+ ', ''))} />
        {voice.state === 'listening' && (
          <Txt v="small" muted style={{ flex: 1 }}>
            {t('voiceHelp')}
          </Txt>
        )}
      </View>
      <View style={styles.nav}>
        <Button kind="ghost" icon="arrow-back" title={t('previous')} onPress={() => go(i - 1)} disabled={i === 0} style={{ flex: 1 }} />
        {last ? (
          <Button icon="checkmark" title={t('finish')} onPress={() => router.back()} style={{ flex: 1 }} />
        ) : (
          <Button icon="arrow-forward" title={t('next')} onPress={() => go(i + 1)} style={{ flex: 1 }} />
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  top: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: space(2) },
  progress: { height: 6, marginHorizontal: space(4), borderRadius: 3, overflow: 'hidden' },
  timer: { flexDirection: 'row', alignItems: 'center', borderRadius: radius.md, paddingHorizontal: space(3) },
  tools: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: space(3), gap: space(1), minHeight: 52 },
  nav: { flexDirection: 'row', gap: space(3), padding: space(4), paddingTop: space(1) },
});
