# Changelog Mypopote

Chaque version porte un seul sujet. Le plan de la refonte est dans `CAHIER_DES_CHARGES.md`.

## V1.3.1 : contact et pages pour les stores (16 octobre 2026)

Reprend la demande de fusion #2 du 23 septembre dans la refonte.

- **Adresse de contact : meo.compagnie@gmail.com** dans les Réglages, la politique de confidentialité, la page d'assistance et la fiche store (elle remplace celle de la V1.1). L'éditeur reste R-Aclés.
- **Page d'assistance** FR/EN (questions fréquentes : compte, changement de téléphone, restaurer Premium).
- **Les deux pages demandées par Apple et Google sont publiées avec l'aperçu web** : `…/popote/confidentialite/` et `…/popote/assistance/`. Leurs adresses sont dans la fiche store.
- Test renforcé : la même adresse partout, aucune autre adresse, ni ancien éditeur, ni adresse d'exemple.

### Recette

1. Réglages, en bas : « Contact : meo.compagnie@gmail.com » et « R-Aclés ».
2. Après la fusion sur `main`, ouvre https://jocelynei.github.io/popote/confidentialite/ et https://jocelynei.github.io/popote/assistance/ : les deux pages s'affichent, avec la bonne adresse.

## V1.3 : l'accueil en cartes (15 octobre 2026)

L'accueil montre tout de suite quoi cuisiner, sans rien taper quand le frigo est rempli.

- **Les cartes, dans un ordre fixe** : « À finir vite » (s'il y a des produits à 2 jours ou moins), « Tout de suite » (les trois meilleures recettes faisables sans rien acheter, puis « Voir toutes les idées (n) »), le gros bouton « Ajouter ce que j'ai », puis « Remplir mon frigo ».
- **« À finir vite »** nomme les produits en phrase (« Crème fraîche et courgette », quatre au plus puis « et 2 autres ») et ouvre « Vider le frigo ».
- **Si rien n'est faisable tout de suite**, la carte devient « Presque prêt » et dit ce qui manque.
- **Frigo vide** : « Ajouter ce que j'ai » passe en premier, suivi de « Avec trois fois rien », trois plats choisis sur tout le catalogue parmi ceux qui demandent le moins de choses en plus du placard, chacun avec un ingrédient différent (aujourd'hui : omelette, pommes de terre sautées, pâtes à l'ail).
- **« Ajouter ce que j'ai »** ouvre un écran à part : saisie en phrase ou dictée, ajout rapide, ce qui est déjà dans le frigo, et « Voir les idées ».
- **Une seule aide** au lieu des trois bulles orange de l'accueil : elle apparaît après le tout premier ajout.
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

- **Lint propre** : `npm run lint` ne signale plus rien (il y avait 59 problèmes). Les animations (Frigo, le chargement, les messages en bas d'écran, la présentation, les cartes de recettes) sont créées une seule fois avec `useState` au lieu d'être lues dans une référence pendant l'affichage. Les minuteurs du mode cuisine vérifient leur fin dans leur propre tic. La note d'une recette et le texte de la présentation se remettent à jour pendant l'affichage plutôt que dans un effet. Le prix Premium se déduit directement de la réponse du store. Le bouton rond de la fiche recette devient un vrai composant.
- **Identifiant de l'appli** : `com.racles.mypopote` (éditeur R-Aclés) pour l'App Store et Google Play. À ne plus changer après la première publication.
- Tests ajoutés : aucun texte anglais resté en français, identifiant de l'appli.

### Recette sur le téléphone

1. Présentation au premier lancement : le texte de la bulle s'écrit à chaque étape, Frigo se balance et fait coucou.
2. Lance une recherche : la casserole animée s'affiche, puis les idées.
3. Fiche recette : les boutons ronds (retour, partager, favori) marchent ; écris une note, quitte et reviens, elle est toujours là.
4. Mode cuisine : lance un minuteur d'une minute, il sonne et un message s'affiche à la fin.
5. Retire un produit du frigo puis touche « Annuler » : le message apparaît et disparaît comme avant.

## V1.2 : un seul frigo (15 octobre 2026)

Il n'y a plus qu'un frigo : ce qu'on tape sur l'accueil y entre, et la recherche part de tout le frigo.

- **L'accueil remplit le frigo.** Ce qu'on tape, dicte ou ajoute d'un appui entre directement dans le frigo, sans date et sans doublon. « Mon frigo », sur l'accueil, montre le vrai frigo (12 produits, puis « + n autres »). La croix retire le produit du frigo, avec « Annuler » pendant quelques secondes. L'option « Inclure mon frigo enregistré » disparaît.
- **L'onglet Frigo en trois blocs** : « À finir vite » (2 jours ou moins, produits périmés compris), « Avec une date », « Sans date ». Dans les deux premiers, le plus proche de la date passe en premier.
- **Chercher sans un produit** : dans les idées, une ligne montre les produits du frigo. Un appui en décoche un pour cette recherche seulement ; il reste dans le frigo.
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

- **De vrais pluriels**, en français et en anglais : « 1 recette », « 44 recettes », « avec ton ingrédient » ou « avec tes 11 ingrédients ». Les textes s'écrivent `{n|produit|produits}`, la forme est choisie au moment de l'affichage (en français, 0 et 1 au singulier).
- **Progrès : on salue ce qui a été fait, rien d'autre.** La carte « Ce mois-ci » n'apparaît qu'à partir d'un produit sauvé, la carte « Cette semaine » qu'après une recette cuisinée ou un produit sauvé, et elle ne parle que de ce qui a eu lieu.
- **Plus de statistique sur ce qui est jeté** : le taux de gaspillage, la barre « jetés » et la liste « les plus jetés » disparaissent. Le bouton « Jeté » du frigo reste pour retirer un produit. Les statistiques détaillées montrent maintenant les recettes cuisinées, les produits sauvés, les économies estimées et le nombre de recettes différentes.
- **Badges** : seuls ceux obtenus s'affichent, plus le prochain, marqué « Prochain ». Fini le mur de neuf cadenas.
- **Contact et éditeur** : jocelyn.lebon.ae@gmail.com et R-Aclés, dans les Réglages, la politique de confidentialité et la fiche store.
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
