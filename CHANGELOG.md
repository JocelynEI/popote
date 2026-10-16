# Changelog Mypopote

Chaque version porte un seul sujet. Le plan de la refonte est dans `CAHIER_DES_CHARGES.md`.

## V1.6.4 : l'aperçu web ne fige plus sur téléphone (16 octobre 2026)

Sur l'aperçu GitHub Pages ouvert depuis un téléphone, l'écran se figeait quand on ajoutait des produits avec « Remplir mon frigo ».

- La cause : sur le web, la base locale (expo-sqlite) tourne dans un processus à part, et chaque lecture ou écriture bloque l'écran en attendant sa réponse. Sur ordinateur, la réponse arrive vite. Sur téléphone, elle pouvait ne jamais arriver. La V1.6.3 n'y changeait rien.
- L'aperçu web utilise maintenant sql.js, le même SQLite compilé pour le navigateur, qui tourne directement dans la page : plus d'attente bloquante. La base est gardée dans le navigateur (IndexedDB) et enregistrée peu après chaque modification, ou dès qu'on quitte l'onglet.
- Les réglages de l'aperçu restent dans le navigateur (localStorage) et ne passent plus jamais par l'ancien moteur.
- L'appli iPhone et Android ne change pas : elle garde expo-sqlite. Le schéma de la base est maintenant dans un fichier commun (`src/db/migrate.ts`), utilisé par les deux.
- Nouvelle dépendance : `sql.js`, pour le web seulement. Ses deux fichiers sont servis depuis `public/sqljs/`. Rien n'est envoyé sur internet.
- Les données de test déjà saisies dans l'aperçu web repartent de zéro (elles étaient dans l'ancien moteur).

Tests ajoutés : la base sql.js se comporte comme expo-sqlite (insertion, lecture, transaction tout ou rien, relecture de ce qui est enregistré), et les fichiers web n'appellent plus expo-sqlite ni kv-store.

### Recette sur le téléphone (aperçu web)

1. Ouvre l'aperçu sur ton téléphone. S'il affiche encore l'ancienne version, ajoute `?reset` à la fin de l'adresse.
2. « Remplir mon frigo », coche trois produits, touche « Ajouter 3 produits » : l'écran se ferme tout de suite et le message s'affiche.
3. Onglet « Mon frigo » : les trois produits sont là.
4. Ferme l'onglet du navigateur, rouvre l'aperçu : les produits sont toujours là.
5. Ajoute un produit avec « Ajouter ce que j'ai », puis marque-le « Utilisé » dans le frigo : rien ne fige.

## V1.6.3 : le bouton de « Remplir mon frigo » (16 octobre 2026)

Sur l'aperçu web, le bouton « Ajouter … produits » de la grille « Remplir mon frigo » pouvait ne rien faire.

- L'ajout passe maintenant par le même chemin que « Ajouter ce que j'ai », qui marchait : un produit à la fois, sans transaction. L'ancienne fonction d'ajout groupé, devenue inutile, est retirée.
- Si l'ajout échoue malgré tout, un message s'affiche avec la raison, au lieu d'un bouton qui ne réagit pas.
- Tant que rien n'est coché, le bouton dit « Coche tes produits » au lieu de « Ajouter 0 produit ».

Je n'ai pas réussi à reproduire le bug dans mon navigateur de test (Chromium) : la correction vise la seule différence avec l'écran qui marchait. Si le bouton ne réagit toujours pas, le message d'erreur dira pourquoi.

Test ajouté : l'écran ajoute produit par produit, sans transaction, affiche une erreur au lieu de se taire, et son bouton vide ne montre pas de zéro.

### Recette sur le téléphone (ou l'aperçu web)

1. Recharge l'aperçu web (ou ajoute `?reset` à l'adresse pour repartir de zéro).
2. Accueil, « Remplir mon frigo » : le bouton dit « Coche tes produits » et reste grisé.
3. Coche trois produits : il devient « Ajouter 3 produits ». Touche-le : l'écran se ferme, le message « 3 produits ajoutés au frigo » s'affiche.
4. Onglet « Mon frigo » : les trois produits sont là, sans date.
5. Rouvre la grille : les trois produits n'y sont plus proposés.

## V1.6.2 : les quantités qui se lisent bien (16 octobre 2026)

Deux erreurs d'affichage relevées pendant la V1.6, dans la liste des ingrédients d'une recette.

- Les noms s'accordent avec la quantité : « 1 Œuf », « 3 Œufs », « 2 Oignons », « 3 Poireaux », « 1 Tomate ». Avant, on lisait « 2 Oignon » ou « 1 Tomates ». Les 34 ingrédients comptés à l'unité ont leur singulier et leur pluriel, en français et en anglais. Pour le saumon et le poisson blanc, on lit « 2 Pavés de saumon », « 2 Filets de poisson blanc ».
- Une moitié reste une moitié : un demi-oignon s'affiche « ½ Oignon » au lieu de « 1 Oignon ». Cinq recettes de la V1.6 retrouvent leur demi-concombre ou leur demi-oignon (panzanella, salade de quinoa, röstis, œufs brouillés à la tomate, galettes de thon). Si tu augmentes les portions, l'arrondi reprend (2 personnes de plus, 1 oignon). Un œuf entier ne devient jamais un demi-œuf quand tu baisses les portions.

Tests ajoutés : moitiés et arrondis, accords en français et en anglais, et sur tout le catalogue, chaque ingrédient compté à l'unité a ses deux formes.

### Recette sur le téléphone

1. Ouvre « Rougail saucisses » : « 4 Saucisses », « 4 Tomates », « 2 Oignons ».
2. Ouvre « Omelette baveuse » et descends à 1 personne : « 2 Œufs ». Puis à 4 personnes : « 8 Œufs ».
3. Ouvre « Salade de quinoa » : « ½ Concombre ». Passe à 4 personnes : « 1 Concombre ».
4. Ouvre « Saumon à la crème citronnée » : « 2 Pavés de saumon ».
5. Passe en anglais : « 2 Onions », « 1 Lemon ».

## V1.6.1 : des textes plus simples (16 octobre 2026)

Les textes de l'appli, des pages web et de la fiche store sont réécrits pour ne plus sonner comme un texte généré.

- Plus aucun tiret long (—) ni demi-cadratin (–) : ils n'ont pas leur place en français à cet endroit. Ils sont remplacés par une virgule, des parenthèses ou deux-points, dans l'appli, les recettes anglaises (« 3 to 4 minutes »), les pages de confidentialité et d'assistance, et la fiche store.
- Plus d'émojis décoratifs dans les phrases (👋, 🎉, 😋, 💾, 🧪…). Les icônes des ingrédients et des couleurs restent. Sur l'écran Premium, chaque avantage a une coche à la place de son émoji.
- Les phrases gentilles mais creuses disparaissent : « Préparation de la magie… », « Ta planète et ton porte-monnaie te disent merci », « Promis, je garde tes secrets de cuisine », « En résumé ». L'écran de chargement dit ce qu'il fait (« Je trie les recettes… »).
- Le vouvoiement oublié est corrigé : « Tu voulais dire… ? » au lieu de « Vouliez-vous dire… ? », « Je regarde tes ingrédients » au lieu de « vos restes ».
- La commande vocale désactivée dit pourquoi en clair : sur cet appareil, la reconnaissance passerait par internet.
- La fiche store est réécrite en paragraphes, sans titres en majuscules précédés d'émojis, et remise à jour : deux groupes « tout de suite » et « presque prêt », 181 recettes gratuites dont 72 en 20 minutes ou moins, l'ingrédient vedette jamais remplacé, les ustensiles.
- Dans le CHANGELOG, le README et le cahier des charges, les puces ne commencent plus par un titre en gras.

Test ajouté : aucun tiret long ni émoji décoratif dans les textes de l'appli (français et anglais), les recettes, la fiche store et les pages web. Le test de l'adresse de contact accepte maintenant une adresse suivie d'un point.

### Recette sur le téléphone

1. Réinstalle ou efface les données : relis les quatre écrans de présentation, il n'y a plus de tiret ni d'émoji dans les bulles de Frigo.
2. Ouvre l'écran Premium : chaque avantage a une coche verte devant.
3. Avec un frigo sans aucune date de péremption, ouvre « Vider le frigo » : le texte t'invite à ajouter une date pour voir quoi finir en premier.
4. Partage une recette : la dernière ligne est « Partagé depuis Mypopote ».
5. Passe l'appli en anglais et refais l'étape 1.

## V1.6 : le catalogue, premier lot (16 octobre 2026)

181 recettes gratuites au lieu de 105, et des idées plus justes sur tout le catalogue.

- 76 nouvelles recettes gratuites, en trois lots : les légumes qu'on jette le plus souvent (courgette, aubergine, poireau, épinards, salade, brocoli, chou…), le placard et le petit budget (lentilles, pois chiches, riz, pâtes, conserves, beaucoup de végétarien), puis viandes, poissons, cuisines du monde et desserts (rougail saucisses, keftas, soupe coco-poulet, mug cake, crumble aux fruits rouges…). Chacune en français et en anglais, pour 2 personnes sauf mention, avec ses ustensiles et son illustration. Aucun nouvel ingrédient : tout se trouve déjà dans la recherche.
- L'ingrédient qui donne son nom au plat n'est plus remplacé. « Salade tomate-mozzarella » n'est plus proposée « tout de suite » avec du fromage râpé : la mozzarella apparaît dans « Il manque ». Les remplacements qui gardent le même plat restent permis (tomates fraîches ou en boîte, oignon ou échalote).
- Un seul produit suffit quand c'est lui qui fait le plat : avec seulement des pommes, la compote de pommes est proposée ; avec seulement des pommes de terre, les pommes de terre sautées aussi. Avant, ces recettes ne sortaient jamais avec un seul produit. Le citron seul ne propose toujours pas de salade de fruits.
- Liste de relecture : `docs/catalogue-v1.6.md` (les 76 recettes avec leurs ingrédients, temps, ustensiles et régimes, puis les 108 remplacements désormais refusés). `npx tsx scripts/rapport-catalogue.ts` la recalcule pour tout le catalogue.

Tests ajoutés : la règle de l'ingrédient vedette, vérifiée sur les 193 recettes ; au moins 180 recettes gratuites ; chaque recette a un vrai ingrédient, deux étapes, ses deux langues et des minuteurs entiers ; aucun dessert avec viande ou poisson ; compote avec seulement des pommes, pas de salade de fruits avec seulement un citron.

### Recette sur le téléphone

1. Vide le frigo, puis ajoute seulement « tomates » et « fromage râpé » : la salade tomate-mozzarella est dans « Presque prêt », avec « Il manque : mozzarella ».
2. Remplace le fromage râpé par « œufs » : « Œufs brouillés à la tomate » est dans « Tout de suite ».
3. Vide le frigo, ajoute seulement « pommes » : la compote de pommes est proposée tout de suite.
4. Ajoute « courgette » et « œufs » : les galettes de courgette apparaissent.
5. Cherche « mug cake » dans les idées, profil sans micro-ondes (Réglages → profil culinaire → étape 3, ne coche que le four) : il disparaît ; coche le micro-ondes : il revient.
6. Ouvre trois nouvelles recettes au hasard en anglais (Réglages → langue) : titre et étapes traduits.

## V1.5 : « Je n'aime pas » et ustensiles (16 octobre 2026)

Les idées tiennent compte de ce que tu n'aimes pas et de ce que tu as dans ta cuisine.

- Préférences en trois écrans, une question par écran : régime, allergies et nombre de personnes ; ce que tu n'aimes pas ; tes ustensiles. « Passer » reste possible au premier lancement. Dans Réglages, le bouton du profil culinaire ouvre les trois étapes.
- Ce que tu n'aimes pas : recherche d'ingrédient et douze ingrédients souvent cités (coriandre, champignons, poivron, olives…). Une recette qui en a besoin est cachée partout (accueil, idées, « Vider le frigo », idée de la notification). S'il est facultatif, la fiche recette affiche « Facultatif, tu n'aimes pas ».
- Ustensiles : four, micro-ondes, mixeur ou blender, cuiseur multifonction. Rien n'est filtré tant que la question n'a pas de réponse ; « Je ne sais pas, tout afficher » laisse tout visible. Une fois répondu, les recettes qui demandent un ustensile non coché sont cachées. Poêle et casserole sont considérées comme acquises.
- Les 117 recettes ont leur liste d'ustensiles, déduite des étapes puis relue : 29 demandent le four, 8 le mixeur (les falafels, les deux). Deux gratins qui ne nommaient pas le four (« gratinez à 200 °C ») ont été corrigés à la main. Les recettes perso ne sont jamais cachées par les ustensiles.
- Une ancienne sauvegarde s'importe sans erreur : les deux nouvelles préférences gardent leur valeur actuelle.

Tests ajoutés : chaque recette a sa liste d'ustensiles, cohérente avec ses étapes (« fourchette » ne compte pas pour le four) ; rien n'est caché sans réponse ; ingrédient obligatoire non aimé = recette cachée, facultatif = signalé ; sans four, aucune recette au four dans les idées.

### Recette sur le téléphone

1. Réinstalle ou efface les données : après la présentation, trois écrans de préférences, avec des points d'avancement en haut.
2. Étape 2 : touche « Coriandre » et cherche « ciboulette » ; elles apparaissent cochées.
3. Étape 3 : coche seulement « Micro-ondes », puis « C'est parti ! ».
4. Ajoute œufs, lait, crème, emmental, courgette, pâtes : dans les idées, plus de gratin, de quiche ni de macaroni au four ; l'omelette est là.
5. Ouvre l'omelette : la ciboulette porte « Facultatif, tu n'aimes pas ».
6. Réglages → profil culinaire → étape 3 → « Je ne sais pas, tout afficher » : les recettes au four reviennent.

## V1.4 : des résultats plus serrés (16 octobre 2026)

L'écran des idées montre beaucoup plus de recettes à la fois.

- Cartes compactes : vignette de 72 px, titre sur deux lignes au plus, temps et niveau, un seul badge (« Anti-gaspi », sinon « Rapide »), ce qui manque en orange, favori. Six à sept recettes par écran au lieu de deux. Le grand visuel reste sur la fiche recette.
- Deux groupes avec leur nombre : « Tout de suite » et « Presque prêt » (le même mot que sur l'accueil). La liste après « Il manque : » commence en minuscule.
- Filtres visibles d'un coup d'œil, sur deux lignes au lieu d'une bande à faire défiler : temps (≤ 15, 30, 60 min) et « Facile », puis entrée, plat, dessert.
- Régime : une seule pastille qui montre le régime choisi (ou « Régime ») et ouvre les préférences. Avant, quatre pastilles changeaient le profil depuis cet écran sans le dire.
- La règle des recettes Premium (deux verrouillées au plus pour un non-abonné) passe dans `src/logic/results.ts`, avec son test.

Écart au cahier des charges : le filtre par ustensiles arrive avec la V1.5, qui ajoute les ustensiles aux recettes.

Tests ajoutés : les deux groupes gardent l'ordre du moteur, deux recettes Premium verrouillées au plus, minuscule après « Il manque : ».

### Recette sur le téléphone

1. Avec quelques produits dans le frigo, ouvre les idées : les cartes sont compactes, au moins six par écran une fois les filtres passés.
2. « Tout de suite » puis « Presque prêt », chacun avec son nombre ; dans « Presque prêt », la ligne orange dit ce qui manque.
3. Touche « ≤ 15 min » puis « Plat » : la liste se réduit, les nombres changent.
4. Touche « Régime » : les préférences s'ouvrent. Choisis « Végétarien », reviens : la pastille affiche « Végétarien » et les recettes avec viande ont disparu.
5. Sans Premium : au plus deux recettes « 🔒 Premium » dans la liste. Le cœur d'une carte ajoute la recette aux favoris sans l'ouvrir.

## V1.3.1 : contact et pages pour les stores (16 octobre 2026)

Reprend la demande de fusion #2 du 23 septembre dans la refonte.

- Adresse de contact : meo.compagnie@gmail.com dans les Réglages, la politique de confidentialité, la page d'assistance et la fiche store (elle remplace celle de la V1.1). L'éditeur reste R-Aclés.
- Page d'assistance FR/EN (questions fréquentes : compte, changement de téléphone, restaurer Premium).
- Les deux pages demandées par Apple et Google sont publiées avec l'aperçu web : `…/popote/confidentialite/` et `…/popote/assistance/`. Leurs adresses sont dans la fiche store.
- Test renforcé : la même adresse partout, aucune autre adresse, ni ancien éditeur, ni adresse d'exemple.

### Recette

1. Réglages, en bas : « Contact : meo.compagnie@gmail.com » et « R-Aclés ».
2. Après la fusion sur `main`, ouvre https://jocelynei.github.io/popote/confidentialite/ et https://jocelynei.github.io/popote/assistance/ : les deux pages s'affichent, avec la bonne adresse.

## V1.3 : l'accueil en cartes (15 octobre 2026)

L'accueil montre tout de suite quoi cuisiner, sans rien taper quand le frigo est rempli.

- Les cartes, dans un ordre fixe : « À finir vite » (s'il y a des produits à 2 jours ou moins), « Tout de suite » (les trois meilleures recettes faisables sans rien acheter, puis « Voir toutes les idées (n) »), le gros bouton « Ajouter ce que j'ai », puis « Remplir mon frigo ».
- « À finir vite » nomme les produits en phrase (« Crème fraîche et courgette », quatre au plus puis « et 2 autres ») et ouvre « Vider le frigo ».
- Si rien n'est faisable tout de suite, la carte devient « Presque prêt » et dit ce qui manque.
- Frigo vide : « Ajouter ce que j'ai » passe en premier, suivi de « Avec trois fois rien », trois plats choisis sur tout le catalogue parmi ceux qui demandent le moins de choses en plus du placard, chacun avec un ingrédient différent (aujourd'hui : omelette, pommes de terre sautées, pâtes à l'ail).
- « Ajouter ce que j'ai » ouvre un écran à part : saisie en phrase ou dictée, ajout rapide, ce qui est déjà dans le frigo, et « Voir les idées ».
- Une seule aide au lieu des trois bulles orange de l'accueil : elle apparaît après le tout premier ajout.
- Jamais de recette Premium verrouillée dans les cartes de l'accueil.

Écarts au cahier des charges : la tuile « Vider le frigo » n'est pas sur l'accueil, car cet écran ne sert que s'il y a des produits à finir, et la carte « À finir vite » y mène déjà. Les idées de placard sont calculées sur le catalogue au lieu d'une liste fixe, car le riz sauté de cette liste demandait quatre ingrédients.

Tests ajoutés : l'ordre des cartes, les trois idées (complètes, jamais Premium verrouillées), les idées de placard (des plats, deux ingrédients au plus, tous différents), la phrase des produits à finir.

### Recette sur le téléphone

1. Appli neuve, frigo vide : l'accueil montre « Ajouter ce que j'ai » en haut, puis « Avec trois fois rien » (trois plats), puis « Remplir mon frigo ».
2. Touche « Ajouter ce que j'ai », tape « 2 œufs, des pâtes, une courgette » : une aide s'affiche une seule fois, les produits apparaissent dans « Dans ton frigo ».
3. Reviens à l'accueil : la carte « Tout de suite » propose trois recettes faisables, et « Voir toutes les idées » donne leur nombre.
4. Donne à la courgette la date de demain : la carte « À finir vite » apparaît en haut, avec « Courgette ». Elle ouvre « Vider le frigo ».
5. Avec un seul produit peu courant dans le frigo (par exemple seulement une aubergine) : la carte devient « Presque prêt » et dit ce qui manque.
6. Passe l'appli en anglais : « What’s for dinner tonight? » et les mêmes cartes.

## V1.2.1 : corrections (15 octobre 2026)

Maintenance, sans changement visible.

- Lint propre : `npm run lint` ne signale plus rien (il y avait 59 problèmes). Les animations (Frigo, le chargement, les messages en bas d'écran, la présentation, les cartes de recettes) sont créées une seule fois avec `useState` au lieu d'être lues dans une référence pendant l'affichage. Les minuteurs du mode cuisine vérifient leur fin dans leur propre tic. La note d'une recette et le texte de la présentation se remettent à jour pendant l'affichage plutôt que dans un effet. Le prix Premium se déduit directement de la réponse du store. Le bouton rond de la fiche recette devient un vrai composant.
- Identifiant de l'appli : `com.racles.mypopote` (éditeur R-Aclés) pour l'App Store et Google Play. À ne plus changer après la première publication.
- Tests ajoutés : aucun texte anglais resté en français, identifiant de l'appli.

### Recette sur le téléphone

1. Présentation au premier lancement : le texte de la bulle s'écrit à chaque étape, Frigo se balance et fait coucou.
2. Lance une recherche : la casserole animée s'affiche, puis les idées.
3. Fiche recette : les boutons ronds (retour, partager, favori) marchent ; écris une note, quitte et reviens, elle est toujours là.
4. Mode cuisine : lance un minuteur d'une minute, il sonne et un message s'affiche à la fin.
5. Retire un produit du frigo puis touche « Annuler » : le message apparaît et disparaît comme avant.

## V1.2 : un seul frigo (15 octobre 2026)

Il n'y a plus qu'un frigo : ce qu'on tape sur l'accueil y entre, et la recherche part de tout le frigo.

- L'accueil remplit le frigo. Ce qu'on tape, dicte ou ajoute d'un appui entre directement dans le frigo, sans date et sans doublon. « Mon frigo », sur l'accueil, montre le vrai frigo (12 produits, puis « + n autres »). La croix retire le produit du frigo, avec « Annuler » pendant quelques secondes. L'option « Inclure mon frigo enregistré » disparaît.
- L'onglet Frigo en trois blocs : « À finir vite » (2 jours ou moins, produits périmés compris), « Avec une date », « Sans date ». Dans les deux premiers, le plus proche de la date passe en premier.
- Chercher sans un produit : dans les idées, une ligne montre les produits du frigo. Un appui en décoche un pour cette recherche seulement ; il reste dans le frigo.
- La date reste facultative et n'est jamais préremplie.

Tests ajoutés : les trois blocs et leur ordre, l'ajout depuis l'accueil (sans doublon, sans date), le décochage qui ne touche pas au frigo.

### Recette sur le téléphone

1. Sur l'accueil, tape « 2 œufs, des pâtes, une courgette » puis Entrée : « 3 produits ajoutés au frigo ». Ils apparaissent dans « Mon frigo » et dans l'onglet Frigo, en « Sans date ».
2. Retape « courgette » : elle n'est pas ajoutée une deuxième fois.
3. Dans l'onglet Frigo, donne à la courgette la date de demain : elle passe dans « À finir vite ».
4. Sur l'accueil, retire les pâtes avec la croix, puis touche « Annuler » : elles reviennent.
5. « Créer ma Mypopote » : dans les idées, décoche les œufs. Les recettes changent, et les œufs sont toujours dans l'onglet Frigo.
6. Ajoute plus de 12 produits (Remplissage rapide) : l'accueil affiche « + n autres », qui ouvre le frigo.

## V1.1 : les mots (15 octobre 2026)

Fini les « (s) », et l'appli ne fête plus jamais un zéro.

- De vrais pluriels, en français et en anglais : « 1 recette », « 44 recettes », « avec ton ingrédient » ou « avec tes 11 ingrédients ». Les textes s'écrivent `{n|produit|produits}`, la forme est choisie au moment de l'affichage (en français, 0 et 1 au singulier).
- Progrès : on salue ce qui a été fait, rien d'autre. La carte « Ce mois-ci » n'apparaît qu'à partir d'un produit sauvé, la carte « Cette semaine » qu'après une recette cuisinée ou un produit sauvé, et elle ne parle que de ce qui a eu lieu.
- Plus de statistique sur ce qui est jeté : le taux de gaspillage, la barre « jetés » et la liste « les plus jetés » disparaissent. Le bouton « Jeté » du frigo reste pour retirer un produit. Les statistiques détaillées montrent maintenant les recettes cuisinées, les produits sauvés, les économies estimées et le nombre de recettes différentes.
- Badges : seuls ceux obtenus s'affichent, plus le prochain, marqué « Prochain ». Fini le mur de neuf cadenas.
- Contact et éditeur : jocelyn.lebon.ae@gmail.com et R-Aclés, dans les Réglages, la politique de confidentialité et la fiche store.
- « Vider le frigo » parle de « produits à finir » au lieu de « produits urgents ».

Tests ajoutés (`scripts/logic.test.ts`) : aucun « (s) » dans les textes, pluriels FR et EN, aucune carte pour un zéro, plus de texte sur le gaspillage, badges obtenus + le prochain, adresse de contact.

### Recette sur le téléphone

1. Ouvre « Mes progrès » sur une appli neuve : pas de carte « Ce mois-ci » ni « Cette semaine », un seul badge « Prochain : Premier plat ».
2. Cuisine une recette (« J'ai cuisiné ») : la carte « Cette semaine » apparaît avec « 1 recette cuisinée », et le badge « Premier plat » est obtenu.
3. Marque un produit qui périme bientôt comme « Utilisé » : « 1 produit sauvé ce mois-ci 🎉 ».
4. Cherche des idées avec un seul ingrédient : le sous-titre dit « … avec ton ingrédient ».
5. Remplissage rapide : coche 1 produit puis 2, le bouton passe de « Ajouter 1 produit » à « Ajouter 2 produits ».
6. Réglages, en bas : « Contact : jocelyn.lebon.ae@gmail.com » et « R-Aclés ».
7. Passe l'appli en anglais et refais 1 et 4.
