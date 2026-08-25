# VARDHEN — Système complet de combat narratif V7

## 1. Philosophie

Le joueur choisit une **intention** et non un résultat : attaquer la gorge, désarmer, protéger un allié, reculer, employer l'Onde, feindre ou fuir. Le moteur résout l'action depuis l'état réel du monde puis affiche une nouvelle scène écrite pour le résultat obtenu.

Un combat est une succession de **positions narratives**, jamais une liste d'attaques sans contexte.

`POSITION → INTENTION → TEST → CONSÉQUENCE → NOUVELLE POSITION`

## 2. Caractéristiques de Yohan

Échelle recommandée : 1 à 10 pour un humain ; 11 à 15 pour un niveau surnaturel.

- **Force** : puissance, lutte, armes lourdes, portes, maintien d'une prise.
- **Agilité** : esquive, équilibre, vitesse, armes fines, lancer.
- **Endurance** : souffle, fatigue, douleur, poison, hémorragie.
- **Perception** : embuscades, lecture corporelle, points faibles.
- **Intellect** : tactique, anatomie, alchimie, rituels et pièges.
- **Volonté** : terreur, torture, emprise, contrôle de l'Onde.
- **Présence** : commandement, provocation, intimidation et feinte sociale.

### Compétences

Épées, armes lourdes, armes d'hast, dagues, tir, armes de jet, lutte, bouclier, équitation, anatomie, bestiaire, alchimie, furtivité, tactique, commandement, maîtrise de l'Onde.

Une compétence ne remplace pas la caractéristique. Une attaque précise à l'épée utilise par exemple `AGILITE + EPEES`; une parade puissante peut utiliser `FORCE + EPEES`.

## 3. Ressources et états

- **Vitalité** : capacité à rester vivant ; n'est pas une simple barre visible.
- **Endurance de combat** : baisse avec actions explosives, armure, chaleur et douleur.
- **Concentration** : nécessaire aux tactiques complexes et à l'Onde.
- **Sang** : suit l'hémorragie ; une petite plaie répétée peut tuer.
- **Moral** : individuel et collectif.
- **Position** : distance, hauteur, couverture, encerclement, prise, sol.

États : stable, essoufflé, épuisé, sonné, à terre, agrippé, désarmé, aveuglé, brûlé, empoisonné, terrifié, hémorragie, fracture, mutilation, mourant.

## 4. Résolution

`SCORE = caractéristique + compétence + équipement + préparation + position + aide + aléa discret`

`MARGE = SCORE - difficulté adverse`

| Marge | Résultat | Effet narratif |
|---:|---|---|
| +6 et plus | domination | objectif atteint, avantage et/ou économie de ressource |
| +2 à +5 | réussite nette | objectif atteint |
| -1 à +1 | réussite coûteuse | objectif atteint avec blessure, fatigue ou complication |
| -5 à -2 | échec | position dégradée, nouvel embranchement jouable |
| -6 et moins | catastrophe | blessure grave, capture, perte d'allié ou fuite forcée |

L'aléa ne doit jamais effacer une différence énorme de niveau. Un enfant non entraîné ne tue pas un dragon intact sur un coup heureux.

## 5. Anatomie et blessures

Chaque cible possède zones, protections et fonctions.

- **Tête** : difficile ; sonnement, perte d'œil, fracture, mort.
- **Cou/gorge** : très difficile ; voix, souffle, artères.
- **Torse** : protégé ; côtes, poumons, cœur.
- **Abdomen** : hémorragie et organes ; mort parfois lente.
- **Bras/main** : précision, parade, désarmement.
- **Jambe/genou** : mobilité, chute, fuite.

Une blessure contient : zone, type, gravité, douleur, saignement, fonction perdue, traitement et cicatrice. Elle persiste après le combat. Une mutilation change définitivement les choix disponibles sauf remplacement magique ou prothèse cohérente.

Le gore décrit la conséquence physique exacte lorsqu'il renforce l'impact : os visible, dents brisées, chair brûlée, artère ouverte, entrailles ou membre sectionné. Un réglage `GORE_DETAIL` propose sobre, intense ou extrême sans changer la mécanique.

## 6. Armes et armures

Une arme possède portée, vitesse, impact, pénétration, contrôle, fatigue, espace requis et effets critiques.

- Dague : rapide, excellente en lutte, faible contre armure.
- Épée : polyvalente, coupe/estoc, bonne défense.
- Hache : dégâts et crochets, récupération lente.
- Masse : fractures et armure, fatigue élevée.
- Lance : portée et réception de charge, faible au corps à corps.
- Arme lourde : domination et bris, exige espace et endurance.
- Arc/arbalète : distance, préparation, munitions, ligne de tir.

L'armure absorbe, dévie et transforme les blessures, mais augmente fatigue, bruit et difficulté dans l'eau ou la chaleur. Elle se détériore par zone.

## 7. Options générées par la situation

Les choix visibles proviennent de la position réelle :

- attaque sûre ;
- attaque risquée ciblée ;
- défense/parade/esquive ;
- déplacement et décor ;
- feinte/provocation ;
- aide à un allié ;
- objet ou capacité ;
- Onde ;
- reddition, négociation ou fuite.

Un choix impossible n'apparaît pas, ou apparaît verrouillé avec une raison utile. Une option spéciale peut venir d'une compétence, d'une arme, d'une ancienne information ou d'une relation.

## 8. Intelligence des adversaires

Chaque adversaire possède style, courage, objectif, tolérance à la douleur, intelligence, mémoire courte et seuil de fuite.

Répéter une manœuvre donne `ADAPTATION +2`, puis +4 à l'ennemi. Les adversaires intelligents testent les habitudes de Yohan, feignent, ciblent ses blessures, attaquent ses proches ou refusent un duel défavorable. Les bêtes suivent instinct, faim, territoire et douleur ; elles ne combattent pas toutes jusqu'à la mort.

## 9. Onde

L'Onde n'est pas un bouton de victoire. Chaque usage définit puissance, finesse, zone, coût, témoins et risque.

- faible : impulsion, perception, renforcement bref ;
- moyen : projection, rupture, contrôle local ;
- fort : destruction massive, blessures internes, signal détectable ;
- extrême : conséquence régionale, perte de contrôle, suspicion majeure.

Un test d'Onde lit `MAITRISE + VOLONTE - fatigue - blessures - perturbation`. Les échecs peuvent blesser Yohan, un allié ou des témoins et laisser une cicatrice dans le lieu.

## 10. Formats de combat

### Duel

Trois à huit échanges. Lecture du style, adaptation, honneur, règles choisies, possibilité de céder. Le résultat influence davantage respect et politique que simple butin.

### Groupe

Initiative par fronts, risque d'encerclement, protection des civils et alliés. Un adversaire ignoré continue d'agir. Les attaques de zone ont des victimes collatérales.

### Monstre

Anatomie propre, phases comportementales et terrain central. L'enquête préalable révèle faiblesses. Sans préparation, certaines options n'existent pas.

### Bataille

Le joueur donne des ordres à des unités réelles. Chaque phase propose objectif, réserve, terrain, moral, pertes et information imparfaite. Yohan peut commander ou combattre personnellement, rarement les deux sans pénalité.

## 11. Défaite

La défaite n'est pas automatiquement la mort : fuite, capture, rançon, mutilation, perte d'objet, mort d'allié, contrat échoué ou territoire perdu. La mort devient possible si elle résulte clairement du risque, de l'état de Yohan et des règles de campagne.

## 12. Sortie de combat

Après chaque combat : stabilisation, prisonniers, exécutions ou grâce, récupération, blessures, butin, témoins, rumeur, respect, peur, culpabilité et flags longs. Le texte décrit aussi le silence qui suit : survivants, odeur, cris, soins et réaction des compagnons.

