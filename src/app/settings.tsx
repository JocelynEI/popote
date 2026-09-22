import Constants from 'expo-constants';
import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { Alert, Linking, ScrollView, View } from 'react-native';
import { useToast } from '../components/Toast';
import { CONTACT_EMAIL, DEVELOPER_NAME } from '../config';
import { Button, Card, Chip, Screen, Section, Stepper, styles as ui, ToggleRow, Txt } from '../components/ui';
import { type TKey, useI18n } from '../i18n';
import { exportBackup, pickBackup, restoreBackup, safetyCopy } from '../services/backup';
import { getPermissionStatus, requestPermission } from '../services/notifications';
import { usePremium } from '../services/premium';
import { type AccentTheme, type LangPref, type ThemePref, useSettings } from '../state/settings';
import { ACCENTS, space, useTheme } from '../theme/theme';
import { goBack } from '../navigation/goBack';


export default function SettingsScreen() {
  const { c } = useTheme();
  const { t, fmtDate, lang } = useI18n();
  const { settings, update, replaceAll } = useSettings();
  const { isPremium, restore } = usePremium();
  const toast = useToast();
  const [perm, setPerm] = useState<'granted' | 'denied' | 'undetermined'>('undetermined');
  const [restoring, setRestoring] = useState(false);

  useEffect(() => {
    getPermissionStatus().then(setPerm).catch(() => {});
  }, []);

  /** Activer un rappel demande la permission si besoin (demande contextuelle) */
  const toggleNotif = async (patch: Partial<typeof settings>, turningOn: boolean) => {
    if (turningOn && perm !== 'granted') {
      const ok = await requestPermission(lang).catch(() => false);
      setPerm(ok ? 'granted' : 'denied');
      update({ notifAsked: true });
      if (!ok) return;
    }
    update(patch);
  };

  const doExport = async () => {
    try {
      await exportBackup();
      update({ lastBackupAt: new Date().toISOString() });
    } catch {
      Alert.alert(t('exportError'));
    }
  };

  const doImport = async () => {
    const res = await pickBackup();
    if (res.status === 'cancelled') return;
    if (res.status === 'invalid') return Alert.alert(t('importError'));
    Alert.alert(t('importConfirmTitle'), t('importConfirmText'), [
      { text: t('cancel'), style: 'cancel' },
      {
        text: t('confirm'),
        style: 'destructive',
        onPress: () => {
          try {
            safetyCopy();
            restoreBackup(res.backup);
            replaceAll({ ...settings, ...res.backup.settings, premium: settings.premium, notifAsked: settings.notifAsked });
            toast.show(t('importOk'));
          } catch {
            Alert.alert(t('importError'));
          }
        },
      },
    ]);
  };

  const langs: { v: LangPref; label: string }[] = [
    { v: 'auto', label: t('langAuto') },
    { v: 'fr', label: 'Français' },
    { v: 'en', label: 'English' },
  ];
  const themes: { v: ThemePref; label: string }[] = [
    { v: 'auto', label: t('themeAuto') },
    { v: 'light', label: t('themeLight') },
    { v: 'dark', label: t('themeDark') },
  ];

  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(4), paddingBottom: space(16) }}>
        <Card style={{ backgroundColor: c.surfaceAlt }}>
          <Txt>{t('privacyBadge')}</Txt>
        </Card>

        <Section title={t('sectionGeneral')}>
          <Txt v="label" muted style={{ marginBottom: space(2) }}>
            {t('language')}
          </Txt>
          <View style={ui.wrap}>
            {langs.map((x) => (
              <Chip key={x.v} label={x.label} selected={settings.lang === x.v} onPress={() => update({ lang: x.v })} />
            ))}
          </View>
          <Txt v="label" muted style={{ marginTop: space(4), marginBottom: space(2) }}>
            {t('theme')}
          </Txt>
          <View style={ui.wrap}>
            {themes.map((x) => (
              <Chip key={x.v} label={x.label} selected={settings.theme === x.v} onPress={() => update({ theme: x.v })} />
            ))}
          </View>
          <Txt v="label" muted style={{ marginTop: space(4), marginBottom: space(2) }}>
            {t('accent')}
          </Txt>
          <View style={ui.wrap}>
            {(Object.keys(ACCENTS) as AccentTheme[]).map((a) => (
              <Chip
                key={a}
                label={t(`accent_${a}` as TKey)}
                locked={a !== 'sage' && !isPremium}
                selected={(isPremium ? settings.accent : 'sage') === a}
                onPress={() => (a === 'sage' || isPremium ? update({ accent: a }) : router.push('/premium'))}
              />
            ))}
          </View>
        </Section>

        <Section title={t('sectionProfile')}>
          <Button kind="secondary" icon="nutrition-outline" title={`${t('prefsDiet')} · ${t('prefsAllergies')} · ${t('prefsServings')}`} onPress={() => router.push('/preferences')} />
        </Section>

        <Section title={t('sectionNotifications')}>
          {perm === 'denied' && (
            <Card style={{ backgroundColor: c.warningBg, marginBottom: space(3) }}>
              <Txt v="small" color={c.warning}>
                {t('notifDenied')}
              </Txt>
              <Button small kind="ghost" title={t('settings')} onPress={() => Linking.openSettings()} style={{ marginTop: space(2) }} />
            </Card>
          )}
          <ToggleRow label={t('notifExpiry')} value={settings.expiryNotif && perm === 'granted'} onChange={(v) => toggleNotif({ expiryNotif: v }, v)} />
          {settings.expiryNotif && perm === 'granted' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: space(2), marginBottom: space(2) }}>
              <Txt style={{ flex: 1 }} muted>
                {t('notifExpiryTime')} : {String(settings.expiryHour).padStart(2, '0')}:{String(settings.expiryMinute).padStart(2, '0')}
              </Txt>
              <Stepper value={settings.expiryHour} min={6} max={22} onChange={(h) => update({ expiryHour: h })} minusLabel="-1 h" plusLabel="+1 h" />
              <Chip label={`:${String(settings.expiryMinute).padStart(2, '0')}`} onPress={() => update({ expiryMinute: (settings.expiryMinute + 15) % 60 })} />
            </View>
          )}
          <ToggleRow label={t('notifDinner')} value={settings.dinnerNotif && perm === 'granted'} onChange={(v) => toggleNotif({ dinnerNotif: v }, v)} />
          {settings.dinnerNotif && perm === 'granted' && (
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: space(2) }}>
              <Txt style={{ flex: 1 }} muted>
                {String(settings.dinnerHour).padStart(2, '0')}:00
              </Txt>
              <Stepper value={settings.dinnerHour} min={10} max={22} onChange={(h) => update({ dinnerHour: h })} minusLabel="-1 h" plusLabel="+1 h" />
            </View>
          )}
          <ToggleRow label={t('notifRecap')} value={settings.recapNotif && perm === 'granted'} onChange={(v) => toggleNotif({ recapNotif: v }, v)} />
        </Section>

        <Section title={t('sectionBackup')}>
          <Txt v="small" muted style={{ marginBottom: space(3) }}>
            {t('backupExplain')}
          </Txt>
          <Txt v="small" style={{ marginBottom: space(3) }}>
            {settings.lastBackupAt ? t('lastBackup', { date: fmtDate(settings.lastBackupAt) }) : t('neverBackedUp')}
          </Txt>
          <View style={{ gap: space(2) }}>
            <Button icon="share-outline" title={t('exportData')} onPress={doExport} />
            <Button kind="secondary" icon="download-outline" title={t('importData')} onPress={doImport} />
          </View>
        </Section>

        <Section title={t('sectionPremium')}>
          {isPremium ? <Txt>{t('premiumActive')}</Txt> : <Button icon="star-outline" title={t('premiumTitle')} onPress={() => router.push('/premium')} />}
          <Button
            kind="ghost"
            title={t('restorePurchases')}
            loading={restoring}
            onPress={async () => {
              setRestoring(true);
              const found = await restore();
              setRestoring(false);
              toast.show(found ? t('restoreOk') : t('restoreNone'));
            }}
            style={{ marginTop: space(2) }}
          />
        </Section>

        <Section title={t('sectionAbout')}>
          <View style={{ gap: space(2) }}>
            <Button kind="ghost" icon="shield-checkmark-outline" title={t('privacyPolicy')} onPress={() => router.push('/privacy')} />
            <Button kind="ghost" icon="sparkles" title={t('replayWelcome')} onPress={() => router.push('/welcome')} />
            <Button kind="ghost" icon="bulb-outline" title={t('resetTips')} onPress={() => (update({ tipsSeen: [], privacyNoticeSeen: false }), goBack())} />
            <Button kind="ghost" icon="mail-outline" title={`${t('contact')} : ${CONTACT_EMAIL}`} onPress={() => Linking.openURL(`mailto:${CONTACT_EMAIL}`)} />
          </View>
          <Txt v="small" muted style={{ textAlign: 'center', marginTop: space(4) }}>
            Mypopote · {t('version', { v: Constants.expoConfig?.version ?? '1.0.0' })} · {DEVELOPER_NAME}
          </Txt>
        </Section>
      </ScrollView>
    </Screen>
  );
}
