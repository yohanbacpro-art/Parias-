/* PARIAS — Champs de bataille
 *
 * Chaque peuple de Vardhen marche vers sa propre crise (voir CRISE_NOMS dans
 * lore.js). Les batailles majeures sont le moment où cette crise éclate — et
 * elles ne s'ouvrent que lorsque la tension du peuple concerné a réellement
 * monté dans la simulation du monde.
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
    id:"BAT_ROUTE", nom:"L'embuscade de la Route Grise", butinPeuple:"humains", peupleAllie:"humains",
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
    id:"BAT_CENDRE", nom:"Les Champs de Cendre", butinPeuple:"humains",
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
    id:"BAT_KARLSBERG", nom:"Les Ruines du Loup", butinPeuple:"humains", peupleAdverse:"humains", peupleAllie:"parias",
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
    id:"BAT_DEFILE", nom:"Le Défilé des Souffrances", butinPeuple:"peaux_vertes", peupleAdverse:"peaux_vertes", peupleAllie:"humains",
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
    id:"BAT_TYRION", nom:"L'affaire des Elfes noirs", butinPeuple:"elfes_noirs", peupleAdverse:"elfes_noirs", peupleAllie:"elfes",
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

  /* ══════════ BATAILLES MAJEURES — une par peuple, une par crise ══════════ */

  BAT_KHESH: {
    id:"BAT_KHESH", nom:"L'Unification des Sables", peuple:"khesh", butinPeuple:"khesh", peupleAllie:"khesh",
    intro:"Khal-Vaene a rassemblé les tribus sous une seule bannière, et une seule bannière chez les Khesh signifie qu'on part vers le nord. Kem-Val a réuni ce qui refuse. Entre les deux, une plaine de sel.",
    fronts:[
      {nom:"Les dunes basses", terrain:"plaine", ennemis:[{type:"khesh_rivaux"},{type:"archers_merc", effectifPct:0.8}]},
      {nom:"La plaine de sel", terrain:"plaine", ennemis:[{type:"khesh_rivaux"},{type:"mercenaires"}]},
      {nom:"Les brisants", terrain:"colline", ennemis:[{type:"khesh_rivaux", effectifPct:0.8}]},
    ],
    recompense:{ renom:40, or:900, sang:20, xp:200, flags:["khesh_unifies","crise_khesh_reglee"] },
    echec:{ renom:-14, or:-250, xp:50, flags:["khesh_khalvaene"] },
    texteVictoire:"Les lances de Khal-Vaene se plantent dans le sel, une par une, à mesure que leurs porteurs choisissent l'autre camp. La Grande Unification aura lieu — mais pas sous le nom qu'il avait prévu.",
    texteDefaite:"Les tribus se rangent derrière l'usurpateur. Elles marcheront vers le nord, et ce qu'elles y feront, personne ne l'arrêtera.",
  },

  BAT_KARDURAK: {
    id:"BAT_KARDURAK", nom:"La Guerre des Profondeurs", peuple:"nains", butinPeuple:"peaux_vertes", peupleAdverse:"peaux_vertes", peupleAllie:"nains",
    intro:"Le tunnel a débouché. Pas dans le Défilé — sous la Halle des Forges, au cœur de Kar-Durak. Il n'y a pas de front à tenir : il y a trois salles, et ce qui remonte par le sol.",
    fronts:[
      {nom:"Halle des Forges", terrain:"ruines", ennemis:[{type:"horde"},{type:"troll_guerre", effectifPct:0.8}]},
      {nom:"Le Grand Escalier", terrain:"defile", ennemis:[{type:"horde"},{type:"horde", effectifPct:0.9}]},
      {nom:"Les Coffres", terrain:"ruines", ennemis:[{type:"troll_guerre"},{type:"horde", effectifPct:0.7}]},
    ],
    recompense:{ renom:42, or:1500, sang:20, xp:210, flags:["kardurak_sauve","crise_nains_reglee"] },
    echec:{ renom:-16, xp:55, flags:["kardurak_tombe"] },
    texteVictoire:"Kar-Durak tient. Gorm fait graver le nom de Karlsberg dans la pierre de la Halle — chez les nains, c'est la seule forme de gratitude qui compte, parce qu'elle dure plus longtemps qu'eux.",
    texteDefaite:"La Halle des Forges tombe. Les nains scelleront les niveaux hauts et vivront dessous, comme ils l'ont déjà fait une fois. Ils n'oublieront pas qui n'a pas suffi.",
  },

  BAT_SURFACE: {
    id:"BAT_SURFACE", nom:"La Remontée", peuple:"peaux_vertes", butinPeuple:"peaux_vertes", peupleAdverse:"peaux_vertes", peupleAllie:"nains",
    intro:"Ils sortent. Pas par une galerie : par toutes à la fois, sur trente lieues de front. Ce n'est plus une horde, c'est une migration armée, et elle a choisi les basses terres.",
    fronts:[
      {nom:"Les guérets", terrain:"plaine", ennemis:[{type:"horde"},{type:"horde", effectifPct:0.9}]},
      {nom:"Le village brûlé", terrain:"ruines", ennemis:[{type:"horde"},{type:"troll_guerre", effectifPct:0.9}]},
      {nom:"La levée", terrain:"colline", ennemis:[{type:"horde", effectifPct:0.9},{type:"pillards"}]},
    ],
    recompense:{ renom:45, or:800, sang:22, xp:230, flags:["remontee_brisee","crise_peaux_vertes_reglee"] },
    echec:{ renom:-18, or:-300, xp:60, flags:["basses_terres_perdues"] },
    texteVictoire:"La Remontée s'arrête sur trente lieues parce qu'elle s'est arrêtée ici. Personne n'a donné cet ordre — les vagues suivantes ont simplement vu ce qui restait de la première.",
    texteDefaite:"Les basses terres passent. Ce qui vivait là partira vers le nord avec ce qu'il peut porter, et Vardhen aura une frontière de moins.",
  },

  BAT_HORDE: {
    id:"BAT_HORDE", nom:"La Grande Horde", peuple:"hommes_betes", butinPeuple:"hommes_betes", peupleAdverse:"hommes_betes", peupleAllie:"humains",
    intro:"Le Seigneur des Cornes n'était pas une légende, ou bien quelqu'un a décidé d'en redevenir un. Les hardes marchent ensemble pour la première fois depuis des siècles, et elles marchent vers les terres cultivées.",
    fronts:[
      {nom:"La lisière", terrain:"bois", ennemis:[{type:"harde_cornes"},{type:"harde_cornes", effectifPct:0.8}]},
      {nom:"Le sanctuaire", terrain:"colline", ennemis:[{type:"harde_cornes"},{type:"archers_merc", effectifPct:0.7}]},
      {nom:"Le gué du nord", terrain:"gue", ennemis:[{type:"harde_cornes", effectifPct:0.9}]},
    ],
    recompense:{ renom:38, or:700, sang:18, xp:190, flags:["horde_dispersee","crise_hommes_betes_reglee"] },
    echec:{ renom:-14, xp:50, flags:["grande_horde_passee"] },
    texteVictoire:"Les hardes se défont comme elles s'étaient faites : d'un coup, sans négociation. Le titre reste vacant. Il le restera peut-être encore quelques siècles.",
    texteDefaite:"La Grande Horde franchit le gué. Il y aura un Seigneur des Cornes, et Vardhen mettra une génération à s'en remettre.",
  },

  BAT_ELTHARION: {
    id:"BAT_ELTHARION", nom:"La Faute d'Eltharion", peuple:"elfes", butinPeuple:"elfes", peupleAllie:"elfes",
    intro:"Trois siècles de silence sur ce que les Elfes ont mesuré et tu. Quand l'archive sort au jour, la cour se fend en deux — et les deux moitiés ont des soldats.",
    fronts:[
      {nom:"Les jardins", terrain:"bois", ennemis:[{type:"sylvains"},{type:"sylvains", effectifPct:0.8}]},
      {nom:"L'esplanade", terrain:"plaine", ennemis:[{type:"sylvains"},{type:"cavalerie_imp", effectifPct:0.8}]},
      {nom:"Le pavillon des archives", terrain:"ruines", ennemis:[{type:"sylvains", effectifPct:0.9},{type:"mercenaires"}]},
    ],
    recompense:{ renom:44, or:1000, sang:24, xp:220, flags:["faute_reconnue","crise_elfes_reglee"] },
    echec:{ renom:-16, xp:55, flags:["archive_etouffee"] },
    texteVictoire:"L'archive est lue à voix haute devant la cour entière, et personne n'a pu l'en empêcher. Trois siècles de silence prennent fin en une après-midi.",
    texteDefaite:"Le pavillon brûle avec ce qu'il contenait. Officiellement, c'est un accident. Officiellement, il n'y a jamais rien eu à mesurer.",
  },

  BAT_PARIAS: {
    id:"BAT_PARIAS", nom:"La Renaissance des Parias", peuple:"parias", butinPeuple:"humains", peupleAdverse:"humains", peupleAllie:"parias",
    intro:"Ils ne sont pas venus pour une bataille : ils sont venus pour une rafle. L'Ordre des Chasseurs a localisé le refuge d'Alycia et amène de quoi le vider. En face, trente-trois noms et tout ce que Yohan a pu lever.",
    fronts:[
      {nom:"Le chemin creux", terrain:"defile", ennemis:[{type:"chasseurs_ordre"},{type:"archers_merc"}]},
      {nom:"Devant le refuge", terrain:"ruines", ennemis:[{type:"chasseurs_ordre"},{type:"garde_imperiale", effectifPct:0.9}]},
      {nom:"La crête sud", terrain:"colline", ennemis:[{type:"chasseurs_ordre", effectifPct:0.8},{type:"cavalerie_imp", effectifPct:0.8}]},
    ],
    recompense:{ renom:48, or:600, sang:35, xp:260, flags:["refuge_tenu","crise_parias_reglee"] },
    echec:{ renom:-20, sang:6, xp:70, flags:["refuge_tombe"] },
    texteVictoire:"Trente-trois. Le lendemain matin, ils sont toujours trente-trois, et c'est la première fois depuis la Purge que ce chiffre ne baisse pas. Alycia ne relit pas la liste ce soir-là.",
    texteDefaite:"Yohan décroche avec ce qu'il peut emmener. Alycia ne dit rien pendant trois jours. Le quatrième, elle sort le rouleau et commence à rayer.",
  },

  BAT_LUCIUS: {
    id:"BAT_LUCIUS", nom:"Le calendrier de Lucius", butinPeuple:"humains", peupleAdverse:"humains",
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
