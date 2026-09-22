import { Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';
import { Inter_400Regular, Inter_500Medium, Inter_600SemiBold, Inter_700Bold } from '@expo-google-fonts/inter';
import { useFonts } from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as SplashScreen from 'expo-splash-screen';
import { router, Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SystemUI from 'expo-system-ui';
import { useEffect, useMemo, useState } from 'react';
import { AccessibilityInfo, Alert, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ToastProvider } from '../components/Toast';
import { db } from '../db/database';
import { warmupStorage } from '../db/warmup';
import { cookedCount, listFridge } from '../db/repo';
import { useData } from '../hooks/useData';
import { I18nProvider, useI18n } from '../i18n';
import { exportBackup } from '../services/backup';
import { configureNotifications, rescheduleAll } from '../services/notifications';
import { PremiumProvider } from '../services/premium';
import { SettingsProvider, useSettings } from '../state/settings';
import { FONTS, makePalette, type Theme, ThemeContext, useTheme as useThemeValue } from '../theme/theme';

// Initialisation synchrone de la base locale + comportement des notifications
configureNotifications();
SplashScreen.preventAutoHideAsync().catch(() => {});

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Fraunces_600SemiBold,
    Fraunces_700Bold,
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });
  const [dbReady, setDbReady] = useState(false);
  useEffect(() => {
    warmupStorage()
      .catch(() => {})
      .finally(() => {
        db(); // ouverture + migrations de la base locale
        setDbReady(true);
      });
  }, []);
  const ready = (fontsLoaded || !!fontError) && dbReady;
  useEffect(() => {
    if (ready) SplashScreen.hideAsync().catch(() => {});
  }, [ready]);
  if (!ready) return null;
  return (
    <SafeAreaProvider>
      <SettingsProvider>
        <I18nProvider>
          <ThemeRoot />
        </I18nProvider>
      </SettingsProvider>
    </SafeAreaProvider>
  );
}

function ThemeRoot() {
  const { settings } = useSettings();
  const scheme = useColorScheme();
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    AccessibilityInfo.isReduceMotionEnabled().then(setReduceMotion).catch(() => {});
    const sub = AccessibilityInfo.addEventListener('reduceMotionChanged', setReduceMotion);
    return () => sub.remove();
  }, []);

  const mode: 'light' | 'dark' = settings.theme === 'auto' ? (scheme === 'dark' ? 'dark' : 'light') : settings.theme;
  // les couleurs autres que « sauge » sont Premium
  const accent = settings.premium ? settings.accent : 'sage';
  const theme: Theme = useMemo(() => ({ mode, c: makePalette(mode, accent), reduceMotion }), [mode, accent, reduceMotion]);

  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.c.bg).catch(() => {});
  }, [theme.c.bg]);

  return (
    <ThemeContext.Provider value={theme}>
      <PremiumProvider>
        <ToastProvider>
          <AppStack />
        </ToastProvider>
      </PremiumProvider>
    </ThemeContext.Provider>
  );
}

const DAY = 86_400_000;

function AppStack() {
  const { c, mode } = useThemeValue();
  const { settings, update } = useSettings();
  const { t, lang } = useI18n();
  const fridge = useData(listFridge);

  // (Re)programmation des rappels locaux quand le frigo ou les réglages changent
  useEffect(() => {
    const id = setTimeout(() => rescheduleAll(fridge, settings, lang), 800);
    return () => clearTimeout(id);
  }, [fridge, settings.expiryNotif, settings.expiryHour, settings.expiryMinute, settings.dinnerNotif, settings.dinnerHour, settings.recapNotif, settings.diets, settings.allergies, lang]); // eslint-disable-line react-hooks/exhaustive-deps

  // Toucher une notification ouvre le bon écran
  useEffect(() => {
    const sub = Notifications.addNotificationResponseReceivedListener((resp) => {
      const url = resp.notification.request.content.data?.url;
      if (typeof url === 'string') router.push(url as never);
    });
    return () => sub.remove();
  }, []);

  // Rappel doux de sauvegarde tous les 30 jours (seulement s'il y a des données à protéger)
  useEffect(() => {
    if (!settings.prefsDone) return;
    const hasData = fridge.length > 0 || cookedCount() > 0;
    const last = Math.max(
      settings.lastBackupAt ? Date.parse(settings.lastBackupAt) : 0,
      settings.backupReminderAt ? Date.parse(settings.backupReminderAt) : 0,
    );
    if (!hasData) return;
    if (last === 0) {
      // première fois : on attend 30 jours à partir de maintenant
      update({ backupReminderAt: new Date().toISOString() });
      return;
    }
    if (Date.now() - last < 30 * DAY) return;
    update({ backupReminderAt: new Date().toISOString() });
    Alert.alert(t('backupReminderTitle'), t('backupReminderText'), [
      { text: t('backupReminderLater'), style: 'cancel' },
      {
        text: t('exportData'),
        onPress: () =>
          exportBackup()
            .then(() => update({ lastBackupAt: new Date().toISOString() }))
            .catch(() => Alert.alert(t('exportError'))),
      },
    ]);
  }, [settings.prefsDone]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <StatusBar style={mode === 'dark' ? 'light' : 'dark'} />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: c.bg },
          headerTintColor: c.primaryText,
          headerTitleStyle: { color: c.text, fontFamily: FONTS.display },
          headerShadowVisible: false,
          contentStyle: { backgroundColor: c.bg },
          headerBackButtonDisplayMode: 'minimal',
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="recipe/[id]" options={{ headerShown: false }} />
        <Stack.Screen name="results" options={{ headerShown: false, animation: 'fade' }} />
        <Stack.Screen name="cook/[id]" options={{ headerShown: false, presentation: 'fullScreenModal', gestureEnabled: false }} />
        <Stack.Screen name="settings" options={{ title: t('settingsTitle') }} />
        <Stack.Screen name="premium" options={{ title: t('premiumTitle'), presentation: 'modal' }} />
        <Stack.Screen name="progress" options={{ title: t('progressTitle') }} />
        <Stack.Screen name="planner" options={{ title: t('plannerTitle') }} />
        <Stack.Screen name="empty-fridge" options={{ title: t('emptyFridgeTitle') }} />
        <Stack.Screen name="recipe-editor" options={{ title: t('editorTitle'), presentation: 'modal' }} />
        <Stack.Screen name="welcome" options={{ headerShown: false, presentation: 'fullScreenModal', gestureEnabled: false, animation: 'fade' }} />
        <Stack.Screen name="preferences" options={{ title: '', presentation: 'modal' }} />
        <Stack.Screen name="quick-fill" options={{ title: t('quickFillTitle'), presentation: 'modal' }} />
        <Stack.Screen name="fridge-add" options={{ title: t('fridgeAdd'), presentation: 'modal' }} />
        <Stack.Screen name="privacy" options={{ title: t('privacyPolicy') }} />
      </Stack>
    </>
  );
}

