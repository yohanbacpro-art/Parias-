/* PARIAS — Les cinq crises régionales
 *
 * Le document fondateur : *« Ces crises doivent se dérouler différemment d'une
 * partie à l'autre. »* Et, deux lignes plus haut : *« Jamais de simulation
 * purement aléatoire. Personnalité, intérêts, relations et situation politique
 * décident. »*
 *
 * Ce fichier remplace ce qui tenait lieu de monde vivant : huit nombres qui
 * montaient tout seuls et qui, à 90, imprimaient une ligne.
 *
 * Une crise n'est plus un nombre. C'est **cinq étapes nommées**, franchies dans
 * l'ordre, chacune avec sa chronique écrite et ses conséquences sur le monde.
 * Ce qui les fait avancer se lit dans l'état réel de la partie : les marqueurs
 * posés par les affaires, l'influence des puissances, la réputation de Yohan,
 * et l'état des autres crises — une cour elfique se lance d'autant plus
 * volontiers que les humains s'entre-déchirent.
 *
 * Format :
 *   id        clé interne, et préfixe des marqueurs (crise_ELFES_3)
 *   nom       ce que les gens appellent la chose
 *   acteurs   qui la mène — ce sont des personnes, pas des peuples
 *   peuples   à quels peuples elle donne sa tension dérivée (compatibilité)
 *   veille    la ligne affichée tant qu'elle n'a pas commencé
 *   paliers[] cinq étapes : { nom, resume, chronique, seuil, effets }
 *   pression()  ce qui la pousse ce trimestre, calculé sur l'état du monde
 *
 * `pression()` rend un tableau de { n, pourquoi } : le moteur additionne les
 * `n`, et l'écran des Chroniques affiche les `pourquoi`. Le joueur ne voit
 * jamais le total — il voit *pourquoi* ça monte.
 */

const CRISES = [

/* ══════════════════════════════════════════════════════════════════════════
   LES ELFES — deux cours, un seul trône, et une enfant qui n'aurait pas dû naître
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:'ELFES', nom:"La Guerre des Deux Cours",
  acteurs:"Eltharion · Anarion · Tyrion · Alarielle",
  peuples:['elfes','elfes_noirs'],
  veille:"Les deux cours ne se parlent plus depuis onze ans. Elles ne se battent pas non plus.",
  paliers:[
    { nom:"Incidents frontaliers", seuil:100,
      resume:"Des bornes déplacées, des convois fouillés, deux morts qu'on ne réclame pas.",
      chronique:"Aux marches d'Eltharion, une borne a été déplacée de trente pas pendant la nuit. Ce n'est rien. C'est la quatrième depuis le printemps.",
      effets:{ reputation:{elfes:-2}, flag:"incident_frontiere" } },
    { nom:"Assassinats et raids", seuil:120,
      resume:"On ne déplace plus les bornes : on tue les gens qui les gardent.",
      chronique:"Le maître des marches d'Anarion est mort dans son lit, d'une lame trop fine pour être humaine. La cour lumineuse dément avant même qu'on l'accuse.",
      effets:{ reputation:{elfes:-4, elfes_noirs:-4} } },
    { nom:"Mobilisation", seuil:140,
      resume:"Les deux cours lèvent, et les foires des lisières ferment une à une.",
      chronique:"Eltharion rappelle ses archers des lisières. Anarion ferme les trois passes du sud. Les marchands humains qui vivaient de ce commerce apprennent le mot *frontière*.",
      effets:{ reputation:{elfes:-4}, prixChoc:1.2 } },
    { nom:"Guerre ouverte", seuil:160,
      resume:"Elles ne se cachent plus. Les lisières brûlent des deux côtés.",
      chronique:"La guerre des deux cours est déclarée dans les formes, en vers, devant témoins. Les premières lisières brûlent avant que le héraut soit rentré.",
      effets:{ reputation:{elfes:-6, elfes_noirs:-6}, flag:"guerre_elfique" } },
    { nom:"La bataille des Mille Cornes", seuil:999,
      resume:"Tout ce que les deux cours peuvent aligner, au même endroit, le même jour.",
      chronique:"Les deux cours se sont rencontrées sous les Mille Cornes. On ne saura pas avant des mois qui a gagné — et il n'est pas sûr que quiconque ait gagné.",
      effets:{ reputation:{elfes:-8, elfes_noirs:-8}, flag:"bataille_mille_cornes" } },
  ],
  pression(){
    const p = [];
    p.push({ n:7, pourquoi:"onze ans de griefs que personne ne solde" });
    if(criseEtape('ASTRAH') >= 3)
      p.push({ n:9, pourquoi:"les humains sont occupés à s'entre-tuer, ce qui laisse le champ libre" });
    if(hasFlag('anarion_offense'))
      p.push({ n:12, pourquoi:"Anarion a été offensé publiquement et ne l'a pas oublié" });
    if(hasFlag('fleche_tyrion_veut_la_mort'))
      p.push({ n:14, pourquoi:"Tyrion veut la mort d'une enfant, et une cour couvre l'enfant" });
    if(hasFlag('convoi_trois_perdus'))
      p.push({ n:8, pourquoi:"trois des onze du convoi ne sont jamais rentrés" });
    if(hasFlag('arquenay_reine_morte'))
      p.push({ n:10, pourquoi:"une reine est morte à Arquenay et les deux cours s'en accusent" });
    if(hasFlag('trois_chenes_traite'))
      p.push({ n:-22, pourquoi:"le traité des Trois Chênes tient encore" });
    if(hasFlag('fleche_prise'))
      p.push({ n:-9, pourquoi:"l'enfant des lisières est hors de portée des deux cours" });
    if(reputationDe('elfes') >= 45)
      p.push({ n:-7, pourquoi:"Eltharion écoute un étranger, ce qui ralentit tout" });
    return p;
  },
},

/* ══════════════════════════════════════════════════════════════════════════
   ASTRAH — un trône vide que cinq mains veulent
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:'ASTRAH', nom:"La Question du Second Empire",
  acteurs:"Lucius Furius Augustus · Léopold IV · les princes humains",
  peuples:['humains'],
  veille:"Léopold IV règne. C'est la seule chose que tout le monde admet encore.",
  paliers:[
    { nom:"Propagande dynastique", seuil:100,
      resume:"Des généalogies apparaissent. Elles remontent toutes au même homme, et jamais le même.",
      chronique:"Trois généalogies concurrentes circulent dans les foires, chacune prouvant qu'un homme différent est le seul héritier légitime. Deux sont fausses. Personne ne sait laquelle ne l'est pas.",
      effets:{ flag:"astrah_propagande" } },
    { nom:"Alliances", seuil:120,
      resume:"On marie les filles. C'est toujours ce qui précède.",
      chronique:"Quatre mariages ont été annoncés le même mois entre maisons qui ne se parlaient pas. Un cinquième a été rompu, ce qui en dit plus que les quatre autres.",
      effets:{ reputation:{humains:-3} } },
    { nom:"Ultimatums", seuil:140,
      resume:"Des lettres portées par des hommes en armes, avec une date au bas.",
      chronique:"Le parti de Lucius a fait porter à trois maisons une lettre qui se termine par une date. Aucune des trois n'a répondu, ce qui est une réponse.",
      effets:{ reputation:{humains:-5}, prixChoc:1.25, flag:"astrah_ultimatum" } },
    { nom:"Les guerres humaines", seuil:160,
      resume:"Plus une guerre : quatre, qui se gênent mutuellement.",
      chronique:"Il n'y a plus une guerre de succession mais quatre, qui se chevauchent et se gênent. Les récoltes ne rentrent pas. Les routes se vident.",
      effets:{ reputation:{humains:-8}, prixChoc:1.4, flag:"guerres_humaines" } },
    { nom:"Restauration ou effondrement", seuil:999,
      resume:"Quelqu'un s'assied sur le trône, ou plus personne ne peut s'y asseoir.",
      chronique:"La question du Second Empire est tranchée — par les armes, comme toujours. Ce qui en sort ne ressemble à aucune des quatre généalogies.",
      effets:{ flag:"second_empire_tranche" } },
  ],
  pression(){
    const p = [];
    p.push({ n:6, pourquoi:"un roi de cendre, et personne pour lui succéder proprement" });
    const lucius = (typeof influencePouvoir === 'function') ? influencePouvoir('lucius') : 0;
    const astrah = (typeof influencePouvoir === 'function') ? influencePouvoir('astrah') : 60;
    if(lucius >= 55) p.push({ n:11, pourquoi:"le parti de Lucius pèse assez pour ne plus attendre" });
    if(astrah <= 40) p.push({ n:9,  pourquoi:"la Couronne d'Astrah ne fait plus peur à personne" });
    if(hasFlag('portrait_verite_publique'))
      p.push({ n:18, pourquoi:"trois maisons ont été nommées dans la chute de Karlsberg, et un légat rappelé" });
    if(hasFlag('artois_couronne'))
      p.push({ n:9, pourquoi:"la Couronne a perdu une province sans qu'un seul soldat marche" });
    if(hasFlag('hautecour_mariage'))
      p.push({ n:7, pourquoi:"un mariage de Hautecour a rangé deux maisons du même côté" });
    if(hasFlag('salverne_astrah'))
      p.push({ n:8, pourquoi:"le pont de Salverne est tenu par Astrah, et tout le monde l'a noté" });
    if(hasFlag('lucius_reporte'))
      p.push({ n:-16, pourquoi:"Lucius a dû reporter, et un homme qui reporte perd des gens" });
    if(hasFlag('offensee_aveu_public'))
      p.push({ n:-6, pourquoi:"une querelle de maisons s'est réglée sans bannières" });
    if(reputationDe('humains') >= 50)
      p.push({ n:-6, pourquoi:"il reste des maisons humaines qui écoutent avant de lever" });
    return p;
  },
},

/* ══════════════════════════════════════════════════════════════════════════
   LES PEAUX-VERTES — ce qui remonte vers la surface
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:'PEAUX_VERTES', nom:"La Remontée vers la Surface",
  acteurs:"Gharok · les clans des Profondeurs · Kar-Durak",
  peuples:['peaux_vertes','nains'],
  veille:"Sous Kar-Durak, on entend creuser. Les Nains disent que ce n'est rien.",
  paliers:[
    { nom:"Les tambours", seuil:100,
      resume:"On les entend la nuit, dans les galeries basses, et jamais deux fois au même endroit.",
      chronique:"Les veilleurs de la troisième galerie rapportent des tambours sous la roche, la nuit, jamais deux fois au même endroit. Le conseil de la Halle a classé le rapport.",
      effets:{ flag:"pv_tambours" } },
    { nom:"Raids miniers", seuil:120,
      resume:"Ils ne prennent pas les salles : ils prennent les convois de minerai.",
      chronique:"Quatre convois de minerai perdus en six semaines, tous sur le même tronçon, tous vidés sans un mort. Ils apprennent nos horaires.",
      effets:{ reputation:{nains:-3}, prixChoc:1.15 } },
    { nom:"Un chef fédérateur", seuil:140,
      resume:"Les clans ne se battent plus entre eux. C'est la mauvaise nouvelle.",
      chronique:"Onze clans des Profondeurs ont cessé de se battre entre eux le même hiver. Chez les Peaux-Vertes, cela n'arrive que lorsque quelqu'un les a tous battus l'un après l'autre.",
      effets:{ reputation:{peaux_vertes:-2}, flag:"pv_federes" } },
    { nom:"Le siège de Kar-Durak", seuil:160,
      resume:"Ils tiennent trois salles. Ils n'en tiendront pas quatre.",
      chronique:"Kar-Durak est assiégée par en dessous, ce qui n'était pas censé être possible. La Halle a fermé les portes hautes, ce qu'elle n'avait pas fait depuis six cents ans.",
      effets:{ reputation:{nains:-6}, prixChoc:1.3, flag:"siege_kardurak" } },
    { nom:"Contre-offensive ou chute", seuil:999,
      resume:"Soit les Nains ressortent, soit la montagne change de mains.",
      chronique:"Ce qui se joue sous Kar-Durak se joue en une saison. Au bout, il y a une montagne naine ou une montagne peau-verte, et rien entre les deux.",
      effets:{ flag:"kardurak_tranche" } },
  ],
  pression(){
    const p = [];
    p.push({ n:8, pourquoi:"les Profondeurs se vident, et ce qui s'y trouvait doit aller quelque part" });
    if(hasFlag('gorge_federation'))
      p.push({ n:15, pourquoi:"un chef a fédéré la Gorge, et un chef fédérateur ne s'arrête pas là" });
    if(hasFlag('kardurak_moins_quatre_ouvert'))
      p.push({ n:13, pourquoi:"le niveau moins-quatre a été rouvert, et il ne devait pas l'être" });
    if(hasFlag('kardurak_mur'))
      p.push({ n:7, pourquoi:"le mur des six cents ans a été touché" });
    if(hasFlag('wyrm_remonte'))
      p.push({ n:9, pourquoi:"quelque chose remonte des galeries et pousse tout devant lui" });
    if(hasFlag('kardurak_porte_tenue'))
      p.push({ n:-14, pourquoi:"la porte de la troisième salle a tenu, et elle tient encore" });
    if(hasFlag('kardurak_moins_quatre_scelle'))
      p.push({ n:-16, pourquoi:"le niveau moins-quatre a été scellé dans les règles" });
    if(hasFlag('nain_boucliers_venus'))
      p.push({ n:-8, pourquoi:"Kar-Durak sort ses boucliers au jour, ce qui veut dire qu'elle en a de reste" });
    if(reputationDe('nains') >= 50)
      p.push({ n:-6, pourquoi:"la Halle écoute un homme du dehors, ce qui lui fait gagner des saisons" });
    return p;
  },
},

/* ══════════════════════════════════════════════════════════════════════════
   LES KHESH — douze feux, ou aucun
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:'KHESH', nom:"La Grande Unification",
  acteurs:"Khal-Vaene · les douze tribus des Dunes",
  peuples:['khesh'],
  veille:"Douze tribus, douze puits, et un homme qui compte.",
  paliers:[
    { nom:"Duels tribaux", seuil:100,
      resume:"On règle les puits au duel, ce qui coûte moins cher qu'une guerre.",
      chronique:"Aux Dunes, on règle les puits au duel plutôt qu'à la guerre. Cela dure depuis quatre-vingts ans et cela n'a jamais rien décidé.",
      effets:{ flag:"khesh_duels" } },
    { nom:"Le Conseil des Lances", seuil:120,
      resume:"Le cercle se réunit. Il ne se réunit qu'une fois par génération.",
      chronique:"Le Conseil des Lances s'est réuni pour la première fois depuis une génération. Astrah y avait un homme, assis au troisième rang, en tenue de marchand de chevaux.",
      effets:{ flag:"khesh_conseil" } },
    { nom:"Six bannières", seuil:140,
      resume:"La moitié des tribus derrière un seul nom. L'autre moitié le sait.",
      chronique:"Six bannières khesh se sont rangées derrière Khal-Vaene. Aux Dunes, six est le nombre à partir duquel on cesse de plaisanter.",
      effets:{ reputation:{khesh:2}, flag:"khesh_six" } },
    { nom:"La guerre d'unification", seuil:160,
      resume:"Six contre six. Le désert n'a pas de front.",
      chronique:"Six bannières contre six, et un désert qui n'a pas de front. On ne compte plus les morts par bataille : on les compte par puits.",
      effets:{ reputation:{khesh:-4}, flag:"khesh_guerre" } },
    { nom:"Douze feux ou la dispersion", seuil:999,
      resume:"Un cercle fermé, ou quatre-vingts ans de plus à recommencer.",
      chronique:"Les Dunes ont tranché. Il y a désormais un khan, ou il n'y en aura pas avant deux générations.",
      effets:{ flag:"khesh_tranche" } },
  ],
  pression(){
    const p = [];
    p.push({ n:7, pourquoi:"un homme aux Dunes compte les puits qui ne sont pas à lui" });
    if(hasFlag('khesh_six_bannieres'))
      p.push({ n:16, pourquoi:"Khal-Vaene tient six bannières et ne peut plus reculer" });
    if(hasFlag('feux_astrah_demasque'))
      p.push({ n:10, pourquoi:"l'émissaire d'Astrah a été démasqué devant le cercle" });
    if(hasFlag('feux_neuf_bannieres'))
      p.push({ n:14, pourquoi:"neuf bannières, et trois qui hésitent encore" });
    if(hasFlag('khesh_astrah_paie'))
      p.push({ n:-13, pourquoi:"Astrah paie les tribus pour qu'elles restent douze" });
    if(hasFlag('khesh_lance_denoncee'))
      p.push({ n:-9, pourquoi:"une lance a été dénoncée, et l'affaire pèse sur le cercle" });
    if(hasFlag('khesh_douze_feux'))
      p.push({ n:40, pourquoi:"les douze feux brûlent : ce qui devait arriver est arrivé" });
    if(hasFlag('khesh_feux_eteints'))
      p.push({ n:-30, pourquoi:"le cercle s'est brisé au douzième feu" });
    return p;
  },
},

/* ══════════════════════════════════════════════════════════════════════════
   LES HOMMES-BÊTES — quand les hardes cessent d'être des hardes
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:'HOMMES_BETES', nom:"La Grande Chasse",
  acteurs:"les hardes des lisières · ce qui les rassemble",
  peuples:['hommes_betes'],
  veille:"Des hardes, aux lisières, comme depuis toujours. Elles ne se parlent pas.",
  paliers:[
    { nom:"Hardes isolées", seuil:100,
      resume:"Chacune sur son territoire, et malheur à qui traverse.",
      chronique:"Trois hameaux des lisières ont perdu du bétail cette saison. C'est la moyenne. C'est même un peu en dessous.",
      effets:{} },
    { nom:"Des signes communs", seuil:120,
      resume:"La même marque, sur des arbres, à quarante lieues d'écart.",
      chronique:"La même marque a été relevée sur des arbres à quarante lieues d'écart, par des hardes qui n'ont aucune raison de se connaître. Le prévôt a fait réécrire le rapport.",
      effets:{ flag:"hb_signes" } },
    { nom:"Massacres coordonnés", seuil:140,
      resume:"Deux hameaux la même nuit, à six lieues. Ce n'est plus de la chasse.",
      chronique:"Deux hameaux ont brûlé la même nuit, à six lieues l'un de l'autre. Une harde ne fait pas ça. Une harde ne sait pas compter les heures.",
      effets:{ reputation:{hommes_betes:-4}, flag:"hb_coordonne" } },
    { nom:"La Grande Chasse", seuil:160,
      resume:"Elles descendent des lisières ensemble, et elles ne remontent pas.",
      chronique:"Les hardes sont descendues des lisières ensemble. Elles ne chassent plus le bétail : elles suivent les routes, et les routes mènent quelque part.",
      effets:{ reputation:{hommes_betes:-6}, prixChoc:1.3, flag:"grande_chasse" } },
    { nom:"Dispersion ou dévastation", seuil:999,
      resume:"On les brise à un défilé, ou on compte les vallées après.",
      chronique:"La Grande Chasse a trouvé ce qu'elle cherchait. On saura au printemps combien de vallées se relèvent.",
      effets:{ flag:"grande_chasse_tranchee" } },
  ],
  pression(){
    const p = [];
    p.push({ n:8, pourquoi:"les lisières reculent, et ce qui y vivait descend" });
    if(hasFlag('belrive_marque'))
      p.push({ n:11, pourquoi:"la marque des lisières a été relevée et reconnue" });
    if(hasFlag('torcy_ils_sortent_de_la'))
      p.push({ n:10, pourquoi:"on sait maintenant d'où ils sortent, et il y en a plus qu'on croyait" });
    if(hasFlag('belrive_rapport_reecrit'))
      p.push({ n:9, pourquoi:"le rapport des lisières a été réécrit, donc personne ne se prépare" });
    if(criseEtape('ELFES') >= 3)
      p.push({ n:7, pourquoi:"les archers elfiques ont quitté les lisières pour une autre guerre" });
    if(hasFlag('vaudreuil_tribut_etabli'))
      p.push({ n:-12, pourquoi:"un tribut tient les hardes de Vaudreuil à distance des hameaux" });
    if(hasFlag('belrive_rapport_lisieres'))
      p.push({ n:-10, pourquoi:"le rapport des lisières est parti entier, et quelqu'un l'a lu" });
    if(hasFlag('torcy_veine_fermee'))
      p.push({ n:-9, pourquoi:"la veine haute de Torcy est fermée, et ils n'y reviennent plus" });
    if(typeof chaineFinieAinsi === 'function' && chaineFinieAinsi('CH_VAUDREUIL', 'harde_brisee'))
      p.push({ n:-14, pourquoi:"la harde des Cornes de Minuit a été brisée devant les autres" });
    return p;
  },
},

];

const CRISE_PAR_ID = id => CRISES.find(c => c.id === id) || null;
