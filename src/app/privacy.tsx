import { ScrollView } from 'react-native';
import { Screen, Txt } from '../components/ui';
import { useI18n } from '../i18n';
import { space } from '../theme/theme';
import { CONTACT_EMAIL } from '../config';

const FR = `Dernière mise à jour : septembre 2026

Popote est conçue pour respecter ta vie privée : l’application ne collecte, ne transmet et ne vend aucune donnée personnelle.

1. Aucune collecte
• Pas de compte, pas d’inscription, pas d’identifiant.
• Pas de serveur : Popote n’envoie rien sur internet.
• Pas de publicité, pas de mesure d’audience, pas de traceur.

2. Données stockées sur ton téléphone
Ton frigo, ta liste de courses, tes favoris, tes notes, tes recettes perso, ton historique et tes réglages sont enregistrés uniquement dans l’espace privé de l’application, sur ton appareil. Ils sont supprimés si tu désinstalles l’application.

3. Sauvegarde
L’export crée un fichier que TU choisis d’envoyer où tu veux (Drive, iCloud, e-mail…). Popote n’y a plus accès ensuite.

4. Autorisations
• Notifications (facultatif) : rappels programmés sur l’appareil.
• Micro et reconnaissance vocale (facultatif, mode cuisine) : la reconnaissance se fait sur l’appareil ; aucun enregistrement n’est conservé ni transmis.

5. Achats intégrés
Le paiement est entièrement géré par l’App Store ou Google Play. Popote ne reçoit aucune information bancaire.

6. Enfants
Popote ne collecte aucune donnée, y compris auprès des mineurs.

7. Contact
${CONTACT_EMAIL}`;

const EN = `Last updated: September 2026

Popote is built to respect your privacy: the app does not collect, transmit or sell any personal data.

1. No collection
• No account, no sign-up, no identifier.
• No server: Popote sends nothing over the internet.
• No ads, no analytics, no trackers.

2. Data stored on your phone
Your fridge, shopping list, favourites, notes, own recipes, history and settings are stored only in the app’s private storage on your device. They are deleted if you uninstall the app.

3. Backup
Export creates a file that YOU choose to send wherever you like (Drive, iCloud, email…). Popote has no access to it afterwards.

4. Permissions
• Notifications (optional): reminders scheduled on the device.
• Microphone and speech recognition (optional, cooking mode): recognition happens on the device; no recording is kept or sent.

5. In-app purchases
Payment is handled entirely by the App Store or Google Play. Popote receives no payment information.

6. Children
Popote collects no data at all, including from minors.

7. Contact
${CONTACT_EMAIL}`;

export default function PrivacyScreen() {
  const { lang } = useI18n();
  return (
    <Screen edges={['bottom']}>
      <ScrollView contentContainerStyle={{ padding: space(4), paddingBottom: space(16) }}>
        <Txt>{lang === 'fr' ? FR : EN}</Txt>
      </ScrollView>
    </Screen>
  );
}
