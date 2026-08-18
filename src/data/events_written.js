/* PARIAS — Événements écrits
 *
 * Remplacent, en priorité de tirage, les variantes générées de events.js.
 * Un événement est un petit arbre de scènes : chaque choix mène à une autre
 * scène, éventuellement après un jet de dé. Rien n'est purement cosmétique —
 * chaque branche a des effets et referme l'histoire différemment.
 *
 * ── Format ────────────────────────────────────────────────────────────────
 * id, titre, famille, rarete          identiques à events.js (famille = filtre de lieu)
 * image                               assets/events/<image>.webp
 * lieux: ["LOC_011", …]               optionnel : restreint à ces lieux précis
 * scenes: { start: {...}, autre: {...} }
 *
 * Scène :
 *   pnj      clé de PORTRAITS, affiche la vignette du personnage
 *   texte    tableau de paragraphes
 *   effets   appliqués à l'entrée de la scène
 *   choix    tableau de choix (absent = scène terminale)
 *   combat   { groupe:[{bst:"BST_002", n:2}], victoire:"id", defaite:"id" }
 *
 * Choix :
 *   label     texte du bouton
 *   detail    ligne grise sous le bouton (coût, indice, risque)
 *   requis    { pouvoir:"foudre" } | { objet:"potion_vigueur" } | { flag:"x" } | { sansFlag:"x" }
 *   test      { stat:"agi"|"precision"|"vol", dc:12 }  → utilise reussite/echec
 *   suite     scène suivante si pas de test
 *   effets    { or, xp, pv, fat, suspicion, sang, item, flag }
 *
 * Effets : or/xp/pv/fat/suspicion/sang sont des entiers signés,
 *          item = id de ITEM_POOL, flag = marqueur persistant sur la partie.
 */

const EVENTS_WRITTEN = [

/* ══════════════════════════════ VOYAGE ══════════════════════════════ */
{
  id:"EW_PEAGE", titre:"Le péage des Trois Clous", famille:"VOYAGE", rarete:"commun",
  image:"evt_peage", lieux:["LOC_011","LOC_012","LOC_002"],
  scenes:{
    start:{
      pnj:"baltus",
      texte:[
        "Le pont est le seul passage à trois jours de marche, et quelqu'un l'a compris avant Yohan. Une chaîne barre le tablier, tendue entre deux billots plantés dans la pierre. Derrière, six hommes mal armés mais bien nourris — ce qui, sur cette route, en dit plus long qu'une bannière.",
        "Celui qui s'avance a des clous de charpentier passés dans le cuir de son ceinturon, trois, alignés au-dessus de la boucle. « Vingt pièces, voyageur. Le pont coûte à l'entretien. »",
        "Le pont n'a manifestement pas été entretenu depuis une génération."
      ],
      choix:[
        {label:"Payer sans discuter", detail:"−20 or · personne ne retient un visage qui paie",
         suite:"paye", effets:{or:-20, suspicion:-2}},
        {label:"Refuser, et tenir la position", detail:"Jet de Volonté (13) · être remarqué a un coût",
         test:{stat:"vol", dc:13}, reussite:"tenir_ok", echec:"tenir_ko", effets:{suspicion:3}},
        {label:"Demander qui les paie, eux", detail:"Jet de Précision (11)",
         test:{stat:"precision", dc:11}, reussite:"enquete_ok", echec:"enquete_ko"},
        {label:"Laisser filtrer ce qu'il est", detail:"Requiert un pouvoir de l'Onde · efficace, et très voyant",
         requis:{pouvoir:"foudre"}, suite:"onde"},
      ]
    },
    paye:{
      texte:[
        "Yohan compte les pièces dans la paume tendue. Baltus les fait sauter une fois, les glisse dans sa ceinture, et fait signe qu'on abaisse la chaîne. Aucun des six ne le regarde vraiment traverser — ils regardent déjà derrière lui, vers le prochain.",
        "C'est exactement ce que Yohan voulait : passer sans laisser de trace. Vingt pièces, c'est le prix courant de l'oubli."
      ],
      fin:true
    },
    tenir_ok:{
      pnj:"baltus",
      texte:[
        "Yohan ne recule pas d'un pouce et ne porte pas la main à son arme. Il se contente de rester là, exactement là, et d'attendre que quelqu'un décide de faire le premier geste.",
        "Personne ne le fait. Baltus regarde ses hommes, comprend qu'aucun n'a envie d'ouvrir les hostilités pour vingt pièces, et se fend d'un rire trop fort. « Passe. Passe donc. On ne rançonne pas les fous, ça porte malheur. »",
        "La chaîne tombe. Yohan traverse. Dans son dos, quelqu'un demande à mi-voix qui c'était — et personne ne répond."
      ],
      effets:{xp:10},
      fin:true
    },
    tenir_ko:{
      texte:[
        "Yohan tient bon un moment de trop. Baltus, lui, a compris qu'il n'y aurait ni paiement ni recul, et il n'a pas six hommes derrière lui pour reculer le premier.",
        "La chaîne racle la pierre. Deux d'entre eux contournent déjà par le flanc."
      ],
      combat:{ groupe:[{bst:"BST_002", n:2}], victoire:"tenir_apres", defaite:"tenir_apres" }
    },
    tenir_apres:{
      texte:[
        "Le pont est libre, d'une manière ou d'une autre. Yohan le traverse plus lentement qu'il ne l'aurait voulu.",
        "Ce genre d'histoire remonte les routes plus vite qu'un cavalier. Quelque part, ce soir, quelqu'un racontera qu'un homme seul a forcé le péage des Trois Clous."
      ],
      effets:{suspicion:5, sang:1},
      fin:true
    },
    enquete_ok:{
      pnj:"baltus",
      texte:[
        "« L'entretien du pont », répète Yohan, sans quitter des yeux les bottes de Baltus. Des bottes de soldat, ressemelées deux fois, avec la marque d'un éperon qu'on a retiré. Personne ne rançonne les routes en bottes de cavalerie sans avoir servi quelque part.",
        "Yohan demande à haute voix pour quelle maison ils tiennent le pont. Le silence qui suit vaut réponse : ce péage n'est pas une bande de brigands, c'est une taxe qu'une maison n'ose pas signer de son nom.",
        "Baltus abrège. « Passe. Et oublie les bottes. » La chaîne descend avant que Yohan n'ait à insister."
      ],
      effets:{xp:14, flag:"peage_maison_devinee"},
      fin:true
    },
    enquete_ko:{
      texte:[
        "Yohan pose deux questions de trop et n'obtient que ce qu'on donne à un curieux : rien, dit lentement, avec le regard de six hommes qui se rapprochent d'un pas.",
        "Il paie les vingt pièces. C'était le prix depuis le début ; il l'a simplement payé un peu plus cher en fierté."
      ],
      effets:{or:-20},
      fin:true
    },
    onde:{
      texte:[
        "Yohan ne dit rien. Il laisse simplement l'Onde monter — juste assez pour que l'air se charge, que les chevaux reculent d'eux-mêmes, que la chaîne se mette à vibrer contre la pierre avec un bruit de guêpe.",
        "Baltus regarde la chaîne. Puis Yohan. Puis, très vite, ailleurs. « Enlevez ça. Enlevez ça tout de suite. »",
        "Yohan traverse un pont vide. Il n'a pas eu à payer, il n'a pas eu à frapper. Mais six hommes viennent de voir ce que seuls les Parias savent faire, et ils ont tous une langue."
      ],
      effets:{fat:18, suspicion:12, sang:2, xp:12},
      fin:true
    }
  }
},

/* ══════════════════════════════ VILLE ══════════════════════════════ */
{
  id:"EW_REGISTRE", titre:"Ce que gardent les archives", famille:"VILLE", rarete:"rare",
  image:"evt_archives", lieux:["LOC_002","LOC_004","LOC_007"],
  scenes:{
    start:{
      pnj:"mere_orsen",
      texte:[
        "La salle des rôles sent le vélin moisi et la cire froide. Mère Orsen y règne depuis quarante ans sur des registres que plus personne ne consulte — les impôts d'avant la Purge, les cadastres de maisons qui n'existent plus.",
        "Elle n'a pas levé les yeux quand Yohan est entré. Elle les lève maintenant, et les garde sur lui un peu trop longtemps.",
        "« Vous avez le nez des Karlsberg. » Elle dit ça comme on constate la pluie. « Rassurez-vous, je suis la dernière à savoir à quoi ressemblait ce nez-là. Les autres sont morts ou ont eu la sagesse d'oublier. »"
      ],
      choix:[
        {label:"Nier en bloc", detail:"Jet de Précision (12) · le mensonge doit tenir",
         test:{stat:"precision", dc:12}, reussite:"nie_ok", echec:"nie_ko"},
        {label:"Admettre, et demander ce qu'elle veut", detail:"Elle sait déjà · autant savoir ce qu'elle en fera",
         suite:"admet"},
        {label:"Chercher soi-même dans les rôles", detail:"Jet de Précision (14) · les archives sont immenses",
         test:{stat:"precision", dc:14}, reussite:"fouille_ok", echec:"fouille_ko"},
      ]
    },
    nie_ok:{
      texte:[
        "Yohan rit, du bon rire un peu las de l'homme qu'on confond avec un autre pour la dixième fois du mois. Il donne un nom de bourg, un métier de père, une raison plate d'être là. Rien qui accroche.",
        "Mère Orsen l'écoute jusqu'au bout, hoche la tête, et retourne à son registre. « Alors j'aurai eu tort. À mon âge, ça arrive de plus en plus. »",
        "Elle a peut-être cru le mensonge. Elle a peut-être seulement décidé de le laisser passer. Dans les deux cas, Yohan ressort sans avoir donné prise."
      ],
      effets:{suspicion:-6, xp:10},
      fin:true
    },
    nie_ko:{
      pnj:"mere_orsen",
      texte:[
        "Yohan donne un nom. Mère Orsen tourne trois pages, pose son doigt sur une ligne, et lit à voix haute le registre des naissances de ce bourg-là pour ces années-là. Le nom n'y est pas.",
        "« Vous mentez mal, jeune homme. Ce n'est pas un reproche : les bons menteurs, je les repère aussi. »",
        "Elle referme le registre. « Je ne vous dénoncerai pas. Mais quelqu'un d'autre vous posera la même question, et celui-là ne sera pas une vieille femme. »"
      ],
      effets:{suspicion:8},
      fin:true
    },
    admet:{
      pnj:"mere_orsen",
      texte:[
        "« Karlsberg », dit Yohan. Le mot n'a pas été prononcé à voix haute dans cette pièce depuis la Purge, et il y résonne plus fort qu'il ne devrait.",
        "Mère Orsen se lève, lentement, va jusqu'à une travée que la poussière protège mieux qu'une serrure. Elle en sort un rouleau qui n'a pas d'étiquette. « Ils ont brûlé les rôles de Karlsberg. Ils n'ont pas pensé aux rôles fiscaux des maisons voisines — et une maison voisine, ça consigne toujours à qui elle a vendu du grain. »",
        "Elle le lui tend. « Je ne veux pas d'or. Je veux que quelqu'un se souvienne que j'ai gardé ça quarante ans. »"
      ],
      choix:[
        {label:"Prendre le rouleau et lui promettre de s'en souvenir", detail:"Le sang de l'Onde se rappelle à Yohan",
         suite:"admet_prend", effets:{sang:8, xp:20, flag:"rouleau_orsen"}},
        {label:"Refuser : ce papier la ferait pendre", detail:"Rien pour Yohan · elle vivra plus vieille",
         suite:"admet_refuse"},
      ]
    },
    admet_prend:{
      texte:[
        "Le rouleau tient dans une main. Des colonnes de chiffres, des noms de villages, et au milieu d'une liste de créanciers : *Maison Karlsberg — grain, sel, fer* — sur douze années, avec les signatures des intendants.",
        "Ce n'est pas une généalogie. C'est mieux : c'est une preuve administrative que la maison a existé, tenue par une main qui n'avait aucune raison de mentir.",
        "Mère Orsen a déjà repris sa plume quand Yohan sort. Elle ne se retourne pas."
      ],
      fin:true
    },
    admet_refuse:{
      texte:[
        "Yohan repousse doucement le rouleau vers elle. « Si on trouve ça ici, on vous pendra à la porte de la salle des rôles. Brûlez-le. »",
        "Mère Orsen le regarde longtemps. « Vous êtes le premier Karlsberg que je rencontre qui pense à quelqu'un d'autre. » Elle range le rouleau là où il était. « Il sera là si vous changez d'avis. »"
      ],
      effets:{suspicion:-4, xp:12, flag:"orsen_epargnee"},
      fin:true
    },
    fouille_ok:{
      texte:[
        "Yohan connaît la logique des registres mieux qu'un scribe : on ne cherche pas ce qu'on veut trouver, on cherche ce que l'administration n'a pas eu de raison de détruire.",
        "Il remonte les rôles de péage, les taxes de foire, les listes de saisies. Et il trouve — pas un nom, mais une adresse : un entrepôt de Fort-aux-Princes saisi à un débiteur nommé seulement « l'homme du Loup ».",
        "Mère Orsen, dans son dos, n'a rien dit de toute l'heure. Quand il referme le dernier volume, elle murmure : « Vous cherchiez au bon endroit. C'est rare. »"
      ],
      effets:{xp:24, or:0, flag:"entrepot_loup"},
      fin:true
    },
    fouille_ko:{
      texte:[
        "Trois heures de poussière et de colonnes de chiffres. Yohan ressort avec les yeux brûlants, une quinte de toux et rien du tout.",
        "Les archives ne rendent pas ce qu'on leur arrache : elles rendent ce qu'on sait leur demander."
      ],
      effets:{fat:6},
      fin:true
    }
  }
},

/* ══════════════════════════════ PARIA ══════════════════════════════ */
{
  id:"EW_ENFANT", titre:"L'enfant qui fait trembler les vitres", famille:"PARIA", rarete:"rare",
  image:"evt_enfant", scenes:{
    start:{
      pnj:"enfant_onde",
      texte:[
        "Le hameau ne compte pas trente feux, et pourtant vingt personnes se tiennent en cercle devant une grange, à bonne distance. Personne ne parle. Dans la grange, quelque chose fait vibrer les vitres de la ferme d'en face — un bourdonnement sourd, régulier, qui monte et redescend comme une respiration.",
        "Yohan connaît ce bruit. Il l'a fait lui-même, à peu près à cet âge-là.",
        "Un homme finit par dire, à personne en particulier : « Elle a onze ans. On sait pas quoi faire. » Ce qu'il ne dit pas, c'est qu'ils le savent très bien, et qu'ils attendent seulement que quelqu'un ait le cran de le faire."
      ],
      choix:[
        {label:"Entrer seul dans la grange", detail:"Jet de Volonté (12) · l'Onde reconnaît l'Onde",
         test:{stat:"vol", dc:12}, reussite:"entre_ok", echec:"entre_ko"},
        {label:"Se retourner contre le cercle", detail:"Jet de Volonté (14) · vingt personnes, une seule voix",
         test:{stat:"vol", dc:14}, reussite:"foule_ok", echec:"foule_ko"},
        {label:"Payer quelqu'un pour l'emmener loin", detail:"−80 or · une solution lâche qui marche parfois",
         requis:{or:80}, suite:"paye"},
        {label:"Passer son chemin", detail:"Le monde continue, avec ou sans Yohan",
         suite:"part"},
      ]
    },
    entre_ok:{
      pnj:"enfant_onde",
      texte:[
        "Il fait noir et l'air est épais comme avant l'orage. La petite est accroupie contre une botte de paille, les mains serrées sur les oreilles, et tout ce qui l'entoure à moins de trois pas flotte à un doigt du sol : brins, poussière, un seau, un chat terrifié.",
        "Yohan ne s'approche pas. Il s'assoit, à distance, et laisse sa propre Onde monter juste assez pour qu'elle la sente — pas une menace, une réponse. *Tu n'es pas la seule.*",
        "Le bourdonnement s'effondre d'un coup. Le seau tombe. Le chat détale. La petite le regarde et dit la seule chose que Yohan aurait voulu entendre à onze ans : « Alors c'est pas une maladie. »"
      ],
      choix:[
        {label:"L'emmener chez ceux qui sauront", detail:"Un détour long et risqué · +Suspicion",
         suite:"emmene", effets:{sang:10, xp:26, suspicion:10, flag:"enfant_sauvee"}},
        {label:"Lui apprendre à l'étouffer, et repartir", detail:"Elle survivra cachée · comme lui",
         suite:"apprend", effets:{sang:5, xp:18, flag:"enfant_cachee"}},
      ]
    },
    emmene:{
      texte:[
        "Yohan ressort de la grange avec la petite derrière lui et le cercle s'ouvre sans un mot — de soulagement plus que de respect. Le problème s'en va sur ses deux jambes, c'est tout ce qu'ils demandaient.",
        "La route sera longue et il faudra la faire en évitant les villes. Mais quelque part au bout, il y a des gens qui savent quoi faire d'une enfant de onze ans qui fait trembler les vitres.",
        "Un Paria de plus qui vivra. À l'échelle de ce qui reste des Parias, ce n'est pas rien."
      ],
      fin:true
    },
    apprend:{
      texte:[
        "Yohan lui montre le peu qu'on peut montrer en une heure : respirer contre l'Onde, la ravaler, faire semblant que le monde ne bourdonne pas. Ce n'est pas une éducation, c'est un déguisement.",
        "« Ça fait mal », dit-elle. « Oui », répond Yohan. « Toute ta vie. »",
        "Il repart avant la nuit. Le hameau retrouvera son calme et racontera qu'un voyageur a guéri la petite. C'est faux, et c'est ce qui la gardera en vie."
      ],
      fin:true
    },
    entre_ko:{
      texte:[
        "Yohan entre, et l'Onde de la petite le prend de plein fouet — sans intention, sans malice, la panique brute d'une enfant qui ne contrôle rien. Il est projeté contre la cloison avant d'avoir pu dire un mot.",
        "Il ressort en s'appuyant au chambranle, sonné, sous les yeux de vingt personnes qui viennent de le voir échouer.",
        "Le bourdonnement, derrière lui, n'a pas faibli."
      ],
      effets:{pv:-9, fat:20, suspicion:6},
      fin:true
    },
    foule_ok:{
      texte:[
        "Yohan tourne le dos à la grange et fait face au cercle. Il ne hausse pas la voix ; il nomme. Celui qui tient la torche, celle qui a fermé les volets, le prêtre qui n'est pas venu. Il leur dit ce qu'ils s'apprêtaient à faire, avec les mots exacts, à voix haute, devant tout le monde.",
        "C'est insupportable de s'entendre dire. Le cercle se défait par les bords, une famille d'abord, puis trois.",
        "Il ne reste bientôt que le père de la petite, qui pleure sans bruit, et qui rentre chez lui chercher une couverture."
      ],
      effets:{xp:22, sang:6, suspicion:4, flag:"hameau_retourne"},
      fin:true
    },
    foule_ko:{
      texte:[
        "Yohan parle, et vingt personnes terrifiées entendent un étranger prendre le parti de la chose qui fait trembler leurs vitres.",
        "Quelqu'un dit tout haut ce que tous pensaient tout bas : « Et toi, t'es quoi, alors ? »",
        "La question reste en suspens. Yohan quitte le hameau avant qu'on y réponde à sa place — mais la question, elle, voyagera."
      ],
      effets:{suspicion:14},
      fin:true
    },
    paye:{
      texte:[
        "Yohan trouve le seul homme du hameau qui possède une charrette et lui met quatre-vingts pièces dans la main. Assez pour le voyage, assez pour le silence, assez pour qu'il ne revende pas la petite à la première garnison.",
        "Assez, probablement. Yohan repart sans le savoir, et il ne le saura jamais.",
        "C'est la solution des gens pressés : elle règle le problème qu'on voit, et laisse ouvert celui qu'on ne verra pas."
      ],
      effets:{or:-80, sang:2, xp:8},
      fin:true
    },
    part:{
      texte:[
        "Yohan reprend la route. Derrière lui, le bourdonnement continue un moment, puis s'arrête.",
        "Il ne saura pas comment. C'est précisément pour ça qu'il est parti."
      ],
      effets:{suspicion:-3},
      fin:true
    }
  }
},

/* ══════════════════════════════ ONDE ══════════════════════════════ */
{
  id:"EW_CICATRICE", titre:"Ce qui parle dans la Cicatrice", famille:"ONDE", rarete:"épique",
  image:"evt_cicatrice", lieux:["LOC_014","LOC_001","LOC_013"],
  scenes:{
    start:{
      texte:[
        "La faille ne ressemble à rien de ce qu'on raconte. Ce n'est pas un gouffre : c'est une absence, une couture verticale dans l'air où le paysage derrière ne correspond pas tout à fait au paysage devant. La pierre au sol y est vitrifiée sur cinquante pas.",
        "Yohan s'approche et la Cicatrice fait ce qu'elle fait à tous les porteurs du sang : elle répond. Pas avec des mots. Avec une pression, dans le crâne, comme une main posée sur une nuque.",
        "Et sous la pression, très loin, quelque chose qui compte. Des noms. Beaucoup de noms, récités sans fin, dont certains sont des Karlsberg."
      ],
      choix:[
        {label:"Écouter jusqu'au bout", detail:"Jet de Volonté (15) · la Fatigue monte, quoi qu'il arrive",
         test:{stat:"vol", dc:15}, reussite:"ecoute_ok", echec:"ecoute_ko", effets:{fat:25}},
        {label:"Répondre : donner son propre nom", detail:"Personne n'a jamais raconté ce qui arrive ensuite",
         suite:"repond"},
        {label:"Reculer tant que c'est encore un choix", detail:"−Fatigue · la sagesse a rarement tort ici",
         suite:"recule"},
      ]
    },
    ecoute_ok:{
      texte:[
        "Yohan tient. La récitation se déroule, et il comprend au bout d'un moment que ce ne sont pas des noms de morts : ce sont des noms de porteurs. Tous ceux que l'Onde a touchés depuis la collision, dans l'ordre, sans exception.",
        "La liste est longue. Elle est aussi beaucoup plus longue qu'elle ne devrait l'être si les Parias étaient réellement au bord de l'extinction.",
        "Quand ça s'arrête, Yohan est à genoux, saigne du nez, et sait une chose que personne à Vardhen ne sait : **il en reste**. Bien plus qu'on ne le croit. Ils se cachent simplement mieux que lui."
      ],
      effets:{sang:15, xp:40, pv:-6, flag:"verite_cicatrice"},
      fin:true
    },
    ecoute_ko:{
      texte:[
        "La récitation ne s'arrête pas et Yohan comprend trop tard que rien ne l'arrêtera : c'est lui qui doit rompre, et rompre coûte.",
        "Il s'arrache à la Cicatrice comme on s'arrache à un aimant, tombe en arrière sur la pierre vitrifiée, et reste là longtemps à regarder un ciel qu'il n'est pas certain de reconnaître.",
        "Il a retenu quatre noms sur des milliers. Quatre. C'est peu et c'est déjà trop lourd."
      ],
      effets:{fat:20, pv:-12, sang:4, xp:14},
      fin:true
    },
    repond:{
      texte:[
        "« Yohan de Karlsberg », dit-il à voix haute, devant une faille dans le monde, comme un imbécile ou comme un héritier.",
        "La récitation s'interrompt. Le silence qui suit dure trois secondes et pèse une vie entière.",
        "Puis elle reprend — et son nom y est. Inséré à sa place, dans l'ordre, entre deux inconnus. La Cicatrice ne lui a pas répondu : elle l'a enregistré."
      ],
      choix:[
        {label:"Y voir une reconnaissance", detail:"Le sang répond au sang",
         suite:"repond_fin", effets:{sang:12, xp:30, fat:20, flag:"nomme_par_onde"}},
      ]
    },
    repond_fin:{
      texte:[
        "Yohan redescend de la pierre vitrifiée en marchant lentement, parce que ses jambes ne suivent pas tout à fait.",
        "Quelque chose de très ancien connaît son nom, maintenant. Il n'a aucune idée de ce que ça implique, et il est à peu près certain que c'est irréversible."
      ],
      fin:true
    },
    recule:{
      texte:[
        "Yohan recule. La pression décroît par paliers, à contrecœur, comme si elle négociait.",
        "À vingt pas, il n'entend plus rien. À cinquante, il n'est plus certain d'avoir entendu quoi que ce soit.",
        "Il reprend la route en se répétant qu'il reviendra mieux préparé. Il sait déjà que c'est ce que tout le monde se dit."
      ],
      effets:{fat:-10},
      fin:true
    }
  }
},

/* ══════════════════════════════ TAVERNE ══════════════════════════════ */
{
  id:"EW_CHAUDRON", titre:"La table qui s'est tue", famille:"TAVERNE", rarete:"commun",
  image:"evt_taverne", scenes:{
    start:{
      pnj:"taverniere",
      texte:[
        "Le Chaudron Fendu est plein, bruyant, et devient nettement moins bruyant à mesure que Yohan traverse la salle. Pas un silence complet — un silence par table, comme une vague qui s'écarte.",
        "Wenda, derrière son comptoir, remplit un pichet sans lever les yeux. « Vous vous asseyez ou vous partez ? Parce que dans les deux cas, ils vont parler de vous. »",
        "Dans le fond, quatre hommes se sont tus complètement. L'un d'eux a une besace de coursier posée entre les pieds, et il vient de la faire glisser sous la table."
      ],
      choix:[
        {label:"S'asseoir au comptoir et écouter", detail:"Jet de Précision (11) · les tavernes parlent d'elles-mêmes",
         test:{stat:"precision", dc:11}, reussite:"ecoute_ok", echec:"ecoute_ko"},
        {label:"Aller droit à la table du fond", detail:"Jet de Volonté (13) · direct, et donc risqué",
         test:{stat:"vol", dc:13}, reussite:"table_ok", echec:"table_ko"},
        {label:"Payer une tournée à toute la salle", detail:"−35 or · le meilleur achat de renseignement du monde",
         requis:{or:35}, suite:"tournee", effets:{or:-35}},
      ]
    },
    ecoute_ok:{
      pnj:"taverniere",
      texte:[
        "Yohan s'installe, commande, et cesse d'exister pour la salle en une dizaine de minutes. C'est le seul talent qui compte dans une taverne.",
        "Le bruit revient. Avec lui, les phrases : une garnison payée en retard, une route coupée au nord, et un mot répété trois fois à trois tables différentes — *chasseur*. Quelqu'un cherche quelqu'un, et paie pour ça.",
        "Wenda repasse, essuie devant lui, et dit sans le regarder : « Deux jours qu'il pose des questions. Il décrit un homme seul, deux pistolets, une épée trop lourde pour un voyageur. » Elle relève enfin les yeux. « Buvez vite. »"
      ],
      effets:{xp:14, suspicion:5, flag:"averti_chasseur"},
      fin:true
    },
    ecoute_ko:{
      texte:[
        "Yohan écoute une heure et n'entend que ce qu'on entend partout : les prix, la pluie, une querelle de bornage vieille de trois générations.",
        "La table du fond est partie pendant qu'il regardait ailleurs. La besace aussi."
      ],
      fin:true
    },
    table_ok:{
      texte:[
        "Yohan tire une chaise à la table du fond sans y avoir été invité et s'assoit dans le silence que ça produit. Il ne dit rien pendant assez longtemps pour que ce soit à eux de parler.",
        "C'est le plus jeune qui craque. La besace contient des ordres de marche — pas des ordres impériaux : des ordres portant un sceau que personne n'a le droit de porter depuis la fin de la guerre civile.",
        "« On transporte, on ne lit pas », dit le plus vieux. « Vous non plus, vous n'avez rien lu. » Il pousse une bourse sur la table, et il attend."
      ],
      choix:[
        {label:"Prendre la bourse et oublier", detail:"+120 or · un secret rentable",
         suite:"table_or", effets:{or:120, xp:10}},
        {label:"Refuser et retenir le sceau", detail:"Ce que ça vaut plus tard vaut mieux que ce que ça vaut ce soir",
         suite:"table_sceau", effets:{xp:20, flag:"sceau_ancien_vu"}},
      ]
    },
    table_or:{
      texte:[
        "Yohan fait glisser la bourse dans sa manche et se lève. Personne ne le suit des yeux, ce qui est exactement le service qu'il vient d'acheter en même temps qu'eux.",
        "Quelqu'un lève des bannières interdites quelque part à Vardhen. Ce n'est pas son affaire ce soir — et ce soir, ça paie mieux que ça ne coûte."
      ],
      fin:true
    },
    table_sceau:{
      texte:[
        "Yohan repousse la bourse du dos de la main et sort sans se retourner. Ce qu'il emporte tient en une image : un sceau à double aigle, celui de l'ancien Astrah, sur des ordres de marche datés de ce mois-ci.",
        "Un homme qui sait ça avant les autres a une longueur d'avance sur beaucoup de monde. Encore faut-il vivre assez longtemps pour s'en servir."
      ],
      fin:true
    },
    table_ko:{
      texte:[
        "Yohan s'approche trop vite. Le plus jeune se lève d'un bond, renverse un banc, et le reste de la salle décide en un instant que c'est un problème de taverne — donc un problème collectif.",
        "Deux hommes se placent déjà entre Yohan et la porte."
      ],
      combat:{ groupe:[{bst:"BST_001", n:3}], victoire:"table_ko_apres", defaite:"table_ko_apres" }
    },
    table_ko_apres:{
      pnj:"taverniere",
      texte:[
        "Wenda contemple sa salle, deux bancs cassés et un silence tout neuf. « Voilà. Maintenant tout le monde se souvient de vous. »",
        "Elle ramasse un pichet intact. « La table du fond est partie par la cour pendant que vous vous occupiez du reste. Vous avez fait exactement ce qu'ils voulaient. »"
      ],
      effets:{suspicion:9},
      fin:true
    },
    tournee:{
      pnj:"taverniere",
      texte:[
        "Trente-cinq pièces sur le comptoir, et Wenda annonce la tournée d'une voix qui porte jusqu'à la cour. La salle se retourne vers Yohan avec une chaleur soudaine et parfaitement sincère.",
        "En une heure, il apprend plus qu'en trois jours de route : qui tient les cols, quelle maison ne paie plus ses gardes, et qu'un homme aux armes trop lourdes a été vu — mais on ne se rappelle plus très bien où, ni quand, ni si c'était bien lui.",
        "Wenda récupère les pichets vides. « Payer une tournée, c'est aussi acheter les mauvais souvenirs des gens. C'est ce qui coûte le plus cher et ce qui vaut le plus. »"
      ],
      effets:{xp:18, suspicion:-8},
      fin:true
    }
  }
},

/* ══════════════════════════════ CONTRAT ══════════════════════════════ */
{
  id:"EW_DEUX_MAITRES", titre:"Deux mains, un seul contrat", famille:"CONTRAT", rarete:"rare",
  image:"evt_deux_maitres", scenes:{
    start:{
      pnj:"dame_sarre",
      texte:[
        "Dame Sarre de Vauclair reçoit dans une pièce sans fenêtre, ce qui est déjà une information. Le contrat est simple : retrouver un intendant en fuite et le ramener vivant.",
        "Deux heures plus tard, dans une arrière-cour, un second commanditaire propose à Yohan exactement le même contrat — au détail près que celui-là veut l'intendant **mort**, et paie le double.",
        "Les deux savent que Yohan a parlé à l'autre. Aucun des deux n'a l'air inquiet, ce qui veut dire que l'un des deux ment sur son identité."
      ],
      choix:[
        {label:"Démêler qui commande vraiment", detail:"Jet de Précision (13)",
         test:{stat:"precision", dc:13}, reussite:"demele_ok", echec:"demele_ko"},
        {label:"Prendre les deux avances et disparaître", detail:"+200 or · une réputation ne se répare pas",
         suite:"double", effets:{or:200, suspicion:12, flag:"parjure_vauclair"}},
        {label:"Aller chercher l'intendant et le laisser choisir", detail:"Jet de Volonté (12) · personne n'aime cette option",
         test:{stat:"vol", dc:12}, reussite:"intendant_ok", echec:"intendant_ko"},
      ]
    },
    double:{
      texte:[
        "Yohan encaisse les deux avances le même jour, à deux heures d'intervalle, et quitte Vauclair par la route de l'est avant le couvre-feu.",
        "Deux cents pièces, c'est trois mois de tranquillité. C'est aussi une maison entière qui saura, d'ici la fin de la semaine, qu'un homme seul l'a prise pour une bourse ouverte.",
        "Les maisons ne poursuivent pas les parjures : elles les inscrivent quelque part, et attendent que le hasard les remette sur leur route."
      ],
      fin:true
    },
    demele_ok:{
      pnj:"dame_sarre",
      texte:[
        "Yohan compare deux choses que personne ne compare : la cire des deux sceaux. Même fournisseur, même teinte, même défaut de moule.",
        "Les deux commanditaires sont la même maison. Vauclair veut l'intendant mort sans que Vauclair ait commandé sa mort — et cherche un exécutant assez naïf pour offrir un coupable tout trouvé.",
        "Yohan retourne voir Dame Sarre et pose la question à voix haute. Elle ne nie pas ; elle rit, ce qui est pire. « Vous étiez censé prendre le double paiement et vous pendre avec. »"
      ],
      choix:[
        {label:"Négocier le vrai prix de son silence", detail:"Jet de Précision (12)",
         test:{stat:"precision", dc:12}, reussite:"silence_ok", echec:"silence_ko"},
        {label:"Refuser les deux et sortir", detail:"Rien gagné, rien dû",
         suite:"sortie_propre", effets:{xp:22}},
      ]
    },
    silence_ok:{
      texte:[
        "Yohan explique calmement combien vaut une maison qui a tenté de faire assassiner son propre intendant en piégeant un tiers, et combien il en coûterait que la chose se sache dans trois cours différentes.",
        "Dame Sarre paie. Elle paie beaucoup, et elle paie en le regardant droit dans les yeux, ce qui est sa manière de dire qu'elle n'oubliera pas."
      ],
      effets:{or:340, xp:26, suspicion:6, flag:"vauclair_rancune"},
      fin:true
    },
    silence_ko:{
      texte:[
        "Yohan demande trop, trop vite. Dame Sarre cesse de sourire et rappelle, sans hausser la voix, que cette pièce n'a pas de fenêtre et qu'elle a deux hommes derrière la porte.",
        "Il sort avec ce qu'on lui laisse emporter : rien, et la certitude d'avoir fait une ennemie utile."
      ],
      effets:{suspicion:8, flag:"vauclair_rancune"},
      fin:true
    },
    sortie_propre:{
      texte:[
        "Yohan décline les deux contrats et quitte Vauclair le jour même. Il n'a pas gagné une pièce.",
        "Il n'est pas non plus l'homme qu'on retrouvera pendu à côté du corps d'un intendant, ce qui, cette semaine, était l'issue la plus probable."
      ],
      fin:true
    },
    demele_ko:{
      texte:[
        "Yohan cherche la faille et ne la trouve pas. Les deux histoires tiennent, les deux bourses sont pleines, les deux hommes ont l'air pressés.",
        "Il finit par choisir au jugé, ce qui est une autre façon de dire qu'il a choisi au hasard — et dans ce genre d'affaire, le hasard travaille toujours pour celui qui a monté le piège."
      ],
      effets:{or:60, suspicion:7, flag:"vauclair_rancune"},
      fin:true
    },
    intendant_ok:{
      pnj:"perrin",
      texte:[
        "Yohan retrouve l'intendant avant tout le monde, dans un grenier à sel, avec trois jours de barbe et un couteau de cuisine qu'il tient à l'envers.",
        "Il lui expose la situation sans rien arranger : une maison le veut vivant pour le faire parler, la même maison le veut mort pour qu'il se taise, et Yohan est payé dans les deux sens.",
        "L'homme écoute jusqu'au bout. Puis il sort de sa chemise un carnet de comptes et le pose entre eux deux. « Alors emmenez ça, et pas moi. Moi je vaux une bourse. Ça, ça vaut la maison entière. »"
      ],
      effets:{or:150, xp:30, sang:3, flag:"carnet_vauclair"},
      fin:true
    },
    intendant_ko:{
      texte:[
        "Yohan arrive au grenier à sel une heure après les autres. La porte est ouverte, le grenier vide, et il n'y a même pas de sang — ce qui, dans ce métier, est le pire des signes.",
        "Aucun des deux commanditaires ne le paiera. Les deux savent maintenant qu'il a cherché à comprendre au lieu d'obéir, ce qui est le vrai motif de renvoi."
      ],
      effets:{suspicion:5},
      fin:true
    }
  }
},

/* ══════════════════════════════ POLITIQUE ══════════════════════════════ */
{
  id:"EW_BANNIERES", titre:"Les bannières qu'on n'a plus le droit de coudre", famille:"POLITIQUE", rarete:"rare",
  image:"evt_bannieres", scenes:{
    start:{
      pnj:"capitaine_ferre",
      texte:[
        "La colonne est passée à l'aube, en ordre, sans bannière — ce qui est déjà curieux pour deux cents hommes en armes. Yohan les rattrape à midi, arrêtés dans un pli de terrain, en train de faire précisément ce pour quoi on est pendu à Astrah : coudre.",
        "Sur la toile, le double aigle de l'ancien Empire. Interdit depuis la guerre civile, brûlé partout, et là, refait au fil neuf par une trentaine de mains appliquées.",
        "Le capitaine Ferré remarque Yohan sans se presser. « Vous avez deux options, voyageur. Vous en avez peut-être trois si vous êtes intéressant. »"
      ],
      choix:[
        {label:"Se déclarer intéressé", detail:"Jet de Précision (12) · jouer le mercenaire opportuniste",
         test:{stat:"precision", dc:12}, reussite:"interesse_ok", echec:"interesse_ko"},
        {label:"Rappeler ce que fait Astrah aux Parias", detail:"Jet de Volonté (14) · miser sur l'ennemi commun",
         test:{stat:"vol", dc:14}, reussite:"paria_ok", echec:"paria_ko"},
        {label:"Reculer avant qu'on décide pour lui", detail:"Deux cents hommes · aucune option n'est bonne",
         suite:"recule"},
      ]
    },
    interesse_ok:{
      pnj:"capitaine_ferre",
      texte:[
        "Yohan demande combien on paie et à quelle date, ce qui est exactement ce qu'un homme sans convictions demanderait. Ferré se détend d'un cran.",
        "Ils marchent vers le sud rejoindre une force plus grande. Ils attendent quelqu'un — un prétendant qu'on ne nomme pas, mais que Ferré appelle deux fois « le tacticien » avant de se reprendre.",
        "« Restez trois jours avec nous et vous verrez ce qui se lève. Partez maintenant et vous n'aurez rien vu. » On lui donne une avance sans discuter : c'est de l'or de guerre, il y en a trop."
      ],
      effets:{or:180, xp:24, flag:"lucius_pressenti"},
      fin:true
    },
    interesse_ko:{
      texte:[
        "Yohan pose une question de trop sur le commandement, et deux cents hommes qui cousent des bannières interdites n'ont pas de patience pour les curieux.",
        "Ferré ne donne même pas d'ordre. Il fait un geste, et l'avant-garde s'écarte pour laisser passer ceux dont c'est le travail."
      ],
      combat:{ groupe:[{bst:"BST_001",n:2},{bst:"BST_002",n:1}], victoire:"interesse_ko_apres", defaite:"interesse_ko_apres" }
    },
    interesse_ko_apres:{
      texte:[
        "Yohan décroche et gagne l'arbre le plus proche avant que la colonne entière ne se mette en mouvement. On ne le poursuit pas longtemps : une troupe qui se cache ne court pas après un homme seul.",
        "Il sait au moins une chose que la couronne ignore encore — quelqu'un lève une armée sous les couleurs de l'ancien Empire."
      ],
      effets:{suspicion:8, xp:12, flag:"bannieres_vues"},
      fin:true
    },
    paria_ok:{
      pnj:"capitaine_ferre",
      texte:[
        "Yohan parle d'Astrah. De la Purge. De ce que la couronne fait encore à ceux qui portent un certain sang. Il ne dit pas qu'il en est ; il n'a pas besoin de le dire pour que ce soit entendu.",
        "Ferré l'écoute jusqu'au bout, puis dit une chose que Yohan n'attendait pas : « Vous croyez qu'on lève ça pour vous venger ? On lève ça pour remettre de l'ordre. Et l'ordre, chez nous, ça n'a jamais été bon pour les vôtres. »",
        "Il fait néanmoins signe qu'on le laisse passer. « Partez vite. Et si un jour vous entendez le nom de Lucius, courez dans l'autre sens. »"
      ],
      effets:{xp:28, sang:4, suspicion:6, flag:"averti_lucius"},
      fin:true
    },
    paria_ko:{
      texte:[
        "Yohan en dit trop, et ce qui devait créer une complicité crée exactement le contraire : deux cents hommes viennent d'apprendre qu'un Paria connaît leur secret.",
        "Ferré ne le fait pas tuer — il a trop à faire. Mais il envoie un cavalier vers le sud le soir même, et ce cavalier porte une description."
      ],
      effets:{suspicion:18},
      fin:true
    },
    recule:{
      texte:[
        "Yohan s'efface derrière la crête avant qu'on ait fini de décider ce qu'on faisait de lui. Il fait un détour de deux jours, ce qui coûte, et n'apprend rien de plus, ce qui coûte aussi.",
        "Mais il a vu le double aigle recousu au fil neuf. Ça suffit à savoir que Vardhen s'apprête à recommencer quelque chose."
      ],
      effets:{xp:8, flag:"bannieres_vues"},
      fin:true
    }
  }
},

/* ══════════════════════════════ KHESH ══════════════════════════════ */
{
  id:"EW_TROIS_LANCES", titre:"Le prix des trois lances", famille:"KHESH", rarete:"inhabituel",
  image:"evt_lances", scenes:{
    start:{
      pnj:"aza_khesh",
      texte:[
        "Aza-Rhun plante trois lances dans le sable devant Yohan, à un pas d'intervalle, et s'écarte. Autour, la tribu s'est assise. Ce n'est pas une menace : c'est une procédure.",
        "« Un étranger qui traverse nos dunes doit trois choses. Une preuve de force, une preuve de parole, une preuve de sang. » Elle désigne les lances l'une après l'autre. « Tu choisis laquelle tu donnes. Une seule. Les deux autres, on te les fera payer autrement. »",
        "Personne n'a la main sur une arme. C'est ce qui rend la chose sérieuse."
      ],
      choix:[
        {label:"La force : affronter leur champion", detail:"Un combat en règle, devant témoins",
         suite:"force"},
        {label:"La parole : répondre de ce qu'il est", detail:"Jet de Volonté (13) · les Khesh détestent l'esquive",
         test:{stat:"vol", dc:13}, reussite:"parole_ok", echec:"parole_ko"},
        {label:"Le sang : montrer l'Onde", detail:"Requiert un pouvoir · irréversible dans cette tribu",
         requis:{pouvoir:"poussee"}, suite:"sang"},
      ]
    },
    force:{
      texte:[
        "Yohan retire la première lance et la plante à ses propres pieds. Le cercle se resserre d'un pas, satisfait — c'est la réponse qu'ils espéraient tous.",
        "Le champion qui se lève ne fanfaronne pas. Il vérifie ses sangles, salue, et attend que le sable soit lissé."
      ],
      combat:{ groupe:[{bst:"BST_030", n:1}], victoire:"force_ok", defaite:"force_ko" }
    },
    force_ok:{
      pnj:"aza_khesh",
      texte:[
        "Le champion tombe et se relève seul, ce qui compte davantage ici que la victoire elle-même. Aza-Rhun arrache les deux lances restantes et les jette au feu.",
        "« La force, c'était la plus facile à donner et la plus chère à recevoir. Tu passes. » Elle lui tend une lanière de cuir tressé. « Montre ça aux autres campements. Ça ne te protégera pas de tout — seulement des malentendus. »"
      ],
      effets:{xp:30, sang:4, item:"accessoire_gants", flag:"khesh_reconnu"},
      fin:true
    },
    force_ko:{
      texte:[
        "Yohan perd, proprement, devant deux cents témoins. Personne ne rit — c'est aussi une preuve, simplement pas celle qu'il espérait donner.",
        "Aza-Rhun laisse les trois lances plantées dans le sable. « Reviens quand elles voudront dire quelque chose. »"
      ],
      effets:{xp:8},
      fin:true
    },
    parole_ok:{
      pnj:"aza_khesh",
      texte:[
        "Yohan ne se raconte pas. Il dit ce qu'il est venu faire, ce qu'il fuit, et ce qu'il ne dira pas — cette dernière partie à voix aussi claire que le reste.",
        "C'est ce refus explicite qui emporte l'affaire. « Un homme qui annonce ce qu'il cache ment moins qu'un homme qui prétend tout dire », tranche Aza-Rhun.",
        "Elle retire la deuxième lance elle-même. « Passe. Mais tu nous dois encore la force et le sang. Les Khesh n'oublient pas les dettes, ils les reportent. »"
      ],
      effets:{xp:26, sang:3, flag:"khesh_dette"},
      fin:true
    },
    parole_ko:{
      texte:[
        "Yohan choisit ses mots trop bien, et c'est précisément ce qu'on lui reproche. Aza-Rhun lève la main avant la fin. « Tu parles comme un homme d'Astrah. Ici, c'est une insulte. »",
        "On ne le chasse pas. On lui retire simplement l'eau, la conversation et l'ombre, ce qui revient au même dans les dunes."
      ],
      effets:{fat:12, pv:-5},
      fin:true
    },
    sang:{
      pnj:"aza_khesh",
      texte:[
        "Yohan arrache la troisième lance et laisse l'Onde la traverser. Le bois ne brûle pas : il vibre, et le sable autour se met à courir en cercles concentriques.",
        "Le cercle entier se lève d'un bloc. Pas de panique, pas de fuite — quelque chose de bien plus dérangeant : ils s'agenouillent, tous, sauf Aza-Rhun qui reste debout et le regarde comme on regarde un problème.",
        "« Voilà. Maintenant deux cents personnes savent, et deux cents personnes parleront. » Elle reprend la lance vibrante. « Tu as donné la preuve que je te déconseillais. Tu es le bienvenu chez les Khesh, Paria. Tu ne l'es plus nulle part ailleurs. »"
      ],
      effets:{fat:22, sang:10, xp:34, suspicion:20, flag:"khesh_allie"},
      fin:true
    }
  }
},

/* ══════════════════════════════ NAIN ══════════════════════════════ */
{
  id:"EW_GALERIE", titre:"La galerie qu'on a murée deux fois", famille:"NAIN", rarete:"inhabituel",
  image:"evt_galerie", scenes:{
    start:{
      pnj:"gorm",
      texte:[
        "Gorm fils de Gorik tient une lanterne devant un mur qui n'a rien à faire là. Deux appareillages différents, à deux siècles d'écart : on a muré cette galerie, puis on l'a rouverte, puis on l'a murée de nouveau.",
        "« Le premier mur, c'est mes ancêtres. Le deuxième, c'est mon père. Et mon père ne m'a jamais dit pourquoi. »",
        "Derrière la pierre, à intervalles irréguliers, quelque chose frappe. Pas fort. Patiemment."
      ],
      choix:[
        {label:"Ouvrir", detail:"Ce qui est derrière est derrière depuis longtemps",
         suite:"ouvre"},
        {label:"Lire les appareillages avant de décider", detail:"Jet de Précision (12)",
         test:{stat:"precision", dc:12}, reussite:"lit_ok", echec:"lit_ko"},
        {label:"Convaincre Gorm de laisser le mur tranquille", detail:"Jet de Volonté (11)",
         test:{stat:"vol", dc:11}, reussite:"laisse_ok", echec:"ouvre"},
      ]
    },
    lit_ok:{
      pnj:"gorm",
      texte:[
        "Yohan approche la lanterne. Le premier mur est un mur de défense : pierres croisées, mortier épais, fait pour tenir contre une poussée. Le second est un mur de scellement — plus fin, plus soigné, avec des marques de forge gravées tous les trois rangs.",
        "« Votre père n'a pas muré une menace », dit Yohan. « Il a scellé une tombe. »",
        "Gorm se tait très longtemps. Puis il pose sa masse contre la paroi. « Alors les coups, c'est quoi ? » Personne n'a de réponse à ça."
      ],
      choix:[
        {label:"Ouvrir malgré tout, en sachant", detail:"Ce qui frappe a un nom, désormais",
         suite:"ouvre"},
        {label:"Aider Gorm à renforcer le scellement", detail:"+Fatigue · une journée de travail honnête",
         suite:"scelle", effets:{fat:10, xp:24, or:90, flag:"gorm_ami"}},
      ]
    },
    lit_ko:{
      texte:[
        "Yohan examine la pierre et n'y voit qu'une pierre. Les marques de forge lui échappent, et la logique des deux appareillages avec.",
        "Gorm décide donc seul, comme il l'aurait fait de toute façon. Il crache dans ses mains et empoigne la masse."
      ],
      choix:[ {label:"Reculer et le laisser frapper", suite:"ouvre"} ]
    },
    laisse_ok:{
      pnj:"gorm",
      texte:[
        "« Votre père a passé sa vie sous cette montagne », dit Yohan. « Il a muré ça une deuxième fois en sachant qu'il ne vous expliquerait jamais. Il faut vraiment vouloir vous protéger pour accepter de passer pour un lâche auprès de son fils. »",
        "Gorm repose la masse. Ça lui coûte visiblement plus que de frapper.",
        "« Bon. » Il crache par terre. « Alors on renforce. » Ils travaillent jusqu'à la nuit, et la chose derrière frappe encore trois fois, puis plus du tout."
      ],
      effets:{xp:26, or:120, sang:2, flag:"gorm_ami"},
      fin:true
    },
    scelle:{
      texte:[
        "Ils ne rouvrent pas. Ils doublent le scellement, avec les marques de forge remises dans le bon ordre, parce que Gorm sait les tracer même s'il ignore ce qu'elles retiennent.",
        "En repartant, Gorm glisse une bourse à Yohan sans commentaire. Chez les nains, remercier avec des mots serait une façon de dire que le travail n'avait pas de valeur."
      ],
      fin:true
    },
    ouvre:{
      texte:[
        "La masse tombe trois fois. Au troisième coup, le mur cède vers l'intérieur — vers l'intérieur, ce qui veut dire que quelque chose tirait.",
        "L'air qui sort de la galerie est plus froid que la pierre et sent le fer rouillé. Gorm lève sa lanterne, et la lumière ne va pas aussi loin qu'elle le devrait."
      ],
      combat:{ groupe:[{bst:"BST_023", n:1},{bst:"BST_017", n:2}], victoire:"ouvre_ok", defaite:"ouvre_ko" }
    },
    ouvre_ok:{
      pnj:"gorm",
      texte:[
        "Quand c'est fini, Gorm reste assis dans les gravats à regarder le trou noir devant lui. « Voilà pourquoi. »",
        "Ils remurent la galerie le soir même, à trois rangs de plus que son père. Gorm ne dit rien de toute la soirée, sauf une fois, très bas : « J'aurais dû lui faire confiance. »",
        "Il paie Yohan au double du tarif d'un homme de main, et lui fait promettre de ne raconter ça dans aucune taverne de Kar-Durak."
      ],
      effets:{xp:34, or:200, sang:3, item:"armure_cuir", flag:"galerie_rouverte"},
      fin:true
    },
    ouvre_ko:{
      texte:[
        "Ils reculent en désordre jusqu'au coude de la galerie, et c'est l'effondrement du plafond — provoqué par Gorm, à la masse, sur ses propres étais — qui referme le passage.",
        "Gorm a une jambe brisée et l'air de quelqu'un qui vient de comprendre son père trente ans trop tard. « Troisième mur », souffle-t-il. « Et celui-là, je n'expliquerai à personne. »"
      ],
      effets:{suspicion:3, sang:1},
      fin:true
    }
  }
},

/* ══════════════════════════════ GUERRE ══════════════════════════════ */
{
  id:"EW_CHAPELLE", titre:"La chapelle qu'on n'ouvre pas", famille:"GUERRE", rarete:"inhabituel",
  image:"evt_chapelle", lieux:["LOC_018","LOC_012","LOC_003"],
  scenes:{
    start:{
      pnj:"soeur_lisen",
      texte:[
        "Le village a perdu six personnes en deux mois, toutes de nuit, toutes à moins de cent pas de la chapelle. La porte de celle-ci est fermée par une poutre posée en travers, à l'extérieur.",
        "Sœur Lisen garde cette porte depuis six semaines. Elle a une lampe, un tabouret, et le teint de quelqu'un qui ne dort plus.",
        "« Je n'ai pas peur de ce qu'il y a dedans », dit-elle quand Yohan s'approche. « J'ai peur qu'on m'oblige à ouvrir pour vérifier. »"
      ],
      choix:[
        {label:"Ouvrir et entrer, lampe en main", detail:"Direct · ce qui est dedans est dedans depuis six semaines",
         suite:"entre"},
        {label:"Faire le tour et chercher une autre entrée", detail:"Jet de Précision (12)",
         test:{stat:"precision", dc:12}, reussite:"tour_ok", echec:"entre"},
        {label:"Interroger Sœur Lisen sur les six morts", detail:"Jet de Précision (11) · six victimes, un point commun",
         test:{stat:"precision", dc:11}, reussite:"interroge_ok", echec:"interroge_ko"},
      ]
    },
    interroge_ok:{
      pnj:"soeur_lisen",
      texte:[
        "Yohan demande non pas comment ils sont morts, mais ce qu'ils faisaient dehors. La réponse met une heure à venir, parce qu'il faut que Lisen se souvienne de six vies plutôt que de six corps.",
        "Tous les six revenaient de la carrière. Tous les six passaient au même endroit. Et aucun des six n'est mort *dans* la chapelle — ils sont morts autour.",
        "« Alors ce n'est pas la chapelle », dit Lisen, et elle a l'air d'avoir vingt ans de moins d'un coup. « On garde la mauvaise porte depuis six semaines. »"
      ],
      choix:[
        {label:"Aller à la carrière avant la nuit", detail:"Le vrai problème est là-bas",
         suite:"carriere"},
      ]
    },
    interroge_ko:{
      pnj:"soeur_lisen",
      texte:[
        "Yohan pose ses questions, et Sœur Lisen répond à côté de chacune. Elle ne ment pas : elle est épuisée au point de ne plus distinguer ce qu'elle a vu de ce qu'on lui a raconté.",
        "Au bout d'une heure, il n'a que six noms, six dates, et la certitude d'avoir fatigué une femme qui n'avait plus rien à donner.",
        "La nuit tombe. La question de la porte, elle, reste entière."
      ],
      choix:[
        {label:"Ouvrir la porte", detail:"Il ne reste pas d'autre piste", suite:"entre"},
        {label:"Monter la garde avec elle jusqu'à l'aube", detail:"+Fatigue · personne ne meurt cette nuit-là",
         suite:"veille", effets:{fat:12, xp:12, sang:1}},
      ]
    },
    veille:{
      texte:[
        "Ils passent la nuit à deux devant la porte, sans parler. Rien ne vient. Au matin, le village compte encore tous ses vivants, ce qui n'était pas arrivé depuis trois semaines.",
        "Ce n'est pas résolu. C'est seulement reporté, et Sœur Lisen a dormi trois heures sur son tabouret, la tête contre le montant."
      ],
      fin:true
    },
    carriere:{
      texte:[
        "La carrière est une entaille dans le flanc de la colline, avec une eau noire au fond et des galeries d'extraction que personne n'a rebouchées quand le chantier a fermé.",
        "Ce qui vit là-dedans n'a pas choisi la chapelle : il a choisi le chemin le plus fréquenté à la tombée du jour. C'est un prédateur, pas une malédiction — et un prédateur, ça se chasse."
      ],
      combat:{ groupe:[{bst:"BST_036", n:1},{bst:"BST_032", n:2}], victoire:"carriere_ok", defaite:"carriere_ko" }
    },
    carriere_ok:{
      pnj:"soeur_lisen",
      texte:[
        "Yohan redescend au village avant l'aube. Il n'a rien de spectaculaire à montrer, seulement à dire où c'était et que c'est fini.",
        "Sœur Lisen retire la poutre de la porte de la chapelle elle-même, devant tout le monde, et entre la première. Il n'y a rien dedans que de la poussière et des bancs.",
        "Le village paie ce qu'il peut, c'est-à-dire peu, et le donne comme on donne beaucoup."
      ],
      effets:{or:110, xp:32, sang:3, suspicion:2, flag:"chapelle_resolue"},
      fin:true
    },
    carriere_ko:{
      texte:[
        "Yohan ressort de la carrière en s'appuyant à la paroi, et il ressort seul, ce qui est déjà mieux que ce qu'ont fait les six autres.",
        "Il sait au moins où c'est. Le village saura quel chemin ne plus prendre. Ce n'est pas une victoire, c'est trois vies gagnées sur les prochaines semaines."
      ],
      effets:{xp:12, sang:1},
      fin:true
    },
    tour_ok:{
      texte:[
        "Yohan fait le tour et trouve ce que six semaines de garde devant la porte n'avaient pas trouvé : une descente de cave, à l'arrière, dont la trappe a été forcée **de l'extérieur**.",
        "Ce qui entrait dans la chapelle n'y était pas enfermé. Il y entrait et en ressortait à sa guise depuis le début."
      ],
      choix:[ {label:"Descendre par la cave", detail:"Entrer par où ça entrait", suite:"entre"} ]
    },
    entre:{
      texte:[
        "La poutre glisse. La porte s'ouvre sur une odeur qui n'est pas celle d'une chapelle abandonnée.",
        "La lampe de Yohan éclaire les premiers bancs, puis quelque chose au fond qui se redresse sans se presser, parce que ça a l'habitude qu'on vienne à lui."
      ],
      combat:{ groupe:[{bst:"BST_023", n:1},{bst:"BST_031", n:1}], victoire:"entre_ok", defaite:"entre_ko" }
    },
    entre_ok:{
      pnj:"soeur_lisen",
      texte:[
        "Yohan ressort au petit matin, et Sœur Lisen est toujours sur son tabouret — elle n'a pas bougé de la nuit, la lampe éteinte depuis des heures.",
        "« C'est fini ? » Yohan hoche la tête. Elle ne demande pas ce que c'était, et il ne le lui dit pas. Ils restent là ensemble jusqu'au jour."
      ],
      effets:{or:90, xp:28, sang:2, flag:"chapelle_resolue"},
      fin:true
    },
    entre_ko:{
      texte:[
        "Yohan gagne la porte à reculons et remet la poutre en travers de ses propres mains, ce qui est l'aveu le plus humiliant de sa semaine.",
        "Sœur Lisen ne dit rien. Elle se rassoit sur son tabouret et rallume sa lampe.",
        "« Vous reviendrez ? » Yohan ne répond pas tout de suite. « Oui. » C'est peut-être vrai."
      ],
      effets:{xp:10},
      fin:true
    }
  }
},

/* ══════════════════════════════ VOYAGE / RENCONTRE ══════════════════════════════ */
{
  id:"EW_ORPAILLEUR", titre:"Ce que l'orpailleur a remonté", famille:"VOYAGE", rarete:"inhabituel",
  image:"evt_orpailleur", lieux:["LOC_018","LOC_011","LOC_001"],
  scenes:{
    start:{
      pnj:"vieil_orpailleur",
      texte:[
        "Hesken lave du gravier dans un ruisseau qui traverse les Champs de Cendre, ce qui est soit du courage, soit une forme lente de suicide. Trente ans qu'il remonte des choses de cette eau.",
        "Aujourd'hui, il a remonté un anneau. Il l'a posé sur une pierre plate et il ne le touche plus.",
        "« Il chauffe », dit-il sans lever la tête. « Depuis ce matin. Un anneau, ça chauffe pas. »"
      ],
      choix:[
        {label:"Le prendre en main", detail:"Requiert un pouvoir de l'Onde · l'anneau réagit à quelque chose",
         requis:{pouvoir:"drain"}, suite:"prend"},
        {label:"L'acheter honnêtement", detail:"−100 or · Hesken sera soulagé de s'en débarrasser",
         requis:{or:100}, suite:"achete", effets:{or:-100, item:"accessoire_anneau", xp:12}},
        {label:"Lui conseiller de le rejeter à l'eau", detail:"Jet de Volonté (11)",
         test:{stat:"vol", dc:11}, reussite:"rejette_ok", echec:"rejette_ko"},
      ]
    },
    prend:{
      texte:[
        "Yohan referme la main dessus. L'anneau est brûlant, puis tiède, puis exactement à la température de sa peau — comme s'il s'était souvenu de quelque chose.",
        "À l'intérieur du jonc, usée mais lisible, une gravure : un loup assis. Pas le loup héraldique des bannières : celui, plus ancien, des sceaux privés de la maison.",
        "Cet anneau a été porté par un Karlsberg. Il est resté trente ans sous un ruisseau des Champs de Cendre à attendre qu'un porteur du sang le remonte."
      ],
      effets:{item:"accessoire_anneau", sang:12, xp:30, fat:8, flag:"anneau_karlsberg"},
      choix:[
        {label:"Payer Hesken bien au-delà de sa valeur", detail:"−150 or · il ne saura jamais ce qu'il a trouvé",
         suite:"prend_paie", requis:{or:150}, effets:{or:-150, sang:2}},
        {label:"L'emporter sans explication", detail:"Hesken ne demandera pas",
         suite:"prend_part"},
      ]
    },
    prend_paie:{
      texte:[
        "Yohan compte cent cinquante pièces dans la main de l'orpailleur, ce qui représente environ quatre ans de gravier lavé.",
        "Hesken regarde l'or, puis Yohan, puis l'or. « C'était quoi, alors ? » — « Un anneau », répond Yohan. Hesken hoche la tête, et range l'argent. Il a trente ans d'expérience de ce qu'il ne faut pas demander."
      ],
      fin:true
    },
    prend_part:{
      texte:[
        "Yohan glisse l'anneau à son doigt et reprend la route. Hesken retourne à son gravier sans un mot.",
        "Il racontera peut-être, un jour, qu'un homme est venu prendre l'anneau qui chauffait. Personne ne le croira, et c'est très bien ainsi."
      ],
      fin:true
    },
    achete:{
      texte:[
        "Cent pièces changent de main, et Hesken a l'air d'un homme à qui on retire un poids plutôt qu'à qui on achète un bien.",
        "L'anneau ne chauffe plus une fois dans la bourse de Yohan. Il y a, gravé à l'intérieur du jonc, un loup assis que Yohan ne regarde pas tout de suite — et qu'il regardera longtemps, plus tard, à la lumière d'un feu."
      ],
      effets:{flag:"anneau_karlsberg", sang:6},
      fin:true
    },
    rejette_ok:{
      pnj:"vieil_orpailleur",
      texte:[
        "« Trente ans que vous lavez ce gravier », dit Yohan. « Vous avez remonté combien de choses qui chauffaient ? » — « Aucune. » — « Alors remettez-la où vous l'avez prise. »",
        "Hesken le fait, sans discuter, avec le soulagement immédiat des gens à qui on donne enfin la permission d'avoir peur.",
        "Yohan repart en sachant qu'il vient peut-être de laisser passer quelque chose. Il repart aussi en sachant qu'un vieil homme dormira cette nuit."
      ],
      effets:{xp:14, sang:1},
      fin:true
    },
    rejette_ko:{
      texte:[
        "Hesken écoute le conseil, réfléchit, et fait exactement le contraire : il empoche l'anneau. Trente ans de ruisseau lui ont appris qu'on ne rejette pas ce qui a de la valeur parce qu'un étranger a un mauvais pressentiment.",
        "Yohan reprend la route. Derrière lui, un vieil homme porte à son doigt un anneau qui chauffe."
      ],
      effets:{suspicion:2},
      fin:true
    }
  }
},

];
