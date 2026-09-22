import Constants, { ExecutionEnvironment } from 'expo-constants';
import { Platform } from 'react-native';

/**
 * true quand l'appli tourne dans Expo Go (appli « Expo Go » des stores).
 * Expo Go ne contient pas les modules natifs des achats intégrés ni de la reconnaissance vocale :
 * ces fonctions sont alors simulées / désactivées pour pouvoir tester tout le reste.
 */
export const IS_EXPO_GO = Constants.executionEnvironment === ExecutionEnvironment.StoreClient;

/** Achats et reconnaissance vocale natifs indisponibles : Expo Go ou aperçu web */
export const NO_NATIVE_EXTRAS = IS_EXPO_GO || Platform.OS === 'web';
