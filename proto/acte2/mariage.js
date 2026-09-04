/* PARIAS — Acte II · L'ÉPOUSE, ET CE QU'ON FAIT DE L'AUTRE
 * ═══════════════════════════════════════════════════════════════════════
 * Un mariage de maison n'est pas une fin de romance : c'est un contrat entre
 * deux maisons, signé par deux adultes qui savent tous les deux ce qu'ils
 * signent. L'épouse de Yohan n'est ni une victime ni une récompense — c'est
 * une femme de vingt-six ou vingt-neuf ans qui a fait son propre calcul, qui
 * l'écrit noir sur blanc, et qui a ses propres objectifs.
 *
 * Ensuite vient la question que ces provinces règlent depuis quatre cents
 * ans avec une hypocrisie parfaitement organisée : on peut garder quelqu'un.
 * C'est admis, c'est courant, ça a un nom, des usages et des limites — et
 * ça se paie, autrement qu'en scandale.
 *
 * TROIS FEMMES ADULTES, TROIS VOLONTÉS QUI NE SE PLIENT PAS :
 *
 *   L'ÉPOUSE     n'est pas dupe et ne le sera jamais. Elle peut accepter,
 *                négocier ses propres termes, ou refuser — et son refus n'est
 *                pas une crise de jalousie : c'est une clause de contrat.
 *   ALYCIA       est une Paria. Être la maîtresse d'un homme marié, c'est
 *                dépendre — sa peur monte, pas son attirance. Elle peut dire
 *                non pour cette seule raison, et elle a raison.
 *   ALARIELLE    a un peuple. Ce que la province appelle une maîtresse, sa
 *                cour appelle autrement, et son frère y verra une arme.
 *
 * Aucune ne se gagne. Chacune peut refuser sans que rien ne baisse, et il y
 * a toujours une porte pour ne rien demander du tout.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Qui est l'épouse, selon la maison qui a écrit. */
const EPOUSE = () => a('a2_couronne_caleb')
  ? { id:'ysore', nom:"Ysoré de Fort-aux-Princes", age:"vingt-six ans",
      quoi:"nièce de Caleb · veuve d'un premier mariage sans enfant",
      maison:"Fort-aux-Princes", oncle:"Caleb" }
  : { id:'livia', nom:"Livia Furia", age:"vingt-neuf ans",
      quoi:"cousine de la maison Furia · un nom qui remonte plus haut que la Purge",
      maison:"Astrah", oncle:"Lucius" };

const MARIAGE = {

/* ══ ELLE ARRIVE ══════════════════════════════════════════════════════════ */
ma_arrivee:{
  qui:'epouse',
  lieu:() => `Karlsberg · ${dateA2()}`,
  titre:"Celle qui a signé l'autre moitié",
  texte:[
    () => { const e = EPOUSE();
      return `${e.nom}, ${e.age}, arrive aux Marches Grises avec quatre chariots, deux servantes, un intendant et une malle de papiers.`; },
    { sobre:"Elle regarde les murs avant de regarder l'homme.",
      intense:"Elle descend de voiture, regarde les murs sur toute leur longueur, compte quelque chose, et ne se tourne vers vous qu'après.",
      extreme:"Elle descend de voiture, fait trois pas, et regarde les murs sur toute leur longueur en comptant visiblement quelque chose — les toises, ou les hommes sur le chantier, ou les deux. Elle ne se tourne vers vous qu'après, et pas par froideur : parce qu'un mur ne bouge pas et qu'un homme, si. Elle a hiérarchisé ses observations." },
    "« Il y a moins que ce qu'on m'avait dit », dit-elle. « Et plus que ce que je craignais. »",
    "« On vous avait dit quoi ? »",
    "« Un château. » Elle remonte son manteau. « Il y a un chantier. Ce n'est pas la même chose et ce n'est pas plus mal : dans un château, tout est décidé depuis deux cents ans. »",
    "§ La malle de papiers est ce qui compte.",
    "Elle contient : le contrat en onze pages, deux états de dot, un plan d'assolement qu'elle a fait établir elle-même, la correspondance de sa maison sur trois ans — et une note de sa main, quatre pages, intitulée *Ce que je compte faire*.",
    "Elle vous la tend le premier soir, avant tout le reste.",
    "« Lisez-la maintenant. Je préfère les désaccords tôt. »",
  ],
  effets:{ flags:['ma_arrivee'],
           faire:() => { const C = CHANTIER(); C.grain += 6; C.faveurs += 2;
                         const e = EPOUSE(); GENS.epouse.nom = e.nom; GENS.epouse.role = e.quoi; },
           marque:"L'épouse est arrivée avec quatre chariots et une note de quatre pages intitulée « Ce que je compte faire ».",
           court:"La malle" },
  choix:[
    { t:"Lire les quatre pages devant elle",
      detail:"c'est ce qu'elle demande · et ce qu'elle observe",
      risque:"prudent", va:'ma_note' },
    { t:"« Dites-le-moi plutôt. »",
      detail:"la faire parler · une note écrite se relit, une parole s'engage",
      risque:"calculé", va:'ma_dire' },
  ],
},

ma_note:{
  qui:'epouse',
  titre:"Ce qu'elle compte faire",
  texte:[
    "Quatre pages, d'une écriture serrée, sans une rature.",
    "**Une.** Elle prend l'intendance. Pas la gestion du chantier — l'intendance : les comptes, les baux, les greniers, le registre des feux du bourg. « Vous bâtissez. Quelqu'un doit tenir. Vous ne pouvez pas faire les deux et vous êtes mauvais pour le second. »",
    "**Deux.** Elle veut deux enfants, pas plus, et elle dit pourquoi en trois lignes cliniques qui n'appellent aucun commentaire.",
    "**Trois.** Elle veut que le bourg ait un four banal et une école. « Un domaine où l'on ne sait pas lire est un domaine qu'on peut voler par écrit. Ma maison l'a fait onze fois. »",
    "§ **Quatre.** Et la quatrième page traite de vous, en deux paragraphes.",
    { sobre:"« Je sais ce que vous êtes », est-il écrit.",
      intense:"*Je sais ce que vous êtes. Mon oncle me l'a dit avant que je signe, parce qu'il est honnête en affaires, et j'ai signé après.*",
      extreme:"*Je sais ce que vous êtes. Mon oncle me l'a dit avant que je signe — il est parfaitement honnête en affaires, c'est même sa seule vertu et elle est réelle — et j'ai signé après, en connaissance de cause, ce qui devrait vous éviter de vous demander pendant deux ans si vous devez me le dire.*" },
    "*Je n'en pense rien. Ce n'est pas de l'indifférence : je n'ai pas d'opinion, faute d'éléments, et je n'en aurai que quand j'aurai vu ce que ça fait dans une maison.*",
    "*Le second paragraphe est plus désagréable et je le mets par écrit pour ne pas avoir à le dire.*",
    "*Si vous devez garder quelqu'un, dites-le-moi, et dites-le-moi avant que je l'apprenne. Ce n'est pas une permission : c'est un délai de préavis, et il est la seule chose que je vous demande personnellement dans tout ce contrat.*",
    "§ Elle vous regarde lire les deux paragraphes. Elle sait à quelle ligne vous en êtes.",
    "« Vous êtes très direct », dites-vous.",
    "« Je suis lisible », corrige-t-elle. « C'est un choix, il m'a coûté un premier mariage, et je ne reviendrai pas dessus. »",
  ],
  effets:{ flags:['ma_note','ma_preavis'],
           faire:() => { ETAT.faits.push("« Si vous devez garder quelqu'un, dites-le-moi avant que je l'apprenne. »"); },
           marque:"Elle sait ce que vous êtes ; son oncle le lui a dit avant la signature. Elle demande un préavis, pas une permission.",
           court:"Quatre pages" },
  suite:'ma_apres', libelleSuite:"Les premiers mois" },

ma_dire:{
  qui:'epouse',
  titre:"De vive voix",
  texte:[
    "@« Dites-le-moi plutôt. »",
    { sobre:"Elle range la note. Ça ne la gêne pas.",
      intense:"Elle range la note dans la malle sans la relire, ce qui veut dire qu'elle la connaît par cœur, ce qui veut dire qu'elle l'a écrite plus d'une fois.",
      extreme:"Elle range la note dans la malle sans un regard, ce qui veut dire qu'elle la sait par cœur, ce qui veut dire qu'elle l'a écrite plus d'une fois — trois ou quatre versions, probablement, pendant les onze semaines de voyage et les deux ans de correspondance. Elle n'a pas l'air contrariée. Elle a l'air d'ajuster une méthode." },
    "« Bien. Alors debout, et sans les phrases polies, parce qu'elles m'ennuient et que nous allons vivre longtemps ensemble. »",
    "Elle dit tout en quatre minutes : l'intendance, deux enfants, le four banal, l'école.",
    "Puis elle s'arrête.",
    "« Il y a une cinquième chose et je préférais l'écrire. »",
    "« Dites-la. »",
    { sobre:"« Si vous devez garder quelqu'un, dites-le-moi avant que je l'apprenne. »",
      intense:"« Si vous devez garder quelqu'un, dites-le-moi. Avant que je l'apprenne, pas après. » Elle soutient votre regard sans effort. « Ce n'est pas une permission, ne vous méprenez pas. C'est un préavis. »",
      extreme:"« Si vous devez garder quelqu'un, dites-le-moi. Avant que je l'apprenne — pas après, pas quand une servante me l'aura dit, pas quand la province en rira. » Elle soutient votre regard sans le moindre effort apparent, et vous comprenez que c'est la phrase pour laquelle elle a fait onze semaines de route. « Ce n'est pas une permission, ne vous y trompez pas une seconde. Je ne vous en donne aucune et je n'en ai pas à donner. C'est un préavis, et c'est la seule chose que je demande pour moi dans onze pages de contrat. »" },
    "« Pourquoi ? »",
    "« Parce que mon premier mari ne me l'a pas donné, que je l'ai appris par sa sœur, et que ce n'est pas la chose elle-même qui m'a fait quelque chose. »",
    "§ Elle n'en dit pas plus, ni ce soir-là ni jamais.",
  ],
  effets:{ flags:['ma_dit','ma_preavis'],
           faire:() => { ETAT.faits.push("« Ce n'est pas la chose elle-même qui m'a fait quelque chose. »"); },
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous l'avez fait parler au lieu de la lire" },
           marque:"Elle a demandé un préavis, debout, sans phrases polies. Son premier mari ne le lui avait pas donné.",
           court:"Le préavis" },
  suite:'ma_apres', libelleSuite:"Les premiers mois" },

ma_apres:{
  qui:'epouse',
  lieu:() => `Karlsberg · ${dateA2()}`,
  titre:"Ce que ça fait dans une maison",
  texte:[
    "Onze mois.",
    { sobre:"Elle tient. C'est le mot exact.",
      intense:"Elle tient, au sens où un intendant tient : les comptes sont justes, les baux sont écrits, le registre des feux est à jour, et le grain ne disparaît plus entre le champ et le grenier.",
      extreme:"Elle tient, au sens strict et technique où un intendant tient une maison. Les comptes sont justes au sou. Les baux sont écrits, datés et déposés. Le registre des feux du bourg est à jour au mois. Le grain a cessé de disparaître entre le champ et le grenier — il en disparaissait un cinquième et personne ne s'en était aperçu, y compris vous, y compris pendant deux ans." },
    "§ Le four banal est bâti en Thermidor. L'école ouvre en Brumaire, avec onze élèves et un ancien clerc de Chastel qui n'avait plus de place nulle part.",
    "Vous ne vous aimez pas. Vous ne vous détestez pas non plus, et ce n'est ni triste ni cynique : vous vous respectez et vous travaillez bien ensemble, ce qui est plus rare qu'un mariage d'amour et dure notablement plus longtemps.",
    "Elle rit trois fois en onze mois, toujours de choses administratives.",
    () => { const l = lien('alycia'), e = lien('alarielle');
      if(l.relation >= 8 || e.relation >= 8)
        return "§ Et il y a quelqu'un d'autre, qui n'est pas partie, qui ne partira pas, et à qui vous n'avez rien dit non plus.";
      return "§ Il n'y a personne d'autre. C'est une position, elle est tenable, et elle n'a rien de facile."; },
  ],
  effets:{ flags:['ma_installee','a2_maison_alliee','a2_intendance'],
           faire:() => { const C = CHANTIER(); C.grain += 4; C.faveurs += 1; },
           exploit:{ eclat:6, temoins:'quelques', quoi:"un four banal, une école, et des comptes justes" },
           marque:"Onze mois. Un four banal, une école à onze élèves, et un cinquième du grain qui ne disparaît plus.",
           court:"L'intendance" },
  choix:[
    { t:"Lui parler d'Alycia",
      detail:"le préavis · avant qu'elle l'apprenne, comme elle l'a demandé",
      si:() => lien('alycia').relation >= 8,
      risque:"définitif", va:'ma_preavis_alycia' },

    { t:"Lui parler d'Alarielle",
      detail:"le préavis · et il faudra expliquer ce qu'est une elfe de cette maison",
      si:() => lien('alarielle').relation >= 8,
      risque:"définitif", va:'ma_preavis_alarielle' },

    { t:"Ne rien dire",
      detail:"il n'y a peut-être rien à dire · et elle a été très précise sur ce point",
      risque:"dangereux", va:'ma_rien' },

    { t:"Il n'y a personne d'autre",
      detail:"et c'est vrai · ce qui est plus rare que le contraire",
      si:() => lien('alycia').relation < 8 && lien('alarielle').relation < 8,
      risque:"prudent", va:'ma_seul' },
  ],
},

/* ══ LE PRÉAVIS ═══════════════════════════════════════════════════════════
 * On le donne à l'épouse. Ce n'est pas une permission ; c'est ce qui décide
 * si la maison tient. Elle répond en femme adulte qui a un contrat. */
ma_preavis_alycia:{
  qui:'epouse',
  titre:"Le préavis",
  texte:[
    "Vous le dites un soir de Frimaire, dans la salle basse, sans préparer.",
    "@« Il y a quelqu'un. »",
    { sobre:"Elle pose sa plume.",
      intense:"Elle pose sa plume dans l'encrier, referme le registre des feux sur son doigt, et attend. Elle ne demande pas qui.",
      extreme:"Elle pose sa plume dans l'encrier, referme le registre des feux du bourg sur son doigt pour ne pas perdre sa page, et attend. Elle ne demande pas qui. C'est la première chose que vous remarquez et c'est la plus étrange : la question évidente ne vient pas, et il faut un moment pour comprendre qu'elle ne vient pas parce qu'elle est déjà répondue depuis longtemps." },
    "« Alycia de Callensbourg », dit-elle. « Oui. »",
    "« Vous saviez. »",
    "« Depuis Prairial. Une maison de trente feux ne cache rien à son intendante, et je suis l'intendante. » Elle repousse le registre. « Je vous ai laissé onze mois pour me le dire. C'est plus que le délai d'usage et beaucoup moins que ce que la plupart des hommes prennent. »",
    "§ Elle ne pleure pas, ne crie pas, et ne fait aucune des choses que la province attend d'une épouse.",
    "Elle prend une feuille et écrit trois lignes.",
    "**Une.** « Jamais sous ce toit. Le bourg, une maison de la vallée, ailleurs — pas ici. Ce n'est pas de la pudeur : trente feux nous regardent et une maison qu'on ne respecte pas ne se fait pas payer ses baux. »",
    "**Deux.** « Elle n'a aucun rang, aucune préséance, aucune voix aux comptes. Si un jour elle décide de quoi que ce soit qui touche à l'intendance, je pars le lendemain avec ma dot et vous perdez le grain de trois vallées. »",
    "**Trois.** « Nos deux enfants d'abord. Après quoi vous ferez ce que vous voulez et je ferai ce que je veux. »",
    "@« La troisième est nouvelle. »",
    { sobre:"« Oui. »",
      intense:"« Oui. » Elle ne développe pas. « Vous avez signé onze pages, messire, et j'ai signé les mêmes. Elles n'étaient pas plus favorables de mon côté que du vôtre. »",
      extreme:"« Oui. » Elle ne développe pas d'un mot, et son visage n'exprime absolument rien. « Vous avez signé onze pages. J'ai signé les mêmes onze pages. Elles n'étaient pas plus favorables de mon côté que du vôtre — vous avez peut-être cru le contraire, les hommes le croient toujours. Alors non, je ne vais pas développer, et vous ne me le demanderez pas deux fois. »" },
    "Elle pousse la feuille. Trois lignes, et une place pour deux signatures.",
  ],
  effets:{ flags:['ma_preavis_donne'],
           faire:() => ETAT.faits.push("Trois lignes de l'épouse : jamais sous ce toit, aucun rang, et les deux enfants d'abord."),
           marque:"Elle savait depuis Prairial. Elle a écrit trois lignes et laissé la place pour deux signatures.",
           court:"Trois lignes" },
  choix:[
    { t:"Signer les trois",
      detail:"c'est un contrat · comme les onze pages, comme le reste",
      risque:"définitif", ferme:"Ferme : l'idée que cette maison marche autrement qu'au contrat",
      definitif:true, va:'ma_termes' },
    { t:"« Alors il n'y aura personne. »",
      detail:"choisir l'épouse · et le lui dire à elle avant de le dire à l'autre",
      risque:"définitif", ferme:"Ferme : ce qui restait possible avec Alycia",
      definitif:true, va:'ma_choisit_epouse' },
    { t:"Refuser la deuxième ligne",
      detail:"Alycia ne prendra jamais un rang · mais elle décidera de choses",
      risque:"calculé", va:'ma_ligne_deux' },
  ],
},

ma_preavis_alarielle:{
  qui:'epouse',
  titre:"Le préavis, et une difficulté de vocabulaire",
  texte:[
    "@« Il y a quelqu'un. »",
    "Elle pose sa plume. Elle ne demande pas qui — et cette fois elle se trompe.",
    "« Alycia de Callensbourg. »",
    "« Non. »",
    { sobre:"Ça, ça l'arrête.",
      intense:"Ça, ça l'arrête net. C'est la première fois en onze mois que vous la voyez ne pas savoir quelque chose.",
      extreme:"Ça l'arrête net, et c'est un spectacle : c'est la première fois en onze mois que vous voyez cette femme ne pas savoir quelque chose sur sa propre maison. Elle repasse visiblement en revue tout ce qu'elle croyait tenir, et elle ne trouve pas, et elle déteste ça." },
    "@« Alarielle. »",
    "Silence long.",
    "« L'elfe. »",
    "« Oui. »",
    "« Celle d'Aelthiriel. Celle dont le frère est Tyrion. » Elle se lève et fait deux pas. « Messire, avez-vous la moindre idée de ce que ça veut dire, ou est-ce que vous avez fait ça sans y penser ? »",
    "§ « Les deux », dites-vous, et c'est la vérité.",
    "Elle rit — une seule fois, sans gaieté, et c'est la quatrième fois en onze mois.",
    { sobre:"« Il n'y a pas de mot pour ça », dit-elle.",
      intense:"« Le problème est qu'il n'y a pas de mot pour ça », dit-elle. « Une maîtresse, la province sait ce que c'est : il y a des usages, une place à table, un rang qu'on ne dépasse pas. Une elfe de la cour d'Eltharion, la province ne sait pas. »",
      extreme:"« L'empêchement n'est pas de morale. Il est d'écriture, et c'est bien pire. » Elle compte sur ses doigts, comme son oncle. « Une maîtresse, la province sait ce que c'est. Il y a un mot, des usages vieux de trois cents ans, une place à table, un rang qu'on ne dépasse pas, une façon de la nommer dans les actes. Tout le monde sait quoi faire. Une elfe de la maison d'Eltharion, sœur du prince Tyrion, dans une maison humaine relevée depuis cinq ans — il n'y a **pas de mot**. Et quand il n'y a pas de mot, messire, chacun met le sien, et je vous garantis que celui de Mont-Draken ne sera pas le mien. »" },
    "Elle se rassoit et prend une feuille.",
    "« Bien. Puisque personne n'a de mot, nous allons en écrire un. C'est très exactement mon métier. »",
    "**Une.** « Elle est reçue à Karlsberg comme envoyée d'Aelthiriel, avec les honneurs dus à une cour étrangère. Pas comme autre chose. Jamais nommée autrement dans un acte. »",
    "**Deux.** « Ce qu'elle est par ailleurs ne se dit pas, ne s'écrit pas, et ne se nie pas non plus. La province supposera ; qu'elle suppose. On ne se défend pas d'une chose qu'on n'a pas déclarée. »",
    "**Trois.** « Et si sa cour s'en sert contre nous — et son frère s'en servira — c'est vous qui irez le dire à Aelthiriel, pas moi. »",
  ],
  effets:{ flags:['ma_preavis_donne','ma_elfe'],
           faire:() => { bouger('alarielle', { devoir:-2 });
                         ETAT.faits.push("« Quand il n'y a pas de mot, chacun met le sien. »"); },
           marque:"Reçue comme envoyée d'Aelthiriel, jamais nommée autrement. « On ne se défend pas d'une chose qu'on n'a pas déclarée. »",
           court:"Pas de mot" },
  choix:[
    { t:"Signer les trois",
      detail:"une fiction diplomatique tenue par écrit · c'est ce qui tient les maisons",
      risque:"définitif", ferme:"Ferme : la simplicité de vos rapports avec Aelthiriel",
      definitif:true, va:'ma_termes' },
    { t:"« Alors il n'y aura personne. »",
      detail:"choisir l'épouse · et aller le dire à Aelthiriel soi-même",
      risque:"définitif", ferme:"Ferme : ce qui restait possible avec Alarielle",
      definitif:true, va:'ma_choisit_epouse' },
    { t:"« Je ne mentirai pas sur elle. »",
      detail:"refuser la fiction · et prendre le scandale en face",
      risque:"dangereux", ferme:"Ferme : la paix de votre épouse dans sa propre maison",
      va:'ma_franc' },
  ],
},

ma_rien:{
  qui:'epouse',
  titre:"Onze mois de plus",
  texte:[
    "Vous ne dites rien.",
    { sobre:"Elle l'apprend en Ventôse, par une servante.",
      intense:"Elle l'apprend en Ventôse, par une servante, qui le tenait d'un charretier, qui l'avait vu à une étape. Exactement comme la première fois.",
      extreme:"Elle l'apprend en Ventôse par une servante de dix-sept ans, qui le tenait d'un charretier de la vallée, qui avait vu quelque chose à une étape et l'avait raconté à l'auberge parce que c'est ce qu'on fait à l'auberge. Exactement, dans le détail, comme la première fois — sa sœur, à l'époque, avait entendu ça d'une couturière." },
    "Elle ne vous en parle pas.",
    "§ Elle ne vous en parlera jamais, et c'est ça, la sanction : il n'y a pas de scène, pas de reproche, pas une seule conversation.",
    "Ce qui change tient en trois choses, et il faut six mois pour les voir toutes.",
    "**Une.** Les comptes restent parfaits et cessent d'être commentés. Elle les dépose sur la table, à l'heure, et sort.",
    "**Deux.** Elle écrit à sa maison deux fois plus souvent qu'avant, et vous ne lisez plus ses lettres parce qu'elle les scelle désormais.",
    "**Trois.** Le contrat prévoit deux enfants. Il y en aura deux, et pas un jour de plus que le contrat.",
    { sobre:"Elle tient sa parole à la lettre. Rien qu'à la lettre.",
      intense:"Elle tient sa parole à la lettre, et rien qu'à la lettre, ce qui dans une maison est une forme de guerre parfaitement légale et absolument imparable.",
      extreme:"Elle tient sa parole à la lettre et rien qu'à la lettre. C'est une forme de guerre parfaitement légale, absolument imparable, et dont il n'existe aucun remède : personne ne peut lui reprocher quoi que ce soit, jamais, devant qui que ce soit. Elle a onze pages de contrat et elle les exécute. Ce qu'elle avait donné en plus — et il y en avait beaucoup, vous vous en apercevez seulement maintenant — a été retiré en une saison, sans un mot." },
    "Vous avez perdu quelque chose que vous n'aviez pas remarqué que vous aviez.",
  ],
  effets:{ flags:['ma_tu','a2_epouse_froide'],
           faire:() => { const C = CHANTIER(); C.faveurs = Math.max(0, C.faveurs - 2);
                         retenir('caleb', "sa femme m'écrit deux fois plus souvent qu'avant, et elle scelle"); },
           marque:"Elle l'a appris par une servante, comme la première fois. Elle n'en a jamais parlé. Elle tient sa parole à la lettre.",
           court:"À la lettre" },
  plusTard:"Elle écrit à sa maison deux fois par mois et elle scelle. Quelqu'un lit ces lettres à l'autre bout.",
  suite:'a2_carte', libelleSuite:"La carte" },

ma_seul:{
  qui:'epouse',
  titre:"Personne",
  texte:[
    "@« Il n'y a personne d'autre. »",
    { sobre:"Elle vous regarde un moment.",
      intense:"Elle vous regarde un moment, comme on vérifie un compte, et vous laissez faire.",
      extreme:"Elle vous regarde un moment sans rien dire, exactement comme elle regarde une colonne de chiffres qui tombe juste du premier coup — avec méfiance, parce que dans son expérience les colonnes qui tombent juste du premier coup cachent en général une erreur de report." },
    "« Bien », dit-elle enfin.",
    "« Vous ne me croyez pas ? »",
    "« Si. C'est ça qui me gêne. » Elle referme le registre. « Je m'étais préparée à l'autre conversation. J'ai onze mois de phrases prêtes et je vais devoir les jeter. »",
    "§ Elle a un geste vague vers la salle, le chantier, les murs.",
    "« Alors ce sera plus simple », dit-elle, « et plus lent. »",
    "« Plus lent ? »",
    "« Deux personnes qui n'ont personne d'autre finissent par se parler. Ça prend des années et ça ne ressemble à rien de ce qu'on raconte. » Elle se lève, prend sa chandelle. « Bonne nuit, messire. Les baux de la vallée basse sont sur la table, il en manque deux signatures. »",
    "Il faudra quatre ans. Ce n'est pas une romance : c'est deux personnes intelligentes enfermées dans le même travail, qui finissent par préférer la compagnie l'une de l'autre à toute autre, sans jamais l'avoir décidé ni dit.",
  ],
  effets:{ flags:['ma_seul','a2_epouse_proche'],
           faire:() => { const C = CHANTIER(); C.faveurs += 2; C.grain += 3; },
           exploit:{ eclat:3, temoins:'aucun', quoi:"il n'y a personne d'autre, et c'est vrai" },
           marque:"« Deux personnes qui n'ont personne d'autre finissent par se parler. Ça prend des années. »",
           court:"Plus lent" },
  suite:'a2_carte', libelleSuite:"La carte" },

ma_ligne_deux:{
  qui:'epouse',
  titre:"La deuxième ligne",
  texte:[
    "@« La deuxième, non. Elle décidera de choses. »",
    { sobre:"Elle plisse les yeux.",
      intense:"« Lesquelles ? » Ce n'est pas une objection : c'est une intendante qui demande un périmètre.",
      extreme:"« Lesquelles ? » Ce n'est pas une objection et ce n'est pas de la jalousie : c'est une intendante qui demande un périmètre, parce qu'une clause sans périmètre est une clause qui finira devant un tribunal." },
    "« Qui entre à Karlsberg. Qui y reste. Qui en sort et par où. »",
    "Elle réfléchit longtemps.",
    "« Ce n'est pas de l'intendance », dit-elle enfin. « C'est de la sûreté. »",
    "« Oui. »",
    "« Alors ce n'est pas ma ligne. » Elle raye la deuxième et récrit trois mots au-dessus. « *Sauf la sûreté.* Voilà. Elle ne touche pas à un bail, à un grenier, à un feu du bourg ; elle décide de qui franchit la porte. »",
    "§ Elle repose la plume et ajoute, sans changer de ton :",
    "^« Et vous venez de me dire que cette femme est meilleure que moi à quelque chose, ce que vous n'aviez pas besoin de me dire ce soir. »",
    "« Ce n'est pas ce que j'ai dit. »",
    "« C'est ce que vous avez signé, et dans une maison ce sont les signatures qui comptent. » Elle pousse la feuille. « Signez. Ce n'est pas une mauvaise clause, elle est même bonne, et j'aurais préféré l'écrire moi-même. »",
  ],
  effets:{ flags:['ma_surete','a2_alycia_surete'],
           faire:() => { bouger('alycia', { relation:3, confiance:4, peur:-2 }); },
           marque:"« Sauf la sûreté. » Alycia décide de qui franchit la porte de Karlsberg. L'épouse aurait préféré l'écrire elle-même.",
           court:"Sauf la sûreté" },
  suite:'ma_termes', libelleSuite:"Signer" },

ma_franc:{
  qui:'epouse',
  titre:"Sans fiction",
  texte:[
    "@« Je ne mentirai pas sur elle. »",
    { sobre:"« Ce n'est pas un mensonge. C'est un silence tenu par écrit. »",
      intense:"« Ce n'est pas un mensonge, messire, c'est un silence — et un silence tenu par écrit est ce qui empêche les gens de s'entretuer depuis trois cents ans dans cette province. »",
      extreme:"« Ce n'est pas un mensonge, messire, ne vous drapez pas. C'est un silence, et un silence organisé par écrit est très précisément ce qui empêche les maisons de cette province de s'entretuer depuis trois cents ans. Tout le monde sait. Personne ne dit. Chacun peut continuer à traiter avec l'autre. Vous voulez remplacer ça par quoi — par la vérité ? Ils n'en veulent pas. Ils n'en ont jamais voulu. Ils veulent pouvoir venir dîner. »" },
    "« Elle n'est pas une chose qu'on tait. »",
    "Long silence.",
    "« Non », concède-t-elle. « Elle ne l'est pas, et c'est le seul argument que vous ayez qui vaille quelque chose. »",
    "§ Elle repousse la feuille sans la déchirer.",
    "^« Alors voici ce qui va se passer, et je vous le dis maintenant pour que vous ne veniez pas me le reprocher dans trois ans. »",
    "**Un.** « La province va décider elle-même du mot, et ce sera le pire. Pas *maîtresse* : *sorcière elfe*, ou pire. »",
    "**Deux.** « Mont-Draken va lier trois choses qui n'ont rien à voir — vous, elle, et ce que vous êtes — et il aura l'air d'avoir raison. »",
    "**Trois.** « Et moi, je serai *la femme qu'on a humiliée*, ce qui est le seul rôle de cette histoire que je ne peux pas jouer, parce qu'on ne fait pas payer un bail à une femme qu'on plaint. »",
    "Elle se lève.",
    "« Je ne pars pas. Je vous ai dit que j'étais lisible : je reste, je tiens vos comptes, et je vous préviens que vous venez de me coûter ma seule arme. Faites-en ce que vous voulez, mais ne dites jamais que je ne vous ai pas prévenu. »",
  ],
  effets:{ flags:['ma_franc','a2_scandale','a2_epouse_expose'], suspicion:18,
           faire:() => { bouger('alarielle', { relation:4, confiance:5, devoir:-3 });
                         retenir('charles', "il n'a pas nié pour l'elfe, ce qui simplifie beaucoup mon dossier");
                         retenir('caleb', "ma nièce est exposée publiquement, ce qui a un prix"); },
           exploit:{ eclat:7, temoins:'province', quoi:"vous n'avez rien nié" },
           marque:"Vous avez refusé la fiction. « Vous venez de me coûter ma seule arme. Ne dites jamais que je ne vous ai pas prévenu. »",
           court:"Sans fiction" },
  plusTard:"La province choisira le mot elle-même, et Mont-Draken liera trois choses qui n'ont rien à voir.",
  suite:'ma_lautre', libelleSuite:"Il reste à le lui dire, à elle" },

ma_termes:{
  qui:'epouse',
  titre:"Deux signatures",
  texte:[
    "Vous signez. Elle contresigne. Elle range la feuille dans la malle, avec les onze pages, les états de dot et le plan d'assolement.",
    { sobre:"Ce n'est pas cynique. C'est une maison.",
      intense:"On peut trouver ça froid. C'est une maison : les maisons ne fonctionnent pas au sentiment, elles fonctionnent à ce qui est écrit, et c'est précisément ce qui permet aux gens d'y vivre sans s'entre-déchirer.",
      extreme:"On peut trouver ça froid, et vous le trouvez froid pendant environ deux ans. Puis vous comprenez ce que vous regardez : une maison ne fonctionne pas au sentiment. Elle fonctionne à ce qui est écrit, et c'est exactement ce qui permet à trente feux, deux servantes, un intendant, une épouse, un mari et une femme qui n'est pas l'épouse de vivre dans la même vallée pendant vingt ans sans que personne ne meure d'un coup de couteau un soir de Nivôse. Ce n'est pas de la froideur. C'est de l'ingénierie." },
    "§ Elle a une dernière chose à dire et elle la dit sur le seuil, sans se retourner.",
    "« Une remarque, et ensuite nous n'en parlerons plus. »",
    "« Dites. »",
    "« Vous ne m'avez pas demandé si moi, j'avais quelqu'un. »",
    { sobre:"Elle sort.",
      intense:"Elle sort avant que vous ayez trouvé quoi répondre, ce qui était manifestement le but, et vous restez seul dans la salle basse avec la chandelle.",
      extreme:"Elle sort avant que vous ayez trouvé la moindre chose à répondre, ce qui était manifestement l'intention et ce qui est extrêmement bien joué. Vous restez seul dans la salle basse avec une chandelle, un registre des feux et la conscience très nette d'avoir passé onze mois à considérer une femme de vingt-six ans comme une clause de contrat, alors qu'elle en avait passé onze à ne pas vous considérer comme tel." },
    "Vous ne le lui demanderez jamais. Ni cette année, ni les suivantes.",
  ],
  effets:{ flags:['ma_termes','a2_termes_signes'],
           faire:() => ETAT.faits.push("« Vous ne m'avez pas demandé si moi, j'avais quelqu'un. »"),
           marque:"Deux signatures. « Vous ne m'avez pas demandé si moi, j'avais quelqu'un. »",
           court:"Deux signatures" },
  suite:'ma_lautre', libelleSuite:"Il reste à le lui dire, à elle" },

ma_choisit_epouse:{
  qui:'epouse',
  titre:"Personne d'autre",
  texte:[
    "@« Alors il n'y aura personne. »",
    { sobre:"Elle ne dit pas merci.",
      intense:"Elle ne dit pas merci, ce qui est correct : on ne remercie pas quelqu'un d'exécuter un contrat.",
      extreme:"Elle ne dit pas merci, et c'est parfaitement correct : on ne remercie pas quelqu'un d'exécuter les termes qu'il a signés, ce serait admettre qu'on ne s'y attendait pas. Elle hoche la tête une fois, reprend sa plume, et rouvre le registre des feux à la page où son doigt était." },
    "« Bien. »",
    "Puis, au bout d'un long moment, sans lever les yeux :",
    "« Vous allez lui dire vous-même. »",
    "« Oui. »",
    "« En face. Pas par lettre. » Elle trace une ligne. « Une lettre, c'est ce qu'on fait aux gens dont on a honte. »",
    "§ Il reste le plus difficile, et ce n'est pas cette conversation-ci.",
  ],
  effets:{ flags:['ma_fidele','a2_epouse_choisie'],
           faire:() => { const C = CHANTIER(); C.faveurs += 2; },
           marque:"« Il n'y aura personne. » — « En face. Pas par lettre. Une lettre, c'est ce qu'on fait aux gens dont on a honte. »",
           court:"En face" },
  suite:'ma_rupture', libelleSuite:"Aller le lui dire" },

/* ══ ET L'AUTRE ═══════════════════════════════════════════════════════════
 * Elles sont adultes, elles ont leurs propres raisons, et aucune des deux
 * n'accepte parce qu'on a signé quelque chose ailleurs. Chacune peut dire
 * non — et le non ne fait rien baisser. */
ma_lautre:{
  dyn:true, texte:[], suite:'a2_carte' },

};

enregistrerScenes(MARIAGE);

DYN.ma_lautre = () => aller(a('ma_elfe') || a('ma_franc') ? 'ml_alarielle' : 'ml_alycia');

const MAITRESSE = {

ml_alycia:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Ce qu'on lui propose exactement",
  texte:[
    "Vous le lui dites en entier : le contrat, les onze pages, les trois lignes, ce qui a été signé et par qui.",
    { sobre:"Elle écoute jusqu'au bout sans interrompre.",
      intense:"Elle écoute jusqu'au bout sans interrompre une seule fois, ce qu'elle ne fait jamais, et à la fin elle répète une phrase.",
      extreme:"Elle écoute jusqu'au bout sans interrompre une seule fois — elle qui coupe tout le monde, tout le temps, et qui a passé quinze ans à ne pas laisser les gens finir leurs phrases. À la fin, elle répète une seule chose, exactement comme on relit une clause à voix haute pour vérifier qu'on l'a bien comprise." },
    "« *Aucun rang, aucune préséance, aucune voix aux comptes.* »",
    "« Oui. »",
    "« Elle est bonne », dit Alycia. « Vraiment. C'est la clause que j'aurais écrite. »",
    "§ Puis elle pose la vraie question, et ce n'est aucune de celles auxquelles vous vous étiez préparé.",
    "^« Où est-ce que je dors ? »",
    "« Pardon ? »",
    { sobre:"« Où. Est-ce que. Je dors. »",
      intense:"« Où est-ce que je dors, physiquement, les trois cents nuits de l'année où je ne suis pas avec vous ? » Elle a la voix très calme. « Parce que dans votre récit, il y a une maison, une épouse, trente feux, un bourg, une école — et il y a moi, quelque part, qui suis *ailleurs*. »",
      extreme:"« Où est-ce que je dors. Physiquement. Les trois cent quarante nuits de l'année où je ne suis pas avec vous. » Sa voix est parfaitement calme, ce qui est le plus inquiétant. « Parce que dans tout ce que vous venez de me raconter il y a une maison, une épouse, un intendant, trente feux, un bourg, une école, un four banal et un registre. Et il y a moi. Moi, je suis *ailleurs*. C'est le seul mot qui me concerne dans onze pages : ailleurs. »" },
    "« Vous avez toujours été ailleurs. C'est vous qui l'avez voulu. »",
    "« Oui ! » — et c'est la première fois qu'elle hausse la voix depuis Cendrepont. « Oui, et c'était *ma* décision, prise par moi, pour mes raisons, et je pouvais la défaire n'importe quel matin. Là, c'est écrit. Signé. Par deux personnes dont je ne suis aucune. »",
    "§ Voilà le point. Il n'a jamais été ailleurs.",
    "« Vous ne me demandez pas de vous aimer moins », dit-elle plus bas. « Vous me demandez de dépendre d'un papier que je n'ai pas signé. C'est très exactement la chose contre laquelle j'ai construit ma vie entière. »",
  ],
  choix:[
    { t:"« Alors signez-le. »",
      detail:"la troisième signature · ce que personne n'a jamais proposé dans cette province",
      risque:"définitif", va:'ml_signe' },

    { t:"« Écrivez vos propres termes. »",
      detail:"une feuille, une plume · et ce qu'elle exigera sera plus dur que l'autre",
      risque:"calculé", va:'ml_ses_termes' },

    { t:"« Alors ne dépendez de rien. Partez. »",
      detail:"lui rendre la seule chose qu'elle ait jamais voulue · en la perdant",
      risque:"définitif", ferme:"Ferme : ce qu'il y avait", definitif:true, va:'ml_partir' },

    { t:"Ne rien lui demander du tout",
      detail:"il n'y a pas d'obligation d'avoir cette conversation ce soir · ni jamais",
      risque:"prudent", va:'ml_rien' },
  ],
},

ml_signe:{
  qui:'alycia',
  titre:"La troisième signature",
  texte:[
    "@« Alors signez-le. »",
    { sobre:"Elle ne comprend pas tout de suite.",
      intense:"Elle ne comprend pas tout de suite, et il faut le répéter, et c'est la première fois qu'il faut répéter quelque chose à cette femme.",
      extreme:"Elle ne comprend pas tout de suite. Il faut le répéter, et c'est la première fois depuis Cendrepont qu'il faut répéter quoi que ce soit à cette femme — elle qui devine les phrases à la moitié et qui finit celles des autres depuis quinze ans." },
    "@« Le papier. Les trois lignes. Il y a deux signatures dessus. Mettez la troisième. »",
    "« Ce n'est pas comme ça que ça se fait. »",
    "« Non. »",
    "« Il n'y a aucun exemple de ça dans trois cents ans de cette province. »",
    "« Non. »",
    "§ Elle reste très longtemps immobile.",
    "« Elle refusera », dit-elle enfin.",
    "« Peut-être. »",
    "Elle refuse. Elle refuse deux fois, à quatre mois d'intervalle, et sa raison est bonne : *une clause signée par celle qu'elle vise cesse d'être une clause et devient un traité, et je ne traite pas avec une personne qui n'a pas de maison.*",
    { sobre:"À la troisième fois, elle accepte.",
      intense:"À la troisième fois, un an plus tard, elle accepte — non pour vous, et pas du tout pour Alycia : parce qu'entre-temps Alycia a fait sortir onze personnes d'un dépôt de Chastel, dont deux du bourg de Karlsberg, et qu'une intendante sait reconnaître ce qu'elle doit.",
      extreme:"À la troisième fois, un an plus tard, elle accepte. Ni pour vous ni pour Alycia : parce qu'entre-temps Alycia a fait sortir onze personnes d'un dépôt de Chastel, dont deux du bourg de Karlsberg — une veuve et son fils de quatorze ans qui figuraient au registre des feux, colonne trois, tenu de sa main. Une intendante sait exactement ce qu'elle doit et à qui. Elle signe en bas, à droite, de la même écriture serrée que le reste, et elle ne commente pas." },
    "Trois signatures sur une feuille de trois lignes, dans une malle, à Karlsberg.",
    "§ Ce n'est pas une romance. C'est trois adultes qui ont écrit ce qu'ils acceptaient, et c'est infiniment plus solide.",
    "Alycia garde une copie. C'est le seul papier qu'elle ait accepté de porter sur elle en quinze ans.",
  ],
  effets:{ flags:['ml_signe','a2_trois_signatures','a2_alycia_reste'],
           faire:() => { bouger('alycia', { relation:8, confiance:10, attirance:6, peur:-8 });
                         const C = CHANTIER(); C.faveurs += 2;
                         retenir('alycia', "on m'a fait signer, moi, une clause qui me visait — personne n'avait jamais fait ça"); },
           exploit:{ eclat:6, temoins:'quelques', quoi:"trois signatures sur une feuille de trois lignes" },
           marque:"Trois signatures. Alycia porte une copie sur elle — le seul papier en quinze ans.",
           court:"Trois signatures" },
  suite:'a2_carte', libelleSuite:"La carte" },

ml_ses_termes:{
  qui:'alycia',
  titre:"Ce qu'elle exige",
  texte:[
    "@« Écrivez vos propres termes. »",
    "Elle prend la plume comme on prend une arme qu'on n'a pas l'habitude de porter.",
    { sobre:"Elle écrit quatre lignes. Elles sont plus dures que les trois autres.",
      intense:"Elle écrit quatre lignes en une demi-heure, en s'y reprenant, et elles sont considérablement plus dures que les trois de l'épouse.",
      extreme:"Elle écrit quatre lignes en une demi-heure, en s'y reprenant trois fois, en raturant, en recommençant la page — elle écrit mal et lentement, ce que vous ne saviez pas, et ce qui explique quinze ans de listes tenues dans une tête plutôt que sur du papier. Les quatre lignes sont considérablement plus dures que les trois de l'épouse, et elles ne portent sur rien de ce que vous attendiez." },
    "**Une.** « Je ne vis pas à Karlsberg et je n'y ai pas de chambre. Si j'en avais une, j'y serais dans deux ans, et dans cinq je ne saurais plus faire autre chose. »",
    "**Deux.** « Je ne prends rien. Pas d'argent, pas de terre, pas de rente, pas de cadeau. Si vous me donnez quelque chose je le vends et je donne l'argent, et ce sera très humiliant pour nous deux. »",
    "**Trois.** « Vos enfants ne sauront pas qui je suis avant leurs quinze ans. Ensuite ils sauront tout, d'un coup, de votre bouche, et vous ne mentirez pas une seule fois. »",
    "**Quatre.** « Et le jour où je vous dirai que c'est fini, ce sera fini le jour même, sans conversation. »",
    "@« La quatrième est cruelle. »",
    { sobre:"« La quatrième est la seule qui me protège. »",
      intense:"« La quatrième est la seule des quatre qui me protège », dit-elle. « Les trois autres protègent votre maison. Regardez-les mieux. »",
      extreme:"« La quatrième est la seule des quatre qui me protège, et les trois autres protègent votre maison — regardez-les mieux, messire, vous êtes en train de vous attendrir sur des clauses qui sont toutes à votre avantage sauf une. » Elle repousse la feuille. « Je ne vous quitte pas. Je me réserve de pouvoir le faire en un jour, sans avoir à en discuter avec un homme qui parle mieux que moi. C'est tout. C'est même très peu. »" },
    "§ Vous signez. Elle signe. Deux feuilles dans la même malle, avec des clauses qui ne se recouvrent pas et ne se contredisent pas.",
    "L'épouse lit les quatre lignes le lendemain, en intendante.",
    "« Elle est bien meilleure que moi », dit-elle simplement. « La quatrième surtout. J'aurais dû y penser il y a onze ans. »",
  ],
  effets:{ flags:['ml_termes','a2_alycia_reste','a2_alycia_libre'],
           faire:() => { bouger('alycia', { relation:6, confiance:8, attirance:5, peur:-6 });
                         retenir('alycia', "j'ai écrit mes propres termes et il les a signés sans en discuter un seul"); },
           exploit:{ eclat:4, temoins:'aucun', quoi:"elle a écrit ses conditions et vous n'en avez discuté aucune" },
           marque:"Quatre lignes de sa main. La quatrième : « le jour où je dirai que c'est fini, ce sera fini le jour même. »",
           court:"Quatre lignes" },
  plusTard:"Elle peut mettre fin à tout ça en un jour, sans conversation. C'est écrit et vous l'avez signé.",
  suite:'a2_carte', libelleSuite:"La carte" },

ml_partir:{
  qui:'alycia',
  titre:"Ne dépendre de rien",
  texte:[
    "@« Alors ne dépendez de rien. Partez. »",
    { sobre:"Elle encaisse mal. C'est la première fois.",
      intense:"Elle encaisse mal, et c'est la première fois que vous la voyez encaisser mal quoi que ce soit — parce que c'est son propre argument, retourné, et qu'il n'y a rien à répondre à son propre argument.",
      extreme:"Elle encaisse mal, et c'est la première fois en trois ans que vous voyez cette femme encaisser mal quoi que ce soit. C'est son propre argument, retourné, servi entier : elle a passé quinze ans à expliquer que dépendre est une chaîne, on lui propose de n'en porter aucune, et il n'existe pas de réponse à ça — sauf une, qu'elle ne dira pas, et vous savez tous les deux laquelle." },
    "« Vous me mettez dehors avec ma propre phrase. »",
    "« Je vous rends votre liberté avec votre propre phrase. »",
    "« C'est la même opération, messire, et vous le savez, et c'est très bien joué. »",
    "§ Elle part le lendemain matin, sans dispute, en donnant à ses affaires le temps normal qu'il faut pour les charger sur un cheval.",
    "Elle ne disparaît pas. C'est la nuance et elle compte : trois relais, un maréchal, une sage-femme et un clerc d'étape. Un mot passe en neuf jours.",
    "Elle fait passer un mot deux fois par an pendant onze ans. Toujours sur le réseau, jamais sur autre chose. Toujours utile. Jamais personnel.",
    { sobre:"Elle n'a jamais dit qu'elle vous en voulait.",
      intense:"Elle n'a jamais dit qu'elle vous en voulait, et elle a probablement raison de ne pas vous en vouloir, ce qui n'aide personne.",
      extreme:"Elle n'a jamais dit une seule fois qu'elle vous en voulait, ni dans un mot, ni par un tiers, ni à travers quiconque. Elle a probablement raison de ne pas vous en vouloir : vous lui avez rendu exactement ce qu'elle réclamait depuis quinze ans, entier, sans conditions. Ça n'aide personne, ça ne console rien, et ça reste vrai." },
  ],
  effets:{ flags:['ml_partie','a2_alycia_libre','a2_reseau_su'],
           faire:() => { bouger('alycia', { relation:-4, attirance:-6, confiance:4, peur:-10 });
                         retenir('alycia', "il m'a rendu ma liberté avec ma propre phrase, ce qui était juste et abominable"); },
           marque:"Elle est partie avec sa propre phrase. Un mot deux fois par an pendant onze ans, toujours utile, jamais personnel.",
           court:"Neuf jours" },
  suite:'a2_carte', libelleSuite:"La carte" },

ml_rien:{
  qui:'alycia',
  titre:"On n'est pas obligé",
  texte:[
    "Vous ne demandez rien.",
    { sobre:"Il n'y a pas d'obligation d'avoir cette conversation.",
      intense:"Il n'y a aucune obligation d'avoir cette conversation, ce soir ou jamais, et c'est une chose que personne ne dit assez : on peut laisser une situation être ce qu'elle est.",
      extreme:"Il n'y a aucune obligation d'avoir cette conversation, ni ce soir, ni jamais, et c'est une chose que personne ne dit assez souvent. On peut laisser une situation être exactement ce qu'elle est, sans la nommer, sans la contracter, sans la trancher. Ça ne règle rien. Ça n'abîme rien non plus, ce qui n'est pas si fréquent." },
    "Elle vous regarde ne pas le demander, et elle comprend, et elle ne dit rien non plus.",
    "§ Ce qu'il y a entre vous continue exactement comme avant, sans nom, sans papier et sans place à table.",
    "Ce sera comme ça pendant des années. Il y aura des mois entiers sans se voir et des semaines où elle sera là. L'épouse tiendra les comptes. Personne ne dira rien.",
    "C'est la solution la plus fragile, la moins honnête et la plus vivable des quatre, et c'est celle que choisissent, en pratique, à peu près tous les gens de ces provinces.",
  ],
  effets:{ flags:['ml_tacite','a2_alycia_reste'],
           faire:() => bouger('alycia', { relation:2, peur:1 }),
           marque:"Rien n'a été demandé, rien n'a été dit, et ça continue. La solution la plus fragile et la plus vivable.",
           court:"Sans nom" },
  suite:'a2_carte', libelleSuite:"La carte" },

/* ── Alarielle ────────────────────────────────────────────────────────────
 * Elle a un peuple. Ce n'est pas une excuse, c'est une hiérarchie, et une
 * maison humaine est en dessous. */
ml_alarielle:{
  qui:'alarielle',
  lieu:"Aelthiriel · le jardin fermé",
  titre:"Ce que sa cour appellerait ça",
  texte:[
    "Vous le lui dites en entier, à Aelthiriel, dans le jardin fermé, parce qu'elle a demandé que ce soit là.",
    { sobre:"Elle écoute sans rien montrer.",
      intense:"Elle écoute sans rien montrer, et à la fin elle demande une précision de vocabulaire, ce qui est la chose la plus elfique qu'elle ait jamais faite devant vous.",
      extreme:"Elle écoute sans rien montrer du tout, immobile, et à la fin elle ne réagit à rien de ce que vous attendiez : elle demande une précision de vocabulaire. C'est la chose la plus elfique qu'elle ait jamais faite devant vous en trois ans, et vous comprenez que c'est aussi une façon de gagner du temps." },
    "« Le mot que votre épouse a refusé d'écrire. Dites-le-moi. »",
    "« Maîtresse. »",
    "« Traduisez-le. Pas le mot : ce qu'il fait. »",
    "« Une femme reçue dans une maison, sans rang, dont on sait tous ce qu'elle est et dont personne ne parle. »",
    "§ Elle réfléchit un long moment.",
    { sobre:"^« Nous n'avons pas ça. »",
      intense:"^« Nous n'avons pas ça », dit-elle. « Ce n'est pas de la vertu : nous avons pire, et c'est plus ancien. »",
      extreme:"^« Nous n'avons pas ce mot », dit-elle. « Ce n'est pas de la vertu, ne vous méprenez pas — nous avons quelque chose de bien pire et de bien plus ancien, et il n'y a pas de traduction non plus. »" },
    "« Dites. »",
    "« Chez nous, ce qui n'est pas contracté n'existe pas. Une elfe qui vit trois cents ans ne peut pas se permettre des situations qui durent sans être nommées : elles durent trop longtemps. » Elle regarde le jardin. « Alors on écrit tout, ou on n'a rien. Il n'y a pas de troisième état. »",
    "« Et là ? »",
    "« Là, ce que vous me proposez n'existe pas dans ma langue, ce qui veut dire que ma cour le nommera avec le mot le plus proche. » Elle se tourne enfin. « Et le mot le plus proche, chez nous, s'applique à ce qu'on donne en otage. »",
    "§ Il y a la question du peuple, et elle est plus lourde que tout le reste.",
    "« Mon frère fera de vous une preuve », dit-elle. « Il dit depuis vingt ans que les humains prennent aux Elfes ce qu'ils ne peuvent pas obtenir autrement. Je serais la démonstration vivante, dans une maison humaine, sans contrat, sans rang, à onze lieues de Chastel. »",
    "« Vous avez dit que vous ne détourniez pas les yeux. »",
    "« Je ne les détourne pas. Je vous dis exactement le prix, ce qui est le contraire. »",
  ],
  choix:[
    { t:"« Alors contractons. Devant votre cour. »",
      detail:"un acte elfique, écrit, déposé · c'est ce qu'elle a dit qu'il fallait",
      risque:"définitif", ferme:"Ferme : toute discrétion sur ce point, dans deux mondes",
      va:'ml_el_contrat' },

    { t:"« Ce n'est pas à vous de payer ça. »",
      detail:"reculer avant qu'elle décide · pour la raison qu'elle a donnée",
      risque:"définitif", ferme:"Ferme : ce qui restait possible", definitif:true, va:'ml_el_non' },

    { t:"« Que voulez-vous, vous ? »",
      detail:"la question qu'on ne pose pas à quelqu'un qui a un peuple",
      risque:"calculé", va:'ml_el_elle' },
  ],
},

ml_el_elle:{
  qui:'alarielle',
  titre:"Ce qu'elle veut",
  texte:[
    "@« Que voulez-vous, vous ? »",
    { sobre:"« Personne ne me l'a demandé depuis quatre-vingt-onze ans. »",
      intense:"Elle met du temps.\n\n« On ne me l'a pas demandé depuis quatre-vingt-onze ans », dit-elle. « Je sais le chiffre exact, ce qui devrait vous dire quelque chose sur ces quatre-vingt-onze ans. »",
      extreme:"Elle met du temps. Beaucoup plus qu'une humaine, et pas pour les mêmes raisons.\n\n« On ne me l'a pas demandé depuis quatre-vingt-onze ans », dit-elle enfin. « Je connais le chiffre exact, à l'année près, et je crois que ça devrait vous dire à peu près tout ce qu'il y a à savoir sur ces quatre-vingt-onze ans et sur la maison dans laquelle je les ai passés. »" },
    "« Alors répondez. »",
    "« Je veux que la faute soit réparée. » Elle dit ça très vite, comme une chose apprise. Puis elle s'arrête. « Non. Ça, c'est ce que je dois vouloir. »",
    "§ Elle recommence, et c'est visiblement difficile.",
    "^« Je veux **du temps qui ne compte pas**. »",
    "« Pardon ? »",
    { sobre:"« Vous ne pouvez pas comprendre, et ce n'est pas une insulte. »",
      intense:"« Tout mon temps compte », dit-elle. « Chaque année de ma vie est une année de la dette de ma maison, et j'en ai deux cent onze. Ce que je veux, c'est du temps qui ne compte pas. Des saisons dont personne ne fera le bilan. »",
      extreme:"« Tout mon temps compte, et vous ne pouvez pas comprendre ça, et ce n'est pas une insulte — c'est arithmétique. Chaque année de ma vie est une année de la dette de ma maison. J'en ai deux cent onze. J'en aurai probablement quatre cents. Il n'y a pas eu, dans ces deux cent onze années, une seule saison dont on n'ait pas fait le bilan quelque part. » Elle regarde ses mains. « Ce que je veux, c'est du temps qui ne compte pas. Des mois dont personne ne fera jamais le compte. C'est tout, c'est ridicule, et c'est absolument impossible à obtenir chez moi. »" },
    "« Une maison humaine ne fait le bilan de rien », dites-vous.",
    "« Une maison humaine dure quatre-vingts ans », dit-elle. « C'est très exactement ce que je viens de vous décrire. »",
    "§ Elle vient de dire oui, et il a fallu deux cent onze ans et une question que personne ne posait.",
  ],
  effets:{ flags:['ml_el_veut'],
           faire:() => bouger('alarielle', { relation:7, confiance:8, attirance:6 }),
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous avez posé à une elfe la question qu'on ne lui pose pas" },
           marque:"« Je veux du temps qui ne compte pas. » Quatre-vingt-onze ans qu'on ne le lui avait pas demandé.",
           court:"Du temps qui ne compte pas" },
  choix:[
    { t:"« Alors contractons. Devant votre cour. »",
      detail:"la protéger avec du papier · ce qui est la seule protection qu'elle reconnaisse",
      risque:"définitif", ferme:"Ferme : toute discrétion, dans deux mondes", va:'ml_el_contrat' },
    { t:"« Alors ne contractons rien. »",
      detail:"lui donner exactement ce qu'elle a demandé · du temps que personne ne compte",
      risque:"définitif", ferme:"Ferme : la protection qu'un acte lui donnerait", va:'ml_el_sans' },
  ],
},

ml_el_contrat:{
  qui:'alarielle',
  titre:"Un acte devant la cour",
  texte:[
    "Un acte elfique, écrit, lu devant la cour d'Aelthiriel, déposé aux archives de la marche.",
    { sobre:"Il faut onze mois pour l'obtenir.",
      intense:"Il faut onze mois, quatre lectures et l'avis d'un collège de trois — parce qu'aucun acte de cette nature n'a été déposé depuis quatre cents ans et qu'il faut d'abord établir sous quel titre on le classe.",
      extreme:"Il faut onze mois, quatre lectures publiques et l'avis d'un collège de trois archivistes, parce qu'aucun acte de cette nature n'a été déposé à Aelthiriel depuis quatre cent onze ans. La difficulté n'est pas l'autorisation : c'est la classification. Sous quel titre range-t-on une elfe de la maison d'Eltharion liée par acte à un chef de maison humain de quarante ans d'espérance de vie ? Le collège siège quatre fois. Il finit par créer une rubrique." },
    "§ Tyrion parle contre, à la troisième lecture, pendant deux heures.",
    "Il n'est pas grossier. Il est même très bon, et son argument est celui qu'on ne peut pas réfuter : *ma sœur est en train de faire, volontairement, la chose exacte dont nous accusons les humains depuis deux siècles.*",
    "Alarielle répond en quatre phrases.",
    "« Volontairement. C'est le mot. Il est dans ton propre discours et tu ne l'as pas entendu. »",
    "L'acte est déposé à onze voix contre neuf.",
    { sobre:"Il ne la protège de rien et il change tout.",
      intense:"L'acte ne la protège de rien de concret — aucune cour ne peut la défendre à onze lieues de Chastel. Il fait autre chose : il rend impossible de dire qu'on la lui a prise.",
      extreme:"L'acte ne la protège de rien de concret, et tout le monde le sait : aucune cour elfique ne peut défendre quiconque à onze lieues de Chastel. Il fait exactement une chose, et c'est celle qui compte : il rend définitivement impossible de dire qu'on la lui a prise. C'est écrit, lu quatre fois, voté, déposé. Deux siècles d'un argument très efficace viennent de perdre leur meilleur exemple à venir, et c'est elle qui l'a fait, contre son propre frère, devant sa propre cour." },
    "Elle est reçue à Karlsberg comme envoyée d'Aelthiriel. Elle y passe quatre mois par an.",
    "Personne, dans aucun des deux mondes, ne sait comment appeler ça. C'est très exactement ce qui était visé.",
  ],
  effets:{ flags:['ml_el_contrat','a2_alarielle_liee','a2_acte_elfique','a2_tyrion_humilie'],
           suspicion:16,
           faire:() => { bouger('alarielle', { relation:9, confiance:9, attirance:7, devoir:3 });
                         const C = CHANTIER(); C.faveurs += 3;
                         retenir('tyrion', "ma sœur a fait déposer un acte contre moi, devant la cour, et elle a gagné");
                         retenir('alarielle', "il a proposé le papier avant que je le demande"); },
           exploit:{ eclat:20, temoins:'province', quoi:"un acte elfique déposé pour une maison humaine, à onze voix contre neuf" },
           marque:"Acte déposé aux archives de la marche, onze voix contre neuf. Tyrion a parlé deux heures contre.",
           court:"Onze contre neuf" },
  plusTard:"Tyrion a perdu devant sa cour, publiquement, contre sa sœur. Il ne l'oubliera pas et il a trois cents ans devant lui.",
  suite:'a2_carte', libelleSuite:"La carte" },

ml_el_sans:{
  qui:'alarielle',
  titre:"Du temps que personne ne compte",
  texte:[
    "Pas d'acte. Pas de lecture, pas de collège, pas de rubrique.",
    { sobre:"Elle vient quand elle vient.",
      intense:"Elle vient quand elle vient et repart quand elle repart. Personne à Aelthiriel ne tient le compte de ses absences, pour la première fois en deux cent onze ans.",
      extreme:"Elle vient quand elle vient, elle repart quand elle repart, et personne à Aelthiriel n'en tient le compte — pour la première fois en deux cent onze ans. Ce n'est pas de la clandestinité : sa cour sait parfaitement où elle est. C'est que rien n'est déposé, donc rien n'est comptable, donc aucun bilan ne sera jamais fait de ces mois-là, ni par le collège des archives ni par personne. C'est très exactement ce qu'elle avait demandé et vous ne l'aviez pas cru sérieusement." },
    "§ Ça marche quatre ans.",
    "Puis Tyrion trouve le moyen de le compter quand même — un archiviste, des dates de laissez-passer, un relevé de la marche — et il le fait lire devant la cour un matin de Ventôse.",
    "Ce n'est pas un scandale. C'est pire : c'est un **relevé**. Quatre ans, mois par mois, avec les dates.",
    "Alarielle l'écoute jusqu'au bout, debout, et ne conteste pas un chiffre.",
    { sobre:"« Ils sont exacts », dit-elle.",
      intense:"« Ils sont exacts », dit-elle quand il a fini. « Tu as bien travaillé. Et maintenant que tu les as comptés, ils sont comptés pour toujours, et tu viens de me prendre la seule chose que j'aie eue en deux cent onze ans. »",
      extreme:"« Ils sont exacts », dit-elle quand il a fini de lire, et sa voix ne tremble pas. « Tu as bien travaillé, mon frère, et je ne conteste aucun chiffre. Comprends seulement ce que tu viens de faire : ils sont comptés maintenant. Ils le resteront. Ils seront dans les archives dans quatre cents ans, mois par mois, avec les dates, et personne ne pourra plus jamais les décompter. » Elle regarde la salle. « C'était la seule chose que j'aie possédée en deux cent onze ans et tu ne me l'as pas prise pour la détruire : tu me l'as prise pour la classer. »" },
    "Elle quitte la cour ce jour-là et n'y reparaît pas pendant sept ans.",
  ],
  effets:{ flags:['ml_el_sans','a2_alarielle_liee','a2_alarielle_scandale','a2_tyrion_dur'],
           faire:() => { bouger('alarielle', { relation:6, confiance:7, attirance:8, devoir:-6 });
                         retenir('tyrion', "j'ai fait compter les mois de ma sœur et elle a quitté la cour");
                         retenir('alarielle', "il m'a donné quatre ans que personne ne comptait, et mon frère les a comptés"); },
           exploit:{ eclat:8, temoins:'quelques', quoi:"quatre ans que personne n'a comptés" },
           marque:"Quatre ans sans acte. Tyrion les a fait compter devant la cour, mois par mois. Elle n'y est pas revenue en sept ans.",
           court:"Le relevé" },
  plusTard:"Elle a quitté sa cour pour sept ans. Une elfe qui perd son peuple n'a plus que ce qu'elle a choisi à la place.",
  suite:'a2_carte', libelleSuite:"La carte" },

ml_el_non:{
  qui:'alarielle',
  titre:"Ce n'est pas à elle de payer",
  texte:[
    "@« Ce n'est pas à vous de payer ça. »",
    { sobre:"Elle ne répond pas immédiatement.",
      intense:"Elle ne répond pas immédiatement, et quand elle répond, c'est pour vous reprendre.",
      extreme:"Elle ne répond pas immédiatement. Quand elle le fait, c'est pour vous reprendre, très calmement, et vous découvrez que vous venez de commettre exactement l'erreur que fait tout le monde avec elle depuis deux cent onze ans." },
    "« Vous venez de décider à ma place. »",
    "« J'ai voulu — »",
    "« Je sais ce que vous avez voulu. » Elle lève une main. « C'est même généreux et c'est même juste. Vous avez pesé ce que ça me coûterait, vous avez trouvé que c'était trop, et vous avez tranché. Sans moi. »",
    "§ « C'est ce que fait ma maison depuis que j'ai onze ans », dit-elle. « Elle pèse ce que ça me coûterait, elle trouve que c'est trop, et elle tranche. »",
    "Silence dans le jardin fermé.",
    "« Je ne vous le reproche pas », dit-elle enfin. « Vous n'avez pas eu le temps d'apprendre : vous durez quatre-vingts ans, vous décidez vite, c'est votre condition. Mais vous venez de faire, en une phrase, ce que je vous demandais de ne pas faire. »",
    "« Voulez-vous que je revienne dessus ? »",
    { sobre:"« Non. C'est fait. »",
      intense:"« Non. » Elle sourit à peine. « C'est fait. Une chose reprise n'est pas une chose non dite — nous ne fonctionnons pas comme vous là-dessus. »",
      extreme:"« Non. » Elle sourit à peine, et c'est le plus triste de la conversation. « C'est fait. Chez nous, une chose reprise n'est pas une chose non dite : nous vivons trop longtemps pour ce genre de commodité. Vous l'avez dit, ça restera dit, et dans cent ans je m'en souviendrai avec la même précision qu'aujourd'hui. » Elle regarde le jardin fermé. « Ce n'est pas une punition, messire. C'est simplement ce que c'est que de parler à quelqu'un qui n'oublie pas. »" },
    "Elle vous reçoit toujours. Elle continue de vous ouvrir les archives. Rien n'est cassé, et rien ne se rouvrira.",
  ],
  effets:{ flags:['ml_el_recule','a2_alarielle_amie'],
           faire:() => { bouger('alarielle', { relation:2, confiance:3, attirance:-5, devoir:2 });
                         retenir('alarielle', "il a décidé à ma place en croyant me protéger, comme tout le monde"); },
           marque:"« Vous venez de décider à ma place. C'est ce que fait ma maison depuis que j'ai onze ans. »",
           court:"Décider à sa place" },
  suite:'a2_carte', libelleSuite:"La carte" },

ma_rupture:{
  dyn:true, texte:[], suite:'a2_carte' },

/* La rupture choisie : on va le dire en face, comme l'épouse l'a exigé. */
ml_fin_alycia:{
  qui:'alycia',
  titre:"En face",
  texte:[
    "Vous le lui dites en face, comme il a été demandé, et c'est très court.",
    { sobre:"Elle ne discute pas.",
      intense:"Elle ne discute pas une seconde. Elle hoche la tête, elle regarde ailleurs, et elle pose une seule question.",
      extreme:"Elle ne discute pas une seconde, ne demande pas de raison, ne cherche pas à négocier. Elle hoche la tête une fois, regarde le mur derrière vous pendant environ trois secondes, et pose une seule question — qui n'est aucune de celles qu'un homme attend dans cette situation." },
    "« Est-ce que le réseau continue ? »",
    "§ C'est la seule chose qu'elle demande.",
    "@« Oui. Bien sûr. »",
    "« Bien. » Elle se lève. « Alors ça va. »",
    "« Alycia — »",
    "« Non. » Elle prend son manteau. « Vous alliez dire quelque chose pour vous sentir mieux et ça me coûterait. Ne le dites pas. »",
    "Elle est sur le seuil.",
    "« Vous avez fait ce qu'il fallait pour votre maison », dit-elle sans se retourner. « C'est ce que je vous aurais conseillé si vous m'aviez demandé, et vous ne m'avez pas demandé, et il n'y avait aucune raison que vous le fassiez. »",
    "Elle continue de travailler avec vous pendant onze ans.",
    "Elle ne remet jamais les pieds à Karlsberg.",
  ],
  effets:{ flags:['ml_fin','a2_alycia_travail'],
           faire:() => { bouger('alycia', { attirance:-10, relation:-2, confiance:3 });
                         retenir('alycia', "il a choisi sa maison et il me l'a dit en face, ce qui est déjà rare"); },
           marque:"« Est-ce que le réseau continue ? » — la seule question. Elle n'est jamais revenue à Karlsberg.",
           court:"En face" },
  suite:'a2_carte', libelleSuite:"La carte" },

ml_fin_alarielle:{
  qui:'alarielle',
  titre:"Sept mots",
  texte:[
    "Vous faites la route jusqu'à Aelthiriel pour le dire en face. Onze semaines aller-retour pour une conversation de sept mots.",
    "@« J'ai choisi ma maison. Je suis venu le dire. »",
    { sobre:"Elle met un temps très long.",
      intense:"Elle met un temps très long — un temps elfique, celui qu'on ne supporte pas quand on vit quatre-vingts ans.",
      extreme:"Elle met un temps très long à répondre. Un temps elfique : celui qu'on ne supporte pas quand on vit quatre-vingts ans et qu'on compte les siennes. Vous restez debout dans le jardin fermé pendant ce qui doit faire deux minutes entières, et vous comprenez à la fin que ce n'était pas de l'hésitation." },
    "« Vous avez fait onze semaines de route pour sept mots. »",
    "« Oui. »",
    "« Personne n'a jamais fait onze semaines de route pour me dire quelque chose de désagréable. » Elle incline la tête. « On m'écrit. C'est l'usage et c'est plus commode. »",
    "§ « Merci d'être venu », dit-elle, et elle le pense.",
    "Elle vous ouvre les archives ce jour-là et les années suivantes. Elle parle devant sa cour contre les mesures qui visent les Parias, et elle perd, et elle parle quand même.",
    "Vous ne saurez jamais si c'était une amitié. Il n'y a pas de mot pour ça non plus, et pour une fois ça n'a aucune importance.",
  ],
  effets:{ flags:['ml_fin','a2_alarielle_amie'],
           faire:() => { bouger('alarielle', { relation:4, confiance:6, attirance:-6, devoir:4 });
                         retenir('alarielle', "il a fait onze semaines de route pour me dire sept mots désagréables"); },
           exploit:{ eclat:3, temoins:'aucun', quoi:"onze semaines de route pour sept mots" },
           marque:"Onze semaines de route pour sept mots. « Personne n'a jamais fait ça pour me dire quelque chose de désagréable. »",
           court:"Sept mots" },
  suite:'a2_carte', libelleSuite:"La carte" },

};

enregistrerScenes(MAITRESSE);

DYN.ma_rupture = () => aller(a('ma_elfe') ? 'ml_fin_alarielle' : 'ml_fin_alycia');

entree2('ml_alycia', 'ml_alarielle', 'ml_fin_alycia', 'ml_fin_alarielle');

/* L'épouse arrive une saison après la signature du contrat, à Karlsberg,
 * et pas ailleurs : c'est une maison qu'elle vient tenir. */
offrir({ id:'ma_arrivee', lieu:'karlsberg', va:'ma_arrivee',
         titre:"Elle arrive",
         si:() => a('aly_marie') });
