# 🧊 Mypopote : cuisine ce qu'il y a au frigo

Application React Native / Expo (SDK 57) · iOS + Android · FR / EN
**Sans compte · aucune donnée collectée · 100 % locale · hors ligne · achat unique Premium 2,99 €**

---

## 1. Démarrer

```bash
npm install
npm test            # tests de la logique métier (13 tests)
npm run typecheck   # vérification TypeScript
```

### Tester vite avec Expo Go

```bash
npm run go          # = npx expo start --go  → scanne le QR code avec l'appli Expo Go
```

Dans Expo Go, tout fonctionne **sauf** deux choses qui demandent du code natif : l'achat Premium est **simulé** (une fenêtre te propose de l'activer, pratique pour tester les écrans Premium) et la **commande vocale** est indisponible (la lecture à voix haute marche). Si Expo Go affiche « SDK incompatible », mets à jour l'appli Expo Go sur ton téléphone.

### Tester le vrai achat et la commande vocale : *development build*

```bash
npx eas-cli@latest login
npx eas-cli@latest init                              # crée le projet EAS et remplit extra.eas.projectId
npx eas-cli@latest build --profile development -p android   # (ou -p ios)
npx expo start --dev-client
```

Sur Mac avec Xcode / Android Studio, tu peux aussi lancer `npx expo run:ios` ou `npx expo run:android`.

### Aperçu web sur GitHub Pages

À chaque `git push` sur la branche `main`, le workflow `.github/workflows/pages.yml` construit et publie l'aperçu web
(`https://TON-PSEUDO.github.io/NOM-DU-DEPOT/`). Pour le construire à la main : `EXPO_BASE_URL=/popote npm run build:web` (résultat dans `dist/`).
Limites de l'aperçu web : pas de notifications, pas de dictée vocale, achat Premium simulé. Au premier chargement, la page se recharge une fois (activation de la base locale).

## 2. Publier

```bash
npm run build:android    # AAB de production (EAS Build)
npm run build:ios        # IPA de production
npm run submit           # envoi vers les stores (EAS Submit)
```

Avant la première publication, complète :

| Fichier | À modifier |
|---|---|
| `src/config.ts` | `CONTACT_EMAIL` (adresse publique) |
| `store-listing/politique-confidentialite.html` | l'e-mail, puis héberge la page (GitHub Pages, Netlify…) et mets son URL dans les stores |
| `app.config.ts` | vérifie `com.misterj.mypopote` (identifiant **définitif** une fois publié) |
| `eas.json` | `submit.production.ios.ascAppId` (ID de l'app dans App Store Connect) |

Tous les textes des stores (nom, sous-titre, descriptions FR/EN, mots-clés, questionnaires de confidentialité, classification, achat intégré, idées de captures) sont dans **`store-listing/fiches-stores.md`**.

## 3. Arborescence

```
src/
  app/                    ← écrans (Expo Router)
    (tabs)/index.tsx      Cuisiner : recherche, filtres, résultats, bandeau « à utiliser vite »
    (tabs)/fridge.tsx     Mon frigo : pastilles de péremption, Utilisé / Jeté, annulation
    (tabs)/shopping.tsx   Courses : cocher, partager, « Terminer » → frigo
    (tabs)/recipes.tsx    Favoris / Historique / Mes créations
    recipe/[id].tsx       Fiche recette : portions, ✓/✗, substitutions, note, « J'ai cuisiné »
    cook/[id].tsx         Mode cuisine : gros texte, écran allumé, minuteurs, voix
    fridge-add.tsx        Ajout / date d'un produit (doublons, garde-fous de dates)
    quick-fill.tsx        Grille « Remplir mon frigo rapidement » (30 produits)
    empty-fridge.tsx      Mode « Vider le frigo »
    preferences.tsx       Préférences du 1er lancement (facultatif)
    progress.tsx          Compteurs, badges, récap semaine + stats détaillées (Premium)
    planner.tsx           Planning de la semaine (Premium)
    recipe-editor.tsx     Recettes perso
    settings.tsx          Réglages, rappels, sauvegarde, Premium
    premium.tsx · privacy.tsx
  data/                   ← contenu : ingrédients, recettes, substitutions
  logic/                  ← logique métier pure (testée) : matching, portions, péremption, régimes…
  db/                     ← SQLite (expo-sqlite) : schéma + accès aux données
  services/               ← notifications locales, sauvegarde, achat intégré, voix
  i18n/                   ← textes FR / EN
  theme/ · components/ · hooks/ · state/
store-listing/            ← fiches stores, politique de confidentialité, textes des autorisations iOS
assets/source/            ← icône en SVG (modifiable) + script de rendu PNG
scripts/logic.test.ts     ← tests
```

## 4. Design (spécification UX/UI v2)

- Couleurs : Vert Sauge `#82A98B` (header, liens, icônes actives), Zeste d'Orange `#F28C38` (CTA, alertes, badge « Rapide »), Crème d'Avoine `#FDFBF7` (fond), Surface `#FFFFFF`, Gris Poivre `#2D3142`, texte secondaire `#6B7280`.
- Accessibilité : le blanc sur sauge (2,6:1) et sur orange (2,5:1) ne passe pas WCAG AA → le texte posé sur l'orange est en Gris Poivre (5,3:1), et le texte « couleur » utilise des variantes foncées (sauge `#4A7454`, orange `#A94F0E`).
- Typo : **Fraunces** (logo, titres) + **Inter** (corps, 16 px / 14 px pour les tags, 18 px pour les étapes).
- Géométrie : cartes à 16 px, boutons principaux en pilule, ombre douce `0 10px 25px -5px rgba(0,0,0,0.05)`.
- Icônes : Lucide (trait 2 px, bouts arrondis) via `src/components/Icon.tsx`.
- Parcours : Accueil (saisie en phrase ou dictée, ajout rapide, puces « Mon frigo », CTA « Créer ma Mypopote ») → chargement animé (`MypopoteLoader`) → feed de résultats (`FeedRecipeCard`) → fiche recette « mode cuisson ».
- Moteur de suggestions interchangeable : `src/services/recipeEngine.ts` (local et hors ligne aujourd'hui ; un moteur IA peut s'y brancher, mais cela changerait la promesse de confidentialité).

## 5. Règles métier clés

- **Score d'une recette** = ingrédients disponibles ÷ ingrédients nécessaires (hors base placard ; une substitution compte 0,8).
- **Tri** : manquants (0 → 1 → 2) › produits bientôt périmés utilisés › pas cuisinée depuis moins de 4 jours › score › temps. Au-delà de 2 manquants, la recette est masquée (on élargit à 3 seulement s'il n'y a aucun résultat).
- **Base placard** (jamais manquante) : sel, poivre, huile, farine, sucre, eau.
- **Péremption** : rouge ≤ 1 jour, orange 2 à 3 jours, vert au-delà ; « à utiliser vite » ≤ 2 jours.
- **Produit sauvé** = marqué « Utilisé » alors qu'il périmait dans 3 jours ou moins. Économie estimée : 1,30 € par produit (affiché comme estimation).
- **Régimes et allergènes** calculés automatiquement à partir des ingrédients obligatoires ; les ingrédients facultatifs incompatibles sont signalés.
- **Rappels** : une notification par jour (17 h 30 par défaut) seulement s'il y a des produits qui périment dans 2 jours ou moins, reprogrammée à chaque changement du frigo. Pas d'alarmes exactes.
- **Premium** : non consommable `mypopote_premium_lifetime`, déblocage stocké localement, bouton « Restaurer mes achats ».

## 6. Ajouter des recettes

Le lot actuel contient **105 recettes gratuites + 12 Premium** et **112 ingrédients**. L'objectif est d'atteindre ~300 recettes gratuites et ~300 Premium.
Ajoute-les dans `src/data/recipes.ts` (ou `recipesPremium.ts` avec `premium: true`) :

```ts
r({
  id: 'mon_id_unique', fr: 'Titre FR', en: 'EN title', icon: '🍲', course: 'main', time: 25, diff: 1, serv: 2,
  ing: 'egg 3; milk 100 ml; emmental 50 g?; salt',   // « ? » = facultatif ; unités : g ml pc tbsp tsp pinch slice clove can bunch
  steps: [
    ['Étape en français.', 'Step in English.', 5],   // 3e valeur = minuteur (min), facultatif
  ],
}),
```

Puis lance `npm test` : le test vérifie les ids, les ingrédients et les traductions. Pour choisir l'illustration de la recette, ajoute son id dans `BY_RECIPE` (`src/data/illustrations.ts`).

## 7. Prévu en version 1.1

- **Widget écran d'accueil** « produits bientôt périmés » (gratuit) : il demande du code natif spécifique (WidgetKit iOS / App Widget Android) via un *config plugin* ; il est volontairement reporté pour ne pas retarder la sortie.
- Compléter la base de recettes (voir §5).

## 8. Confidentialité (vérifiée)

- Aucune dépendance d'analytics, de publicité ou de crash reporting.
- Autorisations Android : notifications, micro (à la demande), facturation. Localisation, caméra, contacts, stockage, alarmes exactes et identifiant publicitaire sont **bloqués** dans `app.config.ts`.
- iOS : manifeste de confidentialité « aucune donnée collectée, aucun suivi ».
- La commande vocale ne démarre **que** si la reconnaissance peut se faire sur l'appareil.
