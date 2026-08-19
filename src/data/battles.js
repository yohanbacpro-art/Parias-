/* PARIAS — Champs de bataille
 *
 * Chaque entrée décrit trois fronts, leur terrain et ce qui s'y tient. Le joueur
 * y répartit ses propres unités ; le moteur (src/battle.js) fait le reste.
 *
 * fronts[].ennemis : [{ type:"milice", effectifPct:0.8 }] — effectifPct ajuste
 * la taille par rapport à l'effectif nominal du type.
 *
 * recompense / echec : { renom, or, sang, xp, suspicion, flags:[…] }
 */

const BATTLES = {

  BAT_ROUTE: {
    id:"BAT_ROUTE", nom:"L'embuscade de la Route Grise",
    intro:"Ils ont coupé la route en trois endroits et attendent les convois depuis six semaines. Trois cents pillards mal commandés, mais trois cents.",
    fronts:[
      {nom:"Le pont", terrain:"gue", ennemis:[{type:"pillards", effectifPct:0.7}]},
      {nom:"La chaussée", terrain:"plaine", ennemis:[{type:"pillards"},{type:"milice", effectifPct:0.6}]},
      {nom:"Le talus", terrain:"colline", ennemis:[{type:"archers_merc", effectifPct:0.6}]},
    ],
    recompense:{ renom:12, or:350, sang:5, xp:60,
      flags:["route_grise_liberee"] },
    echec:{ renom:-4, or:-80, xp:15 },
    texteVictoire:"Les pillards refluent vers les bois et n'en ressortiront pas de la saison. La Route Grise est ouverte, et c'est un nom qui a rouvert.",
    texteDefaite:"La colonne décroche par le talus. La route restera coupée, et on saura qui a essayé.",
  },

  BAT_CENDRE: {
    id:"BAT_CENDRE", nom:"Les Champs de Cendre",
    intro:"Une compagnie franche tient les hauteurs depuis trois jours, et personne n'a les moyens de l'en déloger. Personne, jusqu'ici.",
    fronts:[
      {nom:"Aile gauche", terrain:"bois", ennemis:[{type:"mercenaires", effectifPct:0.8}]},
      {nom:"La crête", terrain:"colline", ennemis:[{type:"mercenaires"},{type:"archers_merc"}]},
      {nom:"Aile droite", terrain:"plaine", ennemis:[{type:"cavalerie_imp", effectifPct:0.8}]},
    ],
    recompense:{ renom:20, or:600, sang:8, xp:100, flags:["cendre_tenue"] },
    echec:{ renom:-6, or:-150, xp:25 },
    texteVictoire:"La compagnie franche plie bagage avant la nuit — les mercenaires savent compter, et le compte n'était plus bon.",
    texteDefaite:"Les hauteurs restent à eux. Il faudra revenir avec autre chose que de la volonté.",
  },

  BAT_KARLSBERG: {
    id:"BAT_KARLSBERG", nom:"Les Ruines du Loup",
    intro:"Quelqu'un a compris avant Yohan que Karlsberg avait de la valeur. Ils occupent le mur d'enceinte et la grande salle, et ils ne comptaient pas voir arriver une armée.",
    fronts:[
      {nom:"La brèche nord", terrain:"ruines", ennemis:[{type:"mercenaires"},{type:"pillards", effectifPct:0.8}]},
      {nom:"La grande salle", terrain:"ruines", ennemis:[{type:"garde_imperiale", effectifPct:0.7}]},
      {nom:"Le verger", terrain:"bois", ennemis:[{type:"archers_merc"},{type:"milice"}]},
    ],
    recompense:{ renom:30, or:400, sang:22, xp:150, flags:["karlsberg_repris"] },
    echec:{ renom:-8, sang:4, xp:40 },
    texteVictoire:"Le loup de pierre est toujours debout, et pour la première fois depuis la Purge, quelque chose se tient debout à côté de lui.",
    texteDefaite:"Ils gardent les ruines. Yohan repart avec ce qu'il reste de son armée et une leçon qu'il paiera longtemps.",
  },

  BAT_DEFILE: {
    id:"BAT_DEFILE", nom:"Le Défilé des Souffrances",
    intro:"Une horde remonte des Profondeurs par la gorge. Il n'y a pas de flanc à tourner, pas de manœuvre à inventer : seulement une gorge, et le nombre en face.",
    fronts:[
      {nom:"Verrou amont", terrain:"defile", ennemis:[{type:"horde", effectifPct:0.8}]},
      {nom:"Gorge centrale", terrain:"defile", ennemis:[{type:"horde"},{type:"horde", effectifPct:0.7}]},
      {nom:"Verrou aval", terrain:"defile", ennemis:[{type:"horde", effectifPct:0.8}]},
    ],
    recompense:{ renom:28, or:500, sang:12, xp:140, flags:["defile_tenu"] },
    echec:{ renom:-10, or:-200, xp:35, flags:["defile_perdu"] },
    texteVictoire:"La gorge est bouchée par ce qu'ils y ont laissé. Kar-Durak ne saura peut-être jamais ce qui a été arrêté ici.",
    texteDefaite:"La horde passe. Ce qui arrive ensuite aux vallées n'est plus l'affaire de Yohan — mais ce sera son souvenir.",
  },

  BAT_TYRION: {
    id:"BAT_TYRION", nom:"L'affaire des Elfes noirs",
    intro:"Tyrion n'a pas demandé d'aide : il a proposé un champ. Sa colonne tiendra la gauche, celle de Yohan le centre. Si le centre cède, la cour d'Eltharion saura exactement à qui l'imputer.",
    fronts:[
      {nom:"Lisière", terrain:"bois", ennemis:[{type:"elfes_noirs", effectifPct:0.8}]},
      {nom:"Le vallon", terrain:"plaine", ennemis:[{type:"elfes_noirs"},{type:"mercenaires"}]},
      {nom:"Le tertre", terrain:"colline", ennemis:[{type:"elfes_noirs", effectifPct:0.9}]},
    ],
    recompense:{ renom:35, or:700, sang:16, xp:170, flags:["tyrion_dette_soldee"] },
    echec:{ renom:-12, xp:45, flags:["tyrion_confirme"] },
    texteVictoire:"Tyrion traverse le champ pour venir constater lui-même que le centre a tenu. Il ne félicite pas. Il constate — et c'est bien plus difficile à obtenir.",
    texteDefaite:"Le centre a cédé. Tyrion n'a pas eu besoin de dire un mot : toute sa cour a vu ce qu'il pensait depuis le début.",
  },

  BAT_LUCIUS: {
    id:"BAT_LUCIUS", nom:"Le calendrier de Lucius",
    intro:"Il avait dit « vers la fin ». Le voilà. Sa doctrine tient en une phrase : rendre la force prévisible. Aujourd'hui, elle est en face, en ordre parfait, et elle ne rompra pas d'elle-même.",
    fronts:[
      {nom:"Flanc gauche", terrain:"plaine", ennemis:[{type:"cavalerie_imp"},{type:"archers_merc"}]},
      {nom:"Centre impérial", terrain:"plaine", ennemis:[{type:"garde_imperiale"},{type:"garde_imperiale", effectifPct:0.8}]},
      {nom:"Flanc droit", terrain:"colline", ennemis:[{type:"veterans_imp"},{type:"archers_merc", effectifPct:0.9}]},
    ],
    recompense:{ renom:50, or:1200, sang:30, xp:250, flags:["lucius_brise"] },
    echec:{ renom:-20, or:-400, xp:60, flags:["lucius_vainqueur"] },
    texteVictoire:"L'ordre parfait s'est défait comme un nœud. Quelque part dans la déroute, un homme sans armure remonte à cheval sans se presser — il a déjà rangé cette journée dans la colonne des choses à recommencer.",
    texteDefaite:"Rien ne s'est effondré côté impérial. Ce n'était pas une bataille : c'était une démonstration, et Yohan en était le sujet.",
  },
};
