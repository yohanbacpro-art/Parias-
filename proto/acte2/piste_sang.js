/* PARIAS — Acte II · LA PISTE DU SANG
 * ═══════════════════════════════════════════════════════════════════════
 * Quarante et un Parias vivants dans les quatre provinces. Alycia sait le
 * chiffre, les noms, et où sont trente-huit d'entre eux. Elle porte la liste
 * dans sa tête et nulle part ailleurs — c'est la seule raison pour laquelle
 * elle n'en a perdu aucun en quinze ans.
 *
 * Et parmi les trente-huit, il y a un homme de soixante-dix ans qui a été
 * maître d'armes d'une maison rayée, et qui a caché un garçon de seize ans
 * dans une remise pendant trois nuits pour lui apprendre à signer d'une main
 * qui n'était pas la sienne.
 * ═══════════════════════════════════════════════════════════════════════ */

const SANG = {

sa_reseau:{
  qui:'alycia',
  lieu:"Quelque part · elle n'a pas dit où et elle ne dira pas",
  titre:"Trente-huit",
  texte:[
    "Elle vous bande les yeux. Elle le fait sans s'excuser et sans le présenter comme une précaution : elle le présente comme la condition.",
    "« Ce n'est pas contre vous. C'est la règle, elle a quinze ans, et je me le suis appliqué à moi-même la première fois que quelqu'un m'a menée quelque part. »",
    "§ Quatre heures de cheval. Elle ne parle pas et elle change trois fois de direction, ce que vous savez parce qu'on sent le soleil.",
    { sobre:"Ce n'est pas une forteresse. C'est une ferme.",
      intense:"Quand on vous retire le bandeau, ce n'est pas une forteresse, pas une grotte, pas une ruine. C'est une ferme. Une vraie, avec des bêtes, des enfants, du linge qui sèche et une femme qui bat du beurre sous un auvent.",
      extreme:"Quand on vous retire le bandeau : une ferme. Pas une forteresse, pas une grotte, pas une ruine romantique. Une ferme de la moyenne montagne avec onze vaches, quatre enfants, du linge qui sèche sur une haie et une femme d'une cinquantaine d'années qui bat du beurre sous un auvent et qui ne lève pas la tête." },
    "@« Combien ici ? »",
    "« Deux. »",
    "« Sur quarante et un. »",
    "« Sur trente-huit que je connais. » Elle descend de cheval. « Vous vous attendiez à un endroit. Il n'y a pas d'endroit, messire : il y a trente-huit vies ordinaires dans trente-quatre endroits ordinaires, et c'est ça, tout l'ouvrage. Il n'y a rien à prendre d'assaut parce qu'il n'y a rien. »",
    "§ La femme qui bat du beurre a soixante-deux ans. Elle vous regarde enfin, longuement, et elle ne dit rien du tout.",
    "@« Elle sait qui je suis ? »",
    "« Elle sait qu'il y a un neuvième nom sur une liste. Elle ne sait pas votre visage et elle ne le saura pas : vous repartez ce soir. »",
    "« Et l'autre ? »",
    "« L'autre, c'est pour ça que je vous ai amené. »",
  ],
  effets:{ flags:['sa_reseau','a2_reseau_vu'],
           faire:() => { bouger('alycia', { relation:3, confiance:6 }); A2().pistes.sang = Math.max(A2().pistes.sang, 3); },
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous avez vu ce qu'est vraiment le réseau" },
           marque:"Le réseau d'Alycia n'est pas un endroit : trente-huit vies ordinaires dans trente-quatre endroits ordinaires.",
           court:"Trente-huit" },
  suite:'sa_maitre', libelleSuite:"L'autre" },

sa_maitre:{
  lieu:"La grange · le fond, à gauche du fenil",
  titre:"Soixante-dix ans",
  texte:[
    "Il est au fond de la grange, assis sur un billot, en train de faire quelque chose à un manche d'outil avec une plane.",
    "Il a soixante-dix ans. Il a le dos droit d'un homme qui a passé quarante ans à corriger le dos des autres.",
    { sobre:"Il vous regarde entrer et il pose la plane.",
      intense:"Il vous regarde entrer, et il pose la plane sur le billot, et il met un temps considérable à se lever — pas parce qu'il a mal : parce qu'il a décidé de bien faire ce moment-là et qu'il ne veut pas le rater.",
      extreme:"Il vous regarde entrer. Il pose la plane sur le billot, très posément, à côté du manche. Et il met un temps considérable à se lever — pas parce qu'il a mal aux genoux, quoiqu'il ait mal aux genoux : parce qu'il a décidé de bien faire ce moment-là, qu'il l'attend depuis quatorze ans, et qu'il ne veut pas le rater en se levant trop vite." },
    "« Vous avez grandi. »",
    "§ Trois mots.",
    "^« Vous aviez seize ans, une remise, trois nuits, et vous ne saviez pas tenir une plume. »",
    { sobre:"Gerbaud. Maître d'armes de Karlsberg.",
      intense:"Gerbaud. Maître d'armes de Karlsberg pendant vingt-neuf ans. C'est lui qui vous a fait répéter une signature qui n'était pas la vôtre pendant trois nuits dans une remise, à seize ans, en disant que ça vous sauverait la vie plus souvent qu'une épée.\n\nIl avait raison. Ça vous l'a sauvée quatre fois.",
      extreme:"Gerbaud. Maître d'armes de Karlsberg pendant vingt-neuf ans. C'est lui, la remise, les trois nuits, la signature qui n'était pas la vôtre, et la phrase — *ça te sauvera la vie plus souvent qu'une épée* — dite par un homme de cinquante et un ans à un garçon de seize qui ne comprenait pas pourquoi on lui apprenait à écrire au lieu de lui apprendre à tuer.\n\nIl avait raison. Ça vous l'a sauvée quatre fois, et une épée deux." },
    "@« Vous êtes le maître d'armes. »",
    "« Oui. »",
    "« Vous êtes sur une liste de quatre. »",
    "« Je sais », dit Gerbaud. « Je l'ai écrite. »",
  ],
  effets:{ flags:['sa_gerbaud'],
           faire:() => { A2().pistes.sang = Math.max(A2().pistes.sang, 4); },
           exploit:{ eclat:3, temoins:'aucun', quoi:"vous avez retrouvé le maître d'armes de Karlsberg" },
           marque:"Gerbaud, maître d'armes de Karlsberg, est vivant. C'est lui qui vous a caché à seize ans.",
           court:"Gerbaud" },
  suite:'sa_liste', libelleSuite:"« Je l'ai écrite »" },

sa_liste:{
  titre:"« Je l'ai écrite »",
  texte:[
    "@« La dernière page est de la main de ma mère. »",
    "« Elle l'a écrite. Je la lui ai dictée. »",
    { sobre:"Il se rassied sur le billot. C'est une longue histoire et il le sait.",
      intense:"Il se rassied sur le billot parce que c'est long et qu'à soixante-dix ans on s'assied pour les choses longues.\n\n« Trois jours avant. Votre père avait reçu quelque chose de Chastel — une convocation, une notification, je n'ai jamais su le mot exact et ça n'a plus d'importance. Il a réuni quatre personnes. »",
      extreme:"Il se rassied sur le billot, parce que c'est long et qu'à soixante-dix ans on s'assied pour les choses longues.\n\n« Trois jours avant. Votre père avait reçu quelque chose de Chastel — une convocation, une notification, un avis : je n'ai jamais su le mot exact, je n'étais pas un homme de papier, et ça n'a plus d'importance. Ce qui compte, c'est qu'il a réuni quatre personnes dans la salle haute, un mardi soir, et qu'il a fait fermer la porte. »" },
    "« Vous quatre. »",
    "« Nous quatre. L'intendant, le chapelain, moi, et sa sœur. »",
    "« Pourquoi vous ? »",
    "§ « Parce qu'il fallait quatre personnes qui savaient déjà et il n'y en avait que quatre. Les autres, dans cette maison, croyaient que Karlsberg était une maison ordinaire. »",
    "@« Et vous avez fait une liste. »",
    "« Votre mère a demandé qui savait. Elle l'a demandé une fois, à voix haute, devant nous quatre, et elle a écrit les quatre lignes pendant qu'on la regardait. » Un temps. « C'est la chose la plus courageuse que j'aie vue de ma vie, et j'ai vu des batailles. »",
    "« Pourquoi courageuse ? »",
    "« Parce qu'elle savait que l'un de nous quatre l'avait déjà fait, et qu'elle nous l'a montré. »",
    { sobre:"« Elle a regardé lequel de vous a réagi. »",
      intense:"« Elle n'a pas écrit cette liste pour savoir. Elle l'a écrite pour **regarder**. Quatre personnes autour d'une table, une plume, quatre lignes, et une femme qui lève les yeux à la fin. »\n\n« Et ? »\n\n« Et trois d'entre nous ont regardé la feuille. »",
      extreme:"« Elle n'a pas écrit cette liste pour savoir : elle savait déjà qu'un de nous l'avait fait, elle ne savait pas lequel. Elle l'a écrite pour regarder. Quatre personnes autour d'une table, une plume mal taillée, quatre lignes, et une femme qui lève les yeux à la dernière et qui prend son temps. »\n\n« Et ? »\n\n« Et trois d'entre nous ont regardé la feuille. »" },
    "§ « La quatrième a regardé votre père. »",
  ],
  effets:{ flags:['sa_quatre_table','a2_ysabel_soupcon'],
           faire:() => { A2().pistes.sang = 5; },
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous savez ce que votre mère a fait de ces quatre lignes" },
           marque:"Votre mère a écrit les quatre lignes pour regarder. Trois ont regardé la feuille. La quatrième a regardé votre père.",
           court:"La quatrième" },
  suite:'sa_pourquoi', libelleSuite:"« Pourquoi n'avez-vous rien dit ? »" },

sa_pourquoi:{
  titre:"Dix-neuf ans",
  texte:[
    "« Vous le savez depuis dix-neuf ans. »",
    "« Oui. »",
    "« Vous m'avez caché à seize ans, vous m'avez appris à signer d'une main qui n'était pas la mienne, et vous ne me l'avez pas dit. »",
    "« Non. »",
    "« Pourquoi ? »",
    { sobre:"Il ne se défend pas. Il répond.",
      intense:"Il ne se défend pas et il ne s'excuse pas. Il répond, ce qui est plus rare et beaucoup plus difficile à entendre.\n\n« Parce que vous aviez seize ans, que vous saviez déjà tenir une épée mieux que moi à votre âge, et que si je vous avais donné un nom vous seriez parti le lendemain matin et vous seriez mort avant l'automne. »",
      extreme:"Il ne se défend pas, ne s'excuse pas, ne dit pas *j'ai fait ce que j'ai pu*. Il répond, ce qui est plus rare et infiniment plus difficile à entendre.\n\n« Parce que vous aviez seize ans. Parce que vous teniez déjà une épée mieux que moi au même âge et que je le savais depuis vos douze ans. Et parce que si je vous avais donné un nom cette nuit-là, dans cette remise, vous seriez parti le lendemain matin avant l'aube, et vous seriez mort avant l'automne — pas de sa main : de celle des trois hommes qu'elle aurait payés, et vous ne l'auriez même pas vue. »" },
    "§ « Votre mère a fait le même calcul sur un pont, à ce qu'on m'a dit. »",
    "« Qui vous l'a dit ? »",
    "« Une femme qui fait disparaître des chasseurs. Elle est venue me chercher il y a onze ans et elle m'a posé la même question que vous, et je lui ai fait la même réponse, et elle l'a acceptée. »",
    "« Vous saviez que je viendrais. »",
    "« J'espérais. » Il reprend la plane et il ne s'en sert pas. « Il y a une différence entre les deux et elle m'a coûté quatorze ans. »",
    "« Le nom. »",
    { sobre:"« Ysabel. Elle avait quarante-cinq ans et elle n'avait rien. »",
      intense:"« Ysabel de Karlsberg. La sœur cadette de votre père. Quarante-cinq ans à l'époque, jamais mariée, jamais partie, et elle n'avait **rien**. »\n\n« Rien ? »\n\n« Rien sous les côtes. Elle était née dans une maison qui gardait quelque chose et elle ne l'avait pas eu. Un enfant sur trois, messire. »",
      extreme:"« Ysabel de Karlsberg. La sœur cadette de votre père. Quarante-cinq ans, jamais mariée, jamais partie, et elle n'avait rien.\n\n« Rien ? »\n\n« Rien sous les côtes. Née dans une maison qui gardait quelque chose depuis quatre cents ans, et elle ne l'avait pas eu. Un enfant sur trois. Elle a passé quarante-cinq ans dans cette maison à être la seule personne à qui l'on n'expliquait rien, parce qu'il n'y avait rien à lui expliquer, et personne — pas votre père, pas votre grand-père, pas moi — n'a jamais pensé une seule seconde que c'était quelque chose. »" },
    "« Où est-elle ? »",
    "« Chez les sœurs de Sainte-Ombre, à quatre lieues de Fort-aux-Princes. Elle y est entrée en Prairial de la même année. »",
    "§ « Elle n'a pas fui, elle ne s'est pas cachée, elle n'a pas changé de nom. Elle est entrée dans un couvent à quatre lieues d'une route de poste et elle y est depuis dix-neuf ans. »",
    "@« Vous auriez pu y aller. »",
    "« Tous les ans », dit Gerbaud. « Tous les ans depuis dix-neuf ans, en Prairial. Je vais jusqu'au mur, je m'assieds contre, et je repars. »",
  ],
  effets:{ flags:['sa_ysabel','a2_nom_trouve','sa_lieu'],
           faire:() => { A2().pistes.sang = 6; },
           exploit:{ eclat:5, temoins:'aucun', quoi:"vous avez le nom, et l'adresse" },
           marque:"Ysabel de Karlsberg est chez les sœurs de Sainte-Ombre, à quatre lieues de Fort-aux-Princes, depuis dix-neuf ans.",
           court:"Sainte-Ombre" },
  suite:'a2_carte', libelleSuite:"La carte" },

};
enregistrerScenes(SANG);

offrir({ id:'sa_reseau', lieu:'callensbourg', va:'sa_reseau',
         titre:"Elle veut vous montrer quelque chose",
         si:() => a('al_liste') && lien('alycia').confiance >= 6 });
