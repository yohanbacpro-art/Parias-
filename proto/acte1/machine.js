/* PARIAS — Acte I · ce qui fait de trois contrats un acte
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Trois affaires écrites côte à côte font trois nouvelles. Il faut quatre
 * choses de plus pour que ça devienne un acte, et les voici :
 *
 *   1. LE RENOM PAIE ET COÛTE. Le rang change les sommes du tableau, la
 *      nature des clients, et finit par attirer autre chose que des clients.
 *   2. CE QU'ON N'A PAS PRIS REVIENT. Les affaires laissées sur le mur ne
 *      se règlent pas au basculement : elles vous croisent sur la route,
 *      pendant que vous êtes occupé ailleurs.
 *   3. LE CORPS NE SE RÉPARE PAS TOUT SEUL. Entre deux contrats il faut
 *      décider quoi faire de ce qu'on porte, et chaque façon coûte quelque
 *      chose de différent.
 *   4. KARLSBERG A UN SECOND BATTEMENT. Ce qu'on a fait de la borne revient
 *      dire ce que ça vaut.
 *
 * L'entre-saisons draine ces quatre files, une scène à la fois, puis rend
 * la main au tableau des mercenaires.
 * ═══════════════════════════════════════════════════════════════════════ */

/* ── 1 · Le renom paie ─────────────────────────────────────────────────────
 * Un homme qu'on demande par son nom ne se négocie pas au tarif d'un homme
 * qu'on ne connaît pas. C'est la seule récompense mécanique du renom — et
 * elle vient avec tout le reste, qui n'est pas une récompense. */
const PRIME = { inconnu:1, nomme:1.4, karlsberg:1.8 };
const prime = n => Math.round(n * PRIME[rangActuel().id]);

/* ── Ce qu'on rencontre sur la route ───────────────────────────────────────
 * Les chasses et le duel de `chasses.js`. Chacune a une condition qui dit
 * quand le monde est prêt à la poser devant vous — jamais une condition qui
 * la rende obligatoire, et jamais deux dans la même entre-saisons.
 *
 * La meute vient tôt : c'est la première créature du jeu et il faut qu'elle
 * arrive avant que le joueur ait décidé que Vardhen est un monde d'hommes.
 * Le duelliste vient quand on a un nom, parce qu'on ne collectionne pas un
 * homme dont personne ne parle. */
const RENCONTRES_ROUTE = [
  { scene:'ch_meute',     fait:'ch_meute_faite',     si:() => ETAT.acte.saison >= 1 },
  { scene:'ch_duelliste', fait:'ch_duel_fait',       si:() => rangActuel().id !== 'inconnu' },
  { scene:'ch_colosse',   fait:'ch_colosse_fait',    si:() => ETAT.acte.saison >= 2 },
  { scene:'ch_reine',     fait:'ch_reine_faite',     si:() => ETAT.acte.saison >= 3 },
];

/* ── 3 · Le corps ──────────────────────────────────────────────────────────
 * Une blessure ne disparaît pas : elle descend d'un cran, ou elle reste. */
function reposer(crans){
  const soignees = [];
  for(const b of ETAT.blessures){
    b.saignement = 0;
    b.gravite = b.gravite - crans;
    b.douleur = Math.max(0, b.douleur - crans);
    if(b.gravite <= 0) soignees.push(b);
    else b.traitement = b.traitement || "refermé";
  }
  /* Ce qui est refermé quitte la liste — mais la cicatrice reste au journal. */
  for(const b of soignees){
    ETAT.blessures.splice(ETAT.blessures.indexOf(b), 1);
    if(b.cicatrice) ETAT.faits.push(`${b.zone} — refermé. Reste : ${b.cicatrice}.`);
  }
  return soignees.length;
}

function rendreSouffle(n){
  for(const k of ['vitalite', 'endurance', 'concentration', 'sang', 'moral'])
    ETAT.ressources[k] = Math.min(100, (ETAT.ressources[k] || 0) + n);
}

/* ── L'entre-saisons ───────────────────────────────────────────────────────
 * Quatre files vidées dans l'ordre. Chaque scène y revient quand elle a fini,
 * et quand tout est vide on rend la main au tableau. */
function prochaineDeLEntreSaison(){
  const A = ETAT.acte;

  /* a) Ce qu'on n'a pas pris, et qui n'a pas encore fait signe. */
  if(A.saison >= 2){
    const echo = AFFAIRES.find(x =>
      !A.arcsFaits.includes(x.id) && ECHOS[x.id] && !a('echo_' + x.id));
    if(echo) return 'echo_' + echo.id;
  }

  /* b) Le second battement Karlsberg — une fois, s'il est armé. */
  if(!a('karlsberg_2')){
    const k = BATTEMENT_KARLSBERG.find(x => x.si());
    if(k) return k.scene;
  }

  /* c) Le palier de renom qu'on vient de franchir. */
  const r = rangActuel().id;
  if(r !== 'inconnu' && !a('palier_' + r)) return 'palier_' + r;

  /* c bis) Ce qu'on rencontre sur la route.
   *
   * Personne ne les affiche au mur du Héron et personne ne les paie : elles
   * arrivent. C'est la seule façon de garantir qu'une partie, quels que
   * soient les trois contrats pris, croise autre chose que des hommes.
   * Une par entre-saisons, jamais deux, et dans cet ordre. */
  const rencontre = RENCONTRES_ROUTE.find(x => !a(x.fait) && x.si());
  if(rencontre) return rencontre.scene;

  /* d) L'entre-deux : le corps, l'argent, et ce qu'on décide d'en faire. */
  if(!a('soins_' + A.saison)) return 'convalescence';

  return null;
}

DYN.entre_saisons = () => {
  const suivante = prochaineDeLEntreSaison();
  if(suivante) aller(suivante);
  else rendreHub();
};

const MACHINE = {

entre_saisons:{ dyn:true, texte:[], suite:'hub_retour' },

/* ══════════════════════════════════════════════════════════════════════════
 * LA CONVALESCENCE
 * Le seul endroit du jeu où l'on décide quoi faire de son propre corps.
 * ══════════════════════════════════════════════════════════════════════════ */
convalescence:{
  lieu:() => `Sur la route · entre deux contrats · ${["fin d'hiver","printemps","été","automne"][Math.min(ETAT.acte.saison, 3)]}`,
  titre:"L'entre-deux",
  texte:[
    "Il y a, entre deux contrats, un nombre de jours que personne ne compte et qui décide de tout le reste.",
    () => {
      const n = ETAT.blessures.length;
      if(!n) return "Vous n'avez rien de cassé. C'est plus rare qu'on ne croit et ça ne dure jamais, alors on en profite bêtement : on mange chaud, on dort deux fois de suite dans un lit, et on ne pense à rien.";
      const liste = ETAT.blessures.map(b => `**${b.zone}** — ${b.type}`).join(' · ');
      return `Vous portez ${n === 1 ? "une chose" : n + " choses"} qui ne s'en ira pas toute seule : ${liste}.`;
    },
    () => ETAT.blessures.some(b => b.saignement > 0)
      ? { sobre:"Une des plaies saigne encore. Ça ne se laisse pas.",
          intense:"Une des plaies n'a pas voulu se fermer. Elle suinte à travers le linge en deux jours et le linge devient une chose qu'on jette. Ça ne se laisse pas : une plaie qui saigne encore au bout de trois semaines est une plaie qui a décidé de vous survivre.",
          extreme:"Une des plaies n'a pas voulu se fermer. Elle suinte à travers le linge en deux jours et il faut jeter le linge. Les bords sont rouge sombre, gonflés, tièdes au dos de la main, et il en monte quelque chose de sucré qu'on sent le matin en défaisant le bandage. Trois semaines. Ça ne se laisse pas." }
      : "",
    { sobre:"Un mercenaire a trois façons de se soigner et aucune n'est bonne.",
      intense:"Un homme d'armes a trois façons de se remettre et aucune des trois n'est bonne. Il peut s'arrêter, ce qui coûte le meilleur contrat de la saison à quelqu'un d'autre. Il peut payer, ce qui coûte de l'argent et suppose de trouver quelqu'un qui sache — ce qui est rare, et ce qui est encore plus rare, c'est quelqu'un qui sache et qui ne parle pas. Ou il peut ne rien faire, ce qui ne coûte rien du tout jusqu'au jour où ça coûte tout.",
      extreme:"Un homme d'armes a trois façons de se remettre et aucune n'est bonne. S'arrêter — et le meilleur contrat de la saison part à quelqu'un d'autre. Payer — et il faut trouver quelqu'un qui sache recoudre, remettre un os et reconnaître ce qui pourrit, ce qui est rare ; quelqu'un qui sache et qui ne parle pas de ce qu'il a vu sous la chemise, ce qui l'est bien davantage. Ou ne rien faire, ce qui ne coûte rien jusqu'au jour où ça coûte tout, et ce jour-là arrive pendant qu'on a une épée dans la main." },
    "§ Il y a une quatrième façon, et vous êtes probablement le seul homme à trois provinces à la connaître.",
  ],
  choix:[
    { t:"S'arrêter. Six semaines quelque part.",
      detail:"Deux crans sur chaque plaie · le souffle revient entier · et le meilleur contrat du mur part à un autre",
      ferme:"Ferme : l'affaire la mieux payée qui restait sur le tableau",
      risque:"prudent", definitif:true, va:'conv_repos' },

    { t:"Payer quelqu'un qui sache",
      detail:"Un chirurgien de camp · cent vingt couronnes · et il aura vu ce qu'il y a sous la chemise",
      requisOr:120,
      risque:"calculé",
      test:{ carac:'presence', comp:'anatomie', dc:8, cout:{ moral:0 } },
      degres:{ dominante:'conv_paye_dom', couteuse:'conv_paye_cout', echec:'conv_paye_ko' } },

    { t:"Ne rien faire",
      detail:"Garder l'argent, garder la plaie, et prendre le contrat suivant tel qu'on est",
      risque:"dangereux", va:'conv_rien' },

    { t:"L'Onde. Sur soi-même.",
      si:() => ETAT.ressources.concentration >= 35 && ETAT.blessures.length > 0,
      detail:"Ce qui pousse sous les côtes peut refermer une chair · personne ne vous a appris comment · Volonté + Onde contre 11",
      risque:"très dangereux", definitif:true,
      test:{ carac:'volonte', comp:'onde', dc:11, cout:{ concentration:30 },
             situation:() => -ETAT.blessures.length },
      degres:{ dominante:'conv_onde_dom', couteuse:'conv_onde_cout', echec:'conv_onde_ko' } },
  ],
},

conv_repos:{
  texte:[
    "Vous vous arrêtez dans un bourg dont vous n'apprenez pas le nom, chez une veuve qui loue l'ancienne chambre de son fils et qui ne pose pas de questions parce qu'elle a arrêté d'en poser il y a quatre ans.",
    { sobre:"Six semaines. La chair se referme quand on lui laisse le temps, et pas autrement.",
      intense:"Six semaines. C'est le chiffre que donnent tous les rebouteux du monde connu, et ils le donnent parce qu'il est vrai : la chair se referme en six semaines quand on lui fout la paix, et en six mois quand on lui remet une sangle de cuirasse par-dessus tous les matins.",
      extreme:"Six semaines. C'est le chiffre que donnent tous les rebouteux, et ils le donnent parce qu'il est vrai. La chair se referme en six semaines quand on lui fout la paix ; en six mois quand on lui repasse une sangle de cuirasse par-dessus tous les matins ; jamais quand on fait ce que vous faites d'habitude. Les premiers jours sont les pires : le corps, dès qu'on cesse de lui demander quelque chose, se met à réclamer tout ce qu'on lui a pris." },
    "Vous coupez du bois pour payer la chambre. Vous le coupez mal pendant deux semaines et correctement ensuite, ce qui est la seule mesure honnête de la guérison.",
    "§ Et pendant six semaines, un mur d'auberge à quarante lieues d'ici perd un papier.",
    () => {
      const perdue = ETAT.acte.arcsPerdus.length
        ? AFFAIRES.find(x => x.id === ETAT.acte.arcsPerdus[ETAT.acte.arcsPerdus.length - 1]) : null;
      return perdue
        ? `Quand vous reprenez la route, **${perdue.titre}** n'est plus au mur. Quelqu'un d'autre l'a décrochée, quelqu'un d'autre l'a faite ou l'a ratée, et personne ne vous en informera jamais.`
        : "Quand vous reprenez la route, le mur du Héron n'a rien perdu de ce qui vous intéressait. C'est de la chance, et vous n'y êtes pour rien.";
    },
  ],
  effets:{ tags:["six semaines"] },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

conv_paye_dom:{
  texte:[
    "Il s'appelle Ourdel, il a servi douze ans dans une compagnie franche du sud, et il exerce désormais dans l'arrière-salle d'un relais de poste avec deux caisses, une lampe et une bouilloire.",
    "C'est la bouilloire qui vous décide : un homme qui fait bouillir ses instruments a compris quelque chose que quatre-vingt-dix-neuf médecins sur cent n'ont pas compris, et il l'a compris en regardant mourir des gens.",
    { sobre:"Il travaille en silence. C'est bien fait.",
      intense:"Il travaille en silence, vite, et il ne commente rien. Il rouvre ce qui s'était refermé sur du mauvais, il nettoie au vin cuit, il recoud à points séparés — jamais au surjet, dit-il, un surjet qui s'infecte lâche sur toute la longueur — et il pose par-dessus un cataplasme dont il refuse de dire la composition.",
      extreme:"Il travaille en silence et vite. Il rouvre au bistouri ce qui s'était refermé sur du mauvais et il en sort ce qu'il faut en sortir, et ce qu'il en sort a une couleur et une odeur qui vous apprennent à quel point vous êtes passé près. Il nettoie au vin cuit, il recoud à points séparés — jamais au surjet, dit-il, un surjet qui s'infecte lâche sur toute la longueur — et il pose par-dessus un cataplasme dont il refuse de dire la composition. Ça brûle pendant une heure. Ensuite ça ne brûle plus jamais." },
    "Il ne vous regarde pas une seule fois dans les yeux pendant tout le travail. À la fin, il se lave les mains, il les essuie, et il vous regarde.",
    "« Vous avez une cicatrice sous la clavicule gauche qui n'a pas été faite par une arme. »",
    "« Non. »",
    "« Je n'ai rien demandé, messire. Je constate à voix haute parce que c'est mon métier de constater, et je vais maintenant l'oublier parce que c'est mon métier de l'oublier. »",
    "§ Cent vingt couronnes. Il les a valu deux fois et il n'a pas dit un mot de trop.",
  ],
  effets:{ or:-120, flags:['ourdel'],
           marque:"Ourdel, chirurgien de camp, vous a recousu sans poser de question.", court:"Ourdel" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

conv_paye_cout:{
  texte:[
    "Il s'appelle Ourdel et il fait ce qu'il faut faire, correctement, avec des instruments qu'il fait bouillir.",
    { sobre:"Ça se passe bien. C'est après que ça se complique.",
      intense:"Le travail est bon. C'est ce qui vient après qui ne l'est pas : Ourdel a une femme, la femme a une sœur, et la sœur tient le relais de poste où passent onze courriers par semaine.",
      extreme:"Le travail est bon — rouvert, nettoyé, recousu à points séparés. C'est ce qui vient après qui ne l'est pas. Ourdel a une femme, la femme a une sœur, et la sœur tient le relais de poste par où passent onze courriers par semaine ; et une plaie de quatre pouces à l'arrière du bras, sur un homme seul qui paie comptant et ne donne pas son nom, ça se raconte à table le soir même, sans malice et sans y penser." },
    "Vous l'apprenez trois semaines plus tard, dans une autre auberge, en entendant un charretier décrire, de mémoire et avec des gestes, exactement où vous êtes blessé.",
    "§ On ne paie jamais un soin cent vingt couronnes. On le paie cent vingt couronnes et le reste, plus tard.",
  ],
  effets:{ or:-120, suspicion:8,
           exploit:{ eclat:5, temoins:'quelques', quoi:"on décrit vos blessures dans les relais de poste" },
           marque:"Un chirurgien de camp vous a soigné, et sa belle-sœur tient un relais de poste.",
           court:"On vous décrit" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

conv_paye_ko:{
  texte:[
    "Il n'y a pas d'Ourdel dans ce bourg-là. Il y a un barbier.",
    { sobre:"Un barbier saigne, arrache et recoud, dans cet ordre et avec le même fer.",
      intense:"Un barbier saigne, arrache et recoud, dans cet ordre, avec le même fer et sans le passer dans quoi que ce soit entre deux clients. Il vous ouvre à nouveau ce qui commençait à tenir, il fouille, il ne trouve pas ce qu'il cherche parce qu'il ne cherche rien de précis, et il referme en serrant trop.",
      extreme:"Un barbier saigne, arrache et recoud, dans cet ordre, avec le même fer et sans le passer dans quoi que ce soit entre deux clients — le vôtre a servi le matin à ouvrir un abcès dentaire. Il rouvre ce qui commençait à tenir, il fouille sans chercher rien de précis, et il referme en serrant trop, ce qui fait un bourrelet dur et blanc où le sang ne circule plus. Vous payez. On paie toujours." },
    "Ça enfle le quatrième jour et ça reste chaud pendant deux semaines.",
    "§ Cent vingt couronnes pour être moins bien qu'avant. C'est le tarif de qui ne sait pas à qui il s'adresse.",
  ],
  effets:{ or:-120, cout:{ vitalite:8, moral:6 },
           marque:"Un barbier vous a rouvert ce qui tenait, avec un fer qui avait servi le matin.",
           court:"Le barbier" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

conv_rien:{
  texte:[
    "Vous ne faites rien.",
    "Vous resserrez les sangles par-dessus, vous changez le linge quand il devient impossible, et vous prenez le contrat suivant dans l'état exact où le précédent vous a laissé.",
    { sobre:"Ça tient. Ça tient toujours, jusqu'au moment où ça ne tient plus.",
      intense:"Ça tient. Ça tient toujours — le corps est étonnamment complaisant tant qu'on ne lui demande pas d'être complaisant deux fois le même jour. Ce qui cède, ce n'est jamais la plaie : c'est le geste qu'on ne fait plus tout à fait pareil parce qu'on l'a mille fois évité pour ne pas avoir mal.",
      extreme:"Ça tient. Le corps est complaisant tant qu'on ne lui demande pas d'être complaisant deux fois le même jour. Et ce qui cède n'est jamais la plaie : c'est le geste. Vous avez passé six semaines à éviter mille fois un mouvement précis pour ne pas avoir mal, et vous l'avez désappris — et le jour où il faudra le faire sans réfléchir, il ne sera plus là." },
    "§ On garde l'argent. C'est déjà quelque chose, et dans ce métier c'est souvent tout.",
  ],
  effets:{ flags:['conv_neglige'],
           marque:"Vous êtes reparti sans rien soigner.", court:"Rien soigné" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

conv_onde_dom:{
  texte:[
    "Personne ne vous a jamais appris à faire ça. Il n'y a personne pour l'apprendre à qui que ce soit : ceux qui savaient sont morts il y a dix-neuf ans, dans une maison qui a brûlé, avec les livres.",
    "Vous savez seulement que votre mère le faisait. Vous aviez cinq ans, vous vous étiez ouvert le genou sur un muret, et elle avait posé la main dessus en fronçant les sourcils comme quelqu'un qui compte.",
    { sobre:"Vous posez la main. Vous cessez de retenir, très légèrement.",
      intense:"Vous posez la main à plat sur la plaie et vous cessez de retenir — très légèrement, avec la prudence d'un homme qui ouvre un robinet dont il sait qu'il n'a pas de fermeture. L'air prend son goût de pièce de monnaie. Et sous la paume, quelque chose se met à tirer : pas une chaleur, pas une douleur — une traction, comme si la chair d'un côté cherchait la chair de l'autre et n'avait eu besoin, pendant tout ce temps, que de quelqu'un pour lui dire où c'était.",
      extreme:"Vous posez la main à plat sur la plaie et vous cessez de retenir, très légèrement, avec la prudence d'un homme qui ouvre un robinet sans fermeture. L'air prend son goût de pièce de monnaie sous la langue. Sous la paume, quelque chose se met à tirer — pas une chaleur, pas une douleur : une traction. Les bords se rapprochent et se prennent, en travers, par petits points, avec une sensation exacte de fil qu'on serre depuis l'intérieur. Quand vous retirez la main, il y a un bourrelet neuf, rose, propre, et vous êtes trempé de sueur froide comme après une course." },
    "§ Vous avez trente ans et vous venez de découvrir quelque chose que vous saviez faire depuis toujours.",
    "C'est la partie qu'on ne raconte pas, sur les Parias : ce qu'on leur a pris n'était pas seulement des terres et un nom. On leur a pris les gens qui savaient à quoi servait ce qu'ils portaient sous les côtes.",
    "Il n'y avait personne pour vous le dire. Il n'y a toujours personne.",
  ],
  effets:{ flags:['onde_sur_soi'], cout:{ endurance:10 },
           marque:"Vous avez refermé votre propre chair avec l'Onde. Personne ne vous l'a appris.",
           court:"L'Onde sur soi" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

conv_onde_cout:{
  texte:[
    "Vous posez la main. Ça vient — et ça ne s'arrête pas où il faudrait.",
    { sobre:"La plaie se ferme. Elle se ferme sur ce qu'il y avait dedans.",
      intense:"La plaie se ferme. Elle se ferme vite, complètement, et elle se ferme **sur ce qu'il y avait dedans** — parce que personne ne vous a expliqué qu'il fallait nettoyer d'abord, et que ce qui tire les bords l'un vers l'autre ne fait aucune différence entre de la chair et le reste.",
      extreme:"La plaie se ferme, vite et complètement, et elle se ferme **sur ce qu'il y avait dedans** : un fil de laine, une écaille de rouille, et ce qui poussait déjà dessus. Personne ne vous a expliqué qu'on nettoie d'abord. Ce qui tire les bords l'un vers l'autre ne fait aucune différence entre de la chair et le reste, et vous venez d'enfermer sous une peau neuve, lisse et parfaitement saine, une chose qui a de quoi manger pour trois mois." },
    "Ça ne fait pas mal. Ça ne fera pas mal avant longtemps. C'est très exactement le problème.",
    "§ Il y a des dons qu'on ne devrait pas exercer sans quelqu'un pour vous regarder faire.",
  ],
  effets:{ flags:['onde_sur_soi','onde_enferme'], cout:{ endurance:14 },
           blessure:{ id:'sous_la_peau', zone:"Sous la peau", type:"refermé sur ce qu'il y avait dedans",
                      gravite:1, douleur:0, saignement:0, fonction:['endurance'],
                      cicatrice:"une peau neuve, lisse, et ce qu'il y a dessous" },
           marque:"Vous avez refermé une plaie avec l'Onde, sur ce qu'il y avait dedans.",
           court:"Sous la peau" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

conv_onde_ko:{
  texte:[
    "Vous posez la main et vous cherchez l'endroit, et l'endroit n'est pas là où vous croyez.",
    { sobre:"Ça part de travers. Vous perdez connaissance pour la première fois de votre vie sans avoir été frappé.",
      intense:"Ça part de travers et ça prend au lieu de rendre. Vous perdez connaissance — pour la première fois de votre vie sans avoir été frappé par quoi que ce soit — et vous revenez à vous sur le sol d'une chambre louée, sur le côté, la bouche pleine de sang parce que vous vous êtes mordu.",
      extreme:"Ça part de travers et ça prend au lieu de rendre. Vous perdez connaissance pour la première fois de votre vie sans avoir été frappé, et vous revenez à vous sur le plancher d'une chambre louée, sur le côté, dans une flaque, la bouche pleine de sang parce que vous vous êtes mordu la langue en travers. Le bras qui touchait la plaie ne répond pas pendant deux heures. Quand il revient, il revient en fourmillant, et il fourmillera à froid pendant des années." },
    "§ On ne s'improvise pas dans une chose dont tous ceux qui savaient sont morts.",
    "La plaie est exactement dans le même état. Vous, non.",
  ],
  effets:{ cout:{ vitalite:10, concentration:20, moral:8 },
           marque:"L'Onde s'est retournée contre vous dans une chambre louée.", court:"Retournée" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

};

/* ══════════════════════════════════════════════════════════════════════════
 * 2 · CE QU'ON N'A PAS PRIS
 *
 * Une affaire laissée sur le mur ne dort pas en attendant le basculement.
 * Elle avance. Et elle vous croise, une fois, pendant que vous êtes occupé
 * ailleurs — assez pour savoir, jamais assez pour agir.
 * ══════════════════════════════════════════════════════════════════════════ */
const ECHOS = {

C01:{
  lieu:"Un relais d'étape · sur la route du sud",
  titre:"Ceux qui descendent",
  texte:[
    "Ils arrivent par groupes de six ou huit, à pied, avec des ballots et des enfants, et le sergent d'étape les compte sans rien écrire parce qu'on n'écrit pas les gens qui ne vont nulle part.",
    "Ce sont les trois villages du bas du gué de Cendrepont. Le sel ne passe plus, la Route Grise est fermée depuis novembre, et un village qui vit du sel meurt en quatre mois.",
    { sobre:"Une femme demande s'il y a du travail plus au sud. Il n'y en a pas.",
      intense:"Une femme d'une quarantaine d'années demande, poliment, s'il y a du travail plus au sud. Il n'y en a pas — il n'y en a jamais en fin d'hiver, tout le monde le sait, et elle le sait aussi ; elle demande pour la même raison qu'on frappe à une porte dont on a vu la serrure cassée.",
      extreme:"Une femme d'une quarantaine d'années demande poliment s'il y a du travail plus au sud. Il n'y en a pas et elle le sait ; elle demande pour la même raison qu'on frappe à une porte dont on a vu la serrure cassée. Deux de ses enfants ont les gencives blanches et les jambes marbrées de taches sombres, ce qui n'a rien à voir avec une bête au-dessus d'une route et tout à voir avec quatre mois sans sel ni viande." },
    "§ Une wyverne ne tue pas onze personnes. Elle ferme une route, et la route en tue trois cents.",
    "Le papier est toujours au mur du Héron. Deux cent cinquante couronnes. Personne ne l'a pris.",
  ],
  effets:{ cout:{ moral:6 }, flags:['vu_cendrepont'],
           marque:"Vous avez croisé les gens du bas du gué sur la route du sud.", court:"Cendrepont descend" },
},

C02:{
  lieu:"Un carrefour · trois lieues avant la Côte des Dents",
  titre:"Ce qu'on trouve aux carrefours",
  texte:[
    "Ils sont trois, alignés au bord du fossé, à l'endroit où les patrouilles de Rochebrune font demi-tour depuis un mois parce qu'elles ne vont plus au-delà.",
    { sobre:"On leur a pris le visage. Proprement, et de leur vivant.",
      intense:"On leur a pris le visage. Ce n'est pas une image : le travail a été fait au couteau fin, de la racine des cheveux au menton, en suivant l'os, et les trois plaies sont identiques à la ligne près — ce qui veut dire une main sûre, du temps, et l'absence totale de gêne.",
      extreme:"On leur a pris le visage. Au couteau fin, de la racine des cheveux au menton, en suivant l'os, et les trois plaies sont identiques à la ligne près : une main sûre, du temps, et aucune gêne. Le troisième a les poignets ouverts sur la corde par laquelle il s'est débattu, ce qui règle la seule question qu'on aurait pu se poser sur l'ordre des opérations." },
    "Un sergent de Rochebrune vous explique, sans qu'on lui demande rien, qu'on a un suspect, qu'on l'aura, et que la maison ne paie plus le contrat parce que la maison a désormais un homme à elle sur l'affaire.",
    "Il dit ça d'une voix qui répète quelque chose qu'on lui a fait apprendre.",
    "§ Une maison qui retire son propre contrat au bout de six semaines a trouvé quelque chose. Ou a compris quelque chose.",
  ],
  effets:{ flags:['vu_rochebrune'], suspicion:0,
           marque:"Trois patrouilleurs sans visage à un carrefour, et Rochebrune a retiré son contrat.",
           court:"Rochebrune" },
},

C03:{
  lieu:"Un chemin de contreforts · à la nuit",
  titre:"La sœur",
  texte:[
    "Elle voyage avec quatre hommes d'armes qui ne la protègent pas : ils l'escortent, ce qui est un autre métier et qui se voit à la façon dont ils se placent.",
    "Maëlys d'Arquenay a vingt ans. Elle descend vers le sud pour un mariage dont la date a été avancée de quatre mois, et elle demande à votre feu de camp la permission de s'asseoir parce que le sien est à trente pas et qu'elle a besoin de trente pas.",
    "« Vous montez ou vous descendez ? »",
    "« Je passe. »",
    "« Personne ne passe dans les contreforts. On y monte pour une raison, et on en redescend sans. »",
    { sobre:"Elle ne parle pas de son frère. Elle en parle tout le temps.",
      intense:"Elle ne prononce pas le nom de son frère une seule fois, et elle parle de lui pendant vingt minutes : de la galerie que leur maison a fait ouvrir en fraude sous les contreforts, des mineurs qui y descendent et de ceux qui n'en sont pas ressortis, et de ce qu'un garçon de vingt-deux ans fait quand il découvre d'où vient l'argent qui paie sa selle.",
      extreme:"Elle ne prononce pas le nom de son frère une seule fois et elle parle de lui pendant vingt minutes : de la galerie que leur maison a fait ouvrir en fraude sous les contreforts, des mineurs qui y descendent, des quatorze prisonniers qu'on y a vendus l'automne dernier et dont personne ne tient le compte, et de ce que fait un garçon de vingt-deux ans le jour où il comprend d'où sort l'argent qui a payé sa selle." },
    "§ Personne ne cherche plus Gaspard d'Arquenay. Le contrat est resté au mur six semaines et il n'y est plus.",
    "Elle se lève, elle vous remercie de l'avoir laissée s'asseoir, et elle retourne à ses trente pas.",
  ],
  effets:{ flags:['vu_arquenay'], cout:{ moral:4 },
           marque:"Vous avez partagé un feu avec Maëlys d'Arquenay, qui descend se marier.",
           court:"Maëlys" },
},

C04:{
  lieu:"La cour de Vauclair · un jour de marché",
  titre:"Trois",
  texte:[
    "On ne les a pas jugés. On a lu la sentence, ce qui n'est pas la même chose et ce qui prend onze minutes au lieu de trois jours.",
    { sobre:"Ils sont pendus dans la cour, devant le marché, à midi.",
      intense:"On les pend dans la cour de Vauclair à midi, un jour de marché, à trois cordes montées sur la même poutre. Ils sont jeunes. Le plus âgé a peut-être vingt-huit ans. Aucun des trois ne parle, ce qui surprend la foule, parce que la foule est venue pour ça.",
      extreme:"On les pend dans la cour de Vauclair à midi, un jour de marché, à trois cordes sur la même poutre. On n'a pas fait de nœud coulant réglementaire et on ne les a pas lâchés d'assez haut, ce qui veut dire que ça ne casse pas la nuque et que ça prend le temps que ça prend. Aucun des trois ne parle. La foule s'attendait à ce qu'ils parlent — c'est pour ça qu'elle est venue — et ce silence-là lui gâche complètement l'après-midi." },
    "§ Vauclair payait le triple pour qu'ils arrivent vivants. Ils sont arrivés vivants. Ils ont été pendus le lendemain sans être entendus.",
    "Ce n'est pas un revirement. C'est le contrat qui était écrit comme ça depuis le début, et vous êtes probablement le seul dans cette cour à savoir lire la différence.",
    "Dans le mois, on dispersera la communauté de serfs fugitifs des marais que les trois protégeaient. On en retrouvera onze dans les tourbières.",
  ],
  effets:{ flags:['vu_vauclair'], cout:{ moral:5 },
           marque:"Les trois frères ont été pendus sans être entendus, dans la cour de Vauclair.",
           court:"Les trois frères" },
},

C05:{
  lieu:"Le vieux pont · ce qu'il en reste",
  titre:"Quatre jours",
  texte:[
    "Ils l'ont eu à la poudre. C'est la solution qu'on trouve quand on a de la poudre et pas d'idée, et elle marche toujours, à un détail près.",
    { sobre:"Le pont est en bas dans la rivière. Le troll est dessous. Il a mis quatre jours.",
      intense:"Le pont est en bas, dans la rivière, en trois morceaux. Le troll est dessous. Il a mis quatre jours à mourir et on l'entendait depuis le bourg, à une lieue — pas des cris : une plainte à deux notes, régulière, qui s'arrêtait la nuit et reprenait à l'aube, et qui a duré quatre jours.",
      extreme:"Le pont est dans la rivière en trois morceaux. Le troll est dessous, pris du bassin aux épaules sous une pile de douze pieds. Il a mis quatre jours à mourir et on l'entendait du bourg à une lieue : pas des cris — une plainte à deux notes, régulière, qui s'arrêtait la nuit et reprenait à l'aube. Le troisième jour, deux hommes du bourg sont montés avec des arbalètes pour abréger. Ils sont redescendus sans avoir tiré, et ils n'ont jamais expliqué pourquoi." },
    "Le grain de Sombreval est passé. On a rebâti un pont neuf à trois cents pas en amont, en bois, laid et solide.",
    "§ Il ne demandait plus de péage. Il demandait une histoire vraie, et il en avait entendu, depuis deux cents ans, plus que n'importe qui dans cette province.",
    "Personne à Sombreval ne raconte plus rien à personne sur ce pont-là. C'est un pont neuf. On y passe.",
  ],
  effets:{ flags:['vu_sombreval'], cout:{ moral:4 },
           marque:"Le troll du vieux pont a mis quatre jours à mourir sous les décombres.",
           court:"Le vieux pont" },
},

C06:{
  lieu:"Une auberge de la route de Hauterive",
  titre:"La fièvre",
  texte:[
    "On la ramène en litière fermée, escortée par une compagnie qui n'a posé aucune question parce qu'on l'a payée pour ne pas en poser — c'est écrit dans les termes, en toutes lettres, et c'est même le seul point sur lequel l'époux a insisté avant de dire combien.",
    "La litière s'arrête à l'auberge pour la nuit. On ne l'ouvre pas.",
    { sobre:"Vous n'apercevez rien. Vous entendez, à travers la cloison.",
      intense:"Vous n'apercevez rien du tout. Vous entendez, à travers une cloison de planches, une femme parler pendant une heure et demie à quelqu'un qui ne répond pas — d'une voix posée, articulée, sans larmes, du ton exact de quelqu'un qui dicte.",
      extreme:"Vous n'apercevez rien. Vous entendez, à travers une cloison de planches, une femme parler pendant une heure et demie à quelqu'un qui ne lui répond jamais. Pas de larmes, pas de supplication : une voix posée, articulée, qui reprend deux fois la même phrase quand la première n'a pas été comprise. Le ton exact de quelqu'un qui dicte, et qui sait qu'on n'écrit pas." },
    "Au matin, la litière repart.",
    "§ Isabeau de Hauterive, trente et un ans. On dira une fièvre, en Prairial.",
    "Ce qu'elle emportait — et elle emportait quelque chose, une femme qu'on paie si cher à récupérer emporte toujours quelque chose — ne sera jamais retrouvé. Son époux siégera au conseil de la province avant l'automne.",
  ],
  effets:{ flags:['vu_hauterive'], cout:{ moral:5 },
           marque:"Vous avez dormi de l'autre côté d'une cloison, la nuit où on ramenait Isabeau de Hauterive.",
           court:"Hauterive" },
},

};

/* Chaque écho devient une scène ordinaire, et revient à l'entre-saisons. */
for(const [id, e] of Object.entries(ECHOS)){
  MACHINE['echo_' + id] = Object.assign({}, e, {
    effets: Object.assign({}, e.effets, {
      flags: (e.effets.flags || []).concat(['echo_' + id]),
    }),
    suite:'entre_saisons', libelleSuite:"Reprendre la route",
  });
}

/* ══════════════════════════════════════════════════════════════════════════
 * 4 · LE SECOND BATTEMENT KARLSBERG
 *
 * Ce qu'on a fait de la borne de Cendrepont revient dire ce que ça valait.
 * Quatre états, quatre retours — dont un où il ne se passe rien, et c'est
 * celui-là qui coûte le plus cher.
 * ══════════════════════════════════════════════════════════════════════════ */
const BATTEMENT_KARLSBERG = [
  { si:() => a('wy_borne_dite'),      scene:'karls_lettre' },
  { si:() => a('wy_pierre_karlsberg'), scene:'karls_pierre' },
  { si:() => a('wy_borne_intacte'),    scene:'karls_gamin' },
  { si:() => a('wy_borne_effacee'),    scene:'karls_rien' },
];

Object.assign(MACHINE, {

karls_lettre:{
  lieu:"Un relais de poste · une lettre qui vous a suivi trois semaines",
  titre:"Ce qu'il y avait dans le coffre",
  qui:'heloise',
  texte:[
    "Elle a mis trois semaines à vous trouver, ce qui est déjà un renseignement : une femme qui vend sa tour à l'automne a payé trois courriers pour retrouver un homme d'armes sans nom.",
    "Le sceau est celui de Valombre — un héron sur trois vagues. L'écriture est petite, régulière, et sans une seule rature.",
    "*Messire,*",
    "*J'ai fait lire les relevés. Il y en avait deux cent onze, dont quarante-trois antérieurs à l'établissement de ma maison sur cette route. Ils sont en latin d'arpentage et il m'a fallu un clerc de Chastel, que j'ai payé pour trois jours et qui a travaillé quatre.*",
    "*La gorge de Cendrepont — le gué, la falaise, le droit de passage et le quart du sel — figure au relevé de la cent-quarante-troisième année sous un nom que je ne transcrirai pas ici. Vous savez lequel. Vous le saviez en montant l'escalier.*",
    "§ *Je n'ai pas l'intention d'en faire quoi que ce soit. Je vous écris pour que vous sachiez que je le sais, ce qui vaut mieux, entre nous, que le contraire.*",
    "*Ma maison prélève depuis six générations sur une route qui ne lui appartenait pas. La vôtre n'existe plus. Le clerc de Chastel, lui, existe, il a vingt-six ans, et il a passé quatre jours à lire des relevés qu'il n'a pas payés.*",
    "*Je ne peux rien pour ce dernier point.*",
    "*H. de V.*",
    { sobre:"Vous relisez deux fois, puis vous brûlez la lettre.",
      intense:"Vous la relisez deux fois. Puis vous la brûlez, dans l'âtre du relais, en la tenant par un coin jusqu'à ce que la flamme atteigne les doigts — parce qu'une lettre à demi brûlée dans un âtre, ça se ramasse, et parce qu'un homme qui a survécu dix-neuf ans a acquis ce genre de réflexes à la place d'autres, plus utiles au bonheur.",
      extreme:"Vous la relisez deux fois. Puis vous la brûlez dans l'âtre du relais, en la tenant par un coin jusqu'à ce que la flamme vous atteigne les doigts — une lettre à demi brûlée, ça se ramasse. Vous regardez le sceau de cire fondre et couler, et le héron sur trois vagues devient une petite flaque rouge sans forme, ce qui arrive à toutes les maisons et ce qui est arrivé à la vôtre en une nuit." },
    "Il y a un clerc de vingt-six ans, à Chastel, qui a lu quarante-trois relevés et qui n'a pas été payé pour se taire.",
  ],
  effets:{ flags:['karlsberg_2','clerc_chastel'], suspicion:12,
           marque:"Héloïse de Valombre a fait lire ses archives. Un clerc de Chastel les a lues aussi.",
           court:"Le clerc" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

karls_pierre:{
  lieu:"Un atelier de tailleur de pierre · sur la route",
  titre:"Quarante livres",
  texte:[
    "Quarante livres de schiste gravé, ça ne se porte pas indéfiniment sur le garrot d'un cheval. Il faut soit s'en défaire, soit trouver où le mettre, et vous n'avez nulle part où mettre quoi que ce soit.",
    "L'atelier est celui d'un tailleur qui fournit des margelles de puits et des linteaux, et qui accepte de garder des choses contre paiement parce que c'est un homme qui a un hangar et pas assez de commandes.",
    { sobre:"Il regarde la pierre plus longtemps qu'il ne devrait.",
      intense:"Il la déballe pour l'inventaire, ce qui est normal, et il la regarde plus longtemps qu'un homme ne regarde un bloc de schiste. Puis il passe le pouce dans le sillon du loup, dans le sens de la gravure, deux fois.",
      extreme:"Il la déballe pour l'inventaire et il la regarde beaucoup plus longtemps qu'un homme ne regarde un bloc de schiste. Puis il passe le pouce dans le sillon, dans le sens de la gravure, deux fois — le geste exact d'un homme du métier qui lit une taille comme un autre lit une écriture, et qui vient d'y reconnaître une main." },
    "« C'est de l'arpentage impérial. Ça vient d'une borne. »",
    "« Oui. »",
    "« On ne démonte pas une borne, messire. C'est une pierre de justice. Il y a des gens qu'on a pendus pour ça, et pas il y a longtemps. »",
    "« Je sais. »",
    "Il se redresse et il s'essuie les mains, et il fait une chose que vous n'attendiez pas : il rabat la toile par-dessus.",
    "« Mon grand-père a taillé pour une maison qui a été rayée. Pas la vôtre — une autre, plus au sud, il y a quarante ans. Il en a parlé une fois, à la fin, et il en a parlé pour dire qu'il avait continué à être payé pendant deux ans par des gens qui n'existaient plus, parce que l'intendant n'avait pas reçu l'ordre d'arrêter. »",
    "§ « Deux sous par semaine. Et je ne l'inscris pas au registre du hangar. »",
    "Vous avez maintenant, quelque part dans cette province, quarante livres de pierre qui disent qui vous êtes, dans le hangar d'un homme dont vous ne connaissez que le prénom.",
  ],
  effets:{ flags:['karlsberg_2','pierre_en_depot'], suspicion:6,
           marque:"La face gravée de la borne dort dans le hangar d'un tailleur de pierre, hors registre.",
           court:"En dépôt" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

karls_gamin:{
  lieu:"L'auberge du Héron · la salle basse",
  titre:"Le garçon qui est monté",
  texte:[
    "Il a quinze ans, il s'appelle Loys, et il est monté à la falaise de Cendrepont pour la seule raison pour laquelle un garçon de quinze ans monte quelque part : parce que trois autres ont dit qu'il n'oserait pas.",
    "Il raconte ça debout sur un banc, dans une salle pleine, à des gens qui l'écoutent parce que la Route Grise est rouverte et qu'on peut enfin en parler.",
    { sobre:"Il décrit le nid, les os, la borne. Il décrit le loup.",
      intense:"Il décrit le nid, les casques, l'essieu de chariot, le soulier d'enfant. Puis il décrit la borne, et il la décrit bien — quatre faces, trois gravées — et il dit qu'il a gratté la quatrième avec son couteau parce qu'elle était sous une croûte, et qu'il y avait dessous un chien.",
      extreme:"Il décrit le nid, les trois casques, l'essieu, le soulier d'enfant tanné par le gel. Puis la borne — quatre faces, trois gravées — et il dit qu'il a gratté la dernière avec son couteau parce qu'elle était sous une croûte, et qu'il y avait dessous un chien." },
    "« C'est pas un chien, dit un vieux du fond. C'est un loup. »",
    "La salle rit. Le vieux ne rit pas. Il a soixante-dix ans, il a passé sa vie à charrier du sel sur cette route, et il regarde son gobelet.",
    "« Y avait un loup sur les bornes du haut, dit-il enfin. Quand j'étais gosse. On disait le domaine du Loup. Personne savait de qui. »",
    "§ Une vallée a de la mémoire. Elle l'a en morceaux, chez des vieillards, dans des choses qu'on dit une fois et qu'on ne redit jamais — et il suffit d'un garçon de quinze ans avec un couteau pour recoller deux morceaux.",
    "Vous êtes assis à quatre pas. Personne ne vous regarde. Personne n'a aucune raison de vous regarder.",
    "Pour l'instant.",
  ],
  effets:{ flags:['karlsberg_2','loys','vallee_se_souvient'], suspicion:16,
           marque:"Un garçon de quinze ans a gratté la borne et un vieux a dit « le domaine du Loup ».",
           court:"Le domaine du Loup" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

karls_rien:{
  lieu:"Sur la route · un soir sans rien",
  titre:"Ce qui n'arrive pas",
  texte:[
    "Il ne se passe rien.",
    "Il ne se passe rien parce qu'il n'y a plus rien à quoi il puisse arriver quelque chose : la face sud d'une borne d'arpentage au-dessus du gué de Cendrepont est une surface entaillée en croisillons que le gel finira d'effacer, et personne au monde ne montera jamais à cent quarante pieds pour regarder une pierre abîmée.",
    { sobre:"Vous y pensez un soir, sans raison particulière.",
      intense:"Vous y pensez un soir, sans raison, en regardant un feu de camp qui ne fait rien de remarquable. Vous pensez à trois heures dans le noir, à genoux dans une odeur, avec une dague dont la pointe a cassé à la deuxième heure.",
      extreme:"Vous y pensez un soir, sans raison, devant un feu qui ne fait rien de remarquable. Trois heures à genoux dans le noir, dans cette odeur, avec une dague dont la pointe a cassé à la deuxième heure et un moment — vous vous en souvenez très bien — où vous avez cessé de graver et où vous vous êtes mis à frapper." },
    "Dix-neuf ans que des gens sont payés pour effacer cette maison. Ils ont fait du bon travail. Vous avez fait mieux qu'eux en une nuit, parce que vous saviez exactement quoi effacer et qu'eux ne l'ont jamais su.",
    "§ C'est le choix le plus raisonnable de toute cette affaire, et c'est le seul dont vous n'arrivez pas à vous féliciter.",
    "Vous êtes plus en sécurité qu'avant. Il n'y a plus, dans le monde connu, une seule pierre qui dise que la maison Karlsberg a possédé quoi que ce soit.",
    "Il n'y a plus que vous. Et vous êtes une chose qui se tue.",
  ],
  effets:{ flags:['karlsberg_2','borne_perdue'], cout:{ moral:10 }, suspicion:-4,
           marque:"Il ne reste plus une seule pierre au monde qui dise ce que Karlsberg possédait.",
           court:"Plus une pierre" },
  suite:'entre_saisons', libelleSuite:"Reprendre la route" },

/* ══════════════════════════════════════════════════════════════════════════
 * 1 · LES PALIERS DE RENOM
 * On ne franchit pas un seuil : le monde change de comportement autour de
 * vous, et on ne vous demande pas votre avis.
 * ══════════════════════════════════════════════════════════════════════════ */
palier_nomme:{
  lieu:"L'auberge du Héron · la salle basse",
  titre:"« Yohan »",
  qui:'sergent',
  texte:[
    "L'aubergiste vous arrête au passage avec cette gêne particulière des gens qui doivent transmettre quelque chose qu'ils auraient préféré ne pas avoir à transmettre.",
    "« Un homme est venu. Il a demandé Yohan. »",
    "« Quel Yohan ? »",
    "« C'est ce que je lui ai dit, messire. Il a répondu : celui qui a fait la chose dont tout le monde parle. »",
    { sobre:"Ça y est. Le nom circule tout seul, maintenant.",
      intense:"Ça y est. Le nom circule tout seul et il n'a plus besoin de vous : il voyage dans des conversations où vous n'êtes pas, il se recopie sur des registres d'étape, et il arrive quelque part chaque fois qu'un homme raconte à un autre quelque chose qu'il a vu ou qu'on lui a raconté.",
      extreme:"Ça y est. Le nom circule tout seul, sans vous. Il voyage dans des conversations où vous n'êtes pas, il se recopie sur des registres d'étape que des gens paient pour lire, et il arrive quelque part de nouveau chaque fois qu'un homme raconte à un autre une chose qu'il a vue — ou, ce qui est pire, une chose qu'on lui a racontée et qu'il améliore." },
    "§ Onze ans à n'être personne. Onze ans qui viennent de finir dans une salle basse, un jour de semaine, par une phrase d'aubergiste.",
    "Ce n'est pas que du mauvais. Une maison qui demande un homme par son nom paie ce nom : les sommes du mur montent de moitié à partir d'aujourd'hui, et on cesse de vous proposer des escortes de laine.",
    "Ce qui monte aussi, c'est le nombre de gens qui n'ont pas besoin de vous pour du travail.",
    "@« Il a laissé un nom, l'homme ? »",
    "« Non, messire. Il a laissé un signalement. Le vôtre. »",
  ],
  effets:{ flags:['palier_nomme'],
           marque:"On vous demande par votre prénom à l'auberge du Héron. Les sommes montent de moitié.",
           court:"On vous demande" },
  suite:'entre_saisons', libelleSuite:"Continuer" },

palier_karlsberg:{
  lieu:"Quelque part · le soir",
  titre:"Le nom entier",
  texte:[
    "Ce n'est pas une rumeur de taverne. Une rumeur de taverne ne comporte pas de date.",
    { sobre:"Quelqu'un a fait le rapprochement, l'a écrit, et l'a rangé dans un dossier.",
      intense:"Quelqu'un, quelque part, a mis côte à côte trois choses qui traînaient dans trois endroits différents : un homme d'armes qui fait ce que ne fait aucun homme d'armes, une gorge de montagne qui figurait autrefois au relevé sous un nom qu'on ne prononce plus, et une liste de sept cents personnes dont on n'a jamais retrouvé quarante et une.",
      extreme:"Quelqu'un a mis côte à côte trois choses qui traînaient dans trois endroits : un homme d'armes qui fait ce qu'aucun homme d'armes ne fait, une gorge qui figurait autrefois au relevé sous un nom qu'on ne prononce plus, et une liste de sept cents personnes dont quarante et une n'ont jamais été retrouvées. Il a écrit la conclusion en une ligne, il a mis une date en marge, et il a classé le tout — ce qui est très exactement ce que faisaient les gens qui ont rayé votre maison, avec le même papier et probablement dans le même bâtiment." },
    "§ « Nous cherchons Yohan de Karlsberg. »",
    "Le nom entier. Celui que vous n'avez donné à personne qui ne soit pas mort depuis.",
    "Ce qui vous cherche à partir de ce soir n'a plus rien d'un commanditaire. Ça ne clouera pas de papier au mur d'une auberge, ça ne négociera pas de termes, et ça ne vous demandera pas si la coutume vous est due.",
    "Il y a aussi, quelque part, deux ou trois personnes pour qui ce nom-là veut dire autre chose. Elles sont beaucoup moins nombreuses et beaucoup plus lentes, mais elles existent, et elles ont attendu dix-neuf ans.",
    "La seule question ouverte est de savoir lesquelles arriveront les premières.",
  ],
  effets:{ flags:['palier_karlsberg'], suspicion:10,
           marque:"Quelqu'un a écrit « Yohan de Karlsberg » dans un dossier, avec une date en marge.",
           court:"Le nom entier" },
  suite:'entre_saisons', libelleSuite:"Continuer" },

});


/* ══════════════════════════════════════════════════════════════════════════
 * CE QUE CHAQUE FAÇON DE SE SOIGNER FAIT RÉELLEMENT
 *
 * Les textes disent ; ceci fait. On tient les deux séparés pour qu'aucune
 * scène ne puisse promettre quelque chose que la mécanique ne tient pas.
 * ══════════════════════════════════════════════════════════════════════════ */

/* S'arrêter six semaines coûte l'affaire la mieux payée du mur. Jamais la
 * dernière : on ne ferme pas la seule porte qui reste. */
function perdreUneAffaire(){
  const A = ETAT.acte;
  const libres = AFFAIRES.filter(x =>
    !A.arcsFaits.includes(x.id) && !A.arcsPerdus.includes(x.id));
  const reste = A.engagements - A.arcsFaits.length;
  if(libres.length <= Math.max(1, reste)) return null;
  const perdue = libres.slice().sort((x, y) => y.or - x.or)[0];
  A.arcsPerdus.push(perdue.id);
  ETAT.faits.push(`${perdue.titre} — décrochée du mur pendant que vous vous remettiez.`);
  return perdue;
}

const SOINS = {
  conv_repos:     { crans:2, souffle:100, perdre:true },
  conv_paye_dom:  { crans:2, souffle:45 },
  conv_paye_cout: { crans:1, souffle:35 },
  conv_paye_ko:   { crans:0, souffle:15 },
  conv_rien:      { crans:0, souffle:30 },
  conv_onde_dom:  { crans:3, souffle:45 },
  conv_onde_cout: { crans:2, souffle:35 },
  conv_onde_ko:   { crans:0, souffle:20 },
};

for(const [id, soin] of Object.entries(SOINS)){
  const sc = MACHINE[id];
  sc.effets = Object.assign({}, sc.effets, {
    faire: () => {
      ETAT.flags.add('soins_' + ETAT.acte.saison);
      if(soin.crans) reposer(soin.crans);
      rendreSouffle(soin.souffle);
      if(soin.perdre) perdreUneAffaire();
    },
  });
}

enregistrerScenes(MACHINE);
