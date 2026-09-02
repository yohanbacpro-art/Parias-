/* PARIAS — Acte II · ALYCIA, deuxième moitié
 * ═══════════════════════════════════════════════════════════════════════
 * Les six étapes qui restent après Karlsberg. Elles ne se proposent pas sur
 * la carte : c'est elle qui vient, quand son poids la décide à venir, et
 * dans l'ordre où une relation se joue — pas dans celui où le joueur
 * voudrait qu'elle se joue.
 *
 *   5 · Elle ment encore          — ce qu'elle a fait de vous sans le dire
 *   6 · La nuit sans contrat      — aucun Prix, aucun paiement, et un refus
 *                                   possible qui ne coûte rien
 *   7 · Une autre couronne        — on vous propose un mariage utile
 *   8 · Le choix d'Alycia         — elle choisit, et pas forcément vous
 *   9 · Le Loup et la Sorcière    — s'il reste quelque chose à ce stade
 *  10 · Ce qu'elle fait à la fin  — lu par l'épilogue, pas joué
 *
 * Aucune de ces étapes n'est acquise. Chacune lit les quatre axes, et un
 * refus porte sa raison écrite au lieu d'un chiffre.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Les étapes, dans l'ordre. La première dont la condition passe et qui n'a
 * pas été jouée est celle qui se joue. Si aucune ne passe, elle a fait
 * quelque chose ailleurs et on l'apprend comme on apprend tout le reste. */
const BEATS_ALYCIA = [
  { id:'aly_ment',     si:() => a('al_liste') || a('a2_question_ouverte') || a('kar_coffre') },
  { id:'aly_nuit',     si:() => a('aly_ment_solde'),
    seuils:{ relation:8, confiance:8, attirance:8 }, rate:'aly_pas_ce_soir' },
  { id:'aly_couronne', si:() => a('a2_couronne_offerte') },
  { id:'aly_choix',    si:() => A2().annee >= 1 && (A2().pistes.sang >= 2 || a('a2_bannieres') || a('kar_refuge')) },
  { id:'aly_loup',     si:() => a('aly_choix_reste'), seuils:{ relation:14, confiance:14, attirance:10, politique:0 },
    rate:'aly_loup_non' },
];

DYN.acte_alycia = () => {
  const A = A2();
  armerCouronne();
  for(const b of BEATS_ALYCIA){
    if(a('fait_' + b.id)) continue;
    if(b.si && !b.si()) continue;
    if(b.seuils){
      const p = palierPossible('alycia', b.seuils);
      if(!p.ok){
        /* Un refus n'est pas un échec : c'est une saison où l'on n'y est pas
         * encore, et elle en donne la raison en toutes lettres. */
        A.refusAlycia = p.manque;
        return aller(b.rate || 'aly_pas_ce_soir');
      }
    }
    ETAT.flags.add('fait_' + b.id);
    return aller(b.id);
  }
  A.quiAgit = 'alycia';
  aller('a2_acte');
};

const ALYCIA_TARD = {

acte_alycia:{ dyn:true, texte:[], suite:'a2_saison' },

/* ══ 5 · ELLE MENT ENCORE ═════════════════════════════════════════════════
 * Elle a soldé les quarante et un à Karlsberg parce qu'on allait le
 * découvrir. Ce qu'elle n'a pas soldé, c'est ce qu'elle a fait de Yohan
 * pendant onze mois — et elle ne le solderait jamais si on ne tombait pas
 * dessus. C'est la vraie trahison, et elle est raisonnable. */
aly_ment:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Le paquet de Chastel",
  texte:[
    "Un colporteur vous vend un paquet de feuilles pour deux sous, comme on vend du papier à allumer le feu : c'est du rebut d'imprimerie, des placards mal tirés qu'on rachète au poids à Chastel et qu'on revend au nord pour envelopper le poisson.",
    { sobre:"Vous y trouvez votre nom.",
      intense:"Vous en dépliez trois par habitude, parce qu'un homme qui a passé onze ans à lire des affiches de contrat déplie le papier avant de le brûler. Le deuxième porte votre nom.",
      extreme:"Vous en dépliez trois par habitude — un homme qui a passé onze ans à lire des affiches de contrat déplie le papier avant de le brûler, c'est un réflexe qui a sauvé plus de mercenaires que l'armure. Le deuxième porte votre nom, imprimé, à la ligne neuf d'une liste de onze, dans un placard tiré à trois cents exemplaires et distribué aux étapes de la Route Grise." },
    "C'est la liste de Mont-Draken. Celle qu'Alycia vous a montrée sur la route, recopiée de sa main sur un carré de vélin, avec sept noms barrés.",
    "§ Sauf que celle-ci est imprimée. Et qu'elle est datée de **Ventôse de l'an dernier** — quatre mois avant qu'elle vous l'apprenne.",
    "Il y a onze noms. Sept sont barrés. Le vôtre est le neuvième. Le sien est le quatrième et il n'est pas barré.",
    { sobre:"Il y a autre chose.",
      intense:"Il y a autre chose, et il faut trois lectures pour la voir, parce que c'est une chose qui manque et non une chose qui est là.",
      extreme:"Il y a autre chose, et il faut trois lectures pour la voir, parce que c'est une chose qui manque et non une chose qui est là — et l'œil humain ne trouve pas ce qui manque, il trouve ce qui est en trop." },
    "Sous chaque nom non barré, une ligne : *dernier signalement*.",
    "Sous le quatrième, celui d'Alycia de Callensbourg : **Bourg-l'Aigre, Nivôse, avec un homme d'armes de haute taille, cheval bai, épée à une main et demie.**",
    "Vous n'êtes jamais allé à Bourg-l'Aigre.",
    "§ Elle y est allée. Avec quelqu'un qui vous ressemble assez pour qu'un guetteur écrive votre description sous son nom à elle.",
  ],
  choix:[
    { t:"Lui mettre le placard dans les mains",
      detail:"sans un mot · et regarder ce qu'elle en fait",
      risque:"calculé", va:'aly_ment_face' },
    { t:"Ne rien dire et vérifier soi-même",
      detail:"Bourg-l'Aigre est à quatre jours · un guetteur se paie",
      risque:"calculé", va:'aly_ment_verifier' },
    { t:"Brûler le placard",
      detail:"vous savez déjà ce qu'il dit · et vous savez déjà ce qu'elle répondra",
      risque:"prudent", va:'aly_ment_bruler' },
  ],
},

aly_ment_face:{
  qui:'alycia',
  titre:"Ce qu'elle en fait",
  texte:[
    "Elle prend le papier. Elle le lit debout, entièrement, sans se presser, et vous la regardez arriver à la ligne quatre.",
    { sobre:"Elle ne bronche pas.",
      intense:"Elle ne bronche pas — mais elle relit la ligne, ce qu'on ne fait pas quand on découvre, ce qu'on fait quand on vérifie une formulation.",
      extreme:"Elle ne bronche pas. Mais elle relit la ligne, et c'est ça qui la trahit : on ne relit pas ce qu'on découvre, on relit ce dont on connaissait déjà la substance et dont on veut connaître la formulation exacte. Elle vérifie ce qu'ils ont écrit, pas ce qu'ils ont su." },
    "« Bourg-l'Aigre », dit-elle. « Nivôse. Oui. »",
    "« Vous y étiez. »",
    "« J'y étais. »",
    "« Avec quelqu'un qui me ressemble. »",
    "« Avec **personne**. » Elle vous rend le placard. « Il n'y avait personne avec moi. J'ai payé un charretier de Bourg-l'Aigre pour qu'il raconte à l'étape qu'il avait vu passer une femme et un homme d'armes de haute taille, cheval bai, épée longue. Je lui ai dicté la description. Je l'ai payé quatre sous. »",
    "§ Elle ne se défend pas. Elle explique une opération.",
    { sobre:"« Pourquoi. »",
      intense:"« Pourquoi. »\n\n« Parce que sept noms de cette liste étaient déjà barrés et que le huitième allait l'être. »",
      extreme:"« Pourquoi. »\n\n« Parce que sept noms de cette liste étaient déjà barrés en Ventôse et que le huitième allait l'être avant l'été. Ils descendaient la liste dans l'ordre, méthodiquement, comme on relève un compte, et le huitième était une femme de quarante ans qui tient un moulin près de Sablons et qui n'a jamais rien fait d'autre de sa vie que tenir un moulin près de Sablons. »" },
    "« Et alors ? »",
    "« Alors j'ai fait en sorte qu'à partir de Nivôse, la piste la plus fraîche et la plus intéressante de cette liste soit la mienne, et qu'elle ait l'air d'être accompagnée. Deux Parias ensemble, dont un qui se bat. » Elle a un mouvement d'épaules. « Ils ont arrêté de descendre la liste. Ils ont commencé à me suivre moi. La femme du moulin est toujours au moulin. »",
    "« Vous vous êtes servie de moi. »",
    { sobre:"« Non. Je me suis servie d'une description. »",
      intense:"« Non. Je me suis servie d'une **description**. À ce moment-là je ne vous connaissais pas, je ne savais pas votre nom, je savais qu'il existait un neuvième de la liste qui vivait de contrats et qui était grand. »",
      extreme:"« Non. Je me suis servie d'une description. Écoutez-moi bien parce que je ne le redirai pas : en Nivôse, je ne vous connaissais pas. Je n'avais pas votre nom, je n'avais pas votre visage, j'avais le fait qu'il existait un neuvième sur cette liste, qu'il vivait de contrats, et qu'il était grand. J'ai pris ce qui était sur le papier et j'en ai fait un appât. Le papier, pas l'homme. »" },
    "« Et quand vous avez eu le nom ? »",
    "Silence.",
    "@« Quand vous avez eu le nom, Alycia. »",
    "« Quand j'ai eu le nom, je suis venue à Cendrepont vous proposer un contrat pour tuer un Paria, pour voir ce que vous étiez. » Elle soutient votre regard. « Et j'ai continué à ne rien vous dire pendant onze semaines de route. Ça, c'est le mensonge. Le reste, c'est du travail. »",
  ],
  effets:{ flags:['aly_appat_su'],
           faire:() => bouger('alycia', { confiance:-6, relation:2 }),
           marque:"Elle a fait de votre description un appât, quatre mois avant de vous connaître. Elle l'a dit sans qu'on la force.",
           court:"Bourg-l'Aigre, Nivôse" },
  choix:[
    { t:"« Vous auriez dû me le dire à Cendrepont. »",
      detail:"la reprocher, et le solder · une chose dite est une chose finie",
      risque:"calculé", va:'aly_ment_solde' },
    { t:"« La femme du moulin est toujours au moulin. »",
      detail:"prendre le compte tel qu'elle le tient · huit vivants contre un mensonge",
      risque:"calculé", va:'aly_ment_pardon' },
    { t:"« Ne refaites jamais ça. »",
      detail:"poser une limite · et voir si elle la prend",
      risque:"calculé", va:'aly_ment_limite' },
    { t:"Partir. Trois saisons sans elle.",
      detail:"il y a des choses qu'on ne solde pas le jour même",
      risque:"définitif", ferme:"Ferme : ce qui se serait dit ce soir-là", va:'aly_ment_partir' },
  ],
},

aly_ment_verifier:{
  qui:'alycia',
  titre:"Quatre jours pour un charretier",
  texte:[
    "Bourg-l'Aigre est un village de sel avec une étape et un mur à papiers. Quatre jours de route, et vous n'avez pas dit où vous alliez.",
    "Le guetteur d'étape est un ancien sergent qui a perdu un pied et qui tient le registre des passages parce que c'est ce qu'on donne aux sergents qui ont perdu un pied. Il se souvient. Il se souvient très bien, parce qu'on l'a interrogé trois fois depuis, chaque fois par des gens différents et chaque fois plus poliment.",
    "@« Une femme brune, seule. »",
    "« Seule ? »",
    { sobre:"« Seule à cheval. Mais le charretier a dit qu'ils étaient deux. »",
      intense:"« Seule à cheval, je l'ai vue passer sous ma fenêtre. Mais le charretier de la saline est venu le soir même me dire qu'ils étaient deux, avec la description de l'autre, et comme c'est le charretier qui parle aux gens de Mont-Draken et pas moi, c'est sa version qui est partie. »",
      extreme:"« Seule à cheval. Je l'ai vue passer sous ma fenêtre, il tombait de la neige mouillée, elle n'avait personne derrière. Mais le charretier de la saline est venu le soir même me dire qu'ils étaient deux, avec la description de l'autre — grand, bai, épée longue — et comme c'est le charretier qui parle aux gens de Mont-Draken et pas moi, c'est sa version qui est partie vers le sud. J'ai laissé faire. On me paie pour tenir un registre, pas pour corriger les gens. »" },
    "« Le charretier a été payé. »",
    "« Le charretier a été payé quatre sous et il l'a raconté à l'auberge le soir même, parce que c'est un imbécile. » Le sergent hausse une épaule. « Tout le monde ici sait qu'elle a payé pour qu'on la dise accompagnée. Personne ne sait pourquoi. »",
    "§ Vous, vous savez pourquoi.",
    "Il ajoute, en refermant son registre : « Depuis, ils ne cherchent plus qu'elle. Ils passaient ici tous les deux mois avant, avec des noms différents. Maintenant ils passent avec le sien. »",
    "Quatre jours de retour pour comprendre qu'elle s'est mise devant vous en Nivôse, avant de vous connaître, en se servant de votre taille.",
  ],
  effets:{ flags:['aly_appat_su','aly_verifie'],
           faire:() => bouger('alycia', { confiance:-3 }),
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous avez vérifié avant d'accuser" },
           marque:"Bourg-l'Aigre : elle était seule. Elle a payé pour qu'on la dise accompagnée, et depuis ils ne cherchent qu'elle.",
           court:"Elle était seule" },
  suite:'aly_ment_face', libelleSuite:"Revenir la voir" },

aly_ment_bruler:{
  qui:'alycia',
  titre:"Deux sous de papier",
  texte:[
    "Vous brûlez le placard sur place, avec les deux autres, comme on brûle du papier à poisson.",
    { sobre:"Ce que vous ne dites pas ne disparaît pas.",
      intense:"Vous ne lui en parlez pas. Trois semaines plus tard vous ne lui en parlez toujours pas, et ce n'est plus une chose qu'on décide de taire : c'est une chose qu'on a tue.",
      extreme:"Vous ne lui en parlez pas. Trois semaines plus tard vous ne lui en parlez toujours pas, et à ce stade ce n'est plus une chose qu'on décide de taire — c'est une chose qu'on a tue, ce qui n'est pas la même opération et ne se défait pas de la même façon." },
    "Vous continuez de voyager avec elle. Vous continuez de la regarder tenir son cheval trois longueurs devant, choisir les gués, refuser les auberges qui ont deux sorties.",
    "Et à chaque étape, désormais, vous comptez : combien d'hommes ont vu passer une femme brune et un homme d'armes de haute taille.",
    "§ Elle s'en aperçoit au bout de quatre semaines. Elle ne dit rien non plus.",
    "Deux personnes qui savent quelque chose et qui ne le disent pas font un attelage remarquablement efficace et remarquablement froid. Vous ferez cinq cents lieues comme ça.",
  ],
  effets:{ flags:['aly_appat_tu'],
           faire:() => bouger('alycia', { confiance:-2, relation:-3, attirance:-2 }),
           marque:"Vous avez brûlé le placard sans lui en parler. Elle s'en est aperçue et n'a rien dit non plus.",
           court:"Le placard brûlé" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_ment_solde:{
  qui:'alycia',
  titre:"Une chose dite",
  texte:[
    "@« Vous auriez dû me le dire à Cendrepont. Le premier soir. Avant le contrat, avant l'épreuve, avant tout. »",
    "« Je sais. »",
    "« Ce n'est pas une réponse. »",
    { sobre:"« Non. C'est un aveu, et c'est tout ce que j'ai. »",
      intense:"« Non, c'est un aveu, et c'est tout ce que j'ai. Je ne vais pas vous expliquer pourquoi je ne l'ai pas fait, parce que la raison est bonne et que je ne veux pas d'une bonne raison ce soir. J'aurais dû vous le dire. Je ne l'ai pas dit. »",
      extreme:"« Non, c'est un aveu, et c'est tout ce que j'ai. Je pourrais vous expliquer pourquoi je ne l'ai pas fait — j'ai la raison, elle est bonne, elle tient debout, je me la suis récitée quatorze fois en douze jours de route. Je ne vais pas vous la donner. Une bonne raison, dans une conversation comme celle-ci, sert seulement à s'en sortir, et je ne veux pas m'en sortir. J'aurais dû vous le dire à Cendrepont. Je ne l'ai pas dit. C'est tout. »" },
    "§ Elle ne se défend pas et ne s'excuse pas. Ce sont deux choses différentes et elle fait exactement la deuxième.",
    "Vous restez là un moment. Le feu descend.",
    "« Bon », dit-elle enfin. « Vous avez le droit de partir. Beaucoup de gens seraient partis pour moins. »",
    "« Je ne pars pas. »",
    "« Alors dites-moi ce que vous voulez à la place, parce que je ne vais pas passer trois ans à deviner si c'est réglé. »",
    "« C'est réglé. »",
    { sobre:"Elle acquiesce, une fois.",
      intense:"Elle acquiesce, une fois, et se rassoit. C'est la première fois depuis Cendrepont qu'elle s'assoit dos à la porte.",
      extreme:"Elle acquiesce, une fois, et se rassoit. C'est la première fois depuis Cendrepont qu'elle s'assoit dos à la porte — un détail que personne ne remarquerait, sauf quelqu'un qui a passé onze semaines à voir la même femme choisir la même chaise dans onze salles différentes." },
  ],
  effets:{ flags:['aly_ment_solde'],
           faire:() => bouger('alycia', { confiance:7, relation:4, attirance:3 }),
           marque:"Dit, entendu, réglé. Elle s'est assise dos à la porte.",
           court:"Dos à la porte" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_ment_pardon:{
  qui:'alycia',
  titre:"Le compte du moulin",
  texte:[
    "@« La femme du moulin est toujours au moulin. »",
    "Elle ne répond pas tout de suite.",
    "« Vous prenez le compte comme je le tiens », dit-elle.",
    "« Je prends le compte comme il est. Huit vivants, un mensonge. C'est un bon compte. J'en ai signé de bien pires pour de l'argent. »",
    { sobre:"« Ce n'est pas la réponse que j'attendais. »",
      intense:"« Ce n'est pas la réponse que j'attendais. J'avais préparé trois réponses aux trois choses que vous pouviez dire, et ce n'était aucune des trois. »",
      extreme:"« Ce n'est pas la réponse que j'attendais. J'avais préparé trois réponses aux trois choses que vous pouviez dire — la colère, la question du pourquoi, et le départ. J'y ai passé la moitié de la nuit. Ce n'était aucune des trois et je n'ai rien de prêt. »" },
    "« Alors ne dites rien de préparé. »",
    "Elle rit — un son court, sans grâce, qu'elle n'a pas laissé sortir une seule fois en onze semaines.",
    "§ Il y a une chose qu'elle n'a pas dite et qu'elle dit maintenant, parce qu'elle n'a rien de prêt.",
    "« Je pensais que vous étiez comme les autres neuf. » Elle regarde le feu. « Un nom sur une liste, quelqu'un que je devrais faire disparaître quelque part et à qui je n'aurais rien à expliquer. C'est ce que je fais depuis quinze ans : je trouve des gens, je les mets dans un endroit, je pars, et je ne reviens que si l'endroit devient mauvais. Je n'explique rien à personne. Ils ne savent même pas mon nom, la plupart. »",
    "« Et ? »",
    "« Et vous ne rentrez dans aucun endroit. » Elle relève la tête. « Je n'ai pas de case où vous mettre, et ça fait onze semaines que ça m'agace. »",
  ],
  effets:{ flags:['aly_ment_pardon','aly_ment_solde'],
           faire:() => bouger('alycia', { confiance:6, relation:6, attirance:5 }),
           marque:"« Je n'ai pas de case où vous mettre, et ça fait onze semaines que ça m'agace. »",
           court:"Aucune case" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_ment_limite:{
  qui:'alycia',
  titre:"La limite",
  texte:[
    "@« Ne refaites jamais ça. »",
    "« Vous servir sans vous le dire ? »",
    "« Décider de ce que je risque sans me le demander. »",
    { sobre:"Elle réfléchit sérieusement. C'est plus long qu'on ne voudrait.",
      intense:"Elle réfléchit sérieusement, et c'est plus long qu'on ne voudrait — beaucoup plus long que le temps qu'il faut pour dire oui à quelqu'un qu'on veut garder.",
      extreme:"Elle réfléchit sérieusement, et c'est beaucoup plus long qu'on ne voudrait. Le temps qu'il faut pour dire oui à quelqu'un qu'on veut garder est d'environ une seconde. Elle en prend une bonne dizaine, et le pire est qu'on voit qu'elle calcule vraiment, qu'elle passe en revue des cas, qu'elle cherche s'il y a une situation où elle devrait refuser." },
    "« Non », dit-elle.",
    "« Non ? »",
    "« Non, je ne peux pas vous le promettre. » Elle lève une main avant que vous parliez. « Écoutez la promesse que je peux faire, elle est plus petite mais elle est vraie : je ne déciderai plus de ce que vous risquez **sans vous le dire après**. Pas avant. Après. Parce qu'il y aura des jours où vous serez à quarante lieues et où il faudra décider dans l'heure, et ces jours-là je déciderai, et je le referai. »",
    "« Ce n'est pas ce que j'ai demandé. »",
    "« Non. C'est ce que j'ai. » Elle vous regarde. « Vous préférez une promesse plus grande et fausse ? Beaucoup de gens préfèrent. »",
    "§ Elle vient de refuser quelque chose qu'il lui aurait coûté un mot de concéder.",
    "Vous prenez la petite promesse. Il n'y avait rien d'autre à prendre, et vous savez maintenant à quoi ressemble une promesse d'elle : petite, précise, et probablement tenue.",
  ],
  effets:{ flags:['aly_limite','aly_ment_solde'],
           faire:() => bouger('alycia', { confiance:5, relation:3, attirance:2, peur:-2 }),
           marque:"Elle a refusé la grande promesse et donné la petite. Elle ne décidera plus sans le dire après.",
           court:"La petite promesse" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_ment_partir:{
  qui:'alycia',
  titre:"Trois saisons",
  texte:[
    "Vous ne criez pas. Vous prenez votre cheval, et à midi vous êtes à sept lieues.",
    { sobre:"Elle n'a pas essayé de vous retenir.",
      intense:"Elle n'a pas essayé de vous retenir, ce qui est cohérent : une femme qui a passé quinze ans à faire disparaître des gens ne court pas derrière ceux qui partent.",
      extreme:"Elle n'a pas essayé de vous retenir. C'est parfaitement cohérent avec tout ce que vous savez d'elle — une femme qui a passé quinze ans à faire disparaître des gens ne court pas derrière ceux qui partent, elle note l'heure et elle recalcule. Ça ne rend pas la chose moins désagréable à sept lieues." },
    "Trois saisons.",
    "§ Pendant ces trois saisons, deux choses se produisent, et vous les apprenez toutes les deux par des tiers.",
    "La première : on ne vous cherche plus. Les gens de Mont-Draken sont repassés à l'étape de Cendrepont en Prairial et ils avaient un seul nom. Le sien.",
    "La seconde : le huitième de la liste a été barré. Une femme de quarante ans qui tenait un moulin près de Sablons. Elle a été prise en Messidor, à quinze jours du moment où vous êtes parti.",
    { sobre:"Il n'y a pas de lien démontrable entre les deux.",
      intense:"Il n'y a pas de lien démontrable entre votre départ et le moulin de Sablons. On peut se le répéter longtemps. C'est même exactement ce qu'on fait.",
      extreme:"Il n'y a aucun lien démontrable entre votre départ et le moulin de Sablons — une femme seule, à quinze jours d'écart, à soixante lieues de là, il faudrait être fou pour tirer une ligne entre les deux. On peut se le répéter longtemps. C'est même exactement ce que vous ferez, à intervalles réguliers, pendant plusieurs années." },
  ],
  effets:{ flags:['aly_rupture','aly_ment_solde'],
           faire:() => { bouger('alycia', { relation:-8, confiance:-4, attirance:-4 });
                         retenir('alycia', "il est parti quand il a su ce que j'avais fait de sa description"); },
           marque:"Vous êtes parti trois saisons. Le huitième nom de la liste a été barré pendant ce temps.",
           court:"Sablons" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

/* ══ 6 · LA NUIT SANS CONTRAT ═════════════════════════════════════════════
 * Le titre est le sujet. Tout ce que Yohan a connu d'une femme depuis onze
 * ans a été fixé avant, par une maison, dans des termes écrits. Elle est une
 * Paria : il n'y a pas de Prix, pas de maison, pas de termes, et donc rien à
 * quoi se raccrocher. Elle peut refuser à tout moment, ça ne coûte rien, et
 * il y a toujours une porte pour ne pas y aller du tout. */
aly_nuit:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · une chambre haute · ${dateA2()}`,
  titre:"La nuit sans contrat",
  texte:[
    "L'auberge a deux sorties, ce qui est sa seule exigence, et une chambre haute libre parce qu'on est en semaine.",
    "Elle a compté les hommes de la salle en entrant, comme toujours. Elle a fini par cinq et vous par six ; vous en avez discuté vingt minutes ; c'est le sixième qui a eu raison de partir.",
    { sobre:"Puis il n'y a plus rien à compter et vous êtes deux dans un escalier.",
      intense:"Puis il n'y a plus d'hommes à compter, plus de gué à choisir, plus de route pour demain — on reste ici trois jours, il pleut, la piste est noyée — et c'est la première fois depuis Cendrepont qu'il n'y a rien du tout à faire.",
      extreme:"Puis il n'y a plus d'hommes à compter, plus de gué à choisir, plus de route à décider pour demain. On reste ici trois jours : il pleut depuis mardi, la piste du bas est noyée, et les chevaux ont besoin d'un maréchal. C'est la première fois depuis Cendrepont qu'il n'y a rien du tout à faire, et vous découvrez tous les deux, dans le même escalier, que vous ne savez pas faire ça." },
    "Elle s'arrête sur le palier.",
    "« Je vais dire une chose et je vais la dire mal », dit-elle. « Je préfère prévenir. »",
    "@« Dites-la mal. »",
    { sobre:"« Il n'y a pas de Prix. »",
      intense:"« Il n'y a pas de Prix. » Elle voit que vous ne comprenez pas tout de suite. « Le vôtre. Celui de vos maisons. L'or, ou une femme d'un sang qu'on veut. Vous ne pouvez pas me le demander : je suis une Paria, je n'ai pas de maison, il n'y a personne pour vous me donner. »",
      extreme:"« Il n'y a pas de Prix. » Elle voit à votre visage que ça ne s'est pas posé au bon endroit. « Le vôtre. Celui de vos maisons, celui qu'on vous fixe avant chaque contrat : l'or, ou une femme d'un sang qu'on veut, ou les deux. Vous ne pouvez pas me le demander. Je suis une Paria. Je n'ai pas de maison, pas de père, pas d'oncle, personne pour s'asseoir en face de vous et négocier ce que je vaux. Il n'y a rien à fixer. »" },
    "@« Je sais. »",
    "« Non, vous ne savez pas, parce que vous n'avez jamais eu ça de votre vie. » Elle le dit sans dureté, ce qui est pire. « Onze ans. Chaque fois, quelqu'un avait signé quelque chose avant que vous entriez dans la chambre. Vous avez toujours su exactement ce que la femme faisait là et pourquoi. »",
    "§ C'est vrai. Vous n'y aviez jamais pensé dans ces termes-là, et c'est vrai.",
    "« Ce soir, il n'y a rien de signé », dit-elle. « Personne ne m'a envoyée, personne ne me paie, personne ne saura, et si je descends cet escalier dans une minute il ne se passera absolument rien — ni pour vous, ni pour moi, ni entre nous. »",
    "@« C'est un avertissement ? »",
    { sobre:"« C'est une offre, et je la fais mal. »",
      intense:"« C'est une offre, et je la fais mal parce que je n'en ai jamais fait. » Elle a un geste d'impatience contre elle-même. « Quinze ans à ne rien devoir à personne, ça n'apprend pas à demander. »",
      extreme:"« C'est une offre, et je la fais mal parce que je n'en ai jamais fait de ma vie. » Elle a un geste d'impatience, contre elle-même et pas contre vous. « Quinze ans à ne rien devoir à personne. Ça apprend à disparaître, à choisir une auberge, à mentir vite et bien. Ça n'apprend absolument pas à demander quelque chose à quelqu'un, et vous avez devant vous une femme de trente-deux ans qui s'y prend comme une gamine de quinze. »" },
    "Elle attend. Elle ne comble pas le silence — elle est très bonne à ça.",
  ],
  choix:[
    { t:"Rester sur le palier",
      detail:"et ne rien décider ce soir · elle a dit qu'il ne se passerait rien, elle le pensait",
      risque:"prudent", va:'aly_nuit_non' },

    { t:"« Alors demandez mal. »",
      detail:"lui laisser le dernier mot · c'est elle qui ouvre la porte ou qui descend",
      risque:"calculé", va:'aly_nuit_elle' },

    { t:"Dire ce que ça change",
      detail:"que rien n'est fixé ne veut pas dire que rien n'engage · le dire avant",
      risque:"calculé", va:'aly_nuit_dire' },

    { t:"Lui promettre quelque chose",
      detail:"une place, une protection, un nom · lui donner du solide",
      risque:"définitif", ferme:"Ferme : la possibilité qu'elle ne vous doive rien",
      va:'aly_nuit_promesse' },
  ],
},

aly_nuit_non:{
  qui:'alycia',
  titre:"Le palier",
  texte:[
    "Vous restez sur le palier.",
    { sobre:"« Bon », dit-elle.",
      intense:"« Bon », dit-elle, et c'est tout — pas de raidissement, pas de sourire de façade, rien de ce qu'on met sur son visage quand on encaisse.",
      extreme:"« Bon », dit-elle, et c'est tout. Pas de raidissement dans les épaules, pas de sourire de façade, aucune des trois ou quatre choses qu'un être humain met sur son visage quand il encaisse un refus. Elle avait dit qu'il ne se passerait rien. Elle disait vrai, ce qui, à la réflexion, est la partie la plus rare de toute cette conversation." },
    "@« Ce n'est pas non », dites-vous.",
    "« Je n'ai pas demandé ce que c'était. Vous n'êtes pas obligé de qualifier. »",
    "@« Ce n'est pas non. »",
    "« D'accord. » Elle pousse la porte de sa chambre. « Alors ce n'est pas non. Le maréchal ouvre à sept heures, il faudra y être avant les charretiers. »",
    "§ Et c'est fini, et rien n'a été abîmé, ce qui n'est pas la façon dont ces conversations finissent d'ordinaire.",
    "Le lendemain il pleut encore. Vous passez la journée à réparer un harnais dans une remise, à deux mètres l'un de l'autre, à parler d'itinéraires. À aucun moment elle n'y revient.",
  ],
  effets:{ flags:['aly_nuit_repoussee'],
           faire:() => bouger('alycia', { confiance:4, relation:2 }),
           marque:"Vous êtes resté sur le palier. Elle n'y est jamais revenue et n'a rien changé.",
           court:"Le palier" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_nuit_elle:{
  qui:'alycia',
  titre:"Mal",
  texte:[
    "@« Alors demandez mal. »",
    { sobre:"Elle prend une respiration.",
      intense:"Elle prend une respiration, et pendant cette respiration vous voyez très clairement qu'elle envisage encore de descendre l'escalier.",
      extreme:"Elle prend une respiration. Pendant cette respiration — deux secondes, pas plus — vous voyez très clairement qu'elle envisage encore de descendre l'escalier, et qu'il n'y a rien au monde qui l'en empêcherait, et que c'est précisément pour ça qu'elle ne le fait pas." },
    "« Venez. »",
    "@« C'est tout ? »",
    "« Je vous avais prévenu que je le ferais mal. »",
  ],
  effets:{ flags:['aly_nuit','aly_amants'],
           faire:() => bouger('alycia', { relation:6, confiance:5, attirance:8 }),
           marque:"Une chambre haute, trois jours de pluie, rien de signé.",
           court:"Rien de signé" },
  suite:'aly_nuit_chambre', libelleSuite:"La chambre haute" },

/* La nuit elle-même. Écrite. Ce n'est pas un Prix : il n'y a pas de maison
 * derrière elle, pas de terme honoré, personne à qui rendre des comptes au
 * matin — et c'est exactement ce qui la rend difficile pour eux deux. */
aly_nuit_chambre:{
  qui:'alycia',
  titre:"La chambre haute",
  texte:[
    "§ La porte se referme sur une chambre d'auberge de bourg : un lit, un coffre, un volet que trois jours de pluie ont gonflé et qui ne ferme plus tout à fait.",
    { sobre:"Il n'y a rien d'écrit, rien de fixé, rien de dû.",
      intense:"Il n'y a rien d'écrit, rien de fixé, rien de dû, et c'est entièrement nouveau pour vous deux — pour elle parce qu'elle n'a jamais rien laissé se produire qu'elle n'ait pas calculé, pour vous parce que depuis onze ans quelqu'un signait toujours avant.",
      extreme:"Il n'y a rien d'écrit, rien de fixé, rien de dû. C'est entièrement nouveau pour vous deux, et pas de la même façon. Pour elle parce qu'elle n'a jamais rien laissé se produire qu'elle n'ait pas calculé trois jours plus tôt. Pour vous parce que depuis onze ans il y avait toujours un père, un oncle, un intendant, une signature au bas d'une page — et une femme qui savait exactement ce qu'elle faisait là et pour quoi elle était venue.\n\nIci il n'y a personne d'autre dans l'histoire. Personne du tout. Aucun des deux n'avait prévu que ce serait la partie difficile." },
    { sobre:"Elle défait sa ceinture d'armes avant tout le reste et la pose à portée du lit.",
      intense:"Elle défait sa ceinture d'armes avant tout le reste et la pose à portée du lit, côté mur, la garde vers elle. Elle ne s'en excuse pas et vous ne le lui demandez pas : vous avez posé les pistolets sur le coffre pour la même raison.",
      extreme:"Elle défait sa ceinture d'armes avant tout le reste — avant le manteau, avant les bottes — et la pose à portée du lit, côté mur, la garde tournée vers elle. Elle ne s'en excuse pas. Vous ne le lui faites pas remarquer : vous venez de poser les deux pistolets sur le coffre, crosses vers la chambre, pour très exactement la même raison, et vous vous rendez compte tous les deux en même temps, et c'est ça qui la fait rire la première fois." },
    { sobre:"Le reste vient sans cérémonie.",
      intense:"Le reste vient sans cérémonie. Elle a passé quinze ans à ne rien laisser voir de son corps à personne ; elle ne fait pas de théâtre pour autant, elle défait ce qu'il y a à défaire et attend que vous fassiez la même chose, avec l'impatience d'une femme qui déteste les préliminaires qui n'en sont pas.",
      extreme:"Le reste vient sans cérémonie. Elle a passé quinze ans à ne rien laisser voir de son corps à personne et elle n'en fait pas un événement : elle défait ce qu'il y a à défaire, laisse tomber la robe de voyage sur le coffre, et vous regarde faire la même chose avec l'impatience franche d'une femme qui déteste ce qu'on appelle les préliminaires quand ce n'en sont pas.\n\nElle est mince, dure, marquée. Deux hivers de trop sur les côtes. Une cuisse qui porte une cicatrice de flèche mal retirée. Elle vous laisse regarder, parce qu'elle vous regarde aussi, et qu'elle a compté vos marques avant que vous ayez fini de compter les siennes." },
    "« Vous m'examinez, messire ? »",
    "@« Je compte. »",
    "« Onze », dit-elle. « J'ai fini avant vous. »",
    { sobre:"Elle est brusque, et attentive, et elle rit une fois.",
      intense:"Elle est brusque, et attentive, et exigeante d'une façon très directe — elle dit ce qu'elle veut, une fois, sans le répéter et sans le déguiser, et il ne vient à l'idée d'aucun des deux que ce soit autre chose que normal.",
      extreme:"Elle est brusque, et attentive, et exigeante d'une façon parfaitement directe. Elle dit ce qu'elle veut, une fois, sans le répéter, sans le déguiser et sans baisser la voix — le même ton dont elle donne un ordre sur une route — et il ne vient à l'idée d'aucun des deux que ce soit autre chose que normal. Elle vous arrête une fois d'une main à plat sur la poitrine, décide quelque chose, puis vous renverse en travers du lit et prend ce qu'elle voulait dans l'ordre qui lui convient.\n\nElle ne ferme pas les yeux. C'est peut-être le plus troublant : elle vous regarde du début à la fin, comme elle regarde une salle en entrant." },
    { sobre:"Le volet mal fermé bat toute la nuit. Personne ne se lève pour le caler.",
      intense:"Le volet mal fermé bat contre le montant. Au deuxième étage on entend les charretiers en bas qui jouent aux dés jusqu'à une heure indue. Ni l'un ni l'autre ne se lève pour caler le volet, ce qui, chez deux personnes de ce métier, est un aveu considérable.",
      extreme:"Le volet gonflé bat contre le montant, irrégulièrement, toute la nuit. En bas les charretiers jouent aux dés jusqu'à une heure indue et l'un d'eux perd tout et le fait savoir. Ni l'un ni l'autre ne se lève pour caler le volet ni pour aller voir. Chez deux personnes qui ont survécu à ce qu'elles ont survécu, c'est l'aveu le plus considérable de la nuit." },
    { sobre:"Elle a quatre cicatrices parallèles sur le flanc gauche. Anciennes.",
      intense:"Elle a quatre cicatrices sur le flanc gauche, parallèles, anciennes, mal recousues par quelqu'un qui n'était pas chirurgien. Quand votre main s'arrête dessus elle dit « Callensbourg » sans ouvrir les yeux, et rien d'autre, et ça suffit.",
      extreme:"Elle a quatre cicatrices sur le flanc gauche. Parallèles, larges d'un doigt, anciennes, recousues par quelqu'un qui n'était pas chirurgien et qui avait peur. Quand votre main s'arrête dessus, plus tard, elle ne se dérobe pas.\n\n« Callensbourg », dit-elle sans ouvrir les yeux. Rien d'autre. Vous connaissez la date, tout le monde connaît la date, et vous ne demandez pas le reste — ni qui tenait la lame, ni ce qu'elle a fait ensuite, ni si elle l'a retrouvé. Elle ne le dirait pas ce soir et elle vous saurait mauvais gré de l'avoir demandé.\n\nElle repose sa main sur la vôtre pour qu'elle y reste. C'est tout ce qu'elle dit sur le sujet, et c'est beaucoup." },
    "§ Très tard, dans le noir, elle demande : « Vous dormez de quel côté ? »",
    { sobre:"C'est la question la plus intime de la soirée.",
      intense:"C'est, de très loin, la question la plus intime de la soirée — parce que c'est la seule qui suppose une deuxième nuit.",
      extreme:"C'est, de très loin, la question la plus intime de toute la soirée. Le reste appartient à une nuit et pourrait n'appartenir qu'à elle. Celle-là suppose une deuxième nuit, et une troisième, et un homme dont on finit par savoir de quel côté du lit il se met — et elle l'a posée du même ton que « le maréchal ouvre à sept heures », ce qui ne trompe ni vous ni elle." },
  ],
  choix:[
    { t:"« De celui de la porte. »",
      detail:"répondre à la question · et donc à l'autre question",
      risque:"calculé", va:'aly_nuit_apres' },
    { t:"« Je ne dors pas beaucoup. »",
      detail:"esquiver · elle a esquivé pendant onze semaines, elle saura lire",
      risque:"prudent", va:'aly_nuit_apres' },
  ],
},

aly_nuit_dire:{
  qui:'alycia',
  titre:"Ce que ça change",
  texte:[
    "@« Attendez. »",
    "Elle attend.",
    "@« Vous dites qu'il n'y a rien de fixé. C'est vrai. Mais rien de fixé ne veut pas dire rien d'engagé, et je préfère qu'on se dise ce qui change avant, pas dans six mois. »",
    { sobre:"« Ça, c'est une phrase de contrat. »",
      intense:"« Ça, c'est une phrase de contrat », dit-elle — mais elle ne descend pas l'escalier, et le ton n'est pas celui du reproche.",
      extreme:"« Ça, c'est une phrase de contrat », dit-elle, et pendant une seconde vous croyez avoir tout cassé. Mais elle ne descend pas l'escalier, et en la regardant mieux vous voyez qu'elle n'a pas dit ça comme un reproche : elle a dit ça comme quelqu'un qui reconnaît un outil dans la main de quelqu'un d'autre et qui trouve l'outil bon." },
    "@« C'est la seule langue qu'on m'ait apprise. »",
    "« Je sais. » Elle s'adosse au mur du palier. « Allez-y, alors. Qu'est-ce que ça change ? »",
    "@« Ça change que je ne pourrai plus vous envoyer devant. »",
    "Silence.",
    "« Continuez. »",
    { sobre:"@« Ça change que si vous êtes prise, je viendrai. »",
      intense:"@« Ça change que si vous êtes prise, je viendrai. Pas parce que c'est juste. Parce que je viendrai, et que je ne pourrai pas décider autrement, et que ça fera de moi quelqu'un de moins fiable pour les trente-huit que vous cachez. »",
      extreme:"@« Ça change que si vous êtes prise, je viendrai. Pas parce que ce serait juste, pas parce que je l'aurais promis : parce que je viendrai, voilà tout, et que je ne pourrai pas décider autrement le jour venu. Ce qui fait de moi, à partir de ce soir, quelqu'un de moins fiable pour les trente-huit personnes que vous cachez. Vous devriez y penser avant moi. C'est votre métier d'y penser avant moi. »" },
    "§ Elle met un temps très long à répondre.",
    "« Vous venez de me donner la seule raison valable de descendre cet escalier », dit-elle enfin. « Et vous me l'avez donnée vous-même. Personne n'a jamais fait ça de ma vie. »",
    "@« Alors descendez. »",
    "« Non », dit-elle, et elle ouvre la porte.",
  ],
  effets:{ flags:['aly_nuit','aly_amants','aly_dit_avant'],
           faire:() => bouger('alycia', { relation:5, confiance:9, attirance:7 }),
           exploit:{ eclat:3, temoins:'aucun', quoi:"vous avez dit le coût avant, à quelqu'un qui savait le lire" },
           marque:"Vous lui avez donné vous-même la raison de refuser. Elle a ouvert la porte.",
           court:"La raison de refuser" },
  suite:'aly_nuit_chambre', libelleSuite:"La chambre haute" },

aly_nuit_promesse:{
  qui:'alycia',
  titre:"Du solide",
  texte:[
    "@« Écoutez. Vous n'avez pas de maison, soit. Vous en aurez une. Il y a une place pour vous à Karlsberg, il y aura un toit, des hommes, et un nom qui vous couvre. Je peux vous donner ça. »",
    { sobre:"Vous voyez la chose se produire pendant que vous parlez.",
      intense:"Vous voyez la chose se produire pendant que vous parlez, et il est déjà trop tard pour la reprendre : elle recule d'un demi-pas. Un demi-pas seulement.",
      extreme:"Vous voyez la chose se produire pendant que vous parlez, et il est déjà trop tard pour la reprendre. Elle ne se ferme pas, elle ne se raidit pas, elle ne dit rien de dur. Elle recule d'un demi-pas, exactement un demi-pas, comme quelqu'un qui ajuste sa distance à un cheval qu'il ne connaît pas — et vous savez, avec une certitude glacée, que vous venez de dire précisément la chose qu'il ne fallait pas dire à cette femme-là." },
    "« Une place », répète-t-elle.",
    "@« Oui. »",
    "« Un toit, des hommes, et un nom qui me couvre. »",
    "@« Oui. »",
    "« Messire. » Elle a repris le *messire*, qu'elle avait laissé tomber quelque part entre Chastel et les Marches. « J'avais dix-sept ans quand ils sont entrés par la porte des cuisines. J'en ai passé quinze à faire en sorte de n'avoir besoin de personne, parce que chaque fois qu'un Paria a eu besoin de quelqu'un, ce quelqu'un a fini par avoir le choix entre le garder et se sauver, et vous savez ce qu'ils choisissent. »",
    "@« Je ne vous lâcherais pas. »",
    { sobre:"« Je sais. C'est encore pire. »",
      intense:"« Je vous crois. » Elle le dit sans ironie. « C'est ça le pire. Si je ne vous croyais pas, je pourrais refuser tranquillement. »",
      extreme:"« Je vous crois. » Elle le dit sans une once d'ironie, et c'est ce qui rend la suite terrible. « C'est exactement ça, le problème. Si je ne vous croyais pas, je refuserais tranquillement et on n'en parlerait plus. Mais je vous crois, donc si j'accepte, dans deux ans j'aurai un toit que vous m'aurez donné, des hommes que vous m'aurez donnés, un nom que vous m'aurez donné, et le jour où vous serez d'un avis et moi d'un autre, je n'aurai plus rien à mettre en face. »" },
    "§ Vous venez d'offrir. Elle a entendu : *vous allez me devoir*.",
    "« La chambre haute est de ce côté », dit-elle. « La mienne est de l'autre. Bonne nuit, messire. »",
    "Elle ne claque pas la porte. Elle la referme normalement, ce qui est bien pire.",
  ],
  effets:{ flags:['aly_offert','aly_nuit_ratee'],
           faire:() => bouger('alycia', { peur:7, attirance:-3, relation:1 }),
           marque:"Vous lui avez offert une place. Elle a entendu une dette et elle a refermé la porte normalement.",
           court:"Une place" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_nuit_apres:{
  qui:'alycia',
  titre:"Le matin",
  texte:[
    "Le maréchal ouvre à sept heures. Vous y êtes tous les deux avant les charretiers, ce qui règle la question de savoir si l'un des deux allait faire semblant que rien ne s'était passé.",
    { sobre:"Elle est exactement la même.",
      intense:"Elle est exactement la même : trois longueurs devant, les auberges à deux sorties, les hommes comptés en entrant. Rien n'a été échangé contre autre chose.",
      extreme:"Elle est exactement la même. Trois longueurs devant sur la route, les auberges à deux sorties, les hommes comptés en entrant dans une salle. Rien n'a été échangé contre autre chose, aucune des deux économies n'a bougé, et c'est peut-être ça la nouveauté réelle : pour la première fois de votre vie d'adulte, une nuit avec une femme n'a rien acheté et rien payé." },
    "Il y a une différence, une seule, et elle met trois semaines à se voir.",
    "§ Elle vous dit désormais où elle va quand elle part seule.",
    "Pas pourquoi. Pas pour combien de temps. Où. C'est une information dont un ennemi ferait un carnage, et elle vous la donne à chaque fois, sans commentaire, comme on pose un objet sur une table.",
    "@« C'est votre façon de dire quelque chose ? » demandez-vous, la troisième fois.",
    "« Non. C'est ma façon de faire quelque chose. Je ne dis rien. »",
  ],
  effets:{ flags:['aly_ou_elle_va'],
           faire:() => bouger('alycia', { confiance:6, relation:3 }),
           marque:"Elle vous dit désormais où elle va quand elle part seule. Rien d'autre n'a changé.",
           court:"Où elle va" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

/* Le refus écrit — jamais un chiffre, toujours une raison. */
aly_pas_ce_soir:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Pas cette saison",
  texte:[
    "Vous passez quatre jours ensemble. Elle repart avant vous, à l'aube, sans réveiller l'aubergiste.",
    () => RAISONS[A2().refusAlycia] || RAISONS.relation,
    () => {
      const l = lien('alycia');
      if(A2().refusAlycia === 'peur')
        return "Elle a laissé sur la table l'argent de sa part de la chambre, comptée au sou. Elle le fait chaque fois maintenant. C'est une chose qu'on fait pour ne rien devoir, et elle la fait contre vous.";
      if(A2().refusAlycia === 'confiance')
        return "Vous ne savez toujours pas où elle dort quand elle n'est pas là, et elle n'a aucune intention de vous le dire. Ce n'est pas contre vous : c'est ce qui l'a gardée en vie quinze ans, et ça ne se démonte pas parce que quelqu'un est correct pendant trois saisons.";
      if(A2().refusAlycia === 'politique')
        return "Elle a lu ce que vous êtes en train de faire du monde avant vous. Elle ne le discute pas et elle ne l'attaque pas : elle en tient compte, et en tenir compte suffit.";
      if(A2().refusAlycia === 'attirance')
        return "Il y a des attelages qui tiennent la route mille lieues sans que rien d'autre s'y ajoute jamais, et le vôtre en est un pour l'instant. Ce n'est pas un échec. C'est juste la vérité de cette saison-là.";
      return `Vous vous connaissez depuis ${['une saison','deux saisons','un an','deux ans'][Math.min(3, A2().annee)]}. Ce n'est pas beaucoup pour quelqu'un qui a mis quinze ans à ne parler à personne.`;
    },
    "§ Elle n'a rien dit de tout ça. C'est vous qui le lisez, et vous avez appris à lire.",
  ],
  suite:'a2_saison', libelleSuite:"La saison passe" },

/* ══ 7 · UNE AUTRE COURONNE ═══════════════════════════════════════════════
 * Quelqu'un vous propose un mariage utile — le Prix, mais en grand, et pour
 * la vie. Ce n'est pas un piège moral : c'est un bon parti. */
aly_couronne:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Une autre couronne",
  texte:[
    () => a('a2_couronne_caleb')
      ? "La lettre porte le cachet de Fort-aux-Princes et elle est écrite par un secrétaire, ce qui est la façon polie de dire qu'elle n'engage encore personne."
      : "La lettre porte le cachet d'Astrah — le vieux, celui du trône vide — et elle est écrite de la main de Lucius Furius Augustus, ce qui est une manière de dire qu'elle engage déjà tout le monde.",
    () => a('a2_couronne_caleb')
      ? "Caleb de Fort-aux-Princes propose sa nièce. Vingt-six ans, veuve d'un premier mariage sans enfant, une dot en terres de la Route Grise et onze pages de clauses de passage. Elle est décrite en quatre lignes, dont trois sur la dot."
      : "Lucius propose une cousine de la maison Furia. Vingt-neuf ans, un nom qui remonte plus haut que la Purge, et un article qui dit, sans le dire, que les enfants de ce mariage porteraient les deux noms.",
    "§ Ce n'est pas le Prix. Le Prix se fixe pour un contrat et s'éteint avec lui. Ceci est un mariage : c'est pour la vie, et ça vaut pour les enfants.",
    { sobre:"C'est un très bon parti pour un homme rayé d'un registre.",
      intense:"C'est un très bon parti. Il faut le poser honnêtement : un homme rayé d'un registre à neuf ans, qui a vécu onze ans de contrats, se voit proposer une maison, un nom qui tient devant un tribunal, et des enfants qui ne seraient pas des Parias.",
      extreme:"C'est un très bon parti, et il faut le poser honnêtement avant de faire le noble. Un homme rayé d'un registre à neuf ans, qui a vécu onze ans en vendant des contrats à des gens qui le méprisaient poliment, se voit proposer : une maison, un nom qui tient debout devant un tribunal de province, des terres, et — c'est ça le vrai article — des enfants qui ne seraient pas des Parias. Pas cachés. Pas rayés. Inscrits quelque part, en toutes lettres, dans un registre que personne ne viendrait raturer." },
    "Alycia lit la lettre par-dessus votre épaule sans demander la permission, ce qu'elle fait depuis Karlsberg.",
    "« Prenez-le », dit-elle.",
    "« Pardon ? »",
    { sobre:"« Prenez-le. C'est ce qu'il faut faire. »",
      intense:"« Prenez-le. C'est ce qu'il faut faire, et vous le savez, et je ne vais pas rester debout à côté de vous pendant que vous cherchez comment me demander la permission. »",
      extreme:"« Prenez-le. C'est ce qu'il faut faire, vous le savez parfaitement, et je ne vais certainement pas rester plantée à côté de vous pendant que vous cherchez une façon élégante de me demander la permission. Je n'ai pas de permission à donner. Je n'ai pas de nom à mettre en face du sien. Je n'ai même pas de dot, à moins qu'on compte trois chevaux et une réputation d'assassin. »" },
    "Elle repose la lettre.",
    "« Et si je le prends ? »",
    "« Alors vous le prenez. »",
    "« Ce n'est pas une réponse. »",
    "« C'est la seule que j'aie le droit de donner », dit-elle. « Demandez-moi autre chose, si vous voulez une réponse qui soit à moi. »",
    "§ Elle vient de vous dire, en une phrase, exactement quelle question poser. Elle ne le redira pas.",
  ],
  choix:[
    { t:"« Qu'est-ce que vous voulez, vous ? »",
      detail:"la question qu'elle vient d'ouvrir · et qu'elle n'a jamais eu à répondre",
      risque:"calculé", va:'aly_couronne_elle' },

    { t:"Accepter le mariage",
      detail:"une maison, un nom, des enfants inscrits · c'est ce qu'il faut faire",
      risque:"définitif", ferme:"Ferme : ce qu'Alycia n'aura plus le droit de dire",
      definitif:true, va:'aly_couronne_oui' },

    { t:"Refuser, et le lui faire savoir",
      detail:"écrire le refus devant elle · et lui laisser en tirer ce qu'elle veut",
      risque:"définitif", ferme:"Ferme : l'alliance, la dot, et un nom qui tient au tribunal",
      definitif:true, va:'aly_couronne_non' },

    { t:"Ne pas répondre à la lettre",
      detail:"un silence est une réponse lente · et il garde les deux portes trois saisons",
      risque:"prudent", va:'aly_couronne_silence' },
  ],
},

aly_couronne_elle:{
  qui:'alycia',
  titre:"Ce qu'elle veut",
  texte:[
    "@« Qu'est-ce que vous voulez, vous ? »",
    { sobre:"Elle ne répond pas pendant un long moment.",
      intense:"Elle ne répond pas pendant un long moment, et pour une fois ce n'est pas de la technique : elle cherche vraiment.",
      extreme:"Elle ne répond pas pendant un long moment. Pour une fois ce n'est pas de la technique — vous avez appris à distinguer ses silences, et celui-ci n'est pas le silence de quelqu'un qui laisse l'autre se noyer. C'est le silence de quelqu'un qui n'a pas la réponse toute faite parce que personne ne lui a jamais posé la question, et qui est en train de constater ça en même temps que vous." },
    "« Je ne sais pas », dit-elle enfin.",
    "« Alycia. »",
    "« Non, vraiment. Je ne sais pas. » Elle s'assoit, ce qu'elle ne fait presque jamais quand la conversation est difficile. « J'ai trente-deux ans et je n'ai jamais rien voulu que je ne puisse obtenir toute seule. C'est une discipline. On enlève tout ce qui dépend de quelqu'un d'autre, et ce qui reste, on peut le vouloir sans risque. »",
    "« Qu'est-ce qui reste ? »",
    "« Trente-huit personnes en vie. Un cheval reposé. Savoir qui a fait rayer Callensbourg. » Elle compte sur trois doigts et s'arrête. « Voilà. Ça fait quinze ans que la liste ne change pas. »",
    "§ Elle regarde le quatrième doigt sans le lever.",
    { sobre:"« Il y a autre chose maintenant », dit-elle. « Et ça m'ennuie beaucoup. »",
      intense:"« Il y a autre chose maintenant, depuis une saison ou deux, et je ne l'ai pas mis sur la liste parce que ça ne dépend pas de moi. » Elle relève les yeux. « Ça m'ennuie beaucoup. »",
      extreme:"« Il y a autre chose maintenant. Depuis une saison ou deux. Je ne l'ai pas mis sur la liste, parce que la règle de la liste c'est que rien n'y entre qui dépende de quelqu'un d'autre, et celui-là dépend entièrement de quelqu'un d'autre. » Elle relève les yeux et les tient. « Ça m'ennuie beaucoup. C'est le mot exact. Pas « ça me fait peur », pas « ça me touche ». Ça m'ennuie, comme une porte qu'on n'arrive pas à barrer. »" },
    "« Dites-le. »",
    "« Non. » Elle se relève. « Je vous ai dit qu'il y en avait un quatrième. C'est déjà plus que ce que j'ai dit à quiconque depuis Callensbourg, et vous allez devoir vous en contenter cette saison. »",
    "§ Elle vous a donné un chiffre au lieu d'une phrase. Venant d'elle, c'est un chiffre énorme.",
  ],
  effets:{ flags:['aly_quatrieme_doigt'],
           faire:() => bouger('alycia', { relation:7, confiance:7, attirance:6, peur:-3 }),
           marque:"Trois choses sur sa liste depuis quinze ans. Il y en a une quatrième et elle ne la nomme pas.",
           court:"Le quatrième doigt" },
  suite:'aly_couronne_reste', libelleSuite:"Et la lettre" },

aly_couronne_reste:{
  qui:'alycia',
  titre:"La lettre, quand même",
  texte:[
    "La lettre est toujours sur la table. Elle n'a pas disparu parce qu'une conversation s'est bien passée.",
  ],
  choix:[
    { t:"Accepter le mariage",
      detail:"un nom, une maison, des enfants inscrits · et elle vient de dire ce qu'elle a dit",
      risque:"définitif", ferme:"Ferme : ce qu'Alycia n'aura plus le droit de dire",
      definitif:true, va:'aly_couronne_oui' },
    { t:"Refuser",
      detail:"écrire le refus · sans en faire une déclaration à personne",
      risque:"définitif", ferme:"Ferme : l'alliance, la dot, et un nom qui tient au tribunal",
      definitif:true, va:'aly_couronne_non' },
    { t:"Ne pas répondre",
      detail:"trois saisons de silence · les deux portes restent",
      risque:"prudent", va:'aly_couronne_silence' },
  ],
},

aly_couronne_oui:{
  qui:'alycia',
  titre:"Le bon parti",
  texte:[
    "Vous écrivez l'acceptation. Elle part par le courrier de Frimaire.",
    { sobre:"C'était la chose à faire.",
      intense:"C'était la chose à faire, et ça le reste le lendemain, et le mois d'après. Ce n'est pas un jeu où les bons calculs sont punis.",
      extreme:"C'était la chose à faire, et ça le reste le lendemain, et le mois suivant, et l'année d'après. Ce n'est pas une histoire où les bons calculs sont punis pour faire joli : la maison est réelle, la dot est réelle, et l'article sur les enfants tiendra devant n'importe quel tribunal de province." },
    "La femme s'appelle — vous l'apprenez à la troisième lettre, parce que les deux premières étaient d'un secrétaire — et elle a vingt-six ans, et elle écrit elle-même à partir de la quatrième. Elle est intelligente, prudente, et elle pose des questions précises sur ce que vous comptez faire de Karlsberg.",
    "§ Ce n'est pas une victime et ce n'est pas un prix. C'est une femme majeure qui fait, elle aussi, un bon calcul, et qui l'écrit noir sur blanc à la sixième lettre : *je préfère une maison qui commence à une maison qui finit.*",
    "Alycia l'apprend par la province, comme tout le monde.",
    { sobre:"Elle ne dit rien du tout.",
      intense:"Elle ne dit rien du tout, ce qui, chez elle, n'est pas un silence : c'est une décision de ne pas parler, et les deux ne se ressemblent pas de près.",
      extreme:"Elle ne dit rien du tout. Chez quelqu'un d'autre ce serait un silence ; chez elle c'est une décision de ne pas parler, prise à un moment précis, tenue ensuite avec la même rigueur que tout le reste. Elle continue à travailler avec vous. Elle continue à vous dire où elle va. Elle a cessé, à partir de ce mois-là, de s'asseoir dos à la porte." },
    "Vous ne saurez jamais quel était le quatrième doigt.",
  ],
  effets:{ flags:['aly_marie','a2_marie','a2_maison_alliee'],
           faire:() => { bouger('alycia', { attirance:-8, relation:-2, peur:4 });
                         retenir('alycia', "il s'est marié dans une maison qui compte, et il a eu raison"); },
           marque:"Vous vous êtes marié. C'était le bon calcul. Elle a cessé de s'asseoir dos à la porte.",
           court:"Le bon parti" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_couronne_non:{
  qui:'alycia',
  titre:"Le refus",
  texte:[
    "Vous écrivez le refus à la table, devant elle, en six lignes polies.",
    "« Vous êtes idiot », dit-elle, sans lever les yeux de ce qu'elle fait.",
    "« Probablement. »",
    "« Non, écoutez-moi. » Elle repose son ouvrage. « Ce n'est pas de la modestie de ma part. Cette lettre valait une maison. Vous venez de refuser une maison. Pour quoi ? »",
    { sobre:"« Pour ne pas devoir. »",
      intense:"« Pour la même raison que vous refusez tout depuis quinze ans. Pour ne pas devoir. »",
      extreme:"« Pour la même raison exactement que vous refusez tout depuis quinze ans. Pour ne pas devoir. Vous avez passé une soirée entière à m'expliquer que chaque chose reçue est une chaîne. Je vous ai écoutée. Cette lettre est une chaîne de onze pages avec des clauses de passage. »" },
    "Elle ouvre la bouche et la referme.",
    "« Ce n'est pas pareil », dit-elle finalement, sans conviction.",
    "« C'est exactement pareil et vous le savez. »",
    "§ Elle ne répond pas. C'est la première fois que vous lui rendez son propre raisonnement et qu'il lui reste dans la main.",
    "Plus tard, ce soir-là : « Vous auriez eu des enfants inscrits quelque part. »",
    "@« Oui. »",
    "« Ça, ce n'était pas rien. »",
    "« Non. Ce n'était pas rien. »",
    "Elle hoche la tête lentement, comme on classe une information importante, et n'y revient plus.",
  ],
  effets:{ flags:['aly_refuse_mariage','a2_alliance_refusee'],
           faire:() => { bouger('alycia', { relation:5, confiance:6, attirance:7 });
                         retenir('alycia', "il a refusé une maison, et il m'a rendu mon propre argument"); },
           marque:"Vous avez refusé le mariage en lui rendant son propre raisonnement. Elle n'y est plus revenue.",
           court:"Onze pages de clauses" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_couronne_silence:{
  qui:'alycia',
  titre:"Trois saisons de silence",
  texte:[
    "Vous ne répondez pas. C'est une réponse : elle met simplement plus longtemps à arriver, et elle arrive chez quelqu'un qui compte.",
    { sobre:"Une maison qui propose et qu'on ne remercie pas retient le nom.",
      intense:"Une maison qui propose une alliance et qui ne reçoit rien — pas même un refus poli — ne se vexe pas tout de suite. Elle note. Les maisons notent tout, c'est leur seule véritable activité.",
      extreme:"Une maison qui propose une alliance et qui ne reçoit rien du tout — pas un refus, pas un accusé de réception, rien — ne se vexe pas immédiatement. Elle note. C'est la seule activité réelle d'une maison de province : noter, classer, ressortir au bon moment. Vous venez d'entrer dans une colonne, et la colonne s'appelle *ceux qui n'ont pas répondu*." },
    "Alycia ne commente pas non plus. Vous êtes deux à ne rien dire d'une lettre posée sur une table, ce qui devient une petite habitude entre vous, et pas la meilleure.",
    "§ La lettre finit dans une sacoche. Elle y restera trois saisons, et quelqu'un la ressortira.",
  ],
  effets:{ flags:['aly_couronne_muet','a2_lettre_sans_reponse'],
           faire:() => bouger('alycia', { confiance:-2 }),
           marque:"Vous n'avez pas répondu à la lettre. On l'a noté.",
           court:"Sans réponse" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

/* ══ 8 · LE CHOIX D'ALYCIA ════════════════════════════════════════════════
 * Elle choisit. Ce n'est pas un test posé au joueur : c'est une décision
 * qu'elle prend en lisant l'état réel du monde, et elle l'annonce. */
aly_choix:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Ce qu'elle a décidé",
  texte:[
    "Elle vous attend, ce qu'elle ne fait jamais : elle arrive, ou elle est déjà partie.",
    "Il y a une carte sur la table. Ce n'est pas une carte de province : c'est un croquis de sa main, avec trente-huit points et aucun nom.",
    { sobre:"« J'ai décidé quelque chose. »",
      intense:"« J'ai décidé quelque chose et je viens vous le dire, pas vous le demander. Vous verrez que ce n'est pas la même conversation. »",
      extreme:"« J'ai décidé quelque chose. Je viens vous le dire, pas vous le demander, et vous allez voir que ce n'est pas du tout la même conversation — j'ai fait les deux dans ma vie et il n'y a que la première qui m'aille. »" },
    () => {
      const A = A2();
      if(A.bannieres)
        return "« Vous avez relevé les Bannières. Karlsberg est sur les cartes depuis Messidor, il y a une garnison, et il y a un homme à Fort-aux-Princes qui a déjà fait dresser l'état de vos créances. Tout ça est vrai et rien de tout ça n'est ma faute ni la vôtre : c'est ce qui arrive quand une maison revient. »";
      if(A.refuge >= 1)
        return "« Vous avez fait de Karlsberg un endroit sans nom, sans mur et sans bannière. Onze personnes y dorment ce soir. Vous avez fait exactement ce que j'aurais fait, ce qui me met dans une position idiote, parce que je n'ai plus d'objection et que j'en avais préparé quatre. »";
      return "« Karlsberg est refermée. Personne n'y va, personne n'en parle, et c'est probablement ce qu'il fallait faire. Ça ne règle pas la question, ça la reporte. »";
    },
    () => {
      const p = A2().pistes;
      const n = Math.max(p.sang, p.onde, p.papier);
      if(n >= 4) return "« Et vous êtes à un nom de savoir qui a écrit à Chastel. Un nom, messire. Pas deux. »";
      if(n >= 2) return "« Et vous avancez sur le nom. Lentement, mais vous avancez, et ceux d'en face le sentent, parce que les gens qui ont fait rayer une maison passent leur vie à guetter si quelqu'un cherche. »";
      return "« Et vous n'avancez pas sur le nom. Ce n'est pas un reproche : trois ans c'est court et le monde est grand. Mais ceux d'en face vieillissent, eux aussi, et un mort n'avoue rien. »";
    },
    "§ Elle met la main à plat sur le croquis aux trente-huit points.",
    "« Voilà ce que je décide. Je ne peux pas faire les deux. Je ne peux pas tenir trente-huit personnes vivantes et courir la province avec vous. J'ai essayé quatre saisons, j'ai failli en perdre deux à Bourg-l'Aigre, et je n'en avais pas perdu un seul en quinze ans. »",
    "Elle attend une seconde.",
    "« Alors dites-moi ce que vous en pensez, et ensuite je vous dirai ce que j'ai décidé. Dans cet ordre. Je veux savoir si vous alliez le dire. »",
  ],
  choix:[
    { t:"« Prenez vos trente-huit. Je continuerai seul. »",
      detail:"lui rendre son travail · ce qui est la seule chose qu'elle ait jamais eue",
      risque:"calculé", va:'aly_choix_libre' },

    { t:"« Restez. J'ai besoin de vous. »",
      detail:"le dire franchement · à quelqu'un pour qui « avoir besoin » est un gros mot",
      risque:"définitif", va:'aly_choix_demande' },

    { t:"« Amenez-les à Karlsberg. Tous. »",
      detail:"régler la contradiction en la supprimant · et faire de Karlsberg une adresse",
      si:() => A2().bannieres || A2().refuge >= 1,
      risque:"définitif", ferme:"Ferme : la dispersion, qui les a gardés en vie quinze ans",
      va:'aly_choix_karlsberg' },

    { t:"Ne rien dire et attendre sa décision",
      detail:"elle a demandé si vous alliez le dire · ne pas le dire est une réponse",
      risque:"prudent", va:'aly_choix_muet' },
  ],
},

aly_choix_libre:{
  qui:'alycia',
  titre:"Trente-huit",
  texte:[
    "@« Prenez vos trente-huit. Je continuerai seul. »",
    { sobre:"Elle ferme les yeux une seconde.",
      intense:"Elle ferme les yeux une seconde. Quand elle les rouvre, quelque chose a changé de place dans son visage et vous ne savez pas quoi.",
      extreme:"Elle ferme les yeux une seconde entière, ce que vous ne l'avez jamais vue faire ailleurs que dans une chambre haute d'auberge. Quand elle les rouvre, quelque chose a changé de place dans son visage, et vous n'arrivez pas à dire quoi, et vous y penserez encore dans dix ans." },
    "« Vous alliez le dire », constate-t-elle.",
    "@« Oui. »",
    "« Avant de savoir ce que j'avais décidé. »",
    "@« Oui. »",
    "« Bien. » Elle roule le croquis. « Alors écoutez ce que j'avais décidé, puisque maintenant ça ne coûte plus rien à personne : j'avais décidé de rester. »",
    "§ Vous mettez un temps à comprendre que les deux phrases ne se contredisent pas.",
    "« Je reste », dit-elle. « Mais pas comme les quatre saisons passées. Je ne fais plus la route avec vous. Je ne suis pas à côté de vous sur un cheval, à trois longueurs devant, où n'importe quel guetteur d'étape peut nous compter à deux. Je suis quelque part, et vous ne saurez pas où, et quand vous aurez besoin de quelque chose que trente-huit personnes réparties dans quatre provinces peuvent faire, vous l'aurez. »",
    "« C'est-à-dire ? »",
    { sobre:"« C'est-à-dire un réseau. Le mien. Vous ne l'aurez jamais eu. Personne ne l'a jamais eu. »",
      intense:"« C'est-à-dire trente-huit personnes ordinaires dans trente-quatre endroits ordinaires, qui savent l'heure des relèves, qui voient passer les convois, et dont pas une n'a jamais été soupçonnée de quoi que ce soit. Personne n'a jamais eu ça. Pas Mont-Draken. Pas Fort-aux-Princes. »",
      extreme:"« C'est-à-dire trente-huit personnes parfaitement ordinaires dans trente-quatre endroits parfaitement ordinaires. Une aubergiste, deux charretiers, une sage-femme, un clerc d'étape, un maréchal-ferrant, un valet d'écurie de Chastel qui ferre les chevaux du commissaire aux titres depuis neuf ans. Ils savent l'heure des relèves, ils voient passer les convois, ils entendent ce qu'on dit dans les salles basses, et pas un seul n'a jamais été soupçonné de quoi que ce soit, parce qu'aucun d'eux n'a jamais rien fait. Personne au monde n'a un instrument pareil. Ni Mont-Draken, ni Fort-aux-Princes, ni Astrah. »" },
    "« Pourquoi maintenant ? »",
    "« Parce que vous venez de me le rendre sans que je le demande. » Elle prend son manteau. « C'est la seule monnaie que j'accepte, messire, et vous êtes le premier depuis quinze ans à l'avoir sur vous. »",
  ],
  effets:{ flags:['aly_choix_reste','aly_reseau_acquis','a2_reseau_su','a2_reseau_protege'],
           faire:() => { bouger('alycia', { relation:8, confiance:10, attirance:5, peur:-5 });
                         A2().pistes.sang = Math.max(A2().pistes.sang, 3);
                         retenir('alycia', "il m'a rendu mon travail avant que je le demande"); },
           exploit:{ eclat:6, temoins:'aucun', quoi:"vous avez rendu à quelqu'un la seule chose qu'il ait" },
           marque:"Vous lui avez rendu ses trente-huit. Elle est restée, autrement : le réseau vous est ouvert.",
           court:"Le réseau" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_choix_demande:{
  qui:'alycia',
  titre:"Avoir besoin",
  texte:[
    "@« Restez. J'ai besoin de vous. »",
    { sobre:"Le mot tombe mal et vous le savez en le disant.",
      intense:"Vous entendez le mot atterrir. *Besoin.* Chez cette femme-là, c'est le mot d'une chaîne, et vous venez de le poser sur la table sans le vouloir.",
      extreme:"Vous entendez le mot atterrir dans la pièce. *Besoin.* Chez n'importe qui d'autre c'est un aveu touchant ; chez cette femme-là c'est le vocabulaire exact de la dépendance, celui qu'elle a passé quinze ans à démonter, et vous venez de le poser sur la table à voix haute, devant une carte à trente-huit points." },
    "« Non », dit-elle doucement.",
    "« Alycia — »",
    "« Non, écoutez la nuance, elle compte. » Elle ne s'est pas fâchée, ce qui est presque plus inquiétant. « Vous n'avez pas besoin de moi. Vous avez besoin de ce que je fais. Ce n'est pas la même phrase et la deuxième ne demande pas que je reste : elle demande que je travaille. »",
    "« Et si c'était la première ? »",
    "Elle vous regarde longtemps.",
    "« Alors ce serait très mal choisi comme moment », dit-elle. « Parce qu'il y a une carte sur cette table avec trente-huit points dessus, et que vous venez de me demander de choisir entre elle et vous en employant le seul mot qui ne me laisse pas choisir. »",
    "§ Elle roule le croquis.",
    "« Voilà ce que je fais », dit-elle. « Je pars. Trois saisons, peut-être quatre. Je les remets tous ailleurs, un par un, parce qu'ils sont restés au même endroit pendant que je courais la province avec vous et que c'est exactement comme ça qu'on les perd. Ensuite je reviens. »",
    "« Et ensuite ? »",
    "« Ensuite je verrai si vous avez appris à demander autrement. »",
  ],
  effets:{ flags:['aly_choix_part','aly_partie'],
           faire:() => { bouger('alycia', { peur:6, relation:-2, confiance:1 });
                         retenir('alycia', "il m'a dit qu'il avait besoin de moi devant une carte à trente-huit points"); },
           marque:"Vous avez dit « besoin ». Elle est partie remettre trente-huit personnes ailleurs.",
           court:"Le mot besoin" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_choix_karlsberg:{
  qui:'alycia',
  titre:"Une adresse",
  texte:[
    "@« Amenez-les à Karlsberg. Tous. Il y a de la place, il y a des murs, et il y a des hommes. »",
    { sobre:"Elle ne répond pas tout de suite.",
      intense:"Elle regarde son croquis, les trente-huit points répartis sur quatre provinces, et elle passe le pouce dessus comme on efface.",
      extreme:"Elle regarde son croquis — trente-huit points répartis sur quatre provinces, trente-quatre endroits, quinze ans de travail — et elle passe le pouce dessus lentement, comme on efface une ligne de craie, en suivant du regard ce que ça donnerait si les trente-huit devenaient un." },
    "« Un point », dit-elle.",
    "« Un point défendu. »",
    "« Un point. » Elle relève la tête. « Vous savez ce que Mont-Draken a dépensé en quinze ans pour trouver **un** de mes trente-huit ? Ils n'y sont pas arrivés. Pas une fois. Vous savez ce qu'ils dépenseraient pour en prendre trente-huit d'un coup dans un endroit qu'on peut désigner sur une carte ? »",
    "« Ils auraient une garnison en face. »",
    "« Ils auraient un siège, et un siège se gagne avec du temps et du grain, et ils ont les deux. »",
    "§ Elle repose le croquis. Elle ne l'a pas roulé, cette fois : elle l'a laissé ouvert sur la table entre vous deux.",
    "« Et pourtant », dit-elle.",
    "« Pourtant ? »",
    { sobre:"« Pourtant je vieillis, et eux aussi. »",
      intense:"« Pourtant j'ai trente-deux ans, et la moitié de mes trente-huit en ont plus de cinquante. Je les tiens vivants parce que je suis capable de faire quatre cents lieues par saison. Le jour où je ne pourrai plus, ils meurent les uns après les autres et personne ne saura même qu'ils sont morts. »",
      extreme:"« Pourtant j'ai trente-deux ans, et la moitié de mes trente-huit en ont plus de cinquante. Ce système ne tient debout que parce qu'une femme est capable de faire quatre cents lieues par saison en changeant de nom à chaque étape. Il ne survit pas à ma jambe cassée. Il ne survit pas à un hiver où je suis malade. Le jour où je ne peux plus, ils meurent les uns après les autres, chacun dans son endroit ordinaire, et personne ne saura même qu'ils sont morts — parce que la dispersion, c'est très bien pour cacher les vivants, et c'est parfait pour cacher les morts. »" },
    "Elle plie enfin la carte.",
    "« Onze », dit-elle. « Pas trente-huit. Onze : les plus vieux, les plus malades, ceux qui ne tiendraient pas un déplacement de plus. Je les amène à Karlsberg cet automne. Les vingt-sept autres restent où ils sont, et vous ne saurez jamais où. »",
    "« C'est une contre-proposition. »",
    "« C'est la première que je fais à quelqu'un depuis quinze ans. Prenez-la avant que je réfléchisse. »",
  ],
  effets:{ flags:['aly_choix_reste','aly_onze_karlsberg','a2_reseau_su','a2_karlsberg_peuple'],
           faire:() => { bouger('alycia', { relation:6, confiance:7, peur:3 });
                         A2().refuge = Math.max(A2().refuge, 2);
                         A2().pistes.sang = Math.max(A2().pistes.sang, 2);
                         retenir('alycia', "il a voulu tout rassembler ; j'ai amené onze et gardé vingt-sept"); },
           marque:"Onze Parias à Karlsberg, les plus vieux. Vingt-sept restent dispersés et vous ne saurez pas où.",
           court:"Onze sur trente-huit" },
  plusTard:"Onze personnes à une adresse. Si Karlsberg tombe un jour, elles tombent avec.",
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_choix_muet:{
  qui:'alycia',
  titre:"Ce qu'un silence répond",
  texte:[
    "Vous ne dites rien.",
    "Elle attend — vraiment, longtemps, bien au-delà de ce qu'exige la politesse, parce qu'elle avait posé une question et qu'elle tient à ce que le silence soit une réponse et pas un accident.",
    { sobre:"Puis elle roule le croquis.",
      intense:"Puis elle roule le croquis, sans brusquerie, avec la précision de quelqu'un qui vient de recevoir exactement l'information qu'elle était venue chercher.",
      extreme:"Puis elle roule le croquis. Sans brusquerie, sans un mot de trop, avec la précision tranquille de quelqu'un qui vient de recevoir exactement l'information qu'elle était venue chercher et qui n'a plus aucune raison de rester dans la pièce." },
    "« J'avais décidé de rester », dit-elle. « Je vous le dis parce que je l'avais décidé et que ce serait malhonnête de faire comme si j'avais décidé autre chose. »",
    "« Vous restez, alors. »",
    "« Non. »",
    "§ Elle est à la porte.",
    "« Je vous ai demandé si vous alliez le dire. Vous n'alliez pas le dire. » Elle n'a aucune amertume dans la voix, ce qui est le pire de tout. « Ce n'est pas de la lâcheté, je ne crois pas. C'est que vous préférez ne pas fermer une porte, et que dans ce métier-là ça se comprend très bien. Mais moi j'ai trente-huit personnes, et je ne peux pas les tenir avec quelqu'un qui ne ferme jamais rien. »",
    "Elle sort. Vous la reverrez — cette province n'est pas si grande — mais pas de la même façon.",
  ],
  effets:{ flags:['aly_choix_part','aly_partie','aly_silence_coute'],
           faire:() => { bouger('alycia', { relation:-6, confiance:-4, attirance:-3 });
                         retenir('alycia', "je lui ai demandé s'il allait le dire ; il n'allait pas le dire"); },
           marque:"Elle a demandé si vous alliez le dire. Vous ne l'avez pas dit. Elle est partie.",
           court:"Le silence" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

/* ══ 9 · LE LOUP ET LA SORCIÈRE ═══════════════════════════════════════════
 * Elle ne s'appelle pas la Sorcière parce qu'elle en est une. Elle s'appelle
 * la Sorcière parce que c'est ce qu'on met sur une femme dont on n'explique
 * pas les résultats. Ce beat n'arrive que si tout a tenu. */
aly_loup:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Le Loup et la Sorcière",
  texte:[
    "Le placard est cloué sur le mur de l'étape et il n'est pas de Mont-Draken : il est de la province, tiré à mille exemplaires, avec deux gravures grossières en haut.",
    { sobre:"**Le Loup et la Sorcière.**",
      intense:"**Le Loup et la Sorcière.** Deux gravures : un homme d'armes de haute taille avec une tête de loup, et une femme brune qui tient quelque chose dans les mains, et ce quelque chose est mal gravé exprès pour qu'on y voie ce qu'on veut.",
      extreme:"**Le Loup et la Sorcière.** Deux gravures grossières, tirées d'un même bois : à gauche un homme d'armes de haute taille avec une tête de loup posée sur les épaules — la Bannière du Loup, mal comprise par un graveur qui ne l'avait jamais vue ; à droite une femme brune qui tient quelque chose dans les mains, et ce quelque chose est gravé exprès de façon illisible, pour que chacun y voie ce qu'il a envie d'y voir." },
    "En dessous, en trois langues de province : ce qu'on leur reproche.",
    "À vous : dix-neuf morts nommés, dont onze exacts. Le reste est du remplissage, mais les onze suffisent.",
    "À elle : rien de nommé. Trente ans de disparitions, des hommes qu'on ne retrouve pas, des enfants qui manquent, une salle d'auberge où le feu a pris. Aucune date, aucun lieu, aucun nom.",
    "§ C'est la différence exacte entre les deux moitiés du placard : on vous accuse de choses que vous avez faites, on l'accuse d'être ce qu'elle est.",
    "Elle lit le sien deux fois.",
    "« Trente ans », dit-elle. « J'en ai trente-deux. Ils m'ont fait commencer à deux ans. »",
    "« Ça vous fait rire ? »",
    { sobre:"« Ça me soulage. »",
      intense:"« Ça me soulage, et c'est difficile à expliquer. » Elle arrache le placard du mur, proprement, avec les quatre clous. « Pendant quinze ans j'ai été *personne*. Une femme qui passe. C'était le but et ça a marché. »",
      extreme:"« Ça me soulage, et je vais avoir du mal à vous expliquer pourquoi. » Elle arrache le placard du mur, proprement, en récupérant les quatre clous, geste d'une femme qui a arraché beaucoup de placards. « Pendant quinze ans, j'ai été personne. Une femme qui passe, qu'on ne décrit pas, dont aucun guetteur d'étape ne se souvient. C'était le but exact de tout ce que j'ai construit, et ça a marché au-delà de ce que j'espérais. »" },
    "« Et maintenant ? »",
    "« Maintenant il y a une gravure de moi sur un mur d'étape, dans une auberge de la Route Grise, à côté d'une gravure de vous. » Elle plie le papier. « J'existe, messire. C'est la première fois depuis que j'ai dix-sept ans. »",
    "« Ils vont vous chercher. »",
    "« Ils me cherchaient déjà. La différence, c'est que maintenant ils cherchent quelqu'un. »",
    "§ Elle glisse le placard dans sa sacoche, avec les quatre clous.",
    "Elle a gardé toutes les affiches. Vous le découvrirez plus tard : il y en a onze, de onze provinces, et elle les a toutes.",
  ],
  choix:[
    { t:"« Alors qu'on nous cherche ensemble. »",
      detail:"assumer le placard · les deux moitiés du même bois",
      risque:"définitif", ferme:"Ferme : la possibilité de redevenir personne",
      va:'aly_loup_ensemble' },

    { t:"« Séparons-nous. Une gravure de chacun vaut mieux qu'une des deux. »",
      detail:"casser l'image avant qu'elle prenne · c'est le calcul qu'elle ferait",
      risque:"calculé", va:'aly_loup_separer' },

    { t:"Trouver le graveur",
      detail:"un bois se retrouve · et celui qui l'a commandé aussi",
      risque:"calculé", va:'aly_loup_graveur' },
  ],
},

aly_loup_ensemble:{
  qui:'alycia',
  titre:"Le même bois",
  texte:[
    "@« Alors qu'on nous cherche ensemble. »",
    { sobre:"Elle ne répond pas tout de suite. Puis : « Vous savez ce que ça coûte. »",
      intense:"« Vous savez ce que ça coûte », dit-elle. « Deux personnes qu'on cherche ensemble, ça se trouve deux fois plus vite. C'est de l'arithmétique, pas de la morale. »",
      extreme:"« Vous savez ce que ça coûte », dit-elle, et elle le pose comme un fait technique parce que c'en est un. « Deux personnes qu'on cherche séparément, il faut deux enquêtes. Deux personnes qu'on cherche ensemble, il en faut une, et elle est deux fois plus facile parce qu'on a deux descriptions à recouper au lieu d'une. C'est de l'arithmétique. Ce n'est pas de la morale et ce n'est pas du courage. »" },
    "@« Je sais. »",
    "« Dites-le en connaissant le chiffre, alors. »",
    "« Je le dis en connaissant le chiffre. »",
    "§ Elle sort le placard de sa sacoche, le déplie, et regarde les deux gravures côte à côte.",
    "« Le graveur ne m'a pas ratée », dit-elle. « C'est la première fois de ma vie que quelqu'un me dessine et me rate pas. Vous, en revanche, vous avez une tête de loup. »",
    "« C'est la bannière. »",
    "« Je sais ce que c'est. Il ne le savait pas, lui. »",
    "Elle replie le papier et le range.",
    "« Bon », dit-elle. « Ensemble. Mais on change de méthode : plus de route commune, plus d'auberges à deux, plus de guetteur qui peut nous compter. On arrive séparément et on repart séparément, et entre les deux on est ensemble. »",
    "« Ce n'est pas ce que j'appelle ensemble. »",
    { sobre:"« C'est ce que j'ai. »",
      intense:"« C'est ce que j'ai. » Elle vous regarde. « Vous voulez que je vous dise l'autre phrase, celle que vous attendez ? »",
      extreme:"« C'est ce que j'ai, et vous allez le prendre, parce que la version que vous imaginez nous fait tuer tous les deux à une étape en dix-huit mois. » Elle vous regarde, et elle décide quelque chose en une seconde. « Vous voulez que je dise l'autre phrase ? Celle que vous attendez depuis une saison et que je n'ai pas dite ? »" },
    "« Non. »",
    "« Bien. Parce que je ne la dirai pas. » Elle remet son manteau. « Je la ferai. C'est plus long à voir et ça dure plus longtemps. »",
  ],
  effets:{ flags:['aly_ensemble','a2_couple_public'],
           faire:() => { bouger('alycia', { relation:9, confiance:8, attirance:9, peur:-4 });
                         ETAT.suspicion = Math.min(100, ETAT.suspicion + 10);
                         retenir('alycia', "il a dit ensemble en connaissant le chiffre"); },
           exploit:{ eclat:5, temoins:'province', quoi:"le Loup et la Sorcière sur le même bois" },
           marque:"« Je ne la dirai pas. Je la ferai. C'est plus long à voir et ça dure plus longtemps. »",
           court:"Le même bois" },
  plusTard:"Deux personnes qu'on cherche ensemble se trouvent deux fois plus vite. Elle vous a donné le chiffre avant que vous choisissiez.",
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_loup_separer:{
  qui:'alycia',
  titre:"Deux bois",
  texte:[
    "@« Séparons-nous. Une gravure de chacun vaut mieux qu'une des deux. »",
    { sobre:"« Oui », dit-elle immédiatement. « C'est ce qu'il faut faire. »",
      intense:"« Oui », dit-elle immédiatement, sans une seconde d'hésitation, parce qu'elle avait fait le calcul avant d'arracher le placard du mur. « C'est ce qu'il faut faire. »",
      extreme:"« Oui », dit-elle immédiatement, sans une seconde d'hésitation, et vous comprenez qu'elle avait fait ce calcul avant même d'arracher le placard du mur — probablement pendant la deuxième lecture. « C'est ce qu'il faut faire, et je vous remercie de l'avoir dit le premier, parce que si je l'avais dit la première vous auriez cru que je partais. »" },
    "« Vous ne partez pas. »",
    "« Je ne pars pas. Je m'écarte, ce qui est un mot d'escrime et pas un mot d'adieu. »",
    "§ Vous convenez de trois choses en une demi-heure, à une table d'auberge, comme on convient d'un itinéraire.",
    "Une : plus jamais la même route le même jour.",
    "Deux : trois relais, trois personnes, trois endroits — un maréchal, une sage-femme, un clerc d'étape — par lesquels un mot passe en neuf jours.",
    "Trois : si l'un des deux ne donne rien pendant deux saisons pleines, l'autre ne vient pas le chercher.",
    "« La troisième est la seule qui compte », dit-elle. « Et c'est celle que vous allez enfreindre. »",
    "« Probablement. »",
    "« Certainement. » Elle se lève. « Je la mets quand même. Ça fait quinze ans que je mets cette règle-là avec tout le monde et que personne ne la tient. Elle sert à ce que la personne sache qu'elle l'enfreint. »",
  ],
  effets:{ flags:['aly_ecartee','a2_relais_trois'],
           faire:() => { bouger('alycia', { relation:4, confiance:8, attirance:2 });
                         retenir('alycia', "il a proposé de s'écarter avant moi, et il avait raison"); },
           marque:"Trois relais, neuf jours, et une règle qu'aucun des deux ne tiendra.",
           court:"Trois relais" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_loup_graveur:{
  qui:'alycia',
  titre:"Le bois",
  texte:[
    "Un bois gravé ne se cache pas : il est lourd, il vaut cher, et il ne sert qu'à une chose. Onze jours pour remonter à l'atelier — un imprimeur de Chastel, trois presses, une commande payée d'avance.",
    "L'imprimeur ne fait aucune difficulté. Il n'a rien à cacher : c'est une commande, elle est au registre, il a été payé en écus de province et il a même le nom du commanditaire, parce qu'un homme qui paie mille tirages laisse une adresse pour la livraison.",
    { sobre:"Le nom n'est pas celui de Mont-Draken.",
      intense:"Le nom n'est pas celui de Mont-Draken. Ce n'est pas non plus Fort-aux-Princes, ni Astrah, ni aucune des trois maisons auxquelles vous pensiez en montant l'escalier.",
      extreme:"Le nom n'est pas celui de Mont-Draken. Ce n'est ni Fort-aux-Princes, ni Astrah, ni aucune des trois maisons auxquelles vous pensiez tous les deux en montant l'escalier de l'atelier, et vous vous regardez au-dessus du registre avec la même expression." },
    "C'est une maison religieuse. Un couvent, plus exactement : le prieuré de Sainte-Ombre, qui a payé mille tirages d'un placard de province avec les deniers d'une fondation, et qui a demandé la livraison à onze étapes précises de la Route Grise.",
    "« Un couvent », dit Alycia.",
    "« Onze étapes. »",
    "« Choisies. » Elle a le doigt sur le registre. « Regardez la liste. Ce ne sont pas les onze plus grandes étapes de la province. Ce sont les onze où l'on passe quand on va vers les Marches Grises. »",
    "§ Quelqu'un a payé mille affiches pour que votre visage soit cloué exactement sur la route de Karlsberg.",
    "Pas pour vous faire prendre. Pour vous faire savoir qu'on sait où vous allez.",
  ],
  effets:{ flags:['aly_graveur','a2_sainteombre_su','a2_ysabel_soupcon'],
           faire:() => { bouger('alycia', { relation:3, confiance:5 });
                         A2().pistes.sang = Math.max(A2().pistes.sang, 3); },
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez remonté un bois gravé jusqu'à son commanditaire" },
           marque:"Le placard a été payé par le prieuré de Sainte-Ombre, et livré aux onze étapes de la route de Karlsberg.",
           court:"Sainte-Ombre" },
  suite:'a2_saison', libelleSuite:"La saison passe" },

aly_loup_non:{
  qui:'alycia',
  lieu:() => `${LIEUX[A2().lieu].nom} · ${dateA2()}`,
  titre:"Le placard",
  texte:[
    "Le placard est cloué sur le mur de l'étape : **Le Loup et la Sorcière**, deux gravures grossières, mille exemplaires, trois langues de province.",
    "Vous le lisez seul.",
    () => RAISONS[A2().refusAlycia] || RAISONS.relation,
    { sobre:"Vous ne savez pas où elle est.",
      intense:"Vous ne savez pas où elle est cette saison, et il n'y a personne à qui demander : c'est exactement le système qu'elle a construit, et il fonctionne aussi contre vous.",
      extreme:"Vous ne savez pas où elle est cette saison. Il n'y a personne à qui le demander — trente-huit personnes ordinaires dans trente-quatre endroits ordinaires, dont aucune ne connaît l'adresse d'une autre, et une seule femme qui a la liste dans la tête. C'est le système qu'elle a construit, il est excellent, et il fonctionne exactement aussi bien contre vous que contre Mont-Draken." },
    "§ Vous arrachez le placard quand même, avec les quatre clous, et vous le pliez dans votre sacoche.",
  ],
  suite:'a2_saison', libelleSuite:"La saison passe" },

};

enregistrerScenes(ALYCIA_TARD);

/* Une lettre de mariage ne s'offre pas sur la carte : elle arrive. On l'arme
 * dès qu'une maison a une raison de vous écrire, et le beat 7 la lit. */
function armerCouronne(){
  if(a('a2_couronne_offerte')) return;
  const A = A2();
  if(a('a2_bannieres') || ETAT.renom >= 55 || ETAT.suspicion >= 40 || a('ca_marche')){
    ETAT.flags.add('a2_couronne_offerte');
    if(a('a2_caleb_vu') || a('ca_marche')) ETAT.flags.add('a2_couronne_caleb');
  }
}
