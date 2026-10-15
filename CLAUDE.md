@AGENTS.md

# CLAUDE.md

Consignes pour coder dans ce projet. Elles s'appliquent à chaque session.
Le détail de l'appli (fonctionnalités, règles métier, design) est dans `README.md` et, une fois la refonte cadrée, dans `CAHIER_DES_CHARGES.md` : les lire avant toute modification.

## Le projet en bref

Mypopote : on dit ce qu'on a dans le frigo, l'appli propose des recettes faisables tout de suite et aide à finir les produits avant qu'ils périment.
Appli mobile React Native / Expo (SDK 57), locale, sans compte, FR / EN, avec un achat intégré unique (Premium à vie, `mypopote_premium_lifetime`).
TypeScript strict, expo-router (écrans dans `src/app/`), expo-sqlite pour le frigo, l'historique et les courses, notifications locales uniquement.

## Règles non négociables

Ne jamais les contourner, même pour « simplifier » ou « tester ». Si une demande semble les contredire, s'arrêter et poser la question.

- Aucun compte, aucun login, aucun backend.
- Aucune donnée ne sort du téléphone. Pas d'analytics, pas de SDK tiers qui envoie des identifiants, pas de publicité.
- La commande vocale ne démarre que si la reconnaissance se fait sur l'appareil.
- Achats intégrés via expo-iap, qui parle directement aux stores. Pas de RevenueCat.
- Le bouton « Restaurer mes achats » doit toujours exister et fonctionner.
- Aucune fonctionnalité cœur ne devient payante : chercher une recette, gérer son frigo, les courses et le mode cuisine restent gratuits.

## 1. Réfléchir avant de coder

- Dire ce que tu as compris de la demande et tes hypothèses avant de modifier quoi que ce soit.
- Si la demande peut se lire de deux façons, présenter les deux et demander. Ne pas choisir en silence.
- Si une solution plus simple existe, la proposer.
- Pour toute dépendance ou API Expo, vérifier la documentation actuelle (voir `AGENTS.md`) : le SDK change vite, ne pas se fier à sa mémoire.

## 2. Faire simple

- Coder ce qui est demandé, rien de plus. Pas de fonctionnalité « au cas où ».
- Pas d'abstraction pour un code utilisé une seule fois.
- Pas de nouvelle dépendance sans l'annoncer et dire pourquoi (et l'installer avec `npx expo install`).
- Si 200 lignes peuvent en faire 50, réécrire.

## 3. Modifier seulement ce qui est demandé

- Ne pas « améliorer » le code voisin, les commentaires ou la mise en forme.
- Ne pas toucher à la logique des achats, du stockage ou des notifications si la demande ne les concerne pas.
- Respecter le style existant.
- Code mort ou problème repéré ailleurs : le signaler, ne pas le corriger d'office.
- Supprimer seulement ce que ta propre modification a rendu inutile.

Le test : chaque ligne modifiée doit se rattacher à la demande.

## 4. Où va le code

- Toute la logique métier (correspondance recettes / frigo, tri, portions, péremption, régimes, badges) va dans `src/logic/`, en fonctions pures sans import React Native.
- Les écrans (`src/app/`) affichent et appellent cette logique. Ils ne calculent pas.
- Le contenu (ingrédients, recettes, substitutions) reste dans `src/data/`, les textes dans `src/i18n/` (toujours en FR et en EN).
- Chaque fonction de `src/logic/` a ses tests dans `scripts/logic.test.ts`.

## 5. Vérifier avant de dire « c'est fait »

Pour une tâche en plusieurs étapes, annoncer un plan court :

```
1. [Étape] → vérification : [contrôle]
2. [Étape] → vérification : [contrôle]
```

À chaque modification, lancer :

- `npm run typecheck`
- `npm test`
- `npm run lint`
- `npx expo-doctor` quand c'est possible

Ne jamais annoncer qu'une tâche est terminée si l'un de ces contrôles échoue.

Pour un nouvel écran : faire d'abord une maquette HTML à 390 px de large, la regarder (textes qui débordent, éléments importants sous le pli), puis coder l'écran.

## 6. Des tests qui empêchent les régressions

- Chaque bug corrigé reçoit un test qui échoue si le bug revient.
- Les règles de fond ont leur test : aucune donnée personnelle ne sort du téléphone, aucun message ne félicite un zéro ni ne signale un manque.
- Les règles de recettes se vérifient sur tout le catalogue, pas sur trois exemples.

## 7. Ce que l'appli dit

- Pas de valeur préremplie pour une donnée que l'utilisateur doit saisir (une date de péremption, par exemple).
- Afficher la réponse (« 3 recettes possibles tout de suite ») plutôt que le constat.
- Féliciter ce qui a été fait (un plat cuisiné, un produit sauvé), jamais un zéro. Sans rien à saluer, se taire.
- Pas de culpabilisation sur le gaspillage.
- Ton clair et neutre sur les écrans d'achat, de consentement et de confidentialité.

## 8. Une version, un sujet

Chaque livraison porte un seul changement, avec :

- son numéro de version ;
- une ligne dans `CHANGELOG.md` ;
- sa recette : la liste courte de ce que je dois essayer sur mon téléphone pour valider.

Travailler sur une branche et passer par une demande de fusion : un envoi sur `main` publie l'aperçu web (GitHub Pages).

---

Ces consignes marchent si : les modifications restent petites, il y a peu de retours en arrière, et les questions arrivent avant le code plutôt qu'après les erreurs.
