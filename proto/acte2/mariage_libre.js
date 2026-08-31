/* PARIAS — Acte II · ÉPOUSER QUELQU'UN QUI N'A PAS DE MAISON
 * ═══════════════════════════════════════════════════════════════════════
 * Un mariage, dans ces provinces, est un acte entre deux maisons. Il faut
 * deux noms au registre, deux dots, deux familles pour signer, et un
 * bailliage pour enregistrer.
 *
 * Alycia de Callensbourg n'a rien de tout ça : sa maison a été rayée avant
 * la vôtre. Alarielle en a trop : une cour de quatre cents ans qui range ce
 * genre d'acte dans une rubrique qui n'existe pas.
 *
 * Épouser l'une ou l'autre n'est donc pas une romance qui aboutit. C'est
 * une DÉCLARATION POLITIQUE, la plus lourde de l'acte, et elle se paie :
 *
 *   ALYCIA    — vous déclarez publiquement ce que Karlsberg est. Caleb et
 *               Lucius perdent leur levier le jour même, et la province
 *               comprend en une saison ce qu'elle mettait dix ans à deviner.
 *   ALARIELLE — vous liez une maison humaine de quatre-vingts ans à une
 *               femme qui en vivra quatre cents, devant un frère qui en
 *               fera une arme jusqu'à la fin.
 *
 * Et il y a l'enfant, qui n'est jamais automatique, jamais un cadeau, et
 * qui se décide à deux avec les yeux ouverts.
 * ═══════════════════════════════════════════════════════════════════════ */

const LIBRE = {

/* ══ ÉPOUSER ALYCIA ═══════════════════════════════════════════════════════
 * Le problème n'est pas le sentiment : il est notarial. Il n'y a personne
 * pour la donner, personne pour signer en face, et aucun registre qui
 * accepte une partie sans maison. */
aly_epouser:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Il n'y a personne pour signer en face",
  texte:[
    "C'est elle qui aborde le sujet, et par le mauvais bout, ce qui est sa manière.",
    { sobre:"« Il y a un problème administratif. »",
      intense:"« Il y a un problème administratif », dit-elle, un soir, sans préambule, après trois semaines pendant lesquelles elle n'a manifestement pensé qu'à ça.",
      extreme:"« Il y a un problème administratif », dit-elle un soir, sans préambule d'aucune sorte, après trois semaines pendant lesquelles elle a été distraite, brusque et deux fois désagréable sans raison — trois semaines pendant lesquelles il est maintenant évident qu'elle n'a pensé qu'à ça et qu'elle a cherché une façon d'en parler qui ne ressemble pas à une demande." },
    "« Lequel ? »",
    "« Un mariage est un acte entre deux maisons. »",
    "§ Elle laisse la phrase là, et il faut quatre secondes pour comprendre ce qu'elle vient de dire.",
    "« Vous n'en avez pas », dites-vous.",
    "« Je n'en ai pas. Il n'y a personne pour me donner, personne pour signer en face, pas de dot, pas de contrat, et aucun greffe de ces quatre provinces qui inscrira une partie sans maison. J'ai vérifié. »",
    "« Vous avez vérifié. »",
    "« J'ai fait vérifier par un clerc d'étape qui me doit onze ans de silence, oui, et il a mis six semaines, et la réponse est non. » Elle a un geste sec. « Alors voilà. C'est réglé, ce n'est pas possible, et je préférais vous le dire moi plutôt que vous laisser le découvrir en le demandant. »",
    { sobre:"Elle vient de vous épargner une humiliation.",
      intense:"Elle vient de faire six semaines de démarches pour vous épargner l'humiliation d'une demande impossible. C'est sa façon à elle, et elle est atroce.",
      extreme:"Elle vient de passer six semaines à faire vérifier le droit de quatre provinces, par un homme à qui elle a dépensé une créance de onze ans, uniquement pour vous épargner l'humiliation de formuler une demande qui n'aurait pas pu aboutir. C'est sa façon à elle de dire une chose immense, et elle est absolument atroce, et elle ne s'en rend pas compte." },
    "§ Il y a plusieurs choses à faire de ce moment, et une seule est irréparable.",
  ],
  choix:[
    { t:"« Alors on se passera du greffe. »",
      detail:"il y a une chapelle à Karlsberg et trente-quatre statues sans visage · ça suffit ou ça ne suffit pas",
      si:() => a('a2_chapelle') || a('ch_salle'),
      risque:"définitif", ferme:"Ferme : tout ce qui vous protégeait par l'ambiguïté",
      definitif:true, va:'aly_ep_chapelle' },

    { t:"« Alors je vous en donne une. »",
      detail:"relever Callensbourg · un deuxième nom au registre, et un deuxième dossier pour Chastel",
      si:() => a('a2_bannieres') || a('a2_role_royal'),
      risque:"définitif", ferme:"Ferme : la discrétion de ce qui restait de Callensbourg",
      definitif:true, va:'aly_ep_callensbourg' },

    { t:"« Vous avez raison. C'est réglé. »",
      detail:"prendre la sortie qu'elle a préparée · c'est pour ça qu'elle l'a préparée",
      risque:"prudent", va:'aly_ep_non' },
  ],
},

aly_ep_chapelle:{
  qui:'alycia',
  lieu:"Karlsberg · la chapelle",
  titre:"Trente-quatre témoins sans visage",
  texte:[
    "« Alors on se passera du greffe. »",
    { sobre:"« Ça ne vaudra rien. »",
      intense:"« Ça ne vaudra rien », dit-elle immédiatement. « Aucun tribunal, aucun bailliage, aucune succession. »",
      extreme:"« Ça ne vaudra rien », dit-elle immédiatement, et sans une once de sentiment, parce qu'elle a passé six semaines sur la question et qu'elle connaît le dossier mieux que vous. « Aucun tribunal ne le reconnaîtra. Aucun bailliage ne l'inscrira. Aucun enfant né de là n'héritera de quoi que ce soit. Devant le droit de quatre provinces, ce sera très exactement rien du tout. »" },
    "« Devant le droit. »",
    "« Devant le droit. »",
    "« Et devant les gens ? »",
    "§ Elle ouvre la bouche pour répondre, et ne répond pas, parce que la réponse est *tout*, et qu'elle le sait.",
    "Cela se fait un mardi de Prairial, dans une chapelle relevée depuis peu, sans annonce et sans invitations.",
    { sobre:"Il y a du monde quand même.",
      intense:"Il n'y a pas d'invitations, et il y a du monde quand même : quatre-vingts personnes, parce qu'un bourg de trente feux n'a pas besoin qu'on l'invite pour savoir ce qui se passe dans sa chapelle.",
      extreme:"Il n'y a aucune invitation, ni écrite ni portée, et il y a quatre-vingts personnes dans une chapelle qui en contient soixante. Un bourg de trente feux n'a besoin d'aucune invitation : il suffit que le maréchal ait ferré deux chevaux le lundi et que quelqu'un ait nettoyé la chapelle. Ils sont venus en habits du dimanche, un mardi, et personne n'a rien organisé." },
    "Il n'y a pas de prêtre. Le clerc de l'école lit un texte que personne ne peut authentifier, et le plus vieux des maçons dit quatre mots dessus parce qu'il connaît les mots.",
    "§ Il y a trente-quatre statues sans visage dans la crypte sous vos pieds, et quatre d'entre elles ont un visage qui n'est pas le leur.",
    "Alycia ne pleure pas et n'a l'air ni heureuse ni malheureuse : elle a l'air de quelqu'un qui exécute quelque chose de grave avec une grande attention, ce qui est exactement ce qu'elle fait.",
    "Elle dit une seule phrase qui n'était pas dans le texte, et elle la dit assez bas pour que la moitié de la chapelle ne l'entende pas.",
    { sobre:"« Je ne sais pas comment on fait. »",
      intense:"« Je ne sais pas comment on fait. » Un temps. « Je n'ai jamais vu personne le faire. Ma maison a été rayée quand j'avais dix-sept ans et je n'ai assisté à aucun mariage depuis. »",
      extreme:"« Je ne sais pas comment on fait », dit-elle, assez bas pour que la moitié de la chapelle ne l'entende pas. « Je n'ai jamais vu personne le faire. J'avais dix-sept ans, ma maison a été rayée en une nuit, et depuis j'ai passé quinze ans à ne pas entrer dans les endroits où il y a du monde. Je n'ai assisté à aucun mariage, aucun baptême et aucun enterrement en quinze ans. Je ne sais pas ce qu'on est censé faire de ses mains. »" },
    "« Personne ne sait. C'est la première fois pour tout le monde ici. »",
    "« Ça, c'est faux et c'est gentil. »",
    "§ La province apprend la chose en onze jours.",
    "Elle la lit exactement comme il faut, et personne ne se trompe : le chef de maison de Karlsberg a épousé une Paria devant quatre-vingts témoins, dans une chapelle, sans greffe et sans le cacher.",
    "Il n'y a plus rien à deviner sur ce qu'est cette maison. Ce jour-là, Karlsberg cesse d'être une maison relevée pour devenir **une position**.",
  ],
  effets:{ flags:['aly_epousee','a2_alycia_epouse','a2_paria_declare','a2_alycia_reste'],
           suspicion:32,
           faire:() => { bouger('alycia', { relation:10, confiance:10, attirance:8, peur:4 });
                         const C = CHANTIER(); C.bras += 4; C.faveurs += 1;
                         retenir('alycia', "il m'a épousée devant quatre-vingts personnes sans qu'aucun greffe ne l'inscrive");
                         retenir('caleb', "il a épousé une Paria : je n'ai plus aucun mariage à lui vendre");
                         retenir('charles', "il a épousé une Paria devant quatre-vingts témoins, ce qui règle ma question");
                         retenir('lucius', "il s'est rendu inépousable, ce qui est soit très bête soit très fort"); },
           exploit:{ eclat:22, temoins:'province', quoi:"un mariage sans greffe, devant quatre-vingts personnes" },
           marque:"Épousée dans la chapelle de Karlsberg, sans greffe, devant quatre-vingts témoins. « Je ne sais pas comment on fait. »",
           court:"Un mardi de Prairial" },
  plusTard:"Aucun tribunal ne le reconnaît, aucun enfant n'en héritera, et toute la province a compris ce qu'est Karlsberg.",
  suite:'a2_carte', libelleSuite:"La carte" },

aly_ep_callensbourg:{
  qui:'alycia',
  lieu:"Chastel · le guichet des titres",
  titre:"Relever Callensbourg",
  texte:[
    "« Alors je vous en donne une. »",
    "« Une quoi ? »",
    "« Une maison. »",
    { sobre:"Elle met du temps à comprendre, puis elle refuse.",
      intense:"Elle met un temps considérable à comprendre, et quand elle comprend, elle refuse — vite, fort, et sans discussion.",
      extreme:"Elle met un temps considérable à comprendre ce que vous êtes en train de proposer, ce qui ne lui arrive jamais. Quand elle comprend, elle refuse : vite, fort, debout, et sans la moindre intention de discuter, ce qui vous apprend qu'elle y avait déjà pensé toute seule et qu'elle avait déjà tranché." },
    "« Non. »",
    "« Le relèvement d'un titre éteint est une procédure. Elle existe. Je l'ai faite. »",
    "« Vous l'avez faite pour **votre** maison, avec vos preuves, votre registre et votre chevalière. » Elle compte. « Callensbourg n'a pas de registre : ils l'ont brûlé. Pas de chevalière : je l'ai vendue à dix-neuf ans pour manger. Et pas de survivant que je puisse produire devant un commissaire, parce que produire un survivant, c'est le désigner. »",
    "« Vous êtes la survivante. »",
    "« Je suis le nom en tête d'une liste imprimée à trois cents exemplaires. »",
    "§ Voilà le vrai coût, et il n'est pas pour vous.",
    "« Si j'entre dans ce guichet et que je dis mon nom entier », dit-elle, « je passe de *quelqu'un qu'on cherche* à *quelqu'un dont on a l'adresse*, en une signature. C'est la seule protection que j'aie eue en quinze ans et vous me demandez de la vendre pour un contrat de mariage. »",
    "Long silence.",
    { sobre:"« Alors n'entrez pas. »",
      intense:"« Alors n'entrez pas », dites-vous. « J'y vais seul. »",
      extreme:"« Alors n'entrez pas », dites-vous. « J'y vais seul, avec ce que j'ai : un relèvement déjà obtenu, un titre au registre, et le droit d'attester en justice pour une maison éteinte de la même province. Ce n'est pas la bonne procédure. C'est une procédure voisine, et un commissaire aux titres fatigué un vendredi peut confondre les deux. »" },
    "« Ça ne marchera pas. »",
    "Ça marche.",
    "§ Ça prend quatorze mois, deux cent quarante couronnes, trois déplacements et un commissaire qui n'est pas Ancelin Vasque — celui-là aurait vu la différence en quatre secondes.",
    "*Maison de Callensbourg, Marches. Relevée. Représentée par Alycia de Callensbourg, dernière du nom.*",
    "Elle lit la ligne trois fois.",
    "« Vous avez menti à un tribunal de province. »",
    "« J'ai employé une procédure voisine. »",
    "« Vous avez menti à un tribunal de province », répète-t-elle, « pour que j'aie une maison. Et maintenant j'en ai une, et elle est écrite dans un volume que n'importe qui peut demander à consulter. »",
    "Elle repose la copie.",
    "« C'est la chose la plus dangereuse que quiconque ait jamais faite pour moi », dit-elle. « Épousez-moi avant que je change d'avis. »",
    "§ Le mariage est un acte de bailliage ordinaire, en trois exemplaires, avec deux dots symboliques et onze pages de clauses recopiées d'un modèle.",
    "Il n'y a personne dans la salle. Ça vaut devant tous les tribunaux de quatre provinces.",
    "Les deux maisons rayées de la Route Grise sont désormais alliées, inscrites, et parfaitement localisables.",
  ],
  effets:{ or:-240, flags:['aly_epousee','a2_alycia_epouse','a2_callensbourg_releve','a2_alycia_reste','a2_maison_alliee'],
           suspicion:26,
           faire:() => { bouger('alycia', { relation:10, confiance:12, attirance:7, peur:6 });
                         const C = CHANTIER(); C.faveurs += 2; C.bras += 3;
                         retenir('alycia', "il a menti à un tribunal de province pour que j'aie une maison");
                         retenir('caleb', "deux maisons rayées viennent de s'allier par acte, ce qui se lit très mal");
                         retenir('charles', "Callensbourg est relevée : il y a maintenant deux dossiers au lieu d'un"); },
           exploit:{ eclat:18, temoins:'province', quoi:"Callensbourg relevée par une procédure voisine" },
           marque:"« Maison de Callensbourg, relevée. Représentée par Alycia de Callensbourg, dernière du nom. » Le mariage est valide partout.",
           court:"Callensbourg" },
  plusTard:"Elle est passée de quelqu'un qu'on cherche à quelqu'un dont on a l'adresse, en une signature. Elle l'avait dit.",
  suite:'a2_carte', libelleSuite:"La carte" },

aly_ep_non:{
  qui:'alycia',
  titre:"La sortie qu'elle avait préparée",
  texte:[
    "« Vous avez raison. C'est réglé. »",
    { sobre:"Elle acquiesce.",
      intense:"Elle acquiesce, une fois, et reprend ce qu'elle faisait. Elle avait préparé cette sortie, elle l'avait polie pendant six semaines, et elle sert exactement à ça.",
      extreme:"Elle acquiesce une fois et reprend ce qu'elle faisait. Elle avait préparé cette sortie, l'avait polie pendant six semaines de vérifications juridiques inutiles, et elle sert exactement à ça : à ce que la conversation puisse se terminer sans que personne ait à dire non." },
    "§ Ce n'est pas un refus. Ce n'est pas non plus une acceptation. C'est une porte laissée ouverte que personne ne franchit ce soir-là.",
    "Vous n'en reparlerez pas pendant deux ans.",
    "Puis un jour, dans une autre saison et pour une autre raison, quelqu'un des deux y reviendra — ou personne, et ce sera comme ça, et ce ne sera pas un drame.",
  ],
  effets:{ flags:['aly_ep_reporte'],
           faire:() => bouger('alycia', { relation:2, confiance:3 }),
           marque:"Elle avait préparé la sortie. Personne ne l'a franchie ce soir-là.",
           court:"Une porte ouverte" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* ══ ÉPOUSER ALARIELLE ════════════════════════════════════════════════════
 * Sa cour n'a pas de rubrique pour ça. Son frère, si — et il l'a préparée
 * depuis vingt ans. */
el_epouser:{
  qui:'alarielle',
  lieu:"Aelthiriel · le jardin fermé",
  titre:"Quatre-vingts ans contre quatre cents",
  texte:[
    "Elle vous laisse le dire en entier avant de répondre, ce qui prend un moment parce qu'il n'y a pas de formule pour ça.",
    { sobre:"« Vous savez ce que vous demandez. »",
      intense:"« Vous savez ce que vous demandez ? » Ce n'est pas rhétorique : c'est une vraie question, et elle attend une vraie réponse.",
      extreme:"« Vous savez ce que vous demandez ? » Ce n'est pas une figure de style et ce n'est pas de la coquetterie : c'est une question technique, posée par quelqu'un qui a deux cent onze ans à quelqu'un qui en a trente, et elle attend une réponse qui prouve que le calcul a été fait." },
    "« Je crois. »",
    "« Faites-le à voix haute. Je veux l'entendre. »",
    "§ Vous le faites à voix haute, et c'est beaucoup plus désagréable que prévu.",
    "Vous avez trente ans. Vous en vivrez soixante-dix, peut-être quatre-vingts si les blessures se tiennent tranquilles, ce qui n'est pas leur habitude.",
    "Elle en a deux cent onze. Elle en vivra quatre cents, peut-être davantage.",
    "« Continuez », dit-elle.",
    "« Vous me verrez vieillir. »",
    "« Oui. »",
    "« Vous me verrez mourir. »",
    "« Oui. »",
    { sobre:"« Et ensuite ? »",
      intense:"« Et ensuite vous aurez deux cent cinquante ans, et il vous en restera cent cinquante. » Elle ne cille pas. « Continuez. C'est là que les humains s'arrêtent, et c'est là que ça commence. »",
      extreme:"« Et ensuite vous aurez deux cent cinquante ans, il vous en restera cent cinquante, et vous les passerez sans moi. » — « Oui. » Elle ne cille pas une seule fois. « Continuez. C'est précisément là que les humains s'arrêtent de compter, parce que c'est là que ça cesse d'être triste et que ça devient arithmétique. Ce n'est pas une histoire de deuil, messire. Un deuil dure dix ans, vingt au pire. Je vous parle de cent cinquante ans de vie ordinaire après. »" },
    "« Vous me dites non. »",
    "« Je ne vous dis rien du tout. Je vous fais faire le calcul, parce que personne dans votre espèce ne le fait jamais avant, et que tous le font après. »",
    "§ Elle marche jusqu'au bout du jardin fermé et revient, ce qui prend une minute entière.",
    "« Voilà ce que je sais », dit-elle. « J'ai vu quatre elfes de ma maison épouser des humains en deux cent onze ans. Trois s'en sont remis. La quatrième est encore vivante et ne parle plus à personne depuis cent soixante ans. »",
    "« Trois sur quatre. »",
    "« Trois sur quatre. » Elle vous regarde. « C'est un meilleur chiffre que celui de Mont-Draken, et vous avez le même air que quand vous l'avez entendu. »",
  ],
  choix:[
    { t:"« Trois sur quatre me suffit. »",
      detail:"prendre le chiffre tel qu'il est · et le lui dire dans ces termes",
      risque:"définitif", ferme:"Ferme : la possibilité de dire que vous ne saviez pas",
      definitif:true, va:'el_ep_oui' },

    { t:"« Alors dites-moi ce que vous voulez, vous. »",
      detail:"lui rendre la question · elle a mis quatre-vingt-onze ans à ce qu'on la lui pose",
      risque:"calculé", va:'el_ep_elle' },

    { t:"Retirer la demande",
      detail:"cent cinquante ans après vous · ce n'est pas à elle de payer ça",
      risque:"définitif", ferme:"Ferme : ce qu'elle aurait décidé elle-même",
      definitif:true, va:'el_ep_retire' },
  ],
},

el_ep_elle:{
  qui:'alarielle',
  titre:"La quatrième",
  texte:[
    "« Alors dites-moi ce que vous voulez, vous. »",
    { sobre:"« Vous m'avez déjà posé cette question une fois. »",
      intense:"« Vous m'avez déjà posé cette question une fois », dit-elle. « Vous êtes le seul à l'avoir fait en quatre-vingt-onze ans, et vous êtes maintenant le seul à l'avoir faite deux fois. »",
      extreme:"« Vous m'avez déjà posé cette question une fois », dit-elle, et sa voix change de quelque chose de très léger. « Vous êtes la seule personne à me l'avoir posée en quatre-vingt-onze ans. Vous êtes maintenant la seule à me l'avoir posée deux fois. Je ne sais pas si vous mesurez la différence entre les deux, mais elle est considérable et elle est en votre faveur. »" },
    "« Alors répondez encore. »",
    "« La quatrième, c'est ma tante. »",
    "§ Ce n'est pas une réponse à la question, et c'en est une.",
    "« Celle qui ne parle plus à personne depuis cent soixante ans. Elle vit dans la maison basse, on lui porte ses repas, et elle regarde le fleuve. » Elle s'assoit. « J'y vais deux fois par an. Elle ne me répond pas. Elle m'a répondu une fois, il y a quarante et un ans, quand j'avais cent soixante-dix ans et que je lui ai demandé si elle regrettait. »",
    "« Qu'est-ce qu'elle a dit ? »",
    { sobre:"« *Non. C'est bien pire que ça.* »",
      intense:"« Elle a dit : *Non. C'est bien pire que ça : je ne regrette rien du tout, et il me reste deux cents ans pour ne rien regretter.* » Alarielle regarde ses mains. « Puis elle n'a plus rien dit pendant quarante et un ans. »",
      extreme:"« Elle a dit : *Non. C'est bien pire que ça. Je ne regrette absolument rien, je referais tout exactement pareil, et il me reste deux cents ans pour ne rien regretter dans une maison où l'on me porte mes repas.* » Alarielle regarde ses mains posées sur ses genoux. « Puis elle n'a plus rien dit du tout, à personne, pendant quarante et un ans. Et voilà pourquoi je vous ai fait faire le calcul à voix haute, messire : parce que la mauvaise fin de cette histoire n'est pas le chagrin. C'est de n'avoir aucun regret et cent cinquante ans devant soi. »" },
    "Long silence dans le jardin fermé.",
    "« Ce que je veux », dit-elle enfin, « c'est ne pas être la cinquième par accident. Si je le deviens, je veux l'avoir choisi les yeux ouverts, en sachant le chiffre, comme elle. »",
    "§ Elle se lève.",
    "« Reposez la question », dit-elle.",
  ],
  effets:{ flags:['el_ep_tante'],
           faire:() => bouger('alarielle', { relation:8, confiance:9, attirance:5 }),
           marque:"« Non. C'est bien pire que ça : je ne regrette rien, et il me reste deux cents ans pour ne rien regretter. »",
           court:"La quatrième" },
  choix:[
    { t:"La reposer",
      detail:"les yeux ouverts, en sachant le chiffre · comme sa tante",
      risque:"définitif", ferme:"Ferme : la possibilité de dire que vous ne saviez pas",
      definitif:true, va:'el_ep_oui' },
    { t:"Ne pas la reposer",
      detail:"elle vous a montré la maison basse et le fleuve · vous avez regardé",
      risque:"définitif", ferme:"Ferme : ce qu'elle avait décidé", definitif:true, va:'el_ep_retire' },
  ],
},

el_ep_oui:{
  qui:'alarielle',
  lieu:"Aelthiriel · la salle des actes",
  titre:"La rubrique qu'il faut créer",
  texte:[
    "Il faut deux ans.",
    { sobre:"Le problème n'est pas l'autorisation. C'est le classement.",
      intense:"Le problème n'est jamais l'autorisation chez eux : c'est le classement. Sous quel titre range-t-on un acte dont l'une des parties sera morte dans cinquante ans et l'autre vivante dans trois cents ?",
      extreme:"Le problème n'est jamais l'autorisation chez eux, contrairement à ce que croient les humains : c'est le classement. Un acte elfique doit être rangé, et pour être rangé il doit ressembler à un acte antérieur. Sous quel titre range-t-on une union dont l'une des parties sera morte dans cinquante ans et l'autre vivante dans trois cents ? Ce n'est pas une union : c'est un épisode. Le collège des archives siège onze fois sur ce seul mot." },
    "Le collège finit par créer une rubrique. Elle porte un nom que la langue de la province ne traduit pas, et dont Alarielle vous donne l'équivalent le plus proche un soir, à contrecœur, parce que vous avez insisté trois fois :",
    "§ *ce qu'on choisit en connaissant la durée.*",
    "Tyrion parle contre, comme prévu, pendant trois heures cette fois.",
    { sobre:"Et il ne dit pas ce qu'on attendait.",
      intense:"Et il ne dit rien de ce qu'on attendait. Pas un mot sur les humains, pas un mot sur la faute, pas un mot sur ce que les hommes prennent aux Elfes. Il parle de leur tante.",
      extreme:"Et il ne dit rien du tout de ce qu'on attendait. Pas un mot sur les humains, pas une allusion à la faute, rien sur ce que les hommes prennent aux Elfes depuis deux siècles — tout l'arsenal qu'il emploie depuis vingt ans et que la cour connaît par cœur. Il parle de leur tante. Trois heures. Il la nomme, il donne les dates, il décrit la maison basse, les repas qu'on porte, le fleuve, les quarante et un ans de silence. Il ne conclut pas. Il n'a pas besoin de conclure." },
    "Alarielle ne répond pas à son frère. Elle demande simplement au collège si la rubrique est créée.",
    "Elle l'est. L'acte est déposé à douze voix contre huit.",
    "§ Elle sort de la salle des actes, traverse la cour, et va à la maison basse.",
    "Elle en ressort au bout de deux heures et ne dit pas ce qui s'y est passé, ni ce soir-là ni jamais.",
    "Vous saurez seulement ceci, parce qu'un archiviste vous le dira des années plus tard : ce jour-là, pour la deuxième fois en cent soixante ans, la femme de la maison basse a parlé.",
    "§ Le mariage a lieu à Karlsberg, parce qu'elle a insisté sur ce point et refusé d'en discuter.",
    "Il y a quatre-vingts humains dans une chapelle de soixante places, onze Elfes qui ne s'assoient pas, et un Nain de cent onze ans au fond qui dit six mots par jour et qui en a dépensé quatre pour venir.",
  ],
  effets:{ flags:['el_epousee','a2_alarielle_epouse','a2_alarielle_liee','a2_acte_elfique','a2_tyrion_humilie'],
           suspicion:24,
           faire:() => { bouger('alarielle', { relation:12, confiance:11, attirance:9, devoir:-2 });
                         const C = CHANTIER(); C.faveurs += 4; C.pierre += 2;
                         retenir('tyrion', "ma sœur a épousé un humain et j'ai parlé de notre tante pendant trois heures");
                         retenir('alarielle', "il a fait le calcul à voix haute avant, ce qu'aucun humain ne fait");
                         retenir('charles', "il a épousé une elfe, ce qui lie trois choses que je n'ai pas envie de lier"); },
           exploit:{ eclat:26, temoins:'province', quoi:"une elfe de la maison d'Eltharion épouse une maison humaine" },
           marque:"Acte déposé à douze voix contre huit, sous une rubrique créée pour l'occasion : « ce qu'on choisit en connaissant la durée ».",
           court:"Douze contre huit" },
  plusTard:"Tyrion n'a pas parlé des humains. Il a parlé de leur tante pendant trois heures, et il n'a pas eu besoin de conclure.",
  suite:'a2_carte', libelleSuite:"La carte" },

el_ep_retire:{
  qui:'alarielle',
  titre:"La maison basse",
  texte:[
    "Vous retirez la demande.",
    { sobre:"Elle ne dit rien pendant longtemps.",
      intense:"Elle ne dit rien pendant très longtemps, et ce n'est pas le silence de quelqu'un qui encaisse : c'est celui de quelqu'un qui range quelque chose.",
      extreme:"Elle ne dit rien pendant très longtemps. Ce n'est pas le silence de quelqu'un qui encaisse un refus — vous avez appris à distinguer ses silences en trois ans et celui-ci n'est pas triste. C'est celui de quelqu'un qui range soigneusement quelque chose dont elle savait qu'elle aurait à le ranger, et qui prend le temps de le faire correctement parce qu'elle vivra longtemps avec." },
    "« Vous avez fait le calcul », dit-elle enfin.",
    "« Oui. »",
    "« À voix haute, devant moi, jusqu'au bout. » Elle hoche la tête. « Alors vous avez fait la seule chose que je demandais, et vous avez conclu autrement. Ce n'est pas la même chose que de ne pas avoir compté. »",
    "§ « Je vous en veux », ajoute-t-elle, très simplement. « Je tiens à ce que ce soit dit, parce que je vous en voudrai longtemps et que je ne veux pas que ce soit une surprise dans quarante ans. »",
    "« C'est légitime. »",
    "« Bien sûr que c'est légitime. » Un temps. « Et vous avez raison, ce qui est la partie insupportable. »",
    "Elle vous reçoit toujours. Elle ouvre toujours les archives. Elle parle toujours devant sa cour contre ce qui vise les Parias, et elle perd toujours.",
    "Elle ne retourne plus au jardin fermé quand vous êtes là. Il y a onze autres endroits à Aelthiriel où l'on peut recevoir quelqu'un.",
  ],
  effets:{ flags:['el_ep_retire','a2_alarielle_amie'],
           faire:() => { bouger('alarielle', { relation:3, confiance:5, attirance:-7, devoir:3 });
                         retenir('alarielle', "il a fait le calcul jusqu'au bout et il a conclu autrement, et il avait raison"); },
           marque:"« Je vous en veux, et vous avez raison, ce qui est la partie insupportable. »",
           court:"Onze autres endroits" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* ══ L'ENFANT ═════════════════════════════════════════════════════════════
 * Jamais automatique, jamais un cadeau, jamais une conséquence de scène.
 * Ça se décide à deux, avec un chiffre sur la table : un enfant sur trois
 * naît sans l'Onde, deux sur trois naissent avec — et ce qui naît avec, dans
 * ces provinces, se cache ou se déclare. */
enf_question:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Deux sur trois",
  texte:[
    "C'est elle qui pose la question, et elle la pose comme elle pose tout : par le bout qui fait mal.",
    { sobre:"« Deux sur trois. »",
      intense:"« Deux sur trois », dit-elle. « C'est ce que votre elfe a lu dans son archive de quatre cents ans. Un enfant sur trois naît sans. Donc deux sur trois naissent avec. »",
      extreme:"« Deux sur trois », dit-elle un soir, sans que rien n'ait amené ça. « C'est le chiffre de votre elfe, celui qu'elle a lu dans un volume de quatre cents ans. Un enfant sur trois naît sans. Ce qui veut dire — et personne ne le formule jamais dans ce sens-là, j'ai remarqué — que deux enfants sur trois naissent avec. »" },
    "« Vous y pensez depuis quand ? »",
    "« Depuis que je l'ai entendu. »",
    "§ Elle est une Paria. Vous êtes un Paria. Le chiffre n'est pas de deux sur trois dans ce cas-là et vous le savez tous les deux sans qu'aucun des deux ait envie de le dire.",
    "« Il faut décider », dit-elle. « Pas ce soir. Mais il faut décider, parce que ne pas décider est une décision qui se prend toute seule au bout de deux ans et je n'aime pas les décisions qui se prennent toutes seules. »",
    "« Vous en voulez un ? »",
    { sobre:"« Je ne sais pas. Je veux qu'on compte d'abord. »",
      intense:"« Je ne sais pas. » Elle a l'air furieuse de ne pas savoir. « Je veux qu'on compte d'abord, et ensuite je saurai, et ce sera peut-être non. »",
      extreme:"« Je ne sais pas », dit-elle, et elle a l'air furieuse contre elle-même de ne pas savoir, ce qui est nouveau. « Vous voulez la vérité ? Je n'ai jamais envisagé la question de ma vie. Pas une fois, pas une seule, en trente-deux ans — parce qu'une femme qui fait quatre cents lieues par saison en changeant de nom à chaque étape n'a pas d'enfant, c'est réglé d'avance, ce n'est même pas une privation, c'est une donnée du métier. Alors je ne sais pas. Je veux qu'on compte d'abord. »" },
    "§ On compte, et ça prend trois soirs.",
    "**Un.** Un enfant de deux Parias porte, très probablement, ce que les deux portent. Personne dans quatre provinces ne sait quoi faire de ça.",
    "**Deux.** Il faudra choisir, à ses onze ou douze ans, entre le cacher et le déclarer — et le déclarer, aujourd'hui, veut dire l'inscrire au registre d'un homme de soixante et un ans dont le cahier est vide.",
    "**Trois.** Il y a onze noms sur une liste imprimée à trois cents exemplaires. Un enfant en fait douze.",
    "**Quatre.** Et Karlsberg tient debout, ou ne tient pas, et personne ne peut le savoir avant vingt ans.",
  ],
  choix:[
    { t:"« Alors oui. »",
      detail:"en connaissant les quatre points · c'est le seul oui qui vaille",
      risque:"définitif", ferme:"Ferme : une vie où l'on ne peut disparaître qu'à deux",
      definitif:true, va:'enf_oui' },

    { t:"« Alors non. »",
      detail:"les quatre points sont mauvais · et ce n'est pas une lâcheté de les lire",
      risque:"définitif", ferme:"Ferme : ce qui aurait continué après vous",
      definitif:true, va:'enf_non' },

    { t:"« Décidez, vous. »",
      detail:"c'est elle qui le porte · et elle n'a jamais rien laissé décider à personne",
      risque:"calculé", va:'enf_elle' },
  ],
},

enf_elle:{
  qui:'alycia',
  titre:"Elle décide",
  texte:[
    "« Décidez, vous. »",
    { sobre:"« Non. »",
      intense:"« Non », dit-elle immédiatement. « Ne me faites pas ça. »",
      extreme:"« Non », dit-elle immédiatement, et il y a de la colère dedans. « Ne me faites pas ça. C'est très exactement le genre de générosité qui coûte cher : vous me donnez la décision entière, ce qui veut dire que vous me donnez aussi la faute entière, et dans dix-huit ans, quand cet enfant sera devant un commissaire aux titres, il y aura une seule personne dans cette maison qui aura décidé. »" },
    "« Ce n'est pas ce que je voulais dire. »",
    "« Je sais. C'est ce que ça fait quand même. » Elle souffle. « Vous voulez me laisser le dernier mot parce que c'est mon corps, et vous avez raison sur le principe, et c'est très bien. Alors dites d'abord le vôtre, et je dirai le mien après, et si les deux ne sont pas les mêmes ce sera le mien qui l'emporte. Dans cet ordre. »",
    "§ C'est exactement la bonne solution et vous ne l'auriez pas trouvée.",
  ],
  choix:[
    { t:"« Moi, oui. »",
      detail:"dire le sien d'abord · comme elle l'a demandé",
      risque:"définitif", va:'enf_oui' },
    { t:"« Moi, non. »",
      detail:"dire le sien d'abord, même quand c'est non",
      risque:"définitif", va:'enf_non' },
  ],
},

enf_oui:{
  qui:'alycia',
  lieu:"Karlsberg",
  titre:"Ce qui vient",
  texte:[
    { sobre:"Elle dit oui aussi.",
      intense:"Elle dit oui aussi, deux jours plus tard, à une heure quelconque, en plein milieu d'autre chose — parce que c'est comme ça qu'elle dit les choses importantes.",
      extreme:"Elle dit oui aussi. Deux jours plus tard, à trois heures de l'après-midi, en plein milieu d'une conversation sur des chevaux, sans transition d'aucune sorte : « Oui, au fait. » Puis elle est revenue aux chevaux. C'est comme ça qu'elle dit les choses importantes et vous avez mis trois ans à l'apprendre." },
    "§ L'enfant naît en Fructidor de l'année suivante, à Karlsberg, dans la salle basse parce que c'est la pièce la mieux chauffée.",
    "C'est une fille. L'accouchement est long et il se passe mal pendant environ une heure, puis il se passe bien.",
    { sobre:"Alycia ne dit rien pendant deux jours.",
      intense:"Alycia ne dit pratiquement rien pendant deux jours, ce qui inquiète tout le monde sauf vous : elle est en train de recompter quelque chose.",
      extreme:"Alycia ne dit pratiquement rien pendant deux jours entiers, ce qui inquiète l'ensemble de la maison, la sage-femme, et jusqu'aux quarante hommes du chantier qui envoient quelqu'un demander. Vous êtes le seul à ne pas vous inquiéter, parce que vous avez fini par comprendre à quoi ressemble cette femme quand elle recompte quelque chose de fond en comble." },
    "Le troisième jour, elle dit :",
    "« Trente-huit devient trente-neuf. »",
    "« Pardon ? »",
    "« Ma liste. » Elle regarde l'enfant. « Elle y est. Elle y était avant de naître, je l'ai mise en Germinal. J'ai passé deux jours à essayer de l'en sortir et je n'y arrive pas. »",
    "§ Elle n'a jamais pleuré devant vous. Elle ne pleure pas là non plus.",
    "« Je passe ma vie à cacher des gens », dit-elle. « J'en ai fabriqué un. »",
    "L'enfant s'appelle **Loyse**, ce qui n'a fait l'objet d'aucune discussion : vous l'avez dit une fois, elle a hoché la tête, et personne n'a jamais commenté le rapport avec un garçon de neuf ans mort dans une cour avec une épée de bois.",
  ],
  effets:{ flags:['enf_ne','a2_enfant','a2_loyse','a2_heritier'],
           suspicion:8,
           faire:() => { bouger('alycia', { relation:8, confiance:6, peur:8 });
                         const C = CHANTIER(); C.faveurs += 1;
                         retenir('alycia', "j'ai passé ma vie à cacher des gens et j'en ai fabriqué un");
                         retenir('charles', "il y a un enfant à Karlsberg, de deux Parias, et je ne sais pas quoi en faire"); },
           exploit:{ eclat:6, temoins:'quelques', quoi:"un enfant est né à Karlsberg" },
           marque:"Loyse est née en Fructidor, dans la salle basse. « Trente-huit devient trente-neuf. »",
           court:"Loyse" },
  plusTard:"Il faudra choisir, à ses onze ou douze ans, entre la cacher et la déclarer. Vous avez vingt ans pour y penser et ça ne suffira pas.",
  suite:'a2_carte', libelleSuite:"La carte" },

enf_non:{
  qui:'alycia',
  titre:"Les quatre points",
  texte:[
    "Non.",
    { sobre:"Elle dit non aussi.",
      intense:"Elle dit non aussi, et sans hésiter, ce qui laisse entendre qu'elle avait déjà décidé et qu'elle voulait entendre le vôtre d'abord.",
      extreme:"Elle dit non aussi, sans hésiter une seconde, ce qui laisse entendre qu'elle avait décidé bien avant les trois soirs de comptes et qu'elle voulait simplement entendre le vôtre d'abord — pour savoir, non pas ce qu'elle allait décider, mais avec qui elle vivait." },
    "« Les quatre points sont mauvais », dit-elle. « Tous les quatre. On ne fait pas ça sur quatre points mauvais parce qu'on en a envie. »",
    "« Vous en aviez envie ? »",
    "Long silence.",
    "« Oui », dit-elle. « Beaucoup plus que je ne l'aurais cru, et je vous serais reconnaissante de ne plus jamais poser cette question. »",
    "§ On n'en reparle plus. C'est tenu de part et d'autre, sans rancune et sans allusion, pendant des années.",
    "Il y a des soirs où c'est très lourd et où les deux le savent, et où personne ne dit rien, et où c'est très bien comme ça.",
    { sobre:"Ce n'est pas un renoncement. C'est un compte tenu correctement.",
      intense:"Ce n'est pas un renoncement et ce n'est pas une tristesse : c'est un compte tenu correctement par deux personnes qui savent compter, dans un monde où ce genre de compte se solde généralement par un enfant mort.",
      extreme:"Ce n'est pas un renoncement, ce n'est pas une tristesse, et ce n'est surtout pas un sacrifice — le mot serait insultant pour tous les deux. C'est un compte tenu correctement, avec les quatre points sur la table, par deux personnes qui savent compter, dans un monde où ce genre de compte se solde ordinairement par un enfant de onze ans devant un village qui décide seul. Ils ont fait mieux que la plupart des gens. Ça ne rend pas les soirs plus légers." },
  ],
  effets:{ flags:['enf_non','a2_sans_enfant'],
           faire:() => { bouger('alycia', { relation:5, confiance:8, peur:-4 });
                         retenir('alycia', "on a compté ensemble et on a dit non tous les deux"); },
           marque:"Non, tous les deux, sur quatre points mauvais. « Beaucoup plus que je ne l'aurais cru. »",
           court:"Quatre points mauvais" },
  suite:'a2_carte', libelleSuite:"La carte" },

};

enregistrerScenes(LIBRE);

/* Les deux mariages libres et l'enfant s'ouvrent là où sont les personnes,
 * et seulement quand tous les axes le permettent — jamais sur le seul temps
 * passé ensemble. */
offrir({ id:'aly_epouser', lieu:'karlsberg', va:'aly_epouser',
         titre:"Un problème administratif", permanent:false,
         si:() => !a('aly_marie') && !a('el_epousee')
               && palierPossible('alycia', { relation:14, confiance:14, attirance:12 }).ok });

offrir({ id:'el_epouser', lieu:'aelthiriel', va:'el_epouser',
         titre:"Quatre-vingts ans contre quatre cents",
         si:() => !a('aly_marie') && !a('aly_epousee')
               /* Les axes d'Alarielle ne montent pas comme ceux d'une humaine :
                * son attirance plafonne bas parce que ses scènes portent
                * surtout la confiance. Les seuils suivent l'axe réel. */
               && palierPossible('alarielle', { relation:12, confiance:12, attirance:6, devoir:-4 }).ok });

offrir({ id:'enf_question', lieu:'karlsberg', va:'enf_question',
         titre:"Deux sur trois",
         si:() => (a('aly_epousee') || a('aly_amants') || a('ml_signe') || a('ml_termes') || a('ml_tacite'))
               /* Le chiffre « un sur trois » se sait par l'archive elfique, par
                * le maître d'armes ou par Ysabel elle-même : trois chemins. */
               && (a('a2_ne_transmet_pas_droit') || a('sa_gerbaud') || a('a2_ysabel_motif'))
               && palierPossible('alycia', { relation:12, confiance:10, attirance:10 }).ok });

entree2('aly_epouser', 'el_epouser', 'enf_question');

/* ═══════════════════════════════════════════════════════════════════════
 * ALARIELLE — DEUX CENT ONZE ANS, ET PERSONNE
 * ═══════════════════════════════════════════════════════════════════════
 * Ce n'est pas de la pudeur et ce n'est pas une vertu au sens où sa cour
 * l'entendrait : chez eux, ce qui n'est pas contracté n'existe pas, et
 * personne ne contracte avec une fille de la maison d'Eltharion sans y
 * mettre trois cents ans de conséquences. Elle a donc deux cent onze ans
 * et il ne s'est jamais rien passé — pas par refus, par arithmétique.
 *
 * Elle le dit elle-même, sans gêne et sans solennité, parce qu'elle a eu
 * deux siècles pour cesser d'en faire une affaire. Ce qui la met mal à
 * l'aise n'est pas l'acte : c'est de n'avoir rien à comparer.
 * ═══════════════════════════════════════════════════════════════════════ */

const ALARIELLE_NUIT = {

el_nuit:{
  qui:'alarielle',
  lieu:"Aelthiriel · le jardin fermé · la nuit",
  titre:"Deux cent onze ans",
  texte:[
    "Elle vous fait venir au jardin fermé un soir où il n'y a rien à discuter, ce qui n'est jamais arrivé.",
    { sobre:"« Je vais dire quelque chose et vous n'allez pas le prendre correctement. »",
      intense:"« Je vais dire quelque chose, et je vous demande à l'avance de ne pas le prendre comme les humains le prennent. » Elle reste debout. « Vous allez vouloir en faire une chose grave. Ce n'en est pas une. »",
      extreme:"« Je vais dire quelque chose, et je vous demande à l'avance de ne pas le prendre comme les humains le prennent toujours. » Elle reste debout, ce qui chez elle veut dire qu'elle a préparé la phrase et qu'elle veut pouvoir partir. « Vous allez vouloir en faire une chose grave, avec du respect dedans, et de la précaution. Ce n'en est pas une, et la précaution est exactement ce qui la rendrait insupportable. »" },
    "« Dites. »",
    "« Il ne s'est jamais rien passé. »",
    "§ Elle laisse ça, et elle voit très bien que vous ne comprenez pas de quoi elle parle.",
    { sobre:"« Jamais. Avec personne. Deux cent onze ans. »",
      intense:"« Jamais. Avec personne, en deux cent onze ans. » Elle a un geste d'impatience. « Et ce n'est pas de la vertu, ne me regardez pas comme ça — c'est de la comptabilité. »",
      extreme:"« Jamais. Avec personne. En deux cent onze ans. » Elle a un geste d'impatience, contre vous cette fois. « Et cessez immédiatement de me regarder comme ça, ce n'est pas de la vertu et ce n'est pas un sacrifice : c'est de la comptabilité. Chez nous, ce qui n'est pas contracté n'existe pas — je vous l'ai déjà expliqué et vous n'aviez pas fait le calcul jusqu'au bout. Personne ne contracte avec une fille de la maison d'Eltharion sans y mettre trois siècles de conséquences politiques. Alors on ne contracte pas. Et comme rien n'existe hors du contrat : rien. »" },
    "« Vous n'avez jamais voulu ? »",
    "« Bien sûr que si. » Elle le dit sèchement. « Onze fois. J'ai le compte, j'ai les dates, et j'ai les noms de quatre d'entre eux. Ça ne change rien à ce que je viens de vous dire. »",
    "§ Elle s'assoit enfin, et elle regarde le mur au lieu de vous.",
    { sobre:"« Ce qui me gêne, ce n'est pas ça. »",
      intense:"« Ce qui me gêne n'est pas ce que vous croyez. Ce n'est pas l'acte : à deux cent onze ans, on a lu, on a écouté, on n'est ignorante de rien. » Un temps. « C'est que je n'aurai rien à comparer. Jamais. Ce sera ça, et ce sera tout ce que j'aurai jamais su, pendant deux cents ans encore. »",
      extreme:"« Ce qui me gêne n'est pas du tout ce que vous imaginez, et c'est bien pour ça que je préférais le dire moi-même. Ce n'est pas l'acte : à deux cent onze ans, on a lu, on a écouté, on a vécu à trois pas de gens qui vivaient — je ne suis ignorante de rien et je ne serai pas effrayée. » Elle continue de regarder le mur. « C'est que je n'aurai rien à comparer. Jamais. Vous serez ça, et ce sera tout ce que j'en aurai su, et il me restera deux siècles pour y penser. Un humain a le temps de se tromper et de recommencer. Moi, ce que je décide ce soir a la même durée qu'une guerre. »" },
    "« Alors ne le décidez pas ce soir. »",
    "« J'y pense depuis quatre ans. »",
    "§ Elle se tourne enfin.",
    "« Ce n'est pas une faveur que je vous fais et je ne veux pas être remerciée. Ne dites rien. Vous allez dire quelque chose de correct et ça va tout abîmer. »",
  ],
  choix:[
    { t:"Ne rien dire",
      detail:"elle vient de le demander deux fois · c'est la seule chose à faire et c'est difficile",
      risque:"définitif", definitif:true, va:'el_nuit_oui' },

    { t:"« Alors dites-moi ce que vous voulez, précisément. »",
      detail:"deux cent onze ans à écouter et à lire · elle sait exactement ce qu'elle veut",
      risque:"calculé", va:'el_nuit_precis' },

    { t:"« Pas ce soir. »",
      detail:"quatre ans, ça peut faire cinq · et elle en a deux cents devant elle",
      risque:"prudent", va:'el_nuit_non' },
  ],
},

el_nuit_precis:{
  qui:'alarielle',
  titre:"Précisément",
  texte:[
    "@« Alors dites-moi ce que vous voulez. Précisément. »",
    { sobre:"Elle ne rougit pas. Les elfes ne rougissent pas.",
      intense:"Elle ne rougit pas — les elfes ne rougissent pas, c'est une des premières choses qu'on remarque et une des plus déstabilisantes — et elle répond avec une netteté qui vous laisse sur place.",
      extreme:"Elle ne rougit pas. Les elfes ne rougissent pas, c'est physiologique, et c'est l'une des premières choses qu'on remarque chez eux et l'une des plus déroutantes : il n'y a aucun signal, jamais, et il faut apprendre à s'en passer. Elle répond donc avec une netteté qui vous laisse complètement sur place — parce qu'elle y a pensé, longtemps, et qu'elle a eu deux cent onze ans pour cesser de trouver la question indécente." },
    { sobre:"Elle le dit. Sans détour, sans euphémisme, en quelques phrases très précises.",
      intense:"Elle le dit. Sans détour et sans un seul euphémisme — elle nomme les choses par leur nom, dans sa langue d'abord, puis dans la vôtre parce qu'elle veut être certaine d'être comprise, et c'est vous qui détournez les yeux le premier.",
      extreme:"Elle le dit. Sans détour et sans un seul euphémisme.\n\nElle nomme les choses par leur nom — dans sa langue d'abord, où elles ont apparemment des noms très anciens et pas du tout honteux, puis dans la vôtre, parce qu'elle veut être certaine d'être comprise et qu'elle a remarqué que les humains s'arrangent avec le vague. Elle dit ce qu'elle veut qu'on lui fasse. Elle dit dans quel ordre. Elle dit ce qu'elle veut essayer et ce qu'elle refuse d'emblée, et elle donne ses raisons, qui sont raisonnables.\n\nC'est vous qui détournez les yeux le premier, et elle le note, et elle a la délicatesse de ne pas commenter." },
    "« Vous êtes gêné », constate-t-elle. « Vous. »",
    "@« Je ne m'attendais pas à un inventaire. »",
    "« Vous m'avez demandé si j'étais sûre. Voilà à quoi ressemble quelqu'un de sûr. »",
    "§ Elle finit par : « Et je veux qu'il y ait de la lumière. Je ne veux pas de la nuit et du noir et du silence, comme si on faisait quelque chose de honteux. Ce sera la seule fois qu'il y aura une première fois. Je veux voir. »",
    { sobre:"Ça, ça ne se refuse pas.",
      intense:"Il n'y a rien à répondre à ça et elle le sait — c'est même pour ça qu'elle l'a gardé pour la fin.",
      extreme:"Il n'y a rigoureusement rien à répondre à ça, et elle le sait parfaitement : c'est pour cette raison qu'elle l'a gardé pour la fin, comme une clause qu'on place quand l'autre a déjà accepté le reste. Deux cent onze ans de cour elfique apprennent à négocier, même quand on jure qu'on ne négocie pas." },
  ],
  effets:{ flags:['el_nuit_precis'],
           faire:() => bouger('alarielle', { relation:4, confiance:5, attirance:6 }),
           marque:"« Ce sera la seule fois qu'il y aura une première fois. Je veux voir. »",
           court:"De la lumière" },
  suite:'el_nuit_oui', libelleSuite:"Il y a de la lumière" },

el_nuit_oui:{
  qui:'alarielle',
  lieu:"Aelthiriel · sa chambre",
  titre:"La seule fois qu'il y aura une première fois",
  texte:[
    () => a('el_nuit_precis')
      ? "Il y a de la lumière, comme elle l'a demandé : quatre lampes, et elle en allume une cinquième."
      : "Elle allume les lampes une par une, quatre, puis une cinquième, sans expliquer pourquoi et sans qu'on ait besoin de le lui demander.",
    { sobre:"Elle est plus calme que vous.",
      intense:"Elle est considérablement plus calme que vous, ce qui est humiliant et parfaitement logique : elle a eu quatre ans pour y penser et vous avez eu une heure.",
      extreme:"Elle est considérablement plus calme que vous, ce qui est humiliant sur le moment et parfaitement logique après coup : elle y pense depuis quatre ans, elle a répété la conversation, elle a décidé de la lumière, elle a même décidé du nombre de lampes. Vous avez eu une heure. C'est elle qui mène, du début à la fin, et pas une seconde par jeu." },
    { sobre:"Elle se déshabille elle-même, posément, et plie chaque pièce.",
      intense:"Elle se déshabille elle-même, posément, et plie chaque pièce sur le coffre parce qu'elle ne sait pas faire autrement. Puis elle se retourne et se tient là, sous cinq lampes, et attend que vous la regardiez, parce que c'était le sens de la lumière.",
      extreme:"Elle se déshabille elle-même. Posément, sans hâte et sans mise en scène, et elle plie chaque pièce sur le coffre au fur et à mesure parce qu'elle est incapable de faire autrement, même ce soir, même là.\n\nPuis elle se retourne et se tient debout au milieu de la chambre, sous cinq lampes, et attend. Elle est très pâle, très longue, sans une marque nulle part — pas une cicatrice, pas une trace, deux cent onze ans sans que rien ne l'entame — et cette absence est la chose la plus étrangère que vous ayez vue chez elle. Elle attend que vous la regardiez. C'était le sens de la lumière et elle ne compte pas vous laisser l'esquiver." },
    "« Vous pouvez regarder », dit-elle. « C'est le contraire d'une impolitesse. »",
    "§ Elle est curieuse plus que timide, et elle pose des questions au milieu, ce qui est déroutant et finit par être drôle.",
    { sobre:"Elle veut savoir ce qui se fait et pourquoi, et elle demande.",
      intense:"Elle veut savoir ce qui se fait, pourquoi, et si c'est comme ça pour tout le monde — et elle le demande au milieu, à voix haute, du ton dont elle interroge un archiviste sur une date. Il faut renoncer à en être troublé, sinon on ne fait rien.",
      extreme:"Elle veut savoir. Ce qui se fait, pourquoi, si c'est comme ça pour tout le monde, si c'est différent avec une humaine, ce que ça fait de votre côté à ce moment précis. Elle demande au milieu, à voix haute, du ton exact dont elle interroge un archiviste sur une date contestée, et elle attend une vraie réponse avant de continuer.\n\nIl faut renoncer très vite à en être troublé, sinon on ne fait rien du tout. Et une fois qu'on y a renoncé — une fois qu'on répond simplement, et qu'elle hoche la tête, et qu'elle applique — ça devient la chose la plus franche qui vous soit arrivée dans une chambre." },
    { sobre:"Il y a une seconde où elle a mal et où elle ne le cache pas.",
      intense:"Il y a un moment où elle a mal et où elle ne le cache pas, ne le minimise pas et ne le dramatise pas : elle le dit, elle attend, et elle reprend. C'est très elle.",
      extreme:"Il y a un moment où elle a mal. Elle ne le cache pas, ne le minimise pas, n'en fait aucune histoire : elle le dit à voix haute, du ton dont on signale un fait, elle attend ce qu'il faut attendre, et elle reprend là où on en était. C'est exactement la façon dont elle fait tout le reste — les archives, sa cour, son frère — et c'est la première fois que vous voyez ce trait s'appliquer à autre chose qu'à de la politique." },
    { sobre:"Elle a la peau plus froide qu'une humaine et se réchauffe très lentement.",
      intense:"Elle a la peau nettement plus froide qu'une humaine, ce qui n'était écrit nulle part et que personne ne vous avait dit, et elle se réchauffe très lentement — sous les mains, par plaques, comme de la pierre au soleil.",
      extreme:"Elle a la peau nettement plus froide qu'une humaine. Ce n'était écrit nulle part, personne ne vous l'avait dit, et vous passez les premières minutes à croire qu'elle a froid alors qu'elle est parfaitement bien. Elle se réchauffe très lentement, par endroits, sous les mains, comme de la pierre prise au soleil — et elle s'en aperçoit avant vous et trouve ça remarquable, et le dit." },
    "Et à un moment, elle ferme les yeux et cesse complètement de piloter.",
    { sobre:"Ça dure longtemps. C'est la seule fois où vous la voyez ne rien contrôler.",
      intense:"Ça dure longtemps, et elle est bruyante, ce à quoi rien ne préparait — ni ses quatre ans de retenue, ni sa cour, ni la langue précise dont elle se sert pour tout le reste. C'est la seule fois en quatre ans où vous la voyez ne rien contrôler du tout.",
      extreme:"Ça dure longtemps. Elle est bruyante et n'en a manifestement aucune conscience, ce à quoi rien ne préparait — ni ses quatre ans de retenue, ni les archives, ni la langue millimétrée dont elle se sert pour tout le reste, ni la façon dont elle tenait cette même chambre une heure plus tôt. Ses mains se referment sur ce qu'elles trouvent et ne se rouvrent pas avant la fin ; vous en aurez la marque quatre jours.\n\nC'est la seule fois, en quatre ans, où vous voyez Alarielle de Sylvanne ne rien contrôler du tout. Et quand elle rouvre les yeux, elle vous regarde exactement comme avant, ce qui est une performance en soi." },
    "§ Après, elle ne dort pas. Les elfes dorment peu et elle dort moins que les autres.",
    { sobre:"« Ce n'était pas ce que je croyais. »",
      intense:"« Ce n'était pas ce que je croyais », dit-elle dans le noir — elle a soufflé les lampes une par une, plus tard, en prenant son temps.\n\n« C'est-à-dire ? »\n\n« Je ne vous le dirai pas. » Un temps. « Pas par pudeur. Parce que je veux le garder entier, et que le raconter l'abîmerait, et que j'ai deux cents ans pour m'en souvenir. »",
      extreme:"« Ce n'était pas ce que je croyais », dit-elle dans le noir — elle a soufflé les cinq lampes une par une, beaucoup plus tard, en prenant son temps à chacune.\n\n« C'est-à-dire ? »\n\n« Je ne vous le dirai pas. » Elle n'a pas bougé. « Et pas par pudeur, vous savez très bien que ce n'est pas mon problème. Parce que je veux le garder entier. Tout ce qu'on raconte s'abîme un peu — on le dit une fois, puis deux, et à la quatrième c'est une anecdote et ce n'est plus la chose. J'ai deux cents ans devant moi pour m'en souvenir. Je ne vais pas commencer par le réduire à une phrase la nuit même. »" },
    "@« Vous regrettez ? »",
    "« Non », dit-elle immédiatement. « Et je vous préviens : c'est aussi ce que ma tante a répondu. »",
  ],
  effets:{ flags:['el_nuit','el_amants','a2_alarielle_liee'],
           faire:() => { bouger('alarielle', { relation:9, confiance:8, attirance:10, devoir:-2 });
                         retenir('alarielle', "il n'a rien dit de correct, ce que je lui avais demandé deux fois"); },
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous n'avez rien dit de correct" },
           marque:"Cinq lampes. « Je veux le garder entier. J'ai deux cents ans pour m'en souvenir. »",
           court:"Cinq lampes" },
  plusTard:"« Non, je ne regrette pas. Et je vous préviens : c'est aussi ce que ma tante a répondu. »",
  suite:'a2_carte', libelleSuite:"La carte" },

el_nuit_non:{
  qui:'alarielle',
  titre:"Pas ce soir",
  texte:[
    "« Pas ce soir. »",
    { sobre:"Elle encaisse mieux que vous.",
      intense:"Elle encaisse nettement mieux que vous, et elle a la bonté de ne pas le montrer plus d'une seconde.",
      extreme:"Elle encaisse nettement mieux que vous, ce qui est logique — elle a eu quatre ans pour envisager cette réponse aussi — et elle a la correction de ne laisser voir quelque chose qu'une seconde entière, ce qui chez elle est un aveu immense." },
    "« Pourquoi ? »",
    "« Parce que vous avez dit que ça durait comme une guerre. »",
    "§ Elle réfléchit, honnêtement, ce qu'elle fait toujours.",
    "« C'est un bon argument », dit-elle enfin. « Je vous le retournerai plus tard et vous n'aurez rien à répondre — mais ce soir, c'est un bon argument. »",
    "Elle se lève et souffle les lampes qu'elle n'avait pas encore allumées.",
    { sobre:"« Ne me le proposez pas, la prochaine fois. »",
      intense:"« Une chose, tout de même. » Elle s'arrête à la porte. « La prochaine fois, ne me proposez rien et ne décidez rien. Attendez que je revienne, et je reviendrai, parce que je ne fais jamais une chose à moitié. »",
      extreme:"« Une chose, tout de même, et retenez-la. » Elle s'arrête à la porte du jardin fermé. « La prochaine fois, ne me proposez rien, ne décidez rien, et surtout ne me protégez pas — c'est la deuxième fois que vous décidez à ma place en croyant bien faire, et je vous ai dit ce que ça me rappelle. Attendez simplement que je revienne. Je reviendrai. Je ne fais jamais une chose à moitié, c'est mon seul vrai défaut, et il m'a coûté beaucoup plus cher que le vôtre. »" },
  ],
  effets:{ flags:['el_nuit_reporte'],
           faire:() => bouger('alarielle', { confiance:4, attirance:-2, devoir:2 }),
           marque:"« Attendez que je revienne. Je ne fais jamais une chose à moitié. »",
           court:"Pas ce soir" },
  suite:'a2_carte', libelleSuite:"La carte" },

};

enregistrerScenes(ALARIELLE_NUIT);

offrir({ id:'el_nuit', lieu:'aelthiriel', va:'el_nuit',
         titre:"Elle vous fait venir au jardin fermé",
         si:() => !a('el_nuit') && !a('el_amants')
               && palierPossible('alarielle', { relation:10, confiance:10, attirance:5 }).ok });
