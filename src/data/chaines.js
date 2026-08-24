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

/* ══════════════════════════════════════════════════════════════════════════
   09 — LA GUERRE DE ROCHEBRUNE  ·  une querelle d'héritage devenue guerre privée
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ROCHEBRUNE", type:'contrat', titre:"La Guerre de Rochebrune",
  commanditaire:"Maison Rochebrune", maison:"Maison Rochebrune",
  or:2600, danger:"très dangereux", categorie:"guerre", prix:true,
  lieux:["LOC_004","LOC_018","LOC_011"],
  pitch:"Une querelle d'héritage est devenue une guerre privée. Le commanditaire ne demande pas un assassin : il demande à Yohan de prendre part à la campagne et de briser l'armée de son cousin.",
  paye:["cousin_brise","cousin_epargne","paix_negociee"],
  issues:{
    cousin_brise:"L'armée du cousin de Rochebrune a été brisée aux Champs de Cendre.",
    cousin_epargne:"Le cousin de Rochebrune a rendu les armes et vit encore, ce que personne n'avait prévu.",
    paix_negociee:"Rochebrune et son cousin ont partagé l'héritage plutôt que la terre brûlée.",
    abandonnee:"Yohan a quitté la campagne de Rochebrune avant la bataille.",
    refusee:"Yohan a refusé les termes de Rochebrune.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"L'armée se rassemble, et il faut la rejoindre.",
      ev:{ id:"CHB_1", titre:"Deux versions du même testament", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Le seigneur de Rochebrune reçoit sous une tente de campagne, entouré de cartes et de deux capitaines qui n'ont pas dormi.",
            "« Mon oncle est mort en laissant deux testaments. Le mien est le vrai. Celui de mon cousin est daté de trois jours plus tard et signé d'une main qui tremblait déjà. »",
            "Il montre la carte. « Il tient les hauts. J'ai plus d'hommes. Il a le meilleur terrain. Voilà où nous en sommes depuis quatre mois. »",
            "Il relève la tête. « Je ne cherche pas un assassin. J'en ai déjà envoyé deux et ils sont morts. Je cherche quelqu'un qui casse une armée. »"],
            choix:[
              {label:"Demander à voir les deux testaments", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"testament_ok", echec:"testament_ko"},
              {label:"Demander combien de morts jusqu'ici", detail:"Quatre mois, ça se compte",
               suite:"morts"},
              {label:"Accepter sans commentaire", detail:"Une guerre privée ne demande pas d'avis",
               suite:"termes", effets:{suspicion:-2}},
            ]},
          testament_ok:{ texte:[
            "Les deux sont là, dans un coffret, et le seigneur les sort sans hésiter — ce qui est déjà une réponse.",
            "Le second est authentique. La main tremble, mais c'est bien la sienne, et le notaire est le même. Le vieil homme a changé d'avis trois jours avant de mourir.",
            "« Vous voyez ? » dit le seigneur, qui n'a manifestement jamais fait lire le second à personne. « Il n'était plus lui-même. »"],
            effets:{xp:20, flag:"rochebrune_second_vrai"}, suite:"termes"},
          testament_ko:{ texte:["Deux parchemins, deux sceaux, une écriture qui se ressemble. Yohan n'est pas notaire, et le seigneur le sait."],
            effets:{xp:5}, suite:"termes"},
          morts:{ texte:[
            "Un des capitaines répond avant son seigneur, ce qui en dit long sur l'état de cette maison.",
            "« Quatre cents. Deux cent quarante de notre côté. Trois villages brûlés, dont deux par nous. »",
            "Le seigneur ne le contredit pas. « C'est une guerre », dit-il seulement. « Il n'y en a pas de propres. »"],
            effets:{xp:14, flag:"rochebrune_quatre_cents"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille six cents écus. Vous serez sous mes ordres, mais pas dans ma ligne : vous ferez ce que vous savez faire, où vous jugerez utile. »",
            "Il ajoute, du ton qu'on prend pour une formalité : « Et nous réglerons la coutume avant que vous montiez en selle. Je préfère qu'elle soit derrière nous. »"]},
        }}},

    { id:"conseil", delai:[2,4], attente:"Le conseil de guerre se tient dans trois jours.",
      ev:{ id:"CHB_2", titre:"Le conseil de guerre", famille:"GUERRE", rarete:"majeur",
        image:"evt_lances",
        scenes:{
          start:{ texte:[
            "Neuf hommes autour d'une table, une carte des Champs de Cendre, et quatre mois de rancune accumulée.",
            "Le plan de Rochebrune est frontal : monter la pente, encaisser, rompre la ligne au centre. C'est ce qu'on fait quand on a plus d'hommes et qu'on est pressé.",
            "L'un des capitaines regarde la carte comme on regarde sa propre tombe."],
            choix:[
              {label:"Proposer de tourner les hauts par la vieille carrière",
               detail:"Jet de Précision (13) · plus long, moins cher en hommes",
               test:{stat:"precision", dc:13}, reussite:"carriere_ok", echec:"carriere_ko"},
              {label:"Demander à parler au capitaine qui se tait", detail:"Il sait quelque chose",
               suite:"capitaine"},
              {label:"Approuver le plan frontal", detail:"Ce n'est pas votre armée",
               suite:"frontal"},
            ]},
          carriere_ok:{ texte:[
            "La vieille carrière contourne les hauts par le nord et débouche derrière la ligne du cousin. Elle est impraticable pour une charrette et parfaite pour trois cents hommes à pied.",
            "Rochebrune met une heure à accepter, parce qu'accepter veut dire que son plan était mauvais. Il finit par accepter.",
            "Le capitaine qui se taisait sort de la tente en regardant Yohan une seconde de trop."],
            effets:{xp:24, flag:"rochebrune_carriere"}, fin:true},
          carriere_ko:{ texte:["Le plan est bon et la carte est mauvaise : la carrière s'est effondrée il y a six ans, et deux capitaines le savent. On perd une heure et un peu de crédit."],
            effets:{xp:8}, fin:true},
          capitaine:{ texte:[
            "Il parle dehors, à l'écart des feux, en tenant son casque des deux mains.",
            "« Le cousin a envoyé un homme il y a douze jours. Il propose le partage : les terres hautes à lui, la vallée et le nom à nous. Notre seigneur n'a pas répondu. »",
            "Il regarde la ligne des feux ennemis. « Quatre cents morts pour un nom. Moi j'ai des gens dans les deux camps, messire. »"],
            effets:{xp:22, flags:["rochebrune_partage_propose","rochebrune_capitaine_lassé"]}, fin:true},
          frontal:{ texte:["Le plan reste ce qu'il est. On monte la pente, on encaisse, on rompt au centre. Les capitaines s'en vont préparer leurs hommes sans un mot de plus."],
            effets:{xp:6}, fin:true},
        }}},

    { id:"bataille", delai:[1,3], attente:"On monte à l'aube.",
      ev:{ id:"CHB_3", titre:"Les Champs de Cendre", famille:"GUERRE", rarete:"majeur",
        image:"cg_cendre",
        scenes:{
          start:{ texte:[
            "Deux armées sur une pente grise, à l'aube, avec le brouillard qui tient jusqu'à la troisième heure.",
            "Ce n'est pas une guerre de royaumes : c'est deux cousins qui ont hérité du même homme. Cela ne change rien à ce qui va se passer sur cette pente."],
            choix:[
              {label:"Prendre le commandement", detail:"Requiert une armée · c'est ce pour quoi on est payé",
               suite:"engage"},
              {label:"Proposer une dernière fois le partage",
               detail:"Requiert de savoir que le cousin l'a offert · Jet de Volonté (15)",
               requis:{flag:"rochebrune_partage_propose"}, test:{stat:"vol", dc:15},
               reussite:"paix_ok", echec:"paix_ko"},
            ]},
          engage:{ texte:["Les bannières se lèvent. Rochebrune donne le signal sans regarder personne."],
            bataille:{ def:"BAT_CENDRE", victoire:"gagnee", defaite:"perdue" }},
          paix_ok:{ fin:true, texte:[
            "Il le dit devant les capitaines, à l'aube, alors que les hommes sont déjà en ligne, et c'est précisément pour ça que ça marche.",
            "« Votre cousin vous a offert le partage il y a douze jours. Vos capitaines le savent. Vos hommes le sauront ce soir, d'une façon ou d'une autre. Vous allez les faire monter cette pente en le sachant ? »",
            "Rochebrune ne répond pas pendant très longtemps. Puis il envoie un cavalier.",
            "Le partage est signé à midi sur la pente, entre les deux lignes, par deux cousins qui ne se regardent pas. Les terres hautes à l'un, la vallée et le nom à l'autre.",
            "Quatre cents morts. Il n'y en aura pas d'autres."],
            effets:{xp:70, renom:12, reputation:{humains:16, parias:8},
                    issue:"paix_negociee", flag:"rochebrune_partage"}},
          paix_ko:{ texte:[
            "« Vous n'êtes pas de cette maison », dit Rochebrune, et il le dit assez fort pour que trois capitaines l'entendent.",
            "« Mon oncle est mort. Mon cousin a fabriqué un testament. Et vous, on vous paie pour casser une armée, pas pour porter des messages. »",
            "Le signal part. La pente est grise et les hommes montent."],
            effets:{xp:10}, suite:"engage"},
          gagnee:{ texte:[
            "La ligne du cousin rompt à la quatrième heure, et ce qui suit n'est plus une bataille.",
            "On le prend vivant au pied des hauts, désarmé, avec onze hommes autour de lui qui refusent de s'écarter."],
            effets:{xp:60, renom:14}, suite:"vaincu"},
          perdue:{ fin:true, texte:[
            "La pente était mauvaise, le brouillard a levé trop tôt, et trois cents hommes sont restés dessus.",
            "Rochebrune se retire vers la vallée avec ce qui lui reste. Il paie la moitié du contrat, parce qu'il a promis, et il ne dit pas un mot.",
            "La guerre continuera sans Yohan."],
            effets:{xp:25, renom:-4, issue:"abandonnee"}},
          vaincu:{ texte:[
            "Le cousin a cinquante ans, une blessure au flanc et l'air d'un homme qui a très bien compris comment ça finit.",
            "Rochebrune se tourne vers Yohan. « Vous avez cassé son armée. Le reste vous regarde autant que moi. »"],
            choix:[
              {label:"Le laisser à son cousin", detail:"Ce n'est pas votre héritage",
               suite:"laisse", effets:{issue:"cousin_brise", reputation:{humains:6}, renom:4}},
              {label:"Exiger qu'il vive", detail:"Jet de Volonté (14) · un vaincu vivant est une dette",
               test:{stat:"vol", dc:14}, reussite:"vit_ok", echec:"vit_ko"},
            ]},
          laisse:{ fin:true, texte:[
            "On l'emmène sous la tente de son cousin. Ce qui s'y dit ne sort pas.",
            "Au matin, la maison Rochebrune n'a plus qu'un héritier, et deux mille six cents écus changent de main sans commentaire."]},
          vit_ok:{ fin:true, texte:[
            "« Il a rendu les armes devant trois cents hommes. Si vous l'égorgez, c'est ce qu'on retiendra de vous, pas la bataille. »",
            "Rochebrune le regarde longtemps, puis fait signe qu'on le soigne.",
            "Le cousin passera le reste de sa vie dans une maison de la vallée, sans titre et sans gardes, et il enverra chaque année une lettre à Yohan qu'il ne signera jamais."],
            effets:{issue:"cousin_epargne", reputation:{humains:10, parias:8}, renom:10,
                    flag:"rochebrune_cousin_vivant"}},
          vit_ko:{ fin:true, texte:[
            "« Ce n'est pas votre maison », dit Rochebrune, sans hausser la voix. « Ni votre nom. Ni votre oncle. »",
            "On l'emmène. Yohan touche son or le lendemain matin et prend la route avant que la fosse soit refermée."],
            effets:{issue:"cousin_brise", reputation:{humains:4}, renom:2}},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   10 — LA GORGE VERTE  ·  une armée Peau-Verte remonte vers les routes naines
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_GORGE", type:'contrat', titre:"La Gorge Verte",
  commanditaire:"Un clan allié de Kar-Durak", maison:null,
  or:2200, danger:"très dangereux", categorie:"guerre",
  lieux:["LOC_008","LOC_012","LOC_009"],
  pitch:"Une armée Peau-Verte remonte une gorge qui donne directement accès aux routes naines. Les Nains ont des soldats. Ils manquent de temps et d'informations.",
  paye:["gorge_tenue","gorge_perdue","colonne_deviee"],
  issues:{
    gorge_tenue:"La Gorge Verte a été tenue, et les routes naines sont restées ouvertes.",
    gorge_perdue:"La Gorge Verte est tombée. Kar-Durak a fermé deux portes de plus.",
    colonne_deviee:"La colonne Peau-Verte a été détournée de la Gorge Verte sans qu'on livre bataille.",
    abandonnee:"Personne n'a tenu la Gorge Verte.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Il faut aller voir la gorge de ses yeux.",
      ev:{ id:"CHG_1", titre:"Ce que les Nains n'ont pas le temps de faire", famille:"NAIN", rarete:"majeur",
        image:"evt2_dette_naine",
        scenes:{
          start:{ texte:[
            "Le chef de clan est un Nain trapu de deux cent quarante ans qui parle en regardant une maquette de la gorge taillée dans le calcaire.",
            "« Six mille, peut-être huit. Ils remontent depuis onze jours. À ce rythme, ils sont à la gorge dans trois semaines. »",
            "Il pose un doigt sur la maquette. « Derrière, c'est la route de Hautes-Enclumes. Si elle tombe, quatre clans sont coupés du reste. »",
            "Il relève les yeux. « J'ai deux mille haches. Je peux tenir la gorge. Ce que je ne peux pas faire, c'est savoir ce qu'ils comptent faire. »"],
            choix:[
              {label:"Proposer d'aller voir de près", detail:"Une reconnaissance vaut mille suppositions",
               suite:"termes"},
              {label:"Demander pourquoi ils remontent maintenant", detail:"Onze jours, ça a commencé quelque part",
               suite:"pourquoi"},
              {label:"Demander ce qu'il paiera", detail:"Un Nain aime qu'on parle chiffres",
               suite:"argent"},
            ]},
          pourquoi:{ texte:[
            "« Parce que quelqu'un les rassemble. »",
            "Il gratte la maquette du pouce. « Depuis deux ans, ils ne se battent plus entre eux. Vous savez ce que ça coûte, à un peuple qui se bat entre lui depuis mille ans, d'arrêter ? »",
            "Il se redresse. « Ça coûte quelqu'un qui vaut la peine qu'on l'écoute. Et ça, ça m'inquiète bien plus que huit mille haches. »"],
            effets:{xp:16, flag:"gorge_federation"}, suite:"termes"},
          argent:{ texte:[
            "« Deux mille deux cents. Payés à la fin, en pièces frappées, pas en promesses. »",
            "Il ajoute : « Et nous ne payons pas en femmes. Je sais que les maisons humaines le font avec vous. Chez nous, une dette se paie en métal ou en sang, et jamais en gens. »"],
            effets:{xp:8}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Vous descendez, vous regardez, vous remontez. Ensuite nous décidons ensemble, et si nous décidons de tenir la gorge, vous y serez avec nous. »",
            "Il repose son ciseau à pierre. « Un homme qui donne un conseil doit être là quand le conseil se paie. »"]},
        }}},

    { id:"reconnaissance", delai:[2,4], attente:"La colonne remonte, et il faut la voir.",
      ev:{ id:"CHG_2", titre:"Ce qui remonte la gorge", famille:"PEAU_VERTE", rarete:"majeur",
        image:"evt_tambours",
        scenes:{
          start:{ texte:[
            "Quatre jours de crête au-dessus de la gorge, à plat ventre dans les genévriers, à compter.",
            "Ce n'est pas une horde. Une horde se voit à trois lieues et s'entend à cinq. Ceci avance en colonne, avec des éclaireurs sur les flancs, un train de bagages au centre, et des feux éteints avant l'aube.",
            "Et derrière les guerriers, sur deux cents pas, des vieux, des femelles et des petits."],
            choix:[
              {label:"Prendre un éclaireur vivant", detail:"Jet d'Agilité (14)",
               test:{stat:"agi", dc:14}, reussite:"prise_ok", echec:"prise_ko"},
              {label:"Suivre le train de bagages", detail:"Jet de Précision (13) · ce qu'on emporte dit où l'on va",
               test:{stat:"precision", dc:13}, reussite:"bagage_ok", echec:"bagage_ko"},
              {label:"Compter et remonter", detail:"Un chiffre exact vaut mieux qu'une intuition",
               suite:"compte", effets:{xp:12, fat:8}},
            ]},
          prise_ok:{ texte:[
            "Un éclaireur isolé sur le flanc est, une main sur la bouche, et cinquante pas dans les genévriers.",
            "Il parle vite, parce qu'il croit qu'on va le tuer et qu'il a des choses à dire avant.",
            "« On passe. On passe seulement. La gorge, c'est le chemin, pas le but. Le chef dit : au-delà, il y a de la place. »",
            "Il ajoute, comme si c'était une évidence : « Les Nains vont nous bloquer. Ils bloquent toujours. Et après ils diront que c'est nous. »"],
            effets:{xp:26, flags:["gorge_passage","gorge_familles"]}, fin:true},
          prise_ko:{ texte:["L'éclaireur crie. Il faut décrocher par la crête et attendre la nuit, et la colonne double ses flancs pour le reste de la remontée."],
            effets:{fat:12, xp:10}, fin:true},
          bagage_ok:{ texte:[
            "Le train de bagages n'est pas un train de guerre. Il n'y a ni béliers, ni échelles, ni machines.",
            "Il y a des sacs de grain, des outils, des peaux, et deux charrettes chargées de ce qui ressemble à des semences.",
            "Une armée qui vient prendre une gorge n'emporte pas de semences. Une armée qui déménage, si."],
            effets:{xp:24, flags:["gorge_passage","gorge_familles"]}, fin:true},
          bagage_ko:{ texte:["Le train est bien gardé et la crête s'arrête net au-dessus. On voit des charrettes bâchées, et une charrette bâchée peut contenir n'importe quoi."],
            effets:{xp:8}, fin:true},
          compte:{ texte:[
            "Sept mille quatre cents, à trois cents près. Quatre jours de comptage et un dos qui ne se déplie plus.",
            "Le chiffre est bon, et un chiffre bon vaut une bataille de moins ou une bataille mieux menée."],
            effets:{flag:"gorge_chiffre"}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"Deux mille haches attendent une réponse.",
      ev:{ id:"CHG_3", titre:"Tenir, ou ouvrir", famille:"NAIN", rarete:"majeur",
        image:"cg_kardurak",
        scenes:{
          start:{ texte:[
            "Le chef de clan écoute tout, sans interrompre, en tournant son ciseau à pierre entre deux doigts.",
            "Puis il pose la question qu'il fallait bien poser : « Alors ? On tient, ou on ouvre ? »"],
            choix:[
              {label:"Tenir la gorge", detail:"Deux mille haches sur un défilé étroit : c'est jouable",
               suite:"tenir"},
              {label:"Les laisser passer, sous escorte naine",
               detail:"Requiert de savoir qu'ils ne font que passer · aucun Nain ne l'a jamais fait",
               requis:{flag:"gorge_passage"}, test:{stat:"vol", dc:15},
               reussite:"ouvrir_ok", echec:"ouvrir_ko"},
              {label:"Rendre l'avance et s'en aller", detail:"Ce n'est pas votre gorge",
               suite:"partir", effets:{issue:"abandonnee", reputation:{nains:-14}, renom:-6}},
            ]},
          tenir:{ texte:[
            "Deux mille haches en travers d'un défilé de quarante pas, trois lignes profondes, et l'ordre de ne pas céder un pouce.",
            "Ils arrivent au douzième jour."],
            bataille:{ def:"BAT_DEFILE", victoire:"tenue", defaite:"tombee" }},
          tenue:{ fin:true, texte:[
            "La gorge tient. Elle tient parce qu'elle est étroite, parce que les Nains ne reculent pas, et parce que quelqu'un avait donné le bon chiffre.",
            "Au troisième jour, la colonne se retire vers le sud, en emmenant ses vieux et ses petits, et laisse onze cents morts dans le défilé.",
            "Le chef de clan paie en pièces frappées, comme promis. Il ne dit pas merci — les Nains ne disent pas merci — mais il fait graver le nom de Yohan sur le linteau du poste de garde, ce qui est mieux."],
            effets:{xp:70, renom:16, reputation:{nains:22, peaux_vertes:-18}, issue:"gorge_tenue"}},
          tombee:{ fin:true, texte:[
            "La troisième ligne cède avant midi et la gorge se vide en une heure.",
            "Kar-Durak ferme Hautes-Enclumes et deux portes de plus dans le mois. Quatre clans sont coupés pour une génération.",
            "Le chef de clan paie quand même. « Vous étiez là », dit-il. « C'est ce qui avait été convenu. »"],
            effets:{xp:35, renom:-6, reputation:{nains:-8}, issue:"gorge_perdue"}},
          ouvrir_ok:{ fin:true, texte:[
            "Il faut deux jours pour convaincre un Nain de deux cent quarante ans de laisser passer sept mille Peaux-Vertes sur sa route.",
            "Ce qui le décide n'est pas l'argument militaire : ce sont les semences. « On ne plante pas ce qu'on vient brûler », finit-il par dire, à contrecœur.",
            "Quatre cents haches escortent la colonne pendant onze jours, à cent pas, sans qu'un coup soit échangé. C'est la première fois depuis mille ans.",
            "Deux clans nains cesseront de parler à celui-là. Le chef le savait avant de dire oui."],
            effets:{xp:60, renom:12, reputation:{nains:-6, peaux_vertes:26}, issue:"colonne_deviee",
                    flag:"gorge_ouverte"}},
          ouvrir_ko:{ texte:[
            "« Vous me demandez d'ouvrir une route naine à sept mille Peaux-Vertes sur la parole d'un éclaireur qu'on a tenu par la gorge. »",
            "Il repose son ciseau. « Non. »",
            "Deux mille haches se mettent en travers du défilé le lendemain matin."],
            suite:"tenir"},
          partir:{ fin:true, texte:[
            "Il rend l'avance et il s'en va. Le chef de clan ne discute pas et ne le raccompagne pas.",
            "La gorge sera tenue ou perdue sans lui, et il ne saura ce qui s'y est passé que par les nouvelles, six mois plus tard."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   11 — LE WYRM AVEUGLE  ·  quelque chose d'ancien s'est réveillé sous une forteresse
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_WYRM", type:'contrat', titre:"Le Wyrm aveugle",
  commanditaire:"Charles de Mont-Draken", maison:null,
  or:3000, danger:"extrême", categorie:"chasse",
  lieux:["LOC_003","LOC_012"],
  pitch:"Quelque chose d'ancien s'est réveillé sous une forteresse. Charles ne demande pas de sauver les pierres : il veut savoir si la créature peut atteindre les vallées humaines.",
  paye:["wyrm_tue","wyrm_muré","wyrm_libre"],
  issues:{
    wyrm_tue:"Le Wyrm aveugle est mort sous Mont-Draken. Charles a fait combler la galerie par-dessus.",
    "wyrm_muré":"Le Wyrm aveugle a été muré vivant sous Mont-Draken. On l'entend encore, certaines nuits.",
    wyrm_libre:"Le Wyrm aveugle est descendu vers les vallées. Trois villages ont été évacués.",
    abandonnee:"Personne n'est redescendu sous Mont-Draken.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Charles attend qu'on descende.",
      ev:{ id:"CHW_1", titre:"Ce que Charles veut savoir", famille:"POLITIQUE", rarete:"majeur",
        image:"rc_charles",
        scenes:{
          start:{ pnj:"charles", texte:[
            "Charles de Mont-Draken reçoit debout, dans une salle d'armes, avec la carte des vallées basses étalée sur une table à tréteaux.",
            "« Une galerie s'est ouverte sous la forteresse en février. Quelque chose est monté dedans. Nous avons perdu neuf hommes en trois descentes. »",
            "Il ne dramatise pas. C'est ce qui le rend crédible.",
            "« Je me moque de la forteresse. Ce que je veux savoir tient en une phrase : est-ce que cette chose peut atteindre les vallées ? Si oui, je vide trois villages avant l'hiver. Si non, je mure et je passe à autre chose. »"],
            choix:[
              {label:"Demander ce que les neuf ont vu", detail:"Neuf hommes, ça laisse des récits",
               suite:"neuf"},
              {label:"Demander pourquoi il ne mure pas tout de suite", detail:"C'est la solution évidente",
               suite:"mure"},
              {label:"Accepter", detail:"Il a posé la question juste",
               suite:"termes"},
            ]},
          neuf:{ pnj:"charles", texte:[
            "« Trois sont revenus. Aucun ne l'a vue. »",
            "Il laisse ça poser. « Ils ont senti l'air bouger. Ils ont entendu quelque chose de très gros se déplacer sans faire de bruit. Et l'un d'eux dit que sa lanterne s'est éteinte sans souffle, trois fois, toujours au même endroit. »",
            "« Elle est aveugle. Nous en sommes à peu près sûrs. Ce qui veut dire qu'elle n'a pas besoin de voir. »"],
            effets:{xp:16, flag:"wyrm_aveugle"}, suite:"termes"},
          mure:{ pnj:"charles", texte:[
            "« Parce que murer une galerie qu'on n'a pas explorée, c'est parier que c'est la seule. »",
            "Il pose un doigt sur la carte. « Sous Mont-Draken, il y a de la roche creuse sur quatre lieues. Si je mure ici et qu'elle sort là, j'aurai transformé une question en catastrophe. »"],
            effets:{xp:14}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Trois mille. Et si vous redescendez sans réponse, je paie quand même : je paie la descente, pas le résultat. »",
            "Il roule la carte. « Je n'ai pas d'or à vous faire perdre et je n'ai pas de femme à vous offrir. Ma maison ne pratique pas la coutume et ne la pratiquera pas. Si cela vous pose un problème, dites-le maintenant. »"]},
        }}},

    { id:"galeries", delai:[2,4], attente:"La galerie est ouverte, et elle attend.",
      ev:{ id:"CHW_2", titre:"Sous la forteresse", famille:"ONDE", rarete:"majeur",
        image:"evt_tunnel",
        scenes:{
          start:{ texte:[
            "La galerie de février n'est pas une galerie : c'est une fissure ouverte dans une salle basse, assez large pour un homme, et l'air qui en sort est tiède.",
            "Deux cents pas plus bas, elle débouche dans quelque chose qui n'a pas été creusé par des mains. Les parois sont polies, ondulées, comme un boyau.",
            "La lanterne éclaire à six pas et pas un de plus. Au-delà, ce n'est pas noir : c'est vide."],
            choix:[
              {label:"Avancer en comptant les pas", detail:"Jet de Volonté (14) · pour savoir revenir",
               test:{stat:"vol", dc:14}, reussite:"compte_ok", echec:"compte_ko"},
              {label:"Chercher d'où l'air arrive", detail:"Jet de Précision (14) · l'air tiède vient de quelque part",
               test:{stat:"precision", dc:14}, reussite:"air_ok", echec:"air_ko"},
              {label:"Éteindre la lanterne et écouter", detail:"Elle est aveugle. Autant l'être aussi.",
               suite:"noir"},
            ]},
          compte_ok:{ texte:[
            "Onze cents pas de boyau, en pente douce, toujours vers le sud. Vers les vallées.",
            "À onze cents pas, le boyau s'élargit en une salle où l'on tient debout, et où le sol est jonché d'ossements polis — pas rongés : polis, comme des galets.",
            "Elle avale, elle digère, elle recrache. Elle fait ça depuis très longtemps."],
            effets:{xp:26, flags:["wyrm_vers_le_sud","wyrm_salle"]}, fin:true},
          compte_ko:{ texte:["Au bout de quatre cents pas, il n'est plus certain d'avoir compté juste, et un homme qui n'est plus certain de savoir revenir remonte. C'est la bonne décision et elle coûte quand même quelque chose."],
            effets:{fat:14, xp:10}, fin:true},
          air_ok:{ pnj:"charles", texte:[
            "L'air tiède ne vient pas du fond : il vient d'en dessous, par une centaine de fissures dans le sol du boyau, régulièrement espacées.",
            "Ce ne sont pas des fissures. C'est une respiration. Le boyau lui-même est vivant, ou l'a été.",
            "Ce que Charles appelle un wyrm n'habite pas cette galerie. Cette galerie *est* le wyrm, ou ce qu'il en reste, et quelque chose de plus petit vit dedans."],
            effets:{xp:30, flags:["wyrm_galerie_vivante"]}, fin:true},
          air_ko:{ texte:["L'air est tiède partout et vient de nulle part. Deux heures à tâter des parois pour n'en rien tirer, sinon que la roche est chaude au toucher."],
            effets:{xp:8, fat:10}, fin:true},
          noir:{ texte:[
            "Il éteint. Le noir sous la terre n'est pas une absence de lumière : c'est une matière.",
            "Au bout de dix minutes, il l'entend. Ce n'est pas un déplacement : c'est un frottement continu, très lent, à quarante ou cinquante pas, qui va du sud vers le nord.",
            "Elle remonte. Elle remonte vers la forteresse, lentement, et elle le fait sans doute depuis février."],
            effets:{xp:28, fat:14, flag:"wyrm_remonte"}, fin:true},
        }}},

    { id:"choix", delai:[1,3], attente:"Charles attend une réponse, pas un rapport.",
      ev:{ id:"CHW_3", titre:"La réponse à la question de Charles", famille:"ONDE", rarete:"majeur",
        image:"evt2_ossements",
        scenes:{
          start:{ texte:[
            "Il faut redescendre pour trancher, et cette fois avec l'intention d'en finir.",
            "Elle est dans la salle aux ossements polis. Elle fait la longueur de trois chariots et elle n'a pas d'yeux — pas de cavités, pas de cicatrices : elle n'en a jamais eu."],
            choix:[
              {label:"L'affronter", detail:"Elle est aveugle. C'est le seul avantage disponible.",
               suite:"combat"},
              {label:"Faire sauter la voûte du boyau au-dessus d'elle",
               detail:"Requiert de savoir où mène le boyau · −400 or de poudre naine",
               requis:{flag:"wyrm_vers_le_sud", or:400}, suite:"murer", effets:{or:-400}},
              {label:"Remonter et dire à Charles de vider les villages",
               detail:"C'est la réponse honnête si l'on ne peut pas la tuer",
               suite:"vider", effets:{issue:"wyrm_libre", reputation:{humains:-6}, renom:2}},
            ]},
          combat:{ texte:["Elle sait exactement où il est depuis qu'il est entré dans la salle. L'obscurité ne le protège de rien."],
            combat:{ groupe:[{bst:"BST_016", n:1}, {bst:"BST_015", n:2}], victoire:"morte", defaite:"fuite", mortel:true }},
          morte:{ fin:true, pnj:"charles", texte:[
            "Elle met une demi-heure à mourir et elle ne crie pas une seule fois.",
            "Charles fait combler le boyau sur trois cents pas, et grave la date sur le linteau de la salle basse. Il paie en entier et ne pose aucune question sur la façon dont un homme seul a tué ça.",
            "« Je note ce genre de chose », dit-il seulement. « Pas pour vous nuire. Pour savoir à qui écrire, un jour, quand j'aurai un vrai problème. »"],
            effets:{xp:80, sang:12, renom:16, suspicion:10, issue:"wyrm_tue",
                    flag:"charles_note_yohan"}},
          fuite:{ fin:true, pnj:"charles", texte:[
            "Elle le prend en travers du dos et il fait onze cents pas dans le noir sans se rappeler comment.",
            "Il ressort à l'aube, sanglant, et il dit à Charles la seule chose qu'il peut honnêtement dire : « Videz les villages. »"],
            effets:{pv:-40, fat:30, xp:25, issue:"wyrm_libre"}},
          murer:{ fin:true, pnj:"charles", texte:[
            "Quatre cents écus de poudre naine, posés dans les fissures de la voûte à onze cents pas, et une mèche de trente pieds.",
            "La voûte descend sur soixante pas de boyau, et ce qui est dessous n'en sortira pas par là.",
            "Charles fait murer l'entrée par-dessus, par principe. « Vous ne l'avez pas tuée », dit-il en payant. « Vous avez répondu à ma question, ce que je vous avais demandé. »",
            "Certaines nuits d'hiver, la garnison de Mont-Draken entend quelque chose de très gros se retourner sous la pierre. On a cessé de le noter au registre."],
            effets:{xp:55, renom:10, issue:"wyrm_muré", flag:"wyrm_sous_mont_draken"}},
          vider:{ fin:true, pnj:"charles", texte:[
            "Charles écoute, hoche la tête, et donne l'ordre dans l'heure. Trois villages sont vidés avant l'hiver, sans un mort.",
            "Il paie en entier. « C'est ce que j'avais acheté », dit-il. « Une réponse. Elle est mauvaise, mais elle est arrivée à temps. »"]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   12 — LE DRAGON ET LA DOT
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_BELLAC", type:'contrat', titre:"Le Dragon et la Dot",
  commanditaire:"Maison de Bellac", maison:"Maison de Bellac",
  or:2300, danger:"très dangereux", categorie:"chasse", prix:true,
  lieux:["LOC_016","LOC_010","LOC_011"],
  pitch:"Un dragon s'est installé sur la route qu'un cortège matrimonial doit emprunter dans cinq semaines. Reporter l'union déclencherait une crise politique que trois maisons ne veulent pas.",
  paye:["route_libre","route_contournee","union_reportee"],
  issues:{
    route_libre:"La route de Bellac a été dégagée, et le cortège est passé à l'heure.",
    route_contournee:"Le cortège de Bellac a pris la côte. Six jours de plus, et personne n'est mort.",
    union_reportee:"L'union de Bellac a été reportée, et trois maisons ont recommencé à compter leurs hommes.",
    abandonnee:"Personne n'a dégagé la route de Bellac.",
    refusee:"Yohan a refusé les termes de Bellac.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Cinq semaines, et le cortège n'attendra pas.",
      ev:{ id:"CHD_1", titre:"Cinq semaines", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Dame Rosamonde de Bellac gouverne au nom d'un enfant de six ans et reçoit avec un calendrier ouvert sur les genoux.",
            "« Ma pupille — ma nièce, vingt-deux ans — épouse le second fils de Torcy dans cinq semaines. Le contrat est signé, la dot est levée, et trois maisons ont accepté de ne pas se faire la guerre à cause de ce mariage. »",
            "Elle referme le calendrier. « Depuis onze jours, un dragon dort sur la route de la Combe. C'est la seule route carrossable. Un cortège matrimonial ne passe pas par les sentiers de chèvre : ce serait une insulte, et l'insulte coûterait exactement ce que le mariage devait éviter. »"],
            choix:[
              {label:"Demander pourquoi il s'est installé là", detail:"Onze jours, c'est récent",
               suite:"pourquoi"},
              {label:"Demander ce qu'il y a sur la côte", detail:"Il y a toujours une autre route",
               suite:"cote"},
              {label:"Accepter", detail:"Cinq semaines, ça se compte",
               suite:"termes"},
            ]},
          pourquoi:{ texte:[
            "« Personne ne sait. Il dort. Il n'attaque rien, il ne brûle rien, il dort en travers de la route sur trente pas. »",
            "Elle hésite, puis : « Le passeur de la Combe dit qu'il saigne. Qu'il y a du sang séché sur le flanc gauche et que ça sent mauvais. »",
            "Elle ne sait pas si ça arrange les choses ou si ça les aggrave. Yohan non plus."],
            effets:{xp:16, flag:"bellac_dragon_blesse"}, suite:"termes"},
          cote:{ texte:[
            "« Six jours de plus, deux gués, et la Côte des Dents. »",
            "Elle croise les mains. « Torcy prendrait ça pour une reculade. Et six jours de plus, c'est six jours pendant lesquels trois maisons peuvent changer d'avis. »",
            "Un temps. « Cela dit, six jours de plus valent mieux qu'un cortège brûlé. Je ne suis pas déraisonnable ; je suis pressée. »"],
            effets:{xp:12, flag:"bellac_route_cote"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille trois cents écus. La route dégagée avant le vingt-troisième jour du mois. »",
            "Elle ajoute, très droite : « Et je tiens ma maison à bout de bras pour un enfant de six ans. Nous parlerons de la coutume, puisqu'il le faut, mais vous comprendrez que je regarde d'abord ce que ça coûte à mon fils. »"]},
        }}},

    { id:"combe", delai:[2,4], attente:"La Combe est à quatre jours.",
      ev:{ id:"CHD_2", titre:"Ce qui dort en travers de la route", famille:"VOYAGE", rarete:"majeur",
        image:"evt2_ossements",
        scenes:{
          start:{ texte:[
            "Il dort. C'est la première chose et c'est la plus dérangeante : trente pas de dragon en travers d'une route de terre battue, la tête sur les pattes, et une respiration qu'on entend à deux cents mètres.",
            "Le flanc gauche est ouvert sur trois pieds. La plaie est vieille de plusieurs semaines et elle est noire.",
            "Ce n'est pas un dragon qui tient une route. C'est un dragon qui n'a pas la force d'aller plus loin."],
            choix:[
              {label:"Le tuer pendant qu'il dort", detail:"Ce sera plus facile que jamais, et jamais facile",
               suite:"combat"},
              {label:"Examiner la plaie", detail:"Jet de Précision (13) · à douze pas d'un dragon endormi",
               test:{stat:"precision", dc:13}, reussite:"plaie_ok", echec:"plaie_ko"},
              {label:"Attendre qu'il se réveille et voir", detail:"Jet de Volonté (14) · une nuit entière assis sur une pierre",
               test:{stat:"vol", dc:14}, reussite:"eveil_ok", echec:"eveil_ko"},
            ]},
          combat:{ texte:["Il se réveille au troisième pas, parce qu'un dragon blessé dort mal."],
            combat:{ groupe:[{bst:"BST_010", n:1}], victoire:"tue", defaite:"chasse", mortel:true }},
          tue:{ texte:[
            "Il meurt mal, et longuement, parce qu'il était déjà en train de mourir.",
            "Il faut onze jours et quarante paires de bœufs pour dégager trente pas de route."],
            effets:{xp:60, sang:8, issue:"route_libre", renom:12, reputation:{humains:10}}, fin:true},
          chasse:{ texte:[
            "Un dragon mourant reste un dragon. Yohan décroche à cent pas de la route avec une brûlure au bras qui laissera une marque.",
            "Il redescend annoncer à Bellac que la route n'est pas dégageable."],
            effets:{pv:-30, fat:20, xp:20, issue:"union_reportee"}, fin:true},
          plaie_ok:{ texte:[
            "Ce n'est pas une plaie de combat. C'est une plaie de harpon : l'entrée est nette, ronde, et il reste une pointe de fer barbelée à trois doigts sous l'écaille.",
            "Un harpon de baleinier. On tire ça depuis un pont de navire.",
            "Il n'est pas venu tenir une route. Il est venu s'échouer, comme une bête qui remonte mourir loin de l'eau."],
            effets:{xp:26, flags:["bellac_harpon","bellac_dragon_blesse"]}, fin:true},
          plaie_ko:{ texte:["À douze pas d'un dragon endormi, on voit ce qu'on peut voir et on recule quand la respiration change de rythme. La plaie est noire, large, et c'est tout ce qu'on saura."],
            effets:{xp:8, fat:8}, fin:true},
          eveil_ok:{ texte:[
            "Il se réveille avant l'aube. Il ne charge pas, il ne rugit pas : il essaie de se lever, trois fois, et il n'y arrive pas.",
            "À la quatrième, il y arrive à moitié, avance de vingt pas vers l'est, et se recouche.",
            "Il ne tient pas la route. Il la traverse, à raison de vingt pas par nuit, en direction des hauteurs. Dans cinq semaines, il ne sera plus là."],
            effets:{xp:28, flag:"bellac_il_avance"}, fin:true},
          eveil_ko:{ texte:["Il tient trois heures, puis le froid et la peur ont raison de lui et il se replie dans les rochers. Le dragon dort toujours au matin."],
            effets:{fat:12, xp:8}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"Bellac veut savoir si le cortège part.",
      ev:{ id:"CHD_3", titre:"Ce qu'on répond à une régente pressée", famille:"POLITIQUE", rarete:"majeur",
        image:"is_invitation",
        scenes:{
          start:{ texte:[
            "Trois semaines avant le cortège. Dame Rosamonde a le calendrier ouvert et les yeux d'une femme qui n'a pas dormi.",
            "Ce qu'on va lui dire décide d'un mariage, d'une dot, et de trois maisons qui comptent leurs hommes."],
            choix:[
              {label:"Dire que la route sera libre à temps",
               detail:"Requiert de savoir qu'il avance · c'est vrai, et c'est un pari",
               requis:{flag:"bellac_il_avance"}, suite:"attendre",
               effets:{issue:"route_libre", reputation:{humains:12}, renom:8}},
              {label:"Retirer le harpon et le soigner",
               detail:"Requiert d'avoir vu le harpon · Jet de Volonté (15) · c'est absurde et c'est faisable",
               requis:{flag:"bellac_harpon"}, test:{stat:"vol", dc:15},
               reussite:"soigne_ok", echec:"soigne_ko"},
              {label:"Conseiller la route de la côte", detail:"Six jours de plus, aucun mort",
               suite:"cote", effets:{issue:"route_contournee", reputation:{humains:4}, renom:3}},
              {label:"Conseiller de reporter", detail:"La solution sûre, et la plus chère politiquement",
               suite:"reporte", effets:{issue:"union_reportee", reputation:{humains:-8}, renom:-4}},
            ]},
          attendre:{ fin:true, texte:[
            "« Il avance de vingt pas par nuit vers l'est. Dans trois semaines, il sera dans les hauteurs. Faites partir votre cortège au jour dit. »",
            "Elle le regarde comme on regarde quelqu'un qui vient de vous demander de parier une province.",
            "Le cortège passe le vingt-troisième jour. La route est vide depuis quatre jours. On voit, très haut sur le versant est, quelque chose d'immense qui ne bouge plus.",
            "Dame Rosamonde paie en entier et ajoute : « Je n'ai pas dormi pendant trois semaines. C'est le plus beau service qu'on m'ait rendu. »"]},
          soigne_ok:{ fin:true, texte:[
            "Un harpon barbelé de baleinier, à trois doigts sous l'écaille, sur une bête de trente pas qui pourrait le tuer d'un mouvement d'épaule.",
            "Il faut quatre jours pour l'approcher, deux pour qu'il tolère la main, et une matinée entière pour arracher le fer avec une chaîne et un treuil de charretier.",
            "Le dragon se lève le sixième jour. Il regarde longuement l'homme en bas, sans rien exprimer que Yohan puisse lire, puis il s'en va vers l'est et ne revient pas.",
            "La route est libre. Le cortège passe. Et quelque part au-dessus de la Combe, quelque chose de très vieux sait à quoi ressemble un Paria."],
            effets:{xp:70, sang:12, renom:14, reputation:{humains:10}, suspicion:8,
                    issue:"route_libre", flag:"dragon_de_la_combe_sauve"}},
          soigne_ko:{ texte:[
            "Il tolère la main pendant quatre jours et pas le cinquième. Le treuil part en morceaux, Yohan avec, et il faut ramper cinquante pas sous la pluie de ferraille.",
            "Le dragon se rendort. La plaie est toujours noire et le cortège est dans deux semaines."],
            effets:{pv:-25, fat:22, xp:20}, suite:"cote"},
          cote:{ fin:true, texte:[
            "Le cortège prend la Côte des Dents : six jours de plus, deux gués, et un passage sous les falaises où l'on ne parle pas fort.",
            "Torcy fait remarquer le retard par écrit, dans une lettre d'une politesse exacte. Le mariage se célèbre avec neuf jours de décalage et une froideur que les deux maisons mettront trois ans à oublier.",
            "Personne n'est mort. Dame Rosamonde paie en entier et ne commente pas."]},
          reporte:{ fin:true, texte:[
            "L'union est reportée au printemps. La dot reste levée, ce qui coûte à Bellac quatre mois d'intérêts.",
            "Trois maisons recommencent à compter leurs hommes dès la semaine suivante. Ce n'est pas la guerre — c'est ce qu'on fait juste avant.",
            "Dame Rosamonde paie la moitié. « Vous m'avez dit la vérité », dit-elle. « Je ne peux pas vous payer le prix d'une solution pour un constat. »"]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   13 — LA TOUR DES CORBEAUX
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_AUBREMONT", type:'contrat', titre:"La Tour des Corbeaux",
  commanditaire:"Maison d'Aubremont", maison:"Maison d'Aubremont",
  or:1800, danger:"dangereux", categorie:"récupération", prix:true,
  lieux:["LOC_002","LOC_012","LOC_011"],
  pitch:"Une tour frontalière tenue par des renégats contrôle le passage d'une armée. Ils étaient de la garnison il y a huit mois, et personne ne veut expliquer pourquoi ils ne le sont plus.",
  paye:["tour_reprise","tour_rendue","tour_brulee"],
  issues:{
    tour_reprise:"La Tour des Corbeaux a été reprise d'assaut, et la colonne est passée.",
    tour_rendue:"Les renégats de la Tour des Corbeaux ont rendu la place et obtenu ce qu'on leur devait.",
    tour_brulee:"La Tour des Corbeaux a brûlé avec ce qu'elle contenait.",
    abandonnee:"La Tour des Corbeaux tient toujours le passage.",
    refusee:"Yohan a refusé les termes d'Aubremont.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"La colonne attend au sud, et elle compte les jours.",
      ev:{ id:"CHU_1", titre:"Ceux qui étaient de la garnison", famille:"GUERRE", rarete:"majeur",
        image:"evt_lances",
        scenes:{
          start:{ texte:[
            "Dame Sibylle d'Aubremont commande six tours frontalières et reçoit dans la cinquième, debout sur un chemin de ronde balayé par le vent.",
            "« La sixième est tenue contre moi depuis huit mois. Vingt-trois hommes. Ils étaient de ma garnison. »",
            "Elle laisse le vent remplir le silence. « Une colonne de quinze cents hommes doit passer le col dans six semaines. La Tour des Corbeaux verrouille le col. »"],
            choix:[
              {label:"Demander pourquoi ils se sont mutinés", detail:"Huit mois, c'est long pour un caprice",
               suite:"pourquoi"},
              {label:"Demander ce qu'elle a déjà tenté", detail:"Six tours, une capitaine, huit mois",
               suite:"tente"},
              {label:"Accepter", detail:"Une tour, vingt-trois hommes, six semaines",
               suite:"termes"},
            ]},
          pourquoi:{ texte:[
            "Elle met du temps, et ce qu'elle dit, elle ne l'a manifestement dit à personne.",
            "« Vingt-deux mois de solde impayée. Mon frère tient les comptes de la maison. Il a détourné les soldes des tours pendant deux ans pour couvrir autre chose. »",
            "Elle regarde le col. « Je l'ai appris après la mutinerie. Ils avaient raison. Ça ne change rien à ce que je dois faire. »"],
            effets:{xp:22, flag:"aubremont_solde"}, suite:"termes"},
          tente:{ texte:[
            "« Deux assauts. Onze morts chez moi, quatre chez eux. Une tour frontalière est faite pour tenir contre une armée : elle tient très bien contre soixante hommes. »",
            "Elle ajoute : « Et un parlementaire. Il est ressorti avec une liste de doléances que je n'ai pas pu satisfaire. »"],
            effets:{xp:14, flag:"aubremont_doleances"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Mille huit cents écus. La tour ouverte avant que la colonne arrive. Comment, je m'en moque. »",
            "Elle se tourne enfin vers lui. « Et je sais ce que ma maison doit à quelqu'un comme vous. Nous en parlerons ce soir, et pas sur un chemin de ronde. »"]},
        }}},

    { id:"tour", delai:[2,4], attente:"La tour est au bout du col, et elle voit venir.",
      ev:{ id:"CHU_2", titre:"Vingt-trois hommes et une porte", famille:"GUERRE", rarete:"majeur",
        image:"evt_peage",
        scenes:{
          start:{ texte:[
            "La Tour des Corbeaux fait quarante pieds, sur un éperon, avec une porte unique et un puits intérieur. Elle a été bâtie pour tenir un an contre mille hommes.",
            "Il y a du linge qui sèche sur le chemin de ronde. Des gens vivent là.",
            "Un homme sort sur le parapet quand Yohan apparaît au bas du col, et il crie, sans hostilité particulière : « Vous êtes le troisième. Les deux autres sont enterrés là-bas, à gauche. »"],
            choix:[
              {label:"Demander à parler", detail:"Personne ne l'a fait sans armure",
               suite:"parler"},
              {label:"Chercher une autre entrée", detail:"Jet de Précision (14) · une tour a toujours un défaut",
               test:{stat:"precision", dc:14}, reussite:"defaut_ok", echec:"defaut_ko"},
              {label:"Entrer de nuit par le puits", detail:"Jet d'Agilité (15) · le puits descend jusqu'à la nappe",
               test:{stat:"agi", dc:15}, reussite:"puits_ok", echec:"puits_ko"},
            ]},
          parler:{ texte:[
            "Ils le laissent entrer seul et désarmé, et ils ne sont pas vingt-trois : ils sont vingt-trois plus neuf femmes et six enfants.",
            "Leur chef a soixante ans et une jambe raide. « Vingt-deux mois de solde. On a des familles au village en bas. Le village nous a nourris six mois, puis il a arrêté, parce qu'un village n'a pas de quoi nourrir trente-huit personnes. »",
            "Il montre le col. « On tient la tour parce que c'est la seule chose qu'on ait à vendre. On la rendra le jour où on sera payés. Pas avant. »"],
            effets:{xp:26, flags:["aubremont_familles","aubremont_solde"]}, fin:true},
          defaut_ok:{ texte:[
            "Le défaut est au nord : une poterne murée il y a quarante ans, dont le mortier a gelé et dégelé quarante hivers.",
            "Trois hommes peuvent l'ouvrir en une nuit. Vingt peuvent entrer avant l'aube.",
            "De là, on voit aussi ce que le parapet cache : du linge d'enfant."],
            effets:{xp:24, flags:["aubremont_poterne","aubremont_familles"]}, fin:true},
          defaut_ko:{ texte:["Quarante pieds de granit sans un défaut visible, et un éperon qui ne laisse approcher que par un seul côté. Ceux qui l'ont bâtie savaient ce qu'ils faisaient."],
            effets:{xp:8}, fin:true},
          puits_ok:{ texte:[
            "Le puits descend à la nappe, et la nappe communique avec une résurgence à trois cents pas en contrebas. Il faut nager quarante pas dans le noir et remonter quarante pieds à la corde.",
            "Il ressort dans la cour intérieure à trois heures du matin, seul, au milieu de trente-huit personnes endormies dont six enfants.",
            "Il aurait pu ouvrir la porte. Il redescend par où il est venu."],
            effets:{xp:30, fat:16, flags:["aubremont_puits","aubremont_familles"]}, fin:true},
          puits_ko:{ texte:["Quarante pas dans le noir sous l'eau, et une chatière qui se referme sur l'épaule. Il ressort par la résurgence en ayant perdu sa lanterne et quatre minutes de sa vie qu'il ne veut pas revivre."],
            effets:{pv:-12, fat:20, xp:12}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"La colonne arrive dans quinze jours.",
      ev:{ id:"CHU_3", titre:"Ouvrir la tour", famille:"GUERRE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Quinze jours. Une tour, trente-huit personnes dedans, et une capitaine qui a dit qu'elle se moquait du comment.",
            "Elle ne se moquera pas du comment. Personne ne s'en moque jamais après."],
            choix:[
              {label:"L'assaut par la poterne ou le puits",
               detail:"Requiert d'avoir trouvé la faille · rapide, propre, définitif",
               requis:{flag:"aubremont_poterne"}, suite:"assaut"},
              {label:"Payer les vingt-deux mois de solde soi-même",
               detail:"Requiert de savoir ce qu'on leur doit · −1400 or",
               requis:{flag:"aubremont_solde", or:1400}, suite:"payer",
               effets:{or:-1400, issue:"tour_rendue", reputation:{humains:14, parias:12}, renom:12}},
              {label:"Dire à Dame Sibylle ce que son frère a fait",
               detail:"Requiert de le savoir · ce sera à elle de trancher",
               requis:{flag:"aubremont_solde"}, suite:"frere"},
              {label:"Brûler la tour", detail:"Le col sera libre. Il n'y aura plus de tour.",
               suite:"bruler",
               effets:{issue:"tour_brulee", reputation:{humains:-14, parias:-10}, renom:-8, suspicion:6}},
            ]},
          assaut:{ texte:["Vingt hommes par la poterne avant l'aube, dans une cour où dorment six enfants."],
            combat:{ groupe:[{bst:"BST_045", n:3}, {bst:"BST_043", n:1}], victoire:"prise", defaite:"repoussee" }},
          prise:{ fin:true, texte:[
            "La tour est prise en vingt minutes. Sept morts chez les renégats, dont leur chef à la jambe raide, tué sur le seuil de la salle basse où il s'était mis en travers.",
            "Aucun enfant n'est touché. C'est le seul détail que Yohan retiendra avec précision.",
            "La colonne passe le col à la date prévue. Dame Sibylle paie en entier et fait pendre les quatre survivants, parce que c'est ce qu'on fait aux mutins et qu'elle commande six tours qui regardent."],
            effets:{xp:45, renom:8, reputation:{humains:8, parias:-12}, issue:"tour_reprise"}},
          repoussee:{ fin:true, texte:[
            "La poterne s'ouvre, la cour se remplit, et vingt-trois hommes qui n'ont plus rien à perdre défendent l'endroit où dorment leurs enfants.",
            "On décroche à l'aube avec neuf morts. La tour tient encore.",
            "La colonne prendra le détour du sud : douze jours de plus, et une campagne qui commencera mal."],
            effets:{pv:-20, fat:18, xp:20, renom:-6, issue:"abandonnee"}},
          payer:{ fin:true, texte:[
            "Quatorze cents écus, comptés dans la salle basse de la tour, devant vingt-trois hommes qui n'y croient pas jusqu'à la dernière pièce.",
            "Ils rendent la place le lendemain, en bon ordre, et descendent au village chercher leurs familles.",
            "Dame Sibylle reprend sa tour sans un mort et paie le contrat en entier — ce qui laisse Yohan en perte de quatre cents écus, et il le sait depuis le début.",
            "Sur le chemin de ronde, elle dit une seule chose : « Vous avez payé la dette de mon frère. Je vais devoir m'occuper de mon frère. »"]},
          frere:{ fin:true, texte:[
            "Elle écoute jusqu'au bout, sur le chemin de ronde, sans rien montrer.",
            "« Vingt-deux mois. » Elle le répète une fois. « J'ai fait deux assauts. Onze de mes hommes sont morts pour couvrir les comptes de mon frère. »",
            "Elle paie les soldes sur les fonds des six tours, ce qui n'est pas légal, et les renégats rendent la place dans la semaine. Son frère est démis du contrôle des comptes par le conseil de famille au printemps.",
            "Elle paie le contrat en entier. « Vous m'avez coûté un frère », dit-elle. « Gardez l'argent, je ne veux plus en entendre parler. »"],
            effets:{issue:"tour_rendue", reputation:{humains:10, parias:10}, renom:10,
                    flag:"aubremont_frere_demis"}},
          bruler:{ fin:true, texte:[
            "Le feu prend par la charpente, à la poix, une nuit de vent du nord.",
            "Il en sort dix-neuf personnes. Les autres non.",
            "Le col est libre. La colonne passe le douzième jour, entre deux pans de granit noirci. Dame Sibylle paie sans lever les yeux du parapet et ne redemandera jamais rien à Yohan."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   14 — LES CORNES DE MINUIT
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_VAUDREUIL", type:'contrat', titre:"Les Cornes de Minuit",
  commanditaire:"Maison de Vaudreuil", maison:"Maison de Vaudreuil",
  or:1700, danger:"dangereux", categorie:"traque", prix:true,
  lieux:["LOC_010","LOC_020","LOC_011"],
  pitch:"Une harde marque les portes de certaines familles avant de venir les chercher la nuit. Onze portes marquées, sept familles prises. Personne ne sait comment elle choisit.",
  paye:["harde_brisee","dette_payee","marques_effacees"],
  issues:{
    harde_brisee:"La harde des Cornes de Minuit a été brisée dans la Forêt des Mille Cornes.",
    dette_payee:"Vaudreuil a payé ce qu'elle devait aux Hommes-Bêtes, et les portes ont cessé d'être marquées.",
    marques_effacees:"Les marques de Vaudreuil ont été effacées, et personne n'a jamais dit ce qu'elles voulaient dire.",
    abandonnee:"Les portes de Vaudreuil se marquent encore.",
    refusee:"Yohan a refusé les termes de Vaudreuil.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Onze portes marquées, et il faut les voir.",
      ev:{ id:"CHV2_1", titre:"Onze portes", famille:"HOMME_BETE", rarete:"majeur",
        image:"evt2_marque",
        scenes:{
          start:{ texte:[
            "Dame Mahaut de Vaudreuil a vingt-six ans et sa porte a été marquée deux fois. Deux fois, quelqu'un d'autre est mort à sa place.",
            "« Une entaille en V, à hauteur de main, sur le montant droit. On la trouve au matin. Entre cinq et neuf nuits plus tard, ils viennent. »",
            "Elle pose une liste. « Onze portes en deux ans. Sept familles prises. Quatre ont eu le temps de fuir. »",
            "Elle relève les yeux. « Mon père dit que c'est le hasard. Mon père n'a pas regardé la liste. »"],
            choix:[
              {label:"Regarder la liste", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"liste_ok", echec:"liste_ko"},
              {label:"Demander ce qu'ont en commun les quatre qui ont fui", detail:"Fuir, ça s'organise",
               suite:"fuis"},
              {label:"Accepter et aller dans la forêt", detail:"C'est là qu'ils sont",
               suite:"termes"},
            ]},
          liste_ok:{ texte:[
            "Onze noms, onze dates, onze hameaux. Ce n'est pas géographique : les onze sont dispersés sur toute la seigneurie.",
            "Il faut deux heures pour trouver le lien, et il est dans les registres de la maison, pas dans la liste : les onze familles descendent, à une ou deux générations près, des hommes qui ont défriché le bois des Cornes en l'an dix-neuf.",
            "Trois cents arpents de forêt ancienne, abattus en une saison. Il y a quarante ans."],
            effets:{xp:26, flag:"vaudreuil_defrichement"}, suite:"termes"},
          liste_ko:{ texte:["Onze noms, onze dates, aucun ordre apparent. Dame Mahaut a raison sur un point : ce n'est pas le hasard. Elle n'a pas raison sur le reste : on ne voit pas quoi."],
            effets:{xp:6}, suite:"termes"},
          fuis:{ texte:[
            "« Les quatre qui ont fui ? Ils avaient un endroit où aller. »",
            "Elle marque un temps. « Et ils ont tous les quatre laissé quelque chose sur le seuil avant de partir. Du grain, une chèvre, du sel. La cinquième famille aussi a laissé du grain — mais elle n'est pas partie, et on l'a prise quand même. »",
            "Un temps. « Alors non, je ne sais pas ce qu'ils veulent. Mais ils prennent, et ils acceptent qu'on leur donne. »"],
            effets:{xp:20, flag:"vaudreuil_tribut"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Mille sept cents. Que ça s'arrête. »",
            "Elle croise les bras. « Et si vous rentrez en me disant qu'il faut leur donner quelque chose, dites-le-moi à moi et pas à mon père. Il ferait brûler la forêt. »"]},
        }}},

    { id:"foret", delai:[2,4], attente:"La Forêt des Mille Cornes est vaste et elle regarde.",
      ev:{ id:"CHV2_2", titre:"Ce que la harde a gardé", famille:"HOMME_BETE", rarete:"majeur",
        image:"evt_harde",
        scenes:{
          start:{ texte:[
            "On ne trouve pas une harde dans la Forêt des Mille Cornes : on se laisse trouver. Cela prend six jours et il faut cesser d'être armé le quatrième.",
            "Le camp est autour d'une clairière que personne n'a faite : les arbres n'y poussent pas, et ils n'y poussent pas depuis longtemps.",
            "Au centre, alignés, sept humains vivants. Maigres, sales, terrifiés — et vivants."],
            choix:[
              {label:"Demander à parler à l'ancien", detail:"Il y en a toujours un",
               suite:"ancien"},
              {label:"Libérer les sept maintenant", detail:"Jet d'Agilité (15) · sept personnes, une clairière, une harde",
               test:{stat:"agi", dc:15}, reussite:"libere_ok", echec:"libere_ko"},
              {label:"Attaquer", detail:"C'est ce qu'on est venu faire",
               suite:"combat"},
            ]},
          ancien:{ pnj:"gruk", texte:[
            "Le Doyen des Pierres a des cornes cassées aux deux tiers et parle la langue des hommes comme on parle une langue apprise dans sa jeunesse et jamais oubliée.",
            "« Trois cents arpents. En l'an dix-neuf. »",
            "Il montre la clairière stérile. « C'était le bois des naissances. On y venait mettre bas depuis avant qu'il y ait des hommes ici. Vos gens l'ont abattu en une saison pour faire des barriques. »",
            "« On prend un pour un. Onze familles ont abattu. Onze familles rendent. Quand ce sera fini, ce sera fini. »",
            "Il ajoute, et c'est ce qui déchire : « On ne les tue pas. On les garde. Ils vivent. C'est plus que ce que vos pères ont laissé aux nôtres. »"],
            effets:{xp:32, flags:["vaudreuil_defrichement","vaudreuil_sept_vivants"]}, fin:true},
          libere_ok:{ texte:[
            "Six nuits d'observation, une corde, un versant, et sept personnes qui ne crient pas parce qu'elles ont compris avant qu'on leur explique.",
            "Personne ne les poursuit. Yohan met trois jours à comprendre qu'on les a laissés partir."],
            effets:{xp:34, fat:18, flag:"vaudreuil_sept_libres"}, fin:true},
          libere_ko:{ texte:[
            "Quatre sortent. Trois non — et l'un d'eux, un homme de cinquante ans, refuse la corde en secouant la tête, sans un mot.",
            "Il faut partir avec quatre et le regard de celui qui reste."],
            effets:{xp:20, fat:16, flag:"vaudreuil_quatre_libres"}, fin:true},
          combat:{ texte:["Il y a une manière d'entrer dans une clairière qui ne laisse pas d'autre issue, et il vient de la prendre."],
            combat:{ groupe:[{bst:"BST_059", n:1}, {bst:"BST_058", n:3}], victoire:"brisee", defaite:"chasse" }},
          brisee:{ texte:[
            "Le Doyen tombe le dernier, sur la clairière stérile, et la harde se disperse dans l'heure.",
            "Les sept prisonniers sont détachés. Trois embrassent Yohan. Les quatre autres regardent les corps et ne disent rien du tout."],
            effets:{xp:50, renom:10, reputation:{humains:12, hommes_betes:-28},
                    issue:"harde_brisee"}, fin:true},
          chasse:{ texte:[
            "On ne gagne pas une clairière contre ceux qui la connaissent depuis mille ans.",
            "Yohan sort de la forêt par où il peut, trois jours plus tard, sans les sept et sans réponse."],
            effets:{pv:-26, fat:22, xp:18, issue:"abandonnee"}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"Vaudreuil attend, et onze portes aussi.",
      ev:{ id:"CHV2_3", titre:"Un pour un", famille:"HOMME_BETE", rarete:"majeur",
        image:"evt_pierres",
        scenes:{
          start:{ texte:[
            "Dame Mahaut écoute tout, y compris ce qu'elle n'avait pas demandé : trois cents arpents, l'an dix-neuf, le bois des naissances, et onze familles qui rendent un pour un.",
            "Son père, dans la pièce d'à côté, ne sait rien de tout cela."],
            choix:[
              {label:"Rendre les trois cents arpents", detail:"Requiert de connaître la dette · Jet de Volonté (15) · elle n'a pas le pouvoir de le faire",
               requis:{flag:"vaudreuil_defrichement"}, test:{stat:"vol", dc:15},
               reussite:"rend_ok", echec:"rend_ko"},
              {label:"Établir un tribut annuel : grain, sel, bêtes",
               detail:"Requiert de savoir qu'ils acceptent qu'on donne · −500 or la première année",
               requis:{flag:"vaudreuil_tribut", or:500}, suite:"tribut", effets:{or:-500}},
              {label:"Effacer les marques et se taire", detail:"Onze portes, un ciseau à bois, et rien de réglé",
               suite:"effacer",
               effets:{issue:"marques_effacees", reputation:{humains:4, hommes_betes:-6}, renom:2}},
            ]},
          rend_ok:{ fin:true, texte:[
            "Il faut une nuit entière pour convaincre une fille de vingt-six ans qu'elle peut faire une chose que son père refusera.",
            "Elle la fait quand même. Elle réunit les onze familles — les quatre qui ont fui compris — et leur pose la question directement, sans passer par la seigneurie.",
            "Ils votent la restitution. Trois cents arpents de coupe rendus au bois, sans replantation, sans exploitation, à perpétuité. Le père de Dame Mahaut l'apprend par le notaire et ne lui adresse plus la parole pendant deux ans.",
            "Les sept prisonniers redescendent au printemps. Aucune porte n'est marquée cette année-là, ni les suivantes."],
            effets:{xp:70, renom:14, reputation:{hommes_betes:30, humains:-6},
                    issue:"dette_payee", flag:"vaudreuil_arpents_rendus"}},
          rend_ko:{ texte:[
            "« Je ne peux pas », dit-elle. « Je n'ai pas la seigneurie. Mon père l'a, et il fera brûler la forêt plutôt que de rendre un arpent. »",
            "Elle a raison, et c'est la fin de cette solution-là."],
            effets:{xp:12}, suite:"tribut"},
          tribut:{ fin:true, texte:[
            "Un tribut, alors. Cinq cents écus la première année : du grain, du sel, douze chèvres, déposés à la lisière au premier quartier de chaque saison.",
            "Le Doyen accepte. Ce n'est pas ce qu'il voulait — ce n'est pas un pour un — mais un Homme-Bête de son âge sait ce qu'est un compromis, et il a des jeunes à nourrir.",
            "Quatre des sept prisonniers redescendent. Les trois autres sont morts avant, de faim et d'hiver, et la harde le dit sans s'en excuser.",
            "Les portes cessent d'être marquées. Dame Mahaut paie le contrat et ne dit rien à son père."],
            effets:{issue:"dette_payee", reputation:{hommes_betes:18, humains:4}, renom:8,
                    flag:"vaudreuil_tribut_etabli"}},
          effacer:{ fin:true, texte:[
            "Onze portes, un ciseau à bois, une matinée. Les marques disparaissent.",
            "Elles réapparaissent dans le mois, plus profondes, et sur trois portes de plus.",
            "Dame Mahaut paie la moitié du contrat. « Vous avez fait ce que je vous ai demandé », dit-elle. « Vous saviez que ça ne servirait à rien. Moi aussi. »"]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   15 — LES LOUPS DE VERRE
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_TORCY", type:'contrat', titre:"Les Loups de Verre",
  commanditaire:"Maison de Torcy", maison:"Maison de Torcy",
  or:1500, danger:"dangereux", categorie:"chasse", prix:true,
  lieux:["LOC_011","LOC_004","LOC_013"],
  pitch:"Des créatures translucides chassent uniquement les voyageurs qui portent des bijoux magiques. Torcy vend des bijoux magiques.",
  paye:["meute_detruite","source_tarie","route_signalee"],
  issues:{
    meute_detruite:"Les Loups de Verre ont été détruits sur la route de Torcy.",
    source_tarie:"Torcy a cessé d'extraire dans la veine haute, et les Loups de Verre ont cessé de naître.",
    route_signalee:"La route de Torcy est signalée : on n'y porte plus rien qui brille.",
    abandonnee:"Les Loups de Verre chassent toujours sur la route de Torcy.",
    refusee:"Yohan a refusé les termes de Torcy.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Il reste à voir ce que ces choses font vraiment.",
      ev:{ id:"CHL_1", titre:"Ce qui chasse ce qui brille", famille:"CONTRAT", rarete:"majeur",
        image:"evt2_veine",
        scenes:{
          start:{ texte:[
            "Dame Aude de Torcy tient les mines de verre depuis qu'elle a enterré son mari, et elle reçoit dans un bureau où l'on voit la veine haute par la fenêtre.",
            "« Neuf morts en quatre mois sur la route de la mine. Tous portaient une pièce enchantée — une amulette, un anneau, une fiole. Les autres passent sans être touchés. »",
            "Elle pose une main sur un registre. « Ma maison vend des pièces enchantées. Vous voyez le problème. »"],
            choix:[
              {label:"Demander depuis quand", detail:"Quatre mois, ça a commencé quelque part",
               suite:"depuis"},
              {label:"Demander à voir un corps", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"corps_ok", echec:"corps_ko"},
              {label:"Accepter", detail:"Une route, neuf morts, une meute",
               suite:"termes"},
            ]},
          depuis:{ texte:[
            "« Depuis qu'on a ouvert la veine haute. »",
            "Elle le dit tout de suite, ce qui veut dire qu'elle y a déjà pensé cent fois.",
            "« Le verre de la veine haute est différent. Il tient l'enchantement trois fois mieux. C'est ce qui fait vivre cette maison depuis quatre mois, et c'est peut-être aussi ce qui fait mourir mes voyageurs. »"],
            effets:{xp:18, flag:"torcy_veine_haute"}, suite:"termes"},
          corps_ok:{ texte:[
            "Le neuvième est encore à la chapelle. Il n'a pas été dévoré : il a été vidé.",
            "Pas de sang. Pas de plaies larges. Une trentaine de perforations fines, régulières, et l'amulette qu'il portait est intacte — mais éteinte. Le verre est laiteux, mort.",
            "Ils ne mangent pas les gens. Ils mangent ce que les gens portent, et les gens meurent avec."],
            effets:{xp:24, flag:"torcy_ils_mangent_l_onde"}, suite:"termes"},
          corps_ko:{ texte:["On lui montre un linceul et on ne l'ouvre pas. La famille est là, et il y a des choses qu'on ne demande pas devant une famille."],
            effets:{xp:5}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Mille cinq cents. Et je préfère vous prévenir : si votre solution consiste à fermer la veine haute, dites-le-moi avant de me le prouver. »"]},
        }}},

    { id:"route", delai:[2,4], attente:"La route de la mine, une nuit, avec quelque chose qui brille.",
      ev:{ id:"CHL_2", titre:"L'appât", famille:"ONDE", rarete:"majeur",
        image:"evt2_sans_ombre",
        scenes:{
          start:{ texte:[
            "Il n'y a qu'une façon de trouver une chose qui chasse ce qui brille, et c'est de briller.",
            "Une amulette de Torcy au bout d'une chaîne, posée sur une pierre au milieu de la route, et un homme couché dans le fossé à trente pas.",
            "Ils viennent à la deuxième heure. On ne les voit pas arriver : on voit la route se déformer, comme à travers une vitre mal coulée."],
            choix:[
              {label:"Les affronter", detail:"Ils sont trois, et on ne les voit qu'en bougeant la tête",
               suite:"combat"},
              {label:"Regarder ce qu'ils font de l'amulette", detail:"Jet de Volonté (14) · ne pas bouger",
               test:{stat:"vol", dc:14}, reussite:"regarde_ok", echec:"regarde_ko"},
              {label:"Suivre celui qui repart", detail:"Jet d'Agilité (14)",
               test:{stat:"agi", dc:14}, reussite:"suit_ok", echec:"suit_ko"},
            ]},
          combat:{ texte:["Ils se retournent tous les trois en même temps, et il comprend qu'ils l'ont vu depuis le début : c'est l'amulette qu'ils attendaient."],
            combat:{ groupe:[{bst:"BST_038", n:3}], victoire:"tues", defaite:"blesse" }},
          tues:{ texte:[
            "Ils ne saignent pas. Ils se fendent, puis se troublent, puis se dissolvent en une poussière de verre qui reste dans l'herbe.",
            "Il en ramasse une poignée. Sous la lune, elle a exactement la couleur du verre de la veine haute."],
            effets:{xp:34, flag:"torcy_poussiere"}, fin:true},
          blesse:{ texte:["Trente perforations fines n'importe où sur le corps, ça ne tue pas tout de suite. Il décroche vers le fossé et ils ne le suivent pas : ils avaient ce qu'ils voulaient."],
            effets:{pv:-24, fat:14, xp:12}, fin:true},
          regarde_ok:{ texte:[
            "Ils l'entourent. Ils ne la prennent pas : ils s'y posent, tous les trois, et restent immobiles pendant six ou sept minutes.",
            "Quand ils repartent, l'amulette est laiteuse et morte, et le troisième — le plus petit — est devenu un peu plus grand.",
            "Ils ne chassent pas. Ils se nourrissent, et ce dont ils se nourrissent les fait croître."],
            effets:{xp:30, flag:"torcy_ils_mangent_l_onde"}, fin:true},
          regarde_ko:{ texte:["Il tient quatre minutes. À la cinquième, un genou craque dans le fossé, et trois choses translucides tournent la tête en même temps. Il faut courir, et courir dans le noir avec quelque chose qu'on ne voit pas est une expérience."],
            effets:{fat:18, pv:-10, xp:10}, fin:true},
          suit_ok:{ texte:[
            "Le plus grand repart vers l'ouest, sans se presser, et il ne prend pas la route : il coupe droit, vers la mine.",
            "Il entre dans la veine haute par la gueule de l'ancienne coupe, et il ne ressort pas.",
            "Ils ne viennent pas de la forêt. Ils viennent de la mine."],
            effets:{xp:32, flags:["torcy_veine_haute","torcy_ils_sortent_de_la"]}, fin:true},
          suit_ko:{ texte:["On ne suit pas dans le noir une chose qu'on distingue à peine en plein jour. Il la perd à cent pas et il la cherche jusqu'à l'aube."],
            effets:{fat:14, xp:8}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"Torcy attend, et la veine haute tourne toujours.",
      ev:{ id:"CHL_3", titre:"Ce qui fait vivre cette maison", famille:"CONTRAT", rarete:"majeur",
        image:"evt2_forge",
        scenes:{
          start:{ texte:[
            "Dame Aude écoute, et elle a l'honnêteté de ne pas faire semblant d'être surprise.",
            "« La veine haute. » Elle regarde par la fenêtre. « Deux cent quarante ouvriers. Le tiers de mes revenus. »"],
            choix:[
              {label:"Nettoyer la veine et la rouvrir", detail:"Ils reviendront, mais plus tard",
               requis:{flag:"torcy_ils_sortent_de_la"}, suite:"nettoie",
               effets:{issue:"meute_detruite", reputation:{humains:10}, renom:8}},
              {label:"Exiger la fermeture de la veine haute",
               detail:"Requiert de savoir d'où ils viennent · deux cent quarante ouvriers",
               requis:{flag:"torcy_veine_haute"}, test:{stat:"vol", dc:14},
               reussite:"ferme_ok", echec:"ferme_ko"},
              {label:"Faire signaler la route", detail:"On ne porte plus rien qui brille · gratuit, et ça marche",
               suite:"signale",
               effets:{issue:"route_signalee", reputation:{humains:6}, renom:4}},
            ]},
          nettoie:{ fin:true, texte:[
            "Trois semaines à descendre dans la veine haute avec des lampes à huile et des hommes qui n'ont pas signé pour ça.",
            "On en sort dix-neuf. Ils sont plus petits sous terre — ils ne grandissent qu'en mangeant — et ils meurent bien quand on les trouve avant.",
            "La veine rouvre au printemps. Dame Aude paie en entier et fait interdire le port de pièces enchantées sur la route, par précaution.",
            "Ils reviendront. Elle le sait. Ce qu'elle a acheté, c'est du temps, et deux cent quarante hommes qui mangent pendant ce temps-là."]},
          ferme_ok:{ fin:true, texte:[
            "Il faut trois heures et une phrase qui porte : « Vos ouvriers portent tous une pièce de verre au cou. Combien de temps avant que ça se passe sous terre ? »",
            "Elle ferme la veine haute en onze jours. Deux cent quarante ouvriers passent sur les veines basses, ce qui veut dire moitié moins de salaire pour la moitié d'entre eux.",
            "Les Loups de Verre cessent de naître dans l'année. Les derniers meurent de faim sur la route, à mesure que les voyageurs cessent de porter ce qui brille.",
            "Dame Aude paie en entier. « Vous m'avez coûté le tiers de mes revenus », dit-elle. « Et vous m'avez évité de l'expliquer à deux cent quarante familles. Je ne sais pas comment on compte ça. »"],
            effets:{issue:"source_tarie", reputation:{humains:6, parias:10}, renom:10,
                    flag:"torcy_veine_fermee"}},
          ferme_ko:{ texte:[
            "« Non. »",
            "Elle le dit sans hausser le ton. « Deux cent quarante hommes. Je ne ferme pas sur une poignée de poussière de verre et une théorie. »",
            "Elle a le droit. C'est sa maison."],
            effets:{xp:10}, suite:"signale"},
          signale:{ fin:true, texte:[
            "Des panneaux tous les demi-milles, en trois langues, et une consigne au relais : on dépose ce qui brille, on le reprend au retour.",
            "Ça marche. Il n'y a plus de morts sur la route de Torcy.",
            "Il y a toujours des Loups de Verre. Ils grandissent moins vite, ils s'éloignent, et un jour ils trouveront une autre route où l'on n'a pas mis de panneaux.",
            "Dame Aude paie le contrat en entier et le sait aussi bien que lui."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   16 — LE PRISONNIER KHESH
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ESTREES", type:'contrat', titre:"Le Prisonnier Khesh",
  commanditaire:"Maison d'Estrées", maison:"Maison d'Estrées",
  or:2000, danger:"dangereux", categorie:"traque", prix:true,
  lieux:["LOC_005","LOC_018","LOC_002"],
  pitch:"Un chef Khesh capturé vaut une fortune en rançon. Sa tribu approche avec plusieurs centaines de cavaliers, et elle sera là dans neuf jours.",
  paye:["rancon_payee","chef_rendu","chef_execute"],
  issues:{
    rancon_payee:"Estrées a touché la rançon du chef khesh, et les cavaliers sont repartis.",
    chef_rendu:"Le chef khesh a été rendu sans rançon. Les Khesh s'en souviennent.",
    chef_execute:"Le chef khesh a été exécuté à Estrées, et les cavaliers ne sont pas repartis.",
    abandonnee:"Yohan a quitté Estrées avant que les cavaliers arrivent.",
    refusee:"Yohan a refusé les termes d'Estrées.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Neuf jours, et ils avancent.",
      ev:{ id:"CHE_1", titre:"Neuf jours", famille:"KHESH", rarete:"majeur",
        image:"evt2_tribut",
        scenes:{
          start:{ texte:[
            "Dame Béatrice d'Estrées parle khesh, elfe et nain, et c'est elle qui reçoit, pas son seigneur — qui est enfermé dans ses appartements depuis quatre jours.",
            "« Une patrouille de mon frère a pris un chef de tribu il y a trois semaines. Par accident. Ils ne savaient pas qui c'était. »",
            "Elle pose une carte des Champs de Cendre. « Sa tribu a levé six cents cavaliers. Ils sont à neuf jours. »",
            "Elle relève les yeux. « Mon frère veut la rançon. Il ne comprend pas que dans neuf jours il n'y aura plus personne pour la lui payer. »"],
            choix:[
              {label:"Demander à voir le prisonnier", detail:"C'est de lui qu'on parle",
               suite:"prisonnier"},
              {label:"Demander ce que veut vraiment le frère", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"frere_ok", echec:"frere_ko"},
              {label:"Accepter", detail:"Neuf jours, ça se compte",
               suite:"termes"},
            ]},
          prisonnier:{ texte:[
            "Il est dans une cave sèche, pas dans un cachot, et on le nourrit correctement — Dame Béatrice y veille.",
            "Il a soixante ans, une natte grise, et il ne se lève pas quand Yohan entre.",
            "« Tu es l'homme qu'on paie », dit-il en vardhi, lentement. « Alors écoute une chose : mes cavaliers ne viennent pas me chercher. Ils viennent chercher ce que la maison me doit pour m'avoir pris sur la piste du sel. »",
            "Il sourit sans joie. « Me rendre ne suffira pas. Il faudra rendre autre chose. »"],
            effets:{xp:24, flags:["estrees_piste_du_sel","estrees_chef_parle"]}, suite:"termes"},
          frere_ok:{ texte:[
            "« Mon frère veut la rançon parce qu'il a perdu quatre mille écus au jeu à Astrah cet hiver, et qu'il a signé des reconnaissances. »",
            "Elle le dit à voix basse et sans plaisir. « Il ne veut pas d'une guerre. Il veut quatre mille écus avant la Saint-Aubin. Ce n'est pas la même chose et personne ne peut le lui expliquer. »"],
            effets:{xp:20, flag:"estrees_dettes_du_frere"}, suite:"termes"},
          frere_ko:{ texte:["« Il veut la rançon », dit-elle. « C'est tout ce qu'il dit depuis quatre jours, et il le dit à travers une porte. »"],
            effets:{xp:6}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille. Et je vous paie sur mes propres fonds, pas sur ceux de la maison, parce que je ne veux pas que mon frère puisse annuler. »",
            "Elle ajoute : « Quant à la coutume — oui, je sais ce qu'elle dit. Réglons-la maintenant, pendant qu'il nous reste neuf jours et une maison debout. »"]},
        }}},

    { id:"cavaliers", delai:[2,3], attente:"Six cents cavaliers avancent, et il faut aller à leur rencontre.",
      ev:{ id:"CHE_2", titre:"Aller au-devant", famille:"KHESH", rarete:"majeur",
        image:"cg_khesh",
        scenes:{
          start:{ texte:[
            "Six cents cavaliers khesh en marche ne font pas de bruit avant d'être à deux lieues, et alors ils en font beaucoup.",
            "Yohan va au-devant seul, à découvert, sans bannière — ce qui est la seule façon de ne pas se faire tirer dessus, et une façon très mauvaise de ne pas se faire tuer.",
            "On l'entoure. On l'amène. Le fils du chef prisonnier a trente ans et l'air de quelqu'un qui a déjà décidé."],
            choix:[
              {label:"Proposer la rançon", detail:"C'est ce que la maison veut",
               suite:"rancon"},
              {label:"Écouter ce qu'ils réclament vraiment",
               detail:"Requiert d'avoir parlé au chef · la piste du sel",
               requis:{flag:"estrees_piste_du_sel"}, suite:"sel"},
              {label:"Proposer un duel pour le prisonnier", detail:"Jet de Volonté (14) · les Khesh comprennent ça",
               test:{stat:"vol", dc:14}, reussite:"duel_ok", echec:"duel_ko"},
            ]},
          rancon:{ texte:[
            "Le fils écoute la proposition jusqu'au bout, par politesse.",
            "« Vous voulez de l'or pour rendre un homme que vous avez pris sur une piste qui est à nous depuis douze générations. »",
            "Il fait tourner sa monture. « Nous paierons. Et ensuite nous brûlerons Estrées, parce qu'on ne paie pas deux fois pour la même piste. »"],
            effets:{xp:14, flag:"estrees_ils_paieront_et_bruleront"}, fin:true},
          sel:{ texte:[
            "« La piste du sel. »",
            "Le fils descend de cheval, ce qu'il n'avait pas fait.",
            "« Votre maison a posé un péage sur la piste du sel il y a deux ans. Nous l'avons payé deux ans. Puis ils ont pris mon père dessus, comme un voleur, sur une piste où nous passons depuis douze générations. »",
            "Il regarde vers Estrées. « Rendez mon père et levez le péage. Nous repartirons le jour même. Gardez l'un ou l'autre, et nous resterons. »"],
            effets:{xp:30, flags:["estrees_peage","estrees_condition"]}, fin:true},
          duel_ok:{ texte:[
            "Le fils accepte, parce qu'un Khesh n'a pas le droit de refuser devant six cents témoins et parce qu'il a trente ans et Yohan aussi, à peu près.",
            "Ce n'est pas un duel à mort : c'est un duel au premier sang, à cheval, à la lance courte, et Yohan le perd honorablement au troisième passage.",
            "« Bien », dit le fils en lui tendant la main pour le relever. « Maintenant on peut parler comme des gens. »",
            "Ce qu'ils réclament tient en deux points : le père, et le péage sur la piste du sel."],
            effets:{xp:28, pv:-12, flags:["estrees_peage","estrees_condition","estrees_respecte"]}, fin:true},
          duel_ko:{ texte:[
            "« Nous ne nous battons pas pour ce qui est à nous », dit le fils. « Nous le reprenons. »",
            "On le renvoie vers Estrées avec une escorte de quatre cavaliers et un délai : trois jours."],
            effets:{xp:12, flag:"estrees_trois_jours"}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"Le frère est toujours derrière sa porte.",
      ev:{ id:"CHE_3", titre:"Ce qu'on fait d'un homme de soixante ans", famille:"KHESH", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Le seigneur d'Estrées a fini par sortir de ses appartements, parce que six cents cavaliers à deux lieues font sortir n'importe qui.",
            "Il veut la rançon. Sa sœur veut la paix. Le prisonnier attend dans une cave sèche, et il a soixante ans."],
            choix:[
              {label:"Rendre le chef et lever le péage",
               detail:"Requiert de connaître leur condition · le frère perdra sa mise",
               requis:{flag:"estrees_condition"}, test:{stat:"vol", dc:15},
               reussite:"rend_ok", echec:"rend_ko"},
              {label:"Négocier la rançon et la faire payer par la sœur",
               detail:"−800 or de vos deniers pour combler la dette du frère",
               requis:{or:800}, suite:"rancon", effets:{or:-800}},
              {label:"Laisser le seigneur exécuter le prisonnier", detail:"Il en parle depuis ce matin",
               suite:"execute",
               effets:{issue:"chef_execute", reputation:{khesh:-30, humains:-6}, renom:-6}},
            ]},
          rend_ok:{ fin:true, texte:[
            "Il faut retourner le seigneur d'Estrées contre son propre intérêt devant sa sœur, son intendant et son chapelain, et cela prend une heure et demie.",
            "Ce qui le décide n'est pas l'argument militaire : c'est sa sœur, qui pose sur la table les reconnaissances de dette qu'il a signées à Astrah et propose de les racheter elle-même, à condition qu'il signe la levée du péage.",
            "Le chef est rendu au matin, à découvert, sans escorte. Son fils descend de cheval pour l'aider à monter.",
            "Six cents cavaliers font demi-tour le jour même, exactement comme promis. La piste du sel redevient libre après deux ans.",
            "Dame Béatrice paie sur ses fonds, comme annoncé. « Mon frère ne me pardonnera pas », dit-elle. « Il est vivant pour ne pas me pardonner. »"],
            effets:{xp:60, renom:12, reputation:{khesh:26, humains:4},
                    issue:"chef_rendu", flag:"estrees_peage_leve"}},
          rend_ko:{ texte:[
            "Le seigneur d'Estrées ne cède pas. Il a quatre mille écus de dettes et il ne voit plus que ça.",
            "« La rançon », dit-il. « Ou rien. »"],
            effets:{xp:10}, suite:"rancon"},
          rancon:{ fin:true, texte:[
            "Huit cents écus de la bourse de Yohan pour compléter ce que Dame Béatrice a pu réunir, et une rançon fixée à un chiffre que les Khesh acceptent en trois heures parce qu'ils veulent leur chef.",
            "Ils paient. Ils reprennent leur homme. Ils repartent.",
            "Ils reviennent au printemps suivant, quand la maison n'a plus six cents cavaliers devant sa porte pour lui rappeler d'être raisonnable, et ils brûlent les trois relais du péage sur la piste du sel.",
            "Personne n'est tué. C'est un message, pas une guerre. Le seigneur d'Estrées a compris ; il n'a plus d'argent pour rebâtir."],
            effets:{issue:"rancon_payee", reputation:{khesh:-8, humains:4}, renom:4}},
          execute:{ fin:true, texte:[
            "On le pend dans la cour, devant les gens de la maison, à midi, parce que le seigneur d'Estrées veut que ce soit vu.",
            "Six cents cavaliers arrivent le surlendemain. Ils ne parlementent pas.",
            "Dame Béatrice quitte la maison la veille avec les registres et douze personnes. C'est tout ce qui reste d'Estrées.",
            "Elle paie quand même le contrat, six mois plus tard, depuis Fort-aux-Princes, par lettre de change. Elle n'écrit rien avec."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   17 — LE MASSACRE DE BELRIVE
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_BELRIVE", type:'contrat', titre:"Le Massacre de Belrive",
  commanditaire:"Maison de Belrive", maison:"Maison de Belrive",
  or:2200, danger:"dangereux", categorie:"enquête", prix:true,
  lieux:["LOC_010","LOC_020","LOC_016"],
  pitch:"Un village entier a été massacré, et chaque faction locale accuse une autre espèce. Il ne reste personne à Belrive pour dire ce qui s'est passé.",
  paye:["verite_etablie","coupable_designe","affaire_close"],
  issues:{
    verite_etablie:"On sait ce qui est arrivé à Belrive, et ce n'était aucune des espèces qu'on accusait.",
    coupable_designe:"Un coupable a été désigné pour Belrive. Il fera l'affaire.",
    affaire_close:"L'affaire de Belrive a été close sans conclusion.",
    abandonnee:"Personne n'a jamais su ce qui s'était passé à Belrive.",
    refusee:"Yohan a refusé les termes de Belrive.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Belrive est à trois jours, et il n'y a plus personne.",
      ev:{ id:"CHZ_1", titre:"Quatre accusations", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_chapelle",
        scenes:{
          start:{ texte:[
            "Ce n'est pas un seigneur qui reçoit : c'est un notaire mandaté par les cousins de la maison, parce que la maison de Belrive habitait Belrive.",
            "« Cent quatre-vingts personnes. Une nuit. Le village n'a pas brûlé — c'est le détail que tout le monde oublie. »",
            "Il aligne quatre feuillets. « Les bûcherons accusent les Hommes-Bêtes. Le prieuré accuse les Peaux-Vertes. Un capitaine de la Couronne accuse les elfes noirs. Et un marchand accuse les bûcherons. »",
            "Il les repousse d'un doigt. « Aucun n'y est allé voir. Ils accusent depuis leurs maisons. »"],
            choix:[
              {label:"Demander pourquoi le village n'a pas brûlé", detail:"C'est le détail qu'il a souligné",
               suite:"brule"},
              {label:"Demander qui hérite de Belrive", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"herite_ok", echec:"herite_ko"},
              {label:"Accepter et y aller", detail:"Personne n'y est allé voir",
               suite:"termes"},
            ]},
          brule:{ texte:[
            "« Parce qu'une harde brûle. Une bande de Peaux-Vertes brûle. Des elfes noirs prennent ce qui vaut et brûlent le reste. »",
            "Il croise les mains. « À Belrive, les granges sont pleines, le bétail est dans les prés, et il n'y a pas une trace de feu. On a tué cent quatre-vingts personnes et on n'a rien pris. »",
            "« Voilà pourquoi ma commande est une enquête et non une expédition punitive. »"],
            effets:{xp:20, flag:"belrive_rien_pris"}, suite:"termes"},
          herite_ok:{ texte:[
            "Le notaire répond sans se troubler, parce qu'un notaire a l'habitude qu'on lui pose cette question-là.",
            "« Trois cousins, en indivision. Ils ne s'aiment pas. Ils sont d'accord sur une seule chose : ils veulent un nom de coupable avant l'ouverture de la succession, parce qu'un village massacré par des Hommes-Bêtes se rachète et un village massacré par ses voisins se plaide pendant dix ans. »"],
            effets:{xp:22, flag:"belrive_succession"}, suite:"termes"},
          herite_ko:{ texte:["« Des cousins », dit le notaire. « Comme toujours. » Il n'en dira pas plus, et c'est son métier de n'en pas dire plus."],
            effets:{xp:5}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille deux cents. Un nom, et de quoi le tenir devant un tribunal. »",
            "Il ajoute, gêné pour la première fois : « Et concernant la coutume — la maison de Belrive habitait Belrive, messire. Il n'y a plus de femme adulte dans cette maison. Il n'y a plus de maison. »"]},
        }}},

    { id:"village", delai:[2,4], attente:"Il faut aller voir, puisque personne n'y est allé.",
      ev:{ id:"CHZ_2", titre:"Ce qu'on lit dans un village vide", famille:"POLITIQUE", rarete:"majeur",
        image:"evt2_veillee",
        scenes:{
          start:{ texte:[
            "Belrive est intact. C'est ce qui rend l'endroit insupportable : les volets sont ouverts, le linge est encore sur les cordes, et il y a du pain de six semaines sur les tables.",
            "Les corps ont été enlevés par le prieuré. Les taches sont restées.",
            "Elles sont dans les maisons. Presque toutes dans les maisons, presque toutes près des lits."],
            choix:[
              {label:"Relever où sont les taches", detail:"Jet de Précision (14)",
               test:{stat:"precision", dc:14}, reussite:"taches_ok", echec:"taches_ko"},
              {label:"Fouiller le puits", detail:"Un village qui meurt en une nuit boit tous à la même eau",
               suite:"puits"},
              {label:"Aller voir le prieuré qui a enlevé les corps", detail:"Ils les ont tous vus",
               suite:"prieure"},
            ]},
          taches_ok:{ texte:[
            "Cent soixante-quatre taches dans les maisons, seize dehors. Aucune sur les seuils.",
            "On ne s'est pas battu. On n'a pas fui. Cent soixante-quatre personnes sont mortes dans leur lit ou à côté, et seize dans la rue — les seize sont toutes du côté de la fontaine.",
            "Ce n'est pas un massacre. C'est quelque chose qui a tué tout le monde en même temps, et seize personnes ont eu le temps de courir vers l'eau."],
            effets:{xp:30, flags:["belrive_dans_les_lits","belrive_vers_l_eau"]}, fin:true},
          taches_ko:{ texte:["Des taches, partout, six semaines de pluie dessus. On voit qu'il y a eu beaucoup de morts et on ne voit pas comment."],
            effets:{xp:8}, fin:true},
          puits:{ texte:[
            "Le puits est propre. L'eau est bonne — il en boit, ce qui est soit du courage soit de la bêtise, et il ne se passe rien.",
            "Mais la margelle porte une marque : un V profond, taillé au ciseau, à hauteur de main.",
            "Il l'a déjà vue. Sur onze portes, dans la seigneurie de Vaudreuil, à trente lieues d'ici."],
            effets:{xp:26, flags:["belrive_marque","belrive_rien_pris"]}, fin:true},
          prieure:{ texte:[
            "Le prieur a soixante-dix ans et il a lavé cent quatre-vingts corps de ses mains.",
            "« Pas une plaie », dit-il. « Pas une seule, sur cent quatre-vingts. »",
            "Il a du mal à finir. « Ils avaient tous la même chose : la bouche ouverte et les yeux ouverts, et les mains sur les oreilles. Les enfants aussi. »",
            "Il regarde le sol. « J'ai écrit ça dans mon rapport. Le capitaine de la Couronne m'a demandé de le réécrire en mettant des blessures. J'ai refusé. »"],
            effets:{xp:32, flags:["belrive_pas_de_plaies","belrive_rapport_reecrit"]}, fin:true},
        }}},

    { id:"conclusion", delai:[1,3], attente:"Trois cousins attendent un nom.",
      ev:{ id:"CHZ_3", titre:"Le nom qu'on rapporte", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "Cent quatre-vingts personnes mortes sans une plaie, les mains sur les oreilles, dans leurs lits. Un village intact. Rien de pris.",
            "Ce n'est aucune des quatre accusations. Ce n'est aucune espèce.",
            "Et trois cousins en indivision attendent un nom avant l'ouverture de la succession."],
            choix:[
              {label:"Dire ce qu'on a trouvé, sans nom",
               detail:"Requiert d'avoir compris · une vérité sans coupable ne se plaide pas",
               requis:{flag:"belrive_pas_de_plaies"}, suite:"verite",
               effets:{issue:"verite_etablie", reputation:{humains:8, parias:10}, renom:8, suspicion:6}},
              {label:"Suivre la marque jusqu'à Vaudreuil",
               detail:"Requiert d'avoir vu la marque sur la margelle",
               requis:{flag:"belrive_marque"}, suite:"vaudreuil",
               effets:{issue:"verite_etablie", reputation:{humains:6, hommes_betes:-10}, renom:10}},
              {label:"Désigner les bûcherons", detail:"C'est plaidable, c'est faux, et les cousins paieront",
               suite:"designe",
               effets:{issue:"coupable_designe", reputation:{humains:-12, parias:-10}, renom:-6, or:600}},
              {label:"Rendre l'avance et clore", detail:"On ne met pas un nom sur ce qu'on n'a pas compris",
               suite:"close", effets:{issue:"affaire_close", reputation:{humains:-4}}},
            ]},
          verite:{ fin:true, texte:[
            "Il dit tout : les cent soixante-quatre dans les lits, les seize vers la fontaine, l'absence de plaies, les mains sur les oreilles, le rapport qu'on a demandé au prieur de réécrire.",
            "Le notaire écoute, écrit, et à la fin pose sa plume. « Vous me dites qu'un son a tué cent quatre-vingts personnes. »",
            "« Je vous dis ce que j'ai vu. »",
            "Le rapport est déposé tel quel. Les trois cousins le refusent, plaident dix ans, et perdent tous les trois. Belrive reste vide.",
            "Le prieur, lui, fait recopier le rapport à quatre exemplaires et en envoie un à la Cour des Lisières. Quelqu'un, là-bas, saura peut-être ce que c'était."],
            effets:{flag:"belrive_rapport_lisieres"}},
          vaudreuil:{ fin:true, texte:[
            "La même marque, sur onze portes, à trente lieues. Il faut trois semaines pour établir le lien et deux jours pour le faire admettre.",
            "Ce n'est pas la harde qui a tué Belrive : la harde marque, elle prend, elle ne massacre pas. Mais quelqu'un a copié la marque de la harde sur la margelle de Belrive après coup, et ce quelqu'un savait ce qu'il faisait.",
            "Le rapport nomme la marque, décrit le procédé, et laisse la conclusion ouverte. Il suffit à écarter les quatre accusations et à ouvrir la succession.",
            "Trois cousins héritent d'un village vide dont personne ne veut."]},
          designe:{ fin:true, texte:[
            "Les bûcherons de la coupe basse. Douze hommes, une histoire de bornes, un mobile plaidable, et aucun alibi parce que personne n'a d'alibi pour une nuit d'il y a six semaines.",
            "Le rapport tient debout. Les trois cousins paient une prime de six cents écus par-dessus le contrat, et la succession s'ouvre dans le mois.",
            "Quatre bûcherons sont pendus au printemps. Les huit autres quittent la région.",
            "Personne ne saura jamais ce qui a tué Belrive, et cela n'a plus d'importance pour personne — sauf pour un homme qui a écrit un nom qu'il savait faux."]},
          close:{ fin:true, texte:[
            "« Je n'ai pas de nom à vous donner. »",
            "Le notaire referme son dossier avec l'air d'un homme qui s'y attendait. Il paie la moitié.",
            "L'affaire est classée sans conclusion. Les trois cousins plaident quand même. Belrive reste vide et le restera."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   18 — LA MAISON SANS HÉRITIER
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_MERICOURT", type:'contrat', titre:"La Maison sans héritier",
  commanditaire:"Maison de Méricourt", maison:"Maison de Méricourt",
  or:1800, danger:"modéré", categorie:"enquête", prix:true,
  lieux:["LOC_004","LOC_002"],
  pitch:"Le dernier héritier officiel est mourant et trois branches produisent trois testaments différents. Il reste peut-être onze jours.",
  paye:["testament_vrai","branche_choisie","maison_partagee"],
  issues:{
    testament_vrai:"Le vrai testament de Méricourt a été produit, et il ne nommait aucune des trois branches.",
    branche_choisie:"Une branche a hérité de Méricourt, et les deux autres plaident encore.",
    maison_partagee:"Méricourt a été partagée entre les trois branches, ce qui ne satisfait personne.",
    abandonnee:"Méricourt s'est réglée sans Yohan, devant les tribunaux.",
    refusee:"Yohan a refusé les termes de Méricourt.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Onze jours, peut-être moins.",
      ev:{ id:"CHM_1", titre:"Trois testaments et un mourant", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "L'hôtel de Méricourt à Astrah est plein de monde, et pas un de ces gens n'est là pour le mourant.",
            "Trois branches, trois avocats, trois testaments, et un vieil homme au premier étage qui respire mal depuis six semaines.",
            "C'est le médecin qui a fait venir Yohan — sur ses propres deniers, ce qui est extraordinaire. « Ils vont le faire signer. Tous les trois. Ils attendent seulement qu'il ne comprenne plus ce qu'il signe. »"],
            choix:[
              {label:"Monter voir le mourant", detail:"Personne n'y est allé depuis trois jours",
               suite:"mourant"},
              {label:"Lire les trois testaments", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"lit_ok", echec:"lit_ko"},
              {label:"Demander au médecin ce qu'il veut", detail:"Un médecin qui paie de sa poche veut quelque chose",
               suite:"medecin"},
            ]},
          mourant:{ texte:[
            "Il a quatre-vingt-un ans, il est parfaitement lucide entre deux heures et cinq heures de l'après-midi, et personne ne monte entre deux heures et cinq heures.",
            "« Ils viennent le matin », dit-il. « Quand je ne sais plus qui je suis. Ils m'ont fait signer trois fois. »",
            "Il tourne la tête vers la fenêtre. « J'ai fait un testament il y a quatre ans, chez un notaire de Fort-aux-Princes, quand j'avais encore toute ma tête. Il n'est dans aucune de leurs mains. »"],
            effets:{xp:26, flag:"mericourt_vrai_testament"}, suite:"termes"},
          lit_ok:{ texte:[
            "Trois testaments, trois dates, la même main — et la main tremble de plus en plus d'un document à l'autre.",
            "Le troisième est signé d'une croix. Un homme qui a écrit son nom sur les deux premiers ne signe pas le troisième d'une croix, sauf si on lui tient la main.",
            "Les trois sont donc valables au regard de la forme et douteux au regard du fond. Un tribunal mettra dix ans."],
            effets:{xp:22, flag:"mericourt_croix"}, suite:"termes"},
          lit_ko:{ texte:["Trois parchemins, trois sceaux, trois avocats qui les reprennent avant qu'on ait fini. Ils ne sont pas là pour qu'on lise."],
            effets:{xp:5}, suite:"termes"},
          medecin:{ texte:[
            "« Il m'a payé pendant vingt ans et il ne m'a jamais fait attendre. »",
            "Le médecin range ses instruments avec beaucoup de soin. « Je veux qu'il meure sans qu'on lui tienne la main pour signer. C'est tout ce que je veux. Ce qu'ils feront de la maison après, je m'en moque. »"],
            effets:{xp:18, flag:"mericourt_medecin"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "Les trois branches paient ensemble — elles sont d'accord sur ce point unique : qu'un tiers tranche.",
            "« Mille huit cents écus, versés par les trois. Vous établissez quel testament est le vrai. »",
            "Un avocat ajoute, du bout des lèvres : « Et pour ce qui est de la coutume ancestrale, aucune des trois branches n'a d'adulte reconnue. C'est précisément le problème que nous sommes en train de régler. »"]},
        }}},

    { id:"fort", delai:[2,4], attente:"Fort-aux-Princes est à quatre jours, et le vieil homme respire mal.",
      ev:{ id:"CHM_2", titre:"Un notaire de Fort-aux-Princes", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "Il y a onze notaires à Fort-aux-Princes et quatre ans à remonter.",
            "Le neuvième se souvient. Il se souvient très bien, parce que le vieil homme est venu seul, à pied, un jour de neige, et parce que ce qu'il a fait écrire était inhabituel.",
            "« Je ne peux pas vous le montrer. Je peux vous dire qu'il existe et qu'il est ici. »"],
            choix:[
              {label:"Le convaincre de le produire", detail:"Jet de Volonté (14)",
               test:{stat:"vol", dc:14}, reussite:"produit_ok", echec:"produit_ko"},
              {label:"Le payer", detail:"−400 or · un notaire a un tarif pour tout",
               requis:{or:400}, suite:"paye", effets:{or:-400}},
              {label:"Faire venir le notaire au chevet du mourant", detail:"Quatre jours de route pour un homme de soixante ans",
               suite:"amener"},
            ]},
          produit_ok:{ texte:[
            "Il faut lui expliquer qu'on tient la main d'un homme de quatre-vingt-un ans pour lui faire signer des croix, et il faut le lui expliquer trois fois.",
            "À la troisième, il se lève, ouvre un casier et sort une chemise de toile.",
            "Il ne l'ouvre pas devant Yohan. « Je viendrai le lire moi-même. C'est ma charge, pas la vôtre. »"],
            effets:{xp:26, flag:"mericourt_notaire_vient"}, fin:true},
          produit_ko:{ texte:["« Ma charge m'interdit de produire un testament du vivant du testateur, sauf réquisition. » Il a raison, et il ne bougera pas."],
            effets:{xp:8}, fin:true},
          paye:{ texte:[
            "Quatre cents écus, et il ne prend pas l'argent : il le fait porter à l'hospice, devant témoin, ce qui est sa façon de ne pas être acheté tout en cédant.",
            "« Je viendrai. Pas pour vous. Parce qu'on ne fait pas signer des croix à un homme qui m'a fait quatre lieues dans la neige. »"],
            effets:{xp:22, flag:"mericourt_notaire_vient"}, fin:true},
          amener:{ texte:[
            "Quatre jours de route dans un sens, quatre dans l'autre, avec un notaire de soixante ans qui a mal au dos et qui le dit toutes les deux heures.",
            "Ils arrivent le neuvième jour. Le vieil homme respire encore."],
            effets:{xp:20, fat:12, flag:"mericourt_notaire_vient"}, fin:true},
        }}},

    { id:"lecture", delai:[1,2], attente:"Il reste peut-être deux jours.",
      ev:{ id:"CHM_3", titre:"Entre deux heures et cinq heures", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_chapelle",
        scenes:{
          start:{ texte:[
            "Le grand salon de Méricourt, trois branches, trois avocats, un médecin, un notaire venu de Fort-aux-Princes, et un vieil homme qu'on a descendu dans un fauteuil.",
            "Il est trois heures de l'après-midi. Il comprend tout ce qui se dit."],
            choix:[
              {label:"Faire lire le testament de Fort-aux-Princes",
               detail:"Requiert que le notaire soit là",
               requis:{flag:"mericourt_notaire_vient"}, suite:"lecture"},
              {label:"Demander au vieil homme de désigner lui-même", detail:"Jet de Volonté (13) · devant tout le monde",
               test:{stat:"vol", dc:13}, reussite:"designe_ok", echec:"designe_ko"},
              {label:"Proposer le partage en trois", detail:"Personne ne sera content, personne ne plaidera dix ans",
               suite:"partage",
               effets:{issue:"maison_partagee", reputation:{humains:6}, renom:4}},
            ]},
          lecture:{ fin:true, texte:[
            "Le notaire ouvre la chemise de toile et lit à voix haute pendant quatre minutes.",
            "Le vieil homme, il y a quatre ans, a légué Méricourt — le nom, la terre, l'hôtel d'Astrah — à l'hospice de Fort-aux-Princes, à charge d'y entretenir douze lits perpétuels.",
            "Aux trois branches, il laisse ce qu'il appelle « ce qu'elles m'ont donné », c'est-à-dire rien, et il l'a fait écrire en ces termes-là.",
            "Il y a un silence, puis trois avocats se mettent à parler en même temps. Le vieil homme sourit pour la première fois depuis six semaines et meurt onze jours plus tard, en janvier.",
            "Les trois branches paient le contrat. Elles n'ont pas le choix : elles ont signé ensemble."],
            effets:{issue:"testament_vrai", reputation:{humains:10, parias:8}, renom:10,
                    flag:"mericourt_hospice"}},
          designe_ok:{ fin:true, texte:[
            "« Monsieur. Il est trois heures. Ils sont tous là. Dites-le vous-même. »",
            "Il met du temps à rassembler l'air. Puis il désigne la branche cadette — la seule qui ne lui ait rien fait signer — et il le dit assez fort pour que le notaire l'écrive et que trois avocats l'entendent.",
            "Ce n'est pas un testament. C'est une déclaration devant sept témoins, et cela suffit à faire pencher un tribunal.",
            "Les deux autres branches plaident. Elles plaideront six ans et elles perdront."],
            effets:{issue:"branche_choisie", reputation:{humains:8}, renom:6}},
          designe_ko:{ texte:[
            "Il ouvre la bouche, et rien ne sort. Il est quatre heures moins le quart et l'après-midi a été long.",
            "Un avocat en profite pour dire qu'on abuse d'un mourant, et il n'a pas complètement tort."],
            effets:{xp:10}, suite:"partage"},
          partage:{ fin:true, texte:[
            "Un tiers chacun : la terre à l'aînée, l'hôtel d'Astrah à la cadette, le nom et les rentes à la troisième.",
            "Les trois signent parce qu'aucune ne peut prouver mieux et qu'aucune ne veut plaider dix ans.",
            "Le vieil homme meurt en janvier. Personne ne monte le voir entre deux heures et cinq heures, sauf le médecin, qui monte tous les jours jusqu'au dernier."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   19 — LA FILLE DU GÉNÉRAL
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_HAUTECOUR", type:'contrat', titre:"La Fille du général",
  commanditaire:"Maison de Hautecour", maison:"Maison de Hautecour",
  or:2500, danger:"dangereux", categorie:"sauvetage", prix:true,
  lieux:["LOC_018","LOC_012","LOC_002"],
  pitch:"La fille adulte d'un général a rejoint volontairement les ennemis de son père. Il exige qu'on la ramène, et il ne demande pas si elle le veut.",
  paye:["ramenee","laissee","negociee"],
  issues:{
    ramenee:"La fille du général de Hautecour est rentrée sous escorte.",
    laissee:"La fille du général de Hautecour est restée où elle était, et son père a payé quand même.",
    negociee:"Il y a eu une trêve à Hautecour, et c'est sa fille qui l'a négociée.",
    abandonnee:"Personne n'a ramené la fille du général.",
    refusee:"Yohan a refusé les termes de Hautecour.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Le camp adverse est à six jours.",
      ev:{ id:"CHH_1", titre:"Un général qui ne demande pas", famille:"GUERRE", rarete:"majeur",
        image:"evt_lances",
        scenes:{
          start:{ texte:[
            "Le général de Hautecour a soixante ans, quatre campagnes derrière lui, et il reçoit sous une tente où l'on n'a pas défait la carte depuis trois semaines.",
            "« Ma fille est passée chez Vaubrun il y a deux mois. Elle est partie de nuit, à cheval, seule, et elle n'a pas été enlevée. »",
            "Il tape la carte du plat de la main. « Vaubrun s'en sert. Il la montre. Il fait circuler des lettres qu'elle signe. »",
            "Il relève la tête. « Ramenez-la. Je ne discute pas ce point. »"],
            choix:[
              {label:"Demander pourquoi elle est partie", detail:"Deux mois, à cheval, de nuit, seule",
               suite:"pourquoi"},
              {label:"Demander à voir les lettres", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"lettres_ok", echec:"lettres_ko"},
              {label:"Accepter sans discuter", detail:"Il a dit qu'il ne discutait pas",
               suite:"termes", effets:{suspicion:-2}},
            ]},
          pourquoi:{ texte:[
            "Il ne répond pas tout de suite, et quand il répond, c'est en regardant la carte.",
            "« Parce que j'ai fait brûler Sainte-Ombre. »",
            "Il ne se justifie pas. « Quatre cents feux, un dépôt de vivres, et une garnison de Vaubrun dedans. C'était juste militairement. Ma fille y avait passé deux étés chez sa tante. »",
            "Il roule la carte. « Elle est partie onze jours après. »"],
            effets:{xp:24, flag:"hautecour_sainte_ombre"}, suite:"termes"},
          lettres_ok:{ texte:[
            "Trois lettres, sa signature, son écriture. Elles ne disent rien de militaire : elles décrivent Sainte-Ombre.",
            "Nombre de maisons, nombre de morts, noms des familles. C'est un inventaire, écrit par quelqu'un qui connaissait ces gens.",
            "Vaubrun ne s'en sert pas comme d'un otage. Il s'en sert comme d'un témoin, et c'est bien pire pour Hautecour."],
            effets:{xp:26, flags:["hautecour_sainte_ombre","hautecour_temoin"]}, suite:"termes"},
          lettres_ko:{ texte:["« Des lettres », dit-il. « De la propagande. » Il ne les montrera pas."],
            effets:{xp:5}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille cinq cents. Vivante, et ici. »",
            "Il ajoute, du ton d'un homme qui règle une formalité : « Et la coutume sera honorée avant votre départ. Ma maison n'a jamais manqué à ses obligations, quelles qu'elles soient. »",
            "Il ne dit pas qu'il l'a d'abord proposée à un autre, et Yohan ne le saura que plus tard."]},
        }}},

    { id:"camp", delai:[2,4], attente:"Six jours de route et une ligne à traverser.",
      ev:{ id:"CHH_2", titre:"Chez Vaubrun", famille:"GUERRE", rarete:"majeur",
        image:"evt2_convoi",
        scenes:{
          start:{ texte:[
            "On ne traverse pas une ligne de front : on la contourne par le nord, où elle n'est tenue que par des postes.",
            "Le camp de Vaubrun est un vrai camp — palissade, fossé, ordre — et la fille du général n'y est pas prisonnière. Elle a une tente, un cheval, et elle traverse le camp sans escorte.",
            "Elle a vingt-cinq ans. Elle écrit beaucoup."],
            choix:[
              {label:"L'aborder directement", detail:"Elle circule librement, autant en profiter",
               suite:"aborde"},
              {label:"L'enlever de nuit", detail:"Jet d'Agilité (15) · c'est ce pour quoi on est payé",
               test:{stat:"agi", dc:15}, reussite:"enleve_ok", echec:"enleve_ko"},
              {label:"Voir d'abord ce qu'elle écrit", detail:"Jet de Précision (14)",
               test:{stat:"precision", dc:14}, reussite:"ecrit_ok", echec:"ecrit_ko"},
            ]},
          aborde:{ texte:[
            "Elle ne fuit pas et n'appelle pas. Elle repose sa plume et le regarde arriver.",
            "« Mon père vous paie combien ? »",
            "Elle ne l'attend pas pour continuer. « Le dernier, c'était mille huit cents. Il n'est pas allé plus loin que la ligne. »",
            "Elle referme son cahier. « Asseyez-vous. Puisque vous êtes là, autant que quelqu'un écoute. »"],
            effets:{xp:24, flag:"hautecour_elle_parle"}, fin:true},
          enleve_ok:{ texte:[
            "Une tente en bordure, un fossé, un cheval mené à la main sur six cents pas, et une femme qui ne se débat pas parce qu'elle a compris que se débattre la ferait tuer.",
            "À la troisième lieue, elle dit : « Vous savez qu'il va me marier à Vaubrun pour finir la guerre ? C'est ce qu'il négociait avant que je parte. »",
            "Elle le dit calmement. Il reste trois jours de route."],
            effets:{xp:30, fat:14, flags:["hautecour_enlevee","hautecour_mariage"]}, fin:true},
          enleve_ko:{ texte:[
            "Le cheval bronche à la palissade et le camp se réveille en trente secondes.",
            "Il ressort seul, poursuivi sur une lieue, avec un carreau dans l'épaule et rien d'autre."],
            effets:{pv:-20, fat:18, xp:12}, fin:true},
          ecrit_ok:{ texte:[
            "Elle écrit un inventaire. Trois cent onze noms, à ce jour, avec l'âge et le hameau : tous les habitants de Sainte-Ombre.",
            "Sur la dernière page, en tête, une ligne : *Pour qu'on ne puisse pas dire qu'il n'y avait personne.*",
            "Elle ne renseigne pas Vaubrun. Elle établit un compte, et elle le fait chez celui qui a intérêt à ce qu'il existe."],
            effets:{xp:32, flags:["hautecour_temoin","hautecour_inventaire"]}, fin:true},
          ecrit_ko:{ texte:["Elle écrit sous une tente ouverte, en plein jour, entourée de gens. On voit qu'elle écrit beaucoup et on ne voit pas quoi."],
            effets:{xp:8}, fin:true},
        }}},

    { id:"decision", delai:[1,3], attente:"Il faut rentrer, avec elle ou sans elle.",
      ev:{ id:"CHH_3", titre:"Ce qu'on ramène à un général", famille:"GUERRE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Deux mille cinq cents écus contre une femme de vingt-cinq ans qui n'est prisonnière de personne et qui compte les morts d'un village que son père a brûlé.",
            "Le contrat dit : vivante, et ici."],
            choix:[
              {label:"La ramener", detail:"C'est ce qui a été payé",
               suite:"ramene",
               effets:{issue:"ramenee", reputation:{humains:8, parias:-10}, renom:4}},
              {label:"La ramener avec l'inventaire, et le faire lire devant l'état-major",
               detail:"Requiert de savoir ce qu'elle écrit",
               requis:{flag:"hautecour_inventaire"}, suite:"inventaire",
               effets:{issue:"negociee", reputation:{humains:-6, parias:14}, renom:12, suspicion:8}},
              {label:"La laisser et aller le dire à son père",
               detail:"Requiert de l'avoir écoutée · il ne paiera peut-être pas",
               requis:{flag:"hautecour_elle_parle"}, suite:"laisse",
               effets:{issue:"laissee", reputation:{humains:-8, parias:12}, renom:6}},
            ]},
          ramene:{ fin:true, texte:[
            "Six jours de route. Elle ne parle pas et ne cherche pas à s'échapper.",
            "Le général paie devant sa tente, compte lui-même, et ne la regarde pas descendre de cheval.",
            "Elle est mariée à Vaubrun en octobre. La guerre s'arrête. On dit que c'est un beau mariage.",
            "Elle continue d'écrire. Personne ne lit ce qu'elle écrit."]},
          inventaire:{ fin:true, texte:[
            "Elle rentre d'elle-même, à une condition : qu'on la laisse lire.",
            "Elle lit trois cent onze noms devant l'état-major de Hautecour, en entier, âge et hameau, pendant quarante minutes, sans qu'un officier ose sortir.",
            "Son père écoute jusqu'au bout, debout, et ne l'interrompt pas une seule fois.",
            "Il y a une trêve trois semaines plus tard, négociée par elle, qui coûte à Hautecour deux vallées et le dépôt du nord. C'est une mauvaise trêve militairement. Elle tient encore quatre ans après.",
            "Le général paie le contrat en entier et n'adresse plus la parole à Yohan."]},
          laisse:{ fin:true, texte:[
            "Il rentre seul et il le dit sous la tente, en face : elle est vivante, elle n'est prisonnière de personne, et elle ne rentrera pas.",
            "Le général reste très longtemps sans rien dire. Puis : « Elle a dit pourquoi ? »",
            "« Sainte-Ombre. »",
            "Il hoche la tête une fois. Il paie en entier, sans compter.",
            "« Je savais », dit-il à la porte de la tente. « Je voulais l'entendre de quelqu'un qui n'a rien à y gagner. »"]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   20 — LE PACTE DE LA HARDE
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_BRECOURT", type:'contrat', titre:"Le Pacte de la Harde",
  commanditaire:"Maison de Brécourt", maison:"Maison de Brécourt",
  or:2000, danger:"dangereux", categorie:"enquête", prix:true,
  lieux:["LOC_010","LOC_020"],
  pitch:"Un seigneur affirme que les Hommes-Bêtes ont rompu une trêve qu'aucune des deux parties ne peut reconnaître publiquement. Il veut qu'on le prouve.",
  paye:["treve_tenue","treve_rompue","borne_rendue"],
  issues:{
    treve_tenue:"La trêve de Brécourt tient encore, et l'on sait qui avait déplacé la borne.",
    treve_rompue:"La trêve de Brécourt est rompue. Les deux camps arment.",
    borne_rendue:"La borne de Brécourt est revenue où elle était, et personne n'a rien dit publiquement.",
    abandonnee:"Personne n'a établi qui avait rompu la trêve de Brécourt.",
    refusee:"Yohan a refusé les termes de Brécourt.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Les bornes sont dans la forêt, et elles ne bougent pas seules.",
      ev:{ id:"CHP_1", titre:"Une trêve qu'on ne peut pas avouer", famille:"HOMME_BETE", rarete:"majeur",
        image:"evt_pierres",
        scenes:{
          start:{ texte:[
            "Dame Ysoré de Brécourt garde les bornes de la trêve depuis huit ans et connaît les quarante-trois par leur numéro.",
            "« Mon père a juré cette trêve à genoux devant une harde, il y a trente ans. Ce n'est écrit nulle part et cela ne peut pas l'être : une maison humaine n'avoue pas avoir traité avec des Hommes-Bêtes. »",
            "Elle pose un croquis. « Quarante-trois bornes. La dix-neuf a bougé de soixante pas vers le sud cet hiver. Soixante pas de forêt ancienne. »",
            "Elle relève les yeux. « Mon père dit qu'ils ont rompu. Il lève des hommes. Moi, je veux savoir qui a bougé la borne. »"],
            choix:[
              {label:"Demander qui d'autre gagne à ce que la trêve tombe", detail:"Une trêve secrète arrange peu de monde",
               suite:"qui"},
              {label:"Demander comment on déplace une borne", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"comment_ok", echec:"comment_ko"},
              {label:"Accepter et aller à la dix-neuf", detail:"C'est là que c'est",
               suite:"termes"},
            ]},
          qui:{ texte:[
            "« Les coupeurs. »",
            "Elle le dit sans hésiter, ce qui veut dire qu'elle y pense depuis l'hiver. « La forêt de la trêve est la dernière futaie ancienne à quarante lieues. Une compagnie de Port-Noir propose depuis deux ans d'acheter la coupe. Mon père refuse à cause de la trêve. »",
            "Elle range le croquis. « Si la trêve tombe, il n'y a plus de raison de refuser. »"],
            effets:{xp:24, flag:"brecourt_coupeurs"}, suite:"termes"},
          comment_ok:{ texte:[
            "« Une borne de trêve, c'est un bloc de granit de sept cents livres enfoncé de quatre pieds. »",
            "Elle sourit sans joie. « Il faut un treuil, un attelage, et une journée. Une harde ne déplace pas une borne : elle l'arrache et la casse, quand elle veut dire quelque chose. »",
            "« La dix-neuf n'est pas cassée. Elle est reposée droite, à soixante pas. Proprement. »"],
            effets:{xp:26, flag:"brecourt_proprement"}, suite:"termes"},
          comment_ko:{ texte:["« Elle a bougé », dit-elle. « De soixante pas. C'est tout ce que je sais et c'est pour ça que je vous paie. »"],
            effets:{xp:5}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille écus. Qui a bougé la dix-neuf. »",
            "Elle ajoute : « Et si la réponse est : ma maison, dites-la-moi quand même. Surtout si c'est ma maison. »"]},
        }}},

    { id:"borne", delai:[2,4], attente:"La borne dix-neuf est à deux jours de forêt.",
      ev:{ id:"CHP_2", titre:"La dix-neuf", famille:"HOMME_BETE", rarete:"majeur",
        image:"evt_pierres",
        scenes:{
          start:{ texte:[
            "La borne dix-neuf est un bloc de granit gravé d'une main humaine d'un côté et d'une entaille en V de l'autre. Elle est droite, calée, propre.",
            "À soixante pas au nord, le trou d'origine est encore ouvert. On n'a pas rebouché.",
            "Le sol entre les deux porte deux ornières parallèles, à peine visibles sous six semaines de feuilles."],
            choix:[
              {label:"Suivre les ornières", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"ornieres_ok", echec:"ornieres_ko"},
              {label:"Attendre la harde à la borne", detail:"Jet de Volonté (14) · ils viennent vérifier",
               test:{stat:"vol", dc:14}, reussite:"attend_ok", echec:"attend_ko"},
              {label:"Aller voir ce qu'il y a dans les soixante pas gagnés", detail:"Personne n'a regardé ce qu'on prenait",
               suite:"gagne"},
            ]},
          ornieres_ok:{ texte:[
            "Les ornières remontent vers le nord sur onze cents pas, contournent la coupe basse, et s'arrêtent à un chemin de débardage.",
            "Au bout du chemin, une baraque de coupeurs, fermée depuis l'hiver, avec un treuil sous bâche.",
            "Le treuil est marqué au fer d'une compagnie de Port-Noir."],
            effets:{xp:30, flags:["brecourt_treuil","brecourt_coupeurs"]}, fin:true},
          ornieres_ko:{ texte:["Six semaines de feuilles et trois pluies. Les ornières se perdent à deux cents pas et ne disent rien de plus."],
            effets:{xp:8}, fin:true},
          attend_ok:{ texte:[
            "Ils viennent la troisième nuit. Ils sont quatre, ils ne sont pas armés pour se battre, et ils font ce que fait n'importe qui devant une borne déplacée : ils tournent autour.",
            "Le plus âgé passe la main sur l'entaille en V, longuement, comme on vérifie une signature.",
            "Puis il dit, en vardhi, à personne en particulier : « Ce n'est pas nous. » Et ils repartent vers le nord.",
            "Ils savaient qu'il était là depuis la première nuit."],
            effets:{xp:28, flag:"brecourt_pas_eux"}, fin:true},
          attend_ko:{ texte:["Trois nuits dans le froid sans que rien vienne. La quatrième, il rentre. La harde a peut-être attendu qu'il parte."],
            effets:{fat:14, xp:8}, fin:true},
          gagne:{ texte:[
            "Soixante pas sur quarante-trois bornes, cela ferait, si toutes bougeaient, un peu plus de deux cents arpents.",
            "Dans les soixante pas de la dix-neuf, il y a onze chênes de futaie ancienne, dont quatre de plus de deux cents ans.",
            "Ce n'est pas une frontière qu'on a déplacée. C'est une coupe qu'on a préparée."],
            effets:{xp:26, flag:"brecourt_coupeurs"}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"Le père de Dame Ysoré lève des hommes.",
      ev:{ id:"CHP_3", titre:"Ce qu'on dit à un seigneur qui arme", famille:"HOMME_BETE", rarete:"majeur",
        image:"evt_harde",
        scenes:{
          start:{ texte:[
            "Le seigneur de Brécourt a levé quatre-vingts hommes et il attend un prétexte pour les faire entrer dans la forêt.",
            "Sa fille est derrière lui, debout, et elle n'a rien dit depuis que Yohan est entré."],
            choix:[
              {label:"Nommer les coupeurs et le treuil",
               detail:"Requiert d'avoir trouvé le treuil · c'est vérifiable",
               requis:{flag:"brecourt_treuil"}, suite:"nomme",
               effets:{issue:"treve_tenue", reputation:{hommes_betes:20, humains:6}, renom:10}},
              {label:"Remettre la borne à sa place et ne rien déclarer",
               detail:"Requiert de savoir que ce n'est pas la harde · −300 or d'attelage",
               requis:{flag:"brecourt_pas_eux", or:300}, suite:"remet", effets:{or:-300},
               },
              {label:"Dire que la harde a rompu", detail:"C'est ce qu'il veut entendre, et c'est faux",
               suite:"rompt",
               effets:{issue:"treve_rompue", reputation:{hommes_betes:-26, humains:8}, renom:-4, or:400}},
              {label:"Dire qu'on n'a pas pu établir", detail:"Il entrera dans la forêt quand même",
               suite:"rien", effets:{issue:"abandonnee", reputation:{humains:-4}}},
            ]},
          nomme:{ fin:true, texte:[
            "Un treuil marqué au fer d'une compagnie de Port-Noir, dans une baraque de coupeurs, à onze cents pas d'une borne déplacée proprement.",
            "Le seigneur de Brécourt met une heure à admettre et un quart d'heure à passer de la colère contre la harde à la colère contre la compagnie.",
            "Les quatre-vingts hommes vont à Port-Noir au lieu d'aller dans la forêt. Ce qu'ils y font n'est pas légal et personne ne porte plainte.",
            "La borne dix-neuf revient à sa place en avril. Dame Ysoré paie en entier. « Vous avez rendu soixante pas de futaie à des gens qui ne peuvent pas vous remercier publiquement », dit-elle. « Alors je le fais à leur place. »"]},
          remet: { fin:true, texte:[
            "Trois cents écus d'attelage, une journée, six hommes payés à ne pas poser de questions, et sept cents livres de granit remises dans leur trou d'origine.",
            "On rebouche. On tasse. On remet les feuilles.",
            "Le seigneur de Brécourt envoie vérifier la semaine suivante et trouve la borne dix-neuf exactement où elle a toujours été. Il licencie ses quatre-vingts hommes en maugréant contre sa fille et contre les gardes-bornes qui ne savent pas compter.",
            "Personne n'a rien avoué. Personne n'a rien rompu. C'est exactement ce qu'une trêve qu'on ne peut pas reconnaître demande."],
            effets:{issue:"borne_rendue", reputation:{hommes_betes:16, humains:4}, renom:6,
                    flag:"brecourt_borne_rendue"}},
          rompt:{ fin:true, texte:[
            "« La harde a rompu. »",
            "Quatre cents écus de prime par-dessus le contrat, et quatre-vingts hommes qui entrent dans la forêt le surlendemain.",
            "Ils reviennent au bout de onze jours avec neuf morts et rien d'autre : on ne trouve pas une harde dans la Forêt des Mille Cornes quand elle ne veut pas être trouvée.",
            "La compagnie de Port-Noir achète la coupe au printemps. Deux cents arpents de futaie ancienne tombent en une saison.",
            "Dame Ysoré ne dit rien à Yohan. Elle ne lui parle plus du tout."]},
          rien:{ fin:true, texte:[
            "« Je n'ai pas pu établir qui a déplacé la borne. »",
            "Le seigneur paie la moitié et fait entrer ses hommes dans la forêt la semaine suivante, parce qu'un homme qui a levé quatre-vingts hommes ne les licencie pas pour un rapport vide.",
            "Dame Ysoré raccompagne Yohan jusqu'à la route. « Vous auriez pu inventer un nom », dit-elle. « Beaucoup l'auraient fait. »",
            "Ce n'est pas tout à fait un remerciement."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   21 — LA DETTE DE MONT-DRAKEN
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_DETTE", type:'contrat', titre:"La Dette de Mont-Draken",
  commanditaire:"Charles de Mont-Draken", maison:null,
  or:3400, danger:"extrême", categorie:"chasse",
  lieux:["LOC_003","LOC_012"],
  pitch:"Un ancien dragon que Charles croyait mort revient sur une terre qu'il considère comme sienne. Charles l'a blessé il y a vingt-deux ans, et il s'en souvient chaque jour.",
  paye:["dette_soldee","dette_reportee","charles_tenu"],
  issues:{
    dette_soldee:"Le dragon de Mont-Draken est mort. Charles a payé ce qu'il devait depuis vingt-deux ans.",
    dette_reportee:"Le dragon de Mont-Draken est reparti. Il reviendra, et Charles le sait.",
    charles_tenu:"Charles de Mont-Draken a réglé sa dette lui-même, et il ne s'en est pas remis.",
    abandonnee:"Le dragon tient toujours les hauteurs de Mont-Draken.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Charles ne dort plus depuis onze jours.",
      ev:{ id:"CHN_1", titre:"Vingt-deux ans", famille:"POLITIQUE", rarete:"majeur",
        image:"rc_charles",
        scenes:{
          start:{ pnj:"charles", texte:[
            "Charles de Mont-Draken reçoit seul, sans carte, sans capitaine, et c'est la première chose qui inquiète.",
            "« J'avais vingt-trois ans. Nous étions onze. Nous l'avons trouvé endormi dans la combe haute et nous lui avons mis quatre lances dans le flanc gauche. »",
            "Il regarde ses mains. « Il en a tué neuf. Je suis redescendu avec un autre, qui est mort dans le mois. Et j'ai raconté toute ma vie que nous l'avions tué. »",
            "Il relève la tête. « Il est revenu il y a onze jours. Il n'a rien brûlé. Il s'est posé sur la combe haute et il attend. »"],
            choix:[
              {label:"Demander ce qu'il attend", detail:"Onze jours à attendre, c'est une intention",
               suite:"attend"},
              {label:"Demander pourquoi il ne monte pas lui-même", detail:"Jet de Volonté (13)",
               test:{stat:"vol", dc:13}, reussite:"lui_ok", echec:"lui_ko"},
              {label:"Accepter", detail:"Il n'a demandé qu'une fois",
               suite:"termes"},
            ]},
          attend:{ pnj:"charles", texte:[
            "« Moi. »",
            "Il le dit sans emphase. « Il attend que je monte. Il ne descendra pas : il l'aurait déjà fait. Il s'est posé sur l'endroit exact où nous l'avons trouvé, et il attend. »",
            "Un temps. « J'ai envoyé deux hommes voir. Ils sont redescendus. Il ne les a pas touchés. »"],
            effets:{xp:20, flag:"draken_il_attend_charles"}, suite:"termes"},
          lui_ok:{ pnj:"charles", texte:[
            "La question le prend de flanc, et il a l'honnêteté de ne pas la contourner.",
            "« Parce que si je monte, je ne redescends pas, et Mont-Draken a besoin d'un seigneur cet hiver. »",
            "Il ajoute, plus bas : « Et parce que j'ai peur. J'ai cinquante-cinq ans, j'ai mené quatre campagnes, et j'ai peur d'une combe où je suis monté à vingt-trois ans. Vous pouvez le noter quelque part si ça vous amuse. »"],
            effets:{xp:26, flags:["draken_il_attend_charles","draken_charles_a_peur"]}, suite:"termes"},
          lui_ko:{ pnj:"charles", texte:["« Parce que je vous paie », dit-il, et le sujet est clos."],
            effets:{xp:6}, suite:"termes"},
          termes:{ fin:true, pnj:"charles", texte:[
            "« Trois mille quatre cents. C'est tout ce que j'ai de disponible et je ne le regrette pas. »",
            "Il raccompagne lui-même jusqu'à la porte. « Et si vous montez et que vous redescendez sans l'avoir tué, je paierai quand même. Je sais ce qu'il y a là-haut. »"]},
        }}},

    { id:"combe", delai:[2,4], attente:"La combe haute est à deux jours, et il attend.",
      ev:{ id:"CHN_2", titre:"La combe haute", famille:"ONDE", rarete:"majeur",
        image:"evt2_ossements",
        scenes:{
          start:{ texte:[
            "Il est là. Il fait quarante pas et il est vieux — vraiment vieux : l'écaille grise, l'œil laiteux, et quatre cicatrices alignées sur le flanc gauche.",
            "Il regarde Yohan monter les six cents derniers pas sans bouger d'un pouce.",
            "Puis il parle. Ce n'est pas de la parole : c'est quelque chose qui arrive dans la tête, et qui a le goût du fer chaud.",
            "*Tu n'es pas lui.*"],
            choix:[
              {label:"Répondre", detail:"Il a parlé le premier",
               suite:"parle"},
              {label:"L'attaquer", detail:"C'est ce pour quoi on est monté",
               suite:"combat"},
              {label:"Se servir de l'Onde pour répondre en nature",
               detail:"Requiert un pouvoir · il saura exactement ce que vous êtes",
               requis:{pouvoir:"foudre"}, suite:"onde"},
            ]},
          parle:{ texte:[
            "« Non. Je suis payé par lui. »",
            "*Alors redescends. Dis-lui que j'attends. J'ai attendu vingt-deux ans, je peux attendre l'hiver.*",
            "Un silence, et puis, plus lent : *Il a dit qu'il m'avait tué. Je l'ai entendu dire dans les vallées pendant vingt-deux ans. Je veux qu'il monte le dire ici.*"],
            effets:{xp:30, flag:"draken_il_veut_charles"}, fin:true},
          onde:{ texte:[
            "Il laisse l'Onde monter — pas pour frapper : pour être vu.",
            "La chose vieille lève la tête de six pouces, ce qui chez elle est un mouvement énorme.",
            "*Ah.* Un temps. *Il en reste donc.*",
            "*Redescends, sang de Karlsberg. Cette dette n'est pas la tienne et je ne veux pas de ce qui t'arrivera si tu la prends.*"],
            effets:{xp:34, sang:6, suspicion:6, flags:["draken_il_veut_charles","draken_reconnu"]}, fin:true},
          combat:{ texte:["Il ne bouge pas quand Yohan tire. Il bouge après, et c'est très vite pour quelque chose d'aussi vieux."],
            combat:{ groupe:[{bst:"BST_012", n:1}], victoire:"tue", defaite:"repousse", mortel:true }},
          tue:{ texte:[
            "Il met une heure à mourir dans la combe haute, sur l'endroit exact où onze hommes l'ont trouvé endormi il y a vingt-deux ans.",
            "À la fin, il tourne l'œil laiteux vers Yohan et il n'y a plus rien dedans qui ressemble à une intention."],
            effets:{xp:90, sang:14, issue:"dette_soldee", renom:18, suspicion:10}, fin:true},
          repousse:{ texte:[
            "Il n'achève pas. Il aurait pu — il aurait dû — et il ne le fait pas.",
            "Yohan redescend les six cents pas sur le ventre, avec trois côtes cassées, et il entend derrière lui, très distinctement :",
            "*Dis-lui que j'attends.*"],
            effets:{pv:-45, fat:30, xp:25, flag:"draken_il_veut_charles"}, fin:true},
        }}},

    { id:"retour", delai:[1,2], attente:"Il faut redescendre le lui dire.",
      ev:{ id:"CHN_3", titre:"Ce qu'on rapporte à un homme qui a menti vingt-deux ans", famille:"POLITIQUE", rarete:"majeur",
        image:"rc_charles",
        scenes:{
          start:{ pnj:"charles", texte:[
            "Charles écoute sans s'asseoir. Quand Yohan a fini, il reste debout un long moment devant la fenêtre qui donne sur les hauteurs.",
            "« Vingt-deux ans que je raconte que je l'ai tué. J'ai été fait chevalier pour ça. »"],
            choix:[
              {label:"Lui dire de monter", detail:"Requiert de savoir ce que le dragon veut",
               requis:{flag:"draken_il_veut_charles"}, suite:"monte"},
              {label:"Proposer d'y retourner", detail:"Une seconde tentative, mieux préparée",
               suite:"retourne", effets:{etape:"combe"}},
              {label:"Lui conseiller de ne rien faire", detail:"Il attend depuis vingt-deux ans. Il peut attendre encore.",
               suite:"rien",
               effets:{issue:"dette_reportee", reputation:{humains:-4}, renom:2}},
            ]},
          monte:{ pnj:"charles", texte:[
            "Il ne discute pas. C'est ce qui est terrible : il ne discute pas une seconde.",
            "« Bien. »",
            "Il met deux jours à mettre ses affaires en ordre — testament, garnison, lettre à sa sœur — et il monte le troisième matin, seul, à pied, sans armure.",
            "Yohan l'accompagne jusqu'à la limite des arbres. Charles lui serre la main là, et ne dit rien de particulier."],
            suite:"apres"},
          apres:{ fin:true, pnj:"charles", texte:[
            "Il redescend le lendemain soir.",
            "Il ne dit pas ce qui s'est passé là-haut et il ne le dira jamais à personne. Ce qu'on sait, c'est que le dragon est reparti dans la nuit vers l'est, et qu'on ne l'a plus revu sur les terres de Mont-Draken.",
            "Charles paie les trois mille quatre cents écus en entier, alors que Yohan n'a rien tué.",
            "« Vous m'avez fait monter », dit-il. « C'est plus que ce que je vous demandais. »",
            "Il ne raconte plus jamais l'histoire du dragon."],
            effets:{issue:"charles_tenu", reputation:{humains:12}, renom:14,
                    flag:"charles_est_monte"}},
          retourne:{ fin:true, pnj:"charles", texte:[
            "« Alors remontez », dit Charles. « Et prenez ce qu'il vous faut dans mes arsenaux. »"]},
          rien:{ fin:true, pnj:"charles", texte:[
            "« Ne rien faire. »",
            "Il répète les mots comme s'il les essayait. « Vingt-deux ans, et votre conseil est de ne rien faire. »",
            "Il paie en entier, parce qu'il l'avait dit.",
            "Le dragon reste sur la combe haute tout l'hiver. Au printemps, il descend d'une lieue. L'hiver suivant, d'une autre.",
            "Charles ne parle plus jamais de cette affaire, et il cesse de recevoir Yohan."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   22 — LE PONT DES TROIS ARMÉES
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_SALVERNE", type:'contrat', titre:"Le Pont des Trois Armées",
  commanditaire:"Maison de Salverne", maison:"Maison de Salverne",
  or:3200, danger:"très dangereux", categorie:"guerre", prix:true,
  lieux:["LOC_018","LOC_011","LOC_004"],
  pitch:"Trois forces convergent vers le même pont et aucune ne peut se permettre de céder. Salverne possède le pont et n'a pas d'armée.",
  paye:["pont_tenu","pont_partage","pont_detruit"],
  issues:{
    pont_tenu:"Salverne a tenu son pont contre deux armées, et fait payer le passage à la troisième.",
    pont_partage:"Le pont de Salverne a été ouvert aux trois, sous garde neutre.",
    pont_detruit:"Le pont de Salverne a sauté. Il n'y a plus de passage à quarante lieues.",
    abandonnee:"Le pont de Salverne a été pris par la première armée arrivée.",
    refusee:"Yohan a refusé les termes de Salverne.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Trois colonnes convergent, et la plus proche est à onze jours.",
      ev:{ id:"CHS2_1", titre:"Un pont et pas d'armée", famille:"GUERRE", rarete:"majeur",
        image:"evt_peage",
        scenes:{
          start:{ texte:[
            "Dame Guiraude de Salverne a vu passer trois guerres sur ce pont et compté chaque homme. Elle reçoit sur le pont lui-même, au milieu, parce que c'est là qu'on comprend le problème.",
            "« Quarante lieues sans autre passage. Trois colonnes convergent : Rochebrune par le nord, Vaubrun par l'est, et une compagnie franche que personne ne revendique par le sud. »",
            "Elle regarde l'eau. « J'ai soixante hommes et un pont. Celui qui le prend gagne la campagne, et les trois le savent. »"],
            choix:[
              {label:"Demander qui paie la compagnie franche", detail:"Une compagnie que personne ne revendique est payée par quelqu'un",
               suite:"franche"},
              {label:"Demander si le pont peut sauter", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"saute_ok", echec:"saute_ko"},
              {label:"Accepter", detail:"Onze jours",
               suite:"termes"},
            ]},
          franche:{ texte:[
            "« Astrah. »",
            "Elle le dit à voix basse, bien qu'il n'y ait personne à cent pas. « Pas officiellement, évidemment. Six cents hommes payés par la chancellerie pour se trouver sur un pont dont la Couronne veut le contrôle depuis quarante ans. »",
            "Elle se redresse. « Rochebrune et Vaubrun se battent pour une campagne. Astrah se bat pour le pont. Ce n'est pas la même chose, et c'est la seule qui compte pour moi. »"],
            effets:{xp:26, flag:"salverne_astrah"}, suite:"termes"},
          saute_ok:{ texte:[
            "« Trois arches, romaines, sept cents ans. »",
            "Elle tape du talon. « La deuxième arche a été reprise il y a soixante ans, mal. On peut la faire tomber avec quarante livres de poudre et deux hommes qui savent où poser. »",
            "Elle regarde l'eau. « Mon arrière-grand-père l'a fait en l'an vingt-neuf. Il a fallu onze ans pour rebâtir. »"],
            effets:{xp:24, flag:"salverne_deuxieme_arche"}, suite:"termes"},
          saute_ko:{ texte:["« Trois arches, sept cents ans, et je ne veux pas en parler. » Elle change de sujet et ne le laisse pas revenir dessus."],
            effets:{xp:5}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Trois mille deux cents écus. Le pont reste à Salverne. »",
            "Elle ajoute, très droite : « Et nous réglerons la coutume ce soir. Je ne veux pas mourir en devant quelque chose à quelqu'un. »"]},
        }}},

    { id:"onze", delai:[2,3], attente:"Onze jours, et trois colonnes qui avancent.",
      ev:{ id:"CHS2_2", titre:"Onze jours", famille:"GUERRE", rarete:"majeur",
        image:"evt_lances",
        scenes:{
          start:{ texte:[
            "Soixante hommes, un pont de trois arches, et onze jours.",
            "Rochebrune arrivera le neuvième. Vaubrun le dixième. La compagnie franche le douzième — ce qui veut dire qu'elle attend que les deux autres se soient usées."],
            choix:[
              {label:"Fortifier la tête de pont", detail:"Soixante hommes derrière un ouvrage valent trois cents à découvert",
               suite:"fortifie", effets:{fat:12, xp:20, flag:"salverne_fortifie"}},
              {label:"Aller au-devant de Rochebrune", detail:"Jet de Volonté (14) · négocier avant qu'ils voient le pont",
               test:{stat:"vol", dc:14}, reussite:"parle_ok", echec:"parle_ko"},
              {label:"Faire savoir aux deux premiers que la troisième est payée par Astrah",
               detail:"Requiert de le savoir · deux ennemis qui découvrent un troisième larron",
               requis:{flag:"salverne_astrah"}, suite:"revele"},
            ]},
          fortifie:{ fin:true, texte:[
            "Onze jours de terrassement : un fossé, une palissade, deux redans, et des chevaux de frise pris sur les charrettes du village.",
            "Le neuvième jour, Rochebrune arrive et s'arrête à six cents pas. On ne charge pas une tête de pont fortifiée avec des hommes fatigués par onze jours de marche.",
            "Ils campent. Vaubrun campe le lendemain, à une lieue. Deux armées immobiles devant soixante hommes derrière un fossé."]},
          parle_ok:{ fin:true, texte:[
            "Il les rencontre à deux jours du pont, sous bannière blanche, et il parle une heure.",
            "L'argument qui porte n'est pas le pont : c'est que Vaubrun arrivera le lendemain, et qu'une armée qui vient de forcer un pont est une armée qui reçoit la suivante en désordre.",
            "Rochebrune ralentit d'une journée. Une journée, sur un pont, c'est tout."],
            effets:{xp:28, flag:"salverne_rochebrune_ralenti"}},
          parle_ko:{ fin:true, texte:["On l'écoute par courtoisie et on continue d'avancer. Une armée en marche n'aime pas les gens qui lui disent d'attendre."],
            effets:{xp:10}},
          revele:{ fin:true, texte:[
            "Deux messages, portés par deux hommes différents, disant la même chose : *la troisième colonne est payée par la chancellerie d'Astrah et arrivera quand vous serez usés.*",
            "Rochebrune n'y croit pas. Vaubrun y croit tout de suite, parce qu'il a un cousin à la chancellerie et qu'il connaît l'écriture.",
            "Le neuvième jour, il n'y a qu'une armée devant le pont au lieu de deux."],
            effets:{xp:32, flag:"salverne_vaubrun_recule"}},
        }}},

    { id:"pont", delai:[1,2], attente:"Ils sont devant le pont.",
      ev:{ id:"CHS2_3", titre:"Ce qu'on fait d'un pont de sept cents ans", famille:"GUERRE", rarete:"majeur",
        image:"evt_peage",
        scenes:{
          start:{ texte:[
            "Ils sont là. Une armée au moins, deux si rien n'a été fait, et la compagnie franche à deux jours derrière.",
            "Dame Guiraude est sur le pont, au milieu, comme au premier jour."],
            choix:[
              {label:"Tenir", detail:"Soixante hommes, et ce qu'on a préparé",
               suite:"tenir"},
              {label:"Ouvrir le pont aux trois, sous garde de Salverne",
               detail:"Jet de Volonté (15) · un péage neutre plutôt qu'une prise",
               test:{stat:"vol", dc:15}, reussite:"ouvre_ok", echec:"ouvre_ko"},
              {label:"Faire sauter la deuxième arche",
               detail:"Requiert de savoir où poser · plus de pont, plus de campagne",
               requis:{flag:"salverne_deuxieme_arche"}, suite:"saute",
               effets:{issue:"pont_detruit", reputation:{humains:-14}, renom:6}},
            ]},
          tenir:{ texte:["Soixante hommes en travers d'une tête de pont, contre ce qui vient."],
            bataille:{ def:"BAT_ROUTE", victoire:"tenu", defaite:"pris" }},
          tenu:{ fin:true, texte:[
            "Le pont tient. Il tient parce qu'il est étroit, parce qu'une tête de pont fortifiée coûte cher, et parce qu'une armée qui sait qu'une troisième arrive n'insiste pas.",
            "Rochebrune se retire au sixième jour. Vaubrun ne charge jamais. La compagnie franche arrive, trouve un pont tenu et deux armées parties, et repart vers le nord sans un mot.",
            "Salverne fait payer le passage à Rochebrune trois semaines plus tard, au tarif d'avant-guerre.",
            "Dame Guiraude paie en entier. « Trois guerres sur ce pont », dit-elle. « C'est la première où je n'ai pas eu à choisir un camp. »"],
            effets:{issue:"pont_tenu", reputation:{humains:14}, renom:14}},
          pris:{ fin:true, texte:[
            "La tête de pont cède le deuxième jour. On ne tient pas soixante contre quinze cents, même sur un pont.",
            "Dame Guiraude est prise sur le pont, au milieu, où elle était restée. On ne la tue pas — on ne tue pas une maîtresse de péage — mais Salverne perd le pont, et avec lui à peu près tout.",
            "Elle paie la moitié du contrat six mois plus tard, depuis Astrah, où elle vit maintenant."],
            effets:{issue:"abandonnee", renom:-6}},
          ouvre_ok:{ fin:true, texte:[
            "L'idée est absurde et c'est ce qui la sauve : Salverne ouvre le pont aux trois forces, l'une après l'autre, à raison d'une par jour, sous garde de ses soixante hommes et au tarif du péage ordinaire.",
            "Aucune ne peut refuser sans se donner le tort. Aucune ne peut forcer sans se mettre les deux autres à dos.",
            "Rochebrune passe le premier, Vaubrun le deuxième, la compagnie franche le troisième et repart aussitôt vers le nord, sa mission étant devenue sans objet.",
            "La campagne se décide quarante lieues plus loin, ce qui ne regarde plus Salverne.",
            "Dame Guiraude paie en entier. « Personne n'a pris mon pont », dit-elle. « Personne ne l'a défendu non plus. C'est très supérieur. »"],
            effets:{issue:"pont_partage", reputation:{humains:16}, renom:12,
                    flag:"salverne_pont_neutre"}},
          ouvre_ko:{ texte:["« Ouvrir à trois armées ennemies. » Dame Guiraude le regarde comme s'il avait proposé de brûler le pont lui-même. « Non. »"],
            effets:{xp:10}, suite:"tenir"},
          saute:{ fin:true, texte:[
            "Quarante livres de poudre sous la deuxième arche, deux hommes qui savent où poser, et sept cents ans qui tombent dans l'eau en quatre secondes.",
            "Les trois armées restent sur leurs rives respectives. La campagne s'arrête faute de passage. Personne ne gagne.",
            "Quarante lieues sans pont. Le commerce du sel meurt en deux ans. Onze villages se vident.",
            "Dame Guiraude paie en entier et quitte Salverne le mois suivant. Elle avait dit qu'elle ne voulait pas en parler."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   23 — LA COURONNE DANS LA BOUE
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_ARTOIS", type:'contrat', titre:"La Couronne dans la boue",
  commanditaire:"Maison d'Artois-Noir", maison:"Maison d'Artois-Noir",
  or:3600, danger:"dangereux", categorie:"récupération", prix:true,
  lieux:["LOC_018","LOC_002","LOC_004"],
  pitch:"Une couronne princière a disparu pendant une défaite. La récupérer peut décider qui possède une revendication politique — et trois maisons la cherchent.",
  paye:["couronne_rendue","couronne_fondue","couronne_vendue"],
  issues:{
    couronne_rendue:"La couronne d'Artois-Noir est revenue à la maison, et la revendication tient.",
    couronne_fondue:"La couronne princière a été fondue. Il n'y a plus de revendication à porter.",
    couronne_vendue:"La couronne princière a changé de camp, et quelqu'un d'autre porte la revendication.",
    abandonnee:"La couronne princière est encore quelque part dans la boue des Champs de Cendre.",
    refusee:"Yohan a refusé les termes d'Artois-Noir.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Les Champs de Cendre sont vastes et il a plu.",
      ev:{ id:"CHA2_1", titre:"Ce qui vaut une province", famille:"POLITIQUE", rarete:"majeur",
        image:"cg_cendre",
        scenes:{
          start:{ texte:[
            "Dame Ermengarde d'Artois-Noir a tenu la maison pendant les quatre ans où son frère était prisonnier, et cela se voit à la façon dont elle range ses papiers.",
            "« La déroute de la Grande Fosse, il y a sept mois. Mon frère portait la couronne princière — pas pour la parade : parce qu'une revendication se porte physiquement, c'est la coutume d'Astrah. »",
            "Elle joint les mains. « Il l'a perdue dans la boue en fuyant. Quatre mille hommes ont fui sur le même quart de lieue. »",
            "Elle relève les yeux. « Sans elle, notre revendication ne vaut rien devant la chancellerie. Deux autres maisons la cherchent depuis sept mois. »"],
            choix:[
              {label:"Demander à quoi elle ressemble", detail:"Il y a de la ferraille partout sur un champ de bataille",
               suite:"ressemble"},
              {label:"Demander qui d'autre cherche", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"qui_ok", echec:"qui_ko"},
              {label:"Accepter", detail:"Sept mois, et personne ne l'a trouvée",
               suite:"termes"},
            ]},
          ressemble:{ texte:[
            "« Un cercle de fer. Pas d'or, pas de pierres : du fer noirci, avec sept encoches. »",
            "Elle a un sourire sans joie. « C'est ce qui la rend introuvable. Quatre mille hommes ont perdu de la ferraille dans cette boue. Un cercle de fer noirci ressemble à un cercle de fer noirci. »",
            "« Sauf que les sept encoches sont numérotées à l'intérieur, au poinçon. Personne ne le sait sauf nous et la chancellerie. »"],
            effets:{xp:24, flag:"artois_sept_encoches"}, suite:"termes"},
          qui_ok:{ texte:[
            "« Vauclair et Cendrepont. Vauclair par ambition, Cendrepont pour la revendre à Vauclair. »",
            "Elle marque un temps. « Et il y a les glaneurs. Depuis sept mois, une soixantaine de gens du pays retournent cette boue tous les jours. Si elle sort, elle sortira de là. »"],
            effets:{xp:22, flag:"artois_glaneurs"}, suite:"termes"},
          qui_ko:{ texte:["« D'autres maisons », dit-elle. « Vous les rencontrerez peut-être. Ne leur dites pas ce que vous cherchez. »"],
            effets:{xp:5}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Trois mille six cents écus. Le cercle de fer, dans ma main. »",
            "Elle ajoute, sans détour : « Et la coutume — oui. Ma maison la doit, ma maison la paiera, et j'aimerais autant que ce soit réglé pendant que nous avons encore une maison. »"]},
        }}},

    { id:"fosse", delai:[2,4], attente:"Il faut retourner la boue de la Grande Fosse.",
      ev:{ id:"CHA2_2", titre:"La boue de la Grande Fosse", famille:"POLITIQUE", rarete:"majeur",
        image:"cg_cendre",
        scenes:{
          start:{ texte:[
            "Sept mois après, la Grande Fosse est un champ de boue grise où soixante personnes fouillent tous les jours avec des crochets.",
            "Ils vendent ce qu'ils trouvent au poids : fer aux forges, cuir aux tanneurs, dents aux barbiers.",
            "Ils savent exactement ce qui est sorti de cette boue depuis sept mois, parce que c'est leur métier."],
            choix:[
              {label:"Acheter le registre des glaneurs", detail:"−250 or · ils tiennent des comptes",
               requis:{or:250}, suite:"registre", effets:{or:-250}},
              {label:"Chercher soi-même", detail:"Jet de Précision (15) · un quart de lieue de boue",
               test:{stat:"precision", dc:15}, reussite:"trouve_ok", echec:"trouve_ko"},
              {label:"Demander qui a acheté du fer noirci ces sept mois", detail:"Jet de Volonté (13) · les forges tiennent des livres",
               test:{stat:"vol", dc:13}, reussite:"forge_ok", echec:"forge_ko"},
            ]},
          registre:{ texte:[
            "Ils ne tiennent pas un registre : ils en tiennent trois, un par famille de glaneurs, et ils se surveillent mutuellement.",
            "Un cercle de fer noirci est sorti au deuxième mois. Il a été vendu quatre sous à un ferrailleur ambulant qui passe tous les quarante jours.",
            "Le ferrailleur repassera dans onze jours."],
            effets:{xp:28, flag:"artois_ferrailleur"}, fin:true},
          trouve_ok:{ texte:[
            "Onze jours de boue, un crochet, et une méthode : ne pas chercher la couronne, chercher où un homme qui fuit à cheval passerait.",
            "Il la trouve au onzième jour, à quatre pieds de profondeur, dans l'ornière d'un chemin de charrette que quatre mille hommes ont piétiné.",
            "Sept encoches, numérotées au poinçon à l'intérieur."],
            effets:{xp:40, fat:20, flag:"artois_couronne"}, fin:true},
          trouve_ko:{ texte:["Onze jours de boue et deux cent quarante livres de ferraille inutile. La Grande Fosse fait un quart de lieue et il a plu sept mois."],
            effets:{fat:22, xp:12}, fin:true},
          forge_ok:{ texte:[
            "Les forges de la région tiennent des livres, et un ferrailleur ambulant vend toujours au même endroit.",
            "Il y a onze semaines, quatre livres de fer noirci ont été vendues à la forge de Combe-Basse — dont un cercle que le maître de forge n'a pas fondu, parce qu'il était trop bien fait pour un cercle de charrette.",
            "Il l'a mis de côté. Il l'a toujours."],
            effets:{xp:34, flags:["artois_forge","artois_couronne"]}, fin:true},
          forge_ko:{ texte:["Onze forges, onze livres de comptes, et des maîtres de forge qui n'aiment pas qu'on lise leurs écritures. On apprend qu'il passe beaucoup de fer noirci et rien de plus."],
            effets:{xp:10}, fin:true},
        }}},

    { id:"decision", delai:[1,3], attente:"Un cercle de fer, et trois maisons qui le cherchent.",
      ev:{ id:"CHA2_3", titre:"Un cercle de fer noirci", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Un cercle de fer noirci à sept encoches, dans une bourse, sur une table d'auberge.",
            "Il vaut une province, une revendication, et probablement une guerre — et il ressemble à un cercle de charrette."],
            choix:[
              {label:"Le rendre à Artois-Noir",
               detail:"Requiert de l'avoir · c'est ce qui a été payé",
               requis:{flag:"artois_couronne"}, suite:"rend",
               effets:{issue:"couronne_rendue", reputation:{humains:10}, renom:10}},
              {label:"Le vendre à Vauclair",
               detail:"Requiert de l'avoir · +2800 or, et une revendication qui change de main",
               requis:{flag:"artois_couronne"}, suite:"vend",
               effets:{or:2800, issue:"couronne_vendue", reputation:{humains:-12}, renom:-6}},
              {label:"Le faire fondre",
               detail:"Requiert de l'avoir · plus de couronne, plus de revendication, plus de guerre",
               requis:{flag:"artois_couronne"}, suite:"fond",
               effets:{issue:"couronne_fondue", reputation:{humains:-8, parias:12}, renom:4}},
              {label:"Rendre l'avance : il n'est pas sorti de la boue",
               detail:"C'est vrai si l'on n'a rien trouvé",
               suite:"rien", effets:{issue:"abandonnee", reputation:{humains:-4}}},
            ]},
          rend:{ fin:true, texte:[
            "Dame Ermengarde le prend à deux mains, le retourne, et compte les sept encoches numérotées à l'intérieur.",
            "Elle ne pleure pas et elle ne remercie pas. Elle dit : « Bien », et elle le pose sur la table.",
            "La revendication d'Artois-Noir est déposée devant la chancellerie six semaines plus tard. Elle sera plaidée neuf ans.",
            "Son frère porte la couronne à la première audience. Elle reste debout derrière lui, comme elle l'a fait pendant quatre ans."]},
          vend:{ fin:true, texte:[
            "Vauclair paie deux mille huit cents écus sans marchander, ce qui veut dire qu'il en aurait donné le double.",
            "La revendication passe à Vauclair au printemps. Artois-Noir perd tout : le titre, la province, et les quatre ans que Dame Ermengarde a tenus.",
            "Elle apprend qui a vendu la couronne dix-huit mois plus tard, par un greffier bavard.",
            "Elle n'écrit pas. Elle fait mieux : elle envoie à Yohan une copie de l'acte de vente, sans un mot, et laisse le papier parler."],
            effets:{flag:"artois_trahie"}},
          fond:{ fin:true, texte:[
            "Un four de forge, quatre livres de fer, et sept cents ans de revendication qui deviennent une flaque.",
            "Il n'y a plus de couronne princière. Il n'y a donc plus de revendication à porter — ni pour Artois-Noir, ni pour Vauclair, ni pour Cendrepont.",
            "La province reste à la Couronne d'Astrah faute de prétendant en état de se présenter. Trois maisons cessent de lever des hommes.",
            "Dame Ermengarde ne paie pas le contrat. Elle a raison : ce n'est pas ce qu'elle avait acheté."]},
          rien:{ fin:true, texte:[
            "« Elle n'est pas sortie de la boue. »",
            "Dame Ermengarde encaisse sans broncher, ce qu'elle fait manifestement depuis quatre ans.",
            "Elle paie la moitié. « Sept mois que soixante personnes la cherchent », dit-elle. « Vous n'êtes pas le premier à revenir sans. »"]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   24 — LA PORTE DE KAR-DURAK
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_PORTE", type:'contrat', titre:"La Porte de Kar-Durak",
  commanditaire:"Le maître des Grandes Portes", maison:null,
  or:3800, danger:"extrême", categorie:"guerre",
  lieux:["LOC_008","LOC_009"],
  pitch:"Une offensive Peau-Verte menace de fermer définitivement l'une des grandes portes naines. Kar-Durak n'a jamais perdu de porte.",
  paye:["porte_tenue","porte_scellee","porte_perdue"],
  issues:{
    porte_tenue:"La Troisième Porte de Kar-Durak a tenu.",
    porte_scellee:"La Troisième Porte a été scellée de l'intérieur. Ce qui était derrière y est resté.",
    porte_perdue:"La Troisième Porte de Kar-Durak est tombée. C'est la première depuis six cents ans.",
    abandonnee:"Yohan n'était pas devant la Troisième Porte.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"La Troisième Porte est à deux jours de galeries.",
      ev:{ id:"CHQ_1", titre:"La Troisième Porte", famille:"NAIN", rarete:"majeur",
        image:"cg_kardurak",
        scenes:{
          start:{ texte:[
            "Le maître des Grandes Portes ne reçoit pas dans sa salle : il reçoit sur le chemin de ronde intérieur de la Troisième Porte, ce qui est une façon de dire l'urgence.",
            "« Douze mille. Avec des machines. Ils ont pris trois postes avancés en six jours. »",
            "Il regarde la vantail — trente pieds de bronze sur un cadre de granit. « Kar-Durak n'a pas perdu de porte depuis six cents ans. Nous en avons scellé deux. Ce n'est pas la même chose. »",
            "Il se tourne. « Il me faut quelqu'un qui sait ce que vaut une ligne, et qui n'est pas nain. Mes capitaines mourront devant cette porte plutôt que d'admettre qu'elle tombe. »"],
            choix:[
              {label:"Demander d'où viennent les machines", detail:"Les Peaux-Vertes ne construisent pas de béliers",
               suite:"machines"},
              {label:"Demander ce que veut dire sceller", detail:"Deux portes scellées, et il n'écrit pas pourquoi",
               suite:"sceller"},
              {label:"Accepter", detail:"Douze mille et six jours",
               suite:"termes"},
            ]},
          machines:{ texte:[
            "« Elles sont à nous. »",
            "Il le dit avec une lenteur de pierre. « Prises au poste de Basse-Enclume il y a quatre ans, quand nous avons reculé d'une galerie. Nous ne les avons jamais reprises et nous n'avons jamais écrit que nous les avions perdues. »",
            "« Ils ont mis quatre ans à comprendre comment on les monte. Ils y sont arrivés. »"],
            effets:{xp:24, flag:"porte_nos_machines"}, suite:"termes"},
          sceller:{ texte:[
            "« Sceller, c'est couler du plomb dans les gonds et abattre la voûte du sas derrière. »",
            "Il pose une main sur le bronze. « La porte ne se rouvre plus. Jamais. Ce qui est derrière est perdu pour nous, et ce qui est devant ne passe plus. »",
            "Un temps. « Derrière la Troisième, il y a quatorze mille des nôtres et la moitié de nos forges. »"],
            effets:{xp:26, flag:"porte_ce_quil_y_a_derriere"}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Trois mille huit cents. Payés d'avance, parce que je ne sais pas si je serai là pour payer après. »",
            "Il ajoute, sans que Yohan ait rien demandé : « Et nous savons ce que vous êtes. Nous le savons depuis Hautes-Enclumes. Kar-Durak n'écrit pas ce genre de chose et ne le dit à personne. Battez-vous. »"]},
        }}},

    { id:"ligne", delai:[2,3], attente:"Six jours avant qu'ils soient devant.",
      ev:{ id:"CHQ_2", titre:"Ce qu'on peut faire en six jours", famille:"NAIN", rarete:"majeur",
        image:"evt_tunnel",
        scenes:{
          start:{ texte:[
            "Six jours, une porte de trente pieds, deux mille haches, et douze mille qui montent avec des machines naines.",
            "La galerie d'approche fait quatre-vingts pas de large sur six cents de long. C'est là que ça se décide, pas devant le bronze."],
            choix:[
              {label:"Miner la galerie d'approche", detail:"Jet de Précision (14) · effondrer sur eux plutôt que devant eux",
               test:{stat:"precision", dc:14}, reussite:"mine_ok", echec:"mine_ko"},
              {label:"Aller brûler les machines", detail:"Jet d'Agilité (15) · douze mille hommes autour",
               requis:{flag:"porte_nos_machines"}, test:{stat:"agi", dc:15},
               reussite:"machines_ok", echec:"machines_ko"},
              {label:"Tenir la ligne à la porte, sans finesse", detail:"Deux mille haches et du bronze",
               suite:"ligne", effets:{xp:14}},
            ]},
          mine_ok:{ texte:[
            "Quatre cents pas de galerie, onze charges de poudre naine posées dans les joints d'appareillage, et deux jours à ramper dans le noir avec des artificiers de cent quatre-vingts ans qui ne parlent pas.",
            "Ils monteront par là. Ils n'ont pas le choix : c'est la seule galerie assez large pour les machines."],
            effets:{xp:32, fat:16, flag:"porte_minee"}, fin:true},
          mine_ko:{ texte:["Le granit de cette galerie a été appareillé pour ne pas s'effondrer, et il tient parole. Deux jours de travail pour arracher onze charges qui ne feront rien."],
            effets:{fat:14, xp:10}, fin:true},
          machines_ok:{ texte:[
            "Trois nuits pour approcher, une pour agir. Les machines sont au centre du camp, gardées par des Peaux-Vertes qui savent exactement ce qu'elles valent.",
            "Il en brûle deux sur quatre et repart par les hauteurs avec la moitié du camp derrière lui.",
            "Deux machines, ce n'est pas quatre. C'est la différence entre une porte enfoncée en un jour et une porte enfoncée en trois."],
            effets:{xp:34, fat:20, pv:-16, flag:"porte_machines_brulees"}, fin:true},
          machines_ko:{ texte:["Le camp est bien tenu. Il ressort sans avoir approché à moins de deux cents pas, avec une flèche dans la cuisse et la certitude qu'ils ont appris à garder ce qu'ils ont pris."],
            effets:{pv:-18, fat:16, xp:12}, fin:true},
          ligne:{ texte:["On empile ce qu'on a devant le bronze : trois lignes, des chevaux de frise, et deux mille Nains qui n'ont pas l'intention de reculer."],
            effets:{flag:"porte_ligne"}, fin:true},
        }}},

    { id:"assaut", delai:[1,2], attente:"Ils sont dans la galerie d'approche.",
      ev:{ id:"CHQ_3", titre:"Devant le bronze", famille:"NAIN", rarete:"majeur",
        image:"cg_kardurak",
        scenes:{
          start:{ texte:[
            "Ils entrent dans la galerie d'approche à la troisième heure, en colonne, machines au centre.",
            "Le maître des Grandes Portes est sur le chemin de ronde intérieur. Il n'a pas dormi depuis quatre jours et il ne descendra pas."],
            choix:[
              {label:"Faire sauter la galerie", detail:"Requiert de l'avoir minée",
               requis:{flag:"porte_minee"}, suite:"saute"},
              {label:"Tenir devant la porte", detail:"C'est ce qui reste",
               suite:"tient"},
              {label:"Faire sceller la porte maintenant",
               detail:"Requiert de savoir ce qu'il y a derrière · quatorze mille des leurs restent dehors",
               requis:{flag:"porte_ce_quil_y_a_derriere"}, test:{stat:"vol", dc:15},
               reussite:"scelle_ok", echec:"scelle_ko"},
            ]},
          saute:{ texte:[
            "Onze charges, quatre cents pas de granit appareillé, et six cents ans de maçonnerie naine qui descendent d'un seul mouvement.",
            "Ce qui était dans la galerie y reste. Ce qui était derrière recule de trois niveaux.",
            "Il faut encore tenir ce qui remonte par les galeries latérales."],
            effets:{xp:40}, suite:"tient"},
          tient:{ texte:["Deux mille haches, trois lignes, et trente pieds de bronze derrière."],
            bataille:{ def:"BAT_KARDURAK", victoire:"tenue", defaite:"tombee" }},
          tenue:{ fin:true, texte:[
            "La Troisième Porte tient. Elle tient onze jours, puis la colonne se retire par où elle est venue en laissant deux machines et beaucoup de monde.",
            "Kar-Durak n'a toujours pas perdu de porte.",
            "Le maître des Grandes Portes descend enfin du chemin de ronde le douzième jour. Il ne dit rien à Yohan. Il fait graver, sur le montant intérieur, une ligne en runes que Yohan ne sait pas lire.",
            "Un vieux Nain la lui traduit trois ans plus tard, dans une taverne, et refuse d'expliquer pourquoi il rit."],
            effets:{xp:90, renom:20, reputation:{nains:30, peaux_vertes:-20},
                    issue:"porte_tenue", flag:"kardurak_porte_tenue"}},
          tombee:{ fin:true, texte:[
            "Le bronze cède au neuvième jour, sous deux machines et beaucoup de morts.",
            "Ce qui se passe derrière n'a pas de nom dans les registres nains. On y écrit seulement : *la Troisième Porte.*",
            "Le maître des Grandes Portes meurt sur son chemin de ronde. Il n'était pas descendu."],
            effets:{xp:40, renom:-8, reputation:{nains:-10}, issue:"porte_perdue"}},
          scelle_ok:{ fin:true, texte:[
            "Il faut hurler pour se faire entendre par-dessus la galerie, et hurler une chose qu'aucun Nain n'a hurlée depuis six cents ans.",
            "« Scellez ! Vous avez quatorze mille des vôtres derrière et douze mille devant ! Scellez maintenant ! »",
            "Le maître des Grandes Portes met onze secondes à décider. On coule le plomb dans les gonds pendant que la première ligne meurt devant, et on abat la voûte du sas à la quatrième heure.",
            "Deux mille haches restent dehors. Elles savaient en tenant la ligne.",
            "Kar-Durak a scellé sa troisième porte. Quatorze mille Nains et la moitié des forges sont sauves. Personne ne remerciera jamais publiquement l'humain qui a crié de sceller."],
            effets:{xp:80, renom:14, reputation:{nains:16}, issue:"porte_scellee",
                    flag:"kardurak_troisieme_scellee"}},
          scelle_ko:{ texte:[
            "« Kar-Durak ne scelle pas une porte tant qu'il y a des haches devant. »",
            "Il ne descend pas du chemin de ronde et il ne changera pas d'avis."],
            effets:{xp:12}, suite:"tient"},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   25 — LES PORTES DE FER
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_FER", type:'contrat', titre:"Les Portes de Fer",
  commanditaire:"Le conseil des forges", maison:null,
  or:2600, danger:"très dangereux", categorie:"récupération",
  lieux:["LOC_008","LOC_012"],
  pitch:"Une armée Peau-Verte utilise des machines naines capturées pour ouvrir une ancienne porte de fer. Kar-Durak veut ses machines. Le conseil des forges veut autre chose.",
  paye:["machines_reprises","machines_detruites","porte_ouverte"],
  issues:{
    machines_reprises:"Les machines de Basse-Enclume sont revenues à Kar-Durak après quatre ans.",
    machines_detruites:"Les machines de Basse-Enclume ont brûlé. Personne ne les reprendra.",
    porte_ouverte:"L'ancienne porte de fer a été ouverte, et ce qu'il y avait derrière est sorti.",
    abandonnee:"Les machines de Basse-Enclume sont toujours devant la porte de fer.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Le conseil des forges ne dit pas tout.",
      ev:{ id:"CHF_1", titre:"Ce que le conseil des forges ne dit pas", famille:"NAIN", rarete:"majeur",
        image:"evt2_forge",
        scenes:{
          start:{ texte:[
            "Le conseil des forges siège à onze et parle d'une seule voix, ce qui est déjà suspect.",
            "« Quatre machines de siège naines, prises à Basse-Enclume il y a quatre ans. Elles sont devant la porte de fer du niveau moins-quatre. Nous les voulons. »",
            "Un seul détail dépasse : ils veulent les machines, et ils ne parlent pas de la porte."],
            choix:[
              {label:"Demander ce qu'il y a derrière la porte de fer", detail:"Personne n'en a parlé",
               suite:"derriere"},
              {label:"Demander pourquoi le maître des Portes n'est pas là", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"maitre_ok", echec:"maitre_ko"},
              {label:"Accepter", detail:"Quatre machines",
               suite:"termes"},
            ]},
          derriere:{ texte:[
            "Les onze se taisent en même temps, ce qui est une réponse.",
            "Le plus vieux finit par dire : « Une salle. Nous l'avons fermée. C'était avant nous. »",
            "Un autre ajoute, trop vite : « Les machines. C'est pour les machines que nous vous payons. »"],
            effets:{xp:24, flag:"fer_salle_fermee"}, suite:"termes"},
          maitre_ok:{ texte:[
            "« Parce que le maître des Grandes Portes ferait sceller. »",
            "Le plus vieux du conseil le dit sans se cacher, et les dix autres ne le contredisent pas. « Sceller le moins-quatre, c'est perdre quatre veines de fer et deux cents ans de galerie. »",
            "Il croise les mains. « Nous préférons récupérer les machines et refermer la porte. Il préférerait sceller. Nous ne l'avons pas convoqué. »"],
            effets:{xp:28, flags:["fer_conseil_cache","fer_salle_fermee"]}, suite:"termes"},
          maitre_ko:{ texte:["« Il a d'autres portes », dit-on, et on passe au point suivant de l'ordre du jour."],
            effets:{xp:6}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Deux mille six cents écus. Les quatre machines, ou ce qu'il en reste. »",
            "Le plus vieux ajoute : « Et si la porte de fer est ouverte quand vous arriverez, revenez nous le dire avant de faire quoi que ce soit. »"]},
        }}},

    { id:"moins_quatre", delai:[2,4], attente:"Le niveau moins-quatre est à un jour et demi.",
      ev:{ id:"CHF_2", titre:"Devant la porte de fer", famille:"NAIN", rarete:"majeur",
        image:"evt_galerie",
        scenes:{
          start:{ texte:[
            "Les quatre machines sont là, alignées devant une porte de fer haute de vingt pieds, et elles travaillent.",
            "Ce n'est pas un siège : c'est un chantier. Trois cents Peaux-Vertes y travaillent par relais depuis des semaines, avec l'application de gens qui savent que ça prendra le temps que ça prendra.",
            "La porte n'a ni serrure, ni gonds visibles. Elle est scellée depuis l'autre côté."],
            choix:[
              {label:"Regarder ce qui est écrit sur la porte", detail:"Jet de Précision (13) · il y a des runes",
               test:{stat:"precision", dc:13}, reussite:"runes_ok", echec:"runes_ko"},
              {label:"Saboter les machines", detail:"Jet d'Agilité (14)",
               test:{stat:"agi", dc:14}, reussite:"sabote_ok", echec:"sabote_ko"},
              {label:"Prendre un contremaître vivant", detail:"Ils travaillent par relais : il y a des chefs d'équipe",
               suite:"contremaitre"},
            ]},
          runes_ok:{ texte:[
            "Les runes sont naines et très anciennes. Elles ne disent pas ce qu'il y a derrière : elles disent qui a fermé, et quand.",
            "*Fermé par le conseil des forges, l'an cent onze. Non rouvrable. Non consignable.*",
            "*Non consignable* : il était interdit d'écrire pourquoi. Le conseil des forges a fermé cette porte il y a six cents ans et s'est interdit d'en garder la raison."],
            effets:{xp:32, flags:["fer_runes","fer_salle_fermee"]}, fin:true},
          runes_ko:{ texte:["Il y a des runes sur le fer, à vingt pieds de haut, derrière trois cents Peaux-Vertes. On ne les lira pas d'ici."],
            effets:{xp:8}, fin:true},
          sabote_ok:{ texte:[
            "Une nuit, quatre machines, et les points faibles d'un engin de siège nain — que tout artificier connaît, y compris les humains qui ont assez traîné à Kar-Durak.",
            "Il fend trois axes de tourillon sur quatre. La quatrième machine continuera seule, à quart de vitesse.",
            "Ce n'est pas un arrêt. C'est un délai de quelques semaines."],
            effets:{xp:30, fat:16, flag:"fer_sabotees"}, fin:true},
          sabote_ko:{ texte:["Les machines sont gardées de près par des Peaux-Vertes qui ont mis quatre ans à apprendre à s'en servir et qui y tiennent. Il ressort sans avoir touché un axe."],
            effets:{fat:14, xp:10, suspicion:4}, fin:true},
          contremaitre:{ texte:[
            "Le chef d'équipe de la relève de nuit est un vieux Peau-Vert au dos voûté qui compte les coups de bélier sur une tablette de bois.",
            "Il parle mal le vardhi et il n'a pas peur.",
            "« Le chef dit : derrière, salle. Grande. Le chef dit : les Nains ont fermé parce que dedans y'a leur honte. »",
            "Il montre la tablette. « Onze mille coups. Encore trois mille. Après on saura. »"],
            effets:{xp:28, flags:["fer_leur_honte","fer_trois_mille"]}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"Trois mille coups, à ce rythme, c'est quelques semaines.",
      ev:{ id:"CHF_3", titre:"Quatre machines et une porte", famille:"NAIN", rarete:"majeur",
        image:"evt_tunnel",
        scenes:{
          start:{ texte:[
            "Quatre machines qui valent une campagne, trois cents Peaux-Vertes qui les servent, et une porte que le conseil des forges a fermée il y a six cents ans en s'interdisant d'écrire pourquoi.",
            "Le conseil paie pour les machines. Il n'a pas demandé ce qu'il y avait derrière, et c'est bien ce qui inquiète."],
            choix:[
              {label:"Reprendre les machines par un coup de main naine",
               detail:"Requiert de les avoir sabotées · elles ne peuvent plus fuir",
               requis:{flag:"fer_sabotees"}, suite:"reprend"},
              {label:"Les brûler", detail:"Personne ne les reprendra, ni eux ni le conseil",
               suite:"brule",
               effets:{issue:"machines_detruites", reputation:{nains:-8, peaux_vertes:6}, renom:6}},
              {label:"Prévenir le maître des Grandes Portes",
               detail:"Requiert de savoir que le conseil l'a écarté · il fera sceller",
               requis:{flag:"fer_conseil_cache"}, suite:"maitre"},
              {label:"Laisser faire et regarder ce qui sort",
               detail:"Requiert de savoir combien de coups il reste",
               requis:{flag:"fer_trois_mille"}, suite:"regarde",
               effets:{issue:"porte_ouverte", reputation:{nains:-20}, renom:4, suspicion:8}},
            ]},
          reprend:{ texte:[
            "Deux cents haches par la galerie latérale, à l'aube, sur un chantier dont trois machines sur quatre ne peuvent plus reculer."],
            combat:{ groupe:[{bst:"BST_054", n:1}, {bst:"BST_053", n:3}], victoire:"reprises", defaite:"echec" }},
          reprises:{ fin:true, texte:[
            "Les quatre machines rentrent à Kar-Durak par la grande rampe, sous escorte, quatre ans après en être sorties.",
            "La porte de fer est rescellée le mois suivant — plomb, granit, et une voûte abattue par-dessus. Le conseil des forges fait graver de nouvelles runes.",
            "Elles disent la même chose que les anciennes : *fermé par le conseil des forges. Non rouvrable. Non consignable.*",
            "Personne ne saura jamais ce qu'il y a derrière, et c'est exactement ce que le conseil payait."],
            effets:{xp:60, renom:12, reputation:{nains:24, peaux_vertes:-14},
                    issue:"machines_reprises"}},
          echec:{ fin:true, texte:[
            "Trois cents Peaux-Vertes qui gardent des machines depuis quatre ans ne les rendent pas à deux cents haches.",
            "On décroche avec quarante morts. Le chantier reprend le lendemain."],
            effets:{pv:-24, fat:20, xp:18, issue:"abandonnee"}},
          brule:{ fin:true, texte:[
            "De la poix, une nuit de relève, et quatre engins de siège naines qui brûlent pendant onze heures dans une galerie qui n'a pas de tirage.",
            "Il faut trois jours pour que l'air redevienne respirable au moins-quatre. Le chantier est abandonné.",
            "Le conseil des forges paie la moitié : il voulait ses machines, pas leurs cendres.",
            "Le maître des Grandes Portes, lui, envoie une chope de bière et rien d'autre. C'est plus que ce qu'il fait d'habitude."]},
          maitre:{ fin:true, texte:[
            "Il écoute onze phrases et il en a assez entendu à la quatrième.",
            "« Le conseil des forges a fermé cette porte en l'an cent onze et s'est interdit d'écrire pourquoi. Ils veulent que je récupère des machines. »",
            "Il scelle le moins-quatre en six jours : plomb, granit, deux voûtes abattues, quatre veines de fer perdues et deux cents ans de galerie avec.",
            "Les machines restent derrière. Trois cents Peaux-Vertes aussi.",
            "Le conseil des forges refuse de payer. Le maître des Grandes Portes paie de sa propre bourse, moins que le contrat, et il dit une seule chose : « Vous m'avez évité d'apprendre ce que mes prédécesseurs ont enfermé. »"],
            effets:{issue:"machines_detruites", reputation:{nains:14}, renom:10,
                    flag:"kardurak_moins_quatre_scelle"}},
          regarde:{ fin:true, texte:[
            "Trois mille coups, c'est dix-neuf jours. Il les attend depuis une corniche, à deux cents pas, sans être vu.",
            "La porte de fer cède au dix-neuvième jour, vers midi. Il y a un long silence, puis les trois cents Peaux-Vertes entrent.",
            "Onze en ressortent.",
            "Ce qui sort ensuite met quatre heures à passer la porte, et Yohan ne le décrira jamais à personne — ni au conseil des forges, qui refusera de payer, ni au maître des Grandes Portes, qui ne posera pas la question.",
            "Kar-Durak scelle trois niveaux dans le mois. On n'écrit pas pourquoi."],
            effets:{flag:"kardurak_moins_quatre_ouvert"}},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   26 — LE CONVOI D'ANARION
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_CONVOI", type:'contrat', titre:"Le Convoi d'Anarion",
  commanditaire:"Un courtier de Valombre", maison:null,
  or:4100, danger:"très dangereux", categorie:"guerre",
  lieux:["LOC_007","LOC_016","LOC_011"],
  pitch:"Des agents d'Anarion proposent un contrat lucratif dont la cargaison est volontairement cachée. Le prix est trop élevé pour ce qu'on demande.",
  paye:["convoi_livre","convoi_ouvert","convoi_detourne"],
  issues:{
    convoi_livre:"Le convoi d'Anarion est arrivé à destination, et personne n'a ouvert les caisses.",
    convoi_ouvert:"Les caisses du convoi d'Anarion ont été ouvertes, et ce qui était dedans a changé de main.",
    convoi_detourne:"Le convoi d'Anarion n'est jamais arrivé.",
    abandonnee:"Yohan a rendu le convoi d'Anarion à ses commanditaires.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Le convoi part dans quatre jours.",
      ev:{ id:"CHC2_1", titre:"Quatre mille cent pour une escorte", famille:"POLITIQUE", rarete:"majeur",
        image:"evt2_receleur",
        scenes:{
          start:{ pnj:"anarion", texte:[
            "Le courtier de Valombre est humain, ce qui est déjà une information : Anarion n'envoie pas les siens traiter avec des mercenaires.",
            "« Onze caisses. Quatre-vingts lieues. Vous ne les ouvrez pas, vous ne demandez pas, vous livrez. »",
            "Il pose une bourse d'avance sur la table. « Quatre mille cent écus. »",
            "C'est trois fois le tarif d'une escorte de quatre-vingts lieues, et il le sait, et il sait que Yohan le sait."],
            choix:[
              {label:"Demander pourquoi trois fois le tarif", detail:"Un prix trop élevé est un aveu",
               suite:"prix"},
              {label:"Demander ce qui se passe si une caisse s'ouvre", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"ouvre_ok", echec:"ouvre_ko"},
              {label:"Accepter sans poser de question", detail:"C'est ce qu'ils paient",
               suite:"termes", effets:{suspicion:-3}},
            ]},
          prix:{ texte:[
            "« Parce que trois convois sont partis avant celui-là et qu'aucun n'est arrivé. »",
            "Il ne se dérobe pas, ce qui est presque honnête. « Deux ont été pris par des gens d'Eltharion. Le troisième, on ne sait pas. »",
            "Il fait glisser la bourse d'un pouce. « Vous êtes payé pour le risque, pas pour la curiosité. »"],
            effets:{xp:20, flag:"convoi_trois_perdus"}, suite:"termes"},
          ouvre_ok:{ texte:[
            "Il hésite une demi-seconde de trop.",
            "« Les caisses sont plombées. Si un plomb est rompu à l'arrivée, vous n'êtes pas payé. »",
            "Puis, parce qu'il est humain et qu'un humain finit toujours par ajouter une phrase de trop : « Et je vous conseille très sincèrement de ne pas être celui qui les ouvre. »"],
            effets:{xp:24, flag:"convoi_plombees"}, suite:"termes"},
          ouvre_ko:{ texte:["« Elles ne s'ouvriront pas. » Il ne dira rien d'autre là-dessus."],
            effets:{xp:6}, suite:"termes"},
          termes:{ fin:true, texte:[
            "« Moitié maintenant, moitié à la livraison. »",
            "Il pousse la bourse. « Et une chose : les gens qui vous paient ne sont pas de ceux qu'on déçoit deux fois. »"]},
        }}},

    { id:"route", delai:[2,4], attente:"Quatre-vingts lieues, et trois convois n'y sont pas arrivés.",
      ev:{ id:"CHC2_2", titre:"Onze caisses", famille:"VOYAGE", rarete:"majeur",
        image:"evt2_convoi",
        scenes:{
          start:{ texte:[
            "Onze caisses de bois cerclé, plombées, sur trois chariots. Elles ne pèsent pas ce qu'elles devraient : trop lourdes pour du tissu, trop légères pour du métal.",
            "Au troisième jour, la plus grande fait un bruit. Pas un roulement de cargaison : un bruit qui s'arrête quand on s'approche.",
            "Le cocher, un elfe noir muet qui n'a pas dit trois mots, ne se retourne pas."],
            choix:[
              {label:"Ouvrir la grande caisse", detail:"Le plomb sera rompu et le contrat avec",
               suite:"ouvre"},
              {label:"Écouter sans ouvrir", detail:"Jet de Volonté (14) · trois nuits à côté",
               test:{stat:"vol", dc:14}, reussite:"ecoute_ok", echec:"ecoute_ko"},
              {label:"Faire parler le cocher", detail:"Jet de Volonté (15) · il est muet, pas sourd",
               test:{stat:"vol", dc:15}, reussite:"cocher_ok", echec:"cocher_ko"},
            ]},
          ouvre:{ texte:[
            "Le plomb saute au levier. Sous le couvercle, de la paille, et sous la paille, une femme elfe de vingt ou trois cents ans, ligotée, bâillonnée, vivante.",
            "Il y en a une par caisse. Onze.",
            "Elles ne sont pas des prisonnières de guerre : elles portent les marques de cour d'Eltharion. Ce sont des otages politiques, ou une monnaie d'échange, ou pire.",
            "Le cocher est descendu de son siège et il s'éloigne sans courir."],
            effets:{xp:36, flags:["convoi_onze_femmes","convoi_plomb_rompu"]}, fin:true},
          ecoute_ok:{ texte:[
            "Trois nuits couché contre la grande caisse, à écouter.",
            "Ce n'est pas une bête. C'est une respiration, et par moments quelque chose qui ressemble à un mot étouffé dans du tissu.",
            "Il y a quelqu'un dans cette caisse. Il y a probablement quelqu'un dans chacune."],
            effets:{xp:32, flag:"convoi_onze_femmes"}, fin:true},
          ecoute_ko:{ texte:["Le bois cerclé étouffe tout et la route fait plus de bruit que la cargaison. Trois nuits pour n'être sûr de rien."],
            effets:{fat:12, xp:8}, fin:true},
          cocher_ok:{ pnj:"anarion", texte:[
            "Il est muet parce qu'on lui a coupé la langue, et il sait écrire, ce qui est un oubli de la part de ceux qui l'ont engagé.",
            "Il écrit onze mots sur une planche, avec un clou : *cour d'Eltharion. Filles de maison. Anarion les échange contre des places.*",
            "Puis il efface, et il remonte sur son siège."],
            effets:{xp:34, flags:["convoi_onze_femmes","convoi_echange"]}, fin:true},
          cocher_ko:{ texte:["Il ne se retourne pas. Il ne se retournera pas de tout le voyage, et c'est manifestement pour ça qu'on l'a choisi."],
            effets:{xp:8}, fin:true},
        }}},

    { id:"decision", delai:[1,2], attente:"La destination est à trois jours.",
      ev:{ id:"CHC2_3", titre:"Ce qu'on livre", famille:"POLITIQUE", rarete:"majeur",
        image:"rc_anarion",
        scenes:{
          start:{ texte:[
            "Trois jours de la destination : un port de la côte, un navire, et des gens qui attendent onze caisses.",
            "Quatre mille cent écus dont la moitié est déjà touchée."],
            choix:[
              {label:"Livrer", detail:"Le contrat est le contrat",
               suite:"livre",
               effets:{issue:"convoi_livre", reputation:{elfes_noirs:16, elfes:-20}, renom:4, suspicion:-4}},
              {label:"Les libérer et disparaître",
               detail:"Requiert de savoir ce qu'il y a dedans · quatre mille cent écus et Anarion contre vous",
               requis:{flag:"convoi_onze_femmes"}, suite:"libere"},
              {label:"Les livrer à Eltharion au lieu d'Anarion",
               detail:"Requiert de savoir d'où elles viennent · une guerre elfique a deux camps",
               requis:{flag:"convoi_echange"}, suite:"eltharion",
               effets:{issue:"convoi_detourne", reputation:{elfes:26, elfes_noirs:-30}, renom:10, suspicion:8}},
            ]},
          livre:{ fin:true, pnj:"anarion", texte:[
            "Onze caisses plombées descendues à quai, comptées, et embarquées avant l'aube.",
            "On paie la seconde moitié sans un mot. Le courtier de Valombre n'est pas là ; c'est un elfe noir qui compte, et il ne regarde pas Yohan.",
            "Ce qu'il est advenu des onze, personne ne le dira jamais. Anarion obtient trois places au conseil des Lisières dans l'année, ce qui n'a probablement aucun rapport.",
            "Yohan garde quatre mille cent écus et une chose qu'il ne raconte pas."]},
          libere:{ fin:true, pnj:"anarion", texte:[
            "Onze plombs rompus dans une clairière à trois jours du port, onze femmes qui mettent une demi-journée à tenir debout, et une route de quarante lieues à faire à pied dans le mauvais sens.",
            "Il en ramène neuf jusqu'aux lisières d'Eltharion. Deux sont mortes en route : elles étaient dans ces caisses depuis trop longtemps.",
            "La seconde moitié n'est jamais payée. Le courtier de Valombre disparaît de Valombre dans le mois.",
            "Anarion n'oublie pas. Ce n'est pas une menace formulée : c'est simplement une chose qui est désormais vraie."],
            effets:{issue:"convoi_detourne", reputation:{elfes:22, elfes_noirs:-26}, renom:12,
                    suspicion:6, flag:"anarion_offense"}},
          eltharion:{ fin:true, pnj:"eltharion", texte:[
            "Trois jours dans l'autre direction, avec onze caisses plombées et un cocher muet qui n'a pas protesté une seule fois.",
            "La cour d'Eltharion reçoit onze caisses au lieu de onze filles disparues. Les plombs sont rompus devant témoins, à la cour, et ce qui se passe ensuite n'est pas quelque chose qu'un humain devrait voir.",
            "Eltharion ne remercie pas. Eltharion note.",
            "Anarion, lui, a perdu onze otages, trois places au conseil, et quatre mille cent écus. Il sait exactement qui les lui a coûtés."],
            effets:{flag:"anarion_offense"}},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   27 — LA FLÈCHE DE TYRION
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_FLECHE", type:'contrat', titre:"La Flèche de Tyrion",
  commanditaire:"Un gardien des lisières", maison:null,
  or:3900, danger:"très dangereux", categorie:"traque",
  lieux:["LOC_006","LOC_014","LOC_013"],
  pitch:"Des Elfes recherchent un individu qu'ils jugent dangereux pour l'équilibre magique. Les indices touchent aux Parias, et ils paient très cher.",
  paye:["cible_livree","cible_cachee","tyrion_trompe"],
  issues:{
    cible_livree:"L'enfant que cherchait Tyrion a été livré aux Elfes.",
    cible_cachee:"L'enfant que cherchait Tyrion n'a jamais été trouvé, officiellement.",
    tyrion_trompe:"Tyrion a reçu un rapport qui l'a satisfait et qui était faux.",
    abandonnee:"Yohan a rendu l'avance des Elfes.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Le gardien attend une réponse aux lisières.",
      ev:{ id:"CHY_1", titre:"Ce que les Elfes appellent un déséquilibre", famille:"ELFE", rarete:"majeur",
        image:"rc_tyrion",
        scenes:{
          start:{ pnj:"tyrion", texte:[
            "Le gardien des lisières parle au nom de Tyrion, et il le dit tout de suite, ce qui est une courtoisie.",
            "« Depuis huit mois, il y a une perturbation dans le flux de l'Onde au sud de la Cicatrice. Elle se déplace. Elle est vivante. »",
            "Il pose une carte où onze relevés sont marqués. « Nous ne savons pas ce que c'est. Nous savons que cela grandit. »",
            "Il relève les yeux. « Trois mille neuf cents écus pour l'identifier et nous l'amener. Vivant, si c'est possible. »"],
            choix:[
              {label:"Demander pourquoi ils ne le font pas eux-mêmes", detail:"Onze relevés, et personne n'y va",
               suite:"eux"},
              {label:"Regarder les relevés", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"releves_ok", echec:"releves_ko"},
              {label:"Demander ce qui arrive à ce qu'ils ramènent", detail:"Jet de Volonté (13)",
               test:{stat:"vol", dc:13}, reussite:"apres_ok", echec:"apres_ko"},
            ]},
          eux:{ pnj:"tyrion", texte:[
            "« Parce qu'un gardien des lisières qui entre dans les terres humaines en armes déclenche une crise diplomatique, et parce que Tyrion ne veut pas de crise cette année. »",
            "Un temps. « Et parce que la perturbation réagit à notre présence. Elle s'éloigne quand nous approchons. Elle ne s'éloigne pas des humains. »"],
            effets:{xp:22, flag:"fleche_fuit_les_elfes"}, suite:"termes"},
          releves_ok:{ pnj:"tyrion", texte:[
            "Onze relevés en huit mois, et ils dessinent quelque chose que le gardien n'a manifestement pas remarqué.",
            "Ils ne se déplacent pas au hasard : ils suivent une route. Précisément, ils suivent les foires. La foire de Malbrec en avril, celle de Combe-Basse en juin, celle de Port-Noir en août.",
            "Ce qu'ils traquent voyage avec des marchands. Ou avec une famille."],
            effets:{xp:30, flag:"fleche_les_foires"}, suite:"termes"},
          releves_ko:{ pnj:"tyrion", texte:["Onze points sur une carte, huit mois, et une méthode de relevé elfique que Yohan n'a pas les moyens de discuter."],
            effets:{xp:6}, suite:"termes"},
          apres_ok:{ pnj:"tyrion", texte:[
            "La question le met mal à l'aise, ce qui chez un gardien des lisières est presque spectaculaire.",
            "« Cela dépend de ce que c'est. »",
            "Il choisit ses mots avec une lenteur pénible. « Si c'est une chose, elle est étudiée. Si c'est une personne… Tyrion considère qu'un déséquilibre vivant doit cesser d'être vivant. Le conseil ne partage pas entièrement cet avis. »"],
            effets:{xp:28, flag:"fleche_tyrion_veut_la_mort"}, suite:"termes"},
          apres_ko:{ pnj:"tyrion", texte:["« Cela ne relève pas de votre contrat. » C'est dit poliment et c'est définitif."],
            effets:{xp:6}, suite:"termes"},
          termes:{ fin:true, pnj:"tyrion", texte:[
            "« Trois mille neuf cents. Un tiers d'avance. »",
            "Le gardien plie sa carte. « Et sachez que nous avons envoyé cette demande à quatre mercenaires humains. Vous êtes le seul à avoir posé des questions. Tyrion en tirera ses conclusions. »"]},
        }}},

    { id:"foires", delai:[2,4], attente:"La prochaine foire est celle de Port-Noir.",
      ev:{ id:"CHY_2", titre:"Ce qui voyage avec les foires", famille:"PARIA", rarete:"majeur",
        image:"evt_enfant",
        scenes:{
          start:{ texte:[
            "La foire de Port-Noir dure onze jours et rassemble quatre mille personnes.",
            "Il faut trois jours pour trouver, et ce n'est pas une chose : c'est une petite fille de neuf ans qui vend des lacets avec sa grand-mère au bout de la halle aux grains.",
            "Quand elle rit, les lanternes de la halle vacillent toutes en même temps. Personne ne l'a remarqué en onze jours de foire. Yohan le voit en quatre minutes."],
            choix:[
              {label:"Parler à la grand-mère", detail:"Elle sait forcément",
               suite:"grand_mere"},
              {label:"Observer trois jours de plus", detail:"Jet de Précision (13) · savoir ce qu'on a devant soi",
               test:{stat:"precision", dc:13}, reussite:"observe_ok", echec:"observe_ko"},
              {label:"Les prendre maintenant", detail:"C'est ce pour quoi on est payé",
               suite:"prend"},
            ]},
          grand_mere:{ pnj:"enfant_onde", texte:[
            "La vieille femme comprend en une seconde et demie et elle ne nie rien, parce qu'à son âge on n'a plus le temps.",
            "« Sa mère est morte à Karlsberg. Pas pendant la Purge : après, dans les fossés, comme les autres. »",
            "Elle continue de plier des lacets. « On bouge de foire en foire depuis qu'elle a trois ans. On ne reste jamais. J'ai soixante-dix-huit ans, monsieur, et je marche encore parce que si je m'arrête on la trouve. »",
            "Elle relève enfin les yeux. « Vous êtes le premier à l'avoir vue en six ans. Vous êtes le premier à savoir ce que vous regardiez. »"],
            effets:{xp:36, sang:4, flags:["fleche_enfant","fleche_grand_mere"]}, fin:true},
          observe_ok:{ texte:[
            "Trois jours. Ce n'est pas dangereux, ce n'est pas conscient, et ce n'est pas contrôlé : les lanternes vacillent quand elle rit, l'eau du seau se ride quand elle a peur, et une fois, quand un homme l'a bousculée, tout le bout de la halle a senti l'orage pendant six secondes.",
            "Elle a neuf ans. Elle ne sait pas. Sa grand-mère sait, et sa grand-mère la fait déménager toutes les six semaines depuis six ans."],
            effets:{xp:32, sang:4, flag:"fleche_enfant"}, fin:true},
          observe_ko:{ texte:["Quatre mille personnes, onze jours, et une foire qui se démonte. Il perd la trace au huitième jour et met deux semaines à la retrouver sur la route de Combe-Basse."],
            effets:{fat:14, xp:12, flag:"fleche_enfant"}, fin:true},
          prend:{ texte:[
            "On ne prend pas une enfant de neuf ans dans une halle aux grains sans que quatre mille personnes s'en aperçoivent.",
            "Il attend le démontage, la route, et un chemin creux à deux lieues.",
            "La grand-mère ne se débat pas. Elle dit une seule chose : « Emmenez-moi aussi. Elle ne survivra pas sans moi, et vous serez payé pareil. »"],
            effets:{xp:26, flags:["fleche_enfant","fleche_prise"]}, fin:true},
        }}},

    { id:"decision", delai:[1,3], attente:"Les lisières attendent, et l'enfant a neuf ans.",
      ev:{ id:"CHY_3", titre:"Ce qu'on rapporte aux lisières", famille:"PARIA", rarete:"majeur",
        image:"rc_tyrion",
        scenes:{
          start:{ texte:[
            "Trois mille neuf cents écus contre une enfant de neuf ans qui fait vaciller les lanternes quand elle rit.",
            "Elle est ce que Yohan était. Elle est ce qu'on a rayé des registres. Et des Elfes très polis appellent ça un déséquilibre."],
            choix:[
              {label:"La livrer", detail:"C'est le contrat, et ils ont dit « vivant si possible »",
               suite:"livre",
               effets:{issue:"cible_livree", reputation:{elfes:20, parias:-40}, renom:6, suspicion:-6}},
              {label:"Rapporter qu'il s'agissait d'une veine d'Onde dans une carrière",
               detail:"Requiert de savoir ce qu'ils cherchent · un rapport plausible, et faux",
               requis:{flag:"fleche_les_foires"}, test:{stat:"vol", dc:15},
               reussite:"ment_ok", echec:"ment_ko"},
              {label:"Rendre l'avance et dire qu'on n'a rien trouvé",
               detail:"Ils enverront quelqu'un d'autre",
               suite:"rend",
               effets:{issue:"cible_cachee", reputation:{elfes:-10, parias:14}, renom:2}},
              {label:"Les emmener à Karlsberg",
               detail:"Requiert d'avoir parlé à la grand-mère · il y a de la place dans des ruines",
               requis:{flag:"fleche_grand_mere"}, suite:"karlsberg",
               effets:{issue:"cible_cachee", reputation:{parias:30, elfes:-14}, renom:8,
                       suspicion:12, flag:"enfant_onde_a_karlsberg"}},
            ]},
          livre:{ fin:true, pnj:"tyrion", texte:[
            "Le gardien des lisières la reçoit aux marches de la Cour lumineuse, s'agenouille pour être à sa hauteur, et lui parle avec une douceur insupportable.",
            "On paie les trois mille neuf cents écus le jour même.",
            "Yohan ne saura jamais ce qui lui est arrivé. Il apprendra seulement, deux ans plus tard, que Tyrion a fait relever le flux au sud de la Cicatrice et qu'il n'y a plus de perturbation.",
            "La grand-mère est morte sur la route du retour. Personne ne l'a tuée : elle avait soixante-dix-huit ans et elle marchait depuis six ans."]},
          ment_ok:{ fin:true, pnj:"tyrion", texte:[
            "Le rapport fait quatre pages et il est bon : une veine d'Onde affleurante dans une carrière de Combe-Basse, exploitée par intermittence, déplacée par les fronts de taille — ce qui expliquerait des relevés mobiles.",
            "Il joint trois échantillons de roche, qu'il a fait prendre par un carrier payé pour ne rien demander.",
            "Le gardien des lisières lit, hoche la tête, et paie. Tyrion classe l'affaire.",
            "Onze mois plus tard, un nouveau relevé signale la perturbation à la foire de Malbrec. Le dossier est rouvert et confié à quelqu'un d'autre.",
            "Il reste onze mois à une petite fille de neuf ans pour disparaître pour de bon, et Yohan est le seul à le savoir."],
            effets:{issue:"tyrion_trompe", reputation:{elfes:6, parias:18}, renom:6,
                    flag:"tyrion_rapport_faux"}},
          ment_ko:{ fin:true, texte:[
            "Le gardien lit les quatre pages deux fois et repose le rapport.",
            "« Une veine ne rit pas. »",
            "Il ne dit rien d'autre. Il rend l'avance à Yohan, ce qui est une insulte elfique très précise, et l'affaire est confiée à quelqu'un d'autre dans la semaine."],
            effets:{xp:14, issue:"cible_cachee", reputation:{elfes:-16, parias:10}}},
          rend:{ fin:true, texte:[
            "Il rend l'avance en main propre, aux lisières, et dit qu'il n'a rien trouvé.",
            "Le gardien ne le croit pas et ne le dit pas. Les Elfes ont une façon de ne pas vous croire qui est plus polie qu'une accusation et beaucoup plus longue à digérer.",
            "Ils enverront quelqu'un d'autre. Yohan le sait en redescendant, et il passe le reste de l'année à changer d'itinéraire pour repasser par les foires."]},
          karlsberg:{ fin:true, pnj:"tyrion", texte:[
            "Quarante lieues à pied avec une femme de soixante-dix-huit ans et une enfant de neuf, en évitant les routes et les foires.",
            "Karlsberg n'est pas un refuge : c'est un mur écroulé, une cour déblayée et beaucoup de vent. C'est aussi le premier endroit depuis six ans où la vieille femme dort une nuit entière.",
            "L'enfant fait vaciller ce qui reste de lanternes. Personne, ici, ne le remarque comme une anomalie.",
            "Le gardien des lisières apprendra un jour qu'un homme a rendu son avance et que la perturbation a cessé de se déplacer. Il saura mettre les deux ensemble.",
            "Ce jour-là, il y aura une conversation à avoir avec Tyrion."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   28 — LE SERMENT DE KHAL-VAENE
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_SERMENT", type:'contrat', titre:"Le Serment de Khal-Vaene",
  commanditaire:"Le conseil des tentes", maison:null,
  or:4500, danger:"très dangereux", categorie:"guerre",
  lieux:["LOC_005","LOC_015","LOC_018"],
  pitch:"Khal-Vaene demande une présence étrangère lors d'un affrontement qui décidera du ralliement de plusieurs tribus. Il ne dit pas pourquoi il lui faut un témoin qui ne soit pas khesh.",
  paye:["serment_tenu","serment_rompu","six_bannieres"],
  issues:{
    serment_tenu:"Le serment de Khal-Vaene a été tenu devant un témoin étranger, et six bannières l'ont suivi.",
    serment_rompu:"Le serment de Khal-Vaene a été rompu, et les tribus se sont dispersées.",
    six_bannieres:"Six bannières khesh se sont rangées derrière Khal-Vaene.",
    abandonnee:"Yohan n'était pas dans les Dunes quand Khal-Vaene a prêté serment.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Le conseil des tentes se tient dans onze jours.",
      ev:{ id:"CHK2_1", titre:"Pourquoi un étranger", famille:"KHESH", rarete:"majeur",
        image:"rc_khalvaene",
        scenes:{
          start:{ pnj:"khalvaene", texte:[
            "Khal-Vaene reçoit sous une tente ouverte aux quatre vents, ce qui est une manière de dire qu'il n'a rien à cacher, et une manière de vérifier qui écoute.",
            "« Onze jours. Six tribus viennent au conseil des tentes. Deux me suivront. Deux ne me suivront pas. Deux hésitent. »",
            "Il fait tourner une coupe sans boire. « Celui qui ne me suit pas me défiera. C'est la coutume : on ne refuse pas un unificateur, on le tue. »",
            "Il repose la coupe. « Je veux que quelqu'un qui n'est pas khesh soit là. »"],
            choix:[
              {label:"Demander pourquoi", detail:"Un Khesh n'a pas besoin d'un témoin étranger",
               suite:"pourquoi"},
              {label:"Demander ce qu'il attend de vous exactement", detail:"Quatre mille cinq cents pour regarder ?",
               suite:"quoi"},
              {label:"Accepter", detail:"Onze jours",
               suite:"termes"},
            ]},
          pourquoi:{ pnj:"khalvaene", texte:[
            "« Parce qu'un Khesh qui raconte ce qu'il a vu au conseil des tentes raconte ce qui arrange sa tribu. »",
            "Il regarde les dunes. « Il y a quarante ans, mon grand-père a unifié quatre tribus. Trois ans plus tard, on racontait qu'il avait triché au duel. On le raconte encore. Il n'y avait pas de témoin étranger. »",
            "Il se tourne enfin. « Je ne veux pas qu'on raconte. Je veux qu'un homme qui n'a rien à y gagner ait vu. »"],
            effets:{xp:26, flag:"khesh_temoin"}, suite:"termes"},
          quoi:{ pnj:"khalvaene", texte:[
            "« Regarder. Et si je meurs, redescendre dire ce que vous avez vu, aux six tribus, mot pour mot. »",
            "Il hausse une épaule. « Si je gagne, vous n'aurez rien à faire du tout et vous serez payé pareil. Ce que j'achète, c'est votre présence, pas votre bras. »",
            "Puis, plus bas : « Et si vous choisissez de vous en servir, de votre bras, sachez que ce serait la pire chose que vous puissiez me faire. »"],
            effets:{xp:28, flags:["khesh_temoin","khesh_ne_pas_intervenir"]}, suite:"termes"},
          termes:{ fin:true, pnj:"khalvaene", texte:[
            "« Quatre mille cinq cents. Payés maintenant, par le conseil des tentes, pas par moi. »",
            "Il ajoute : « Et nous ne demandons pas de femme et n'en donnons pas. Chez nous, ce que vous appelez le Prix serait une raison de duel. Je vous le dis pour que vous ne le proposiez pas devant les six tribus. »"]},
        }}},

    { id:"conseil", delai:[2,3], attente:"Le conseil des tentes, dans onze jours.",
      ev:{ id:"CHK2_2", titre:"Le conseil des tentes", famille:"KHESH", rarete:"majeur",
        image:"cg_khesh",
        scenes:{
          start:{ texte:[
            "Six tribus, six cercles de tentes, et au centre un espace nu que personne ne traverse.",
            "Yohan est le seul non-khesh à quarante lieues et tout le monde le sait, ce qui est exactement l'intention.",
            "Le troisième soir, un chef de la tribu des Lances Rouges se lève et dit ce que tout le monde attendait : il refuse. Et il défie."],
            choix:[
              {label:"Regarder", detail:"C'est ce pour quoi on est payé",
               suite:"regarde"},
              {label:"Chercher qui a payé le défieur", detail:"Jet de Précision (14) · un refus se prépare",
               test:{stat:"precision", dc:14}, reussite:"paye_ok", echec:"paye_ko"},
              {label:"Vérifier les armes avant le duel", detail:"Jet de Précision (13) · le grand-père a été accusé de tricher",
               test:{stat:"precision", dc:13}, reussite:"armes_ok", echec:"armes_ko"},
            ]},
          paye_ok:{ texte:[
            "Il faut trois jours et beaucoup de thé pour apprendre qu'un marchand d'Astrah est passé chez les Lances Rouges le mois dernier avec onze chevaux en cadeau.",
            "Onze chevaux, chez les Khesh, ce n'est pas un cadeau : c'est un contrat.",
            "Astrah paie pour que l'unification échoue. C'est cohérent : six bannières khesh unifiées, c'est une frontière sud que la Couronne ne tient plus."],
            effets:{xp:32, flag:"khesh_astrah_paie"}, suite:"duel"},
          paye_ko:{ texte:["Six tribus, beaucoup de thé, et personne qui parle vardhi à un étranger de la façon dont on parle entre soi."],
            effets:{xp:10}, suite:"duel"},
          armes_ok:{ pnj:"khalvaene", texte:[
            "Les deux lances sont posées au centre depuis la veille, comme le veut la coutume, et personne ne les garde parce que personne n'oserait.",
            "Celle de Khal-Vaene a été entaillée à mi-hampe, proprement, par en dessous. Elle cassera au troisième choc.",
            "Il reste quatre heures avant le duel."],
            effets:{xp:34, flag:"khesh_lance_entaillee"}, suite:"duel"},
          armes_ko:{ texte:["Deux lances posées au centre d'un cercle de six tribus. Il les regarde longuement sans avoir le droit de les toucher."],
            effets:{xp:10}, suite:"duel"},
          regarde:{ texte:["Il regarde, parce que c'est ce pour quoi il est payé."],
            effets:{xp:8}, suite:"duel"},
          duel:{ fin:true, texte:[
            "Le duel est à l'aube, à la lance, à cheval, devant six tribus qui ne font aucun bruit.",
            "C'est la chose la plus silencieuse que Yohan ait jamais vue."]},
        }}},

    { id:"duel", delai:[1,1], attente:"À l'aube.",
      ev:{ id:"CHK2_3", titre:"À l'aube, devant six tribus", famille:"KHESH", rarete:"majeur",
        image:"cg_khesh",
        scenes:{
          start:{ texte:[
            "Les deux hommes prennent leurs lances au centre du cercle et remontent en selle.",
            "Il reste quelques secondes pour faire quelque chose, ou pour ne rien faire."],
            choix:[
              {label:"Dire à voix haute que la lance est entaillée",
               detail:"Requiert de l'avoir vu · devant six tribus, par un étranger",
               requis:{flag:"khesh_lance_entaillee"}, test:{stat:"vol", dc:14},
               reussite:"dit_ok", echec:"dit_ko"},
              {label:"Dire qui paie le défieur",
               detail:"Requiert de le savoir · onze chevaux d'Astrah",
               requis:{flag:"khesh_astrah_paie"}, suite:"astrah"},
              {label:"Ne rien dire et regarder", detail:"C'est ce qu'il a demandé",
               suite:"combat"},
            ]},
          dit_ok:{ pnj:"khalvaene", texte:[
            "Il le crie en vardhi, puis en khesh approximatif, et il traverse l'espace nu que personne ne traverse pour poser la main sur la hampe.",
            "Six tribus voient un étranger faire une chose qu'aucun Khesh n'aurait osé faire. Le silence dure très longtemps.",
            "Puis le plus vieux des chefs descend, prend la lance, la casse d'un coup de genou à l'endroit exact de l'entaille, et la jette au feu.",
            "Le duel a lieu quand même, avec deux lances neuves, et Khal-Vaene gagne au quatrième passage."],
            effets:{xp:44, flag:"khesh_lance_denoncee"}, suite:"apres"},
          dit_ko:{ texte:[
            "Il le crie, et il n'a pas les mots. Ce qu'il dit en khesh approximatif ne veut pas dire ce qu'il croit.",
            "On l'écarte, poliment, fermement. Le duel commence."],
            effets:{xp:12}, suite:"combat"},
          astrah:{ pnj:"khalvaene", texte:[
            "« Onze chevaux d'Astrah, le mois dernier, chez les Lances Rouges. »",
            "Il le dit sans crier, à celui qui traduit, et ça remonte les six cercles en quatre minutes.",
            "Le défieur ne nie pas — nier serait pire. Il monte en selle en sachant que ce qu'il gagnera ne vaudra plus rien.",
            "Le duel a lieu. Khal-Vaene gagne. Personne, dans les six tribus, ne racontera jamais qu'il a triché."],
            effets:{xp:40, flag:"khesh_astrah_denonce"}, suite:"apres"},
          combat:{ pnj:"khalvaene", texte:[
            "Trois passages. Au troisième, la lance de Khal-Vaene casse à mi-hampe.",
            "Il tient les deux morceaux, il ne descend pas de cheval, et il charge une quatrième fois avec un bâton."],
            combat:{ groupe:[{bst:"BST_056", n:1}], victoire:"apres", defaite:"mort", sansMort:true }},
          apres:{ fin:true, pnj:"khalvaene", texte:[
            "Khal-Vaene descend de cheval et prête serment devant six tribus, à voix haute, sur les noms de quatre générations.",
            "Deux tribus le suivent. Deux hésitantes le suivent. Les Lances Rouges se dispersent vers l'est dans la nuit.",
            "Six bannières. C'est la moitié des douze qu'il faudrait, et c'est plus que quiconque depuis son grand-père.",
            "Le conseil des tentes paie quatre mille cinq cents écus. Khal-Vaene, lui, offre un cheval — ce qui, chez les Khesh, vaut infiniment plus."],
            effets:{xp:70, renom:14, reputation:{khesh:30}, issue:"six_bannieres",
                    flag:"khesh_six_bannieres"}},
          mort:{ fin:true, pnj:"khalvaene", texte:[
            "Le quatrième passage se termine mal, et Khal-Vaene tombe dans le sable devant six tribus avec la moitié d'une lance dans la poitrine.",
            "Il faut redescendre dire ce qu'on a vu, mot pour mot, aux six tribus. Yohan le fait pendant deux heures, en vardhi, avec un traducteur.",
            "Il dit aussi la lance entaillée, s'il l'a vue. Il dit aussi les onze chevaux, s'il les a appris.",
            "Les six tribus se dispersent sans avoir désigné personne. L'unification khesh est repoussée d'une génération.",
            "Le conseil des tentes paie. « Vous avez fait ce qu'il avait acheté », dit le plus vieux. « Vous avez vu. »"],
            effets:{xp:40, reputation:{khesh:12}, issue:"serment_rompu"}},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   29 — LE DRAGON SANS ROYAUME
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_SANS_ROYAUME", type:'contrat', titre:"Le Dragon sans royaume",
  commanditaire:"Maison de Valombre", maison:"Maison de Valombre",
  or:4800, danger:"légendaire", categorie:"traque", prix:true,
  lieux:["LOC_007","LOC_013","LOC_003"],
  pitch:"Un très vieux dragon propose lui-même des termes au lieu d'attaquer. Plusieurs seigneurs préfèrent qu'il meure avant que la nouvelle se répande.",
  paye:["dragon_tue","termes_acceptes","nouvelle_repandue"],
  issues:{
    dragon_tue:"Le dragon qui parlait est mort avant que ce qu'il proposait soit connu.",
    termes_acceptes:"Des termes ont été signés avec un dragon. Il n'y a pas de précédent.",
    nouvelle_repandue:"Tout le monde sait désormais qu'un dragon a proposé des termes, et personne ne sait quoi en faire.",
    abandonnee:"Yohan a laissé le dragon de Valombre à ses affaires.",
    refusee:"Yohan a refusé les termes de Valombre.",
  },
  etapes:[
    { id:"audience", delai:[0,0], attente:"Valombre veut que ce soit fait vite.",
      ev:{ id:"CHR2_1", titre:"Avant que la nouvelle se répande", famille:"POLITIQUE", rarete:"majeur",
        image:"is_offre",
        scenes:{
          start:{ texte:[
            "Dame Éléonore de Valombre tient les créances de sept maisons et elle reçoit comme on reçoit un créancier : vite, poliment, et sans s'asseoir.",
            "« Il y a onze semaines, un dragon s'est posé devant le poste de Trois-Chênes et il a parlé. »",
            "Elle laisse la phrase agir. « Il a proposé des termes : un tribut annuel contre la protection de la vallée. Il a laissé onze jours pour répondre. Il en est à la troisième proposition. »",
            "Elle croise les mains. « Sept maisons paient pour qu'il meure avant que cela se sache. »"],
            choix:[
              {label:"Demander pourquoi ça les effraie tant", detail:"Un dragon qui parle et qui ne brûle rien",
               suite:"effraie"},
              {label:"Demander quels étaient les termes", detail:"Jet de Précision (13)",
               test:{stat:"precision", dc:13}, reussite:"termes_ok", echec:"termes_ko"},
              {label:"Accepter", detail:"Quatre mille huit cents",
               suite:"accord"},
            ]},
          effraie:{ texte:[
            "« Parce qu'un dragon qui brûle est un fléau. Un dragon qui négocie est un seigneur. »",
            "Elle le dit avec la précision d'une femme qui compte des créances. « S'il obtient un tribut, il a des sujets. S'il a des sujets, il a un droit. Et s'il a un droit, sept maisons humaines qui tiennent leurs terres par le droit ont un problème que personne ne sait plaider. »",
            "Un temps. « Il n'a tué personne. C'est exactement ce qui le rend intolérable. »"],
            effets:{xp:28, flag:"valombre_seigneur"}, suite:"accord"},
          termes_ok:{ texte:[
            "Elle sort les trois propositions, écrites — écrites, sur du vélin, d'une écriture qu'aucun humain n'a tracée.",
            "Un tribut de cent têtes de bétail par an. En échange : la vallée de Trois-Chênes protégée contre tout ce qui vole, et la route de la Combe rouverte au commerce.",
            "La troisième proposition abaisse le tribut à soixante têtes et ajoute une clause : *je ne demanderai pas de serment et n'en prêterai pas. Ceci est un contrat, non une allégeance.*",
            "Il négocie. Il négocie bien, et il négocie à la baisse."],
            effets:{xp:34, flags:["valombre_termes_lus","valombre_seigneur"]}, suite:"accord"},
          termes_ko:{ texte:["« Un tribut », dit-elle. « Le détail n'a pas d'importance. Ce qui compte, c'est qu'il propose. »"],
            effets:{xp:6}, suite:"accord"},
          accord:{ fin:true, texte:[
            "« Quatre mille huit cents écus. Le plus tôt sera le mieux. »",
            "Elle raccompagne jusqu'à la porte. « Et si vous vous demandez pourquoi je paie autant : parce que je suis la seule des sept à avoir lu ses propositions en entier. »"]},
        }}},

    { id:"trois_chenes", delai:[2,4], attente:"Trois-Chênes attend une réponse depuis onze semaines.",
      ev:{ id:"CHR2_2", titre:"Trois-Chênes", famille:"ONDE", rarete:"majeur",
        image:"evt2_pierre_blason",
        scenes:{
          start:{ texte:[
            "Il est posé sur la crête au-dessus du poste, à découvert, depuis onze semaines. Les gens de Trois-Chênes ont cessé d'avoir peur vers la sixième et ont commencé à monter lui porter des choses vers la neuvième.",
            "Il fait cinquante pas. Il est plus vieux que tout ce que Yohan a vu.",
            "Il attend qu'on ait fini de monter avant de parler. *Tu es le quatrième. Les trois autres avaient des lances.*"],
            choix:[
              {label:"Demander ce qu'il veut vraiment", detail:"Onze semaines à négocier avec un poste de garde",
               suite:"veut"},
              {label:"L'attaquer", detail:"C'est ce pour quoi sept maisons paient",
               suite:"combat"},
              {label:"Descendre demander aux gens de Trois-Chênes", detail:"Ils lui montent des choses depuis trois semaines",
               suite:"gens"},
            ]},
          veut:{ texte:[
            "*Un endroit où finir.*",
            "Il laisse ça poser, et une chose de cinquante pas qui laisse poser une phrase, c'est très long.",
            "*J'ai quatre cents ans. Je ne vole plus bien. Les vôtres m'ont chassé de trois vallées en soixante ans et je ne peux plus en traverser une quatrième.*",
            "*Alors j'ai proposé de payer. C'est ce que font vos seigneurs quand ils ne peuvent plus prendre : ils achètent. Je croyais que cela vous serait lisible.*"],
            effets:{xp:36, flags:["valombre_il_finit","valombre_termes_lus"]}, fin:true},
          gens:{ texte:[
            "Le poste de Trois-Chênes compte quarante et une personnes et un sergent qui ne sait plus quoi écrire dans son registre.",
            "« Il a fait partir les wyvernes de la combe en octobre », dit le sergent. « Sans qu'on lui demande. On a rien perdu depuis. »",
            "Une femme ajoute : « Et il a rouvert la route. Y'a pas eu un brigand sur la Combe depuis neuf semaines. On a jamais vendu autant de sel. »",
            "Le sergent finit par dire ce qu'il ne devrait pas : « Nous, on paierait. Cent têtes, on paierait. C'est moins cher que le péage de Valombre. »"],
            effets:{xp:32, flags:["valombre_ils_paieraient","valombre_il_protege"]}, fin:true},
          combat:{ texte:["Il ne se défend pas tout de suite. C'est ce qui est le plus difficile."],
            combat:{ groupe:[{bst:"BST_012", n:1}], victoire:"tue", defaite:"repousse", mortel:true }},
          tue:{ texte:[
            "Il met très longtemps à mourir et il ne dit plus rien après le premier coup.",
            "Les quarante et une personnes de Trois-Chênes montent le lendemain. Personne ne parle. Une femme laisse un pain sur la crête, à côté de la tête, et redescend."],
            effets:{xp:110, sang:16, renom:16, suspicion:12,
                    issue:"dragon_tue", flag:"valombre_dragon_mort"}, fin:true},
          repousse:{ texte:[
            "Il se défend au troisième coup, et quatre cents ans de dragon qui se défend, c'est une chose qu'on ne raconte pas bien.",
            "Yohan redescend la crête sur le dos, à moitié conscient, et ce sont les gens de Trois-Chênes qui le ramassent."],
            effets:{pv:-50, fat:32, xp:30}, fin:true},
        }}},

    { id:"decision", delai:[1,3], attente:"Sept maisons attendent, et quarante et une personnes aussi.",
      ev:{ id:"CHR2_3", titre:"Ce qu'on fait d'un dragon qui négocie", famille:"POLITIQUE", rarete:"majeur",
        image:"is_dossier",
        scenes:{
          start:{ texte:[
            "Quatre mille huit cents écus pour tuer une chose de quatre cents ans qui n'a tué personne et qui a rouvert une route.",
            "Sept maisons paient pour que la nouvelle ne se répande pas. Quarante et une personnes à Trois-Chênes paieraient volontiers le tribut."],
            choix:[
              {label:"Remonter et le tuer", detail:"C'est le contrat",
               suite:"tue", effets:{etape:"trois_chenes"}},
              {label:"Faire signer les termes par Trois-Chênes",
               detail:"Requiert de savoir qu'ils paieraient · un contrat, pas une allégeance",
               requis:{flag:"valombre_ils_paieraient"}, test:{stat:"vol", dc:15},
               reussite:"signe_ok", echec:"signe_ko"},
              {label:"Répandre la nouvelle partout",
               detail:"Requiert d'avoir lu les termes · sept maisons paient pour l'empêcher",
               requis:{flag:"valombre_termes_lus"}, suite:"repand",
               effets:{issue:"nouvelle_repandue", reputation:{humains:-16, parias:14}, renom:14,
                       suspicion:10}},
              {label:"Rendre l'avance et s'en aller", detail:"Quelqu'un d'autre montera",
               suite:"rend", effets:{issue:"abandonnee", reputation:{humains:-8}, renom:-4}},
            ]},
          tue:{ fin:true, texte:["Il remonte la crête. Il n'y a pas grand-chose à ajouter."]},
          signe_ok:{ fin:true, texte:[
            "Il faut convaincre un sergent de poste de signer un contrat avec un dragon au nom de quarante et une personnes, sans mandat, sans sceau et sans précédent.",
            "Ce qui le décide, c'est la clause : *je ne demanderai pas de serment et n'en prêterai pas. Ceci est un contrat, non une allégeance.*",
            "« Alors c'est pas un seigneur », dit le sergent. « C'est un péager. On sait faire avec les péagers. »",
            "Soixante têtes par an, la vallée protégée, la route ouverte. Signé sur du vélin, en deux exemplaires, dont un que le dragon emporte.",
            "Valombre refuse de payer. Les six autres maisons parlent d'expédition punitive pendant deux ans et n'en montent aucune.",
            "Le premier tribut est versé à la Saint-Aubin. Quarante et une personnes montent la crête avec soixante bêtes, et redescendent avec une route sûre."],
            effets:{issue:"termes_acceptes", reputation:{humains:-10, parias:16}, renom:16,
                    suspicion:8, flag:"trois_chenes_traite"}},
          signe_ko:{ texte:[
            "« Je suis sergent de poste », dit-il. « Je n'ai pas mandat pour signer avec un fournisseur de foin, alors avec ça… »",
            "Il a raison. Personne à Trois-Chênes n'a le pouvoir de signer, et c'est précisément pourquoi le dragon en est à sa troisième proposition."],
            effets:{xp:12}, suite:"repand"},
          repand:{ fin:true, texte:[
            "Il fait recopier les trois propositions à onze exemplaires et les laisse là où on lit : deux tavernes d'Astrah, la chancellerie, une foire, le prieuré de Combe-Basse, et sous la porte de six maisons nobles.",
            "En six semaines, tout Vardhen sait qu'un dragon a proposé des termes écrits et qu'il négocie à la baisse.",
            "Personne ne sait quoi en faire. La chancellerie d'Astrah rédige un avis de quarante pages qui ne conclut rien. Deux maisons proposent d'ouvrir des négociations et se rétractent. Une compagnie de mercenaires monte à Trois-Chênes et redescend sans être montée jusqu'en haut.",
            "Le dragon attend sur sa crête. Il est toujours là l'année suivante.",
            "Dame Éléonore de Valombre ne paie pas et n'écrit pas. Elle avait dit qu'elle était la seule à les avoir lues en entier ; elle savait donc ce qu'elle faisait en payant pour qu'elles disparaissent."]},
          rend:{ fin:true, texte:[
            "Il rend l'avance à Valombre sans explication et prend la route de l'est.",
            "Une compagnie franche monte à Trois-Chênes six semaines plus tard. Ils sont onze. Ils redescendent à quatre.",
            "Le dragon est toujours sur sa crête l'hiver suivant, et il en est à sa cinquième proposition."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   30 — LA GUERRE DU LOUP
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"CH_LOUP", type:'contrat', titre:"La Guerre du Loup",
  commanditaire:"Karlsberg", maison:null,
  or:6000, danger:"légendaire", categorie:"guerre",
  lieux:["LOC_001"],
  requis:{ flags:["banniere_haute"] },
  pitch:"Une coalition locale teste militairement la jeune Maison Karlsberg avant qu'elle ne devienne trop forte. Ce n'est pas un contrat : c'est chez vous.",
  paye:["coalition_brisee","coalition_negociee","karlsberg_tenue"],
  issues:{
    coalition_brisee:"La coalition qui marchait sur Karlsberg a été brisée sous ses murs.",
    coalition_negociee:"La coalition qui marchait sur Karlsberg est repartie sans combattre.",
    karlsberg_tenue:"Karlsberg a tenu. On ne l'attaquera plus à la légère.",
    karlsberg_tombee:"Karlsberg est retombée en ruines. Il faudra tout recommencer.",
    abandonnee:"Yohan n'était pas à Karlsberg quand ils sont venus.",
  },
  etapes:[
    { id:"avertissement", delai:[0,0], attente:"Ils seront devant les murs dans cinq semaines.",
      ev:{ id:"CHW2_1", titre:"Trois bannières sur la route du Loup", famille:"PARIA", rarete:"majeur",
        image:"cg_karlsberg",
        scenes:{
          start:{ texte:[
            "Ce n'est pas un commanditaire qui vient : c'est un homme de la vallée, à pied, qui a couru les six dernières lieues.",
            "« Trois bannières. Elles se sont rejointes à Vaubien il y a quatre jours. Elles viennent ici. »",
            "Il reprend son souffle. « Ils disent que la maison Karlsberg n'a pas de titre. Que la bannière que vous avez levée est une usurpation. Qu'ils viennent la faire descendre. »",
            "Derrière lui, le mur d'enceinte relevé, la cour déblayée, et les gens qui sont venus s'installer parce qu'ici on ne demande pas ce que vous êtes."],
            choix:[
              {label:"Demander qui mène", detail:"Trois bannières ont un chef",
               suite:"qui"},
              {label:"Demander combien", detail:"Jet de Précision (12)",
               test:{stat:"precision", dc:12}, reussite:"combien_ok", echec:"combien_ko"},
              {label:"Faire monter tout le monde derrière les murs", detail:"Cinq semaines",
               suite:"prepare"},
            ]},
          qui:{ texte:[
            "« Vauclair. Les deux autres suivent parce que Vauclair paie. »",
            "L'homme s'assied enfin sur une pierre. « On dit qu'il a reçu une lettre d'Astrah. Pas un ordre : un encouragement. Ça revient au même et ça n'engage personne. »"],
            effets:{xp:20, flag:"loup_vauclair"}, suite:"prepare"},
          combien_ok:{ texte:[
            "« Neuf cents, peut-être mille. Dont deux cents cavaliers et quatre pièces de siège légères. »",
            "Il regarde le mur d'enceinte. « Ils croient trouver un chantier. Ils ont raison à moitié. »"],
            effets:{xp:22, flag:"loup_mille_hommes"}, suite:"prepare"},
          combien_ko:{ texte:["« Beaucoup », dit l'homme. « Plus que ce qu'il y a ici. » Il n'a pas compté : il a couru."],
            effets:{xp:6}, suite:"prepare"},
          prepare:{ fin:true, texte:[
            "Cinq semaines. Ce qu'il y a à Karlsberg, c'est ce qu'on y a mis : les murs qu'on a relevés, les hommes qu'on a recrutés, les gens qui sont venus, et ce qu'on a promis à ceux qui doivent quelque chose.",
            "Personne ne paie ce contrat-là. C'est chez soi."]},
        }}},

    { id:"appels", delai:[2,3], attente:"Cinq semaines pour appeler ceux qui doivent quelque chose.",
      ev:{ id:"CHW2_2", titre:"Ceux qui doivent quelque chose", famille:"PARIA", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Cinq semaines et onze cavaliers pour porter des lettres.",
            "Il y a des gens, dans ce monde, qui doivent quelque chose à Yohan de Karlsberg. Certains l'ont dit. Certains l'ont écrit. Certains ne l'ont jamais formulé et s'en souviennent quand même.",
            "C'est maintenant qu'on saura combien."],
            choix:[
              {label:"Écrire à tout le monde", detail:"On ne trie pas quand mille hommes marchent sur vous",
               suite:"tous"},
              {label:"N'écrire qu'à ceux qui ont donné leur parole", detail:"Jet de Volonté (13) · la dignité coûte des hommes",
               test:{stat:"vol", dc:13}, reussite:"fiers_ok", echec:"fiers_ko"},
              {label:"N'écrire à personne", detail:"Ce qui est ici suffira ou ne suffira pas",
               suite:"seul", effets:{renom:6}},
            ]},
          tous:{ texte:[
            "Onze cavaliers, quarante lettres, et cinq semaines.",
            "Ce qui revient n'est jamais ce qu'on attend. Des gens à qui l'on n'avait rien demandé arrivent avec des charrettes. D'autres, à qui l'on avait sauvé la vie, ne répondent pas.",
            "Ceux qui viennent viennent parce qu'ils ont décidé, il y a longtemps, qu'ils viendraient si on les appelait un jour."],
            effets:{xp:30, flag:"loup_appel_large"}, fin:true},
          fiers_ok:{ texte:[
            "Onze lettres, à onze personnes qui ont donné leur parole, et pas une de plus.",
            "Elles arrivent toutes les onze. Ce n'est pas beaucoup d'hommes et c'est exactement les bons.",
            "Karlsberg n'a pas mendié, et il se trouve que dans une vallée qui regarde, cela compte plus que deux cents hommes de plus."],
            effets:{xp:34, renom:10, flags:["loup_appel_large","loup_dignite"]}, fin:true},
          fiers_ko:{ texte:["Onze lettres. Sept réponses. Quatre silences qui pèseront longtemps.", "On fera avec sept."],
            effets:{xp:16, flag:"loup_appel_large"}, fin:true},
          seul:{ texte:[
            "Aucune lettre. Ce qui est à Karlsberg est à Karlsberg, et si cela ne suffit pas, cela n'aura pas suffi.",
            "La vallée le remarque. Certains trouvent ça fier. D'autres trouvent ça bête. Les deux ont raison."],
            effets:{xp:20}, fin:true},
        }}},

    { id:"murs", delai:[1,2], attente:"Ils sont devant.",
      ev:{ id:"CHW2_3", titre:"Sous les Bannières du Loup", famille:"PARIA", rarete:"majeur",
        image:"cg_karlsberg",
        scenes:{
          start:{ texte:[
            "Ils arrivent le trente-quatrième jour et se déploient à six cents pas, en bon ordre, avec le temps devant eux.",
            "Sur le mur relevé, il y a ce qu'on a : les hommes recrutés, ceux qui sont venus, et les gens de la vallée qui n'ont nulle part où aller.",
            "Vauclair envoie un parlementaire avant midi. Il propose la reddition de la bannière, pas des personnes."],
            choix:[
              {label:"Refuser et tenir", detail:"C'est pour ça qu'on a relevé les murs",
               suite:"tient"},
              {label:"Négocier", detail:"Jet de Volonté (16) · trois bannières, et une seule qui y tient",
               requis:{flag:"loup_vauclair"}, test:{stat:"vol", dc:16},
               reussite:"nego_ok", echec:"nego_ko"},
              {label:"Descendre la bannière", detail:"Les gens restent. Le nom retombe.",
               suite:"descend",
               effets:{issue:"karlsberg_tombee", reputation:{parias:-30, humains:10}, renom:-16}},
            ]},
          tient:{ texte:["On ne répond pas au parlementaire. À la place, on hisse la seconde bannière."],
            bataille:{ def:"BAT_KARLSBERG", victoire:"tenue", defaite:"tombee" }},
          tenue:{ fin:true, texte:[
            "Ils tiennent onze jours. Le quatrième, une pièce de siège ouvre une brèche de six pas dans l'enceinte relevée, et la brèche est tenue toute la nuit par des gens dont aucun n'est soldat.",
            "Le neuvième, l'une des trois bannières se retire — celle qui suivait parce qu'on la payait.",
            "Le onzième, Vauclair lève le camp.",
            "Karlsberg n'a pas gagné une bataille : Karlsberg a tenu. C'est très différent et c'est infiniment plus solide. Personne ne remontera cette route à la légère.",
            "On enterre trente et un morts dans la cour déblayée. Ils ont un nom sur une pierre, et c'est la première fois depuis quarante ans qu'on grave un nom à Karlsberg."],
            effets:{xp:120, renom:30, reputation:{parias:34, humains:-10}, suspicion:16,
                    issue:"karlsberg_tenue", flag:"karlsberg_a_tenu"}},
          tombee:{ fin:true, texte:[
            "La brèche cède au sixième jour et il n'y a pas de seconde ligne, parce qu'on n'a jamais eu de quoi en faire une.",
            "Les gens sortent par la poterne nord pendant que ce qui reste tient la cour. Yohan sort avec eux, le dernier, parce qu'un homme qui meurt sur ses murs ne sert plus à personne.",
            "Vauclair fait abattre l'enceinte relevée et la salle basse. Il laisse le loup de pierre : il dit que c'est plus humiliant.",
            "Il faudra tout recommencer. On a déjà recommencé une fois."],
            effets:{xp:60, renom:-10, reputation:{parias:16, humains:-4},
                    issue:"karlsberg_tombee", flag:"karlsberg_rasee_deux_fois"}},
          nego_ok:{ fin:true, texte:[
            "Trois bannières, et une seule qui tient à cette guerre.",
            "Yohan sort à découvert, seul, à trois cents pas, et il parle aux deux autres — pas à Vauclair : aux deux qui suivent parce qu'on les paie.",
            "Il leur offre ce que Vauclair ne peut pas leur offrir : le passage libre sur la route du Loup, à perpétuité, sans péage, garanti par écrit devant leurs propres capitaines.",
            "L'une accepte dans la journée. L'autre le lendemain matin.",
            "Vauclair reste seul devant des murs relevés avec trois cents hommes. Il lève le camp au trente-huitième jour sans avoir tiré un coup.",
            "Il n'y a pas eu de bataille. Il y a eu une route ouverte, et deux maisons qui doivent désormais quelque chose à Karlsberg."],
            effets:{xp:100, renom:26, reputation:{parias:26, humains:8}, suspicion:12,
                    issue:"coalition_negociee", flag:"karlsberg_route_ouverte"}},
          nego_ko:{ texte:[
            "Il sort à découvert et on l'écoute par courtoisie pendant onze minutes.",
            "Puis le capitaine de la deuxième bannière dit : « Vauclair nous paie aujourd'hui. Vous nous promettez pour dans dix ans. »",
            "Il remonte sur ses murs."],
            effets:{xp:20}, suite:"tient"},
          descend:{ fin:true, texte:[
            "La bannière descend à midi, devant mille hommes et devant tous ceux qui sont venus s'installer ici parce qu'on y relevait un nom.",
            "Vauclair accepte : il voulait la bannière, pas les gens. Il repart le lendemain.",
            "Karlsberg reste debout — les murs, la cour, la salle basse. Ce qui est tombé, c'est le nom.",
            "Onze familles repartent dans le mois. Elles n'étaient pas venues pour des murs."]},
        }}},
  ]},

];
