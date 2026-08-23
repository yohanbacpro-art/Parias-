/* PARIAS — Comment un compagnon entre dans le groupe
 *
 * Alycia et Alarielle s'imposaient au changement de chapitre : elles
 * apparaissaient dans le groupe sans qu'on ait rien dit. C'est réparé.
 *
 * Chacune arrive maintenant par une rencontre où l'on peut dire non — un vrai
 * non, qui la fait repartir. Et parce qu'un refus n'est pas une porte fermée
 * pour toujours, chacune revient une seconde et dernière fois, plus tard, dans
 * des circonstances qui ne ressemblent pas aux premières.
 *
 * Les scènes posent `compagnon:"id"` dans leurs effets ; le moteur
 * (applyEffets) ajoute alors la personne au groupe. `renvoyer:"id"` fait
 * l'inverse — on peut congédier quelqu'un qu'on a accepté.
 */

const EVENTS_COMPAGNONS = [

/* ══════════════════ ALYCIA — première offre ══════════════════ */
{
  id:"EC_ALYCIA_1", titre:"Celle qui posait les bonnes questions", famille:"PARIA", rarete:"épique",
  image:"ec_alycia",
  requis:{ sangMin:32, sansFlags:["ec_alycia_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Elle est assise à sa table quand il rentre. Pas cachée : assise, en pleine lumière, les mains posées à plat pour qu'on les voie.",
        "« Ne dégainez pas, ça ferait du bruit et il y a une famille au-dessus. » Elle pousse une chaise du pied. « Je m'appelle Alycia de Callensbourg et je vous cherche depuis onze semaines. »",
        "Elle énumère, sans forfanterie : le relais de la Route Grise, la nuit passée dans la grange de Vaubien, l'homme qu'il a laissé partir au péage. Elle a suivi tout ce qu'il a fait depuis trois mois.",
        "« Je ne suis pas payée pour ça. » Elle ouvre la main gauche : la même brûlure fine que la sienne, du poignet au coude. « Nous sommes onze. Onze que j'aie trouvés. Vous êtes le douzième et vous êtes le seul qui ait un nom. »"
      ],
      choix:[
        {label:"L'accepter", detail:"Elle sait des choses qu'il ignore, et elle se bat",
         suite:"accepte", effets:{compagnon:"alycia", sang:16, xp:60,
           flags:["ec_alycia_fait","alycia_rencontree"], affinite:{qui:"alycia", n:1}}},
        {label:"Refuser, et lui dire pourquoi", detail:"On ne prend pas quelqu'un qui vous a suivi trois mois",
         suite:"refuse", effets:{sang:12, xp:48, flags:["ec_alycia_fait","alycia_refusee"]}},
        {label:"La mettre à l'épreuve avant de décider", detail:"Jet de Volonté (15) · savoir ce qu'elle veut vraiment",
         test:{stat:"vol", dc:15}, reussite:"epreuve_ok", echec:"epreuve_ko"},
        {label:"Lui demander ce qu'elle fait des onze autres", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"onze_ok", echec:"onze_ko"},
      ]
    },
    epreuve_ok:{
      pnj:"alycia",
      texte:[
        "« Vous m'avez suivi trois mois avant de vous asseoir à ma table. Pourquoi maintenant ? »",
        "Elle ne s'attendait pas à celle-là. Cela se voit une demi-seconde.",
        "« Parce qu'il y a six semaines vous avez laissé partir un homme au péage des Trois Clous alors que le tuer était plus simple. » Elle hausse les épaules. « J'attendais de voir si vous étiez utilisable ou seulement dangereux. Ce sont deux choses différentes et je n'avais pas le droit de me tromper. »",
        "« Et le verdict ? »",
        "« Vous êtes utilisable. » Un temps. « Et dangereux. J'ai décidé de faire avec. »",
        "C'est probablement la chose la plus honnête qu'on lui ait dite depuis dix ans."
      ],
      choix:[
        {label:"L'accepter", detail:"", suite:"accepte", effets:{compagnon:"alycia", sang:22, xp:76,
           flags:["ec_alycia_fait","alycia_rencontree","alycia_lucide"], affinite:{qui:"alycia", n:2}}},
        {label:"Refuser quand même", detail:"L'honnêteté n'est pas la confiance",
         suite:"refuse", effets:{sang:16, xp:60, flags:["ec_alycia_fait","alycia_refusee","alycia_lucide"]}},
      ]
    },
    epreuve_ko:{
      pnj:"alycia",
      texte:[
        "Yohan pose ses questions, et elle y répond toutes, vite et bien, et il ressort de l'échange avec la nette impression d'avoir été mené exactement où elle voulait.",
        "« Vous avez fini ? » demande-t-elle sans méchanceté. « Parce que la vraie question, ce n'est pas si vous me faites confiance. C'est si vous préférez ne faire confiance à personne. »"
      ],
      choix:[
        {label:"L'accepter", detail:"", suite:"accepte", effets:{compagnon:"alycia", sang:14, xp:52,
           flags:["ec_alycia_fait","alycia_rencontree"]}},
        {label:"Refuser", detail:"", suite:"refuse", effets:{sang:10, xp:42, flags:["ec_alycia_fait","alycia_refusee"]}},
      ]
    },
    onze_ok:{
      pnj:"alycia",
      texte:[
        "« Les onze autres. Où sont-ils ? »",
        "« Deux à Port-Noir, chez un armateur qui ne pose pas de questions. Trois dans une vallée du nord dont je ne vous donnerai pas le nom. Un à l'Arène, qui refuse de venir. Un mort l'hiver dernier. » Elle compte sur ses doigts, sans emphase. « Quatre que j'ai perdus. »",
        "« Perdus comment ? »",
        "Elle met un moment à répondre. « On me les a pris. Poliment. Un homme est venu leur parler et ils l'ont suivi. »",
        "Yohan se rassied très lentement.",
        "« Vous savez qui c'est », dit-elle en le regardant. Ce n'est pas une question."
      ],
      effets:{flags:["lfa_connu"]},
      choix:[
        {label:"L'accepter", detail:"Ils cherchent la même chose", suite:"accepte",
         effets:{compagnon:"alycia", sang:24, xp:80,
           flags:["ec_alycia_fait","alycia_rencontree","alycia_liste_partagee"], affinite:{qui:"alycia", n:2}}},
        {label:"Refuser", detail:"", suite:"refuse", effets:{sang:14, xp:56, flags:["ec_alycia_fait","alycia_refusee"]}},
      ]
    },
    onze_ko:{
      pnj:"alycia",
      texte:[
        "« Les onze autres. Où sont-ils ? »",
        "« En sécurité. » Elle soutient son regard sans ciller. « Et ils y resteront, y compris vis-à-vis de vous, jusqu'à ce que je sache ce que vous valez. »",
        "C'est parfaitement raisonnable et parfaitement irritant, et elle sait très bien que c'est les deux."
      ],
      choix:[
        {label:"L'accepter", detail:"", suite:"accepte", effets:{compagnon:"alycia", sang:14, xp:54,
           flags:["ec_alycia_fait","alycia_rencontree"]}},
        {label:"Refuser", detail:"", suite:"refuse", effets:{sang:10, xp:44, flags:["ec_alycia_fait","alycia_refusee"]}},
      ]
    },
    accepte:{
      pnj:"alycia",
      texte:[
        "« D'accord. »",
        "Elle hoche la tête une fois et se lève, et c'est tout — pas de serment, pas de poignée de main. Elle prend son sac, qui était déjà dans le coin de la pièce, ce qui veut dire qu'elle n'avait pas prévu de repartir.",
        "« Une chose », dit Yohan. « Le jour où vous me mentirez sur quelque chose qui compte, ce sera fini. »",
        "« Je ne mens jamais sur ce qui compte. » Elle passe la porte la première. « Je choisis simplement ce que je dis. Ce n'est pas pareil, et vous vous en apercevrez. »"
      ],
      fin:true
    },
    refuse:{
      pnj:"alycia",
      texte:[
        "« Non. »",
        "Elle ne discute pas, ne plaide pas, ne hausse pas le ton. Elle prend son sac dans le coin de la pièce et va jusqu'à la porte.",
        "« C'est raisonnable », dit-elle sans se retourner. « Vous n'avez aucune raison de me croire et j'aurais méprisé quelqu'un qui aurait dit oui tout de suite. »",
        "Sur le seuil : « Vous saurez où me trouver quand vous en aurez besoin. Ce sera le cas. Je ne dis pas ça pour vous vexer : je dis ça parce que je connais le compte, et le compte descend. »",
        "La chaise reste tirée pendant des semaines. Il ne la remet pas en place."
      ],
      fin:true
    },
  }
},

/* ══════════════════ ALYCIA — seconde et dernière offre ══════════════════ */
{
  id:"EC_ALYCIA_2", titre:"La seconde fois qu'elle s'assied", famille:"PARIA", rarete:"épique",
  image:"ec_alycia_2",
  requis:{ sangMin:74, flags:["alycia_refusee"], sansFlags:["ec_alycia_2_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "Il ne l'a pas vue arriver, et il aurait dû, et c'est bien le problème : il n'a pas dormi depuis deux jours et l'Onde bourdonne assez fort pour couvrir des bruits de pas.",
        "Elle est agenouillée à côté de lui dans la grange, et elle est en train de recoudre quelque chose sur son flanc qu'il n'avait pas remarqué.",
        "« Trois hommes sur la route de l'est. » Elle tire le fil. « Deux sont partis. Le troisième est dehors et il ne repartira pas. »",
        "Elle n'a rien demandé, rien annoncé, rien monnayé. Elle est arrivée, elle a fait ce qu'il fallait, et elle recoud.",
        "« Ce n'est pas un argument », dit-elle sans lever les yeux. « Ne le prenez pas pour un argument. Ç'aurait été idiot de vous laisser mourir pour avoir raison. »"
      ],
      choix:[
        {label:"Lui demander de rester", detail:"Il aura fallu deux jours sans dormir",
         suite:"reste", effets:{compagnon:"alycia", sang:22, xp:80,
           flags:["ec_alycia_2_fait","ec_alycia_fait","alycia_rencontree"], affinite:{qui:"alycia", n:2}}},
        {label:"La remercier, et refuser encore", detail:"Une dette n'est pas une raison",
         suite:"refuse_encore", effets:{sang:18, xp:70, flags:["ec_alycia_2_fait","alycia_seule"]}},
        {label:"Lui demander ce qu'elle y gagne, cette fois", detail:"Jet de Volonté (14)",
         test:{stat:"vol", dc:14}, reussite:"gagne_ok", echec:"gagne_ko"},
      ]
    },
    gagne_ok:{
      pnj:"alycia",
      texte:[
        "« Qu'est-ce que vous y gagnez ? »",
        "Elle coupe le fil avec les dents avant de répondre.",
        "« Neuf. » Elle range son aiguille. « Nous étions douze. Il en reste neuf. » Un temps. « Je ne peux plus me permettre de respecter votre décision. »",
        "C'est dit sans chantage, presque avec fatigue, et c'est pour ça que ça porte."
      ],
      choix:[
        {label:"Lui demander de rester", detail:"", suite:"reste", effets:{compagnon:"alycia", sang:26, xp:90,
           flags:["ec_alycia_2_fait","ec_alycia_fait","alycia_rencontree","alycia_liste_partagee"], affinite:{qui:"alycia", n:3}}},
        {label:"Refuser encore", detail:"", suite:"refuse_encore", effets:{sang:16, xp:66, flags:["ec_alycia_2_fait","alycia_seule"]}},
      ]
    },
    gagne_ko:{
      pnj:"alycia",
      texte:[
        "« Rien », dit-elle. « Je n'y gagne rien du tout. »",
        "Elle ment, et elle le fait exprès mal, pour qu'il le voie. C'est sa façon de dire qu'elle n'a pas envie d'en parler."
      ],
      choix:[
        {label:"Lui demander de rester", detail:"", suite:"reste", effets:{compagnon:"alycia", sang:20, xp:74,
           flags:["ec_alycia_2_fait","ec_alycia_fait","alycia_rencontree"], affinite:{qui:"alycia", n:1}}},
        {label:"Refuser encore", detail:"", suite:"refuse_encore", effets:{sang:14, xp:60, flags:["ec_alycia_2_fait","alycia_seule"]}},
      ]
    },
    reste:{
      pnj:"alycia",
      texte:[
        "« Restez. »",
        "Elle finit de nouer le fil avant de répondre, ce qui prend un temps considérable.",
        "« Vous savez que je vais vous mentir un jour. » — « Je sais. » — « Et vous demandez quand même. » — « Oui. »",
        "Elle se relève, essuie ses mains, et va s'occuper du cheval sans un mot de plus.",
        "Ce sera la seule fois où elle acceptera quelque chose sans négocier."
      ],
      fin:true
    },
    refuse_encore:{
      pnj:"alycia",
      texte:[
        "« Merci. Et non. »",
        "Elle range son matériel sans commentaire, vérifie une dernière fois la couture, et s'en va au petit jour.",
        "Elle ne reviendra pas. Ce qu'elle fait ensuite — les neuf, le réseau, ce qu'elle finira par leur obtenir — se fera sans lui, et se fera quand même.",
        "Il en entendra parler de loin, pendant des années, avec l'exacte quantité de regret qu'il faut pour ne pas s'en remettre tout à fait."
      ],
      fin:true
    },
  }
},

/* ══════════════════ ALARIELLE — première offre ══════════════════ */
{
  id:"EC_ALARIELLE_1", titre:"L'émissaire qui n'est pas repartie", famille:"ELFE", rarete:"épique",
  image:"ec_alarielle",
  requis:{ sangMin:70, sansFlags:["ec_alarielle_fait"] },
  scenes:{
    start:{
      pnj:"alarielle",
      texte:[
        "Elle attend depuis deux jours à la lisière, sans feu, sans abri, avec la patience irritante des gens qui vivent neuf cents ans.",
        "« Princesse Alarielle, de la Cour lumineuse. » Elle incline la tête, exactement du degré qu'on doit à quelqu'un dont on n'a pas encore décidé le rang. « Je suis venue proposer de vous accompagner. »",
        "Puis, avant qu'il demande : « Ce n'est pas une faveur. Mon peuple a une dette. »",
        "Elle l'explique sans se ménager : lors de l'Onde, Eltharion a fermé ses routes. Des Parias en fuite se sont présentés à la frontière et on ne les a pas laissés passer. Ce n'est pas dans les archives officielles. C'est dans les archives.",
        "« Je ne peux pas réparer quatre siècles. Je peux marcher à côté d'un survivant et faire ce qu'il faut faire. C'est peu. C'est ce que j'ai. »"
      ],
      choix:[
        {label:"L'accepter", detail:"Sa magie soigne et protège · l'Onde ne fait ni l'un ni l'autre",
         suite:"accepte", effets:{compagnon:"alarielle", sang:18, xp:66,
           flags:["ec_alarielle_fait","alarielle_rencontree"], affinite:{qui:"alarielle", n:1}, reputation:{elfes:6}}},
        {label:"Refuser une dette de peuple", detail:"On ne se fait pas accompagner par une pénitence",
         suite:"refuse", effets:{sang:14, xp:56, flags:["ec_alarielle_fait","alarielle_refusee"]}},
        {label:"Lui demander si sa Cour est au courant", detail:"Jet de Précision (15)",
         test:{stat:"precision", dc:15}, reussite:"cour_ok", echec:"cour_ko"},
        {label:"Lui demander ce qu'elle veut, elle", detail:"Jet de Volonté (16) · pas son peuple : elle",
         test:{stat:"vol", dc:16}, reussite:"elle_ok", echec:"elle_ko"},
      ]
    },
    cour_ok:{
      pnj:"alarielle",
      texte:[
        "« Est-ce que la Cour lumineuse sait où vous êtes ? »",
        "Un silence d'elfe, c'est-à-dire long.",
        "« Non. » Elle regarde la lisière derrière elle. « J'ai laissé une lettre. Elle dit que je pars étudier les usages humains, ce qui n'est pas entièrement faux et ne trompera personne plus de six mois. »",
        "« Et dans six mois ? » — « On me rappellera. » — « Et vous rentrerez ? »",
        "Elle ne répond pas à celle-là, ce qui est déjà une réponse."
      ],
      effets:{flags:["alarielle_partie_seule"]},
      choix:[
        {label:"L'accepter", detail:"", suite:"accepte", effets:{compagnon:"alarielle", sang:22, xp:76,
           flags:["ec_alarielle_fait","alarielle_rencontree"], affinite:{qui:"alarielle", n:2}}},
        {label:"La renvoyer chez elle", detail:"Six mois de sursis, ça se garde",
         suite:"renvoie", effets:{sang:18, xp:64, flags:["ec_alarielle_fait","alarielle_refusee","alarielle_renvoyee"], reputation:{elfes:10}}},
      ]
    },
    cour_ko:{
      pnj:"alarielle",
      texte:[
        "« Ma Cour sait ce qu'elle a besoin de savoir », répond-elle, et le ton ferme la porte proprement.",
        "Yohan n'en tirera rien d'autre aujourd'hui."
      ],
      choix:[
        {label:"L'accepter", detail:"", suite:"accepte", effets:{compagnon:"alarielle", sang:16, xp:58,
           flags:["ec_alarielle_fait","alarielle_rencontree"]}},
        {label:"Refuser", detail:"", suite:"refuse", effets:{sang:12, xp:48, flags:["ec_alarielle_fait","alarielle_refusee"]}},
      ]
    },
    elle_ok:{
      pnj:"alarielle",
      texte:[
        "« Votre peuple a une dette. Très bien. Et vous ? »",
        "Elle ouvre la bouche pour répondre la phrase préparée — cela se voit — et ne la dit pas.",
        "« J'ai deux cent quarante ans », dit-elle à la place. « J'ai passé les quatre-vingts dernières à apprendre des choses que je ne pratiquerai jamais, dans une cour où rien ne bouge et où l'on m'appelle *la jeune*. »",
        "« Vous vous ennuyez. »",
        "« C'est le mot le plus laid qu'on puisse employer pour ce que je ressens, et c'est probablement le bon. » Elle a un sourire bref. « Je préférais la dette. C'était plus noble. »",
        "« C'était moins vrai. »",
        "« Oui », concède-t-elle. « C'était moins vrai. »"
      ],
      choix:[
        {label:"L'accepter", detail:"Une raison honnête vaut mieux qu'une noble",
         suite:"accepte", effets:{compagnon:"alarielle", sang:26, xp:88,
           flags:["ec_alarielle_fait","alarielle_rencontree","alarielle_franche"], affinite:{qui:"alarielle", n:3}}},
        {label:"Refuser", detail:"", suite:"refuse", effets:{sang:16, xp:62, flags:["ec_alarielle_fait","alarielle_refusee"]}},
      ]
    },
    elle_ko:{
      pnj:"alarielle",
      texte:[
        "« Ce que je veux ? » Elle récite la phrase préparée, sur la dette, la réparation et le devoir, et elle la récite bien.",
        "Yohan écoute jusqu'au bout sans rien apprendre."
      ],
      choix:[
        {label:"L'accepter", detail:"", suite:"accepte", effets:{compagnon:"alarielle", sang:16, xp:58,
           flags:["ec_alarielle_fait","alarielle_rencontree"]}},
        {label:"Refuser", detail:"", suite:"refuse", effets:{sang:12, xp:48, flags:["ec_alarielle_fait","alarielle_refusee"]}},
      ]
    },
    accepte:{
      pnj:"alarielle",
      texte:[
        "« Venez. »",
        "Elle ramasse son arc et son sac, et se met en marche à sa hauteur, exactement à sa hauteur, ce qu'elle fera pendant des années sans jamais s'en écarter d'un pas.",
        "Au bout d'une heure de silence : « Vous alliez me poser une question. » — « Non. » — « Si. Depuis un moment. »",
        "« Est-ce que vous savez vous battre ? »",
        "« Oh. » Elle a l'air sincèrement soulagée. « Oui. Très bien, même. Je craignais quelque chose de plus difficile. »"
      ],
      fin:true
    },
    refuse:{
      pnj:"alarielle",
      texte:[
        "« Non. »",
        "Elle encaisse sans broncher — c'est une princesse elfe, elle a été formée à encaisser devant témoins.",
        "« Puis-je demander pourquoi ? » — « Parce que vous ne venez pas pour moi. Vous venez pour ce que votre peuple n'a pas fait il y a quatre siècles. Je ne veux pas d'un compagnon qui se rachète sur moi. »",
        "Long silence. Puis, très bas : « C'est juste. »",
        "Elle repart vers la lisière. Elle mettra six ans à comprendre qu'il lui a rendu service, et elle ne le lui dira jamais."
      ],
      fin:true
    },
    renvoie:{
      pnj:"alarielle",
      texte:[
        "« Rentrez. Vous avez six mois avant qu'on vous rappelle — ne les dépensez pas à me suivre. »",
        "Elle discute, ce qui ne lui ressemble pas, et perd, ce qui lui ressemble encore moins.",
        "Elle rentre. La lettre restera dans ses affaires, jamais envoyée, jusqu'à ce que quelqu'un la trouve deux siècles plus tard.",
        "À Eltharion, on notera qu'elle a fait preuve d'un excellent jugement. Elle laissera dire."
      ],
      fin:true
    },
  }
},

/* ══════════════════ ALARIELLE — seconde et dernière offre ══════════════════ */
{
  id:"EC_ALARIELLE_2", titre:"Ce qu'elle a laissé derrière elle", famille:"ELFE", rarete:"épique",
  image:"ec_alarielle_2",
  requis:{ sangMin:112, flags:["alarielle_refusee"], sansFlags:["ec_alarielle_2_fait"] },
  scenes:{
    start:{
      pnj:"alarielle",
      texte:[
        "Elle n'est plus en tenue de cour. C'est la première chose qui frappe : cuir usé, arc réparé deux fois, et une cicatrice à la mâchoire qu'aucun soin elfique n'a touchée.",
        "« Vous aviez raison », dit-elle en guise de bonjour. « Je venais pour ma faute. »",
        "Elle a passé les mois écoulés à faire seule ce qu'elle voulait faire : deux hameaux de la lisière évacués avant une harde, un enfant de l'Onde sorti d'un cachot de province, un convoi escorté jusqu'à l'ouest.",
        "« Maintenant je viens parce que je suis meilleure à deux qu'à une, et que je n'aime pas perdre du temps. » Elle le regarde en face. « Ce n'est plus une dette. C'est une proposition de travail. »"
      ],
      choix:[
        {label:"Accepter", detail:"Ce n'est plus la même personne qui demande",
         suite:"accepte", effets:{compagnon:"alarielle", sang:24, xp:88,
           flags:["ec_alarielle_2_fait","ec_alarielle_fait","alarielle_rencontree","alarielle_franche"], affinite:{qui:"alarielle", n:3}, reputation:{elfes:8}}},
        {label:"Refuser encore", detail:"Elle s'en sort très bien seule",
         suite:"refuse", effets:{sang:18, xp:72, flags:["ec_alarielle_2_fait","alarielle_seule"], reputation:{elfes:4}}},
        {label:"Lui demander ce que dit Eltharion", detail:"Jet de Précision (14)",
         test:{stat:"precision", dc:14}, reussite:"cour_ok", echec:"cour_ko"},
      ]
    },
    cour_ok:{
      pnj:"alarielle",
      texte:[
        "« Et votre Cour ? »",
        "« M'a rappelée. Deux fois. » Elle ajuste la corde de son arc. « La troisième convocation est dans ma sacoche. Je ne l'ai pas ouverte. »",
        "« Vous devriez. » — « Probablement. »",
        "Elle la sort, la regarde, et la remet sans l'ouvrir. « Le jour où je l'ouvrirai, je cesserai d'être princesse ou je cesserai d'être ici. Je préfère encore quelques mois d'ignorance délibérée. »",
        "C'est la chose la moins elfique qu'il l'ait jamais entendue dire."
      ],
      effets:{flags:["alarielle_convocation"]},
      choix:[
        {label:"Accepter", detail:"", suite:"accepte", effets:{compagnon:"alarielle", sang:26, xp:94,
           flags:["ec_alarielle_2_fait","ec_alarielle_fait","alarielle_rencontree","alarielle_franche"], affinite:{qui:"alarielle", n:4}}},
        {label:"Refuser, et lui dire d'ouvrir la lettre", detail:"",
         suite:"refuse", effets:{sang:20, xp:78, flags:["ec_alarielle_2_fait","alarielle_seule"], reputation:{elfes:10}}},
      ]
    },
    cour_ko:{
      pnj:"alarielle",
      texte:[
        "« Eltharion dit ce qu'Eltharion dit. » Elle range son arc. « C'est-à-dire rien, très longuement. »"
      ],
      choix:[
        {label:"Accepter", detail:"", suite:"accepte", effets:{compagnon:"alarielle", sang:20, xp:80,
           flags:["ec_alarielle_2_fait","ec_alarielle_fait","alarielle_rencontree"], affinite:{qui:"alarielle", n:2}}},
        {label:"Refuser", detail:"", suite:"refuse", effets:{sang:14, xp:64, flags:["ec_alarielle_2_fait","alarielle_seule"]}},
      ]
    },
    accepte:{
      pnj:"alarielle",
      texte:[
        "« D'accord. Proposition acceptée. »",
        "Elle hoche la tête, se met en marche, et au bout de trois pas : « Vous auriez dû dire oui la première fois, vous savez. J'ai perdu huit mois. »",
        "« Vous avez évacué deux hameaux et sorti un enfant d'un cachot en huit mois. »",
        "« Oui. » Elle a l'air d'y réfléchir sérieusement. « Bon. Alors nous n'avons perdu ni l'un ni l'autre. »"
      ],
      fin:true
    },
    refuse:{
      pnj:"alarielle",
      texte:[
        "« Non. Et ce n'est pas contre vous : vous faites très bien ce que vous faites, et vous le faites mieux sans quelqu'un à protéger. »",
        "Elle encaisse, hoche la tête, et repart vers l'ouest sans discuter.",
        "Elle continuera. On parlera d'elle dans les provinces frontalières sous un nom qui n'est pas le sien, pendant très longtemps, et la Cour lumineuse finira par ne plus la rappeler du tout."
      ],
      fin:true
    },
  }
},

/* ══════════════════ CONGÉDIER QUELQU'UN ══════════════════ */
{
  id:"EC_SEPARATION", titre:"Ce qu'on finit par se dire", famille:"PARIA", rarete:"rare",
  image:"ec_separation",
  requis:{ sangMin:100, compagnon:"alycia", suspicionMin:70, sansFlags:["ec_separation_fait"] },
  scenes:{
    start:{
      pnj:"alycia",
      texte:[
        "La chasse est ouverte depuis trois semaines et cela change tout : ils ne peuvent plus entrer dans une ville ensemble, plus dormir sous le même toit deux nuits, plus rien faire d'ordinaire.",
        "C'est elle qui pose la question, un soir, sans prévenir : « Est-ce que je vous coûte plus que je ne vous rapporte ? »",
        "Elle a fait le calcul. Elle a l'air d'avoir fait le calcul plusieurs fois.",
        "« Deux porteurs de l'Onde qui voyagent ensemble laissent deux fois plus de sillage. Vous le savez. Moi aussi. »"
      ],
      choix:[
        {label:"Lui dire de rester", detail:"Le calcul n'est pas tout",
         suite:"reste", effets:{sang:16, xp:70, flags:["ec_separation_fait"], affinite:{qui:"alycia", n:2}}},
        {label:"Se séparer pour un temps", detail:"Elle quitte le groupe · −20 Suspicion",
         suite:"separe", effets:{renvoyer:"alycia", suspicion:-20, sang:14, xp:64,
           flags:["ec_separation_fait","alycia_separee"]}},
        {label:"Lui demander ce qu'elle ferait à votre place", detail:"Jet de Volonté (14)",
         test:{stat:"vol", dc:14}, reussite:"place_ok", echec:"place_ko"},
      ]
    },
    place_ok:{
      pnj:"alycia",
      texte:[
        "« Qu'est-ce que vous feriez, vous ? »",
        "« Je partirais », répond-elle immédiatement. « Et je reviendrais dans six mois quand la chasse serait retombée, et j'aurais eu raison, et ça n'aurait rien réglé du tout. »",
        "Elle remue le feu. « Parce que le vrai problème n'est pas le sillage. Le vrai problème, c'est que vous ne demandez jamais rien à personne, et que je suis en train de vous offrir une porte de sortie très raisonnable pour vous éviter d'avoir à le faire. »",
        "Un long silence.",
        "« Alors demandez », dit-elle. « Une fois. »"
      ],
      choix:[
        {label:"Le demander", detail:"Une fois",
         suite:"demande", effets:{sang:22, xp:84, flags:["ec_separation_fait"], affinite:{qui:"alycia", n:4}}},
        {label:"Ne pas le demander, et la laisser partir", detail:"Elle quitte le groupe · −20 Suspicion",
         suite:"separe", effets:{renvoyer:"alycia", suspicion:-20, sang:12, xp:60,
           flags:["ec_separation_fait","alycia_separee"], affinite:{qui:"alycia", n:-2}}},
      ]
    },
    place_ko:{
      pnj:"alycia",
      texte:[
        "« Ce que je ferais n'a aucune importance », dit-elle. « Ce n'est pas ma peau qui est affichée sur les portes de garnison. »",
        "Elle attend. Il faut décider."
      ],
      choix:[
        {label:"Lui dire de rester", detail:"", suite:"reste", effets:{sang:12, xp:60, flags:["ec_separation_fait"], affinite:{qui:"alycia", n:1}}},
        {label:"Se séparer", detail:"−20 Suspicion", suite:"separe",
         effets:{renvoyer:"alycia", suspicion:-20, sang:10, xp:54, flags:["ec_separation_fait","alycia_separee"]}},
      ]
    },
    demande:{
      pnj:"alycia",
      texte:[
        "« Reste. »",
        "Elle attend un peu, pour voir s'il ajoute quelque chose. Il n'ajoute rien.",
        "« Bon », dit-elle enfin, et elle se rassied. « C'était atroce à regarder. »",
        "Elle ne repartira plus jamais sur ce sujet."
      ],
      fin:true
    },
    reste:{
      pnj:"alycia",
      texte:[
        "« Vous restez. »",
        "Elle hausse un sourcil. « Ce n'est pas une réponse au calcul. »",
        "« Non. »",
        "Elle laisse passer. Ils lèvent le camp deux heures plus tard, ensemble, et prennent la route la moins fréquentée."
      ],
      fin:true
    },
    separe:{
      pnj:"alycia",
      texte:[
        "Ils se séparent au carrefour, sans cérémonie, parce que la cérémonie ce serait déjà admettre que c'est définitif.",
        "« Six mois », dit-elle. « Peut-être moins. »",
        "Ce sera plus. Mais elle laisse un itinéraire, quatre maisons marquées d'une croix, et une phrase : *si vous avez besoin, ce sont mes gens, pas les vôtres, et ils vous ouvriront quand même.*",
        "Yohan voyage seul pendant un moment. Il retrouve l'habitude plus vite qu'il n'aurait voulu."
      ],
      effets:{flags:["reseau_parias"]},
      fin:true
    },
  }
},

];
