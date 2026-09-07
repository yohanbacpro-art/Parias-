/* PARIAS — Acte III · CEUX QUI MONTENT AVEC VOUS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * `inimities.js` répond à *qui vient contre*. Ce fichier répond à l'autre
 * moitié de la même question, et c'est la moitié que les jeux oublient :
 *
 *     « Un village sauvé envoie des soldats vingt ans plus tard. »
 *
 * C'est écrit dans le document fondateur, sous le titre *conséquences
 * longues*. Jusqu'ici le jeu tenait la mauvaise moitié : on se faisait des
 * ennemis pour de vraies raisons, et on ne se faisait pas d'amis. Les
 * quarante-six drapeaux des chasses, les vingt-trois d'Arquenay, les
 * dix-neuf de Vauclair, les trente et un de Hauterive étaient posés
 * proprement par des scènes écrites et personne ne les relisait jamais.
 *
 * On les relit ici. Trente-quatre mineurs remontés d'une galerie hors plan
 * il y a neuf ans redescendent boiser une courtine. Quatre-vingts tourbiers
 * portés au rôle d'un bailliage arrivent avec des frondes parce qu'ils
 * figurent quelque part et qu'ils savent à qui ils le doivent.
 *
 * TROIS RÈGLES, LES MÊMES QU'EN FACE
 *
 *   1. **Rien n'est tiré au sort.** `vient()` lit des drapeaux posés par des
 *      scènes réellement jouées. Aucun renfort n'arrive parce que le siège
 *      serait trop dur autrement.
 *
 *   2. **La raison s'écrit.** Jamais *+1 compagnie*. Une phrase qui dit
 *      quelle scène a produit ces gens-là, avec ses chiffres.
 *
 *   3. **On peut avoir eu raison de ne rien demander.** Trois des maisons
 *      d'ici montent parce qu'on ne leur a **pas** réclamé la coutume. Le
 *      Prix du Paria se paie de toute façon : ne pas le prendre coûte sur
 *      le moment et rapporte neuf ans plus tard, et personne ne le dit au
 *      joueur avant que ça n'arrive.
 *
 * CE QUE CE FICHIER FOURNIT
 *
 *   soutiensDeclares()  la liste, du plus lourd au plus léger
 *   forcesAvec(n)       ce qu'ils amènent — des unités, pour `bataille.js`
 *   ecartes()           ceux qui n'amènent pas d'hommes mais retirent
 *                       quelque chose à l'autre bord
 *   soinsDisponibles()  Sainte-Ombre, si on lui a ouvert la porte
 *   pasVenus()          ceux qu'on aurait pu avoir et qu'on n'a pas
 * ═══════════════════════════════════════════════════════════════════════ */

const RENFORTS = {

/* ── Les six affaires de l'Acte I ─────────────────────────────────────────
 * Neuf ans ont passé. Ce sont des gens ordinaires : ils ne montent pas par
 * gratitude, ils montent parce qu'ils sont quelque part sur un registre et
 * qu'ils savent depuis quand. */

arquenay:{
  nom:"Les tailles d'Arquenay",
  ou:"le puits trois, à onze lieues de fumée",
  poids:4,
  vient:() => a('ar_trente_quatre') || a('ar_tenu') || a('ar_vingt_sept')
           || (a('ar_ouvert') && !a('ar_sans_retour')),
  pourquoi:() => a('ar_tenu')
    ? "Vous avez tenu la recoupe vingt minutes pendant que trente-quatre personnes remontaient d'une galerie qui n'était sur aucun plan. Sur les trente-quatre, dix-neuf sont encore au fond aujourd'hui, dans le même puits, pour la même compagnie. Ils montent avec le matériel de boisage et deux chariots de bois vert."
    : a('ar_vingt_sept')
    ? "Vingt-sept sont remontés avant que le bois se taise, parce que vous avez refusé de choisir lesquels. Ceux-là n'ont jamais su comment le dire et ils ne le diront pas davantage ce matin : ils arrivent, ils demandent où sont les étais, et ils commencent."
    : "Vous avez ouvert le remblai du puits trois. Ils frappaient depuis onze jours et personne au jour ne comptait les coups. Une compagnie de mine sait faire une seule chose sur une courtine, et c'est exactement celle dont on a besoin.",
  unites:[{ type:'sapeurs' }],
  dit:"« On boise. On ne se bat pas, on boise. Dites-nous où le mur doit tenir et donnez-nous la nuit. »",
},

sombreval:{
  nom:"Les tenanciers de Sombreval",
  ou:"le marais, et depuis neuf ans le rôle du bailliage",
  poids:3,
  vient:() => a('va_marais_sauve') || a('va_tenanciers') || a('va_greffe'),
  pourquoi:() => a('va_greffe') || a('va_tenanciers')
    ? "Quatre-vingts personnes, vingt-six enfants, portées au rôle du bailliage avec date et cote parce que quelqu'un a déposé un acte le matin plutôt que l'après-midi. Bertran a vingt-huit ans, il sait toujours écrire, et il est le seul du marais à comprendre ce que ça veut dire d'exister sur un papier. Il en amène quarante."
    : "Le marais et le bourg sont la même famille, coupée en deux il y a trente ans, et vous êtes la seule personne extérieure à l'avoir compris avant qu'on ne les pende. Ils n'ont pas d'armes. Ils ont des frondes, et ils ont grandi à les avoir.",
  unites:[{ type:'frondeurs' }],
  dit:"« On est au rôle, messire. Sur le papier, avec la cote et la date. Je le sais parce que c'est moi qui l'ai écrit. »",
},

rochebrune:{
  nom:"Rochebrune",
  ou:"la lande, et quatorze hommes qui ont regardé",
  poids:3,
  vient:() => a('ro_or_seul') || a('ro_aldren_vivant')
           || (a('ro_vivant') && !a('ro_aldren_mort')),
  pourquoi:() => a('ro_aldren_vivant')
    ? "Vous avez laissé Ser Aldren finir sa liste, et vous lui avez dit pourquoi. Ermengarde de Rochebrune n'a jamais approuvé cette décision et elle ne l'approuve toujours pas. Elle envoie trente chevaux quand même, parce qu'elle a passé neuf ans à comprendre que c'était la seule fin où sa maison ne perdait personne d'autre."
    : "Vous n'avez pas réclamé la coutume à Rochebrune. Une maison à qui un Paria n'a rien demandé est une maison qui n'a rien à cacher sur ce point-là, et c'est plus rare qu'une alliance : ça ne s'écrit nulle part et ça se paie une fois, en entier, le jour où on le demande.",
  unites:[{ type:'cavalerie', effectifPct:0.8 }],
  dit:"« Ma maison ne vous doit rien, et c'est exactement pour ça que je peux venir. Une dette, ça se discute. »",
},

hauterive:{
  nom:"Hauterive",
  ou:"quelque part entre un mari et un coffret de lettres",
  poids:3,
  vient:() => a('ha_ramenee') || a('ha_refus_comp') || a('ha_isabeau'),
  pourquoi:() => a('ha_refus_comp')
    ? "Vous avez refusé que Hauterive rachète la coutume en argent. Il l'a remarqué sur le moment et il ne l'a jamais dit à personne. Il paie une compagnie franche pour la saison, d'avance, et il n'écrit pas son nom sur le contrat."
    : "Vous avez ramené Isabeau de Hauterive à son mari, avec le coffret et ce qu'il y avait dedans. Ce que cette maison est devenue depuis ne regarde qu'elle. Ce qu'elle envoie ce matin regarde Karlsberg : quarante-cinq hommes payés pour tenir, et pas pour tenir un moment.",
  unites:[{ type:'veterans', effectifPct:0.8 }],
  dit:"« On a payé d'avance. C'est notre façon de faire, et vous savez déjà qu'elle ne veut pas dire ce qu'on croit. »",
},

valombre:{
  nom:"Valombre",
  ou:"une tour vendue, et une femme qui a compté ses morts",
  poids:2,
  vient:() => a('wy_heloise_dette') || a('wy_heloise_franche') || a('wy_heloise_lucide'),
  pourquoi:() => a('wy_heloise_lucide') || a('wy_heloise_franche')
    ? "Héloïse de Valombre a reconnu devant vous, à voix normale, dans sa propre salle, que son fils était un danger. Personne d'autre dans quatre provinces n'a jamais obtenu ça d'elle, et elle sait exactement ce que ça lui a coûté de le dire."
    : "Onze morts, dont trois hommes qu'elle avait elle-même envoyés voir. Elle tient les comptes de sa maison comme d'autres tiennent leur honneur, et il y a une ligne ouverte à votre nom depuis neuf ans.",
  unites:[{ type:'archers', effectifPct:0.9 }],
  dit:"« Je ne suis pas venue vous remercier. Je suis venue solder. Ce n'est pas la même chose et c'est plus sûr. »",
},

hameaux:{
  nom:"Les hameaux des tourbières",
  ou:"Fontaine-Basse, et neuf feux plus haut",
  poids:2,
  vient:() => a('ch_hameau_sorti') || a('ch_co_reste') || a('ch_re_neuf_vivants')
           || (a('ch_meute_faite') && !a('ch_colin_denonce')),
  pourquoi:() => a('ch_co_reste')
    ? "Vous leur avez dit qu'il y avait quelqu'un dedans, et ils n'ont pas brûlé la grange. Un hameau qui n'a pas brûlé quelque chose ne se le rappelle pas comme une bonne action : il se le rappelle comme le jour où on ne lui a pas menti."
    : a('ch_re_neuf_vivants')
    ? "Neuf personnes sont ressorties d'un puits où l'on ne ressort pas. Elles ont eu neuf ans pour décider ce qu'elles en faisaient, et elles n'ont trouvé qu'une seule chose."
    : "Un garçon de douze ans a nourri une meute pendant six semaines pour sauver le troupeau de son grand-père, et personne dans la vallée n'a oublié qui a refusé de le pendre pour ça. Ils montent avec ce qu'ils ont, c'est-à-dire des lanières de cuir et un nombre absurde de gens.",
  unites:[{ type:'frondeurs', effectifPct:0.8 }],
  dit:"« On ne sait pas se battre, messire. On sait venir. On a mis deux jours. »",
},

/* ── Ce qu'on est allé chercher loin ──────────────────────────────────────
 * Ceux-là ne doivent rien à une affaire de province. Ils viennent parce
 * qu'un homme s'est déplacé jusqu'à eux à un moment où il avait mieux à
 * faire, et que ce genre de chose se retient très longtemps chez des gens
 * qui vivent très longtemps. */

kardurak:{
  nom:"Kar-Durak",
  ou:"onze portes, trois encore tenues",
  poids:4,
  vient:() => a('kd_dette') || a('kd_tenu') || a('a2_kardurak_aide')
           || a('a3_porte_ouverte') || a('a3_porte_scellee'),
  pourquoi:() => a('a3_porte_ouverte') || a('a3_porte_scellee')
    ? "On est descendu à la onzième porte. Chez les Nains, une dette de galerie ne s'éteint pas avec celui qui l'a contractée : elle passe à la charge, et la charge est héréditaire. Vingt-cinq sapeurs et trente-cinq arbalètes remontent une vallée humaine pour la première fois en quatre-vingts ans, et le greffe de Kar-Durak a noté la date."
    : "Une dette naine. Elle a été inscrite, elle porte un numéro, et le numéro a survécu à deux sièges. Ils ne demandent pas ce qu'on défend : la charge dit où aller, pas pourquoi.",
  unites:[{ type:'sapeurs', effectifPct:0.9, nom:"Sapeurs de Kar-Durak" },
          { type:'arbaletriers', effectifPct:0.8, nom:"Arbalétriers de Kar-Durak" }],
  dit:"« Numéro trois cent onze. On ne discute pas un numéro. Montrez-nous la pierre. »",
},

marchenoire:{
  nom:"Les Sans-Nom de la Marche noire",
  ou:"deux familles, et ce qui en est sorti",
  poids:5,
  vient:() => a('an_parias') || a('an_gue_tenu') || a('a2_reseau_protege'),
  pourquoi:() => a('an_gue_tenu')
    ? "Le gué d'Aumance, commandé par un Paria devant quatre cents hommes de la file. C'est la seule fois en quatre cents ans qu'une chose pareille a été écrite quelque part, et elle a été écrite. Ils ne sont pas nombreux. Ils n'ont jamais eu besoin de l'être."
    : "Deux familles de Parias à la Marche noire, et un aîné parti vers l'ouest au bout de deux hivers. Il a mis neuf ans à traverser quatre provinces. Il est arrivé avec dix-neuf autres et il n'a pas expliqué comment.",
  unites:[{ type:'parias' }],
  dit:"« On ne se recrute pas. Vous le savez : c'est vous qui nous l'avez appris, et vous ne vous en souvenez probablement pas. »",
},

khesh:{
  nom:"Les cavaliers de Sarad",
  ou:"le désert, et un puits où l'on compte les cailloux",
  poids:3,
  vient:() => a('a3_kh_unifie') || a('kh_franc') || a('a3_kh_sorti'),
  pourquoi:() => a('a3_kh_unifie')
    ? "Douze tribus sous un serment, et un homme du nord dans le cercle de neuf pas au moment où ça s'est joué. Chez les Khesh, celui qui était là quand la chose s'est faite en fait partie pour toujours, et cela ne se négocie ni ne s'annule."
    : "« Vous êtes le cinquième. Vous êtes le premier à le dire tout de suite. » Il l'a dit devant les siens, ce qui, chez eux, engage celui qui parle et non celui qui écoute. Ils sont venus vérifier ce que ça valait.",
  unites:[{ type:'eclaireurs' }],
  dit:"« Trente ans de cailloux sur la margelle. On a compté, et on est venus. »",
},

/* ── Ceux qui n'amènent pas d'hommes ──────────────────────────────────────
 * Un renfort n'est pas forcément une compagnie. Un réseau qui prévient, un
 * greffier qui écrit, un hospice qui recoud : ça ne se met pas sur un
 * front et ça change quand même la journée. */

reseau:{
  nom:"Le réseau de Callensbourg",
  ou:"deux cents personnes, et pas une ligne écrite",
  poids:4,
  vient:() => a('a2_reseau_protege') || a('a2_relais_trois') || a('a2_alycia_reste'),
  pourquoi:() => "Sept en dix-huit mois au début ; plus de deux cents à la fin, et aucun nulle part sur un papier. Un réseau qui déplace des gens sait aussi les empêcher d'arriver. Une compagnie payée pour six semaines a trouvé les quatre relais de la route de poste fermés, dans l'ordre, sans un mot d'explication.",
  unites:[],
  ecarte:1,
  dit:"« Personne n'a rien fait. C'est ce qu'on fait de mieux et c'est très difficile à obtenir. »",
},

loys:{
  nom:"Loys, du greffe de Chastel",
  ou:"une salle où l'on écrit très lentement",
  poids:2,
  vient:() => a('fi_loys') || a('as_loys_parle') || a('assise_loys'),
  pourquoi:() => "Il a parlé une fois dans sa vie, à l'assise d'hiver, et il n'a jamais cessé de le payer. Il ne peut rien envoyer. Il peut égarer une attestation de qualité pendant onze jours, et une commission de province sans attestation de qualité n'entre pas dans une vallée : elle attend au relais et elle écrit à Chastel.",
  unites:[],
  ecarte:1,
  dit:"« Il manquera une pièce au dossier. Ça arrive tout le temps. Ça n'arrive jamais deux fois au même dossier. »",
},

sainteombre:{
  nom:"Sainte-Ombre",
  ou:"onze hospices de route, et une comptable",
  poids:2,
  vient:() => a('ca_sainte_ombre') || a('a2_porte_sainte_ombre') || a('fi_hospices')
           || a('in_ys_lettre'),
  pourquoi:() => a('fi_hospices') || a('in_ys_lettre')
    ? "Onze hospices de route en dix-neuf ans, tenus sur trois colonnes par quelqu'un qui n'a jamais voulu qu'on lui pardonne. Deux chirurgiens et quatre religieuses sont dans la cour depuis avant-hier, et ils ont installé les tables avant qu'on leur dise où."
    : "Vous avez cédé le droit de passage de Cendrepont contre une lettre pour Sainte-Ombre. Le droit valait onze cents couronnes par an. La lettre a valu ce que valent deux chirurgiens dans une cour, le matin du seul jour où ça compte.",
  unites:[],
  soigne:true,
  dit:"« Posez-les ici. On ne demande rien à personne, jamais, et surtout pas ce matin. »",
},

};

/* ══ CE QUE ÇA DONNE ═══════════════════════════════════════════════════════ */

/* Ceux qui montent réellement, du plus lourd au plus léger. */
function soutiensDeclares(){
  /* Les paramètres du tri ne s'appellent pas `a` : `a()` est la lecture de
   * drapeau, en portée globale, et l'ombrer ici serait une bombe à retard. */
  return Object.entries(RENFORTS)
    .filter(([, x]) => { try { return x.vient(); } catch(e){ return false; } })
    .sort(([, x], [, y]) => y.poids - x.poids)
    .map(([id, x]) => ({ id, ...x }));
}

/* Ce qu'ils posent sur le champ. Même plafond qu'en face, pour la même
 * raison : une bataille illisible n'est pas une bataille. */
function forcesAvec(max){
  const u = [];
  for(const s of soutiensDeclares()){
    for(const x of (s.unites || [])){
      if(u.length >= (max || 5)) return u;
      /* Chaque compagnie porte le nom de ceux qui l'envoient : sur un rôle,
       * « Les tailles d'Arquenay » et « Sapeurs de Kar-Durak » sont le même
       * gabarit et ne sont pas les mêmes gens. */
      u.push({ ...x, de:s.nom, nom:x.nom || s.nom });
    }
  }
  return u;
}

/* Ce qui n'arrive jamais en face. On plafonne à deux : au-delà, l'ennemi
 * n'a plus de siège à faire et la scène perd son objet. */
function ecartes(){
  const l = soutiensDeclares().filter(s => s.ecarte);
  return { combien:Math.min(2, l.reduce((n, s) => n + s.ecarte, 0)), par:l };
}

/* Sainte-Ombre recoud. Une blessure permanente ne se répare pas ; celle
 * qu'on porte encore de l'hiver, si. */
function soinsDisponibles(){
  return soutiensDeclares().some(s => s.soigne);
}

/* Ceux qu'on aurait pu avoir. On ne les nomme qu'à la fin, dans la
 * chronique : les nommer avant le siège serait dire au joueur ce qu'il a
 * manqué, et ce n'est pas à nous de le lui dire. */
function pasVenus(){
  return Object.entries(RENFORTS)
    .filter(([, x]) => { try { return !x.vient(); } catch(e){ return true; } })
    .map(([, x]) => x.nom);
}
