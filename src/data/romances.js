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
    detourne:{
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
    veut_ko:{
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

];
