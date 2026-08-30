/* PARIAS — Acte II · la boucle
 * ═══════════════════════════════════════════════════════════════════════
 *   carte → déplacement → ce qu'il y a là → la saison passe →
 *   les neuf agissent → les crises avancent → carte
 *
 * Une saison par déplacement. Douze saisons en tout. Être quelque part,
 * c'est ne pas être ailleurs, et ils le remarquent.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Les arcs s'inscrivent ici. Chacun dit où il se trouve, quand il s'ouvre,
 * et ce qu'on lit sur la carte avant d'y aller. */
const OFFRES = [];
const offrir = o => OFFRES.push(o);

/* Certaines scènes ne sont la cible d'aucun `va:` : c'est un aiguillage qui
 * les choisit — une étape d'ouvrage, un palier, celle des deux femmes à qui
 * l'on parle. Elles s'inscrivent ici pour que l'épreuve d'acceptation sache
 * qu'elles ne sont pas orphelines. */
const ENTREES2 = [];
const entree2 = (...ids) => ENTREES2.push(...ids);

/* Une affaire commencée s'inscrit et ne se repropose pas. Un chantier, si :
 * ce n'est pas une affaire, c'est un endroit où l'on revient tant qu'il
 * reste quelque chose à monter. */
const offresDe = ou => OFFRES.filter(o => o.lieu === ou && (!o.si || o.si())
                                       && (o.permanent || !a('fait_' + o.id)));
const marquerOffre = o => { if(!o.permanent) ETAT.flags.add('fait_' + o.id); };

/* ── Les crises, poussées par l'état du monde ────────────────────────────── */
const CRISES = {
  elfes:   { nom:"La guerre d'Eltharion et d'Anarion", etapes:[
    "Deux cours qui ne se parlent plus", "Les premières colonnes franchissent la marche",
    "La ligne du fleuve tient un hiver", "Aelthiriel rappelle ses maisons du sud",
    "La guerre est ouverte et elle ne se refermera pas" ] },
  astrah:  { nom:"Les ambitions de Lucius", etapes:[
    "Un homme compte des soutiens", "Trois maisons du sud signent",
    "La couronne d'Astrah sort du coffre", "On lève des hommes sous un nom mort",
    "Astrah a un roi et personne ne l'a couronné" ] },
  khesh:   { nom:"L'unification khesh", etapes:[
    "Douze feux dans le désert", "Neuf feux", "Cinq feux",
    "Un seul feu et un serment", "Le désert bouge vers le nord" ] },
  kardurak:{ nom:"La guerre de Kar-Durak", etapes:[
    "Deux portes fermées", "Quatre portes tombées", "La galerie haute est perdue",
    "On évacue les forges du milieu", "Kar-Durak tient sur trois portes et ne tiendra pas" ] },
  hordes:  { nom:"La Horde Homme-Bête", etapes:[
    "Des troupeaux qui manquent", "Trois hameaux de la marche vidés",
    "Les mères se regroupent au nord", "Une colonne de six mille descend",
    "La marche humaine n'a plus de frontière" ] },
};

const crise = id => (A2().crises[id] = A2().crises[id] || 0);

/* Une crise et un acteur « courants » : l'aiguillage de fin de saison les
 * pose avant d'entrer. Le défaut n'existe que pour qu'une scène rendue hors
 * de sa boucle — une épreuve, un rechargement — ne parle pas dans le vide. */
const criseCourante = () => (A2().crise = A2().crise || { id:'elfes', n:0 });
const acteurCourant = () => (A2().quiAgit = A2().quiAgit || 'alycia');

/* Ce qui pousse une crise n'est jamais un dé : c'est l'état de la partie. */
function pousserCrises(){
  const A = A2(), bouges = [];
  const p = {
    elfes:    (a('a2_tyrion_dur') ? 2 : 0) + (a('a2_anarion_soutenu') ? 1 : 0) + (a('a2_onde_rendue') ? -1 : 0) + 1,
    astrah:   (a('a2_lucius_aide') ? 2 : 0) + (a('a2_lucius_refuse') ? -1 : 0) + (A.bannieres ? 1 : 0) + 1,
    khesh:    (a('a2_khesh_serment') ? 2 : 0) + (a('a2_khesh_gene') ? -1 : 0) + 1,
    kardurak: (a('a2_kardurak_aide') ? -2 : 0) + 1,
    hordes:   (a('a2_hordes_gene') ? -1 : 0) + (a('a2_montdraken_occupe') ? 1 : 0) + 1,
  };
  for(const [id, force] of Object.entries(p)){
    A.crises[id] = (A.crises[id] || 0) + Math.max(0, force) / 3;
    const n = Math.min(4, Math.floor(A.crises[id]));
    const vu = 'crise_' + id + '_' + n;
    if(n > 0 && !a(vu)){ ETAT.flags.add(vu); bouges.push({ id, n }); }
  }
  return bouges;
}

/* ── Les neuf agissent ─────────────────────────────────────────────────────
 * Au plus deux par saison, et ce sont les plus décidés — jamais les plus
 * chanceux. Le poids se lit dans l'état du monde. */
function poidsDe(id){
  const A = A2();
  switch(id){
    case 'charles':   return (ETAT.suspicion / 12) + (A.bannieres ? 4 : 0) + (a('a2_onde_publique') ? 4 : 0);
    case 'lucius':    return (ETAT.renom / 30) + (A.bannieres ? 3 : 0) + (a('a2_lucius_vu') ? 2 : 0);
    case 'caleb':     return (A.bannieres ? 4 : 0) + (a('a2_caleb_vu') ? 2 : 0) + (ETAT.renom / 40);
    case 'alycia':    return 2 + (lien('alycia').relation / 2) + (a('a2_reseau_su') ? 3 : 0);
    case 'alarielle': return (lien('alarielle').relation / 3) + (A2().pistes.onde * 1.5);
    case 'tyrion':    return (a('a2_alarielle_scandale') ? 4 : 0) + crise('elfes');
    case 'anarion':   return crise('elfes') * 1.2 + (a('a2_anarion_vu') ? 2 : 0);
    case 'eltharion': return crise('elfes') + (a('a2_eltharion_vu') ? 2 : 0);
    case 'khalvaene': return crise('khesh') * 1.4;
  }
  return 0;
}

function quiAgit(){
  const A = A2();
  const libre = id => !a('acte_' + id + '_' + A.annee + '_' + A.saison);
  const loin = Object.keys(NEUF).filter(id => id !== 'alycia')
    .map(id => ({ id, p:poidsDe(id) }))
    .filter(x => x.p >= 3 && libre(x.id))
    .sort((x, y) => y.p - x.p)
    .slice(0, 2);
  /* Alycia n'est pas dans le même compte que les huit autres : eux agissent
   * à cent lieues et on l'apprend par un tiers, elle est là. Elle ne prend
   * donc pas une des deux places — elle passe devant. */
  return (poidsDe('alycia') >= 3 && libre('alycia'))
    ? [{ id:'alycia', p:poidsDe('alycia') }].concat(loin)
    : loin;
}

/* ── La carte ──────────────────────────────────────────────────────────── */
DYN.a2_carte = () => {
  const A = A2();
  /* Un arc rend la main à la carte, pas à la fin de saison : c'est ici qu'on
   * solde ce qui a bougé pendant qu'on était occupé ailleurs. Sans ça, les
   * crises et les neuf s'empilent sans jamais se raconter. */
  if((A.aPousser || []).length || (A.aAgir || []).length) return aller('a2_saison');
  const ici = LIEUX[A.lieu];
  const reste = 12 - (A.annee * 4 + A.saison);

  SCENES.a2_carte = {
    dyn:true,
    lieu:`${ici.nom} · ${dateA2()}`,
    titre: A.saison === 0 && A.annee === 0 ? "La carte" : "Où aller",
    texte:[
      A.annee === 0 && A.saison === 0
        ? "Il n'y a pas de mur avec des papiers cloués dessus. Personne ne vous engage, personne ne vous paie, et c'est la première fois depuis onze ans que vous décidez d'un déplacement sans qu'on vous l'ait acheté."
        : `Vous êtes à ${ici.nom}. ${ici.note}`,
      `§ Il reste **${reste} saison${reste > 1 ? 's' : ''}**. Ce n'est pas une limite de jeu : c'est le temps qu'il faut à cinq guerres pour arriver à maturité, et elles ont commencé sans vous.`,
      () => {
        const p = A.pistes;
        const dit = [];
        if(p.sang)   dit.push(`**le sang** — ${p.sang}/4`);
        if(p.onde)   dit.push(`**l'Onde** — ${p.onde}/4`);
        if(p.papier) dit.push(`**le papier** — ${p.papier}/4`);
        return dit.length
          ? `Trois pistes mènent au nom de celui qui, dans votre propre maison, a demandé qu'on la raye. Vous en avez ouvert ${dit.length} : ${dit.join(' · ')}.`
          : "Trois pistes mènent au nom. Vous n'en avez ouvert aucune.";
      },
    ],
    choix: Object.entries(LIEUX).map(([id, L]) => {
      const off = offresDe(id);
      const cout = id === A.lieu ? 0 : Math.max(1, Math.abs(L.loin - LIEUX[A.lieu].loin) > 2 ? 2 : 1);
      return {
        id, off, cout,
        t: id === A.lieu ? `Rester à ${L.nom}` : `${L.nom} — ${L.region}`,
        detail: (off.length ? off.map(o => o.titre).join(' · ') : "rien qui vous attende")
                + (cout ? ` · ${cout} saison${cout > 1 ? 's' : ''}` : ''),
        risque: off.length ? undefined : 'prudent',
        va:'a2_aller',
        avant: () => { A.dest = id; A.destCout = cout; },
      };
    }).filter(c => c.off.length || c.id === A.lieu || c.id === 'karlsberg'),
  };
  aller('a2_carte');
};

DYN.a2_aller = () => {
  const A = A2();
  const dest = A.dest, cout = A.destCout || 0;
  A.lieu = dest;
  for(let i = 0; i < Math.max(1, cout); i++) finirSaison();
  aller('a2_ici');
};

/* Arriver quelque part, ce n'est pas entrer dans la première affaire venue.
 * Un lieu peut en avoir deux ou trois, et une affaire commencée s'inscrit —
 * sinon la deuxième n'existerait jamais, cachée derrière la première. */
DYN.a2_ici = () => {
  const A = A2();
  const off = offresDe(A.lieu);
  if(!off.length) return aller('a2_rien');
  if(off.length === 1){ marquerOffre(off[0]); return aller(off[0].va); }

  const ici = LIEUX[A.lieu];
  SCENES.a2_ici = {
    dyn:true,
    lieu:`${ici.nom} · ${dateA2()}`,
    titre:"Ce qu'il y a ici",
    texte:[
      ici.note,
      `Il y a ${off.length === 2 ? 'deux choses' : 'plusieurs choses'} à ${ici.nom} cette saison, et on ne peut pas commencer par les deux en même temps.`,
    ],
    choix: off.map(o => ({
      t:o.titre,
      detail:"cette saison · l'autre attendra",
      va:o.va,
      avant:() => marquerOffre(o),
    })),
  };
  aller('a2_ici');
};

function finirSaison(){
  const A = A2();
  A.saison += 1;
  /* Le chantier de Karlsberg tourne sans vous : ce qu'on vous doit arrive
   * pendant que vous êtes à quatre cents lieues. C'est même tout l'intérêt. */
  if(typeof rendreSaisonChantier === 'function') rendreSaisonChantier();
  if(A.saison > 3){ A.saison = 0; A.annee += 1; }
  A.aPousser = (A.aPousser || []).concat(pousserCrises());
  A.aAgir = quiAgit();
  for(const x of A.aAgir) ETAT.flags.add('acte_' + x.id + '_' + A.annee + '_' + A.saison);
}

/* ── La fin de saison : ce qui a bougé pendant qu'on marchait ───────────── */
DYN.a2_saison = () => {
  const A = A2();
  if(A.annee >= 3) return aller('a2_bascule_fin');
  const p = (A.aPousser || []).shift();
  if(p){ A.crise = p; return aller('a2_crise'); }
  const g = (A.aAgir || []).shift();
  if(g){
    A.quiAgit = g.id;
    return aller(SCENES['acte_' + g.id] ? 'acte_' + g.id : 'a2_acte');
  }
  aller('a2_carte');
};

const BOUCLE2 = {

a2_carte:{ dyn:true, texte:[], suite:'a2_saison' },
a2_aller:{ dyn:true, texte:[], suite:'a2_saison' },
a2_ici:{   dyn:true, texte:[], suite:'a2_rien' },
a2_saison:{ dyn:true, texte:[], suite:'a2_carte' },

a2_rien:{
  titre:"Rien",
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  texte:[
    () => LIEUX[A2().lieu].note,
    { sobre:"Il n'y a rien ici pour vous cette saison.",
      intense:"Il n'y a rien ici pour vous cette saison, et c'est une chose qu'aucun jeu de mercenaire ne dit jamais : on se déplace, on arrive, et il ne se passe rien du tout. Trois mois.",
      extreme:"Il n'y a rien ici cette saison. On se déplace, on arrive, et il ne se passe rien — trois mois de logement payé, de conversations d'auberge et de nouvelles qui viennent d'ailleurs. C'est la vraie texture d'une vie qui cherche quelque chose : la plupart du temps, on est au mauvais endroit." },
    "§ Trois mois de perdus. Il en reste ce qu'il en reste.",
  ],
  suite:'a2_saison', libelleSuite:"La saison passe" },

/* Une crise qui franchit une étape se raconte en une scène courte. Elles
 * avancent qu'on soit là ou non — c'est même le seul point sur lequel le
 * monde de ce jeu ne négocie pas. */
a2_crise:{
  lieu:() => `Ailleurs · ${dateA2()}`,
  titre:() => CRISES[criseCourante().id].nom,
  texte:[
    () => {
      const c = criseCourante();
      return `Ce n'est pas arrivé devant vous. Rien de ce qui compte vraiment n'arrive devant vous : ça arrive pendant qu'on marche, et ça vous rattrape sous forme de nouvelle, à une table d'auberge, par quelqu'un qui raconte mal.`;
    },
    () => {
      const c = criseCourante();
      return `§ **${CRISES[c.id].etapes[c.n]}.**`;
    },
    () => CRISE_TEXTES[criseCourante().id][criseCourante().n] || "",
  ],
  suite:'a2_saison', libelleSuite:"Continuer" },

/* Un des neuf agit et il n'y a pas de scène écrite pour ce qu'il fait cette
 * saison-là : on le note quand même, parce qu'un acteur qu'on n'a pas vu
 * agir reste un acteur qui a agi. */
a2_acte:{
  lieu:() => `Ailleurs · ${dateA2()}`,
  titre:() => NEUF[acteurCourant()].nom,
  texte:[
    () => {
      const id = acteurCourant(), n = NEUF[id];
      return `${n.nom} — ${n.quoi} — a fait quelque chose cette saison, et vous l'apprenez avec trois semaines de retard.`;
    },
    () => {
      const id = acteurCourant();
      return ACTES_COURTS[id] ? ACTES_COURTS[id][Math.min(A2().annee, ACTES_COURTS[id].length - 1)] : "";
    },
    () => {
      const id = acteurCourant();
      return `§ Il veut : ${NEUF[id].objectifs.join(' · ')}. Il n'a pas changé d'avis et il n'en changera pas parce que vous êtes passé.`;
    },
  ],
  effets:{ faire:() => retenir(acteurCourant(), "il a agi sans vous, et vous l'avez appris trop tard") },
  suite:'a2_saison', libelleSuite:"Continuer" },

};

enregistrerScenes(BOUCLE2);

/* ── Ce que raconte chaque franchissement ────────────────────────────────── */
const CRISE_TEXTES = {
  elfes:[
    "Deux cours elfiques ont cessé de s'écrire. Ça se sait par les marchands : les laissez-passer du fleuve ne sont plus honorés au nord, et un marchand qui perd un laissez-passer en parle à tout le monde.",
    "Les premières colonnes ont franchi la marche à la fonte. On ne compte pas les morts d'une guerre elfique la première année : on compte les villages humains qui se trouvaient entre les deux.",
    "La ligne du fleuve a tenu un hiver entier, ce qui n'était arrivé à aucune ligne de cette guerre. On dit qu'Eltharion y a laissé un fils.",
    "Aelthiriel a rappelé ses maisons du sud. Une cour qui rappelle ses maisons du sud n'a plus l'intention de tenir une ligne : elle a l'intention d'en tenir une autre, plus courte, plus près.",
    "La guerre est ouverte sur toute la marche et elle ne se refermera pas de votre vivant. Ce qui commence maintenant, ce sont les alliances — et une alliance elfique se paie en choses humaines.",
  ],
  astrah:[
    "Un homme compte des soutiens dans une capitale sans roi. Ce n'est pas illégal et ça ne s'arrête pas.",
    "Trois maisons du sud ont signé quelque chose que personne n'a lu. On sait qu'elles ont signé parce que leurs greniers se sont remplis en Frimaire.",
    "La couronne d'Astrah est sortie du coffre pour un inventaire. Un inventaire de quarante ans, fait un mardi, sans que personne l'ait demandé.",
    "On lève des hommes sous un nom mort depuis quarante ans, et les hommes viennent, parce qu'un nom mort paie mieux qu'un nom vivant.",
    "Astrah a un roi et personne ne l'a couronné. C'est une nuance que quatre provinces vont passer dix ans à discuter, les armes à la main.",
  ],
  khesh:[
    "On compte douze feux dans le désert khesh, comme depuis deux cents ans. Ça n'intéresse personne au nord.",
    "Neuf feux. Trois tribus ont cessé d'allumer le leur, et un feu qu'on n'allume pas n'est pas un feu éteint : c'est un feu qui a rejoint un autre.",
    "Cinq feux. À ce stade, les marchands du sud commencent à changer leurs routes, ce qui est la seule façon dont le nord apprend quoi que ce soit.",
    "Un feu, et un serment qu'on ne prononce qu'une fois. Khal-Vaene a douze tribus derrière lui et il a mis onze ans.",
    "Le désert bouge vers le nord. Ce n'est pas une invasion : c'est un peuple qui se déplace, et c'est infiniment plus difficile à arrêter.",
  ],
  kardurak:[
    "Deux portes de Kar-Durak sont fermées. Les Nains ferment des portes tous les siècles ; personne ne s'en émeut la première année.",
    "Quatre portes tombées. Les Peaux-Vertes montent par les galeries basses et les Nains n'ont plus assez de monde pour tenir onze portes.",
    "La galerie haute est perdue. C'est là qu'étaient les archives de la montagne, et il n'y a pas de mot nain pour ce que ça veut dire.",
    "On évacue les forges du milieu. Trois mille Nains descendent vers la plaine, ce qu'aucun d'eux n'a fait depuis huit cents ans.",
    "Kar-Durak tient sur trois portes et ne tiendra pas. Ce qui sortira ensuite par ces galeries n'aura plus rien devant lui.",
  ],
  hordes:[
    "Des troupeaux manquent dans la marche humaine. On accuse les loups, puis on cesse d'accuser les loups.",
    "Trois hameaux de la marche ont été vidés. Vidés, pas brûlés : c'est la distinction qui inquiète ceux qui savent lire une marche.",
    "Les mères se regroupent au nord. Personne au sud ne sait ce que ça veut dire chez les Hommes-Bêtes, et les deux ou trois qui le savent ne sont pas écoutés.",
    "Une colonne de six mille est descendue en Thermidor. Six mille, c'est plus que toutes les garnisons de la marche additionnées.",
    "La marche humaine n'a plus de frontière. Il y a des endroits où l'on va et des endroits où l'on ne va plus, et la ligne entre les deux bouge tous les mois.",
  ],
};

/* Ce que font les neuf quand on ne les regarde pas. */
const ACTES_COURTS = {
  alycia:    ["Trois chasseurs de Parias ont disparu entre Chastel et les Marches. On les cherche encore.",
              "Un convoi de la maison de Mont-Draken a perdu son guide, ses cartes et son commanditaire en une nuit, sans un mort.",
              "Quelqu'un a fait sortir onze personnes d'un dépôt de Chastel. Onze, et pas une de plus, et pas au hasard."],
  alarielle: ["Une maison elfique a rouvert une archive fermée depuis quatre cents ans, et l'a fait porter au registre.",
              "Elle a parlé devant la cour contre une mesure qui visait les Parias. Elle a perdu, et elle a parlé.",
              "Elle a quitté Aelthiriel pour deux saisons sans dire où, ce qu'une elfe de son rang ne fait pas."],
  charles:   ["Mont-Draken a formé quarante hommes de plus cette saison. Ce n'est pas une garnison : c'est une promotion.",
              "Il a fait pendre deux hommes qui avaient tué un Paria sans preuve. Il tient à ce qu'on tue les bonnes personnes.",
              "Il a demandé au conseil de province une commission sur les manifestations de l'Onde. Elle lui a été accordée."],
  lucius:    ["Il a payé les dettes de deux maisons du sud sans rien demander en échange. Personne n'a trouvé ça inquiétant.",
              "Il a fait relever les tombes royales d'Astrah, à ses frais, avec beaucoup de monde et beaucoup de discours.",
              "Il a écrit à sept maisons en une saison. On connaît le chiffre parce qu'un courrier s'est noyé."],
  caleb:     ["Fort-aux-Princes a racheté trois créances de maisons voisines. Caleb ne prête pas : il achète des dettes.",
              "Il a marié une nièce à une maison de la Route Grise. Le contrat comporte onze pages de clauses de passage.",
              "Il a fait dresser un état des maisons éteintes de la province. Il n'a pas dit pourquoi et personne n'a demandé."],
  tyrion:    ["Il a fait fermer la marche du nord à tout ce qui n'est pas elfique. Y compris aux blessés.",
              "Il a obtenu que la cour cesse de recevoir les émissaires d'Anarion. Ce fut voté à une voix.",
              "Il a fait brûler une bibliothèque de la marche pour qu'Anarion ne la prenne pas. Elle contenait ce qu'elle contenait."],
  anarion:   ["Il a pris deux villages de la marche et il les a gardés intacts, ce qui a fait plus de mal que s'il les avait brûlés.",
              "Il a envoyé une lettre à toutes les maisons humaines de la province. Aucune ne l'a rendue publique.",
              "Il a fait proclamer que la marche noire accueillerait quiconque a été rayé d'un registre. Le mot est passé jusqu'ici."],
  eltharion: ["Il a rappelé trois maisons du sud et il a perdu quatre jours à les convaincre.",
              "Il a tenu la ligne du fleuve un hiver, et il y a laissé quelqu'un dont on ne dit pas le nom.",
              "Il a proposé une trêve d'hiver. Anarion a répondu par écrit, ce qui n'était jamais arrivé."],
  khalvaene: ["Il a éteint trois feux du désert en une saison, sans une bataille rangée.",
              "Il a fait creuser deux puits sur la route du nord. Un puits est une intention.",
              "Il a prononcé le serment devant douze tribus. On dit qu'il a duré quatre heures et qu'il n'a pas été écrit."],
};
