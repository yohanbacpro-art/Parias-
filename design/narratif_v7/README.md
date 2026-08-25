# VARDHEN — Narrative Pack V7 : Direction & Scènes

Cette V7 est une extension additive. Elle conserve le socle de contenu déjà présent dans le pack (événements, contrats, monde vivant, dynasties, lieux, bestiaire et images) et n'écrase aucun identifiant historique. Les apports V7 sont isolés dans de nouveaux dossiers afin de pouvoir être fusionnés avec les bibliothèques narratives V3–V6 existantes sans suppression.

## Nouveautés V7

- `docs/direction_narrative/PROMPT_DIRECTION_NARRATIVE_V7.md` : direction complète en trois actes — Le Paria, Le Dernier Karlsberg, La Guerre de Vardhen.
- `scenes_narratives/00_FORMAT_STANDARD/` : contrat d'écriture séparant strictement affichage JOUEUR et logique MOTEUR/SPOILERS.
- `scenes_narratives/01_ACTE_I_LE_PARIA/` : scène de taverne et contrat d'enquête complets.
- `scenes_narratives/02_ACTE_II_LE_DERNIER_KARLSBERG/` : retour aux ruines et décision d'héritage.
- `scenes_narratives/03_ACTE_III_LA_GUERRE_DE_VARDHEN/` : crise à trois fronts et bataille dynamique.
- `scenes_narratives/99_INDEX/INDEX_SCENES_V7.md` : index des modèles.
- `scenes_narratives/01_ACTE_I_LE_PARIA/CONTRATS_COMPLETS_V7_01_10.md` : dix premiers contrats entièrement différenciés.
- `scenes_narratives/01_ACTE_I_LE_PARIA/CONTRATS_COMPLETS_V7_11_30.md` : vingt contrats supplémentaires.
- `scenes_narratives/02_ACTE_II_LE_DERNIER_KARLSBERG/CONTRATS_COMPLETS_V7_31_50.md` : vingt contrats politiques, relationnels et militaires.
- `scenes_narratives/00_FORMAT_STANDARD/RESOLUTION_COMBATS_CAPACITES_ET_CONTENU_ADULTE.md` : résolution des choix selon capacités, équipement, blessures et terrain ; violence graphique et intimité adulte consentie.
- `scenes_narratives/02_ACTE_II_LE_DERNIER_KARLSBERG/V7_EN_051_*` : scène adulte et politique à la cour des Elfes noirs, suivie d'une embuscade.
- `scenes_narratives/02_ACTE_II_LE_DERNIER_KARLSBERG/V7_DUELS_052_055_*` : quatre duels complets aux styles et conditions de victoire différents.
- `docs/SYSTEME_COMBAT_NARRATIF_V7.md` : système complet de combat textuel fondé sur les capacités réelles.
- `data/combat/` : règles exploitables par le moteur, fiche de Yohan et styles adverses.
- `scenes_narratives/00_FORMAT_STANDARD/GABARIT_COMBAT_TEXTUEL_JOUEUR_MOTEUR.md` : convention d'intégration nœud par nœud.
- `docs/YOHAN_DE_KARLSBERG_FICHE_CANONIQUE_ET_PROGRESSION_V7.md` : statistiques initiales, personnalité martiale, Onde et cinq voies de progression.
- `data/combat/yohan_canonical_start_v7.json` : valeurs canoniques de début de campagne.
- `scenes_narratives/01_ACTE_I_LE_PARIA/V7_C01_WYVERNE_COMBAT_LONG_*` : premier combat rédigé en longs paragraphes avec résultats propres aux capacités.
- `scenes_narratives/01_ACTE_I_LE_PARIA/V7_CAMPAGNE_CONTRATS_01_05_JOUEUR.md` : première moitié de la campagne écrite comme un jeu narratif.
- `scenes_narratives/01_ACTE_I_LE_PARIA/V7_CAMPAGNE_CONTRATS_06_10_JOUEUR.md` : seconde moitié, dialogues, choix et combats intégrés.
- `scenes_narratives/01_ACTE_I_LE_PARIA/V7_CAMPAGNE_CONTRATS_01_10_MOTEUR_SPOILERS.md` : vérités cachées, graphes, tests, flags et conséquences longues.
- `scenes_narratives/01_ACTE_I_LE_PARIA/V7_ALYCIA_001_*` : première rencontre complète avec Alycia, huit scènes, combat coopératif et branches relationnelles.

## Compatibilité V3–V6

Les nouveaux IDs utilisent le préfixe `V7_`. Aucun fichier de données antérieur n'est renommé ou supprimé. Pour une installation possédant déjà `VARDHEN_NARRATIVE_PACK_V6_PERSONNAGES_ROMANCES`, copier ces dossiers V7 à la racine de la V6 ou conserver la V7 comme couche de contenu séparée. En cas de fusion, conserver en priorité les fichiers V3–V6 existants et ajouter seulement les chemins V7 absents.

---

# Héritage — Content Pack V1 à V1.4

Pack de contenu destiné à être branché sur le prototype.

- `data/events/events_v1.json` : **200 événements**
- `data/bestiary/bestiary_v1.json` : **40 créatures**
- `data/locations/locations_v1.json` : **20 lieux majeurs**
- `data/npcs/archetypes_v1.json` : **20 archétypes PNJ**
- `docs/CATALOGUE_200_EVENEMENTS.md` : version lisible

## Important
Les statistiques du bestiaire restent volontairement basiques : **Danger, Vitalité, Dégâts, Armure, Mobilité**. Elles devront être converties vers le système de combat réel.

Les 200 entrées sont une première base structurée : les événements rares/épiques portent des identifiants de chaîne afin de permettre leur transformation en arcs narratifs plus longs sans casser les IDs existants.

## Architecture
Les illustrations individuelles seront stockées dans `assets/locations/` et `assets/creatures/`.

---

# Système canonique des contrats Parias

Le **Prix du Paria** est une mécanique centrale de Vardhen.

## Négociation obligatoire avant l'action

Les termes du contrat sont toujours exposés et négociés **avant que le Paria n'entreprenne la mission**. Le joueur sait donc ce qui est proposé et choisit librement son prix avant d'accepter.

Pour les maisons connaissant et reconnaissant l'ancienne coutume, le joueur Paria peut demander :

1. **L'Or** — paiement financier uniquement.
2. **La noble consentante** — sans réclamer l'or.
3. **Le Prix complet : Or + noble consentante.**
4. **Négocier ou refuser le contrat.**

La femme concernée doit être une **noble adulte, identifiée et consentante** avant la validation définitive. Elle est un véritable PNJ du monde, avec personnalité, famille, relations et ambitions.

Une fois les termes acceptés par toutes les parties, ils constituent le prix convenu du contrat.

## Relations

La réussite du contrat fait progresser positivement la relation avec la maison commanditaire selon les circonstances.

Si le prix comprend la noble, une relation persistante est également créée entre elle et le Paria. Son intensité dépend de sa personnalité, du contexte, des interactions et des événements ultérieurs.

Choisir seulement une partie du prix ancestral peut aussi influencer la perception du Paria par la maison.

## Temps, liaison et descendance

Après le contrat, le calendrier continue normalement.

Si une relation avec la noble existe, le moteur peut périodiquement déterminer si une grossesse puis une naissance surviennent. La naissance **n'est jamais garantie**.

La probabilité peut notamment dépendre :
- du temps écoulé ;
- de la relation ;
- des rencontres entre les deux personnages ;
- de leur situation dans le monde.

Lorsqu'un enfant naît, il devient un **PNJ persistant** avec parents, maison, âge, traits et relations.

Un fils ou une fille peut donc grandir pendant la campagne et devenir, des années plus tard, chevalier, noble, héritier, allié, rival ou personnage jouable selon les systèmes de succession.

Comme tous les Parias descendent historiquement des Karlsberg, cette mécanique permet au jeu de reproduire naturellement la naissance de nouvelles branches.

L'héritage magique n'est pas obligatoirement identique d'un enfant à l'autre : un potentiel Paria peut rester latent, être faible, puissant ou exceptionnel.

## Bibliothèque V1

`data/contracts/contracts_v1.json` contient **50 contrats**, dont **20 contrats compatibles avec le Prix ancestral des Parias**.

---

# Les 200 événements V1

Les **200 événements font partie intégrante du pack** et sont stockés dans :

`data/events/events_v1.json`

La version complète et lisible est également disponible dans :

`docs/CATALOGUE_200_EVENEMENTS.md`

Chaque événement possède désormais un résultat de gameplay potentiel. Il peut mener à un **combat, duel, embuscade, bataille, traque, enquête, exploration, négociation, intrigue, rencontre ou anomalie magique**, selon sa famille et l'état du monde.

Un événement n'est donc pas seulement une fenêtre narrative. Ses conséquences peuvent rester actives : une créature non tuée peut continuer ses attaques, un PNJ sauvé peut revenir, une maison humiliée peut devenir hostile et une menace ignorée peut évoluer.

Les événements rares et épiques peuvent ouvrir des chaînes narratives. Les événements épiques peuvent être uniques à une campagne.

## Répartition

| Famille | Nombre |
|---|---:|
| Voyage | 30 |
| Ville | 22 |
| Taverne | 14 |
| Contrat | 20 |
| Politique | 18 |
| Paria | 18 |
| Khesh | 14 |
| Elfe | 12 |
| Elfe noir | 10 |
| Nain | 10 |
| Peau-Verte | 10 |
| Homme-Bête | 8 |
| Onde | 8 |
| Guerre | 6 |
| **TOTAL** | **200** |

> Le catalogue détaillé des 200 événements est volontairement conservé dans un fichier séparé afin que le README reste lisible, mais les 200 événements sont inclus dans le même pack et constituent du contenu canonique V1.

---

# Contrats narratifs V1.2

La bibliothèque contient désormais **50 contrats écrits individuellement**, dont **30 compatibles avec le Prix ancestral des Parias**.

Chaque contrat possède :
- un commanditaire et une maison ;
- un lieu précis ;
- un objectif ;
- un niveau de danger ;
- un paiement ;
- une audience préalable ;
- une phase de préparation ;
- une approche avec complications possibles ;
- une résolution pouvant mener au combat, duel, traque, infiltration, négociation ou poursuite ;
- des conséquences persistantes.

Pour les contrats Parias, **aucune mission ne commence avant la négociation du prix**. Le joueur choisit l'Or, la noble adulte consentante proposée, les deux, négocie ou refuse. Le consentement de la noble est établi avant la validation du contrat.

Après réussite, les relations progressent. Lorsqu'une relation avec la noble existe, le passage du temps peut produire une descendance probabiliste. Un enfant né devient un PNJ persistant et peut posséder un potentiel Paria latent.

Voir `docs/LIVRE_DES_50_CONTRATS_V1_2.md` et `data/contracts/contracts_v1_2.json`.

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

---

# Assets visuels intégrés — V1.4

Les images disponibles dans l'espace de travail Vardhen sont désormais **physiquement intégrées au Content Pack**.

Arborescence :

- `assets/images/locations/` — lieux, capitales et planches d'aventure ;
- `assets/images/characters/` — illustrations/portraits générés disponibles ;
- `assets/images/maps/` — carte de Vardhen ;
- `assets/images/references/` — images de référence fournies pour le projet ;
- `assets/images/IMAGE_MANIFEST.json` — inventaire exact des fichiers inclus.

## Planches de lieux

![Taverne, château noble, Arène Rouge et Route Grise](assets/images/locations/locations_adventure_tavern_castle_arena_route.png)

![Cicatrice de l'Onde, Cimetière des Dragons, Crypte des Karlsberg et Antre du Dragon](assets/images/locations/locations_wave_scar_dragon_graveyard_karlsberg_crypt_dragon_lair.png)

![Port-Noir, Îles Interdites, Mines de Kar-Durak et Sanctuaire du Premier Rugissement](assets/images/locations/locations_port_noir_forbidden_islands_kardurak_mines_beast_sanctuary.png)

![Kar-Durak, Profondeurs Peaux-Vertes et terres Hommes-Bêtes](assets/images/locations/locations_kardurak_greenskin_depths_beast_forest.png)

Le fichier `IMAGE_MANIFEST.json` fait foi pour savoir précisément quels visuels sont contenus dans cette version du ZIP.
