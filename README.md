# PARIAS — Chroniques de Vardhen

> *Le monde n'existe pas pour le joueur. Le joueur existe dans le monde.*

RPG narratif au tour par tour. On incarne **Yohan de Karlsberg**, dernier héritier
connu d'une maison Paria rasée pendant la Grande Purge : deux pistolets à silex,
une épée bâtarde, et dans les veines une magie de l'Onde qui fatigue autant
qu'elle détruit.

**Version actuelle : V2.4** — **plus rien de générique**. Le registre de
cinquante contrats dérivés de dix archétypes et les deux cents variantes
d'événements générés ont été supprimés. À leur place : neuf affaires écrites,
placées exactement là où le jeu manquait, et huit passages courts pour un lieu
qu'on a vidé.

*V2.3 : la succession se joue.*

**V2.3** — **la succession se joue**. Yohan meurt de
vieillesse ou transmet de son vivant ; la partie continue avec son héritier,
dans le même monde, où neuf personnes se souviennent encore de ce que son père
leur a fait.

*V2.2 : Karlsberg ne se paie plus en or — il faut de la pierre, des bras, du
grain et des dettes qu'on vous doit, et rien de tout cela ne s'achète.
V2.1 : les liens sur quatre axes séparés — relation, confiance, attirance et
compatibilité politique ne montent pas ensemble. V2.0 : les neuf acteurs
autonomes, qui décident seuls, se souviennent nommément de vous, vieillissent et
meurent. V1.9 : les cinq crises régionales en cinq étapes nommées. V1.8 : les
dix chaînes secrètes, armées en silence sur ce que vous avez fait. V1.7 : les
trente affaires du pack narratif écrites en chaînes.*

> **`CLAUDE.md` fait autorité.** Il porte le prompt maître du projet, l'audit du
> code au regard de ce prompt, et la feuille de route. Ce README-ci documente ce
> qui existe et comment le vérifier.

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
| **Armée** : 15 troupes recrutables, pertes et entretien persistants | ✅ |
| **Campagnes** : 6 contrats de général menant à une bataille | ✅ |
| **Affaires personnelles** : 3 contrats piégés par ceux qui vous en veulent | ✅ |
| **Attachements** : 3 arcs relationnels, 10 étapes dont 3 conclusions | ✅ |
| **Événements de lieu** : 44 récits ramifiés, au moins quatre par lieu | ✅ |
| **Réputation** : ce que chaque peuple pense de vous, et ce que ça coûte | ✅ |
| **Le temps** : Yohan vieillit, et le corps finit par compter | ✅ |
| **La lignée** : le Prix du Paria donne des enfants, et un nom qui continue | ✅ |
| **Le pli du tour** : chaque fin de tour apporte quelque chose à faire | ✅ |
| **Carte lisible** : régions nommées, routes tracées, état de chaque lieu | ✅ |
| **Économie** : marchands par peuple, prix par réputation, butin de bataille | ✅ |
| **Rencontres** : 8 figures du Codex, croisées ou affrontées | ✅ |
| **Jalons de trame** : 11 étapes d'histoire qui se débloquent seules | ✅ |
| **L'arc du Livré** : un nemesis en 5 jalons, 5 issues, un duel à règle propre | ✅ |
| **L'arc d'Isolde** : le Second Empire par les registres, 5 jalons, 5 issues | ✅ |
| **Affaires locales** : 60 contrats sur les 20 lieux, 20 dénouements qui changent l'endroit | ✅ |
| **Recrutement consenti** : chaque compagnon s'accepte, se refuse, et se congédie | ✅ |
| **Un seul écran de jeu** : le lieu, ses trois offres du tour, ce qu'on y fait | ✅ |
| **Voyages par contrat** : accepter une affaire lointaine, c'est prendre la route | ✅ |
| **Suspicion vivante** : 4 paliers, 12 événements dédiés, des couvertures durables | ✅ |
| **Le chantier de Karlsberg** : 11 ouvrages, 6 états, payés en pierre, bras, grain et faveurs | ✅ |
| **Politique** : 6 puissances, leur influence, leur posture, et 8 édits qui tombent | ✅ |
| **Le Prix du Paria** : toute maison noble doit l'Or et le Sang, en trois termes | ✅ |
| **Affaires en chaînes** : 30 affaires en 101 étapes, jouées sur plusieurs tours | ✅ |
| **Chaînes secrètes** : 10 chaînes armées sur marqueur, en arrière-plan, jamais proposées | ✅ |
| **Crises régionales** : 5 crises en 5 étapes nommées, poussées par l'état du monde | ✅ |
| **Neuf acteurs autonomes** : objectifs qui suivent le monde, mémoire nominative, 32 actes | ✅ |
| **Liens à quatre axes** : relation, confiance, attirance, politique — séparés | ✅ |
| **Succession jouable** : on continue avec l'héritier, dans le monde que son père a fait | ✅ |
| **Maisons nobles** : 25 maisons, 26 nobles adultes nommées, avec droit de refus | ✅ |
| **Bestiaire** : 75 créatures, dont 24 adversaires humains par peuple | ✅ |
| **Rencontres composées** : meneur, élite, soutien et piétaille selon l'affaire et le lieu | ✅ |
| 349 scènes, 213 choix, 23 affrontements, 6 batailles au total | ✅ |
| **Combattants nommés** : 9 champions hors bestiaire | ✅ |
| **Aucun contenu générique** : 49 affaires écrites, 8 passages de lieu épuisé | ✅ |
| Cadre en 5 phases (Audience → Retour) pour les 60 dossiers locaux écrits | ✅ |
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
| 0 | Inconnu | Lanciers, Archers, Frondeurs · première campagne |
| 15 | Chef de bande | Cavalerie |
| 35 | Capitaine | Vétérans d'Astrah |
| 45 | Commandant | Arbalétriers nains *(exige l'amitié de Gorm)* |
| 55 | — | Lanciers Khesh *(exige l'alliance de Kem-Val)* |
| 100 | Seigneur de guerre | — |

Quinze troupes recrutables, réparties sur les trois côtés du triangle : des
frondeurs de hameau à quatre-vingt-dix pièces, des sapeurs nains qui ne
chargent jamais, des chariots khesh qui n'ont qu'une charge dans le ventre, des
gardes du serment qui rompent en dernier. Huit d'entre elles s'ouvrent à
l'**estime d'un peuple** plutôt qu'au Renom : les nains ne confient pas leurs
sapeurs à quelqu'un qu'ils ne tiennent pas en estime, quel que soit son rang
militaire.

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
- **Ce que le nom devint** — la descendance, ou son absence.
- **Ce qu'il advint de l'Empire** — le Second Empire, ou son absence.
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

## Un seul écran de jeu

Il y avait trois systèmes de contrats qui se marchaient dessus : un registre
général de cinquante affaires situées nulle part, des affaires locales dans un
autre onglet, et un pli de fin de tour qui proposait des contrats d'autres
régions à un homme qui n'y était pas. On ne savait plus où regarder.

Il n'y en a plus qu'un : **le lieu où l'on se trouve**.

- **Trois offres par tour**, tirées de là où Yohan est. Le dossier du lieu
  d'abord — ce sont ses affaires à lui — puis, quand il se vide, ce qu'un voisin
  relié par la route fait dire jusqu'ici, puis le tableau des mercenaires,
  rhabillé aux couleurs de l'endroit et de son peuple.
- **Les offres sont stables pour le tour.** On ne rafraîchit pas un tableau
  d'affichage en le regardant. Le tour suivant en apporte d'autres.
- **Une offre annonce quatre choses avant d'être acceptée** : qui paie, ce qu'il
  faut faire, **où**, et ce que ça coûtera en Suspicion.
- **Les voyages sortent des contrats.** Accepter une affaire qui se déroule
  ailleurs, c'est partir : le trajet coûte des semaines de calendrier calculées
  sur la distance réelle, fatigue de 4 points par semaine, et fait un peu
  oublier. On ne se promène plus sur la carte pour qu'un inconnu vous propose
  une affaire à trois régions de là.
- **Le reste des onglets redevient ce qu'il aurait dû être** : des fiches qu'on
  consulte, pas des endroits où l'on joue. L'onglet Contrats a disparu ;
  campagnes et affaires personnelles sont passées sous *Quête*.

## Les affaires sont des chaînes

Le pack narratif Vardhen le demandait depuis sa V4 : *« Les contrats sont conçus
comme des chaînes et non comme des missions instantanées. »* C'était le vrai
manque du jeu — la boucle principale, celle où passe tout le temps de jeu, était
la chose la moins écrite.

Une affaire ne se clique plus : **elle se vit sur plusieurs tours.**

- **L'audience se joue en toutes lettres.** Le commanditaire est un vrai
  personnage : on peut le questionner, examiner ce qu'il montre, refuser
  d'écouter, ou parler d'argent tout de suite. Ce qu'on apprend là ouvre ou
  ferme des branches quatre étapes plus tard.
- **Les termes se fixent avant tout départ**, jamais après coup — la règle du
  pack, appliquée à la lettre.
- **Chaque étape suivante est datée.** Deux à cinq semaines. Entre-temps on
  voyage, on se bat ailleurs, on relève un mur, on se repose — et un jour la
  suite vous rattrape en fin de tour. L'écran du lieu rappelle en permanence
  quelle affaire court et combien de semaines il reste.
- **Les branches sont des données, pas du code.** Une scène dit
  `effets:{ etape:"x" }` pour choisir la suite, `effets:{ issue:"y" }` pour
  refermer l'affaire. Aucune ligne de moteur par contrat.
- **L'issue survit à tout.** `hero.chaines.issues[id]` est écrit une fois et
  relu pour toujours : par les offres, par les autres affaires, par l'épilogue.
  C'est ça, se souvenir.
- **Une seule affaire à la fois.** On n'est qu'un homme.

Les trente affaires du pack sont écrites, en 101 étapes et 564 scènes. En voici quelques-unes :

| Affaire | Ce qui s'y joue |
|---|---|
| **Le Dragon de Valcroix** | Une bête qui brûle tout sauf le château. Le commanditaire ment par omission — et on peut le tuer, lui rendre ce qu'il a volé, ou le faire parler devant sa propre cour. |
| **Les Mille Gueules** | Une mine de fer, trente-quatre disparus, et des voix qui imitent les morts. Rouvrir, murer, ou ne rien déclarer et rendre les hommes à leurs familles. |
| **La Fille de Sombreval** | Une disparue dans les marais. Au retour, sa version contredit celle de son père — et l'on décide de ce qui sera dit. |
| **La Gueule de Fer** | Une bête cuirassée qui mange le métal chaud parce qu'elle en a besoin pour tenir debout. L'abattre, la nourrir ailleurs, ou éteindre les forges et vider deux villages. |
| **Les Sept Disparus** | Sept nobles évaporés sans rançon. Personne ne les a tués : on leur a offert un bateau, et ils ont dit oui. Reste à décider ce qu'un vieil homme apprendra. |
| **La Princesse et le Traître** | Onze personnes dans une escorte, et l'une d'elles est achetée. Six semaines pour trouver laquelle avant le pont. |
| **Le Roi sous la montagne** | Un chef Peau-Verte discipliné creuse vers un mur que les Nains ont monté il y a six cents ans sans écrire pourquoi. Il a fait descendre les familles : il ne peut plus reculer. |
| **Le Sang dans les Archives** | Onze registres généalogiques volés — dont celui des Karlsberg. Les rendre, les brûler, les garder, ou les vendre à qui les cherche. |

| **Le Roi sous la montagne** | Gharok creuse vers un mur que les Nains ont monté il y a six cents ans sans écrire pourquoi. Il a fait descendre les familles : il ne peut plus reculer. |
| **La Flèche de Tyrion** | Ce que les Elfes appellent un déséquilibre a neuf ans, vend des lacets à la foire de Port-Noir, et fait vaciller les lanternes quand elle rit. |
| **Le Dragon sans royaume** | Un dragon de quatre cents ans propose des termes écrits et négocie à la baisse. Sept maisons paient pour qu'il meure avant que la nouvelle se répande. |
| **La Guerre du Loup** | Trois bannières marchent sur Karlsberg. Ce n'est pas un contrat : c'est chez vous, et ce qu'il y a derrière les murs est exactement ce que vous y avez mis. |

Vingt affaires sur trente réclament le Prix du Paria. Cinq mènent à une bataille
rangée sous le moteur existant.

## Les chaînes secrètes

> *« Une décision importante ne se réduit pas à relation −20. Elle pose un
> marqueur. Des mois plus tard, cet homme peut envoyer des tueurs, provoquer en
> duel, marcher sur Karlsberg — ou renoncer. »*

Une affaire commence parce qu'on l'accepte. **Une chaîne secrète commence parce
qu'on a fait quelque chose** — et personne ne vous prévient.

- Elle porte un `declencheur:{ flags, sansFlags, apres }` au lieu d'une offre.
  `armerChainesDeFond()` tourne en fin de tour, vérifie les marqueurs posés, et
  arme la chaîne **en silence** : rien ne s'affiche, rien ne se propose, rien ne
  s'accepte. La première étape tombe six à vingt-quatre semaines plus tard.
- **Trois au plus courent de front** (`FOND_MAX`), pour qu'on sache encore
  laquelle est laquelle — et elles courent *en parallèle* de l'affaire en cours,
  qui reste limitée à une.
- Une fois armée, c'est le moteur ordinaire : des étapes datées, des scènes
  écrites, des choix, des combats, des batailles, une issue enregistrée pour
  toujours.

| Chaîne | Ce qui l'arme | Ce qui revient |
|---|---|---|
| **Le Seigneur humilié** | avoir fait parler Valcroix devant sa cour | des tueurs, un duel, puis des bannières |
| **Les Enfants du fossé** | avoir sauvé une enfant sur la route | elle revient adulte, et elle n'est pas venue seule |
| **Le Dragon de Cendre** | avoir épargné le dragon de la combe | quatre cents ans de mémoire, et une dette qui vole |
| **Le Sang de Callensbourg** | avoir pris publiquement la cause des Parias | onze chasseurs de Parias disparus en quatre ans |
| **Les Fils perdus du Loup** | avoir lu le registre de la branche cadette | onze Vaury vivants, dont trois portent la marque |
| **La Maison offensée** | avoir vendu ce qu'Artois-Noir avait payé | un espion qui compte des lèvres, puis trois cents hommes |
| **La Route du Loup** | avoir rouvert la route de la vallée | des convois, un vieux sergent brigand, un village neuf |
| **Le Vieux Nain** | une chope d'étain payée à un inconnu | deux cents boucliers de Kar-Durak, au bon défilé |
| **Douze Feux** | six bannières khesh derrière Khal-Vaene | un puits, un conseil de lances, un cercle de sel |
| **Le Portrait brûlé** | l'anneau des Karlsberg retrouvé | qui a dégarni la porte basse, et sur ordre de qui |

Ce dernier n'est pas un contrat : c'est la réponse à la question que le jeu pose
depuis la première ligne. Karlsberg n'est pas tombée sous des monstres.

## La succession

> *« Le temps est une mécanique réelle. Les personnages vieillissent, les
> enfants deviennent adultes, les maisons évoluent, on meurt, on hérite. Les
> descendants Karlsberg comptent sur une longue campagne. »*

À soixante-six ans, chaque saison porte un risque. À quatre-vingt-quatre, c'est
certain. On peut aussi transmettre de son vivant — poser l'anneau sur la table,
signer quatre feuillets, et aller s'asseoir dehors — dès qu'un enfant est majeur
et que Karlsberg est autre chose qu'un tas de pierres.

**Ce qui passe avec le nom :** tout le monde. Les crises en sont où elles en
sont. Les neuf se souviennent nommément de ce que le père a fait, et ils s'en
souviendront devant son enfant. Karlsberg est bâtie comme il l'a bâtie, les
carrières qu'il a rouvertes travaillent toujours, les dettes qu'on lui devait
sont dues à son héritier, l'armée reste sous les bannières.

**Ce qui ne passe pas :** le niveau, les pouvoirs, ce qu'il avait dans les
mains, ceux qui l'aimaient, et la moitié de ce que le monde soupçonnait. Un
héritier n'est pas son père : il recommence au niveau trois, dans une maison
haute, avec un nom que trop de gens connaissent déjà.

**Le sang passe devant l'aînesse.** L'enfant qui porte l'Onde hérite le premier
— *« Le bourdonnement lui est venu à onze ans, pendant une fièvre. On ne le lui
a jamais expliqué, et il a compris tout seul. »* Celui qui ne porte rien garde
plus de discrétion et moins de sang : *« il porte le nom sans porter la
chose. »*

Sans héritier majeur, il n'y a pas d'écran de mort : c'est l'épilogue, avec ses
116 verdicts qui lisent l'état réel du monde.

## Relever Karlsberg

> *« Jamais "Reconstruire le château : 10 000 or". Il faut de la pierre, des
> ouvriers, un architecte, de la nourriture, des routes sûres, une garnison, une
> population, des revenus, des alliances. »*

Avec un million d'écus et rien d'autre, on déblaie la cour. C'est tout.

**Quatre ressources qui ne s'achètent pas.** Pierre, bras, grain, faveurs. Chacune
vient d'une **source ouverte en jouant**, ailleurs, des mois plus tôt :

| Source | Ce qu'elle apporte |
|---|---|
| La carrière de Rochebrune | *les carriers taillent pour vous plutôt que pour leur ancien maître* |
| Les charrois de Kar-Durak | *des blocs sciés qui se ferment sans mortier* |
| Le corps de logis | *trente lits, et une règle : on ne demande pas d'où l'on vient* |
| Les quarante de Fort-aux-Princes | *sans bannière, sans lettre et sans conditions* |
| La route franche | *les convois passent chez vous parce que ça ne leur coûte rien* |
| Les Dunes | *deux cents lances en douze jours, si on les appelle* |

Vingt-cinq sources en tout. Elles rapportent chaque saison, toutes seules, tant
qu'elles tiennent. Relever Karlsberg n'est donc pas un poste de dépense : c'est
ce que devient une partie où l'on a rendu des choses à des gens.

**Quatre conditions qui ne sont pas des stocks.** Une route sûre, une garnison,
quelqu'un qui sache bâtir, assez d'habitants. Elles passent avant les
ressources dans le refus, parce qu'on ne dit pas à quelqu'un qu'il lui manque
huit charrois de pierre quand le vrai problème est qu'aucune route ne monte :

> *« rien de lourd ne monte tant que le défilé n'est pas tenu »*
> *« Il manque 8 pierre » — Il faudrait ouvrir : La carrière de Rochebrune, Les charrois de Kar-Durak, Le treuil de Brécourt.*

**Les bras mangent.** Une place qui abrite plus de monde qu'elle n'en nourrit en
perd, et la chronique le dit : *« Karlsberg nourrit moins de monde qu'elle n'en
abrite. Quatre hommes sont repartis avant l'hiver. »*

**Six états, jamais un pourcentage.**

`Ruines` → `Refuge` → `Fort` → `Château` → `Domaine` → `Puissance régionale`

> **Domaine** — *Il y a un marché le troisième jour de chaque semaine, deux
> tavernes, une querelle de bornes en cours, et des enfants nés ici qui n'ont
> jamais vu les ruines.*

## Les liens, sur quatre axes séparés

> *« Jamais une barre à remplir. Séparer au minimum relation / confiance /
> attirance / compatibilité politique. Alycia et Alarielle sont majeures et
> facultatives. Elles peuvent aimer Yohan et être en désaccord avec lui,
> refuser, rompre, ou préférer leurs propres intérêts. »*

Quatre axes, et ils ne montent pas ensemble.

| Axe | Ce qui le fait bouger |
|---|---|
| **relation** | le temps passé, ce qu'on a traversé côte à côte |
| **confiance** | ce qu'elle croit de ce que vous dites — un mensonge la casse d'un coup, elle remonte lentement |
| **attirance** | ce qui n'a rien à voir avec les trois autres |
| **compatibilité politique** | **dérivée du monde**, jamais d'un compteur : Alycia lit votre loyauté envers les Parias, Alarielle lit vos engagements et ce qu'ils coûtent |

**Un palier en exige plusieurs à la fois.** Devenir amants demande de la
relation, de la confiance *et* de l'attirance. Un mariage y ajoute la
compatibilité politique. Toute l'attirance du monde ne suffit à rien.

**Un refus n'est pas un jet raté.** La scène lit l'état réel des axes et dit
laquelle des quatre choses manque :

> « Non. Ce n'est pas un caprice et ce n'est pas définitif. C'est que *elle ne
> croit pas encore ce que vous dites*. » Elle se lève. « Ne recommence pas ce
> soir. Recommence plus tard, si c'est encore vrai. »

**Elle peut vous aimer et refuser de vous suivre.** Vendez la liste des Parias
vivants et Alycia restera votre amante en refusant de vous épouser — et elle
dira pourquoi.

**Ce qu'on lui a fait se retient sans qu'une scène l'écrive.** Certains
marqueurs cassent la confiance d'eux-mêmes et laissent un grief daté, affiché
sur l'écran Personnage sous *ce qu'elle n'oublie pas*.

**Deux liens à la fois sont possibles** et ne déclenchent aucune rivalité
automatique — le pack l'interdit explicitement. Ce qui gêne, c'est une promesse
d'exclusivité démentie : elle arme une scène de clarification où l'on peut
retirer la promesse, la tenir en rompant l'autre, ou soutenir qu'il n'y avait
rien à ranger.

L'écran ne montre aucun nombre. Quatre phrases : *« elle vous croit sur
parole »*, *« elle vous veut »*, *« vous êtes en désaccord »*.

## Les neuf qui agissent sans vous

> *« Chaque PNJ majeur a un âge, une culture, une maison, une localisation, des
> traits, des relations, des objectifs, une opinion de Yohan et des autres, un
> statut, un conjoint éventuel, des enfants, des ennemis, des alliés, et la
> mémoire des événements importants. »*

Neuf personnes, pas neuf statistiques.

| Qui | Ce qu'il poursuit | Ce qu'il fait tout seul |
|---|---|---|
| **Charles de Mont-Draken** | protéger les humains, quoi qu'il en coûte | vide sa marche pour barrer la route aux hardes ; convoque les maisons ; ouvre les registres de l'année de la Purge |
| **Lucius Furius Augustus** | refonder Astrah par les armes | paie les dettes d'une maison sans rien demander ; se marie pour trois cents lances ; rouvre les primes sur les Parias |
| **Alycia de Callensbourg** | protéger les derniers Parias, rester libre | vide trois refuges quatre jours avant les chasseurs ; laisse un chasseur vivant avec son carnet ouvert ; s'en va sans un mot |
| **Caleb de Fort-aux-Princes** | que sa maison survive | se désolidarise de vous par trois canaux ; ferme sa ville ; ou envoie quarante hommes sans bannière |
| **Alarielle** | réparer la faute elfique, éviter une seconde catastrophe | passe seule d'une cour à l'autre sans mandat ; dit tout haut ce que les Elfes ont fait ; part en laissant son nom de maison sur la table |
| **Tyrion** | qu'aucun déséquilibre ne recommence | met onze lames sur les routes ; brûle deux avant-postes avant que sa cour le sache ; envoie un carreau sans lettre |
| **Eltharion** | que son peuple existe dans mille ans | temporise en vers ; fait graver quarante et un noms Parias sur la stèle ; finit par demander des hommes à des humains |
| **Anarion** | vaincre Eltharion, tenir parole à la lettre | propose un contrat en trois exemplaires ; rachète vos dettes et attend ; déclare la guerre en vers |
| **Khal-Vaene** | douze feux | achète deux bannières et en perd une ; laisse un cheval à votre barrière ; meurt de vieillesse et d'une épaule |

**Ils décident, ils ne tirent pas au sort.** Chacun a des actes possibles ; le
poids d'un acte est nul tant que ce n'est pas le moment, et sinon il vaut ce
qu'il compte pour cette personne-là. Chaque saison, au plus deux d'entre eux
agissent — les plus décidés. Deux parties dans le même état produisent
exactement les mêmes décisions.

**Ils se souviennent, nommément.** Chacun déclare les marqueurs qui le marquent,
en quels termes, et ce que ça lui fait :

> *Été, An 7* — « Vous lui avez coûté une saison et deux cents hommes. »
> *Automne, An 9* — « Vous avez vendu la liste des Parias vivants. Elle sait à qui. »

L'écran des Chroniques les montre pour ce qu'ils sont : un visage, un âge, un
lieu, ce qu'ils poursuivent en ce moment, et les trois derniers souvenirs qu'ils
gardent de vous. Leur humeur est un mot — *dévoué, acquis, méfiant, hostile,
ennemi* — jamais un nombre.

**Ce qu'ils font compte.** Une médiation d'Alarielle freine la crise elfique de
quarante-cinq points de pression. Un édit de Lucius rouvre les primes et fait
monter la Suspicion. Une mort ne se répare pas.

## Les crises régionales

Avant : huit nombres. Ils montaient de 3 à 10 au hasard une fois par saison, et
en franchissant 90 ils imprimaient une ligne. Le monde ne vivait pas — il tirait
aux dés, ce que le document fondateur interdit en toutes lettres.

Maintenant : **cinq crises, cinq étapes nommées chacune**, franchies dans
l'ordre, jamais sautées.

| Crise | Ses acteurs | Ses cinq étapes |
|---|---|---|
| **La Guerre des Deux Cours** | Eltharion · Anarion · Tyrion · Alarielle | incidents frontaliers → assassinats et raids → mobilisation → guerre ouverte → la bataille des Mille Cornes |
| **La Question du Second Empire** | Lucius · Léopold IV · les princes humains | propagande dynastique → alliances → ultimatums → les guerres humaines → restauration ou effondrement |
| **La Remontée vers la Surface** | Gharok · les clans · Kar-Durak | les tambours → raids miniers → un chef fédérateur → le siège de Kar-Durak → contre-offensive ou chute |
| **La Grande Unification** | Khal-Vaene · les douze tribus | duels tribaux → le Conseil des Lances → six bannières → la guerre d'unification → douze feux ou la dispersion |
| **La Grande Chasse** | les hardes des lisières | hardes isolées → des signes communs → massacres coordonnés → la Grande Chasse → dispersion ou dévastation |

Ce qui les pousse n'est jamais un tirage. Chaque crise a une fonction
`pression()` qui lit l'état réel de la partie et rend une liste de **raisons** :

- *« Anarion a été offensé publiquement et ne l'a pas oublié »* — +12
- *« les humains sont occupés à s'entre-tuer, ce qui laisse le champ libre »* — +9
- *« le traité des Trois Chênes tient encore »* — −22

Le joueur voit les raisons, jamais les nombres. L'écran des Chroniques affiche,
pour chaque crise, l'étape en cours **par son nom**, cinq repères pour dire où
l'on en est, et les trois causes qui pèsent le plus — celles qui poussent en
rouge, celles qui freinent en turquoise.

Le hasard n'a plus qu'un rôle, et il est mince : l'ordre dans lequel deux crises
également mûres franchissent leur étape le même trimestre. Une partie ne se
rejoue donc pas à l'identique, mais elle ne dérive jamais sans raison.

**Rien n'a été cassé pour autant.** `hero.tensions` existe toujours — il est
désormais *dérivé* de l'état des crises à chaque saison. Les édits politiques,
les événements écrits conditionnés par `tensionMin` et les 116 verdicts
d'épilogue continuent de le lire sans une ligne de changement, mais ils lisent un
monde qui a des raisons. Une sauvegarde d'avant la bascule est relue en v9 : une
tension de 72 chez les humains devient une Question du Second Empire arrivée à sa
quatrième étape.

### Le pack narratif dans le dépôt

`design/narratif/` contient le **Vardhen Narrative Pack V6** (qui inclut V3, V4
et V5) : les canevas des trente contrats, les catégories d'événements, les dix
chaînes secrètes, les crises régionales en cinq étapes, la matrice de réaction à
la Suspicion, les PNJ autonomes et les deux arcs de romance. C'est la source
d'écriture — le canon — pas du contenu jouable en l'état : les scènes, les choix
et leurs coûts s'écrivent dans `src/data/`.

## Le Prix du Paria

La coutume est ancienne et n'a jamais été abrogée, parce que personne n'a jamais
voulu l'écrire noir sur blanc : **une maison noble qui emploie un Paria lui doit
l'Or et le Sang.** Des pièces comptant, et le consentement d'une femme de son
rang. C'est une humiliation pour la maison, et c'est précisément pour cela que
la coutume existe : on ne fait pas appel à un Paria de gaieté de cœur.

Ce qui n'allait pas :

- vingt des cinquante affaires du registre étaient commanditées par les **mêmes
  maisons nobles** que les trente autres, sans offrir le Prix ;
- réclamer l'Or seul, la noble seule ou le Prix complet **payait exactement la
  même chose** : le choix n'existait pas ;
- l'écran du lieu remplaçait « Maison de Vauclair » par « le prévôt de la
  place », si bien que **plus aucune offre ne portait le Prix**.

Désormais, toute maison noble le doit — les cinquante affaires du registre, et
les affaires locales commanditées par un intendant, une maison mineure ou une
délégation d'Astrah. Un commanditaire du commun paie en or : une veuve du
quartier bas n'a pas de fille de rang à donner, et c'est cohérent. Le nom de la
maison reste affiché sur l'offre ; l'homme du lieu devient l'entremetteur.

**Et le Sang n'est plus une option de menu.** Le pack est formel : le moteur doit
chercher *une noble adulte réelle de la maison, disponible dans l'état courant de
la sauvegarde, qui consent explicitement ; faute de quoi cette partie du prix est
indisponible.* Seize maisons ont donc un vrai rôle — dix-sept femmes qui ont un
nom, un âge, une position et des raisons. Dame Aveline de Valcroix, veuve et
seule à savoir ce que sa maison doit, refuse d'héberger un homme qu'on cherche
activement. Dame Ophélie de Hauterive est promise ailleurs depuis l'enfance et
ne se déliera que pour quelqu'un qui pèse plus lourd qu'un contrat de mariage.
La maison de Clairmont a perdu sept adultes en trois mois et n'a plus personne à
engager : elle paiera en or, et elle en est soulagée. Quand personne ne consent,
l'option disparaît de l'écran avec la raison écrite en clair.

Les trois termes mènent à trois situations différentes :

| Terme | Or | Ce que ça fait |
|---|---|---|
| **L'Or seul** | ×1,25 | La maison paie et respire. On vous prend pour un mercenaire — déguisement commode. +Humains, −Parias, −Suspicion. |
| **Le consentement seul** | ×0,15 | Renoncer à l'or pour du sang. Liaison, rente de 60 or par tour, +Renom, +Parias. |
| **Le Prix entier** | ×1 | L'Or et le Sang. Liaison, +10 Renom, +20 chez les Parias — et −9 chez les Humains, +9 de Suspicion. |

Une liaison peut donner une descendance (voir *Le temps et la lignée*). Ce que
la noblesse pense de Yohan ne dépend plus du seul fait d'avoir noué une
liaison : il dépend de **la façon dont il a réclamé son Prix**.

## Le bestiaire et les rencontres

Le premier bestiaire ne contenait que des bêtes. Un contrat de traque
commandité par une maison noble finissait donc sur un ours ou une wyverne, quel
que soit son pitch — « retrouver une cible qui ne veut pas être retrouvée » n'a
jamais désigné un sanglier.

**75 créatures**, dont 35 nouvelles et surtout **ce contre quoi on se bat
vraiment dans ce monde : des hommes.** Détrousseurs, brigands, arbalétriers,
sergents de la Couronne, piquiers d'ordonnance, chevaliers de maison,
inquisiteurs de la Purge, capitaines de la garde noire, raiders elfes noirs,
sorciers de Valombre, casse-fers et chamans peaux-verts, cavaliers khesh,
archers des lisières, Hommes-Bêtes des Pierres, marteaux de Kar-Durak,
traqueurs de Parias et duellistes de cour.

Chaque créature porte deux champs nouveaux : une **famille** (`homme`, `bete`,
`monstre`, `mort`) et un **rôle** (`piétaille`, `soutien`, `élite`, `meneur`).

Une rencontre se compose alors comme une vraie opposition :

- le **type** de l'affaire dit à quelle famille on a affaire — une traque, une
  récupération ou une guerre opposent des hommes ; une chasse oppose une bête ;
- le **lieu** dit lesquels : on ne croise pas les mêmes hommes chez les nains,
  dans les dunes khesh et dans la Forêt des Mille Cornes ;
- le **Danger** dit combien et de quelle trempe : un meneur, ses élites, sa
  piétaille, et parfois un soutien qui tire ou qui soigne.

Un groupe ne mélange jamais deux familles et ne dépasse jamais cinq
adversaires. On y gagne des combats qui ressemblent à leur pitch, une
difficulté qui vient du nombre autant que des chiffres, et une raison mécanique
de viser le chaman avant les guerriers. Un chasseur de primes, lui, vient
désormais avec ce qu'il a pu payer sur l'avance : jusqu'à trois hommes de plus
quand la Suspicion est en chasse ouverte.

## La Suspicion

Elle n'était qu'un compteur qui montait quand on frappait fort. Elle fait
maintenant trois choses.

**Elle se paie, en permanence.** Quatre paliers — *Discret*, *Remarqué*,
*Traqué*, *Chasse ouverte* — qui décident des prix chez les marchands (jusqu'à
+40 %), du coût d'entretien de la troupe (jusqu'à +50 % : nourrir vingt hommes
sans attirer l'attention se facture), du Renom qu'on vous accorde vraiment au
moment de signer un engagement (jusqu'à −45), et de la probabilité qu'on vous
cherche activement chaque tour.

**Elle parle.** Douze événements écrits ne servent qu'à elle : un portrait cloué
sur une porte d'auberge, un enfant qui a vu la foudre, un prêtre qui compte les
têtes, un rabatteur qui vend de fausses pistes, un innocent qu'on va pendre à
votre place, un cordon de troupes qui ferme une vallée, un marché qu'une maison
vous propose. Plus la Suspicion est haute, plus il en arrive ; au-dessus de 60,
le tirage penche vers ceux qui offrent une porte de sortie.

**Rien n'est gratuit.** On fait toujours redescendre la Suspicion — en or, en
temps, en Renom, ou en laissant faire une chose qu'on préférerait empêcher.
Certaines issues laissent une **couverture durable** : un faux portrait qui
circule, un nom inscrit dans un registre, un réseau de quatre personnes qui
mentent pour vous. Une couverture réduit la traque et adoucit les prix — et
celle qu'une maison vous offre se paiera un jour.

Deux actions sur place complètent le tableau : **se reposer** (une à deux
semaines, −35 de Fatigue, un quart des PV, −6 de Suspicion) et **se faire
oublier** (une saison entière, −30 de Suspicion, Fatigue à zéro). C'est ainsi
que l'Onde se paie : la Fatigue survit au combat, et elle ne redescend qu'en
semaines de calendrier.

## Le chantier de Karlsberg

Huit ouvrages, 5 200 or et 36 semaines pour tout relever — la cour, l'enceinte,
le puits, la salle basse, la forge, le refuge, la bannière et la pierre gravée.
Chacun a un prérequis, un coût en semaines pendant lesquelles Yohan vieillit et
le monde avance sans lui, et un effet réel : Défense au combat, Fatigue maximale,
entretien de la troupe, prix chez les marchands, vitesse du repos. Lever la
bannière rapporte du Renom et de l'estime chez les Parias, et coûte 15 de
Suspicion : on ne relève pas une maison Paria discrètement.

## La politique des puissances

Les peuples ont des tensions et une opinion de Yohan. Ce qui manquait, c'est ce
qui se joue vraiment : **cinq puissances qui se disputent l'après-Astrah**, et
une sixième qui n'existait pas encore — la sienne.

| Puissance | Ce qu'elle veut |
|---|---|
| La Couronne d'Astrah | Tenir. Elle s'effrite du seul fait que le temps passe. |
| Le parti de Lucius | Refonder l'État par les armes. Grandit avec la tension humaine. |
| La maison de Varenne | Laisser l'empire tomber dans la main qu'elle tend. Grandit avec votre Suspicion : elle vous collectionne. |
| La Cour des Lisières | Ce qui se décide chez les hommes finit par entrer dans la forêt. |
| Les Portes de Kar-Durak | Pas de politique : des contrats, et on les tient. |
| **Karlsberg** | La seule dont l'influence dépend entièrement de vous : les murs relevés, les lieux réglés, ce qu'on pense de vous chez les Parias. |

Chaque tour, les influences dérivent selon l'état du monde et selon ce que vous
avez fait. Quand les conditions d'un **édit** sont réunies, il tombe : une
conscription qui double le prix du blé, une relecture publique des édits de la
Purge, un mariage qui fait passer quatre provinces sans qu'une armée bouge, un
notaire qui écrit « Karlsberg » sans guillemets pour la première fois depuis
quarante ans. Les édits arrivent dans le pli du tour, s'inscrivent aux
Chroniques, et changent réellement quelque chose — prix, tensions, réputations,
Suspicion.

L'onglet *Chroniques* dit qui est en train de gagner. **Le Second Empire n'est
pas un événement : c'est le nom qu'on donnera à celle de ces puissances qui
l'aura emporté.**

## Le tour, et la quête au centre

Terminer un tour était un bouton qui avançait un compteur. Il arrive maintenant
quelque chose à chaque fois.

**Le pli du tour.** À chaque fin de tour, Yohan reçoit un pli : ce qui a changé
pendant les semaines écoulées, ce que la lignée a fait, la nouvelle du monde —
et surtout **ce qu'on lui propose**. Trois choses au plus, cliquables, qui
mènent directement où il faut aller : un jalon prêt, un lieu qui attend une
décision, une affaire d'ici, une affaire d'ailleurs portée par un courrier, une
campagne ouverte. Un tour ne se termine jamais sur rien — vérifié sur
vingt-cinq tours enchaînés.

**La quête au centre.** Un bandeau sous le calendrier rappelle en permanence le
chapitre en cours, ce qu'il faut pour le faire avancer, et si quelque chose est
déjà prêt. Le pli le répète. On ne peut plus perdre de vue pourquoi on joue.

Le jalon d'histoire se déclenche **en refermant le pli** : le tour se termine
sur l'histoire, pas sur un bouton.

## La carte

Vingt points sans nom sur des taches de couleur : on ne savait ni où l'on était,
ni ce qui menait où, ni ce qu'il y avait à faire. La carte a maintenant une
géographie :

- **quatre régions nommées** et décrites, écrites sur la carte ;
- **vingt-quatre routes** tracées entre les lieux — en or, celles qui partent
  d'où vous êtes ;
- **les noms toujours visibles**, plus seulement au survol ;
- **votre position** marquée, et pour chaque lieu un état lisible d'un coup
  d'œil : combien d'affaires restent, si le lieu attend une décision, si le
  peuple vous tient pour ennemi ;
- **une liste par région** sous la carte, qui dit la même chose en clair.

Le validateur refuse un lieu sans région, sans coordonnées, ou qu'aucune route
ne relie — on ne saurait pas comment y aller.

## Le temps et la lignée

Yohan a **vingt-sept ans** au premier tour et vieillit avec le calendrier.
Passé quarante-cinq ans le corps commence à compter (−1 Agilité, −3 PV), passé
cinquante-cinq il compte pour de bon (−2 Agilité, −8 PV). Cela ne se voit pas
sur la fiche : cela se voit quand il faut esquiver.

Le Prix du Paria promettait depuis le début qu'« une descendance pourrait en
naître ». Elle en naît :

- réclamer le Prix avec consentement **noue une liaison** enregistrée : +8 de
  réputation chez les humains, et **60 or par tour** — une maison qui a consenti
  soutient celui à qui elle a consenti ;
- à chaque tour, **16 % de chance de conception** par liaison ; quarante
  semaines plus tard, une **naissance** ;
- l'enfant porte les deux maisons, et le **sang Paria une fois sur deux** —
  héritage latent, pas transmission garantie ;
- une naissance rapporte 10 points de sang (20 si l'enfant porte l'Onde), de la
  réputation, et **la première donne un point de talent** : avoir quelqu'un à
  qui transmettre change ce qu'on fait de sa vie ;
- l'épilogue dit ce que le nom est devenu, et le legs transmet à la chronique
  suivante ce qu'un enfant élevé en le sachant a appris.

## Les affaires locales

Le registre général reste ce qu'il est : cinquante affaires venues d'ailleurs,
interchangeables par construction. Leur défaut n'était pas la répétition —
c'était que leurs lieux (« marais de Sombreval », « contreforts nains »)
**n'existent nulle part sur la carte**. On ne reconnaissait donc rien.

Chaque lieu de Vardhen a désormais **trois affaires à lui**, avec ses gens, ses
ennuis et un commanditaire qui habite là : la solde amputée de Fort-aux-Princes,
l'étai non posé de Kar-Durak, le puits empoisonné du clan Serth, le faux feu de
la Côte des Dents.

Et surtout elles **vont quelque part**. Les trois affaires d'un lieu forment un
**dossier**. Les trois réglées — réussies ou non, ceux qui vivent là ne font pas
la différence — un **dénouement** se déclenche : une scène écrite où l'on décide
ce que devient l'endroit. Ce choix reste : il pose un marqueur, déplace une
réputation, et se relit dans l'épilogue, qui compte les lieux menés au bout.

Relever l'enceinte de Karlsberg ou céder ses pierres au hameau. Porter le dossier
de la garnison à la citadelle, le confier au sergent-major, ou le vendre au
capitaine. Refermer l'ossuaire khesh, le faire lire par un érudit, ou en vendre
l'emplacement à Port-Noir. **60 affaires, 20 dénouements, 60 issues.**

## Isolde de Varenne — le Second Empire

Le troisième pôle politique, et le seul qui ne se combat pas. Lucius veut
l'Empire par les armes ; le Livré veut la fin du sang Paria ; **Isolde veut
l'Empire par les registres** — et elle l'aura probablement, que Yohan y
participe ou non.

Son arme est exactement celle qui a effacé Karlsberg : le papier. C'est tout le
sujet de l'arc. Au quatrième jalon, elle pose sur la table un acte qui restaure
la maison Karlsberg **avec effet rétroactif** — quarante ans de proscription
requalifiés en erreur administrative. Il tient en une page et demie. Accepter,
c'est reconnaître que le trait de plume décide de qui existe.

Cinq jalons, intercalés dans les creux de la trame. Cinq issues : signer les deux
pages, n'en signer qu'une (il faut lui vendre son propre argument), refuser,
publier le dossier des soldes fantômes pour la briser, ou prévenir le Roi de
Cendre. Le Second Empire naît ou ne naît pas, et l'épilogue le dit.

## Les compagnons

Alycia et Alarielle **s'imposaient** au changement de chapitre : elles
apparaissaient dans le groupe sans qu'on ait rien dit. C'est réparé.

Chacune arrive par une rencontre où l'on peut dire non — un vrai non, qui la
fait repartir. Un refus n'est pas définitif : chacune revient **une seconde et
dernière fois**, plus tard, dans des circonstances qui ne ressemblent pas aux
premières. Et l'on peut congédier quelqu'un qu'on avait accepté : quand la
Suspicion monte trop haut, Alycia pose elle-même la question du calcul.

Les trois attachements ont maintenant une **conclusion** : ce qui a été tissé
doit être nommé ou renoncé. Alycia doit choisir entre les routes et les murs ;
Alarielle reçoit une troisième convocation qui la fait cesser d'être princesse ;
Éléonore arrive enceinte et demande où l'enfant doit naître.

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
src/contrats_locaux.js  dossiers par lieu, dénouements, registre local
src/lignee.js         âge, liaisons, conceptions, naissances
src/tour.js           le pli de fin de tour et le bandeau de quête
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
  events_isolde.js    5 jalons de l'arc d'Isolde
  events_compagnons.js  recrutement consenti, seconde offre, séparation
  contrats_locaux.js  60 affaires sur les 20 lieux + 20 dénouements
  locations.js        20 lieux, 4 régions, 24 routes, coordonnées
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
  bestiary_2.js       35 créatures de plus, surtout des hommes, avec famille et rôle
  chaines.js          les affaires écrites, étape par étape et scène par scène
  maisons.js          les maisons nobles et les femmes qui peuvent consentir
  chantier.js         les 8 ouvrages de Karlsberg, leur coût et leurs effets
  events_suspicion.js 12 événements qui font monter ou redescendre la Suspicion
  politique.js        les 6 puissances, leurs dérives d'influence, leurs édits
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
tools/smoke-arcs.js        éprouve Isolde, les compagnons, les liens et les dossiers
tools/smoke-tour.js        éprouve le tour, le temps, la lignée, la carte, les troupes
tools/smoke-consolidation.js  éprouve l'écran unique, les offres, les voyages,
                              la Suspicion, le chantier et la politique
tools/smoke-chaines.js     éprouve les affaires en chaînes, les termes et les issues
tools/smoke-crises.js      éprouve les cinq crises, leurs étapes et leurs raisons
tools/smoke-pnj.js         éprouve les neuf acteurs : décisions, mémoire, morts
tools/smoke-liens.js       éprouve les quatre axes, les refus motivés, les promesses
tools/smoke-karlsberg.js   éprouve le chantier : ressources, conditions, six états
tools/smoke-succession.js  éprouve la succession : héritiers, monde conservé, mort
tools/build-artifact.js    fabrique dist/parias-artifact.html (page publiable)
tools/smoke-tranche.js     l'épreuve d'acceptation du document fondateur :
                           partie → carte → voyage → lieu → récit → combat →
                           conséquence → sauvegarde → rechargement
design/narratif/           le pack narratif Vardhen V6 : la source d'écriture
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
node tools/smoke-arcs.js                     # Isolde, compagnons, attachements, dossiers
node tools/smoke-tour.js                     # tour, âge, descendance, carte, recrutement
node tools/smoke-consolidation.js            # écran unique, offres, voyages, Suspicion, chantier, politique
node tools/smoke-chaines.js                  # affaires en chaînes, termes du Prix, issues durables
node tools/smoke-crises.js                   # crises régionales : étapes, raisons, tensions dérivées
node tools/smoke-pnj.js                      # les neuf : objectifs, mémoire, décisions, vieillesse
node tools/smoke-liens.js                    # les quatre axes, les refus motivés, les promesses
node tools/smoke-karlsberg.js                # chantier : pierre, bras, grain, faveurs, six états
node tools/smoke-succession.js               # héritiers, monde conservé, transmission, mort
node tools/smoke-tranche.js                  # la tranche verticale, de bout en bout

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
écrit. Il contrôle **les chaînes** (aucune étape orpheline ou inatteignable, toute issue
nommée par une scène doit avoir sa ligne de chronique, toute affaire payée doit
pouvoir l'être) et **les maisons** (aucune noble mineure, aucune qui puisse
refuser sans dire pourquoi, et au moins une maison sans candidate pour que
l'indisponibilité du Prix existe vraiment). Il contrôle **le bestiaire** (famille et rôle valides, aucun doublon d'identifiant,
aucune créature sans attaque) et **les rencontres** (chaque type d'affaire doit
trouver de quoi se composer à chaque palier, chaque famille doit avoir de la
piétaille). Il contrôle enfin **le chantier** (coûts réels, prérequis existants, aucune
chaîne circulaire), **la Suspicion** (chaque palier doit avoir de quoi se produire
*et* de quoi en sortir) et **la politique** (chaque édit désigne une puissance et
des peuples qui existent, et chaque puissance finit par décider quelque chose).

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
