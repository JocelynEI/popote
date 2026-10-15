# Changelog Mypopote

Chaque version porte un seul sujet. Le plan de la refonte est dans `CAHIER_DES_CHARGES.md`.

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
