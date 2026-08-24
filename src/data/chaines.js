/* PARIAS — Les affaires, écrites comme des chaînes
 *
 * Tirées du pack narratif Vardhen (design/narratif/03_CONTRATS). Le pack donne
 * le commanditaire, l'or, le pitch et le canevas de scènes ; ce fichier écrit
 * les scènes, les choix et ce qu'ils coûtent.
 *
 * ── Format ────────────────────────────────────────────────────────────────
 * id, titre, type:'contrat', categorie (= type d'affaire pour les rencontres),
 * commanditaire, maison (si noble : déclenche le Prix du Paria), or, danger,
 * lieux (où l'affaire se propose), pitch (ce qu'on lit sur la carte d'offre),
 * prix:true      les termes se fixent après l'audience, avant tout départ
 * paye:[...]     les issues qui donnent lieu à règlement
 * issues:{}      la ligne de chronique écrite à la clôture
 * etapes:[{ id, delai:[minSem,maxSem], attente, requis, sinon, suite, ev }]
 *
 * `ev` est un événement écrit ordinaire : mêmes scènes, mêmes jets, mêmes
 * combats. Une scène pilote la chaîne par ses effets :
 *   effets:{ etape:"x" }   l'étape suivante sera x
 *   effets:{ issue:"y" }   la chaîne se referme sur l'issue y
 */

const CHAINES = [

/* ══════════════════════════════════════════════════════════════════════════
   01 — LE DRAGON DE VALCROIX
   Un dragon qui brûle tout sauf le château. Le commanditaire ment par omission.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_VALCROIX", type:'contrat', titre:"Le Dragon de Valcroix",
  commanditaire:"Maison de Valcroix", maison:"Maison de Valcroix",
  or:1850, danger:"très dangereux", categorie:"chasse", prix:true,
  lieux:["LOC_003","LOC_011","LOC_002"],
  pitch:"Depuis trois semaines, un dragon descend des montagnes au coucher du soleil. Granges, troupeaux et tours de guet brûlent — le château, jamais.",
  paye:["dragon_tue","dragon_epargne","seigneur_confronte"],
  issues:{
    dragon_tue:"Le dragon de Valcroix est mort sur son nid, et la maison a payé sans regarder personne en face.",
    dragon_epargne:"Le dragon de Valcroix vit encore. On dit qu'il ne descend plus.",
    seigneur_confronte:"Le seigneur de Valcroix a dû dire devant témoins ce qu'il avait volé.",
    abandonnee:"L'affaire de Valcroix est restée en plan. La montagne brûle toujours.",
    refusee:"Yohan a refusé les termes de Valcroix.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"On attend l'inventaire des pertes.",
      ev:{ id:"CHV_1", titre:"Ce qui brûle et ce qui ne brûle pas", famille:"CONTRAT", rarete:"majeur",
        image:"evt_pierres",
        scenes:{
          start:{ texte:[
            "La grande salle de Valcroix sent la cire froide. Le seigneur est un homme de cinquante ans aux mains soignées, qui parle debout et ne propose pas de siège. Derrière lui, une carte de la vallée est piquée d'épingles noires : chaque épingle est une chose qui a brûlé.",
            "« Trois semaines. Il descend au coucher du soleil, il brûle, il remonte. Granges, troupeaux, deux tours de guet. Nous perdons la moisson dans un mois si cela continue. »",
            "Yohan regarde la carte plus longtemps que le seigneur ne l'aurait voulu. Les épingles font un arc régulier autour du château. Aucune ne le touche."],
            choix:[
              {label:"Demander pourquoi le château est épargné", detail:"La carte pose la question toute seule",
               suite:"question"},
              {label:"Demander à voir les pertes plutôt qu'à les entendre", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"pertes_ok", echec:"pertes_ko"},
              {label:"Ne rien demander et parler d'argent", detail:"Un homme qui ne pose pas de questions coûte moins cher à recevoir",
               suite:"argent", effets:{suspicion:-2}},
            ]},
          question:{ texte:[
            "Le seigneur ne se retourne pas vers la carte. Il n'en a pas besoin : il sait exactement où sont les épingles.",
            "« Les murs sont en pierre. Les granges sont en bois. »",
            "C'est une réponse d'homme qui a préparé la réponse."],
            effets:{xp:8, flag:"valcroix_soupcon"},
            choix:[
              {label:"Laisser passer, pour l'instant", suite:"argent"},
              {label:"Insister", detail:"Jet de Volonté (14)",
               test:{stat:"vol", dc:14}, reussite:"insiste_ok", echec:"insiste_ko"},
            ]},
          insiste_ok:{ texte:[
            "« Les tours de guet aussi étaient en pierre, messire. »",
            "Le silence dure trois secondes de trop. Le seigneur pose une main à plat sur la table, se ravise, la retire.",
            "« Tuez-le. Le reste ne vous regarde pas. »",
            "C'est la première phrase honnête de l'entretien."],
            effets:{xp:14, flag:"valcroix_ment"}, suite:"argent"},
          insiste_ko:{ texte:[
            "Le seigneur le laisse finir, puis appelle son intendant d'un geste, comme on éteint une chandelle.",
            "« On vous montrera les comptes des pertes. Faites votre travail. »"],
            effets:{xp:4}, suite:"argent"},
          pertes_ok:{ texte:[
            "On le mène aux ruines de la tour nord, et il passe une heure dans les cendres pendant que l'intendant s'impatiente.",
            "Le feu est parti d'en bas. Une tour brûlée par un dragon brûle par le haut : le toit, les planchers, puis les murs qui s'effondrent vers l'intérieur. Ici, la pierre est fendue à la base, et la fente est nette.",
            "Quelque chose a brûlé cette tour depuis le sol. Ou quelqu'un."],
            effets:{xp:16, flag:"valcroix_soupcon"}, suite:"argent"},
          pertes_ko:{ texte:[
            "On lui montre des cendres, et des cendres se ressemblent toutes. L'intendant récite des chiffres qu'il connaît par cœur, ce qui n'est jamais bon signe et ne prouve rien."],
            effets:{xp:5}, suite:"argent"},
          argent:{ fin:true, texte:[
            "« Mille huit cent cinquante écus. La moitié si la bête part sans mourir. Rien si elle revient. »",
            "Le seigneur tend la main pour conclure, puis la laisse retomber en se rappelant à qui il a affaire. Il y a une autre conversation à avoir avant celle-là, et il sait laquelle."]},
        }}},

    { id:"villages", delai:[2,4], attente:"Il faut d'abord parler à ceux qui ont vu.",
      ev:{ id:"CHV_2", titre:"Ceux qui ont vu descendre la bête", famille:"CONTRAT", rarete:"majeur",
        image:"evt2_moisson",
        scenes:{
          start:{ texte:[
            "Trois hameaux, quatre jours. Partout la même chose : on a vu l'ombre passer, on a entendu le bruit — « comme une voile qui claque, mais grande » — et le lendemain il manquait une grange.",
            "Au quatrième hameau, une vieille femme qui trie des lentilles dit sans lever la tête : « Il prend les moutons. Il prend jamais les gens. »",
            "Personne, dans aucun des trois hameaux, n'est mort."],
            choix:[
              {label:"Demander ce qui a changé il y a trois semaines", detail:"Une bête qui vit là depuis toujours ne commence pas un mardi",
               suite:"change"},
              {label:"Suivre les traces jusqu'au départ de l'ascension", detail:"Jet d'Agilité (12)",
               test:{stat:"agi", dc:12}, reussite:"traces_ok", echec:"traces_ko"},
              {label:"Payer pour qu'on parle vraiment", detail:"−80 or",
               requis:{or:80}, suite:"paye", effets:{or:-80}},
            ]},
          change:{ texte:[
            "La vieille femme réfléchit longtemps, ce qui à son âge est un luxe qu'on peut se permettre.",
            "« Les hommes du seigneur sont montés. Fin de l'hiver. Ils sont redescendus avec des charrettes bâchées, et deux jours après, la première grange a brûlé. »",
            "Elle reprend ses lentilles. « On a rien dit, parce qu'on nous demande rien. »"],
            effets:{xp:16, flag:"valcroix_pillage"}, fin:true},
          traces_ok:{ texte:[
            "Il trouve l'endroit où la bête pose avant de reprendre l'air : une plate-forme de rocher noircie, à deux lieues du dernier hameau, et un chemin qui monte.",
            "Le chemin est marqué. Pas par le dragon : par des roues. Quelqu'un est monté là-haut avec des charrettes, et récemment."],
            effets:{xp:18, flag:"valcroix_pillage"}, fin:true},
          traces_ko:{ texte:[
            "Deux jours de rocaille pour retrouver un chemin qu'on perd chaque fois qu'il quitte la terre meuble. Il finit par savoir dans quelle direction monter, et c'est déjà quelque chose."],
            effets:{xp:6, fat:8}, fin:true},
          paye:{ texte:[
            "Quatre-vingts écus, dans ce hameau, c'est deux hivers. Le tonnelier parle pendant une demi-heure sans reprendre son souffle.",
            "Les hommes du seigneur sont montés à la fin de l'hiver. Ils ont trouvé quelque chose là-haut — une grotte, des choses anciennes, de l'or peut-être. Ils sont redescendus chargés. Deux d'entre eux ne sont pas redescendus du tout.",
            "« Et depuis, la bête cherche », dit-il. « Vous comprenez ? Elle cherche. »"],
            effets:{xp:22, flag:"valcroix_pillage"}, fin:true},
        }}},

    { id:"ascension", delai:[2,4], attente:"La montagne attend, et elle est haute.",
      ev:{ id:"CHV_3", titre:"L'ascension", famille:"VOYAGE", rarete:"majeur",
        image:"evt2_ossements",
        scenes:{
          start:{ texte:[
            "Deux jours de montée. Le troisième matin, l'air sent le soufre et la charogne, et il n'y a plus un oiseau.",
            "Le nid est dans une faille ouverte au flanc de la montagne, et ce qui l'entoure raconte tout : des ossements de mouton par centaines, empilés sans être mangés. Une bête qui tue pour manger ne fait pas de tas.",
            "Au fond de la faille, quelque chose bouge dans le noir — plus petit que ce qu'on attendait."],
            choix:[
              {label:"Entrer", detail:"Il faudra bien",
               suite:"faille"},
              {label:"Observer d'abord, une journée entière", detail:"+Fatigue · on apprend en regardant",
               suite:"observe", effets:{fat:10, xp:12}},
            ]},
          observe:{ texte:[
            "Il attend jusqu'au soir, à plat ventre dans la rocaille. Au coucher du soleil, la bête sort — quinze mètres de l'aile à l'aile, l'écaille terne, une aile percée qui siffle — s'élève lourdement et part vers la vallée.",
            "Elle laisse quelque chose derrière elle. Dans la faille, deux formes plus petites remuent et crient jusqu'à ce qu'elle revienne.",
            "Ce n'est pas un dragon qui terrorise une vallée. C'est une mère qui nourrit."],
            effets:{flag:"valcroix_petits", xp:14}, suite:"faille"},
          faille:{ texte:[
            "L'intérieur de la faille est une grotte, et la grotte a été fouillée. Des marques de pioche sur la paroi. Une caisse éventrée, du bois de charrette, une corde neuve pourrissant dans un coin.",
            "Et, au centre, ce qui reste d'un amas de pièces et d'objets anciens : creusé en son milieu, comme une bourse retournée.",
            "Deux squelettes portent encore les couleurs de Valcroix."],
            effets:{flag:"valcroix_preuve", xp:18},
            combat:{ groupe:[{bst:"BST_014", n:3}], victoire:"apres_combat", defaite:"replie" }},
          apres_combat:{ texte:[
            "Ce qui vivait dans les recoins de la grotte est mort. Yohan ramasse, dans les cendres d'un feu de camp vieux de plusieurs semaines, un sceau de plomb aux armes de la maison.",
            "Il le glisse dans sa ceinture. Un objet pareil ne sert qu'une fois, et il vaut mieux savoir quand."],
            effets:{item:"potion_vigueur", xp:12}, fin:true},
          replie:{ texte:[
            "Il redescend de vingt pas, à moitié aveugle, et attend que ça passe. Ça passe. Mais il a laissé la moitié de son avance là-haut, et la grotte garde ce qu'elle voulait garder."],
            effets:{pv:-12, fat:14, xp:6}, fin:true},
        }}},

    { id:"choix", delai:[1,3], attente:"Il reste à décider ce qu'on fait de tout ça.",
      ev:{ id:"CHV_4", titre:"La bête, ou l'homme qui l'a réveillée", famille:"CONTRAT", rarete:"majeur",
        image:"evt_traque",
        scenes:{
          start:{ texte:[
            "Il redescend avec ce qu'il sait : les hommes de Valcroix ont pillé un nid à la fin de l'hiver, et depuis, la mère cherche ce qu'on lui a pris en brûlant tout ce qui appartient à ceux qui l'ont prise.",
            "Le seigneur a payé pour qu'on tue la bête. Il n'a pas payé pour qu'on sache pourquoi elle est descendue.",
            "Deux routes, à partir d'ici."],
            choix:[
              {label:"Monter tuer le dragon", detail:"C'est le contrat, et le contrat paie",
               suite:"tuer", effets:{etape:"combat_dragon"}},
              {label:"Rendre ce qui a été pris", detail:"Requiert la preuve · une bête qui retrouve son bien cesse de chercher",
               requis:{flag:"valcroix_preuve"}, suite:"rendre", effets:{etape:"rendre"}},
              {label:"Redescendre confronter le seigneur devant sa maison",
               detail:"Requiert la preuve · c'est lui qui devra parler",
               requis:{flag:"valcroix_preuve"}, suite:"confronter", effets:{etape:"confronter"}},
              {label:"Laisser tomber l'affaire", detail:"On rend l'avance et on s'en va",
               suite:"partir", effets:{issue:"abandonnee", renom:-6, reputation:{humains:-8}}},
            ]},
          tuer:{ fin:true, texte:[
            "Il remonte. Ce qu'il a compris ne change rien à ce qu'il a promis, et un contrat honoré vaut mieux qu'un homme qui a raison."]},
          rendre:{ fin:true, texte:[
            "Il faut d'abord récupérer ce que Valcroix a descendu de la montagne. Le seigneur ne le rendra pas de bon gré, et ce sera peut-être plus dangereux que le dragon."]},
          confronter:{ fin:true, texte:[
            "Il redescend vers le château avec un sceau de plomb dans la ceinture et l'intention de le poser sur une table devant témoins."]},
          partir:{ fin:true, texte:[
            "Il rend l'avance à l'intendant, sans explication, et prend la route avant midi. Derrière lui, la montagne continuera de descendre au coucher du soleil, et ce n'est plus son affaire.",
            "Il pense au tas d'ossements pendant trois jours."]},
        }}},

    { id:"combat_dragon", delai:[1,2], attente:"Il faut remonter, et cette fois pour de bon.",
      ev:{ id:"CHV_5A", titre:"Le nid", famille:"ONDE", rarete:"majeur",
        image:"evt2_ossements",
        scenes:{
          start:{ texte:[
            "Elle l'attend. Une bête blessée à l'aile n'a pas la ressource de chasser un homme dans la rocaille : elle se plante devant sa faille et elle attend.",
            "Elle est vieille, terne, et deux fois plus grande que ce que la peur avait fait dire aux paysans."],
            combat:{ groupe:[{bst:"BST_011", n:1}], victoire:"morte", defaite:"perdu", mortel:true }},
          morte:{ texte:[
            "Elle tombe sur le flanc, et la montagne rend un son qu'on entend depuis la vallée.",
            "Dans la faille, deux formes plus petites cessent de crier au bout d'un moment. Yohan ne s'approche pas. Il redescend."],
            effets:{xp:60, sang:8, issue:"dragon_tue"}, fin:true},
          perdu:{ texte:[
            "L'aile percée siffle, la queue balaie la rocaille, et il se retrouve à trente pas plus bas, sur le dos, sans savoir comment il y est arrivé.",
            "Il rampe jusqu'à un surplomb et il attend la nuit. La bête ne le poursuit pas : elle rentre chez elle."],
            effets:{pv:-30, fat:25, xp:15, issue:"abandonnee"}, fin:true},
        }}},

    { id:"rendre", delai:[2,4], attente:"Il faut arracher à Valcroix ce que Valcroix a volé.",
      ev:{ id:"CHV_5B", titre:"Ce qu'on lui a pris", famille:"CONTRAT", rarete:"majeur",
        image:"evt2_veine",
        scenes:{
          start:{ texte:[
            "Le butin de la montagne est dans les caves du château, dans trois caisses que personne n'a ouvertes depuis la fin de l'hiver. L'intendant jure ses grands dieux qu'il ignore de quoi on parle.",
            "Il y a deux façons de sortir trois caisses d'un château."],
            choix:[
              {label:"Les acheter au seigneur", detail:"−900 or · il préfère l'argent au scandale",
               requis:{or:900}, suite:"achete", effets:{or:-900}},
              {label:"Les prendre de nuit", detail:"Jet d'Agilité (14)",
               test:{stat:"agi", dc:14}, reussite:"vole_ok", echec:"vole_ko"},
              {label:"Le forcer devant ses gens", detail:"Requiert du Renom · très voyant",
               requis:{renomMin:25}, suite:"force", effets:{suspicion:12, renom:6}},
            ]},
          achete:{ texte:["Il paie sa propre prime pour racheter un vol qu'il n'a pas commis. Le seigneur signe le reçu sans lever les yeux, et c'est peut-être la chose la plus honteuse qu'il ait faite de sa vie."],
            effets:{xp:14}, suite:"remonte"},
          vole_ok:{ texte:["Trois caisses, une charrette, une porte de service et un chien qu'on achète avec du lard. Au matin, la cave est vide et personne n'ose le dire au seigneur."],
            effets:{xp:20, suspicion:5}, suite:"remonte"},
          vole_ko:{ texte:["Le chien n'était pas seul. Il sort avec deux caisses sur trois et une entaille au bras qui mettra un mois à se fermer."],
            effets:{xp:10, pv:-14, suspicion:10}, suite:"remonte"},
          force:{ texte:[
            "Il pose le sceau de plomb sur la table de la grande salle, devant l'intendant, le chapelain et deux capitaines.",
            "« Vos hommes ont pillé un nid. Deux d'entre eux sont encore là-haut. Rendez ce qui a été pris, ou j'irai le dire ailleurs. »",
            "Le seigneur rend les caisses. Il ne le pardonnera jamais."],
            effets:{xp:24, reputation:{humains:-6}, flag:"valcroix_humilie"}, suite:"remonte"},
          remonte:{ texte:[
            "Remonter chargé prend quatre jours au lieu de deux. Il dépose les caisses à l'entrée de la faille, ouvertes, et redescend de cent pas.",
            "La bête sort au crépuscule. Elle regarde longtemps l'homme en bas, puis les caisses, puis l'homme encore.",
            "Puis elle rentre son butin, une caisse à la fois, comme une paysanne rentre du bois avant la pluie. Elle ne redescendra plus dans la vallée."],
            effets:{xp:55, sang:10, renom:8, issue:"dragon_epargne"}, fin:true},
        }}},

    { id:"confronter", delai:[1,3], attente:"Le seigneur ne sait pas encore ce qui l'attend.",
      ev:{ id:"CHV_5C", titre:"Devant sa propre maison", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Il choisit le jour du marché, quand la cour est pleine, et il pose le sceau de plomb sur la margelle du puits sans hausser la voix.",
            "« Deux de vos hommes sont morts dans une grotte à trois lieues d'ici, à la fin de l'hiver. Ils y ont pris quelque chose. C'est pour ça que ça brûle. »",
            "La cour se tait. Le seigneur, à sa fenêtre, comprend en une seconde qu'il n'a plus le choix qu'entre trois façons de perdre."],
            choix:[
              {label:"Exiger qu'il le dise lui-même, à voix haute", detail:"Jet de Volonté (15)",
               test:{stat:"vol", dc:15}, reussite:"dit_ok", echec:"dit_ko"},
              {label:"Lui laisser une sortie honorable", detail:"Il paiera, et il s'en souviendra autrement",
               suite:"sortie"},
            ]},
          dit_ok:{ texte:[
            "Il descend. Il met plus longtemps que nécessaire, et quand il parle, c'est à la cour, pas à Yohan.",
            "« Mes hommes ont pillé un nid. Je le savais. J'ai laissé faire. »",
            "Personne n'applaudit, personne ne crie. Trois cents personnes rentrent chez elles avec une phrase qu'elles répéteront pendant vingt ans.",
            "Les caisses remontent la montagne le lendemain, portées par ses propres gens."],
            effets:{xp:40, renom:14, reputation:{humains:-10, parias:12},
                                suspicion:10, flag:"valcroix_humilie", issue:"seigneur_confronte"}, fin:true},
          dit_ko:{ texte:[
            "Il ne descend pas. Il fait fermer les volets, et la garde repousse la foule sans violence, avec cette lenteur d'hommes qui ont honte.",
            "Rien n'a été dit à voix haute. Mais toute la vallée sait, désormais, et une vallée qui sait est une chose que le seigneur ne contrôlera plus.",
            "Les caisses remonteront quand même. Discrètement, de nuit, comme tout ce que fait cette maison."],
            effets:{xp:28, renom:8, reputation:{humains:-6}, suspicion:6,
                    flag:"valcroix_humilie", issue:"seigneur_confronte"}, fin:true},
          sortie:{ texte:[
            "Il ramasse le sceau et le lui rend en main propre, à l'écart, sans un mot pour la galerie.",
            "Le seigneur paie le contrat en entier, plus deux cents écus qui ne figurent sur aucun registre, et fait remonter les caisses lui-même.",
            "« Vous auriez pu me détruire ce matin », dit-il à la porte. « Je ne sais pas encore si je dois vous en remercier. »"],
            effets:{xp:32, or:200, reputation:{humains:8}, flag:"valcroix_oblige",
                    issue:"seigneur_confronte"}, fin:true},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   02 — LES MILLE GUEULES
   Une mine de fer, des disparus, et des voix qui imitent les proches.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ARQUENAY", type:'contrat', titre:"Les Mille Gueules",
  commanditaire:"Maison d'Arquenay", maison:"Maison d'Arquenay",
  or:1100, danger:"dangereux", categorie:"sauvetage", prix:true,
  lieux:["LOC_008","LOC_011","LOC_003"],
  pitch:"Des dizaines de mineurs ont disparu sous une exploitation de fer. Les survivants parlent de voix qui imitent leurs proches. La maison veut rouvrir avant la fin du mois.",
  paye:["mine_rouverte","mine_murée","mineurs_ramenes"],
  issues:{
    mine_rouverte:"La mine d'Arquenay a rouvert. On y descend en groupe, et on ne répond plus quand on vous appelle.",
    "mine_murée":"La mine d'Arquenay a été murée. La maison a perdu son fer et gardé ses hommes.",
    mineurs_ramenes:"Onze mineurs d'Arquenay sont remontés vivants d'un endroit d'où l'on ne remonte pas.",
    abandonnee:"Personne n'est jamais redescendu chercher les mineurs d'Arquenay.",
    refusee:"Yohan a refusé les termes d'Arquenay.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"On attend d'entendre les survivants.",
      ev:{ id:"CHA_1", titre:"Ce que disent les survivants", famille:"CONTRAT", rarete:"majeur",
        image:"evt_galerie",
        scenes:{
          start:{ texte:[
            "La maison d'Arquenay reçoit dans une pièce où l'on a fait du feu exprès, et l'on comprend en entrant que ce n'est pas une pièce qu'on chauffe d'habitude.",
            "« Trente-quatre hommes en dix jours. Onze remontés. Nous avons cessé la descente. »",
            "L'homme qui parle n'est pas le seigneur : c'est son intendante des mines, une femme d'une quarantaine d'années aux ongles noirs de fer. Le seigneur, lui, regarde le feu.",
            "« Les onze racontent tous la même chose et refusent tous d'en reparler. »"],
            choix:[
              {label:"Demander à voir les onze", detail:"Ils diront à un étranger ce qu'ils ne disent plus à leur maison",
               suite:"onze"},
              {label:"Demander ce qu'on a creusé récemment", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"veine_ok", echec:"veine_ko"},
              {label:"Accepter sans en savoir plus", detail:"−2 Suspicion · un homme qui descend sans discuter",
               suite:"vite", effets:{suspicion:-2}},
            ]},
          onze:{ texte:[
            "Ils sont dans la grange commune, tous les onze, et aucun ne veut être seul. Ça, c'est la première chose qu'on remarque.",
            "Le plus vieux finit par parler, en regardant le sol : « On entend nos gens. En bas. Ma femme est morte il y a six ans et je l'ai entendue m'appeler par mon nom de jeunesse, celui que plus personne connaît. »",
            "« On y va. On y va toujours. C'est comme ça qu'on les perd. »"],
            effets:{xp:16, flag:"arquenay_voix"}, suite:"vite"},
          veine_ok:{ texte:[
            "L'intendante déroule un plan de galerie et son doigt s'arrête net avant d'y arriver.",
            "« On a percé sur une cavité. Fin de l'hiver. Elle n'était pas sur les plans anciens et elle est trop régulière pour être naturelle. »",
            "Elle relève les yeux. « J'ai dit qu'il fallait la murer. On m'a dit qu'il y avait du fer derrière. »"],
            effets:{xp:18, flag:"arquenay_cavite"}, suite:"vite"},
          veine_ko:{ texte:["On lui montre un plan de galerie, et un plan de galerie ressemble à un plan de galerie. L'intendante répond aux questions ; le seigneur regarde le feu."],
            effets:{xp:5}, suite:"vite"},
          vite:{ fin:true, texte:[
            "« Onze cents écus. Nous voulons rouvrir avant la fin du mois. »",
            "L'intendante ajoute, sans que personne le lui demande : « Et moi je veux que mes hommes remontent. Ce n'est pas la même commande, messire. Souvenez-vous-en en bas. »"]}
        }}},

    { id:"descente", delai:[2,4], attente:"Il faut descendre, et personne ne veut descendre avec vous.",
      ev:{ id:"CHA_2", titre:"La descente", famille:"NAIN", rarete:"majeur",
        image:"evt_tunnel",
        scenes:{
          start:{ texte:[
            "Le puits fait cent vingt mètres. La cage descend en grinçant pendant tout ce temps, et le rond de ciel au-dessus devient une pièce de monnaie, puis rien.",
            "En bas, l'air est tiède et sent le fer mouillé. Deux mineurs volontaires ont accepté d'accompagner Yohan jusqu'à la galerie basse, pas plus loin. Ils ont pris des lampes en trop.",
            "À trois cents pas, le plus jeune s'arrête net. « Vous avez entendu ? »",
            "Yohan n'a rien entendu."],
            choix:[
              {label:"Continuer, et interdire de répondre", detail:"Jet de Volonté (13) · tenir deux hommes qui ont peur",
               test:{stat:"vol", dc:13}, reussite:"tenir_ok", echec:"tenir_ko"},
              {label:"Les renvoyer en haut tout de suite", detail:"Seul, mais personne à perdre",
               suite:"seul", effets:{xp:10}},
              {label:"Écouter ce qui appelle", detail:"Ce qui parle finit toujours par dire quelque chose",
               suite:"ecoute"},
            ]},
          tenir_ok:{ texte:[
            "« Vous n'entendez rien. Vous ne répondez pas. Vous marchez derrière moi et vous regardez mon dos. »",
            "Il le dit d'une voix qui ne laisse pas de place, et les deux hommes le suivent jusqu'à la galerie basse sans lever la tête une seule fois.",
            "Quelque chose les appelle deux fois. Personne ne répond. C'est la première fois que ça arrive dans cette mine."],
            effets:{xp:18, flag:"arquenay_discipline"}, suite:"cavite"},
          tenir_ko:{ texte:[
            "Le plus jeune répond. Un seul mot — un prénom — et il part dans une galerie latérale en courant, la lampe battant contre sa cuisse.",
            "Quand Yohan le rattrape, cent mètres plus loin, il est debout devant une paroi nue, et il pleure, et il ne sait pas dire pourquoi."],
            effets:{xp:8, fat:10}, suite:"cavite"},
          seul:{ texte:[
            "Ils remontent en le remerciant trois fois de trop. Il continue seul, avec deux lampes, et le silence d'une mine où l'on est le seul à respirer est une chose qu'on n'oublie pas."],
            effets:{fat:6}, suite:"cavite"},
          ecoute:{ texte:[
            "Il s'arrête et il écoute. Ça vient d'en bas et de partout, très loin et très près, et ça n'imite pas une voix : ça imite l'idée d'une voix, comme quelqu'un qui n'aurait jamais entendu parler mais aurait vu des gens le faire.",
            "Puis, très clairement, dans le noir : le nom de sa mère. Prononcé correctement.",
            "Les deux mineurs le regardent. Ils n'ont pas entendu la même chose que lui."],
            effets:{xp:20, fat:12, flag:"arquenay_appelle"}, suite:"cavite"},
          cavite:{ texte:[
            "La galerie basse s'arrête sur un mur de moellons montés à la hâte, et le mur est percé.",
            "Derrière, la cavité : une salle ronde, trop régulière, dont les parois sont creusées de milliers de petites alvéoles. Le sol est jonché de lampes de mineur. Quarante, cinquante peut-être, toutes éteintes, toutes posées à l'endroit.",
            "Personne ne les a jetées. On les a posées."],
            effets:{xp:14, flag:"arquenay_cavite"}, fin:true},
        }}},

    { id:"colonie", delai:[1,3], attente:"Ce qui vit là-dessous n'a pas fini.",
      ev:{ id:"CHA_3", titre:"Ce qui vit sous la mine", famille:"NAIN", rarete:"majeur",
        image:"evt2_echo",
        scenes:{
          start:{ texte:[
            "Les alvéoles ne sont pas vides. Chacune contient une chose molle et pâle de la taille d'un poing, et chacune de ces choses respire.",
            "Au centre de la salle, ce qui les a pondues occupe l'espace comme un arbre couché. C'est aveugle. Ça n'a pas besoin de voir : ça écoute, et ça rend ce qu'elle entend.",
            "Contre la paroi du fond, attachés par des fils épais et gris, onze hommes vivants. Certains regardent. Aucun ne crie."],
            choix:[
              {label:"Attaquer maintenant, avant qu'elle finisse de se retourner",
               detail:"C'est ce pour quoi on est descendu",
               suite:"combat"},
              {label:"Couper d'abord les fils, prendre les hommes, et courir",
               detail:"Jet d'Agilité (14) · onze hommes, un couloir, une chose derrière",
               test:{stat:"agi", dc:14}, reussite:"sauve_ok", echec:"sauve_ko"},
              {label:"Se servir de l'Onde dans un endroit clos", detail:"Requiert un pouvoir · efficace et très cher",
               requis:{pouvoir:"foudre"}, suite:"onde"},
            ]},
          combat:{ texte:["Elle se retourne plus vite qu'une chose de cette taille ne devrait."],
            combat:{ groupe:[{bst:"BST_074", n:1}, {bst:"BST_014", n:2}], victoire:"morte", defaite:"fuite" }},
          onde:{ texte:[
            "Dans une salle close, l'Onde n'a nulle part où aller. Elle rebondit sur la pierre et revient.",
            "La chose au centre se fend en trois endroits et cesse d'écouter. Les alvéoles éclatent le long des parois comme une rangée de fenêtres.",
            "Yohan tient debout jusqu'à ce que le silence revienne, puis s'assoit par terre, et met un long moment à se relever."],
            effets:{fat:35, xp:35, sang:6}, suite:"morte"},
          morte:{ texte:[
            "Elle met longtemps à s'arrêter. Longtemps après ça, la salle continue de rendre des voix, de plus en plus faibles, comme une pièce qui se vide.",
            "Les onze hommes sont détachés un par un. Trois marchent. Les autres, il faut les porter."],
            effets:{xp:40, flag:"arquenay_reine_morte"}, suite:"remontee"},
          sauve_ok:{ texte:[
            "Onze fils coupés, onze hommes debout, et cent vingt mètres de galerie à remonter avec une chose aveugle qui appelle derrière soi avec la voix de leurs femmes.",
            "Aucun ne se retourne. C'est le plus dur qu'ils aient jamais fait."],
            effets:{xp:38, fat:18, flag:"arquenay_sauves"}, suite:"remontee"},
          sauve_ko:{ texte:[
            "Il en sort sept. Les quatre autres étaient déjà trop loin — non pas morts, mais quelque part où le fait qu'on leur coupe les fils ne changeait plus rien.",
            "Il les laisse. C'est la décision qu'il faut prendre et personne n'en sortira indemne."],
            effets:{xp:24, fat:20, pv:-15, flag:"arquenay_sauves"}, suite:"remontee"},
          fuite:{ texte:[
            "Il remonte les cent vingt mètres à la corde, une main après l'autre, avec l'impression que le noir en dessous monte plus vite que lui.",
            "Personne n'a été sauvé. Mais quelqu'un est remonté, et c'est déjà plus que les trente-quatre autres."],
            effets:{pv:-20, fat:22, xp:12}, suite:"remontee"},
          remontee:{ fin:true, texte:[
            "Le rond de ciel redevient une pièce de monnaie, puis une porte. Dehors, il fait un jour tellement ordinaire que c'en est indécent."]},
        }}},

    { id:"decision", delai:[1,2], attente:"La maison attend de savoir si elle rouvre.",
      ev:{ id:"CHA_4", titre:"Rouvrir, ou murer", famille:"CONTRAT", rarete:"majeur",
        image:"evt2_veine",
        scenes:{
          start:{ texte:[
            "La maison d'Arquenay veut savoir une seule chose : est-ce qu'on peut redescendre.",
            "L'intendante veut savoir autre chose, et elle a le tact de ne pas le demander devant son seigneur.",
            "Le fer de cette mine fait vivre quatre villages. La cavité, elle, ne s'est pas creusée toute seule, et rien ne dit qu'elle soit la seule."],
            choix:[
              {label:"Déclarer la mine sûre", detail:"Requiert d'avoir tué ce qui vivait là · le fer coule de nouveau",
               requis:{flag:"arquenay_reine_morte"}, suite:"rouvre",
               effets:{issue:"mine_rouverte", reputation:{humains:10, nains:6}, renom:8}},
              {label:"Exiger qu'on mure la galerie basse", detail:"La maison perd son fer et garde ses hommes",
               suite:"mure", effets:{issue:"mine_murée", reputation:{humains:-8, parias:10}, renom:4}},
              {label:"Ne rien déclarer et remettre les onze à leurs familles",
               detail:"Requiert de les avoir ramenés · le reste ne vous regarde pas",
               requis:{flag:"arquenay_sauves"}, suite:"hommes",
               effets:{issue:"mineurs_ramenes", reputation:{humains:6, parias:14}, renom:6}},
            ]},
          rouvre:{ fin:true, texte:[
            "On redescend le lundi suivant. Par groupes de six, jamais seul, avec ordre formel de ne répondre à aucune voix.",
            "Le fer remonte. Les quatre villages mangent. L'intendante serre la main de Yohan et ne dit rien du tout, ce qui en dit long."]},
          mure:{ fin:true, texte:[
            "Il faut trois semaines et deux cents charretées de pierre pour fermer une galerie qu'on a mis quarante ans à ouvrir.",
            "Le seigneur ne salue pas Yohan à son départ. L'intendante l'accompagne jusqu'à la route.",
            "« Quatre villages vont avoir faim », dit-elle. « Et trente-quatre hommes ne remonteront pas. Je ne sais pas lequel des deux je pourrai me pardonner. »"]},
          hommes:{ fin:true, texte:[
            "Onze hommes rendus à onze maisons, dont trois qui ne diront plus jamais un mot. Yohan ne signe aucun rapport et ne déclare rien à personne.",
            "La maison d'Arquenay décidera toute seule si elle rouvre. Ce n'est pas ce pour quoi il a été payé, et c'est très exactement ce qu'on lui avait demandé en bas."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   03 — LA FILLE DE SOMBREVAL
   Une disparue dans les marais. Au retour, sa version contredit celle du père.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_SOMBREVAL", type:'contrat', titre:"La Fille de Sombreval",
  commanditaire:"Maison de Sombreval", maison:"Maison de Sombreval",
  or:900, danger:"dangereux", categorie:"sauvetage", prix:true,
  lieux:["LOC_010","LOC_016","LOC_011"],
  pitch:"La fille adulte du seigneur a disparu dans les marais avec quatre gardes. Un seul cheval est revenu. Le père la veut vivante et interdit d'avertir les voisins.",
  paye:["rendue_au_pere","laissee_libre","verite_dite"],
  issues:{
    rendue_au_pere:"La fille de Sombreval est rentrée chez son père. On ne l'a plus revue aux fenêtres.",
    laissee_libre:"La fille de Sombreval n'est jamais rentrée, et son père a payé quand même.",
    verite_dite:"Ce que la fille de Sombreval avait à dire a été dit, et la maison ne s'en est pas remise.",
    abandonnee:"La fille de Sombreval est restée dans les marais.",
    refusee:"Yohan a refusé les termes de Sombreval.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Un seul cheval est revenu, et il est encore à l'écurie.",
      ev:{ id:"CHS_1", titre:"Le cheval qui est revenu seul", famille:"CONTRAT", rarete:"majeur",
        image:"evt2_maree",
        scenes:{
          start:{ texte:[
            "Le seigneur de Sombreval reçoit dans son écurie, ce qui n'est pas une manière de faire, et dit tout de suite pourquoi : le cheval est là.",
            "« Ma fille est partie chasser aux marais avec quatre hommes. Neuf jours. Seul ce cheval est rentré. »",
            "C'est un homme sec, gris, poli, et il ajoute la phrase suivante sans changer de ton :",
            "« Vous ne préviendrez pas Bellac, ni Torcy, ni personne. C'est une affaire de maison. »"],
            choix:[
              {label:"Examiner le cheval", detail:"Jet de Précision (12) · une bête revenue seule raconte le voyage",
               test:{stat:"precision", dc:12}, reussite:"cheval_ok", echec:"cheval_ko"},
              {label:"Demander pourquoi il ne veut pas de voisins", detail:"C'est une drôle de façon de chercher sa fille",
               suite:"voisins"},
              {label:"Demander si elle voulait rentrer", detail:"Jet de Volonté (13)",
               test:{stat:"vol", dc:13}, reussite:"veut_ok", echec:"veut_ko"},
            ]},
          cheval_ok:{ texte:[
            "La selle est intacte. Les sangles sont défaites — proprement, par en dessous, par quelqu'un qui savait ce qu'il faisait. Une bête qui s'échappe ne desselle pas.",
            "Les jambes sont couvertes de vase jusqu'au poitrail, mais les fers sont neufs et sans une éraflure. Ce cheval n'a pas galopé dans les marais : on l'a fait marcher, et on l'a renvoyé.",
            "Quelqu'un a voulu qu'on croie à un accident."],
            effets:{xp:18, flag:"sombreval_renvoye"}, suite:"termes"},
          cheval_ko:{ texte:["Un cheval boueux, une selle vide, et l'odeur de marais. On ne lit pas dans une bête ce qu'on n'a pas déjà en tête."],
            effets:{xp:5}, suite:"termes"},
          voisins:{ texte:[
            "« Parce que ma fille a vingt-six ans et qu'elle n'est pas mariée », dit-il, « et que si Torcy apprend qu'elle a passé neuf nuits dehors avec quatre hommes d'armes, il n'y aura plus rien à négocier. »",
            "C'est une réponse cohérente. C'est aussi la première fois qu'il parle d'elle comme d'une chose qu'on négocie."],
            effets:{xp:12, flag:"sombreval_mariage"}, suite:"termes"},
          veut_ok:{ texte:[
            "La question le prend de flanc. Il regarde le cheval un long moment.",
            "« Elle n'aimait pas ce mariage. Elle me l'a dit. Elle me l'a même écrit. » Il redresse les épaules. « Cela ne change rien : elle est ma fille et elle est dehors. Ramenez-la. »",
            "Ce qu'il vient d'admettre, il ne l'aurait dit à personne de sa maison."],
            effets:{xp:16, flags:["sombreval_mariage","sombreval_partie_seule"]}, suite:"termes"},
          veut_ko:{ texte:["« Ce qu'elle voulait ne vous concerne pas. Elle est dehors. Ramenez-la. » Le ton se ferme comme une porte."],
            effets:{xp:4}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Neuf cents écus. Vivante. Et discrètement. »",
            "Il caresse l'encolure du cheval, une fois, machinalement, et Yohan comprend que cet homme n'a pas dormi depuis neuf jours."]},
        }}},

    { id:"marais", delai:[2,4], attente:"Les marais sont vastes et personne n'y va deux fois.",
      ev:{ id:"CHS_2", titre:"Les marais", famille:"VOYAGE", rarete:"majeur",
        image:"evt2_naufrages",
        scenes:{
          start:{ texte:[
            "Quatre jours de tourbe et d'eau brune. Le guide s'arrête à la limite de ce qu'il connaît, montre l'est, et refuse d'aller plus loin même contre de l'argent.",
            "Au sixième jour, Yohan trouve les gardes.",
            "Ils sont trois, alignés sur une langue de terre ferme, chacun sous un tumulus de mottes soigneusement empilées. On les a enterrés. Avec application."],
            choix:[
              {label:"Ouvrir les tumulus", detail:"Jet de Volonté (12) · ce n'est pas agréable et c'est nécessaire",
               test:{stat:"vol", dc:12}, reussite:"ouvre_ok", echec:"ouvre_ko"},
              {label:"Chercher le quatrième", detail:"Trois tombes, quatre gardes",
               suite:"quatrieme"},
              {label:"Suivre les traces qui repartent vers l'est", detail:"Quelqu'un est reparti d'ici, et à pied",
               suite:"traces"},
            ]},
          ouvre_ok:{ texte:[
            "Deux sont morts de la fièvre des marais : on le voit aux mains. Le troisième a reçu un carreau d'arbalète entre les omoplates, tiré de près, par derrière.",
            "Le carreau porte une encoche de propriété. Ce n'est pas celle de Sombreval."],
            effets:{xp:20, flag:"sombreval_carreau"}, suite:"quatrieme"},
          ouvre_ko:{ texte:["Il referme au bout de deux. Certaines choses on peut les faire ; on n'est pas obligé de les faire deux fois."],
            effets:{xp:8, fat:6}, suite:"quatrieme"},
          quatrieme:{ texte:[
            "Le quatrième n'est pas enterré. Il est trois cents pas plus loin, dans l'eau jusqu'à la taille, tenu debout par les roseaux depuis assez longtemps pour qu'on ne puisse plus rien lire sur son visage.",
            "Il tenait encore une arbalète. Déchargée."],
            effets:{xp:12, flag:"sombreval_quatrieme"}, suite:"traces"},
          traces:{ fin:true, texte:[
            "Deux personnes sont reparties d'ici vers l'est, à pied, sans se cacher. Les traces sont vieilles de cinq jours et elles ne vont pas au hasard : elles vont quelque part.",
            "À l'est, il n'y a rien sur les cartes de Sombreval. Ce qui ne veut pas dire qu'il n'y a rien."]},
        }}},

    { id:"tiers", delai:[1,3], attente:"À l'est, quelqu'un vit là où les cartes s'arrêtent.",
      ev:{ id:"CHS_3", titre:"Ceux que les cartes ne montrent pas", famille:"HOMME_BETE", rarete:"majeur",
        image:"evt_harde",
        scenes:{
          start:{ texte:[
            "Le village est bâti sur pilotis au milieu de l'eau, et il n'a pas de nom parce qu'il n'a jamais eu besoin d'en avoir un. Une soixantaine d'âmes, la moitié qui n'est pas tout à fait humaine, et personne qui paie d'impôt à personne depuis quatre générations.",
            "On le laisse approcher. On ne le laisse pas entrer.",
            "Une femme d'une trentaine d'années s'avance sur la passerelle. Elle porte des vêtements de marais, une arbalète en bandoulière, et elle a exactement le visage du portrait qu'on a montré à Yohan avant son départ."],
            choix:[
              {label:"Dire pourquoi il est là", detail:"La franchise, avec quelqu'un qui tient une arbalète",
               suite:"franc"},
              {label:"Mentir sur ce qu'on lui veut", detail:"Jet de Volonté (14)",
               test:{stat:"vol", dc:14}, reussite:"ment_ok", echec:"ment_ko"},
              {label:"Montrer le carreau trouvé dans le dos du garde",
               detail:"Requiert le carreau · savoir qui a tiré change la conversation",
               requis:{flag:"sombreval_carreau"}, suite:"carreau"},
            ]},
          franc:{ texte:[
            "« Votre père m'envoie vous ramener. »",
            "Elle ne bouge pas d'un pouce. Derrière elle, sur la passerelle, quatre personnes se sont levées sans bruit.",
            "« Je sais. Il envoie quelqu'un tous les deux ans. » Elle incline la tête. « Vous êtes le premier à me le dire en face. Ça vaut une conversation. »"],
            effets:{xp:16, flag:"sombreval_confiance"}, suite:"verite"},
          ment_ok:{ texte:[
            "Il raconte un contrat de chasse, une bête dans les marais, un guide perdu. C'est bien raconté et il ne la regarde pas trop.",
            "Elle l'écoute, hoche la tête, et le fait entrer. Il dormira à couvert et mangera à leur table avant de comprendre qu'elle n'en a pas cru un mot et qu'elle voulait simplement le voir de près."],
            effets:{xp:14}, suite:"verite"},
          ment_ko:{ texte:[
            "Elle lève l'arbalète à mi-course, sans la pointer, comme on montre un outil.",
            "« Mon père paie mieux que ça, d'habitude. Le dernier a essayé de m'emmener de nuit. Il est dans les roseaux. »",
            "Il faudra parler vite, et vrai."],
            effets:{xp:8, suspicion:3}, suite:"verite"},
          carreau:{ texte:[
            "Il tend le carreau, l'encoche vers elle. Elle le prend, le retourne, et son visage change pour la première fois.",
            "« C'est le mien. » Un temps. « Il avait ordre de me ramener morte si je refusais de rentrer. Il me l'a dit lui-même, en s'excusant, avant de bander son arme. Il pleurait. »",
            "Elle rend le carreau. « Vous savez maintenant pourquoi je ne rentre pas. »"],
            effets:{xp:24, flags:["sombreval_confiance","sombreval_ordre_de_tuer"]}, suite:"verite"},
          verite:{ fin:true, texte:[
            "Ce qu'elle raconte tient en peu de mots. Le mariage avec Torcy était signé depuis deux ans sans qu'elle le sache. Elle a appris qu'on l'expédiait au printemps. Elle est partie avec ceux des gardes qui ont bien voulu la suivre, deux sont morts de la fièvre en route, et le quatrième a reçu l'ordre de la ramener quoi qu'il arrive.",
            "« Vous êtes payé pour me ramener vivante », dit-elle enfin. « Alors voilà : je suis vivante. Décidez. »"]},
        }}},

    { id:"decision", delai:[1,2], attente:"Elle attend de savoir ce qu'on va faire d'elle.",
      ev:{ id:"CHS_4", titre:"Ce qu'on rapporte à Sombreval", famille:"CONTRAT", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Neuf cents écus contre une femme de vingt-six ans qui n'a rien fait d'illégal, sinon partir.",
            "Le contrat est clair. Ce qui l'est moins, c'est ce qu'un contrat vaut quand on connaît la fin de l'histoire."],
            choix:[
              {label:"La ramener à son père", detail:"C'est ce qui a été payé, et ce sera payé",
               suite:"ramene", effets:{issue:"rendue_au_pere", reputation:{humains:10, parias:-12}, renom:4}},
              {label:"La laisser, et aller le dire à son père", detail:"Il ne paiera peut-être pas. Peut-être que si.",
               suite:"laisse", effets:{issue:"laissee_libre", reputation:{humains:-6, parias:14}, renom:6}},
              {label:"La ramener, et dire devant témoins ce que le quatrième garde avait pour ordre",
               detail:"Requiert de le savoir · elle rentre, mais pas dans la même maison",
               requis:{flag:"sombreval_ordre_de_tuer"}, suite:"dire",
               effets:{issue:"verite_dite", reputation:{humains:-4, parias:16}, renom:12, suspicion:8}},
            ]},
          ramene:{ fin:true, texte:[
            "Elle ne se débat pas et ne parle pas du trajet. Ça dure six jours.",
            "Le seigneur paie devant l'écurie où tout a commencé, compte deux fois, et ne remercie pas. La porte se referme sur elle.",
            "Le mariage avec Torcy est célébré à l'automne. On dit que la mariée s'est bien tenue."]},
          laisse:{ fin:true, texte:[
            "Il redescend seul et il le dit en face, dans la même écurie : elle est vivante, elle va bien, elle ne rentrera pas, et non, il ne dira pas où.",
            "Le seigneur reste longtemps sans rien dire. Puis il paie. En entier.",
            "« Elle m'a écrit », dit-il enfin, la bourse encore dans la main. « Je n'ai pas répondu. Voilà ce que ça donne. »"]},
          dire:{ fin:true, texte:[
            "Ils rentrent ensemble, et elle entre dans la grande salle par la grande porte, devant le chapelain, l'intendant et deux cousins de la maison.",
            "Yohan pose l'affaire à plat en six phrases : le mariage signé sans elle, le départ, la fièvre, et l'ordre donné au dernier garde de la ramener morte plutôt que libre.",
            "Le seigneur ne nie pas. C'est ce qui achève tout le monde.",
            "Elle reste à Sombreval. Le mariage avec Torcy est rompu dans le mois, et ce n'est plus son père qui décide de grand-chose dans cette maison."]},
        }}},
  ]},

];
