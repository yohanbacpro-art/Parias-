# PARIAS — Chroniques de Vardhen

> *Le monde n'existe pas pour le joueur. Le joueur existe dans le monde.*

RPG narratif au tour par tour. On incarne **Yohan de Karlsberg**, dernier héritier
connu d'une maison Paria rasée pendant la Grande Purge : deux pistolets à silex,
une épée bâtarde, et dans les veines une magie de l'Onde qui fatigue autant
qu'elle détruit.

**Version actuelle : V1.0** — les vraies illustrations : 13 portraits et 10 bandeaux peints, embarqués dans le fichier unique.

## Lancer le jeu

Aucune dépendance, aucun build. Ouvrir `index.html` dans un navigateur.

Pour éviter les restrictions `file://` (import de sauvegarde), servir le dossier :

```bash
python3 -m http.server 8000   # puis http://localhost:8000
```

`dist/parias.html` est le même jeu en un seul fichier, à partager par simple
lien. Il se régénère avec `node tools/build-standalone.js`.

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
| **Événements de lieu** : 44 récits ramifiés, au moins quatre par lieu | ✅ |
| **Réputation** : ce que chaque peuple pense de vous, et ce que ça coûte | ✅ |
| **Économie** : marchands par peuple, prix par réputation, butin de bataille | ✅ |
| **Rencontres** : 8 figures du Codex, croisées ou affrontées | ✅ |
| **Jalons de trame** : 11 étapes d'histoire qui se débloquent seules | ✅ |
| **L'arc du Livré** : un nemesis en 5 jalons, 5 issues, un duel à règle propre | ✅ |
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
| Trame principale en 5 chapitres, 11 jalons écrits | ✅ |
| **Compagnons combattants** : Alycia (Onde), Alarielle (magie ancienne) | ✅ |
| **Illustrations** : bandeaux et portraits dessinés d'après le sujet, remplaçables par des fichiers | ✅ |
| **Sauvegarde** : 4 emplacements, métadonnées, migrations, export texte | ✅ |
| **Épilogue** : une fin assemblée à partir de ce que la partie a fait | ✅ |
| **Héritage** : ce qu'une chronique achevée transmet à la suivante | ✅ |
| Arbre de pouvoirs elfique (`TREE_ELFES`) | ✅ joué par Alarielle |

## Comment l'histoire avance

Trois sources d'événements, qui ne se déclenchent pas de la même façon.

**Les événements de lieu** se tirent en dépensant une action *Explorer*. Chaque
lieu a les siens ; ils ne se répètent pas tant que ceux de l'endroit ne sont pas
tous vus. **Les 20 lieux en ont au moins quatre** — c'était deux, et passé deux
explorations on retombait sur les variantes générées.

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

## La réputation

À ne pas confondre avec les **tensions** : la tension est la trajectoire propre
d'un peuple, qu'on la regarde ou non. La réputation, c'est ce que ce peuple
pense de **vous**. Elle va de −100 à +100, ne bouge que par des choix — jamais
par le temps qui passe — et se lit sur l'écran des Chroniques, avec ce qu'on dit
de Yohan chez eux.

| Rang | Seuil | Ce que ça change |
|---|---|---|
| Ennemi juré | −100 | On ne vous vend plus rien, et le lieu vous le dit en arrivant |
| Honni | −60 | Prix ×1,6 |
| Sous surveillance | −25 | Prix ×1,25 |
| Sans histoire | −9 | Prix ordinaires |
| Bien vu | +30 | Prix ×0,85, et un rang de marchandise de plus à l'étal |
| Des leurs | +70 | Prix ×0,70, et ce qu'ils gardent pour eux |

Franchir un rang est **annoncé dans les Chroniques**, dans les deux sens : une
réputation qu'on ne voit pas changer ne se joue pas.

Dans les données : `effets:{ reputation:{ nains:8, humains:-4 } }` pour la
déplacer, `requis:{ reputationMin:{ nains:30 } }` pour ouvrir une branche que
seuls les estimés voient. Le validateur refuse un peuple mal orthographié — la
branche resterait invisible pour toujours sans que rien ne le signale.

## L'équipement et les marchands

Chaque objet porte un **peuple** et un **rang** (0 commun → 3 pièce de maître).
Ce qu'on trouve dépend du lieu, ce qu'on en demande dépend de la réputation :

- **six marchands** — Astrah, Kar-Durak, les tentes khesh, le dépôt d'Eltharion,
  l'étal de Valombre, le fond de charrette paria — plus le colporteur des terres
  de personne, qui ne fait de prix à personne ;
- **Peaux-Vertes et Hommes-Bêtes ne tiennent pas boutique.** Leur équipement se
  prend sur un champ de bataille, pas sur un étal ;
- **six pièces uniques** ne s'achètent nulle part : elles se gagnent dans une
  scène. Le validateur refuse une pièce unique qu'aucune scène ne donne ;
- **butin de bataille** : on ramasse l'équipement de ceux qu'on vient de battre —
  et les battre coûte 8 points de réputation chez eux, quand ce sont bien des
  gens et pas une compagnie franche. Les battre *pour* quelqu'un en rapporte 12
  chez lui.

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

## La sauvegarde

Quatre emplacements : une **sauvegarde automatique**, écrite à chaque fin de
tour et après chaque affrontement, et **trois emplacements manuels** que le
joueur remplit lui-même. Chacun affiche ce qu'il contient avant qu'on le charge
— chapitre, niveau, Renom, or, saison, lieu, compagnons.

Trois garanties, dans cet ordre d'importance :

1. **Ne jamais écraser du bon avec du mauvais.** Toute écriture est relue et
   revalidée ; au moindre échec, l'ancienne sauvegarde est remise en place.
2. **Ne jamais perdre une partie en silence.** Le stockage local est éprouvé
   pour de vrai au démarrage. Quand le navigateur le refuse — page intégrée,
   navigation privée, cookies cloisonnés — le jeu le **dit** au lieu de faire
   semblant d'enregistrer, et renvoie vers l'export en texte.
3. **Ne jamais casser une vieille sauvegarde.** Chaque enregistrement porte un
   numéro de version et traverse les migrations avant d'être joué. Les parties
   d'avant les emplacements sont récupérées automatiquement dans l'emplacement 1.

L'export produit un fichier **et** affiche le texte de la sauvegarde : dans une
page intégrée ou en `file://`, le téléchargement échoue silencieusement, le
copier-coller jamais.

`tools/smoke-save.js` éprouve tout cela dans un vrai navigateur, y compris le
cas du stockage interdit et celui d'une écriture impossible.

## L'épilogue

La chronique ne s'arrête plus sur un compteur : elle rend un **verdict**,
assemblé à partir de ce que la partie a réellement fait — les marqueurs posés,
l'état des huit peuples, les liens tissés, les campagnes menées.

Cinq sections, toutes conditionnelles :

- **L'ouverture** — la dernière décision (`voie_empire`, `voie_refuge`,
  `voie_ordinaire`) croisée avec la manière dont elle a été prise.
- **Le monde après** — un verdict par peuple, tiré d'abord de ce que la partie a
  explicitement décidé (Kar-Durak sauvée ou tombée, Horde dispersée ou passée),
  sinon de la tension où la simulation les a laissés.
- **Ceux qui restaient** — cumulatif : chaque personne dont Yohan a croisé la
  route et laissé une trace, compagnes et princes compris.
- **Celui qui suivait** — ce que devient le Livré, selon ce que Yohan lui a fait.
- **Ce qui suivait** — le fil de l'Onde, selon ce qu'il en a compris.
- **Ce qui se transmet** — les legs mérités, et rien d'autre.

Chaque section à verdict unique a un repli : une partie ne peut pas atteindre la
fin et n'avoir rien à lire. Le validateur le vérifie, et refuse un verdict
conditionné à un marqueur qui n'existe pas — il serait inatteignable en silence.

**L'héritage.** Une chronique achevée est rangée dans le premier emplacement
manuel libre — elle reste jouable — et transmet ce qu'elle a mérité : de l'or
pour un nom reconnu, du Renom pour une réputation d'armes, un point de talent
pour avoir compris le cycle ou sorti les siens de l'ombre. On garde le legs le
plus riche jamais obtenu, pas le dernier : recommencer ne fait jamais reculer.

## Le Livré — le nemesis

Dès le premier jalon de la trame, un registre de relais nomme un destinataire
réduit à trois lettres — **L.F.A.** — et le texte promet que Yohan « le
reconnaîtra plus tard ». L'arc du Livré paie cette promesse.

Ces trois lettres ne sont pas un nom. C'est le tampon apposé sur le dossier d'un
enfant Paria pris pendant la Grande Purge et gardé vivant : **Livré · Formé ·
Assermenté**. Il signe de son classement parce que c'est la seule chose qu'on
lui ait donnée à la place d'un nom.

Il rassemble les derniers porteurs de l'Onde — sans en tuer un seul — pour
qu'ils meurent vieux et sans descendance, et il compte être le dernier. C'est le
miroir exact de Yohan : même sang, même magie, conclusion inverse. Il ne casse
pas de porte : il paie les soldes en retard, il présente des ordres en règle, il
parle aux gens jusqu'à ce qu'ils le suivent. On ne peut pas le haïr proprement.

**Le Sillage.** C'est lui qui a compris que l'Onde laisse une trace mesurable
après usage — *cherchez-le par la Fatigue* — et lui qui l'a mis par écrit, sur
une échelle en quatre degrés : calme, tendu, critique, rompu. En duel, cela se
paie : sa précision et ses dégâts montent avec la Fatigue de Yohan, jusqu'à
+5 pour toucher et +12 aux dégâts à la Rupture. Gagner en vidant ses pouvoirs,
c'est le nourrir. L'interface affiche le degré atteint et le bonus exact — une
règle de combat invisible serait un piège, pas une mécanique.

Mesuré sur 30 duels par état, avec compagnes et pouvoirs : **83 %** de victoires
en arrivant reposé, **60 %** à Fatigue tendue, **53 %** à la Rupture. Le duel se
gagne quand on choisit son moment.

**Cinq jalons**, intercalés entre ceux de la trame : un hameau vidé sans un cri,
le registre du sillage, la première rencontre — une table, pas un combat —, ce
qu'il prend à Yohan (les Sans-Nom, la colonne ou le hameau qui l'abritait, selon
ce que Yohan a construit), et la carrière.

**Cinq issues**, qui s'écrivent différemment dans l'épilogue : le tuer, lui
prendre son cahier, conclure un délai, perdre — il vous laisse vivre, ce qui est
son argument — ou **lui donner un nom**, ce qui exige d'avoir compris ce que
L.F.A. veut dire, et de le penser vraiment.

## Les figures du monde

Dix combattants nommés vivent hors du bestiaire, dans `src/data/champions.js` :
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
src/game.js           boucle de tour, monde, personnage, contrats
src/save.js           emplacements, métadonnées, migrations, intégrité
src/epilogue.js       verdict de fin de chronique et héritage
src/reputation.js     rangs, prix, accueil hostile, écran des peuples
src/combat.js         moteur de combat de groupe (party vs adversaires)
src/events_runner.js  déroulement des événements écrits et générés
src/battle.js         moteur de bataille rangée (fronts, ordres, moral)
src/ui/art.js         résolution des images + blason procédural de repli
src/data/
  bestiary.js         40 créatures, Danger 1–6
  locations.js        20 lieux + coordonnées sur la carte
  events.js           200 événements générés + variantes narratives
  events_written.js   18 événements de lieu, ramifiés en scènes
  events_written_2.js 26 de plus — la deuxième vague, adossée à la réputation
  reputation.js       rangs, peuple de chaque lieu, ce qu'on dit de vous
  events_meetings.js  8 rencontres avec les figures du Codex
  events_trame.js     11 jalons de la quête principale
  events_nemesis.js   5 jalons de l'arc du Livré
  champions.js        9 combattants nommés (hors bestiaire)
  contracts_special.js 6 campagnes + 3 affaires personnelles
  romances.js         3 arcs relationnels, 7 étapes
  units.js            7 troupes recrutables + 14 troupes adverses
  battles.js          12 champs de bataille, dont 6 crises de peuple
  epilogue.js         verdicts de fin, par voie, par peuple, par personne
  contracts.js        50 contrats (10 archétypes) + habillage narratif
  powers.js           arbres de pouvoirs (Onde, Elfes) + portée des sorts
  items.js            équipement et consommables
  portraits.js        registre des personnages illustrés
  lore.js             prologue, trame, compagnons, codex, calendrier, tensions
assets/sources/       les planches d'origine, dont les découpes sont tirées
assets/portraits/     13 portraits fournis · assets/events/ 10 bandeaux
tools/decoupe-affiche.py   refait les découpes depuis les planches
dist/parias.html      le jeu en un seul fichier (généré)
tools/validate.js     contrôle d'intégrité du contenu
tools/build-standalone.js  fabrique dist/parias.html
tools/smoke-save.js        éprouve la sauvegarde dans un navigateur
tools/smoke-epilogue.js    éprouve les fins et l'héritage
tools/smoke-campagnes.js   éprouve les campagnes majeures et la trame
tools/smoke-nemesis.js     éprouve l'arc du Livré, le Sillage et ses issues
tools/smoke-monde.js       éprouve la réputation, les marchands et la 2e vague
tools/manifest-assets.js   régénère assets/README.md (avec ce qui est fourni)
```

Les fichiers de `src/data/` sont des scripts classiques chargés avant `game.js` :
tout vit dans la portée globale, il n'y a ni bundler ni étape de build.

## Vérifier une modification

```bash
node tools/validate.js                       # cohérence du contenu
for f in src/*.js src/*/*.js; do node --check "$f"; done   # syntaxe

node tools/build-standalone.js               # puis, sur le fichier unique :
node tools/smoke-save.js                     # emplacements, migrations, stockage refusé
node tools/smoke-epilogue.js                 # deux fins opposées + héritage
node tools/smoke-campagnes.js                # campagnes majeures et trame complète
node tools/smoke-nemesis.js                  # l'arc du Livré, le Sillage, ses cinq fins
node tools/smoke-monde.js                    # réputation, marchands, couverture des lieux

node tools/manifest-assets.js                # régénère la liste des illustrations
```

Les épreuves de navigateur utilisent le Chromium préinstallé
(`/opt/pw-browsers/chromium`) via `playwright-core`.

`tools/validate.js` vérifie que chaque scène référencée existe, que les créatures,
champions, objets, pouvoirs, portraits, lieux, troupes et batailles cités sont
réels, que les marqueurs exigés sont bien posés quelque part, et que chaque
jalon de trame, contrat spécial ou attachement pose le sien. Il contrôle aussi
**l'épilogue** : aucun verdict ne doit dépendre d'un marqueur inexistant, et
chaque section à verdict unique doit avoir un repli. Il imprime enfin **la
couverture par lieu** et échoue si un lieu ne peut déclencher aucun événement
écrit.

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

## Les illustrations

**13 portraits et 10 bandeaux sont fournis**, découpés des planches de
`assets/sources/` par `python3 tools/decoupe-affiche.py` (coordonnées calées à
la main, refaisables). Ils couvrent tous les personnages majeurs du Codex et
les 8 familles d'événements générés — c'est-à-dire l'écrasante majorité de ce
qu'on voit en jouant. `assets/README.md` liste ce qui est fourni et ce qui
manque encore.

Aucun fichier n'est requis pour autant. Tant qu'une image manque, le jeu la
**dessine** en SVG, de façon déterministe et informée par ce qu'elle
représente :

- un **portrait** prend la palette du peuple du personnage et sa silhouette de
  ses attributs — couronne, capuche, heaume, voile, barbe, masque, tresses,
  oreilles elfiques, et la marque turquoise de ceux qui portent l'Onde ;
- un **bandeau** prend son ciel, son horizon et son motif de la famille de
  l'événement — dunes pour les Khesh, chevalement pour Kar-Durak, voûte pour la
  Cour Noire, faille pour l'Onde, forêt de lances pour la guerre.

Le même personnage a donc toujours le même visage, d'une partie à l'autre.
Déposer un vrai fichier au bon chemin le remplace, sans toucher au code :
`assets/portraits/<id>.webp` (512×512, visage centré — il est recadré en rond)
et `assets/events/<id>.webp` (1200×480). La liste exacte des fichiers attendus
est dans `assets/README.md`, **générée** par `node tools/manifest-assets.js`.

Le validateur garde le câblage : peuple et attribut dessinables, portrait de
champion existant, alerte quand deux champions partagent un visage, et quand une
scène nomme un personnage sans l'afficher.

**Dans le fichier unique**, les images sont **embarquées en base64** par
`tools/build-standalone.js` : une page unique n'a pas de « à côté » où aller
chercher un fichier, et la version publiée n'afficherait rien sans cela. Le
développement, lui, continue de lire les fichiers de `assets/`.

## Écrire une fin

`src/data/epilogue.js`. Un verdict est un texte plus une condition ; le moteur
retient le premier qui tient dans les sections à verdict unique, tous ceux qui
tiennent dans les sections cumulatives.

```js
{ si:{ flags:['kardurak_sauve'] }, texte:`Kar-Durak tint. …` },
{ si:{ tensionMin:{ nains:60 } },  texte:`…` },
{ si:{ toujours:true },            texte:`…` },   // le repli, toujours en dernier
```

Conditions reconnues : `flags`, `sansFlags`, `unDes`, `compagnon`, `affinite`,
`tensionMin`, `tensionMax`, `renomMin`, `suspicionMin`, `suspicionMax`,
`armeeMin`, `niveauMin`, `toujours`.

Un legs (`EPI_LEGS`) ajoute un `id`, un `nom` et un `effet` (`or`, `renom`,
`talentPoints`) transmis à la chronique suivante.

Le contenu de jeu provient du **Content Pack V1.4**.
