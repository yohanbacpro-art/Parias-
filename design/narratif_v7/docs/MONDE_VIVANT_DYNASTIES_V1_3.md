---

# Monde vivant, PNJ et dynasties — V1.3

Vardhen utilise désormais un **monde persistant**. Les personnages importants ne sont pas de simples entrées de dialogue : ils vieillissent, nouent des relations, fondent des lignées, héritent, meurent et peuvent modifier durablement la politique du monde.

## Passage du temps

Le moteur doit exécuter périodiquement les processus suivants :

1. vieillissement des personnages ;
2. évolution des relations ;
3. unions, mariages et naissances possibles ;
4. morts et disparitions ;
5. successions et crises dynastiques ;
6. progression des ambitions personnelles ;
7. évolution des maisons, clans, tribus et hardes ;
8. guerres, soumissions, migrations et changements territoriaux ;
9. génération des nouvelles du monde.

Le pas de temps reste configurable. La recommandation de conception est **un tick mensuel**, avec un traitement annuel plus lourd toutes les douze avancées.

## PNJ persistants

Un PNJ important possède au minimum : identité, âge, espèce, culture, maison/clan, rang, parents, partenaire, enfants, traits, compétences simples, richesse, statut, relations, ambition, localisation et état.

Les états principaux sont : **vivant, mort, disparu, captif ou exilé**.

Les relations utilisent une échelle de **-100 à +100**, permettant de distinguer ennemi, hostile, neutre, favorable et allié.

## Maisons humaines et généalogie

Les maisons humaines possèdent un chef, des membres réels, un héritier, une richesse, une influence, des relations avec les autres maisons et un historique.

Les enfants deviennent de véritables PNJ. Ils vieillissent et peuvent devenir héritiers, chevaliers, nobles, rivaux, alliés ou personnages majeurs plusieurs années plus tard.

La mort d'un chef déclenche une succession. Une succession ambiguë peut provoquer une rivalité familiale, une guerre ou une chaîne d'événements.

## Prix ancestral des Parias et dynasties

Le fonctionnement canonique du contrat Paria est conservé.

**Les termes sont négociés avant toute action.**

Le joueur peut réclamer :

- l'Or ;
- une noble adulte consentante ;
- l'Or + une noble adulte consentante ;
- négocier ;
- refuser.

La noble n'est jamais générée comme une récompense abstraite. Le jeu sélectionne un **véritable PNJ adulte de la maison commanditaire** répondant aux conditions du contrat. Son consentement est établi avant l'acceptation définitive.

Une mission réussie augmente positivement la relation avec la maison selon les circonstances. Si la noble fait partie du prix accepté, une relation persistante avec le Paria est créée ou renforcée.

Avec le passage du temps, une naissance peut devenir possible. Elle n'est **jamais garantie** : la probabilité dépend notamment du temps, de la relation, des rencontres et du contexte.

Un enfant né est immédiatement ajouté à la généalogie comme PNJ persistant. Il peut être un fils ou une fille et recevoir un **potentiel Paria latent probabiliste**. Ce mécanisme permet de faire apparaître naturellement de nouvelles branches issues du sang des Parias au cours d'une campagne.

## Cultures dynastiques

Les peuples n'utilisent pas tous la même structure.

**Humains :** maisons nobles, héritage, mariages, branches cadettes et rivalités.

**Parias :** lignées humaines auxquelles s'ajoutent le sang Paria et le potentiel magique latent.

**Khesh :** tribus, chefs, héritiers, défis, soumissions et confédération. Une tribu peut rejoindre un grand chef, ce qui alimente directement la mécanique de réunification.

**Elfes :** maisons extrêmement anciennes, générations longues et renouvellement lent.

**Elfes noirs :** maisons, alliances instables, intrigues, séductions politiques et assassinats.

**Nains :** clans, charges héréditaires, serments et rancunes pouvant survivre à plusieurs générations.

**Hommes-Bêtes :** hardes dirigées par la force. Un chef vainqueur peut absorber les survivants d'une harde rivale.

**Peaux-Vertes :** bandes et clans dont l'autorité repose principalement sur la puissance ; un chef exceptionnel peut fédérer plusieurs bandes et contribuer à une future crise.

## Nouvelles du monde

À chaque période pertinente, le jeu peut générer plusieurs nouvelles à partir des changements réellement produits par la simulation.

Exemples :

> **ASTRAH — Lucius Furius Augustus rassemble de nouveaux partisans.**

> **DUNES KHESH — Une nouvelle tribu a juré fidélité à un prétendant.**

> **KAR-DURAK — Une galerie inférieure est tombée aux mains des Peaux-Vertes.**

> **VAUCLAIR — La maison annonce la naissance d'un héritier.**

> **RUMEUR — Un individu aurait manifesté des pouvoirs attribués aux Parias.**

Ces nouvelles ne sont pas seulement décoratives : elles renseignent le joueur sur les transformations réelles de la campagne et peuvent annoncer contrats, guerres, migrations, successions ou crises de fin de partie.

## Fichiers V1.3

- `data/world/dynamic_world_system_v1_3.json`
- `data/dynasties/dynasties_seed_v1_3.json`
- `data/dynasties/npcs_seed_v1_3.json`
- `data/dynasties/paria_contract_dynasty_rules_v1_3.json`
- `data/news/world_news_templates_v1_3.json`

Ces données sont conçues pour se connecter aux **200 événements**, aux contrats, aux lieux et au bestiaire déjà présents dans le Content Pack.
