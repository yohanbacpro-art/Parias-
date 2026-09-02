/* PARIAS — Acte II · LE CHANTIER DE KARLSBERG
 * ═══════════════════════════════════════════════════════════════════════
 * Le document fondateur, mot pour mot :
 *
 *   « Jamais "Reconstruire le château : 10 000 or". Il faut de la pierre,
 *     des ouvriers, un architecte, de la nourriture, des routes sûres, une
 *     garnison, une population, des revenus, des alliances. »
 *
 * D'où quatre choses qui ne s'achètent pas — pierre, bras, grain, faveurs —
 * et quatre conditions qui ne sont pas des stocks du tout.
 *
 * Le point important : ON NE LES GAGNE PAS EN CLIQUANT. Chacune vient d'une
 * source ouverte ailleurs, des saisons plus tôt, dans une affaire qui n'avait
 * rien à voir : une dette naine soldée, un réseau qu'on a rendu, une eau
 * trouvée à quatre-vingt-dix pieds. Ouvrir une source est une décision. Elle
 * rapporte ensuite chaque saison, toute seule, tant qu'elle tient.
 *
 * Relever Karlsberg n'est donc pas un poste de dépense : c'est ce que devient
 * une partie où l'on a rendu des choses à des gens.
 *
 * Et l'écran n'est jamais un tableur : on lit ce qui est monté cette saison et
 * d'où ça vient, jamais un chiffre de production.
 * ═══════════════════════════════════════════════════════════════════════ */

const CHANTIER = () => (A2().chantier = A2().chantier || {
  pierre:0, bras:0, grain:0, faveurs:0, faits:[], palier:'ruines', vues:[],
});

const RES = {
  pierre:  { nom:"Pierre",  unite:"charrois", note:"taillée, charriée, montée" },
  bras:    { nom:"Bras",    unite:"hommes",   note:"des gens qui restent et qui bâtissent" },
  grain:   { nom:"Grain",   unite:"muids",    note:"de quoi les nourrir pendant qu'ils bâtissent" },
  faveurs: { nom:"Faveurs", unite:"dettes",   note:"ce qu'on vous doit, et qu'on ne refuse pas" },
};

/* Une source ouverte rapporte chaque saison. `pourquoi` est ce qu'on affiche :
 * le joueur lit d'où vient sa pierre, pas un rendement. */
const SOURCES2 = [
  /* — L'amorce —
     Sans elle, dégager la cour exigerait les bras que seule la cour dégagée
     fait venir. Ce sont ceux qui sont déjà là : peu, mais ils y sont. */
  { flag:'kar_refuge',        res:'bras',  n:1, quoi:"Les six sous les ruines",
    pourquoi:"ils dorment dans la crypte et ils n'ont nulle part où aller" },
  { flag:'kar_refuge',        res:'grain', n:1, quoi:"Ce qu'on rapporte",
    pourquoi:"deux chasseurs, un collet, et la vallée qui n'a pas été braconnée depuis vingt ans" },
  { flag:'a2_bannieres',      res:'bras',  n:2, quoi:"Ceux que la bannière appelle",
    pourquoi:"un nom relevé au registre se lit à voix haute dans les auberges" },
  { flag:'a2_bannieres',      res:'grain', n:2, quoi:"La dîme de la vallée",
    pourquoi:"une maison enregistrée a le droit de lever, et les trois hameaux paient" },

  /* — La pierre — */
  { flag:'kar_refuge',        res:'pierre', n:1, quoi:"Les ruines elles-mêmes",
    pourquoi:"Karlsberg a été rasée une fois : il y a de quoi rebâtir dans ses propres décombres" },
  { flag:'a2_dette_naine',    res:'pierre', n:3, quoi:"Les charrois de Kar-Durak",
    pourquoi:"des blocs sciés qui se ferment sans mortier — une maison qui paie ses morts est une maison qu'on sert" },
  { flag:'a2_nains_dehors',   res:'pierre', n:4, quoi:"Les tailleurs sans montagne",
    pourquoi:"trois mille Nains en plaine, et pas un ouvrage à quoi mettre les mains" },
  { flag:'ca_marche',         res:'pierre', n:2, quoi:"La carrière d'Estrées",
    pourquoi:"Caleb ne donne pas de pierre : il vend une carrière, et une carrière vendue reste vendue" },
  { flag:'lu_accepte',        res:'pierre', n:3, quoi:"Les chantiers d'Astrah",
    pourquoi:"on relève les tombes royales, et ce qui relève des tombes sait relever des murs" },

  /* — Les bras —
     Le socle : dès que la cour est praticable, des gens s'arrêtent. Peu, mais
     il en vient toujours. C'est ce qui garantit qu'une partie qui ne fait rien
     d'autre avance quand même — très lentement. */
  { flag:'ch_cour',           res:'bras', n:1, quoi:"Ceux qui s'arrêtent",
    pourquoi:"une cour praticable et un toit, ça se sait sur une route" },
  { flag:'ch_refuge',         res:'bras', n:4, quoi:"Le corps de logis",
    pourquoi:"trente lits, et une règle : on ne demande pas d'où l'on vient" },
  { flag:'a2_karlsberg_peuple', res:'bras', n:3, quoi:"Les onze d'Alycia",
    pourquoi:"les plus vieux du réseau, ceux qui ne tenaient plus un déplacement de plus" },
  { flag:'a2_caleb_quarante', res:'bras', n:3, quoi:"Les quarante de Fort-aux-Princes",
    pourquoi:"sans bannière, sans lettre et sans conditions — ce qui devrait vous inquiéter" },
  { flag:'an_porte',          res:'bras', n:2, quoi:"Ceux qui ne vont pas à Vaeth",
    pourquoi:"il y a des rayés qui préfèrent une maison humaine à une marche noire, et ils sont peu" },
  { flag:'a2_hordes_refugies',res:'bras', n:2, quoi:"Les hameaux de la marche",
    pourquoi:"ils n'avaient plus de mur où rentrer, et le vôtre montait" },

  /* — Le grain — */
  { flag:'ch_cour',           res:'grain', n:1, quoi:"Le potager de la cour",
    pourquoi:"quatre planches de légumes là où il y avait des ronces" },
  { flag:'a2_route_franche',  res:'grain', n:3, quoi:"La route franche",
    pourquoi:"les convois passent chez vous parce que ça ne leur coûte rien" },
  { flag:'a2_peage',          res:'grain', n:2, quoi:"Le péage de la vallée",
    pourquoi:"deux sous par essieu, et un registre tenu" },
  { flag:'a2_eau',            res:'grain', n:2, quoi:"Ce que les Khesh envoient",
    pourquoi:"on n'oublie pas l'homme qui a trouvé de l'eau, et le désert paie en orge" },
  { flag:'ch_bourg',          res:'grain', n:3, quoi:"Le bourg",
    pourquoi:"des gens qui sèment pour eux-mêmes au pied de vos murs" },

  /* — Les faveurs — */
  { flag:'a2_charles_allie',  res:'faveurs', n:2, quoi:"Charles de Mont-Draken",
    pourquoi:"il tient deux vallées avec vous, ce qui lui coûte plus qu'à vous" },
  { flag:'a2_maitre_oeuvre',  res:'faveurs', n:2, quoi:"Brann de Kar-Durak",
    pourquoi:"cent onze ans, six mots par jour, et un mur qui ne tombera plus" },
  { flag:'a2_onde_rendue',    res:'faveurs', n:2, quoi:"La stèle des Trois Chênes",
    pourquoi:"une cour elfique a gravé quarante et un noms Parias dans sa propre pierre" },
  { flag:'a2_maison_alliee',  res:'faveurs', n:2, quoi:"Votre alliance de maison",
    pourquoi:"un contrat de mariage est une créance à onze pages, et elle joue dans les deux sens" },
  { flag:'a2_lucius_couronne',res:'faveurs', n:3, quoi:"Astrah",
    pourquoi:"un roi qu'on a fait doit quelque chose, et il le sait mieux que personne" },
];

/* Ce qui n'est pas un stock. Une route sûre est un état du monde. */
const CONDITIONS2 = {
  route_sure: { nom:"une route sûre jusqu'à la vallée",
    flags:['a2_route_franche','a2_peage','a2_charles_allie','ch_enceinte'],
    manque:"rien de lourd ne monte tant que le défilé n'est pas tenu" },
  garnison: { nom:"une garnison qui tienne les murs",
    flags:['a2_caleb_quarante','a2_bannieres','a2_charles_allie','a2_garnison'],
    manque:"personne ne bâtit un donjon qu'il ne peut pas défendre" },
  architecte: { nom:"quelqu'un qui sache bâtir",
    /* Deux peuples savent monter une voûte dans ce monde, et une capitale
     * qui relève ses tombes royales depuis deux ans a les deux sous la main. */
    flags:['a2_maitre_oeuvre','a2_nains_dehors','lu_accepte','ls_couronne','ls_symbole'],
    manque:"il n'y a personne ici qui sache monter une voûte qui tienne" },
  population: { nom:"assez de monde pour que ce soit une ville",
    flags:['ch_refuge','a2_karlsberg_peuple','a2_hordes_refugies'],
    manque:"un domaine sans habitants est un décor" },
};

const conditionTenue = id => CONDITIONS2[id].flags.some(a);

/* Les onze ouvrages. Chacun coûte des choses qui ne s'achètent pas, et
 * certains exigent en plus un état du monde. */
const OUVRAGES = [
  { id:'ch_cour',     nom:"Dégager la cour",
    dit:"Quarante ans de ronces, deux charrettes brûlées et ce qui reste d'un puits comblé.",
    cout:{ bras:3 }, avant:[] },

  { id:'ch_salle',    nom:"Remettre un toit sur la salle basse",
    dit:"Il y a des murs et il n'y a pas de couverture. Dessous, on peut dormir au sec, ce qui change tout.",
    cout:{ pierre:3, bras:4, grain:2 }, avant:['ch_cour'] },

  { id:'ch_puits',    nom:"Recreuser le puits",
    dit:"Ils l'ont comblé la nuit-là, avec ce qu'ils avaient sous la main. On sait quoi.",
    cout:{ bras:4, grain:3 }, avant:['ch_cour'] },

  /* Sept pieds de moellon ne sont pas une voûte : n'importe quel maçon sait
   * les monter. L'architecte est exigé par le donjon et par la muraille, pas
   * par un mur bas — et c'est ce qui rend « fort » atteignable tout seul. */
  { id:'ch_enceinte', nom:"Relever l'enceinte basse",
    dit:"Sept pieds, pas douze. Ça n'arrête pas une armée : ça arrête ceux qui passent.",
    cout:{ pierre:8, bras:6, grain:4 }, avant:['ch_salle'] },

  { id:'ch_forge',    nom:"Rallumer la forge",
    dit:"La forge de Karlsberg a été éteinte un mardi. Personne ne rallume une forge pour rien.",
    cout:{ pierre:6, bras:6, grain:4, faveurs:1 }, avant:['ch_enceinte'] },

  { id:'ch_refuge',   nom:"Bâtir le corps de logis",
    dit:"Trente lits, un réfectoire, et une règle affichée à l'entrée : on ne demande pas d'où l'on vient.",
    cout:{ pierre:8, bras:10, grain:8 }, avant:['ch_salle'] },

  { id:'ch_donjon',   nom:"Monter le donjon",
    dit:"Quatre étages sur une base carrée, comme il était. On a la base : elle a tenu la Purge.",
    cout:{ pierre:22, bras:16, grain:12, faveurs:2 }, avant:['ch_enceinte','ch_forge'],
    exige:['architecte','garnison','route_sure'] },

  { id:'ch_chapelle', nom:"Relever la chapelle",
    dit:"Il y a trente-quatre statues sans visage dans la crypte. Il n'y a plus rien au-dessus d'elles.",
    cout:{ pierre:9, bras:6, faveurs:2 }, avant:['ch_salle'] },

  { id:'ch_bourg',    nom:"Laisser un bourg se faire au pied des murs",
    dit:"On ne bâtit pas un bourg : on cesse de l'empêcher, on trace deux rues et on tient un registre.",
    cout:{ pierre:12, bras:14, grain:16 }, avant:['ch_refuge','ch_puits'],
    exige:['population','route_sure'] },

  { id:'ch_muraille', nom:"La muraille de douze pieds",
    dit:"Celle qui change la nature de l'endroit. On ne prend plus Karlsberg au passage : on l'assiège.",
    cout:{ pierre:34, bras:24, grain:20, faveurs:3 }, avant:['ch_donjon','ch_bourg'],
    exige:['architecte','garnison'] },

  { id:'ch_pierre',   nom:"Poser la pierre de fondation",
    dit:"Une pierre gravée, scellée dans l'angle sud-est, avec une date et un nom. Elle ne défend rien.",
    cout:{ pierre:4, faveurs:4 }, avant:['ch_muraille'] },
];

const OUV = id => OUVRAGES.find(o => o.id === id);
const faitCh = id => CHANTIER().faits.includes(id);

const PALIERS2 = [
  { id:'ruines',    nom:"Ruines",              exige:[],
    dit:"Vingt ans de ronces sur ce qui fut une maison." },
  { id:'refuge',    nom:"Refuge",              exige:['ch_cour','ch_salle'],
    dit:"Un endroit sec, un feu, une porte. Des gens y dorment." },
  { id:'fort',      nom:"Fort",                exige:['ch_enceinte','ch_puits'],
    dit:"Des murs, de l'eau, du grain. Ceux qui viennent doivent frapper." },
  { id:'chateau',   nom:"Château",             exige:['ch_donjon','ch_forge'],
    dit:"Un donjon, une forge, une garnison. On ne prend plus ça au passage." },
  { id:'domaine',   nom:"Domaine",             exige:['ch_bourg','ch_refuge'],
    dit:"Un bourg au pied des murs, un marché, des gens qui y naissent." },
  { id:'puissance', nom:"Puissance régionale", exige:['ch_muraille','ch_pierre'],
    dit:"Karlsberg pèse sur la province. On compte avec elle, qu'on le veuille ou non." },
];

function palierDeKarlsberg(){
  let p = PALIERS2[0];
  for(const x of PALIERS2) if(x.exige.every(faitCh)) p = x;
  return p;
}

/* ── Ce qui monte chaque saison ────────────────────────────────────────────
 * Appelé par la fin de saison. Rien n'arrive si aucune source n'est ouverte,
 * et c'est le point : une partie qui n'a rien rendu à personne ne bâtit pas. */
function rendreSaisonChantier(){
  const C = CHANTIER(), arrivees = [];
  /* Une crise qui mûrit vide des hameaux, et des hameaux vidés vont vers le
   * seul mur de la marche qui monte au lieu de tomber. */
  if(C.faits.includes('ch_refuge') && crise('hordes') >= 2) ETAT.flags.add('a2_hordes_refugies');
  for(const s of SOURCES2){
    if(!a(s.flag) && !faitCh(s.flag)) continue;
    C[s.res] += s.n;
    arrivees.push(s);
  }
  return arrivees;
}

/* ── L'écran du chantier ───────────────────────────────────────────────────
 * Jamais un tableur. On lit l'état de l'endroit, ce qui est monté cette
 * saison et par qui, puis ce qu'on peut entreprendre — et pour le reste, ce
 * qui manque, écrit en toutes lettres. */
DYN.ka_chantier = () => {
  const C = CHANTIER(), p = palierDeKarlsberg();
  C.palier = p.id;

  const dispo = OUVRAGES.filter(o => !faitCh(o.id)
    && (o.avant || []).every(faitCh)
    && Object.entries(o.cout).every(([k, n]) => C[k] >= n)
    && (o.exige || []).every(conditionTenue));

  const bientot = OUVRAGES.filter(o => !faitCh(o.id) && !dispo.includes(o)
    && (o.avant || []).every(faitCh));

  SCENES.ka_chantier = {
    dyn:true,
    lieu:`Karlsberg · ${dateA2()}`,
    titre:p.nom === "Ruines" ? "Ce qu'il reste" : p.nom,
    texte:[
      p.dit,
      () => {
        const dit = Object.entries(RES)
          .filter(([k]) => C[k] > 0)
          .map(([k, r]) => `**${C[k]}** ${r.unite} de ${r.nom.toLowerCase()}`);
        return dit.length
          ? `Sur le tas, à pied d'œuvre : ${dit.join(' · ')}.`
          : "Il n'y a rien sur le tas. Pas un charroi, pas un homme, pas un muid — et il n'y en aura pas tant que quelqu'un, quelque part, ne vous devra pas quelque chose.";
      },
      () => {
        const sources = SOURCES2.filter(s => a(s.flag) || faitCh(s.flag));
        if(!sources.length) return "§ Rien ne monte à Karlsberg. Ce n'est pas une question d'or : personne ne vous doit rien, et une maison ne se relève pas avec de l'argent.";
        const trois = sources.slice(0, 4).map(s => `**${s.quoi}** — ${s.pourquoi}`);
        return "§ Ce qui monte, et pourquoi :\n\n" + trois.join('\n\n');
      },
      () => bientot.length
        ? "Ce qu'on ne peut pas entreprendre, et ce qui manque : "
          + bientot.map(o => {
              const cond = (o.exige || []).find(x => !conditionTenue(x));
              if(cond) return `*${o.nom}* — ${CONDITIONS2[cond].manque}`;
              const [k] = Object.entries(o.cout).find(([kk, n]) => C[kk] < n);
              return `*${o.nom}* — il manque ${o.cout[k] - C[k]} ${RES[k].unite}`;
            }).join(' · ') + "."
        : "",
    ],
    choix: dispo.map(o => ({
      t: o.nom,
      detail: o.dit + " · il y faut "
        + Object.entries(o.cout).map(([k, n]) => `${n} ${RES[k].unite}`).join(', '),
      risque: 'calculé',
      va: 'ka_monte',
      avant: () => { A2().ouvrage = o.id; },
    })).concat([
      { t:"Redescendre",
        detail:"le chantier avance sans vous · c'est même sa qualité principale",
        risque:'prudent', va:'a2_carte' },
    ]),
  };
  aller('ka_chantier');
};

/* Un ouvrage monté : on paie, on écrit une scène, et on regarde si l'endroit
 * a changé de nom. */
DYN.ka_monte = () => {
  const C = CHANTIER(), o = OUV(A2().ouvrage);
  const avant = palierDeKarlsberg().id;
  for(const [k, n] of Object.entries(o.cout)) C[k] -= n;
  C.faits.push(o.id);
  ETAT.flags.add(o.id);
  const apres = palierDeKarlsberg();
  A2().palierNeuf = (apres.id !== avant) ? apres.id : null;
  aller('ka_' + o.id);
};

const CH_SCENES = {

ka_chantier:{ dyn:true, texte:[], suite:'a2_carte' },
ka_monte:{ dyn:true, texte:[], suite:'ka_suite' },

/* Après chaque ouvrage : soit l'endroit a changé de nom, soit on retourne au
 * tas. C'est le seul endroit du jeu où un palier s'annonce. */
ka_suite:{ dyn:true, texte:[], suite:'ka_chantier' },

ka_ch_cour:{
  lieu:"Karlsberg · la cour",
  titre:"Quatre hommes et une serpe",
  texte:[
    { sobre:"On dégage la cour en dix-neuf jours.",
      intense:"Dégager une cour de vingt ans de ronces prend dix-neuf jours à quatre hommes, et le neuvième on comprend pourquoi personne ne l'avait fait : sous les ronces il y a ce que les ronces cachaient.",
      extreme:"Dégager une cour de vingt ans de ronces prend dix-neuf jours à quatre hommes armés de serpes, et personne n'en parle jamais dans les chansons parce qu'il n'y a rien à en dire. Le neuvième jour on comprend pourquoi personne ne l'avait fait avant : sous les ronces il y a exactement ce que les ronces étaient là pour cacher, et il faut le sortir à la main." },
    "Deux charrettes brûlées, réduites aux ferrures. Un mur d'écurie effondré vers l'intérieur. Le puits comblé jusqu'à trois pieds du bord.",
    "§ Et onze squelettes, qu'on ne peut identifier ni compter correctement parce qu'ils ont été jetés ensemble.",
    "On les met dans la crypte, avec les statues sans visage, et le plus vieux des quatre hommes dit quatre mots dessus parce qu'il connaît les mots.",
    "Le vingtième jour, la cour est praticable. Une charrette peut entrer, tourner et ressortir.",
    { sobre:"C'est très peu et c'est tout ce qui compte.",
      intense:"C'est très peu. C'est aussi la seule chose qui rende possible tout le reste : on ne monte rien là où une charrette ne peut pas tourner.",
      extreme:"C'est très peu, et c'est très exactement ce qui rend tout le reste possible. On ne bâtit rien là où une charrette ne peut pas entrer, tourner et ressortir chargée. Toutes les grandes maisons de ces provinces ont commencé par une cour où une charrette pouvait tourner, et aucune ne s'en souvient." },
    "§ Trois semaines plus tard, deux hommes s'arrêtent en passant et demandent s'il y a du travail.",
  ],
  effets:{ marque:"La cour de Karlsberg est dégagée. Onze squelettes remis à la crypte. Deux hommes se sont arrêtés.",
           court:"La cour" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_salle:{
  lieu:"Karlsberg · la salle basse",
  titre:"Un toit",
  texte:[
    "La salle basse a quarante pieds de long, des murs de six pieds d'épaisseur, et depuis vingt ans, le ciel.",
    { sobre:"On remet une couverture. Ça prend une saison.",
      intense:"Remettre une couverture demande de la charpente, et la charpente demande des arbres, et les arbres de la vallée ont été coupés par ceux qui ont brûlé la maison — pour la brûler. On va chercher le bois à quatre lieues.",
      extreme:"Remettre une couverture demande de la charpente, la charpente demande des arbres, et les arbres de cette vallée ont été coupés il y a vingt ans par les hommes qui ont brûlé la maison, précisément pour la brûler. Il n'y a plus une futaie à moins de quatre lieues. On va donc chercher le bois à quatre lieues, à la charrette, un voyage tous les deux jours, pendant onze semaines." },
    "Le jour où la dernière panne est posée, il pleut. C'est involontaire et personne n'oublie.",
    "§ Onze personnes dorment au sec cette nuit-là, sous un toit de Karlsberg, pour la première fois depuis la Purge.",
    "Personne ne dit rien de solennel. Quelqu'un fait cuire quelque chose. On se couche tôt parce qu'on travaille tôt.",
  ],
  effets:{ flags:['a2_karlsberg_habitable'],
           exploit:{ eclat:4, temoins:'quelques', quoi:"on dort au sec à Karlsberg" },
           marque:"Un toit sur la salle basse. Onze personnes y ont dormi au sec, et il pleuvait.",
           court:"Le toit" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_puits:{
  lieu:"Karlsberg · le puits",
  titre:"Ce qu'ils ont mis dedans",
  texte:[
    "Un puits comblé se recreuse. C'est un travail lent, dangereux, et qu'on ne peut pas faire faire par n'importe qui : il faut quelqu'un qui accepte de descendre.",
    { sobre:"Il faut sortir ce qu'ils y ont jeté.",
      intense:"Il faut sortir, seau par seau, ce qu'ils y ont jeté la nuit-là pour que la maison ne puisse pas se réinstaller. Trois pieds de terre, puis autre chose, puis encore de la terre.",
      extreme:"Il faut sortir, seau par seau, à la remonte, ce qu'ils y ont jeté cette nuit-là — non par cruauté, mais par méthode : on comble le puits d'une maison rasée pour qu'aucune famille ne puisse s'y réinstaller. Trois pieds de terre battue. Puis autre chose, sur quatre pieds. Puis encore de la terre par-dessus, tassée." },
    "L'homme qui descend s'appelle Rémi et il a fait ça toute sa vie, dans des puits ordinaires, pour des raisons ordinaires.",
    "Il remonte au bout de deux jours et il dit : « Il vous faudra un prêtre, ou quelqu'un qui fasse l'affaire. »",
    "§ Onze pieds plus bas, l'eau revient en une nuit. Elle est bonne. Elle l'a toujours été : c'est pour ça qu'on avait bâti là.",
    { sobre:"Karlsberg a de l'eau.",
      intense:"Karlsberg a de l'eau à elle. C'est la différence exacte entre un endroit qu'on tient trois jours et un endroit qu'on tient un hiver.",
      extreme:"Karlsberg a de l'eau à elle, dans ses murs, qui ne dépend de personne. C'est très précisément la différence entre un endroit qu'on tient trois jours et un endroit qu'on tient un hiver — et tous ceux qui ont fait la guerre le savent, ce qui veut dire que Mont-Draken et Fort-aux-Princes le sauront avant la fin de la saison." },
  ],
  effets:{ flags:['a2_karlsberg_eau'], suspicion:6,
           marque:"Le puits est rouvert. L'eau est revenue en une nuit ; elle a toujours été bonne.",
           court:"L'eau" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_enceinte:{
  lieu:"Karlsberg · l'enceinte basse",
  titre:"Sept pieds",
  texte:[
    "Sept pieds, pas douze. Il faut le dire tout de suite, parce que la différence est toute la question.",
    { sobre:"Sept pieds arrêtent les gens. Douze arrêtent une armée.",
      intense:"Sept pieds arrêtent ceux qui passent : les bandes de six, les rôdeurs, ceux qui testent. Douze pieds arrêtent une compagnie. Ce n'est pas une question de degré, c'est une question de nature — et de déclaration.",
      extreme:"Sept pieds arrêtent ceux qui passent : les bandes de six hommes, les rôdeurs d'hiver, ceux qui viennent voir si l'endroit est gardé. Douze pieds arrêtent une compagnie et obligent à un siège. Ce n'est pas une différence de degré, c'est une différence de nature — et surtout de déclaration. Sept pieds disent *nous sommes des gens qui se gardent*. Douze disent *nous sommes une place*, et une place, ça se prend." },
    "L'enceinte basse fait quatre cent dix pieds de développement, avec une porte charretière et une poterne.",
    "§ On la monte en une saison, à dix-huit, et le mur est droit parce que quelqu'un ici sait monter un mur droit.",
    "Le jour où la porte est posée, elle ferme. Simplement : elle ferme. Elle a un vantail, des gonds et une barre, et on peut la barrer de l'intérieur.",
    "Le soir, quelqu'un la barre pour voir. Puis la débarre. Puis, vers minuit, la rebarre et laisse comme ça.",
  ],
  effets:{ flags:['a2_karlsberg_close'], suspicion:8,
           exploit:{ eclat:7, temoins:'quelques', quoi:"Karlsberg a une porte qui ferme" },
           marque:"Quatre cent dix pieds d'enceinte basse, une porte charretière, une poterne. Quelqu'un l'a barrée à minuit et l'a laissée barrée.",
           court:"Sept pieds" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_forge:{
  lieu:"Karlsberg · la forge",
  titre:"On ne rallume pas une forge pour rien",
  texte:[
    "La forge de Karlsberg a été éteinte un mardi de Germinal, il y a vingt ans, parce que le forgeron est sorti dans la cour voir ce qui se passait.",
    { sobre:"Le foyer est intact. Ils n'ont pas pensé à le casser.",
      intense:"Le foyer est intact : ils ont brûlé, tué, comblé le puits, mais personne n'a pensé à casser un foyer de forge — c'est une masse de pierre réfractaire, ça ne brûle pas, ça n'a l'air de rien.",
      extreme:"Le foyer est intact. Ils ont brûlé la charpente, tué quatorze personnes, comblé le puits avec méthode et jeté les corps ensemble, mais personne n'a pensé à casser le foyer de la forge. C'est une masse de pierre réfractaire de quatre pieds sur trois : ça ne brûle pas, ça ne se pille pas, ça n'a l'air de rien du tout. Il a fallu vingt ans et un balai." },
    "Il faut un soufflet, une enclume, du charbon et un homme.",
    "L'homme arrive de lui-même : un maréchal de la Route Grise, quarante ans, qui a entendu dire qu'il y avait une forge froide dans les Marches et un endroit où on ne demande pas d'où l'on vient.",
    "§ Une maison qui a une forge répare ses outils, ferre ses bêtes, et ne dépend plus d'un bourg à sept lieues pour un essieu cassé.",
    "Ce n'est pas romanesque. C'est le jour où Karlsberg cesse d'être un chantier pour devenir un endroit qui fonctionne.",
  ],
  effets:{ flags:['a2_karlsberg_forge'],
           marque:"La forge est rallumée. Un maréchal de la Route Grise est venu de lui-même.",
           court:"La forge" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_refuge:{
  lieu:"Karlsberg · le corps de logis",
  titre:"Trente lits",
  texte:[
    "Trente lits, un réfectoire, deux âtres, et une règle écrite au charbon sur une planche à l'entrée parce que personne n'a de peinture.",
    "§ **On ne demande pas d'où l'on vient.**",
    { sobre:"C'est une phrase dangereuse et tout le monde le sait.",
      intense:"C'est une phrase dangereuse. C'est aussi, mot pour mot, la proclamation d'Anarion, et vous n'y aviez pas pensé en l'écrivant — quelqu'un vous le fait remarquer au bout de trois semaines.",
      extreme:"C'est une phrase dangereuse et tout le monde ici le sait. C'est aussi, à trois mots près, la proclamation qu'Anarion a fait afficher sur le mur du poste de Vaeth. Vous n'y aviez pas pensé en l'écrivant. Quelqu'un vous le fait remarquer au bout de trois semaines, sans méchanceté, et vous laissez la planche parce que la retirer serait pire que de l'avoir mise." },
    "Les trente lits sont pleins en quatre mois. Pas de Parias — enfin, pas seulement : des veuves de la marche, deux familles de hameaux vidés, un ancien clerc, trois vieux, un déserteur qui ne dit pas de quelle compagnie.",
    "§ Vous n'avez pas fondé une garnison. Vous avez fondé un endroit où l'on arrive.",
    "Et un endroit où l'on arrive, dans ces provinces-là, ça se signale au bailliage.",
  ],
  effets:{ flags:['a2_refuge_ouvert'], suspicion:10,
           exploit:{ eclat:8, temoins:'province', quoi:"trente lits et une règle affichée à Karlsberg" },
           marque:"Trente lits, pleins en quatre mois. « On ne demande pas d'où l'on vient » — à trois mots de la proclamation d'Anarion.",
           court:"Trente lits" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_chapelle:{
  lieu:"Karlsberg · la chapelle",
  titre:"Trente-quatre visages",
  texte:[
    "Il y a trente-quatre statues sans visage dans la crypte de Karlsberg, et depuis vingt ans il n'y a plus rien au-dessus d'elles qu'un plancher effondré et du ciel.",
    { sobre:"On relève la chapelle. Neuf semaines.",
      intense:"On relève la chapelle en neuf semaines. C'est le seul ouvrage du chantier qui ne défende rien, ne nourrisse personne et ne rapporte pas un sou, et c'est celui pour lequel les gens viennent travailler le dimanche.",
      extreme:"On relève la chapelle en neuf semaines. C'est le seul ouvrage de tout le chantier qui ne défend rien, ne nourrit personne, ne produit rien et ne rapportera jamais un sou. C'est aussi, sans exception, celui pour lequel les gens viennent travailler le dimanche sans qu'on le leur demande, et il n'y a aucune explication rationnelle à ça — ni vous ni eux n'essaient d'en donner une." },
    "Un tailleur de pierre propose de rendre leur visage aux trente-quatre.",
    "« On ne sait pas à quoi ils ressemblaient. »",
    "« Non », dit-il. « Mais on sait qu'ils en avaient un. »",
    "§ Il en fait quatre. Puis il s'arrête, et il dit que ce n'est pas bien, et il a raison — les quatre visages sont des visages, mais ce ne sont pas leurs visages.",
    "On laisse les quatre. Les trente autres restent lisses. C'est plus honnête et c'est infiniment plus dur à regarder.",
  ],
  effets:{ flags:['a2_chapelle'],
           exploit:{ eclat:5, temoins:'quelques', quoi:"la chapelle de Karlsberg est relevée" },
           marque:"La chapelle est relevée. Quatre statues sur trente-quatre ont un visage, et ce ne sont pas les leurs.",
           court:"Quatre visages" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_donjon:{
  lieu:"Karlsberg · le donjon",
  titre:"Quatre étages sur une base qui a tenu",
  texte:[
    "La base du donjon a tenu la Purge. Ils ont brûlé ce qu'il y avait dedans, fait tomber les planchers et l'ont laissée : on ne démolit pas quarante pieds de maçonnerie en une nuit avec quarante hommes.",
    { sobre:"On remonte quatre étages dessus.",
      intense:"On remonte quatre étages dessus, en dix-huit mois, et ce sont les dix-huit mois pendant lesquels la province apprend que Karlsberg existe.",
      extreme:"On remonte quatre étages dessus. Dix-huit mois de chantier, une trentaine d'hommes, un maître d'œuvre qui compte ses assises à voix basse, et surtout : dix-huit mois pendant lesquels on voit monter quelque chose de très loin. Un donjon, c'est fait pour être vu. C'est même sa fonction principale — on y dort mal, on y a froid, et il sert avant tout à dire à onze lieues à la ronde qu'il y a quelqu'un ici." },
    "§ Le jour où le faîte est posé, on compte onze cavaliers sur la crête ouest, immobiles, à trop grande distance pour qu'on lise leurs couleurs.",
    "Ils regardent pendant une heure. Puis ils repartent vers le sud, sans être descendus, sans avoir parlé à personne.",
    "Le maître d'œuvre les regarde partir et dit : « Voilà. Maintenant c'est fait. »",
    "@« Quoi ? »",
    { sobre:"« Vous existez. »",
      intense:"« Vous existez », dit-il. « Avant, vous étiez une rumeur avec des murs. Maintenant vous êtes une adresse sur une carte d'état-major, et ces onze-là vont la reporter. »",
      extreme:"« Vous existez », dit-il, sans lever les yeux de son fil à plomb. « Avant aujourd'hui, vous étiez une rumeur avec des murs bas — désagréable, pas grave. Maintenant vous êtes un point sur une carte d'état-major, avec une hauteur estimée, un développement d'enceinte et un effectif supposé. Ces onze-là sont venus prendre les mesures, et ils les ont prises. Tout ce qui vous arrivera à partir de maintenant vous arrivera parce que ce donjon est là. »" },
  ],
  effets:{ flags:['a2_donjon','a2_garnison'], suspicion:22,
           exploit:{ eclat:18, temoins:'province', quoi:"le donjon de Karlsberg est remonté" },
           faire:() => { retenir('caleb', "il a monté un donjon, ce qui fait de lui une place et non plus un homme");
                         retenir('charles', "Karlsberg a un donjon et une garnison"); },
           marque:"Le donjon est remonté. Onze cavaliers sont venus prendre les mesures et sont repartis sans descendre.",
           court:"Le donjon" },
  plusTard:"Onze cavaliers ont reporté vos mesures sur une carte d'état-major. Ce qui vous arrivera désormais vous arrivera à cause de ça.",
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_bourg:{
  lieu:"Karlsberg · au pied des murs",
  titre:"On ne bâtit pas un bourg",
  texte:[
    "On ne bâtit pas un bourg. On cesse de l'empêcher.",
    { sobre:"Deux rues, un registre, et on laisse faire.",
      intense:"On trace deux rues à la corde pour que ça ne pousse pas n'importe comment, on tient un registre des feux, on fixe le jour du marché — et pour le reste on laisse faire, parce qu'un bourg qu'on organise n'est pas un bourg, c'est un camp.",
      extreme:"On trace deux rues à la corde, parce qu'un bourg qui pousse n'importe comment brûle en entier au premier feu de cheminée. On tient un registre des feux, on fixe le jour du marché au mardi, on désigne quelqu'un pour les litiges. Et pour tout le reste, on laisse faire — parce qu'un bourg qu'on organise n'est pas un bourg, c'est un camp, et les gens le sentent en trois semaines et s'en vont." },
    "La première année : quatorze feux. La deuxième : trente et un. Un four à pain, deux ateliers, une femme qui vend de la bière et n'a pas demandé la permission.",
    "§ Le mardi, il y a marché. On y vient de trois vallées, y compris de vallées qui ne relèvent pas de vous, ce qui est la définition administrative d'un problème.",
    "Un enfant naît au bourg de Karlsberg en Fructidor. C'est le premier depuis la Purge, et il n'est même pas de votre sang.",
    "Le père vient vous le dire quand même. Il ne sait pas trop pourquoi ; vous ne savez pas trop quoi répondre ; c'est très gênant pour tout le monde et ça compte plus que le donjon.",
  ],
  effets:{ flags:['a2_bourg','a2_peage'], suspicion:12,
           exploit:{ eclat:12, temoins:'province', quoi:"il y a un marché le mardi au pied de Karlsberg" },
           marque:"Trente et un feux au pied des murs. Un enfant y est né en Fructidor — le premier depuis la Purge.",
           court:"Le bourg" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_muraille:{
  lieu:"Karlsberg · la muraille",
  titre:"Douze pieds",
  texte:[
    "Douze pieds d'élévation, huit d'épaisseur à la base, deux tours de flanquement et un chemin de ronde continu.",
    { sobre:"Ce n'est plus une maison qui se garde. C'est une place.",
      intense:"À partir d'ici, Karlsberg ne se garde plus : elle se prend, ou elle ne se prend pas. Il n'y a plus de version où quelqu'un passe et regarde.",
      extreme:"À partir d'ici, Karlsberg ne se garde plus. Elle se prend ou elle ne se prend pas, et la prendre demande une armée, un train de siège, du temps et une raison qu'on puisse écrire dans une lettre. Il n'y a plus de version de l'histoire où quelqu'un passe, regarde, et décide. Vous venez de retirer à toute la province la possibilité de vous ignorer." },
    "Le chantier dure deux ans et il emploie, au plus fort, cent quarante personnes.",
    "§ Pendant ces deux ans, trois choses arrivent, et aucune n'est une bataille.",
    "**Une.** Le bailliage de Chastel envoie un commissaire vérifier votre droit d'élever une fortification. Il repart avec une copie de l'acte de relèvement et une lettre polie. C'est la dernière fois qu'on vous traite par le papier.",
    "**Deux.** Deux maisons de la Route Grise cessent de vous écrire. Pas de rupture, pas de mot : elles cessent, simplement, comme on retire sa main d'un feu.",
    "**Trois.** Quelqu'un vous propose de l'argent pour ne pas finir le mur. La somme est très élevée et l'émissaire ne dit pas de qui il vient.",
    "Le jour où la dernière assise est posée, on monte au chemin de ronde et on voit la vallée entière, la crête ouest, la route de poste, et à onze lieues, par temps clair, la fumée de Chastel.",
    "Ce qui veut dire que de Chastel, par temps clair, on voit Karlsberg.",
  ],
  effets:{ flags:['a2_muraille'], suspicion:30,
           exploit:{ eclat:26, temoins:'province', quoi:"douze pieds de muraille aux Marches Grises" },
           faire:() => { retenir('caleb', "il a une muraille de douze pieds, et je n'en ai pas");
                         retenir('lucius', "il y a une place forte neuve dans les Marches et elle n'est à personne");
                         retenir('charles', "une maison de Parias a une muraille"); },
           marque:"Douze pieds, deux tours, un chemin de ronde. De Chastel, par temps clair, on voit Karlsberg.",
           court:"Douze pieds" },
  plusTard:"On vous a offert de l'argent pour ne pas finir le mur, et l'émissaire n'a pas dit de qui il venait.",
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_ch_pierre:{
  lieu:"Karlsberg · l'angle sud-est",
  titre:"La pierre",
  texte:[
    "Une pierre de fondation ne défend rien, ne nourrit personne, ne porte aucune charge. C'est un bloc scellé dans un angle, avec une date et un nom dessus.",
    { sobre:"C'est le dernier ouvrage et c'est le seul qui soit une déclaration.",
      intense:"C'est le dernier ouvrage du chantier et c'est le seul qui ne soit rien d'autre qu'une déclaration. Tout le reste avait une fonction. Celle-ci dit une chose et une seule : *nous étions là, nous y sommes revenus*.",
      extreme:"C'est le dernier ouvrage du chantier et le seul qui ne serve strictement à rien. Tout le reste avait une fonction défendable devant n'importe quel intendant : un toit abrite, un puits abreuve, un mur arrête. Celle-ci dit une chose et une seule, à qui passera dans deux cents ans : *nous étions là, on nous a rayés, nous y sommes revenus, et voici la date des deux*." },
    "Le tailleur demande ce qu'il faut graver.",
    "§ Il y a la place pour trois lignes.",
  ],
  choix:[
    { t:"*Karlsberg. Rasée la 143ᵉ année. Relevée la 148ᵉ.*",
      detail:"les deux dates · rien d'autre · que celui qui lira compte lui-même",
      risque:"définitif", definitif:true, va:'ka_pierre_dates' },
    { t:"Les quatorze noms",
      detail:"ceux de la nuit · on en connaît onze, il en manque trois",
      risque:"définitif", definitif:true, va:'ka_pierre_noms' },
    { t:"*On ne demande pas d'où l'on vient.*",
      detail:"la planche du corps de logis, gravée dans la pierre · et ce qu'elle déclare",
      risque:"définitif", definitif:true, va:'ka_pierre_regle' },
  ],
},

ka_pierre_dates:{
  titre:"Deux dates",
  texte:[
    "*Karlsberg. Rasée la cent-quarante-troisième année. Relevée la cent-quarante-huitième.*",
    { sobre:"Cinq ans entre les deux lignes.",
      intense:"Cinq ans entre les deux lignes, et vingt entre la première et le moment où quelqu'un a décidé qu'il y en aurait une deuxième.",
      extreme:"Cinq ans entre les deux lignes. Vingt entre la première et le moment où quelqu'un a décidé qu'il y en aurait une deuxième. Celui qui lira ça dans deux cents ans ne saura rien de ces vingt ans, ne saura pas qu'un enfant de neuf ans est mort dans cette cour avec une épée de bois, et fera exactement le calcul que vous venez de faire : cinq ans. C'est bien. C'est ce qu'une pierre doit faire." },
    "§ Rien sur qui l'a rasée. Rien sur pourquoi. Deux dates et un nom.",
    "C'est le contraire d'un acte d'accusation, et c'est pour ça que c'est insupportable à ceux qui l'ont fait.",
  ],
  effets:{ flags:['a2_pierre','a2_pierre_dates'],
           exploit:{ eclat:14, temoins:'province', quoi:"deux dates dans l'angle sud-est de Karlsberg" },
           marque:"« Karlsberg. Rasée la 143ᵉ année. Relevée la 148ᵉ. » Rien d'autre.",
           court:"Deux dates" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_pierre_noms:{
  titre:"Onze sur quatorze",
  texte:[
    "On connaît onze noms sur quatorze.",
    { sobre:"Les trois autres, personne ne les a jamais su.",
      intense:"Les trois derniers, personne ne les a jamais sus : des gens de passage, un valet loué à la semaine, quelqu'un qui dormait à l'écurie. Une maison rasée emporte aussi ceux qui n'y étaient que pour la nuit.",
      extreme:"Les trois derniers, personne ne les a jamais sus et personne ne les saura. Une maison rasée emporte avec elle ceux qui n'y étaient que pour une nuit : un valet loué à la semaine, un colporteur qu'on avait laissé coucher à l'écurie, quelqu'un dont on ne se souvient que parce qu'on a compté quatorze corps et onze noms. Ils n'ont pas de descendants pour les réclamer. Ils n'ont que cette pierre." },
    "Le tailleur grave les onze, puis trois lignes vides de la même longueur.",
    "« Vous êtes sûr ? » demande-t-il devant les vides.",
    "« Oui. »",
    "§ Les trois lignes vides sont ce que les gens regardent. Toujours. Pas les onze noms : les trois vides.",
    "Loys de Karlsberg, neuf ans, est le quatrième de la liste, à sa place, sans mention particulière — parce que les autres n'en ont pas non plus.",
  ],
  effets:{ flags:['a2_pierre','a2_pierre_noms'],
           exploit:{ eclat:16, temoins:'province', quoi:"onze noms et trois lignes vides" },
           marque:"Onze noms gravés, trois lignes laissées vides. Ce sont les vides que les gens regardent.",
           court:"Trois lignes vides" },
  suite:'ka_suite', libelleSuite:"Le chantier" },

ka_pierre_regle:{
  titre:"La règle dans la pierre",
  texte:[
    "*On ne demande pas d'où l'on vient.*",
    { sobre:"Ce n'est plus une planche au charbon. C'est un acte.",
      intense:"Écrite au charbon sur une planche, c'était une commodité de refuge. Gravée dans la pierre de fondation d'une place forte, c'est une politique — et toute la province va la lire comme telle.",
      extreme:"Écrite au charbon sur une planche à l'entrée d'un corps de logis, c'était une commodité : on n'a pas le temps d'interroger trente personnes par hiver. Gravée dans la pierre de fondation d'une place forte à douze pieds de muraille, à onze lieues d'un bailliage, c'est une politique déclarée. Et il n'y a pas une maison, pas un commissaire aux titres, pas un chasseur de Parias dans quatre provinces qui la lira autrement." },
    "§ Vous venez d'écrire dans la pierre ce qu'Anarion a fait afficher sur un mur de bois à Vaeth.",
    "La différence — et elle est énorme, et elle vous coûtera — c'est que lui l'a fait à quatre cents lieues, derrière une armée, et vous à onze lieues de Chastel.",
    "Le tailleur pose son ciseau.",
    "« Vous savez ce que ça dit, messire ? »",
    "« Je sais. »",
    "« Non », dit-il. « Ça dit : *venez*. »",
  ],
  effets:{ flags:['a2_pierre','a2_pierre_regle','a2_asile_declare'], suspicion:20,
           exploit:{ eclat:20, temoins:'province', quoi:"un asile déclaré dans la pierre, à onze lieues de Chastel" },
           faire:() => { retenir('charles', "il a gravé dans la pierre qu'il ne demande pas d'où l'on vient");
                         retenir('anarion', "il a écrit ma phrase dans sa propre fondation"); },
           marque:"« On ne demande pas d'où l'on vient », gravé dans la fondation. « Ça dit : venez. »",
           court:"Venez" },
  plusTard:"Vous avez déclaré un asile à onze lieues d'un bailliage. Ils viendront, et d'autres aussi.",
  suite:'ka_suite', libelleSuite:"Le chantier" },

};

enregistrerScenes(CH_SCENES);

/* ── Le franchissement d'un palier ─────────────────────────────────────────
 * Le seul endroit du jeu qui annonce quelque chose. Encore ne dit-il qu'un
 * nom et une phrase : l'endroit a changé de nature, pas de score. */
DYN.ka_suite = () => {
  const n = A2().palierNeuf;
  if(!n) return aller('ka_chantier');
  A2().palierNeuf = null;
  const p = PALIERS2.find(x => x.id === n);
  /* Recomposée à chaque franchissement par `ka_suite` : pas de `dyn` ici,
   * sinon l'aiguillage se chercherait lui-même et la scène serait muette. */
  SCENES.ka_palier = {
    lieu:`Karlsberg · ${dateA2()}`,
    titre:p.nom,
    texte:[
      "Personne ne l'annonce. Il n'y a pas de jour où l'on décide qu'un endroit a changé de nom : il y a un jour où quelqu'un de passage l'appelle autrement, et où personne ne le corrige.",
      `§ On dit désormais **${p.nom.toLowerCase()}**.`,
      p.dit,
      PALIER_DIT[p.id] || "",
    ],
    effets:{ flags:['a2_palier_' + p.id],
             marque:`Karlsberg est ${p.nom.toLowerCase()}. ${p.dit}`,
             court:p.nom },
    suite:'ka_chantier', libelleSuite:"Le chantier",
  };
  aller('ka_palier');
};

const PALIER_DIT = {
  refuge:"Ce n'est pas une maison relevée. C'est un endroit sec dans une région qui n'en a plus beaucoup, et c'est déjà une nouvelle qui voyage.",
  fort:"Un fort n'appartient à personne dans le droit de la province : c'est un fait, pas un titre. On peut donc vous le contester sans vous attaquer, ce qui est exactement ce qui va se produire.",
  chateau:"Un château a une valeur, et tout ce qui a une valeur figure dans un état des lieux quelque part. Vous venez d'entrer dans les colonnes de trois maisons.",
  domaine:"Un domaine se compte en feux, pas en pierres. Vous êtes désormais responsable de gens qui n'ont rien demandé et qui mourront si ça tourne mal.",
  puissance:"Une puissance régionale ne se laisse pas ignorer, ne se laisse pas prendre en passant, et n'a plus le droit de rester neutre. Vous ne le savez pas encore, mais vous venez de perdre la neutralité.",
};

entree2('ka_palier', ...OUVRAGES.map(o => 'ka_' + o.id));

/* Le chantier s'ouvre dès qu'il y a quelque chose à Karlsberg, et pas avant. */
offrir({ id:'ka_chantier', lieu:'karlsberg', va:'ka_chantier',
         titre:"Le chantier", permanent:true,
         si:() => a('kar_refuge') || a('a2_bannieres') || CHANTIER().faits.length > 0 });
