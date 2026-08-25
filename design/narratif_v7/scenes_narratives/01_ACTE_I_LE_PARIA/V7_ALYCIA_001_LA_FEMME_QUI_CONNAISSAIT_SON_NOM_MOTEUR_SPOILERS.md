# V7_ALYCIA_001 — MOTEUR / SPOILERS

## Vérité de la scène

Alycia suivait le groupe de chasseurs depuis deux jours. Elle a tué les deux premiers, mais a volontairement laissé le troisième comme appât pour identifier leur contact. Elle ignorait que l'homme avait absorbé un stimulant d'Onde et simulait sa mort. Elle soupçonne l'identité de Yohan depuis les récits du contrat C03 ou d'autres exploits, sans preuve définitive. Les chasseurs travaillent pour une faction sélectionnée selon la campagne : réseau de Lucius, maison impliquée dans C09, collecteur de sang indépendant ou agent elfe radical.

## Variables relationnelles séparées

`ALYCIA_TRUST`, `ALYCIA_RESPECT`, `ALYCIA_ATTRACTION`, `ALYCIA_FEAR`, `ALYCIA_POLITICAL_COMPATIBILITY`, `ALYCIA_DEBT`, `ALYCIA_HOSTILITY`. Aucun score unique de romance.

## N01–N02 : première lecture

- Exiger la main visible : respect +2 ; Alycia apprécie la prudence.
- Ignorer et enquêter : perception test ; respect +4 si indice découvert.
- Accusation directe : elle confirme seulement avec confiance future ; tension +3.
- Mentir être chasseur : test contre perception 10 d'Alycia. Échec ne déclenche pas combat ; elle nourrit le mensonge pour observer Yohan.
- Dégainer : elle recule et prépare Onde ; hostilité +5, mais respecte une attaque non sournoise.
- Reconnaître être Paria : confiance +5, suspicion Karlsberg +3.
- Voler la fiole : test d'Agilité opposé très difficile ; réussite révèle réaction surnaturelle d'Alycia, échec place Yohan en clé articulaire sans blessure sauf escalade.

## N03–N04 : embuscade

Le survivant possède `PAIN_NULL`, `RIGHT_LEG_FRACTURE`, `WAVE_STIMULANT`, et mourra sous 20 minutes sans soins. Six chasseurs, deux chiens runiques, terrain forestier mouillé.

- Renverser : `FORCE + LUTTE` contre 11 ; permet capture rapide.
- Dos à dos : confiance initiale +4, test combiné ; choix de combat coopératifs.
- Flanc : `AGILITE + FURTIVITE`; Alycia reste exposée mais ne considère pas automatiquement cela comme abandon.
- Onde : `VOLONTE + WAVE_MASTERY`; Alycia détecte signature Karlsberg, suspicion +15.
- Retraite : tactiquement valide ; respect selon discipline, pas selon bravoure abstraite.

Au second échange, C1 vise main du lancier : réussite dominante sectionne poignet et désarme ; coûteuse tue le lancier mais morsure au mollet ; catastrophe = lance sous clavicule. C2 utilise le chien comme protection, gore intense mais risque de morsure infectée. C3 additionne les Ondes : extrêmement puissant, peut rompre les organes de tous les chasseurs et empêcher capture. C4 nécessite chaînes accessibles et bestiaire ; chiens libérés peuvent fuir plutôt qu'attaquer. C5 intercepte le carreau : armure et perception déterminent contusion, pénétration ou blessure critique ; Alycia n'oublie pas le risque.

## N05 : interrogatoire

Tuer immédiatement protège temporairement le secret mais perd la piste : Alycia respect variable, confiance -2. Interroger permet le nom du commanditaire avec médecine ou intimidation. Accuser Alycia ouvre confrontation honnête : elle admet ses soupçons si respect ≥ 8. Nier fonctionne publiquement mais pas sur elle. Forcer par l'Onde peut provoquer hémorragie cérébrale ; Alycia juge l'efficacité et la cruauté séparément.

## N06 : identité et branches

- Voyager ensemble : `ALYCIA_TRAVEL_COMPANION_TEMP=true`.
- Exiger le savoir : elle livre un indice, conserve le reste ; confiance dépend du ton.
- Séparation : arc non fermé ; rappel 15–60 jours.
- Duel : trois échanges, non létal par défaut. Alycia teste contrôle, pas seulement puissance.
- Tentative de meurtre : combat complet ; elle peut fuir, blesser, capturer ou tuer Yohan si les règles de mort le permettent. Ouvre une branche de rivalité majeure, pas une romance forcée.

## N07 : réponse Karlsberg

- Ne rien faire : compatibilité avec indépendance +5, inquiétude sur les Parias -3.
- Reconstruire : respect +5, peur +4.
- Refuge : compatibilité +12, confiance +6 ; cette promesse sera rappelée si Karlsberg persécute plus tard.
- Incertitude honnête : confiance +7.
- Callensbourg : elle raconte seulement une perte personnelle si confiance ≥ 15.

## N08 : intimité adulte

Conditions minimales : tous adultes, `ALYCIA_TRUST >= 25`, `ALYCIA_ATTRACTION >= 20`, aucune contrainte, intoxication ou captivité, relation non hostile. Recommandation : différer N08 après au moins deux rencontres ; le moteur peut remplacer ici par une proximité non physique.

Chaque option nécessite confirmation explicite dans le nœud suivant. L'ellipse décrit le feu éteint, les armes laissées à portée et la conversation après, sans détail anatomique explicite. Refus ou attente ne donnent aucun malus. Alycia peut vouloir une intimité sans engagement, une relation engagée, ou rien selon son état. L'intimité n'accorde aucune information automatique et ne supprime aucun désaccord.

## Conséquences longues

- 30–90 jours : Alycia revient avec le nom d'un laboratoire ou demande de sauver des Parias.
- Acte II : elle confronte Yohan à sa promesse concernant Karlsberg.
- Acte III : sa présence dépend de la politique réelle envers les Parias, pas seulement de la romance.
- Le survivant sauvé peut témoigner, se venger de ses employeurs ou rester ennemi de Yohan.
- Les chiens runiques libérés peuvent devenir piste vers C09.

## Flags

`ALYCIA_MET`, `ALYCIA_TRUE_NAME_KNOWN`, `ALYCIA_SAW_YOHAN_WAVE`, `KARLSBERG_NAME_HEARD`, `HUNTER_CAPTURED`, `HUNTER_EMPLOYER`, `RUNIC_DOGS_FATE`, `YOHAN_KARLSBERG_INTENT`, `ALYCIA_FIRST_DUEL`, `ALYCIA_FIRST_INTIMACY`.

