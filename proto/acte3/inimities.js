/* PARIAS — Acte III · CEUX QUI VIENNENT CONTRE VOUS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Aucun de ces gens n'a été écrit pour rien.
 *
 * Un ennemi de l'Acte III n'est pas un ennemi parce que le scénario en a
 * besoin : il l'est parce qu'on lui a fait quelque chose de précis, à une
 * date précise, et que le jeu s'en souvient depuis. Amaury de Valombre
 * n'attaque pas Karlsberg parce qu'il est le méchant du chapitre. Il vient
 * parce qu'on l'a chassé d'une pièce à Cendrepont il y a douze ans devant
 * onze personnes, qu'il a vendu la tour de sa mère l'année suivante, et
 * qu'il n'a jamais eu à se demander qui blâmer.
 *
 * TROIS RÈGLES, ET AUCUNE N'EST NÉGOCIABLE
 *
 *   1. **Rien n'est tiré au sort.** `hostile()` lit des drapeaux posés par
 *      des scènes réellement jouées. Deux parties identiques donnent la
 *      même liste ; deux parties différentes n'en donnent jamais deux
 *      semblables. C'est tout l'intérêt.
 *
 *   2. **Le grief s'écrit.** Jamais *relation −40*. Une phrase, datée si
 *      possible, qui dit ce qu'on a fait. Le joueur doit pouvoir la lire et
 *      se rappeler la scène.
 *
 *   3. **On peut avoir tort de les avoir épargnés.** La clémence ne protège
 *      de rien. Gassien vivant est un homme qui sait ; Sorgue vivant est un
 *      homme qui a perdu une fois devant témoins et à qui Chastel offre une
 *      revanche. Épargner n'est pas acheter.
 *
 * CE QUE CE FICHIER FOURNIT
 *
 *   ennemisDeclares()   la liste, dans l'ordre de gravité
 *   forcesContre(n)     ce qu'ils amènent — des unités, pour `bataille.js`
 *   championsContre()   ceux qui viennent en personne, pour un duel
 *   griefs()            ce qu'ils ont contre vous, écrit
 * ═══════════════════════════════════════════════════════════════════════ */

const INIMITIES = {

/* ── Ceux de l'Acte I ─────────────────────────────────────────────────────
 * Douze ans ont passé. Ils n'ont pas oublié, parce que personne n'oublie la
 * seule fois de sa vie où quelqu'un lui a dit non devant témoins. */

amaury:{
  nom:"Amaury de Valombre",
  ou:"la vallée de Cendrepont",
  poids:2,
  hostile:() => a('wy_amaury_ennemi') || a('wy_amaury_danger')
             || (a('wy_prevenu_amaury') && !a('wy_amaury_paye')),
  grief:() => a('wy_amaury_ennemi')
    ? "Vous l'avez dénoncé à sa mère. Il a hérité d'une maison qui savait, et il a vendu la tour à Chastel dans l'année — les archives, les registres, et l'endroit où son père est enterré."
    : "Vous avez pris son argent et vous n'avez pas rapporté les œufs. Il a passé douze ans à expliquer à qui voulait l'entendre qu'un mercenaire lui avait volé trois mille couronnes.",
  unites:[{ type:'mercenaires', effectifPct:0.8 }, { type:'archers_merc', effectifPct:0.6 }],
  dit:"« Trois mille couronnes, messire. Je les ai comptées pendant douze ans. »",
},

gassien:{
  nom:"Gassien le Lièvre",
  ou:"partout où passe du sel",
  poids:2,
  hostile:() => a('wy_gassien_vivant') && (a('wy_gassien_confondu') || a('wy_gassien_donne')
             || a('as_gassien_marche')),
  grief:() => a('wy_gassien_donne')
    ? "Vous l'avez livré au prévôt et il n'a pas été pendu, ce qui est la pire des deux issues : un contrebandier qu'on relâche a perdu ses trois chefs et gardé sa mémoire."
    : "Vous l'avez confondu et vous l'avez laissé partir. Il vous a serré la main à la barrière et il a dit *bonne chasse* sincèrement, et il ne l'a jamais oublié.",
  unites:[{ type:'pillards' }, { type:'pillards', effectifPct:0.7 }],
  dit:"« Je vends du sel. J'ai aussi vendu votre itinéraire, et c'était le meilleur marché de ma vie. »",
},

sorgue:{
  nom:"Renaud Sorgue",
  ou:"au service de Chastel, toujours",
  poids:3,
  hostile:() => a('as_sorgue_vivant') && (a('as_sorgue_cede') || a('as_sorgue_desarme')),
  grief:() => a('as_sorgue_cede')
    ? "Quarante et un duels judiciaires, et une reddition. Il l'a prononcée lui-même, à voix normale, vers le seuil d'une salle pleine. Chastel l'emploie encore : on n'a pas mieux, et un homme qui a perdu une fois se bat autrement."
    : "Vous l'avez désarmé dans un rond de neuf pas dont son employeur écrivait les règles. Son épée a franchi la craie devant quarante personnes et il n'a plus jamais eu la même garde.",
  unites:[{ type:'veterans_imp', effectifPct:0.9 }],
  champion:'in_sorgue',
  dit:"« Quarante-deux. Il en manquait un et je savais lequel. »",
},

sault:{
  nom:"Guillaume de Sault",
  ou:"quelque part, avec un carnet",
  poids:1,
  hostile:() => a('ch_du_revoir') || a('ch_du_perdu'),
  grief:() => "Il a écrit *à revoir dans deux ans* dans un carnet qu'il tient depuis onze ans. Il l'a écrit six fois en tout. Il est venu voir.",
  unites:[],
  champion:'in_sault',
  dit:"« Ce n'est toujours pas à mort. Je n'ai pas changé de méthode, seulement de page. »",
  /* Le seul de la liste qui ne soit pas un ennemi. Il vient quand même. */
  neutre:true,
},

/* ── Ceux de l'Acte II ────────────────────────────────────────────────────
 * Ceux-là ne viennent pas par rancune. Ils viennent parce qu'une maison
 * relevée qui ne doit rien à personne est un problème, et qu'ils règlent
 * les problèmes de la façon dont ils règlent tout. */

caleb:{
  nom:"Caleb de Fort-aux-Princes",
  ou:"partout où quelqu'un doit de l'argent",
  poids:3,
  hostile:() => a('a2_caleb_hostile') || a('cb_sans') || a('cb_renvoye')
             || (a('a2_caleb_froid') && a('a2_bannieres')),
  grief:() => a('cb_sans')
    ? "Vous lui avez dit que vous bâtiriez avec des gens qui ne lui devaient rien. Il a trouvé ça très intelligent et il a passé onze ans à racheter ces gens-là un par un."
    : "Il vous a proposé un rendement et vous avez refusé de le lui donner. Un homme qui se couvre contre votre chute finit par avoir intérêt à ce qu'elle arrive.",
  unites:[{ type:'mercenaires' }, { type:'mercenaires', effectifPct:0.8 },
          { type:'archers_merc', effectifPct:0.9 }],
  dit:"« Ce n'est toujours pas de l'hostilité. C'est de la comptabilité, et vous êtes passé du bon côté de ma colonne au mauvais. »",
},

lucius:{
  nom:"Lucius Furius Augustus",
  ou:"Astrah, sous une couronne que personne ne lui a posée",
  poids:4,
  hostile:() => a('a2_lucius_refuse') || a('ls_refuse')
             || (a('a2_lucius_sait') && !a('a2_lucius_aide')),
  grief:() => a('ls_refuse')
    ? "Il vous a dit, seul à seul et sans témoin, qu'il ceindrait une couronne à laquelle il n'a pas droit. Vous avez répondu non. Un homme qui sait ça de vous et à qui vous avez refusé n'a plus qu'une seule chose à faire de vous."
    : "Il sait ce que vous êtes et vous ne lui avez rien donné en échange. Il a fait le calcul deux fois avant de vous faire venir ; il l'a refait une troisième après.",
  unites:[{ type:'veterans_imp' }, { type:'veterans_imp', effectifPct:0.9 },
          { type:'cavalerie_imp' }],
  dit:"« Je ne vous en veux pas, messire. Je n'ai jamais eu le temps d'en vouloir à personne. »",
},

charles:{
  nom:"Charles de Mont-Draken",
  ou:"une commission, vingt hommes, et une marche sans frontière",
  poids:5,
  hostile:() => a('cd_refus') || a('cd_denonce') || a('a2_charles_froid')
             || (a('a2_paria_declare') && !a('a2_charles_allie')),
  grief:() => a('cd_denonce')
    ? "Vous lui avez proposé d'inscrire quelqu'un d'autre à votre place. Il n'a pas relevé sur le moment. Il a mis onze ans à décider ce que ça disait de vous, et il a fini par décider."
    : a('cd_refus')
    ? "Il vous a demandé de vous laisser inscrire et vous avez dit non. Il vous avait prévenu qu'il le redemanderait. Il le redemande, avec une commission de province et vingt hommes."
    : "Vous êtes devenu, publiquement, la chose qu'il a passé trente ans à ranger dans un registre. Il n'a jamais eu de haine pour rien de ce qu'il a tué.",
  unites:[{ type:'chasseurs_ordre' }, { type:'chasseurs_ordre', effectifPct:0.8 },
          { type:'veterans_imp', effectifPct:0.7 }],
  champion:'in_charles',
  dit:"« Trois cent douze pièces sur ce mur, messire. Aucune ne m'a jamais rien fait personnellement. »",
},

tyrion:{
  nom:"Tyrion",
  ou:"Aelthiriel, et la marche de l'est",
  poids:3,
  hostile:() => a('a2_tyrion_humilie') || a('a2_anarion_soutenu') || a('an_donne'),
  grief:() => a('an_donne')
    ? "Vous avez donné Aelthiriel à Anarion pour rien, dans une salle où quatre secrétaires écrivaient. Deux saisons plus tard une colonne a franchi le fleuve à l'endroit exact."
    : "Vous l'avez humilié dans un couloir de cent quarante pieds. Il a quatre cents ans de plus que vous et une mémoire qui va avec.",
  unites:[{ type:'sylvains' }, { type:'sylvains', effectifPct:0.8 }],
  dit:"« Ce que je crains ne change pas ce que je dois faire. Je vous l'avais dit à la porte basse. »",
},

ysabel:{
  nom:"Ysabel de Karlsberg",
  ou:"là où vous l'avez laissée",
  poids:2,
  hostile:() => a('a2_ysabel_vivante') && a('a2_ysabel_laissee'),
  grief:() => "Vous avez refermé la porte du parloir et vous êtes parti. Ce n'était pas une clémence et elle l'a compris avant vous. Elle a écrit à trois maisons depuis, et elle sait écrire quatre lignes qui rayent une maison.",
  unites:[],
  champion:'in_ysabel',
  dit:"« J'ai déjà fait ça une fois, à Germinal de la cent-quarante-troisième année. Ça avait très bien marché. »",
},

};

/* ══ CE QUE ÇA DONNE ═══════════════════════════════════════════════════════ */

/* Ceux qui sont réellement contre vous, du plus lourd au plus léger. Un
 * homme qui vient en personne sans armée pèse moins qu'une commission de
 * province, et il fait beaucoup plus de dégâts. */
function ennemisDeclares(){
  return Object.entries(INIMITIES)
    .filter(([, x]) => { try { return x.hostile(); } catch(e){ return false; } })
    .sort((a, b) => b[1].poids - a[1].poids)
    .map(([id, x]) => ({ id, ...x }));
}

/* Ce qu'ils amènent sur un champ. On plafonne : trois fronts ne portent pas
 * douze compagnies, et une bataille illisible n'est pas une bataille. */
function forcesContre(max){
  const u = [];
  for(const e of ennemisDeclares()){
    for(const x of (e.unites || [])){
      if(u.length >= (max || 6)) return u;
      u.push({ ...x, de:e.nom });
    }
  }
  return u;
}

/* Ceux qui viennent en personne. Ils ne se battent pas dans une bataille :
 * ils vous attendent après. */
function championsContre(){
  return ennemisDeclares().filter(e => e.champion);
}

/* Le grief, écrit, daté quand on peut. C'est ce qu'on affiche au joueur, et
 * c'est la seule forme sous laquelle une inimitié doit se lire. */
function griefs(){
  return ennemisDeclares().map(e => ({
    nom:e.nom, ou:e.ou, quoi:e.grief(), dit:e.dit, neutre:!!e.neutre,
  }));
}

/* Un ennemi qu'on n'a pas — parce qu'on lui a donné ce qu'il voulait, ou
 * parce qu'on ne l'a jamais croisé — vaut d'être nommé aussi : c'est ce
 * qu'on a acheté, et on l'a payé ailleurs. */
function pasEnnemis(){
  return Object.entries(INIMITIES)
    .filter(([, x]) => { try { return !x.hostile(); } catch(e){ return true; } })
    .map(([, x]) => x.nom);
}
