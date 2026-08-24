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

/* ══════════════════════════════════════════════════════════════════════════
   04 — LA GUEULE DE FER
   Une bête cuirassée qui suit le métal chaud. Les forges ne peuvent pas
   s'éteindre, et c'est tout le problème.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ORSENNE", type:'contrat', titre:"La Gueule de Fer",
  commanditaire:"Maison d'Orsenne", maison:"Maison d'Orsenne",
  or:1400, danger:"dangereux", categorie:"chasse", prix:true,
  lieux:["LOC_003","LOC_008","LOC_011"],
  pitch:"Une bête cuirassée ravage les forges rurales et semble attirée par le métal chauffé. Quatre forges sur sept sont éteintes, et une forge éteinte est un village qui part.",
  paye:["bete_tuee","bete_deviee","forges_fermees"],
  issues:{
    bete_tuee:"La Gueule de Fer est morte devant la forge de Grand-Enclume, et les feux ont repris.",
    bete_deviee:"On a appris à détourner la Gueule de Fer au lieu de l'affronter. Les forges brûlent la nuit, désormais.",
    forges_fermees:"Les forges d'Orsenne sont froides. La bête est repartie faute de quoi manger.",
    abandonnee:"Personne n'a jamais réglé l'affaire des forges d'Orsenne.",
    refusee:"Yohan a refusé les termes d'Orsenne.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"On attend de voir une forge de près.",
      ev:{ id:"CHO_1", titre:"Quatre forges sur sept", famille:"CONTRAT", rarete:"majeur",
        image:"evt2_forge",
        scenes:{
          start:{ texte:[
            "Dame Isabeau d'Orsenne reçoit dans une forge en activité, debout près du foyer, parce qu'elle n'a pas le temps d'aller ailleurs et qu'elle veut qu'on voie ce qu'on va perdre.",
            "« Quatre forges éteintes en six semaines. Elle vient la nuit, elle arrache la toiture, elle mange le métal dans le foyer. Elle ne touche personne — sauf ceux qui essaient de l'en empêcher, et il y en a eu trois. »",
            "Elle jette une barre dans les braises et la regarde rougir. « Nous ne pouvons pas éteindre. Une forge froide, c'est un village qui part en deux hivers. »"],
            choix:[
              {label:"Demander ce qu'elle a déjà essayé", detail:"Une maîtresse des forges a essayé des choses",
               suite:"essaye"},
              {label:"Demander à voir les trois morts", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"morts_ok", echec:"morts_ko"},
              {label:"Accepter tout de suite", detail:"Une forge qui refroidit n'attend pas",
               suite:"accord", effets:{suspicion:-2}},
            ]},
          essaye:{ texte:[
            "« Des pièges à ours : elle les a mangés. Des chiens : elle les a ignorés. Une garde de six hommes : trois sont morts, les autres ont couru et je ne le leur reproche pas. »",
            "Elle compte sur ses doigts, méthodiquement. « Et une nuit sans feu à Grand-Enclume. Cette nuit-là, elle n'est pas venue. »",
            "Elle relève la tête. « Ce qui veut dire qu'elle sait où sont les feux. Et je ne sais pas comment. »"],
            effets:{xp:14, flag:"orsenne_suit_le_feu"}, suite:"accord"},
          morts_ok:{ texte:[
            "On les a enterrés vite, mais on n'a pas brûlé leurs affaires, et c'est ce qui compte.",
            "Aucun n'a été mordu. Les trois portaient des tabliers de forgeron cloutés de fer, et les trois ont été écrasés — d'un seul coup, par-dessus, comme on écrase une chose qu'on veut ouvrir.",
            "Elle ne les a pas tués pour se défendre. Elle les a pris pour le fer qu'ils portaient."],
            effets:{xp:18, flag:"orsenne_suit_le_feu"}, suite:"accord"},
          morts_ko:{ texte:["Trois tombes fraîches, trois noms, et des familles qui ne veulent pas parler à un étranger. On n'apprend rien qu'on ne sache déjà."],
            effets:{xp:5}, suite:"accord"},
          accord:{ fin:true, texte:[
            "« Quatorze cents écus. Et si vous trouvez un moyen qui n'éteint pas mes feux, je paierai davantage — sur mes propres deniers, pas sur ceux de mon frère. »"]},
        }}},

    { id:"veille", delai:[2,4], attente:"Il faut veiller une forge une nuit entière.",
      ev:{ id:"CHO_2", titre:"La nuit à Grand-Enclume", famille:"ONDE", rarete:"majeur",
        image:"evt_galerie",
        scenes:{
          start:{ texte:[
            "La forge de Grand-Enclume tourne toute la nuit, avec deux apprentis qui alimentent et Yohan sur le toit, à plat ventre, depuis quatre heures.",
            "Elle arrive un peu après minuit. Elle ne rugit pas, elle n'écrase rien : elle descend le versant en ligne droite, sans hésiter une seule fois, comme quelqu'un qui rentre chez lui dans le noir.",
            "Elle fait la taille d'un chariot. Sa carapace n'est pas de l'écaille : c'est du fer, plaque par plaque, fondu à même la peau au fil des années."],
            choix:[
              {label:"Attaquer pendant qu'elle mange", detail:"Elle a la tête dans le foyer et le dos tourné",
               suite:"attaque"},
              {label:"L'observer jusqu'au bout", detail:"Jet de Volonté (13) · rester immobile à six pas d'une chose pareille",
               test:{stat:"vol", dc:13}, reussite:"observe_ok", echec:"observe_ko"},
              {label:"Déplacer le fer chaud loin de la forge", detail:"Jet d'Agilité (13) · une brouette de braises et beaucoup d'audace",
               test:{stat:"agi", dc:13}, reussite:"detourne_ok", echec:"detourne_ko"},
            ]},
          attaque:{ texte:["Elle se retourne plus vite qu'une chose bardée de fer ne le devrait, et la nuit devient très courte."],
            combat:{ groupe:[{bst:"BST_040", n:1}, {bst:"BST_037", n:2}], victoire:"abattue", defaite:"repousse" }},
          abattue:{ texte:[
            "Elle met longtemps à s'arrêter, et quand elle s'arrête, les deux apprentis n'ont toujours pas lâché leurs pinces.",
            "Sous les plaques, la chair est parcourue de veines noires et dures. Cette bête ne mangeait pas le fer par goût : elle en avait besoin pour tenir debout."],
            effets:{xp:34, flag:"orsenne_carcasse"}, fin:true},
          repousse:{ texte:[
            "Elle balaie l'atelier d'un coup de flanc et Yohan se retrouve sous une poutre, à respirer de la cendre, pendant qu'elle finit tranquillement le foyer.",
            "Grand-Enclume est la cinquième forge éteinte. Il reste deux."],
            effets:{pv:-22, fat:16, xp:10, flag:"orsenne_cinquieme"}, fin:true},
          observe_ok:{ texte:[
            "Il tient. Quatre heures de plus, sans bouger, à six pas d'une chose qui pourrait le prendre pour une pièce de fer.",
            "Elle mange lentement, méthodiquement, et elle s'arrête net quand une plaque de sa carapace se détache et tombe dans la cendre. Elle la regarde. Elle la remange.",
            "Elle perd son armure. Elle vient la remplacer. Elle ne chasse pas : elle se soigne."],
            effets:{xp:24, flag:"orsenne_se_soigne"}, fin:true},
          observe_ko:{ texte:["Une tuile cède sous son coude. La bête lève la tête vers le toit, très longuement, et Yohan passe le reste de la nuit à ne plus respirer du tout. Elle repart avant l'aube."],
            effets:{fat:14, xp:8}, fin:true},
          detourne_ok:{ texte:[
            "Une brouette de braises, deux cents pas dans la nuit, et un tas de fer de rebut au fond d'une carrière abandonnée.",
            "Elle change de trajectoire à mi-pente, sans hésiter, et passe la nuit dans la carrière. La forge tourne jusqu'au matin sans être touchée pour la première fois depuis six semaines."],
            effets:{xp:26, flag:"orsenne_detour"}, fin:true},
          detourne_ko:{ texte:["La brouette verse à cent pas de la forge. La bête vient donc manger à cent pas de la forge, ce qui est mieux que rien et bien pire que prévu, parce qu'elle y trouve aussi le mur de l'atelier."],
            effets:{pv:-10, fat:10, xp:10}, fin:true},
        }}},

    { id:"decision", delai:[1,3], attente:"Orsenne attend de savoir si ses feux peuvent rester allumés.",
      ev:{ id:"CHO_3", titre:"Ce qu'on fait d'une bête qui a faim", famille:"CONTRAT", rarete:"majeur",
        image:"evt2_veine",
        scenes:{
          start:{ texte:[
            "Sept forges. Trois encore chaudes. Et une bête qui ne chasse personne mais qui a besoin de fer pour ne pas mourir.",
            "Dame Isabeau écoute tout, sans interrompre, en tournant une barre dans les braises."],
            choix:[
              {label:"L'abattre", detail:"Requiert de l'avoir déjà mise à terre · c'est ce qui a été payé",
               requis:{flag:"orsenne_carcasse"}, suite:"abattre",
               effets:{issue:"bete_tuee", reputation:{humains:10, nains:4}, renom:8}},
              {label:"Monter un dépôt de fer de rebut à trois lieues des forges",
               detail:"Requiert d'avoir compris pourquoi elle vient · −300 or, et les feux restent allumés",
               requis:{flag:"orsenne_se_soigne"}, suite:"depot",
               effets:{or:-300, issue:"bete_deviee", reputation:{humains:6, hommes_betes:10}, renom:6}},
              {label:"Détourner par la carrière, chaque nuit, indéfiniment",
               detail:"Requiert d'avoir réussi le détour · gratuit, et fragile",
               requis:{flag:"orsenne_detour"}, suite:"carriere",
               effets:{issue:"bete_deviee", reputation:{humains:4}, renom:3}},
              {label:"Conseiller d'éteindre les forges", detail:"La seule chose qui marche à coup sûr, et la pire",
               suite:"eteindre", effets:{issue:"forges_fermees", reputation:{humains:-12}, renom:-4}},
            ]},
          abattre:{ fin:true, texte:[
            "La carcasse est découpée sur trois jours. Les plaques valent leur poids et repartent en lingots ; le reste est brûlé sur ordre de la maison.",
            "Les quatre forges éteintes rallument dans le mois. Dame Isabeau paie devant témoins et ajoute deux cents écus de sa bourse, ce qui, chez elle, tient lieu de remerciement."]},
          depot:{ fin:true, texte:[
            "Trois cents écus de fer de rebut, empilés dans une combe à trois lieues, et renouvelés tous les deux mois par charretée.",
            "Elle y va. Chaque nuit. Les sept forges tournent, y compris les quatre qu'on croyait perdues.",
            "« Nous nourrissons un monstre », dit le frère de Dame Isabeau, offusqué. « Nous payons un péage », répond-elle. « Comme à tout le monde. »"]},
          carriere:{ fin:true, texte:[
            "Un homme monte à la carrière chaque soir avec une brouette de braises et redescend au matin. C'est peu de chose et ça tient, tant que l'homme tient.",
            "Dame Isabeau paie le contrat sans rien ajouter. « Vous m'avez acheté du temps », dit-elle. « Ce n'est pas la même chose qu'une solution, et nous le savons tous les deux. »"]},
          eteindre:{ fin:true, texte:[
            "Les sept forges s'éteignent en une semaine. La bête tourne trois nuits autour des ateliers froids, puis remonte vers le nord et ne redescend plus.",
            "Deux villages se vident dans l'année. Dame Isabeau paie le contrat en entier et ne dit pas un mot de plus.",
            "Elle avait dit dès le premier jour que c'était la seule chose qu'elle ne pouvait pas faire."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   05 — LES SEPT DISPARUS
   Sept membres d'une même maison en trois mois, sans demande de rançon.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_CLAIRMONT", type:'contrat', titre:"Les Sept Disparus",
  commanditaire:"Maison de Clairmont", maison:"Maison de Clairmont",
  or:1600, danger:"dangereux", categorie:"enquête", prix:true,
  lieux:["LOC_004","LOC_002","LOC_011"],
  pitch:"Sept membres d'une même maison noble ont disparu en trois mois. Aucune demande de rançon n'est jamais arrivée, ce qui est la seule chose que tout le monde refuse de commenter.",
  paye:["heritier_demasque","maison_eteinte","verite_enterree"],
  issues:{
    heritier_demasque:"On a fini par savoir qui vidait la maison de Clairmont, et la maison n'a pas survécu à l'apprendre.",
    maison_eteinte:"La maison de Clairmont s'est éteinte sans qu'on sache jamais pourquoi.",
    verite_enterree:"Ce qui est arrivé aux sept de Clairmont a été payé pour rester enterré.",
    abandonnee:"Personne n'a jamais cherché les sept disparus de Clairmont.",
    refusee:"Yohan a refusé les termes de Clairmont.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Il reste à parler à ceux qui restent.",
      ev:{ id:"CHC_1", titre:"Ce qu'il reste de Clairmont", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "L'hôtel de Clairmont, à Astrah, est trop grand pour les quatre personnes qui l'habitent encore. On traverse trois salles vides avant d'atteindre celle où quelqu'un a fait du feu.",
            "Le vieil homme qui reçoit est le grand-oncle : il tient la maison par défaut, parce qu'il est le seul adulte qui reste debout.",
            "« Sept. Mon neveu et sa femme, leurs deux fils, ma nièce, son mari, et la petite dernière qui avait dix-neuf ans. En trois mois. Aucune rançon. Aucun corps. »",
            "Il ajoute, très bas : « Et pas une seule enquête de la Couronne. »"],
            choix:[
              {label:"Demander pourquoi la Couronne ne bouge pas", detail:"Sept nobles disparus, c'est un scandale d'État",
               suite:"couronne"},
              {label:"Demander qui hérite", detail:"Jet de Précision (11) · la question qu'on ne pose pas",
               test:{stat:"precision", dc:11}, reussite:"herite_ok", echec:"herite_ko"},
              {label:"Demander à voir les chambres", detail:"Les gens laissent des choses derrière eux",
               suite:"chambres"},
            ]},
          couronne:{ texte:[
            "Le vieil homme met un long moment à répondre, et la réponse tient en trois mots.",
            "« Nous ne pesons plus. »",
            "Il regarde le feu. « Il y a douze ans, une disparition chez nous aurait mobilisé une compagnie. Aujourd'hui, un secrétaire écrit une ligne et referme le registre. C'est peut-être ça qui nous tue, au fond. Pas un assassin : le fait que ça n'intéresse personne. »"],
            effets:{xp:12, flag:"clairmont_oubliee"}, suite:"termes"},
          herite_ok:{ texte:[
            "Il ne se dérobe pas. C'est plus troublant que s'il l'avait fait.",
            "« Moi. À soixante-treize ans, et sans enfant. Après moi, une branche cadette installée à Fort-aux-Princes, que je n'ai pas vue depuis vingt ans. »",
            "Il sourit sans joie. « Vous pensez ce que tout le monde pense. Je le pense aussi. C'est pour ça que je paie quelqu'un qui n'est pas d'ici. »"],
            effets:{xp:18, flag:"clairmont_branche_cadette"}, suite:"termes"},
          herite_ko:{ texte:["La question passe mal et on la lui rappelle : il a soixante-treize ans, il enterre sa famille, et il n'a pas besoin d'un mercenaire pour lui faire remarquer qu'il en profite."],
            effets:{xp:4, reputation:{humains:-3}}, suite:"termes"},
          chambres:{ texte:[
            "Sept chambres fermées, sept lits faits. Personne n'a rien touché, parce que toucher reviendrait à admettre.",
            "Dans celle de la plus jeune, une malle de voyage à moitié faite, refermée à la hâte. Dans celle des deux fils, un jeu de cartes interrompu. Dans celle du neveu, un registre de comptes ouvert sur une page où quelqu'un a repassé trois lignes à l'encre noire jusqu'à les rendre illisibles.",
            "Ils ne sont pas partis. Ils ont été interrompus."],
            effets:{xp:20, flag:"clairmont_comptes"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Seize cents écus. Je n'ai pas plus. »",
            "Il ajoute, avec la politesse exacte d'un homme qui a passé sa vie à la cour : « Et je sais ce que la coutume dit qu'une maison comme la mienne vous doit. Regardez autour de vous. Il ne me reste personne à vous donner. »"]},
        }}},

    { id:"enquete", delai:[2,5], attente:"Trois lignes raturées, c'est déjà une piste.",
      ev:{ id:"CHC_2", titre:"Les trois lignes noircies", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "Le registre du neveu s'arrête net à la mi-hiver. Les trois lignes raturées se laissent lire à contre-jour par un copiste patient et mal payé.",
            "Ce sont trois versements. Trois, à la même personne, sur trois mois — et la personne n'est pas nommée : elle est désignée par une initiale et un chiffre, comme on désigne un fournisseur qu'on préfère ne pas inscrire.",
            "Le premier versement date de dix jours avant la première disparition."],
            choix:[
              {label:"Remonter le fournisseur par les banques d'Astrah", detail:"Jet de Précision (14)",
               test:{stat:"precision", dc:14}, reussite:"banque_ok", echec:"banque_ko"},
              {label:"Acheter le nom à un secrétaire du Grand Registre", detail:"−350 or",
               requis:{or:350}, suite:"achat", effets:{or:-350}},
              {label:"Aller voir la branche cadette à Fort-aux-Princes",
               detail:"Requiert de savoir qui hérite après le vieil homme",
               requis:{flag:"clairmont_branche_cadette"}, suite:"cadette"},
            ]},
          banque_ok:{ texte:[
            "Quatre jours dans les arrière-salles des changeurs d'Astrah, à payer des verres et à poser la même question de six façons.",
            "L'initiale correspond à une maison de courtage qui ne courte rien : elle sert d'écran à des gens qui paient d'autres gens. Le commis qui tient les écritures accepte de dire une chose et une seule, en regardant la porte : « Ce compte-là paie des hommes de Port-Noir. »"],
            effets:{xp:24, flag:"clairmont_port_noir"}, fin:true},
          banque_ko:{ texte:["Les changeurs d'Astrah ont l'habitude des gens qui posent des questions, et une façon polie de ne rien dire qui prend quatre jours à comprendre."],
            effets:{xp:8, or:-40}, fin:true},
          achat:{ texte:[
            "Le secrétaire prend l'argent dans une chapelle, ce qui est sa manière de se tenir.",
            "« Le compte est ouvert au nom d'un armateur de Port-Noir. Et il est alimenté depuis Fort-aux-Princes, par une lettre de change signée d'un nom que vous connaissez déjà si vous avez lu l'arbre de cette maison. »",
            "Il se relève. « Je n'ai rien dit. Vous ne m'avez jamais vu. Et si j'étais vous, je ne rentrerais pas à l'hôtel de Clairmont ce soir. »"],
            effets:{xp:26, flags:["clairmont_port_noir","clairmont_branche_cadette"]}, fin:true},
          cadette:{ texte:[
            "La branche cadette tient un hôtel modeste à Fort-aux-Princes et vit correctement pour des gens qu'on dit oubliés.",
            "Trop correctement. La domesticité est neuve, les tentures ont six mois, et le maître des lieux — un homme de quarante ans au regard fatigué — reçoit Yohan avec une amabilité qui ne cède jamais d'un pouce en une heure d'entretien.",
            "Sur le manteau de cheminée, un cadeau récent : une pièce de scrimshaw comme on en fabrique à Port-Noir, et nulle part ailleurs."],
            effets:{xp:28, flags:["clairmont_port_noir","clairmont_cadet_riche"]}, fin:true},
        }}},

    { id:"port", delai:[2,4], attente:"Port-Noir ne déclare rien et n'oublie personne.",
      ev:{ id:"CHC_3", titre:"Ce qu'on charge la nuit à Port-Noir", famille:"VILLE", rarete:"majeur",
        image:"evt_port_noir",
        scenes:{
          start:{ texte:[
            "Port-Noir déclare le tiers de ce qui entre et le quart de ce qui sort, et tout le monde s'en accommode depuis quatre générations.",
            "L'armateur du compte existe. Il possède deux caraques, un entrepôt sur le quai nord, et une réputation d'homme qui ne pose jamais de questions sur une cargaison.",
            "L'entrepôt est gardé la nuit. Ce qui est étrange, pour un entrepôt vide."],
            choix:[
              {label:"Y entrer", detail:"Jet d'Agilité (14)",
               test:{stat:"agi", dc:14}, reussite:"entre_ok", echec:"entre_ko"},
              {label:"Attendre et suivre ce qui en sort", detail:"Jet de Précision (13) · trois nuits sur un toit",
               test:{stat:"precision", dc:13}, reussite:"suit_ok", echec:"suit_ko"},
              {label:"Aller trouver l'armateur en face", detail:"Il ne niera pas, et il ne sera pas seul",
               suite:"face", effets:{suspicion:6}},
            ]},
          entre_ok:{ texte:[
            "L'entrepôt n'est pas vide. Il contient sept malles de voyage, alignées le long du mur du fond, avec les armes de Clairmont peintes au pochoir sur le flanc.",
            "Elles sont pleines. Vêtements, papiers, une bourse par malle, intacte.",
            "On n'a pas volé ces gens. On les a embarqués — avec leurs affaires, comme des passagers — et quelqu'un a fait débarquer les affaires."],
            effets:{xp:30, flag:"clairmont_malles"}, fin:true},
          entre_ko:{ texte:[
            "Trois hommes dans le noir, et une porte qui se referme derrière.",
            "Il sort par le toit avec une entaille au flanc et la certitude qu'on garde très sérieusement un entrepôt vide."],
            effets:{pv:-16, fat:12, xp:12, suspicion:6}, fin:true},
          suit_ok:{ texte:[
            "La troisième nuit, une chaloupe accoste, et l'on charge non pas des caisses mais des gens : quatre silhouettes qui montent d'elles-mêmes, à l'aube, sans qu'on les pousse.",
            "L'une d'elles porte encore un manteau de coupe noble.",
            "Ils ne sont pas morts. Ils sont partis. Et quelqu'un les paie pour ça."],
            effets:{xp:32, flag:"clairmont_vivants"}, fin:true},
          suit_ko:{ texte:["Trois nuits sur un toit humide, deux chats, un ivrogne, et rien. Certaines veilles ne donnent rien, et il faut le porter aussi."],
            effets:{fat:14, xp:8}, fin:true},
          face:{ texte:[
            "L'armateur ne nie rien. Il fait servir du vin et il parle, parce qu'il a passé l'âge d'avoir peur d'un homme seul.",
            "« Je transporte. On me paie, je charge, je débarque ailleurs. Ce que sept nobles vont faire de leur vie à quatre cents lieues d'ici ne me regarde pas. »",
            "Il repose son verre. « Et si vous voulez mon avis, ils n'ont pas eu tort. Cette maison-là était morte avant eux. »"],
            effets:{xp:28, flags:["clairmont_vivants","clairmont_armateur"], suspicion:4}, fin:true},
        }}},

    { id:"decision", delai:[1,3], attente:"Il reste à décider ce que le vieil homme apprendra.",
      ev:{ id:"CHC_4", titre:"Ce qu'on rapporte à un vieil homme", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_chapelle",
        scenes:{
          start:{ texte:[
            "L'affaire tient debout, et elle est laide autrement que prévu.",
            "Le cadet de Fort-aux-Princes a payé un armateur pour exfiltrer, un par un, tous ceux qui se trouvaient entre lui et le nom de Clairmont. Il ne les a pas tués. Il leur a offert de l'argent, un bateau et une vie ailleurs — et sept personnes qui n'aimaient pas la leur ont dit oui.",
            "Le vieil homme, lui, croit enterrer sa famille depuis trois mois."],
            choix:[
              {label:"Tout lui dire", detail:"Requiert d'avoir la preuve · il a payé pour savoir",
               requis:{flag:"clairmont_vivants"}, suite:"dire",
               effets:{issue:"heritier_demasque", reputation:{humains:8, parias:6}, renom:10}},
              {label:"Tout lui dire, et aller le dire au cadet ensuite",
               detail:"Requiert la preuve · il a une maison, des gardes et beaucoup à perdre",
               requis:{flag:"clairmont_vivants"}, suite:"cadet", effets:{etape:"confrontation"}},
              {label:"Accepter l'argent du cadet et enterrer l'affaire",
               detail:"+1200 or · le vieil homme mourra en croyant sa famille morte",
               suite:"argent",
               effets:{or:1200, issue:"verite_enterree", reputation:{humains:-10, parias:-12}, renom:-8, suspicion:-6}},
              {label:"Lui dire qu'on n'a rien trouvé", detail:"C'est faux, et c'est peut-être plus doux",
               suite:"rien", effets:{issue:"maison_eteinte", reputation:{humains:-4}}},
            ]},
          dire:{ fin:true, texte:[
            "Il écoute sans interrompre, exactement comme la première fois.",
            "Puis il dit : « Ils sont vivants. » Et il le répète deux fois, comme on essaie une phrase pour voir si elle tient.",
            "Il paie le contrat en entier. Trois semaines plus tard, une lettre de sa main part vers Fort-aux-Princes : elle ne contient aucune menace, aucune plainte, et elle déshérite le cadet en quatre lignes d'une politesse impeccable.",
            "La maison de Clairmont s'éteindra avec lui. Mais elle s'éteindra en sachant."]},
          cadet:{ fin:true, texte:[
            "Le vieil homme sait. Reste l'autre, qui vit bien à Fort-aux-Princes et se croit à l'abri d'un homme qu'il n'a jamais rencontré."]},
          argent:{ fin:true, texte:[
            "Douze cents écus, comptés dans une arrière-salle de Fort-aux-Princes par un homme de quarante ans au regard fatigué qui n'essaie même pas de se justifier.",
            "« Je ne les ai pas tués », dit-il quand même, à la fin. « Personne ne veut le croire, mais je ne les ai pas tués. »",
            "Yohan rentre à Astrah annoncer au vieil homme qu'il n'a rien trouvé. Le vieil homme le remercie et paie quand même la moitié.",
            "C'est cette moitié-là qui reste en travers pendant des années."]},
          rien:{ fin:true, texte:[
            "« Je n'ai rien trouvé. »",
            "Le vieil homme hoche la tête lentement. Il paie la moitié du contrat et raccompagne Yohan lui-même jusqu'à la porte, à travers les trois salles vides.",
            "« Merci d'avoir cherché », dit-il. « Personne d'autre n'a cherché. »"]},
        }}},

    { id:"confrontation", delai:[2,4], attente:"Fort-aux-Princes est à quelques jours de route.",
      ev:{ id:"CHC_5", titre:"L'homme qui n'a tué personne", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Il reçoit dans la même pièce, avec la même amabilité, et il comprend en trois phrases qu'elle ne servira à rien.",
            "« Vous allez me dire que j'ai vidé ma propre maison. C'est vrai. Vous allez me dire que c'est monstrueux. Ça se discute. »",
            "Il se lève et va à la fenêtre. « J'ai offert de l'argent et un bateau à sept personnes qui haïssaient ce nom. Sept ont accepté. Pas une n'a hésité plus d'une nuit. Demandez-vous ce que ça dit de la maison de Clairmont, plutôt que de moi. »"],
            choix:[
              {label:"Le tuer", detail:"Il a trois gardes et l'habitude d'être détesté",
               suite:"tuer"},
              {label:"Le livrer à la Couronne", detail:"Jet de Volonté (14) · encore faut-il qu'elle veuille du dossier",
               test:{stat:"vol", dc:14}, reussite:"livre_ok", echec:"livre_ko"},
              {label:"Le laisser vivre avec ce que le vieil homme a écrit",
               detail:"La lettre de déshéritement est déjà partie",
               suite:"laisse"},
            ]},
          tuer:{ texte:["Il appelle sans se presser. Les trois gardes entrent par la porte du fond, et ils sont payés depuis trois mois pour ce moment précis."],
            combat:{ groupe:[{bst:"BST_063", n:1}, {bst:"BST_045", n:3}], victoire:"mort", defaite:"echoue" }},
          mort:{ texte:[
            "Il meurt dans son propre salon, sous une pièce de scrimshaw de Port-Noir, sans avoir cessé une seule seconde de trouver qu'il avait raison.",
            "La branche cadette s'éteint avec lui. Le vieil homme d'Astrah n'en saura rien : il mourra deux ans plus tard en croyant seulement avoir déshérité un neveu."],
            effets:{xp:44, renom:6, reputation:{humains:-10, parias:8}, suspicion:12,
                    flag:"clairmont_cadet_mort", issue:"heritier_demasque"}, fin:true},
          echoue:{ texte:[
            "Trois gardes payés d'avance, un salon trop petit pour reculer, et une fenêtre au premier étage.",
            "Il sort par la fenêtre. L'homme de Fort-aux-Princes vivra vieux et riche, et il racontera toute sa vie qu'un Paria a essayé de le tuer chez lui."],
            effets:{pv:-24, fat:18, xp:16, suspicion:16, issue:"heritier_demasque"}, fin:true},
          livre_ok:{ texte:[
            "Le dossier est mince — un compte-écran, un armateur qui ne témoignera pas, sept personnes vivantes qu'on ne peut pas produire — et Yohan le porte quand même au prévôt d'Astrah, avec la lettre du vieil homme en pièce jointe.",
            "La Couronne n'a rien à gagner à poursuivre. Elle a beaucoup à gagner à le tenir.",
            "Le cadet de Clairmont garde sa maison, ses gardes et son scrimshaw. Il appartient désormais à des gens qu'il n'a pas choisis, et pour toujours."],
            effets:{xp:40, renom:8, reputation:{humains:12}, flag:"clairmont_cadet_tenu",
                    issue:"heritier_demasque"}, fin:true},
          livre_ko:{ texte:[
            "Le prévôt lit trois pages, referme le dossier, et le rend.",
            "« Sept adultes sont montés volontairement sur un bateau. Ce n'est pas un crime, messire. C'est un chagrin de famille. »"],
            effets:{xp:18, issue:"heritier_demasque"}, fin:true},
          laisse:{ texte:[
            "Yohan s'en va sans rien faire, et c'est la lettre du vieil homme qui fait le travail : quatre lignes de politesse impeccable qui ôtent au cadet la seule chose pour laquelle il avait tout organisé.",
            "Il hérite d'un nom vide, d'un hôtel à Astrah que personne n'entretient, et de trois salles où il n'y a plus rien."],
            effets:{xp:36, renom:4, reputation:{humains:6, parias:6}, issue:"heritier_demasque"}, fin:true},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   06 — LA PRINCESSE ET LE TRAÎTRE
   Quelqu'un dans sa propre escorte prépare sa mort.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_RONCEVAL", type:'contrat', titre:"La Princesse et le Traître",
  commanditaire:"Maison de Ronceval", maison:"Maison de Ronceval",
  or:2100, danger:"dangereux", categorie:"sauvetage", prix:true,
  lieux:["LOC_004","LOC_002","LOC_011"],
  pitch:"Une princesse adulte doit rejoindre une conférence qui décidera d'une paix. Quelqu'un, dans sa propre escorte, prépare sa mort — et l'on ne sait pas qui.",
  paye:["arrivee_vivante","traitre_demasque","conference_manquee"],
  issues:{
    arrivee_vivante:"La princesse de Ronceval est arrivée à la conférence, et la paix a été signée.",
    traitre_demasque:"Le traître de l'escorte de Ronceval a été démasqué en route, et on a appris qui le payait.",
    conference_manquee:"Le cortège de Ronceval n'est jamais arrivé. La conférence s'est tenue sans lui.",
    abandonnee:"Yohan a quitté l'escorte de Ronceval en chemin.",
    refusee:"Yohan a refusé les termes de Ronceval.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Le cortège part dans quelques jours.",
      ev:{ id:"CHR_1", titre:"Onze personnes, et l'une d'elles ment", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_lances",
        scenes:{
          start:{ texte:[
            "Dame Aliénor de Ronceval reçoit dans une écurie de poste, entre deux relais, parce qu'elle n'a pas le temps de faire autrement.",
            "« Ma nièce doit être à la conférence de Salverne dans six semaines. Si elle n'y est pas, la paix ne se signe pas et trois maisons reprennent la guerre au printemps. »",
            "Elle pose une liste sur le bat-flanc. « Onze personnes dans l'escorte. Capitaine, sept hommes d'armes, une camériste, un cocher, un chapelain. Tous choisis par moi. »",
            "Elle attend qu'il lise. « Une lettre interceptée dit que l'un d'eux a été acheté. Elle ne dit pas lequel, et je n'ai pas le temps de les remplacer. »"],
            choix:[
              {label:"Demander à voir la lettre", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"lettre_ok", echec:"lettre_ko"},
              {label:"Demander qui gagne à ce que la conférence échoue", detail:"On achète toujours pour quelqu'un",
               suite:"qui"},
              {label:"Proposer de voyager sans être présenté comme un garde",
               detail:"Un traître se surveille moins devant un homme qu'il croit inutile",
               suite:"incognito", effets:{suspicion:-3, flag:"ronceval_incognito"}},
            ]},
          lettre_ok:{ texte:[
            "La lettre est courte, sans sceau, et écrite par quelqu'un qui a l'habitude d'écrire peu.",
            "« Le prix est accepté. Ce sera avant le pont, pas après. »",
            "Deux choses : le traître est payé au résultat, et il connaît l'itinéraire assez bien pour parler d'un pont précis. Sur la route de Salverne, il y en a trois."],
            effets:{xp:18, flag:"ronceval_avant_le_pont"}, suite:"termes"},
          lettre_ko:{ texte:["Quatre lignes, aucun sceau, une écriture anonyme. Dame Aliénor l'a déjà lue cent fois et n'en a rien tiré de plus."],
            effets:{xp:5}, suite:"termes"},
          qui:{ texte:[
            "« Trois maisons reprennent la guerre si la paix échoue. Deux y perdraient. La troisième a levé des hommes en février et n'a licencié personne depuis. »",
            "Elle ne dit pas le nom, et Yohan comprend qu'elle ne le dira pas devant un cocher. « Ce que je peux vous dire, c'est que ce n'est pas un fou. C'est un investissement. »"],
            effets:{xp:14, flag:"ronceval_commanditaire"}, suite:"termes"},
          incognito:{ texte:[
            "« Un cousin pauvre qu'on transporte par charité », propose-t-elle après réflexion. « Ça se fait, et personne ne parle jamais à un cousin pauvre. »",
            "Elle réfléchit encore. « Vous mangerez avec les hommes. Vous entendrez ce qu'ils disent quand ils croient qu'on ne compte pas. »"],
            effets:{xp:12}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille cent écus. Elle arrive vivante, ou vous ne touchez rien. »",
            "Elle serre la liste dans sa main. « Et quand vous saurez lequel c'est, vous me le direz avant de faire quoi que ce soit. Ce sont mes hommes. »"]},
        }}},

    { id:"route", delai:[2,4], attente:"Six semaines de route, et onze personnes à regarder.",
      ev:{ id:"CHR_2", titre:"Ce qu'on apprend en mangeant avec les hommes", famille:"VOYAGE", rarete:"majeur",
        image:"evt2_convoi",
        scenes:{
          start:{ texte:[
            "Trois semaines de route. On dort mal, on mange ensemble, et l'on finit par connaître onze personnes mieux qu'on ne voudrait.",
            "Le capitaine est un homme de fer qui ne dort presque pas. La camériste hait la princesse pour des raisons de vingt ans. Le chapelain joue aux dés et perd. Deux des hommes d'armes ont une dette. Le cocher parle à ses chevaux et à personne d'autre.",
            "Il y a cinq raisons de trahir dans ce cortège, et une seule est la bonne."],
            choix:[
              {label:"Suivre l'argent : qui a payé une dette récemment", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"argent_ok", echec:"argent_ko"},
              {label:"Provoquer une alerte et regarder qui se place", detail:"Jet de Volonté (14) · brutal et rapide",
               test:{stat:"vol", dc:14}, reussite:"alerte_ok", echec:"alerte_ko"},
              {label:"Parler à la princesse elle-même", detail:"Personne ne lui a demandé ce qu'elle pensait",
               suite:"princesse"},
            ]},
          argent_ok:{ texte:[
            "Les deux endettés le sont toujours : l'un pleure dessus tous les soirs, l'autre a écrit à son frère pour emprunter encore.",
            "Le chapelain, lui, a cessé de perdre aux dés il y a onze jours. Il ne joue plus. Un homme qui a joué toute sa vie et qui s'arrête net a soit trouvé Dieu, soit trouvé de l'argent.",
            "Sa besace est trop lourde pour un homme qui ne possède qu'un bréviaire."],
            effets:{xp:22, flag:"ronceval_chapelain"}, fin:true},
          argent_ko:{ texte:["Onze bourses, onze histoires, et rien qui dépasse. Les gens pauvres ont tous l'air d'avoir une raison, et c'est bien le problème."],
            effets:{xp:8}, fin:true},
          alerte_ok:{ texte:[
            "Un cri dans la nuit, un cheval lâché, et vingt secondes de chaos organisé par Yohan lui-même.",
            "Dix personnes courent vers la voiture de la princesse. Une seule court vers les bagages — et pas vers les siens.",
            "Le chapelain revient une minute plus tard, essoufflé, en expliquant qu'il a cru voir quelqu'un dans les arbres."],
            effets:{xp:24, flag:"ronceval_chapelain"}, fin:true},
          alerte_ko:{ texte:[
            "Le cheval lâché coûte une demi-journée à rattraper, le capitaine engueule tout le monde pendant une heure, et Yohan a appris exactement rien.",
            "Il a aussi appris que le capitaine tient bien ses hommes, ce qui n'est pas rien."],
            effets:{xp:10, fat:8}, fin:true},
          princesse:{ texte:[
            "Elle a vingt-huit ans, elle lit dans une voiture qui tangue depuis trois semaines, et elle referme son livre quand Yohan monte.",
            "« Ma tante vous a dit qu'il y avait un traître. Elle ne vous a pas dit que je le savais avant elle. »",
            "Elle regarde par la fenêtre. « Le chapelain a cessé de jouer aux dés. C'est un homme qui a joué pendant trente ans. On ne s'arrête pas comme ça. »",
            "Puis, plus bas : « Je n'ai rien dit parce que je voulais voir si quelqu'un d'autre le remarquerait. Vous êtes le premier à me poser une question depuis Astrah. »"],
            effets:{xp:26, flags:["ronceval_chapelain","ronceval_princesse_alliee"]}, fin:true},
        }}},

    { id:"pont", delai:[2,3], attente:"Le premier pont est à deux jours.",
      ev:{ id:"CHR_3", titre:"Avant le pont", famille:"VOYAGE", rarete:"majeur",
        image:"evt_peage",
        scenes:{
          start:{ texte:[
            "Le premier pont de la route de Salverne enjambe une gorge étroite, et l'on n'y passe qu'à une voiture à la fois.",
            "À deux lieues, le cortège s'arrête pour la nuit dans une clairière que le capitaine n'a pas choisie : c'est le chapelain qui l'a proposée, en expliquant qu'il y avait de l'eau.",
            "Il y a de l'eau. Il y a aussi trois chemins par lesquels on peut entrer dans cette clairière sans être vu."],
            choix:[
              {label:"Prévenir Dame Aliénor et laisser sa maison régler",
               detail:"Requiert de savoir qui · c'est ce qu'elle a demandé",
               requis:{flag:"ronceval_chapelain"}, suite:"prevenir"},
              {label:"Prendre le chapelain à part cette nuit", detail:"Jet de Volonté (14)",
               requis:{flag:"ronceval_chapelain"}, test:{stat:"vol", dc:14},
               reussite:"retourne_ok", echec:"retourne_ko"},
              {label:"Ne rien dire et attendre l'embuscade", detail:"On saura à coup sûr, et il y aura des morts",
               suite:"attendre"},
            ]},
          prevenir:{ texte:[
            "Dame Aliénor n'est pas là — elle est restée à trois relais en arrière — mais le capitaine porte sa parole, et il l'écoute jusqu'au bout sans changer de visage.",
            "Le chapelain est désarmé, lié, et mis dans la voiture des bagages avant l'aube. Il ne nie pas. Il ne parle pas non plus.",
            "L'embuscade a lieu quand même : ceux qui étaient payés pour attendre attendaient."],
            effets:{xp:20, flag:"ronceval_chapelain_pris"}, suite:"embuscade"},
          retourne_ok:{ texte:[
            "Il craque en quatre minutes, à voix basse, derrière la voiture des bagages.",
            "Douze hommes, avant le pont, à l'aube. Il devait laisser une lanterne allumée du côté est de la clairière. Et il devait, si tout ratait, monter dans la voiture et finir le travail lui-même.",
            "« Je ne l'aurais pas fait », dit-il. Il le dit comme quelqu'un qui essaie de se convaincre. « La lanterne, oui. Le reste, non. »"],
            effets:{xp:28, flags:["ronceval_chapelain_pris","ronceval_douze_hommes"]}, suite:"embuscade"},
          retourne_ko:{ texte:[
            "Il nie tout, se met à pleurer, appelle le capitaine, et l'affaire devient une scène qui réveille le camp entier.",
            "Le capitaine tranche : personne ne touche à un homme d'Église sur un soupçon. Le chapelain dort dans la voiture, libre, et il ne dort pas."],
            effets:{xp:12, suspicion:4}, suite:"embuscade"},
          attendre:{ texte:["Il ne dit rien à personne et il ne dort pas. À trois heures, une lanterne s'allume du côté est de la clairière."],
            effets:{xp:14, flag:"ronceval_lanterne"}, suite:"embuscade"},
          embuscade:{ texte:[
            "Ils viennent par l'est, comme convenu, et ils sont douze — des épéistes à gages, pas des brigands : payés, équipés, silencieux.",
            "Ils vont droit à la voiture de la princesse."],
            combat:{ groupe:[{bst:"BST_061", n:3}, {bst:"BST_043", n:2}], victoire:"tenu", defaite:"perce" }},
          tenu:{ fin:true, texte:[
            "Ça dure moins longtemps qu'on ne croit, et il y a trois morts du côté de l'escorte, dont le cocher qui parlait à ses chevaux.",
            "La voiture n'a pas été ouverte. La princesse en sort d'elle-même, à l'aube, et fait le tour des blessés avant de demander à repartir."]},
          perce:{ fin:true, texte:[
            "Ils atteignent la voiture. Yohan les atteint aussi, mais après — et il y a une différence entre après et avant qu'on paie longtemps.",
            "La princesse est vivante. Elle a une entaille du poignet au coude et elle ne se sert plus de cette main comme avant.",
            "Cinq morts dans l'escorte. Le capitaine est de ceux-là."]},
        }}},

    { id:"salverne", delai:[2,4], attente:"Salverne est encore à trois semaines.",
      ev:{ id:"CHR_4", titre:"Ce qu'on dit à Salverne", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "La conférence de Salverne se tient dans une abbaye trop petite pour le nombre de bannières plantées dans la cour.",
            "La princesse est arrivée. C'est déjà tout ce que Ronceval avait payé.",
            "Reste ce qu'on fait de ce qu'on sait — un chapelain acheté, douze hommes à gages, et une maison qui a levé des troupes en février sans licencier personne."],
            choix:[
              {label:"Ne rien dire et toucher son argent", detail:"Le contrat est rempli",
               suite:"rien", effets:{issue:"arrivee_vivante", reputation:{humains:8}, renom:6}},
              {label:"Livrer le chapelain et ce qu'il a dit, devant la conférence",
               detail:"Requiert de l'avoir pris · la paix se signera autrement",
               requis:{flag:"ronceval_chapelain_pris"}, suite:"livrer",
               effets:{issue:"traitre_demasque", reputation:{humains:12, parias:6}, renom:12, suspicion:8}},
              {label:"Vendre l'information à la maison accusée", detail:"+900 or · elle préfère savoir ce qu'on sait d'elle",
               suite:"vendre",
               effets:{or:900, issue:"arrivee_vivante", reputation:{humains:-10}, renom:-6, suspicion:-4}},
            ]},
          rien:{ fin:true, texte:[
            "La paix se signe le quatrième jour. Trois maisons rengainent. Personne ne saura jamais qu'elle a failli ne pas se signer à deux lieues d'un pont.",
            "Dame Aliénor paie en entier, dans la cour de l'abbaye, et ajoute : « Vous avez ramené onze personnes. J'en avais envoyé onze. Ça ne s'est jamais produit dans ma vie. »"]},
          livrer:{ fin:true, texte:[
            "Le chapelain parle devant quatre maisons réunies, parce qu'on lui a promis la vie et qu'il n'a plus rien d'autre à négocier.",
            "La maison qui a levé des hommes en février nie tout, et se retrouve à négocier une paix qu'elle voulait faire échouer, en position de suppliante.",
            "La princesse fait signer un texte plus dur que prévu. En sortant, elle dit à Yohan une seule phrase : « Vous m'avez posé une question. Personne d'autre. »"]},
          vendre:{ fin:true, texte:[
            "Neuf cents écus, dans une sacristie, comptés par un homme qui ne se présente pas.",
            "La paix se signe quand même. La maison accusée sait désormais exactement ce que Ronceval sait d'elle, et ce qu'elle doit démentir.",
            "Yohan touche deux fois : une fois pour avoir sauvé la princesse, une fois pour avoir vendu ce qu'il a appris en la sauvant. Les deux sommes sont propres. Elles ne se mélangent pas bien."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   07 — LE ROI SOUS LA MONTAGNE
   Un chef Peau-Verte inhabituellement discipliné fédère les bandes.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_KARDURAK", type:'contrat', titre:"Le Roi sous la montagne",
  commanditaire:"Le maître des Grandes Portes", maison:null,
  or:2400, danger:"très dangereux", categorie:"guerre",
  lieux:["LOC_008","LOC_009","LOC_012"],
  pitch:"Un chef Peau-Verte inhabituellement discipliné fédère plusieurs bandes dans les profondeurs. Kar-Durak a des soldats et pas de temps.",
  paye:["gharok_tue","gharok_traite","portes_tenues"],
  issues:{
    gharok_tue:"Gharok est mort sous la montagne, et sa fédération s'est défaite en trois semaines.",
    gharok_traite:"Kar-Durak a traité avec un chef Peau-Verte pour la première fois de son histoire.",
    portes_tenues:"Les Grandes Portes ont tenu. Ce qui vient dessous n'a pas été réglé.",
    abandonnee:"Kar-Durak a affronté la fédération sans Yohan.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Les Nains attendent une reconnaissance, pas une promesse.",
      ev:{ id:"CHK_1", titre:"Ce que les Nains ne disent pas", famille:"NAIN", rarete:"majeur",
        image:"evt_tunnel",
        scenes:{
          start:{ texte:[
            "Le maître des Grandes Portes reçoit dans une salle où l'on entend la ventilation de quatre niveaux de galeries. Il ne s'assoit pas et n'invite pas à le faire.",
            "« Depuis deux ans, les bandes ne se battent plus entre elles. C'est nouveau. C'est mauvais. »",
            "Il pose une carte de niveaux sur la table — un dessin de galeries que peu d'humains ont jamais vu.",
            "« Elles convergent vers le niveau moins-sept. Nous avons perdu trois patrouilles en essayant de savoir pourquoi. »"],
            choix:[
              {label:"Demander ce qu'il y a au niveau moins-sept", detail:"Un Nain ne perd pas trois patrouilles pour rien",
               suite:"niveau"},
              {label:"Demander pourquoi il paie un humain", detail:"Kar-Durak a des soldats",
               suite:"humain"},
              {label:"Accepter et descendre", detail:"On perd moins de temps",
               suite:"termes"},
            ]},
          niveau:{ texte:[
            "Il met du temps à répondre, ce qui chez un Nain veut dire qu'il pèse ce qu'il doit taire.",
            "« Une salle. Ancienne. Nous l'avons murée il y a six cents ans et nous n'écrivons pas pourquoi. »",
            "Il roule la carte. « Ce que je sais, c'est qu'ils ne creusent pas vers nos coffres. Ils creusent vers ça. »"],
            effets:{xp:16, flag:"kardurak_salle_muree"}, suite:"termes"},
          humain:{ texte:[
            "« Parce qu'un Nain qui descend au moins-sept ne remonte pas. Et parce que si un Nain le voit, Kar-Durak devra agir. »",
            "Il regarde Yohan pour la première fois. « Si c'est un humain qui le voit, Kar-Durak peut encore choisir. C'est ça que j'achète : le droit de ne pas savoir tout de suite. »"],
            effets:{xp:18, flag:"kardurak_deni"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille quatre cents. Payés à la remontée, pas au résultat. »",
            "Il ajoute, du ton dont on énonce une loi : « Nous ne payons pas en femmes. Nous ne l'avons jamais fait pour personne, et nous ne commencerons pas avec un Paria dont nous savons parfaitement ce qu'il est. »",
            "C'est la première fois que quelqu'un le dit à voix haute, et il le dit comme on constate la profondeur d'un puits."]},
        }}},

    { id:"descente", delai:[2,4], attente:"Sept niveaux, et rien qui remonte.",
      ev:{ id:"CHK_2", titre:"Moins-sept", famille:"NAIN", rarete:"majeur",
        image:"evt_galerie",
        scenes:{
          start:{ texte:[
            "Six niveaux à descendre par des escaliers taillés pour des jambes plus courtes. Au cinquième, on cesse de croiser des Nains. Au sixième, on cesse de croiser des lampes allumées.",
            "Le niveau moins-sept n'est pas abandonné : il est occupé. Des feux, de l'ordre, des sentinelles postées à des angles qui se couvrent — et pas un cri, pas une bagarre, pas un chant.",
            "Des Peaux-Vertes qui ne font pas de bruit. C'est ça qui a coûté trois patrouilles aux Nains : personne ne les a entendus venir."],
            choix:[
              {label:"Longer par les galeries hautes", detail:"Jet d'Agilité (14)",
               test:{stat:"agi", dc:14}, reussite:"haut_ok", echec:"haut_ko"},
              {label:"Prendre une sentinelle vivante", detail:"Jet de Précision (14)",
               test:{stat:"precision", dc:14}, reussite:"prise_ok", echec:"prise_ko"},
              {label:"Traverser à découvert", detail:"On verra bien ce qu'ils font d'un homme seul",
               suite:"decouvert"},
            ]},
          haut_ok:{ texte:[
            "Une corniche de trente centimètres, huit cents pas au-dessus des feux, et deux heures à ne pas respirer fort.",
            "De là-haut, tout se lit. Ils ne campent pas : ils travaillent. Ils dégagent un mur — un mur nain, à la pierre appareillée — au fond de la salle, à la pioche et sans hâte, par équipes qui se relaient.",
            "Devant le mur, un seul d'entre eux ne travaille pas. Il regarde, et les autres travaillent mieux quand il regarde."],
            effets:{xp:26, flags:["kardurak_mur","kardurak_gharok_vu"]}, suite:"mur"},
          haut_ko:{ texte:["La corniche cède sur deux mètres. Le bruit se perd dans le fracas des pioches, mais Yohan finit la descente plus vite qu'il ne l'avait prévu et se relève avec un genou qui proteste."],
            effets:{pv:-12, fat:12, xp:10}, suite:"mur"},
          prise_ok:{ texte:[
            "Une sentinelle isolée à un angle, une main sur la bouche, et vingt pas dans une galerie latérale.",
            "Elle parle. Pas par lâcheté : par étonnement qu'on lui demande.",
            "« On ouvre. Le chef dit : dessous, il y a des salles. Assez pour tout le monde. Assez pour arrêter de se battre pour un couloir. »",
            "Elle ajoute, et c'est là que ça devient compliqué : « Y'a des femelles et des petits, dans les niveaux d'après. On les a fait venir. »"],
            effets:{xp:28, flags:["kardurak_mur","kardurak_familles"]}, suite:"mur"},
          prise_ko:{ texte:["La sentinelle crie avant qu'on l'atteigne, et il faut reculer de deux galeries et attendre une heure que ça se calme. Ils fouillent bien. Trop bien pour des bandes."],
            effets:{fat:10, xp:10, suspicion:3}, suite:"mur"},
          decouvert:{ texte:[
            "Il traverse à découvert, les mains vides, et il ne se passe rien pendant quarante pas.",
            "Puis on l'entoure — proprement, sans hurler — et on le mène au fond de la salle, devant le mur qu'on dégage, devant celui qui regarde.",
            "Ce n'est pas ainsi qu'il avait prévu de le rencontrer, et c'est peut-être mieux."],
            effets:{xp:20, flags:["kardurak_mur","kardurak_gharok_vu"]}, suite:"mur"},
          mur:{ fin:true, texte:[
            "Le mur est nain, et il est vieux de six cents ans. On l'a monté depuis l'autre côté : les Nains n'ont pas fermé une galerie, ils ont enfermé quelque chose.",
            "Il reste peut-être deux mètres d'épaisseur, et une centaine de Peaux-Vertes qui piochent nuit et jour.",
            "Il faut remonter, ou aller parler au seul d'entre eux qui ne pioche pas."]},
        }}},

    { id:"gharok", delai:[1,3], attente:"Il n'y a pas trente-six façons d'aborder un roi.",
      ev:{ id:"CHK_3", titre:"Celui qui ne pioche pas", famille:"PEAU_VERTE", rarete:"majeur",
        image:"evt_tambours",
        scenes:{
          start:{ pnj:"gruk", texte:[
            "Il fait deux têtes de plus que Yohan et il parle la langue des hommes lentement, en cherchant ses mots, sans jamais s'excuser de les chercher.",
            "« Tu es celui que les Portes ont payé. »",
            "Ce n'est pas une question. Il s'assied sur un bloc de pierre pour être à hauteur, ce qu'aucun chef Peau-Vert n'a jamais fait de mémoire naine.",
            "« Ils t'ont dit quoi ? Que je fédère pour prendre leurs coffres ? »"],
            choix:[
              {label:"Demander ce qu'il y a derrière le mur", detail:"Il le sait, ou il croit le savoir",
               suite:"derriere"},
              {label:"Lui dire ce que les Nains ont muré ici", detail:"Requiert de le savoir · une information contre une autre",
               requis:{flag:"kardurak_salle_muree"}, suite:"echange"},
              {label:"L'attaquer", detail:"C'est ce pour quoi on est payé",
               suite:"combat"},
            ]},
          derriere:{ pnj:"gruk", texte:[
            "« De la place. »",
            "Il laisse le mot poser. « Vingt mille des miens vivent dans des couloirs où on se bat pour dormir. En dessous, y'a des salles. Grandes. Vides depuis longtemps. »",
            "Il montre le mur. « Les Portes savent. Elles ont fermé. Elles préfèrent qu'on se tue entre nous en haut plutôt qu'on vive en bas. »",
            "Puis, très calmement : « J'ai amené les femelles et les petits. Tu comprends ce que ça veut dire. Je peux pas reculer. »"],
            effets:{xp:26, flags:["kardurak_familles","kardurak_raison"]}, fin:true},
          echange:{ pnj:"gruk", texte:[
            "« Les Nains ont muré cette salle il y a six cents ans et n'ont jamais écrit pourquoi. »",
            "Gharok le regarde longtemps. « Ça, ils me l'avaient pas dit. »",
            "Il se lève, va au mur, pose une main dessus. « Six cents ans. Et pas écrit. »",
            "Il revient s'asseoir. « J'ai vingt mille bouches qui attendent de l'autre côté de ce mur. Si tu me dis d'arrêter, tu me dis de les renvoyer mourir en haut. Alors donne-moi mieux que ça. »"],
            effets:{xp:32, flags:["kardurak_raison","kardurak_doute"]}, fin:true},
          combat:{ texte:["Il se lève sans se presser. Personne d'autre ne bouge : ils regardent, et c'est pire."],
            combat:{ groupe:[{bst:"BST_026", n:1}, {bst:"BST_054", n:1}], victoire:"vaincu", defaite:"perdu", mortel:true }},
          vaincu:{ texte:[
            "Il tombe sur un genou puis sur le flanc, et il met du temps à mourir parce qu'il est fait pour durer.",
            "Personne ne le venge. Ils reculent, par groupes, et en trois semaines la fédération se défait exactement comme les Nains l'espéraient.",
            "Il reste un mur à moitié dégagé, et vingt mille Peaux-Vertes qui retournent se battre pour des couloirs."],
            effets:{xp:70, sang:10, renom:14, reputation:{nains:20, peaux_vertes:-25},
                    issue:"gharok_tue"}, fin:true},
          perdu:{ texte:[
            "Il encaisse deux coups qui auraient couché un ours et il rend le troisième.",
            "Yohan se réveille dans une galerie haute, désarmé mais entier, avec de l'eau à portée de main. On l'a porté là. On ne l'a pas achevé.",
            "Il remonte les six niveaux tout seul, et il a beaucoup de temps pour réfléchir à ce que ça veut dire."],
            effets:{pv:-35, fat:28, xp:25, flag:"kardurak_epargne", issue:"portes_tenues"}, fin:true},
        }}},

    { id:"portes", delai:[1,3], attente:"Il faut remonter dire aux Portes ce qu'on a vu.",
      ev:{ id:"CHK_4", titre:"Ce qu'on rapporte aux Grandes Portes", famille:"NAIN", rarete:"majeur",
        image:"evt2_dette_naine",
        scenes:{
          start:{ texte:[
            "Six niveaux à remonter, et tout le temps de choisir ce qu'on va dire.",
            "Le maître des Grandes Portes attend dans la même salle, debout, exactement comme on l'avait laissé."],
            choix:[
              {label:"Tout dire : le mur, les familles, ce qu'il veut",
               detail:"Requiert d'avoir compris pourquoi il creuse · les Portes devront choisir",
               requis:{flag:"kardurak_raison"}, suite:"tout",
               effets:{issue:"gharok_traite", reputation:{nains:6, peaux_vertes:22}, renom:12}},
              {label:"Dire qu'ils creusent vers les coffres", detail:"C'est faux, et c'est ce que Kar-Durak veut entendre",
               suite:"mensonge",
               effets:{issue:"portes_tenues", reputation:{nains:16, peaux_vertes:-14}, renom:4}},
              {label:"Ne rien dire du mur et toucher son or",
               detail:"On a été payé pour descendre et remonter, rien de plus",
               suite:"muet", effets:{issue:"portes_tenues", reputation:{nains:6}}},
            ]},
          tout:{ fin:true, texte:[
            "Il écoute tout. Le mur, les six cents ans, les familles descendues, les vingt mille bouches.",
            "Il ne dit rien pendant très longtemps. Puis : « Vous savez ce que vous me demandez. »",
            "« Je ne vous demande rien. Je vous rapporte ce que j'ai vu, comme convenu. »",
            "Le conseil des Portes siège onze jours. Au douzième, un émissaire nain descend au niveau moins-sept, pour la première fois depuis six cents ans, avec une proposition écrite.",
            "Ce qui a été signé ne plaît à personne des deux côtés, ce qui est généralement le signe d'un traité qui tient."]},
          mensonge:{ fin:true, texte:[
            "« Ils creusent vers vos coffres. »",
            "Le maître des Portes hoche la tête, soulagé de la manière dont on est soulagé d'apprendre une mauvaise nouvelle qu'on avait déjà rangée.",
            "Kar-Durak mobilise. Trois mille haches descendent au moins-sept en formation serrée, et ce qui s'y passe ensuite n'a pas de nom dans les registres nains — on écrit seulement : *les niveaux profonds ont été assainis.*",
            "Yohan est payé en entier. Il ne redescendra plus jamais à Kar-Durak sans y penser."]},
          muet:{ fin:true, texte:[
            "« Ils sont nombreux, organisés, et ils tiennent le moins-sept. Le reste, il faudra le voir vous-mêmes. »",
            "Le maître des Portes paie sans un mot de plus. Il a acheté le droit de ne pas savoir tout de suite ; il l'a eu.",
            "Ce qui viendra ensuite viendra sans Yohan, et c'était peut-être le but depuis le début."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   08 — LE SANG DANS LES ARCHIVES
   Des généalogies de Parias ont été volées. Plusieurs puissances les cherchent.
   Yohan y figure.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_CHASTEL", type:'contrat', titre:"Le Sang dans les Archives",
  commanditaire:"Maison de Chastel", maison:"Maison de Chastel",
  or:1900, danger:"dangereux", categorie:"récupération", prix:true,
  lieux:["LOC_004","LOC_016","LOC_002"],
  pitch:"Des documents généalogiques sur les Parias ont été volés dans les archives d'une maison qui en avait la garde. Plusieurs puissances les recherchent, et personne ne dit pourquoi.",
  paye:["registres_rendus","registres_brules","registres_gardes"],
  issues:{
    registres_rendus:"Les généalogies des Parias sont retournées aux archives de Chastel, sous scellés.",
    registres_brules:"Les généalogies des Parias ont brûlé. Plus personne ne peut prouver qui descend de qui.",
    registres_gardes:"Quelqu'un détient les généalogies des Parias, et ce quelqu'un est Yohan de Karlsberg.",
    vendues:"Les généalogies des Parias ont été vendues, et l'acheteur ne s'en est pas vanté.",
    abandonnee:"Les généalogies volées à Chastel n'ont jamais été retrouvées.",
    refusee:"Yohan a refusé les termes de Chastel.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"L'archiviste attend de savoir si l'on accepte.",
      ev:{ id:"CHT_1", titre:"Ce que gardait Chastel", famille:"PARIA", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "Dame Célestine de Chastel reçoit dans la salle des archives, entre deux rangées de casiers, et elle ne fait pas semblant de recevoir un mercenaire ordinaire.",
            "« Ma maison garde les généalogies depuis la Purge. Toutes. Y compris celles qu'on a officiellement brûlées. »",
            "Elle ouvre un casier vide. « Onze registres. Volés il y a cinq semaines par quelqu'un qui savait exactement lesquels prendre. »",
            "Elle referme le casier et regarde Yohan bien en face. « Le sixième contient la descendance des Karlsberg. Je vous le dis maintenant, parce que vous l'apprendriez de toute façon et que je préfère que ce soit de moi. »"],
            choix:[
              {label:"Demander qui savait ce que contenaient ces casiers", detail:"Onze registres sur quatre mille",
               suite:"savait"},
              {label:"Demander pourquoi elle n'a pas prévenu la Couronne", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"couronne_ok", echec:"couronne_ko"},
              {label:"Demander ce qu'elle compte faire du sixième", detail:"La seule question qui compte pour lui",
               suite:"sixieme"},
            ]},
          savait:{ texte:[
            "« Moi. Mon père, mort. Deux copistes, dont l'un est parti l'an dernier pour Port-Noir sans donner d'adresse. »",
            "Elle laisse passer un temps. « Et quiconque a lu l'inventaire de 1189, qui a été communiqué à la chancellerie d'Astrah, à la Cour des Lisières, et à trois maisons humaines par courtoisie diplomatique. »",
            "« Autrement dit : à peu près tout le monde qui compte. »"],
            effets:{xp:16, flag:"chastel_copiste"}, suite:"termes"},
          couronne_ok:{ texte:[
            "Elle ne se dérobe pas.",
            "« Parce que la Couronne ferait exactement ce que le voleur a fait : elle prendrait les registres et elle ne les rendrait pas. »",
            "Elle range une pile déjà rangée. « La différence entre une archive et un fichier de proscription tient à une seule chose : qui la détient. Ma maison a passé quarante ans à être cette chose-là. Je n'ai pas envie que ça s'arrête sous moi. »"],
            effets:{xp:20, flag:"chastel_franche"}, suite:"termes"},
          couronne_ko:{ texte:["« Affaire de maison », répond-elle, du ton qui clôt le sujet. C'est ce que dit toute maison qui a quelque chose à cacher, et ce n'est pas une preuve."],
            effets:{xp:5}, suite:"termes"},
          sixieme:{ texte:[
            "« Ce que j'en fais depuis quarante ans : je le garde, et je ne le lis pas. »",
            "Elle croise les mains. « Si vous me le rapportez, je le remets sous scellés. Si vous décidez de le garder, je ne pourrai pas vous en empêcher et je ne le dirai à personne. Si vous le brûlez, personne ne pourra plus jamais prouver que vous êtes qui vous êtes — ni prouver que quiconque est un Paria. »",
            "Un temps. « Les trois me vont. Je préfère la première. Vous n'êtes pas obligé. »"],
            effets:{xp:22, flag:"chastel_choix_offert"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Mille neuf cents écus. Onze registres, ou ce qu'il en reste. »",
            "Elle hésite pour la première fois de l'entretien. « Et vous savez ce que ma maison vous doit par ailleurs. Nous en reparlerons quand vous saurez ce que ces registres contiennent exactement à votre sujet. »"]},
        }}},

    { id:"piste", delai:[2,4], attente:"Un copiste parti sans adresse, c'est déjà une adresse.",
      ev:{ id:"CHT_2", titre:"Le copiste de Port-Noir", famille:"VILLE", rarete:"majeur",
        image:"evt_receleur" ,
        scenes:{
          start:{ texte:[
            "Le copiste tient une échoppe d'écritures sur le quai nord de Port-Noir : contrats de matelot, testaments, lettres pour les illettrés. Il vit mal.",
            "Un homme qui a volé onze registres inestimables il y a cinq semaines et qui vit mal, c'est un homme qui n'a pas encore été payé.",
            "Il lève les yeux quand la porte s'ouvre, et il comprend en une seconde et demie."],
            choix:[
              {label:"Le rassurer et le faire parler", detail:"Jet de Volonté (13)",
               test:{stat:"vol", dc:13}, reussite:"parle_ok", echec:"parle_ko"},
              {label:"Lui acheter ce qu'il sait", detail:"−200 or · il n'a pas été payé, il ne refusera pas",
               requis:{or:200}, suite:"achete", effets:{or:-200}},
              {label:"Le laisser filer et suivre où il court", detail:"Jet d'Agilité (13)",
               test:{stat:"agi", dc:13}, reussite:"suit_ok", echec:"suit_ko"},
            ]},
          parle_ok:{ texte:[
            "Il parle parce que personne ne lui a demandé depuis cinq semaines et que ça pèse.",
            "« On m'a payé la moitié. Onze registres, une liste, et un lieu de dépôt. J'ai livré. On devait me payer le reste au bout d'un mois. »",
            "Il rit sans joie. « Il y a cinq semaines. »",
            "Le lieu de dépôt est un entrepôt du quai sud. Le commanditaire n'a jamais donné de nom, mais il portait des gants en plein été, et il parlait le vardhi avec un accent de la Cour."],
            effets:{xp:24, flags:["chastel_entrepot","chastel_accent_cour"]}, fin:true},
          parle_ko:{ texte:[
            "Il nie, il bafouille, il finit par pleurer, et il ne dit rien d'utilisable parce qu'il a plus peur de ceux qui l'ont payé que de l'homme en face de lui.",
            "En sortant, Yohan remarque qu'il a rangé sa plume avant de pleurer. C'est un homme méthodique. Ça se retrouve."],
            effets:{xp:8}, fin:true},
          achete:{ texte:[
            "Deux cents écus, et il compte deux fois avant de parler, ce qui est exactement ce qu'on attend d'un copiste.",
            "Entrepôt du quai sud, troisième travée. Commanditaire sans nom, gants en plein été, accent de la Cour.",
            "« Ils ne les ont pas déplacés », ajoute-t-il. « Je le saurais. Je suis payé pour tenir le registre d'entrée de cet entrepôt aussi. »"],
            effets:{xp:22, flags:["chastel_entrepot","chastel_accent_cour"]}, fin:true},
          suit_ok:{ texte:[
            "Il sort par l'arrière dans la minute et il marche vite, en regardant deux fois par-dessus son épaule, ce qui est la meilleure façon de se faire suivre.",
            "Il ne va pas à l'entrepôt. Il va frapper à une porte de la ville haute, chez un courtier maritime, et il en ressort avec un visage d'homme qu'on vient de renvoyer.",
            "L'entrepôt, on le trouvera après. Le courtier, lui, sait tout."],
            effets:{xp:26, flags:["chastel_entrepot","chastel_courtier"]}, fin:true},
          suit_ko:{ texte:["Le quai nord est un labyrinthe de ruelles et de passerelles, et un copiste qui y vit depuis un an le connaît mieux qu'un étranger. On le perd en trois tournants."],
            effets:{xp:8, fat:6}, fin:true},
        }}},

    { id:"entrepot", delai:[2,3], attente:"Onze registres tiennent dans une caisse.",
      ev:{ id:"CHT_3", titre:"Troisième travée", famille:"VILLE", rarete:"majeur",
        image:"evt_port_noir",
        scenes:{
          start:{ texte:[
            "L'entrepôt du quai sud sent le chanvre et le poisson séché. La troisième travée contient quarante caisses de morue et une caisse qui n'est pas une caisse de morue.",
            "Elle est là. Onze registres reliés de veau, aux tranches marquées d'un lys de Chastel.",
            "Il y a aussi quelqu'un assis à côté d'elle, sur un tonneau, qui attendait manifestement quelqu'un — pas forcément Yohan, mais quelqu'un."],
            choix:[
              {label:"Demander ce qu'il attend", detail:"Il ne s'est pas levé, ce qui veut dire quelque chose",
               suite:"attend"},
              {label:"Prendre la caisse et sortir", detail:"Jet d'Agilité (14)",
               test:{stat:"agi", dc:14}, reussite:"prend_ok", echec:"prend_ko"},
              {label:"Lire le sixième registre avant toute chose",
               detail:"C'est le sien · on ne repassera peut-être pas",
               suite:"lire"},
            ]},
          attend:{ texte:[
            "« Le second versement », dit-il sans se lever. « Comme le copiste. Comme les deux hommes qui ont porté la caisse. »",
            "Il porte des gants, en plein été.",
            "« On m'a payé pour prendre onze registres et les laisser ici. Rien de plus. Et depuis cinq semaines, personne n'est venu les chercher. »",
            "Il regarde la caisse. « Je commence à croire qu'on ne les voulait pas. On voulait juste qu'ils ne soient plus chez Chastel. »"],
            effets:{xp:28, flags:["chastel_gants","chastel_deplacement"]}, suite:"choix_final"},
          prend_ok:{ texte:[
            "Une caisse de quarante livres, une passerelle, une barque et deux heures de rame.",
            "L'homme au tonneau ne bouge pas. Il regarde partir la caisse comme on regarde partir un problème."],
            effets:{xp:20}, suite:"choix_final"},
          prend_ko:{ texte:[
            "La caisse est plus lourde qu'elle n'en a l'air et l'homme au tonneau n'était pas seul dans l'entrepôt.",
            "Yohan sort avec la caisse et une entaille au flanc, poursuivi sur deux cents mètres de quai par des gens qui n'y tenaient pas beaucoup."],
            effets:{pv:-14, fat:10, xp:14, suspicion:5}, suite:"choix_final"},
          lire:{ texte:[
            "Le sixième registre s'ouvre sur une page de garde où quelqu'un a écrit, à l'encre passée : *branche de Karlsberg — vérifiée, close.*",
            "Elle n'est pas close. Elle continue sur onze pages, dans quatre écritures différentes, jusqu'à une dernière ligne tracée d'une main récente : un prénom, une date de naissance, et la mention *survivant présumé*.",
            "Trois pages plus tôt, une branche cadette dont Yohan n'a jamais entendu parler, à Fort-aux-Princes, avec des descendants notés vivants.",
            "Il n'est pas le dernier. Quelqu'un l'a écrit, et quelqu'un a volé le registre qui le dit."],
            effets:{xp:34, sang:6, flags:["chastel_lu","karlsberg_branche_cadette"]}, suite:"choix_final"},
          choix_final:{ fin:true, texte:[
            "Onze registres dans une caisse, sur un quai, à la nuit tombante.",
            "Ce qu'on en fait n'appartient plus à personne d'autre."]},
        }}},

    { id:"decision", delai:[1,2], attente:"La caisse est là. Il faut trancher.",
      ev:{ id:"CHT_4", titre:"Ce qu'on fait de onze registres", famille:"PARIA", rarete:"majeur",
        image:"evt_paria",
        scenes:{
          start:{ texte:[
            "Onze registres. Toutes les lignées Parias connues de Vardhen, y compris celles qu'on a officiellement brûlées.",
            "Entre les mains de Chastel, c'est une archive. Entre celles d'Astrah, c'est une liste de proscription. Dans le feu, c'est quarante ans de mémoire qui disparaissent — et la preuve que Yohan est qui il est.",
            "Il n'y a pas de bon choix, et c'est probablement pour cela que quelqu'un a payé pour les sortir de leur casier."],
            choix:[
              {label:"Les rendre à Chastel", detail:"Elle les remettra sous scellés, et elle tiendra parole",
               suite:"rendre",
               effets:{issue:"registres_rendus", reputation:{humains:10, parias:6}, renom:6}},
              {label:"Les brûler", detail:"Plus personne ne prouve rien — ni contre vous, ni pour vous",
               suite:"bruler",
               effets:{issue:"registres_brules", reputation:{parias:16, humains:-8}, renom:4,
                       suspicion:-14, flag:"genealogies_brulees"}},
              {label:"Les garder", detail:"Savoir qui sont les Parias vivants est une arme, et elle sera à vous",
               suite:"garder",
               effets:{issue:"registres_gardes", reputation:{parias:-6}, renom:8,
                       suspicion:10, flag:"genealogies_gardees"}},
              {label:"Les vendre à qui les cherche", detail:"+2500 or · quelqu'un paiera, et ce quelqu'un s'en servira",
               suite:"vendre",
               effets:{or:2500, issue:"vendues", reputation:{parias:-30, humains:6}, renom:-10,
                       suspicion:-8, flag:"genealogies_vendues"}},
            ]},
          rendre:{ fin:true, texte:[
            "Dame Célestine les compte un par un, referme le casier, y appose trois sceaux et note la date.",
            "« Voilà », dit-elle. « C'est tout ce que ça devait être. »",
            "Elle paie le contrat en entier. À la porte, elle ajoute une phrase qu'elle a manifestement préparée : « Le sixième registre reste ici, fermé, et je continuerai de ne pas le lire. Mais si un jour vous voulez savoir ce qu'il contient, vous savez où il est et qui en a la clé. »"]},
          bruler:{ fin:true, texte:[
            "Onze registres brûlent lentement, parce que le veau relié brûle mal, dans un four à sécher le poisson du quai sud.",
            "Il reste des cendres et quarante ans de mémoire en moins. Plus personne ne peut prouver qu'un tel descend d'un Paria — ni le prouver contre lui.",
            "Dame Célestine, quand elle l'apprend, met trois jours à répondre. Sa lettre tient en une ligne : *Vous avez fait ce que ma maison n'a jamais osé faire. Je ne sais pas encore si je vous en veux.*",
            "Elle paie quand même."]},
          garder:{ fin:true, texte:[
            "Onze registres partent pour Karlsberg dans une caisse de morue, et ils y resteront.",
            "Yohan sait désormais où vivent les Parias de Vardhen — combien ils sont, sous quels noms, dans quels villages. C'est exactement l'information pour laquelle une maison a payé un copiste, et il l'a.",
            "Dame Célestine ne le dénonce pas. Elle écrit seulement : *Vous avez le casier. Faites-en ce que ma maison en faisait, ou faites-en autre chose. Souvenez-vous que la différence tient à une seule chose : qui le détient.*"]},
          vendre:{ fin:true, texte:[
            "L'homme aux gants revient au troisième jour avec le second versement, et il paie sans discuter, ce qui est le pire signe possible.",
            "Deux mille cinq cents écus, une caisse qui change de mains sur un quai, et onze registres qui partent vers la ville haute.",
            "Ce qu'on en fera ensuite, Yohan ne le saura pas tout de suite. Il le saura par les nouvelles, village après village, pendant les années qui viennent.",
            "Dame Célestine n'écrit pas."]},
        }}},
  ]},

];
