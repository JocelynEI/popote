# MyPopote : cahier des charges de la refonte (V1.1 à V1.8)

Rédigé le 15 octobre 2026, en mode « choisis pour moi », à partir de l'état de l'appli (V1.0, pas encore publiée) et de 140 avis réels sur Frigo Magic, Jow et Supercook (`docs/analyse-concurrents/analyse.md`).
Les règles métier et le design actuels restent décrits dans `README.md`. Ce document dit ce qui change.

## 1. La promesse

« Dis ce que tu as, MyPopote te dit quoi cuisiner, à commencer par ce qui va périmer. Sans compte, sans pub, sans abonnement. »

Moment magique : ouvrir l'appli et voir tout de suite ce qu'on peut cuisiner ce soir avec son frigo, sans rien taper si le frigo est déjà rempli.

Pour qui : quelqu'un qui cuisine pour une à quatre personnes, ouvre l'appli vers 18 h devant son frigo, n'a pas envie de commander ses courses en ligne ni de créer un compte. Il parle de « restes », de « trucs à finir », de « ce qui traîne », pas d'« inventaire ».

## 2. Ce qui ne change pas

- Aucun compte, aucune donnée envoyée, pas de pub, hors ligne.
- Expo SDK 57, expo-router, expo-sqlite, notifications locales, FR et EN.
- Premium : un achat unique à vie, 2,99 €, `mypopote_premium_lifetime`, bouton « Restaurer mes achats ».
- Couleurs et polices : sauge `#82A98B`, orange `#F28C38`, crème `#FDFBF7`, Fraunces et Inter. Elles tiennent déjà la route ; la refonte porte sur la disposition et les mots, pas sur la palette.
- Mode cuisine, substitutions, portions, régimes et allergènes, notes par recette, courses.

## 3. Ce qui change

### 3.1 Un seul frigo

Aujourd'hui il y en a deux : la sélection de l'accueil (temporaire) et l'onglet « Mon frigo » (avec les dates). Il n'en reste qu'un.

- Ce qu'on tape ou dicte sur l'accueil entre dans le frigo, sans date.
- L'onglet Frigo range les produits en trois blocs : « À finir vite » (2 jours ou moins), « Avec une date », « Sans date ».
- La date reste facultative et jamais préremplie. On la choisit d'un appui parmi « demain », « dans 3 jours », « dans une semaine », ou dans le calendrier.
- « J'ai cuisiné » propose de retirer du frigo les ingrédients utilisés (c'est déjà le cas) ; le choix par défaut est « Oui, retirer ».
- Pour chercher avec quelques produits seulement (« ce soir je veux finir les courgettes »), on décoche dans les résultats ; ça ne touche pas au frigo.

### 3.2 L'accueil en cartes

Ordre fixe, de haut en bas :

1. En-tête : logo, Progrès, Réglages.
2. Carte « À finir vite », seulement s'il y a des produits à 2 jours ou moins : leurs noms et « Voir les idées ».
3. Carte « Tout de suite » : les trois meilleures recettes faisables avec le frigo, sans ingrédient manquant, puis « Voir toutes les idées (n) ».
4. Gros bouton « Ajouter ce que j'ai », qui ouvre la saisie (texte ou dictée) et l'ajout rapide.
5. Deux tuiles : « Remplir mon frigo » et « Vider le frigo ».

Frigo vide : la carte 3 propose trois recettes faites avec le placard seul (pâtes à l'ail, riz sauté, omelette s'il y a des œufs), sous le titre « Avec ton placard ». Le bouton « Ajouter ce que j'ai » monte en premier.

La bulle d'aide orange qui recouvrait la saisie disparaît. Une seule aide au premier lancement, après le premier ajout.

### 3.3 Des résultats plus serrés

- Cartes compactes : vignette carrée de 72 px, titre sur deux lignes au plus, temps, et ce qui manque. Six recettes par écran au lieu de deux.
- Deux groupes : « Tout de suite » et « Il te manque une chose ».
- Filtres visibles en haut : temps (15, 30, 60 min), entrée / plat / dessert, et ustensiles (voir 3.5).
- Le grand visuel reste sur la fiche recette.

### 3.4 Les mots

- Plus de « (s) » : une fonction de pluriel dans `src/i18n` (« 1 recette », « 44 recettes »).
- On ne fête jamais un zéro. « 0 produit sauvé ce mois-ci 🎉 » disparaît : sans rien à saluer, la carte n'apparaît pas.
- Le « taux de gaspillage » disparaît des progrès. Le bouton « Jeté » reste dans le frigo pour retirer un produit, sans statistique derrière.
- Badges : seuls ceux obtenus sont affichés, plus le prochain à portée. Fini le mur de neuf cadenas.
- Adresse de contact : meo.compagnie@gmail.com à la place de `contact@example.com` (décidé le 16 octobre 2026).

### 3.5 Préférences : ce que je n'aime pas, ce que j'ai comme ustensiles

- « Je n'aime pas » : une liste d'ingrédients exclus. Une recette qui en contient un en obligatoire est masquée ; s'il est facultatif, il est signalé.
- Ustensiles : four, micro-ondes, mixeur, robot ou cuiseur multifonction. Par défaut, rien n'est coché et rien n'est filtré ; une recette qui demande un ustensile non coché est masquée seulement si l'utilisateur a rempli cette question.
- Chaque recette reçoit un champ `tools` (liste d'ustensiles nécessaires au-delà d'une poêle et d'une casserole). Un test vérifie que les 117 recettes l'ont.
- Les deux questions arrivent dans les préférences du premier lancement, une par écran, et restent modifiables dans Réglages.

### 3.6 Le catalogue

- Objectif : 250 recettes gratuites et 60 Premium, en deux lots (V1.6 puis V1.7).
- Priorités du contenu : végétarien, petit budget, « placard presque vide », légumes souvent jetés (courgette, aubergine, poireau, épinards, salade).
- Chaque lot passe un contrôle sur tout le catalogue : ingrédients connus, traductions, ustensiles, et une relecture des recettes qui sortent à 100 % avec une substitution (le cas « salade tomate-mozzarella avec du fromage râpé »).

### 3.7 Premium

Reste à 2,99 € une fois : pack de recettes, planning de la semaine, statistiques détaillées, couleurs.
Sur l'écran Premium, une phrase claire : « Ce qui est gratuit aujourd'hui le restera. »
Restent gratuits pour toujours : le frigo et ses dates, les rappels, la recherche, les filtres, les favoris, les notes, l'historique, les courses, le mode cuisine, les préférences. Un test échoue si l'un d'eux passe derrière `isPremium`.

### 3.8 Notifications

- Rappel « à finir vite » : inchangé (une par jour, 17 h 30, seulement s'il y a des produits à 2 jours ou moins).
- Récap du dimanche : envoyé seulement si la semaine compte au moins une recette cuisinée ou un produit utilisé. Aujourd'hui il part chaque dimanche, même vide.
- « Qu'est-ce qu'on mange ? » : reste désactivé par défaut.

### 3.9 Navigation

Depuis une fiche recette et depuis le mode cuisine, le retour (flèche et geste) ramène toujours à l'écran précédent. Un test le vérifie.

## 4. Données

- Tables SQLite inchangées. Les produits saisis depuis l'accueil vont dans `fridge_items` avec `expires_at` vide.
- Réglages (kv-store `settings.v1`) : ajout de `dislikes: string[]` et `tools: Tool[]` (vides par défaut).
- Recettes : ajout de `tools?: Tool[]` dans `src/data/types.ts`.
- La sauvegarde (export / import) inclut les deux nouveaux réglages ; une ancienne sauvegarde s'importe sans erreur.

## 5. Livraison : une version, un sujet

| version | sujet | taille |
| --- | --- | --- |
| V1.1 | Les mots : pluriels, zéro jamais fêté, taux de gaspillage retiré, badges obtenus seulement, adresse de contact | S |
| V1.2 | Un seul frigo | M |
| V1.3 | L'accueil en cartes | M |
| V1.4 | Résultats serrés et filtres visibles | M |
| V1.5 | « Je n'aime pas » et ustensiles | M |
| V1.6 | Catalogue, premier lot (180 recettes gratuites) et contrôle sur tout le catalogue | L |
| V1.7 | Catalogue, second lot (250 gratuites, 60 Premium) | L |
| V1.8 | Écran Premium avec la promesse, récap du dimanche corrigé, fiche store réécrite sur la nouvelle promesse | S |

Chaque version arrive avec sa ligne dans `CHANGELOG.md` et sa recette (ce qu'il faut essayer sur le téléphone). Pour chaque écran modifié, une maquette à 390 px est regardée avant le code.

## 6. Tests qui refusent la livraison

- Aucun texte ne contient « (s) ».
- Aucun message ne félicite un zéro, aucune carte ne signale un manque.
- L'ordre des cartes de l'accueil est celui de 3.2.
- Une date de péremption n'est jamais préremplie.
- Les fonctions listées en 3.7 ne dépendent pas de `isPremium`.
- Toutes les recettes ont `tools`, des ingrédients connus et leurs deux traductions.
- Une recette avec un ingrédient « je n'aime pas » obligatoire n'apparaît jamais.
- Le récap du dimanche n'est pas programmé pour une semaine vide.
- Aucune dépendance d'analytics, de pub ou de suivi dans `package.json` (test à créer : aujourd'hui seul le README l'affirme).

Commandes : `npm run typecheck`, `npm test`, `npm run lint`.

## 7. Hors périmètre

- Scan de code-barres (caméra et base de produits en ligne : contraire au tout local).
- Lien avec un drive ou une commande de courses.
- Suggestions par une IA en ligne.
- Widget « à finir vite » : prévu plus tard, après la refonte.
