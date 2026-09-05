/* PARIAS — Acte III · LES QUATRE THÉÂTRES
 * ═══════════════════════════════════════════════════════════════════════
 *
 * `a3_convergence` posait quatre demandes et n'avait rien derrière : on
 * cochait, on passait au siège. Voilà ce qu'il y a derrière.
 *
 * On tient deux théâtres. Jamais trois. Ce n'est pas une leçon de morale,
 * c'est le nombre d'hommes divisé par le nombre de lieues, et le troisième
 * se déroule sans vous pendant que vous êtes ailleurs. On vous le raconte
 * ensuite, et c'est pire que de le voir.
 *
 *   ASTRAH        Lucius ne veut pas de soldats. Il veut un témoin qui ne
 *                 lui doive rien, et il n'y a qu'une maison comme ça dans
 *                 quatre provinces. Bataille sur la route du couronnement.
 *
 *   MONT-DRAKEN   Un village de quarante lieues a décidé quelque chose au
 *                 sujet d'une fille de onze ans. Vingt hommes se tiennent
 *                 entre les deux depuis deux jours et ne peuvent pas
 *                 rester. Aucune arme ne règle celui-là.
 *
 *   LE FLEUVE     Le gué est perdu depuis quatre ans, la ligne tient sur un
 *                 pont, et il y a onze hameaux de l'autre côté. Ils sont
 *                 humains. Personne ne les compte dans les états elfiques.
 *
 *   KAR-DURAK     La onzième porte a été scellée **de l'intérieur** il y a
 *                 six cents ans. Autour du sceau, à un pouce du bord :
 *                 quatre entailles trop régulières pour être de la main
 *                 d'un homme. Vous les avez déjà vues. À Karlsberg.
 *
 * Rien ici ne se gagne entièrement. Chaque théâtre tenu ferme quelque chose
 * ailleurs, et le siège lit tout.
 * ═══════════════════════════════════════════════════════════════════════ */

/* ── Trois champs de plus ──────────────────────────────────────────────────
 * Karlsberg garde sa garnison : elle en aura besoin dans six semaines. Ce
 * qu'on mène ailleurs, on nous le prête, et ce qui n'en revient pas ne nous
 * appartenait pas. C'est la même règle qu'à l'Acte II et c'est la seule
 * honnête. */
Object.assign(CHAMPS, {

  bat_astrah:{
    id:'bat_astrah',
    nom:"La route du couronnement",
    lieu:"Astrah · la chaussée du nord · six lieues avant la ville",
    intro:"Gaucher de Verneuil n'attaque pas Astrah. Il ferme une route, ce qui est légal, avec des hommes à lui, ce qui l'est aussi, et il compte sur le fait qu'un couronnement dont les témoins n'arrivent pas n'a pas eu lieu.",
    mise:"Une couronne ne se défend pas dans une salle. Elle se défend sur les six lieues qui y mènent, et personne n'écrira jamais ça nulle part.",
    fronts:[
      { nom:"Le pont de Sarce", terrain:'gue',
        ennemis:[{ type:'milice' }, { type:'arbaletriers', effectifPct:0.7 }] },
      { nom:"La chaussée",      terrain:'plaine',
        ennemis:[{ type:'cavalerie_imp', effectifPct:0.8 }, { type:'lanciers', effectifPct:0.9 }] },
      { nom:"Le bois de Sarce", terrain:'bois',
        ennemis:[{ type:'archers_merc', effectifPct:0.7 }] },
    ],
    victoire:{ renom:12, temoins:'province', flags:['a3_route_tenue'],
      texte:"La chaussée est rouverte à la neuvième heure. Verneuil décroche en bon ordre, sans un mot, et il sera dans la salle six semaines plus tard parce qu'un homme qui a perdu une route se présente au couronnement : c'est ainsi que ça se fait ici." },
    defaite:{ renom:-5, flags:['a3_route_perdue'],
      texte:"On ne rouvre pas la chaussée. Les témoins du nord n'arriveront pas, et un couronnement sans témoins du nord est un couronnement dont on discutera pendant trente ans." },
  },

  bat_saulaie:{
    id:'bat_saulaie',
    nom:"Le pont de Saulaie",
    lieu:"La ligne du fleuve · le pont de Saulaie",
    intro:"Le gué d'Aumance est tombé il y a quatre ans. La ligne tient sur un pont de pierre à trois arches que personne n'a construit pour ça, et derrière le pont il y a onze hameaux que les états elfiques ne comptent pas parce qu'ils sont humains.",
    mise:"Un pont se tient ou se casse. Le tenir coûte des hommes ; le casser coûte onze hameaux, et les onze hameaux ne sont pas au courant qu'ils sont sur la table.",
    fronts:[
      { nom:"La première arche", terrain:'gue',
        ennemis:[{ type:'mercenaires' }, { type:'mercenaires', effectifPct:0.7 }] },
      { nom:"La levée sud",      terrain:'colline',
        ennemis:[{ type:'archers_merc' }, { type:'cavalerie_imp', effectifPct:0.6 }] },
      { nom:"Les saules",        terrain:'bois',
        ennemis:[{ type:'milice' }, { type:'mercenaires', effectifPct:0.5 }] },
    ],
    victoire:{ renom:13, temoins:'foule', flags:['a3_pont_tenu'],
      texte:"Le pont est encore là au matin, et les onze hameaux aussi. Aucun des deux ne le saura jamais : on ne raconte pas aux gens la nuit où quelqu'un a décidé de ne pas les vendre." },
    defaite:{ renom:-4, flags:['a3_pont_perdu'],
      texte:"On casse la troisième arche à la nuit, en désordre, parce qu'il n'y a plus rien d'autre à faire. La ligne descend de quatre lieues. Les onze hameaux sont derrière, maintenant." },
  },

  bat_onzieme:{
    id:'bat_onzieme',
    nom:"La onzième porte",
    lieu:"Kar-Durak · sous la galerie basse · onze cents pieds",
    intro:"On ne monte pas vers la onzième porte : on descend. Onze cents pieds sous la galerie basse, dans un boyau taillé pour des gens d'une autre taille, et les Peaux-Vertes y sont déjà — ils y sont depuis quatre ans et personne ne le savait.",
    mise:"Une porte qu'on rouvre par le bas s'ouvre sur ce qu'il y a dessous. Les Nains le savent. C'est pour ça qu'ils demandent, au lieu de le faire eux-mêmes.",
    fronts:[
      { nom:"Le boyau d'accès",  terrain:'defile',
        ennemis:[{ type:'horde' }, { type:'horde', effectifPct:0.5 }] },
      { nom:"La salle du treuil", terrain:'ruines',
        ennemis:[{ type:'troll_guerre', effectifPct:0.7 }, { type:'horde', effectifPct:0.6 }] },
      { nom:"Le seuil",           terrain:'defile',
        ennemis:[{ type:'horde', effectifPct:0.8 }] },
    ],
    victoire:{ renom:15, temoins:'quelques', flags:['a3_onzieme_atteinte'],
      texte:"Le seuil est dégagé à la sixième heure. Il n'y a plus personne devant la porte, et la porte est exactement telle que le plan la dessine : fermée, entière, et scellée du mauvais côté." },
    defaite:{ renom:-5, flags:['a3_onzieme_perdue'],
      texte:"On remonte le boyau en portant ce qui peut être porté. La onzième porte restera fermée, ce qui est peut-être la seule bonne nouvelle de cette saison, et personne n'ose le dire à voix haute." },
  },

});

/* Ce qu'on nous prête, selon le théâtre. Karlsberg ne bouge pas d'ici. */
const PRETEES = {
  astrah:  [{ type:'lanciers' }, { type:'arbaletriers', effectifPct:0.9 },
            { type:'cavalerie', effectifPct:0.7 }, { type:'eclaireurs' }],
  saulaie: [{ type:'lanciers', effectifPct:0.8 }, { type:'archers' },
            { type:'archers', effectifPct:0.7 }, { type:'eclaireurs', effectifPct:0.6 }],
  onzieme: [{ type:'sapeurs' }, { type:'veterans', effectifPct:0.9 },
            { type:'arbaletriers', effectifPct:0.8 }],
};

/* Qui vous reçoit à la ligne du fleuve. Neuf ans plus tard, ça dépend de ce
 * qu'on a fait d'elle. */
function auFleuve(){
  if(a('a2_alarielle_amie') || a('el_rencontree'))
    return { nom:"Alarielle", qui:'alarielle',
      mot:"« Je ne vous ai pas fait venir. J'ai écrit où était le pont et combien de jours il lui restait, et vous êtes venu. Ce n'est pas la même chose et je tiens à ce que la différence soit dite. »" };
  return { nom:"le capitaine Nielthas", qui:null,
    mot:"« On m'a dit qu'un homme viendrait. On ne m'a pas dit lequel, ni pourquoi, ni ce qu'il faudrait lui donner. On m'a dit : *il viendra*. C'est tout ce que j'ai. »" };
}

const THEATRES = {

/* ══════════════════════════════════════════════════════════════════════════
 * ASTRAH · Lucius Furius Augustus, quarante-trois ans
 *
 * Il ne demande pas d'hommes. Il en a. Il demande une présence, et il la
 * demande à la seule maison de quatre provinces qui ne doive rien à
 * personne — parce qu'elle ne doit rien à personne, et parce que personne
 * n'aurait jamais consenti à lui prêter quoi que ce soit.
 * ══════════════════════════════════════════════════════════════════════════ */
a3_th_lucius:{
  qui:'lucius',
  lieu:"Astrah · la salle des rôles · Ventôse",
  titre:"Ce qu'on ne peut pas acheter",
  texte:[
    "Il vous reçoit seul, sans secrétaire, dans une salle où quatre cents ans de rôles sont rangés par règne et où onze règnes n'ont produit aucun roi.",
    { sobre:"Il a quarante-trois ans. Le couronnement est dans six semaines.",
      intense:"Quarante-trois ans, et six semaines avant de poser sur sa propre tête une chose que personne ne lui a donnée. Il n'en parle pas comme d'un triomphe. Il en parle comme d'un chantier dont il connaît les trois points faibles.",
      extreme:"Quarante-trois ans, et six semaines avant de poser sur sa propre tête une chose que personne au monde ne lui a donnée.\n\nIl n'en parle à aucun moment comme d'un triomphe. Il en parle exactement comme un maître d'œuvre parle d'un pont : voilà la portée, voilà la charge, voilà les trois endroits où ça peut céder et voilà ce que j'ai prévu pour deux d'entre eux.\n\nLe troisième, c'est vous." },
    "^« Trois maisons du nord ont écrit qu'elles ne viendraient pas. C'est écrit poliment et c'est écrit ensemble, ce qui veut dire qu'elles se sont concertées et qu'elles veulent que je le sache. »",
    "@« Et la quatrième ? »",
    { sobre:"^« Il n'y a pas de quatrième. Il y a Verneuil, qui ne m'écrit pas. »",
      intense:"^« Il n'y a pas de quatrième. » Il tourne une page qu'il ne lit pas. « Il y a Gaucher de Verneuil, qui ne m'a pas écrit du tout, et qui a fait passer deux cents hommes sur la chaussée du nord la semaine dernière en disant que c'était un déplacement de garnison. »",
      extreme:"^« Il n'y a pas de quatrième maison. »\n\nIl tourne une page qu'il ne lit pas, et c'est le seul geste inutile que vous lui verrez faire de la matinée.\n\n« Il y a Gaucher de Verneuil. Il ne m'a pas écrit — pas une ligne, pas un refus, rien. Il a fait passer deux cents hommes sur la chaussée du nord la semaine dernière en portant au rôle *déplacement de garnison*, ce qui est vrai, légal, et sans le moindre rapport avec ce qu'il en fera.\n\nUn couronnement dont les témoins du nord ne peuvent pas arriver n'est pas un couronnement contesté. C'est un couronnement qui n'a pas eu lieu. »" },
  ],
  effets:{ flags:['a3_lu_vu'],
           marque:"Lucius se couronne dans six semaines. Trois maisons du nord ont écrit ensemble, et Verneuil n'a pas écrit du tout.",
           court:"Six semaines" },
  choix:[
    { t:"« Vous avez des hommes. Pourquoi moi ? »",
      detail:"Perception · lettres — il n'a pas demandé de soldats, et il n'a pas commencé par la route",
      risque:'favorable',
      test:{ carac:'perception', comp:'lettres', dc:12, adversaire:'lucius', manoeuvre:'vrai' },
      degres:{ dominante:'a3_lu_vrai', nette:'a3_lu_vrai', couteuse:'a3_lu_vrai_cout',
               echec:'a3_lu_vrai_ko', catastrophe:'a3_lu_vrai_ko' } },

    { t:"Accepter d'être dans la salle",
      detail:"trois fois l'an · debout où on vous met · et Mont-Draken se ferme",
      risque:'définitif',
      ferme:"Ferme : ce que Charles serait venu vous demander",
      va:'a3_lu_accepte' },

    { t:"Lui proposer autre chose que votre présence",
      detail:"il lui manque une légitimité, pas un corps dans une salle",
      si:() => a('a2_registre_onde') || a('in_ch_inscrit'),
      risque:'calculé', va:'a3_lu_autre' },
  ],
},

a3_lu_vrai:{
  qui:'lucius',
  titre:"Un témoin qui ne doit rien",
  texte:[
    "@« Vous avez deux mille hommes et onze places fortes. Vous ne m'avez pas demandé un soldat, et vous ne m'avez pas parlé de la route en premier. »",
    { sobre:"Il pose la page.",
      intense:"Il pose la page qu'il ne lisait pas, et il vous regarde pour la première fois de la matinée comme un homme regarde un autre homme.",
      extreme:"Il pose la page qu'il ne lisait pas.\n\nEt il vous regarde — pour la première fois depuis que vous êtes entré — de la façon dont un homme regarde un autre homme plutôt que de la façon dont un homme qui compte regarde une colonne." },
    { sobre:"^« Une couronne qu'on se donne n'est pas une couronne. »",
      intense:"^« Une couronne qu'on se donne n'est pas une couronne. Vous me l'avez dit vous-même, il y a neuf ans, et je n'ai pas trouvé de réponse en neuf ans. »\n\n@« Vous en avez trouvé une. »\n\n^« J'ai trouvé un contournement, ce qui n'est pas pareil et ce qui suffira peut-être. »",
      extreme:"^« Une couronne qu'on se donne n'est pas une couronne. »\n\nUn temps.\n\n« Vous me l'avez dit vous-même il y a neuf ans, dans cette salle, debout à l'endroit exact où vous êtes. Je n'ai pas trouvé de réponse en neuf ans et croyez bien que j'ai cherché. »\n\n@« Vous en avez trouvé une. »\n\n^« J'ai trouvé un contournement. Ce n'est pas la même chose et je ne vais pas vous vendre le contraire.\n\nUne couronne qu'on se donne n'est rien. Une couronne qu'on se donne **devant quelqu'un qui ne vous doit rien** est autre chose : pas une couronne légitime, mais une couronne qu'il faudra contester au lieu d'ignorer. Ça vaut trente ans de différence. »" },
    "§ Voilà. C'est tout ce qu'il veut et il n'y a rien d'autre dessous.",
    { sobre:"^« Toutes les maisons de cette province me doivent quelque chose ou me veulent quelque chose. La vôtre, non. »",
      intense:"^« Toutes les maisons de ces provinces me doivent de l'argent, une charge, un mariage, ou attendent l'une des trois. Pas la vôtre.\n\nEt elle ne me doit rien pour une raison qui n'a rien de noble : personne n'aurait jamais consenti à vous prêter quoi que ce soit. »",
      extreme:"^« Toutes les maisons de ces quatre provinces me doivent de l'argent, une charge, un mariage, ou attendent l'une des trois. Il n'y en a pas une seule qui fasse exception. J'ai la liste, je la tiens moi-même, et c'est le document le plus ennuyeux et le plus utile que je possède.\n\nLa vôtre n'y figure pas. »\n\nIl referme le registre.\n\n« Et elle n'y figure pas pour une raison qui n'a rigoureusement rien de noble, alors ne vous la racontez pas autrement : personne, en neuf ans, n'a jamais consenti à vous prêter quoi que ce soit. On ne prête pas à une maison rayée. Vous avez tout payé comptant, en travail, et c'est pour ça que vous êtes aujourd'hui la seule personne de ce côté du fleuve dont la présence dans une salle ne s'achète pas.\n\nCe n'est pas une vertu. C'est un fait, et j'ai besoin de ce fait pendant une heure, au printemps. »" },
  ],
  effets:{ flags:['a3_lu_su'],
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous avez entendu ce qu'il demandait vraiment" },
           marque:"Il ne veut pas de soldats. Il veut une heure de la seule présence qui ne s'achète pas.",
           court:"Une heure" },
  choix:[
    { t:"« Alors il faut que la route soit ouverte. »",
      detail:"six lieues de chaussée · deux cents hommes de Verneuil · et six semaines",
      risque:'définitif', va:'a3_lu_route' },
    { t:"Accepter d'être dans la salle, et rien de plus",
      detail:"il n'a pas demandé la route · c'est vous qui la voyez",
      risque:'calculé', va:'a3_lu_accepte' },
    { t:"« Non. »",
      detail:"une maison relevée qui se tient à côté d'un homme couronné n'est plus neutre",
      risque:'prudent', va:'a3_lu_non' },
  ],
},

a3_lu_vrai_cout:{
  qui:'lucius',
  titre:"Ce qu'il concède",
  texte:[
    "@« Vous avez deux mille hommes. Pourquoi moi ? »",
    "^« Parce que vous ne me devez rien. » Il le dit vite, presque sèchement, et il enchaîne pour ne pas avoir à le développer. « C'est suffisant comme raison et je préfère qu'on en reste là. »",
    "§ Il en a dit assez pour qu'on comprenne, et pas assez pour qu'on le lui fasse répéter. C'est probablement délibéré et il n'y a aucun moyen de le savoir.",
  ],
  effets:{ marque:"« Parce que vous ne me devez rien. » Il n'en a pas dit plus.",
           court:"Rien à personne" },
  choix:[
    { t:"« Alors il faut que la route soit ouverte. »",
      detail:"il n'a pas demandé ça · il ne dira pas non",
      risque:'définitif', va:'a3_lu_route' },
    { t:"Accepter d'être dans la salle",
      detail:"trois fois l'an · et Mont-Draken se ferme",
      risque:'définitif', va:'a3_lu_accepte' },
  ],
},

a3_lu_vrai_ko:{
  qui:'lucius',
  titre:"Ce qu'il ne dira pas",
  texte:[
    "@« Vous avez deux mille hommes. Pourquoi moi ? »",
    "^« Parce que j'ai deux mille hommes et pas un témoin. » Il reprend sa page. « Vous n'aviez pas besoin de la poser, cette question, et j'espérais que vous ne la poseriez pas. »",
    "§ Vous avez demandé une chose qu'il aurait donnée sans qu'on la demande. Ce n'est pas grave, et ça se voit.",
  ],
  effets:{ cout:{ moral:3 },
           marque:"Il aurait dit la même chose sans qu'on demande. La question a coûté quelque chose de petit.",
           court:"La question de trop" },
  choix:[
    { t:"« La route du nord sera ouverte. »",
      detail:"deux cents hommes de Verneuil sur six lieues de chaussée",
      risque:'définitif', va:'a3_lu_route' },
    { t:"Accepter d'être dans la salle",
      detail:"trois fois l'an · et Mont-Draken se ferme",
      risque:'définitif', va:'a3_lu_accepte' },
  ],
},

a3_lu_route:{
  qui:null,
  lieu:"Astrah · la chaussée du nord · Germinal",
  titre:"Six lieues",
  texte:[
    "On vous prête quatre compagnies : Astrah a des hommes, elle n'a personne pour les mener sur une route qu'il faut ouvrir sans qu'on puisse dire qu'on l'a ouverte.",
    { sobre:"Verneuil tient le pont de Sarce depuis neuf jours.",
      intense:"Gaucher de Verneuil tient le pont de Sarce depuis neuf jours, en règle, avec les papiers, et il fait relever ses postes toutes les six heures comme un homme qui compte rester.",
      extreme:"Gaucher de Verneuil tient le pont de Sarce depuis neuf jours.\n\nEn règle. Avec les papiers. Ses hommes portent ses couleurs, son sergent tient un rôle à jour, et il fait relever les postes toutes les six heures dans l'ordre exact que prescrit le règlement de province.\n\nIl n'a rien fait d'illégal, il ne fera rien d'illégal, et c'est très exactement ce qui rend la chose impossible à défaire par une lettre." },
    "^« Soixante et un ans », dit le sergent qu'on vous prête, sans qu'on lui ait rien demandé. « Il en a soixante et un et il n'a jamais rien perdu. Je le dis maintenant pour ne pas avoir à le dire après. »",
    "§ Six lieues de chaussée, un pont, un bois. Personne ne dira jamais qu'un couronnement s'est joué là.",
  ],
  effets:{ flags:['a3_lu_route_prise'],
           marque:"Verneuil tient le pont de Sarce en règle, avec les papiers, depuis neuf jours.",
           court:"Le pont de Sarce" },
  choix:[
    { t:"Ouvrir la route",
      detail:"trois fronts · quatre compagnies prêtées · un homme de soixante et un ans en face",
      risque:'définitif',
      va:() => ouvrirBataille('bat_astrah', 'a3_lu_apres', PRETEES.astrah) },
  ],
},

a3_lu_apres:{ dyn:true, texte:[] },

a3_lu_accepte:{
  qui:'lucius',
  lieu:"Astrah · la salle du couronnement · Floréal",
  titre:"Debout où on vous met",
  texte:[
    "Il se couronne un matin de Floréal, sans clergé, devant onze personnes, dans une salle qui en contient quatre cents.",
    { sobre:"On vous met à trois pas, sur la droite. C'est calculé.",
      intense:"On vous place à trois pas, sur la droite, un peu en avant de la ligne des autres. Ce n'est pas un honneur : c'est une position calculée pour qu'aucun compte rendu ne puisse vous omettre.",
      extreme:"On vous place à trois pas, sur la droite, un peu en avant de la ligne des autres.\n\nCe n'est pas un honneur et personne n'a l'indélicatesse de le présenter comme tel. C'est une position calculée, à la façon dont on calcule un contrefort : de là où vous êtes, aucun compte rendu de cette matinée ne peut vous omettre sans qu'on voie le trou.\n\nOn vous a mis là parce que vous êtes la seule chose de cette salle qu'aucun des onze ne puisse expliquer par un intérêt." },
    "§ Il n'y a pas de musique. Il n'y a pas de foule. Il prend la chose sur la table et il la pose, et ça prend quatre secondes.",
    { sobre:"^« Voilà », dit-il. « Maintenant il faut trente ans. »",
      intense:"^« Voilà », dit-il, en se retournant, et il le dit du ton exact d'un homme qui vient de sceller un coffrage. « Maintenant il faut trente ans, et je n'en ai pas trente. »",
      extreme:"^« Voilà. »\n\nIl se retourne, et il le dit du ton précis d'un homme qui vient de sceller un coffrage et qui sait combien de temps le mortier va prendre.\n\n« Maintenant il faut trente ans. Une couronne prise devient une couronne au bout de trente ans, jamais avant, et il n'y a pas d'autre chemin — pas de bataille, pas de mariage, pas de bulle. Trente ans où personne n'a réussi à la reprendre.\n\nJe n'ai pas trente ans devant moi. C'est pour ça qu'il me fallait quelqu'un dans la salle qui vive plus longtemps que moi. »" },
    "§ La lettre de Mont-Draken arrive onze jours plus tard. Elle est courte, elle est polie, et elle ne redemandera rien.",
  ],
  effets:{ flags:['a3_lucius_tenu','a3_montdraken_ferme'],
           exploit:{ eclat:7, temoins:'province',
                     quoi:"vous étiez à trois pas quand Lucius Furius Augustus s'est couronné" },
           marque:"Vous étiez dans la salle, à trois pas, sur la droite. Mont-Draken a écrit onze jours plus tard.",
           court:"À trois pas" },
  plusTard:"Une maison qui se tient à côté d'un homme couronné n'est plus neutre. Elle ne l'a jamais été autant qu'elle le croyait.",
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_lu_autre:{
  qui:'lucius',
  titre:"Ce qui vaut mieux qu'un corps dans une salle",
  texte:[
    "@« Vous voulez une présence. Une présence se conteste : on dira que vous m'avez payé, et on aura tort, et ça n'aura aucune importance. »",
    "^« Continuez. »",
    { sobre:"@« Il existe un registre de province où figurent quatre-vingt-quinze noms. Faites-le vôtre. »",
      intense:"@« Il existe un registre tenu depuis sept ans par un homme de Mont-Draken. Quatre-vingt-quinze noms, et aucun brûlé. Il n'a pas de successeur et le conseil donnera sa place à qui promettra d'aller plus vite.\n\nPrenez-le sous votre couronne. Pas pour vous en servir : pour qu'il continue. »",
      extreme:"@« Il existe un registre de province, tenu depuis sept ans, de la main d'un homme de Mont-Draken qui a soixante-deux ans et qui fait son dernier hiver de commission.\n\nQuatre-vingt-quinze noms. Soixante et onze vivants. Onze avec une charge. **Aucun brûlé.**\n\nIl n'a pas de successeur. Le conseil donnera sa place à celui qui promettra d'aller plus vite, parce que c'est toujours celui-là qu'on choisit, et le registre deviendra une liste en quatre ans. »\n\nUn temps.\n\n@« Prenez-le sous votre couronne. Pas pour vous en servir : pour qu'il continue à exister, écrit par quelqu'un qui n'a rien à y craindre.\n\nUn homme qui protège quatre-vingt-quinze personnes que personne ne protège n'a pas besoin d'être aimé pour être un roi. Il a juste besoin qu'on ne puisse pas dire qu'il a pris. »" },
    { sobre:"Il met un long temps.",
      intense:"Il met un long temps, et ce n'est pas de l'hésitation : c'est un homme qui recalcule quelque chose de très gros et qui refuse de répondre avant d'avoir fini.",
      extreme:"Il met un long temps.\n\nCe n'est pas de l'hésitation. C'est un homme qui vient de recevoir une pièce qu'il n'avait pas dans son jeu, qui recalcule toute la position à partir d'elle, et qui refuse absolument de répondre avant d'avoir fini de compter.\n\nÇa dure assez longtemps pour qu'un valet entre, voie la salle, et ressorte." },
    "^« C'est meilleur que ce que je vous demandais », dit-il enfin. « Ce qui me met dans l'obligation désagréable de devoir vous dire merci, et je n'ai pas d'usage pour ce mot. »",
    "§ Il l'écrit le jour même. Le registre passe sous une couronne que personne ne reconnaît, ce qui est infiniment plus solide qu'un grenier de Mont-Draken.",
  ],
  effets:{ flags:['a3_lucius_tenu','a3_registre_couronne'],
           exploit:{ eclat:8, temoins:'quelques',
                     quoi:"vous avez fait passer quatre-vingt-quinze noms sous une couronne" },
           marque:"Le registre de Mont-Draken est passé sous la couronne d'Astrah. Il ne mourra pas avec son auteur.",
           court:"Sous la couronne" },
  plusTard:"Charles l'apprend en Prairial. On ne saura jamais ce qu'il en a pensé : il n'a rien écrit, ce qui chez lui veut dire quelque chose.",
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_lu_non:{
  qui:'lucius',
  titre:"Ce qu'il range",
  texte:[
    "@« Non. »",
    { sobre:"^« Bien. »",
      intense:"^« Bien. » Il ne demande pas pourquoi. « Vous êtes le deuxième à me dire non cette année et vous êtes le seul dont ça me coûte quelque chose. »",
      extreme:"^« Bien. »\n\nIl ne demande pas pourquoi. Il ne l'a jamais demandé à personne : demander pourquoi, c'est rouvrir, et un homme qui rouvre passe pour un homme qu'on peut faire changer d'avis.\n\n« Vous êtes le deuxième à me dire non cette année. Vous êtes le seul dont ça me coûte quelque chose, et je vous le dis parce que ça ne me sert à rien de vous le cacher.\n\nJe me couronnerai quand même. Ce sera plus fragile de très exactement une personne. »" },
    "§ Il vous range. Dans quelle colonne, on ne le saura que plus tard, et on le saura.",
  ],
  effets:{ flags:['a3_lucius_refuse'],
           faire:() => { if(typeof retenir === 'function') retenir('lucius', "il a dit non six semaines avant le couronnement"); },
           marque:"Vous avez refusé la salle. Il s'est couronné quand même, plus fragile d'une personne.",
           court:"Une personne de moins" },
  suite:'a3_retour', libelleSuite:"Rentrer",
},

/* ══════════════════════════════════════════════════════════════════════════
 * MONT-DRAKEN · Charles, soixante-deux ans, dernier hiver de commission
 *
 * Ce théâtre-là ne se gagne par aucune arme, et il y a une arme à chaque
 * page pour qu'on puisse s'en apercevoir soi-même.
 * ══════════════════════════════════════════════════════════════════════════ */
a3_th_charles:{
  qui:'charles',
  lieu:"Ravières · quarante lieues au nord · Ventôse",
  titre:"Ce qu'un village décide",
  texte:[
    "Le bûcher est monté depuis deux jours et il n'est pas allumé. C'est la seule chose de ce village qui vous apprenne quoi que ce soit : un village qui veut brûler quelqu'un allume tout de suite.",
    { sobre:"Vingt hommes de Mont-Draken se tiennent entre le village et une grange.",
      intense:"Vingt hommes de Mont-Draken se tiennent entre le village et une grange, en ligne, sans armes tirées, depuis deux jours et deux nuits. Ils ne parlent à personne. Personne ne leur parle.\n\nCe ne sont pas les vingt hommes qui empêchent d'allumer.",
      extreme:"Vingt hommes de Mont-Draken se tiennent entre le village et une grange.\n\nEn ligne. Sans armes tirées. Depuis deux jours et deux nuits, en se relevant par quart, en mangeant debout, sans adresser la parole à quiconque et sans que quiconque leur adresse la parole.\n\nCe ne sont pas les vingt hommes qui empêchent d'allumer, et il suffit de lever les yeux pour le comprendre." },
    { sobre:"Il est venu par le ciel. C'est sur la crête, au nord, et ça ne bouge pas.",
      intense:"Il n'est pas venu à cheval cette fois. C'est posé sur la crête nord depuis deux jours, à six cents pas, la tête tournée vers le village — et ça ne bouge pas, et ça n'a pas besoin de bouger.\n\nLes chiens de Ravières n'aboient plus depuis avant-hier. Les vaches sont rentrées seules.",
      extreme:"Il n'est pas venu à cheval cette fois.\n\nC'est posé sur la crête nord depuis deux jours, à six cents pas, replié, la tête tournée vers le village. Ça ne bouge pas. Ça n'a pas eu à bouger une seule fois en deux jours et il n'y a aucune raison de penser que ça bougera.\n\nLes chiens de Ravières ne donnent plus de la voix depuis avant-hier. Les vaches sont rentrées seules et personne n'est allé les chercher. Il y a une femme qui n'est pas sortie de chez elle et à qui on porte à manger, et personne ne trouve ça ridicule.\n\nVoilà pourquoi le bûcher n'est pas allumé. Ce ne sont pas les vingt hommes. Ce n'est même pas Charles.\n\nEt c'est très exactement le problème qu'il est venu vous montrer : il peut tenir ce village aussi longtemps qu'il reste sur cette crête, et il ne peut pas rester sur cette crête." },
    "^« Elle a onze ans », dit Charles. « Elle s'appelle Guillemette. Un mur d'étable est tombé le neuf, elle était contre, elle n'a pas été touchée et le mur est tombé vers l'extérieur. Personne n'a rien eu. Voilà le dossier entier. »",
    "@« Et le bûcher ? »",
    { sobre:"^« Le bûcher est monté parce qu'il faut le monter. Ils ne l'allumeront pas devant moi. »",
      intense:"^« Le bûcher est monté parce que dans ce pays on le monte : ça se fait, ça a toujours été fait, et ne pas le monter serait dire quelque chose que personne ici n'a envie de dire.\n\nIls ne l'allumeront pas devant moi. Ils l'allumeront le lendemain de mon départ, ou le mois d'après, ou dans trois ans, et ce ne sera peut-être plus elle. »",
      extreme:"^« Le bûcher est monté parce que dans ce pays on le monte. Ça se fait. Ça s'est toujours fait. Ne pas le monter reviendrait à dire tout haut qu'on ne le fera pas, et il n'y a pas une personne dans ce village qui ait envie de dire ça devant les cinquante-neuf autres. »\n\nIl ne regarde pas la crête. C'est le seul homme de Ravières qui ne la regarde pas.\n\n« Ils ne l'allumeront pas tant que je suis là. Vous avez vu pourquoi en arrivant, et ce n'est pas une chose dont je tire de la fierté.\n\n**Je ne peux pas rester.** J'ai deux jours, peut-être trois. Après quoi je repars, et ce qui se passe le lendemain de mon départ ne figurera jamais nulle part.\n\nJe fais ça depuis trente ans. J'ai vu la version où j'emmène l'enfant : le village en brûle un autre dans quatre ans, en silence, et je ne l'apprends pas. J'ai vu la version où je pars : je l'apprends, et c'est tout ce que ça change.\n\nEt j'ai vu la version où je le tiens par la peur. Elle marche pendant très exactement le temps que je suis en vue, et ensuite elle coûte trois villages. »" },
    "§ L'homme qui a tué trois cent quarante-six choses non humaines vous a fait venir de quarante lieues pour vous montrer un problème que rien de ce qu'il sait faire ne résout. C'est la première fois qu'il demande quelque chose à quelqu'un.",
  ],
  effets:{ flags:['a3_ch_ravieres'],
           marque:"Ravières. Guillemette, onze ans, un mur tombé vers l'extérieur. Un bûcher monté et pas allumé.",
           court:"Ravières" },
  choix:[
    { t:"Parler au village",
      detail:"Présence · commandement — soixante personnes qui ont peur, et personne ne leur a rien proposé",
      risque:'risqué',
      test:{ carac:'presence', comp:'commandement', dc:13, adversaire:'ravieres', manoeuvre:'village',
             situation:() => (a('a3_tenu') ? 2 : 0) + (a('a2_bannieres') ? 2 : 0) },
      degres:{ dominante:'a3_ch_village', nette:'a3_ch_village', couteuse:'a3_ch_village_cout',
               echec:'a3_ch_village_ko', catastrophe:'a3_ch_village_ko' } },

    { t:"S'inscrire le premier",
      detail:"un registre ne tient que si le premier nom est un nom qu'un conseil ne peut pas ignorer",
      si:() => !a('in_ch_inscrit'),
      risque:'définitif',
      ferme:"Ferme : la seule chose qui vous protégeait encore",
      va:'a3_ch_inscrire' },

    { t:"Prendre l'enfant et partir",
      detail:"elle vit · le village en brûlera un autre dans quatre ans et personne ne le saura",
      risque:'calculé', va:'a3_ch_prendre' },

    { t:"Disperser la foule",
      detail:"vingt hommes, soixante villageois, un bûcher — et personne n'a prévu ce cas",
      risque:'définitif', va:'a3_ch_foule' },
  ],
},

a3_ch_village:{
  qui:null,
  titre:"Ce que personne ne leur avait proposé",
  texte:[
    "Vous parlez au village. Pas à une foule : au village, c'est-à-dire à onze hommes et quatre femmes qui décident, et dont les autres suivront ce qu'ils diront ce soir.",
    { sobre:"Ils n'ont pas peur d'elle. Ils ont peur de ce qui vient après elle.",
      intense:"Il faut une heure pour comprendre qu'ils n'ont pas peur d'une fille de onze ans. Ils ont peur de ce qui arrive à un village où il s'est passé quelque chose et qui ne l'a pas réglé lui-même.",
      extreme:"Il faut une heure pour comprendre, et l'heure vaut la peine.\n\nIls n'ont pas peur de Guillemette. Ils la connaissent depuis onze ans, deux d'entre eux l'ont portée, et la femme qui parle le plus fort contre elle est celle qui l'a mise au monde.\n\nIls ont peur de ce qui arrive à un village où il s'est passé quelque chose et qui ne l'a pas réglé lui-même. Ils ont vu ça deux fois en vingt ans, ailleurs : les cavaliers arrivent, on ne prend pas la personne, on prend le village, et le village cesse de figurer sur les rôles.\n\nBrûler, ici, n'est pas de la haine. C'est un reçu." },
    "^« Alors donnez-nous autre chose », dit le plus vieux des onze. « Donnez-nous un papier. Pas pour elle : pour nous. »",
    { sobre:"@« Un papier qui dit quoi ? »",
      intense:"@« Un papier qui dit quoi, exactement ? Parce que je peux en écrire un ce soir et il ne vaudra rien dans trois ans. »",
      extreme:"@« Un papier qui dit quoi, exactement ? »\n\nUn temps.\n\n@« Je peux en écrire un ce soir, avec mon nom dessus, et il ne vaudra rigoureusement rien dans trois ans quand un cavalier passera. Je ne vais pas vous vendre ça. »" },
    { sobre:"^« Qu'on l'a déclarée. Que quelqu'un le sait. Que si on vient nous le reprocher, il y a un nom en face. »",
      intense:"^« Qu'on l'a déclarée. Que quelqu'un, quelque part, le sait et l'a écrit. Que le jour où on vient nous le reprocher, il y a un nom en face du nôtre et ce n'est pas le nôtre. »\n\nIl hausse les épaules.\n\n« C'est tout ce qu'on demande, messire. On ne veut pas la brûler. On veut ne pas être seuls avec. »",
      extreme:"^« Qu'on l'a déclarée. Que quelqu'un, quelque part, le sait, l'a écrit, et l'a signé. Que le jour où l'on vient nous le reprocher — et on viendra, ça vient toujours — il y a un nom en face du nôtre, et que ce nom n'est pas le nôtre. »\n\nIl hausse les épaules, et le geste a soixante-dix ans.\n\n« On ne veut pas la brûler, messire. Vous croyez qu'on veut la brûler parce que c'est ce que vous voyez quand vous entrez, et il y a un bûcher, et je comprends très bien.\n\nOn veut ne pas être seuls avec. C'est tout. Personne, en vingt ans, n'est jamais venu nous proposer de ne pas être seuls avec. »" },
    "§ Charles écoute ça debout, à quatre pas, sans bouger. C'est très exactement ce qu'il essaie de construire depuis sept ans, et c'est un métayer de Ravières qui vient de le formuler.",
  ],
  effets:{ flags:['a3_ch_declare','a3_charles_tenu'],
           exploit:{ eclat:6, temoins:'foule',
                     quoi:"un village a déclaré au lieu de brûler, et l'a demandé lui-même" },
           marque:"Ravières a déclaré Guillemette au lieu de la brûler. Ils ne voulaient pas la brûler : ils ne voulaient pas être seuls avec.",
           court:"Un reçu" },
  plusTard:"Charles porte ça devant quatre conseils l'hiver suivant. Ce n'est pas un principe : c'est un village qui l'a demandé, et un conseil ne sait pas quoi répondre à ça.",
  suite:'a3_ch_apres', libelleSuite:"Ce qu'il en fait",
},

a3_ch_village_cout:{
  qui:null,
  titre:"Onze contre quatre",
  texte:[
    "Vous parlez au village. Onze suivent. Quatre ne suivent pas, et parmi les quatre il y a le prêtre, qui a soixante ans de crédit et qui n'en dépensera pas un pour vous.",
    { sobre:"Guillemette sort de la grange à la nuit, avec Charles.",
      intense:"On ne brûle personne. On ne déclare personne non plus : Guillemette sort de la grange à la nuit et part avec les vingt hommes, ce qui est la solution que Charles voulait éviter et la seule qui reste.",
      extreme:"On ne brûle personne, et c'est ce qu'on est venu chercher.\n\nOn ne déclare personne non plus. Guillemette sort de la grange à la nuit, entre deux hommes de Mont-Draken, avec un ballot que sa mère a fait et que sa mère ne lui donne pas elle-même.\n\nC'est la solution que Charles voulait éviter, et c'est la seule qui reste après que quatre personnes sur quinze ont dit non." },
    "^« C'est mieux que rien », dit Charles sur la route. « Je hais cette phrase et je la dis trois fois par an. »",
  ],
  effets:{ flags:['a3_ch_emmenee','a3_charles_tenu'],
           cout:{ moral:4 },
           exploit:{ eclat:3, temoins:'quelques', quoi:"personne n'a brûlé à Ravières" },
           marque:"Personne n'a brûlé. Guillemette est partie avec les vingt hommes, ce qui n'est pas la même chose qu'un village qui a changé d'avis.",
           court:"Mieux que rien" },
  suite:'a3_ch_apres', libelleSuite:"Ce qu'il en fait",
},

a3_ch_village_ko:{
  qui:null,
  titre:"Ce qu'ils entendent",
  texte:[
    "Vous parlez au village et le village entend ce qu'un village entend quand un homme d'armes arrive de quarante lieues : qu'on vient lui dire ce qu'il doit faire chez lui.",
    { sobre:"Ils se ferment. Charles ne dit rien : il l'a vu venir avant vous.",
      intense:"Ils se ferment en une phrase, et pas la vôtre — celle du prêtre, qui vous demande poliment depuis combien de temps vous vivez à Ravières.\n\nCharles ne dit rien. Il l'a vu venir trois phrases avant vous.",
      extreme:"Ils se ferment en une seule phrase, et ce n'est pas la vôtre.\n\nC'est celle du prêtre, qui vous demande très poliment, sans une once d'ironie, depuis combien de temps vous vivez à Ravières. Il n'y a pas de réponse à ça. Il le sait. Tout le monde le sait avant que vous ayez fini de ne pas répondre.\n\nCharles ne dit rien. Il l'a vu venir trois phrases avant vous et il n'est pas intervenu, ce qui est sa façon de vous apprendre quelque chose." },
    "§ Guillemette part avec les vingt hommes. C'était la seule issue disponible depuis le début et on vient de perdre deux jours à en chercher une meilleure.",
    "^« Ce n'est pas une faute », dit Charles. « J'ai mis onze ans à comprendre qu'on ne les convainc pas de l'extérieur, et je continue d'essayer. »",
  ],
  effets:{ flags:['a3_ch_emmenee','a3_charles_tenu'],
           cout:{ moral:7 },
           marque:"Le village s'est fermé. Guillemette est partie avec les vingt hommes.",
           court:"De l'extérieur" },
  suite:'a3_ch_apres', libelleSuite:"Ce qu'il en fait",
},

a3_ch_inscrire:{
  qui:'charles',
  titre:"Le premier nom",
  texte:[
    "@« Ouvrez le registre. Écrivez-moi. »",
    { sobre:"Il ne bouge pas tout de suite.",
      intense:"Il ne bouge pas tout de suite, et pour la première fois depuis neuf ans quelque chose passe sur sa figure avant qu'il ne le range.",
      extreme:"Il ne bouge pas tout de suite.\n\nEt pour la première fois en neuf ans, quelque chose passe sur cette figure avant qu'il ne le range — pas de la gratitude, il n'en a pas l'usage : le calcul très rapide d'un homme qui vérifie qu'on a bien compris ce qu'on propose." },
    "^« Vous savez ce que ça vaut ici ? »",
    { sobre:"@« Ça vaut que le premier nom n'est pas une fille de onze ans. »",
      intense:"@« Ça vaut que quand vous ouvrirez ce registre devant Ravières, le premier nom dessus ne sera pas une fille de onze ans qui a fait tomber un mur d'étable.\n\nCe sera un homme qui a tenu un siège. Un village ne brûle pas la deuxième ligne d'une page dont il ne peut pas brûler la première. »",
      extreme:"@« Ça vaut que quand vous ouvrirez ce volume au milieu de ce village, le premier nom qu'ils liront ne sera pas celui d'une fille de onze ans qui a fait tomber un mur d'étable vers l'extérieur.\n\nCe sera celui d'un homme qui a tenu un siège devant trois provinces et dont ils ont entendu parler cet hiver au relais. »\n\nUn temps.\n\n@« Un registre n'a jamais protégé personne. Un registre dont on ne peut pas brûler la première ligne protège la deuxième.\n\nC'est un mécanisme sale et il fonctionne, et vous le savez depuis sept ans, et vous n'avez jamais eu de première ligne. »" },
    { sobre:"Il écrit. Il lit les deux lignes à voix haute devant le village.",
      intense:"Il écrit, debout, sur le timon d'une charrette, et il ne dit toujours pas merci.\n\nPuis il fait la seule chose qu'il soit venu faire : il ouvre le volume au milieu du village et il lit les deux lignes à voix haute, dans l'ordre.",
      extreme:"Il écrit, debout, sur le timon d'une charrette, en formant chaque lettre, et il ne dit toujours pas merci parce qu'il n'a jamais remercié personne d'avoir fait ce qu'il fallait faire.\n\nPuis il fait la seule chose qu'il soit venu faire à quarante lieues de chez lui.\n\nIl ouvre le volume au milieu du village, devant les soixante, et il lit les deux lignes à voix haute, dans l'ordre, sans commentaire.\n\nLa première prend onze secondes. Personne ne bouge pendant la deuxième." },
    "§ On ne démonte pas le bûcher. On ne l'allume pas non plus, et il est encore là trois ans après, et les enfants jouent dessus.",
  ],
  effets:{ flags:['a3_ch_inscrit','a3_charles_tenu','in_ch_inscrit','a2_registre_onde'],
           faire:() => { ETAT.suspicion = 100;
                         if(typeof retenir === 'function') retenir('charles', "il s'est inscrit pour qu'une fille de onze ans soit la deuxième ligne"); },
           exploit:{ eclat:9, temoins:'province',
                     quoi:"vous vous êtes inscrit au registre pour qu'un autre nom vienne après" },
           marque:"Vous êtes la première ligne. Guillemette est la deuxième. Le bûcher est resté monté et jamais allumé.",
           court:"La première ligne" },
  plusTard:"Un homme inscrit ne se cache plus. Ce n'est toujours pas la même chose qu'être en sécurité, et cette fois ça a servi à quelqu'un.",
  suite:'a3_ch_apres', libelleSuite:"Ce qu'il en fait",
},

a3_ch_prendre:{
  qui:'charles',
  titre:"La version qu'il connaît",
  texte:[
    "@« Emmenez-la. »",
    { sobre:"^« C'est ce que j'aurais fait. C'est ce que je fais depuis trente ans. »",
      intense:"^« C'est ce que j'aurais fait sans vous, et ce que je fais depuis trente ans, et ça marche : elle vivra. »\n\nIl referme le volume qu'il n'a pas ouvert.\n\n« Onze fois sur quatre-vingt-quinze, le village en a brûlé un autre dans les quatre ans. Onze fois que je sache. »",
      extreme:"^« C'est ce que j'aurais fait sans vous. C'est ce que je fais depuis trente ans et ça marche : elle vivra, elle aura une charge à vingt ans, et dans quarante ans quelqu'un écrira que c'était la bonne décision. »\n\nIl referme le volume qu'il n'a pas ouvert.\n\n« Onze fois sur quatre-vingt-quinze, le village en a brûlé un autre dans les quatre années suivantes. En silence. Sans bûcher monté, sans deux jours d'attente, sans que personne vienne de quarante lieues.\n\nOnze fois **que je sache**. Je ne sais pas combien de fois je ne sais pas. »" },
    "§ Guillemette part à la nuit, entre deux hommes, avec un ballot que sa mère a fait et que sa mère ne lui donne pas elle-même.",
    "^« Ne vous reprochez rien », dit Charles sur la route. « Vous venez de sauver quelqu'un. C'est le mot juste et il ne suffit pas, et c'est toute ma vie. »",
  ],
  effets:{ flags:['a3_ch_emmenee','a3_charles_tenu'],
           exploit:{ eclat:3, temoins:'quelques', quoi:"une fille de onze ans est sortie vivante de Ravières" },
           marque:"Guillemette est partie avec les vingt hommes. Onze fois sur quatre-vingt-quinze, le village en brûle un autre dans les quatre ans.",
           court:"Onze sur quatre-vingt-quinze" },
  suite:'a3_ch_apres', libelleSuite:"Ce qu'il en fait",
},

a3_ch_foule:{
  melee:true, qui:null,
  titre:"La mauvaise réponse",
  texte:[
    "Vous faites avancer la ligne. Vingt hommes de Mont-Draken avancent avec vous parce qu'on leur a dit d'obéir à l'homme que le capitaine a fait venir, et parce que personne n'a prévu ce cas.",
    { sobre:"Ça ne dure pas. Ça n'a jamais duré nulle part.",
      intense:"Une foule de village ne tient pas contre vingt hommes en harnois. Ça ne dure pas soixante secondes, et personne n'est tué, et deux hommes tombent mal.\n\nCe qui casse n'est pas dans la cour.",
      extreme:"Une foule de village ne tient pas contre vingt hommes en harnois. Ça ne dure pas soixante secondes, personne n'est tué, deux hommes tombent mal et l'un des deux boitera.\n\nCe n'est pas là que quelque chose casse.\n\nCe qui casse, c'est qu'à la fin de ces soixante secondes, Ravières a très exactement l'histoire qu'il fallait éviter : *des cavaliers sont venus de quarante lieues, on ne nous a pas laissés régler ça chez nous, et voilà comment ça se passe maintenant.*\n\nIls la raconteront à trois villages. Les trois villages, la prochaine fois, allumeront tout de suite." },
    "§ Guillemette part avec les vingt hommes. Elle vit. C'est le seul point de cette journée qui aille dans le bon sens et il ne pèse pas lourd.",
    { sobre:"^« Ne recommencez pas », dit Charles.",
      intense:"^« Ne recommencez pas », dit Charles, très calmement, sur la route. « Vous venez de me coûter quatre villages, et vous n'en verrez jamais un seul. »",
      extreme:"^« Ne recommencez jamais ça. »\n\nIl le dit très calmement, sur la route, sans se retourner, du même ton dont il lit un chiffre.\n\n« J'aurais pu faire ce que vous venez de faire en quatre secondes, depuis la crête, sans descendre de selle. J'ai passé trente ans à ne pas le faire et je n'ai jamais expliqué pourquoi à personne, parce que personne n'a jamais demandé.\n\nVous venez de me coûter quatre villages. Peut-être six. Vous n'en verrez jamais un seul, vous ne saurez jamais leurs noms, et il n'y aura jamais moyen de vous prouver que je ne me trompe pas.\n\nC'est très exactement ce qui rend ce métier impossible à faire et impossible à expliquer, et je n'ai personne à qui l'expliquer depuis sept ans. »" },
  ],
  effets:{ flags:['a3_ch_force','a3_charles_tenu','a3_ravieres_raconte'],
           cout:{ moral:10 },
           faire:() => { if(typeof retenir === 'function') retenir('charles', "il a fait charger un village de soixante personnes"); },
           marque:"Vous avez fait avancer vingt hommes sur soixante villageois. Guillemette vit. Ravières a maintenant une histoire à raconter.",
           court:"Quatre villages" },
  suite:'a3_ch_apres', libelleSuite:"Ce qu'il en fait",
},

a3_ch_apres:{ dyn:true, texte:[] },

/* ══════════════════════════════════════════════════════════════════════════
 * LA LIGNE DU FLEUVE
 *
 * Le gué d'Aumance est tombé il y a quatre ans. Ce qui reste est un pont, et
 * derrière le pont onze hameaux que personne ne compte parce qu'ils sont
 * humains et que ce sont des Elfes qui tiennent les états.
 * ══════════════════════════════════════════════════════════════════════════ */
a3_th_fleuve:{
  qui:() => auFleuve().qui,
  lieu:"La ligne du fleuve · le pont de Saulaie · Germinal",
  titre:"Onze hameaux",
  texte:[
    /* « le capitaine Nielthas » porte son article : il faut la majuscule
     * de début de phrase, qu'« Alarielle » n'a pas besoin qu'on lui mette. */
    () => { const n = auFleuve().nom; return n[0].toUpperCase() + n.slice(1)
      + " vous attend au bout du pont, du côté nord, où il n'y a rien à voir."; },
    () => `^${auFleuve().mot}`,
    { sobre:"Le gué d'Aumance est tombé il y a quatre ans. La ligne tient sur ce pont.",
      intense:"Le gué d'Aumance est tombé il y a quatre ans, un matin, sans bataille : les maisons du sud ont été rappelées et il n'y avait plus personne dessus.\n\nLa ligne tient depuis sur un pont de pierre à trois arches que personne n'a jamais construit pour ça.",
      extreme:"Le gué d'Aumance est tombé il y a quatre ans, un matin de Frimaire, sans bataille et sans un mort : Aelthiriel a rappelé ses maisons du sud, il n'y avait plus personne sur la rive, et Anarion a fait passer sa colonne à l'heure du repas.\n\nDepuis, la ligne du fleuve tient sur un pont de pierre à trois arches, bâti il y a deux cents ans par un abbé pour des charrettes de foin, et que personne n'a jamais construit pour tenir quoi que ce soit." },
    "§ Derrière le pont, sur la rive sud, il y a onze hameaux.",
    { sobre:"Ils sont humains. Ils ne figurent sur aucun état.",
      intense:"Ils sont humains. Ils ne figurent sur aucun état elfique, parce que les états elfiques comptent les maisons elfiques, et ce n'est pas de la cruauté : c'est ainsi qu'on tient des comptes depuis onze mille ans.",
      extreme:"Ils sont humains.\n\nIls ne figurent sur aucun état elfique. Pas par cruauté, pas par mépris, et personne ici n'a jamais pris la décision de ne pas les compter : les états elfiques comptent les maisons elfiques, ils le font depuis onze mille ans, et il n'existe pas de colonne où mettre quatre cents métayers qui se sont installés sur la rive sud parce que la terre y était libre.\n\nCasser le pont sauve la ligne, sauve six compagnies, et met les onze hameaux de l'autre côté. Ça ne figurera nulle part non plus." },
  ],
  effets:{ flags:['a3_fl_saulaie'],
           marque:"Le pont de Saulaie, trois arches, et onze hameaux humains sur la rive sud que les états elfiques ne comptent pas.",
           court:"Onze hameaux" },
  choix:[
    { t:"Tenir le pont",
      detail:"trois fronts · quatre compagnies prêtées · et les onze hameaux restent devant",
      risque:'définitif',
      va:() => ouvrirBataille('bat_saulaie', 'a3_fl_apres', PRETEES.saulaie) },

    { t:"Faire passer les hameaux d'abord",
      detail:"Présence · commandement — quatre cents personnes, une nuit, et la colonne d'en face n'attendra pas",
      risque:'risqué',
      test:{ carac:'presence', comp:'commandement', dc:14, adversaire:'saulaie', manoeuvre:'passage',
             cout:{ endurance:12 } },
      degres:{ dominante:'a3_fl_passage', nette:'a3_fl_passage', couteuse:'a3_fl_passage',
               echec:'a3_fl_passage_ko', catastrophe:'a3_fl_passage_ko' } },

    { t:"Casser le pont",
      detail:"la ligne tient · six compagnies vivent · onze hameaux passent de l'autre côté",
      risque:'calculé',
      ferme:"Ferme : quatre cents personnes que personne ne compte",
      va:'a3_fl_casser' },
  ],
},

a3_fl_passage:{
  qui:null,
  titre:"Une nuit et quatre cents personnes",
  texte:[
    "On fait passer les onze hameaux dans la nuit, par le pont, dans l'ordre inverse de leur distance : les plus loin d'abord, parce que ce sont eux qui n'arriveront pas si on commence par les autres.",
    { sobre:"Quatre cents personnes. Onze heures. Personne ne dort.",
      intense:"Quatre cent onze personnes en onze heures, avec ce qu'elles portent et deux charrettes qu'on abandonne à la troisième heure parce qu'une charrette sur un pont coûte quarante personnes.\n\nÀ la neuvième heure, les feux d'en face bougent.",
      extreme:"Quatre cent onze personnes en onze heures.\n\nAvec ce qu'elles portent, et rien d'autre. On abandonne deux charrettes à la troisième heure parce qu'une charrette coincée sur un pont de trois arches coûte quarante personnes, et c'est un métayer qui le dit avant vous, et c'est sa charrette.\n\nÀ la neuvième heure, les feux d'en face bougent. Ils ne bougent pas beaucoup et ils ne bougent pas vite, et il n'y a aucune raison de croire qu'ils ne savent pas ce qui se passe : une colonne de quatre cents personnes traversant un pont fait un bruit qu'on entend à une lieue par temps calme.\n\nIls attendent. On ne saura jamais pourquoi et il vaut mieux ne pas le demander." },
    "§ Au matin, il y a quatre cent onze personnes sur la rive nord et une colonne en face qui n'a pas bougé de la nuit.",
    "^« Maintenant vous pouvez casser le pont », dit quelqu'un dans votre dos, et c'est le métayer de la charrette.",
  ],
  effets:{ flags:['a3_fl_passes','a3_fleuve_tenu'],
           cout:{ endurance:10 },
           exploit:{ eclat:8, temoins:'foule',
                     quoi:"quatre cent onze personnes sont passées du bon côté d'un pont en une nuit" },
           marque:"Les onze hameaux sont passés au nord. Quatre cent onze personnes, onze heures, et une colonne en face qui a attendu sans qu'on sache pourquoi.",
           court:"Quatre cent onze" },
  choix:[
    { t:"Casser le pont maintenant",
      detail:"il n'y a plus rien derrière · c'est le seul moment où c'est gratuit",
      risque:'prudent', va:'a3_fl_casser_apres' },
    { t:"Le tenir quand même",
      detail:"un pont cassé ne se rouvre pas · et la ligne remontera un jour",
      risque:'définitif',
      va:() => ouvrirBataille('bat_saulaie', 'a3_fl_apres', PRETEES.saulaie) },
  ],
},

a3_fl_passage_ko:{
  qui:null,
  titre:"Ce qu'on n'a pas fini",
  texte:[
    "On fait passer les hameaux dans la nuit, et on n'a pas le temps. C'était calculable avant de commencer : onze heures pour quatre cents personnes, et la colonne d'en face a bougé à la sixième.",
    { sobre:"Deux cent quarante passent. Le reste est de l'autre côté au matin.",
      intense:"Deux cent quarante et une personnes passent. Les autres sont encore sur la rive sud quand il devient impossible de tenir le pont ouvert, et il faut le dire à quelqu'un, à voix haute, sur un pont, en pleine nuit.\n\nC'est vous qui le dites.",
      extreme:"Deux cent quarante et une personnes passent.\n\nLes autres sont encore sur la rive sud quand il devient impossible de tenir le pont ouvert. Ce moment-là n'a rien de dramatique : un sergent vient vous voir, il dit un chiffre et une heure, et il attend.\n\nIl faut le dire à voix haute, sur un pont, en pleine nuit, à des gens qui sont à trente pas et qui voient très bien qu'on parle d'eux.\n\nC'est vous qui le dites. Personne ne vous le reproche. C'est la partie que personne ne raconte : ils ne vous le reprochent pas, ils s'assoient, et ils attendent le matin." },
    "§ Cent soixante-dix personnes sur la rive sud. On ne sait pas ce qu'elles sont devenues et on ne le saura pas.",
  ],
  effets:{ flags:['a3_fl_partiel','a3_fleuve_tenu'],
           cout:{ moral:9, endurance:12 },
           exploit:{ eclat:4, temoins:'foule', quoi:"deux cent quarante et une personnes sont passées" },
           marque:"Deux cent quarante et une passées, cent soixante-dix restées sur la rive sud. On ne sait pas.",
           court:"Cent soixante-dix" },
  choix:[
    { t:"Tenir le pont",
      detail:"c'est la seule chose qui puisse encore servir à quelqu'un",
      risque:'définitif',
      va:() => ouvrirBataille('bat_saulaie', 'a3_fl_apres', PRETEES.saulaie) },
    { t:"Le casser",
      detail:"ce qui est de l'autre côté y reste · et ce qui est ici vit",
      risque:'calculé', va:'a3_fl_casser_apres' },
  ],
},

a3_fl_casser:{
  qui:() => auFleuve().qui,
  titre:"Ce qui ne figure nulle part",
  texte:[
    "@« Cassez-le. »",
    { sobre:"On casse la troisième arche avant l'aube. C'est propre et c'est rapide.",
      intense:"On casse la troisième arche avant l'aube, avec des coins et de l'eau, à la façon dont on abat un mur qu'on veut voir tomber d'un côté précis. C'est propre, c'est rapide, et c'est fini avant que le premier hameau n'ait compris.",
      extreme:"On casse la troisième arche avant l'aube.\n\nAvec des coins et de l'eau, dans l'ordre, à la façon dont on abat un mur dont on veut choisir le sens de chute. Deux heures. C'est propre, c'est rapide, ça ne réveille personne, et c'est entièrement fini quand le premier hameau de la rive sud aperçoit ce qui manque au milieu du fleuve.\n\nIls ne crient pas. Ils regardent, et ils rentrent, et c'est très largement pire." },
    "§ La ligne tient. Six compagnies ne se battront pas cette saison. C'est un bon calcul et il est juste.",
    { sobre:"Onze hameaux sont de l'autre côté. Personne n'en tiendra jamais le compte.",
      intense:"Onze hameaux sont de l'autre côté. Aucun état elfique ne les portait, aucun état humain ne les portera, et il n'existera jamais de document où cette nuit figure autrement que comme *arche sud abattue, sans perte*.",
      extreme:"Onze hameaux sont de l'autre côté.\n\nAucun état elfique ne les portait. Aucun état humain ne les portera. Il n'existera jamais nulle part de document où cette nuit figure autrement que sous la forme exacte que le rapport lui donne le lendemain matin : *arche sud abattue, sans perte.*\n\nSans perte. C'est écrit. C'est même vrai, dans la seule colonne où quelqu'un compte." },
  ],
  effets:{ flags:['a3_fl_casse','a3_fleuve_tenu'],
           cout:{ moral:12 },
           exploit:{ eclat:5, temoins:'quelques', quoi:"la ligne du fleuve tient et six compagnies vivent" },
           marque:"L'arche sud est abattue. Le rapport dit : *sans perte*. Onze hameaux sont de l'autre côté.",
           court:"Sans perte" },
  plusTard:"Il n'y a personne à qui ça se reproche, et c'est ce qui rend la chose impossible à poser.",
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_fl_casser_apres:{
  qui:null,
  titre:"Le seul moment où c'est gratuit",
  texte:[
    "On casse la troisième arche au matin, devant quatre cent onze personnes qui regardent tomber le pont par lequel elles viennent de passer.",
    { sobre:"Personne ne dit rien. Il n'y a rien à dire et c'est très bien.",
      intense:"Personne ne dit rien. Il n'y a rien à dire : ils sont du bon côté, le pont n'y est plus, et les deux faits sont dans le bon ordre pour une fois.",
      extreme:"Personne ne dit rien.\n\nIl n'y a rien à dire. Ils sont du bon côté. Le pont n'y est plus. Les deux faits sont dans le bon ordre pour une fois, et il n'arrive presque jamais qu'ils soient dans le bon ordre.\n\nLe métayer de la charrette regarde tomber l'arche avec l'attention de quelqu'un qui vérifie un travail. À la fin il hoche la tête une fois, comme on accepte une livraison, et il s'en va s'occuper de ses gens." },
  ],
  effets:{ flags:['a3_fl_casse','a3_fleuve_tenu','a3_fl_propre'],
           exploit:{ eclat:6, temoins:'foule',
                     quoi:"le pont est tombé après les gens, et non avant" },
           marque:"Le pont est tombé après que tout le monde soit passé. C'est l'ordre correct et il est rare.",
           court:"Le bon ordre" },
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_fl_apres:{ dyn:true, texte:[] },

/* ══════════════════════════════════════════════════════════════════════════
 * KAR-DURAK · la onzième porte
 *
 * Scellée de l'intérieur il y a six cents ans. Autour du sceau, à un pouce
 * du bord, quatre entailles trop régulières et trop fines pour être de la
 * main d'un homme. Vous les avez déjà vues, autour d'un creux à paume, dans
 * une cave de Karlsberg, et Alycia avait pâli.
 * ══════════════════════════════════════════════════════════════════════════ */
a3_th_porte:{
  qui:'capitaine_naine',
  lieu:"Kar-Durak · la galerie basse · Pluviôse",
  titre:"Le plan qu'on ne traduit pas",
  texte:[
    "Onze portes. Il en reste trois. On ne vous a pas fait venir pour les tenir : on vous a fait venir pour en rouvrir une, et c'est la première fois en six cents ans que quelqu'un le demande à voix haute.",
    { sobre:"On pose le plan sur la table. Le traducteur ne vient pas.",
      intense:"On pose le plan sur la table — un rouleau de peau, onze cents ans, en parfait état parce qu'ici tout est en parfait état.\n\nLe traducteur ne vient pas. On ne dit pas qu'il refuse : on dit qu'il ne vient pas.",
      extreme:"On pose le plan sur la table. Un rouleau de peau, onze cents ans, en parfait état, parce qu'ici tout ce qui est en pierre et tout ce qui est écrit est en parfait état et que c'est la première chose qu'un homme remarque en descendant.\n\nLe traducteur ne vient pas.\n\nPersonne ne dit qu'il refuse. On dit qu'il ne vient pas, on le dit trois fois, de trois façons différentes, et à la troisième vous comprenez que c'est la formule exacte et qu'elle est employée exprès." },
    "^« La onzième est en bas », dit la capitaine. « Onze cents pieds sous cette salle. Elle est fermée depuis six cents ans et elle a été fermée **du dedans**. »",
    "@« Par qui ? »",
    { sobre:"^« Par les nôtres. C'est la seule chose dont nous soyons sûrs. »",
      intense:"^« Par les nôtres. C'est la seule chose dont nous soyons certains, et c'est écrit dans le rôle de garde : *scellée par ordre, de l'intérieur, sans retour.*\n\nOnze noms de gardes. Aucun n'est ressorti et aucun n'a été porté mort. »",
      extreme:"^« Par les nôtres. C'est la seule chose dont nous soyons absolument certains et c'est écrit dans le rôle de garde de cette année-là, que nous avons encore, que je peux vous montrer, et que je vais vous montrer parce que vous descendrez de toute façon.\n\n*Scellée par ordre, de l'intérieur, sans retour.*\n\nOnze noms de gardes en dessous. Aucun n'est ressorti. Aucun n'a été porté mort. Chez nous on porte les morts, messire — toujours, sur onze cents ans, sans une exception. Ces onze-là n'ont pas été portés, et personne depuis six cents ans n'a jugé utile d'écrire pourquoi. »" },
    { sobre:"§ Le plan porte le sceau. Autour du sceau, il y a quatre entailles.",
      intense:"§ Le plan porte le dessin du sceau, à l'échelle, avec les cotes. Autour du sceau, à un pouce du bord, il y a quatre entailles.\n\nVous les avez déjà vues. Dans une cave de Karlsberg, autour d'un creux à paume, et la personne qui était avec vous avait pâli sans rien expliquer.",
      extreme:"§ Le plan porte le dessin du sceau, à l'échelle, avec les cotes, dans le détail obsessionnel que les Nains mettent à tout ce qui se dessine.\n\nAutour du sceau, à un pouce du bord : quatre entailles.\n\nTrop régulières. Trop fines. Pas de la taille de pierre, et pas de la main d'un homme.\n\nVous les avez déjà vues. Dans une cave de Karlsberg, à onze lieues de toute route entretenue, autour d'un creux à paume qu'un ancêtre avait fait tailler en sachant exactement à quoi ça servirait — et la personne qui était avec vous ce jour-là avait pâli et n'avait rien expliqué.\n\nC'est pour ça que le traducteur ne vient pas." },
  ],
  effets:{ flags:['a3_kd_plan'],
           exploit:{ eclat:3, temoins:'aucun', quoi:"vous avez reconnu quatre entailles" },
           marque:"La onzième porte est scellée du dedans depuis six cents ans. Autour du sceau : les quatre entailles de la cave de Karlsberg.",
           court:"Quatre entailles" },
  choix:[
    { t:"Descendre",
      detail:"onze cents pieds · trois compagnies prêtées · et les Peaux-Vertes y sont déjà",
      risque:'définitif',
      va:() => ouvrirBataille('bat_onzieme', 'a3_kd_apres', PRETEES.onzieme) },

    { t:"« Pourquoi le traducteur ne vient-il pas ? »",
      detail:"Perception · lettres — on l'a dit trois fois de trois façons, et c'est la formule",
      risque:'favorable',
      test:{ carac:'perception', comp:'lettres', dc:12, adversaire:'kardurak', manoeuvre:'traducteur' },
      degres:{ dominante:'a3_kd_traducteur', nette:'a3_kd_traducteur', couteuse:'a3_kd_traducteur',
               echec:'a3_kd_traducteur_ko', catastrophe:'a3_kd_traducteur_ko' } },

    { t:"Refuser",
      detail:"une porte fermée du dedans a été fermée par quelqu'un qui savait quelque chose",
      risque:'prudent', va:'a3_kd_refus' },
  ],
},

a3_kd_traducteur:{
  qui:'capitaine_naine',
  titre:"Ce qu'il ne traduira pas",
  texte:[
    "@« Vous avez dit trois fois qu'il ne vient pas. Vous n'avez pas dit une fois qu'il est occupé. »",
    { sobre:"Elle met un temps.",
      intense:"Elle met un temps, et chez elle c'est considérable : les Nains de cette maison répondent en général avant qu'on ait fini de demander.",
      extreme:"Elle met un temps.\n\nChez elle, c'est considérable. Les Nains de cette maison répondent avant qu'on ait fini de poser la question — non par impolitesse, mais parce qu'ils ont déjà pensé à ce qu'on va demander et que faire attendre serait du gaspillage." },
    { sobre:"^« Il a traduit. Une fois. Il refuse de recommencer. »",
      intense:"^« Il a traduit. Une fois, il y a quarante ans, quand il était jeune et qu'on le lui a ordonné.\n\nIl refuse de le refaire et il refuse de dire ce qu'il a lu. Nous ne l'y contraignons pas : chez nous, un homme qui a lu une chose et qui refuse de la redire a une raison, et la raison appartient à celui qui a lu. »",
      extreme:"^« Il a traduit. Une fois. Il y a quarante ans, quand il était jeune et qu'on le lui a ordonné, et il l'a fait correctement parce qu'on ne fait pas les choses autrement ici.\n\nIl refuse absolument de recommencer. Il refuse de dire ce qu'il a lu. Il ne s'en explique pas et personne ne le lui demande plus.\n\nChez nous, messire, un homme qui a lu une chose et qui refuse de la redire a une raison, et la raison lui appartient. Nous ne la lui prenons pas. C'est peut-être une sottise. C'est ce que nous faisons depuis onze cents ans et ça nous a coûté moins cher que le contraire. »" },
    "@« Qu'est-ce qu'il a dit, à l'époque ? »",
    { sobre:"^« Quatre mots. Il a dit : *ce n'est pas une porte.* »",
      intense:"^« Quatre mots, consignés par le greffe de garde, et le greffe de garde consigne tout.\n\n*Ce n'est pas une porte.*\n\nPuis il a demandé qu'on le change de galerie, et on l'a changé de galerie, et il a quarante ans de plus et il vit toujours. »",
      extreme:"^« Quatre mots. Consignés par le greffe de garde, parce que le greffe de garde consigne tout, y compris ce qu'on préférerait ne pas avoir.\n\n*Ce n'est pas une porte.*\n\nC'est tout. Il n'a rien ajouté ce jour-là ni aucun autre. Il a demandé qu'on le change de galerie, on l'a changé de galerie sans lui poser de question, et il a quarante ans de plus et il vit toujours et il travaille toujours.\n\nJe suis allée le voir avant de vous faire venir. Il m'a écoutée jusqu'au bout, poliment, et il m'a dit une seule chose. Il m'a dit : *si vous l'ouvrez, comptez les onze.* »" },
    "§ Comptez les onze. Onze gardes qui ne sont jamais ressortis et qu'on n'a jamais portés.",
  ],
  effets:{ flags:['a3_kd_su','a3_kd_onze'],
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez obtenu ce qu'un traducteur refuse de redire depuis quarante ans" },
           marque:"*Ce n'est pas une porte.* Et : *si vous l'ouvrez, comptez les onze.*",
           court:"Comptez les onze" },
  choix:[
    { t:"Descendre quand même",
      detail:"trois compagnies · onze cents pieds · et les Peaux-Vertes sont déjà dessous",
      risque:'définitif',
      va:() => ouvrirBataille('bat_onzieme', 'a3_kd_apres', PRETEES.onzieme) },
    { t:"Refuser",
      detail:"quarante ans qu'un homme refuse de redire quatre mots",
      risque:'prudent', va:'a3_kd_refus' },
  ],
},

a3_kd_traducteur_ko:{
  qui:'capitaine_naine',
  titre:"Ce qui appartient à celui qui a lu",
  texte:[
    "@« Pourquoi ne vient-il pas ? »",
    "^« Parce qu'il ne vient pas. » Elle roule le plan. « Chez nous, ce qu'un homme refuse de redire lui appartient. Je ne vous le donnerai pas parce que je ne l'ai pas. »",
    "§ Elle ne ment pas. Elle ne vous dit pas tout, ce qui est différent, et vous n'obtiendrez pas la différence.",
  ],
  effets:{ marque:"Elle ne le dira pas. Ce qu'un homme refuse de redire lui appartient.",
           court:"Ce qui appartient" },
  choix:[
    { t:"Descendre",
      detail:"trois compagnies · onze cents pieds · et les Peaux-Vertes sont déjà dessous",
      risque:'définitif',
      va:() => ouvrirBataille('bat_onzieme', 'a3_kd_apres', PRETEES.onzieme) },
    { t:"Refuser",
      detail:"on ne rouvre pas une porte fermée du dedans sans savoir par qui",
      risque:'prudent', va:'a3_kd_refus' },
  ],
},

a3_kd_refus:{
  qui:'capitaine_naine',
  titre:"Trois portes",
  texte:[
    "@« Non. »",
    { sobre:"^« C'est une réponse. »",
      intense:"^« C'est une réponse, et c'est la nôtre depuis six cents ans, alors je ne vais pas vous la reprocher. »\n\nElle roule le plan et le remet dans son étui.\n\n« Nous tiendrons sur trois portes. Trois portes, c'est vingt ans. »",
      extreme:"^« C'est une réponse. C'est même très exactement la nôtre depuis six cents ans, alors je serais mal placée pour vous la reprocher. »\n\nElle roule le plan et le remet dans son étui de cuir, dans le sens où il était, comme on range une chose dont on sait qu'on la ressortira.\n\n« Nous tiendrons sur trois portes. Trois portes, c'est vingt ans — je le dis parce que c'est vrai, pas pour vous soulager. Vingt ans, ce n'est pas rien : mon père en a vu passer soixante et il a trouvé que c'était court.\n\nQuelqu'un redemandera. Ce ne sera pas moi et ce ne sera pas vous, et il descendra sans savoir ce que vous savez. »" },
  ],
  effets:{ flags:['a3_porte_refusee'],
           marque:"Vous avez refusé de descendre. Kar-Durak tient sur trois portes, ce qui fait vingt ans.",
           court:"Trois portes" },
  suite:'a3_retour', libelleSuite:"Rentrer",
},

a3_kd_apres:{ dyn:true, texte:[] },

a3_kd_ouvrir:{
  qui:null,
  lieu:"Kar-Durak · le seuil de la onzième · onze cents pieds",
  titre:"Ce n'est pas une porte",
  texte:[
    "Il faut quatre heures et onze hommes pour faire jouer un sceau que personne n'a touché depuis six cents ans, et le sceau cède proprement, du premier coup, comme une chose entretenue.",
    { sobre:"Derrière, il n'y a pas de salle. Il y a un escalier.",
      intense:"Derrière, il n'y a pas de salle, pas de chambre, pas de trésor et pas de bête.\n\nIl y a un escalier, qui descend, taillé dans la même pierre et à la même échelle, et il n'est sur aucun plan.",
      extreme:"Derrière, il n'y a pas de salle.\n\nPas de chambre. Pas de trésor. Pas de bête, pas d'os, pas de marque de lutte, pas une arme au sol.\n\nIl y a un escalier. Il descend. Il est taillé dans la même pierre, à la même échelle, avec la même main, et il ne figure sur aucun plan de cette montagne — ni sur le plan de la onzième porte, ni sur les onze cents ans de plans qu'ils ont conservés en parfait état.\n\n**Ce n'est pas une porte.** C'est ce qu'on a mis devant l'escalier." },
    { sobre:"§ On compte les onze. Ils sont là, assis contre le mur, en ordre.",
      intense:"§ On compte les onze. Ils sont là — les onze gardes du rôle, assis contre le mur de l'escalier, en ordre, avec leurs armes rangées à côté d'eux et non en main.\n\nIls ne sont pas morts de violence. Ils se sont assis.",
      extreme:"§ On compte les onze.\n\nIls sont là. Les onze noms du rôle de garde, dans l'ordre du rôle, assis contre le mur du palier, les armes rangées à côté d'eux et non pas en main, chacun à sa place, à distance égale.\n\nAucun n'est mort de violence. Aucun n'a été porté parce qu'aucun n'a été trouvé : personne n'est jamais redescendu chercher.\n\nIls ont scellé la porte de l'intérieur, ils se sont assis en ordre, et ils ont attendu. C'est tout ce que la pierre raconte, et la pierre ici raconte tout." },
    "§ Personne ne descend l'escalier ce jour-là. On rescelle. On rescelle de l'intérieur, et cette fois on remonte avant.",
  ],
  effets:{ flags:['a3_porte_ouverte','a3_porte_rescellee','a3_escalier_vu'],
           exploit:{ eclat:11, temoins:'quelques',
                     quoi:"vous avez vu ce qu'il y a derrière la onzième porte de Kar-Durak" },
           marque:"Ce n'est pas une porte : c'est ce qu'on a mis devant un escalier qui n'est sur aucun plan. Les onze étaient assis en ordre.",
           court:"Un escalier" },
  plusTard:"Les quatre entailles autour du sceau sont celles de la cave de Karlsberg. Personne, dans aucune des deux montagnes, n'a jamais expliqué à quoi elles servent.",
  suite:'a3_retour', libelleSuite:"Remonter",
},

a3_kd_souder:{
  qui:'capitaine_naine',
  titre:"On la referme",
  texte:[
    "@« On ne l'ouvre pas. On la ferme mieux. »",
    { sobre:"^« Bien. »",
      intense:"^« Bien. » Elle ne discute pas une seconde. « C'est ce que je voulais entendre et je n'avais pas le droit de le proposer : c'est nous qui vous avons fait venir pour l'ouvrir. »",
      extreme:"^« Bien. »\n\nElle ne discute pas une seconde et elle ne cache pas pourquoi.\n\n« C'est ce que je voulais entendre. Je n'avais pas le droit de le proposer moi-même : c'est nous qui vous avons fait venir pour l'ouvrir, et un capitaine qui fait venir un homme de quarante lieues pour lui demander de ne rien faire n'est pas un capitaine longtemps.\n\nIl fallait que ça vienne de quelqu'un qui ne nous doive rien. »" },
    "§ On la ferme mieux. Deux jours, trente hommes, et de la pierre par-dessus le sceau — parce qu'un sceau tient six cents ans et que de la pierre tient plus longtemps.",
    "^« Le boyau est à nous », dit-elle au matin. « Il ne l'était plus depuis quatre ans. Ça, au moins, c'est un gain qu'on peut porter au rôle. »",
  ],
  effets:{ flags:['a3_porte_scellee','a3_kardurak_tenu'],
           exploit:{ eclat:6, temoins:'quelques',
                     quoi:"le boyau de la onzième est repris et la porte mieux fermée qu'avant" },
           marque:"On a repris le boyau et rescellé la onzième sous de la pierre. Personne n'a ouvert.",
           court:"Mieux fermée" },
  suite:'a3_retour', libelleSuite:"Remonter",
},

/* ══ L'AIGUILLAGE ══════════════════════════════════════════════════════════
 * Deux théâtres, et on rentre. Le troisième s'est déroulé sans nous. */
a3_retour:{ dyn:true, texte:[] },
a3_sans_vous:{ dyn:true, texte:[] },

};

/* ── Après les batailles ────────────────────────────────────────────────── */
DYN.a3_lu_apres = () => {
  const gagne = ETAT.derniereBataille === 'gagnee';
  SCENES.a3_lu_apres = {
    dyn:true, qui:'lucius',
    lieu:"Astrah · Floréal",
    titre:gagne ? "Ce qui arrive par la route" : "Ce qui n'arrive pas",
    texte:[
      gagne
        ? "Les témoins du nord arrivent. Ils arrivent tard, de mauvaise humeur, et ils arrivent, ce qui est la seule chose qu'on demandait à cette route."
        : "Les témoins du nord n'arrivent pas. Ils n'ont pas eu à refuser : la chaussée était fermée, c'est écrit, et personne ne pourra jamais leur reprocher une absence dont ils ont la preuve.",
      gagne
        ? "^« Vous m'avez rouvert six lieues », dit Lucius. « Je n'avais pas demandé six lieues. Je m'en souviendrai plus longtemps que de ce que j'avais demandé. »"
        : "^« Ce n'est pas une faute », dit Lucius, et il le dit du ton dont il lit un chiffre. « C'était le point faible et je vous l'avais montré en premier. On ne perd pas sur un point qu'on n'a pas vu. »",
      gagne
        ? "§ Il se couronne onze jours plus tard devant quarante et une personnes au lieu de onze. Ce n'est pas une couronne. C'est une couronne qu'il faudra contester au lieu de l'ignorer, et ça vaut trente ans."
        : "§ Il se couronne onze jours plus tard devant onze personnes. Ce sera contesté pendant trente ans et il le sait en le faisant, et il le fait quand même, ce qui est peut-être la seule chose admirable de cet homme.",
    ],
    effets:{ flags:gagne ? ['a3_lucius_tenu','a3_couronne_temoins','a3_montdraken_ferme']
                         : ['a3_lucius_tenu','a3_couronne_seule','a3_montdraken_ferme'],
             marque:gagne
               ? "La route du nord était ouverte. Quarante et une personnes ont vu Lucius se couronner."
               : "La route est restée fermée. Onze personnes ont vu Lucius se couronner.",
             court:gagne ? "Quarante et une" : "Onze" },
    suite:'a3_retour', libelleSuite:"Rentrer",
  };
  aller('a3_lu_apres');
};

DYN.a3_ch_apres = () => {
  const declare = a('a3_ch_declare') || a('a3_ch_inscrit');
  SCENES.a3_ch_apres = {
    dyn:true, qui:'charles',
    lieu:"La route de Mont-Draken",
    titre:declare ? "Ce qu'il porte devant les conseils" : "Ce qu'il range",
    texte:[
      declare
        ? "Il repart avec deux choses qu'il n'avait pas en arrivant : un village qui a déclaré au lieu de brûler, et de quoi le prouver."
        : "Il repart avec ce qu'il avait en arrivant, plus une personne. C'est son bilan habituel et il ne s'en plaint jamais.",
      declare
        ? { sobre:"^« Je vais m'en servir », dit-il. « Vous vous en doutiez. »",
            intense:"^« Je vais m'en servir », dit-il. « Vous vous en doutiez et vous l'avez fait quand même, ce qui est la seule façon dont ces choses-là marchent.\n\nUn principe, un conseil s'assied dessus. Un village de soixante personnes qui a demandé de lui-même autre chose qu'un bûcher, un conseil ne sait pas quoi en faire. »",
            extreme:"^« Je vais m'en servir. »\n\nUn temps.\n\n« Vous vous en doutiez, et vous l'avez fait quand même, ce qui est la seule façon dont ces choses fonctionnent jamais.\n\nJe porte un principe devant les conseils depuis sept ans. Un conseil s'assied sur un principe : c'est ce qu'un conseil est fait pour faire, et je ne le leur reproche plus depuis longtemps.\n\nUn village de soixante personnes qui a demandé de lui-même autre chose qu'un bûcher, un conseil ne sait pas quoi en faire. Il n'y a pas de contre-argument. Il n'y a même pas de mauvaise foi disponible.\n\nJ'ai attendu ça pendant sept ans et je ne pensais pas l'obtenir de mon vivant. »" }
        : "^« Elle vivra », dit-il. « Elle aura une charge à vingt ans. Dans quarante ans quelqu'un écrira que c'était la bonne décision, et ce sera vrai, et ça ne répondra toujours pas à la question. »",
      "§ Il vous quitte à l'embranchement. Il ne dit pas au revoir : il dit *bonne route, messire*, et il l'a dit à la même intonation la première fois, il y a neuf ans, dans une salle de relais.",
    ],
    effets:{ flags:['a3_charles_tenu'],
             faire:() => { if(typeof retenir === 'function')
               retenir('charles', declare ? "Ravières a déclaré au lieu de brûler, et il y était"
                                          : "il est venu à Ravières et il n'a pas changé la donne"); },
             marque:declare
               ? "Charles repart avec un village qui a déclaré. Il portera ça devant quatre conseils."
               : "Charles repart avec une personne de plus. C'est son bilan habituel.",
             court:declare ? "Devant les conseils" : "Une de plus" },
    suite:'a3_retour', libelleSuite:"Rentrer",
  };
  aller('a3_ch_apres');
};

DYN.a3_fl_apres = () => {
  const gagne = ETAT.derniereBataille === 'gagnee';
  const passes = a('a3_fl_passes');
  SCENES.a3_fl_apres = {
    dyn:true, qui:() => auFleuve().qui,
    lieu:"Le pont de Saulaie · au matin",
    titre:gagne ? "Trois arches" : "La troisième arche",
    texte:[
      gagne
        ? "Le pont est encore là. C'est tout ce qu'on demandait et ça a coûté ce que ça devait coûter."
        : "On casse la troisième arche à la nuit, en désordre, parce qu'il n'y a plus rien d'autre à faire et qu'il faut le faire avant qu'ils ne l'atteignent.",
      gagne
        ? (passes
            ? "Les onze hameaux sont au nord depuis la nuit précédente, et le pont est encore debout derrière eux. Les deux à la fois n'arrive presque jamais."
            : "Les onze hameaux sont toujours devant. Ils y étaient hier, ils y sont ce matin, et personne là-bas ne saura jamais que c'était en question.")
        : (passes
            ? "Les onze hameaux sont passés. C'est la seule colonne où le compte est bon, et c'est celle qui compte."
            : "Les onze hameaux sont de l'autre côté. Le rapport dira *arche sud abattue sous pression*, ce qui est exact, et ne dira rien d'autre."),
      () => `^${gagne
        ? "« La ligne tient une saison de plus. C'est tout ce qu'on achète ici et c'est ce que ça vaut. »"
        : "« La ligne descend de quatre lieues. Ce n'est pas votre faute et ça ne changera rien à ce que ça coûte. »"}`,
    ],
    effets:{ flags:['a3_fleuve_tenu'],
             marque:gagne ? "Le pont de Saulaie tient. La ligne du fleuve a une saison de plus."
                          : "La troisième arche est tombée. La ligne descend de quatre lieues.",
             court:gagne ? "Une saison" : "Quatre lieues" },
    suite:'a3_retour', libelleSuite:"Rentrer",
  };
  aller('a3_fl_apres');
};

DYN.a3_kd_apres = () => {
  const gagne = ETAT.derniereBataille === 'gagnee';
  if(!gagne){
    SCENES.a3_kd_apres = {
      dyn:true, qui:'capitaine_naine',
      lieu:"Kar-Durak · la galerie basse",
      titre:"On remonte",
      texte:[
        "On remonte le boyau en portant ce qui peut être porté, dans l'ordre, sans se presser, parce qu'une colonne qui se presse dans un boyau ne remonte pas.",
        "^« La onzième reste fermée », dit la capitaine. « Je ne vais pas prétendre que ça me désole. »",
        "§ Personne ne verra ce qu'il y a derrière. C'est peut-être le meilleur résultat disponible et personne n'ose le dire à voix haute.",
      ],
      effets:{ flags:['a3_kardurak_tenu'],
               marque:"On n'a pas atteint le seuil. La onzième porte reste fermée.",
               court:"Fermée" },
      suite:'a3_retour', libelleSuite:"Remonter",
    };
    aller('a3_kd_apres');
    return;
  }

  SCENES.a3_kd_apres = {
    dyn:true, qui:'capitaine_naine',
    lieu:"Kar-Durak · le seuil de la onzième",
    titre:"Le seuil",
    texte:[
      "Le seuil est dégagé à la sixième heure. Il n'y a plus personne devant la porte.",
      { sobre:"Elle est entière. Elle est fermée. Le sceau est intact.",
        intense:"Elle est entière, elle est fermée, le sceau est intact et il n'a pas une éraflure — six cents ans, et les Peaux-Vertes campaient devant depuis quatre ans sans y toucher.\n\nCe n'est pas de la prudence. Ils n'ont pas essayé.",
        extreme:"Elle est entière. Elle est fermée. Le sceau est intact et n'a pas une seule éraflure.\n\nSix cents ans. Et les Peaux-Vertes campaient dans la salle du treuil depuis quatre ans, à trente pas, avec des outils et du temps.\n\nIls n'ont pas essayé. Il n'y a pas une marque, pas un coin enfoncé, pas une tentative abandonnée. Trente hommes qui vivaient à trente pas d'une porte scellée n'ont jamais eu envie de savoir ce qu'il y avait derrière, et c'est le renseignement le plus désagréable de toute cette descente." },
      a('a3_kd_onze')
        ? "§ *Si vous l'ouvrez, comptez les onze.* Le rôle de garde tient dans une poche et il porte onze noms."
        : "§ Onze gardes l'ont scellée du dedans il y a six cents ans. Aucun n'est ressorti et aucun n'a été porté.",
    ],
    effets:{ flags:['a3_onzieme_atteinte'],
             marque:"Le seuil est dégagé. La porte est intacte, et les Peaux-Vertes n'avaient jamais essayé.",
             court:"Le seuil" },
    choix:[
      { t:"Ouvrir",
        detail:"quatre heures, onze hommes · et six cents ans que personne ne l'a fait",
        risque:'définitif',
        ferme:"Ferme : de pouvoir dire qu'on ne savait pas",
        va:'a3_kd_ouvrir' },
      { t:"Rendre le boyau et la refermer mieux",
        detail:"on est descendu pour reprendre du terrain · le terrain est repris",
        risque:'prudent', va:'a3_kd_souder' },
    ],
  };
  aller('a3_kd_apres');
};

/* ── Ce qui s'est passé sans vous ───────────────────────────────────────────
 * On tient deux théâtres. Le troisième existe quand même : il s'est déroulé
 * pendant qu'on était ailleurs, et il n'y avait personne pour le raconter
 * autrement qu'en trois lignes de courrier. */
const SANS_VOUS = {
  lucius:"**Astrah.** Il s'est couronné en Floréal devant onze personnes, sans témoin du nord, sans vous. Le courrier tient en quatre lignes et la dernière est : *cela s'est fait dans l'ordre.* Ce sera contesté pendant trente ans.",
  charles:"**Ravières.** Le bûcher a été allumé le lendemain du départ de la commission. On l'apprend par un relais, six semaines plus tard, dans une phrase qui ne s'attarde pas parce que celui qui écrit ne sait pas que vous connaissiez le nom.",
  fleuve:"**Le pont de Saulaie.** La troisième arche est tombée un matin de Germinal. La ligne descend de quatre lieues. Les onze hameaux étaient encore devant : le rapport porte *sans perte*, ce qui est exact dans la seule colonne où quelqu'un compte.",
  porte:"**Kar-Durak.** Personne n'est descendu. Ils tiennent sur trois portes, ce qui fait vingt ans, et la capitaine a écrit une lettre de trois lignes pour dire qu'elle ne vous en veut pas, ce qui est la chose la plus naine qu'on puisse faire.",
};

DYN.a3_sans_vous = () => {
  const A = A3();
  const laisses = demandesOuvertes().filter(d => !A.tenus.includes(d.id));

  SCENES.a3_sans_vous = {
    dyn:true,
    lieu:"Karlsberg · la salle des comptes · Prairial",
    titre:"On vous raconte",
    texte:[
      "Le courrier de trois mois arrive d'un coup, comme toujours, et il faut une matinée pour le lire dans l'ordre où il est arrivé au lieu de l'ordre où on voudrait.",
      laisses.length
        ? "§ Il y a ce qu'on a tenu, et il y a ce qui s'est déroulé pendant ce temps-là, à quarante lieues, sans personne pour le regarder."
        : "§ Il n'y a rien à raconter : vous étiez partout où l'on vous demandait d'être. Ça n'arrive pas et ça ne se reproduira pas.",
      ...laisses.map(d => SANS_VOUS[d.id]),
      laisses.length
        ? { sobre:"On tient deux théâtres. Jamais trois.",
            intense:"On tient deux théâtres. Jamais trois. Ce n'est pas une consolation et personne ne l'a jamais proposé comme telle.",
            extreme:"On tient deux théâtres. Jamais trois.\n\nCe n'est pas une consolation, personne ne l'a jamais proposé comme telle, et ça ne devient pas plus vrai à force d'être exact.\n\nCe qu'on lit ce matin-là s'est passé pendant qu'on faisait autre chose, et l'autre chose était utile, et les deux propositions tiennent ensemble sans se soulager l'une l'autre. C'est tout ce que neuf ans ont appris à cette maison." }
        : "Vous avez été partout. Ça a coûté ce que ça devait coûter et le compte se présentera plus tard, comme toujours.",
    ],
    effets:{ flags:['a3_raconte'],
             marque:laisses.length
               ? `Sans vous : ${laisses.map(d => d.qui).join(' · ')}.`
               : "Vous étiez partout où l'on vous demandait d'être.",
             court:laisses.length ? "Sans vous" : "Partout" },
    suite:'a3_siege', libelleSuite:"L'hiver suivant",
  };
  aller('a3_sans_vous');
};

/* ── Le retour ─────────────────────────────────────────────────────────────
 * Deux théâtres tenus, on passe à ce qui monte la vallée. En dessous, il
 * reste une décision à prendre. */
DYN.a3_retour = () => {
  const A = A3();
  if(A.tenus.length >= 2){ aller('a3_sans_vous'); return; }
  aller('a3_convergence');
};

enregistrerScenes(THEATRES);

/* Aucune de ces scènes n'est la cible d'un `va:` depuis l'extérieur : c'est
 * `a3_convergence` qui les ouvre et l'aiguillage qui les referme. */
entree2('a3_th_lucius', 'a3_th_charles', 'a3_th_fleuve', 'a3_th_porte',
        'a3_retour', 'a3_sans_vous', 'a3_lu_apres', 'a3_ch_apres',
        'a3_fl_apres', 'a3_kd_apres',
        /* Ces deux-là ne sont visées que depuis un choix que `a3_kd_apres`
         * compose à l'exécution : le graphe statique ne peut pas les voir. */
        'a3_kd_ouvrir', 'a3_kd_souder');
