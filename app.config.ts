import type { ExpoConfig } from 'expo/config';

/**
 * Configuration Expo / EAS de Popote.
 * ⚠️ Avant la première soumission : vérifier `ios.bundleIdentifier`, `android.package`
 *    et renseigner `extra.eas.projectId` (rempli automatiquement par `eas init`).
 */
const IS_DEV = process.env.APP_VARIANT === 'development';

const config: ExpoConfig = {
  name: IS_DEV ? 'Popote (dev)' : 'Popote',
  slug: 'popote',
  scheme: 'popote',
  version: '1.0.0',
  orientation: 'portrait',
  icon: './assets/icon.png',
  userInterfaceStyle: 'automatic', // mode sombre suivi automatiquement
  ios: {
    bundleIdentifier: IS_DEV ? 'com.misterj.popote.dev' : 'com.misterj.popote',
    buildNumber: '1',
    supportsTablet: true,
    config: { usesNonExemptEncryption: false }, // pas de chiffrement propriétaire -> pas de déclaration d'export
    infoPlist: {
      CFBundleAllowMixedLocalizations: true,
    },
    // Manifeste de confidentialité Apple : aucune donnée collectée, aucun traçage.
    privacyManifests: {
      NSPrivacyTracking: false,
      NSPrivacyTrackingDomains: [],
      NSPrivacyCollectedDataTypes: [],
      NSPrivacyAccessedAPITypes: [
        // UserDefaults (utilisé par React Native / Expo)
        { NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryUserDefaults', NSPrivacyAccessedAPITypeReasons: ['CA92.1'] },
        // horodatage de fichiers (SQLite, export de sauvegarde)
        { NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryFileTimestamp', NSPrivacyAccessedAPITypeReasons: ['C617.1'] },
        { NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategorySystemBootTime', NSPrivacyAccessedAPITypeReasons: ['35F9.1'] },
        { NSPrivacyAccessedAPIType: 'NSPrivacyAccessedAPICategoryDiskSpace', NSPrivacyAccessedAPITypeReasons: ['E174.1'] },
      ],
    },
  },
  android: {
    package: IS_DEV ? 'com.misterj.popote.dev' : 'com.misterj.popote',
    versionCode: 1,
    adaptiveIcon: {
      backgroundColor: '#F28C38',
      foregroundImage: './assets/android-icon-foreground.png',
      backgroundImage: './assets/android-icon-background.png',
      monochromeImage: './assets/android-icon-monochrome.png',
    },
    predictiveBackGestureEnabled: false,
    // Autorisations strictement nécessaires : notifications (demandée au bon moment),
    // micro (commande vocale, à la demande), facturation (achat intégré, ajoutée par expo-iap).
    permissions: ['android.permission.POST_NOTIFICATIONS', 'android.permission.RECORD_AUDIO'],
    // On bloque explicitement ce que des bibliothèques pourraient ajouter sans qu'on en ait besoin.
    blockedPermissions: [
      'android.permission.ACCESS_FINE_LOCATION',
      'android.permission.ACCESS_COARSE_LOCATION',
      'android.permission.ACCESS_BACKGROUND_LOCATION',
      'android.permission.CAMERA',
      'android.permission.READ_CONTACTS',
      'android.permission.WRITE_CONTACTS',
      'android.permission.READ_EXTERNAL_STORAGE',
      'android.permission.WRITE_EXTERNAL_STORAGE',
      'android.permission.READ_MEDIA_IMAGES',
      'android.permission.READ_MEDIA_VIDEO',
      'android.permission.READ_MEDIA_AUDIO',
      'android.permission.SYSTEM_ALERT_WINDOW',
      'android.permission.SCHEDULE_EXACT_ALARM',
      'android.permission.USE_EXACT_ALARM',
      'com.google.android.gms.permission.AD_ID',
    ],
  },
  web: { favicon: './assets/favicon.png' },
  plugins: [
    'expo-router',
    'expo-sqlite',
    'expo-localization',
    'expo-sharing',
    [
      'expo-splash-screen',
      {
        image: './assets/splash-icon.png',
        imageWidth: 200,
        resizeMode: 'contain',
        backgroundColor: '#FDFBF7',
        dark: { image: './assets/splash-icon.png', backgroundColor: '#191B22' },
      },
    ],
    ['expo-notifications', { color: '#82A98B' }],
    [
      'expo-speech-recognition',
      {
        microphonePermission: 'Popote utilise le micro uniquement quand tu actives la commande vocale en mode cuisine (« suivant », « répète »…). Rien n’est enregistré.',
        speechRecognitionPermission:
          'La reconnaissance vocale se fait sur ton téléphone pour comprendre « suivant », « précédent », « répète » et « minuteur » en mode cuisine.',
        androidSpeechServicePackages: ['com.google.android.googlequicksearchbox', 'com.google.android.as'],
      },
    ],
    'expo-iap',
  ],
  locales: {
    fr: './store-listing/locales/fr.json',
    en: './store-listing/locales/en.json',
  },
  experiments: { typedRoutes: true },
  extra: {
    router: {},
    eas: {
      // projectId: 'à compléter après `npx eas-cli@latest init`',
    },
  },
};

export default config;
