/* PARIAS — ACTE III · CE QUI VIENT
 * ═══════════════════════════════════════════════════════════════════════
 *
 * L'Acte I demandait : *que vaux-tu ?*
 * L'Acte II demandait : *qui t'a fait ça ?*
 *
 * L'Acte III ne peut pas redemander *qui*. Il demande la seule chose qui
 * reste : **maintenant que tu existes, qu'est-ce que tu en fais pendant que
 * tout brûle ?**
 *
 * ═══ CE QUI CHANGE D'ÉCHELLE ═══
 *
 * Rien de nouveau n'arrive. C'est le principe et il tient tout l'acte : les
 * cinq crises étaient déjà là, les neuf agissaient déjà seuls, et les gens
 * qu'on a humiliés en Acte I n'ont pas cessé d'exister entre-temps. Ce qui
 * change, c'est qu'ils arrivent **tous le même hiver**.
 *
 * On ne choisit plus ses contrats : on arbitre entre des demandes
 * contradictoires, et satisfaire l'une ferme l'autre.
 *
 * ═══ CEUX QUI VIENNENT ═══
 *
 * `inimities.js` lit ce qu'on a réellement fait et rend la liste. Elle n'est
 * jamais la même et elle n'est jamais tirée au sort. Un joueur qui a payé
 * Amaury, épargné Gassien correctement, laissé Sorgue à sa charge et donné
 * son rendement à Caleb affronte un siège de province ; un joueur qui a dit
 * non à tout le monde affronte quatre maisons et une commission.
 *
 * ═══ CE QU'ON NE FAIT PAS ═══
 *
 * Pas de nouveau mystère : le nom est trouvé ou il ne l'est pas, et ajouter
 * un coupable derrière le coupable annulerait l'Acte II.
 * Pas de montée en puissance : Yohan ne devient pas plus fort, le monde
 * devient plus grand. Deux coups de pistolet, un drain, et neuf ans de
 * plus dans les articulations.
 * Jamais « ACTE III » à l'écran.
 * ═══════════════════════════════════════════════════════════════════════ */

const A3 = () => (ETAT.acte3 = ETAT.acte3 || {
  annee:0, front:null, tenus:[], perdus:[], siege:null,
});

/* Neuf ans. C'est ce qu'il faut pour qu'un garçon de douze ans en ait
 * vingt et un, pour qu'une maison relevée compte dans les états d'une
 * province, et pour que cinq guerres arrivent à maturité. */
const AGE3 = () => 24 + 9 + A3().annee;

/* Le jeu écrit ses nombres en toutes lettres. Un âge calculé ne fait pas
 * exception : « Vous avez 38 ans » au milieu de deux cents nombres écrits se
 * voit tout de suite. De un à quatre-vingt-dix-neuf, ce qui couvre les âges. */
function enLettres(n){
  const U = ['zéro','un','deux','trois','quatre','cinq','six','sept','huit','neuf',
             'dix','onze','douze','treize','quatorze','quinze','seize','dix-sept',
             'dix-huit','dix-neuf'];
  const D = ['', '', 'vingt','trente','quarante','cinquante','soixante','soixante',
             'quatre-vingt','quatre-vingt'];
  if(n < 0 || n > 99 || n !== Math.floor(n)) return String(n);
  if(n < 20) return U[n];
  const d = Math.floor(n / 10), u = n % 10;
  /* Soixante-dix et quatre-vingt-dix comptent par seize : soixante-onze,
   * quatre-vingt-douze. Et quatre-vingts ne prend son s que tout seul. */
  if(d === 7 || d === 9) return D[d] + '-' + U[10 + u];
  if(u === 0) return d === 8 ? 'quatre-vingts' : D[d];
  if(u === 1 && d !== 8) return D[d] + ' et un';
  return D[d] + '-' + U[u];
}

/* Ce que Karlsberg est devenue. Le chantier de l'Acte II a tranché ; on ne
 * redemande pas. */
function palierKarlsberg(){
  const C = (typeof CHANTIER === 'function') ? CHANTIER() : { faits:[] };
  const n = (C.faits || []).length;
  return n >= 9 ? 'puissance' : n >= 7 ? 'domaine' : n >= 5 ? 'chateau'
       : n >= 3 ? 'fort' : n >= 1 ? 'refuge' : 'ruines';
}

const DIT_PALIER = {
  ruines:   "Karlsberg est ce qu'elle était : des pierres numérotées par personne, dans une vallée que trois provinces ont cessé de nommer.",
  refuge:   "Karlsberg est un endroit sec. Quarante personnes y dorment, il y a un toit sur la salle basse, et ça ne figure sur aucune carte.",
  fort:     "Karlsberg est un fort. Ce n'est pas un titre, c'est un fait — et un fait, ça se conteste sans qu'on ait à vous attaquer.",
  chateau:  "Karlsberg est un château. Elle a donc une valeur, et tout ce qui a une valeur figure dans l'état des lieux de quelqu'un.",
  domaine:  "Karlsberg est un domaine. Elle se compte en feux et non en pierres : trois cents personnes qui n'ont rien demandé et qui mourront si ça tourne mal.",
  puissance:"Karlsberg est une puissance régionale. Elle ne peut plus être ignorée, ni prise en passant, ni rester neutre — et elle a perdu la neutralité sans que personne le lui demande.",
};

/* Les quatre demandes. Elles arrivent le même hiver et deux d'entre elles
 * s'excluent toujours : c'est ce qui fait de l'acte un arbitrage et non une
 * liste de courses. */
const DEMANDES = [
  { id:'lucius', qui:"Astrah",
    si:() => a('a2_lucius_vu'),
    quoi:"Lucius se fait couronner au printemps. Il veut une maison relevée debout à côté de lui, trois fois par an.",
    coute:"Mont-Draken, et trois maisons du nord",
    exclut:'charles' },
  { id:'charles', qui:"Mont-Draken",
    si:() => a('a2_charles_vu'),
    quoi:"La commission a été accordée. Charles veut inscrire les porteurs de l'Onde, et il veut commencer par ceux qu'il connaît.",
    coute:"la seule chose qui vous protège encore",
    exclut:'lucius' },
  { id:'fleuve', qui:"la ligne du fleuve",
    si:() => a('a2_anarion_vu') || a('el_rencontree'),
    quoi:"Aelthiriel rappelle ses maisons du sud. La ligne du fleuve demande des hommes et il n'y en a plus.",
    coute:"tout ce qui garde Karlsberg",
    exclut:null },
  { id:'porte', qui:"Kar-Durak",
    si:() => a('a2_kardurak_aide') || a('kd_commande'),
    quoi:"Il reste trois portes. On demande qu'on rouvre la onzième — celle du bas, celle du plan qu'on ne traduit pas.",
    coute:"ce qui est dessous",
    exclut:null },
];

const demandesOuvertes = () => DEMANDES.filter(d => d.si());

/* Qui tient les comptes de Karlsberg neuf ans plus tard.
 *
 * Ce n'est pas un détail de couleur : c'est la vérification la plus simple
 * que l'Acte III lit bien l'Acte I. Un garçon de douze ans qu'on a couvert
 * en a vingt et un et sait compter mieux que personne. Un garçon qu'on a
 * dénoncé devant quarante personnes a tenu deux ans, peut-être trois, et
 * n'est plus là. Un hameau où l'on n'est jamais monté n'a jamais entendu
 * parler de vous. */
function intendant(){
  if(a('ch_meute_faite') && !a('ch_meute_ignoree') && !a('ch_colin_denonce'))
    return { nom:"Colin", de:"Fontaine-Basse", age:21,
      note:"il ne parle jamais de la façon dont il a appris à compter",
      mot:"« Mon grand-père disait qu'on ne compte jamais ce qui descend des tourbières. On compte ce qu'on a perdu, une fois, au matin. »" };
  if(a('ch_colin_denonce'))
    return { nom:"Perrine", de:"Fontaine-Basse", age:28,
      note:"elle est la sœur d'un garçon dont on ne prononce pas le nom dans son hameau",
      mot:"« Chez nous on ne compte pas les gens. On a essayé une fois. »" };
  if(a('ch_reine_faite') && a('ch_re_sept'))
    return { nom:"Bergrun le jeune", de:"les contreforts", age:26,
      note:"son père est l'un des sept qu'on a remontés du puits sept",
      mot:"« On compte au matin, une fois. Mon père compte encore, et il ne descend plus. »" };
  return { nom:"maître Ferrand", de:"Chastel", age:52,
    note:"il a été formé au greffe et il n'a jamais dit pourquoi il en est parti",
    mot:"« Un état est un état, messire. Il ne dit pas ce qui va se passer : il dit ce qui est écrit. »" };
}

const ACTE3 = {

/* ══ 1 · LA BASCULE ════════════════════════════════════════════════════════
 * On ne recommence pas une partie : on la reprend neuf ans plus tard, avec
 * tout ce qu'elle a produit. */
a3_bascule:{ dyn:true, texte:[] },

/* ══ 2 · CEUX QUI VIENNENT ═════════════════════════════════════════════════
 * La scène qui justifie l'existence de tout le reste : elle nomme, une par
 * une, les personnes qu'on a créées et à qui l'on a fait quelque chose. */
a3_ceux_qui_viennent:{ dyn:true, texte:[] },

/* ══ 3 · LES DEMANDES ══════════════════════════════════════════════════════ */
a3_convergence:{ dyn:true, texte:[] },

/* ══ 4 · LE SIÈGE ══════════════════════════════════════════════════════════ */
a3_siege:{ dyn:true, texte:[] },
a3_apres_siege:{ dyn:true, texte:[] },

};

/* ── La bascule ─────────────────────────────────────────────────────────── */
DYN.a3_bascule = () => {
  const p = palierKarlsberg();
  const hautes = Object.entries(A2().crises || {}).filter(([, v]) => v >= 4)
    .map(([k]) => CRISES[k].nom);

  SCENES.a3_bascule = {
    dyn:true,
    lieu:`Karlsberg · la vingt-neuvième année après la Purge`,
    titre:"Cinq ans",
    texte:[
      "Cinq ans depuis que vous avez su. Neuf depuis Cendrepont.",
      { sobre:"C'est le temps qu'il faut à cinq guerres pour cesser d'être des guerres.",
        intense:"C'est très exactement le temps qu'il faut à cinq guerres pour cesser d'être des guerres et devenir l'état normal du monde. Personne, aujourd'hui, ne se souvient d'une année sans.",
        extreme:"C'est très exactement le temps qu'il faut à cinq guerres pour cesser d'être des guerres.\n\nOn ne dit plus *la guerre d'Eltharion et d'Anarion* : on dit *le fleuve*, et tout le monde sait de quoi il s'agit. On ne dit plus *l'unification khesh* : on dit *le sud*. Un enfant né l'année où vous êtes entré à Cendrepont a aujourd'hui neuf ans et n'a jamais connu autre chose.\n\nC'est ainsi que finissent les guerres, dans les faits. Elles ne finissent pas. Elles deviennent la géographie." },
      hautes.length
        ? `Arrivées à maturité : ${hautes.join(' · ')}.`
        : "Aucune des cinq n'est allée jusqu'au bout. C'est le meilleur état du monde qu'on pouvait espérer et personne n'en saura jamais rien.",
      DIT_PALIER[p],
      () => {
        const n = ETAT.blessures.length;
        return n
          ? `Vous avez ${enLettres(AGE3())} ans. Vous portez ${n === 1 ? "une chose" : enLettres(n) + " choses"} qui ne s'en iront plus : ${ETAT.blessures.map(b => b.zone).join(' · ')}.`
          : `Vous avez ${enLettres(AGE3())} ans, et le compte de ce que vous portez est étonnamment court. Ça ne durera pas.`;
      },
      { sobre:"§ Rien de nouveau n'arrive cet hiver-là. C'est le problème.",
        intense:"§ Rien de nouveau n'arrive cet hiver-là. Tout ce qui arrive était déjà là, et arrive en même temps.",
        extreme:"§ Rien de nouveau n'arrive cet hiver-là, et c'est très exactement ce qui le rend impossible à tenir. Tout ce qui arrive existait déjà — depuis trois ans, depuis neuf, depuis vingt-neuf. La seule chose qui change, c'est que ça arrive le même hiver." },
    ],
    effets:{ flags:['a3_ouvert'],
             marque:`Cinq ans ont passé, neuf depuis Cendrepont. Karlsberg est ${p === 'ruines' ? "toujours en ruines" : "un " + p}.`,
             court:"Cinq ans" },
    suite:'a3_ceux_qui_viennent', libelleSuite:"Qui vient",
  };
  aller('a3_bascule');
};

/* ── Ceux qui viennent ──────────────────────────────────────────────────── */
DYN.a3_ceux_qui_viennent = () => {
  const liste = griefs();
  const epargnes = pasEnnemis();

  const i = intendant();
  const texte = [
    `Quelqu'un tient les comptes de Karlsberg, et ce quelqu'un a ${enLettres(i.age)} ans. ${i.nom}, de ${i.de} — ${i.note}.`,
    "On pose devant vous une liste qu'il a fallu quatre mois pour établir, et on la pose sans commentaire parce qu'il n'y en a pas à faire.",
  ];

  if(!liste.length){
    texte.push("§ La liste est vide.");
    texte.push({ sobre:"Personne ne vient. C'est très rare et ça ne veut pas dire qu'on est en sécurité.",
      intense:"Personne ne vient. En neuf ans, vous n'avez humilié personne d'assez important pour qu'il en fasse une affaire, et c'est un résultat qu'aucune maison de cette province n'obtient jamais.\n\nCe n'est pas la même chose qu'être en sécurité. Ça veut dire que ce qui vient n'a pas de visage.",
      extreme:"Personne ne vient.\n\nEn neuf ans, vous n'avez humilié personne d'assez important pour qu'il en fasse une affaire personnelle. Vous avez payé ce qu'il fallait payer, épargné correctement ceux qu'il fallait épargner, et donné à chacun de quoi ne pas avoir besoin de vous détruire.\n\nAucune maison de cette province n'obtient jamais ce résultat, et il a coûté exactement ce qu'il devait coûter — vous savez quoi, et à qui.\n\nCe n'est pas du tout la même chose qu'être en sécurité. Ça veut dire seulement que ce qui monte vers la vallée cet hiver n'a pas de visage particulier, et qu'il faudra le tenir sans savoir à qui parler." });
  } else {
    texte.push(`§ ${liste.length === 1 ? "Un nom" : liste.length + " noms"}.`);
    for(const g of liste){
      texte.push(`**${g.nom}** — *${g.ou}.*\n\n${g.quoi}`);
      texte.push(`^${g.dit}`);
      /* Un seul de la liste n'est pas un ennemi, et l'intendant le sait :
       * il l'a inscrit quand même parce qu'il vient, et que sa charge est
       * de dire qui vient, pas qui veut du mal. */
      if(g.neutre) texte.push(`^« Celui-là, je l'ai mis parce qu'il vient. Je ne crois pas qu'il vienne contre nous. Je n'ai pas de colonne pour ça. »`);
    }
  }

  if(epargnes.length)
    texte.push(`§ Ne figurent pas sur cette liste, et c'est ce qu'on a acheté : ${epargnes.join(' · ')}.`);

  texte.push("@« C'est tout ? »");
  texte.push({ sobre:`^« C'est tout ce que j'ai pu établir. Ce n'est pas la même chose. »`,
    intense:`^« C'est tout ce que j'ai pu établir en quatre mois avec les moyens d'une maison de cette taille. Ce n'est pas la même chose et je préfère le préciser. »`,
    extreme:`^« C'est tout ce que j'ai pu établir en quatre mois avec les moyens d'une maison de cette taille. Ce n'est pas du tout la même chose et je préfère le préciser.\n\nJ'ai les gens qui ont écrit, ceux qui ont payé quelqu'un, et ceux dont on m'a parlé trois fois. Je n'ai pas ceux qui n'ont rien fait d'écrit et qui viendront quand même. »`});
  texte.push(`^${i.mot}`);

  SCENES.a3_ceux_qui_viennent = {
    dyn:true,
    lieu:"Karlsberg · la salle des comptes · Nivôse",
    titre:`La liste de ${intendant().nom}`,
    texte,
    effets:{ flags:['a3_liste'],
             marque:liste.length
               ? `Ceux qui viennent : ${liste.map(g => g.nom).join(' · ')}.`
               : "Personne ne vient nommément. Ce n'est pas la même chose qu'être en sécurité.",
             court:"La liste" },
    suite:'a3_convergence', libelleSuite:"Ce qu'on vous demande",
  };
  aller('a3_ceux_qui_viennent');
};

/* ── Les demandes ───────────────────────────────────────────────────────── */
DYN.a3_convergence = () => {
  const d = demandesOuvertes();
  const A = A3();

  const texte = [
    "Quatre courriers en onze jours. Aucun n'est une menace, aucun n'est une supplique, et les quatre disent la même chose sous des formes différentes : *il faut choisir maintenant*.",
  ];

  if(!d.length){
    texte.push("§ Personne ne vous demande rien. Vous avez passé neuf ans à ne devoir à personne, et le monde vous rend exactement ce que vous lui avez donné.");
    texte.push("Ce qui monte vers la vallée cet hiver montera donc sur une maison qui n'a aucun allié à appeler.");
  } else {
    for(const x of d){
      texte.push(`**${x.qui}** — ${x.quoi}`);
      texte.push(`*Ce que ça coûte :* ${x.coute}.`);
    }
    const ex = d.filter(x => x.exclut && d.some(y => y.id === x.exclut));
    if(ex.length)
      texte.push("§ Deux d'entre elles ne se satisfont pas ensemble, et les deux le savent : Astrah veut une maison debout à côté d'elle, Mont-Draken veut cette même maison inscrite au registre. On ne peut pas être les deux.");
  }

  texte.push({ sobre:"On tient deux théâtres. Jamais trois.",
    intense:"On tient deux théâtres. Jamais trois — ce n'est pas une règle du monde, c'est une question de nombre d'hommes, et le nombre d'hommes est ce qu'il est.",
    extreme:"On tient deux théâtres. Jamais trois.\n\nCe n'est pas une règle morale, ce n'est pas une leçon, et personne ne l'a décidé : c'est le nombre d'hommes que vous avez, divisé par le nombre de lieues entre les endroits où l'on vous demande d'être. Un capitaine qui essaie d'en tenir trois n'en tient aucun et perd les trois, et cette phrase-là est le seul enseignement que neuf ans de guerre aient produit dans quatre provinces.\n\nLe troisième se déroulera sans vous. On vous racontera comment." });

  const choix = d.map(x => ({
    t:`Répondre à ${x.qui}`,
    detail:`${x.quoi.split('.')[0]} · coûte ${x.coute}`,
    risque:'définitif',
    ferme:x.exclut && d.some(y => y.id === x.exclut)
      ? `Ferme : ce que ${DEMANDES.find(y => y.id === x.exclut).qui} vous aurait donné` : null,
    avant:() => { A.tenus.push(x.id); ETAT.flags.add('a3_' + x.id); },
    va:() => A.tenus.length >= 2 ? 'a3_siege' : 'a3_convergence',
  }));

  choix.push({
    t:A.tenus.length ? "Ne rien promettre de plus" : "Ne répondre à personne",
    detail:"tenir Karlsberg et rien d'autre · c'est un choix et il se paie",
    risque:'prudent',
    avant:() => { ETAT.flags.add('a3_seul'); },
    va:'a3_siege' });

  SCENES.a3_convergence = {
    dyn:true,
    lieu:"Karlsberg · Nivôse",
    titre:A.tenus.length ? "Ce qu'il reste à décider" : "Quatre courriers en onze jours",
    texte, choix,
  };
  aller('a3_convergence');
};

/* ══ LE SIÈGE ══════════════════════════════════════════════════════════════
 * Le champ n'est pas écrit : il est **composé**. Les fronts viennent de ce
 * que Karlsberg est devenue, l'ennemi de ceux qu'on s'est faits, et la
 * garnison de ce qu'on a bâti. Deux parties ne produisent jamais le même
 * siège, et aucune ne produit un siège arbitraire. */
DYN.a3_siege = () => {
  const p = palierKarlsberg();
  const contre = forcesContre(6);
  const noms = [...new Set(contre.map(u => u.de))];

  /* Faute d'ennemi nommé, ce qui monte est ce qui monte toujours vers une
   * vallée sans maître : des gens qui ont faim et personne pour les tenir. */
  const ennemis = contre.length ? contre
    : [{ type:'pillards' }, { type:'milice' }, { type:'pillards', effectifPct:0.8 }];

  const tiers = (i) => ennemis.filter((_, k) => k % 3 === i);

  /* Ce qu'on défend dépend de ce qu'on a monté. Des ruines n'ont pas de
   * muraille et n'ont pas non plus de bourg à perdre. */
  const fronts = p === 'ruines' || p === 'refuge'
    ? [{ nom:"La brèche ouest", terrain:'ruines',  ennemis:tiers(0) },
       { nom:"Le chemin creux", terrain:'defile',  ennemis:tiers(1) },
       { nom:"La cour",         terrain:'ruines',  ennemis:tiers(2) }]
    : [{ nom:"La courtine",     terrain:'ruines',  ennemis:tiers(0) },
       { nom:"La porte basse",  terrain:'gue',     ennemis:tiers(1) },
       { nom:"Le bourg",        terrain:'plaine',  ennemis:tiers(2) }];

  const champ = {
    id:'bat_siege',
    nom:"Le siège de Karlsberg",
    lieu:"Karlsberg · la vallée",
    intro:noms.length
      ? `Ils arrivent par la route de poste, ensemble, et ils n'ont pas eu à s'écrire pour ça : ${noms.join(', ')}. Neuf ans, et une seule vallée à remonter.`
      : "Ils arrivent par la route de poste. Personne ne les commande et personne ne les a envoyés : une vallée qui a du grain et pas de maître attire ce qui a faim, et c'est tout ce qu'il y a à comprendre.",
    mise:"Ce qu'on tient, on le tient. Ce qu'on lâche brûle avant la nuit, et ce qui brûle ici n'est pas de la pierre.",
    fronts,
    victoire:{ renom:20, temoins:'province', flags:['a3_siege_tenu'],
      texte:"Karlsberg tient. Au matin, on ne compte pas ce qui a été gagné — on compte les feux qui fument encore dans le bourg, et il y en a plus qu'hier soir on n'aurait osé l'espérer." },
    defaite:{ renom:-8, flags:['a3_siege_perdu'],
      texte:"La courtine cède avant la nuit. Ce qui reste de la maison sort par le chemin creux, en emportant ce qu'on peut porter, et Karlsberg redevient ce qu'elle était il y a neuf ans : un endroit que trois provinces cesseront de nommer." },
  };

  const garnison = ETAT.armee && ETAT.armee.length
    ? null
    : [{ type:'lanciers' }, { type:'archers', effectifPct:0.8 },
       { type:'frondeurs' }, ...(a('a2_bannieres') ? [{ type:'parias' }] : []),
       ...(a('a2_caleb_quarante') ? [{ type:'veterans', effectifPct:0.8 }] : [])];

  SCENES.a3_siege = {
    dyn:true,
    lieu:"Karlsberg · la crête est · au jour",
    titre:"Ce qui remonte la vallée",
    texte:[
      champ.intro,
      DIT_PALIER[p],
      garnison
        ? "Vous n'avez pas d'armée. Vous avez ce que la vallée peut lever, ce qui n'est pas la même chose et ce qui a le mérite d'exister."
        : `Vous avez un rôle : ${ETAT.armee.map(u => `${u.nom} (${u.effectif})`).join(' · ')}.`,
      { sobre:"§ On ne défend pas des pierres.",
        intense:"§ On ne défend pas des pierres. Personne n'a jamais défendu des pierres : les pierres ne s'en aperçoivent pas.",
        extreme:"§ On ne défend pas des pierres. Personne n'a jamais défendu des pierres et les pierres ne s'en sont jamais aperçues.\n\nCe qu'il y a derrière la courtine ce matin : trois cents personnes qui n'ont rien demandé, un intendant qui vient d'un hameau de onze feux, et le fait qu'un nom rayé il y a vingt-huit ans figure à nouveau dans le registre d'une province." },
    ],
    choix:[
      { t:"Tenir",
        detail:"trois fronts · ce qu'on a · et ce qui monte",
        risque:'définitif',
        va:() => ouvrirBataille(champ, 'a3_apres_siege', garnison) },
    ],
  };
  aller('a3_siege');
};

DYN.a3_apres_siege = () => {
  const tenu = ETAT.derniereBataille === 'gagnee';
  const ch = championsContre();

  SCENES.a3_apres_siege = {
    dyn:true,
    lieu:"Karlsberg · au soir",
    titre:tenu ? "Ce qui fume encore" : "Le chemin creux",
    texte:[
      tenu
        ? "On compte les feux du bourg avant de compter les morts. C'est l'ordre dans lequel Colin les compte, et personne ne le lui a appris."
        : "On sort par le chemin creux, dans l'ordre, sans se presser, parce qu'une colonne qui se presse dans un chemin creux ne sort pas.",
      ch.length
        ? `§ Et il reste ${ch.length === 1 ? "quelqu'un" : ch.length + " personnes"} qui n'a pas envoyé d'hommes, parce qu'il n'en envoie pas : ${ch.map(c => c.nom).join(' · ')}.`
        : "§ Personne ne vous attend au soir. C'est le meilleur résultat disponible et il n'a rien de glorieux.",
      tenu
        ? "Il reste à savoir ce que devient une maison qui a tenu — et c'est une question à laquelle aucun siège ne répond."
        : "Il reste à savoir ce que devient un homme dont la maison est tombée deux fois en vingt-huit ans.",
    ],
    effets:{ flags:[tenu ? 'a3_tenu' : 'a3_tombee'],
             marque:tenu ? "Karlsberg a tenu le siège." : "Karlsberg est tombée une seconde fois.",
             court:tenu ? "Elle a tenu" : "Une seconde fois" },
    issue:tenu ? "Le siège est levé" : "La maison est tombée",
    bilan:tenu ? "Karlsberg, la vingt-neuvième année" : "Karlsberg, deux fois en vingt-huit ans",
    suite:'a3_champions', libelleSuite:ch.length ? "Ceux qui viennent seuls" : "Ce que le monde en a fait",
  };
  aller('a3_apres_siege');
};

enregistrerScenes(ACTE3);
