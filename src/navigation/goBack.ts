import { router } from 'expo-router';

/**
 * Retour en arrière sûr : s'il n'y a pas d'écran précédent (page rechargée, lien ouvert directement…),
 * on revient à l'accueil au lieu de rester bloqué ou de planter.
 */
export function goBack() {
  if (router.canGoBack()) router.back();
  else router.replace('/');
}
