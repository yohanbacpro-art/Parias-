/* PARIAS — Acte I · C03 · L'HÉRITIER DISPARU
 * ═══════════════════════════════════════════════════════════════════════
 * Le verbe de cet arc est DESCENDRE.
 *
 * Il n'y a pas d'adversaire. Il y a une montagne, de l'air qui s'épuise,
 * de l'eau qui monte, du bois qui travaille, et une somme de gens qu'on ne
 * pourra pas tous remonter. Le combat, ici, se joue contre une horloge et
 * contre une arithmétique.
 *
 * Le commanditaire ne ment pas sur le disparu. Il ment sur ce qu'il y a au
 * fond du trou où le disparu est descendu.
 * ═══════════════════════════════════════════════════════════════════════ */

/* ── Le fond ───────────────────────────────────────────────────────────────
 * Trois grandeurs, et une seule compte vraiment : l'air. On descend en les
 * dépensant, et rien de ce qu'on dépense ne se regagne. */
const fond = () => (ETAT.acte.mine = ETAT.acte.mine || { air:100, eau:0, niveau:0 });
const descendre = (dAir, dEau) => {
  const m = fond();
  m.air = Math.max(0, m.air - (dAir || 0));
  m.eau = Math.min(100, m.eau + (dEau || 0));
  m.niveau += 1;
};
const barreFond = () => {
  const m = fond();
  return { position:`niveau ${m.niveau}`, note:`Air ${m.air} · eau ${m.eau}` };
};

const ARC_C03 = {

ar_audience:{
  lieu:"Contreforts nains · Arquenay · le bureau du régisseur",
  titre:"Un garçon qui n'est pas rentré",
  qui:'corbeil',
  texte:[
    "Arquenay n'est pas une maison : c'est une comptabilité avec un toit. Trois bâtiments bas au pied des contreforts, une cour de roulage, quatorze chariots de minerai, et un bureau où l'on vous reçoit assis, ce qui est déjà un renseignement sur le rang qu'on vous accorde.",
    "Maître Corbeil, régisseur des mines, a quarante-cinq ans, des manches de lustrine et l'aisance parfaite d'un homme qui n'a jamais eu à porter quoi que ce soit.",
    "« Gaspard d'Arquenay. Vingt-deux ans. Parti le onze, pas revenu le douze. Il devait épouser en Floréal une fille de Chastel qu'il n'a jamais vue. »",
    { sobre:"« Il a fui son mariage. C'est banal et c'est cher. »",
      intense:"« Il a fui son mariage, messire. C'est banal. Les garçons de vingt-deux ans font ça depuis qu'il y a des mariages. C'est aussi très cher : un contrat rompu par défaut de comparution coûte à cette maison le tiers de ses parts de mine. »",
      extreme:"« Il a fui son mariage. C'est banal. Les garçons de vingt-deux ans font ça depuis qu'il y a des mariages. C'est aussi ruineux. Un contrat rompu par défaut de comparution coûte à cette maison le tiers de ses parts de mine. Le tiers, messire. C'est-à-dire tout ce qu'elle possède au monde, hors trois bâtiments bas et quatorze chariots. »" },
    "« Trois cents couronnes pour le ramener avant Floréal. Vivant, de préférence, mais ce n'est pas dans le contrat : ce qui est dans le contrat, c'est *comparaissant*. »",
    "§ *Comparaissant.* Il vient de vous dire, dans un bureau, avec des manches de lustrine, qu'un corps ferait aussi bien l'affaire.",
    "@« Et la coutume ancienne, que votre maison a mise dans sa lettre ? »",
    "« La coutume ancienne est due et sera honorée. Vous en parlerez à Dame Maëlys, qui est majeure depuis huit mois et qui refusera, parce qu'elle refuse tout depuis huit mois. »",
    "Il pousse un pli vers vous.",
    "« Le plan des galeries. Il est à jour. »",
  ],
  choix:[
    { t:"Parler à Maëlys d'Arquenay",
      si:() => !a('ar_maelys'),
      detail:"Sa sœur · vingt ans · elle est la seule ici à vouloir qu'on le retrouve vivant",
      va:'ar_maelys' },
    { t:"Lire le plan des galeries",
      si:() => !a('ar_plan'),
      detail:"« Il est à jour » · un plan de mine à jour est une chose qui n'existe pas · Intellect contre 10",
      risque:"favorable",
      test:{ carac:'intellect', comp:'tactique', dc:10, manoeuvre:'plan' },
      degres:{ dominante:'ar_plan_dom', nette:'ar_plan_ok', echec:'ar_plan_ko' } },
    { t:"Descendre au village des mineurs",
      si:() => !a('ar_village'),
      detail:"Quatre cents personnes qui vivent du fond · elles savent tout et ne disent rien",
      va:'ar_village' },
    { t:"Aller au puits",
      detail:"Onze jours qu'il est en bas · l'air d'une galerie fermée tient six semaines",
      va:'ar_puits' },
  ],
},

ar_maelys:{
  qui:'maelys',
  titre:"Elle ne croit pas au mariage",
  texte:[
    "Elle vous reçoit dans la cour de roulage, debout au milieu des chariots, parce que c'est le seul endroit d'Arquenay où le bruit couvre les conversations.",
    "Maëlys d'Arquenay a vingt ans, majeure depuis huit mois, et l'air de quelqu'un qui a dormi trois heures par nuit pendant onze nuits.",
    "« Corbeil vous a dit qu'il a fui son mariage. »",
    "« Oui. »",
    "« Mon frère a signé le contrat de mariage le neuf. De sa main, sans qu'on lui force le poignet, en riant, parce qu'il trouvait la chose absurde et qu'il l'avait acceptée. »",
    { sobre:"« Il est parti le onze. On ne fuit pas un mariage qu'on a signé en riant. »",
      intense:"« Il est parti le onze avec une lampe, une corde et le carnet de tailles du trimestre. On ne fuit pas en emportant un carnet de comptes, messire. On fuit avec de l'argent et un cheval, et le cheval est à l'écurie. »",
      extreme:"« Il est parti le onze avec une lampe à huile, quarante pieds de corde et le carnet de tailles du trimestre. On ne fuit pas un mariage en emportant un carnet de comptes : on fuit avec de l'argent et un cheval. L'argent est dans son coffre, que j'ai ouvert, et le cheval est à l'écurie, où je l'ai vu ce matin. »" },
    "« Que cherchait-il ? »",
    "« Une différence. » Elle sort de sa manche une feuille pliée en quatre, couverte de chiffres en deux colonnes. « Le rendement déclaré du puits trois et le tonnage sorti du puits trois. Ils ne tombent pas juste depuis dix-neuf mois. »",
    "§ Un garçon de vingt-deux ans a trouvé une différence dans un carnet, et il est descendu la vérifier tout seul.",
    "@« Combien de différence ? »",
    "« Assez pour qu'on ait creusé une galerie qui n'est sur aucun plan, et qu'on y ait fait travailler des gens qui ne sont sur aucun rôle. »",
    "Elle replie la feuille et la remet dans sa manche.",
    "« Corbeil vous a donné un plan à jour, messire. Il est à jour de tout ce qui est déclaré. »",
  ],
  effets:{ flags:['ar_maelys','ar_sait_difference','ar_sait_galerie'],
           exploit:{ eclat:3, temoins:'un', quoi:"la sœur du disparu vous a donné ses comptes" },
           marque:"Gaspard est descendu vérifier une différence de tonnage. Il y a une galerie hors plan.",
           court:"La différence" },
  suite:'ar_audience', libelleSuite:"Revenir" },

ar_plan_dom:{
  texte:[
    "Un plan de mine à jour n'existe pas. C'est la première chose qu'on apprend en regardant un plan de mine : le fond change tous les jours, un chef de taille suit une veine où elle va, et le dessin arrive toujours six mois après la pioche.",
    "Celui-ci est parfait. Régulier, coté, propre, sans une reprise.",
    { sobre:"§ Un plan trop propre est un plan recopié.",
      intense:"§ Un plan trop propre est un plan recopié — et on ne recopie un plan que pour en retirer quelque chose.",
      extreme:"§ Un plan trop propre est un plan recopié. Et on ne recopie pas un plan de mine pour le plaisir : on le recopie pour en retirer quelque chose, et ce qu'on retire laisse toujours la même trace, qui est un vide." },
    "Le puits trois descend à cent quatre-vingts pieds et dessert quatre tailles. Les quatre tailles sont cotées, chiffrées, datées.",
    "Entre la deuxième et la troisième, il y a soixante-dix pieds de galerie sans un seul repère coté. Soixante-dix pieds de rien, sur un plan où tout est coté tous les vingt.",
    "@« Maître Corbeil, qu'y a-t-il entre la deuxième et la troisième taille du puits trois ? »",
    "« Du roc. »",
    "« Soixante-dix pieds de roc sur lesquels on n'a pas jugé utile de porter une cote. »",
    "§ Il ne se trouble pas une seconde. Les hommes de sa sorte ne se troublent jamais : ils vous laissent avoir raison et ils comptent sur le fait que ça ne vous servira à rien.",
    "^« Vous avez le plan, messire. Descendez donc voir. »",
  ],
  effets:{ flags:['ar_plan','ar_sait_galerie','ar_sait_soixante_dix'],
           exploit:{ eclat:4, temoins:'un', quoi:"vous avez lu un plan de mine mieux que le régisseur ne l'espérait" },
           marque:"Soixante-dix pieds sans cote entre la deuxième et la troisième taille du puits trois.",
           court:"Soixante-dix pieds" },
  suite:'ar_audience', libelleSuite:"Revenir" },

ar_plan_ok:{
  texte:[
    "Le puits trois descend à cent quatre-vingts pieds. Quatre tailles, un plan d'aérage à deux entrées, un puits d'épuisement avec une pompe à chapelet, et des cotes tous les vingt pieds.",
    "C'est un beau plan. C'est même un très beau plan, et c'est ce qui vous gêne sans que vous sachiez dire pourquoi.",
    "§ Vous n'êtes pas mineur. C'est toute la difficulté de cette affaire et elle ne se règle pas dans un bureau.",
    "Vous emportez le plan. Il vous servira, et il vous mentira, et vous ne saurez pas dans quel ordre.",
  ],
  effets:{ flags:['ar_plan'],
           marque:"Vous avez le plan du puits trois. Il est trop propre.", court:"Le plan" },
  suite:'ar_audience', libelleSuite:"Revenir" },

ar_plan_ko:{
  texte:[
    "C'est un plan de mine. Il y a des traits, des cotes, des chiffres et des mots que vous ne connaissez pas — *stot*, *bure*, *recoupe*, *tête de taille* — et au bout d'un quart d'heure vous savez exactement ce que vous saviez en l'ouvrant.",
    "§ Un homme d'armes qui lit un plan de mine est un homme d'armes qui regarde du papier.",
    "Maître Corbeil vous laisse faire sans un mot pendant tout le quart d'heure, et c'est la seule chose désobligeante qu'il fasse de tout l'entretien.",
  ],
  effets:{ flags:['ar_plan'], cout:{ moral:3 } },
  suite:'ar_audience', libelleSuite:"Revenir" },

ar_village:{
  qui:'bergrun',
  titre:"Ceux qui remontent",
  texte:[
    "Le village des mineurs d'Arquenay est à onze cents pieds sous le bureau du régisseur, en distance verticale de vie : quatre cents personnes, des maisons de pierre sèche, et une odeur de charbon de bois et de soupe qu'on refait depuis quarante ans.",
    "Personne ne vous parle. C'est normal et ce n'est pas de l'hostilité : un homme d'armes payé par la maison qui descend au village pose des questions dont les réponses coûtent des places.",
    "Sauf un.",
    "Bergrun a quarante ans de fond, il mesure cinq pieds, il est des contreforts — de la vieille souche, celle qui était là avant qu'Arquenay achète le droit de creuser — et il a cessé d'avoir peur des régisseurs vers l'âge de trente ans.",
    "« Vous cherchez le garçon. »",
    "« Oui. »",
    "« Il est au fond du trois. Tout le monde ici le sait et personne ne vous le dira, sauf moi, parce que j'ai soixante-deux ans et que je touche une pension que je peux perdre. »",
    { sobre:"« Ce qu'il y a entre la deux et la trois, c'est une galerie. »",
      intense:"« Ce qu'il y a entre la deuxième et la troisième taille, ce n'est pas du roc. C'est une galerie de soixante-dix pieds ouverte il y a dix-neuf mois, hors plan, hors rôle, sans aérage propre et avec un boisage de bois vert. »",
      extreme:"« Entre la deuxième et la troisième taille, ce n'est pas du roc : c'est une galerie de soixante-dix pieds ouverte il y a dix-neuf mois. Hors plan, hors rôle, sans aérage propre, boisée en bois vert parce que le bois sec se compte et que le bois vert ne se compte pas. Un boisage de bois vert tient dix-huit mois, messire. Ça en fait dix-neuf. »" },
    "« Qui y travaille ? »",
    "« Dix-neuf des nôtres, payés double et pas déclarés. »",
    "Il crache dans le feu.",
    "« Et quatorze autres, qui ne sont pas des nôtres, qui sont arrivés en chariot fermé il y a onze mois, et dont personne n'a jamais entendu la voix parce qu'ils ne parlent pas notre langue. »",
    "§ Trente-trois personnes au fond d'une galerie qui n'existe pas, sous dix-neuf mois de bois vert.",
    "@« Et le garçon ? »",
    "« Le garçon est descendu le onze avec une lampe et une corde. Il n'y a qu'une chose à savoir sur le onze, messire : on n'a pas remonté la corde. »",
  ],
  effets:{ flags:['ar_village','ar_bergrun','ar_sait_galerie','ar_sait_trente_trois','ar_sait_bois_vert'],
           exploit:{ eclat:3, temoins:'quelques', quoi:"un vieux chef de taille vous a tout dit" },
           marque:"Trente-trois personnes au fond d'une galerie hors plan, sous dix-neuf mois de bois vert.",
           court:"Trente-trois" },
  suite:'ar_audience', libelleSuite:"Remonter" },

};

/* ══ LES TERMES, ET LE PUITS ══════════════════════════════════════════════ */
const ARC_C03_2 = {

ar_termes:{
  qui:'maelys',
  titre:"Ce qu'Arquenay doit",
  texte:[
    "@« Corbeil m'a dit que vous refuseriez. »",
    "« Corbeil dit ça de tout ce que je fais depuis huit mois, et il a eu raison huit fois sur onze. »",
    "Elle s'assied sur le timon d'un chariot vide, ce qu'une fille de maison ne fait pas, et qu'elle fait manifestement souvent.",
    "« Vous savez que je me marie en Floréal. »",
    "« Oui. »",
    "« Alors vous savez aussi ce que ça a l'air de vouloir dire, et vous êtes en train de vous demander si vous devez me le dire à ma place. Ne le faites pas. Je vais vous donner ma raison, et vous en ferez ce que vous voudrez. »",
    { sobre:"Elle ne baisse pas la voix. La cour de roulage fait assez de bruit.",
      intense:"Elle ne baisse pas la voix — la cour de roulage fait assez de bruit pour dix conversations — et elle parle du ton dont on énumère.",
      extreme:"Elle ne baisse pas la voix : la cour de roulage couvre dix conversations. Elle parle du ton dont on énumère des postes de dépense, et c'est probablement la seule façon dont elle peut dire ces choses-là sans que ça la casse." },
    "« J'ai vingt ans. Je suis majeure depuis huit mois et je n'ai rien décidé pendant ces huit mois. Dans six semaines j'épouse un homme que je n'ai jamais vu, dans une province que je ne connais pas, pour des parts de mine. »",
    "« Ce n'est pas une raison de dire oui. »",
    "« Non. C'est une raison de vouloir décider quelque chose, et ce n'est pas la même chose, et je vous demande de me croire capable de faire la différence. »",
    "§ Elle a raison. Décider à sa place que sa raison n'est pas bonne serait exactement ce que fait sa maison depuis huit mois.",
    "@« La coutume se refuse sans conséquence. Le contrat tient de toute façon. Vous ne me devez rien. »",
    "« Je sais. C'est écrit dans le formulaire, messire, et le formulaire est la seule chose de ce monde qui m'ait jamais dit ça. »",
    "Elle attend.",
    "« Alors : oui, si vous voulez. Non, si vous ne voulez pas. Et dans les deux cas vous descendez chercher mon frère, parce que c'est ce pour quoi vous êtes payé et parce que ça n'a jamais eu de rapport. »",
  ],
  choix:[
    { t:"Accepter les termes",
      detail:"L'or et la coutume · fixés d'avance, par elle, pour sa raison",
      definitif:true, va:'ar_accord' },
    { t:"L'or seul",
      detail:"Trois cents couronnes · et rien d'autre n'est demandé",
      ferme:"Ferme : ce que la coutume ouvrait ici",
      definitif:true, va:'ar_or_seul' },
  ],
},

ar_accord:{
  qui:'maelys',
  texte:[
    "@« Alors oui. »",
    "« Bien. » Elle se lève du timon et elle époussette sa robe, ce qui ne sert à rien sur une cour de roulage. « Après. Quand vous serez remonté. Et si vous ne remontez pas, ça n'aura été qu'une phrase dite dans une cour, ce qui est déjà plus que ce que j'ai dit en huit mois. »",
    "§ Elle a vingt ans et elle négocie mieux que son régisseur.",
    "^« Une chose, messire. Quand vous serez en bas : si vous devez choisir entre le ramener lui et ramener quelqu'un d'autre, ramenez quelqu'un d'autre. »",
    "« Pourquoi ? »",
    "« Parce qu'il me le dirait, et parce qu'il aurait raison, et parce que je n'aurai pas le courage de le redire une deuxième fois. »",
  ],
  effets:{ flags:['ar_termes_fait','ar_coutume','ar_maelys_accord','ar_consigne'],
           marque:"Maëlys d'Arquenay a fixé les termes, et vous a dit de ramener quelqu'un d'autre.",
           court:"Quelqu'un d'autre" },
  suite:'ar_audience', libelleSuite:"Revenir" },

ar_or_seul:{
  qui:'maelys',
  texte:[
    "@« L'or seul. »",
    "Elle hoche la tête une fois, sans commentaire, et c'est probablement la réponse la plus élégante possible.",
    "« Corbeil aura eu raison neuf fois sur douze. Il en sera insupportable. »",
    "§ Elle sourit. C'est la première fois en onze jours et ça ne dure pas.",
    "^« Une chose, messire. En bas : si vous devez choisir entre ramener mon frère et ramener quelqu'un d'autre, ramenez quelqu'un d'autre. »",
    "« Pourquoi ? »",
    "« Parce qu'il me le dirait. Et parce que je n'aurai pas le courage de le redire. »",
  ],
  effets:{ flags:['ar_termes_fait','ar_or_seul','ar_consigne'], suspicion:2,
           marque:"Vous n'avez pas réclamé la coutume à Arquenay.", court:"L'or seul" },
  suite:'ar_audience', libelleSuite:"Revenir" },

/* ══ LE PUITS ═════════════════════════════════════════════════════════════ */
ar_puits:{
  qui:'bergrun',
  lieu:"Puits trois · la recette du jour",
  titre:"Cent quatre-vingts pieds",
  melee:true,
  effets:{ faire:() => { ETAT.acte.mine = { air:100, eau:0, niveau:0 }; },
           melee:barreFond, flags:['ar_descend'] },
  texte:[
    "On descend dans une benne. C'est la première chose qu'il faut accepter et c'est celle qui coûte le plus : un tonneau de fer de quatre pieds, au bout d'un câble, dans un trou de six pieds de large, sur cent quatre-vingts pieds.",
    { sobre:"Les quarante premiers pieds, on voit encore le ciel.",
      intense:"Les quarante premiers pieds, on voit encore le ciel — un disque gris qui rétrécit. Après, il n'y a plus que la paroi qui défile, l'eau qui suinte et qui tombe sur les épaules, et le bruit du treuil qui devient le seul bruit du monde connu.",
      extreme:"Les quarante premiers pieds, on voit encore le ciel : un disque gris qui rétrécit. Après, il n'y a plus que la paroi qui défile à un pied du coude, l'eau de suintement qui tombe dans le col en gouttes glacées, et le treuil dont le grincement devient le seul bruit du monde. À cent pieds l'air change de goût. À cent cinquante, il change de poids." },
    () => a('ar_bergrun')
      ? "Bergrun descend avec vous. Il ne devrait pas — soixante-deux ans, une pension à perdre — et il ne l'a pas demandé : il est entré dans la benne avant vous et il n'y a pas eu de discussion."
      : "Vous descendez seul. Le mineur de recette vous a regardé entrer dans la benne comme on regarde quelqu'un faire une chose qu'on n'a pas envie d'expliquer.",
    "§ Onze jours. Une galerie fermée garde son air six semaines. Une galerie mal aérée le garde onze jours.",
    "Au fond du trois, il fait quatre degrés et il n'y a pas un souffle.",
    () => a('ar_sait_soixante_dix') || a('ar_sait_galerie')
      ? "La deuxième taille est à main droite. La troisième est à soixante-dix pieds plus loin. Entre les deux, un mur de remblai monté à sec, qui a l'air d'être là depuis toujours et qui a dix-neuf mois."
      : "La deuxième taille est à main droite, la troisième plus loin. Entre les deux, un mur de remblai monté à sec — du roc, a dit le régisseur.",
  ],
  choix:[
    { t:"Ouvrir le remblai",
      detail:"Un mur monté à sec se défait à la main · deux heures · beaucoup de bruit",
      risque:"prudent",
      test:{ carac:'force', comp:null, dc:8, manoeuvre:'remblai', cout:{ endurance:12 } },
      degres:{ dominante:'ar_remblai_dom', nette:'ar_remblai_dom', echec:'ar_remblai_ko' } },
    { t:"Chercher l'aérage",
      si:() => a('ar_bergrun') || a('ar_sait_bois_vert'),
      detail:"Une galerie clandestine a forcément une prise d'air, et elle est plus étroite · Perception + furtivité contre 10",
      risque:"calculé",
      test:{ carac:'perception', comp:'furtivite', dc:10, manoeuvre:'aerage', cout:{ endurance:10 } },
      degres:{ dominante:'ar_aerage_dom', couteuse:'ar_aerage_cout', echec:'ar_remblai_ko' } },
    { t:"Appeler",
      detail:"Crier dans un fond de puits · on entend à trois cents pieds · et tout le monde entend",
      va:'ar_appeler' },
  ],
},

ar_remblai_dom:{
  melee:true,
  texte:[
    "Un mur de remblai monté à sec n'est pas un mur : c'est un tas de pierres tenu debout par sa propre forme. On le défait par le haut, en retirant les pierres une par une, et ça prend deux heures.",
    { sobre:"À la première brèche, l'air passe. Il n'est pas bon.",
      intense:"À la première brèche — trois pouces — l'air passe, et il passe dans le mauvais sens : il vient de l'autre côté vers vous, ce qui veut dire que la galerie est en surpression, ce qui veut dire qu'elle n'a plus d'issue par l'autre bout.",
      extreme:"À la première brèche — trois pouces — l'air passe, et il vient de l'autre côté vers vous : la galerie est en surpression, elle n'a plus d'issue à l'autre bout. Et il sent la lampe éteinte, l'urine et quelque chose de sucré. La flamme de votre lampe monte, jaunit, et se met à filer une fumée noire qu'elle ne faisait pas il y a une minute." },
    "§ Une lampe qui jaunit dit qu'il manque de l'air. Une lampe qui s'éteint dit qu'il est trop tard, et elle le dit deux minutes avant qu'on le sache soi-même.",
    () => a('ar_bergrun')
      ? "« On ouvre en grand », dit Bergrun. « Si on ouvre petit, ça se vide en douze heures. Si on ouvre grand, ça se mélange tout de suite et on respire mal pendant un quart d'heure. Il n'y a pas de troisième version. »"
      : "Vous ouvrez en grand parce que vous ne connaissez pas la troisième version, et c'est par chance la bonne décision.",
    "Vous ouvrez en grand. On respire mal pendant un quart d'heure, la tête tourne, on a mal au crâne — et ça passe.",
  ],
  effets:{ faire:() => descendre(20, 0), flags:['ar_ouvert'], cout:{ endurance:14 },
           meleeMaj:barreFond,
           marque:"Vous avez ouvert le remblai du puits trois.", court:"Ouvert" },
  suite:'ar_galerie', libelleSuite:"Entrer" },

ar_remblai_ko:{
  melee:true,
  texte:[
    "Vous retirez les pierres par le milieu au lieu du haut.",
    { sobre:"Le tas s'effondre sur vous. Vous en sortez.",
      intense:"Un mur monté à sec tient par sa forme, et quand on retire une pierre du milieu, la forme cesse. Deux tonnes de remblai partent d'un bloc et vous prennent les jambes. Vous en sortez — on en sort presque toujours, c'est du remblai et pas du roc — avec une cheville qui n'a pas aimé.",
      extreme:"Un mur monté à sec tient par sa forme ; on retire une pierre du milieu et la forme cesse. Deux tonnes partent d'un bloc et vous prennent les jambes jusqu'aux hanches. Vous en sortez — on en sort presque toujours, c'est du remblai — en vous dégageant à la main pendant vingt minutes, dans le noir, avec la lampe tombée et éteinte, et une cheville droite qui a pris une pierre de trente livres en travers." },
    "L'air passe quand même. Il passe même très bien : vous venez d'ouvrir soixante pieds carrés au lieu de trois.",
    "§ La galerie se vide dans le puits en une demi-heure. C'est bon pour ceux qui sont dedans et c'est très mauvais pour le boisage, qui n'a rien demandé.",
    "Quelque part devant, dans le noir, du bois travaille. Ça fait un bruit de corde de navire.",
  ],
  effets:{ faire:() => descendre(30, 10), flags:['ar_ouvert','ar_bois_reveille'],
           cout:{ endurance:20, vitalite:8 },
           blessure:{ id:'cheville', zone:"Cheville droite", type:"écrasée sous le remblai",
                      gravite:2, douleur:3, saignement:0, fonction:['agilite','endurance','furtivite'],
                      cicatrice:"une cheville qui enfle chaque soir pendant deux ans" },
           meleeMaj:barreFond,
           marque:"Vous avez fait tomber le remblai et réveillé le boisage.", court:"Le bois travaille" },
  suite:'ar_galerie', libelleSuite:"Entrer" },

ar_aerage_dom:{
  melee:true,
  texte:[
    "Une galerie clandestine doit respirer. Elle respire par un boyau qu'on a percé quelque part et qu'on n'a pas porté au plan, et un boyau d'aérage fait dix-huit pouces sur douze.",
    "Il est derrière la troisième taille, sous une bâche de toile goudronnée, et on le trouve en éteignant sa lampe et en marchant les yeux fermés jusqu'à sentir un filet d'air froid sur la joue.",
    { sobre:"Dix-huit pouces sur douze, sur quarante pieds, en rampant.",
      intense:"Dix-huit pouces sur douze. Sur quarante pieds. En rampant, les bras devant, sans pouvoir se retourner, sans pouvoir plier les coudes, en poussant la lampe devant soi avec le menton parce qu'on n'a pas de main libre.",
      extreme:"Dix-huit pouces sur douze, sur quarante pieds, en rampant, les bras tendus devant, sans possibilité de se retourner ni de plier les coudes, en poussant la lampe du menton. À mi-chemin, la cage thoracique touche en haut et en bas en même temps, et il faut expirer pour avancer de six pouces. C'est là que la plupart des gens s'arrêtent, et s'arrêter là est la seule chose qui tue vraiment dans un boyau d'aérage." },
    "§ Vous entrez par le seul chemin qu'ils n'ont pas muré, et vous entrez sans bruit.",
    "Au bout, la galerie. Et on ne vous a pas entendu venir.",
  ],
  effets:{ faire:() => descendre(15, 0), flags:['ar_aerage','ar_discret'], cout:{ endurance:16 },
           meleeMaj:barreFond,
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous êtes entré par quarante pieds de boyau d'aérage" },
           marque:"Vous êtes entré dans la galerie par l'aérage, sans être entendu.", court:"L'aérage" },
  suite:'ar_galerie', libelleSuite:"Entrer" },

ar_aerage_cout:{
  melee:true,
  texte:[
    "Vous trouvez le boyau et vous y entrez, et à vingt-deux pieds il se rétrécit.",
    { sobre:"On ne recule pas dans un boyau. On avance ou on reste.",
      intense:"On ne recule pas dans un boyau d'aérage — il n'y a pas de place pour ramener les bras, et un homme coincé la tête en avant sur quarante pieds ne se dégage pas tout seul. On avance, ou on reste, et rester est une façon de mourir dont personne ne parle parce que ceux à qui c'est arrivé n'ont rien raconté.",
      extreme:"On ne recule pas dans un boyau : il n'y a pas de place pour ramener les bras, et un homme coincé la tête en avant sur quarante pieds ne se dégage pas seul. On avance ou on reste. Vous avancez — en expirant tout l'air du corps, en déboîtant l'épaule gauche volontairement contre la paroi pour gagner deux pouces, et en poussant sur les orteils sur douze pieds de pierre humide. L'épaule remonte quatre heures plus tard, et elle ne remontera jamais complètement." },
    "§ Vous êtes dans la galerie. Vous y êtes entré par le seul chemin qui ne se refait pas dans l'autre sens.",
  ],
  effets:{ faire:() => descendre(25, 0), flags:['ar_aerage','ar_discret','ar_sans_retour'],
           cout:{ endurance:24, vitalite:8 },
           blessure:{ id:'epaule_ar', zone:"Épaule gauche", type:"déboîtée volontairement dans un boyau",
                      gravite:2, douleur:3, saignement:0, fonction:['force','lutte','epees','bouclier'],
                      cicatrice:"une épaule qui ne remonte plus complètement" },
           meleeMaj:barreFond,
           marque:"Vous vous êtes déboîté l'épaule pour passer l'aérage. On ne repasse pas par là.",
           court:"Sans retour" },
  suite:'ar_galerie', libelleSuite:"Entrer" },

ar_appeler:{
  melee:true,
  texte:[
    "Vous criez. C'est la chose la plus simple du monde et personne ne la fait, parce que crier dans une mine revient à s'annoncer à tout ce qui s'y trouve.",
    "Le fond d'un puits porte le son mieux qu'une église. On entend à trois cents pieds, dans toutes les galeries, dans toutes les tailles.",
    { sobre:"On vous répond. De derrière le remblai.",
      intense:"On vous répond. Pas des mots : trois coups sur du bois, espacés, réguliers, de derrière le mur de remblai. Puis trois autres. Puis trois autres.",
      extreme:"On vous répond. Pas des mots : trois coups sur du bois, espacés, réguliers, de derrière le mur de remblai. Puis trois autres. Puis trois autres, sans jamais varier le rythme — c'est le signal de fond, celui qu'on apprend à sept ans dans les contreforts et qui veut dire *nous sommes vivants et nous ne pouvons pas sortir*, et il n'a pas dû s'arrêter depuis onze jours." },
    "§ Onze jours à frapper trois coups sur une pièce de bois, derrière un mur, à cent quatre-vingts pieds.",
    "Vous ouvrez le remblai à la main. Ça prend deux heures et vous ne vous arrêtez pas une fois.",
    "En haut, sur la recette, quelqu'un a entendu crier. Ça n'a pas d'importance tout de suite. Ça en aura.",
  ],
  effets:{ faire:() => descendre(20, 0), flags:['ar_ouvert','ar_entendu','ar_signal'],
           cout:{ endurance:18 }, meleeMaj:barreFond,
           marque:"On a frappé trois coups derrière le remblai. Ils frappent depuis onze jours.",
           court:"Trois coups" },
  suite:'ar_galerie', libelleSuite:"Entrer" },

};
Object.assign(ARC_C03, ARC_C03_2);

/* ══ LA GALERIE ═══════════════════════════════════════════════════════════ */
const ARC_C03_3 = {

ar_galerie:{
  qui:'gaspard',
  lieu:"Soixante-dix pieds de galerie qui n'existe pas",
  titre:"Trente-quatre",
  melee:true,
  effets:{ meleeMaj:barreFond },
  texte:[
    { sobre:"Ils sont assis contre les parois, des deux côtés, sur toute la longueur.",
      intense:"Ils sont assis contre les parois, des deux côtés, sur toute la longueur des soixante-dix pieds, et aucun ne se lève quand la lumière entre. C'est la première chose : personne ne se lève. Onze jours sans manger enlèvent l'envie de se lever avant d'enlever la vie.",
      extreme:"Ils sont assis contre les parois, des deux côtés, sur toute la longueur, et aucun ne se lève quand la lumière entre. Onze jours sans manger ôtent l'envie de se lever bien avant d'ôter la vie. Il y a de l'eau au sol sur deux pouces et elle n'est pas propre : on n'a nulle part où faire ses besoins dans une galerie fermée, et ça aussi c'est une chose dont personne ne parle." },
    "Dix-neuf d'un côté. Quatorze de l'autre. Ce n'est pas un hasard de placement : c'est ce qui reste de onze jours pendant lesquels deux groupes de gens qui ne se parlent pas ont partagé soixante-dix pieds.",
    "§ Trente-trois. Et au fond, contre la tête de taille, un trente-quatrième.",
    "Gaspard d'Arquenay a vingt-deux ans, une jambe gauche cassée en deux endroits qu'on lui a attelée avec un manche de pelle, et il tient le carnet de tailles du trimestre sur ses genoux comme un homme tient la seule chose qu'il ait.",
    "« Vous venez de la part de ma sœur. »",
    "« De la part de votre régisseur. Votre sœur a payé la question. »",
    "Il rit, et il faut voir ce que ça donne, un rire chez un garçon qui n'a pas mangé depuis onze jours.",
    "« Je suis descendu le onze pour compter des berlines. J'ai compté des berlines pendant six heures. »",
    { sobre:"« Et le douze, ils ont fermé le remblai. »",
      intense:"« Et le douze au matin, ils ont fermé le remblai. Pas barré : **fermé**. Monté à sec, sur toute la section, avec le remblai des tailles d'à côté. On les a entendus le monter. On les a entendus le monter pendant quatre heures. »",
      extreme:"« Et le douze au matin, ils ont fermé le remblai. Pas barré : fermé. Monté à sec sur toute la section, avec le remblai des tailles voisines. On les a entendus. Pendant quatre heures. Pierre après pierre, sans une voix, sans un ordre crié — des hommes qui font un travail dont ils ont honte le font en silence, et c'est ça qu'on entend le mieux, à cent quatre-vingts pieds, quand on est de l'autre côté. »" },
    "« Combien sont morts ? »",
    "« Aucun. » Il ferme les yeux. « Aucun, messire, et c'est le miracle de cette galerie et c'est aussi ce qui va tout gâcher : nous sommes trente-quatre, et la benne en prend trois. »",
  ],
  effets:{ flags:['ar_galerie','ar_gaspard','ar_sait_ferme','ar_trente_quatre'], cout:{ moral:12 },
           exploit:{ eclat:6, temoins:'quelques', quoi:"vous avez ouvert une galerie que Chastel croyait scellée" },
           marque:"Trente-quatre personnes vivantes derrière un remblai que Corbeil a fait monter le douze.",
           court:"Trente-quatre" },
  suite:'ar_compte', libelleSuite:"Compter" },

ar_compte:{ dyn:true, texte:[], suite:'ar_effondrement' },

ar_compte_scene:{
  melee:true,
  titre:"L'arithmétique",
  effets:{ meleeMaj:barreFond },
  texte:[
    "La benne prend trois hommes. Le treuil met neuf minutes à monter et sept à descendre — seize minutes le cycle, et il faut charger.",
    "Trente-quatre personnes font douze cycles. Douze cycles font trois heures et demie.",
    { sobre:"§ Vous n'avez pas trois heures et demie.",
      intense:"§ Vous n'avez pas trois heures et demie. Vous avez ce que le boisage vous donne, et le boisage a dix-neuf mois de bois vert.",
      extreme:"§ Vous n'avez pas trois heures et demie. Vous avez ce que le boisage voudra bien vous donner, et le boisage est en bois vert de dix-neuf mois — c'est-à-dire six mois de plus que ce qu'un bois vert donne, et l'ouverture du remblai vient de lui apprendre qu'il y a de l'air neuf, de la charge nouvelle et une raison de travailler." },
    () => a('ar_bergrun')
      ? "Bergrun passe la main sur un étai et il ne dit rien pendant longtemps.\n\n« Il chante », dit-il enfin. « Vous entendez ? Ça fait un son de corde. Quand ça craque, il reste des heures. Quand ça chante, il reste des minutes, et personne ne sait combien. »"
      : "Quelque part au-dessus de vos têtes, sur toute la longueur, le bois fait un bruit. Ce n'est pas un craquement : c'est un son long, filé, comme une corde de navire sous charge. Vous ne savez pas ce que ça veut dire. Les trente-quatre, si.",
    () => a('ar_entendu')
      ? "Et il y a l'autre problème. Vous avez crié dans le fond du puits, on vous a entendu à la recette, et le treuil est en haut."
      : "Et il y a l'autre problème : le treuil est en haut. Il est servi par quatre hommes payés par Maître Corbeil, régisseur des mines d'Arquenay, qui a fait monter ce remblai le douze au matin.",
    "Trente-quatre personnes, la benne en prend trois, et quelqu'un en haut décide quand elle remonte.",
  ],
  choix:[
    { t:"Envoyer le carnet en premier",
      si:() => !a('ar_carnet_monte'),
      detail:"Une berline vide et un carnet de tailles · si le carnet remonte, Arquenay tombe · et personne n'est sauvé par ce voyage",
      ferme:"Ferme : un cycle de seize minutes, c'est-à-dire trois personnes",
      risque:"définitif", definitif:true, va:'ar_carnet' },

    { t:"Gaspard d'abord",
      si:() => !a('ar_gaspard_sauve'),
      detail:"C'est le contrat · trois cents couronnes · et un héritier comparaissant en Floréal",
      ferme:"Ferme : la consigne de sa sœur",
      risque:"définitif", definitif:true, va:'ar_gaspard_premier' },

    { t:"Les quatorze d'abord",
      si:() => !a('ar_quatorze_sauves'),
      detail:"Ils ne sont sur aucun rôle · s'ils restent en bas, ils n'auront jamais existé",
      ferme:"Ferme : toute possibilité de remonter Gaspard à temps",
      risque:"définitif", definitif:true, va:'ar_quatorze' },

    { t:"Les dix-neuf d'abord",
      si:() => !a('ar_dixneuf_sauves'),
      detail:"Ils ont des familles à onze cents pieds au-dessus · et quatre cents personnes qui attendent",
      risque:"définitif", definitif:true, va:'ar_dixneuf' },

    { t:"Refuser de choisir. Tout le monde, dans l'ordre où ils sont assis.",
      si:() => !a('ar_carnet_monte') && !a('ar_gaspard_sauve') && !a('ar_quatorze_sauves') && !a('ar_dixneuf_sauves'),
      detail:"Douze cycles · trois heures et demie · et le bois qui chante",
      risque:"définitif", definitif:true, va:'ar_tous' },
  ],
},

ar_carnet:{
  melee:true,
  texte:[
    "Le premier voyage part avec un carnet de tailles et rien d'autre.",
    "C'est la décision la plus froide de toute cette affaire et elle se prend en quatre secondes, devant trente-quatre personnes assises qui comprennent parfaitement ce qui vient de leur être retiré.",
    { sobre:"Personne ne proteste. C'est le pire.",
      intense:"Personne ne proteste. Un des dix-neuf hoche la tête — un homme d'une cinquantaine d'années, à qui il manque deux doigts — et ce hochement de tête est plus difficile à supporter que n'importe quel cri.",
      extreme:"Personne ne proteste. Un des dix-neuf hoche la tête — la cinquantaine, deux doigts en moins, le visage noir de poussière sauf autour des yeux — et ce hochement est plus dur à supporter que n'importe quel cri. Il a compris avant vous pourquoi c'était juste, et il a compris avant vous ce que ça lui coûtait." },
    "§ Un carnet de tailles pèse onze onces. Il remonte à la place de trois personnes.",
    () => a('ar_bergrun')
      ? "Bergrun écrit trois mots sur la couverture, au charbon, en grosses lettres : *TRENTE-QUATRE VIVANTS*. « Pour qu'ils ne puissent pas dire qu'ils ne savaient pas. »"
      : "Vous écrivez trois mots sur la couverture, au charbon : *TRENTE-QUATRE VIVANTS*.",
    "La benne monte. Neuf minutes.",
    "Elle redescend. Sept minutes.",
    "Elle redescend, ce qui répond à la seule question qui comptait vraiment : le treuil marche encore, et quelqu'un en haut a décidé de continuer à tourner.",
  ],
  effets:{ faire:() => descendre(10, 5), flags:['ar_carnet_monte'], cout:{ moral:10 },
           meleeMaj:barreFond,
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez fait remonter la preuve avant les gens" },
           marque:"Le carnet de tailles est remonté le premier, avec trois mots au charbon dessus.",
           court:"Le carnet" },
  suite:'ar_compte', libelleSuite:"Le deuxième voyage" },

ar_gaspard_premier:{
  melee:true,
  texte:[
    "« Non », dit Gaspard d'Arquenay.",
    "« Ce n'est pas à vous d'en décider. »",
    "« Si. C'est la seule chose de toute ma vie dont ce soit à moi de décider. »",
    { sobre:"Il ne peut pas se lever. Il faut le porter. Il se laisse porter.",
      intense:"Il a une jambe cassée en deux endroits, il n'a pas mangé depuis onze jours, et il ne peut pas se lever. Il faut le porter, et il se laisse porter — parce qu'un garçon de vingt-deux ans qui ne peut pas se lever ne peut pas non plus s'opposer, et c'est cette impuissance-là qui rend la scène insupportable.",
      extreme:"Une jambe cassée en deux endroits attelée à un manche de pelle, onze jours sans manger : il ne peut pas se lever. Il faut le porter, et il se laisse porter, parce qu'un garçon qui ne peut pas se lever ne peut pas non plus s'opposer. Il pleure pendant tout le trajet jusqu'à la benne — sans bruit, la figure tournée vers la paroi — et personne dans cette galerie ne fait semblant de ne pas le voir." },
    "On charge deux des dix-neuf avec lui, parce que la benne en prend trois et qu'une place vide serait un crime.",
    "§ Il dit quelque chose au moment où la benne s'ébranle et le treuil couvre la moitié des mots.",
    "« … à ma sœur que j'ai compté. Dites-lui que j'ai compté jusqu'au bout. »",
    "Neuf minutes de montée. Sept de descente.",
    "Elle redescend.",
  ],
  effets:{ faire:() => descendre(10, 5), flags:['ar_gaspard_sauve'], cout:{ moral:6 },
           meleeMaj:barreFond,
           marque:"Gaspard d'Arquenay est remonté le premier, contre son avis.", court:"Gaspard remonté" },
  suite:'ar_compte', libelleSuite:"Le deuxième voyage" },

ar_quatorze:{
  melee:true,
  texte:[
    "Ils sont quatorze et ils ne comprennent pas ce qu'on leur dit.",
    { sobre:"Il faut les faire monter par gestes. Ça prend du temps.",
      intense:"Il faut tout faire par gestes, et les gestes sont ambigus : montrer la benne, montrer le haut, compter trois sur les doigts. Le premier qu'on tire par le bras se débat — évidemment qu'il se débat, la dernière fois qu'on l'a tiré par le bras c'était pour le mettre dans un chariot fermé.",
      extreme:"Tout se fait par gestes, et les gestes sont ambigus : montrer la benne, montrer le haut, compter trois sur les doigts. Le premier qu'on prend par le bras se débat — évidemment : la dernière fois qu'on l'a pris par le bras, c'était pour le mettre dans un chariot fermé, et ça fait onze mois qu'il est sous terre. Il faut trois hommes des dix-neuf pour le porter jusqu'à la benne, et personne ne se sent bien." },
    "§ Personne ne sait de quel pays ils viennent. Personne ne le saura jamais : ce n'est écrit nulle part, puisqu'ils ne sont sur aucun rôle.",
    () => a('ar_bergrun')
      ? "« Ils remontent les premiers », dit Bergrun aux dix-neuf, dans la langue des contreforts. Il y a un silence, puis un des dix-neuf répond quelque chose de court, et Bergrun hoche la tête.\n\n« Qu'est-ce qu'il a dit ? »\n\n« Il a dit : *nous, on nous cherchera.* »"
      : "Un des dix-neuf dit quelque chose dans la langue des contreforts, que vous ne comprenez pas, et les dix-huit autres se poussent contre la paroi pour laisser passer.",
    "Cinq cycles. Une heure et vingt minutes. Le bois chante tout du long.",
  ],
  effets:{ faire:() => descendre(35, 20), flags:['ar_quatorze_sauves'], cout:{ moral:-6, endurance:14 },
           meleeMaj:barreFond,
           exploit:{ eclat:7, temoins:'quelques', quoi:"vous avez fait remonter les quatorze qui n'existaient pas" },
           marque:"Les quatorze sans nom sont remontés les premiers.", court:"Les quatorze" },
  suite:'ar_compte', libelleSuite:"Le voyage suivant" },

ar_dixneuf:{
  melee:true,
  texte:[
    "Dix-neuf hommes des contreforts, payés double et pas déclarés, avec quatre cents personnes à onze cents pieds au-dessus qui savent exactement où ils sont depuis onze jours et qui n'ont rien pu faire.",
    { sobre:"Ils montent vite. Ce sont des mineurs : ils savent charger une benne.",
      intense:"Ils montent vite. Ce sont des mineurs : ils savent charger une benne, ils savent se tenir dedans, ils savent qu'on ne parle pas pendant la montée. Sept cycles au lieu de sept cycles et demi, et ce demi-cycle gagné vaut une personne.",
      extreme:"Ils montent vite : ce sont des mineurs, ils savent charger une benne, se tenir dedans, ne pas parler pendant la montée. Sept cycles au lieu de sept et demi — et ce demi-cycle gagné vaut exactement une personne, ce qui est une façon de compter qu'on n'oublie plus après l'avoir faite une fois." },
    "Le dernier des dix-neuf refuse de monter. C'est celui à qui il manque deux doigts.",
    "« Je reste avec eux », dit-il en montrant les quatorze. « Ils ne comprennent pas ce qui se passe. Quelqu'un doit rester. »",
    "§ Il a une cinquantaine d'années et il vient de faire, dans une galerie qui n'existe pas, la seule chose entièrement gratuite de toute cette affaire.",
  ],
  effets:{ faire:() => descendre(45, 25), flags:['ar_dixneuf_sauves','ar_deux_doigts'],
           cout:{ endurance:16, moral:-4 }, meleeMaj:barreFond,
           exploit:{ eclat:6, temoins:'foule', quoi:"vous avez remonté dix-neuf mineurs des contreforts" },
           marque:"Les dix-neuf sont remontés. L'un d'eux est redescendu de lui-même.",
           court:"Les dix-neuf" },
  suite:'ar_compte', libelleSuite:"Le voyage suivant" },

ar_tous:{
  melee:true,
  texte:[
    "@« Dans l'ordre où vous êtes assis. »",
    "C'est la seule règle qu'on puisse énoncer à haute voix devant trente-quatre personnes sans avoir à la justifier, et c'est pour ça qu'on la choisit.",
    { sobre:"Douze cycles. Trois heures et demie. Le bois chante.",
      intense:"Douze cycles. Trois heures et demie. Personne ne discute l'ordre, personne ne triche, personne ne pousse — et c'est extraordinaire, et c'est aussi ce qui va coûter cher : des gens qui ne trichent pas mettent exactement le temps qu'il faut, et le temps qu'il faut est le temps qu'on n'a pas.",
      extreme:"Douze cycles, trois heures et demie. Personne ne discute l'ordre, personne ne triche, personne ne pousse. C'est extraordinaire et c'est ce qui coûte cher : des gens qui ne trichent pas mettent exactement le temps qu'il faut, et le temps qu'il faut est le temps qu'on n'a pas. Au huitième cycle, une pièce de bois lâche en tête de taille avec un bruit de coup de fusil, et la galerie descend d'un pouce sur toute sa longueur." },
    "§ Neuf cycles passent. Vingt-sept personnes sont remontées.",
    "Au dixième, le boisage cesse de chanter.",
    "Un boisage qui cesse de chanter ne s'est pas calmé.",
  ],
  effets:{ faire:() => descendre(60, 40), flags:['ar_tous','ar_vingt_sept'],
           cout:{ endurance:24, moral:8 }, meleeMaj:barreFond,
           exploit:{ eclat:8, temoins:'foule', quoi:"vous avez refusé de choisir et vous avez remonté vingt-sept personnes" },
           marque:"Vous avez refusé de choisir. Vingt-sept sont remontés avant que le bois se taise.",
           court:"Vingt-sept" },
  suite:'ar_effondrement', libelleSuite:"Le bois s'est tu" },

};
Object.assign(ARC_C03, ARC_C03_3);

/* Le fond décide quand il n'y a plus de voyages. */
DYN.ar_compte = () => {
  const m = fond();
  const restants = ['ar_carnet_monte','ar_gaspard_sauve','ar_quatorze_sauves','ar_dixneuf_sauves']
    .filter(f => !a(f)).length;
  if(m.air <= 45 || restants === 0 || a('ar_tous')) return aller('ar_effondrement');
  aller('ar_compte_scene');
};

/* ══ CE QUI DESCEND ═══════════════════════════════════════════════════════ */
const ARC_C03_4 = {

ar_effondrement:{
  melee:true,
  lieu:"Puits trois · le fond",
  titre:"Quand le bois se tait",
  effets:{ meleeMaj:barreFond },
  texte:[
    { sobre:"Ça ne commence pas par un bruit. Ça commence par de la poussière.",
      intense:"Ça ne commence pas par un bruit. Ça commence par de la poussière : une pluie fine et sèche qui tombe du ciel de la galerie sur toute la longueur, en même temps, et qui n'était pas là il y a dix secondes. Tous ceux qui sont nés dans les contreforts se lèvent d'un coup.",
      extreme:"Ça ne commence pas par un bruit : ça commence par de la poussière. Une pluie fine et sèche qui tombe du ciel de la galerie sur toute la longueur en même temps, et qui n'était pas là dix secondes plus tôt. Tous ceux qui sont nés dans les contreforts sont debout avant que vous ayez compris ce que vous regardez. On ne leur a jamais expliqué : ils l'ont appris à quatre ans en regardant les adultes se lever." },
    () => {
      const n = ['ar_carnet_monte','ar_gaspard_sauve','ar_quatorze_sauves','ar_dixneuf_sauves'].filter(f => a(f)).length;
      if(a('ar_tous')) return "Il reste sept personnes au fond et une benne qui met neuf minutes à monter.";
      if(n >= 3) return "Il reste ceux que vous n'avez pas choisis, et une benne qui met neuf minutes.";
      if(n === 2) return "Il reste plus de la moitié de la galerie, et une benne qui met neuf minutes.";
      return "Il reste presque tout le monde, et une benne qui met neuf minutes.";
    },
    "§ Neuf minutes. Personne dans cette galerie n'a neuf minutes.",
    () => a('ar_bergrun')
      ? "Bergrun est déjà à la tête de taille, la lampe levée, en train de regarder le ciel comme on regarde un compte.\n\n« Le stot tient », crie-t-il. « C'est la recoupe qui part. Si on tient la recoupe vingt minutes, tout le monde monte. »\n\n« Comment on tient une recoupe ? »\n\n« Avec des étais et des épaules, messire, et il n'y a jamais eu d'autre façon. »"
      : "Il y a un endroit où ça part : quarante pieds avant la tête de taille, là où la galerie se rétrécit et où le ciel descend. Vous ne savez pas comment ça s'appelle. Vous voyez juste que c'est là.",
  ],
  choix:[
    { t:"Tenir la recoupe",
      detail:"Des étais, des épaules, et le temps que la benne fasse ses voyages · Force + Endurance contre 12",
      risque:"très dangereux", definitif:true,
      test:{ carac:'force', comp:null, dc:12, manoeuvre:'etais', cout:{ endurance:25 },
             situation:() => a('ar_bergrun') ? 3 : 0 },
      degres:{ dominante:'ar_tenu_dom', couteuse:'ar_tenu_cout', echec:'ar_tenu_ko' } },

    { t:"L'Onde",
      detail:"Tenir soixante tonnes de schiste avec ce qui pousse sous les côtes · Volonté + Onde contre 12",
      ferme:"Ferme : l'idée que personne ici ne vous a vu faire ça",
      risque:"définitif", definitif:true,
      test:{ carac:'volonte', comp:'onde', dc:12, manoeuvre:'onde_mine', cout:{ concentration:40 } },
      degres:{ dominante:'ar_onde_dom', couteuse:'ar_onde_cout', echec:'ar_tenu_ko' } },

    { t:"Charger la benne et partir avec",
      detail:"Trois places · vous en occupez une · et vous remontez",
      ferme:"Ferme : tout ce que vous pourriez raconter de vous-même ensuite",
      risque:"définitif", definitif:true, va:'ar_partir' },
  ],
},

ar_tenu_dom:{
  melee:true,
  texte:[
    "On tient une recoupe avec ce qu'on a : les étais de secours qui traînent au fond de toute taille depuis toujours, deux madriers, un coin, et des épaules.",
    { sobre:"Vingt minutes debout sous soixante tonnes.",
      intense:"Vingt minutes debout sous soixante tonnes de schiste qui descend d'une ligne toutes les trois minutes, à pousser sur un madrier de six pouces avec l'épaule, le dos et le sommet du crâne, pendant que la benne fait ses voyages derrière vous et que vous ne pouvez pas vous retourner pour compter.",
      extreme:"Vingt minutes debout sous soixante tonnes de schiste qui descend d'une ligne toutes les trois minutes. On pousse sur un madrier de six pouces avec l'épaule, le dos et le sommet du crâne. Les mains lâchent d'abord, puis les avant-bras, puis on découvre qu'on peut pousser avec les dents serrées et le cou, ce qui n'a aucun sens mécanique et ce que tout le monde fait. La poussière descend dans les yeux et on ne peut pas les essuyer." },
    "§ Chaque voyage de benne dure seize minutes. Vous en tenez deux.",
    () => a('ar_bergrun')
      ? "Bergrun tient l'étai d'à côté. Il a soixante-deux ans, il mesure cinq pieds, et il tient plus longtemps que vous parce qu'il sait où poser les pieds — c'est tout, il n'y a pas d'autre secret, et quarante ans de fond c'est exactement ça."
      : "Deux des mineurs tiennent les étais voisins. Ils ne vous parlent pas et ils ne vous regardent pas : ils regardent le ciel, parce que c'est le ciel qui prévient.",
    "Le dernier voyage part.",
    "Et c'est là qu'il faut lâcher et courir quarante pieds, ce qui est la seule partie de l'affaire où l'on ne décide rien du tout.",
  ],
  effets:{ flags:['ar_tenu','ar_tous_sauves'], cout:{ endurance:30, vitalite:14 },
           blessure:{ id:'dos_ar', zone:"Dos", type:"vingt minutes sous charge",
                      gravite:2, douleur:3, saignement:0, fonction:['force','endurance','lutte'],
                      cicatrice:"un dos qui prévient du temps qu'il fera, à vie" },
           exploit:{ eclat:12, temoins:'foule', quoi:"vous avez tenu la recoupe pendant que la benne montait" },
           marque:"Vous avez tenu la recoupe vingt minutes. Tout le monde est remonté.",
           court:"La recoupe" },
  suite:'ar_remontee', libelleSuite:"Courir" },

ar_tenu_cout:{
  melee:true,
  texte:[
    "Vous tenez seize minutes. Il en fallait vingt.",
    { sobre:"La recoupe part sur quinze pieds. Il y a des gens dessous.",
      intense:"La recoupe part sur quinze pieds d'un coup, du côté de la tête de taille, et il y a des gens dessous — pas beaucoup, trois, ceux qui attendaient le dernier voyage et qui s'étaient placés le plus près de la benne parce que c'était logique.",
      extreme:"La recoupe part sur quinze pieds d'un coup, côté tête de taille, et il y a des gens dessous : trois, ceux qui attendaient le dernier voyage et s'étaient placés près de la benne parce que c'était logique. Ce n'est pas un écrasement — c'est un ensevelissement, ce qui est différent et ce qui laisse le temps d'entendre, pendant environ une minute, quelque chose sous quatre pieds de schiste." },
    "Vous êtes de l'autre côté. Vous n'avez rien pu faire et vous ne pouviez rien faire, et ces deux phrases sont vraies et ne servent à rien.",
    "§ La benne remonte avec ceux qui restent. Trois places, et deux occupées.",
  ],
  effets:{ flags:['ar_tenu','ar_trois_morts'], cout:{ endurance:30, vitalite:18, moral:20 },
           blessure:{ id:'dos_ar', zone:"Dos", type:"seize minutes sous charge",
                      gravite:2, douleur:3, saignement:0, fonction:['force','endurance','lutte'],
                      cicatrice:"un dos qui prévient du temps qu'il fera" },
           exploit:{ eclat:9, temoins:'foule', quoi:"vous avez tenu la recoupe seize minutes sur vingt" },
           marque:"Vous avez tenu seize minutes. Trois personnes sont restées dessous.",
           court:"Trois dessous" },
  suite:'ar_remontee', libelleSuite:"Remonter" },

ar_tenu_ko:{
  melee:true,
  texte:[
    "Ça part avant que vous ayez posé le deuxième étai.",
    { sobre:"On ne tient pas soixante tonnes à quatre. On ne les tient à aucun nombre.",
      intense:"On ne tient pas soixante tonnes de schiste. Personne ne les tient. Ce qu'on tient, dans une mine, c'est un ciel qui hésite — et celui-ci n'hésitait plus depuis un quart d'heure, et il n'y avait pas de version de cette soirée où quelqu'un s'en aperçoive à temps.",
      extreme:"On ne tient pas soixante tonnes de schiste : personne ne les tient. Ce qu'on tient dans une mine, c'est un ciel qui hésite, et celui-ci n'hésitait plus depuis un quart d'heure. Ça descend sur quarante pieds en trois secondes, avec un souffle qui éteint toutes les lampes en même temps, et ensuite il n'y a plus rien — pas de bruit, pas de poussière, pas d'air : du noir plein." },
    "§ Vous êtes du bon côté par accident. Il y a un mot pour ça et ce n'est pas *courage*.",
    "Quand les lampes se rallument — celles qui se rallument — la galerie fait vingt-deux pieds au lieu de soixante-dix.",
  ],
  effets:{ flags:['ar_effondre'], cout:{ endurance:28, vitalite:20, moral:25 },
           blessure:{ id:'crane_ar', zone:"Crâne", type:"le souffle et une pierre",
                      gravite:2, douleur:3, saignement:2, fonction:['perception','intellect','onde'],
                      cicatrice:"des vertiges qui reviennent dans les endroits fermés" },
           marque:"La recoupe est partie. La galerie fait vingt-deux pieds au lieu de soixante-dix.",
           court:"Vingt-deux pieds" },
  suite:'ar_remontee', libelleSuite:"Remonter" },

ar_onde_dom:{
  melee:true,
  texte:[
    "Il n'y a aucune raison de croire que ça puisse marcher. On n'a jamais tenu une montagne : on tient un homme, une porte, un cheval lancé.",
    "Vous posez les deux mains sur le madrier, vous levez la tête vers soixante pieds de schiste qui descend, et vous cessez de retenir.",
    { sobre:"La poussière s'arrête. C'est tout ce qu'on voit, et c'est énorme.",
      intense:"La poussière s'arrête. C'est tout ce qu'on voit — la pluie fine et sèche qui tombait du ciel sur toute la longueur cesse d'un coup, en l'air, et redescend en une seconde parce qu'elle est de la poussière et qu'elle finit toujours par tomber. Mais elle s'est arrêtée. Le ciel de la galerie, lui, ne descend plus.",
      extreme:"La poussière s'arrête. La pluie fine et sèche qui tombait sur toute la longueur cesse d'un coup, en l'air, et redescend en une seconde parce que c'est de la poussière. Mais elle s'est arrêtée. Le ciel ne descend plus. Et l'air, entre le madrier et la roche, devient une chose épaisse qu'on voit — il tremble comme au-dessus d'une forge — et il a le goût de pièce de monnaie qu'on a gardée trop longtemps sous la langue." },
    "§ Vingt-quatre minutes. C'est le temps qu'il faut à la benne, et c'est le temps que vous tenez.",
    "Trente-quatre personnes remontent d'un puits sous un ciel qui aurait dû descendre, et vingt-neuf d'entre elles se retournent en montant dans la benne pour regarder ce qu'elles ne comprennent pas.",
    "Elles le raconteront. Toutes. Il n'y a pas de version de cette nuit où elles ne le racontent pas, et vous le savez en le faisant.",
  ],
  effets:{ flags:['ar_onde','ar_tous_sauves','onde_vue_mine'],
           cout:{ endurance:30, vitalite:14, concentration:20 },
           exploit:{ eclat:18, suspicion:55, temoins:'foule',
                     quoi:"un ciel de mine a cessé de descendre pendant vingt-quatre minutes" },
           marque:"Vous avez tenu le ciel du puits trois avec l'Onde, devant vingt-neuf témoins.",
           court:"Le ciel tenu" },
  suite:'ar_remontee', libelleSuite:"Remonter le dernier" },

ar_onde_cout:{
  melee:true,
  texte:[
    "Ça vient, et ça tient, et ça tient trop.",
    { sobre:"Le ciel s'arrête. Les parois, non.",
      intense:"Le ciel s'arrête. Les parois, non — elles rentrent. Ce qui devait descendre en poids se met à venir de côté, et une galerie de six pieds de large qui en fait quatre est une galerie où l'on ne passe plus qu'en file.",
      extreme:"Le ciel s'arrête ; les parois, non. Ce qui devait descendre en poids vient de côté, et une galerie de six pieds qui en fait quatre est une galerie où l'on passe en file. Deux hommes sont pris entre le mur et la berline renversée, aux hanches, et il faut les tirer par les bras pendant que tout tient encore, ce qui prend quatre minutes et ce qui laisse des marques." },
    "Vous tenez dix-huit minutes et vous saignez du nez, des deux oreilles et de l'œil gauche, ce dernier point étant nouveau.",
    "§ Trente et un remontent. Il en manque trois et vous ne saurez jamais lesquels, parce que personne n'a jamais fait la liste de gens qui n'étaient sur aucun rôle.",
  ],
  effets:{ flags:['ar_onde','ar_trois_morts','onde_vue_mine'],
           cout:{ endurance:35, vitalite:20, concentration:40, moral:14 },
           blessure:{ id:'oeil', zone:"Œil gauche", type:"a saigné sous l'Onde",
                      gravite:1, douleur:1, saignement:0, fonction:['perception','tir','jet'],
                      cicatrice:"un œil qui voit un voile rouge à l'effort" },
           exploit:{ eclat:18, suspicion:60, temoins:'foule',
                     quoi:"les parois d'une galerie sont rentrées au lieu du ciel" },
           marque:"Vous avez tenu le ciel et fait rentrer les parois. Trois sont restés.",
           court:"Les parois" },
  suite:'ar_remontee', libelleSuite:"Remonter" },

ar_partir:{
  texte:[
    "La benne est là. Elle prend trois. Vous en occupez une.",
    { sobre:"Personne ne vous retient. Personne ne dit rien.",
      intense:"Personne ne vous retient. Personne ne dit un mot — pas une insulte, pas une supplication — et c'est ce silence-là que vous emporterez, parce qu'il ne s'explique pas par la résignation : ils ont simplement compris avant vous ce que vous étiez en train de faire, et ils ont décidé de ne pas vous aider à vous le cacher.",
      extreme:"Personne ne vous retient. Pas un mot, pas une insulte, pas une supplication. C'est ce silence que vous emporterez : il ne s'explique pas par la résignation. Ils ont compris avant vous ce que vous faisiez et ils ont décidé de ne pas vous aider à vous le cacher. Un homme à qui il manque deux doigts vous tend la main pour vous aider à monter dans la benne. Il le fait sans ironie. C'est pire." },
    "Neuf minutes de montée. On entend le fond partir à la sixième.",
    "§ Ça fait un bruit qu'on sent dans le câble avant de l'entendre.",
    "Vous arrivez à la recette avec deux personnes et de la poussière plein les poumons, et le puits trois d'Arquenay cesse d'exister derrière vous.",
  ],
  effets:{ flags:['ar_parti','ar_effondre'], cout:{ moral:35 },
           marque:"Vous êtes remonté dans la benne pendant que le fond partait.", court:"Vous êtes monté" },
  suite:'ar_fin_seul', libelleSuite:"La recette" },

};
Object.assign(ARC_C03, ARC_C03_4);

/* ══ LA RECETTE ═══════════════════════════════════════════════════════════ */
const ARC_C03_5 = {

ar_remontee:{
  qui:'corbeil',
  lieu:"Puits trois · la recette · au jour",
  titre:"Ce qui est remonté",
  texte:[
    { sobre:"Le jour, après cent quatre-vingts pieds et une nuit de fond, fait mal.",
      intense:"Le jour fait mal. C'est la première chose et personne ne la raconte jamais : après une nuit à cent quatre-vingts pieds, la lumière grise d'un matin de contreforts entre dans les yeux comme du sable, et on remonte de la benne les mains devant la figure, ce qui est une posture ridicule pour quelqu'un qui vient de faire ce qu'on vient de faire.",
      extreme:"Le jour fait mal. Personne ne raconte jamais ça : après une nuit à cent quatre-vingts pieds, la lumière grise d'un matin de contreforts entre dans les yeux comme du sable, et on sort de la benne les mains devant la figure — posture ridicule pour quelqu'un qui vient de faire ce qu'on vient de faire. On pleure aussi, mécaniquement, pendant un quart d'heure, et ça n'a rien à voir avec l'émotion." },
    () => a('ar_tous_sauves')
      ? "Ils sont trente-quatre sur la recette. Assis par terre, adossés aux chariots, couverts de poussière noire sauf autour des yeux, et aucun ne parle."
      : (a('ar_trois_morts')
        ? "Ils sont trente et un sur la recette. Trois ne sont pas remontés et tout le monde sait lesquels, sauf pour les quatorze, dont personne ne connaissait les noms."
        : "Il y a du monde sur la recette, et il y a moins de monde qu'il n'y en avait en bas."),
    "Et il y a le village.",
    { sobre:"Quatre cents personnes sont montées.",
      intense:"Quatre cents personnes sont montées des onze cents pieds du village. Elles sont là depuis la nuit — depuis qu'on a entendu crier dans le puits, ou depuis qu'on a remonté un carnet avec trois mots au charbon dessus, ou simplement depuis que le treuil a recommencé à tourner à une heure où il ne tourne pas.",
      extreme:"Quatre cents personnes sont montées des onze cents pieds du village. Elles sont là depuis la nuit — depuis les cris dans le puits, depuis le carnet aux trois mots, ou simplement depuis que le treuil a tourné à une heure où il ne tourne jamais. Elles ne crient pas. Quatre cents personnes debout autour d'une recette de puits qui ne crient pas, c'est un bruit particulier : c'est le bruit de quatre cents respirations." },
    "Maître Corbeil est sur la recette avec quatre hommes. Il porte les mêmes manches de lustrine qu'hier et il n'a pas dormi.",
    "« Messire. Vous avez ramené l'héritier. »",
    "§ Il dit ça devant trente et une personnes qu'il a fait murer et devant quatre cents qui le savent.",
    () => a('ar_maelys')
      ? "Maëlys d'Arquenay est là aussi. Elle est arrivée avec le village, à pied, dans la nuit, et elle a vingt ans."
      : "",
  ],
  choix:[
    { t:"Le livrer à la justice de Chastel",
      detail:"Un régisseur, un carnet, trente et un témoins · six mois de procédure et un verdict",
      risque:"calculé", definitif:true, va:'ar_fin_justice' },
    { t:"Le tuer ici",
      detail:"Devant quatre cents personnes · c'est rapide et ce n'est pas une justice",
      ferme:"Ferme : toute version où vous n'avez tué personne sur cette recette",
      risque:"définitif", definitif:true, va:'ar_fin_tue' },
    { t:"Laisser le village décider",
      detail:"Quatre cents personnes · dix-neuf qui remontent d'un trou muré · et vous qui vous écartez",
      ferme:"Ferme : toute prétention à avoir maîtrisé la fin de cette affaire",
      risque:"définitif", definitif:true, va:'ar_fin_village' },
    { t:"Ne rien faire. Prendre l'or et partir.",
      detail:"Le contrat disait : ramener l'héritier comparaissant · il est là · vous êtes payé",
      risque:"définitif", definitif:true, va:'ar_fin_or' },
  ],
},

ar_fin_justice:{
  lieu:"Contreforts nains · six mois plus tard",
  titre:"La procédure",
  texte:[
    "On livre Maître Corbeil à un prévôt de Chastel avec un carnet de tailles, trente et un témoins et une galerie de soixante-dix pieds qui n'est sur aucun plan.",
    { sobre:"La procédure prend six mois. C'est rapide.",
      intense:"La procédure prend six mois, ce qui est rapide pour ce genre d'affaire et ce qui est une éternité pour dix-neuf hommes qui ont passé onze jours derrière un remblai. Elle aboutit, ce qui est rare. Corbeil est condamné aux fers à perpétuité.",
      extreme:"La procédure prend six mois — rapide pour ce genre d'affaire, une éternité pour dix-neuf hommes qui ont passé onze jours derrière un remblai. Elle aboutit, ce qui est rare, et elle aboutit sur le chef le plus étroit qu'on ait pu retenir : *ouverture de galerie non déclarée*. Corbeil prend les fers à perpétuité pour une infraction de police des mines, et pas une ligne du jugement ne parle des quatorze." },
    "§ Les quatorze n'apparaissent pas dans le jugement. Ils n'apparaissent nulle part : ils n'étaient sur aucun rôle avant, et un tribunal ne juge pas ce qui n'est pas écrit.",
    "La maison d'Arquenay perd ses parts de mine, ce qui était exactement ce qu'elle voulait éviter en fermant ce remblai. Les quatorze chariots sont vendus. Le village continue de descendre, pour un autre propriétaire, aux mêmes conditions.",
  ],
  issue:"L'affaire est close",
  bilan:"Un régisseur aux fers, et quatorze personnes qui n'ont jamais existé",
  apres:[
    () => a('ar_tous_sauves') ? "Trente-quatre personnes sont remontées du puits trois. C'est le chiffre qu'on retiendra dans les contreforts, et il est exact."
      : (a('ar_trois_morts') ? "Trente et une personnes sont remontées. Trois n'ont pas été comptées parce qu'on ne savait pas leurs noms."
      : "Ce qui est remonté du puits trois est remonté. Le reste n'a pas été compté."),
    () => a('ar_gaspard_sauve') || a('ar_tous_sauves')
      ? "Gaspard d'Arquenay comparaît en Floréal avec une jambe qui a mal repris et il épouse la fille de Chastel qu'il n'a jamais vue. Il a compté jusqu'au bout."
      : "Gaspard d'Arquenay ne comparaît pas en Floréal.",
    () => a('ar_coutume') ? "Maëlys d'Arquenay épouse en Floréal, comme prévu, et part dans une province qu'elle ne connaît pas. Elle avait décidé une chose dans sa vie ; ça reste une." : "",
  ],
  plusTard:"Une galerie de soixante-dix pieds est rebouchée et portée au plan sous la cote qu'elle aurait dû avoir depuis dix-neuf mois. C'est la seule réparation que sache faire une administration.",
},

ar_fin_tue:{
  lieu:"Puits trois · la recette",
  titre:"Devant quatre cents personnes",
  texte:[
    "Ça prend quatre secondes et ses quatre hommes ne bougent pas, parce que quatre hommes payés par un régisseur ne meurent pas pour un régisseur devant quatre cents personnes qui viennent de voir remonter ce qui est remonté.",
    { sobre:"Il ne comprend pas. C'est ce qu'il y a de plus frappant.",
      intense:"Il ne comprend pas. C'est ce qui frappe le plus : jusqu'à la dernière seconde, Maître Corbeil regarde ce qui lui arrive avec une incompréhension sincère, parce qu'il n'a jamais tué personne de ses mains et qu'il ne s'est jamais rangé dans la catégorie des gens à qui ça arrive.",
      extreme:"Il ne comprend pas, et c'est ce qui frappe le plus : jusqu'à la dernière seconde, il regarde ce qui lui arrive avec une incompréhension entière. Il n'a jamais tué personne de ses mains. Il a fait monter un mur. Il n'a jamais appartenu, dans sa propre tête, à la catégorie des gens à qui ceci arrive, et il meurt sur cette erreur." },
    "§ Quatre cents personnes voient ça. Aucune ne crie. Aucune ne bouge. Et personne, ce jour-là ni jamais, ne dit un mot au prévôt de Chastel.",
    "C'est une justice. Ce n'en est pas une. Les deux sont vrais et il n'y a pas de troisième colonne.",
  ],
  issue:"L'affaire est close autrement",
  bilan:"Le régisseur est mort sur la recette, et quatre cents personnes n'ont rien vu",
  apres:[
    "Il n'y a pas de procédure. Il n'y a pas de jugement, pas de chef d'accusation étroit, pas de galerie portée au plan. Il y a un régisseur mort, une maison ruinée et un village qui continue de descendre.",
    () => a('ar_quatorze_sauves') || a('ar_tous_sauves')
      ? "Les quatorze sont partis vers l'est le lendemain, à pied, avec ce qu'on a pu leur donner. Personne ne sait de quel pays ils venaient. Personne ne le saura."
      : "",
    "Vous n'êtes pas payé. Un mercenaire qui tue le régisseur du commanditaire ne se fait pas payer par la maison, c'est une règle qui n'a jamais eu besoin d'être écrite.",
    () => a('ar_bergrun') ? "Bergrun vous a regardé faire. Il a soixante-deux ans et quarante ans de fond, et il n'a rien dit du tout — ni ce jour-là, ni après." : "",
  ],
  plusTard:"Dans les contreforts, on raconte l'histoire d'un Paria qui est descendu à cent quatre-vingts pieds et qui est remonté avec tout le monde. On ne raconte pas la fin. La fin, on la garde.",
},

ar_fin_village:{
  lieu:"Puits trois · la recette",
  titre:"Quatre cents",
  texte:[
    "Vous vous écartez de trois pas. C'est tout ce que vous faites et c'est un geste que quatre cents personnes comprennent immédiatement.",
    { sobre:"Ils ne se précipitent pas. C'est ce qui est terrible.",
      intense:"Ils ne se précipitent pas. Il ne se passe rien pendant une minute entière — et puis quelqu'un avance, puis deux, puis le cercle se resserre à la vitesse à laquelle un cercle de quatre cents personnes se resserre, c'est-à-dire lentement et sans qu'on puisse l'arrêter.",
      extreme:"Ils ne se précipitent pas, et c'est ce qui est terrible. Il ne se passe rien pendant une minute entière. Puis quelqu'un avance, puis deux, puis le cercle se referme à la vitesse à laquelle se referme un cercle de quatre cents personnes : lentement, sans un cri, et sans qu'aucune force au monde puisse l'arrêter une fois qu'il a commencé. Les quatre hommes de l'escorte s'écartent aussi. Ils sont du village." },
    "Ça dure longtemps. Beaucoup plus longtemps qu'une exécution, parce qu'une foule n'a ni technique ni fin prévue.",
    "§ Vous vous êtes écarté de trois pas et vous avez décidé tout ce qui a suivi. Ne vous racontez pas le contraire.",
    () => a('ar_maelys')
      ? "Maëlys d'Arquenay est restée. Elle a regardé jusqu'au bout, à vingt ans, debout, sans détourner les yeux une seule fois — et quand ça a été fini elle a dit une seule phrase, à personne : « Il a fait monter le mur le douze au matin. »"
      : "",
  ],
  issue:"L'affaire est close autrement",
  bilan:"Vous vous êtes écarté de trois pas",
  apres:[
    "Le prévôt de Chastel enquête en Prairial. Il entend quatre cents personnes. Il obtient quatre cents fois la même réponse, qui est qu'on n'a rien vu, et il classe l'affaire en accident de recette.",
    "Il n'y croit pas une seconde. Il classe quand même, parce qu'un prévôt qui poursuit quatre cents mineurs des contreforts n'obtient rien et perd un district.",
    "Vous n'êtes pas payé.",
  ],
  plusTard:"On ne vous en veut pas dans les contreforts. C'est même pire : on vous y est reconnaissant, et cette reconnaissance-là voyagera.",
},

ar_fin_or:{
  lieu:"Arquenay · le bureau du régisseur",
  titre:"Comparaissant",
  qui:'corbeil',
  texte:[
    "On vous compte trois cents couronnes dans le bureau aux manches de lustrine, et Maître Corbeil vous les compte lui-même, ce qu'un régisseur ne fait jamais.",
    "« Le contrat disait : comparaissant. Il comparaîtra. »",
    "« Il comparaîtra. »",
    { sobre:"Il ne s'excuse pas. Il ne se justifie pas. Il compte.",
      intense:"Il ne s'excuse pas et il ne se justifie pas : il compte, à voix haute, par piles de vingt, et il vous demande de recompter parce que c'est l'usage. C'est un homme qui a fait murer trente-quatre personnes et qui trouve normal qu'on recompte devant lui, et les deux choses vivent ensemble dans le même bureau sans se gêner.",
      extreme:"Il ne s'excuse pas, ne se justifie pas : il compte, à voix haute, par piles de vingt, et il vous demande de recompter parce que c'est l'usage. Un homme qui a fait murer trente-quatre personnes et qui trouve normal qu'on recompte devant lui — les deux choses vivent ensemble dans le même bureau, sans se gêner, chez le même homme, et c'est la découverte la plus utile de tout ce contrat." },
    "§ Il reste régisseur. Il le restera onze ans.",
    "La galerie est rebouchée en trois jours. Le rendement du puits trois redevient conforme au déclaré dès le trimestre suivant, ce qui est mathématiquement inévitable quand on cesse de sortir du minerai qu'on ne déclare pas.",
    () => a('ar_maelys')
      ? "Maëlys d'Arquenay ne vous parle pas avant votre départ. Elle vous regarde monter à cheval depuis la cour de roulage, et elle a exactement l'expression de quelqu'un qui vient d'apprendre une chose sur le monde et qui la range."
      : "",
  ],
  issue:"L'affaire est close",
  bilan:"Trois cents couronnes, et un régisseur qui reste en poste",
  apres:[
    () => a('ar_tous_sauves') ? "Trente-quatre personnes sont remontées. C'est ce que vous avez fait et ça ne s'annule pas."
      : "Ce qui est remonté est remonté. Ce n'est pas rien et ce n'est pas assez.",
    "Le contrat est rempli à la lettre, l'or est compté deux fois, et personne ne peut vous reprocher quoi que ce soit.",
    "C'est exactement la définition du métier, et c'est aussi la raison pour laquelle personne n'en fait un métier bien longtemps.",
  ],
  plusTard:"Onze ans plus tard, un autre puits d'Arquenay ferme sur onze hommes. Le régisseur est le même. La procédure est la même. Le chef d'accusation aussi.",
},

ar_fin_seul:{
  lieu:"Sur la route, loin des contreforts",
  titre:"Deux places sur trois",
  texte:[
    "Vous êtes remonté avec deux personnes et une benne qui en prenait trois, et le fond est parti à la sixième minute de la montée.",
    { sobre:"On ne se raconte pas ça. On le porte.",
      intense:"Il n'y a rien à en dire. On ne se raconte pas ce genre de chose : on le porte, et on découvre au fil des années que ça ne s'allège pas, que ça ne s'aggrave pas non plus, et que ça devient simplement une des choses dont on est fait.",
      extreme:"Il n'y a rien à en dire et on ne se raconte pas ce genre de chose : on le porte. On découvre au fil des années que ça ne s'allège pas, que ça ne s'aggrave pas non plus, que ça cesse même de faire mal — et que ça devient une des choses dont on est fait, au même titre que la taille qu'on a ou la couleur des yeux." },
    "§ Un homme à qui il manquait deux doigts vous a tendu la main pour vous aider à monter dans la benne.",
    "Arquenay déclare un accident de fond. Trente et un morts, ce qui est le pire accident des contreforts depuis quarante ans, et ce qui vaut à la maison une inspection de complaisance et une amende de police des mines.",
  ],
  issue:"L'affaire est close, et vous étiez dedans",
  bilan:"Vous êtes remonté et ils ne sont pas remontés",
  apres:[
    "On vous paie. Le contrat disait *comparaissant* et vous ne ramenez personne, donc on vous paie le tiers, l'usage des maisons du nord, et le régisseur ne fait aucun commentaire.",
    "Il n'y a rien à racheter et personne à qui le demander : les seuls témoins sont sous quatre pieds de schiste à cent quatre-vingts pieds.",
    "C'est ce que veut dire *définitif*, et c'est la seule fin de cet arc où le mot s'applique entièrement à vous.",
  ],
  plusTard:"Vous ne redescendrez plus jamais dans un puits. Vous ne vous le formulerez jamais : simplement, les contrats qui commencent par une benne, vous ne les prendrez plus.",
},

};
Object.assign(ARC_C03, ARC_C03_5);

ARC_C03.ar_audience.choix.push({
  t:"Fixer les termes",
  si:() => !a('ar_termes_fait') && a('ar_maelys'),
  detail:"Or · noble adulte consentante · les deux · négocier · refuser",
  va:'ar_termes',
});
for(const id of ['ar_fin_justice','ar_fin_tue','ar_fin_village','ar_fin_or','ar_fin_seul']){
  ARC_C03[id].suite = 'entre_saisons';
  ARC_C03[id].libelleSuite = "Reprendre la route";
}

enregistrerScenes(ARC_C03);
