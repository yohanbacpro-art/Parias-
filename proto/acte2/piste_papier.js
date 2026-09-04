/* PARIAS — Acte II · LA PISTE DU PAPIER
 * ═══════════════════════════════════════════════════════════════════════
 * Ancelin Vasque, commissaire aux titres, cherche depuis onze ans qui a
 * raturé la ligne Karlsberg sans ordonnance jointe. Vous, vous avez un
 * cachet ancien vu par un sergent, et quatre lignes de la main de votre mère.
 *
 * Une maison est une inscription. C'est lui qui le dit, il le croit, et il a
 * raison — et c'est très exactement ce qui a tué sept cents personnes.
 * ═══════════════════════════════════════════════════════════════════════ */

const PAPIER = {

pa_chastel:{
  qui:'vasque',
  lieu:"Chastel · le bureau du commissaire aux titres",
  titre:"Une pièce sans fenêtre",
  texte:[
    "Le commissariat aux titres de Chastel occupe l'aile nord du bailliage, au deuxième étage, dans une enfilade de pièces sans fenêtre — parce que la lumière abîme l'encre, et parce qu'un homme qui travaille sans fenêtre travaille plus longtemps.",
    "Ancelin Vasque a quarante-cinq ans maintenant. Il n'a pas changé et il a l'air d'un homme qui n'a pas dormi depuis Ventôse.",
    () => a('as_nom_donne')
      ? "« Yohan de Karlsberg. » Il ne se lève pas et il ne feint pas la surprise. « Ligne quatorze du rôle de l'assise d'hiver de Cendrepont. Je l'ai lue quatre-vingts fois. »"
      : (a('as_silence_rôle')
        ? "« C'est vous. » Il ne se lève pas. « *Un homme, requérant, a défait le champion de l'assise. N'a pas déclaré de nom.* J'ai écrit ça de ma propre bouche et je le relis toutes les semaines depuis. »"
        : "« Je vous connais », dit-il, sans se lever. « Je ne sais pas d'où, ce qui n'arrive jamais, et j'ai passé l'hiver à chercher. »"),
    "§ Il y a onze piles sur sa table et aucune ne fait la même hauteur, ce qui chez lui est un système.",
    "« Vous avez quelque chose », dit-il. « Personne ne monte deux étages dans cette aile pour rien. »",
    "Vous posez ce que vous avez sur la table.",
    () => a('kar_registre')
      ? "Le registre de votre père. Quarante ans de correspondance entre onze maisons, brûlé sur un tiers à l'angle, et une dernière page de quatre lignes qui n'est pas de la même main."
      : "Ce que vous avez : un sergent de Mont-Draken qui a vu un cachet, et une liste de onze noms dont sept sont barrés.",
    { sobre:"Il met ses lunettes. Il ne les met que pour lire.",
      intense:"Il met ses lunettes — il ne les met que pour lire, jamais pour parler — et il lit pendant quarante minutes sans dire un mot ni lever la tête. À la fin il les retire et il les pose sur la table, verres en l'air.",
      extreme:"Il met ses lunettes — il ne les met que pour lire — et il lit pendant quarante minutes sans un mot, sans lever la tête, sans boire, en tournant les pages du bout de l'ongle pour ne pas les marquer. Quand il a fini il les retire, il les pose verres en l'air à côté d'un pot de graisse d'oie qui n'a rien à faire là, et il reste assis les mains à plat pendant une minute entière avant de parler." },
    "« Onze maisons », dit-il. « J'en avais neuf. »",
  ],
  effets:{ flags:['pa_chastel','pa_vasque_revu'],
           faire:() => { A2().pistes.papier = Math.max(A2().pistes.papier, 2); },
           marque:"Vasque avait neuf maisons sur onze. Il en a onze maintenant.", court:"Onze maisons" },
  suite:'pa_cachet', libelleSuite:"Le cachet" },

pa_cachet:{
  qui:'vasque',
  titre:"Le cachet",
  texte:[
    "« Un cachet ancien, une cire d'un rouge qu'on ne fait plus, le dessin mangé au milieu, et arrivé par le greffe de Chastel dans un pli de transmission il y a six ans. »",
    "« Vous pouvez le retrouver ? »",
    "« Bien sûr. » Il dit ça sans forfanterie. « Un pli de transmission se cote à l'arrivée et le registre d'arrivée se garde trente ans. Il me faut une date approximative et deux jours. »",
    "§ Il lui faut onze jours. Il ne s'excuse pas et il n'explique pas : il revient le onzième jour avec une chemise en carton et il s'assied en face de vous.",
    { sobre:"« Ce n'est pas un cachet de maison. C'est un cachet de cadet. »",
      intense:"« J'ai trouvé le pli. J'ai trouvé le cachet. Et j'ai passé six jours de plus à vérifier, parce que ce que j'avais trouvé était désagréable. »\n\nIl ouvre la chemise.\n\n« Ce n'est pas un cachet de maison, messire. C'est un **cachet de cadet**. »",
      extreme:"« J'ai trouvé le pli. J'ai trouvé le cachet. Puis j'ai passé six jours de plus à vérifier, parce que ce que j'avais trouvé était désagréable et que je n'ai pas pour habitude d'être désagréable sur une seule lecture. »\n\nIl ouvre la chemise et fait pivoter une feuille vers vous, du bout de deux doigts, sans la lâcher.\n\n« Ce n'est pas un cachet de maison. C'est un cachet de cadet. »" },
    "« Expliquez. »",
    "« Une maison a un sceau. Un seul, celui du chef, qui engage la maison. Mais les grandes maisons font tailler des cachets secondaires pour ceux qui n'héritent pas : les frères, les sœurs, les cadets. Ça ne vaut rien juridiquement — ça ne peut engager personne — et ça sert exactement à une chose. »",
    "« À quoi ? »",
    "§ « À écrire des lettres personnelles sans engager la maison. »",
    "Il fait pivoter la feuille.",
    "C'est un loup. Le même, de profil, la gueule fermée, encadré de deux traits verticaux — et sous le loup, à la place où le sceau du chef porte une devise, il y a un espace vide entouré d'un simple filet.",
    "« Le vide, c'est la marque du cadet. Ça veut dire : *de cette maison, mais pas cette maison.* »",
  ],
  effets:{ flags:['pa_cachet_cadet','pa_famille'],
           faire:() => { A2().pistes.papier = Math.max(A2().pistes.papier, 3); },
           exploit:{ eclat:3, temoins:'un', quoi:"le cachet de la liste est un cachet de cadet de Karlsberg" },
           marque:"La liste des Parias est arrivée à Mont-Draken sous un cachet de cadet de Karlsberg.",
           court:"Le cachet de cadet" },
  suite:'pa_quatre', libelleSuite:"Quatre lignes" },

pa_quatre:{
  qui:'vasque',
  titre:"Trois fonctions et une personne",
  texte:[
    "« Vous avez quatre lignes », dit-il. « Trois fonctions et une personne. Un cachet de cadet élimine les trois fonctions. »",
    "« Un intendant peut voler un cachet. »",
    { sobre:"« Non. Pas celui-là, et pas pendant six ans. »",
      intense:"« Il peut le voler. Il ne peut pas le **porter**. » Il retire ses lunettes. « Un cachet de cadet, messire, n'a aucune valeur juridique — donc personne ne le vérifie, donc personne ne le vole. Ce qu'on vole a de la valeur. Ce cachet-là n'en a qu'une : sentimentale, pour la personne à qui il a été taillé. »",
      extreme:"« Il peut le voler. Il ne peut pas le porter pendant six ans. » Il retire ses lunettes et les pose. « Un cachet de cadet n'a aucune valeur juridique : il n'engage rien, il ne prouve rien, aucun greffe ne le vérifie. Donc personne ne le vole — on vole ce qui a de la valeur. Ce cachet-là n'en a qu'une seule, et elle est sentimentale : celle de la personne à qui il a été taillé, à qui on a expliqué à douze ans qu'elle n'hériterait pas, et qui a gardé pendant quarante ans un morceau d'argent qui dit *de cette maison, mais pas cette maison.* »" },
    "§ *Ma sœur.*",
    "« Il me faut le nom », dit-il. « Pas pour vous : pour la contradiction du volume cent-quarante-trois, qui est instruite depuis six mois et qui va être jugée. Il me faut une personne. »",
    "« Je ne l'ai pas. J'avais neuf ans. »",
    "« Je sais. » Il range la chemise. « Alors je vais vous dire ce que je peux faire, et ce que je ne peux pas. »",
    "« Ce que vous pouvez. »",
    "« Un cachet a été taillé par quelqu'un. Un tailleur de sceaux tient un registre — c'est une profession réglementée, ils tiennent tous un registre, et le registre se garde. Il y a onze tailleurs de sceaux dans les quatre provinces. Je peux écrire aux onze. »",
    "« Et ce que vous ne pouvez pas ? »",
    "§ « Vous accompagner. J'ai quarante-cinq ans, une commission à instruire, et je ne suis pas un homme d'armes. Ce que je fais tient dans une pièce sans fenêtre, et ce qui vient après tient ailleurs. »",
    "« Vous pourriez ne rien faire du tout. »",
    "« Oui. » Il remet ses lunettes pour lire une autre pile. « J'ai onze ans de retard, messire. Je ne vais pas en prendre douze. »",
  ],
  effets:{ flags:['pa_soeur','pa_tailleurs'],
           faire:() => { A2().pistes.papier = 4; },
           exploit:{ eclat:4, temoins:'un', quoi:"un commissaire aux titres écrit à onze tailleurs de sceaux pour vous" },
           marque:"Le cachet est celui d'un cadet de Karlsberg. Il ne reste qu'une des quatre lignes : sa sœur.",
           court:"Sa sœur" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* La réponse arrive deux saisons plus tard, où que l'on soit. */
pa_lettre:{
  qui:'vasque',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"La onzième réponse",
  texte:[
    "La lettre vous suit pendant deux saisons et vous rattrape là où vous êtes, parce qu'un commissaire aux titres qui cherche quelqu'un le trouve — c'est son métier et c'est le seul qu'il sache faire.",
    "Elle est courte. Il n'écrit jamais long.",
    "*Messire,*",
    "*Onze tailleurs de sceaux. Neuf réponses négatives, une maison fermée depuis douze ans, et une réponse.*",
    { sobre:"*Maître Ombelin, à Fort-aux-Princes. Registre de la 141ᵉ année, folio 44.*",
      intense:"*Maître Ombelin, tailleur de sceaux à Fort-aux-Princes, registre de la cent-quarante-et-unième année, folio quarante-quatre : un cachet de cadet, maison de Karlsberg, loup au filet vide, commandé et payé par le chef de maison pour sa sœur cadette.*",
      extreme:"*Maître Ombelin, tailleur de sceaux à Fort-aux-Princes, registre de la cent-quarante-et-unième année, folio quarante-quatre. Un cachet de cadet, maison de Karlsberg, loup de profil au filet vide, argent, commandé et payé par le chef de maison pour sa sœur cadette. Le registre porte la date, le prix — onze couronnes — et le nom, parce qu'un tailleur de sceaux inscrit toujours le nom : c'est ce qui distingue un artisan d'un faussaire.*" },
    "§ *Ysabel de Karlsberg. Née la cent-cinquième année. Elle aurait aujourd'hui cinquante-neuf ans.*",
    "*Je ne l'ai pas cherchée. Ce n'est pas mon métier et je ne l'aurais pas trouvée : les commissaires aux titres trouvent des inscriptions, pas des gens.*",
    "*Une dernière chose, et je vous la dis parce que vous en ferez ce que vous voudrez et que ça ne me regarde plus.*",
    "*Onze ans que je cherche qui a raturé cette ligne. Je pensais trouver un crime d'administration. J'ai trouvé une lettre de famille.*",
    "*A. V.*",
  ],
  effets:{ flags:['pa_ysabel','a2_nom_trouve'],
           faire:() => { A2().pistes.papier = 5; },
           exploit:{ eclat:5, temoins:'aucun', quoi:"vous avez le nom" },
           marque:"Ysabel de Karlsberg, sœur cadette, soixante-quatre ans. C'est elle qui a écrit à Chastel.",
           court:"Ysabel" },
  suite:'a2_carte', libelleSuite:"La carte" },

};
enregistrerScenes(PAPIER);

offrir({ id:'pa_chastel', lieu:'chastel', va:'pa_chastel',
         titre:"Le commissaire aux titres",
         si:() => a('kar_coffre') || a('a2_cachet') });
offrir({ id:'pa_lettre', lieu:'chastel', va:'pa_lettre',
         titre:"Une lettre vous attend",
         si:() => a('pa_tailleurs') });
