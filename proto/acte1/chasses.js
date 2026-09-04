/* PARIAS — Acte I · CE QU'ON RENCONTRE ENTRE DEUX CONTRATS
 * ═══════════════════════════════════════════════════════════════════════
 *
 * Le tableau du Héron porte six affaires et Yohan n'en prend que trois.
 * Ces chasses-là ne sont pas au tableau : personne ne les affiche, personne
 * ne les paie d'avance, et on ne les choisit pas. **Elles arrivent.**
 *
 * C'est la seule façon de garantir qu'une partie, quels que soient les trois
 * contrats choisis, rencontre autre chose que des hommes. Le monde de
 * Vardhen a un bestiaire ; il faut le voir pour y croire.
 *
 * Chacune a la même charpente et jamais la même leçon :
 *
 *   ON ARRIVE — ce qu'on voit et ce qu'on croit voir
 *   ON LIT     — un test qui donne la vraie nature de la chose
 *   ON DÉCIDE  — où, quand, contre quoi exactement
 *   ON PAIE    — deux échanges V7, et la note
 *
 *   LA MEUTE     · saison 1 · trente bêtes qui ont appris une route
 *   LE COLOSSE   · saison 2 · ce que la tourbe fait et refait
 *   LA REINE     · saison 3 · ce qu'il y a au bout d'une galerie
 *   LE DUELLISTE · dès qu'on a un nom · un homme qui collectionne
 *
 * Aucune ne rapporte d'or. Deux d'entre elles en coûtent. Ce qu'on y gagne
 * est du renom devant témoins, ce qui, dans cet acte, est la seule monnaie
 * qui achète autre chose que du pain.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Les entrées : elles ne sont référencées par aucun `va:`, c'est la file de
 * l'entre-saisons qui les appelle. L'épreuve d'acceptation les lit ici. */
const RENCONTRES = ['ch_meute', 'ch_colosse', 'ch_reine', 'ch_duelliste'];

const CHASSES = {

/* ══════════════════════════════════════════════════════════════════════════
 * 1 · LA MEUTE DE FONTAINE-BASSE
 *
 * Ce n'est pas une histoire de monstre, c'est une histoire d'arithmétique.
 * Trente bêtes ne se battent pas : elles trient. Et la seule chose qu'un
 * homme seul peut décider, c'est **où**.
 *
 * Ce qu'on découvre en lisant les traces : elles n'ont plus peur du feu ni
 * de l'odeur d'homme, et il y a une raison à ça. Elle a douze ans.
 * ══════════════════════════════════════════════════════════════════════════ */
ch_meute:{
  lieu:"Fontaine-Basse · un hameau de onze feux · fin d'hiver",
  titre:"Ce qui descend en fin d'hiver",
  texte:[
    "Vous ne cherchiez pas ça. Vous cherchiez un toit, parce qu'il pleut depuis Vendredi et qu'un homme mouillé qui dort dehors en fin d'hiver se réveille malade ou ne se réveille pas.",
    "Fontaine-Basse a onze feux, une fontaine qui donne son nom au reste, et depuis six semaines une habitude : personne ne sort après la troisième heure.",
    { sobre:"Ils ont perdu neuf bêtes et deux hommes.",
      intense:"Ils ont perdu neuf bêtes en six semaines, ce qui est beaucoup et ce qui reste supportable. Ils ont aussi perdu deux hommes, ce qui ne l'est pas, et c'est de ça qu'ils parlent en se taisant.",
      extreme:"Neuf bêtes en six semaines. C'est beaucoup, c'est ruineux, et un hameau encaisse. Deux hommes, non. Le premier était un journalier qui rentrait de Cendrepont à la nuit ; on a retrouvé ses souliers, sa ceinture, et de quoi remplir la moitié d'un sac. Le second était le beau-frère du meunier, parti chercher le premier avec une fourche, à quatre contre lui, en plein jour, à deux cents pas des maisons.\n\nÀ deux cents pas des maisons. En plein jour. C'est cette phrase-là que tout le monde ici répète, et personne ne comprend pourquoi elle est la pire de l'affaire." },
    "« On a dit à Cendrepont », vous explique le meunier. « Cendrepont a une bête au-dessus de sa route et une assise à préparer. Ils ont dit qu'ils enverraient. »",
    "@« Ils enverront ? »",
    "« Ils enverront. » Il ne dit pas *non*. Il n'a pas besoin.",
    "§ Personne ne paie pour ça. Il n'y a pas de contrat, pas de maison, pas de sceau — un hameau de onze feux ne fait pas rédiger d'acte.",
    { sobre:"Vous pouvez repartir demain. Il n'y a rien qui vous retient.",
      intense:"Vous pouvez repartir demain matin par le sud, et rien au monde ne vous en empêche : vous n'avez rien signé, personne ne vous a demandé, et un homme d'armes qui travaille gratuitement finit par travailler gratuitement partout.",
      extreme:"Vous pouvez seller demain à la première heure et prendre le sud, et rien au monde ne vous en empêchera. Vous n'avez rien signé. Personne ne vous a rien demandé — c'est même remarquable : ils vous ont donné du feu, de la soupe et de la paille, et pas un des onze feux n'a prononcé une phrase qui ressemble à une demande. Ils savent ce que coûte un homme d'armes et ils savent ce qu'ils ont.\n\nEt un mercenaire qui travaille gratuitement une fois travaille gratuitement partout : c'est la première chose qu'on vous a apprise et elle est vraie." },
  ],
  choix:[
    { t:"Lire les traces avant tout",
      detail:"Perception · bestiaire — trente bêtes laissent trente fois plus qu'une",
      risque:"favorable",
      test:{ carac:'perception', comp:'bestiaire', dc:10, manoeuvre:'pistage' },
      degres:{ dominante:'ch_traces_dom', nette:'ch_traces_ok', couteuse:'ch_traces_ok',
               echec:'ch_traces_ko', catastrophe:'ch_traces_ko' } },

    { t:"Demander qui a vu quoi, et quand",
      detail:"Un hameau de onze feux sait tout et ne dit rien de lui-même",
      risque:"sûr", va:'ch_temoins' },

    { t:"Seller demain par le sud",
      detail:"Ce n'est pas votre affaire, personne ne vous a rien demandé",
      ferme:"Ferme : Fontaine-Basse, et ce qu'on y aurait appris",
      definitif:true, va:'ch_meute_partir' },
  ],
},

ch_meute_partir:{
  titre:"Le sud",
  texte:[
    "Vous sellez à la première heure. Le meunier vous donne du pain pour la route et ne vous demande rien, ce qui est exactement ce qu'il a fait depuis le début.",
    { sobre:"Personne ne vous reproche rien. C'est le pire.",
      intense:"Personne ne vous reproche quoi que ce soit. Personne ne fait la tête, personne ne détourne les yeux, et une femme vous souhaite bonne route. C'est très exactement ce qu'un hameau fait quand il a compris depuis longtemps que personne ne vient.",
      extreme:"Personne ne vous reproche quoi que ce soit. Personne ne fait la tête. Une femme d'une cinquantaine d'années vous souhaite bonne route et le pense, et deux enfants regardent le cheval avec un intérêt sincère.\n\nC'est très exactement ce que fait un endroit qui a cessé d'attendre. Un hameau qui vous en voudrait serait un hameau qui croyait encore à quelque chose." },
    "§ On n'apprendra jamais ce que la meute avait appris, ni pourquoi elle n'avait plus peur.",
  ],
  effets:{ flags:['ch_meute_ignoree'], cout:{ moral:5 },
           marque:"Vous avez laissé Fontaine-Basse à sa meute.", court:"Fontaine-Basse" },
  issue:"L'affaire n'a pas eu lieu",
  bilan:"Onze feux, et vous êtes passé",
  apres:[
    "Six semaines plus tard, un charretier vous dira qu'à Fontaine-Basse ils ont fini par brûler les granges du bas pour faire de la lumière la nuit, et que ça a marché.",
    "Il ne vous dira pas combien ils étaient encore.",
  ],
  suite:'entre_saisons', libelleSuite:"La route" },

/* ── Lire ce qu'il y a par terre ────────────────────────────────────────── */
ch_traces_dom:{
  titre:"Trente et deux",
  texte:[
    "Vous mettez la matinée. C'est ce que ça demande, et c'est pour ça que personne ne le fait.",
    { sobre:"Vous comptez trente animaux. Peut-être trente-deux.",
      intense:"Vous comptez trente animaux, peut-être trente-deux — au-delà de vingt on ne compte plus des empreintes, on compte des passages, et on divise. Ce n'est pas une meute : c'est trois meutes que la faim a soudées, ce qui n'arrive jamais et ce qui arrive tous les dix ans.",
      extreme:"Trente animaux. Peut-être trente-deux : au-delà de vingt on ne compte plus des empreintes, on compte des passages sur un même mètre de boue et on divise, et la division ment toujours un peu.\n\nCe n'est pas une meute. Une meute fait onze bêtes, douze les bonnes années. Là, il y a trois lignées différentes — trois tailles d'antérieur, trois façons de poser — que la faim a soudées en une seule chose. Ça n'arrive jamais. Ça arrive tous les dix ans, ce qui est la même phrase dite honnêtement." },
    "§ Et il y a une deuxième chose, qui est celle qui compte.",
    { sobre:"Elles ne contournent plus. Elles traversent.",
      intense:"Elles ne contournent plus rien. Il y a des traces à sept pas du seuil du meunier, entre le tas de fumier et la porte, et le tas de fumier sent l'homme à plein nez. Une bête sauvage fait un détour de trente pas pour éviter ça. Celles-là sont passées entre les deux.",
      extreme:"Elles ne contournent plus rien du tout, et c'est ça, la vraie nouvelle.\n\nIl y a des empreintes à sept pas du seuil du meunier, entre le tas de fumier et la porte, dans le seul couloir de tout le hameau qui sente l'homme à plein nez. Une bête sauvage rallonge de trente pas pour éviter cet endroit-là — elle le fait sans y penser, comme on retire la main du feu. Celles-là sont passées entre les deux, à la file, calmement, à trois reprises en huit jours.\n\nUn animal ne perd pas cette peur-là. On la lui retire." },
    "Vous suivez la coulée jusqu'au haut du pré nord, et vous trouvez ce qui manquait.",
    { sobre:"Un creux dans la haie. De la paille tassée. Et des os propres.",
      intense:"Un creux aménagé dans la haie d'aubépine, de la paille tassée par quelque chose qui s'y couche, et une quarantaine d'os. Propres. Rongés, blanchis, mais **apportés** : il n'y a pas un morceau de peau, pas un sabot, rien de ce qu'on laisse quand on tue sur place.",
      extreme:"Un creux aménagé dans la haie d'aubépine — aménagé, coupé à la serpe, avec la coupe encore claire. De la paille tassée en fond par quelque chose de lourd qui s'y couche. Et une quarantaine d'os étalés devant, propres, rongés, blanchis par six semaines de pluie.\n\nApportés. C'est le mot juste et c'est le mot terrible : pas un morceau de peau, pas un sabot, pas une tête. Rien de ce qu'un prédateur laisse là où il tue. Quelqu'un a porté de la viande jusqu'ici, à pied, plusieurs fois par semaine, pendant tout l'hiver." },
    "§ Une bête qui n'a plus peur de l'homme est une bête à qui un homme a donné à manger.",
  ],
  effets:{ flags:['ch_lu','ch_lu_bien','ch_nourries'],
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous avez lu trente bêtes dans de la boue" },
           marque:"Trente bêtes, trois lignées soudées par la faim, et quelqu'un les nourrit.",
           court:"Trente et deux" },
  suite:'ch_berger', libelleSuite:"Trouver qui" },

ch_traces_ok:{
  titre:"Beaucoup",
  texte:[
    "Vous y passez deux heures et vous en tirez l'essentiel.",
    { sobre:"Beaucoup. Vingt-cinq au moins. Et elles ne contournent pas les maisons.",
      intense:"Beaucoup — vingt-cinq au moins, ce qui est déjà deux meutes réunies. Et elles ne contournent pas les maisons : il y a des traces entre le fumier du meunier et sa porte, dans le couloir qui sent l'homme le plus fort du hameau.",
      extreme:"Beaucoup. Vingt-cinq au moins, ce qui veut dire deux meutes réunies, ce qui n'arrive que les hivers où il n'y a plus rien du tout à manger.\n\nEt elles ne contournent pas les maisons. Il y a des empreintes entre le tas de fumier du meunier et sa porte — sept pas, le couloir le plus chargé d'odeur humaine de tout le hameau. Un animal sauvage rallonge de trente pas plutôt que de passer là. Celles-ci sont passées." },
    "§ Une bête qui n'a plus peur de l'homme n'a pas oublié la peur. On la lui a retirée.",
    "Vous ne trouvez pas comment. Mais vous savez quoi chercher, et dans un hameau de onze feux, savoir quoi chercher suffit.",
  ],
  effets:{ flags:['ch_lu','ch_nourries'],
           marque:"Vingt-cinq bêtes au moins, et elles passent à sept pas des portes.",
           court:"Vingt-cinq" },
  suite:'ch_berger', libelleSuite:"Chercher qui" },

ch_traces_ko:{
  titre:"De la boue",
  texte:[
    "Il pleut depuis Vendredi. C'est le problème et il n'y a rien à faire contre : une trace dans de la boue détrempée s'élargit d'un tiers en une nuit, et une trace élargie d'un tiers appartient à une bête qui n'existe pas.",
    { sobre:"Vous en tirez : beaucoup, et un gros.",
      intense:"Vous en tirez deux choses et elles ne valent pas la matinée : elles sont beaucoup, et il y en a un plus gros que les autres. C'est vrai de toutes les meutes du monde depuis qu'il y a des meutes.",
      extreme:"Vous en tirez deux renseignements et aucun des deux ne vaut la matinée que vous venez d'y passer. Elles sont beaucoup — vous n'irez pas plus loin que *beaucoup*. Et il y en a un dont l'antérieur fait un tiers de plus que les autres.\n\nC'est vrai de toutes les meutes du monde depuis qu'il existe des meutes. Vous avez traversé un pré détrempé pendant trois heures pour apprendre que l'eau mouille." },
    "§ On lit le sol quand le sol veut bien. Aujourd'hui il ne veut pas.",
  ],
  effets:{ flags:['ch_lu'], cout:{ endurance:12, moral:3 },
           marque:"Vous n'avez rien tiré des traces : trois jours de pluie.", court:"De la boue" },
  suite:'ch_temoins', libelleSuite:"Alors demander" },

/* ── Demander ───────────────────────────────────────────────────────────── */
ch_temoins:{
  titre:"Onze feux",
  texte:[
    "Onze feux, c'est quarante personnes. Quarante personnes savent tout et n'en disent aucune partie spontanément, parce que la moitié de ce qu'elles savent accuse l'autre moitié.",
    "Vous y passez la soirée. Vous obtenez, dans l'ordre : que le premier mort était ivre, ce qui est faux ; que le second est allé chercher le premier, ce qui est vrai ; et que les bêtes sont descendues des tourbières, ce dont personne ne sait rien.",
    { sobre:"Puis une femme dit une chose et se tait aussitôt.",
      intense:"Puis, tard, une femme de trente ans dit une phrase et s'arrête au milieu, exactement comme on retire le pied d'une marche qui n'est pas là.\n\n« Les moutons de mon beau-père n'ont rien eu. »",
      extreme:"Puis, tard, quand il ne reste que quatre personnes autour du feu et que le vin de baies fait son travail, une femme d'une trentaine d'années commence une phrase et s'arrête au beau milieu — exactement du mouvement dont on retire le pied d'une marche qui n'existe pas.\n\n« Les moutons de mon beau-père n'ont rien eu. »\n\nElle le dit sur le ton d'une chose amusante. Puis elle entend ce qu'elle vient de dire, et son visage fait le trajet complet en une seconde et demie." },
    "@« Combien de bêtes, votre beau-père ? »",
    "« Quarante. » Un temps. « Il en a quarante. »",
    "§ Neuf bêtes perdues dans le hameau. Zéro chez celui qui en a le plus, et dont le pré touche la haie du nord.",
    "Personne ne dit rien de plus ce soir-là. Personne n'a besoin.",
  ],
  effets:{ flags:['ch_temoins', 'ch_nourries'],
           marque:"Neuf bêtes perdues au hameau. Zéro chez celui qui en a quarante.",
           court:"Zéro chez lui" },
  suite:'ch_berger', libelleSuite:"Le pré du haut" },

/* ── Le berger ──────────────────────────────────────────────────────────── */
ch_berger:{
  qui:'colin',
  lieu:"Fontaine-Basse · le pré nord · avant l'aube",
  titre:"Colin",
  texte:[
    "Vous l'attendez dans la haie, sous la pluie, à partir de la quatrième heure. Il arrive à la cinquième avec un sac de toile sur l'épaule et il ne vous voit pas, parce qu'un enfant de douze ans qui fait une chose interdite regarde derrière lui et jamais devant.",
    { sobre:"Le sac contient de la viande. Beaucoup.",
      intense:"Le sac contient de la viande. Pas des restes : des quartiers. Du mouton, débité proprement, quinze à vingt livres — le travail d'un homme qui sait tenir un couteau, ou d'un garçon qui a regardé son grand-père le faire pendant douze ans.",
      extreme:"Le sac contient de la viande, et pas des restes de table. Des quartiers. Du mouton débité proprement au joint, quinze à vingt livres pour cette seule tournée : le travail de quelqu'un qui sait où passe la lame, c'est-à-dire d'un garçon qui a regardé faire pendant les douze années de sa vie.\n\nIl les pose devant le creux de la haie, à un pas, dans un ordre. Puis il recule de six pas et il attend, accroupi, immobile. Il l'a fait des dizaines de fois." },
    "Elles viennent. Trois d'abord, puis onze, puis vous cessez de compter parce qu'à onze pas d'une chose pareille on ne compte plus.",
    { sobre:"Elles mangent à six pas de lui. Il ne bouge pas.",
      intense:"Elles mangent à six pas de lui, et il ne bouge pas, et elles ne le regardent pas. Ce n'est pas de l'apprivoisement. C'est pire : c'est un arrangement, et les deux parties le respectent depuis six semaines.",
      extreme:"Elles mangent à six pas de lui. Il ne bouge pas d'un pouce et elles ne lèvent pas la tête vers lui une seule fois.\n\nCe n'est pas de l'apprivoisement — on n'apprivoise pas trente bêtes, et il n'y a aucune affection là-dedans, dans aucun des deux sens. C'est un arrangement. Elles savent que la viande arrive là, il sait qu'elles ne toucheront pas ce qui est derrière lui, et les deux parties tiennent l'accord depuis six semaines avec une rigueur que trois provinces n'obtiennent d'aucun traité." },
    "§ Il les nourrit pour qu'elles laissent les quarante moutons de son grand-père. Ça marche parfaitement. Ça marche depuis six semaines.",
    "Et c'est pour ça que deux hommes sont morts à deux cents pas des maisons, en plein jour, sans que les bêtes aient eu peur une seconde.",
  ],
  effets:{ flags:['ch_colin'],
           marque:"Un garçon de douze ans nourrit la meute pour sauver les moutons de son grand-père.",
           court:"Colin" },
  choix:[
    { t:"Lui parler maintenant, dans la haie",
      detail:"Il a douze ans et trente bêtes à onze pas · il ne criera pas",
      risque:"calculé", va:'ch_colin_parler' },

    { t:"Attendre qu'il reparte, et ne rien dire à personne",
      detail:"Ce qu'il faut faire ne change pas · ce qu'on en dira, si",
      risque:"prudent", va:'ch_colin_taire',
      effets:{ flags:['ch_colin_couvert'] } },

    { t:"Le dire au hameau",
      detail:"Ils ont perdu deux hommes · ils ont le droit de savoir qui",
      risque:"définitif", definitif:true,
      ferme:"Ferme : la protection de l'enfant",
      va:'ch_colin_dire' },
  ],
},

ch_colin_parler:{
  qui:'colin',
  titre:"Six pas",
  texte:[
    "Vous sortez de la haie quand la dernière est partie. Il ne crie pas. Il ne court pas non plus, ce qui est plus rare.",
    "« Vous allez le dire. »",
    "@« Assieds-toi. »",
    "Il s'assied, sur ses talons, à trois pas, dans la position exacte où il attendait les bêtes. Ce garçon n'a pas peur au bon endroit, et c'est ça qui va le tuer un jour.",
    { sobre:"« Grand-père a quarante bêtes. C'est tout ce qu'on a. »",
      intense:"« Grand-père a quarante bêtes et il a soixante-huit ans. » Il dit ça très vite, comme une chose répétée. « S'il perd le troupeau il ne rachète pas. À soixante-huit ans on ne rachète pas. Alors j'ai porté de la viande. »",
      extreme:"« Grand-père a quarante bêtes et il a soixante-huit ans. » Il le dit très vite, du ton d'une chose qu'on s'est expliquée à soi-même trois cents fois dans le noir. « S'il perd le troupeau, il ne rachète pas. À soixante-huit ans, personne ne prête et personne ne rachète. On serait quatre à louer nos bras, et louer ses bras à Fontaine-Basse en fin d'hiver, ça veut dire partir.\n\nAlors j'ai commencé à porter de la viande. Une brebis vieille, la première fois. Puis deux. Puis j'ai pris chez les autres. »\n\nIl ne pleure pas. Il fait le compte." },
    "@« Et les deux hommes ? »",
    "Long silence. Il regarde le sac vide.",
    { sobre:"« Je n'ai pas pensé à ça. »",
      intense:"« Je n'ai pas pensé à ça. » Il le dit sans se défendre, sans chercher un mot qui arrange. « Je pensais aux moutons. Je ne pensais qu'aux moutons, tous les jours, pendant six semaines. »",
      extreme:"« Je n'ai pas pensé à ça. »\n\nIl le dit sans se défendre une seconde, sans chercher le mot qui arrange, sans même le ton qu'un enfant prend quand il sait qu'on va le punir.\n\n« Je pensais aux moutons. Je n'ai pensé qu'aux moutons, tous les jours, pendant six semaines. Le premier, quand on l'a retrouvé, j'ai pensé qu'il avait été bête de rentrer à la nuit. J'ai vraiment pensé ça. » Un temps. « C'est le lendemain que j'ai compris pourquoi elles n'avaient plus peur. »\n\nDouze ans. Il a fait tout seul, dans une grange, le raisonnement que trois provinces mettront un siècle à faire sur l'Onde." },
    "§ Il faudra tuer les bêtes de toute façon. Ce qu'on décide ici, c'est ce qu'on fait de lui.",
  ],
  effets:{ flags:['ch_colin_su'],
           faire:() => { if(!a('ch_colin_couvert')) ETAT.flags.add('ch_colin_arrangement'); },
           exploit:{ eclat:1, temoins:'aucun', quoi:"vous avez fait asseoir un garçon au lieu de le traîner" },
           marque:"« Je n'ai pas pensé à ça. Je pensais aux moutons. »", court:"Colin a parlé" },
  suite:'ch_placer', libelleSuite:"Reste à choisir où" },

ch_colin_taire:{
  titre:"La haie",
  texte:[
    "Vous le laissez repartir. Il ne saura jamais que vous étiez à quatre pas, et c'est probablement mieux pour tout le monde, y compris pour vous.",
    "§ Ce qu'il faut faire ne change pas d'un pouce. Trente bêtes qui n'ont plus peur de l'homme doivent mourir, qu'on sache pourquoi ou non.",
    "Ce qui change, c'est ce qu'on racontera à Fontaine-Basse en Floréal, et un garçon de douze ans a le droit de ne pas être cette histoire-là.",
  ],
  effets:{ flags:['ch_colin_couvert'],
           marque:"Vous n'avez rien dit. Le garçon ne saura jamais que vous saviez.",
           court:"La haie" },
  suite:'ch_placer', libelleSuite:"Reste à choisir où" },

ch_colin_dire:{
  titre:"Ce qu'on doit à quarante personnes",
  texte:[
    "Vous le dites au meunier, le matin, devant six autres. Vous le dites platement, sans arranger, parce qu'arranger serait pire.",
    { sobre:"Personne ne crie. C'est ce qui rend la chose difficile à regarder.",
      intense:"Personne ne crie et personne ne se jette sur personne. Le meunier regarde le grand-père, qui a soixante-huit ans et qui n'a rien su, et le grand-père regarde ses souliers. Le beau-frère du second mort sort de la pièce et ne revient pas.",
      extreme:"Personne ne crie. Personne ne se jette sur personne, personne ne dit une phrase qu'on répétera. C'est ça qui rend la chose insoutenable à regarder : quarante personnes en fin d'hiver n'ont pas l'énergie de la colère, elles ont juste l'arithmétique.\n\nLe meunier regarde le grand-père. Le grand-père, soixante-huit ans, qui n'a rien su, regarde ses souliers et ne les quitte plus. Le beau-frère du second mort sort de la pièce sans un mot et ne revient pas de la journée.\n\nEt personne ne regarde le garçon, ce qui est la seule chose que le garçon ne pourra pas supporter." },
    "§ Ils ont perdu deux hommes. Ils avaient le droit de savoir qui, et vous n'aviez pas le droit de le décider à leur place.",
    "Les deux phrases sont vraies. Elles ne se répondent pas.",
  ],
  effets:{ flags:['ch_colin_denonce'], cout:{ moral:6 },
           marque:"Vous avez dit au hameau qui nourrissait la meute. Il a douze ans.",
           court:"Vous l'avez dit" },
  plusTard:"Un garçon de douze ans dans un hameau de onze feux ne redevient jamais quelqu'un d'autre.",
  suite:'ch_placer', libelleSuite:"Reste à choisir où" },

/* ══ OÙ ════════════════════════════════════════════════════════════════════
 * Un homme seul contre trente ne choisit ni le moment ni le nombre. Il
 * choisit le terrain, et c'est tout ce qu'il choisit. */
ch_placer:{
  lieu:"Fontaine-Basse · le soir",
  titre:"Le seul choix qui existe",
  texte:[
    "Trente bêtes. Un homme, une épée bâtarde, deux coups de pistolet et de la fatigue.",
    { sobre:"On ne se bat pas contre trente. On les fait venir quelque part.",
      intense:"On ne se bat pas contre trente. Personne ne s'est jamais battu contre trente et n'en a parlé ensuite. On les fait venir à un endroit choisi, où trente ne valent plus trente, et c'est le seul art qu'il y a là-dedans.",
      extreme:"On ne se bat pas contre trente. Ça n'existe pas, personne ne l'a jamais fait, et ceux qui racontent l'avoir fait ont affronté six bêtes et un mauvais souvenir.\n\nCe qu'on fait, c'est qu'on les amène à un endroit où trente cessent de valoir trente. C'est toute la question, c'est le seul art qu'il y a dans ce métier, et un homme qui choisit mal son endroit meurt de la même façon qu'un homme qui n'a pas choisi du tout." },
    "Vous avez trois endroits et la nuit pour vous décider.",
  ],
  choix:[
    { t:"Le défilé de la fontaine",
      detail:"Onze pieds de large entre deux murs de pierre · elles passeront à trois de front, pas plus",
      risque:"calculé",
      va:'ch_c1_defile',
      effets:{ flags:['ch_defile'],
               melee:{ eux:30, position:"dos au mur, dans onze pieds", note:"Trois de front, jamais plus" } } },

    { t:"La grange du bas, et le feu",
      detail:"Les enfermer et brûler · c'est efficace, c'est laid, et la grange est à quelqu'un",
      risque:"favorable",
      va:'ch_c1_grange',
      effets:{ flags:['ch_grange'],
               melee:{ eux:30, position:"dehors, contre la porte", note:"Le feu travaille pour vous" } } },

    { t:"Le pré ouvert, de nuit, avec le troupeau en appât",
      detail:"Les prendre toutes d'un coup · quarante moutons pour ça · le vieux ne s'en relèvera pas",
      risque:"risqué",
      ferme:"Ferme : les quarante bêtes du grand-père, et donc le hameau tel qu'il est",
      va:'ch_c1_pre',
      effets:{ flags:['ch_pre'],
               melee:{ eux:30, position:"debout au milieu du pré", note:"Elles viennent toutes à la fois" } } },
  ],
},

/* ── Premier échange ────────────────────────────────────────────────────── */
ch_c1_defile:{
  melee:true,
  lieu:"Le défilé de la fontaine · deuxième heure",
  titre:"Onze pieds",
  texte:[
    "Onze pieds de large, quatre-vingts pas de long, deux murs de pierre sèche montés il y a trois cents ans par des gens qui voulaient exactement ce que vous voulez ce soir.",
    "Vous avez traîné un quartier de mouton sur toute la longueur et vous êtes au fond, dos à la roche, avec le dernier morceau à vos pieds.",
    { sobre:"Elles entrent à la file. Puis elles s'arrêtent.",
      intense:"Elles entrent à la file, sans bruit, et à quarante pas elles font une chose que vous n'aviez pas prévue : elles s'arrêtent toutes en même temps. Personne n'a donné de signal. Elles regardent.",
      extreme:"Elles entrent à la file dans le défilé, sans un bruit, et à quarante pas elles s'arrêtent toutes en même temps.\n\nPersonne n'a donné de signal — il n'y a pas eu un aboiement, pas un mouvement de tête, rien de ce qu'on raconte sur les meutes. Elles se sont arrêtées ensemble parce que trente bêtes qui vivent ensemble depuis six semaines n'ont plus besoin de se parler.\n\nElles regardent. Et ce qui vous glace, ce n'est pas le nombre : c'est qu'aucune ne regarde la viande." },
    "§ Elles ne sont pas venues manger. Elles sont venues voir ce qui a bougé la viande.",
    "La première charge à quarante pas. Onze pieds de large : elles passeront à trois de front et pas une de plus, et c'est tout ce que vous avez acheté avec votre journée.",
  ],
  choix:[
    { t:"Tenir la ligne. Trois à la fois, et recommencer",
      detail:"Force · épées — la seule chose qui marche, et elle coûte tout",
      risque:"calculé",
      test:{ carac:'force', comp:'epees', dc:11, adversaire:'meute', manoeuvre:'ligne',
             situation:() => a('ch_lu_bien') ? 2 : 0,
             cout:{ endurance:14 } },
      degres:{ dominante:'ch_c1_ligne_dom', nette:'ch_c1_ligne_ok', couteuse:'ch_c1_ligne_cout',
               echec:'ch_c1_ligne_ko', catastrophe:'ch_c1_ligne_ko' } },

    { t:"Les deux coups, sur les deux premières",
      detail:"Deux détonations dans onze pieds de pierre · ce n'est pas la balle qui compte",
      risque:"favorable",
      avant:() => { tirer(); tirer(); },
      si:() => charges() >= 2,
      va:'ch_c1_pistolets' },

    { t:"Ouvrir le drain sur celle de tête",
      detail:"Personne pour voir · et une meute comprend très vite ce qui tue sans toucher",
      risque:"calculé",
      si:() => ETAT.ressources.concentration >= 25,
      avant:() => drainer(28),
      va:'ch_c1_drain' },
  ],
},

ch_c1_ligne_dom:{
  melee:true,
  titre:"Trois",
  texte:[
    { sobre:"Trois à la fois. Vous en tuez deux au premier passage.",
      intense:"Trois à la fois, et le défilé fait le travail que vous lui avez demandé : elles ne peuvent pas vous déborder, elles ne peuvent pas vous prendre de flanc, elles ne peuvent que venir de face à trois, et de face à trois vous êtes le mieux payé de l'échange.",
      extreme:"Trois à la fois, et onze pieds de pierre sèche font exactement le travail pour lequel on les a montés il y a trois cents ans. Pas de débordement, pas de flanc, pas de derrière. Trois de face, encore trois, encore trois.\n\nDe face à trois, vous êtes de très loin le mieux armé de l'échange, et pour la première fois de la soirée vous n'avez pas peur : vous avez du travail. La différence entre les deux est la seule chose que ce métier vous ait vraiment donnée." },
    "La première prend la pointe sous la mâchoire et tombe dans les jambes de la deuxième, ce qui vaut mieux que n'importe quelle parade.",
    { sobre:"Onze en dix minutes. Elles reculent.",
      intense:"Onze en un peu plus de dix minutes. Puis elles reculent — pas de panique, pas de fuite : un recul, ensemble, de vingt pas, et elles se remettent à regarder.",
      extreme:"Onze en un peu plus de dix minutes, et le sol de pierre devient impraticable, ce qui joue pour vous et contre elles.\n\nPuis elles reculent. Pas de débandade, aucune panique, rien de ce qu'on espère : un recul groupé de vingt pas, sans un bruit, et elles se remettent à regarder. Elles viennent de perdre onze des leurs en dix minutes et elles n'ont pas rompu.\n\nElles comptent, elles aussi." },
    "§ Dix-neuf debout. Vous, un bras qui pisse et une épée qui pèse le double de ce qu'elle pesait.",
  ],
  effets:{ flags:['ch_ligne_tenue'], cout:{ endurance:22, vitalite:8 },
           meleeMaj:{ eux:19, position:"dos à la roche, tenant", note:"Elles ont reculé et elles comptent" },
           faire:() => blesser({ id:'ch_avantbras', zone:"avant-bras gauche", type:"morsure profonde",
                                 gravite:2, douleur:2, saignement:2, fonction:['force'],
                                 cicatrice:"quatre trous en arc sur l'avant-bras gauche" }),
           exploit:{ eclat:5, temoins:'aucun', quoi:"onze bêtes dans onze pieds, et la ligne a tenu" },
           marque:"Onze tuées dans le défilé. Les dix-neuf autres ont reculé sans rompre.",
           court:"Onze" },
  suite:'ch_c2', libelleSuite:"Elles reviennent" },

ch_c1_ligne_ok:{
  melee:true,
  titre:"La ligne",
  texte:[
    "Trois à la fois. Le défilé tient sa promesse et vous tenez la vôtre, ce qui, dans un combat, veut dire que personne ne gagne encore.",
    { sobre:"Sept en un quart d'heure. C'est long, un quart d'heure.",
      intense:"Sept en un quart d'heure. Un quart d'heure est une durée qui ne veut rien dire jusqu'au jour où on la passe l'épée à la main : au bout de six minutes le bras ne remonte plus tout seul, au bout de dix on frappe avec le dos et pas avec le tranchant, et à quinze on est un homme qui agite du fer.",
      extreme:"Sept en un quart d'heure, et le quart d'heure est la vraie information de cette phrase.\n\nUn quart d'heure ne veut rien dire jusqu'au jour où on le passe l'épée à la main. À six minutes le bras ne remonte plus tout seul et il faut le décider. À dix on frappe avec le plat sans s'en apercevoir. À quinze on est un homme qui agite du fer devant lui en respirant par la bouche, et la seule chose qui vous garde en vie est un mur de pierre sèche monté par des gens morts depuis trois siècles." },
    "Elles reculent quand même. Sept sur trente, c'est peu, et elles reculent quand même — parce qu'aucune bête ne comprend pourquoi la chose au fond du couloir ne tombe pas.",
  ],
  effets:{ cout:{ endurance:30, vitalite:12 },
           meleeMaj:{ eux:23, position:"dos à la roche, le bras lourd", note:"Sept en bas · vingt-trois debout" },
           faire:() => blesser({ id:'ch_avantbras', zone:"avant-bras gauche", type:"morsure profonde",
                                 gravite:2, douleur:2, saignement:2, fonction:['force'],
                                 cicatrice:"quatre trous en arc sur l'avant-bras gauche" }),
           exploit:{ eclat:3, temoins:'aucun', quoi:"vous avez tenu onze pieds pendant un quart d'heure" },
           marque:"Sept tuées dans le défilé, en un quart d'heure.", court:"Sept" },
  suite:'ch_c2', libelleSuite:"Elles reviennent" },

ch_c1_ligne_cout:{
  melee:true,
  titre:"La quatrième",
  texte:[
    "Trois de front, c'est ce que le défilé promet. Le défilé ne promet rien sur ce qui grimpe.",
    { sobre:"La quatrième passe par le mur.",
      intense:"La quatrième ne vient pas par le couloir : elle monte sur le mur de pierre sèche, qui fait cinq pieds et qui n'a jamais été fait pour empêcher un animal de grimper, et elle vous tombe dessus par la gauche pendant que les trois autres vous tiennent de face.",
      extreme:"La quatrième ne vient pas par le couloir.\n\nElle monte sur le mur — cinq pieds de pierre sèche, montée à joints vifs, que personne n'a jamais conçue pour empêcher quoi que ce soit de grimper — et elle passe par-dessus pendant que les trois autres vous tiennent de face. Vous la voyez à la dernière demi-seconde, du coin de l'œil, en hauteur, ce qui est le pire endroit où voir quelque chose.\n\nVous rentrez le menton et vous lui donnez l'épaule, parce qu'il n'y a rien d'autre à donner en une demi-seconde." },
    "Vous la tuez au sol, contre vous, à la dague, ce qui prend onze secondes pendant lesquelles les trois autres ne vous ont pas attendu.",
    { sobre:"Cinq en bas. Et l'épaule.",
      intense:"Cinq en bas au total. Et une épaule ouverte de la clavicule au deltoïde, sur laquelle vous n'allez pas pouvoir compter pour le reste de la nuit.",
      extreme:"Cinq en bas au total, ce qui n'est pas rien. Et une épaule gauche ouverte de la clavicule au deltoïde, en trois lignes parallèles, dont l'une va jusqu'à ce qui n'est plus du muscle.\n\nÇa ne saigne pas beaucoup, ce qui est mauvais signe et non pas bon. Et le bras répond avec un retard d'une demi-seconde, ce qui, dans un défilé de onze pieds, est très exactement la durée d'une vie." },
    "§ On choisit son terrain. Le terrain ne s'engage à rien.",
  ],
  effets:{ cout:{ endurance:26, vitalite:20, sang:10 },
           meleeMaj:{ eux:25, position:"dos à la roche, épaule ouverte", note:"Elles passent par le mur" },
           faire:() => blesser({ id:'ch_epaule', zone:"épaule gauche", type:"trois lignes jusqu'au muscle",
                                 gravite:3, douleur:3, saignement:3, fonction:['force','epees'],
                                 cicatrice:"trois lignes parallèles sur l'épaule gauche" }),
           marque:"Elles sont passées par-dessus le mur. Cinq en bas, l'épaule ouverte.",
           court:"Par le mur" },
  suite:'ch_c2', libelleSuite:"Elles reviennent" },

ch_c1_ligne_ko:{
  melee:true,
  titre:"Ce que trente veut dire",
  texte:[
    "Vous tenez quatre minutes et vous comprenez, pendant la cinquième, une chose qu'aucun récit ne dit correctement.",
    { sobre:"Elles ne cherchent pas à vous tuer. Elles cherchent à vous faire tomber.",
      intense:"Elles ne cherchent pas à vous tuer. Aucune ne va à la gorge, aucune ne vise le ventre. Elles prennent le mollet, le poignet, le bas du manteau, elles tirent, et elles lâchent. Elles cherchent à vous mettre par terre, parce qu'un homme par terre n'est plus un problème mais un repas.",
      extreme:"Elles ne cherchent pas du tout à vous tuer, et c'est ça qu'on ne dit jamais correctement.\n\nAucune ne va à la gorge. Aucune ne vise le ventre. Elles prennent le mollet, le poignet, l'ourlet du manteau, un pan de cuir — elles saisissent, elles tirent en arrière de tout leur poids, elles lâchent avant que vous ayez fini votre coup, et la suivante prend de l'autre côté.\n\nElles vous démontent. C'est de l'ouvrage, c'est méthodique, et ça marche : à la cinquième minute vous êtes à genoux au fond d'un couloir de onze pieds avec quatre bêtes accrochées à ce que vous portez." },
    "Ce qui vous sauve n'est pas votre épée. C'est le mur dans votre dos, et une chose sous les côtes qui décide toute seule.",
    { sobre:"Il y a un cri, très court, et trois bêtes tombent sans qu'on les touche.",
      intense:"Il y a un bruit très court, qui n'est ni un cri ni une détonation, et trois bêtes s'affaissent en même temps à deux pas de vous sans que rien ne les ait touchées. L'air prend un goût de cuivre. Les vingt-sept autres reculent d'un seul mouvement.",
      extreme:"Il y a un bruit très court — pas un cri, pas une détonation, quelque chose de plus bas et de plus proche, comme si l'air se refermait sur lui-même à un endroit précis.\n\nTrois bêtes s'affaissent en même temps à deux pas de vous, sans que rien les ait touchées, avec la mollesse d'une chose à qui l'on vient de retirer l'idée d'être vivante. L'air prend un goût de pièce de cuivre gardée trop longtemps sous la langue.\n\nLes vingt-sept autres reculent d'un seul mouvement, en silence, de trente pas, et vous restez seul au fond du couloir à quatre pattes en essayant de vous rappeler si vous avez décidé quoi que ce soit." },
    "§ Vous ne l'avez pas décidé. C'est la troisième fois de votre vie.",
  ],
  effets:{ flags:['ch_onde_sortie'], cout:{ endurance:34, vitalite:26, sang:16, concentration:20 },
           meleeMaj:{ eux:27, position:"à genoux, contre la roche", note:"Elles ont reculé de trente pas" },
           faire:() => { blesser({ id:'ch_mollet', zone:"mollet droit", type:"arraché sur trois doigts",
                                   gravite:3, douleur:3, saignement:3, fonction:['agilite'],
                                   cicatrice:"un creux de trois doigts dans le mollet droit" });
                         blesser({ id:'ch_poignet', zone:"poignet gauche", type:"tendons entamés",
                                   gravite:2, douleur:2, saignement:1, fonction:['force'],
                                   cicatrice:"un anneau blanc autour du poignet gauche" }); },
           marque:"Elles vous ont mis à genoux. Ce qui a tué les trois dernières n'était pas votre épée.",
           court:"À genoux" },
  suite:'ch_c2', libelleSuite:"Elles reviennent" },

ch_c1_pistolets:{
  melee:true,
  titre:"Deux fois, dans onze pieds de pierre",
  texte:[
    "Vous laissez la première arriver à sept pas. On ne tire pas plus loin avec un silex : au-delà de sept pas, un pistolet à silex est une menace, pas une arme.",
    { sobre:"Deux coups. Le bruit fait plus que les balles.",
      intense:"Le premier coup entre par le poitrail et la couche net. Le second manque et va faire éclater un morceau de mur de pierre sèche. Aucun des deux ne compte : ce qui compte, c'est ce que deux détonations font dans un couloir de onze pieds entre deux murs de pierre.",
      extreme:"Le premier coup entre par le poitrail à cinq pas et la couche net, pattes repliées, comme si on avait retiré le sol.\n\nLe second manque — vous tirez trop vite, la deuxième s'est décalée, et la balle arrache un éclat de pierre sèche au mur de droite. Aucun des deux tirs ne compte, et vous le saviez avant de les faire.\n\nCe qui compte, c'est ce que deux détonations font dans onze pieds de couloir entre deux murs de pierre. Le bruit n'a nulle part où aller. Il monte, il revient, il vous frappe vous aussi, et vous n'entendez plus rien du tout pendant six secondes." },
    { sobre:"Elles rompent. Toutes. D'un seul coup.",
      intense:"Elles rompent. Toutes, en même temps, sans un seul regard en arrière — trente bêtes qui n'avaient plus peur d'un homme viennent de rencontrer une chose qui n'est pas un homme et qui fait un bruit qu'aucune n'a jamais entendu.",
      extreme:"Elles rompent. Toutes, en même temps, sans un regard en arrière, et le couloir se vide en quatre secondes.\n\nTrente bêtes qui avaient méthodiquement désappris la peur de l'homme en six semaines viennent de rencontrer quelque chose qui n'entre dans aucune de leurs catégories. Ce n'était pas un homme. Ça a fait deux fois un bruit que rien dans la nature ne fait, et l'écho l'a répété quatre fois entre les deux murs.\n\nCe n'est pas une victoire. C'est un ajournement, et vous avez maintenant deux masses de fer inutiles à la ceinture pour le reste de la nuit." },
    "§ Deux coups. Dans une vie entière, on n'en a jamais que deux d'affilée.",
  ],
  effets:{ flags:['ch_pistolets_tires'], cout:{ endurance:8 },
           meleeMaj:{ eux:29, position:"debout, deux masses de fer à la ceinture", note:"Elles ont rompu · elles reviendront" },
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous avez fait rompre trente bêtes avec deux coups" },
           marque:"Deux détonations dans onze pieds de pierre. Elles ont rompu.", court:"Deux coups" },
  suite:'ch_c2', libelleSuite:"Elles reviennent" },

ch_c1_drain:{
  melee:true,
  titre:"Ce qui tue sans toucher",
  texte:[
    "Vous laissez venir celle de tête et vous ouvrez.",
    { sobre:"Elle tombe à quatre pas de vous, sans qu'on l'ait touchée.",
      intense:"Elle tombe à quatre pas, en pleine course, comme un cheval qui prend une haie qu'il n'a pas vue. Rien ne l'a touchée. L'air, entre elle et vous, prend un goût de cuivre.",
      extreme:"Elle tombe à quatre pas, en pleine foulée, avec cette mollesse particulière d'une chose à qui l'on vient de retirer l'idée d'être vivante. Rien ne l'a touchée, rien ne l'a frôlée, il n'y a pas une goutte de sang.\n\nL'air entre elle et vous prend un goût de pièce de cuivre gardée trop longtemps sous la langue. Vous le sentez sur la langue et au fond du nez, et il vous reste quelque chose de chaud dans la poitrine — pas assez. Ça ne l'est jamais." },
    { sobre:"Et les vingt-neuf autres s'arrêtent net.",
      intense:"Et les vingt-neuf autres s'arrêtent net, toutes ensemble, à mi-course. Elles ne reculent pas. Elles ne fuient pas. Elles regardent la chose au fond du couloir en cherchant à quelle catégorie elle appartient, et elles ne trouvent pas.",
      extreme:"Et les vingt-neuf autres s'arrêtent net, toutes ensemble, à mi-course, comme si un seul animal avait décidé pour trente.\n\nElles ne reculent pas. Elles ne fuient pas. Elles restent là, à trente pas, et elles regardent — et ce qui vous glace n'est pas la menace, c'est le **travail** qu'elles sont visiblement en train de faire. Elles rangent. Elles ont une place pour l'homme, une place pour le feu, une place pour la fourche, et elles viennent de rencontrer quelque chose qui n'entre dans aucune et qui a couché une des leurs sans la toucher.\n\nElles finiront par lui trouver une place. C'est ce qui rend une meute qui a appris plus dangereuse qu'une meute qui a faim." },
    "§ Il n'y a personne dans ce défilé. Personne pour voir, personne pour raconter, personne pour aller le dire à un clerc de Chastel.",
    "C'est la seule raison pour laquelle vous l'avez fait, et vous le savez.",
  ],
  effets:{ flags:['ch_drain_meute'], cout:{ endurance:10 },
           meleeMaj:{ eux:29, position:"debout, l'air au goût de cuivre", note:"Elles cherchent une place pour vous" },
           marque:"Vous avez ouvert le drain sur celle de tête. Vingt-neuf ont regardé.",
           court:"Sans la toucher" },
  suite:'ch_c2', libelleSuite:"Elles reviennent" },

/* ── La grange ──────────────────────────────────────────────────────────── */
ch_c1_grange:{
  melee:true,
  lieu:"Fontaine-Basse · la grange du bas · deuxième heure",
  titre:"Ce que ça coûte au meunier",
  texte:[
    "La grange du bas est au meunier. Elle fait quarante pieds sur vingt, elle a une porte à deux battants et une seule autre ouverture, et elle contient tout ce qu'un hameau garde pour tenir jusqu'à Floréal.",
    "Vous lui demandez. Il met quatre secondes à répondre, ce qui, pour un homme à qui on demande de brûler son grain en fin d'hiver, est un temps de réponse remarquable.",
    "« Combien elles en tueront encore, sinon ? »",
    "@« Je ne sais pas. »",
    "« Alors prenez la grange. »",
    { sobre:"Vous traînez trois moutons dedans et vous laissez la porte ouverte.",
      intense:"Vous traînez trois moutons à l'intérieur, vous les saignez à moitié pour que ça sente, vous laissez les deux battants grands ouverts, et vous montez dans le fenil avec deux torches et de la poix.",
      extreme:"Vous traînez trois moutons à l'intérieur et vous les saignez à moitié — pas assez pour qu'ils meurent, assez pour que ça porte à quatre cents pas sous la pluie. C'est un travail désagréable qui prend une demi-heure et pendant lequel personne ne vous aide.\n\nVous laissez les deux battants grands ouverts. Vous montez dans le fenil par l'échelle extérieure, vous retirez l'échelle, et vous vous asseyez dans le foin avec deux torches éteintes, un pot de poix et quarante pieds de vue sur la porte." },
    "Elles entrent à la troisième heure. Pas trois, pas onze : **toutes**.",
    { sobre:"Vous laissez tomber les torches et vous refermez du haut.",
      intense:"Vous attendez que la dernière ait passé la porte. Puis vous laissez tomber les deux torches dans la poix qu'on a versée le long des deux battants, et vous tirez la barre du haut avec une corde préparée dans l'après-midi.",
      extreme:"Vous attendez que la dernière ait franchi la porte, ce qui demande de ne pas bouger pendant quatre minutes avec trente bêtes à quinze pieds sous vous.\n\nPuis vous lâchez les deux torches dans la poix versée le long des battants pendant l'après-midi, et vous tirez d'un coup sec la corde qui fait tomber la barre extérieure.\n\nLe feu prend en onze secondes. Une grange pleine de foin sec en fin d'hiver ne brûle pas : elle explose lentement." },
    "§ Ce qui suit dure vingt minutes et s'entend depuis les onze feux du hameau.",
    { sobre:"Personne à Fontaine-Basse ne dort cette nuit-là.",
      intense:"Personne à Fontaine-Basse ne dort cette nuit-là, et personne n'en reparlera jamais volontairement. Une grange fermée qui brûle avec trente animaux dedans ne fait pas un bruit qu'on décrit à quelqu'un qui n'était pas là.",
      extreme:"Personne à Fontaine-Basse ne dort cette nuit-là. Personne n'en reparlera jamais volontairement, ni ce printemps-là, ni les suivants, et c'est une chose qu'on comprend en les regardant le lendemain matin.\n\nUne grange fermée qui brûle avec trente animaux vivants dedans ne fait pas un bruit qu'on rapporte à quelqu'un qui n'était pas là. Ça dure vingt minutes. Vers la douzième, quelque chose enfonce un des battants de l'intérieur sur toute sa hauteur et n'arrive pas à sortir." },
  ],
  effets:{ flags:['ch_grange_brulee','ch_meute_finie'], cout:{ endurance:14, moral:12 },
           meleeMaj:{ eux:0, position:"dans le fenil, la corde à la main", note:"Vingt minutes" },
           exploit:{ eclat:6, temoins:'quelques',
                     quoi:"vous avez enfermé trente bêtes dans une grange et vous y avez mis le feu" },
           marque:"Vous avez brûlé la grange du meunier avec la meute dedans.", court:"La grange" },
  plusTard:"Le grain du bas de Fontaine-Basse a brûlé avec. Il restait six semaines avant Floréal.",
  suite:'ch_fin', libelleSuite:"Le matin" },

/* ── Le pré ─────────────────────────────────────────────────────────────── */
ch_c1_pre:{
  melee:true,
  lieu:"Fontaine-Basse · le pré du haut · deuxième heure",
  titre:"Quarante moutons",
  texte:[
    "Le grand-père a soixante-huit ans et quarante bêtes. Vous lui demandez les quarante.",
    { sobre:"Il dit oui. Il met longtemps, et il dit oui.",
      intense:"Il met un temps très long. Puis il dit oui, et il va lui-même ouvrir le parc, et il ne regarde pas ce qu'il fait pendant qu'il le fait.",
      extreme:"Il met un temps très long — assez long pour que vous envisagiez de retirer la demande, ce que vous ne faites pas.\n\nPuis il dit oui. Il va lui-même ouvrir le parc, à soixante-huit ans, sous la pluie, et pendant qu'il défait le lien il ne regarde pas ses mains. Il regarde la crête, au nord, à l'endroit d'où elles descendent.\n\nIl a compris avant vous ce que ça veut dire. Il n'a pas demandé ce qu'on lui rendrait." },
    "Vous êtes debout au milieu de quarante moutons affolés, dans un pré ouvert, la nuit, sans un mur nulle part. C'est exactement ce qu'il ne faut jamais faire.",
    "C'est aussi la seule façon de les avoir toutes le même soir.",
    { sobre:"Elles arrivent toutes ensemble. Le pré devient illisible.",
      intense:"Elles arrivent toutes ensemble et le pré cesse d'être un endroit qu'on peut lire. Quarante moutons qui courent, trente bêtes qui coupent, de la pluie, pas de lune. Vous ne voyez rien à plus de quatre pas et rien de ce que vous voyez ne reste où il était.",
      extreme:"Elles arrivent toutes ensemble et le pré cesse instantanément d'être un endroit qu'on peut lire.\n\nQuarante moutons qui courent en tas serré et changent de direction toutes les six secondes. Trente bêtes qui coupent dedans, qui traversent, qui ressortent. De la pluie. Pas de lune. Vous ne voyez rien au-delà de quatre pas, et rien de ce que vous voyez à quatre pas n'est encore là une seconde plus tard.\n\nLa seule chose dont vous êtes certain, c'est que tout ce qui vous touche par-derrière veut vous mettre à terre." },
  ],
  choix:[
    { t:"Rester dans le troupeau et frapper ce qui entre",
      detail:"Agilité · épées — la laine vous cache autant qu'elle vous aveugle",
      risque:"risqué",
      test:{ carac:'agilite', comp:'epees', dc:12, adversaire:'meute', manoeuvre:'troupeau',
             situation:() => a('ch_lu_bien') ? 2 : 0, cout:{ endurance:16 } },
      degres:{ dominante:'ch_c1_pre_dom', nette:'ch_c1_pre_ok', couteuse:'ch_c1_pre_cout',
               echec:'ch_c1_pre_ko', catastrophe:'ch_c1_pre_ko' } },

    { t:"Sortir du troupeau et prendre la barrière dans le dos",
      detail:"Renoncer à en tuer beaucoup pour n'en avoir aucune derrière",
      risque:"calculé", va:'ch_c1_pre_barriere' },
  ],
},

ch_c1_pre_dom:{
  melee:true,
  titre:"Dans la laine",
  texte:[
    { sobre:"Vous restez dedans. C'est contre-intuitif et c'est juste.",
      intense:"Vous restez dans le troupeau, et c'est exactement le contraire de ce que le corps réclame. La laine vous cache : elles ne peuvent pas vous voir venir, elles vous sentent, elles arrivent au jugé — et un animal qui arrive au jugé arrive de face.",
      extreme:"Vous restez dans le troupeau, ce qui est très exactement le contraire de ce que le corps réclame à chaque seconde.\n\nMais la laine travaille pour vous. Elles ne vous voient pas venir, elles ne peuvent pas vous choisir dans la masse, elles arrivent au nez et au bruit — et un animal qui arrive au jugé arrive de face, tête haute, sans esquive préparée.\n\nDe face, tête haute, à deux pas, vous êtes payé chaque fois." },
    "Quatorze en un peu moins de vingt minutes. Vous perdez le compte à onze et vous le reprenez au matin, sur les corps.",
    { sobre:"Le reste part avant l'aube. Il reste dix-neuf moutons.",
      intense:"Ce qui reste rompt avant l'aube — pas en bloc, par petits paquets, ce qui veut dire que la chose qui les tenait ensemble depuis six semaines vient de se défaire.\n\nSur les quarante moutons, il en reste dix-neuf.",
      extreme:"Ce qui reste rompt avant l'aube, et pas en bloc : par paquets de trois ou quatre, dans des directions différentes, ce qui est la vraie nouvelle de la nuit. La chose qui tenait trois lignées ensemble depuis six semaines vient de se défaire, et elle ne se refera pas cette année.\n\nSur les quarante moutons du grand-père, il en reste dix-neuf. Onze ont été tuées, dix se sont perdues dans le noir et on en retrouvera cinq.\n\nIl compte lui-même, au matin, à voix haute, sans rien dire ensuite." },
  ],
  effets:{ flags:['ch_meute_finie','ch_troupeau_perdu'], cout:{ endurance:34, vitalite:16, sang:8 },
           meleeMaj:{ eux:16, position:"debout dans la laine", note:"Quatorze en bas · le reste a rompu" },
           faire:() => blesser({ id:'ch_cuisse', zone:"cuisse gauche", type:"morsure large",
                                 gravite:2, douleur:2, saignement:2, fonction:['agilite'],
                                 cicatrice:"une morsure large sur la cuisse gauche" }),
           exploit:{ eclat:8, temoins:'quelques',
                     quoi:"quatorze bêtes en une nuit, seul, dans un pré ouvert" },
           marque:"Quatorze tuées dans le troupeau. La meute s'est défaite. Dix-neuf moutons sur quarante.",
           court:"Quatorze" },
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c1_pre_ok:{
  melee:true,
  titre:"Neuf",
  texte:[
    "Vous restez dedans, vous frappez ce qui entre, et vous tenez.",
    { sobre:"Neuf. Et le troupeau se disloque au bout de dix minutes.",
      intense:"Neuf en un peu moins d'un quart d'heure. Puis le troupeau se disloque — quarante moutons ne restent pas groupés indéfiniment — et à partir de là vous êtes un homme seul debout dans un pré ouvert, la nuit, avec vingt et une bêtes autour.",
      extreme:"Neuf en un peu moins d'un quart d'heure, ce qui est un très bon compte et qui ne suffira pas.\n\nPuis le troupeau se disloque. Quarante moutons ne restent pas groupés indéfiniment sous la pression : au bout de dix minutes ils partent en trois paquets vers trois coins du pré, et le couvert que vous aviez s'en va avec eux.\n\nÀ partir de là vous êtes un homme seul, debout, dans un pré ouvert, la nuit, sous la pluie, avec vingt et une bêtes qui viennent de retrouver l'usage de leurs yeux." },
    "Vous reculez vers la barrière du haut en tuant deux de plus, et vous y arrivez, ce qui n'était pas acquis.",
  ],
  effets:{ cout:{ endurance:38, vitalite:22, sang:12 },
           meleeMaj:{ eux:19, position:"dos à la barrière du haut", note:"Onze en bas · le troupeau est parti" },
           faire:() => { blesser({ id:'ch_cuisse', zone:"cuisse gauche", type:"morsure large",
                                   gravite:2, douleur:2, saignement:2, fonction:['agilite'],
                                   cicatrice:"une morsure large sur la cuisse gauche" });
                         blesser({ id:'ch_main', zone:"main gauche", type:"deux doigts ouverts",
                                   gravite:2, douleur:2, saignement:1, fonction:['epees'],
                                   cicatrice:"deux doigts qui ne se referment plus tout à fait" }); },
           exploit:{ eclat:5, temoins:'quelques', quoi:"onze bêtes dans un pré ouvert, seul, la nuit" },
           marque:"Onze tuées dans le pré. Le troupeau s'est disloqué avant vous.", court:"Onze au pré" },
  suite:'ch_c2', libelleSuite:"Ce qui reste" },

ch_c1_pre_cout:{
  melee:true,
  titre:"Ce qu'un mouton fait quand il a peur",
  texte:[
    "Vous aviez tout prévu sauf une chose, et cette chose pèse quatre-vingts livres et court sans regarder.",
    { sobre:"C'est un mouton qui vous met à terre.",
      intense:"Ce n'est pas une bête de la meute qui vous met à terre : c'est un mouton. Quatre-vingts livres qui vous prennent le genou de côté à pleine course, sans intention, sans rien voir, parce qu'un mouton qui a peur ne regarde pas où il va et que c'est très exactement ce qui le garde en vie d'ordinaire.",
      extreme:"Ce n'est pas une bête de la meute qui vous met à terre. C'est un mouton.\n\nQuatre-vingts livres de laine mouillée qui vous prennent le genou gauche de côté, à pleine course, sans intention et sans vous avoir vu — parce qu'un mouton affolé ne regarde jamais où il va, et que c'est très exactement ce qui le garde en vie les autres soirs.\n\nLe genou part vers l'intérieur avec un bruit que vous sentez plus que vous ne l'entendez. Vous êtes à terre dans quarante pieds de boue, la nuit, au milieu de trente animaux qui n'attendaient que ça." },
    "Ce qui suit tient en une phrase : vous vous relevez.",
    { sobre:"Vous vous relevez et vous en tuez six.",
      intense:"Vous vous relevez sur une jambe et demie et vous en tuez six, en reculant, en boitant, en frappant de haut parce que c'est tout ce qui reste quand le bas ne répond plus. Puis vous atteignez la barrière.",
      extreme:"Vous vous relevez sur une jambe et demie — ce qui prend quatre secondes pendant lesquelles trois choses vous mordent — et vous en tuez six en reculant vers le haut du pré.\n\nEn boitant. En frappant de haut, parce que frapper de haut est tout ce qui reste à un homme dont le bas ne répond plus. Ce n'est pas de l'escrime et personne ne l'écrira dans un manuel : c'est un homme qui abat du fer sur ce qui arrive, encore et encore, jusqu'à la barrière.\n\nVous y arrivez. Le genou, lui, n'y arrivera jamais complètement." },
  ],
  effets:{ cout:{ endurance:40, vitalite:26, sang:14 },
           meleeMaj:{ eux:24, position:"contre la barrière, sur une jambe", note:"Le genou est parti" },
           faire:() => blesser({ id:'ch_genou', zone:"genou gauche", type:"ligament rompu",
                                 gravite:3, douleur:3, saignement:0, fonction:['agilite','esquive'],
                                 cicatrice:"un genou gauche qui prévient du temps qu'il fera" }),
           marque:"Un mouton affolé vous a rompu le genou. Vous en avez tué six en reculant.",
           court:"Le genou" },
  plusTard:"Un genou qui a lâché une fois lâche toujours au moment où l'on ne peut pas se le permettre.",
  suite:'ch_c2', libelleSuite:"Ce qui reste" },

ch_c1_pre_ko:{
  melee:true,
  titre:"Un pré ouvert",
  texte:[
    "Un pré ouvert, la nuit, sans lune, contre trente. Il n'y a pas de version de ça qui se passe bien et vous le saviez en entrant.",
    { sobre:"Elles vous prennent de trois côtés en même temps.",
      intense:"Elles vous prennent de trois côtés en même temps, ce qu'aucun homme au monde ne pare. Vous en tuez deux, vous en blessez autant, et à la quatrième minute vous êtes à terre dans la boue avec quelque chose sur le dos.",
      extreme:"Elles vous prennent de trois côtés en même temps, ce qu'aucun homme au monde ne pare, ce qu'aucun maître d'armes n'a jamais prétendu enseigner.\n\nVous en tuez deux. Vous en blessez deux autres. À la quatrième minute vous êtes à plat ventre dans quarante pieds de boue avec quatre-vingts livres sur les omoplates et une gueule qui cherche la nuque à travers le col de mailles.\n\nLe col tient. C'est la seule raison pour laquelle il y a une suite à cette phrase." },
    { sobre:"Ce qui les fait partir n'est pas vous.",
      intense:"Ce qui les fait partir n'est pas vous. C'est le hameau : onze feux qui arrivent en même temps, avec des torches, des fourches et deux vieux tromblons, parce que quarante personnes ont entendu ce qui se passait dans le pré du haut et que quarante personnes ont décidé toutes seules.",
      extreme:"Ce qui les fait partir n'est pas vous, et il faudra vivre avec.\n\nC'est le hameau. Onze feux qui montent le pré en même temps, avec des torches, des fourches, deux vieux tromblons dont un seul part, et le meunier devant. Quarante personnes ont entendu ce qui se passait dans le pré du haut, et quarante personnes qui n'avaient plus quitté leur maison après la troisième heure depuis six semaines ont décidé, toutes seules, en même temps, de sortir.\n\nElles rompent devant les torches. Elles rompent devant quarante personnes, pas devant un homme.\n\nOn vous relève. On ne vous fait aucune remarque, et c'est très exactement la pire chose qui pouvait arriver à votre soirée." },
  ],
  effets:{ flags:['ch_hameau_sorti'], cout:{ endurance:46, vitalite:34, sang:24, moral:10 },
           meleeMaj:{ eux:26, position:"à terre, relevé par des paysans", note:"Ce sont eux qui les ont fait partir" },
           faire:() => { blesser({ id:'ch_dos', zone:"dos et nuque", type:"lacérations profondes",
                                   gravite:3, douleur:3, saignement:3, fonction:['force','endurance'],
                                   cicatrice:"un damier de lignes blanches entre les omoplates" });
                         blesser({ id:'ch_mollet', zone:"mollet droit", type:"arraché sur trois doigts",
                                   gravite:3, douleur:3, saignement:3, fonction:['agilite'],
                                   cicatrice:"un creux de trois doigts dans le mollet droit" }); },
           marque:"Vous étiez à terre. C'est le hameau qui les a fait partir, pas vous.",
           court:"Onze feux" },
  suite:'ch_c2', libelleSuite:"Ce qui reste" },

ch_c1_pre_barriere:{
  melee:true,
  titre:"La barrière",
  texte:[
    "Vous sortez du troupeau et vous prenez la barrière du haut dans le dos. Cinq pieds de châtaignier, montée l'an dernier, et rien derrière.",
    "Vous renoncez par là même à en tuer beaucoup. Vous renoncez aussi à en avoir une seule derrière vous, et à quatre heures du matin c'est un échange qu'aucun homme raisonnable ne refuse.",
    { sobre:"Sept, contre la barrière, en une heure et demie.",
      intense:"Sept, contre la barrière, en une heure et demie de travail sans un instant de répit. Ce n'est pas glorieux et ça ne se raconte pas : c'est un homme adossé à du bois qui frappe ce qui vient, sept fois, sur quatre-vingt-dix minutes.",
      extreme:"Sept, contre la barrière, sur une heure et demie de travail sans un seul instant de répit.\n\nCe n'est pas glorieux, ça ne se raconte pas, et aucun récit ne s'y attardera : un homme adossé à cinq pieds de châtaignier qui frappe ce qui arrive, sept fois en quatre-vingt-dix minutes, en respirant par la bouche, avec les bras qui deviennent progressivement quelque chose qu'on traîne.\n\nVoilà ce qu'est réellement se battre contre trente. Le reste est de la chanson." },
    "Elles se lassent avant vous, ce qui est la seule victoire disponible ce soir. Les moutons, eux, ont payé.",
  ],
  effets:{ cout:{ endurance:40, vitalite:14, sang:8 },
           meleeMaj:{ eux:23, position:"dos à la barrière", note:"Sept en bas · elles se sont lassées" },
           faire:() => blesser({ id:'ch_avantbras', zone:"avant-bras gauche", type:"morsure profonde",
                                 gravite:2, douleur:2, saignement:2, fonction:['force'],
                                 cicatrice:"quatre trous en arc sur l'avant-bras gauche" }),
           exploit:{ eclat:4, temoins:'quelques', quoi:"une heure et demie contre une barrière, sans reculer" },
           marque:"Une heure et demie contre cinq pieds de châtaignier. Sept en bas.", court:"La barrière" },
  suite:'ch_c2', libelleSuite:"Ce qui reste" },

/* ══ SECOND ÉCHANGE ════════════════════════════════════════════════════════
 * Ce qui reste debout après le premier passage revient une fois, et une
 * seule. Ce qu'on en fait dépend de ce qu'on a compris. */
ch_c2:{
  melee:true,
  lieu:"Fontaine-Basse · avant l'aube",
  titre:"Elles reviennent une fois",
  texte:[
    () => {
      const n = (ETAT.melee && ETAT.melee.eux) || 20;
      return `Elles reviennent. ${n} environ, ce qui est encore beaucoup plus qu'un homme, et elles reviennent parce qu'une meute qui a mangé six semaines au même endroit ne renonce pas à un endroit en une nuit.`;
    },
    { sobre:"Mais elles ne reviennent pas de la même façon.",
      intense:"Mais elles ne reviennent pas de la même façon, et c'est là que la nuit se décide. Elles n'arrivent plus ensemble. Il y a un décalage — trois secondes, peut-être quatre — entre le premier paquet et le suivant.",
      extreme:"Mais elles ne reviennent pas de la même façon, et c'est exactement là que se décide le reste de la nuit.\n\nElles n'arrivent plus ensemble. Il y a un décalage — trois secondes, peut-être quatre — entre le premier paquet et celui qui suit. Ce décalage n'existait pas au premier passage.\n\nTrois lignées que la faim avait soudées viennent de passer une heure à mourir côte à côte, et la soudure a bougé. Elles ne le savent pas encore. Vous, si." },
  ],
  choix:[
    { t:"Frapper la soudure : les tenir séparées",
      detail:"Intellect · commandement — ce n'est plus une meute, c'est trois groupes qui hésitent",
      risque:"favorable",
      test:{ carac:'intellect', comp:'commandement', dc:11, adversaire:'meute', manoeuvre:'separation',
             situation:() => (a('ch_lu_bien') ? 3 : 0) + (a('ch_nourries') ? 1 : 0) },
      degres:{ dominante:'ch_c2_separer_dom', nette:'ch_c2_separer_ok', couteuse:'ch_c2_separer_ok',
               echec:'ch_c2_separer_ko', catastrophe:'ch_c2_separer_ko' } },

    { t:"Chercher celle de tête et ne frapper qu'elle",
      detail:"Perception · bestiaire — trente bêtes suivent quelque chose, et ce quelque chose respire",
      risque:"calculé",
      test:{ carac:'perception', comp:'bestiaire', dc:12, adversaire:'meute', manoeuvre:'tete',
             situation:() => a('ch_lu_bien') ? 3 : 0 },
      degres:{ dominante:'ch_c2_tete_dom', nette:'ch_c2_tete_dom', couteuse:'ch_c2_tete_cout',
               echec:'ch_c2_tete_ko', catastrophe:'ch_c2_tete_ko' } },

    { t:"Tenir encore, jusqu'au jour",
      detail:"Endurance · rien d'autre — le jour se lève dans deux heures et elles n'aiment pas le jour",
      risque:"risqué",
      test:{ carac:'endurance', comp:'epees', dc:13, adversaire:'meute', manoeuvre:'tenir',
             cout:{ endurance:20 } },
      degres:{ dominante:'ch_c2_tenir_ok', nette:'ch_c2_tenir_ok', couteuse:'ch_c2_tenir_cout',
               echec:'ch_c2_tenir_ko', catastrophe:'ch_c2_tenir_ko' } },
  ],
},

ch_c2_separer_dom:{
  melee:true,
  titre:"Trois lignées",
  texte:[
    "Vous cessez de les regarder comme trente. Vous les regardez comme trois.",
    { sobre:"Trois tailles d'antérieur. Trois façons de poser. Trois groupes.",
      intense:"Trois tailles d'antérieur dans la boue de la veille, trois façons de poser le pied, trois groupes que la faim a collés et qui n'ont jamais chassé ensemble avant cet hiver. Vous vous placez de façon à ce que le plus petit des trois soit obligé de passer devant le plus gros.",
      extreme:"Trois tailles d'antérieur dans la boue de la veille. Trois façons de poser le pied. Trois groupes que six semaines de faim ont collés ensemble et qui n'avaient jamais chassé côte à côte de leur vie.\n\nVous vous déplacez de sept pas — sept pas, c'est tout ce que ça demande — de façon que le plus petit des trois groupes soit obligé de passer devant le plus gros pour vous atteindre.\n\nPuis vous attendez, et vous laissez la nature faire ce que la nature fait depuis toujours quand deux lignées se croisent sur une proie et qu'elles ont faim." },
    { sobre:"Elles se battent entre elles avant d'arriver sur vous.",
      intense:"Elles se battent entre elles. Pas longtemps — vingt secondes — mais vingt secondes suffisent : ce qui tenait trente animaux ensemble depuis six semaines vient de se rompre devant vous, et ça ne se refera pas.",
      extreme:"Elles se battent entre elles.\n\nÇa dure vingt secondes, ce qui est très court et parfaitement suffisant. Deux mâles se prennent au garrot à quinze pas de vous, le reste se fige, quelqu'un choisit un camp, et la chose qui tenait trente animaux ensemble depuis six semaines se défait sous vos yeux sans que vous ayez levé l'épée.\n\nCe qui reste, à l'aube, ce ne sont plus trente bêtes. Ce sont trois meutes ordinaires, affamées, méfiantes l'une de l'autre, dont deux partiront avant midi et dont la troisième restera se battre pour un territoire qui ne vaut plus rien." },
    "§ Ce n'est pas un exploit d'armes. C'est mieux : c'est une chose qui ne se refera pas.",
  ],
  effets:{ flags:['ch_meute_finie','ch_meute_defaite'], cout:{ endurance:12 },
           meleeMaj:{ eux:0, position:"debout, immobile", note:"Elles se sont défaites toutes seules" },
           exploit:{ eclat:7, temoins:'quelques',
                     quoi:"vous avez défait trente bêtes en les faisant se souvenir qu'elles étaient trois meutes" },
           marque:"Vous avez rompu la soudure. Trois lignées, et elles s'en sont souvenues.",
           court:"Trois lignées" },
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c2_separer_ok:{
  melee:true,
  titre:"La soudure",
  texte:[
    "Vous jouez sur le décalage et ça marche à moitié, ce qui est déjà considérable à quatre heures du matin.",
    "Le plus gros groupe charge le premier. Les deux autres suivent avec deux secondes de retard, et deux secondes de retard, dans un combat, sont la différence entre trente adversaires et onze.",
    { sobre:"Onze d'un coup, ça se tient. Trente, non.",
      intense:"Onze d'un coup, ça se tient. On les prend de face, on recule de trois pas, on recommence. Vous en tuez cinq et les deux autres groupes, arrivés en retard, trouvent un homme debout au lieu d'un homme submergé — ce qui n'est pas du tout la même invitation.",
      extreme:"Onze d'un coup, ça se tient. On les prend de face, on cède trois pas, on frappe ce qui déborde, on recommence. C'est du métier et il n'y a rien d'autre à en dire.\n\nVous en tuez cinq. Et les deux autres groupes, arrivés avec leurs deux secondes de retard, trouvent devant eux un homme debout au lieu d'un homme submergé — ce qui n'est absolument pas la même invitation, et ce qu'aucun animal du monde n'accepte de la même façon.\n\nIls s'arrêtent. Ils regardent. Puis ils s'en vont, sans se presser, parce qu'un animal qui s'en va sans se presser n'a rien abandonné du tout : il a simplement décidé que ce n'était pas ce soir." },
  ],
  effets:{ flags:['ch_meute_finie'], cout:{ endurance:24, vitalite:10 },
           meleeMaj:{ eux:0, position:"debout, l'épée basse", note:"Ils sont partis sans se presser" },
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous les avez prises en trois fois au lieu d'une" },
           marque:"Vous les avez séparées. Cinq en bas, le reste est parti sans se presser.",
           court:"Le décalage" },
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c2_separer_ko:{
  melee:true,
  titre:"Il n'y avait pas de décalage",
  texte:[
    "Vous vous placez pour couper une soudure qui n'existe pas.",
    { sobre:"Le décalage était de la fatigue. La vôtre.",
      intense:"Le décalage que vous aviez vu n'était pas dans la meute. Il était dans vos yeux : un homme qui se bat depuis une heure voit ce qu'il a besoin de voir, et il le voit très clairement.",
      extreme:"Le décalage que vous aviez cru voir n'était pas dans la meute. Il était dans vos yeux.\n\nUn homme qui se bat depuis une heure voit ce dont il a besoin, et il le voit avec une netteté parfaite — c'est même ce qui rend la chose dangereuse. Vous avez vu trois secondes de retard parce que vous aviez besoin qu'il y ait trois secondes de retard.\n\nElles arrivent ensemble. Toutes. Et vous êtes déplacé de sept pas par rapport à l'endroit que vous aviez choisi." },
    "Ce qui suit se paie en chair et se règle par la fuite, ce qui n'est pas déshonorant et ce qui n'est jamais gratuit.",
  ],
  effets:{ cout:{ endurance:34, vitalite:28, sang:18, moral:6 },
           meleeMaj:{ eux:18, position:"reculant vers les maisons", note:"Elles sont arrivées ensemble" },
           faire:() => blesser({ id:'ch_flanc', zone:"flanc droit", type:"ouvert sur quatre pouces",
                                 gravite:3, douleur:3, saignement:3, fonction:['endurance'],
                                 cicatrice:"quatre pouces de bourrelet blanc sur le flanc droit" }),
           marque:"Vous avez lu un décalage qui n'existait pas. Elles sont arrivées ensemble.",
           court:"Ensemble" },
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c2_tete_dom:{
  melee:true,
  titre:"Celle qui décide",
  texte:[
    { sobre:"Ce n'est pas la plus grosse. C'est celle qui ne charge jamais.",
      intense:"Ce n'est pas la plus grosse, et c'est pour ça que personne ne la trouve jamais. C'est celle qui n'a pas chargé une seule fois de la nuit. Elle est restée en retrait à chaque passage, du même côté, et les autres se sont réorientées trois fois sur elle sans qu'elle bouge.",
      extreme:"Ce n'est pas la plus grosse. Ça n'est jamais la plus grosse, et c'est pour cette raison qu'un homme sur cent la trouve.\n\nC'est celle qui n'a pas chargé une seule fois de toute la nuit. Elle est restée en retrait à chaque passage, toujours du même côté, à la même distance, sans jamais s'engager. Et à trois reprises, quand la meute a changé de direction, elle a changé une demi-seconde avant les autres.\n\nUne femelle. Sept ou huit ans, ce qui est très vieux. Une oreille en moins depuis longtemps. Elle vous regarde depuis une heure et demie et elle ne vous a jamais approché à moins de vingt pas." },
    "Vous ne chargez pas non plus. Vous la laissez venir en laissant venir tout le reste, et quand le paquet arrive vous ne frappez rien de ce qui vous atteint.",
    { sobre:"Vous traversez et vous la prenez, elle.",
      intense:"Vous traversez le paquet sans frapper — ce qui coûte trois morsures et une manche — et vous la prenez, elle, à vingt-deux pas, contre la haie, avant qu'elle ait compris qu'elle était devenue la cible.",
      extreme:"Vous traversez le paquet sans frapper une seule fois, ce qui est contre tout ce qu'on apprend et ce qui coûte trois morsures, une manche et un morceau de mollet.\n\nEt vous la prenez elle, à vingt-deux pas, contre la haie d'aubépine, avant qu'elle ait admis qu'un homme puisse choisir un animal dans une meute de trente.\n\nÇa prend une seconde et demie. Elle ne se défend pas correctement : elle ne s'est pas défendue correctement depuis des années, parce qu'elle n'a plus besoin de se battre pour quoi que ce soit." },
    { sobre:"Le reste ne s'effondre pas. Le reste ne sait plus quoi faire.",
      intense:"Le reste ne s'effondre pas — ce n'est pas une armée, il n'y a pas de moral à rompre. Le reste **ne sait plus quoi faire**, ce qui est différent et beaucoup plus lent : elles tournent, elles se regardent, elles recommencent trois fois le même mouvement.\n\nPuis elles s'en vont par petits paquets, et la chose qu'elles étaient depuis six semaines s'en va avec.",
      extreme:"Le reste ne s'effondre pas. Ce n'est pas une armée, il n'y a pas de moral à rompre, aucune bête ne comprend qu'un chef vient de mourir.\n\nCe qui se passe est différent et beaucoup plus lent : elles **ne savent plus quoi faire**. Elles tournent. Elles se regardent. Elles amorcent trois fois le même mouvement et l'abandonnent trois fois. Une jeune charge toute seule, sans être suivie, et se fait tuer bêtement.\n\nPuis elles s'en vont par paquets de trois ou quatre, dans quatre directions, et la chose qu'elles formaient depuis six semaines s'en va avec elles. Elle ne se reformera pas : ce qui la tenait ne se remplace pas en un printemps." },
  ],
  effets:{ flags:['ch_meute_finie','ch_meute_defaite','ch_tete_prise'],
           cout:{ endurance:26, vitalite:18, sang:12 },
           meleeMaj:{ eux:0, position:"debout contre la haie", note:"Elles ne savent plus quoi faire" },
           faire:() => blesser({ id:'ch_mollet', zone:"mollet droit", type:"arraché sur trois doigts",
                                 gravite:2, douleur:2, saignement:2, fonction:['agilite'],
                                 cicatrice:"un creux de trois doigts dans le mollet droit" }),
           exploit:{ eclat:9, temoins:'quelques',
                     quoi:"vous avez trouvé celle qui décidait dans une meute de trente et vous n'avez tué qu'elle" },
           marque:"Vous avez trouvé celle qui décidait. Une vieille femelle à une oreille, qui n'a jamais chargé.",
           court:"Celle qui décidait" },
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c2_tete_cout:{
  melee:true,
  titre:"La deuxième fois",
  texte:[
    "Vous la trouvez. Vous vous trompez de chemin pour y aller.",
    { sobre:"Vous traversez le paquet et le paquet vous fait payer.",
      intense:"Vous traversez le paquet sans frapper, comme il faut, sauf que vous le traversez trop lentement d'environ deux secondes. Deux secondes dans un paquet de bêtes, ça se paie en morceaux.",
      extreme:"Vous traversez le paquet sans frapper — c'est la bonne méthode, c'est la seule — sauf que vous mettez deux secondes de trop à le faire.\n\nDeux secondes dans un paquet de bêtes se paient en morceaux, et le compte est le suivant : la manche gauche du haubert arrachée avec ce qu'il y avait dedans, le dos du genou ouvert, et une gueule qui a tenu votre poignet droit assez longtemps pour que quelque chose cède à l'intérieur.\n\nVous arrivez sur elle quand même. Vous la tuez de la main gauche, mal, en trois coups au lieu d'un." },
    "Elle meurt et le reste se défait, ce qui était le but. Le poignet droit, lui, ne se refera pas de la saison.",
  ],
  effets:{ flags:['ch_meute_finie','ch_tete_prise'],
           cout:{ endurance:32, vitalite:24, sang:16 },
           meleeMaj:{ eux:0, position:"debout, le poignet mort", note:"Elle est morte · vous aussi un peu" },
           faire:() => blesser({ id:'ch_poignet', zone:"poignet droit", type:"tendons rompus",
                                 gravite:3, douleur:3, saignement:1, fonction:['epees','force'],
                                 cicatrice:"un poignet droit qui craque au froid" }),
           exploit:{ eclat:6, temoins:'quelques', quoi:"vous avez pris celle qui décidait, et payé le poignet" },
           marque:"Vous avez tué celle qui décidait, de la main gauche, en trois coups.",
           court:"De la main gauche" },
  plusTard:"Un poignet droit dont les tendons ont lâché ne redevient jamais un poignet droit.",
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c2_tete_ko:{
  melee:true,
  titre:"Il n'y en a pas toujours une",
  texte:[
    "Vous la cherchez pendant six minutes et vous ne la trouvez pas, parce qu'elle n'existe pas.",
    { sobre:"Trois meutes soudées n'ont pas une tête. Elles en ont trois.",
      intense:"Trois lignées que la faim a collées n'ont pas une seule bête qui décide : elles en ont trois, et les trois ne sont d'accord sur rien sauf sur la nourriture. Vous avez cherché un chef dans une chose qui n'en a pas et vous avez passé six minutes à regarder au lieu de frapper.",
      extreme:"Trois lignées que six semaines de faim ont collées ensemble n'ont pas une bête qui décide. Elles en ont trois, elles ne sont d'accord sur rien sauf sur l'endroit où se trouve la viande, et c'est précisément pour ça qu'elles sont dangereuses : il n'y a pas de tête à couper.\n\nVous avez cherché un chef dans une chose qui n'en a pas. Vous avez passé six minutes à regarder au lieu de frapper, et six minutes est une durée que personne ne vous prête gratuitement à quatre heures du matin." },
    "Elles vous font reculer jusqu'aux maisons. Vous y arrivez entier, ce qui, vu le compte des six minutes, tient du cadeau.",
  ],
  effets:{ cout:{ endurance:36, vitalite:22, sang:14, moral:4 },
           meleeMaj:{ eux:20, position:"adossé à une porte", note:"Il n'y avait pas de tête" },
           faire:() => blesser({ id:'ch_avantbras', zone:"avant-bras gauche", type:"morsure profonde",
                                 gravite:2, douleur:2, saignement:2, fonction:['force'],
                                 cicatrice:"quatre trous en arc sur l'avant-bras gauche" }),
           marque:"Vous avez cherché une tête. Trois meutes soudées n'en ont pas une : elles en ont trois.",
           court:"Pas de tête" },
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c2_tenir_ok:{
  melee:true,
  titre:"Deux heures",
  texte:[
    "Il n'y a rien d'autre à faire que ça, et « ça » veut dire deux heures.",
    { sobre:"Le jour se lève à la sixième heure. Il faut y être.",
      intense:"Le jour se lève à la sixième heure et il n'y a aucune autre échéance dans cette nuit. Deux heures. Un homme peut tenir deux heures s'il accepte de ne plus rien faire d'intelligent : reculer, frapper ce qui entre, ne jamais quitter le mur, et ne pas penser.",
      extreme:"Le jour se lève à la sixième heure. C'est la seule échéance de cette nuit et il n'y en aura pas d'autre.\n\nDeux heures. Un homme peut tenir deux heures à condition d'accepter de ne plus rien faire d'intelligent du tout : reculer d'un pas quand il faut, frapper ce qui entre, ne jamais quitter le mur, ne jamais poursuivre, ne jamais avoir d'idée. Une idée coûte une seconde et une seconde coûte un morceau.\n\nÀ la cinquième heure vous ne sentez plus vos mains. À la cinquième et demie vous ne comptez plus. À la sixième, la ligne des crêtes passe du noir au gris, et les bêtes le voient avant vous." },
    "Elles n'aiment pas le jour. Ce n'est pas de la peur : c'est qu'un animal qui chasse la nuit sait qu'au jour il devient à son tour quelque chose qu'on voit venir.",
    "Elles remontent vers les tourbières par la coulée du nord, sans se presser, et vous restez debout parce que vous asseoir demanderait une décision.",
  ],
  effets:{ flags:['ch_meute_finie'], cout:{ endurance:52, vitalite:20, sang:12 },
           meleeMaj:{ eux:0, position:"debout parce qu'on ne s'assoit pas", note:"Le jour s'est levé" },
           faire:() => blesser({ id:'ch_mains', zone:"les deux mains", type:"ouvertes et gonflées",
                                 gravite:2, douleur:2, saignement:1, fonction:['epees','agilite'],
                                 cicatrice:"des mains qui mettent trois semaines à se refermer entièrement" }),
           exploit:{ eclat:6, temoins:'quelques', quoi:"deux heures sans reculer, jusqu'au jour" },
           marque:"Vous avez tenu deux heures jusqu'au jour. Elles sont remontées aux tourbières.",
           court:"Deux heures" },
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c2_tenir_cout:{
  melee:true,
  titre:"La cinquième heure",
  texte:[
    "Vous tenez une heure quarante. Il en fallait deux.",
    { sobre:"Ce n'est pas elles qui vous ont eu. C'est le bras.",
      intense:"Ce n'est aucune d'entre elles qui vous a eu : c'est le bras droit, qui a cessé de remonter à la cinquième heure, et une épée qui ne remonte pas est un poids qu'on tient devant soi.",
      extreme:"Aucune d'entre elles ne vous a eu. C'est le bras droit.\n\nÀ la cinquième heure il a cessé de remonter — pas progressivement, d'un coup, entre deux passages : vous avez abaissé la lame et elle n'est pas remontée. Une épée bâtarde pèse quatre livres et demie. Après quatre heures, elle en pèse quarante, et à un moment le compte est fait.\n\nCe qui est entré à ce moment-là est entré sans opposition, et c'est entré au bon endroit — sous les côtes flottantes, à droite, en biais vers le haut, avec le poids de l'animal derrière." },
    "Vous la tuez à la dague, sur vous, et vous finissez la nuit assis contre le mur, ce que vous vouliez précisément éviter.",
    "Le jour se lève quand même. C'est la seule chose de cette nuit qui n'ait rien demandé à personne.",
  ],
  effets:{ flags:['ch_meute_finie'], cout:{ endurance:60, vitalite:34, sang:28 },
           meleeMaj:{ eux:0, position:"assis contre le mur", note:"Le jour s'est levé sans vous" },
           faire:() => blesser({ id:'ch_cotes', zone:"sous les côtes, à droite", type:"perforation profonde",
                                 gravite:4, douleur:3, saignement:4, fonction:['endurance','force'],
                                 cicatrice:"quatre trous sous les côtes flottantes, à droite" }),
           marque:"Le bras a lâché à la cinquième heure. Ce qui est entré ensuite est entré sans opposition.",
           court:"La cinquième heure" },
  plusTard:"Une perforation sous les côtes qu'on n'a pas fait recoudre le jour même se rappelle à vous chaque hiver.",
  suite:'ch_fin', libelleSuite:"Le matin" },

ch_c2_tenir_ko:{
  melee:true,
  titre:"On ne tient pas deux heures",
  texte:[
    "On ne tient pas deux heures. Personne ne tient deux heures. C'est une phrase qu'on dit avant d'essayer et qu'on comprend pendant.",
    { sobre:"À la quatrième heure, vous reculez dans une maison.",
      intense:"À la quatrième heure vous reculez, et reculer dans un hameau veut dire une seule chose : vous entrez chez quelqu'un. Vous enfoncez la porte du meunier avec l'épaule, vous la refermez sur trois museaux, et vous passez la fin de la nuit à la tenir avec quatre personnes qui poussent derrière vous.",
      extreme:"À la quatrième heure, vous reculez. Reculer dans un hameau de onze feux ne veut dire qu'une seule chose : vous entrez chez quelqu'un.\n\nVous enfoncez la porte du meunier de l'épaule sans frapper, vous la refermez sur trois museaux — l'un reste coincé et il faut le finir à la dague à travers l'entrebâillement, ce qui prend un temps considérable — et vous passez le reste de la nuit adossé à ce battant avec le meunier, sa femme, sa belle-sœur et un garçon de quatorze ans qui poussent derrière vous en silence.\n\nPersonne ne dit un mot pendant deux heures. De l'autre côté, quelque chose gratte le bas de la porte, régulièrement, sans se presser, jusqu'au jour." },
    "§ Vous avez survécu à la nuit. Vous n'avez rien réglé du tout, et quarante personnes l'ont vu.",
  ],
  effets:{ cout:{ endurance:58, vitalite:26, sang:18, moral:12 },
           meleeMaj:{ eux:22, position:"derrière la porte du meunier", note:"Vous n'avez rien réglé" },
           faire:() => blesser({ id:'ch_epaule', zone:"épaule droite", type:"démise et remise",
                                 gravite:2, douleur:3, saignement:0, fonction:['force','epees'],
                                 cicatrice:"une épaule droite qui sort seule une fois par an" }),
           marque:"Vous avez fini la nuit derrière la porte du meunier, à quatre pour la tenir.",
           court:"La porte" },
  suite:'ch_fin', libelleSuite:"Le matin" },

/* ══ LE MATIN ══════════════════════════════════════════════════════════════ */
ch_fin:{ dyn:true, texte:[] },

/* ══════════════════════════════════════════════════════════════════════════
 * 2 · GUILLAUME DE SAULT, QUI COLLECTIONNE
 *
 * Il arrive dès qu'on a un nom, et pour cette seule raison. Ce n'est pas un
 * tueur à gages, il n'est envoyé par personne, et il ne veut pas votre mort :
 * il veut votre nom dans une liste qu'il tient depuis onze ans.
 *
 * Sa fonction dans l'acte est simple et elle est mécanique : **apprendre les
 * règles du rond avant Renaud Sorgue.** Les trois temps, la craie, le pied
 * qui sort. Un joueur qui a fait ce duel-là entre dans l'assise en sachant
 * ce qu'il regarde. Un joueur qui l'a refusé y entre en l'apprenant sur le
 * dos d'un homme qui a gagné quarante et un fois.
 *
 * On peut refuser. Refuser coûte du renom devant témoins, et pas un cheveu
 * de plus — il n'y a pas de vengeance, pas d'embuscade, pas de retour. Un
 * homme qui collectionne les noms note *a refusé* et passe au suivant, et
 * c'est très exactement ce qui rend le refus difficile.
 * ══════════════════════════════════════════════════════════════════════════ */
ch_duelliste:{
  qui:'sault',
  lieu:() => `${["Cendrepont", "Un relais de la Route Grise", "Le Héron"][Math.min(ETAT.acte.saison, 2)]} · la salle basse`,
  titre:"Un homme qui tient une liste",
  texte:[
    "Il vous attend dans la salle depuis deux jours. L'aubergiste le sait, la salle le sait, et personne ne vous a prévenu — ce qui vous apprend déjà quelque chose sur ce que la salle attend de la soirée.",
    { sobre:"Guillaume de Sault a trente et un ans et il est très propre.",
      intense:"Guillaume de Sault a trente et un ans, un pourpoint de bonne coupe entretenu par quelqu'un, et des mains sans une seule marque. C'est la première chose qu'on remarque chez un homme d'armes et c'est la seule qui compte : des mains sans marque veulent dire qu'on n'a jamais eu à parer avec.",
      extreme:"Guillaume de Sault a trente et un ans, un pourpoint gris de bonne coupe entretenu par quelqu'un dont c'est le travail, et des mains sans une seule marque.\n\nC'est la première chose qu'on regarde chez un homme d'armes et c'est la seule qui renseigne vraiment. Des avant-bras sans cicatrices de parade, des jointures intactes, deux doigts qui se plient normalement. Ça veut dire l'une de deux choses : ou il n'a jamais rien fait, ou il n'a jamais eu à encaisser.\n\nIl a une épée de duel à la hanche, montée à Chastel, et la garde est usée à un seul endroit — à l'endroit exact où le pouce se pose. Un homme qui n'a jamais rien fait n'use pas une garde." },
    "Il se lève quand vous entrez. Il ne s'approche pas.",
    "« On m'a dit qu'il y avait un homme à Cendrepont qu'on demande maintenant par son nom. »",
    "@« On vous a dit. »",
    { sobre:"« Guillaume de Sault. Je tiens une liste. »",
      intense:"« Guillaume de Sault. » Il l'annonce comme on annonce une charge, pas comme on se présente. « Je tiens une liste depuis onze ans. Trente-huit noms. Je voudrais le vôtre. »",
      extreme:"« Guillaume de Sault. »\n\nIl l'annonce comme on annonce une charge et pas du tout comme on se présente, ce qui est un usage de cour et ce qui ne se fait pas dans une salle basse de relais.\n\n« Je tiens une liste depuis onze ans. Trente-huit noms dessus, tous des hommes qu'on demandait par leur nom dans une province quelconque à un moment quelconque. Je les rencontre. Ensuite j'écris ce qui s'est passé, en trois lignes, et je passe au suivant.\n\nJe voudrais le vôtre. »" },
    "§ Il n'est envoyé par personne. C'est ce qui le rend impossible à traiter comme les autres.",
    { sobre:"^« Ce n'est pas à mort. Je ne tue pas, en général. »",
      intense:"^« Ce n'est pas à mort », dit-il, du ton dont on écarte une objection administrative. « Je ne tue pas, en général. Sur trente-huit, j'en ai tué quatre, et les quatre y tenaient beaucoup plus que moi. »",
      extreme:"^« Ce n'est pas à mort », dit-il, du ton dont on écarte une objection de forme avant de passer à la suite.\n\n« Je ne tue pas en général. Sur trente-huit, j'en ai tué quatre, et je peux vous dire honnêtement que les quatre y tenaient bien davantage que moi. Deux ont refusé de céder quand ils auraient dû. Un a glissé. Le quatrième était ivre et je n'aurais pas dû accepter ce soir-là ; c'est le seul des trente-huit dont je ne relis pas la ligne. »\n\nIl dit tout ça sans une once de fanfaronnade et sans une once de regret, et c'est cette absence-là, dans les deux sens, qui rend l'homme désagréable à écouter." },
    "« Les règles sont celles du rond. Vous les connaissez ? »",
    "@« Non. »",
    { sobre:"« Alors je vous les donne. Ça vaut mieux quand les deux savent. »",
      intense:"« Alors je vous les donne », dit-il, et il paraît sincèrement content de le faire. « C'est meilleur quand les deux savent. »",
      extreme:"« Alors je vous les donne. »\n\nIl paraît sincèrement content de le faire, et pour la première fois de la soirée il ressemble à quelque chose d'humain : c'est un homme à qui on vient de demander de parler de la seule chose qui l'intéresse.\n\n« C'est meilleur quand les deux savent. Un homme qui ignore les règles fait des choses qui ne veulent rien dire, et une ligne qui ne veut rien dire ne vaut pas la peine d'être écrite. »" },
    "§ **Un rond de neuf pas, tracé à la craie.** Le pied qui sort une fois, on le dit. Deux fois, on a perdu.",
    "§ **Trois temps chacun.** On lève deux doigts, on s'arrête, on souffle. Celui qui demande un temps ne peut pas frapper pendant.",
    "§ **On cède ou on tombe.** Il n'y a pas de troisième façon de finir, et personne n'a jamais été obligé de tomber.",
    "^« Voilà. C'est tout, et c'est déjà trop de mots. »",
  ],
  effets:{ flags:['ch_sault_vu','ch_regles_du_rond'],
           marque:"Guillaume de Sault tient une liste de trente-huit noms et voudrait le vôtre.",
           court:"Guillaume de Sault" },
  choix:[
    { t:"Accepter",
      detail:"Un rond de neuf pas, trois temps chacun, et personne n'est obligé de tomber",
      risque:"calculé", va:'ch_du_rond',
      effets:{ flags:['ch_duel_accepte'],
               melee:{ position:"dans le rond, à neuf pas", note:"Trois temps chacun · aucun pris" } } },

    { t:"« Non. »",
      detail:"Il notera *a refusé* et passera au suivant · la salle est pleine",
      risque:"prudent",
      ferme:"Ferme : ce qu'on aurait appris du rond avant l'assise",
      va:'ch_du_refus' },

    { t:"Demander à voir la liste d'abord",
      detail:"Perception · lettres — trente-huit noms disent d'où vient un homme",
      risque:"favorable",
      test:{ carac:'perception', comp:'lettres', dc:10, manoeuvre:'liste' },
      degres:{ dominante:'ch_du_liste_dom', nette:'ch_du_liste_ok', couteuse:'ch_du_liste_ok',
               echec:'ch_du_liste_ko', catastrophe:'ch_du_liste_ko' } },
  ],
},

ch_du_liste_dom:{
  qui:'sault',
  titre:"Trente-huit lignes",
  texte:[
    "Il vous la tend sans hésiter. Un homme qui tient une liste depuis onze ans a très envie qu'on la lise et n'a personne à qui la montrer.",
    "C'est un carnet de vingt feuillets, relié, tenu d'une écriture régulière qui n'a pas changé en onze ans.",
    { sobre:"Trois lignes par nom. La troisième est toujours la même sorte de phrase.",
      intense:"Trois lignes par nom : où, contre quoi, comment ça a fini. La troisième ligne est toujours de la même sorte — *a cédé au deuxième temps*, *n'a pas su fermer sa gauche*, *m'a surpris deux fois et je l'ai noté*.",
      extreme:"Trois lignes par nom, jamais quatre. Où. Contre quoi. Comment ça a fini.\n\nLa troisième ligne est toujours de la même espèce : *a cédé au deuxième temps* · *n'a jamais su fermer sa gauche* · *m'a surpris deux fois et je l'ai écrit le soir même* · *ivre, ma faute*.\n\nCe n'est pas un tableau de chasse. Il n'y a pas un mot de vantardise en vingt feuillets, pas une seule fois le mot *vaincu*, et il note ses propres fautes avec la même exactitude que celles des autres. C'est un registre." },
    "§ Et il y a une chose dans ce carnet qu'il ne vous a pas dite.",
    { sobre:"Onze noms sur trente-huit portent une croix. Il ne les a pas rencontrés.",
      intense:"Onze noms sur trente-huit portent une petite croix dans la marge et n'ont pas de troisième ligne. Ceux-là, il ne les a pas rencontrés. Il en a repéré onze en onze ans et il n'est jamais allé au bout : soit ils sont morts avant, soit ils ont refusé.",
      extreme:"Onze noms sur trente-huit portent une petite croix dans la marge et n'ont pas de troisième ligne du tout.\n\nCeux-là, il ne les a pas rencontrés. Onze en onze ans. En regardant les dates on comprend pourquoi : trois sont morts d'autre chose avant qu'il arrive, deux ont quitté la province, et **six ont refusé**.\n\nSix. Et à côté de chacun des six, dans la même écriture régulière, un seul mot : *refusé*. Pas *lâche*, pas *n'a pas osé*. *Refusé*.\n\nCe n'est pas une menace et ça n'a jamais été une menace. C'est un homme qui note ce qui est arrivé, et pour six hommes ce qui est arrivé est qu'ils ont dit non." },
    "Vous refermez le carnet. Il attend, et il n'a pas l'air pressé.",
    "@« Pourquoi vous faites ça ? »",
    { sobre:"« Parce que personne d'autre ne le fait. »",
      intense:"« Parce que personne d'autre ne le fait », dit-il, et il n'a manifestement jamais compris que la question puisse en être une. « Dans cinquante ans, tout ce qu'on saura des hommes qui valaient quelque chose dans ces provinces, ce sera ce que j'aurai écrit. »",
      extreme:"« Parce que personne d'autre ne le fait. »\n\nIl le dit avec l'incompréhension polie d'un homme à qui l'on demande pourquoi il respire.\n\n« Regardez le carnet. Trente-huit hommes, sur onze ans, dans quatre provinces. Il n'y en a pas trois dont un greffe garde le nom, et pas un seul dont on saura, dans cinquante ans, s'il fermait bien sa gauche.\n\nUne maison a un registre. Une province a un cartulaire. Un homme d'armes n'a rien du tout : il a une réputation, ce qui est une chose qu'on raconte et qu'on abîme, et il meurt et la chose s'abîme complètement en une génération. »\n\nUn temps.\n\n« Alors j'écris. C'est laid, je le sais, et ça oblige des gens à se battre pour rien. Je n'ai rien trouvé de mieux. »" },
    "§ Un homme dont la maison a été rayée entend cette phrase-là autrement que les trente-huit autres.",
  ],
  effets:{ flags:['ch_liste_lue','ch_sault_croix','ch_regles_du_rond'],
           exploit:{ eclat:1, temoins:'un', quoi:"vous avez lu le carnet avant de dire oui" },
           marque:"Son carnet : trente-huit noms, onze croix, et six hommes qui ont simplement refusé.",
           court:"Le carnet" },
  choix:[
    { t:"Accepter",
      detail:"Il écrira trois lignes · c'est plus que ce que le greffe garde de vous",
      risque:"calculé", va:'ch_du_rond',
      effets:{ flags:['ch_duel_accepte'],
               melee:{ position:"dans le rond, à neuf pas", note:"Trois temps chacun · aucun pris" } } },

    { t:"« Écrivez *refusé*. »",
      detail:"Six l'ont fait avant vous · il le notera exactement comme ça",
      risque:"prudent",
      ferme:"Ferme : ce qu'on aurait appris du rond avant l'assise",
      va:'ch_du_refus' },
  ],
},

ch_du_liste_ok:{
  qui:'sault',
  titre:"Le carnet",
  texte:[
    "Il vous le tend. Vingt feuillets, une écriture régulière, trois lignes par nom : où, contre quoi, comment ça a fini.",
    "Ce n'est pas un tableau de chasse — il n'y a pas un mot de vantardise en vingt feuillets, et il note ses propres fautes avec la même exactitude que celles des autres.",
    "§ C'est un registre. Un homme dont la maison a été rayée sait exactement ce qu'un registre pèse, et c'est très désagréable.",
    "« Alors ? » dit-il.",
  ],
  effets:{ flags:['ch_liste_lue','ch_regles_du_rond'],
           marque:"Son carnet n'est pas un tableau de chasse. C'est un registre.", court:"Le carnet" },
  choix:[
    { t:"Accepter",
      detail:"Trois lignes dans un registre · c'est plus que ce que le greffe garde de vous",
      risque:"calculé", va:'ch_du_rond',
      effets:{ flags:['ch_duel_accepte'],
               melee:{ position:"dans le rond, à neuf pas", note:"Trois temps chacun · aucun pris" } } },
    { t:"Refuser",
      detail:"Il notera *refusé*, sans commentaire",
      risque:"prudent",
      ferme:"Ferme : ce qu'on aurait appris du rond avant l'assise",
      va:'ch_du_refus' },
  ],
},

ch_du_liste_ko:{
  qui:'sault',
  titre:"Non",
  texte:[
    "« Non. »",
    "Il le dit sans dureté et sans discussion possible, et c'est la première fois de la soirée qu'il ferme quelque chose.",
    "« Le carnet est à moi. Vous y serez peut-être dans une heure, et alors vous en ferez ce que vous voudrez, mais vous ne le lirez pas avant. »",
    "§ Il y a une logique là-dedans et elle est même assez propre : on ne montre pas la copie à celui qui va passer l'épreuve.",
  ],
  effets:{ flags:['ch_regles_du_rond'],
           marque:"Il n'a pas voulu montrer le carnet avant.", court:"Pas avant" },
  choix:[
    { t:"Accepter",
      detail:"Un rond de neuf pas, trois temps chacun",
      risque:"calculé", va:'ch_du_rond',
      effets:{ flags:['ch_duel_accepte'],
               melee:{ position:"dans le rond, à neuf pas", note:"Trois temps chacun · aucun pris" } } },
    { t:"Refuser",
      detail:"Il notera *refusé* et passera au suivant",
      risque:"prudent",
      ferme:"Ferme : ce qu'on aurait appris du rond avant l'assise",
      va:'ch_du_refus' },
  ],
},

/* ── Refuser ────────────────────────────────────────────────────────────── */
ch_du_refus:{
  qui:'sault',
  titre:"Refusé",
  texte:[
    "« Non. »",
    { sobre:"Il hoche la tête, sort le carnet, et écrit un mot.",
      intense:"Il hoche la tête. Il sort le carnet, il ouvre à la page en cours, et il écrit un seul mot dans la marge, devant vous, sans commentaire et sans lever les yeux.",
      extreme:"Il hoche la tête une fois. Il sort le carnet de son pourpoint, l'ouvre à la page en cours, et il écrit un seul mot dans la marge — devant vous, sans commentaire, sans une seconde d'hésitation et sans lever les yeux une seule fois.\n\nPuis il referme, il range, il paie sa part, et il vous salue exactement comme il vous a salué en arrivant." },
    "§ *Refusé.* Pas *lâche*. Pas *n'a pas osé*. Il note ce qui est arrivé.",
    { sobre:"La salle, elle, note autre chose.",
      intense:"La salle, elle, note autre chose. Onze personnes ont entendu un homme demander un rond et un autre dire non, et onze personnes de relais ne gardent jamais la version exacte : elles gardent celle qui se raconte le mieux.",
      extreme:"La salle, elle, note tout à fait autre chose.\n\nOnze personnes ont entendu un homme demander un rond et un autre dire non. Onze personnes de salle de relais ne conservent jamais la version exacte d'une soirée — elles conservent celle qui se raconte le mieux, et *il a refusé le rond* se raconte infiniment mieux que *il a estimé que ça ne valait pas la peine*.\n\nÀ Floréal, sur la Route Grise, ce sera devenu autre chose. Vous n'y pourrez rien, et l'homme qui a écrit *refusé* dans son carnet n'y sera absolument pour rien." },
    "Il ne reviendra pas. Il n'y a pas d'embuscade, pas de retour, pas de vengeance : un homme qui collectionne des noms passe au suivant, et c'est très exactement ce qui rend ce refus difficile à porter.",
  ],
  effets:{ flags:['ch_duel_fait','ch_duel_refuse'],
           faire:() => { ETAT.renom = Math.max(0, ETAT.renom - 6); },
           cout:{ moral:4 },
           marque:"Vous avez refusé le rond devant onze personnes. Il a écrit *refusé*.",
           court:"Refusé" },
  issue:"Le rond n'a pas eu lieu",
  bilan:"Un mot dans la marge d'un carnet",
  apres:[
    "Six hommes avant vous ont refusé. Aucun des six n'a jamais eu à le regretter d'une façon qu'on puisse montrer du doigt.",
    "Ce qui se raconte sur la Route Grise, en revanche, ne demande la permission à personne.",
  ],
  plusTard:"Vous entrerez dans le rond de l'assise d'hiver sans savoir ce qu'est un temps.",
  suite:'entre_saisons', libelleSuite:"La route" },

/* ══ LE ROND ══════════════════════════════════════════════════════════════
 * Trois passes. La leçon n'est pas dans le résultat : elle est dans le fait
 * que le joueur apprend ici, contre un homme qui ne veut pas le tuer, ce
 * qu'il devra savoir contre un homme qui n'a jamais perdu. */
ch_du_rond:{
  melee:true, qui:'sault',
  lieu:"La cour, derrière la salle · à la lanterne",
  titre:"Neuf pas",
  texte:[
    "On sort dans la cour. Il trace le rond lui-même, à la craie, sur la terre battue — neuf pas, mesurés au pied, en marchant, sans se presser.",
    { sobre:"Onze personnes sortent avec vous. Personne ne parie.",
      intense:"Onze personnes sortent de la salle avec vous et se rangent contre le mur du fournil. Personne ne parie, ce qui est remarquable : dans une salle de relais on parie sur tout. Ils ont compris avant vous que ce n'était pas ce genre de soirée.",
      extreme:"Onze personnes sortent de la salle et se rangent d'elles-mêmes contre le mur du fournil, sans qu'on le leur demande, à la distance exacte où l'on se met quand on a déjà vu ça.\n\nPersonne ne parie. Dans une salle de relais on parie sur la pluie, sur le nombre de chariots et sur le sexe de l'enfant à naître ; là, personne ne sort une pièce. Ils ont compris avant vous que ce n'était pas ce genre de soirée-là.\n\nL'aubergiste apporte deux lanternes et les pose lui-même aux deux bouts du rond, ce qui suppose qu'il l'a déjà fait." },
    "« Vous avez trois temps », dit-il en entrant. « Vous pouvez les prendre tous les trois d'affilée si vous voulez, ça s'est vu. »",
    "@« Et vous ? »",
    "« Trois aussi. Je n'en prends jamais plus d'un. »",
    { sobre:"Il salue. C'est un salut de cour et il est parfait.",
      intense:"Il salue. C'est un salut de cour, complet, propre, et il est parfait — ce qui vous apprend d'un coup où cet homme a été formé et pourquoi il tient un carnet au lieu de tenir une charge.",
      extreme:"Il salue. Salut de cour complet : pointe basse, pied arrière, une inclinaison de la tête qui ne dépasse pas ce qu'elle doit dépasser.\n\nIl est parfait. Il n'y a pas un pouce de trop nulle part, et il ne le fait pas pour la galerie — il le fait exactement de la même façon dans une cour de relais devant onze charretiers.\n\nUn homme formé à ça, avec cette main-là, tient une charge quelque part et ne dort pas dans les relais. Celui-ci tient un carnet et dort dans les relais. Il y a une raison et il ne la dira pas ce soir." },
    "§ La première passe vous apprendra ce qu'il est. Ce que vous en ferez décide des deux autres.",
  ],
  choix:[
    { t:"Le laisser venir. Voir sa main d'abord",
      detail:"Perception · esquive — un homme qui a gagné trente-huit fois a une habitude",
      risque:"favorable",
      test:{ carac:'perception', comp:'esquive', dc:11, adversaire:'sault', manoeuvre:'lecture' },
      degres:{ dominante:'ch_du_p1_lire_dom', nette:'ch_du_p1_lire_ok', couteuse:'ch_du_p1_lire_ok',
               echec:'ch_du_p1_lire_ko', catastrophe:'ch_du_p1_lire_ko' } },

    { t:"Entrer dedans tout de suite",
      detail:"Force · épées — il attend un homme prudent, tous les hommes sont prudents au premier passage",
      risque:"risqué",
      test:{ carac:'force', comp:'epees', dc:13, adversaire:'sault', manoeuvre:'entree',
             cout:{ endurance:10 } },
      degres:{ dominante:'ch_du_p1_entrer_dom', nette:'ch_du_p1_entrer_dom', couteuse:'ch_du_p1_entrer_cout',
               echec:'ch_du_p1_entrer_ko', catastrophe:'ch_du_p1_entrer_ko' } },

    { t:"Le pousser vers la craie",
      detail:"Agilité · escrime — un pied qui sort une fois se dit à voix haute",
      risque:"calculé",
      test:{ carac:'agilite', comp:'epees', dc:12, adversaire:'sault', manoeuvre:'craie' },
      degres:{ dominante:'ch_du_p1_craie_dom', nette:'ch_du_p1_craie_ok', couteuse:'ch_du_p1_craie_ok',
               echec:'ch_du_p1_craie_ko', catastrophe:'ch_du_p1_craie_ko' } },
  ],
},

ch_du_p1_lire_dom:{
  melee:true, qui:'sault',
  titre:"Ce qu'il fait toujours",
  texte:[
    "Vous le laissez venir et vous ne faites rien d'autre pendant quarante secondes, ce qui, dans un rond de neuf pas devant onze personnes, demande davantage que d'attaquer.",
    { sobre:"Il fait trois fois la même chose.",
      intense:"Il fait trois fois la même chose et il la fait très bien : deux appels du pied avant, une pointe haute qui ne va nulle part, et le vrai coup qui part en dessous pendant que vos yeux sont restés en haut.",
      extreme:"Il fait trois fois exactement la même chose, et il la fait de manière irréprochable.\n\nDeux appels du pied avant — pas des feintes, des appels : il déplace réellement son poids, ce qui coûte de l'énergie et ce qui est la raison pour laquelle personne ne les prend pour des feintes. Puis une pointe haute, à hauteur de gorge, qui ne va nulle part et qui n'a jamais eu l'intention d'aller quelque part. Et le vrai coup part en dessous, au ventre, pendant que vos yeux sont restés à la hauteur de la gorge.\n\nTrois fois. Rigoureusement identique les trois fois. Cet homme a battu trente-huit adversaires avec un seul enchaînement." },
    "§ Un homme qui gagne toujours n'a besoin que d'une chose qui marche. C'est sa force et c'est le seul défaut qu'il ait.",
    "Vous encaissez le troisième sur le plat de la lame, exprès, et vous le laissez voir que vous l'avez encaissé exprès.",
    { sobre:"Il s'arrête. Il lève deux doigts.",
      intense:"Il s'arrête net. Il lève deux doigts vers le mur du fournil — un temps — et il vous regarde d'une façon complètement différente de celle des quarante dernières secondes.\n\n« Vous l'avez vu. »",
      extreme:"Il s'arrête net, au milieu d'un déplacement, ce qui ne se fait pas et ce qui coûte l'équilibre à n'importe qui d'autre.\n\nIl lève deux doigts vers le mur du fournil. Un temps. Les onze le voient et ne comprennent pas pourquoi il le prend, parce que du mur du fournil il n'a rien encaissé du tout.\n\nPuis il vous regarde, et c'est un regard entièrement différent de celui des quarante dernières secondes.\n\n« Vous l'avez vu. » Ce n'est pas une question. « En trois passes. »\n\n« En trois passes. »\n\n« Deux hommes sur trente-huit. » Il a l'air, très franchement, content. « Bien. Alors ça va être une bonne ligne. »" },
  ],
  effets:{ flags:['ch_du_lu'], cout:{ endurance:8 },
           meleeMaj:{ position:"dans le rond, sa main lue", note:"Il a pris un temps · deux sur trente-huit" },
           exploit:{ eclat:3, temoins:'quelques', quoi:"vous avez lu sa main en trois passes" },
           marque:"Il ne sait faire qu'une chose, et il la fait parfaitement. Vous l'avez vue en trois passes.",
           court:"Sa main" },
  suite:'ch_du_p2', libelleSuite:"Le deuxième temps" },

ch_du_p1_lire_ok:{
  melee:true, qui:'sault',
  titre:"En dessous",
  texte:[
    "Vous le laissez venir. Il vient bien.",
    { sobre:"Le vrai coup part en dessous. Vous le comprenez en le prenant.",
      intense:"Deux appels du pied avant, une pointe haute qui ne va nulle part, et le vrai coup en dessous — vous le comprenez au moment exact où vous le prenez, ce qui est la façon la plus chère d'apprendre quelque chose et la plus sûre.",
      extreme:"Deux appels du pied avant, une pointe haute à hauteur de gorge, et le vrai coup en dessous.\n\nVous le comprenez très précisément au moment où il entre : à cet instant, en même temps, vous savez ce qu'il fait, vous savez qu'il l'a déjà fait trente-huit fois, et vous savez que vous ne l'éviterez pas cette fois-ci.\n\nC'est la façon la plus chère d'apprendre quelque chose. C'est aussi la seule qui ne s'oublie pas." },
    "La pointe entre de quatre pouces au-dessus de la hanche gauche et ressort. C'est propre, c'est mesuré, et ça n'était pas fait pour tuer.",
    "Il recule d'un pas et attend, ce que la règle n'exige absolument pas.",
  ],
  effets:{ flags:['ch_du_lu'], cout:{ endurance:10, vitalite:12, sang:8 },
           meleeMaj:{ position:"dans le rond, ouvert au flanc", note:"Vous savez ce qu'il fait · vous l'avez payé" },
           faire:() => blesser({ id:'ch_du_flanc', zone:"flanc gauche", type:"perforation nette",
                                 gravite:2, douleur:2, saignement:2, fonction:['endurance'],
                                 cicatrice:"une entrée et une sortie au-dessus de la hanche gauche" }),
           marque:"Deux appels, une pointe haute, le vrai coup en dessous. Vous l'avez appris en le prenant.",
           court:"En dessous" },
  suite:'ch_du_p2', libelleSuite:"Le deuxième temps" },

ch_du_p1_lire_ko:{
  melee:true, qui:'sault',
  titre:"Quarante secondes",
  texte:[
    "Vous le laissez venir et vous ne voyez rien du tout, parce qu'il n'y a rien à voir tant qu'on ne sait pas où regarder.",
    { sobre:"Quarante secondes, et vous avez trois marques et aucune idée.",
      intense:"Quarante secondes plus tard vous portez trois marques — l'avant-bras, la cuisse, le haut du bras — et vous n'avez pas la moindre idée de ce qu'il fait. Les trois sont superficielles. Les trois sont au même endroit à un pouce près, ce qui n'est pas de la chance.",
      extreme:"Quarante secondes plus tard vous portez trois marques : l'avant-bras droit, la cuisse gauche, le haut du bras droit.\n\nLes trois sont superficielles. Aucune ne compte, aucune ne saigne vraiment, et c'est délibéré — cet homme place ses pointes là où il veut, et il veut vous marquer sans vous abîmer.\n\nEt les trois sont au même endroit à un pouce près par rapport à votre garde, ce qui n'est pas de la chance : il vous a montré trois fois la même chose et vous ne l'avez pas vue trois fois." },
    "« Vous regardez ma pointe », dit-il, sans méchanceté et sans s'arrêter. « Tout le monde regarde ma pointe. »",
  ],
  effets:{ cout:{ endurance:14, vitalite:10, sang:4 },
           meleeMaj:{ position:"dans le rond, trois marques", note:"Vous regardez sa pointe" },
           marque:"« Vous regardez ma pointe. Tout le monde regarde ma pointe. »", court:"Sa pointe" },
  suite:'ch_du_p2', libelleSuite:"Le deuxième temps" },

ch_du_p1_entrer_dom:{
  melee:true, qui:'sault',
  titre:"Personne n'entre au premier passage",
  texte:[
    "Vous entrez dedans à la première seconde. Personne n'entre au premier passage : on se tourne autour, on mesure, on essaie deux ou trois choses. C'est ce que trente-huit hommes ont fait.",
    { sobre:"Il n'a pas de réponse pour ça.",
      intense:"Il n'a pas de réponse pour ça, et ça se voit immédiatement — pas de la peur, pas de la panique : une hésitation d'un quart de seconde d'un homme excellent à qui l'on pose une question qui n'est pas dans le livre.",
      extreme:"Il n'a aucune réponse préparée pour ça, et ça se voit dans le quart de seconde qui suit.\n\nCe n'est pas de la peur et ce n'est surtout pas de la panique : c'est l'hésitation très brève d'un homme excellent à qui l'on pose une question qui ne figure pas dans le livre qu'il a appris. Il connaît quatorze réponses à quatorze ouvertures et celle-ci n'est aucune des quatorze, parce qu'aucun homme raisonnable ne l'emploie.\n\nVous n'êtes pas raisonnable. Vous avez tué votre premier homme à dix-neuf ans dans une cour de ferme, avec une hache de bûcheron, et personne ne vous a jamais appris quatorze réponses." },
    "Vous êtes contre lui, garde contre garde, à un demi-pas — un endroit où une épée de duel ne vaut plus rien du tout et où l'avant-bras vaut tout.",
    { sobre:"Vous le mettez au sol de l'épaule.",
      intense:"Vous le mettez au sol de l'épaule, comme on couche une porte, et son épée part à quatre pas dans la terre battue. Il tombe correctement — il sait tomber — mais il tombe.",
      extreme:"Vous le mettez au sol de l'épaule, comme on couche une porte, avec tout le poids et sans aucune élégance.\n\nSon épée part à quatre pas et se plante à moitié dans la terre battue. Il tombe correctement, sur le côté, en dégageant le bras : c'est encore parfait, il sait tomber, on lui a appris à tomber.\n\nMais il est au sol, dans un rond de neuf pas, à la lanterne, devant onze personnes, et sa lame est à quatre pas.\n\nLe silence contre le mur du fournil dure environ trois secondes." },
    "§ Il ne cède pas. Il ne dit rien. Il vous regarde depuis le sol et il attend de savoir ce que vous êtes.",
  ],
  effets:{ flags:['ch_du_avantage','ch_du_au_sol'], cout:{ endurance:16 },
           meleeMaj:{ position:"debout au-dessus de lui", note:"Son épée est à quatre pas" },
           exploit:{ eclat:5, temoins:'quelques',
                     quoi:"vous avez mis un duelliste de cour au sol au premier passage" },
           marque:"Vous êtes entré dedans à la première seconde. Il n'avait pas de réponse.",
           court:"Au premier passage" },
  suite:'ch_du_p2', libelleSuite:"Ce que vous en faites" },

ch_du_p1_entrer_cout:{
  melee:true, qui:'sault',
  titre:"À un demi-pas",
  texte:[
    "Vous entrez dedans et vous arrivez au contact, ce qui était le but. Vous y arrivez avec sa pointe dans l'épaule, ce qui ne l'était pas.",
    { sobre:"Il vous a piqué en reculant. Ça ne l'a pas empêché de reculer.",
      intense:"Il vous pique en reculant — l'épaule droite, dans le muscle, sans profondeur — et ce qui est remarquable c'est que ça ne l'empêche absolument pas de reculer proprement en même temps. Deux choses à la fois, sous pression, sans en rater aucune.",
      extreme:"Il vous pique en reculant. L'épaule droite, dans le muscle, sans profondeur et sans chercher à en mettre.\n\nCe qui est remarquable n'est pas la pointe : c'est que ça ne l'empêche pas une seconde de reculer proprement dans le même temps, pied arrière, garde tenue, distance rétablie. Deux choses à la fois, sous pression, sans en rater aucune, à trente-six ans.\n\nOn ne fait pas ça sans onze ans de carnet." },
    "Vous arrivez quand même au contact. Il n'aime pas ça et ça se voit, mais vous y arrivez avec un bras qui ne remontera pas au-dessus de l'horizontale pendant trois semaines.",
  ],
  effets:{ flags:['ch_du_contact'], cout:{ endurance:18, vitalite:10, sang:6 },
           meleeMaj:{ position:"au contact, épaule ouverte", note:"Il n'aime pas le contact" },
           faire:() => blesser({ id:'ch_du_epaule', zone:"épaule droite", type:"pointe dans le muscle",
                                 gravite:2, douleur:2, saignement:1, fonction:['epees','force'],
                                 cicatrice:"un point blanc dans le deltoïde droit" }),
           marque:"Vous êtes entré dedans. Il vous a piqué l'épaule en reculant proprement.",
           court:"Au contact" },
  suite:'ch_du_p2', libelleSuite:"Le deuxième temps" },

ch_du_p1_entrer_ko:{
  melee:true, qui:'sault',
  titre:"C'est pour ça que personne n'entre",
  texte:[
    "Vous entrez dedans à la première seconde, et vous découvrez pourquoi personne ne le fait.",
    { sobre:"Il n'était pas là. Il n'y était déjà plus quand vous avez décidé d'y aller.",
      intense:"Il n'est pas là. Il n'y était déjà plus au moment où vous avez décidé d'y aller : un homme qui a fait ça trente-huit fois voit une entrée se préparer dans les épaules, pas dans les pieds, et vos épaules ont parlé une demi-seconde avant vos pieds.",
      extreme:"Il n'est pas là.\n\nIl n'y était déjà plus au moment précis où vous avez décidé d'y aller, et c'est ça, la vraie leçon de la soirée : un homme qui a fait ça trente-huit fois ne regarde pas les pieds. Il regarde les épaules. Les épaules parlent une demi-seconde avant les pieds, toujours, chez tout le monde, et personne ne peut rien y faire.\n\nVous traversez neuf pas de rond en pleine charge contre un homme qui n'y est plus, avec toute votre masse engagée vers l'avant et rien devant pour l'arrêter.\n\nIl vous accompagne. C'est le mot juste : il ne vous frappe pas, il pose sa garde contre votre nuque en passant et il ajoute un peu de son poids au vôtre." },
    { sobre:"Vous sortez du rond. Les deux pieds.",
      intense:"Vous sortez du rond. Les deux pieds, franchement, à un pas et demi de la craie, à plat ventre.\n\n« Un », dit Guillaume de Sault, sans lever la voix.",
      extreme:"Vous sortez du rond. Les deux pieds, franchement, à un pas et demi au-delà de la craie, à plat ventre dans la terre battue de la cour.\n\nOnze personnes ne disent rien du tout contre le mur du fournil.\n\n« Un », dit Guillaume de Sault, sans lever la voix, du ton d'un homme qui tient un compte.\n\nIl n'y a aucun mépris là-dedans. C'est même le pire : il l'a annoncé exactement comme il l'aurait annoncé pour lui-même." },
    "§ Le pied qui sort une fois, on le dit. Deux fois, on a perdu. C'est la règle et il vient de vous l'appliquer.",
  ],
  effets:{ flags:['ch_du_sorti_un'], cout:{ endurance:20, vitalite:6, moral:6 },
           meleeMaj:{ position:"rentrant dans le rond", note:"Un pied sorti · le second est le dernier" },
           marque:"Vous êtes sorti du rond au premier passage. Il a dit « Un ».", court:"« Un »" },
  suite:'ch_du_p2', libelleSuite:"Le deuxième temps" },

ch_du_p1_craie_dom:{
  melee:true, qui:'sault',
  titre:"La craie",
  texte:[
    "Vous ne le regardez pas, lui. Vous regardez la craie.",
    { sobre:"Un rond de neuf pas est petit. Il faut trois passes pour s'en apercevoir.",
      intense:"Un rond de neuf pas est très petit, et personne ne s'en aperçoit avant la troisième passe : on entre dedans en pensant à l'homme et on met deux minutes à comprendre qu'on est enfermé avec lui dans quelque chose de la taille d'une grande table.",
      extreme:"Un rond de neuf pas est extrêmement petit, et personne ne s'en aperçoit avant la troisième passe.\n\nOn y entre en pensant à l'homme d'en face, on tourne, on mesure, on essaie deux choses — et il faut deux minutes pour comprendre qu'on est enfermé avec lui dans quelque chose qui fait la taille d'une grande table, et que la moitié des déplacements dont on dispose ailleurs n'existent tout simplement pas ici.\n\nLui le sait depuis onze ans. Il l'utilise. Il pousse ses adversaires vers la craie sans qu'ils s'en rendent compte, et ils passent le duel à se défendre le dos à un bord qu'ils n'ont jamais regardé." },
    "Alors vous le faites en premier. Trois déplacements courts, jamais une attaque, et à la quatrième passe c'est lui qui a la craie à un demi-pas du talon.",
    { sobre:"Il lève deux doigts. Un temps.",
      intense:"Il lève deux doigts. Un temps — le premier de la soirée, et il ne l'a pas pris parce qu'il est touché, puisqu'il ne l'est pas.\n\n« Vous avez fait ça où ? »",
      extreme:"Il lève deux doigts. Un temps.\n\nC'est le premier de la soirée et il ne l'a pas pris parce qu'il est touché : il n'a pas une marque. Il l'a pris parce qu'il vient de se découvrir le talon à un demi-pas de la craie et qu'il ne sait pas comment il y est arrivé.\n\n« Vous avez fait ça où ? »\n\n« Nulle part. »\n\n« Non », dit-il. Et il regarde le rond, puis vous, puis le rond. « Non, ça ne s'apprend pas nulle part. On l'a ou on ne l'a pas, et sur trente-huit, deux l'avaient. »" },
  ],
  effets:{ flags:['ch_du_craie'], cout:{ endurance:12 },
           meleeMaj:{ position:"au centre, lui contre la craie", note:"Il a pris un temps sans être touché" },
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez poussé un duelliste de cour vers la craie" },
           marque:"Vous avez joué le rond au lieu de l'homme. Il a pris un temps sans être touché.",
           court:"La craie" },
  suite:'ch_du_p2', libelleSuite:"Le deuxième temps" },

ch_du_p1_craie_ok:{
  melee:true, qui:'sault',
  titre:"Neuf pas, c'est petit",
  texte:[
    "Vous jouez le rond au lieu de jouer l'homme, et ça marche à moitié : vous ne le mettez pas contre la craie, mais vous cessez d'y être vous-même, ce qui est déjà la moitié du problème.",
    "Il s'en aperçoit. Ça se voit à une chose : il cesse d'avancer en ligne et il se met à tourner, ce qu'il ne faisait pas.",
    "« Bien », dit-il, du ton dont on corrige un exercice.",
  ],
  effets:{ flags:['ch_du_craie'], cout:{ endurance:12 },
           meleeMaj:{ position:"au centre du rond", note:"Il a cessé d'avancer en ligne" },
           marque:"Vous avez cessé d'être celui qui recule.", court:"Le centre" },
  suite:'ch_du_p2', libelleSuite:"Le deuxième temps" },

ch_du_p1_craie_ko:{
  melee:true, qui:'sault',
  titre:"Il l'a fait avant vous",
  texte:[
    "Vous entreprenez de le pousser vers la craie et vous vous apercevez, au quatrième déplacement, que c'est lui qui vous y met depuis le début.",
    { sobre:"Vous avez la craie sous le talon droit.",
      intense:"Vous avez la craie sous le talon droit et vous ne l'avez pas vue arriver. Il ne vous a pas poussé : il a simplement occupé, à chaque déplacement, la moitié du rond que vous alliez prendre.",
      extreme:"Vous avez la craie sous le talon droit et vous ne l'avez pas vue arriver une seule seconde.\n\nIl ne vous a pas poussé. Il n'a pas chargé, il n'a pas pressé, il n'a rien fait qu'on puisse montrer du doigt : à chacun de vos quatre déplacements, il a simplement occupé, avant vous, la moitié du rond vers laquelle vous alliez.\n\nC'est le même travail que celui que vous croyiez faire, sauf qu'il a onze ans d'avance et que le rond est le seul endroit au monde où il sait tout." },
    "Vous rentrez d'un pas. Vous n'avez pas sorti le pied, ce qui, sur ce déplacement-là, tient de la chance et vous le savez.",
  ],
  effets:{ cout:{ endurance:14, moral:3 },
           meleeMaj:{ position:"le talon sur la craie", note:"C'est lui qui vous y a mis" },
           marque:"Vous vouliez le pousser vers la craie. Il vous y avait mis depuis quatre déplacements.",
           court:"Le talon" },
  suite:'ch_du_p2', libelleSuite:"Le deuxième temps" },

/* ── Le deuxième temps ──────────────────────────────────────────────────── */
ch_du_p2:{
  melee:true, qui:'sault',
  lieu:"La cour · le rond",
  titre:"Ce que ça devient",
  texte:[
    () => a('ch_du_au_sol')
      ? "Il est au sol, son épée est à quatre pas, et onze personnes attendent de savoir ce que vous êtes. C'est la seule question de la soirée et elle n'a rien à voir avec l'escrime."
      : a('ch_du_lu')
      ? "Vous savez ce qu'il fait. Il sait que vous le savez. Cela change entièrement la nature du rond : à partir de maintenant, l'un des deux doit inventer quelque chose."
      : a('ch_du_sorti_un')
      ? "Un pied sorti. Le second est le dernier, et il le sait, et vous savez qu'il le sait — ce qui veut dire qu'à partir de maintenant il va travailler la craie et rien d'autre."
      : "Deux minutes, trois marques, aucune décision. C'est très exactement le point du duel où trente-huit hommes ont commencé à faire des fautes.",
    { sobre:"Un duel se décide ici. Pas au premier passage, pas au dernier.",
      intense:"Un duel se décide ici et pas ailleurs. Pas au premier passage, où l'on ne sait rien ; pas au dernier, où tout est déjà fait. Au deuxième, quand on sait juste assez pour se tromper avec conviction.",
      extreme:"Un duel se décide ici et nulle part ailleurs.\n\nPas au premier passage : personne ne sait rien, on se regarde. Pas au dernier : tout est déjà fait, on l'exécute. C'est au deuxième que ça se joue, quand chacun sait juste assez pour se tromper avec une conviction totale, et quand le corps a commencé à coûter sans être encore en dette.\n\nOnze personnes contre le mur du fournil ne savent rien de tout ça. Elles regardent deux hommes tourner." },
  ],
  choix:[
    { t:"Lui rendre son épée",
      detail:"Il est au sol · lui rendre est une insulte ou un cadeau, et il choisira lui-même",
      si:() => a('ch_du_au_sol'),
      risque:"calculé", va:'ch_du_rendre' },

    { t:"Lui demander de céder",
      detail:"Présence · commandement — il n'a jamais cédé et il tient un carnet",
      si:() => a('ch_du_au_sol') || a('ch_du_craie'),
      risque:"calculé",
      test:{ carac:'presence', comp:'commandement', dc:12, adversaire:'sault', manoeuvre:'ceder',
             situation:() => a('ch_du_au_sol') ? 3 : 0 },
      degres:{ dominante:'ch_du_cede', nette:'ch_du_cede', couteuse:'ch_du_cede_cout',
               echec:'ch_du_cede_ko', catastrophe:'ch_du_cede_ko' } },

    { t:"Lui servir sa propre chose",
      detail:"Deux appels, une pointe haute, le vrai coup en dessous · il ne l'a jamais reçue",
      si:() => a('ch_du_lu'),
      risque:"favorable",
      test:{ carac:'agilite', comp:'epees', dc:11, adversaire:'sault', manoeuvre:'miroir', situation:3 },
      degres:{ dominante:'ch_du_miroir_dom', nette:'ch_du_miroir_dom', couteuse:'ch_du_miroir_cout',
               echec:'ch_du_miroir_ko', catastrophe:'ch_du_miroir_ko' } },

    { t:"Finir sur la craie",
      detail:"Agilité · escrime — un pied dehors deux fois, et c'est réglé sans une goutte",
      risque:"calculé",
      test:{ carac:'agilite', comp:'epees', dc:13, adversaire:'sault', manoeuvre:'craie',
             situation:() => a('ch_du_craie') ? 3 : 0 },
      degres:{ dominante:'ch_du_craie_fin', nette:'ch_du_craie_fin', couteuse:'ch_du_craie_fin_cout',
               echec:'ch_du_p2_ko', catastrophe:'ch_du_p2_ko' } },

    { t:"Le prendre franchement",
      detail:"Force · épées — il a trente-six ans et il n'encaisse jamais rien",
      risque:"risqué",
      test:{ carac:'force', comp:'epees', dc:13, adversaire:'sault', manoeuvre:'franc',
             cout:{ endurance:14 } },
      degres:{ dominante:'ch_du_franc_dom', nette:'ch_du_franc_dom', couteuse:'ch_du_franc_cout',
               echec:'ch_du_p2_ko', catastrophe:'ch_du_p2_ko' } },
  ],
},

ch_du_rendre:{
  melee:true, qui:'sault',
  titre:"Quatre pas",
  texte:[
    "Vous allez chercher son épée, vous la dégagez de la terre battue, et vous la lui tendez par la lame.",
    { sobre:"Il met un temps très long à la prendre.",
      intense:"Il met un temps très long à la prendre. Assez long pour que les onze, contre le mur, cessent complètement de bouger.",
      extreme:"Il met un temps très long à la prendre. Assez long pour que les onze personnes contre le mur du fournil cessent complètement de bouger, et pour qu'on entende le cheval de quelqu'un souffler dans l'écurie.\n\nParce qu'il est en train de faire un calcul et que le calcul est désagréable : rendre une épée à un homme qu'on a désarmé peut vouloir dire deux choses exactement opposées, et il n'y a aucun moyen au monde de savoir laquelle, sauf en regardant celui qui la rend.\n\nIl regarde. Il ne trouve pas." },
    "« Pourquoi ? »",
    "@« Parce que trois lignes valent mieux qu'une. »",
    { sobre:"Il comprend. Ça ne lui plaît pas et il comprend.",
      intense:"Il comprend en une seconde et demie, et ça ne lui plaît pas du tout. Un homme au sol, c'est une ligne : *désarmé à la première passe*. Un homme qui reprend son épée, c'est un duel — et un duel, dans son carnet, ça s'écrit en trois lignes.\n\nVous ne lui rendez pas son épée. Vous lui rendez sa page.",
      extreme:"Il comprend en une seconde et demie, et ça ne lui plaît pas une seconde.\n\nUn homme au sol, c'est une ligne dans un carnet : *désarmé à la première passe, n'a pas eu de second passage*. C'est tout ce qu'il aurait. Onze ans de travail pour une ligne de neuf mots.\n\nUn homme qui reprend son épée et qui perd au troisième temps, c'est un duel, et un duel s'écrit en trois lignes.\n\nVous ne lui rendez pas son épée : vous lui rendez sa page. Et il ne peut pas refuser, parce que refuser reviendrait à admettre devant onze personnes que la page compte plus que le rond.\n\n« Vous êtes désagréable », dit-il enfin, en la prenant. Et pour la première fois il sourit, et le sourire est vrai. »" },
    "§ Il se relève. Il salue de nouveau, du même salut de cour parfait, et cette fois il le fait plus lentement.",
    "Le second passage est autre chose que le premier. Il n'est plus en train de vous collectionner : il est en train de se battre, ce qu'il n'avait pas fait depuis quatre ans.",
  ],
  effets:{ flags:['ch_du_rendue','ch_du_respect'], cout:{ endurance:6 },
           meleeMaj:{ position:"face à face, à neuf pas", note:"Il se bat pour de bon maintenant" },
           exploit:{ eclat:6, temoins:'quelques',
                     quoi:"vous avez rendu son épée à un homme que vous aviez désarmé, devant onze témoins" },
           marque:"Vous lui avez rendu son épée. Ce n'était pas de la clémence : c'était sa page.",
           court:"Son épée" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

ch_du_miroir_dom:{
  melee:true, qui:'sault',
  titre:"Sa propre chose",
  texte:[
    "Deux appels du pied avant. Une pointe haute qui ne va nulle part. Et le vrai coup en dessous.",
    { sobre:"Il ne l'a jamais reçue. Personne ne la lui a jamais faite.",
      intense:"Il ne l'a jamais reçue. C'est mathématique : c'est sa chose, il l'a faite trente-huit fois, et pas un des trente-huit n'a jamais eu le temps ni l'idée de la lui rendre.",
      extreme:"Il ne l'a jamais reçue. Pas une seule fois en onze ans, et c'est parfaitement logique : c'est **sa** chose. Il l'a servie trente-huit fois. Aucun des trente-huit n'a jamais eu simultanément le temps de la comprendre, la mémoire de la retenir et la main pour la refaire dans le même quart d'heure.\n\nEt il y a une raison pour laquelle il n'a jamais eu à la parer : un homme ne connaît pas ses propres angles morts. Il sait ce que sa pointe haute cache parce qu'il la fait ; il n'a jamais eu à découvrir ce qu'elle cache en la regardant venir.\n\nIl regarde en haut. Comme tout le monde. Comme les trente-huit." },
    "Votre pointe entre dans le haut de la cuisse gauche, exactement là où il place les siennes, et vous la retirez tout de suite parce que ce n'est pas ce genre de soirée.",
    { sobre:"Il regarde sa jambe. Puis il rit — une fois, très court.",
      intense:"Il baisse les yeux sur sa jambe. Puis il rit : une fois, très court, sans aucune amertume, le rire d'un homme à qui l'on vient de démontrer quelque chose qu'il aurait dû trouver tout seul depuis onze ans.\n\n« Ah », dit-il. C'est tout ce qu'il trouve.",
      extreme:"Il baisse les yeux sur sa jambe, où le sang commence à faire ce que le sang fait sur du gris clair.\n\nPuis il rit. Une fois, très court, sans une once d'amertume : le rire exact d'un homme à qui l'on vient de démontrer en trois secondes une chose qu'il aurait dû trouver tout seul en onze ans.\n\n« Ah », dit-il.\n\nC'est tout ce qu'il trouve, et de la part de cet homme-là c'est un discours." },
  ],
  effets:{ flags:['ch_du_miroir'], cout:{ endurance:10 },
           meleeMaj:{ position:"dans le rond, dominant", note:"Il a pris sa propre chose" },
           exploit:{ eclat:6, temoins:'quelques',
                     quoi:"vous avez servi à un duelliste de cour son propre enchaînement" },
           marque:"Vous lui avez servi sa propre chose. Il ne l'avait jamais reçue.",
           court:"Sa propre chose" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

ch_du_miroir_cout:{
  melee:true, qui:'sault',
  titre:"Presque",
  texte:[
    "Deux appels, une pointe haute, le vrai coup en dessous — et il n'est pas là au moment où le coup arrive en dessous.",
    { sobre:"Il l'a reconnue. Il ne l'a pas parée : il l'a reconnue.",
      intense:"Il l'a reconnue. C'est différent de l'avoir parée, et c'est bien pire : il a entendu ses propres appels du pied dans les vôtres, et un homme qui reconnaît sa propre musique n'a même pas besoin d'écouter la suite.",
      extreme:"Il l'a reconnue, et c'est tout à fait différent de l'avoir parée.\n\nIl a entendu ses propres appels du pied dans les vôtres — pas la forme, le **rythme**, cette chose que personne ne peut copier correctement du premier coup — et un homme qui reconnaît sa propre musique n'a pas besoin d'écouter la suite pour savoir où elle va.\n\nIl n'était plus là. Et pendant que vous étiez engagé en bas, il a pris le seul endroit qui restait." },
    "Vous vous rattrapez de justesse et vous le payez d'une entaille au-dessus de l'oreille droite, qui saigne comme saignent toutes les blessures de tête, c'est-à-dire de manière absurde.",
    "« Bien essayé », dit-il, et ce n'est pas de l'ironie, ce qui est encore plus vexant.",
  ],
  effets:{ cout:{ endurance:14, vitalite:8, sang:10 },
           meleeMaj:{ position:"dans le rond, le sang dans l'œil", note:"Il a reconnu son propre rythme" },
           faire:() => blesser({ id:'ch_du_tempe', zone:"au-dessus de l'oreille droite", type:"entaille qui saigne",
                                 gravite:1, douleur:1, saignement:3, fonction:['perception'],
                                 cicatrice:"une ligne blanche dans les cheveux, au-dessus de l'oreille droite" }),
           marque:"Il a reconnu son propre rythme dans le vôtre.", court:"Bien essayé" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

ch_du_miroir_ko:{
  melee:true, qui:'sault',
  titre:"On ne copie pas une main",
  texte:[
    "Vous refaites ce qu'il fait et vous découvrez, au milieu du geste, qu'on ne refait pas la main d'un autre homme après l'avoir vue trois fois.",
    { sobre:"Vos appels sont trop lents. Le reste s'écroule dessus.",
      intense:"Vos appels du pied sont trop lents d'un tiers. Tout le reste s'écroule là-dessus : la pointe haute arrive quand il a déjà lu les pieds, et le vrai coup en dessous arrive contre une garde qui l'attend depuis une demi-seconde.",
      extreme:"Vos appels du pied sont trop lents d'environ un tiers, et il n'y a rien de récupérable après ça.\n\nToute la construction s'écroule sur ce défaut-là : la pointe haute arrive alors qu'il a déjà fini de lire les pieds, et le vrai coup en dessous vient buter dans une garde qui l'attendait depuis une demi-seconde entière.\n\nUne demi-seconde. C'est la différence entre onze ans et trois passes, et il n'y a aucun moyen de la combler ce soir." },
    "Il vous marque au ventre, à plat, avec le côté de la lame — ce qui est une gifle et ce qui est fait pour l'être.",
  ],
  effets:{ cout:{ endurance:16, vitalite:6, moral:6 },
           meleeMaj:{ position:"dans le rond, giflé du plat", note:"On ne copie pas une main" },
           marque:"Vous avez copié sa main. Trois passes ne valent pas onze ans.", court:"Trop lent" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

ch_du_franc_dom:{
  melee:true, qui:'sault',
  titre:"Il n'encaisse jamais rien",
  texte:[
    "Vous le prenez franchement. Pas de finesse, pas d'angle : de la ligne, du poids, et une épée bâtarde contre une épée de duel.",
    { sobre:"C'est la seule chose contre laquelle il n'a rien.",
      intense:"C'est la seule chose contre laquelle il n'a rien du tout. Un duelliste de cour ne pare pas une bâtarde à deux mains : il l'évite, il la détourne, il la fait passer — et pour faire passer quelque chose il faut de la place, et il y a neuf pas.",
      extreme:"C'est très exactement la seule chose contre laquelle il n'a rien du tout, et il le sait avant vous.\n\nUn duelliste de cour ne pare pas une bâtarde tenue à deux mains. Ça ne se pare pas : le rapport de masse est absurde, et une épée de duel qui prend un coup de bâtarde en pleine lame part de la main ou casse. Il ne peut que l'éviter, la détourner, la faire passer à côté.\n\nEt pour faire passer quelque chose, il faut de la place.\n\nIl y a neuf pas." },
    "Au troisième coup, sa garde cède. Pas sa main : sa garde. Il se retrouve à parer avec le fort de la lame contre un mur qui descend, et ce genre de parade s'appelle un aveu.",
    "Il recule jusqu'à la craie. Il lève deux doigts. Deuxième temps.",
  ],
  effets:{ flags:['ch_du_avantage'], cout:{ endurance:20, vitalite:4 },
           meleeMaj:{ position:"debout au centre, lui à la craie", note:"Sa garde a cédé au troisième coup" },
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous avez cassé la garde d'un duelliste de cour au poids" },
           marque:"Vous l'avez pris au poids. Une épée de duel ne pare pas une bâtarde.",
           court:"Au poids" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

ch_du_franc_cout:{
  melee:true, qui:'sault',
  titre:"Le prix du poids",
  texte:[
    "Vous le prenez franchement et il fait la seule chose qu'un homme plus rapide et plus léger doit faire : il ne pare rien du tout.",
    { sobre:"Il vous laisse arriver et il pique où le mouvement l'ouvre.",
      intense:"Il vous laisse arriver et il pique là où un coup de bâtarde ouvre nécessairement un homme : sous l'aisselle droite, dans la seconde où le bras part. Ce n'est pas une parade, c'est de la géométrie, et la géométrie ne se trompe pas.",
      extreme:"Il vous laisse arriver. Il ne pare rien, il ne recule pas, il ne fait rien de ce qu'un homme normal fait quand quatre livres et demie de fer descendent sur lui.\n\nIl pique là où un coup de bâtarde ouvre nécessairement l'homme qui le donne : sous l'aisselle droite, dans la seconde exacte où le bras part et où le flanc n'est plus couvert par rien du tout.\n\nCe n'est pas de l'escrime. C'est de la géométrie, et la géométrie ne se trompe jamais : quiconque frappe de haut avec les deux mains s'ouvre là, toujours, sans exception, y compris les meilleurs.\n\nVotre coup arrive quand même. Le sien est arrivé avant." },
    "Vous touchez, lui aussi. Le sien est mieux placé et il le sait, et il prend un temps pour vous laisser regarder ce que ça saigne.",
  ],
  effets:{ cout:{ endurance:22, vitalite:16, sang:14 },
           meleeMaj:{ position:"au centre, l'aisselle ouverte", note:"Vous avez touché · lui mieux" },
           faire:() => blesser({ id:'ch_du_aisselle', zone:"sous l'aisselle droite", type:"pointe profonde",
                                 gravite:3, douleur:2, saignement:3, fonction:['epees','force'],
                                 cicatrice:"un point profond sous l'aisselle droite" }),
           marque:"Une bâtarde ouvre celui qui la lève. Il le savait depuis onze ans.",
           court:"Sous l'aisselle" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

ch_du_p2_ko:{
  melee:true, qui:'sault',
  titre:"Trente-six ans",
  texte:[
    "Le deuxième passage tourne mal et il tourne mal de la façon la plus banale du monde : il est meilleur que vous à ce jeu-là, et ce jeu-là est le seul auquel il joue depuis onze ans.",
    { sobre:"Trois pointes en quarante secondes. Aucune n'est grave. Toutes comptent.",
      intense:"Trois pointes en quarante secondes. Aucune n'est grave — il ne veut pas de mort, il l'a dit et il tient parole — et toutes les trois comptent, parce que trois pointes veulent dire trois fois où vous n'étiez pas là où il fallait.",
      extreme:"Trois pointes en quarante secondes : l'épaule, la hanche, l'avant-bras.\n\nAucune n'est grave. Il ne veut pas de mort, il l'a dit dans la salle, et cet homme tient parole avec la même exactitude qu'il tient son carnet. Il aurait pu placer les trois ailleurs et vous seriez en train de mourir sur la terre battue d'une cour de relais.\n\nEt toutes les trois comptent absolument, parce que trois pointes veulent dire trois fois où vous n'étiez pas où il fallait, devant onze personnes qui n'y connaissent rien et qui savent compter jusqu'à trois." },
    "Vous prenez un temps. C'est le premier, et le lever coûte quelque chose que personne dans cette cour ne peut mesurer.",
  ],
  effets:{ flags:['ch_du_temps_pris'], cout:{ endurance:24, vitalite:14, sang:8, moral:4 },
           meleeMaj:{ position:"deux doigts levés", note:"Vous avez pris un temps · il n'en a pris aucun" },
           faire:() => blesser({ id:'ch_du_hanche', zone:"hanche gauche", type:"trois pointes",
                                 gravite:2, douleur:2, saignement:2, fonction:['agilite'],
                                 cicatrice:"trois points blancs alignés sur la hanche gauche" }),
           marque:"Trois pointes en quarante secondes. Vous avez pris le premier temps.",
           court:"Trois pointes" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

/* ── Céder ──────────────────────────────────────────────────────────────── */
ch_du_cede:{
  melee:true, qui:'sault',
  titre:"Cédez",
  texte:[
    "@« Cédez. »",
    { sobre:"Il ne bouge pas. Onze personnes ne bougent pas non plus.",
      intense:"Il ne bouge pas. Les onze, contre le mur du fournil, ne bougent pas davantage : personne dans cette cour n'a jamais entendu demander ça à quelqu'un, parce que ça ne se demande pas — on cède ou on ne cède pas, et celui d'en face n'a pas voix au chapitre.",
      extreme:"Il ne bouge pas d'un pouce. Les onze personnes contre le mur du fournil ne bougent pas davantage.\n\nPersonne dans cette cour n'a jamais entendu quelqu'un demander ça, et pour une raison très simple : ça ne se demande pas. On cède ou on ne cède pas. C'est la seule décision du rond qui appartienne entièrement à celui qui la prend, et celui d'en face n'a rigoureusement aucune voix au chapitre.\n\nVous venez de la lui demander quand même." },
    "@« Vous tenez un carnet. Vous savez donc écrire *a cédé*. »",
    "« Sur d'autres. »",
    "@« Sur vous, ça fait trois lignes de plus que si je vous tue. »",
    { sobre:"Long silence.",
      intense:"Long silence. Il regarde le rond — pas vous, le rond — et il fait le calcul devant tout le monde sans chercher à le cacher, ce qui, chez cet homme, est probablement la chose la plus honnête de la soirée.",
      extreme:"Long silence. Il regarde le rond, pas vous. Il fait le calcul devant onze personnes sans chercher une seconde à le cacher, ce qui, chez cet homme, est très probablement la chose la plus honnête de toute la soirée.\n\nLe calcul est le suivant. Un carnet de trente-huit noms tenu pendant onze ans ne vaut quelque chose que si ce qui est écrit dedans est vrai. S'il ment sur sa propre ligne, tout le reste devient une collection de vantardises et onze ans disparaissent.\n\nEt il n'y a personne d'autre que lui pour l'écrire." },
    "« Le champion cède », dit-il, à voix normale, en direction du mur du fournil.",
    { sobre:"Il pose son épée sur la terre battue, pointe vers lui.",
      intense:"Il pose son épée sur la terre battue, pointe tournée vers lui, ce qui est la forme et ce qui n'est fait que par ceux qui savent qu'il y a une forme.\n\nPuis il sort le carnet et il écrit, debout, dans le rond, à la lanterne.",
      extreme:"Il pose son épée sur la terre battue, pointe tournée vers lui — la forme exacte, celle qui n'est employée que par les gens qui savent qu'il existe une forme, et qui n'a probablement pas été employée dans cette cour depuis qu'il y a une cour.\n\nPuis il sort le carnet de son pourpoint et il écrit, debout, au milieu du rond, à la lanterne, pendant que onze personnes le regardent sans comprendre ce qu'elles voient.\n\nÇa prend un moment. Il écrit trois lignes. Il ne les cache pas et il ne les montre pas." },
    "§ Trente-neuf noms. Un seul porte, à la troisième ligne, *j'ai cédé*.",
  ],
  effets:{ flags:['ch_du_gagne','ch_du_cede'], cout:{ endurance:8 },
           meleeMaj:{ eux:0, position:"debout au centre", note:"Le champion a cédé" },
           exploit:{ eclat:9, temoins:'quelques',
                     quoi:"vous avez fait céder un homme qui n'avait jamais cédé, et il l'a écrit lui-même" },
           marque:"Guillaume de Sault a cédé et l'a écrit de sa main. Trente-neuf noms, un seul *j'ai cédé*.",
           court:"Il a cédé" },
  suite:'ch_du_fin', libelleSuite:"La cour se vide" },

ch_du_cede_cout:{
  melee:true, qui:'sault',
  titre:"Pas comme ça",
  texte:[
    "@« Cédez. »",
    "« Non. »",
    { sobre:"Il le dit sans hausser la voix et il le pense entièrement.",
      intense:"Il le dit sans hausser la voix d'un demi-ton et il le pense entièrement. « Pas comme ça. Vous avez un avantage et vous voulez que je vous donne le reste par-dessus. Ça ne se donne pas. »",
      extreme:"Il le dit sans hausser la voix d'un demi-ton et il le pense entièrement, ce qui se voit à ce qu'il n'ajoute pas un mot pour se justifier.\n\nPuis, quand même, parce qu'il aime les choses claires :\n\n« Pas comme ça. Vous avez pris un avantage — bien pris, je ne conteste rien — et vous voulez maintenant que je vous donne le reste par-dessus, pour vous éviter le troisième temps.\n\nÇa ne se donne pas, messire. Un homme qui cède parce qu'on le lui demande n'a pas cédé : il a obéi. Et je n'écrirai pas *a obéi* dans mon carnet, parce que ce n'est pas la même chose et que le carnet ne sert à rien si les mots n'y sont pas justes. »" },
    "Il remonte la garde. Il l'a remontée moins haut qu'au début, et vous êtes probablement le seul dans cette cour à savoir ce que ça veut dire.",
  ],
  effets:{ cout:{ endurance:10, moral:2 },
           meleeMaj:{ position:"face à face", note:"Il a refusé de céder · la garde est plus basse" },
           marque:"« Un homme qui cède parce qu'on le lui demande n'a pas cédé : il a obéi. »",
           court:"Pas comme ça" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

ch_du_cede_ko:{
  melee:true, qui:'sault',
  titre:"Vous n'avez pas ce qu'il faut pour ça",
  texte:[
    "@« Cédez. »",
    { sobre:"Ça sonne faux et tout le monde l'entend.",
      intense:"Ça sonne faux. Vous l'entendez en le disant, il l'entend en le recevant, et les onze contre le mur l'entendent aussi — parce qu'un homme qui demande une reddition sans en avoir le droit demande une faveur, et une faveur ne se demande pas dans un rond.",
      extreme:"Ça sonne faux, et tout le monde l'entend en même temps.\n\nVous l'entendez en le disant. Il l'entend en le recevant. Les onze contre le mur du fournil l'entendent aussi, et deux d'entre eux détournent les yeux, ce qui est pire que s'ils avaient ri.\n\nDemander une reddition qu'on n'a pas gagnée, ce n'est pas demander une reddition : c'est demander une faveur. Et une faveur, ça ne se demande pas dans un rond de neuf pas devant témoins." },
    "« Non », dit-il, et il a la délicatesse de ne rien ajouter du tout, ce qui vous coûte plus cher que n'importe quel commentaire.",
  ],
  effets:{ cout:{ endurance:8, moral:8 },
           meleeMaj:{ position:"face à face", note:"Vous avez demandé une faveur" },
           marque:"Vous avez demandé une reddition que vous n'aviez pas gagnée. Il n'a rien ajouté.",
           court:"Une faveur" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

/* ── La craie ───────────────────────────────────────────────────────────── */
ch_du_craie_fin:{
  melee:true, qui:'sault',
  titre:"Deux",
  texte:[
    "Vous ne cherchez plus à le toucher. Vous cherchez la craie, et vous la cherchez de la seule façon qui marche : en lui laissant croire qu'il choisit ses déplacements.",
    { sobre:"Il sort. Les deux pieds.",
      intense:"Il sort au quatrième déplacement. Les deux pieds, franchement, d'un demi-pas — parce qu'il a reculé devant un coup qui n'existait pas et qu'il avait la craie derrière le talon depuis trois déplacements sans le savoir.",
      extreme:"Il sort au quatrième déplacement.\n\nLes deux pieds, franchement, d'un demi-pas au-delà de la ligne, parce qu'il a reculé devant un coup qui n'existait pas — vous ne l'avez jamais lancé — et parce qu'il avait la craie derrière le talon depuis trois déplacements sans en avoir la moindre idée.\n\nIl s'en aperçoit dans la seconde. Il regarde ses pieds. Puis il regarde le sol autour de ses pieds. Puis il regarde le rond en entier, en refaisant mentalement les quatre déplacements à l'envers, et on le voit très précisément arriver à l'endroit où il a commencé à se faire mener." },
    "« Deux », dit-il lui-même, avant que quiconque ait à le dire pour lui.",
    { sobre:"Il rentre, il ramasse son épée, et il salue.",
      intense:"Il rentre dans le rond, il ramasse son épée sans la brandir, et il salue — le même salut de cour, exactement aussi parfait, et cette fois il le tient une seconde de plus.\n\n« Le rond », dit-il. « Personne ne joue le rond. »",
      extreme:"Il rentre dans le rond, ramasse son épée sans un geste de mauvaise humeur, et il salue.\n\nLe même salut de cour, exactement aussi parfait qu'à l'entrée, tenu une seconde de plus qu'il ne faut — et cette seconde-là est tout ce que cet homme sait dire.\n\n« Le rond », dit-il en se redressant. « Personne ne joue le rond. Trente-huit hommes ont joué **moi**. »\n\nUn temps.\n\n« Le trente-neuvième a joué la craie. C'est une meilleure ligne que tout ce que j'ai écrit en onze ans. »" },
    "§ Un duel gagné sans une goutte de sang. C'est la chose la plus rare de ce carnet et il en a parfaitement conscience.",
  ],
  effets:{ flags:['ch_du_gagne','ch_du_craie_gagne'], cout:{ endurance:14 },
           meleeMaj:{ eux:0, position:"debout au centre", note:"Deux pieds sortis · c'est réglé" },
           exploit:{ eclat:8, temoins:'quelques',
                     quoi:"vous avez gagné un duel sur la craie, sans une goutte de sang" },
           marque:"Vous avez gagné sur la craie. Personne ne joue le rond ; trente-huit ont joué l'homme.",
           court:"Sur la craie" },
  suite:'ch_du_fin', libelleSuite:"La cour se vide" },

ch_du_craie_fin_cout:{
  melee:true, qui:'sault',
  titre:"Un demi-pas",
  texte:[
    "Vous le menez vers la craie et vous l'y amenez. Il sort — d'un pied.",
    { sobre:"Un pied. Il le remet avant que le second suive.",
      intense:"Un pied seulement, et il le remet à l'intérieur avant que le second ait eu le temps de suivre. « Un », dit-il, en se le comptant lui-même, ce qu'aucune règle ne l'oblige à faire.",
      extreme:"Un pied seulement. Le droit, d'un demi-pas, et il le ramène à l'intérieur avant que le gauche ait eu le temps de suivre — un rattrapage que quatre hommes sur cent savent faire et qui ne s'improvise pas.\n\n« Un », dit-il, en se le comptant lui-même à voix haute, ce qu'aucune règle du monde ne l'oblige à faire et ce que personne dans cette cour n'aurait relevé.\n\nPuis il vous regarde, et il n'y a plus rien d'aimable dans ce regard-là : vous venez de lui prendre une chose qu'il n'avait jamais donnée en onze ans, et il vient de comprendre que le troisième passage va se jouer sur la terre et pas sur la lame." },
    "Vous l'avez blessé là où cet homme est réellement vulnérable, et il n'y a pas une goutte de sang.",
  ],
  effets:{ flags:['ch_du_craie_gagne'], cout:{ endurance:16 },
           meleeMaj:{ position:"au centre, lui à un demi-pas de la craie", note:"Il s'est compté « Un » lui-même" },
           exploit:{ eclat:4, temoins:'quelques', quoi:"vous lui avez fait sortir un pied du rond" },
           marque:"Il s'est compté « Un » à voix haute, ce que rien ne l'obligeait à faire.",
           court:"« Un »" },
  suite:'ch_du_p3', libelleSuite:"Le troisième temps" },

/* ── Le troisième temps ─────────────────────────────────────────────────── */
ch_du_p3:{
  melee:true, qui:'sault',
  lieu:"La cour · le rond",
  titre:"Après ce temps-là",
  texte:[
    { sobre:"Il remonte la garde. Elle est plus basse qu'au début.",
      intense:"Il remonte la garde et elle est plus basse qu'au début — de deux pouces, peut-être trois, et vous êtes vraisemblablement la seule personne de cette cour capable de voir la différence.",
      extreme:"Il remonte la garde et elle est plus basse qu'au commencement. De deux pouces, peut-être trois.\n\nVous êtes vraisemblablement la seule personne de cette cour capable de voir la différence, et vous savez exactement ce qu'elle veut dire : un homme de trente-six ans qui tient une garde haute pendant onze minutes commence à la payer, et le corps la descend tout seul sans demander l'avis de personne.\n\nOnze minutes. Il en a fait trente-huit, de ces soirées, et il n'en a jamais fait une de plus de quinze." },
    "« Après ce temps-là », dit-il, « il n'y a plus de règles. Il y a un homme de trente-six ans et un homme de vingt-neuf, dans un rond de neuf pas, à la lanterne. »",
    "@« Il y en a une. »",
    "« Laquelle ? »",
    "@« Personne n'est obligé de tomber. »",
    { sobre:"Il ne répond pas tout de suite.",
      intense:"Il ne répond pas tout de suite. « Vous m'avez écouté », dit-il enfin. « Personne ne m'écoute quand je récite les règles. Ils attendent que j'aie fini. »",
      extreme:"Il ne répond pas tout de suite. Il laisse passer trois secondes complètes, et dans un rond, trois secondes est une durée que personne ne donne gratuitement.\n\n« Vous m'avez écouté », dit-il enfin.\n\nCe n'est pas une question et ce n'est pas un compliment : c'est un homme qui vient de relever un fait qui ne s'était pas produit depuis onze ans.\n\n« Personne ne m'écoute quand je récite les règles. Ils attendent poliment que j'aie fini pour pouvoir commencer. Trente-huit fois. »" },
    "§ Le troisième passage se fait sans un mot. Il n'y en a plus besoin.",
  ],
  choix:[
    { t:"Le finir proprement",
      detail:"Force · épées — il est plus fatigué que vous et vous êtes plus jeune que lui",
      risque:"calculé",
      test:{ carac:'force', comp:'epees', dc:12, adversaire:'sault', manoeuvre:'final',
             situation:() => (a('ch_du_lu') ? 2 : 0) + (a('ch_du_avantage') ? 2 : 0)
                           + (a('ch_du_miroir') ? 2 : 0) + (a('ch_du_respect') ? 1 : 0),
             cout:{ endurance:14 } },
      degres:{ dominante:'ch_du_fin_net', nette:'ch_du_fin_net', couteuse:'ch_du_fin_cout',
               echec:'ch_du_fin_perdu', catastrophe:'ch_du_fin_perdu' } },

    { t:"Céder",
      detail:"Personne n'est obligé de tomber · c'est lui qui l'a dit et il l'a dit pour les deux",
      risque:"prudent", va:'ch_du_fin_ceder' },

    { t:"Attendre. Le laisser venir une dernière fois",
      detail:"Endurance · esquive — trente-six ans contre vingt-neuf, et onze minutes de garde haute",
      risque:"favorable",
      test:{ carac:'endurance', comp:'esquive', dc:11, adversaire:'sault', manoeuvre:'attente' },
      degres:{ dominante:'ch_du_fin_attente', nette:'ch_du_fin_attente', couteuse:'ch_du_fin_cout',
               echec:'ch_du_fin_perdu', catastrophe:'ch_du_fin_perdu' } },
  ],
},

ch_du_fin_net:{
  melee:true, qui:'sault',
  titre:"Onze minutes",
  texte:[
    "Ça prend quatre secondes.",
    { sobre:"Sa garde est basse. Vous passez par-dessus.",
      intense:"Sa garde est basse de trois pouces et vous passez par-dessus, ce qui est la chose la plus simple du monde et la seule qui n'était pas disponible il y a onze minutes. Le plat de votre lame arrive sur le côté de sa tête et il tombe comme tombent les hommes qu'on frappe à la tête : d'un bloc, sans se rattraper.",
      extreme:"Sa garde est basse de trois pouces et vous passez par-dessus.\n\nC'est la chose la plus simple du monde. C'est aussi la seule qui n'était disponible à aucun moment des onze minutes précédentes, et c'est toute la leçon de la soirée : on ne bat pas un homme comme celui-là avec une idée. On le bat avec le temps.\n\nVous tournez la lame au dernier quart de seconde — ce qui coûte de la force et ce qui prend une décision — et c'est le plat qui arrive sur le côté de la tête.\n\nIl tombe comme tombent les hommes qu'on frappe à la tête : d'un bloc, sans un geste pour se rattraper, avec ce bruit mou et sans écho qui n'a rien à voir avec ce qu'on imagine." },
    "Il est debout au bout d'une minute, ce qui est rapide. Il ne demande pas ce qui s'est passé : il le sait.",
    "« Le plat », dit-il, en touchant sa tempe. « Vous avez tourné la lame. »",
    "@« Oui. »",
    "« Pourquoi ? »",
    "@« Parce qu'il faut quelqu'un pour écrire les trois lignes. »",
  ],
  effets:{ flags:['ch_du_gagne','ch_du_plat'], cout:{ endurance:16 },
           meleeMaj:{ eux:0, position:"debout", note:"Vous avez tourné la lame" },
           exploit:{ eclat:8, temoins:'quelques',
                     quoi:"vous avez battu un duelliste de cour et vous avez tourné la lame" },
           marque:"Vous l'avez battu du plat. « Il faut quelqu'un pour écrire les trois lignes. »",
           court:"Le plat" },
  suite:'ch_du_fin', libelleSuite:"La cour se vide" },

ch_du_fin_attente:{
  melee:true, qui:'sault',
  titre:"Il vient une dernière fois",
  texte:[
    "Vous ne faites rien. C'est très difficile et c'est la bonne réponse : il a trente-six ans, il tient une garde haute depuis onze minutes, et il ne peut pas se permettre un quatrième passage.",
    "Alors il vient. Deux appels du pied avant, une pointe haute, et le vrai coup en dessous — parce qu'un homme fatigué revient toujours à ce qu'il sait faire.",
    { sobre:"Vous n'y êtes plus.",
      intense:"Vous n'y êtes plus. Vous êtes parti d'un demi-pas sur la gauche à l'instant du deuxième appel, et son coup passe dans l'endroit exact où vous vous trouviez, ce qui laisse un homme de trente-six ans engagé, en avant, le flanc entier.",
      extreme:"Vous n'y êtes plus.\n\nVous êtes parti d'un demi-pas sur la gauche à l'instant précis du deuxième appel du pied — pas au premier, ce qui l'aurait prévenu ; pas au troisième, ce qui aurait été trop tard — et son coup traverse très proprement l'endroit exact où vous vous trouviez une demi-seconde plus tôt.\n\nCe qui laisse un homme de trente-six ans engagé vers l'avant de tout son poids, la pointe basse, le flanc gauche entier et rien du tout entre ce flanc et vous.\n\nOnze minutes plus tôt il se serait rattrapé. Ce sont les onze minutes qui gagnent, pas vous, et c'est important de le savoir." },
    "Vous posez la pointe sur son flanc et vous ne l'enfoncez pas.",
    "Il s'arrête. Il regarde la lame contre lui pendant un temps considérable.",
    "« Voilà », dit-il. « C'était ça, la ligne. »",
  ],
  effets:{ flags:['ch_du_gagne','ch_du_attendu'], cout:{ endurance:20 },
           meleeMaj:{ eux:0, position:"la pointe contre son flanc", note:"Vous ne l'avez pas enfoncée" },
           exploit:{ eclat:8, temoins:'quelques',
                     quoi:"vous avez laissé venir un duelliste de cour une fois de trop" },
           marque:"Vous avez attendu. Ce sont les onze minutes qui l'ont eu, pas vous.",
           court:"Onze minutes" },
  suite:'ch_du_fin', libelleSuite:"La cour se vide" },

ch_du_fin_cout:{
  melee:true, qui:'sault',
  titre:"Les deux",
  texte:[
    "Vous vous touchez en même temps, ce qui n'arrive presque jamais et ce qui ne s'invente pas.",
    { sobre:"Sa pointe dans votre cuisse. La vôtre dans son bras.",
      intense:"Sa pointe entre dans votre cuisse droite, la vôtre dans son bras gauche, dans la même seconde, et vous restez tous les deux debout à un demi-pas l'un de l'autre en attendant de savoir lequel des deux va s'asseoir.",
      extreme:"Sa pointe entre dans votre cuisse droite, à mi-hauteur, sur trois pouces. La vôtre entre dans son bras gauche, au-dessus du coude, sur autant.\n\nDans la même seconde. Exactement dans la même seconde, ce qui n'arrive presque jamais, ce qui ne s'invente pas, et ce qui laisse deux hommes debout à un demi-pas l'un de l'autre, chacun avec le fer de l'autre dedans, en train d'attendre honnêtement de savoir lequel des deux va s'asseoir en premier.\n\nAucun des deux ne s'assied. Onze personnes contre le mur du fournil ne respirent plus depuis un moment." },
    "Il recule d'un pas. Il lève deux doigts — son deuxième temps de la soirée, et le dernier.",
    "« Nul », dit-il. « C'est le mot. Il y en a quatre dans le carnet. »",
    "@« Et ils disent quoi, les quatre ? »",
    "« Que je n'étais pas seul dans le rond ce soir-là. C'est la seule ligne que j'écris avec plaisir. »",
  ],
  effets:{ flags:['ch_du_nul'], cout:{ endurance:22, vitalite:14, sang:10 },
           meleeMaj:{ eux:0, position:"debout, tous les deux", note:"Nul · il y en a quatre dans le carnet" },
           faire:() => blesser({ id:'ch_du_cuisse', zone:"cuisse droite", type:"perforation nette",
                                 gravite:2, douleur:2, saignement:2, fonction:['agilite'],
                                 cicatrice:"une entrée et une sortie à mi-cuisse droite" }),
           exploit:{ eclat:5, temoins:'quelques', quoi:"vous avez fait nul contre un duelliste de cour" },
           marque:"Nul. « Que je n'étais pas seul dans le rond ce soir-là. »", court:"Nul" },
  suite:'ch_du_fin', libelleSuite:"La cour se vide" },

ch_du_fin_perdu:{
  melee:true, qui:'sault',
  titre:"Trente-neuf",
  texte:[
    "Il vous a. Ce n'est ni glorieux ni honteux : c'est un homme qui fait ça depuis onze ans contre un homme qui le fait ce soir.",
    { sobre:"La pointe se pose sur votre gorge et n'y entre pas.",
      intense:"La pointe se pose sur votre gorge, juste sous la mâchoire, et n'y entre pas. Elle reste là le temps qu'il faut pour que tout le monde dans cette cour ait compris, ce qui prend environ deux secondes, puis elle se retire.",
      extreme:"La pointe se pose sur votre gorge, juste sous l'angle de la mâchoire, et n'y entre pas d'un cheveu.\n\nElle reste là exactement le temps qu'il faut pour que les onze personnes contre le mur du fournil aient toutes compris, ce qui prend environ deux secondes, et pas une seconde de plus. Il ne fait pas durer. Il n'y a aucune humiliation dans ce geste et il n'y en aurait dans aucun de ses gestes.\n\nPuis elle se retire, et il recule d'un pas pour vous laisser la place de vous relever, ce que la règle n'exige pas." },
    "« Cédez », dit-il. Et il ajoute, plus bas, pour vous seul : « Ce n'est pas grand-chose. J'ai perdu quatre fois. »",
    "@« Vous avez perdu quatre fois ? »",
    "« Le carnet est un registre, messire. Un registre ne choisit pas ce qu'il porte. »",
    { sobre:"Il écrit trois lignes.",
      intense:"Il écrit trois lignes, debout, à la lanterne, et il vous les lit à voix haute — ce qu'il ne fait manifestement jamais et ce qu'il fait ce soir.\n\n« *Cendrepont. Épée bâtarde, bonne main, ne regarde pas où il faut. A tenu onze minutes, ce que trente et un sur trente-huit n'ont pas fait.* »",
      extreme:"Il écrit trois lignes, debout au milieu du rond, à la lanterne, sans se presser.\n\nPuis il fait une chose qu'il ne fait manifestement jamais : il vous les lit à voix haute.\n\n« *Cendrepont, fin d'hiver. Épée bâtarde, bonne main, ne regarde pas où il faut regarder. A tenu onze minutes, ce que trente et un sur trente-huit n'ont pas fait. À revoir dans deux ans.* »\n\nIl referme le carnet.\n\n« *À revoir dans deux ans*, ce n'est pas dans les trois lignes d'habitude », dit-il. « Je ne l'ai écrit que six fois. »" },
  ],
  effets:{ flags:['ch_du_perdu','ch_du_revoir'], cout:{ endurance:26, vitalite:18, sang:10, moral:6 },
           meleeMaj:{ eux:0, position:"à genoux dans le rond", note:"Vous avez cédé" },
           faire:() => blesser({ id:'ch_du_gorge', zone:"sous la mâchoire", type:"une marque de pointe",
                                 gravite:1, douleur:1, saignement:1, fonction:[],
                                 cicatrice:"un point pâle sous l'angle de la mâchoire" }),
           marque:"Il vous a battu et il a écrit *à revoir dans deux ans*, ce qu'il n'a écrit que six fois.",
           court:"À revoir" },
  suite:'ch_du_fin', libelleSuite:"La cour se vide" },

ch_du_fin_ceder:{
  melee:true, qui:'sault',
  titre:"Personne n'est obligé de tomber",
  texte:[
    "@« Je cède. »",
    { sobre:"Il baisse sa lame immédiatement.",
      intense:"Il baisse sa lame immédiatement, sans un instant d'hésitation et sans le moindre commentaire, ce qui est exactement ce qu'il a annoncé dans la salle une heure plus tôt.",
      extreme:"Il baisse sa lame immédiatement. Pas un instant d'hésitation, pas un regard vers le mur du fournil, pas la seconde de flottement pendant laquelle un homme se demande s'il pourrait encore prendre quelque chose.\n\nC'est exactement ce qu'il avait annoncé dans la salle une heure plus tôt, et il faut une seconde pour s'apercevoir de ce que ça veut dire : cet homme dit ce qu'il fait, il fait ce qu'il dit, et il n'y a rien d'autre à l'intérieur." },
    "« Le requérant cède », dit-il vers le mur du fournil. Puis, pour vous : « Vous n'aviez pas perdu. »",
    "@« Non. »",
    "« Alors pourquoi ? »",
    { sobre:"@« Parce que ça ne servait à rien. »",
      intense:"@« Parce que ça ne servait à rien. Vous ne vouliez pas me tuer, je ne veux pas vous tuer, et dans dix minutes l'un de nous deux aurait quand même eu quelque chose de cassé pour trois lignes dans un carnet. »",
      extreme:"@« Parce que ça ne servait à rien. »\n\nIl attend la suite, parce qu'il sait qu'il y en a une.\n\n@« Vous ne voulez pas me tuer. Je ne veux pas vous tuer. Vous avez trente-six ans, moi vingt-neuf, et dans dix minutes l'un de nous deux aurait eu quelque chose de cassé qui ne se répare pas — pour trois lignes dans un carnet que personne ne lira avant cinquante ans.\n\nJ'ai un contrat qui m'attend et j'en ai besoin de mes deux bras. C'est tout. Ce n'est pas noble. »" },
    { sobre:"Il met un long moment à répondre.",
      intense:"Il met un long moment. « C'est la meilleure raison que j'aie entendue en onze ans », dit-il enfin. « Et c'est la seule fois où quelqu'un m'a dit la vraie. »",
      extreme:"Il met un long moment à répondre. Il range le carnet sans avoir écrit quoi que ce soit, ce qui ne lui est manifestement jamais arrivé.\n\n« C'est la meilleure raison que j'aie entendue en onze ans », dit-il enfin. « Et c'est surtout la seule fois où quelqu'un m'a donné la vraie.\n\nLes six autres qui ont refusé m'ont tous expliqué qu'ils n'avaient pas le temps. » Un temps. « Aucun n'était pressé. »" },
    "§ Il n'écrit rien. C'est la seule page blanche de son carnet et il la laisse blanche exprès.",
  ],
  effets:{ flags:['ch_du_cede_soi'], cout:{ endurance:6, moral:2 },
           meleeMaj:{ eux:0, position:"debout, la lame basse", note:"Vous avez cédé sans avoir perdu" },
           faire:() => { ETAT.renom = Math.max(0, ETAT.renom - 2); },
           exploit:{ eclat:2, temoins:'quelques', quoi:"vous avez cédé sans avoir perdu, et vous avez dit pourquoi" },
           marque:"Vous avez cédé sans avoir perdu. Il n'a rien écrit : la page est restée blanche.",
           court:"La page blanche" },
  suite:'ch_du_fin', libelleSuite:"La cour se vide" },

/* ── Après ──────────────────────────────────────────────────────────────── */
ch_du_fin:{ dyn:true, texte:[] },

/* ══════════════════════════════════════════════════════════════════════════
 * 3 · LE COLOSSE DE TOURBE
 *
 * On ne le tue pas en le coupant. C'est tout le problème et c'est toute la
 * chasse : un homme d'armes arrive avec une épée devant une chose qui n'a
 * ni organes, ni sang, ni tête, et découvre en deux minutes que quarante ans
 * de métier ne servent à rien du tout.
 *
 * Ce qui le tient debout est au milieu. Et ce qui est au milieu était
 * quelqu'un.
 * ══════════════════════════════════════════════════════════════════════════ */
ch_colosse:{
  lieu:"Les tourbières hautes · au-dessus de Fontaine-Basse",
  titre:"Ce que la tourbe fait",
  texte:[
    "Les tourbières hautes font quatre lieues sur deux et ne portent rien : pas un arbre, pas une pierre, pas une clôture. Les coupeurs y montent d'avril à septembre, taillent la tourbe en briques, la font sécher et redescendent.",
    "Cette année, ils ne montent plus.",
    { sobre:"Ils ont perdu quatre hommes en trois semaines. Ils n'ont retrouvé personne.",
      intense:"Quatre hommes en trois semaines. Pas un corps, pas un outil, pas une trace de lutte : quatre hommes qui coupaient de la tourbe à trois cents pas les uns des autres et dont il ne reste rien. Dans un endroit plat, sans un arbre, où l'on voit à une lieue.",
      extreme:"Quatre hommes en trois semaines. Pas un corps, pas un outil, pas une goutte de sang, pas une trace de lutte.\n\nQuatre hommes qui coupaient de la tourbe à trois cents pas les uns des autres, dans un endroit parfaitement plat, sans un arbre ni un pli de terrain, où l'on voit venir quelqu'un à une lieue par temps clair.\n\nLe chef d'équipe vous explique tout ça posément, deux fois, parce qu'il a compris depuis trois semaines que personne ne le croit la première fois." },
    "« On a dit que c'était le sol. Qu'ils étaient tombés dans un trou d'eau. »",
    "@« Vous n'y croyez pas. »",
    { sobre:"« Le troisième, c'était mon frère. Il coupait ici depuis vingt-deux ans. »",
      intense:"« Le troisième, c'était mon frère. » Il ne le dit pas comme on annonce un deuil ; il le dit comme on produit une pièce. « Il coupait ici depuis vingt-deux ans. Il connaissait tous les trous d'eau de cette tourbière et il connaissait celui-là mieux que les autres parce que c'est lui qui l'a ouvert. »",
      extreme:"« Le troisième, c'était mon frère. »\n\nIl ne le dit pas comme on annonce un deuil. Il le dit comme on produit une pièce dans un débat, ce qui veut dire qu'il l'a déjà produite douze fois devant douze personnes qui n'ont pas écouté.\n\n« Il coupait ici depuis vingt-deux ans. Il connaissait chaque trou d'eau de cette tourbière et il connaissait celui-là mieux que tous les autres, parce que c'est lui qui l'a ouvert il y a onze ans. Un homme ne tombe pas dans un trou qu'il a creusé. »\n\nUn temps.\n\n« Et un homme qui tombe dans un trou d'eau remonte. La tourbe rend tout, messire. C'est même la seule chose qu'elle sait faire : elle garde et elle rend. Ma tourbière a rendu un cerf entier l'année de mes vingt ans, et il avait cent ans. »" },
    "§ *La tourbe garde et elle rend.* Retenez cette phrase-là, elle vaut quatre hommes.",
  ],
  choix:[
    { t:"Monter voir où coupait le troisième",
      detail:"Perception · pistage — il n'y a rien à voir sur une tourbière, ce qui simplifie",
      risque:"favorable",
      test:{ carac:'perception', comp:'pistage', dc:11, manoeuvre:'tourbiere' },
      degres:{ dominante:'ch_co_lieu_dom', nette:'ch_co_lieu_ok', couteuse:'ch_co_lieu_ok',
               echec:'ch_co_lieu_ko', catastrophe:'ch_co_lieu_ko' } },

    { t:"Demander ce que la tourbière a rendu, ces vingt dernières années",
      detail:"Un homme qui coupe depuis vingt-deux ans tient une comptabilité que personne ne lui demande",
      risque:"sûr", va:'ch_co_rendu' },

    { t:"Ce n'est pas votre affaire",
      detail:"Quatre coupeurs de tourbe, aucun contrat, aucune maison",
      ferme:"Ferme : les tourbières hautes",
      definitif:true, va:'ch_co_partir' },
  ],
},

ch_co_partir:{
  titre:"Quatre lieues sur deux",
  texte:[
    "Vous redescendez. Le chef d'équipe ne dit rien : il a produit sa pièce, elle n'a pas été retenue, il connaît la procédure.",
    "§ On coupera moins de tourbe cette année. Un hameau qui manque de tourbe brûle son bois, et un hameau qui a brûlé son bois vend ses bêtes en Nivôse.",
    "Ces choses-là ne tuent personne. Elles se contentent de vider un endroit en trois ans.",
  ],
  effets:{ flags:['ch_colosse_fait','ch_colosse_ignore'], cout:{ moral:4 },
           marque:"Vous n'êtes pas monté aux tourbières hautes.", court:"Les tourbières" },
  issue:"L'affaire n'a pas eu lieu",
  bilan:"Quatre hommes, et personne n'est monté",
  apres:["La tourbe garde et elle rend. Elle n'a rien rendu cette année-là."],
  suite:'entre_saisons', libelleSuite:"La route" },

ch_co_rendu:{
  titre:"La comptabilité d'un homme qui coupe",
  texte:[
    "Il tient le compte. Personne ne le lui a jamais demandé et il le tient depuis vingt-deux ans, dans sa tête, parce qu'un homme qui passe six mois par an à retirer des choses du sol finit par les compter.",
    { sobre:"Un cerf. Deux chiens. Une charrette. Onze moutons. Et trois hommes.",
      intense:"Un cerf entier, avec les bois, qui avait cent ans. Deux chiens. Une charrette à bras et son essieu. Onze moutons sur vingt-deux ans. Et **trois hommes**, à trois moments différents, dont aucun n'était de la vallée.",
      extreme:"Un cerf entier avec les bois, qui avait au bas mot cent ans et qui avait encore ses yeux. Deux chiens. Une charrette à bras avec son essieu et ce qu'il restait de la corde. Onze moutons répartis sur vingt-deux ans.\n\nEt **trois hommes**. À trois moments différents, en vingt-deux ans, dont aucun n'était de la vallée et dont aucun n'a jamais été réclamé par personne.\n\n« La tourbe ne les abîme pas », dit-il. « C'est ce que les gens ne comprennent pas. Elle les garde. Le premier qu'on a sorti, en l'an de mes vingt-neuf ans, on lui voyait la couleur des yeux et les points de couture de sa chemise. Il était dedans depuis au moins soixante ans. On l'a enterré au bourg parce qu'on ne savait pas quoi faire d'autre. »" },
    "@« Et le troisième ? »",
    { sobre:"« Le troisième, on ne l'a pas sorti. On a arrêté de creuser. »",
      intense:"« Le troisième, on ne l'a pas sorti. » Il regarde la tourbière. « C'était il y a quatre ans. On a dégagé la tête et une épaule, et on a arrêté de creuser, et on a remis la tourbe par-dessus. »\n\n@« Pourquoi ? »\n\n« Parce qu'il avait le crâne ouvert et les mains liées derrière. Un homme qui a les mains liées, ça veut dire que quelqu'un l'a mis là, et quelqu'un qui met un homme dans une tourbière n'aime pas beaucoup qu'on l'en ressorte. »",
      extreme:"« Le troisième, on ne l'a pas sorti. »\n\nIl regarde la tourbière, les quatre lieues plates, l'endroit exact.\n\n« C'était il y a quatre ans. On a dégagé la tête et une épaule, et puis on a arrêté de creuser, et on a remis la tourbe par-dessus et on a tassé au pied. »\n\n@« Pourquoi ? »\n\n« Parce qu'il avait le crâne ouvert par-derrière et les deux mains liées dans le dos. »\n\nUn temps.\n\n« Un homme qui a les mains liées, ça veut dire que quelqu'un l'a mis là. Et quelqu'un qui met un homme dans une tourbière n'aime pas du tout qu'on l'en ressorte, et vit encore quelque part à trois lieues d'ici. On est douze à couper. On a des familles. »\n\nUn temps plus long.\n\n« Il avait une chemise de qualité. C'est la seule chose que j'aie regardée avant de remettre la tourbe. Une chemise que personne ici n'aurait pu payer. »" },
    "§ Il vous montre l'endroit. C'est à deux cents pas de là où coupait son frère.",
  ],
  effets:{ flags:['ch_co_su','ch_co_lie'],
           marque:"Un homme aux mains liées et au crâne ouvert dort sous la tourbe depuis quatre ans, à deux cents pas.",
           court:"Les mains liées" },
  suite:'ch_co_face', libelleSuite:"Monter" },

ch_co_lieu_dom:{
  titre:"Ce qui manque",
  texte:[
    "Une tourbière ne cache rien : c'est plat, c'est nu, et tout ce qui s'y trouve s'y voit de loin. C'est pour ça que la chose est difficile — il n'y a rien à trouver, et il faut donc chercher ce qui **manque**.",
    { sobre:"Il manque le banc de coupe du troisième. Trois cents briques.",
      intense:"Il manque trois cents briques de tourbe. Le banc du troisième homme est ouvert, la coupe est nette, le travail d'une journée est là — et trois cents briques séchées qu'on avait empilées à côté ne sont plus nulle part.",
      extreme:"Il manque trois cents briques de tourbe.\n\nLe banc du troisième homme est ouvert, la coupe est propre, régulière, faite par quelqu'un qui savait ce qu'il faisait jusqu'à la dernière seconde. Le travail d'une journée est étalé là où on l'a laissé.\n\nEt trois cents briques séchées, empilées en tas de cinquante contre le vent, ne sont plus nulle part. Personne n'a emporté trois cents briques de tourbe : ça pèse le poids d'un cheval, ça ne se vend pas, et il faudrait une charrette pour lesquelles il n'y a pas de trace.\n\nElles n'ont pas été prises. Elles ont été **absorbées** : il y a, à l'endroit du tas, un creux dans le sol qui a exactement la forme du tas." },
    "§ Une chose qui mange de la tourbe sèche n'est pas une chose qui a faim. C'est une chose qui se construit.",
    "Vous suivez le creux. Il y en a quatre autres, à des endroits différents, tous à côté d'un banc de coupe. Et il y a une trace, une seule, qui n'est pas un creux.",
    { sobre:"Une empreinte. Elle fait quatre pieds de long.",
      intense:"Une empreinte, une seule, dans la boue molle du bord d'un trou d'eau. Elle fait quatre pieds de long sur deux et demi de large. Elle n'a pas de doigts, pas de sabot, pas de griffe : c'est un bloc, avec un bord net.",
      extreme:"Une seule empreinte, dans la boue molle au bord d'un trou d'eau, à l'endroit précis où le sol n'a pas pu se refermer.\n\nQuatre pieds de long sur deux et demi de large. Pas de doigts. Pas de sabot, pas de griffe, pas de coussinet. Un bloc, avec un bord net et une surface plate, comme la base d'une colonne qu'on aurait posée là et reprise.\n\nElle a huit pouces de profondeur dans une boue qui porte un homme. Ce qui a posé ça pèse le poids d'une charrette chargée." },
  ],
  effets:{ flags:['ch_co_lu','ch_co_lu_bien'],
           exploit:{ eclat:2, temoins:'aucun', quoi:"vous avez cherché ce qui manquait au lieu de ce qui restait" },
           marque:"Trois cents briques absorbées, cinq creux, et une empreinte de quatre pieds sans doigts.",
           court:"Quatre pieds" },
  suite:'ch_co_face', libelleSuite:"L'attendre" },

ch_co_lieu_ok:{
  titre:"Le creux",
  texte:[
    "Vous trouvez le banc du troisième homme, ouvert, la coupe nette, le travail d'une journée étalé là où on l'a laissé.",
    "Et vous trouvez un creux dans le sol, à côté, qui a exactement la forme et le volume du tas de briques qui devrait s'y trouver.",
    "§ Rien n'a été emporté. Quelque chose a été absorbé, et une chose qui absorbe de la tourbe sèche ne mange pas : elle se construit.",
  ],
  effets:{ flags:['ch_co_lu'],
           marque:"Un creux dans le sol, exactement de la forme du tas de briques disparu.",
           court:"Le creux" },
  suite:'ch_co_face', libelleSuite:"L'attendre" },

ch_co_lieu_ko:{
  titre:"Quatre lieues plates",
  texte:[
    "Vous marchez la tourbière pendant six heures. Elle fait quatre lieues sur deux, elle est parfaitement plate, et elle est parfaitement vide.",
    "§ Il n'y a rien à trouver. C'est un endroit qui n'a rien à cacher, ce qui devrait être rassurant et ce qui ne l'est pas du tout.",
    "Vous rentrez au campement des coupeurs à la nuit, avec les bottes pleines et rien du tout.",
  ],
  effets:{ cout:{ endurance:16 },
           marque:"Six heures de tourbière plate, et rien.", court:"Rien" },
  suite:'ch_co_face', libelleSuite:"Attendre sur place" },

/* ── Il vient ───────────────────────────────────────────────────────────── */
ch_co_face:{
  melee:true,
  lieu:"Les tourbières hautes · la nuit",
  titre:"Il n'y a rien à couper",
  texte:[
    "Vous ouvrez un banc de coupe vous-même, à la nuit, et vous taillez trois cents briques que vous empilez en tas de cinquante contre le vent. Ça prend quatre heures et c'est un travail que vous n'avez jamais fait.",
    "Puis vous vous asseyez à trente pas du tas et vous attendez.",
    { sobre:"Il arrive à la troisième heure. Il ne fait aucun bruit.",
      intense:"Il arrive à la troisième heure et il ne fait aucun bruit du tout, ce qui est la partie que vous n'oublierez pas : une chose de onze pieds qui pèse le poids d'une charrette traverse deux cents pas de tourbière molle sans un seul son.",
      extreme:"Il arrive à la troisième heure.\n\nIl ne fait aucun bruit du tout. Pas un. C'est la partie de cette nuit que vous n'oublierez jamais : onze pieds de haut, le poids d'une charrette chargée, deux cents pas de tourbière détrempée traversés sans un seul son — parce qu'il ne pose pas ses pieds, il **se déplace** : le sol devient lui à l'avant et cesse de l'être à l'arrière.\n\nLa tourbe se referme derrière. C'est pour ça qu'il n'y a qu'une empreinte dans quatre lieues." },
    { sobre:"Il n'a pas de tête. Il a une masse en haut, et c'est tout.",
      intense:"Il n'a pas de tête. Il a une masse en haut du corps, sans yeux, sans bouche, sans rien qui ressemble à un visage, et cette masse s'oriente quand même vers vous — ce qui est infiniment pire que si elle avait eu des yeux.",
      extreme:"Il n'a pas de tête.\n\nIl a une masse en haut du corps, plus dense que le reste, sans yeux, sans bouche, sans une seule des choses qu'on cherche instinctivement sur un vivant. Et cette masse s'oriente vers vous. Nettement. Sans hésitation.\n\nC'est infiniment plus difficile à supporter que si elle avait eu des yeux, parce qu'un homme sait quoi faire d'un regard et ne sait absolument rien faire d'une orientation.\n\nIl est constitué de tourbe noire compactée, de racines, d'eau, et de trois cents briques séchées qu'il a prises la semaine dernière. Il y a un mouton mort dedans, à mi-hauteur, dont on voit encore la moitié de la tête." },
    "Il prend le tas. Il ne vous voit pas, ou il ne s'en occupe pas — un homme de deux cents livres ne représente pas un problème pour une chose qui en pèse trois mille.",
  ],
  choix:[
    { t:"Frapper. Voir ce que ça fait",
      detail:"Force · épées — c'est ce que quarante ans de métier commandent, et c'est faux",
      risque:"risqué",
      test:{ carac:'force', comp:'epees', dc:10, adversaire:'colosse', manoeuvre:'couper',
             cout:{ endurance:14 } },
      degres:{ dominante:'ch_co_couper', nette:'ch_co_couper', couteuse:'ch_co_couper',
               echec:'ch_co_couper', catastrophe:'ch_co_couper_cata' } },

    { t:"Le regarder faire, d'abord",
      detail:"Intellect · bestiaire — une chose sans organes se tient debout par autre chose",
      risque:"favorable",
      test:{ carac:'intellect', comp:'bestiaire', dc:12, adversaire:'colosse', manoeuvre:'observer',
             situation:() => (a('ch_co_lu_bien') ? 3 : 0) + (a('ch_co_su') ? 2 : 0) },
      degres:{ dominante:'ch_co_compris_dom', nette:'ch_co_compris_ok', couteuse:'ch_co_compris_ok',
               echec:'ch_co_couper', catastrophe:'ch_co_couper_cata' } },

    { t:"Redescendre et le dire aux coupeurs",
      detail:"Il n'y a pas de honte · douze hommes et un prêtre feront mieux qu'un homme seul",
      risque:"prudent", va:'ch_co_redescendre' },
  ],
},

ch_co_couper:{
  melee:true,
  titre:"Ce que ça fait",
  texte:[
    "Vous frappez. C'est ce que quarante ans de métier commandent et ce sont quarante ans qui se trompent.",
    { sobre:"La lame entre de deux pieds. Il ne se passe rien.",
      intense:"La lame entre de deux pieds dans la masse et il ne se passe absolument rien. Pas de cri, pas de recul, pas de sang. Vous retirez l'épée et la tourbe se referme derrière, lentement, comme de l'eau épaisse.",
      extreme:"La lame entre de deux pieds dans la masse — vous y mettez tout, à deux mains, avec la hanche — et il ne se passe rigoureusement rien.\n\nPas un cri. Pas un recul. Pas une goutte de quoi que ce soit. Vous retirez l'épée avec difficulté, parce que deux pieds de tourbe compactée serrent une lame comme une main, et le trou se referme derrière la lame, lentement, à la façon d'une eau très épaisse.\n\nEn quatre secondes il n'y a plus de trou.\n\nVous venez de faire ce que quatre hommes ont probablement fait avant vous avec leur outil de coupe." },
    { sobre:"Puis il s'occupe de vous.",
      intense:"Puis il s'occupe de vous, et s'occuper de vous consiste, pour cette chose-là, à poser trois mille livres à l'endroit où vous êtes.",
      extreme:"Puis il s'occupe de vous.\n\nS'occuper de vous consiste, pour cette chose-là, à déplacer trois mille livres jusqu'à l'endroit où vous vous trouvez. Il n'y a pas de coup, pas de geste, rien qu'on puisse esquiver au sens où l'on esquive quelque chose : il y a une masse qui avance, et l'endroit où vous êtes cesse d'être disponible.\n\nVous partez de côté et vous partez trop tard. Ce qui vous touche à l'épaule pèse le poids d'un mur." },
    "Vous faites huit pas en l'air et vous atterrissez dans un trou d'eau, ce qui vous sauve la vie et ce que vous ne comprendrez que le lendemain.",
  ],
  effets:{ flags:['ch_co_frappe'], cout:{ endurance:24, vitalite:22, sang:6 },
           meleeMaj:{ position:"dans un trou d'eau, à huit pas", note:"Couper ne fait rien du tout" },
           faire:() => blesser({ id:'ch_co_cotes', zone:"côtes gauches", type:"trois côtes fêlées",
                                 gravite:3, douleur:3, saignement:0, fonction:['endurance','force'],
                                 cicatrice:"trois côtes gauches qui se rappellent au froid" }),
           marque:"La lame entre de deux pieds et la tourbe se referme. Couper ne fait rien.",
           court:"Rien du tout" },
  suite:'ch_co_comprendre', libelleSuite:"Alors autre chose" },

ch_co_couper_cata:{
  melee:true,
  titre:"L'épée reste dedans",
  texte:[
    "Vous frappez de toute votre force, à deux mains, avec la hanche, dans ce qui devrait être une poitrine.",
    { sobre:"La lame entre jusqu'à la garde. Et elle y reste.",
      intense:"La lame entre jusqu'à la garde et la tourbe se referme dessus. Vous tirez. Elle ne vient pas. Vous tirez à deux mains, les pieds calés, et elle ne vient toujours pas — trois pieds de tourbe compactée tiennent un homme mieux qu'une main.",
      extreme:"La lame entre jusqu'à la garde et la tourbe se referme dessus en trois secondes.\n\nVous tirez. Elle ne vient pas. Vous tirez à deux mains, les deux pieds calés contre la masse, en donnant tout ce qu'un homme peut donner debout — et elle ne vient pas.\n\nTrois pieds de tourbe compactée tiennent une lame mieux que n'importe quelle main. Vous êtes attaché par les deux bras à une chose de trois mille livres qui, à cet instant précis, décide de repartir vers le nord." },
    "Vous lâchez. Il n'y a rien d'autre à faire et il faut trois secondes pour l'accepter, ce qui est deux secondes de trop.",
    { sobre:"Il emporte votre épée dans la tourbière.",
      intense:"Il emporte votre épée. Elle est dedans, à hauteur de ce qui serait un sternum, et elle part avec lui vers le nord dans une tourbière de quatre lieues sur deux.\n\nUne épée bâtarde usée, remontée deux fois, payée avec l'argent d'un contrat dont vous ne parlez pas.",
      extreme:"Il emporte votre épée.\n\nElle est dedans, à hauteur de ce qui serait un sternum, la garde qui dépasse d'un pouce, et elle part avec lui vers le nord à travers quatre lieues de tourbière.\n\nUne épée bâtarde usée, remontée deux fois, payée avec l'argent d'un contrat dont vous ne parlez à personne, achetée à un armurier qui ne posait pas de questions. Onze ans.\n\nVous restez debout au milieu d'une tourbière, la nuit, avec une dague et deux pistolets déchargés, à regarder une chose de onze pieds s'éloigner avec la seule possession que vous ayez jamais eue." },
  ],
  effets:{ flags:['ch_co_epee_perdue'], cout:{ endurance:20, moral:14 },
           meleeMaj:{ position:"debout, la dague à la main", note:"Il est parti avec votre épée" },
           marque:"Il est parti dans la tourbière avec votre épée dedans.", court:"Votre épée" },
  plusTard:"Une épée bâtarde coûte cent dix couronnes chez un armurier qui pose des questions.",
  suite:'ch_co_comprendre', libelleSuite:"Alors autre chose" },

ch_co_compris_dom:{
  melee:true,
  titre:"Ce qui le tient debout",
  texte:[
    "Vous ne frappez pas. Vous le regardez prendre trois cents briques, et vous regardez surtout **comment**.",
    { sobre:"Il ne les ramasse pas. Il les incorpore, et toujours au même endroit.",
      intense:"Il ne ramasse rien : il pose la masse sur le tas et le tas devient lui. Et il le fait toujours de la même façon — la tourbe neuve va aux extrémités, jamais au centre. Le centre, il ne le touche pas.",
      extreme:"Il ne ramasse rien du tout. Il pose la masse sur le tas et le tas cesse d'être un tas.\n\nEt il le fait toujours de la même façon, ce qui est le renseignement : la tourbe neuve va aux extrémités. Les jambes, les bras, le dessus. Jamais au centre.\n\nLe centre, il ne le touche pas. Il ne le remplit pas, il ne le remplace pas, il ne le fait pas circuler avec le reste. Il y a, à hauteur de poitrine, un volume de la taille d'un homme accroupi que trois cents briques neuves contournent soigneusement." },
    "§ Une chose sans organes qui se reconstruit indéfiniment autour d'un point qu'elle ne remplace jamais **n'est pas vivante autour de ce point** : elle est vivante à cause de lui.",
    { sobre:"Vous l'avez déjà vue, cette forme, dans le noir. Il y a quatre ans un homme y a été mis.",
      intense:"Et vous savez ce qu'il y a au centre, parce qu'un homme qui coupe de la tourbe depuis vingt-deux ans vous l'a dit sans savoir ce qu'il disait : *la tourbe garde et elle rend*.\n\nElle garde tout. Elle garde un cerf de cent ans avec ses yeux. Elle garde une chemise avec ses points de couture.\n\nElle a gardé quelqu'un, et cette année elle a décidé de le rendre debout.",
      extreme:"Et vous savez ce qu'il y a au centre.\n\nUn homme qui coupe de la tourbe depuis vingt-deux ans vous l'a dit hier sans se douter une seconde de ce qu'il disait : *la tourbe garde et elle rend*.\n\nElle garde tout. Un cerf de cent ans avec ses yeux. Une chemise avec ses points de couture. Trois hommes en vingt-deux ans, dont aucun n'a jamais été réclamé.\n\nElle a gardé quelqu'un, quelque part sous ces quatre lieues, pendant un temps que personne ne saura jamais. Et cette année, pour une raison qui n'appartient qu'à elle, elle a décidé de le rendre debout." },
  ],
  effets:{ flags:['ch_co_compris','ch_co_centre'],
           meleeMaj:{ position:"immobile, à trente pas", note:"Le centre n'est jamais remplacé" },
           exploit:{ eclat:4, temoins:'aucun',
                     quoi:"vous avez compris ce qui tenait debout une chose sans organes" },
           marque:"La tourbe neuve va aux extrémités. Le centre, il ne le touche jamais.",
           court:"Le centre" },
  suite:'ch_co_final', libelleSuite:"Il faut y arriver" },

ch_co_compris_ok:{
  melee:true,
  titre:"Le centre",
  texte:[
    "Vous le regardez prendre les briques et vous remarquez la seule chose qui compte : la tourbe neuve va toujours aux extrémités.",
    "Le centre — un volume de la taille d'un homme accroupi, à hauteur de poitrine — n'est jamais alimenté, jamais remplacé, jamais mis en circulation avec le reste.",
    "§ Ce n'est pas une chose qui a un cœur. C'est une chose qui a une **armature**, et une armature, ça se retire.",
  ],
  effets:{ flags:['ch_co_compris'],
           meleeMaj:{ position:"immobile, à trente pas", note:"Il a une armature, pas un cœur" },
           marque:"Il n'a pas de cœur : il a une armature au centre, qu'il ne remplace jamais.",
           court:"L'armature" },
  suite:'ch_co_final', libelleSuite:"Il faut y arriver" },

ch_co_redescendre:{
  titre:"Douze hommes et un prêtre",
  texte:[
    "Vous redescendez et vous dites ce que vous avez vu, sans arranger, ce qui prend un temps considérable parce qu'il faut le répéter trois fois.",
    { sobre:"Ils y vont à douze, avec des crocs de tourbe et de la poix.",
      intense:"Ils montent à douze le surlendemain, avec des crocs de tourbe, six torches et deux barils de poix, et le prêtre du bourg qui n'a pas voulu rester en bas.\n\nIls ne le tuent pas. Personne ne tue ça avec des crocs de tourbe.",
      extreme:"Ils montent à douze le surlendemain, avec des crocs de tourbe, six torches, deux barils de poix et le prêtre du bourg qui n'a pas voulu rester en bas et qui n'a servi à rien.\n\nIls ne le tuent pas. Personne ne tue ça avec des crocs de tourbe et de la poix : la tourbe humide ne brûle pas, c'est la première chose que sait un homme qui en coupe, et ils le savaient tous les douze en montant.\n\nIls le repoussent. Ils font ce qu'on fait à un troupeau : ils l'entourent, ils crient, ils agitent du feu, et ils le mènent lentement vers le nord de la tourbière, à deux lieues des bancs de coupe. Ça prend onze heures.\n\nDeux d'entre eux ne redescendent pas. Le prêtre non plus." },
    "§ Ils couperont de la tourbe cette année. Au sud, sur les mauvais bancs, en surveillant le nord.",
    "C'est une solution de gens qui n'ont pas le choix, et elle tiendra jusqu'à ce qu'elle ne tienne plus.",
  ],
  effets:{ flags:['ch_colosse_fait','ch_co_repousse'], cout:{ moral:8 },
           marque:"Douze coupeurs l'ont repoussé au nord en onze heures. Trois ne sont pas redescendus.",
           court:"Repoussé" },
  issue:"L'affaire est réglée par d'autres",
  bilan:"Trois hommes de plus, et de la tourbe au sud",
  apres:[
    "Ils couperont sur les mauvais bancs cette année et l'année prochaine.",
    "La chose est toujours dans la tourbière du nord. Elle prend du poids chaque fois que quelqu'un empile des briques.",
  ],
  suite:'entre_saisons', libelleSuite:"La route" },

/* ── Le comprendre après l'avoir frappé ─────────────────────────────────── */
ch_co_comprendre:{
  melee:true,
  titre:"Ce qui ne se remplace pas",
  texte:[
    "Vous êtes dans un trou d'eau, la nuit, avec des côtes fêlées, et vous regardez repartir une chose de onze pieds que vous ne pouvez pas couper.",
    "C'est le meilleur endroit du monde pour réfléchir, parce qu'il n'y en a pas d'autre.",
    { sobre:"Il vous a frappé et il ne vous a pas achevé.",
      intense:"Il vous a frappé une fois et il ne vous a pas achevé. Il ne vous a même pas suivi. Il est retourné au tas.\n\nUne chose qui tue quatre hommes en trois semaines et qui laisse le cinquième dans un trou d'eau ne chasse pas.",
      extreme:"Il vous a frappé une fois et il ne vous a pas achevé. Il ne vous a pas suivi, il ne vous a pas cherché, il n'a pas manifesté le moindre intérêt pour l'endroit où vous étiez tombé.\n\nIl est retourné au tas de briques.\n\nUne chose qui tue quatre hommes en trois semaines et qui laisse le cinquième vivant dans un trou d'eau à huit pas ne chasse pas. Elle **écarte**. Les quatre coupeurs ne sont pas morts parce qu'ils étaient des proies : ils sont morts parce qu'ils étaient dans le chemin d'une chose qui allait chercher de la tourbe sèche." },
    "Et pendant qu'il charge, vous remarquez enfin ce qu'il faut remarquer : la tourbe neuve va aux extrémités, jamais au centre.",
    "§ Le centre ne se remplace pas. Une chose sans organes qui se reconstruit indéfiniment autour d'un point qu'elle n'alimente jamais tient debout **à cause de ce point**.",
  ],
  effets:{ flags:['ch_co_compris'],
           meleeMaj:{ position:"dans le trou d'eau", note:"Le centre ne se remplace jamais" },
           marque:"Il n'a pas achevé : il n'a jamais chassé. Et il ne remplace jamais son centre.",
           court:"Le centre" },
  suite:'ch_co_final', libelleSuite:"Il faut y arriver" },

/* ── Y arriver ──────────────────────────────────────────────────────────── */
ch_co_final:{
  melee:true,
  lieu:"Les tourbières hautes · avant l'aube",
  titre:"Trois pieds de tourbe",
  texte:[
    "Il y a trois pieds de tourbe compactée entre l'air et le centre, et une masse de trois mille livres autour des trois pieds.",
    { sobre:"On ne coupe pas dedans. On creuse.",
      intense:"On ne coupe pas là-dedans, on l'a essayé. On creuse — et creuser trois pieds de tourbe compactée prend, pour un homme entraîné avec le bon outil, environ deux minutes.\n\nDeux minutes contre une chose de onze pieds, à bout de bras, à l'intérieur d'elle.",
      extreme:"On ne coupe pas là-dedans : c'est déjà fait, ça n'a servi à rien, et la lame se referme derrière.\n\nOn **creuse**. Et creuser trois pieds de tourbe compactée prend, pour un homme entraîné avec le bon outil, à peu près deux minutes.\n\nDeux minutes. Le bras jusqu'à l'épaule dans une chose de trois mille livres, à l'intérieur d'elle, pendant qu'elle fait ce qu'elle fait à ce qui la gêne.\n\nIl y a un croc de tourbe planté au bord du banc de coupe, à quarante pas. C'est le bon outil et c'est le seul." },
  ],
  choix:[
    { t:"Le croc de tourbe. Creuser jusqu'au centre",
      detail:"Endurance · force — deux minutes le bras dedans, et rien pour se protéger",
      risque:"risqué",
      test:{ carac:'endurance', comp:'survie', dc:12, adversaire:'colosse', manoeuvre:'creuser',
             situation:() => (a('ch_co_centre') ? 3 : 0) + (a('ch_co_lu_bien') ? 1 : 0),
             cout:{ endurance:22 } },
      degres:{ dominante:'ch_co_fin_dom', nette:'ch_co_fin_ok', couteuse:'ch_co_fin_cout',
               echec:'ch_co_fin_ko', catastrophe:'ch_co_fin_ko' } },

    { t:"L'amener dans le trou d'eau du frère",
      detail:"Intellect · survie — onze pieds de tourbe dans onze pieds d'eau, et l'eau ne porte rien",
      risque:"calculé",
      test:{ carac:'intellect', comp:'survie', dc:12, adversaire:'colosse', manoeuvre:'noyer',
             situation:() => a('ch_co_lu_bien') ? 3 : 0 },
      degres:{ dominante:'ch_co_eau_dom', nette:'ch_co_eau_dom', couteuse:'ch_co_eau_cout',
               echec:'ch_co_fin_ko', catastrophe:'ch_co_fin_ko' } },

    { t:"Le drain, sur le centre",
      detail:"Ce qui est au centre n'est pas vivant · on ne sait pas ce que ça fera",
      si:() => ETAT.ressources.concentration >= 35,
      avant:() => drainer(20),
      risque:"risqué", va:'ch_co_drain' },
  ],
},

ch_co_fin_dom:{
  melee:true,
  titre:"Deux minutes",
  texte:[
    "Vous prenez le croc, vous entrez dedans par le flanc gauche, et vous creusez.",
    { sobre:"Ça dure deux minutes. C'est très long.",
      intense:"Ça dure deux minutes et deux minutes est une durée que personne n'a jamais correctement décrite. La tourbe est tiède. Elle serre. À chaque brassée elle se referme derrière le croc et il faut recommencer un pouce plus loin.\n\nEt pendant tout ce temps, la chose fait à votre dos ce qu'elle fait à ce qui la gêne.",
      extreme:"Ça dure deux minutes, et personne n'a jamais correctement décrit ce que deux minutes veulent dire.\n\nLa tourbe est tiède — c'est la première chose et c'est celle qu'on ne prévoit pas. Elle serre le bras comme une main qui ne se fatigue jamais. À chaque brassée elle se referme derrière le croc, et il faut recommencer un pouce plus loin en gagnant un demi-pouce.\n\nElle sent la vase, le fer et quelque chose de sucré.\n\nEt pendant tout ce temps, la chose fait à votre dos et à vos jambes ce qu'elle fait à ce qui la gêne : elle appuie. Elle ne frappe pas. Elle appuie, régulièrement, sans se presser, avec trois mille livres." },
    "À la centième seconde, vos doigts touchent quelque chose qui n'est pas de la tourbe.",
    { sobre:"C'est une main. Elle a des doigts et des ongles.",
      intense:"C'est une main. Elle a des doigts, des ongles, et une bague à l'annulaire. La tourbe l'a gardée parfaitement — c'est ce que la tourbe sait faire et c'est la seule chose qu'elle sache faire.\n\nVous fermez la vôtre dessus et vous tirez.",
      extreme:"C'est une main.\n\nElle a des doigts, des ongles, et une bague à l'annulaire. La peau est brune et souple comme du cuir bien traité. La tourbe l'a gardée parfaitement, ce qui est très exactement la seule chose que la tourbe sache faire, et elle la fait depuis le début du monde.\n\nVous fermez votre main sur la sienne — c'est cette phrase-là qui vous restera — et vous tirez." },
    { sobre:"Il s'effondre. Tout d'un coup, sans un bruit.",
      intense:"Il s'effondre. Tout d'un coup, entièrement, sans un bruit et sans une résistance : trois mille livres de tourbe qui cessent en une seconde d'être quoi que ce soit et qui redeviennent trois mille livres de tourbe.\n\nVous êtes dessous. C'est une chose à laquelle vous n'aviez pas pensé et il faut onze minutes pour en sortir.",
      extreme:"Il s'effondre.\n\nTout d'un coup, entièrement, sans un bruit, sans un spasme, sans une seconde de résistance : trois mille livres qui cessent en un instant d'être quoi que ce soit et qui redeviennent exactement ce qu'elles ont toujours été, c'est-à-dire de la tourbe humide.\n\nVous êtes dessous.\n\nC'est une chose à laquelle vous n'aviez pas pensé une seconde, et il faut onze minutes pour en sortir en poussant vers le haut avec ce qui reste, dans le noir, sans savoir dans quelle direction est l'air.\n\nVous en sortez en tenant toujours la main." },
  ],
  effets:{ flags:['ch_co_fini','ch_co_corps'], cout:{ endurance:36, vitalite:14 },
           meleeMaj:{ eux:0, position:"sous trois mille livres de tourbe", note:"Onze minutes pour en sortir" },
           exploit:{ eclat:7, temoins:'aucun',
                     quoi:"vous avez creusé deux minutes à l'intérieur d'une chose de trois mille livres" },
           marque:"Vous avez creusé jusqu'au centre et vous en avez retiré une main qui portait une bague.",
           court:"Une main" },
  suite:'ch_co_qui', libelleSuite:"Qui c'était" },

ch_co_fin_ok:{
  melee:true,
  titre:"Le bras jusqu'à l'épaule",
  texte:[
    "Vous entrez le croc par le flanc et vous creusez, et ça marche, et ça coûte ce que ça doit coûter.",
    { sobre:"Il appuie sur votre dos pendant les deux minutes.",
      intense:"Il appuie sur votre dos pendant les deux minutes entières. Pas un coup : une pression, régulière, de trois mille livres, contre laquelle un homme peut tenir environ cent secondes avant que quelque chose cède.\n\nQuelque chose cède à la centième.",
      extreme:"Il appuie sur votre dos pendant les deux minutes entières.\n\nCe n'est pas un coup. C'est une pression continue et parfaitement régulière de trois mille livres, appliquée sans hâte et sans intention, contre laquelle un homme correctement bâti peut tenir environ cent secondes avant que quelque chose à l'intérieur de lui cède.\n\nQuelque chose cède à la centième seconde, et vous l'entendez de l'intérieur.\n\nVos doigts touchent la main au même moment. C'est de la chance et ce n'est rien d'autre." },
    "Vous tirez. Il s'effondre. Vous êtes dessous et il faut onze minutes pour en sortir avec deux côtes qui ne veulent plus rien.",
  ],
  effets:{ flags:['ch_co_fini','ch_co_corps'], cout:{ endurance:42, vitalite:26, sang:8 },
           meleeMaj:{ eux:0, position:"sous la tourbe", note:"Quelque chose a cédé à la centième seconde" },
           faire:() => blesser({ id:'ch_co_cotes', zone:"côtes gauches", type:"deux côtes rompues",
                                 gravite:3, douleur:3, saignement:0, fonction:['endurance','force'],
                                 cicatrice:"deux côtes gauches qui n'ont jamais bien repris" }),
           exploit:{ eclat:6, temoins:'aucun', quoi:"vous avez tenu cent secondes sous trois mille livres" },
           marque:"Vous avez creusé jusqu'au centre. Deux côtes ont cédé à la centième seconde.",
           court:"Cent secondes" },
  suite:'ch_co_qui', libelleSuite:"Qui c'était" },

ch_co_fin_cout:{
  melee:true,
  titre:"Le bras",
  texte:[
    "Vous entrez le croc et vous creusez et il fait ce qu'il fait, sauf que cette fois il ne se contente pas d'appuyer sur votre dos : il referme.",
    { sobre:"La tourbe se referme sur votre bras jusqu'à l'épaule.",
      intense:"La tourbe se referme sur votre bras droit jusqu'à l'épaule et **serre**. Pas comme une main : comme trois pieds de terre compactée qui décident ensemble de se rapprocher.\n\nVous atteignez le centre quand même. Vous tirez de la main gauche, à l'aveugle, et vous avez de la chance.",
      extreme:"La tourbe se referme sur votre bras droit jusqu'à l'épaule et serre.\n\nPas comme une main serre. Comme trois pieds de terre compactée qui décident tous ensemble et en même temps de se rapprocher d'un pouce, ce qui est très largement suffisant.\n\nL'humérus tient. Le reste, non : les deux os de l'avant-bras cèdent l'un après l'autre à environ une seconde d'intervalle, et vous entendez les deux.\n\nVous atteignez le centre quand même, de la main gauche, en aveugle, en poussant l'épaule dans le trou que le croc avait ouvert. Vous trouvez la main. Vous tirez. C'est de la chance et vous le saurez toute votre vie." },
    "Il s'effondre. Vous restez dessous quatorze minutes avec un bras qui n'est plus un bras.",
  ],
  effets:{ flags:['ch_co_fini','ch_co_corps'], cout:{ endurance:48, vitalite:34, sang:14 },
           meleeMaj:{ eux:0, position:"sous la tourbe", note:"L'avant-bras droit a cédé" },
           faire:() => blesser({ id:'ch_co_bras', zone:"avant-bras droit", type:"les deux os rompus",
                                 gravite:4, douleur:4, saignement:1, fonction:['epees','force','tir'],
                                 cicatrice:"un avant-bras droit qui a deux angles au lieu d'un" }),
           exploit:{ eclat:6, temoins:'aucun', quoi:"vous avez atteint le centre de la main gauche" },
           marque:"La tourbe a refermé sur votre bras droit. Vous avez fini de la main gauche.",
           court:"De la main gauche" },
  plusTard:"Deux os de l'avant-bras qui se ressoudent seuls dans une tourbière ne se ressoudent jamais droits.",
  suite:'ch_co_qui', libelleSuite:"Qui c'était" },

ch_co_fin_ko:{
  melee:true,
  titre:"Deux minutes, c'est trop",
  texte:[
    "Deux minutes est une durée qu'on n'obtient pas.",
    { sobre:"À la quarantième seconde, il vous décolle et vous jette.",
      intense:"À la quarantième seconde il cesse d'appuyer et il fait autre chose : il se retourne. Trois mille livres qui se retournent avec un bras humain dedans, ça arrache le bras ou ça arrache l'homme, et vous avez la chance que ce soit la seconde.\n\nVous faites onze pas en l'air.",
      extreme:"À la quarantième seconde, il cesse d'appuyer et il fait tout autre chose : il se retourne.\n\nTrois mille livres qui pivotent avec un bras humain enfoncé jusqu'au coude à l'intérieur, ça arrache le bras ou ça arrache l'homme. Vous avez la chance considérable que ce soit la seconde option.\n\nVous faites onze pas en l'air et vous atterrissez sur le banc de coupe, sur des briques empilées, ce qui est la pire surface disponible dans quatre lieues." },
    "Il ne vous suit pas. Il ne vous a jamais suivi. Il retourne à son tas et il finit de charger, et à l'aube il n'est plus là.",
    "§ Vous savez maintenant ce qui le tient debout, et vous savez que vous n'avez pas eu les deux minutes.",
  ],
  effets:{ cout:{ endurance:44, vitalite:30, sang:10, moral:8 },
           meleeMaj:{ eux:1, position:"sur le banc de coupe", note:"Il est reparti · vous savez comment faire" },
           faire:() => { blesser({ id:'ch_co_epaule', zone:"épaule droite", type:"démise",
                                   gravite:3, douleur:3, saignement:0, fonction:['force','epees'],
                                   cicatrice:"une épaule droite qui sort seule une fois par an" });
                         blesser({ id:'ch_co_dos', zone:"reins", type:"contusion profonde",
                                   gravite:2, douleur:3, saignement:0, fonction:['endurance','agilite'],
                                   cicatrice:"des reins qui préviennent trois jours avant la pluie" }); },
           marque:"Il vous a jeté à la quarantième seconde. Vous savez comment le tuer et vous ne l'avez pas fait.",
           court:"Quarante secondes" },
  suite:'ch_co_bilan', libelleSuite:"Redescendre" },

ch_co_eau_dom:{
  melee:true,
  titre:"L'eau ne porte rien",
  texte:[
    "Vous ne creusez pas. Vous marchez.",
    { sobre:"Vous prenez le tas de briques et vous partez avec.",
      intense:"Vous chargez ce que vous pouvez porter de tourbe sèche — soixante livres, pas davantage — et vous partez vers le trou d'eau du frère, à quatre cents pas, en laissant tomber une brique tous les dix pas.\n\nIl suit. Bien sûr qu'il suit : c'est la seule chose qui l'intéresse au monde.",
      extreme:"Vous chargez sur l'épaule ce qu'un homme peut porter de tourbe sèche — soixante livres, pas une de plus, et c'est déjà trop — et vous partez vers le nord-est, vers le trou d'eau que le frère du chef d'équipe a ouvert il y a onze ans.\n\nQuatre cents pas. Vous laissez tomber une brique tous les dix pas.\n\nIl suit. Évidemment qu'il suit : de la tourbe sèche est la seule chose au monde qui l'intéresse, et il vient d'en voir passer soixante livres devant lui.\n\nÇa prend une demi-heure. C'est la demi-heure la plus étrange de votre vie : un homme qui marche dans une tourbière à l'aube en semant des briques, avec onze pieds de terre debout derrière lui à trente pas, sans se presser ni l'un ni l'autre." },
    "Le trou d'eau du frère fait onze pieds de profondeur et douze de large. Un coupeur de tourbe l'a ouvert en 1181 et n'a jamais réussi à l'assécher.",
    "Vous jetez les soixante dernières livres au milieu, et vous vous écartez.",
    { sobre:"Il entre dedans. Il ne remonte pas.",
      intense:"Il entre dedans sans une hésitation, parce qu'une chose qui n'a ni yeux ni tête n'a aucun moyen de savoir ce qu'est un trou.\n\nEt la tourbe humide ne flotte pas. Elle ne se tient pas non plus : elle a besoin d'être compactée, et onze pieds d'eau ne compactent rien du tout. Il se défait par le bas.",
      extreme:"Il entre dedans sans une seconde d'hésitation, parce qu'une chose qui n'a ni yeux ni tête ni la moindre expérience du monde n'a aucun moyen de savoir ce qu'est un trou.\n\nEt la tourbe humide ne flotte pas.\n\nElle ne se tient pas non plus : ce qui fait tenir cette chose debout, ce n'est pas de la magie, c'est du compactage — trois mille livres serrées les unes contre les autres par leur propre poids. Onze pieds d'eau ne compactent rien du tout. Ils font exactement l'inverse.\n\nIl se défait par le bas. Ça prend quatre minutes. Il n'y a pas de lutte, pas de bruit, rien à regarder : une colonne de onze pieds qui devient neuf, puis six, puis une surface d'eau brune qui bouge un peu.\n\nÀ la fin il reste quelque chose qui flotte au milieu, et ce quelque chose a la taille d'un homme accroupi." },
  ],
  effets:{ flags:['ch_co_fini','ch_co_corps','ch_co_noye'], cout:{ endurance:26 },
           meleeMaj:{ eux:0, position:"au bord du trou d'eau", note:"Il s'est défait par le bas" },
           exploit:{ eclat:8, temoins:'aucun',
                     quoi:"vous avez mené onze pieds de tourbe dans onze pieds d'eau, en semant des briques" },
           marque:"Vous l'avez mené au trou d'eau avec soixante livres de tourbe sèche. Il s'est défait en quatre minutes.",
           court:"Le trou d'eau" },
  suite:'ch_co_qui', libelleSuite:"Ce qui flotte" },

ch_co_eau_cout:{
  melee:true,
  titre:"Quatre cents pas",
  texte:[
    "L'idée est bonne. Les quatre cents pas ne le sont pas.",
    { sobre:"Il vous rattrape au troisième cent.",
      intense:"Il vous rattrape au troisième cent, parce qu'un homme qui porte soixante livres de tourbe sur une tourbière détrempée ne va pas vite et qu'une chose qui ne pose pas ses pieds ne ralentit jamais.\n\nVous jetez la charge et vous courez. Il prend la charge. Vous avez perdu l'appât et gagné trois cents pas.",
      extreme:"Il vous rattrape au troisième cent.\n\nC'est de l'arithmétique et elle était prévisible : un homme qui porte soixante livres de tourbe humide sur une tourbière détrempée fait environ deux cents pas à la minute, et une chose qui ne pose jamais ses pieds ne ralentit jamais, ne fatigue jamais et ne choisit pas son terrain.\n\nVous jetez la charge et vous courez sans elle. Il prend la charge, parce que c'est tout ce qu'il voulait depuis le début et qu'il n'a jamais eu la moindre intention de vous suivre, vous.\n\nVous avez perdu l'appât. Vous avez gagné trois cents pas et une côte." },
    "Vous recommencez à l'aube, avec un deuxième tas, en partant de plus près. Ça marche. Ça vous aura coûté une nuit entière et ce que coûte une nuit entière.",
  ],
  effets:{ flags:['ch_co_fini','ch_co_corps','ch_co_noye'], cout:{ endurance:44, vitalite:12 },
           meleeMaj:{ eux:0, position:"au bord du trou d'eau", note:"Deux tentatives · une nuit entière" },
           faire:() => blesser({ id:'ch_co_cote', zone:"côte flottante droite", type:"fêlée",
                                 gravite:2, douleur:2, saignement:0, fonction:['endurance'],
                                 cicatrice:"une côte flottante qui craque au réveil" }),
           exploit:{ eclat:5, temoins:'aucun', quoi:"vous l'avez mené au trou d'eau, à la deuxième tentative" },
           marque:"Il vous a rattrapé au troisième cent. Vous avez recommencé à l'aube.",
           court:"Deux fois" },
  suite:'ch_co_qui', libelleSuite:"Ce qui flotte" },

ch_co_drain:{
  melee:true,
  titre:"Il n'y a rien à prendre",
  texte:[
    "Vous ouvrez sur le centre. C'est la première fois que vous le faites sur quelque chose qui n'est pas vivant, et il n'y a aucune raison que ça marche.",
    { sobre:"Ça marche. C'est le problème.",
      intense:"Ça marche, et c'est précisément le problème : il y a quelque chose à prendre là-dedans, ce qui veut dire qu'il y a quelque chose de vivant au centre d'une colonne de tourbe de onze pieds.\n\nCe n'est pas la chose qui est vivante. C'est ce qu'elle porte.",
      extreme:"Ça marche.\n\nC'est très exactement le problème et vous le comprenez dans la première demi-seconde : il y a quelque chose à prendre là-dedans. Le Drain ne prend pas dans la pierre, ne prend pas dans l'eau, ne prend pas dans un mort de trois jours — vous avez essayé, une fois, à vingt-trois ans, et vous n'en parlez à personne.\n\nIl prend ici.\n\nDonc il y a quelque chose de vivant au centre d'une colonne de tourbe de onze pieds de haut. Pas la colonne : ce qu'elle porte. Et ce que vous prenez a un goût que vous n'avez jamais rencontré — pas le cuivre habituel : quelque chose de très vieux, de très patient, et de parfaitement conscient." },
    { sobre:"Il s'arrête. Toute la masse s'arrête, d'un coup.",
      intense:"Il s'arrête. Toute la masse s'arrête d'un coup, en pleine action, et la partie haute — celle qui n'a pas de visage — s'oriente vers vous et **reste orientée**.\n\nPour la première fois depuis trois semaines, cette chose s'occupe de quelqu'un.",
      extreme:"Il s'arrête.\n\nToute la masse s'arrête d'un seul coup, en pleine action, avec la brutalité d'un mécanisme dont on a coincé la roue. La partie haute — celle qui n'a ni yeux ni visage — s'oriente vers vous et **reste orientée**.\n\nPour la première fois en trois semaines, cette chose s'occupe de quelqu'un. Les quatre coupeurs étaient dans le chemin. Vous, non : vous venez de la toucher à l'endroit où elle est.\n\nEt vous savez, avec une certitude froide qui ne vient d'aucun raisonnement, que ce qui est au centre vient de comprendre qu'il existe au monde quelqu'un capable d'aller le chercher là où il est." },
    "§ Vous lâchez. Vous reculez de vingt pas. Il ne bouge pas pendant tout ce temps.",
    "Puis il retourne au tas, il finit de charger, et il repart vers le nord. Et pendant les trois cents pas qu'il met à s'éloigner, la partie haute reste tournée vers vous.",
  ],
  effets:{ flags:['ch_co_drain_vu','ch_co_vu_par'], cout:{ endurance:12, concentration:10 },
           meleeMaj:{ eux:1, position:"à vingt pas", note:"Il est tourné vers vous et il le reste" },
           marque:"Vous avez drainé le centre. Il y avait quelque chose à prendre, et ça vous a vu.",
           court:"Il vous a vu" },
  plusTard:"Une chose qui vous a remarqué dans une tourbière de quatre lieues sait maintenant qu'un homme peut aller là où elle est.",
  suite:'ch_co_bilan', libelleSuite:"Redescendre" },

/* ── Qui c'était ────────────────────────────────────────────────────────── */
ch_co_qui:{
  lieu:"Les tourbières hautes · au jour",
  titre:"Ce que la tourbe gardait",
  texte:[
    "Il est étendu sur les briques, au jour, et vous le regardez pendant un long moment sans rien faire d'utile.",
    { sobre:"Un homme. Trente ans, peut-être. Les mains liées derrière.",
      intense:"Un homme. Trente ans, peut-être trente-cinq. La peau brune et souple, les cheveux intacts, les ongles intacts, une chemise dont on voit encore les points de couture.\n\nLes deux mains liées derrière le dos, avec une corde qui a mieux tenu que lui.\n\nEt le crâne ouvert par-derrière, sur quatre pouces, d'un seul coup.",
      extreme:"Un homme. Trente ans, peut-être trente-cinq — la tourbe ne rend pas les âges, elle rend les visages.\n\nLa peau brune et souple comme du cuir bien traité. Les cheveux entiers, roux foncé. Les ongles entiers. Une chemise de toile fine dont on voit encore les points de couture et le fil, et que personne dans cette vallée n'aurait jamais pu payer.\n\nLes deux mains liées derrière le dos avec une corde de chanvre qui a considérablement mieux tenu que lui.\n\nEt le crâne ouvert par-derrière, sur quatre pouces, d'un seul coup, par quelqu'un qui savait où frapper et qui n'a pas eu à s'y reprendre." },
    "Il porte une bague à l'annulaire gauche. Elle est en argent et elle a un chaton plat.",
    { sobre:"Le chaton a été limé. Entièrement.",
      intense:"Le chaton a été limé. Entièrement, à plat, jusqu'à ne plus rien porter du tout — et on ne lime pas une bague sur un mort par cupidité, parce qu'une bague limée ne vaut plus rien du tout.\n\nOn lime un chaton pour une seule raison au monde : parce qu'il y avait des armes dessus.",
      extreme:"Le chaton a été limé.\n\nEntièrement, à plat, avec soin, jusqu'à ne plus rien porter du tout — et on voit encore le sens des traits de lime, parce que la tourbe garde même ça.\n\nOn ne lime pas une bague au doigt d'un mort par cupidité : une bague limée ne vaut plus que le poids de son argent, c'est-à-dire moins que le temps qu'on a passé à la limer. Et on ne la retire pas, ce qui aurait été infiniment plus simple.\n\nOn lime un chaton pour une seule raison au monde. Parce qu'il portait des armes, et parce qu'on veut que l'homme reste au doigt sans que le doigt dise de qui il s'agit.\n\nOn a pris le temps de faire ça. Puis on l'a porté jusqu'ici, à quatre lieues du premier chemin, sur une tourbière qui garde tout, et on l'a mis dans un trou en sachant parfaitement qu'elle garderait." },
    "§ Il y a dix-neuf ans, sept cents personnes se sont couchées nobles et se sont réveillées inexistantes.",
    { sobre:"Vous ne saurez jamais s'il en était.",
      intense:"Vous ne saurez jamais s'il en était. Il n'y a aucun moyen de le savoir : c'est très exactement le but de la manœuvre, et la manœuvre a réussi.\n\nCe que vous savez, c'est qu'un homme de qualité a eu les mains liées, le crâne ouvert, sa bague limée sur son propre doigt, et quatre lieues de tourbière — et que quelqu'un a trouvé que ça valait le déplacement.",
      extreme:"Vous ne saurez jamais s'il en était.\n\nIl n'existe aucun moyen de le savoir. C'est très précisément le but de toute la manœuvre, et la manœuvre a parfaitement réussi : c'est même la seule chose dont on puisse être certain en le regardant.\n\nCe que vous savez tient en une phrase. Un homme de qualité a eu les deux mains liées, le crâne ouvert d'un coup par quelqu'un qui savait où frapper, sa bague limée à plat sur son propre doigt vivant ou mort, et quatre lieues de tourbière à parcourir sur le dos de quelqu'un qui a trouvé que ça valait le déplacement.\n\nUn homme qu'on veut simplement tuer, on le laisse au bord d'un chemin. Un homme qu'on veut effacer coûte une journée de marche." },
    "Vous refermez sa main. La bague reste dessus : elle n'appartient à personne d'autre.",
  ],
  effets:{ flags:['ch_colosse_fait','ch_co_bague','vu_raye'],
           cout:{ moral:10 },
           exploit:{ eclat:3, temoins:'aucun', quoi:"vous avez sorti de la tourbe un homme que quelqu'un avait effacé" },
           marque:"Un homme aux mains liées, le crâne ouvert, la bague limée à plat. On l'a porté à quatre lieues pour l'effacer.",
           court:"La bague limée" },
  issue:"La chose est défaite",
  bilan:"Ce que la tourbe gardait, et ce qu'on avait voulu qu'elle garde",
  apres:[
    "Les coupeurs remonteront en avril. Ils couperont sur les bons bancs, et personne ne saura jamais pourquoi.",
    "Le chef d'équipe fait enterrer le corps au bourg, dans le carré des inconnus, avec les deux autres que la tourbière a rendus en vingt-deux ans.",
  ],
  plusTard:"Quelqu'un, quelque part, a limé un chaton à plat et compte sur la tourbe. La tourbe a rendu.",
  suite:'entre_saisons', libelleSuite:"La route" },

ch_co_bilan:{
  lieu:"Les tourbières hautes · au jour",
  titre:"Il est toujours là",
  texte:[
    "Vous redescendez au jour. Le chef d'équipe vous regarde arriver et il ne demande rien, parce qu'un homme qui redescend d'une tourbière en boitant a déjà répondu.",
    "@« Il est toujours là. »",
    "« Je sais. »",
    "§ Vous lui dites ce qu'il faut savoir : que ça ne se coupe pas, que le centre ne se remplace jamais, et qu'il y a quelqu'un dedans.",
    { sobre:"Il écoute jusqu'au bout. Puis il dit une seule chose.",
      intense:"Il écoute jusqu'au bout, sans une interruption. Puis il dit une seule chose, et ce n'est pas celle qu'on attend.\n\n« Alors on ne le brûlera pas. »",
      extreme:"Il écoute jusqu'au bout sans une seule interruption, ce qui prend un moment.\n\nPuis il dit une seule chose, et ce n'est absolument pas celle qu'on attend d'un homme qui a perdu quatre de ses gens et son frère.\n\n« Alors on ne le brûlera pas. »\n\nUn temps.\n\n« On a voté avant-hier. On montait à douze avec de la poix. Maintenant il y a quelqu'un dedans, et on ne brûle pas quelqu'un. » Il regarde la tourbière. « On coupera au sud. »" },
  ],
  effets:{ flags:['ch_colosse_fait','ch_co_reste'],
           marque:"Vous leur avez dit qu'il y avait quelqu'un dedans. Ils ne le brûleront pas.",
           court:"On coupera au sud" },
  issue:"L'affaire reste ouverte",
  bilan:"De la tourbe au sud, et une chose au nord",
  apres:[
    "Ils couperont sur les mauvais bancs cette année et les suivantes, et le hameau du bas manquera de tourbe.",
    "Ce qui est au centre est toujours au centre. Personne ne sait qui c'était et personne ne le saura.",
  ],
  suite:'entre_saisons', libelleSuite:"La route" },

/* ══════════════════════════════════════════════════════════════════════════
 * 4 · LA REINE DES GALERIES
 *
 * La chasse la plus profonde et la plus étroite du jeu. Elle se joue dans
 * un endroit où l'on ne peut pas se retourner, contre quelque chose qui n'a
 * pas besoin de se retourner.
 *
 * Le choix qu'elle pose est propre : on brûle — et l'on tue la seule
 * ressource de trois cents personnes — ou on descend. Puis on découvre en
 * bas la chose qui interdit de brûler, et le choix propre disparaît.
 * ══════════════════════════════════════════════════════════════════════════ */
ch_reine:{
  lieu:"Contreforts nains · le puits sept · un jour de pluie",
  titre:"Le puits sept",
  texte:[
    "Le puits sept n'est pas le puits trois. Il est à trois lieues plus haut, il appartient à personne en particulier, et une centaine de familles y taillent du minerai de fer depuis quatre générations sans que quiconque ait jamais rédigé quoi que ce soit à ce sujet.",
    "On y descend par un plan incliné de six cents pieds, sur une échelle de bois qu'on refait tous les onze ans.",
    { sobre:"Personne n'y est descendu depuis dix-neuf jours.",
      intense:"Personne n'y est descendu depuis dix-neuf jours. Neuf hommes sont en bas — l'équipe du fond, celle qui reste en dessous pendant les six jours d'une taille — et il n'y a plus eu un seul signal de corde depuis le dix-neuvième matin.",
      extreme:"Personne n'y est descendu depuis dix-neuf jours.\n\nNeuf hommes sont en bas. C'est l'équipe du fond : celle qui reste en dessous pendant les six jours entiers d'une taille, qui dort en bas, qui mange ce qu'on lui descend, et qui remonte le septième jour.\n\nIl n'y a plus eu un seul signal de corde depuis le dix-neuvième matin. Le signal, c'est trois tractions. On l'attend à la sixième heure, tous les jours, depuis quatre générations.\n\nDix-neuf matins. Trois cents personnes dans ce village comptent les matins." },
    "« On a descendu quatre hommes le sixième jour », vous dit la femme qui tient les cordes. « Ils sont remontés. »",
    "@« Alors ce n'est pas un éboulement. »",
    { sobre:"« Non. Ce n'est pas un éboulement. »",
      intense:"« Non. » Elle a soixante ans et elle tient les cordes de ce puits depuis trente-huit. « Ce n'est pas un éboulement. Ils sont descendus jusqu'à la troisième taille, ils ont trouvé la galerie ouverte, l'air bon, les lampes en place — et ils sont remontés au bout de vingt minutes sans pouvoir dire pourquoi. »",
      extreme:"« Non. »\n\nElle a soixante ans et elle tient les cordes de ce puits depuis trente-huit. Elle ne parle pas beaucoup et elle ne dit rien d'inexact.\n\n« Ce n'est pas un éboulement. Ils sont descendus jusqu'à la troisième taille. La galerie est ouverte, l'air est bon — la lampe brûlait droit —, les outils sont en place et les lampes de l'équipe sont accrochées où elles doivent être.\n\nEt ils sont remontés au bout de vingt minutes en courant, tous les quatre, sans pouvoir dire pourquoi. »\n\nUn temps.\n\n« Ce sont quatre hommes de cinquante ans qui descendent depuis l'enfance. Aucun des quatre n'a été capable de me dire ce qu'il avait vu. Le plus vieux m'a dit : *il y a une odeur*. C'est tout ce que j'ai en dix-neuf jours. »" },
    "§ Neuf hommes. Dix-neuf jours. Personne ne paie et personne ne vous demande rien.",
  ],
  choix:[
    { t:"Descendre",
      detail:"Six cents pieds, une échelle de bois, et ce que quatre hommes n'ont pas pu nommer",
      risque:"risqué", va:'ch_re_descente' },

    { t:"Demander l'odeur",
      detail:"Intellect · bestiaire — quatre hommes de cinquante ans ne courent pas pour une odeur ordinaire",
      risque:"favorable",
      test:{ carac:'intellect', comp:'bestiaire', dc:11, manoeuvre:'odeur' },
      degres:{ dominante:'ch_re_odeur_dom', nette:'ch_re_odeur_ok', couteuse:'ch_re_odeur_ok',
               echec:'ch_re_odeur_ko', catastrophe:'ch_re_odeur_ko' } },

    { t:"Leur dire de noyer le puits",
      detail:"Il y a une rivière à deux cents pas · ça règle tout, et le fer avec",
      risque:"définitif", definitif:true,
      ferme:"Ferme : le puits sept, et ce qu'il y avait dedans",
      va:'ch_re_noyer' },
  ],
},

ch_re_noyer:{
  titre:"Deux cents pas",
  texte:[
    "Vous le proposez. C'est la solution raisonnable et tout le monde le sait avant que vous ouvriez la bouche.",
    { sobre:"Elle refuse. Sans hésiter et sans discuter.",
      intense:"Elle refuse sans une seconde d'hésitation.\n\n« Neuf hommes sont en bas. »\n\n@« Depuis dix-neuf jours. »\n\n« Neuf hommes sont en bas », répète-t-elle, exactement du même ton, et il devient très clair qu'elle ne dira rien d'autre aujourd'hui ni demain.",
      extreme:"Elle refuse sans une seconde d'hésitation et sans changer d'expression.\n\n« Neuf hommes sont en bas. »\n\n@« Depuis dix-neuf jours. »\n\n« Neuf hommes sont en bas. »\n\nElle le répète exactement du même ton, mot pour mot, et il devient parfaitement clair qu'elle ne dira rien d'autre aujourd'hui, ni demain, ni le mois prochain.\n\nCe n'est pas de l'espoir. Une femme qui tient les cordes d'un puits depuis trente-huit ans sait très bien ce que veut dire dix-neuf jours. C'est autre chose, et cette autre chose est probablement la seule raison pour laquelle cent familles taillent encore du fer ici depuis quatre générations : **on ne noie pas un puits où il y a quelqu'un.**\n\nJamais. Sous aucun prétexte. Même mort. Surtout mort." },
    "§ Vous êtes reparti le lendemain. Personne ne vous en a voulu et personne ne vous a retenu.",
  ],
  effets:{ flags:['ch_reine_faite','ch_reine_refusee'], cout:{ moral:6 },
           marque:"Vous avez proposé de noyer le puits sept. Elle a refusé deux fois, du même ton.",
           court:"Le puits sept" },
  issue:"L'affaire n'a pas eu lieu",
  bilan:"Neuf hommes, et une femme qui tient les cordes",
  apres:[
    "Ils ont fini par descendre eux-mêmes, en Floréal, à onze. Sept sont remontés.",
    "Le puits sept ne produit plus. Cent familles taillent au puits neuf, qui est moins bon, et le village a perdu un tiers de son monde en trois ans.",
  ],
  suite:'entre_saisons', libelleSuite:"La route" },

ch_re_odeur_dom:{
  titre:"Ce que c'est",
  texte:[
    "Vous lui demandez de décrire l'odeur. Elle vous emmène voir le plus vieux des quatre, qui n'a pas redescendu depuis et qui ne redescendra plus.",
    { sobre:"« Du miel. Et de la viande. »",
      intense:"« Du miel », dit-il. « Et de la viande. Les deux en même temps, et ce n'est pas mélangé : c'est du miel, et à côté c'est de la viande. »\n\nIl le dit en regardant ses mains, et il a soixante-deux ans.",
      extreme:"« Du miel », dit-il.\n\nIl a soixante-deux ans, il descend depuis qu'il en a neuf, et il regarde ses mains pendant tout le temps qu'il parle.\n\n« Et de la viande. Les deux en même temps, et ce n'est pas mélangé, vous comprenez ? Ce n'est pas une odeur qui serait entre les deux. C'est du miel, et à côté c'est de la viande. Comme deux choses posées sur la même table.\n\nEt c'est **tiède**. À six cents pieds, où il fait la même température toute l'année depuis le début du monde, l'air de la troisième taille était tiède. »" },
    "§ Du sucre et des protéines, tenus chauds, dans un espace fermé.",
    { sobre:"Ce n'est pas un prédateur. C'est un couvain.",
      intense:"Ce n'est pas un prédateur. Un prédateur ne chauffe pas son air et ne sent pas le sucre.\n\nC'est un **couvain**. Et un couvain à six cents pieds sous terre veut dire trois choses : il y a une pondeuse, elle est plus grosse que tout ce qui l'entoure, et elle ne se déplace pas.",
      extreme:"Ce n'est pas un prédateur. Un prédateur ne chauffe pas son air, ne sent pas le sucre, et n'a aucune raison au monde de rester dix-neuf jours au même endroit.\n\nC'est un **couvain**.\n\nUn couvain à six cents pieds sous terre veut dire trois choses, et les trois sont mauvaises dans des sens différents. Il y a une pondeuse. Elle est nécessairement plus grosse que tout ce qui l'entoure, parce que c'est la seule chose qu'une pondeuse ait à être. Et elle **ne se déplace pas** — ce qui est la seule bonne nouvelle de la journée, et c'est aussi ce qui rend la galerie mortelle : ce qui ne se déplace pas ne vous poursuivra jamais, et ce qui ne vous poursuit pas n'a aucune raison de vous laisser sortir.\n\nQuant au miel : ce n'est pas du miel. C'est ce qu'on donne à manger à ce qui va éclore." },
    "@« Et les neuf hommes ? »",
    { sobre:"Long silence.",
      intense:"Long silence.\n\n« Une pondeuse ne mange pas neuf hommes en dix-neuf jours », dites-vous enfin. « Ce n'est pas ce qu'elle en fait. »\n\nLe vieux relève la tête pour la première fois.",
      extreme:"Long silence. Il n'y a rien à répondre à cette question-là et vous le savez tous les deux.\n\n@« Une pondeuse ne mange pas neuf hommes en dix-neuf jours. Ce n'est pas ce qu'elle fait, et ce n'est pas à ça que servent neuf hommes. »\n\nLe vieux relève la tête pour la première fois depuis le début de la conversation.\n\n« Alors ils sont vivants. »\n\n@« Je n'ai pas dit ça. »\n\n« Vous venez de le dire. »\n\nEt il a raison, et c'est très exactement ce que vous venez de dire, et il n'y a plus aucune façon de descendre dans ce puits en pensant à autre chose." },
  ],
  effets:{ flags:['ch_re_su','ch_re_couvain'],
           exploit:{ eclat:3, temoins:'un', quoi:"vous avez nommé la chose avant de la voir" },
           marque:"Du miel et de la viande, et l'air tiède à six cents pieds. C'est un couvain.",
           court:"Un couvain" },
  suite:'ch_re_descente', libelleSuite:"Descendre" },

ch_re_odeur_ok:{
  titre:"Du miel et de la viande",
  texte:[
    "« Du miel », dit le plus vieux des quatre. « Et de la viande. Les deux en même temps, et pas mélangées. Et l'air était tiède. »",
    "§ À six cents pieds, où la température ne change pas depuis le début du monde, l'air de la troisième taille était tiède.",
    "Du sucre, des protéines, de la chaleur, dans un espace fermé. Vous ne savez pas ce que c'est. Vous savez que ce n'est pas un prédateur — un prédateur ne chauffe pas son air.",
  ],
  effets:{ flags:['ch_re_su'],
           marque:"Du miel, de la viande, et l'air tiède à six cents pieds.", court:"L'air tiède" },
  suite:'ch_re_descente', libelleSuite:"Descendre" },

ch_re_odeur_ko:{
  titre:"Il ne sait pas le dire",
  texte:[
    "Il essaie. Il essaie honnêtement pendant un quart d'heure, et il n'y arrive pas, et à la fin il s'excuse — ce qui est la chose la plus difficile de la matinée.",
    "« Je descends depuis que j'ai neuf ans, messire. J'ai senti tout ce qu'un puits peut faire sentir. Ça, non. »",
    "§ Il n'y a pas de mot pour ça dans une langue qui n'a jamais eu à le nommer.",
  ],
  effets:{ marque:"Il n'a pas su nommer l'odeur. Il descend depuis qu'il a neuf ans.",
           court:"Pas de mot" },
  suite:'ch_re_descente', libelleSuite:"Descendre" },

/* ── En bas ─────────────────────────────────────────────────────────────── */
ch_re_descente:{
  lieu:"Le puits sept · six cents pieds",
  titre:"Ce qu'il y a au bout",
  texte:[
    "Six cents pieds sur une échelle de bois qu'on refait tous les onze ans prennent vingt-cinq minutes, et pendant vingt-cinq minutes il n'y a rien à faire que descendre.",
    "La lampe brûle droit : l'air est bon. La galerie de la troisième taille est ouverte, les outils sont en place, les lampes de l'équipe sont accrochées où elles doivent l'être.",
    { sobre:"L'air est tiède. Et il sent le miel.",
      intense:"L'air est tiède — nettement, comme une étable — et il sent le miel. Pas un parfum de miel : du miel, épais, à trois cents pieds sous une montagne où rien n'a jamais senti autre chose que la pierre mouillée.",
      extreme:"L'air est tiède. Pas moins froid : tiède, franchement, comme une étable fermée en hiver, dans un endroit où la température ne bouge pas de deux degrés en mille ans.\n\nEt il sent le miel. Pas un parfum, pas un souvenir de miel : du miel, épais, sucré, présent, à six cents pieds sous une montagne où rien n'a jamais senti que la pierre mouillée et la lampe à huile.\n\nEt derrière, à côté, pas mélangée : la viande." },
    "La galerie continue sur cent quarante pieds. Elle fait quatre pieds de haut sur les trente derniers, ce qui veut dire qu'on les fait à genoux.",
    { sobre:"Au bout, ce n'est plus une galerie.",
      intense:"Au bout, ce n'est plus une galerie : c'est une chambre. Personne ne l'a taillée. La pierre y est arrondie, lisse, tapissée d'une matière grise et sèche, et elle fait bien trente pieds de large.\n\nElle est pleine.",
      extreme:"Au bout, ce n'est plus une galerie.\n\nC'est une chambre. Personne ne l'a taillée : la pierre y est arrondie, polie, tapissée sur toute sa surface d'une matière grise, sèche et légère qui rend le son mat. Trente pieds de large. Vingt de haut. Elle n'existait pas il y a dix-neuf jours, ou elle existait et personne n'était jamais allé au bout des cent quarante pieds.\n\nElle est pleine.\n\nDu sol au plafond, sur les quatre faces, en rangées régulières, il y a des choses de la taille d'un tonneau, translucides, tièdes, et il y en a plusieurs centaines." },
    "§ Et il y a les neuf.",
    { sobre:"Ils sont contre la paroi du fond. Ils ne sont pas morts.",
      intense:"Ils sont contre la paroi du fond, debout, alignés, pris dans la même matière grise jusqu'aux épaules.\n\nIls ne sont pas morts. Le troisième en partant de la gauche tourne la tête vers votre lampe.",
      extreme:"Ils sont contre la paroi du fond. Debout, alignés, à intervalles réguliers, pris dans la même matière grise jusqu'aux épaules et parfois jusqu'au menton.\n\nIls ne sont pas morts.\n\nLe troisième en partant de la gauche tourne la tête vers votre lampe. Lentement — beaucoup plus lentement qu'un homme ne tourne la tête — et ses yeux fonctionnent, et ils vous trouvent, et ils s'arrêtent sur vous.\n\nIl ne dit rien. Aucun des neuf ne dit rien. Vous comprendrez pourquoi trois minutes plus tard, et il vaut mieux ne pas le comprendre tout de suite.\n\nDix-neuf jours. Ils sont là depuis dix-neuf jours et ils sont conscients, et la seule question qui compte à cet instant précis est de savoir depuis combien de temps exactement chacun d'eux a compris ce qui allait se passer." },
    "Et au fond, derrière eux, quelque chose occupe tout le reste de la chambre et ne bouge pas du tout.",
  ],
  effets:{ flags:['ch_re_vue','ch_re_neuf_vivants'], cout:{ moral:14, concentration:10 },
           melee:{ eux:1, position:"à genoux, à l'entrée de la chambre", note:"Neuf vivants · elle ne bouge pas" },
           marque:"Une chambre de trente pieds, plusieurs centaines de choses tièdes, et les neuf hommes vivants contre la paroi.",
           court:"Les neuf" },
  choix:[
    { t:"Sortir les hommes d'abord",
      detail:"Neuf hommes pris jusqu'aux épaules · elle est à vingt pas et elle ne bouge pas",
      risque:"risqué",
      test:{ carac:'force', comp:'survie', dc:12, adversaire:'reine', manoeuvre:'degager',
             situation:() => a('ch_re_couvain') ? 2 : 0, cout:{ endurance:20 } },
      degres:{ dominante:'ch_re_hommes_dom', nette:'ch_re_hommes_ok', couteuse:'ch_re_hommes_cout',
               echec:'ch_re_hommes_ko', catastrophe:'ch_re_hommes_ko' } },

    { t:"Elle d'abord. Pendant qu'elle ne sait pas",
      detail:"Perception · épées — une pondeuse ne se déplace pas, et ce qui ne se déplace pas se laisse approcher",
      risque:"risqué",
      test:{ carac:'perception', comp:'epees', dc:13, adversaire:'reine', manoeuvre:'pondeuse',
             situation:() => a('ch_re_couvain') ? 3 : 0, cout:{ endurance:16 } },
      degres:{ dominante:'ch_re_elle_dom', nette:'ch_re_elle_dom', couteuse:'ch_re_elle_cout',
               echec:'ch_re_elle_ko', catastrophe:'ch_re_elle_ko' } },

    { t:"Remonter et le dire",
      detail:"Vous ne pouvez pas sortir neuf hommes seul · c'est vrai et c'est un choix quand même",
      risque:"prudent", va:'ch_re_remonter' },
  ],
},

ch_re_remonter:{
  lieu:"Le puits sept · la recette",
  titre:"Ce qu'on dit à trois cents personnes",
  texte:[
    "Vous remontez. Vingt-cinq minutes d'échelle, et vingt-cinq minutes est très largement le temps qu'il faut pour décider de ce qu'on va dire.",
    "Vous dites tout. C'est la seule chose à faire et c'est la pire.",
    { sobre:"Ils descendent à quarante le lendemain.",
      intense:"Ils descendent à quarante le lendemain, avec tout ce que cent familles possèdent de pics, de crocs, d'huile et de cordes. Il faut deux jours pour tout remonter.\n\nIls sortent sept hommes vivants sur neuf. Ils perdent six des leurs.",
      extreme:"Ils descendent à quarante le lendemain matin, avec tout ce que cent familles possèdent de pics, de crocs à minerai, d'huile de lampe et de corde.\n\nIls ne se demandent pas s'ils y vont. Ils ne votent pas, ils ne discutent pas, ils ne posent aucune question sur ce qu'il y a en bas : la femme qui tient les cordes annonce l'heure et quarante personnes sont là à l'heure.\n\nIl faut deux jours entiers pour tout remonter.\n\nIls sortent sept hommes vivants sur neuf. Ils perdent six des leurs, dont deux qu'il faut laisser en bas.\n\nEt ils brûlent la chambre — trois cents livres d'huile de lampe, ce qui représente la consommation d'un hiver pour cent familles." },
    "§ Vous avez fait descendre quarante personnes à votre place. C'est mathématiquement la bonne décision et vous le saurez toute votre vie.",
    "La femme qui tient les cordes vous serre la main avant que vous partiez. Elle ne vous reproche rien du tout, ce qui règle définitivement la question.",
  ],
  effets:{ flags:['ch_reine_faite','ch_re_dit'], cout:{ moral:12 },
           exploit:{ eclat:3, temoins:'foule', quoi:"vous avez dit ce qu'il y avait en bas" },
           marque:"Vous avez remonté et vous avez tout dit. Ils sont descendus à quarante, et six ne sont pas remontés.",
           court:"À quarante" },
  issue:"L'affaire est réglée par d'autres",
  bilan:"Sept sur neuf, contre six sur quarante",
  apres:[
    "Le puits sept produit toujours. C'est ce qui compte pour cent familles et c'est ce qui comptera encore dans quatre générations.",
    "On dit, dans les contreforts, qu'un homme d'armes est descendu le premier et qu'il est remonté dire ce qu'il y avait. C'est vrai, et ça se raconte bien, et ce n'est pas ce que vous en retenez.",
  ],
  suite:'entre_saisons', libelleSuite:"La route" },

ch_re_hommes_dom:{
  melee:true,
  titre:"Trois",
  texte:[
    "Vous allez aux hommes. C'est la mauvaise décision tactique et c'est la seule qu'un homme puisse prendre en les regardant.",
    { sobre:"La matière grise casse au pic. Elle est sèche et cassante.",
      intense:"La matière grise casse au pic — elle est sèche, légère, cassante comme du plâtre de mauvaise qualité — et un homme se dégage en environ deux minutes si l'on frappe aux bons endroits et si l'on ne s'occupe pas de ses jambes.\n\nDeux minutes par homme. Il y en a neuf.",
      extreme:"La matière grise casse au pic. C'est la seule bonne nouvelle de la journée : elle est sèche, légère, cassante comme du plâtre de mauvaise qualité, et elle ne colle pas.\n\nUn homme se dégage en deux minutes environ, à condition de frapper aux bons endroits — les épaules d'abord, jamais le buste — et à condition de ne pas s'occuper de ses jambes, dont on s'occupera plus tard ou jamais.\n\nDeux minutes par homme. Il y en a neuf. Faites le compte, et faites-le vite, parce qu'à vingt pas quelque chose d'énorme est en train de s'apercevoir qu'il y a du bruit dans la chambre." },
    "Vous en sortez trois avant qu'elle bouge.",
    { sobre:"Les trois ne peuvent pas marcher. Ils peuvent ramper.",
      intense:"Les trois ne peuvent pas marcher — dix-neuf jours debout sans bouger ne laissent rien d'utilisable en dessous des hanches — mais ils peuvent ramper, et ils rampent, et ils rampent dans la bonne direction sans qu'on ait à le leur expliquer.\n\nLe troisième, celui qui avait tourné la tête, s'arrête à l'entrée de la galerie et refuse d'avancer tant que vous n'êtes pas devant lui.",
      extreme:"Les trois ne peuvent pas marcher. Dix-neuf jours debout sans bouger ne laissent rien d'utilisable en dessous des hanches, et il faudra des mois, et pour deux d'entre eux il faudra toujours.\n\nMais ils peuvent ramper. Et ils rampent — immédiatement, dans la bonne direction, sans qu'on ait à leur expliquer quoi que ce soit, sans un mot, sans un cri, avec une économie de gestes qui dit tout ce qu'il y a à dire sur dix-neuf jours.\n\nLe troisième, celui qui avait tourné la tête vers votre lampe, s'arrête à l'entrée de la galerie basse et refuse absolument d'avancer tant que vous n'êtes pas passé devant lui.\n\nIl ne parle toujours pas. Aucun des trois ne parlera avant la surface, et deux ne parleront plus jamais." },
    "§ Trois sur neuf, et elle bouge.",
  ],
  effets:{ flags:['ch_re_trois'], cout:{ endurance:30, concentration:8 },
           meleeMaj:{ eux:1, position:"entre elle et la galerie", note:"Trois dégagés · elle a bougé" },
           exploit:{ eclat:6, temoins:'aucun', quoi:"vous avez dégagé trois hommes avant qu'elle bouge" },
           marque:"Trois hommes dégagés au pic, en six minutes. Puis elle a bougé.", court:"Trois sur neuf" },
  suite:'ch_re_final', libelleSuite:"Elle bouge" },

ch_re_hommes_ok:{
  melee:true,
  titre:"Deux",
  texte:[
    "Vous en sortez deux. Le pic casse la matière grise proprement et deux hommes sortent, et le troisième est à moitié dégagé quand la chambre change.",
    { sobre:"Elle ne se lève pas. La chambre se met à bouger.",
      intense:"Elle ne se lève pas — elle ne s'est probablement pas levée depuis des années. C'est la **chambre** qui bouge : les centaines de choses tièdes accrochées aux parois se mettent toutes à bouger en même temps, et le bruit que ça fait remplit cent quarante pieds de galerie en une seconde.",
      extreme:"Elle ne se lève pas. Elle ne s'est probablement pas levée depuis des années et ne se lèvera plus jamais : une pondeuse de cette taille ne se déplace pas, c'est le principe même de la chose.\n\nC'est la **chambre** qui bouge.\n\nLes centaines de choses tièdes et translucides accrochées aux quatre parois se mettent toutes à bouger en même temps, du sol au plafond, et le bruit que ça produit — un frottement sec, multiplié par plusieurs centaines, dans un volume fermé de trente pieds — remplit les cent quarante pieds de galerie en une seconde et ne s'arrête plus.\n\nAucun des deux hommes que vous venez de sortir ne réagit. Ils ont entendu ce bruit tous les jours pendant dix-neuf jours." },
  ],
  effets:{ flags:['ch_re_deux'], cout:{ endurance:26, concentration:12, moral:6 },
           meleeMaj:{ eux:1, position:"dans la chambre", note:"Deux dégagés · la chambre entière bouge" },
           exploit:{ eclat:4, temoins:'aucun', quoi:"vous avez dégagé deux hommes avant que la chambre bouge" },
           marque:"Deux hommes dégagés. Puis les centaines de choses des parois ont bougé ensemble.",
           court:"Deux sur neuf" },
  suite:'ch_re_final', libelleSuite:"La chambre bouge" },

ch_re_hommes_cout:{
  melee:true,
  titre:"Le premier",
  texte:[
    "Vous frappez au pic sur l'épaule du premier et vous découvrez, à ce moment-là, pourquoi aucun des neuf ne parle.",
    { sobre:"La matière grise ne les tient pas. Elle les a remplis.",
      intense:"La matière grise ne les tient pas de l'extérieur. Elle est **dedans**. Elle emplit la bouche, la gorge et ce qu'il y a en dessous, et c'est pour ça qu'aucun des neuf n'a crié en dix-neuf jours.\n\nOn peut la retirer. Ça prend du temps et on ne peut pas le faire proprement.",
      extreme:"La matière grise ne les tient pas de l'extérieur. Elle est dedans.\n\nElle emplit la bouche, la gorge, et ce qu'il y a en dessous, en une colonne continue et sèche qui descend jusqu'à un endroit sur lequel il vaut mieux ne pas réfléchir. C'est pour cette raison qu'aucun des neuf n'a crié en dix-neuf jours, et c'est aussi pour cette raison qu'aucun des neuf n'est mort de faim.\n\nOn peut la retirer. Elle vient d'un seul morceau si l'on tire droit et sans hésiter.\n\nÇa ne se fait pas proprement, ça prend beaucoup plus de temps qu'on ne croit, et l'homme est conscient d'un bout à l'autre." },
    "Vous en sortez un. Un seul. Et il vous faut douze minutes qui n'appartiennent à personne.",
  ],
  effets:{ flags:['ch_re_un'], cout:{ endurance:30, concentration:16, moral:16 },
           meleeMaj:{ eux:1, position:"dans la chambre", note:"Un dégagé · elle est dedans, pas dehors" },
           marque:"La matière grise est dedans, pas dehors. C'est pour ça qu'aucun n'a crié.",
           court:"Un seul" },
  suite:'ch_re_final', libelleSuite:"Elle bouge" },

ch_re_hommes_ko:{
  melee:true,
  titre:"Le bruit",
  texte:[
    "Le premier coup de pic sur la matière grise fait un bruit sec, mat, et il porte.",
    { sobre:"La chambre entière répond au premier coup.",
      intense:"La chambre entière répond au premier coup. Pas elle : les parois. Plusieurs centaines de choses tièdes se mettent à bouger en même temps, du sol au plafond, sur les quatre faces.\n\nVous n'avez dégagé personne. Vous avez frappé une fois.",
      extreme:"La chambre entière répond au premier coup.\n\nPas elle — elle ne bouge pas encore et elle ne bougera peut-être jamais. Les **parois**. Plusieurs centaines de choses tièdes et translucides se mettent à bouger ensemble, du sol au plafond, sur les quatre faces, dans un frottement sec multiplié par leur nombre.\n\nVous n'avez dégagé personne. Vous avez frappé exactement une fois, et vous venez d'apprendre que la chambre est un seul organisme et que le pic est un très mauvais outil.\n\nLe troisième homme en partant de la gauche vous regarde toujours. Il n'a pas bougé la tête depuis le début. Il savait ce qui allait se passer et il n'avait aucun moyen de vous le dire." },
  ],
  effets:{ cout:{ endurance:14, concentration:20, moral:12 },
           meleeMaj:{ eux:1, position:"dans la chambre", note:"La chambre entière est réveillée" },
           marque:"Un seul coup de pic, et les quatre parois ont répondu ensemble.", court:"Un coup" },
  suite:'ch_re_final', libelleSuite:"Il n'y a plus de temps" },

ch_re_elle_dom:{
  melee:true,
  titre:"Ce qui ne se déplace pas",
  texte:[
    "Vous passez devant les neuf sans vous arrêter. C'est la décision la plus difficile de votre vie d'homme d'armes et elle prend une seconde et demie.",
    { sobre:"Une pondeuse ne se déplace pas. C'est tout ce qu'il faut savoir.",
      intense:"Une pondeuse ne se déplace pas : elle est bâtie pour rester, elle a cessé depuis longtemps d'avoir des jambes utiles, et tout ce qu'elle possède est tourné vers une seule fonction.\n\nCe qui veut dire qu'on peut aller jusqu'à elle. Personne ne l'a jamais fait, parce que personne n'a jamais passé les neuf hommes contre la paroi.",
      extreme:"Une pondeuse ne se déplace pas.\n\nElle est bâtie pour rester : elle a cessé depuis très longtemps d'avoir des membres qui servent à autre chose qu'à se caler, tout son volume est tourné vers une fonction unique, et elle est parfaitement incapable de vous poursuivre où que ce soit.\n\nCe qui veut dire, avec une simplicité brutale, qu'on peut aller jusqu'à elle et la tuer.\n\nPersonne ne l'a jamais fait. Pas parce que c'est difficile : parce que pour y aller, il faut passer devant neuf hommes vivants pris dans la paroi et ne pas s'arrêter." },
    "Vous montez dessus. Il n'y a pas d'autre mot : c'est une masse de vingt pieds et on lui monte dessus comme on monte sur un talus.",
    { sobre:"Vous frappez trente-quatre fois.",
      intense:"Vous frappez trente-quatre fois. Vous ne les comptez pas sur le moment ; vous les compterez le lendemain, à la surface, parce que le corps compte tout seul quand la tête refuse.\n\nElle ne se défend pas. Elle n'en a pas les moyens. Ce n'est pas un combat et il ne faut pas prétendre le contraire.",
      extreme:"Vous frappez trente-quatre fois.\n\nVous ne les comptez pas sur le moment. Vous les compterez le lendemain, à la surface, assis contre une roue de chariot, parce que le corps compte tout seul quand la tête a refusé de le faire.\n\nElle ne se défend pas. Elle n'en a rigoureusement aucun moyen : elle n'a rien pour ça, elle n'a jamais rien eu pour ça, et tout ce qui la protégeait depuis toujours était accroché aux parois et occupé ailleurs.\n\nCe n'est pas un combat. Il ne faut surtout pas prétendre le contraire : c'est un homme avec une épée sur une chose de vingt pieds qui ne peut pas bouger, dans une chambre chaude, à six cents pieds sous une montagne, pendant onze minutes.\n\nÀ la vingtième les parois se sont tues. À la trentième, ce qui était tiède a commencé à refroidir." },
    "§ Et quand c'est fini, les centaines de choses des parois cessent de bouger, toutes, en même temps, et ne recommencent pas.",
  ],
  effets:{ flags:['ch_re_morte'], cout:{ endurance:40, concentration:14, moral:18 },
           meleeMaj:{ eux:0, position:"sur elle", note:"Les parois se sont tues" },
           exploit:{ eclat:9, temoins:'aucun',
                     quoi:"vous êtes allé jusqu'à la pondeuse et vous l'avez tuée en onze minutes" },
           marque:"Vous êtes passé devant les neuf sans vous arrêter, et vous l'avez tuée en trente-quatre coups.",
           court:"Trente-quatre" },
  suite:'ch_re_apres', libelleSuite:"Les neuf" },

ch_re_elle_cout:{
  melee:true,
  titre:"Les parois d'abord",
  texte:[
    "Vous passez les neuf et vous allez à elle, et les parois ne vous laissent pas faire.",
    { sobre:"Ce qui sort des parois fait la taille d'un chien.",
      intense:"Ce qui sort des parois fait la taille d'un chien, en sort par trois ou quatre à la fois, et n'a manifestement aucune idée de ce qu'il fait — ce qui ne rend pas la chose plus simple, parce qu'une chose qui ne sait pas ce qu'elle fait ne recule jamais.\n\nVous en tuez onze pour faire vingt pas.",
      extreme:"Ce qui sort des parois fait à peu près la taille d'un chien, sort par trois ou quatre à la fois, et n'a visiblement aucune idée de ce qu'il fait ni de ce qu'il est.\n\nCe qui ne rend pas la chose plus facile, bien au contraire : une chose qui ne comprend pas ce qui lui arrive ne recule jamais, ne feinte jamais, et se jette dans une lame avec exactement la même énergie que dans le vide.\n\nVous en tuez onze pour parcourir vingt pas. Ça prend six minutes. Au bout des six minutes vous êtes sur elle et vous avez perdu la lampe, ce qui veut dire que les trente-quatre coups suivants se donnent dans le noir." },
    "Vous la tuez. Dans le noir, au jugé, en onze minutes, et les parois se taisent d'un coup quand c'est fini.",
  ],
  effets:{ flags:['ch_re_morte'], cout:{ endurance:48, vitalite:24, sang:14, moral:16 },
           meleeMaj:{ eux:0, position:"sur elle, dans le noir", note:"La lampe est tombée à la sixième minute" },
           faire:() => blesser({ id:'ch_re_mains', zone:"les deux avant-bras", type:"morsures multiples",
                                 gravite:3, douleur:3, saignement:3, fonction:['epees','force'],
                                 cicatrice:"des avant-bras couverts de petites marques rondes" }),
           exploit:{ eclat:8, temoins:'aucun', quoi:"vous l'avez tuée dans le noir, après avoir perdu la lampe" },
           marque:"Onze pour faire vingt pas, puis onze minutes dans le noir.", court:"Dans le noir" },
  suite:'ch_re_apres', libelleSuite:"Les neuf" },

ch_re_elle_ko:{
  melee:true,
  titre:"Cent quarante pieds",
  texte:[
    "Vous n'arrivez pas jusqu'à elle. Les parois vous prennent à mi-chemin et il n'y a rien à faire contre le nombre dans une chambre de trente pieds.",
    { sobre:"Vous reculez dans la galerie basse. C'est ce qui vous sauve.",
      intense:"Vous reculez dans la galerie basse, celle qui fait quatre pieds de haut sur trente pieds de long, et c'est très exactement ce qui vous sauve : dans quatre pieds de haut, elles arrivent en file.\n\nEn file, on peut tenir. Vous tenez cent quarante pieds à reculons, à genoux, en frappant devant.",
      extreme:"Vous reculez dans la galerie basse. Celle qui fait quatre pieds de haut sur ses trente derniers pieds, celle qu'on fait à genoux, celle que vous aviez maudite à l'aller.\n\nC'est très exactement ce qui vous sauve. Dans quatre pieds de haut, elles ne peuvent plus arriver à trois de front : elles arrivent en file, une par une, et une par une c'est un travail.\n\nVous faites les cent quarante pieds à reculons, à genoux, dans le noir dès la moitié, en frappant devant vous avec une dague parce qu'une épée bâtarde ne sert à rien dans quatre pieds.\n\nÇa prend quarante minutes. La corde est toujours là. C'est la seule chose de cette journée qui se soit passée comme prévu." },
  ],
  effets:{ flags:['ch_re_repousse'], cout:{ endurance:52, vitalite:30, sang:20, moral:14 },
           meleeMaj:{ eux:1, position:"au pied de l'échelle", note:"Cent quarante pieds à reculons" },
           faire:() => blesser({ id:'ch_re_mains', zone:"les deux avant-bras", type:"morsures multiples",
                                 gravite:3, douleur:3, saignement:3, fonction:['epees','force'],
                                 cicatrice:"des avant-bras couverts de petites marques rondes" }),
           marque:"Vous n'êtes pas arrivé jusqu'à elle. Cent quarante pieds à reculons, à genoux.",
           court:"À reculons" },
  suite:'ch_re_final', libelleSuite:"Remonter" },

/* ── La fin de la chambre ───────────────────────────────────────────────── */
ch_re_final:{
  melee:true,
  lieu:"Le puits sept · la chambre",
  titre:"Il n'y a pas de bonne suite",
  texte:[
    () => a('ch_re_repousse')
      ? "Vous êtes au pied de l'échelle, à six cents pieds sous terre, avec les avant-bras ouverts et neuf hommes toujours en bas."
      : "La chambre est réveillée. Les parois bougent toutes ensemble et ce qui en sort n'a aucune idée de ce qu'il fait, ce qui est le pire cas de figure.",
    { sobre:"Il reste deux choses à faire et aucune n'est bonne.",
      intense:"Il reste deux choses à faire et aucune des deux n'est bonne, ce qui est la définition exacte d'un endroit où l'on n'aurait pas dû descendre seul.",
      extreme:"Il reste deux choses à faire et aucune des deux n'est bonne.\n\nC'est la définition même d'un endroit où l'on n'aurait pas dû descendre seul, et c'est aussi la raison pour laquelle quatre hommes de cinquante ans sont remontés en courant sans pouvoir dire pourquoi : ils avaient compris en vingt minutes ce que vous avez mis une heure à comprendre." },
  ],
  choix:[
    { t:"Le feu",
      detail:"Trois lampes d'équipe, l'huile, et cent quarante pieds de galerie · les neuf sont dedans",
      risque:"définitif", definitif:true,
      ferme:"Ferme : les hommes restés dans la paroi",
      va:'ch_re_feu' },

    { t:"Remonter avec ceux que vous avez",
      detail:"Un, deux ou trois · et refermer derrière soi",
      risque:"prudent", va:'ch_re_sortir' },

    { t:"Y retourner",
      detail:"Endurance · survie — encore une fois, avec ce qui reste",
      si:() => ETAT.ressources.endurance >= 25,
      risque:"risqué",
      test:{ carac:'endurance', comp:'survie', dc:13, adversaire:'reine', manoeuvre:'retour',
             cout:{ endurance:24 } },
      degres:{ dominante:'ch_re_elle_dom', nette:'ch_re_elle_cout', couteuse:'ch_re_elle_cout',
               echec:'ch_re_sortir', catastrophe:'ch_re_sortir' } },
  ],
},

ch_re_feu:{
  lieu:"Le puits sept · la galerie",
  titre:"Trois lampes",
  texte:[
    "Il y a trois lampes d'équipe accrochées où elles doivent l'être, et une réserve d'huile pour six jours de taille.",
    "Une galerie de cent quarante pieds tirée d'air par un plan incliné de six cents fait une cheminée parfaite. C'est ce qui rend les mines dangereuses et c'est ce qui va servir aujourd'hui.",
    { sobre:"Vous versez, vous remontez de vingt pieds, et vous jetez la lampe.",
      intense:"Vous versez tout ce qu'il y a d'huile sur les trente derniers pieds. Vous remontez la galerie à reculons, vous vous mettez à couvert derrière un pilier de roche, et vous jetez la lampe.\n\nLa galerie tire. Ce qui prend au fond monte vers vous en huit secondes, puis change d'avis et redescend, parce que c'est ce que fait le feu dans un boyau.",
      extreme:"Vous versez tout ce qu'il y a d'huile — six jours de réserve pour neuf hommes — sur les trente derniers pieds de galerie basse et sur l'entrée de la chambre.\n\nVous remontez à reculons, à genoux, sur les trente pieds. Vous vous mettez à couvert derrière un pilier de roche laissé en place par des mineurs morts depuis trois générations. Et vous jetez la lampe.\n\nLa galerie tire. Un boyau de cent quarante pieds relié à un plan incliné de six cents pieds est une cheminée parfaite : c'est ce qui rend les mines mortelles et c'est ce qui sert aujourd'hui.\n\nCe qui prend au fond monte vers vous en huit secondes — vous sentez l'air partir dans votre dos — puis change d'avis et redescend d'un coup.\n\nCe qui se passe ensuite dans la chambre dure très longtemps." },
    "§ Les neuf sont dedans. Vous n'en avez pas sorti neuf.",
    { sobre:"On ne discute pas cette décision-là. On la prend, et on la garde.",
      intense:"Il n'y a rien à dire pour ou contre cette décision. On la prend en quarante secondes, à six cents pieds sous terre, avec ce qu'on a — et ensuite on la garde toute sa vie sans jamais avoir de quoi la peser correctement.",
      extreme:"Il n'y a rigoureusement rien à dire pour ou contre cette décision, et quiconque prétendra le contraire n'était pas dans la galerie.\n\nOn la prend en quarante secondes, à six cents pieds sous une montagne, avec trois lampes et un pic, en sachant que quarante personnes descendront demain si l'on ne fait rien, et qu'elles descendront avec des crocs à minerai.\n\nEt ensuite on la garde. Toute sa vie, sans jamais disposer d'un seul élément permettant de la peser correctement, et sans jamais rencontrer personne à qui la poser." },
  ],
  effets:{ flags:['ch_reine_faite','ch_re_brulee','ch_re_morte'],
           cout:{ endurance:20, moral:26 },
           exploit:{ eclat:5, temoins:'aucun', quoi:"vous avez brûlé la chambre" },
           marque:"Vous avez brûlé la chambre du puits sept. Les neuf étaient dedans.",
           court:"Le feu" },
  issue:"La chambre est brûlée",
  bilan:"Ce qu'on décide en quarante secondes à six cents pieds",
  apres:[
    "Le puits sept rouvre en Floréal. Cent familles y taillent du fer, et c'est ce qui compte pour cent familles.",
    "La femme qui tient les cordes ne vous demande pas si les neuf étaient morts quand vous avez jeté la lampe. C'est la seule question qui existe et elle ne la pose pas.",
  ],
  plusTard:"Vous n'aurez jamais de quoi peser cette décision, et vous la repèserez souvent.",
  suite:'entre_saisons', libelleSuite:"La route" },

ch_re_sortir:{
  lieu:"Le puits sept · l'échelle",
  titre:"Ce qu'on remonte",
  texte:[
    () => {
      const n = a('ch_re_trois') ? 'trois' : a('ch_re_deux') ? 'deux' : a('ch_re_un') ? 'un' : 'personne';
      return n === 'personne'
        ? "Vous remontez seul. Six cents pieds sur une échelle de bois, avec les avant-bras ouverts, et personne derrière vous."
        : `Vous remontez avec ${n}. Six cents pieds sur une échelle de bois, avec ${n === 'un' ? "un homme qui ne peut pas marcher" : "des hommes qui ne peuvent pas marcher"} et une corde.`;
    },
    { sobre:"Ça prend quatre heures.",
      intense:"Ça prend quatre heures. Un homme qui ne tient pas sur ses jambes se remonte à la corde, palier par palier, et il y a onze paliers.\n\nEn haut, il y a trente personnes qui n'ont pas bougé de la recette depuis dix-neuf jours.",
      extreme:"Ça prend quatre heures.\n\nUn homme qui ne tient pas sur ses jambes ne monte pas une échelle : on le remonte à la corde, palier par palier, et il y a onze paliers dans le puits sept. À chaque palier il faut le caler, se reposer, redescendre chercher le suivant s'il y en a un.\n\nEn haut, il y a trente personnes qui n'ont pas quitté la recette depuis dix-neuf jours, et qui se lèvent toutes en même temps quand la corde bouge." },
    () => a('ch_re_morte')
      ? "§ Elle est morte. Ce qui restait aux parois est mort avec elle, et personne ne saura jamais pourquoi ni comment."
      : "§ Elle est toujours en bas. Ce qui est aux parois y est aussi, et il y en a plusieurs centaines.",
  ],
  effets:{ flags:['ch_reine_faite'], cout:{ endurance:24 },
           exploit:() => a('ch_re_trois') ? { eclat:7, temoins:'foule', quoi:"vous êtes remonté avec trois des neuf" }
                       : a('ch_re_deux')  ? { eclat:5, temoins:'foule', quoi:"vous êtes remonté avec deux des neuf" }
                       : a('ch_re_un')    ? { eclat:4, temoins:'foule', quoi:"vous êtes remonté avec un des neuf" }
                       : { eclat:1, temoins:'foule', quoi:"vous êtes descendu, ce que personne d'autre n'a fait" },
           marque:"Vous êtes remonté du puits sept.", court:"Le puits sept" },
  issue:"On est remonté",
  bilan:"Ce qu'un homme seul peut sortir de six cents pieds",
  apres:[
    () => a('ch_re_morte')
      ? "Le puits sept rouvre en Floréal, et cent familles y taillent du fer."
      : "Le puits sept ne rouvrira pas cette année. Ils descendront à quarante en Floréal, et six ne remonteront pas.",
    "La femme qui tient les cordes ne dit rien du tout. Elle vous serre la main, longuement, en regardant ailleurs.",
  ],
  suite:'entre_saisons', libelleSuite:"La route" },

ch_re_apres:{
  lieu:"Le puits sept · la chambre",
  titre:"Neuf",
  texte:[
    "Ce qui était tiède refroidit en une demi-heure. Les parois ne bougent plus. La chambre redevient un endroit, ce qu'elle n'était plus depuis longtemps.",
    "Vous sortez les neuf au pic. Ça prend quatre heures et vous n'avez plus rien du tout à la fin de la deuxième.",
    { sobre:"Sept sont vivants en haut. Deux ne le sont pas.",
      intense:"Sept sont vivants quand ils arrivent en haut. Deux ne le sont pas, et il n'y a rien qui distingue les deux des sept : ils étaient debout côte à côte, ils avaient le même âge, ils sont sortis dans le même quart d'heure.\n\nCes choses-là ne s'expliquent pas et on cesse assez tôt d'essayer.",
      extreme:"Sept sont vivants quand ils arrivent en haut. Deux ne le sont pas.\n\nIl n'y a rigoureusement rien qui distingue les deux des sept. Ils étaient debout côte à côte, contre la même paroi, ils avaient le même âge à trois ans près, ils sont sortis dans le même quart d'heure et remontés à la même corde.\n\nCes choses-là ne s'expliquent pas. On cesse assez tôt d'essayer, dans ce métier, et c'est probablement ce qui permet de continuer à le faire.\n\nLe troisième en partant de la gauche — celui qui avait tourné la tête vers votre lampe — est du côté des sept. Il ne parlera pas avant Floréal. La première chose qu'il dira, en Floréal, sera votre nom, et il ne l'aura entendu de personne." },
    "§ Cent familles taillent au puits sept depuis quatre générations. Elles y tailleront encore.",
  ],
  effets:{ flags:['ch_reine_faite','ch_re_sept'],
           cout:{ endurance:30, moral:8 },
           exploit:{ eclat:12, temoins:'foule',
                     quoi:"vous êtes descendu seul au puits sept et vous en avez sorti sept hommes vivants" },
           marque:"Sept vivants sur neuf, sortis au pic en quatre heures. Le puits sept rouvre.",
           court:"Sept sur neuf" },
  issue:"Les neuf sont remontés",
  bilan:"Sept vivants, deux qui ne l'étaient plus, et un puits qui rouvre",
  apres:[
    "On racontera cette histoire dans les contreforts pendant quarante ans, et elle deviendra fausse en quatre.",
    "Ce qui restera vrai : cent familles taillent au puits sept, et neuf hommes en sont sortis un jour de pluie.",
  ],
  suite:'entre_saisons', libelleSuite:"La route" },


};

/* ── Le matin se lit dans ce qu'on a fait, pas dans ce qu'on a gagné ─────── */
DYN.ch_fin = () => {
  const finie   = a('ch_meute_finie');
  const defaite = a('ch_meute_defaite');
  const grange  = a('ch_grange_brulee');
  const troupeau= a('ch_troupeau_perdu');
  const colin   = a('ch_colin_denonce') ? 'denonce'
                : a('ch_colin_su') ? 'su'
                : a('ch_colin_couvert') ? 'couvert' : 'rien';

  const texte = [
    "Le jour se lève sur Fontaine-Basse et le hameau sort, tout entier, en même temps, ce qu'il n'a pas fait depuis six semaines.",
  ];

  if(defaite)
    texte.push("Ils comptent les corps dans le pré. Ils arrivent à un chiffre, puis ils recommencent, parce qu'un hameau de onze feux n'a jamais compté autant de quoi que ce soit.");
  else if(finie)
    texte.push("Ils comptent les corps. Il y en a moins qu'ils n'espéraient et beaucoup plus qu'ils n'ont jamais vu, et les deux choses les occupent également.");
  else
    texte.push("Ils ne comptent rien. Il n'y a rien à compter : ce qui est parti est parti vers les tourbières, entier, et tout le monde ici sait ce que veut dire *entier*.");

  if(grange)
    texte.push({ sobre:"La grange du bas fume encore à midi.",
      intense:"La grange du bas fume encore à midi et fumera trois jours. Le meunier la regarde une fois, longuement, puis il va s'occuper d'autre chose et il ne la regardera plus jamais devant vous.",
      extreme:"La grange du bas fume encore à midi et elle fumera trois jours entiers.\n\nLe meunier la regarde une seule fois, longuement, au matin. Puis il va s'occuper d'autre chose, et de tout le temps qu'il vous reste à Fontaine-Basse il ne la regardera plus une seule fois devant vous. Ce n'est pas du reproche. C'est un homme qui a fait un calcul juste et qui ne tient pas à le refaire tous les matins." });

  if(troupeau)
    texte.push("Le grand-père compte ses moutons lui-même, à voix haute, deux fois. Il ne demande rien à personne et personne ne lui propose rien, ce qui est la façon dont ces choses se règlent ici.");

  if(colin === 'denonce')
    texte.push({ sobre:"Personne ne regarde le garçon. Personne ne lui parle non plus.",
      intense:"Personne ne regarde le garçon et personne ne lui adresse la parole. Il porte de l'eau, il fend du bois, il fait tout ce qu'on fait un matin comme celui-là — et il le fait dans un espace de quatre pas que personne ne traverse.",
      extreme:"Personne ne regarde le garçon. Personne ne lui adresse la parole, personne ne le touche, personne ne le chasse non plus.\n\nIl porte de l'eau. Il fend du bois. Il fait exactement tout ce qu'on fait dans un hameau le matin d'une nuit pareille, et il le fait à l'intérieur d'un espace d'environ quatre pas que personne ne traverse. Ce n'est pas concerté. Quarante personnes n'ont rien décidé ensemble : elles ont juste toutes reculé de quatre pas, chacune de son côté, sans se le dire.\n\nIl a douze ans. Il tiendra deux ans, peut-être trois." });
  else if(colin === 'su')
    texte.push("Le garçon vous regarde depuis la porte de la bergerie. Vous n'avez rien dit à personne et il ne sait pas encore si c'est définitif. Il ne le saura qu'en Floréal, quand vous ne serez plus là pour changer d'avis.");
  else if(colin === 'couvert')
    texte.push("Un garçon de douze ans porte de l'eau au milieu de tout le monde, et personne à Fontaine-Basse ne saura jamais pourquoi les bêtes n'avaient plus peur.");

  texte.push("§ Personne ne vous paie. Il n'y avait pas de contrat, il n'y a pas de sceau, et le meunier n'a pas de quoi.");
  texte.push(defaite || finie
    ? "Ce qu'on vous donne, c'est du pain, un fer neuf pour le cheval, et quarante personnes qui diront votre nom pendant dix ans à tous ceux qui passent. Dans cet acte, c'est la seule monnaie qui achète autre chose que du pain."
    : "Ce qu'on vous donne, c'est du pain et une place au feu jusqu'à ce que vous partiez. Personne ne dit que vous avez échoué. Personne ne dit le contraire non plus.");

  SCENES.ch_fin = {
    dyn:true,
    lieu:"Fontaine-Basse · le matin",
    titre:"Onze feux",
    texte,
    effets:{ flags:['ch_meute_faite'],
             exploit:(defaite || finie)
               ? { eclat:4, temoins:'quelques', quoi:"Fontaine-Basse a passé l'hiver" } : null,
             marque:(defaite || finie)
               ? "Fontaine-Basse a passé l'hiver. Personne ne vous a payé."
               : "Vous avez passé une nuit à Fontaine-Basse. La meute est remontée aux tourbières.",
             court:"Fontaine-Basse" },
    issue:(defaite || finie) ? "La meute est défaite" : "La nuit est passée",
    bilan:(defaite || finie) ? "Onze feux, et ils sortent encore" : "Onze feux, et ils sortiront quand même",
    apres:[
      (defaite || finie)
        ? "Fontaine-Basse ne figure sur aucune carte et ne paiera jamais rien à personne. Quarante personnes y savent votre nom."
        : "Les tourbières gardent ce qu'elles ont pris. On en reparlera peut-être, et peut-être pas.",
    ],
    suite:'entre_saisons', libelleSuite:"La route",
  };
  aller('ch_fin');
};

/* Ce que la cour en fait dépend uniquement de ce qui s'est passé dedans.
 * Onze témoins de relais colportent mieux que n'importe quel héraut. */
DYN.ch_du_fin = () => {
  const gagne  = a('ch_du_gagne');
  const nul    = a('ch_du_nul');
  const perdu  = a('ch_du_perdu');
  const cede   = a('ch_du_cede_soi');

  const texte = [
    "La cour se vide en quelques minutes. Personne ne commente devant vous, parce que personne ne commente jamais devant les deux hommes qui étaient dans le rond.",
  ];

  if(gagne)
    texte.push({ sobre:"Il vous serre la main avant de monter à cheval.",
      intense:"Il vous serre la main avant de monter en selle, ce qu'il n'a manifestement pas fait souvent. « Trente-neuvième », dit-il. « Je vais devoir relire la moitié du carnet à cause de vous, et ça va me prendre l'hiver. »",
      extreme:"Il vous serre la main avant de monter en selle, ce qu'il n'a manifestement pas fait souvent et ce qu'il fait maladroitement.\n\n« Trente-neuvième », dit-il. « Je vais devoir relire la moitié du carnet à cause de vous, et ça va me prendre l'hiver.\n\nQuand un homme sur trente-neuf fait une chose que les trente-huit autres n'ont pas faite, ce n'est pas lui qui est remarquable : c'est ma façon de compter qui était fausse depuis le début. » Il rassemble ses rênes. « C'est très désagréable à découvrir à trente-six ans. »" });
  else if(nul)
    texte.push("Il repart au matin sans rien ajouter. Il y a quatre *nul* dans son carnet et il vous a dit ce qu'ils veulent dire, ce qui est déjà plus que ce qu'il devait à quiconque.");
  else if(perdu)
    texte.push("Il repart au matin. *À revoir dans deux ans* : il l'a écrit six fois en onze ans, et l'un des six est un homme dont on parle maintenant dans trois provinces.");
  else if(cede)
    texte.push("Il repart au matin avec une page blanche dans un carnet qui n'en avait aucune. On peut se demander si c'est un cadeau ou une dette, et il n'y a personne à qui poser la question.");

  texte.push("§ Ce qui reste, dans une salle de relais, ce n'est pas ce qui s'est passé : c'est ce que onze personnes en diront cet été à tous ceux qui passent.");

  const rumeur = gagne
    ? "Sur la Route Grise, en Floréal, on racontera qu'un homme a battu un duelliste de cour dans une cour de relais. En Prairial, il l'aura battu en trois passes. En Messidor, le duelliste sera devenu un champion de Chastel, et personne n'y pourra rien."
    : nul
    ? "Sur la Route Grise, on racontera que les deux hommes sont restés debout. C'est une histoire qui ne s'améliore pas en se répétant, ce qui la rend rare et à peu près exacte."
    : perdu
    ? "Sur la Route Grise, on racontera qu'un homme a tenu onze minutes contre un duelliste de cour. Ce sera vrai, et ce sera dit sur le ton dont on parle de quelqu'un dont on attend la suite."
    : "Sur la Route Grise, on racontera ce qu'on voudra. C'est le risque qu'on prend en cédant devant onze personnes qui n'ont pas entendu ce qui s'est dit à voix basse.";

  texte.push(rumeur);

  SCENES.ch_du_fin = {
    dyn:true,
    lieu:"La cour · au matin",
    titre:"Trois lignes",
    texte,
    effets:{ flags:['ch_duel_fait'],
             exploit: gagne ? { eclat:5, temoins:'quelques', quoi:"la cour de relais a vu, et la cour de relais parle" }
                    : nul   ? { eclat:3, temoins:'quelques', quoi:"les deux hommes sont restés debout" }
                    : perdu ? { eclat:2, temoins:'quelques', quoi:"onze minutes contre un duelliste de cour" }
                    : null,
             marque: gagne ? "Vous avez battu Guillaume de Sault dans une cour de relais, devant onze personnes."
                   : nul   ? "Nul contre Guillaume de Sault. Les deux debout."
                   : perdu ? "Guillaume de Sault vous a battu, et a écrit *à revoir dans deux ans*."
                   : "Vous avez cédé sans avoir perdu, et vous lui avez dit pourquoi.",
             court: gagne ? "Trente-neuvième" : nul ? "Nul" : perdu ? "À revoir" : "Cédé" },
    issue: gagne ? "Le rond est gagné" : nul ? "Le rond est nul" : perdu ? "Le rond est perdu" : "Le rond est cédé",
    bilan: gagne ? "Un carnet, trente-neuf noms, et une ligne qu'il n'avait jamais écrite"
         : nul   ? "Deux hommes debout dans un rond de neuf pas"
         : perdu ? "Onze minutes, et une ligne qu'il n'écrit que six fois"
         : "Une page blanche dans un carnet qui n'en avait pas",
    apres:[
      "Vous savez maintenant ce qu'est un temps, ce que veut dire la craie, et qu'un homme n'est jamais obligé de tomber.",
      "Ça vaudra ce que ça vaudra le jour où quelqu'un vous fera entrer dans un rond dont son employeur écrit les règles.",
    ],
    suite:'entre_saisons', libelleSuite:"La route",
  };
  aller('ch_du_fin');
};

enregistrerScenes(CHASSES);
