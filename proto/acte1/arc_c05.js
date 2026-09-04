/* PARIAS — Acte I · C05 · LE TROLL DU VIEUX PONT
 * ═══════════════════════════════════════════════════════════════════════
 * Le verbe de cet arc est RACONTER.
 *
 * Il y a un combat possible et il est ridicule : on ne bat pas au corps à
 * corps une chose de onze pieds qui tient un pont depuis deux cent onze
 * ans. Ce qui se joue ici se joue en parlant, et le prix n'est pas de l'or
 * ni du sang : c'est une chose vraie qu'on n'a jamais dite à personne.
 *
 * Et ce qui écoute a deux cent onze ans de mémoire, ce qui en fait la seule
 * créature vivante de cette province à avoir connu le monde d'avant la
 * Purge.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Ce qu'on lui a donné, et ce qu'il a rendu. */
const contees = () => (ETAT.acte.contes = ETAT.acte.contes || []);
const conter = q => { contees().push(q); };

const ARC_C05 = {

tr_audience:{
  lieu:"Sombreval · la grange haute",
  titre:"Deux mois de grain",
  qui:'ode',
  texte:[
    "On vous reçoit dans une grange, ce qui n'est pas un manque d'égards : c'est là qu'est le problème.",
    { sobre:"Deux mois de grain qui ne passe pas, dans une grange qui n'est pas faite pour ça.",
      intense:"Onze cents setiers de grain dans une grange faite pour en tenir quatre cents. Empilé jusqu'aux entraits, sur des claies improvisées, et il a commencé à chauffer au milieu du tas — un tas de grain qui chauffe fume par le haut et sent le pain qu'on a laissé trop longtemps.",
      extreme:"Onze cents setiers dans une grange faite pour quatre cents, empilé jusqu'aux entraits sur des claies improvisées. Le tas a commencé à chauffer au milieu : ça fume par le haut, ça sent le pain qu'on a laissé trop longtemps, et quand on enfonce le bras jusqu'à l'épaule la chaleur monte à quarante degrés. Un tas comme celui-là s'allume tout seul en trois semaines, et personne ici n'a besoin qu'on le lui explique." },
    "Ode de Sombreval a soixante-quatre ans et elle tient sa maison depuis trente et un.",
    "« Le vieux pont est le seul passage à onze lieues. Le suivant est à Chastel et Chastel prend un huitième. »",
    "« Et le troll. »",
    "« Il s'appelle Harn. »",
    "§ Elle a dit un nom. Personne ne donne un nom à ce qu'on paie pour tuer, et elle vient de le faire en trois secondes sans y penser.",
    "^« Il tient ce pont depuis avant ma grand-mère. Il prenait un sou par essieu et un mouton par an, et ça a marché pendant deux cents ans parce que c'est moins cher qu'un huitième. »",
    "« Et maintenant ? »",
    "« Maintenant il ne veut plus d'argent. Il demande une histoire vraie. »",
    "Elle dit ça sans ironie et sans embarras, du ton dont on rapporte un fait de gestion.",
    "« Une histoire vraie que celui qui passe n'a jamais dite à personne. C'est le tarif depuis onze semaines. »",
    "« Et personne ne paie ? »",
    { sobre:"« Onze ont essayé. Onze sont revenus. »",
      intense:"« Onze ont essayé, messire. Onze sont revenus, sans une égratignure, et pas un des onze n'a voulu dire ce qu'il avait raconté ni pourquoi ça n'avait pas suffi. » Elle regarde le tas de grain. « J'ai envoyé mon régisseur, mon prêtre et mon fils aîné. Aucun des trois ne m'adresse plus la parole de la même façon. »",
      extreme:"« Onze ont essayé. Onze sont revenus sans une égratignure, et pas un des onze n'a voulu dire ce qu'il avait raconté, ni pourquoi ça n'a pas suffi. » Elle regarde le tas qui fume. « J'ai envoyé mon régisseur, mon prêtre et mon fils aîné. Le régisseur a demandé son compte. Le prêtre a quitté la paroisse en Germinal. Et mon fils aîné, qui a trente-huit ans, ne m'adresse plus la parole de la même façon depuis onze semaines et ne me dira jamais pourquoi. »" },
  ],
  choix:[
    { t:"« Depuis quand est-il là ? »",
      si:() => !a('tr_histoire'),
      detail:"Deux cents ans de péage, c'est deux cents ans de quelque chose d'autre",
      va:'tr_histoire' },
    { t:"Trouver un des onze",
      si:() => !a('tr_onze'),
      detail:"Onze personnes savent ce qui se passe sur ce pont et aucune ne le dit",
      va:'tr_onze' },
    { t:"Parler au meunier de l'amont",
      si:() => !a('tr_meunier'),
      detail:"Il passe ce pont depuis quarante ans · il a donc payé quarante fois",
      va:'tr_meunier' },
    { t:"Fixer les termes",
      si:() => !a('tr_termes_fait'),
      detail:"Or · noble adulte consentante · les deux · négocier · refuser",
      va:'tr_termes' },
    { t:"Monter au vieux pont",
      detail:"Trois lieues en amont · il y est · il y est toujours",
      va:'tr_pont' },
  ],
},

tr_histoire:{
  qui:'ode',
  texte:[
    "« Deux cent onze ans. On le sait parce qu'il est porté au cartulaire de la maison : *item, au vieux pont, un sou par essieu et un mouton à la Saint-Michel, accordé au gardien du gué.* »",
    "« *Accordé.* »",
    "« Accordé, oui. Ce n'est pas un péage qu'il a pris : c'est un péage qu'on lui a **donné**, par acte, avec contrepartie. »",
    { sobre:"« Quelle contrepartie ? »",
      intense:"« Quelle contrepartie ? »\n\n« L'entretien du pont. » Elle sourit sans joie. « Deux cent onze ans, messire. Le vieux pont n'a jamais été réparé par Sombreval. Pas une fois. Il n'y a pas une ligne de dépense pour ce pont dans deux cents ans de comptes, et le pont tient. »",
      extreme:"« Quelle contrepartie ? »\n\n« L'entretien du pont. » Elle sourit sans joie. « Deux cent onze ans, et pas une ligne de dépense pour ce pont dans deux cents ans de comptes de cette maison. Pas un maçon, pas une pierre, pas un sou. Et le pont tient — cinq arches, quarante pieds au-dessus de l'eau, et il a passé trois crues de siècle. Vous croyez que c'est nous qui l'avons bâti ? »" },
    "« Vous me payez deux cent vingt couronnes pour tuer votre maçon. »",
    "« Je vous paie deux cent vingt couronnes pour rouvrir un passage, et je sais parfaitement ce que je fais, et je le fais quand même, parce qu'il y a onze cents setiers dans une grange qui chauffe et six cents personnes qui mangent du grain. »",
    "§ Elle ne se cache pas derrière un mot. C'est plus rare que l'honnêteté et ça s'appelle savoir ce qu'on achète.",
  ],
  effets:{ flags:['tr_histoire','tr_sait_acte','tr_sait_entretien'],
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez fait ouvrir le cartulaire de Sombreval" },
           marque:"Le péage du vieux pont a été accordé par acte, en échange de l'entretien. Deux cent onze ans.",
           court:"Accordé" },
  suite:'tr_audience', libelleSuite:"Revenir" },

tr_onze:{
  qui:'meunier',
  texte:[
    "Sur les onze, dix refusent de vous parler. C'est un refus poli, gêné, et parfaitement ferme : on vous offre à boire, on parle du temps, et on ne parle pas du pont.",
    "Le onzième est une femme de quarante-cinq ans qui tient une auberge de relais, et elle accepte à une condition.",
    "« Je vous dis comment ça se passe. Je ne vous dis pas ce que j'ai raconté. »",
    "« D'accord. »",
    { sobre:"« On monte sur le pont. Il est assis au milieu. Il demande. »",
      intense:"« On monte sur le pont. Il est assis au milieu, sur le parapet, et il ne se lève pas. Il dit : *une chose vraie que tu n'as dite à personne.* Vous racontez. Et là il fait la seule chose qui compte : il écoute. »\n\n« Il écoute ? »\n\n« Vous ne savez pas ce que c'est, messire. Personne ne sait ce que c'est. »",
      extreme:"« On monte sur le pont. Il est assis au milieu, sur le parapet, et il ne se lève pas. Il dit : *une chose vraie que tu n'as dite à personne.* On raconte. Et là il fait la seule chose qui compte, et c'est pour ça qu'aucun des onze ne veut en parler : il écoute. »\n\n« Il écoute. »\n\n« Vous ne savez pas ce que c'est. Personne ne le sait, parce que personne n'a jamais été écouté comme ça, et parce qu'on ne s'aperçoit qu'on ne l'a jamais été qu'au moment où ça arrive. J'ai quarante-cinq ans. J'ai parlé douze minutes. Je n'avais jamais parlé douze minutes de ma vie sans qu'on m'interrompe. »" },
    "« Et il vous a laissée passer ? »",
    "« Non. »",
    "« Pourquoi ? »",
    "Elle réfléchit longtemps, et elle donne la réponse la plus utile de toute cette affaire.",
    "§ « Parce que ce que j'ai raconté, je me l'étais déjà raconté à moi-même. Il veut du neuf, messire. Il veut quelque chose que **vous** n'avez jamais entendu non plus. »",
  ],
  effets:{ flags:['tr_onze','tr_sait_regle','tr_sait_neuf'],
           exploit:{ eclat:3, temoins:'un', quoi:"une des onze a accepté de vous dire la règle" },
           marque:"Le troll veut une chose vraie que le conteur ne s'est jamais racontée à lui-même.",
           court:"Du neuf" },
  suite:'tr_audience', libelleSuite:"Revenir" },

tr_meunier:{
  qui:'meunier',
  texte:[
    "Le meunier de l'amont a soixante-trois ans et il passe ce pont depuis qu'il en a vingt-trois. Quarante ans de sacs, quarante ans de sous par essieu.",
    "@« Vous lui avez parlé, en quarante ans ? »",
    "« Tous les mois. »",
    "§ Personne dans cette province n'a pensé à poser cette question et il y répond comme si elle allait de soi.",
    "« Il connaît mon père, mon grand-père et mon arrière-grand-père. Il me raconte des choses sur mon arrière-grand-père que ma famille a oubliées. Il sait qu'il boitait. Il sait de quel côté. »",
    { sobre:"« Il se souvient de tout ce qu'on lui a dit sur ce pont. »",
      intense:"« Il se souvient de tout ce qu'on lui a dit sur ce pont depuis deux cent onze ans. Tout. Les noms, les dates, ce que les gens portaient, ce qu'ils ont dit et ce qu'ils ont eu l'air de vouloir dire. C'est ce qu'il est, messire : ce n'est pas un péage, c'est une mémoire. »",
      extreme:"« Il se souvient de tout ce qu'on lui a dit sur ce pont depuis deux cent onze ans. Tout : les noms, les dates, ce que les gens portaient, ce qu'ils ont dit et ce qu'ils ont eu l'air de vouloir dire et n'ont pas dit. Ce n'est pas un péage. C'est une mémoire — et c'est la seule chose vivante à onze lieues qui ait connu le monde d'avant, et qui puisse encore le décrire. »" },
    "« Pourquoi a-t-il changé de tarif ? »",
    "Le meunier pose son sac et il met du temps à répondre.",
    "« Parce qu'il perd. »",
    "« Il perd quoi ? »",
    "« Ce qu'il a. En Nivôse, il m'a demandé comment s'appelait mon grand-père. Il ne me l'avait jamais demandé en quarante ans : c'est lui qui me le disait. »",
    "§ « Une histoire vraie et neuve, ça rentre. Une histoire fausse ou déjà usée, ça ne rentre pas, et ça pousse dehors quelque chose qui était rangé. Il ne prend plus de sous parce que les sous ne remplacent rien. »",
  ],
  effets:{ flags:['tr_meunier','tr_sait_memoire','tr_sait_perte','tr_sait_neuf'], cout:{ moral:4 },
           exploit:{ eclat:4, temoins:'un', quoi:"quelqu'un vous a expliqué ce qu'était vraiment le vieux du pont" },
           marque:"Harn se souvient de tout ce qu'on lui a dit depuis deux cent onze ans. Et il commence à perdre.",
           court:"Il perd" },
  suite:'tr_audience', libelleSuite:"Revenir" },

tr_termes:{
  qui:'adelie',
  titre:"Ce que Sombreval doit",
  texte:[
    "Adélie de Sombreval a trente et un ans et elle tient les granges, ce qui dans cette maison veut dire qu'elle tient tout : Sombreval vit du grain et de rien d'autre.",
    "C'est elle qui a fait poser les claies, elle qui enfonce le bras dans le tas tous les matins pour savoir à quelle température on en est, et elle qui a calculé qu'il reste dix-neuf jours.",
    "« Ma mère vous a dit qu'il s'appelle Harn. »",
    "« Oui. »",
    "« Elle le dit à tout le monde et elle croit que c'est une faiblesse. Ce n'en est pas une : c'est la seule chose honnête de ce contrat, et je préfère qu'elle continue. »",
    "§ Elle parle des termes elle-même, sans qu'on ait à les amener, ce qui n'arrive jamais.",
    "« La coutume est due, elle est écrite dans la lettre, je suis majeure et veuve depuis quatre ans, et personne ici ne décide pour moi. »",
    { sobre:"Elle réfléchit sans se presser.",
      intense:"Elle réfléchit sans se presser, les mains dans les poches de son tablier de grange, et elle a l'air de quelqu'un qui compte quelque chose — parce qu'elle compte quelque chose, elle compte tout le temps, c'est son métier.",
      extreme:"Elle réfléchit sans se presser, les mains dans les poches d'un tablier de grange couvert de poussière de grain, et elle a l'air de quelqu'un qui compte — parce qu'elle compte, tout le temps, c'est son métier et c'est aussi devenu sa façon de regarder les gens." },
    "« Non. »",
    "« Bien. »",
    "« Attendez, je vous dis pourquoi, parce que la moitié de ce que vous ferez là-haut en dépend. » Elle sort une main de sa poche. « J'ai été mariée à quinze ans à un homme de quarante-deux, et j'ai passé onze ans à faire des choses que je ne voulais pas faire dans une chambre où je ne voulais pas être. Il est mort il y a quatre ans. Depuis quatre ans je décide, et ce que je décide, c'est non — à tout le monde, à tout, sans exception, et ça n'a rien à voir avec vous. »",
    "« Ça me va. »",
    "« Je sais. C'est écrit dans le formulaire. » Un temps. « Mais je vais vous donner autre chose, et c'est mieux payé que la coutume. »",
    "« Quoi ? »",
    "§ « Ce que je viens de vous dire, je ne l'ai dit à personne. Vous en avez besoin là-haut. Prenez-le. »",
  ],
  effets:{ flags:['tr_termes_fait','tr_or_seul','tr_adelie','tr_conte_donne'],
           exploit:{ eclat:3, temoins:'un', quoi:"quelqu'un vous a confié une chose qu'elle n'avait dite à personne" },
           marque:"Adélie de Sombreval a refusé la coutume et vous a donné son histoire à la place.",
           court:"Elle a donné" },
  suite:'tr_audience', libelleSuite:"Revenir" },

};

/* ══ LE VIEUX PONT ════════════════════════════════════════════════════════ */
const ARC_C05_2 = {

tr_pont:{
  qui:'harn',
  lieu:"Le vieux pont · cinq arches · quarante pieds au-dessus de l'eau",
  titre:"Une chose vraie",
  texte:[
    "Le vieux pont fait cinq arches et quarante pieds au-dessus de l'eau. Il est en pierre sèche appareillée, sans mortier, et il n'y a pas un joint ouvert sur deux cents pieds de longueur.",
    { sobre:"Il est assis au milieu, sur le parapet. Il ne se lève pas.",
      intense:"Il est assis au milieu, sur le parapet, les pieds pendant vers l'amont, et il ne se lève pas. Onze pieds debout, probablement — mais on ne le verra pas debout : il est assis quand vous arrivez et il sera assis quand vous partirez, dans un sens ou dans l'autre.",
      extreme:"Il est assis au milieu, sur le parapet, les pieds pendants vers l'amont, et il ne se lève pas. Onze pieds debout, probablement, mais on ne le verra pas debout. La peau a la couleur et le grain d'une pierre de rivière ; il y a du lichen dessus, du vrai, gris-vert, aux endroits qui ne bougent jamais — les épaules, le dessus des avant-bras — ce qui veut dire qu'il reste immobile assez longtemps pour que du lichen s'installe et qu'il ne l'enlève pas." },
    "Il a une main posée à plat sur la pierre du parapet, et il en caresse le joint avec le pouce, sans y penser, comme un homme caresse la table de sa cuisine.",
    "« Tu es le douzième. »",
    "La voix est basse et elle porte peu : il ne fait aucun effort pour être impressionnant, ce qui est infiniment plus impressionnant.",
    "@« Je suis le douzième. »",
    "« Les onze ont menti. Trois n'ont pas menti. Ils ont dit une chose vraie qu'ils s'étaient déjà dite cent fois. Ça revient au même. Ça coûte pareil. »",
    "§ « Une chose vraie que tu n'as dite à personne. Et que tu ne t'es pas dite non plus. »",
    "« Sinon ? »",
    "« Sinon tu ne passes pas. Je ne te tuerai pas. Personne n'est mort sur ce pont en deux cent onze ans. Je ne vais pas commencer pour du grain. Tu ne passes pas. Ton grain pourrit. Tu vis avec. »",
    () => a('tr_sait_perte')
      ? "Il caresse le joint du pouce. En Nivôse, il a demandé au meunier comment s'appelait son grand-père."
      : "Il caresse le joint du pouce, machinalement, et il attend.",
  ],
  effets:{ flags:['tr_pont'] },
  choix:[
    { t:"Lui raconter une blessure",
      detail:"Une chose vraie, personnelle, qui fait mal · et qu'on s'est racontée cent fois",
      risque:"prudent", va:'tr_blessure' },

    { t:"Lui donner l'histoire d'Adélie de Sombreval",
      si:() => a('tr_conte_donne'),
      detail:"Elle est vraie, elle est neuve, et elle n'est pas à vous",
      risque:"dangereux", va:'tr_adelie_conte' },

    { t:"Mentir, mais très bien",
      detail:"Deux cent onze ans d'écoute contre une heure de préparation · Présence contre 13",
      risque:"très dangereux", definitif:true,
      test:{ carac:'presence', comp:null, dc:13, manoeuvre:'mentir',
             situation:() => (a('tr_sait_regle') ? 2 : 0) + (a('tr_sait_memoire') ? 2 : 0) },
      degres:{ dominante:'tr_mensonge_dom', couteuse:'tr_mensonge_cout', echec:'tr_mensonge_ko' } },

    { t:"Karlsberg",
      detail:"Dix-neuf ans · une maison rayée · une nuit dont vous n'avez jamais parlé à personne de vivant",
      ferme:"Ferme : le fait que personne au monde ne sache cette nuit-là",
      risque:"définitif", definitif:true, va:'tr_karlsberg' },

    { t:"Le tuer",
      detail:"Onze pieds, de la pierre, deux cent onze ans, et un pont qu'il a bâti · très mauvaise idée",
      ferme:"Ferme : la mémoire de deux cent onze ans de cette province",
      risque:"définitif", definitif:true, va:'tr_combat' },

    { t:"Faire demi-tour",
      detail:"Le grain pourrira · vous n'aurez rien dit · vous n'aurez rien pris",
      risque:"définitif", definitif:true, va:'tr_fin_parti' },
  ],
},

tr_blessure:{
  qui:'harn',
  texte:[
    "Vous lui racontez la clavicule.",
    "C'est vrai. C'est même la chose la plus vraie que vous ayez sur vous : une cicatrice qui n'a pas été faite par une arme, sous la clavicule gauche, qui tire quand il gèle et dont vous n'avez jamais expliqué l'origine à quiconque.",
    "Il écoute.",
    { sobre:"Et c'est vrai ce qu'on dit : personne ne sait ce que c'est, d'être écouté comme ça.",
      intense:"Et c'est vrai, ce que disait la femme de l'auberge : personne ne sait ce que c'est. Il ne hoche pas la tête, il ne relance pas, il ne fait aucun des petits bruits que font les gens pour montrer qu'ils suivent. Il écoute, entièrement, sans rien attendre, et au bout de deux minutes vous vous entendez dire des choses que vous n'aviez pas prévu de dire.",
      extreme:"C'est vrai, ce que disait la femme de l'auberge : personne ne sait ce que c'est. Il ne hoche pas la tête, ne relance pas, ne fait aucun des petits bruits que font les gens pour montrer qu'ils suivent. Il écoute entièrement, sans rien attendre, sans rien préparer — et au bout de deux minutes vous vous entendez dire des choses que vous n'aviez pas prévu de dire, et au bout de six vous comprenez pourquoi onze personnes sont redescendues sans vouloir en parler." },
    "Quand vous avez fini, il attend encore un peu, pour être sûr.",
    "Puis il dit :",
    "« Tu t'es déjà raconté ça. »",
    "« Oui. »",
    "« Combien de fois ? »",
    "§ « Je ne sais pas. Souvent. »",
    "« Alors ça ne rentre pas. » Il n'y a aucun reproche dedans. « Ce n'est pas ta faute. Une chose qu'on se raconte, on l'a rangée. Elle a une forme. Elle a des mots. Elle a un début et une fin. Ce n'est plus de la mémoire. C'est un objet. »",
    "« Et vous n'en voulez pas. »",
    "« Je ne peux pas en vouloir. Ça ne se pose nulle part. »",
    "Il retourne à son joint de pierre.",
    "« Tu peux essayer encore. Tu es le douzième et je ne suis pas pressé. »",
  ],
  effets:{ flags:['tr_essai_blessure'], cout:{ moral:4 },
           marque:"Vous avez raconté la clavicule. Elle était déjà rangée.", court:"Déjà rangé" },
  suite:'tr_pont', libelleSuite:"Essayer encore" },

tr_adelie_conte:{
  qui:'harn',
  texte:[
    "Vous lui racontez ce qu'Adélie de Sombreval vous a dit dans une grange qui chauffe.",
    "Quinze ans. Un homme de quarante-deux. Onze années. Et quatre ans de non à tout le monde, à tout, sans exception.",
    "Il écoute jusqu'au bout — jusqu'au tout dernier mot, sans une interruption — et il met un long moment à répondre.",
    { sobre:"« C'est vrai. C'est neuf. Et ce n'est pas à toi. »",
      intense:"« C'est vrai », dit-il enfin. « C'est neuf. Et ce n'est pas à toi. »\n\n« Elle me l'a donné. »\n\n« Je sais. Je l'ai entendu en t'écoutant : tu répètes exactement, tu n'as rien arrangé, et un homme qui n'arrange rien répète quelque chose qu'on lui a confié. »",
      extreme:"« C'est vrai », dit-il enfin. « C'est neuf. Et ce n'est pas à toi. »\n\n« Elle me l'a donné. »\n\n« Je sais. Je l'ai entendu en t'écoutant : tu répètes exactement, tu n'arranges rien, tu ne coupes pas, tu ne places pas — un homme qui raconte sa propre histoire la raconte mal, il hésite, il revient en arrière, il choisit le mauvais mot et il le garde. Toi tu récites. C'est très respectueux et ça ne rentre pas. »" },
    "§ « Je le garde quand même. »",
    "« Vous venez de dire que ça ne rentre pas. »",
    "« Ça ne paie pas. Ce n'est pas la même chose. » Il tourne enfin la tête vers vous. « Elle a trente et un ans. Elle tient les granges. Elle a dit non à tout pendant quatre ans. Personne dans cette province ne le saura. Maintenant quelqu'un le sait. Ça vaut d'être gardé. Ça ne vaut pas un passage. Ce n'est pas toi qui l'as payé. »",
    "Il repose sa main sur le parapet.",
    "« Dis-lui merci de ma part. Elle saura de quoi je parle. »",
  ],
  effets:{ flags:['tr_essai_adelie','tr_harn_garde'], cout:{ moral:-4 },
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous avez transmis une chose confiée sans l'abîmer" },
           marque:"Harn a gardé l'histoire d'Adélie sans la faire payer.", court:"Il l'a gardée" },
  suite:'tr_pont', libelleSuite:"Essayer encore" },

tr_mensonge_dom:{
  qui:'harn',
  texte:[
    "Il faut une heure, un endroit tranquille, et une méthode qu'on n'apprend pas dans une salle d'armes.",
    { sobre:"Un bon mensonge n'est pas une invention. C'est une vérité déplacée.",
      intense:"Un bon mensonge n'est jamais une invention : c'est une vérité qu'on déplace. On prend une chose qui est arrivée à quelqu'un d'autre, on change trois détails, on garde tout le reste — et surtout on garde les mauvais détails, ceux qui ne servent à rien, ceux qu'un menteur retirerait.",
      extreme:"Un bon mensonge n'est jamais une invention : c'est une vérité déplacée. On prend une chose arrivée à quelqu'un d'autre, on change trois détails, on garde tout le reste — et surtout on garde les mauvais détails, ceux qui ne servent à rien, ceux qu'un menteur retirerait parce qu'ils ralentissent. C'est là que tout se joue : un menteur raconte bien, et personne ne raconte bien sa propre vie." },
    "Vous hésitez au bon endroit. Vous revenez en arrière une fois. Vous choisissez un mot médiocre et vous le gardez.",
    "Il écoute onze minutes.",
    "« Passe. »",
    "§ Et vous passez. Le grain de Sombreval traverse le vieux pont dans les quatre jours, onze cents setiers en dix-neuf charrois, et six cents personnes mangent.",
    "Vous êtes à trente pas de l'autre côté quand il parle une dernière fois, sans hausser la voix et sans se retourner.",
    "« Je ne sais pas encore ce que ça m'a fait perdre. Je le saurai en Nivôse, quand quelqu'un me demandera un nom que j'avais. »",
    { sobre:"Il n'y a rien à répondre à ça.",
      intense:"Il n'y a rien à répondre à ça, et vous ne répondez rien, et c'est peut-être la seule chose honnête que vous fassiez de tout ce contrat.",
      extreme:"Il n'y a rien à répondre à ça. Vous ne répondez rien et vous continuez de marcher, et c'est peut-être la seule chose honnête de tout ce contrat — parce que s'excuser aurait été s'excuser d'avoir réussi, et qu'il n'aurait pas supporté ça." },
  ],
  effets:{ flags:['tr_menti','tr_passe','tr_harn_perd'], cout:{ moral:14 },
           exploit:{ eclat:6, temoins:'aucun', quoi:"vous avez menti à deux cent onze ans d'écoute" },
           marque:"Vous avez menti à Harn et vous êtes passé. Il ne saura qu'en Nivôse ce que ça lui a coûté.",
           court:"Le mensonge" },
  suite:'tr_fin_menti', libelleSuite:"Passer" },

tr_mensonge_cout:{
  qui:'harn',
  texte:[
    "Il écoute onze minutes et il vous laisse finir.",
    "« Passe. »",
    "Vous faites trois pas.",
    "« Attends. »",
    { sobre:"« Ce n'est pas vrai. »",
      intense:"« Ce n'est pas vrai », dit-il, sans colère. « Je le prends quand même — j'ai décidé de le prendre pendant que tu parlais, à peu près au milieu. Mais je ne veux pas que tu passes en croyant m'avoir eu, parce que ça t'abîmerait plus que moi. »",
      extreme:"« Ce n'est pas vrai », dit-il sans colère. « Je le prends quand même : j'ai décidé de le prendre à peu près au milieu, quand j'ai compris que tu avais travaillé. Mais je ne veux pas que tu passes en croyant m'avoir eu — pas par orgueil : parce que ça t'abîmerait plus que moi, et parce que ça fait deux cent onze ans que je regarde des gens s'abîmer sur des choses qu'ils croient avoir gagnées. »" },
    "« Pourquoi le prendre alors ? »",
    "« Parce que tu as passé une heure à préparer une chose pour moi. Personne n'a jamais fait ça. Onze sont venus avec ce qu'ils avaient dans les poches. »",
    "§ Il pose la main à plat sur le joint.",
    "« Ça ne se range pas. Ça va rester en travers et pousser quelque chose dehors, et je ne saurai pas quoi avant longtemps. Va-t'en, maintenant. Je ne suis pas fâché. »",
  ],
  effets:{ flags:['tr_menti','tr_passe','tr_harn_perd','tr_harn_su'], cout:{ moral:18 },
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous avez menti et il vous a laissé passer quand même" },
           marque:"Harn a su que vous mentiez, et il vous a laissé passer.", court:"Il a su" },
  suite:'tr_fin_menti', libelleSuite:"Passer" },

tr_mensonge_ko:{
  qui:'harn',
  texte:[
    "Vous racontez et il vous interrompt à la quatrième phrase, ce qu'il n'a pas fait une seule fois avec personne.",
    "« Non. »",
    "« Vous ne m'avez pas laissé— »",
    "« Non, parce que tu racontes bien. »",
    { sobre:"§ Personne ne raconte bien sa propre vie.",
      intense:"§ « Personne ne raconte bien sa propre vie. Personne. En deux cent onze ans, pas un. On hésite, on revient, on donne des détails inutiles, on oublie le nom du village et on s'arrête pour le chercher. Toi tu as un début, un milieu et une fin, et les trois arrivent quand il faut. »",
      extreme:"§ « Personne ne raconte bien sa propre vie. Pas un, en deux cent onze ans. On hésite. On revient en arrière. On donne des détails inutiles sur le temps qu'il faisait. On oublie le nom du village et on s'arrête pour le chercher, et parfois on ne le retrouve pas et ça gâche tout. Toi tu as un début, un milieu et une fin, et les trois arrivent au bon moment. C'est du travail, et le travail est ce qui te trahit. »" },
    "Il n'est pas en colère. Il a même l'air un peu déçu, ce qui est pire.",
    "« Tu peux essayer encore. Pas ça. Tu ne sais faire que ça bien. Ce que tu sais faire bien ne me sert à rien. »",
  ],
  effets:{ flags:['tr_essai_mensonge'], cout:{ moral:8 },
           marque:"Harn vous a interrompu à la quatrième phrase : vous racontiez trop bien.",
           court:"Trop bien" },
  suite:'tr_pont', libelleSuite:"Essayer encore" },

};
Object.assign(ARC_C05, ARC_C05_2);

/* ══ KARLSBERG ════════════════════════════════════════════════════════════ */
const ARC_C05_3 = {

tr_karlsberg:{
  qui:'harn',
  titre:"Ce qu'on n'a jamais dit",
  texte:[
    "Il y a une nuit dont vous n'avez parlé à personne de vivant, et il n'y a personne de vivant à qui vous auriez pu en parler : c'est exactement le même ensemble, et il est vide depuis dix-neuf ans.",
    "Vous vous asseyez sur le parapet, à six pieds de lui, les jambes vers l'amont.",
    "Et vous racontez.",
    { sobre:"Vous racontez mal. C'est ce qui fait que ça marche.",
      intense:"Vous racontez mal. Vous commencez par le milieu, vous revenez, vous vous arrêtez sur un détail sans importance — l'odeur du buis coupé dans la cour, parce qu'on avait taillé le buis ce jour-là — et vous restez deux minutes sur ce buis sans arriver à en sortir. C'est ce qui fait que ça marche.",
      extreme:"Vous racontez mal. Vous commencez par le milieu, vous revenez, vous vous arrêtez sur un détail sans importance — l'odeur du buis coupé dans la cour, parce qu'on avait taillé le buis ce jour-là — et vous restez deux minutes sur ce buis sans arriver à en sortir. Vous cherchez le nom d'une servante et vous ne le retrouvez pas. Vous employez trois fois de suite le même mot médiocre. C'est ce qui fait que ça marche, et vous ne le faites pas exprès." },
    "Vous dites le nom. Vous le dites au milieu, sans préparation, parce qu'il faut bien nommer une maison pour raconter ce qui lui est arrivé.",
    "@« Karlsberg. »",
    "§ Il ne bouge pas. Sa main s'arrête sur le joint de pierre et elle y reste.",
    "Vous racontez dix-neuf ans en un peu plus d'une heure. Il ne vous interrompt pas une fois.",
    "Quand vous avez fini, il attend encore — longtemps, beaucoup plus longtemps que pour les autres — puis il dit une seule chose :",
    "« C'est rentré. »",
    "Un temps.",
    "« Passe quand tu voudras. Le grain passera cette semaine. Ce n'est plus la question. »",
    "« Il y a une autre question ? »",
    "« Oui. »",
    { sobre:"Il tourne la tête.",
      intense:"Il tourne la tête vers vous, entièrement, pour la première fois, et deux cent onze ans de mémoire vous regardent depuis un visage qui a du lichen sur les épaules.",
      extreme:"Il tourne la tête vers vous, entièrement, pour la première fois de l'entretien. Deux cent onze ans de mémoire vous regardent depuis un visage qui a du lichen aux épaules, et vous comprenez à cet instant que vous n'avez jamais été regardé de votre vie par quelque chose qui savait déjà tout ce que vous alliez dire ensuite." },
    "« Une femme de ta maison a passé ce pont il y a vingt ans. »",
  ],
  effets:{ flags:['tr_karlsberg','tr_passe','tr_dit_le_nom'], suspicion:12,
           exploit:{ eclat:6, temoins:'aucun', quoi:"vous avez dit Karlsberg à voix haute pour la première fois en dix-neuf ans" },
           marque:"Vous avez raconté Karlsberg à Harn. C'est rentré.", court:"C'est rentré" },
  suite:'tr_mere', libelleSuite:"« Il y a vingt ans »" },

tr_mere:{
  qui:'harn',
  titre:"Vingt ans",
  texte:[
    "« Elle allait vers le nord. Elle avait deux enfants, un garçon de neuf ans et une fille plus petite, et une charrette de louage avec un cheval qui ne valait rien. »",
    "§ Neuf ans. Ça fait dix-neuf ans plus un.",
    "« Elle a payé le sou par essieu. C'était encore le tarif. Elle a parlé. Les gens parlent sur ce pont. Je ne le demande pas. Il fait quarante pieds au-dessus de l'eau, il fait nuit, et il y a quelqu'un d'assis. »",
    "« Qu'est-ce qu'elle a dit ? »",
    "« Tu es sûr de vouloir ça ? »",
    "« Oui. »",
    "« Réfléchis encore. Ce que je garde, je le garde entier. Je ne l'arrange pas. Je ne l'adoucis pas. Je ne rends pas la moitié. »",
    "« Oui. »",
    { sobre:"Il ferme les yeux. C'est la seule fois.",
      intense:"Il ferme les yeux — la seule fois de tout l'entretien — et quand il parle, la voix change : elle devient plus rapide, plus haute, et ce n'est plus tout à fait la sienne. Il ne raconte pas ce qu'elle a dit. Il le **rend**.",
      extreme:"Il ferme les yeux, la seule fois de tout l'entretien, et quand il parle, la voix change. Plus rapide, plus haute, avec un défaut de prononciation sur les *r* qui n'est pas le sien. Il ne raconte pas ce qu'elle a dit : il le rend. Deux cent onze ans de mémoire ne sont pas un livre où l'on prend des notes — c'est autre chose, et personne dans cette province n'a jamais eu à en supporter la démonstration." },
    "« *Ils avaient l'ordonnance. Je l'ai vue sur la table de mon mari trois jours avant. Elle était signée du bas de la maison, pas du haut : ce n'est pas Chastel qui a fait rayer Karlsberg, c'est quelqu'un de chez nous qui le leur a demandé, et Chastel a simplement dit oui parce qu'on dit toujours oui à ce genre de demande.* »",
    "^« *Je ne dirai pas le nom à mes enfants. Ils passeront leur vie à le chercher et ils mourront pour ça. Je préfère qu'ils ne sachent rien et qu'ils vivent vieux.* »",
    "§ Il rouvre les yeux.",
    "« Voilà. Je te l'ai rendu entier. Elle n'a pas dit le nom. Elle ne l'a dit à personne. Je ne l'ai pas. »",
    "« Elle est morte trois ans après. »",
    "« Je sais », dit Harn. « Les gens qui passent ce pont ne repassent jamais dans l'autre sens, et au bout d'un moment on apprend ce que ça veut dire. »",
  ],
  effets:{ flags:['tr_mere','karlsberg_ordonnance','tr_sait_dedans'], suspicion:6,
           exploit:{ eclat:5, temoins:'aucun', quoi:"vous savez maintenant d'où est venue l'ordonnance" },
           marque:"L'ordonnance qui a rayé Karlsberg est venue de l'intérieur de la maison. Votre mère l'avait vue.",
           court:"De l'intérieur" },
  suite:'tr_fin_conte', libelleSuite:"Redescendre" },

/* ── Le combat, qui est une mauvaise idée ────────────────────────────────── */
tr_combat:{
  qui:'harn', melee:true,
  titre:"Onze pieds",
  effets:{ melee:{ position:"sur le pont", note:"Onze pieds · deux cent onze ans" } },
  texte:[
    "Il ne se lève pas tout de suite. Il vous regarde dégainer avec une lassitude qui n'a rien de théâtral : il a vu ça, il sait comment ça se passe, et il sait surtout comment ça se termine.",
    "« La poudre », dit-il. « C'est la poudre qui marche. Pas ça. »",
    "Puis il se lève, parce qu'il faut bien.",
    { sobre:"Onze pieds. Il n'y a pas de mot pour ce que ça fait quand ça se lève à six pas.",
      intense:"Onze pieds. Il n'y a pas de mot pour ce que ça fait quand ça se lève à six pas : ce n'est pas de la peur, c'est une réévaluation. Toutes les distances de la scène changent en même temps, et la vôtre devient très petite.",
      extreme:"Onze pieds. Il n'existe pas de mot pour ce que ça fait quand ça se lève à six pas de vous : ce n'est pas de la peur, c'est une réévaluation. Toutes les distances de la scène changent d'un coup et la vôtre devient minuscule. La main qui caressait le joint de pierre fait la taille d'un plateau de balance, et elle a passé deux cent onze ans à poser des pierres de trois cents livres sans mortier." },
  ],
  choix:[
    { t:"Les yeux",
      detail:"Le seul endroit de lui qui ne soit pas de la pierre · Agilité + épées contre 13",
      risque:"très dangereux",
      test:{ carac:'agilite', comp:'epees', dc:13, adversaire:'harn', manoeuvre:'yeux', equipement:2 },
      degres:{ dominante:'tr_c_yeux_dom', couteuse:'tr_c_yeux_cout', echec:'tr_c_ko' } },
    { t:"Le faire tomber du pont",
      detail:"Quarante pieds et de l'eau · Force + lutte contre 14",
      risque:"très dangereux",
      test:{ carac:'force', comp:'lutte', dc:14, adversaire:'harn', manoeuvre:'pont' },
      degres:{ dominante:'tr_c_pont_dom', couteuse:'tr_c_ko', echec:'tr_c_ko' } },
    { t:"L'Onde",
      detail:"Sur onze pieds de pierre, seul, sur un pont, sans témoin · Volonté + Onde contre 12",
      risque:"définitif", definitif:true,
      test:{ carac:'volonte', comp:'onde', dc:12, adversaire:'harn', manoeuvre:'onde_pont', cout:{ concentration:35 } },
      degres:{ dominante:'tr_c_onde_dom', couteuse:'tr_c_onde_dom', echec:'tr_c_ko' } },
    { t:"Rengainer",
      detail:"Il ne vous a pas encore touché · il ne le fera pas si vous rangez",
      risque:"prudent", va:'tr_rengaine' },
  ],
},

tr_c_yeux_dom:{
  texte:[
    "Il n'y a que ça, sur onze pieds de pierre vivante : deux endroits de la taille d'un poing.",
    { sobre:"Vous en prenez un. Il en reste un et il suffit largement.",
      intense:"Vous en prenez un. Ça se fait en montant sur le parapet et en sautant, ce qui est absurde et ce qui est la seule façon d'arriver à hauteur — et ça marche, et il en reste un, et un œil suffit largement à quelque chose qui a passé deux cents ans à ne pas bouger.",
      extreme:"Vous en prenez un. Il faut monter sur le parapet et sauter, ce qui est absurde et ce qui est la seule façon d'arriver à hauteur. Ça entre, ça ne ressort pas comme prévu, et ce qui coule sur la pierre du parapet est clair et épais et ne ressemble à rien de connu. Il en reste un. Un œil suffit largement à une chose qui a passé deux cents ans assise." },
    "Il ne crie pas. Il pose la main sur sa figure, il s'assied sur le parapet, et il reste comme ça.",
    "« Va-t'en. »",
    "§ « Le grain passera. Je ne tiens plus le pont d'un seul œil, il faut voir les deux bouts. Va-t'en. »",
    "Vous descendez du pont avec une victoire qui ne ressemble à rien de ce que le mot promet.",
  ],
  effets:{ flags:['tr_borgne','tr_passe','tr_harn_vivant'], cout:{ endurance:16, moral:18 },
           exploit:{ eclat:7, temoins:'aucun', quoi:"vous avez crevé un œil au vieux du pont" },
           marque:"Vous avez pris un œil à Harn. Il ne tient plus le pont.", court:"Un œil" },
  suite:'tr_fin_borgne', libelleSuite:"Redescendre" },

tr_c_yeux_cout:{
  melee:true,
  texte:[
    "Vous montez sur le parapet et vous sautez, et il lève le bras.",
    { sobre:"Le bras vous prend en vol. Vous partez par-dessus.",
      intense:"Le bras vous prend en vol, à plat, et vous partez par-dessus le parapet. Quarante pieds. L'eau d'une rivière de printemps à quarante pieds n'est pas de l'eau : c'est un sol qui cède au dernier moment.",
      extreme:"Le bras vous prend en vol, à plat, et vous partez par-dessus le parapet. Quarante pieds. À quarante pieds, l'eau d'une rivière de printemps n'est pas de l'eau : c'est un sol qui accepte de céder au dernier moment, et il faut arriver dedans exactement droit, ce que personne n'arrive à faire quand on est parti en tournant." },
    "Vous arrivez de côté. Trois côtes, l'épaule gauche, et deux cents pas de courant avant de pouvoir attraper quelque chose.",
    "§ Quand vous ressortez sur la berge, il est assis au même endroit, dans la même position, et il regarde l'eau.",
    "Il ne descend pas. Il ne dit rien. Il vous a jeté d'un pont et il attend de voir si vous vous relevez, comme il attendrait la pluie.",
  ],
  effets:{ cout:{ endurance:24, vitalite:20 },
           blessure:{ id:'cotes_tr', zone:"Côtes gauches", type:"trois, à l'entrée dans l'eau",
                      gravite:3, douleur:3, saignement:0, fonction:['force','endurance','epees','lutte','agilite'],
                      cicatrice:"un flanc qui accroche à l'inspiration pendant six mois" },
           marque:"Harn vous a jeté du vieux pont. Quarante pieds.", court:"Quarante pieds" },
  suite:'tr_pont', libelleSuite:"Remonter" },

tr_c_pont_dom:{
  texte:[
    "On ne renverse pas onze pieds de pierre. On les fait basculer, ce qui est différent et ce qui ne demande que de la géométrie et un parapet à la bonne hauteur.",
    { sobre:"Le parapet lui arrive au-dessus du genou. C'est toute l'affaire.",
      intense:"Le parapet lui arrive au-dessus du genou : c'est toute l'affaire, et il a passé deux cent onze ans à s'asseoir dessus sans jamais se demander ce que ça voudrait dire un jour. Vous entrez bas, vous prenez la jambe d'appui, et le parapet fait le reste.",
      extreme:"Le parapet lui arrive au-dessus du genou. C'est toute l'affaire, et il a passé deux cent onze ans à s'asseoir dessus sans jamais se demander ce que ça pourrait vouloir dire. Vous entrez bas, vous prenez la jambe d'appui à deux bras, vous poussez vers le vide — et onze pieds de pierre basculent par-dessus leur propre pont avec une lenteur épouvantable, en essayant de se rattraper au joint qu'ils caressaient." },
    "Quarante pieds. Le bruit qu'il fait en arrivant n'est pas un bruit d'eau.",
    "§ Il ne remonte pas. Une chose faite de pierre ne flotte pas et ne nage pas.",
    "Vous restez sur le pont un long moment à regarder l'endroit.",
    "Deux cent onze ans de mémoire de cette province sont au fond d'une rivière de printemps, à quarante pieds, dans huit pieds d'eau et de vase, et il n'y a plus une seule créature vivante à onze lieues qui ait connu le monde d'avant.",
  ],
  effets:{ flags:['tr_mort','tr_passe','tr_noye'], cout:{ endurance:20, moral:25 },
           exploit:{ eclat:8, temoins:'aucun', quoi:"vous avez fait basculer le vieux du pont dans sa propre rivière" },
           marque:"Harn est au fond de la rivière. Deux cent onze ans de mémoire avec lui.",
           court:"Au fond" },
  suite:'tr_fin_mort', libelleSuite:"Redescendre" },

tr_c_onde_dom:{
  texte:[
    "Il n'y a personne. C'est la première chose que vous vérifiez et c'est déjà une réponse sur ce que vous êtes devenu.",
    "Vous ouvrez la main.",
    { sobre:"Onze pieds de pierre partent en arrière de six pas.",
      intense:"Onze pieds de pierre partent en arrière de six pas et s'arrêtent contre le parapet du fond, et le parapet — deux cent onze ans de pierre sèche appareillée sans mortier — tient.",
      extreme:"Onze pieds de pierre partent en arrière de six pas et s'arrêtent contre le parapet opposé, qui tient. Deux cent onze ans de pierre sèche appareillée sans mortier, et ça tient. Vous avez lancé une chose de deux mille livres contre un mur qu'elle a bâti elle-même, et c'est le mur qui gagne, et il y a là-dedans une leçon que vous ne prendrez pas le temps de comprendre." },
    "Il se relève. Lentement, en s'appuyant au parapet, et quelque chose de cassé dedans fait un bruit de gravier.",
    "§ Puis il fait la chose la plus inattendue de tout l'arc : il rit.",
    "« Ah », dit-il. « Ah. »",
    "Il se rassied à sa place, sur le parapet, les pieds vers l'amont.",
    "« Karlsberg. »",
    "Vous ne l'avez pas dit.",
    "@« Je n'ai pas dit— »",
    "« Non. » Il caresse le joint du pouce. « J'ai deux cent onze ans. J'ai vu ça deux fois. La deuxième était une femme sur ce pont, il y a vingt ans. Elle avait deux enfants et une charrette de louage. »",
    "« Passe, le fils. Le grain passera aussi. »",
    "§ Il ne demande pas d'histoire. Il vient d'en recevoir une et vous ne l'avez pas racontée.",
  ],
  effets:{ flags:['tr_onde','tr_passe','tr_harn_vivant','tr_reconnu'], suspicion:10,
           cout:{ endurance:18, concentration:20 },
           exploit:{ eclat:8, temoins:'aucun', quoi:"vous avez employé l'Onde sur le vieux pont" },
           marque:"Harn vous a reconnu à l'Onde. Il a vu ça deux fois en deux cent onze ans.",
           court:"Il a reconnu" },
  suite:'tr_mere', libelleSuite:"« Il y a vingt ans »" },

tr_c_ko:{
  melee:true,
  texte:[
    "Ça ne se passe pas. Ce n'est même pas un échec : c'est une catégorie d'erreur.",
    { sobre:"Il vous prend, il vous pose sur la berge, et il retourne s'asseoir.",
      intense:"Il vous prend — d'une main, par le devant du cuir, sans effort visible — il descend les onze marches du pont, il vous pose sur la berge comme on pose un seau, et il remonte s'asseoir.",
      extreme:"Il vous prend d'une main par le devant du cuir, sans effort visible et sans vous serrer, descend les onze marches du pont, vous pose sur la berge comme on pose un seau qu'on a fini d'utiliser, et remonte s'asseoir. Il ne vous a pas frappé. Il ne vous a rien cassé. Il a manutentionné un objet, et il vous faudra plusieurs jours pour digérer que c'est exactement ce qui s'est passé." },
    "« Reviens quand tu voudras. Le tarif ne change pas. »",
    "§ On peut mourir dans ce métier. On peut aussi être posé sur une berge, et ce n'est pas mieux.",
  ],
  effets:{ cout:{ endurance:18, moral:14 },
           marque:"Harn vous a posé sur la berge d'une main et il est remonté s'asseoir.",
           court:"Posé" },
  suite:'tr_pont', libelleSuite:"Remonter" },

tr_rengaine:{
  qui:'harn',
  texte:[
    "Vous rengainez.",
    "Il se rassied. Ça prend un moment — onze pieds ne se rassoient pas vite — et il reprend exactement la position qu'il avait, les pieds vers l'amont, la main sur le joint.",
    "« Bien. »",
    "§ « Ce n'est pas du courage, ce que tu viens de faire, et ce n'est pas de la lâcheté non plus. C'est du calcul, et c'est la seule chose que je respecte chez les gens de ton métier. »",
    "« Vous en avez vu beaucoup. »",
    "« Onze en onze semaines et deux cents en deux cents ans. » Il regarde l'eau. « Le tarif ne change pas. »",
  ],
  effets:{ flags:['tr_rengaine'],
           marque:"Vous avez rengainé devant Harn. Il a dit que c'était du calcul.", court:"Rengainé" },
  suite:'tr_pont', libelleSuite:"Reprendre" },

};
Object.assign(ARC_C05, ARC_C05_3);

/* ══ LES ISSUES ═══════════════════════════════════════════════════════════ */
const ARC_C05_4 = {

tr_fin_conte:{
  lieu:"Sombreval · la grange haute · quatre jours plus tard",
  titre:"Onze cents setiers",
  qui:'ode',
  texte:[
    "Le grain passe en quatre jours. Dix-neuf charrois, onze cents setiers, et un tas qui cesse de chauffer parce qu'on l'a enfin remué.",
    "Ode de Sombreval vous paie deux cent vingt couronnes dans la grange vide, et elle pose la seule question qui l'intéresse.",
    "« Il est vivant ? »",
    "« Il est vivant. »",
    { sobre:"Elle ferme les yeux une seconde. C'est tout.",
      intense:"Elle ferme les yeux une seconde et elle les rouvre, et c'est tout ce qu'elle se permet, parce qu'elle a soixante-quatre ans, qu'elle tient cette maison depuis trente et un, et qu'elle a passé onze semaines à payer des gens pour aller tuer quelqu'un dont elle connaît le nom.",
      extreme:"Elle ferme les yeux une seconde et les rouvre : tout ce qu'elle se permet. Soixante-quatre ans, trente et un ans à tenir cette maison, et onze semaines passées à payer des gens pour aller tuer quelqu'un dont elle connaît le nom, dont sa grand-mère connaissait le nom, et qui a bâti le seul pont par lequel son grain puisse sortir." },
    "« Qu'est-ce que vous lui avez raconté ? »",
    "« Non. »",
    "« Bien. » Elle hoche la tête. « Vous êtes le douzième et vous répondez comme les onze autres. Je commence à comprendre à quoi ressemble ce pont. »",
    () => a('tr_mere')
      ? "§ Ce que vous avez emporté ne se paie pas en couronnes et ne se raconte pas dans une grange.\n\nL'ordonnance qui a rayé votre maison est venue de l'intérieur de votre maison. Votre mère l'avait vue sur une table trois jours avant, elle n'a pas dit le nom, et elle a choisi de ne pas le dire à ses enfants pour qu'ils vivent vieux.\n\nCe choix-là a tenu dix-neuf ans. Il vient de cesser de tenir."
      : "§ Vous avez payé en vrai et vous êtes passé. C'est tout, et c'est déjà rare.",
  ],
  effets:{ or:220 },
  issue:"L'affaire est close sans un mort",
  bilan:"Le grain est passé, et le vieux du pont tient toujours son pont",
  apres:[
    "Personne à Sombreval ne saura jamais ce qui s'est dit là-haut. C'est la douzième fois et la province a fini par accepter que c'est comme ça.",
    () => a('tr_conte_donne') && a('tr_harn_garde')
      ? "Adélie de Sombreval reçoit un remerciement d'une créature de deux cent onze ans, transmis par un mercenaire de passage, et elle comprend exactement de quoi il s'agit. Elle ne dit rien. Elle continue de tenir les granges."
      : "",
    () => a('tr_dit_le_nom')
      ? "Vous avez dit *Karlsberg* à voix haute pour la première fois en dix-neuf ans. Ce n'était pas devant une salle, ni devant un commissaire, ni devant un registre : c'était à six pieds d'une chose assise sur un parapet, à quarante pieds au-dessus de l'eau, et personne n'en saura rien."
      : "",
  ],
  plusTard:"Harn a deux cent onze ans et il commence à perdre. Un jour, quelqu'un lui demandera un nom et il ne l'aura plus. Ce jour-là, il aura encore Karlsberg, parce que c'est rentré.",
},

tr_fin_menti:{
  lieu:"Sombreval · quatre jours plus tard",
  titre:"Ce qui ne se voit pas",
  texte:[
    "Le grain passe. Dix-neuf charrois, onze cents setiers, six cents personnes qui mangent, et deux cent vingt couronnes comptées dans une grange vide.",
    "C'est une réussite complète. Il n'y a pas un mort, pas une blessure, pas un procès, et le pont est ouvert.",
    { sobre:"§ Et quelque part, en Nivôse, un vieux demandera un nom qu'il avait.",
      intense:"§ Et quelque part, en Nivôse, une chose de deux cent onze ans demandera à un meunier comment s'appelait son grand-père, et le meunier répondra, et personne ne fera le rapprochement.",
      extreme:"§ Et quelque part, en Nivôse, une chose de deux cent onze ans demandera à un meunier de soixante-trois ans comment s'appelait son grand-père. Le meunier répondra. Ils continueront à se parler tous les mois. Et personne, jamais, ne fera le rapprochement entre cette question-là et une heure de préparation dans une auberge de relais." },
    "Vous avez menti à la seule chose vivante de cette province qui écoute vraiment, et vous l'avez fait bien, et c'est ce que vous savez faire.",
  ],
  effets:{ or:220 },
  issue:"L'affaire est close",
  bilan:"Le pont est ouvert, le grain est passé, et il manque quelque chose à quelqu'un",
  apres:[
    () => a('tr_harn_su')
      ? "Il a su. Il l'a dit lui-même, à trois pas, sans colère : *je ne veux pas que tu passes en croyant m'avoir eu, parce que ça t'abîmerait plus que moi.* Il avait raison sur ce point comme sur les autres."
      : "Il ne l'a pas su, ou il ne l'a pas dit. Vous ne saurez jamais lequel des deux, et c'est probablement le pire arrangement possible.",
    "Deux cent vingt couronnes. C'est le tarif, il est correct, et personne ne peut rien vous reprocher.",
  ],
  plusTard:"Une mémoire de deux cent onze ans a maintenant un trou dedans, quelque part, et il faudra des années avant que quelqu'un s'aperçoive de ce qui manque.",
},

tr_fin_borgne:{
  lieu:"Sombreval",
  titre:"Un œil",
  texte:[
    "Le grain passe. Harn ne tient plus le pont : il faut voir les deux bouts, et un œil ne suffit pas.",
    "Il ne s'en va pas pour autant. Il reste assis sur le parapet, du côté amont, et il regarde l'eau d'un œil.",
    { sobre:"Les charretiers passent devant lui. Aucun ne dit rien.",
      intense:"Dix-neuf charrois passent devant lui en quatre jours. Aucun charretier ne dit un mot. Ils ne baissent pas la tête non plus — ils passent, simplement, et c'est la chose la plus terrible que puisse faire une province à quelque chose qui l'a gardée deux cents ans.",
      extreme:"Dix-neuf charrois en quatre jours. Aucun charretier ne dit un mot, aucun ne baisse la tête : ils passent, et c'est la chose la plus terrible qu'une province puisse faire à ce qui l'a gardée deux cents ans. Au quatrième jour, le meunier de l'amont s'arrête, descend de sa charrette, s'assied à côté de lui sur le parapet, et ne dit rien non plus. Ils restent comme ça une heure. C'est tout ce que quelqu'un a trouvé." },
    "§ Deux cent vingt couronnes. Le contrat disait *rouvrir le passage* et le passage est rouvert.",
  ],
  effets:{ or:220 },
  issue:"L'affaire est close",
  bilan:"Le passage est rouvert, et le gardien du pont est assis dessus, borgne",
  apres:[
    "Ode de Sombreval ne vous demande pas comment. Elle a compris en voyant revenir le premier charroi et elle a décidé de ne pas poser la question, ce qui est sa façon à elle de payer.",
    "Le péage n'est plus perçu. Personne n'ose le lui donner et personne n'ose ne pas le lui donner, alors on ne passe plus par là quand on peut faire autrement.",
  ],
  plusTard:"Il entretient encore le pont. C'est ce qui rend l'affaire insupportable : il continue de poser les pierres, d'un œil, deux cents ans après l'acte, et personne ne le lui a redemandé.",
},

tr_fin_mort:{
  lieu:"Sombreval",
  titre:"Ce qu'on ne rattrape pas",
  texte:[
    "Le grain passe en quatre jours et personne ne le remarque, parce que toute la province regarde ailleurs.",
    "On drague. Ode de Sombreval fait draguer pendant onze jours — à ses frais, avec des crocs de batelier, sur trois cents pas de rivière — et on ne remonte rien, parce qu'une chose de deux mille livres qui coule dans huit pieds de vase de printemps ne se drague pas.",
    { sobre:"Elle vous paie. Elle ne vous parle pas.",
      intense:"Elle vous paie les deux cent vingt couronnes par l'intermédiaire de sa fille, dans la cour, sans descendre. C'est la seule fois de toute cette affaire où quelqu'un de cette province refuse de vous regarder en face, et c'est la femme qui vous avait engagé pour ça.",
      extreme:"Elle vous paie les deux cent vingt couronnes par l'intermédiaire de sa fille, dans la cour, sans descendre. C'est la seule fois où quelqu'un de cette province refuse de vous regarder en face — et c'est la femme qui vous avait engagé pour ça, qui savait ce qu'elle achetait, qui l'avait dit à voix haute dans une grange, et qui découvre en quatre jours la différence exacte entre savoir ce qu'on achète et le recevoir." },
    "§ Le pont tient. Il tiendra vingt ans, ou quarante, et un jour un joint s'ouvrira et personne ne saura le refermer.",
    "Sombreval a fait mettre un maçon en apprentissage à Chastel dès le mois suivant. Il faut sept ans pour former un homme à la pierre sèche. Le pont a deux cent onze ans.",
  ],
  effets:{ or:220 },
  issue:"L'affaire est close",
  bilan:"Le vieux du pont est au fond de la rivière, et la province ne s'en remet pas",
  apres:[
    "Deux cent onze ans de mémoire d'une province sont dans huit pieds de vase. Tout ce que les gens lui ont raconté sur ce pont — les noms, les dates, les grands-pères qui boitaient — a cessé d'exister en quatre secondes.",
    () => a('tr_meunier')
      ? "Le meunier de l'amont ne repasse plus par le vieux pont. Il fait onze lieues de plus par Chastel et il paie le huitième, et il ne l'explique à personne."
      : "",
    "Vous êtes payé. Le contrat est rempli. C'est exactement ce qu'on avait demandé et personne dans cette vallée n'en est content, à commencer par celle qui l'a demandé.",
  ],
  plusTard:"Personne à Sombreval ne raconte plus rien à personne sur ce pont. Il n'y a plus rien qui écoute.",
},

tr_fin_parti:{
  lieu:"Sur la route",
  titre:"Le douzième",
  texte:[
    "Vous redescendez du pont sans avoir rien dit.",
    "Ce n'est pas de la lâcheté : c'est qu'on ne donne pas une chose pareille sur commande, et qu'un homme qui a passé dix-neuf ans à ne rien dire ne se met pas à parler parce qu'un grain chauffe dans une grange.",
    { sobre:"Harn ne fait aucun commentaire. Il ne bouge même pas.",
      intense:"Harn ne fait aucun commentaire et il ne bouge pas. Il vous regarde partir avec exactement l'attention qu'il accorde à l'eau, ce qui n'est ni du mépris ni de l'indifférence : c'est ce qu'il fait de ses journées depuis deux cent onze ans.",
      extreme:"Harn ne fait aucun commentaire et ne bouge pas. Il vous regarde partir avec exactement l'attention qu'il accorde à l'eau — ni mépris ni indifférence : c'est ce qu'il fait de ses journées depuis deux cent onze ans, et vous n'êtes que la douzième chose qui passe cette saison." },
    "§ Le grain de Sombreval prend le chemin de Chastel en Prairial, à onze lieues, au huitième.",
    "Ça coûte à la maison de Sombreval le quart de sa récolte. Personne n'en meurt. Personne ne mange aussi bien qu'avant non plus, et ça durera jusqu'à ce que quelqu'un trouve une histoire.",
  ],
  issue:"L'affaire est abandonnée",
  bilan:"Vous n'avez rien dit, et le grain est passé par Chastel",
  apres:[
    "Vous ne touchez rien. Vous n'avez tué personne, vous n'avez menti à personne, et vous avez gardé ce que vous étiez venu ne pas donner.",
    "Vous êtes le douzième. Il y en aura un treizième, et un jour il y en aura un qui aura de la poudre.",
  ],
  plusTard:"Ce que vous n'avez pas raconté ce jour-là, vous ne le raconterez peut-être jamais. C'est un choix, il tient, et il a déjà tenu dix-neuf ans.",
},

};
Object.assign(ARC_C05, ARC_C05_4);
for(const id of ['tr_fin_conte','tr_fin_menti','tr_fin_borgne','tr_fin_mort','tr_fin_parti']){
  ARC_C05[id].suite = 'entre_saisons';
  ARC_C05[id].libelleSuite = "Reprendre la route";
}
enregistrerScenes(ARC_C05);
