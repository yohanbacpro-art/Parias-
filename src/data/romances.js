/* PARIAS — Attachements
 *
 * Des arcs relationnels, pas une jauge à remplir. Chaque étape se débloque à une
 * AFFINITÉ, gagnée uniquement par des choix — jamais par le temps qui passe.
 *
 * Ils se déclenchent en fin de tour, après les jalons de trame : ce sont les
 * moments calmes entre deux missions, pas des rencontres qu'on va chercher.
 *
 * Règles que le contenu respecte :
 *   — tout le monde est adulte, et le dit ;
 *   — un refus est toujours proposé, toujours sans pénalité cachée ;
 *   — la scène s'arrête à la porte : ce qui suit ne regarde pas le lecteur ;
 *   — un attachement change quelque chose (bonus de compagnon, marqueur d'histoire),
 *     sinon ce n'est qu'un décor.
 *
 * Effet particulier : effets:{ affinite:{ qui:"alycia", n:2 } }
 */

const AFFINITES_DEPART = { alycia:0, alarielle:0, eleonore:0 };

const EVENTS_ROMANCE = [

/* ══════════════════ ALYCIA — la manipulatrice qui ne ment pas sur l'essentiel ══════════════════ */
{
  id:"RO_ALYCIA_1", titre:"Ce qu'on ne dit qu'à quelqu'un qui sait", famille:"PARIA", rarete:"rare",
  image:"ro_alycia_1",
  requis:{ compagnon:"alycia", chapitreMin:1, sansFlags:["ro_alycia_1_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Le feu est bas et Alycia n'a pas dormi. Yohan le sait parce qu'il n'a pas dormi non plus, et qu'il l'a entendue ne pas dormir.",
        "« Tu fais la même chose que moi », dit-elle sans préambule. « Tu comptes les sorties d'une pièce avant de t'y asseoir. Tu ne dors jamais dos à une porte. Tu ne dis jamais ton nom en premier. »",
        "Elle tourne enfin la tête vers lui. « Il n'y a personne d'autre à qui je peux faire remarquer ça. C'est plus intime que tout ce que je pourrais te dire. »"
      ],
      choix:[
        {label:"Reconnaître qu'il fait la même chose", detail:"Il n'y a pas grand-chose à perdre à l'admettre",
         suite:"reconnait", effets:{affinite:{qui:"alycia", n:2}, xp:16}},
        {label:"Lui demander ce qu'elle fait quand elle est seule", detail:"Jet de Précision (12) · la question qu'on ne pose pas",
         test:{stat:"precision", dc:12}, reussite:"seule_ok", echec:"seule_ko"},
        {label:"Changer de sujet", detail:"Certaines portes se referment sans bruit",
         suite:"detourne", effets:{flag:"ro_alycia_1_fait"}},
      ]
    },
    reconnait:{
      pnj:"alycia",
      texte:[
        "« Trois sorties », dit Yohan. « La porte, la fenêtre du fond, et le mur nord si tu as le temps de le passer. J'ai regardé en entrant. »",
        "Alycia rit — pas son rire de cour, l'autre, celui qui la rend nettement moins impressionnante et beaucoup plus difficile à ignorer.",
        "« Voilà », dit-elle. « C'est exactement ça, la solitude. Ce n'est pas d'être seul. C'est de compter les sorties devant des gens qui ne comprennent pas ce que tu fais. »"
      ],
      effets:{flag:"ro_alycia_1_fait"},
      fin:true
    },
    seule_ok:{
      pnj:"alycia",
      texte:[
        "« Qu'est-ce que tu fais quand il n'y a personne à manipuler ? »",
        "La question la fige. C'est la première fois que Yohan la voit chercher une réponse au lieu de la choisir.",
        "« Je relis la liste », dit-elle enfin. « Trente-et-un noms. Je la relis tous les soirs pour vérifier que je n'en ai pas oublié un. » Elle hausse les épaules. « Voilà. C'est tout. C'est très ennuyeux et c'est complètement vrai. »"
      ],
      effets:{affinite:{qui:"alycia", n:3}, xp:26, sang:3, flag:"ro_alycia_1_fait"},
      fin:true
    },
    seule_ko:{
      pnj:"alycia",
      texte:[
        "La question sort de travers — trop directe, avec ce fond de reproche que Yohan n'avait pas voulu y mettre.",
        "Alycia se referme immédiatement, et redevient en une seconde la femme parfaitement maîtrisée du premier jour. « Je dors, comme tout le monde. »",
        "Le feu baisse. La conversation ne repartira pas ce soir."
      ],
      effets:{flag:"ro_alycia_1_fait"},
      fin:true
    },
    detourne:{ pnj:"alycia",
      texte:[
        "Yohan parle de la route du lendemain, des vivres, du col à passer avant les neiges.",
        "Alycia le suit sans insister, avec une facilité qui prouve qu'elle a l'habitude qu'on referme des portes devant elle.",
        "Ils dorment chacun de son côté du feu, dos à un mur, comme d'habitude."
      ],
      fin:true
    }
  }
},
{
  id:"RO_ALYCIA_2", titre:"Ce qu'elle demande vraiment", famille:"PARIA", rarete:"rare",
  image:"ro_alycia_2",
  requis:{ compagnon:"alycia", affinite:{qui:"alycia", min:4}, flags:["ro_alycia_1_fait"], sansFlags:["ro_alycia_2_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Elle vient s'asseoir trop près, ce qui chez elle n'est jamais un accident, et elle le sait, et elle sait qu'il le sait.",
        "« Je vais être honnête, ce qui va me coûter. » Elle regarde le feu, pas lui. « J'ai passé quatre ans à te chercher parce que tu m'étais utile. Et depuis quelque temps, je ne sais plus si je reste pour la liste ou pour autre chose. »",
        "« Ça m'embête beaucoup », ajoute-t-elle. « Je ne sais pas travailler avec des choses que je ne contrôle pas. »"
      ],
      choix:[
        {label:"Lui dire que c'est réciproque", detail:"Sans détour · elle mérite au moins ça",
         suite:"reciproque", effets:{affinite:{qui:"alycia", n:3}, xp:24}},
        {label:"Lui rappeler qu'elle manipule tout le monde, y compris elle-même", detail:"Jet de Volonté (14) · dur, et peut-être juste",
         test:{stat:"vol", dc:14}, reussite:"dur_ok", echec:"dur_ko"},
        {label:"Poser une limite claire : la cause d'abord", detail:"Elle respectera · elle n'aimera pas",
         suite:"limite", effets:{xp:20, flags:["ro_alycia_2_fait","alycia_limite"]}},
      ]
    },
    reciproque:{
      pnj:"alycia",
      texte:[
        "« Moi non plus je ne sais pas », dit Yohan. « Et moi non plus ça ne m'arrange pas. »",
        "Alycia le regarde enfin. Il n'y a plus rien de calculé dans ce regard-là, et c'est précisément ce qui le rend difficile à soutenir.",
        "Ils restent longtemps sans rien dire. Quand elle se lève, elle ne va pas de son côté du feu.",
        "Le reste ne regarde personne."
      ],
      effets:{sang:4, flags:["ro_alycia_2_fait","alycia_amants"]},
      fin:true
    },
    dur_ok:{
      pnj:"alycia",
      texte:[
        "« Tu ne sais pas si tu restes pour la liste ou pour moi », dit Yohan. « Ou tu le sais très bien, et tu me le présentes comme un doute parce qu'un doute, ça m'obligera à te rassurer. »",
        "Long silence. Puis, à voix très basse : « ...C'est possible. »",
        "Elle ne se défend pas, ne se rattrape pas, ne retourne pas la situation. C'est la chose la plus désarmée qu'elle ait faite depuis qu'ils voyagent ensemble — et c'est ce qui décide de la suite."
      ],
      effets:{affinite:{qui:"alycia", n:4}, xp:36, sang:5, flags:["ro_alycia_2_fait","alycia_lucide"]},
      fin:true
    },
    dur_ko:{
      pnj:"alycia",
      texte:[
        "Yohan attaque, et il attaque juste assez à côté pour qu'elle puisse s'y engouffrer.",
        "En trois phrases, elle a retourné la conversation, l'a rendu vaguement coupable, et s'est levée avant qu'il ait compris ce qui s'était passé.",
        "« Bonne nuit », dit-elle depuis l'ombre. Elle sourit. C'est le sourire du premier jour."
      ],
      effets:{flag:"ro_alycia_2_fait"},
      fin:true
    },
    limite:{
      pnj:"alycia",
      texte:[
        "« La cause d'abord », dit Yohan. « Tant qu'il reste des noms sur ta liste, il n'y a pas de place pour le reste. »",
        "Alycia hoche la tête lentement. « C'est raisonnable. » Un temps. « Je déteste que ce soit raisonnable. »",
        "Elle retourne de son côté du feu. Rien n'a changé, et tout est un peu différent."
      ],
      fin:true
    }
  }
},
{
  id:"RO_ALYCIA_3", titre:"Trente-et-un noms, et un de plus", famille:"PARIA", rarete:"épique",
  image:"ro_alycia_3",
  requis:{ compagnon:"alycia", flags:["alycia_amants"], sangMin:110, sansFlags:["ro_alycia_3_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Elle a sorti la liste et ne la relit pas : elle la tient, simplement, comme on tient quelque chose de trop lourd pour le poser.",
        "« Trente-trois maintenant. J'en ai retrouvé deux grâce à toi. » Elle replie le rouleau. « Et je viens de comprendre que je ne le fais plus pour eux. »",
        "« Je le fais pour ne pas avoir à m'arrêter. Parce que si je m'arrête, il faut décider de ce qu'on est, et ça me terrifie beaucoup plus qu'un chasseur de primes. »"
      ],
      choix:[
        {label:"Décider avec elle, maintenant", detail:"Un attachement qui se dit à voix haute",
         suite:"decide", effets:{affinite:{qui:"alycia", n:4}, sang:10, xp:50,
           flags:["ro_alycia_3_fait","alycia_engagee"]}},
        {label:"Lui proposer de porter la liste ensemble, sans rien nommer", detail:"Elle a besoin de ne pas choisir",
         suite:"ensemble", effets:{affinite:{qui:"alycia", n:2}, sang:6, xp:40,
           flags:["ro_alycia_3_fait","alycia_liste_partagee"]}},
        {label:"Reconnaître que Karlsberg passera avant elle", detail:"Honnête · elle ne pardonnera pas facilement",
         suite:"karlsberg", effets:{xp:30, flags:["ro_alycia_3_fait","alycia_seconde"]}},
      ]
    },
    decide:{
      pnj:"alycia",
      texte:[
        "Yohan le dit. Pas joliment — il n'a jamais su faire ça — mais complètement, et sans laisser d'issue de secours à aucun des deux.",
        "Alycia écoute jusqu'au bout sans l'interrompre, ce qui ne lui ressemble pas du tout.",
        "« Bon », dit-elle enfin, et sa voix n'est pas tout à fait stable. « Bon. » Elle range la liste dans sa doublure. « Alors il va falloir que tu restes en vie, ce qui est statistiquement idiot. »"
      ],
      effets:{},
      fin:true
    },
    ensemble:{
      pnj:"alycia",
      texte:[
        "« Ne décide rien », dit Yohan. « Donne-moi la moitié des noms. »",
        "Elle le regarde comme s'il venait de proposer quelque chose d'obscène. Puis elle déchire le rouleau en deux, proprement, au milieu, et lui tend la moitié basse.",
        "« Seize. » Elle referme sa main sur la sienne un instant de trop. « Ne les perds pas. »"
      ],
      effets:{},
      fin:true
    },
    karlsberg:{
      pnj:"alycia",
      texte:[
        "« Karlsberg passera avant », dit Yohan. « Toujours. Tu mérites de le savoir maintenant plutôt que de le découvrir un jour où ça comptera. »",
        "Alycia encaisse sans broncher — elle a encaissé bien pire, et elle est très douée pour ça.",
        "« Merci de me le dire », répond-elle, et c'est sincère, et c'est exactement pour ça que c'est difficile à entendre. Elle range la liste. « Je reste quand même. Ne te fais pas d'idées : c'est pour eux. »"
      ],
      effets:{},
      fin:true
    }
  }
},

/* ══════════════════ ALARIELLE — la dette et l'attachement ══════════════════ */
{
  id:"RO_ALARIELLE_1", titre:"Ce que coûte de réparer", famille:"ELFE", rarete:"rare",
  image:"ro_alarielle_1",
  requis:{ compagnon:"alarielle", sansFlags:["ro_alarielle_1_fait","alarielle_renvoyee"] },
  scenes:{
    start:{
      pnj:"alarielle",
      texte:[
        "Alarielle soigne les blessures du groupe chaque soir avec une méthode d'une régularité inhumaine, et Yohan a fini par remarquer qu'elle finit toujours par les siennes — quand il en reste.",
        "« Vous vous soignez en dernier », dit-il. « Toujours. »",
        "« Je répare », répond-elle sans lever les yeux de son bandage. « C'est différent de soigner. On répare ce qu'on a cassé, et on n'a pas droit à la reconnaissance en prime. »"
      ],
      choix:[
        {label:"Lui dire qu'elle n'a rien cassé, elle", detail:"Trois siècles ne sont pas sa faute",
         suite:"innocente", effets:{affinite:{qui:"alarielle", n:3}, xp:22}},
        {label:"La laisser réparer, et se taire", detail:"Elle a le droit à son fardeau",
         suite:"silence", effets:{affinite:{qui:"alarielle", n:1}, xp:14}},
        {label:"Lui demander ce qu'elle voudrait, pour elle", detail:"Jet de Précision (13) · personne ne le lui a jamais demandé",
         test:{stat:"precision", dc:13}, reussite:"veut_ok", echec:"veut_ko"},
      ]
    },
    innocente:{
      pnj:"alarielle",
      texte:[
        "« Vous n'étiez pas née », dit Yohan. « Vous n'avez rien décidé, rien mesuré, rien tu. Vous payez une dette qui n'est pas la vôtre. »",
        "Alarielle finit son bandage avant de répondre, très soigneusement.",
        "« Je sais. » Elle relève enfin les yeux. « Mais si personne ne la paie, alors elle n'a jamais existé — et ce qui est arrivé à votre famille devient un accident. Je refuse que ce soit un accident. »"
      ],
      effets:{flag:"ro_alarielle_1_fait"},
      fin:true
    },
    silence:{
      texte:[
        "Yohan ne dit rien de plus et lui tend son avant-bras quand vient son tour.",
        "Elle travaille en silence, précise, économe de gestes. Au moment de nouer, elle marque une pause d'une seconde de trop.",
        "« Merci de ne pas avoir insisté », dit-elle. C'est la première fois qu'elle le remercie de quelque chose."
      ],
      effets:{flag:"ro_alarielle_1_fait"},
      fin:true
    },
    veut_ok:{
      pnj:"alarielle",
      texte:[
        "« Et vous, qu'est-ce que vous voulez ? Pas votre peuple, pas la dette. Vous. »",
        "Elle ouvre la bouche, la referme, et Yohan comprend avec un temps de retard que personne ne lui a jamais posé cette question — pas une seule fois en trois cents ans de cour.",
        "« Je ne sais pas », dit-elle enfin, et elle a l'air si sincèrement désemparée que c'en est difficile à regarder. « C'est absurde, n'est-ce pas ? Je peux vous citer ce que veulent quatre maisons elfiques et je ne sais pas répondre pour moi. »"
      ],
      effets:{affinite:{qui:"alarielle", n:4}, xp:34, flag:"ro_alarielle_1_fait"},
      fin:true
    },
    veut_ko:{ pnj:"alarielle",
      texte:[
        "La question tombe mal, entre deux bandages, et Alarielle y répond par une formule de cour parfaitement polie qui ne dit rien du tout.",
        "Elle a l'habitude. Elle est même excellente à cet exercice, et c'est bien le problème."
      ],
      effets:{flag:"ro_alarielle_1_fait"},
      fin:true
    }
  }
},
{
  id:"RO_ALARIELLE_2", titre:"Ce qu'elle perdrait", famille:"ELFE", rarete:"épique",
  image:"ro_alarielle_2",
  requis:{ compagnon:"alarielle", affinite:{qui:"alarielle", min:5},
           flags:["ro_alarielle_1_fait"], sansFlags:["ro_alarielle_2_fait","alarielle_renvoyee"] },
  scenes:{
    start:{
      pnj:"alarielle",
      texte:[
        "Le message d'Eltharion est arrivé le matin, et Alarielle ne l'a pas ouvert de la journée. Elle l'ouvre le soir, devant Yohan, ce qui est en soi une déclaration.",
        "Une convocation. Une alliance. Un nom de maison qu'elle prononce sans y mettre la moindre intonation.",
        "« Si je rentre, la dette est soldée politiquement : mon peuple aura fait un geste, et ce geste sera moi. Si je ne rentre pas, je ne suis plus une princesse — je suis une elfe en fuite avec un Paria. »"
      ],
      choix:[
        {label:"Lui dire de rentrer", detail:"C'est ce qui est raisonnable · elle le sait aussi",
         suite:"rentre", effets:{xp:30, flags:["ro_alarielle_2_fait","alarielle_rentree"]}},
        {label:"Lui demander de rester, sans conditions", detail:"Jet de Volonté (14) · lui demander de tout perdre",
         test:{stat:"vol", dc:14}, reussite:"reste_ok", echec:"reste_ko"},
        {label:"Refuser de décider à sa place", detail:"Personne ne lui a jamais laissé le choix",
         suite:"choix_libre", effets:{affinite:{qui:"alarielle", n:4}, xp:38, sang:4}},
      ]
    },
    rentre:{
      pnj:"alarielle",
      texte:[
        "« Rentrez », dit Yohan. « Vous ferez plus pour les vôtres et pour les miens depuis leur cour que sur les routes avec moi. »",
        "Alarielle plie la convocation avec un soin excessif. « C'est exact. » Sa voix est parfaitement stable. « C'est exactement ce que j'aurais dit à ma place. »",
        "Elle part trois jours plus tard. Avant de monter en selle, elle lui laisse le feuillet des archives elfiques — la preuve, la vraie. « Servez-vous-en quand vous serez assez fort. Je ne serai pas là pour vous le rappeler. »"
      ],
      effets:{flag:"archive_elfique"},
      fin:true
    },
    reste_ok:{
      pnj:"alarielle",
      texte:[
        "« Restez. » Yohan n'ajoute aucun argument, aucune justification, rien qui ressemble à une négociation. « Je vous le demande pour moi. C'est la première fois que je vous demande quelque chose qui ne sert à rien. »",
        "Alarielle regarde la convocation, puis lui, très longtemps.",
        "Puis elle approche le feuillet de la flamme et le tient là, sans le lâcher, jusqu'à ce qu'il soit impossible de le lire. « Voilà. Je viens de cesser d'être princesse. »",
        "Ce qui suit ne regarde personne — et pour la première fois depuis trois cents ans, elle ne répare rien du tout."
      ],
      effets:{affinite:{qui:"alarielle", n:5}, sang:10, xp:56,
        flags:["ro_alarielle_2_fait","alarielle_restee","alarielle_amants"]},
      fin:true
    },
    reste_ko:{
      pnj:"alarielle",
      texte:[
        "Yohan demande, mais il enrobe : il parle d'utilité, de magie ancienne, de ce qu'elle apporte au groupe. Il parle de tout sauf de ce qu'il voulait dire.",
        "Alarielle l'écoute jusqu'au bout et répond sur le même registre, poliment, avec des arguments.",
        "Elle part trois jours plus tard. Ils auront eu, jusqu'au bout, une conversation d'ambassade."
      ],
      effets:{flags:["ro_alarielle_2_fait","alarielle_rentree","archive_elfique"]},
      fin:true
    },
    choix_libre:{
      pnj:"alarielle",
      texte:[
        "« Je ne vous dirai pas quoi faire », dit Yohan. « Votre frère vous a dit quoi faire, votre père vous a dit quoi faire, quatre maisons vous ont dit quoi faire. Pas moi. »",
        "Alarielle reste avec la convocation ouverte sur les genoux pendant un temps considérable.",
        "« C'est cruel, ce que vous faites là », dit-elle enfin. « Et c'est la première chose gentille qu'on m'ait faite depuis très longtemps. »",
        "Elle ne décidera pas ce soir. Elle décidera, et ce sera elle."
      ],
      effets:{flag:"ro_alarielle_2_fait"},
      fin:true
    }
  }
},

/* ══════════════════ LADY ÉLÉONORE — le Prix du Paria, après coup ══════════════════ */
{
  id:"RO_ELEONORE_1", titre:"Ce qui n'était pas dans le contrat", famille:"POLITIQUE", rarete:"rare",
  image:"ro_eleonore_1",
  requis:{ flags:["prix_noble_accepte"], sansFlags:["ro_eleonore_1_fait"] },
  scenes:{
    start:{
      texte:[
        "La coutume a été respectée à la lettre : négociée avant le départ, consentie devant témoins, honorée après le contrat. Personne n'a été contraint de rien, et tout le monde a signé.",
        "Ce que la coutume ne prévoit pas, c'est ce qu'on se dit le lendemain matin quand on n'a plus de contrat à invoquer.",
        "« Vous savez ce qui est humiliant ? » dit-elle en regardant par la fenêtre. « Ce n'est pas la coutume. C'est que tout le monde ait supposé que je n'avais pas d'avis. »"
      ],
      choix:[
        {label:"Lui demander son avis, alors", detail:"Un peu tard · pas trop tard",
         suite:"avis", effets:{affinite:{qui:"eleonore", n:3}, xp:24}},
        {label:"Reconnaître qu'il l'a supposé aussi", detail:"Jet de Volonté (12) · s'inclure dans le reproche",
         test:{stat:"vol", dc:12}, reussite:"aveu_ok", echec:"aveu_ko"},
        {label:"S'en tenir aux termes et partir", detail:"Le contrat est honoré des deux côtés",
         suite:"part", effets:{flag:"ro_eleonore_1_fait"}},
      ]
    },
    avis:{
      texte:[
        "« Alors donnez-le-moi. Maintenant. Sans la maison, sans la coutume, sans témoins. »",
        "Lady Éléonore se retourne, et il apparaît qu'elle a un avis extrêmement précis, formé de longue date, sur à peu près tout : sa maison, l'Empire, les Parias, et la façon dont on marie les filles pour des dettes.",
        "Elle parle une heure. Yohan écoute, et il apprend plus sur la politique de Vardhen en une heure qu'en trois ans de routes."
      ],
      effets:{xp:30, sang:3, flags:["ro_eleonore_1_fait","eleonore_alliee"]},
      fin:true
    },
    aveu_ok:{
      texte:[
        "« Je l'ai supposé aussi », dit Yohan. « Vous étiez une clause. J'ai négocié une clause avec votre maison et je ne vous ai pas adressé la parole avant qu'il soit trop tard pour que ça change quoi que ce soit. »",
        "Elle ne le contredit pas. Elle apprécie visiblement qu'il n'essaie pas de s'en sortir.",
        "« Bien. » Elle s'assoit en face de lui. « Recommençons dans le bon ordre, alors. Je m'appelle Éléonore, et j'ai des conditions. »"
      ],
      effets:{affinite:{qui:"eleonore", n:4}, xp:36, flags:["ro_eleonore_1_fait","eleonore_alliee"]},
      fin:true
    },
    aveu_ko:{
      texte:[
        "Yohan cherche à s'expliquer, et une explication, ici, est exactement ce qu'il ne fallait pas offrir.",
        "Elle l'écoute poliment jusqu'au bout — c'est une femme de cour, elle sait faire — puis sonne pour qu'on le raccompagne.",
        "Le contrat est honoré. Rien d'autre ne le sera."
      ],
      effets:{flag:"ro_eleonore_1_fait"},
      fin:true
    },
    part:{
      texte:[
        "Yohan salue, remercie la maison, et reprend la route avant midi.",
        "Les termes ont été tenus des deux côtés. C'est propre, c'est net, et ça laisse un goût que ni l'un ni l'autre n'aurait su nommer."
      ],
      fin:true
    }
  }
},
{
  id:"RO_ELEONORE_2", titre:"Une maison qui compte", famille:"POLITIQUE", rarete:"épique",
  image:"ro_eleonore_2",
  requis:{ affinite:{qui:"eleonore", min:5}, flags:["eleonore_alliee","tr_05_fait"],
           sansFlags:["ro_eleonore_2_fait"] },
  scenes:{
    start:{
      texte:[
        "Éléonore n'écrit jamais deux fois pour la même chose. Cette lettre-ci est la deuxième.",
        "Valombre est en difficulté : une succession contestée, deux créanciers, et une maison rivale qui attend. Elle ne demande pas d'aide — elle propose un échange, chiffré, avec les termes détaillés en marge.",
        "En dernière ligne, hors du tableau : *Et je préférerais que vous veniez vous-même. Vous noterez que ce n'est pas dans les termes.*"
      ],
      choix:[
        {label:"Y aller, et lier les deux maisons", detail:"Karlsberg et Valombre · un vrai appui politique",
         suite:"lie", effets:{affinite:{qui:"eleonore", n:4}, or:-300, sang:14, xp:60,
           flags:["ro_eleonore_2_fait","alliance_valombre"]}},
        {label:"Envoyer l'or, mais pas soi-même", detail:"−500 or · l'appui sans l'attachement",
         requis:{or:500}, suite:"or_seul",
         effets:{or:-500, xp:32, flags:["ro_eleonore_2_fait","valombre_renflouee"]}},
        {label:"Ne rien envoyer", detail:"Karlsberg n'a pas les moyens de sauver les autres",
         suite:"rien", effets:{xp:18, flags:["ro_eleonore_2_fait","valombre_abandonnee"]}},
      ]
    },
    lie:{
      texte:[
        "Yohan vient lui-même, avec ce qu'il a, ce qui n'est pas grand-chose comparé à ce que Valombre doit — mais qui arrive au bon moment et devant les bonnes personnes.",
        "Ce n'est pas l'or qui règle l'affaire : c'est qu'un nom que tout le monde croyait mort se présente publiquement aux côtés de Valombre, et que les créanciers doivent soudain calculer avec un inconnu.",
        "« Vous savez ce que vous venez de faire ? » demande Éléonore le soir. « Vous venez de rendre Karlsberg réel. Une maison, ce n'est pas une bannière — c'est quelqu'un qui répond quand une autre maison appelle. »"
      ],
      fin:true
    },
    or_seul:{
      texte:[
        "L'or part par coursier avec une lettre courtoise et parfaitement rédigée.",
        "Valombre est sauvée, la dette est reconnue, et Éléonore répond par un remerciement d'une politesse irréprochable qui ne contient plus une seule ligne hors du tableau."
      ],
      fin:true
    },
    rien:{
      texte:[
        "Yohan ne répond pas. Il n'a pas les moyens, et il n'a pas non plus les moyens de le dire.",
        "Valombre survivra, amputée, sous la tutelle d'une maison rivale. Éléonore n'écrira pas une troisième fois."
      ],
      fin:true
    }
  }
},

/* ══════════════════ CONCLUSIONS ══════════════════
 * Chaque arc a maintenant une fin — une scène tardive où ce qui a été tissé
 * doit être nommé, ou renoncé. L'épilogue lit les marqueurs qu'elles posent :
 * un attachement qui n'aboutit à rien reste un attachement, mais il ne s'écrit
 * pas de la même façon dans la dernière page. */

{
  id:"RO_ALYCIA_4", titre:"Ce qu'on décide de garder", famille:"PARIA", rarete:"épique",
  image:"ro_alycia_4",
  requis:{ compagnon:"alycia", affinite:{qui:"alycia", min:8}, flags:["ro_alycia_3_fait"],
           sangMin:168, sansFlags:["ro_alycia_4_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Karlsberg tient debout. C'est nouveau, et cela change tout : pour la première fois depuis qu'ils se sont rencontrés, il y a un endroit où l'on pourrait simplement rester.",
        "Elle a passé la journée à ne pas s'asseoir. Elle vérifie des choses qui n'ont pas besoin d'être vérifiées.",
        "« Je ne sais pas faire ça », finit-elle par dire, dos tourné. « Les murs. Les gens qui reviennent au même endroit tous les soirs. J'ai passé dix-neuf ans à ne pas dormir deux fois sous le même toit. »",
        "« Je peux repartir sur les routes demain, et je serai excellente. Ou je peux rester ici et être très mauvaise pendant des années. » Elle se retourne enfin. « Je te demande laquelle des deux tu veux, et je te préviens que je vais faire celle que tu dis. »"
      ],
      choix:[
        {label:"Lui dire de rester", detail:"Mauvaise pendant des années, et là",
         suite:"reste", effets:{affinite:{qui:"alycia", n:4}, sang:16, xp:90,
           flags:["ro_alycia_4_fait","alycia_restee","alycia_amants"]}},
        {label:"Lui dire de repartir, et l'attendre", detail:"Excellente, et loin",
         suite:"routes", effets:{affinite:{qui:"alycia", n:3}, sang:14, xp:84,
           flags:["ro_alycia_4_fait","alycia_routes"], reputation:{parias:12}}},
        {label:"Refuser de choisir à sa place", detail:"Jet de Volonté (17) · c'est exactement ce qu'elle demande",
         test:{stat:"vol", dc:17}, reussite:"choisit_ok", echec:"choisit_ko"},
      ]
    },
    reste:{
      pnj:"alycia",
      texte:[
        "« Reste. »",
        "Elle hoche la tête, va s'asseoir, et se relève au bout de dix secondes pour aller vérifier autre chose.",
        "Cela lui prendra quatre ans. Quatre ans de nuits mal dormies, de sursauts, de sorties à trois heures du matin pour faire le tour de l'enceinte. Elle ne s'en plaindra pas une fois.",
        "La cinquième année, un matin d'hiver, Yohan la trouvera endormie près du feu, sans arme à portée de main, et il restera un long moment sans bouger pour ne pas gâcher ça."
      ],
      fin:true
    },
    routes:{
      pnj:"alycia",
      texte:[
        "« Repars. Tu es meilleure là-bas et nous le savons tous les deux. »",
        "Elle encaisse — parce que c'est ce qu'elle voulait entendre et que ce n'est pas ce qu'elle espérait.",
        "« Tu m'attendras. » Ce n'est pas une question. — « Oui. »",
        "Elle repart au printemps. Elle reviendra deux fois par an, jamais aux mêmes dates, avec des gens derrière elle à chaque fois. En douze ans, elle amènera à Karlsberg soixante et onze personnes qui n'avaient nulle part où aller.",
        "Ils vieilliront comme ça, à distance, et personne n'osera jamais leur dire que ce n'était pas une vraie vie de couple."
      ],
      fin:true
    },
    choisit_ok:{
      pnj:"alycia",
      texte:[
        "« Non. »",
        "Elle se raidit. « Comment ça, non ? »",
        "« Tu me demandes de décider pour que ce ne soit pas ta faute si tu te trompes. Je ne le ferai pas. »",
        "Le silence dure très longtemps. Puis elle rit — un rire bref, contrarié, sincère.",
        "« Tu es odieux. » Elle se rassied. « Bon. Alors je reste jusqu'au printemps et on verra. »",
        "Le printemps venu, elle restera. Elle prétendra toujours que c'était provisoire, et elle le prétendra pendant quarante ans."
      ],
      effets:{affinite:{qui:"alycia", n:5}, sang:20, xp:100,
        flags:["ro_alycia_4_fait","alycia_restee","alycia_amants","alycia_choisie"]},
      fin:true
    },
    choisit_ko:{
      pnj:"alycia",
      texte:[
        "Yohan essaie de lui renvoyer la question et s'y prend de travers : cela sonne comme une dérobade, et elle l'entend comme une dérobade.",
        "« D'accord. » Elle ramasse son sac. « Je vais faire celle où je suis excellente, alors. »",
        "Elle repart le lendemain. Elle reviendra, souvent, et ce sera toujours un peu compliqué."
      ],
      effets:{affinite:{qui:"alycia", n:-1}, sang:10, xp:66, flags:["ro_alycia_4_fait","alycia_routes"]},
      fin:true
    },
  }
},

{
  id:"RO_ALARIELLE_3", titre:"La troisième convocation", famille:"ELFE", rarete:"épique",
  image:"ro_alarielle_3",
  requis:{ compagnon:"alarielle", affinite:{qui:"alarielle", min:7}, flags:["ro_alarielle_2_fait"],
           sangMin:140, sansFlags:["ro_alarielle_3_fait"] },
  scenes:{
    start:{
      pnj:"alarielle",
      texte:[
        "Le pli est sur la table depuis quatre jours et personne n'en parle.",
        "Ce n'est plus une convocation : c'est une sommation, scellée du sceau de la Cour, avec une date. Passé cette date, la princesse Alarielle cesse d'être princesse — pas exilée, pas punie : *retirée des registres*, ce qui chez les elfes revient au même et prend cinq secondes.",
        "« Quatre-vingts ans d'archives », dit-elle enfin. « Trois lignes suffiront à les défaire. »",
        "Elle regarde Yohan. « Tu sais ce que c'est, toi. Mieux que personne. C'est même la seule chose que nos deux peuples aient jamais eue en commun. »"
      ],
      choix:[
        {label:"Lui dire d'y aller", detail:"Sa cour, sa vie, ses quatre-vingts ans",
         suite:"va", effets:{affinite:{qui:"alarielle", n:2}, sang:14, xp:80,
           flags:["ro_alarielle_3_fait","alarielle_rentree"], reputation:{elfes:14}}},
        {label:"Lui dire de brûler la sommation", detail:"Elle cessera d'être princesse",
         suite:"brule", effets:{affinite:{qui:"alarielle", n:4}, sang:18, xp:90,
           flags:["ro_alarielle_3_fait","alarielle_restee"], reputation:{elfes:-12}}},
        {label:"Y aller avec elle", detail:"Jet de Volonté (18) · un Paria devant la Cour lumineuse",
         test:{stat:"vol", dc:18}, reussite:"ensemble_ok", echec:"ensemble_ko"},
      ]
    },
    va:{
      pnj:"alarielle",
      texte:[
        "« Vas-y. Quatre-vingts ans, ça ne se jette pas parce qu'on est fatigué un mardi. »",
        "Elle part. Elle plaide sa cause devant la Cour pendant onze jours — les elfes ne se pressent pas — et elle gagne, à moitié : elle reste princesse et perd le droit de quitter Eltharion sans autorisation.",
        "Elle écrira. Beaucoup. Deux lettres par saison pendant des décennies, sur du papier qui ne jaunit pas, et Yohan les gardera toutes.",
        "Elle obtiendra son autorisation de voyage soixante-douze ans plus tard. Il sera mort depuis longtemps. Elle viendra quand même."
      ],
      fin:true
    },
    brule:{
      pnj:"alarielle",
      texte:[
        "« Brûle-la. »",
        "Elle a un mouvement de recul — puis elle prend le pli, le regarde longuement, et le pose dans l'âtre sans le décacheter.",
        "Le sceau fond en premier. C'est plus long qu'on ne croit.",
        "« Je ne suis plus rien », dit-elle en regardant le papier noircir. Elle n'a pas l'air malheureuse. Elle a l'air d'une femme qui vient de poser quelque chose de très lourd.",
        "« Tu es quelqu'un. » — « Oui. » Elle se redresse. « C'est nouveau. »",
        "Eltharion la retirera des registres à la date prévue. Elle ne le saura jamais avec certitude et ne cherchera pas à savoir."
      ],
      fin:true
    },
    ensemble_ok:{
      pnj:"alarielle",
      texte:[
        "« J'y vais avec toi. »",
        "« Tu es un Paria. » — « Oui. » — « Devant la Cour lumineuse. » — « Oui. »",
        "Elle ouvre la bouche pour expliquer pourquoi c'est absurde, et ne trouve rien à dire qui ne soit pas de la peur.",
        "Ils y vont. Yohan se tient au fond de la salle pendant onze jours, sans arme, sans un mot, sous le regard de quatre cents elfes qui n'ont jamais vu ça.",
        "Le onzième jour, un vieux conseiller demande à Alarielle pourquoi elle a amené *ça*. Elle répond : « Pour que vous soyez obligés de le regarder pendant que vous décidez. »",
        "Ils décideront de la laisser partir. Ce ne sera pas de la clémence : ce sera de la gêne, ce qui, chez les elfes, dure beaucoup plus longtemps.",
        "Elle garde son titre. Elle garde sa liberté. Et pour la première fois depuis quatre siècles, il y a eu un Paria dans cette salle et personne ne l'a fait sortir."
      ],
      effets:{affinite:{qui:"alarielle", n:5}, sang:24, xp:110,
        flags:["ro_alarielle_3_fait","alarielle_restee","alarielle_amants","cour_elfique_connue"],
        reputation:{elfes:18, parias:10}},
      fin:true
    },
    ensemble_ko:{
      pnj:"alarielle",
      texte:[
        "« J'y vais avec toi. »",
        "Elle refuse net, et elle a raison, et il insiste, et il a tort.",
        "Ils y vont. La Cour le fait attendre dehors onze jours sous la pluie, poliment, avec des repas apportés à heure fixe. C'est humiliant d'une façon qu'aucun coup ne pourrait égaler.",
        "Elle garde son titre. Elle ne parlera plus jamais de ces onze jours."
      ],
      effets:{affinite:{qui:"alarielle", n:-1}, sang:12, xp:70,
        flags:["ro_alarielle_3_fait","alarielle_rentree"], reputation:{elfes:6}},
      fin:true
    },
  }
},

{
  id:"RO_ELEONORE_3", titre:"Ce qu'une maison peut porter", famille:"POLITIQUE", rarete:"épique",
  image:"ro_eleonore_3",
  requis:{ affinite:{qui:"eleonore", min:8}, flags:["ro_eleonore_2_fait"],
           sangMin:158, sansFlags:["ro_eleonore_3_fait"] },
  scenes:{
    start:{
      pnj:"eleonore",
      texte:[
        "Elle a fait le voyage elle-même, ce qu'une dame de Valombre ne fait pas, et elle est arrivée sans escorte, ce qu'elle ne fait jamais.",
        "« Je suis enceinte », dit-elle avant même de s'asseoir. « De quatre mois. Et avant que vous ne disiez quoi que ce soit d'idiot : oui, et je le savais en venant la dernière fois. »",
        "Elle pose ses gants. « Voici la situation exacte, sans arrangement. Si l'enfant naît à Valombre, il est légitime, il hérite, et il porte le sang Paria dans une maison impériale — ce qui, le jour où quelqu'un s'en apercevra, tuera la maison et l'enfant avec. »",
        "« S'il naît ici, il n'hérite de rien, il vit traqué, et il est à vous. »",
        "« Je n'ai pas encore décidé. C'est pour ça que je suis venue. »"
      ],
      choix:[
        {label:"Qu'il naisse à Valombre, et qu'on n'en parle jamais", detail:"Un héritier · et un secret qui tiendra ou pas",
         suite:"valombre", effets:{affinite:{qui:"eleonore", n:3}, sang:20, xp:96,
           flags:["ro_eleonore_3_fait","heritier_valombre","alliance_valombre"], reputation:{humains:10}}},
        {label:"Qu'il naisse ici, et qu'il porte le nom Karlsberg", detail:"Rien à hériter · tout à porter",
         suite:"karlsberg", effets:{affinite:{qui:"eleonore", n:4}, sang:24, xp:104,
           flags:["ro_eleonore_3_fait","heritier_karlsberg"], reputation:{parias:16, humains:-8}}},
        {label:"Lui dire que ce n'est pas à lui de trancher", detail:"Jet de Volonté (16)",
         test:{stat:"vol", dc:16}, reussite:"elle_ok", echec:"elle_ko"},
      ]
    },
    valombre:{
      pnj:"eleonore",
      texte:[
        "« À Valombre. Et personne ne le sait jamais. »",
        "Elle ferme les yeux une seconde — du soulagement, et elle en a honte, et cela se voit.",
        "« Vous ne le verrez pas grandir. » — « Je sais. »",
        "L'enfant naîtra en hiver. Ce sera une fille. Elle héritera de Valombre à vingt-trois ans et la gouvernera mieux que sa mère, ce qui n'est pas rien.",
        "À quarante ans, un soir d'orage, elle fera trembler les vitres d'une pièce sans les toucher, et passera le reste de sa vie à ne le dire à personne."
      ],
      fin:true
    },
    karlsberg:{
      pnj:"eleonore",
      texte:[
        "« Ici. Et il porte le nom. »",
        "Elle met un long moment à répondre. « Vous savez ce que vous lui donnez ? Une maison en ruine et une prime sur la tête. »",
        "« Je lui donne le droit de savoir ce qu'il est. » Yohan soutient son regard. « Personne ne me l'a donné. Je l'ai découvert à onze ans en voyant brûler ma famille. »",
        "Éléonore de Valombre reste. Elle perd sa maison, son rang et ses revenus dans l'année — sa famille la déclare morte, ce qui est plus propre qu'un scandale.",
        "Elle vivra à Karlsberg vingt-huit ans, dirigera la reconstruction avec une compétence terrifiante, et n'exprimera jamais un seul regret à voix haute."
      ],
      fin:true
    },
    elle_ok:{
      pnj:"eleonore",
      texte:[
        "« Ce n'est pas à moi de trancher. »",
        "« Je sais. » Elle a l'air presque en colère. « Je voulais que vous le disiez quand même. »",
        "« Pourquoi ? » — « Parce que tout le monde décide toujours pour moi. Mon père, ma maison, l'Empire. Je voulais savoir si vous étiez comme eux. »",
        "Elle reprend ses gants. « Vous ne l'êtes pas. C'est extrêmement contrariant : cela veut dire que c'est vraiment moi qui vais devoir choisir. »",
        "Elle choisira Valombre. Elle reviendra chaque année, un mois, sous prétexte de chasse. Yohan verra sa fille grandir un mois par an pendant dix-neuf ans et n'aura jamais le droit de lui dire qui il est.",
        "Le vingtième été, c'est la petite qui le lui dira."
      ],
      effets:{affinite:{qui:"eleonore", n:5}, sang:26, xp:110,
        flags:["ro_eleonore_3_fait","heritier_valombre","alliance_valombre","eleonore_choisie"],
        reputation:{humains:12}},
      fin:true
    },
    elle_ko:{
      pnj:"eleonore",
      texte:[
        "Yohan renvoie la décision, mal, avec des précautions qui sonnent comme de la fuite.",
        "Elle l'entend ainsi. « Très bien. » Elle remet ses gants. « Alors ce sera Valombre, et vous n'en entendrez plus parler. »",
        "Elle tiendra parole pendant onze ans. Puis il y aura une lettre, très courte, qui commencera par : *Elle vous ressemble et cela devient un problème.*"
      ],
      effets:{sang:14, xp:78, flags:["ro_eleonore_3_fait","heritier_valombre"]},
      fin:true
    },
  }
},

];
