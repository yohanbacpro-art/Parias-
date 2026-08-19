# PARIAS — Chroniques de Vardhen

> *Le monde n'existe pas pour le joueur. Le joueur existe dans le monde.*

RPG narratif au tour par tour. On incarne **Yohan de Karlsberg**, dernier héritier
connu d'une maison Paria rasée pendant la Grande Purge : deux pistolets à silex,
une épée bâtarde, et dans les veines une magie de l'Onde qui fatigue autant
qu'elle détruit.

**Version actuelle : V0.5** — les batailles rangées, le Renom, les campagnes et les attachements.

## Lancer le jeu

Aucune dépendance, aucun build. Ouvrir `index.html` dans un navigateur.

Pour éviter les restrictions `file://` (import de sauvegarde), servir le dossier :

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

## Ce qui est jouable

| Système | État |
|---|---|
| Prologue en 4 écrans | ✅ |
| Carte du monde (20 lieux, épingles colorées par Danger) | ✅ |
| Boucle de tour : 3 actions puis 2–6 semaines qui passent | ✅ |
| **Batailles rangées** : trois fronts, ordres, manœuvres, moral | ✅ |
| **Renom militaire** : recrutement et campagnes s'ouvrent avec lui | ✅ |
| **Armée** : 7 troupes recrutables, pertes et entretien persistants | ✅ |
| **Campagnes** : 6 contrats de général menant à une bataille | ✅ |
| **Affaires personnelles** : 3 contrats piégés par ceux qui vous en veulent | ✅ |
| **Attachements** : 3 arcs relationnels, 7 étapes, affinité par les choix | ✅ |
| **Événements de lieu** : 18 récits ramifiés, au moins deux par lieu | ✅ |
| **Rencontres** : 8 figures du Codex, croisées ou affrontées | ✅ |
| **Jalons de trame** : 6 étapes d'histoire qui se débloquent seules | ✅ |
| 349 scènes, 213 choix, 23 affrontements, 6 batailles au total | ✅ |
| **Combattants nommés** : 9 champions hors bestiaire | ✅ |
| Événements générés (200 variantes) — remplissage quand les écrits sont épuisés | ✅ |
| Contrats en 5 phases (Audience → Retour), 50 au registre | ✅ |
| **Combat de groupe** : party contre plusieurs adversaires, cibles au clic | ✅ |
| Pouvoirs de zone, à cibles multiples, de soin et de protection | ✅ |
| Combat tour par tour : 3 PA, d20 + Précision/VOL vs Défense | ✅ |
| Fatigue de l'Onde (Sûre → Tendue → Critique → Rupture) | ✅ |
| Arbre de pouvoirs de l'Onde, 4 branches × 4 tiers | ✅ |
| Équipement, inventaire, boutique itinérante | ✅ |
| Niveaux 1–20, XP, points de talent | ✅ |
| Suspicion : chasseurs de primes au-delà de 60 | ✅ |
| Tensions des 8 peuples, chroniques générées | ✅ |
| Trame principale en 5 chapitres | ✅ |
| **Compagnons combattants** : Alycia (Onde), Alarielle (magie ancienne) | ✅ |
| **Illustrations** : bandeaux d'événement et portraits, avec blason de repli | ✅ |
| Sauvegarde locale + export/import fichier | ✅ |
| Arbre de pouvoirs elfique (`TREE_ELFES`) | ✅ joué par Alarielle |

## Comment l'histoire avance

Trois sources d'événements, qui ne se déclenchent pas de la même façon.

**Les événements de lieu** se tirent en dépensant une action *Explorer*. Chaque
lieu a les siens ; ils ne se répètent pas tant que ceux de l'endroit ne sont pas
tous vus, et les 20 lieux en ont au moins un.

**Les rencontres** se tirent au même moment, mais seulement quand leurs
conditions sont réunies — un niveau, un chapitre, un marqueur posé par un
événement antérieur. Quand une est disponible, elle passe devant les autres :
croiser Caleb ou Tyrion vaut mieux qu'un énième bandit de route. Elles ne
reviennent jamais.

**Les jalons de trame** ne se cherchent pas. Ils se débloquent, et le premier
disponible se déclenche **de lui-même à la fin d'un tour** — le temps qui passe
fait avancer l'histoire, même quand Yohan ne cherche rien. Chacun pose un
marqueur dont le suivant dépend, ce qui garantit l'enchaînement. L'écran de
Quête indique combien sont franchis et si quelque chose est prêt à se produire.

## Les batailles

Une échelle au-dessus du combat : Yohan n'y frappe plus, il commande.

Le champ tient en **trois fronts**, chacun avec son terrain. On y répartit ses
unités, on donne **un ordre par front**, et on résout — les deux camps frappent
en même temps.

- **Triangle tactique** — cavalerie bat archers, archers battent infanterie,
  infanterie bat cavalerie. Frapper sa proie donne +50 %, affronter son prédateur
  −25 %.
- **Terrain** — la plaine sert la cavalerie, la colline les tireurs, le bois et
  le défilé l'infanterie. Où l'on se bat compte autant que qui.
- **Ordres** — Tenir (encaisser), Charger (écraser ou être écrasé), Harceler
  (les tireurs frappent sans être rendus), Se replier (sauver les hommes, payer
  en moral).
- **Manœuvre** — changer de front coûte son tour à l'unité : elle ne combat pas.
- **Deux façons de perdre** — les effectifs (une unité vidée est dissoute pour
  de bon) ou le moral (à zéro, l'armée rompt même avec des hommes debout).
- **Coup de l'Onde** — une fois par bataille, sur le front où se tient Yohan.
  Il fauche une unité et brise le moral adverse. Il coûte 35 de Fatigue et
  **25 de Suspicion** : deux armées viennent de voir ce qu'est un Paria.

Le sous-effectif se paie : la même bataille gagnée à 200 hommes est perdue à 100.
Contre l'armée de Lucius, « Tenir » perd et « Charger » gagne — l'ordre donné
décide autant que les troupes levées.

## L'armée et le Renom

Le **Renom** est une réputation militaire distincte du niveau. Il monte aux
contrats honorés et aux batailles, descend aux défaites et aux soldes impayées,
et c'est lui qui ouvre le recrutement et les campagnes : personne ne confie une
colonne à un inconnu.

| Renom | Rang | Ce qui s'ouvre |
|---|---|---|
| 0 | Inconnu | Lanciers, Archers · première campagne |
| 15 | Chef de bande | Cavalerie |
| 35 | Capitaine | Vétérans d'Astrah |
| 45 | Commandant | Arbalétriers nains *(exige l'amitié de Gorm)* |
| 55 | — | Lanciers Khesh *(exige l'alliance de Kem-Val)* |
| 100 | Seigneur de guerre | — |

Les unités **persistent avec leurs pertes** d'une bataille à l'autre et coûtent
un entretien prélevé à chaque fin de tour. Une troupe qu'on ne paie pas déserte
et emporte 3 points de Renom avec elle.

Les **Sans-Nom** ne se recrutent pas : cette poignée de porteurs de l'Onde
n'arrive qu'en épousant la cause d'Alycia.

## Les attachements

Trois arcs — Alycia, Alarielle, et Lady Éléonore si le Prix du Paria a été
accepté. Ils se déclenchent en fin de tour, **après** les jalons de trame : ce
sont les moments calmes entre deux missions.

L'**affinité** ne monte que par des choix, jamais par le temps qui passe. Chaque
arc a une sortie qui n'engage à rien, et refuser ne cache aucune pénalité. Les
scènes s'arrêtent à la porte. Ce qui en découle change quelque chose — Alarielle
peut brûler sa convocation et cesser d'être princesse, Éléonore peut lier
Valombre à Karlsberg.

## Les figures du monde

Neuf combattants nommés vivent hors du bestiaire, dans `src/data/champions.js` :
Caleb, Tyrion, Khal-Vaene, Kem-Val, Charles de Mont-Draken, une Lame de la Cour
Noire, le Tenant de l'Arène, la garde d'Astrah et un chasseur de Parias.

Les croiser n'implique pas de se battre. Caleb propose un marché, Kem-Val
partage son eau, Charles partage son pain, Lucius explique posément pourquoi il
devra supprimer Yohan — « vers la fin, vous n'êtes pas prioritaires ». Chaque
rencontre a une sortie sans violence, une sortie par les armes, et au moins une
troisième voie qui demande de trouver le bon angle.

**Un duel écrit ne tue jamais définitivement.** Quand un événement définit ce
qui se passe en cas de défaite, c'est cette scène qui s'applique — la mort
permanente reste réservée aux rencontres aléatoires et aux contrats, où
personne n'a écrit de porte de sortie.

## Règles clés

- **Le groupe** — Yohan et ses compagnons combattent ensemble. Chaque membre a
  ses propres PA ; on clique une carte du groupe pour choisir qui agit, une carte
  d'adversaire pour choisir la cible, puis « Terminer le tour ».
- **Points d'Action** — 3 par tour pour Yohan, 2 pour les compagnons. Tir 1 PA ·
  épée légère 1 PA · épée lourde 2 PA · recharger 1 PA · pouvoirs 1–3 PA.
- **Portée des pouvoirs** — cible unique, `cibles: 2` (rebond à 60 % des dégâts),
  ou `zone: true` (tous les adversaires). Certains soignent, apaisent la Fatigue
  ou protègent le groupe au lieu de frapper.
- **Deux magies** — Yohan et Alycia puisent dans l'Onde, viscérale et vorace ;
  Alarielle dans la magie ancienne d'Eltharion, qui soigne et protège. Le sang
  Paria ne donne pas accès à l'arbre elfique, et réciproquement.
- **Touche** — d20 + Précision (armes) ou + Volonté (pouvoirs) vs Défense.
  Marge ≥ 10 = critique (×1,5).
- **Fatigue de l'Onde** — 0–100. Plus la zone est haute, plus les pouvoirs coûtent
  cher (×1 → ×2), plus ils peuvent rater (0 % → 45 %), et à partir de Critique un
  échec inflige un contrecoup.
- **Mort permanente** — le combat n'est perdu que si tout le groupe tombe. Contre
  un Danger 3+, c'est la fin de la partie ; contre un Danger 1–2, Yohan s'en tire
  blessé. S'il tombe alors qu'un compagnon tient encore, le combat continue sans
  lui — et il repart à 1 PV si le groupe l'emporte.
- **Suspicion** — monte au combat et à l'intimidation, redescend au repos et avec
  le temps. À 60+, un chasseur de primes peut surgir en explorant.
- **Prix du Paria** — coutume ancestrale : un Paria peut réclamer l'or ou le prix
  ancien. Toujours négocié, jamais imposé, consentement requis.

## Structure

```
index.html            structure + styles + ordre de chargement
src/game.js           boucle de tour, monde, personnage, contrats, sauvegarde
src/combat.js         moteur de combat de groupe (party vs adversaires)
src/events_runner.js  déroulement des événements écrits et générés
src/battle.js         moteur de bataille rangée (fronts, ordres, moral)
src/ui/art.js         résolution des images + blason procédural de repli
src/data/
  bestiary.js         40 créatures, Danger 1–6
  locations.js        20 lieux + coordonnées sur la carte
  events.js           200 événements générés + variantes narratives
  events_written.js   18 événements de lieu, ramifiés en scènes
  events_meetings.js  8 rencontres avec les figures du Codex
  events_trame.js     6 jalons de la quête principale
  champions.js        9 combattants nommés (hors bestiaire)
  contracts_special.js 6 campagnes + 3 affaires personnelles
  romances.js         3 arcs relationnels, 7 étapes
  units.js            7 troupes recrutables + 9 troupes adverses
  battles.js          6 champs de bataille
  contracts.js        50 contrats (10 archétypes) + habillage narratif
  powers.js           arbres de pouvoirs (Onde, Elfes) + portée des sorts
  items.js            équipement et consommables
  portraits.js        registre des personnages illustrés
  lore.js             prologue, trame, compagnons, codex, calendrier, tensions
assets/               illustrations à déposer — voir assets/README.md
tools/validate.js     contrôle d'intégrité du contenu
```

Les fichiers de `src/data/` sont des scripts classiques chargés avant `game.js` :
tout vit dans la portée globale, il n'y a ni bundler ni étape de build.

## Vérifier une modification

```bash
node tools/validate.js                       # cohérence du contenu
for f in src/*.js src/*/*.js; do node --check "$f"; done   # syntaxe
```

`tools/validate.js` vérifie que chaque scène référencée existe, que les créatures,
champions, objets, pouvoirs, portraits, lieux, troupes et batailles cités sont
réels, que les marqueurs exigés sont bien posés quelque part, et que chaque
jalon de trame, contrat spécial ou attachement pose le sien. Il imprime aussi **la couverture par lieu** et échoue si un lieu ne peut
déclencher aucun événement écrit.

## Écrire un événement

Tout se passe dans `src/data/events_written.js`. Un événement est un arbre de
scènes ; le format complet est documenté en tête de fichier. En résumé :

```js
{
  id:"EW_EXEMPLE", titre:"…", famille:"VOYAGE", rarete:"rare",
  image:"evt_exemple",            // assets/events/evt_exemple.webp
  lieux:["LOC_011"],              // facultatif : sinon, filtré par famille
  scenes:{
    start:{
      pnj:"baltus",               // portrait affiché
      texte:["paragraphe…"],
      choix:[
        {label:"Payer", detail:"−20 or", suite:"paye", effets:{or:-20}},
        {label:"Refuser", test:{stat:"vol", dc:13}, reussite:"ok", echec:"ko"},
        {label:"User de l'Onde", requis:{pouvoir:"foudre"}, suite:"onde"},
      ]
    },
    ko:{ texte:["…"], combat:{groupe:[{bst:"BST_002",n:2}], victoire:"apres", defaite:"apres"} },
    apres:{ texte:["…"], effets:{suspicion:5, flags:["marqueur"]}, fin:true }
  }
}
```

Pour une **rencontre** (`events_meetings.js`), ajouter des conditions
d'apparition et, si besoin, un combattant nommé :

```js
requis:{ niveauMin:4, chapitreMin:1, sangMin:40, compagnon:"alycia",
         flags:["bannieres_vues"], sansFlags:["caleb_rencontre"] },
…
combat:{ groupe:[{champion:"caleb"}], victoire:"gagne", defaite:"perdu" }
```

Pour un **jalon de trame** (`events_trame.js`), même format : `requis.sansFlags`
doit nommer le marqueur que l'événement pose lui-même — c'est ce qui l'empêche
de se rejouer, et le validateur le vérifie.

Pour une **campagne** (`contracts_special.js`), la scène finale est une bataille :

```js
requis:{ renomMin:18, flags:["tr_03_fait"], sansFlags:["cg_x_fait"] },
…
champ:{ texte:["…"], bataille:{ def:"BAT_CENDRE", victoire:"gagne", defaite:"perdu" } }
```

Pour un **attachement** (`romances.js`), l'affinité se gagne dans les choix :

```js
requis:{ compagnon:"alycia", affinite:{qui:"alycia", min:4}, sansFlags:["ro_x_fait"] },
…
{label:"…", effets:{ affinite:{qui:"alycia", n:3} }, suite:"…"}
```

Un choix verrouillé reste visible, grisé, avec la raison affichée — le joueur
voit ce qu'il rate. Les événements écrits ne se répètent pas tant que ceux
applicables au lieu ne sont pas tous vus.

Le contenu de jeu provient du **Content Pack V1.4**.
