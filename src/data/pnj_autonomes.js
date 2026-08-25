/* PARIAS — Les neuf qui agissent sans vous
 *
 * Le document fondateur, mot pour mot :
 *
 *   « Chaque PNJ majeur a un âge, une culture, une maison, une localisation,
 *     des traits, des relations, des objectifs, une opinion de Yohan et des
 *     autres, un statut, un conjoint éventuel, des enfants, des ennemis, des
 *     alliés, et la mémoire des événements importants. […] Alycia, Alarielle,
 *     Charles de Mont-Draken, Lucius Furius Augustus, Caleb de Fort-aux-Princes,
 *     Tyrion, Eltharion, Anarion et Khal-Vaene agissent sans le joueur. »
 *
 * Et deux lignes plus bas : « Jamais de simulation purement aléatoire. »
 *
 * Ce fichier est donc leur fiche et leur volonté. Chacun a :
 *
 *   objectif()   ce qu'il poursuit **en ce moment** — il change avec le monde
 *   retient[]    ce qu'il retiendra de Yohan, marqueur par marqueur, et ce que
 *                ça lui fait. C'est la mémoire, et elle est nominative.
 *   opinion()    ce qu'il pense de Yohan, calculé sur ce qu'il retient et sur
 *                ses propres intérêts — jamais un compteur qui dérive
 *   actions[]    ce qu'il peut faire de lui-même. `poids()` rend zéro quand ce
 *                n'est pas le moment ; sinon plus le nombre est grand, plus
 *                l'acte s'impose. À chaque saison, chacun fait au plus une
 *                chose, et c'est celle qui pèse le plus lourd. Pas de dé.
 *
 * Une action écrit une chronique, pose des marqueurs, et peut changer le monde :
 * pousser une crise, déplacer une influence, marier quelqu'un, faire un enfant,
 * tuer, mourir.
 *
 * Tiré de design/narratif/02_EVENEMENTS/PERSONNAGES/autonomous_npcs.json.
 */

const PNJ_AUTONOMES = [

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'charles', nom:"Charles de Mont-Draken", portrait:'charles',
  age:44, peuple:'humains', maison:"Mont-Draken", lieu:"Mont-Draken",
  traits:["droit", "obstiné", "il croit à l'humanité comme d'autres à un dieu"],
  ambitions:["protéger les humains", "détruire ce qui n'est pas humain"],
  objectif(){
    if(criseEtape('HOMMES_BETES') >= 3) return "briser la Grande Chasse avant qu'elle atteigne les vallées";
    if(criseEtape('ASTRAH') >= 3)       return "empêcher que les maisons humaines se saignent entre elles";
    if(hasFlag('draken_reconnu'))       return "savoir ce que cache l'homme qu'il a reconnu";
    return "tenir la marche du nord et compter ce qui en descend";
  },
  retient:[
    { flag:'draken_reconnu',     opinion:-14, texte:"Il vous a reconnu. Il n'a rien dit, et il n'a rien oublié." },
    { flag:'draken_il_veut_charles', opinion:-8, texte:"Une chose ancienne l'a nommé devant vous." },
    { flag:'grande_chasse',      opinion:6,  texte:"Vous étiez là quand les hardes sont descendues." },
    { flag:'karlsberg_a_tenu',   opinion:9,  texte:"Karlsberg a tenu. Il respecte ce qui tient." },
    { flag:'banniere_haute',     opinion:-10, texte:"Vous avez relevé une bannière que la Purge avait couchée." },
    { flag:'nain_boucliers_venus', opinion:7, texte:"Des Nains sont montés au jour pour vous." },
  ],
  opinion(){
    let n = 0;
    if(reputationDe('humains') > 40) n += 8;
    if((hero.suspicion || 0) > 60)   n -= 12;
    return n;
  },
  actions:[
    { id:'marche_nord', poids(){ return criseEtape('HOMMES_BETES') >= 2 ? 30 : 0; },
      fait(){ return { texte:"<b>Charles de Mont-Draken</b> a vidé sa marche du nord de tout ce qui portait une arme et l'a mise en travers de la route des hardes. Onze hameaux qui devaient brûler ne brûleront pas.",
                       flags:['charles_marche_nord'], crise:{ id:'HOMMES_BETES', n:-40 } }; } },
    { id:'concile', poids(){ const n = criseEtape('ASTRAH'); return n >= 2 && n <= 3 ? 24 : 0; },
      fait(){ return { texte:"<b>Charles de Mont-Draken</b> a convoqué à Mont-Draken les maisons qui voulaient bien venir, et leur a dit en face qu'un homme qui lève contre un autre homme travaille pour les hardes. Quatre sont reparties furieuses. Trois sont restées.",
                       flags:['charles_concile'], crise:{ id:'ASTRAH', n:-26 }, reputation:{humains:4} }; } },
    { id:'enquete', poids(){ return hasFlag('draken_reconnu') && !hasFlag('charles_a_ecrit') ? 20 : 0; },
      fait(){ return { texte:"<b>Charles de Mont-Draken</b> a fait ouvrir les registres de la marche à l'année de la Purge. Il n'a chargé personne de l'enquête : il la mène lui-même, ce qui est plus lent et beaucoup plus difficile à arrêter.",
                       flags:['charles_a_ecrit'], suspicion:6 }; } },
    { id:'main_tendue', poids(){ return pnjOpinion('charles') >= 25 && !hasFlag('charles_allie') ? 22 : 0; },
      fait(){ return { texte:"<b>Charles de Mont-Draken</b> a fait porter à Karlsberg une lettre de six lignes. Elle ne parle ni du passé ni d'un nom : elle propose de tenir deux vallées à deux, et se termine par « je saurai ce que vous êtes le jour où ça comptera ».",
                       flags:['charles_allie'], reputation:{humains:8} }; } },
  ],
},

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'lucius', nom:"Lucius Furius Augustus", portrait:'lucius',
  age:51, peuple:'humains', maison:"le parti de Lucius", lieu:"Capitale d'Astrah",
  traits:["patient", "sans cruauté inutile", "convaincu d'avoir raison"],
  ambitions:["refonder Astrah par les armes", "accumuler ce qu'il faudra"],
  objectif(){
    if(hasFlag('lucius_reporte'))        return "réparer ce qu'un report lui a coûté en hommes";
    if(criseEtape('ASTRAH') >= 4)        return "gagner la guerre qu'il a déclenchée";
    if(influencePouvoir('lucius') >= 60) return "se faire donner ce qu'il pourrait prendre";
    return "acheter, marier, promettre, et compter";
  },
  retient:[
    { flag:'banniere_haute',      opinion:-22, texte:"Une maison Paria a relevé sa bannière. Il classe ça comme un problème d'État." },
    { flag:'lucius_reporte',      opinion:-30, texte:"Vous lui avez coûté une saison et deux cents hommes." },
    { flag:'karlsberg_route_ouverte', opinion:-10, texte:"Vous tenez une voie royale. Il sait exactement ce que ça vaut." },
    { flag:'portrait_verite_publique', opinion:-18, texte:"Vous avez nommé trois maisons. Deux étaient à lui." },
    { flag:'artois_couronne',     opinion:9,  texte:"Vous avez fait perdre une province à la Couronne. Il vous en sait gré, ce qui n'est pas de l'amitié." },
  ],
  opinion(){
    let n = -18;                       // il ne hait pas Yohan : il hait ce qu'il est
    n -= Math.floor(renomActuel() / 4);
    if(reputationDe('parias') > 50) n -= 10;
    return n;
  },
  actions:[
    { id:'achete_maison', poids(){ return influencePouvoir('lucius') >= 45 && criseEtape('ASTRAH') <= 3 ? 26 : 0; },
      fait(){ return { texte:"<b>Lucius Furius Augustus</b> a payé les dettes d'une maison de province qui ne pouvait plus les tenir. Il n'a rien demandé en échange, ce qui, chez lui, revient à tout demander plus tard.",
                       flags:['lucius_achete'], politique:{ id:'lucius', n:4 } }; } },
    { id:'mariage', poids(){ return influencePouvoir('lucius') >= 55 && !hasFlag('lucius_marie') ? 30 : 0; },
      fait(){ return { texte:"<b>Lucius Furius Augustus</b> a épousé la nièce cadette de la maison d'Artois-Noir. Elle a vingt-neuf ans, elle a accepté, et elle apporte trois cents lances et un port.",
                       flags:['lucius_marie'], politique:{ id:'lucius', n:8 }, crise:{ id:'ASTRAH', n:22 } }; } },
    { id:'edit_parias', poids(){ return pnjOpinion('lucius') <= -40 && !hasFlag('lucius_edit_parias') ? 34 : 0; },
      fait(){ return { texte:"<b>Lucius Furius Augustus</b> a fait publier un édit qui rouvre les primes sur les lignées Parias. Il ne nomme personne. Il n'a pas besoin de nommer.",
                       flags:['lucius_edit_parias'], suspicion:12, reputation:{parias:-6, humains:-4} }; } },
    { id:'offre', poids(){ return renomActuel() >= 55 && !hasFlag('lucius_offre') && !hasFlag('lucius_edit_parias') ? 28 : 0; },
      fait(){ return { texte:"<b>Lucius Furius Augustus</b> a fait dire à Karlsberg qu'un homme capable de tenir une vallée avec rien mériterait mieux qu'une vallée. L'émissaire n'a pas prononcé le mot Paria une seule fois, ce qui prouve qu'il le savait.",
                       flags:['lucius_offre'], renom:4 }; } },
  ],
},

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'alycia', nom:"Alycia de Callensbourg", portrait:'alycia',
  age:31, peuple:'parias', maison:"Callensbourg", lieu:"nulle part deux fois",
  traits:["séduisante et dangereuse", "elle ne ment jamais sur l'essentiel", "elle refuse d'appartenir"],
  ambitions:["protéger les derniers Parias", "savoir qui les chasse", "rester libre"],
  objectif(){
    if(hasFlag('lucius_edit_parias'))  return "vider trois refuges avant que les primes arrivent";
    if(hasFlag('genealogies_vendues')) return "retrouver qui a acheté les onze registres";
    if(reputationDe('parias') >= 60)   return "voir jusqu'où va ce que Yohan est en train de faire";
    return "compter les vivants, un par un, et ne rien écrire";
  },
  retient:[
    { flag:'genealogies_brulees', opinion:22, texte:"Vous avez brûlé les onze registres. Elle n'y croyait pas." },
    { flag:'genealogies_vendues', opinion:-45, texte:"Vous avez vendu la liste des Parias vivants. Elle sait à qui." },
    { flag:'genealogies_gardees', opinion:-8, texte:"Vous avez gardé la liste. Elle comprend, et elle n'aime pas comprendre ça." },
    { flag:'cause_parias',        opinion:16, texte:"Vous avez pris la cause des Parias en public." },
    { flag:'banniere_haute',      opinion:12, texte:"Vous avez relevé la bannière du Loup. Elle trouve ça imprudent et magnifique." },
    { flag:'prix_noble_accepte',  opinion:-6, texte:"Vous avez réclamé le Prix. Elle ne juge pas — elle note." },
  ],
  opinion(){
    let n = affiniteAvec('alycia') * 5;
    n += Math.floor(reputationDe('parias') / 4);
    if((hero.suspicion || 0) > 70) n -= 8;    // elle aime les vivants, pas les martyrs
    return n;
  },
  actions:[
    { id:'refuges', poids(){ return hasFlag('lucius_edit_parias') && !hasFlag('alycia_refuges') ? 34 : 0; },
      fait(){ return { texte:"Trois refuges Parias du sud se sont vidés en une nuit, quatre jours avant que les chasseurs de primes y arrivent. Personne ne sait qui a prévenu. Tout le monde sait qui a prévenu.",
                       flags:['alycia_refuges'], reputation:{parias:10} }; } },
    { id:'chasseur', poids(){ return hasFlag('cause_parias') && !hasFlag('alycia_chasseur') ? 22 : 0; },
      fait(){ return { texte:"Un chasseur de Parias a été retrouvé à Port-Noir, vivant, attaché à sa propre chaise, avec son carnet de contacts ouvert devant lui à la bonne page. Il n'a pas voulu dire qui l'avait laissé vivant.",
                       flags:['alycia_chasseur'], reputation:{parias:8, humains:-4} }; } },
    { id:'sen_va', poids(){ return pnjOpinion('alycia') <= -25 && !hasFlag('alycia_partie') ? 40 : 0; },
      fait(){ return { texte:"<b>Alycia de Callensbourg</b> n'est plus là. Pas de rupture, pas de lettre, pas de scène : un matin la place est vide et les gens de la maison mettent deux jours à s'en apercevoir. C'est exactement la façon dont elle a survécu trente ans.",
                       flags:['alycia_partie'], affinite:{ qui:'alycia', n:-99 } }; } },
    { id:'revient', poids(){ return hasFlag('alycia_partie') && pnjOpinion('alycia') >= 10 ? 26 : 0; },
      fait(){ return { texte:"<b>Alycia de Callensbourg</b> est revenue comme elle était partie : sans prévenir, sans s'excuser, et avec quatre noms qu'elle n'avait pas en partant.",
                       flags:['alycia_revenue'] }; } },
  ],
},

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'caleb', nom:"Caleb de Fort-aux-Princes", portrait:'caleb',
  age:38, peuple:'parias', maison:"Fort-aux-Princes", lieu:"Fort-aux-Princes",
  traits:["prudent jusqu'à la lâcheté, ou jusqu'à la sagesse", "il a des gens à perdre"],
  ambitions:["que sa maison survive", "qu'aucun autre Paria ne monte trop haut"],
  objectif(){
    if(renomActuel() >= 60)            return "savoir ce qu'un autre Paria célèbre va lui coûter";
    if(hasFlag('lucius_edit_parias'))  return "prouver que sa maison n'a rien à voir avec les autres";
    return "tenir Fort-aux-Princes et ne se faire remarquer par personne";
  },
  retient:[
    { flag:'banniere_haute',   opinion:-16, texte:"Vous avez relevé une bannière. Il calcule ce que ça lui coûtera." },
    { flag:'fils_a_karlsberg', opinion:-12, texte:"Vous avez emmené des gens de sa ville." },
    { flag:'karlsberg_a_tenu', opinion:10, texte:"Karlsberg a tenu un siège. Il révise ses calculs." },
    { flag:'cause_parias',     opinion:-9, texte:"Vous parlez pour les Parias en public, ce qu'il n'a jamais fait." },
  ],
  opinion(){
    let n = 4;
    n -= Math.floor(renomActuel() / 6);
    if(reputationDe('humains') >= 55) n += 8;   // un Paria bien vu le rassure
    return n;
  },
  actions:[
    { id:'se_desolidarise', poids(){ return pnjOpinion('caleb') <= -20 && !hasFlag('caleb_desolidarise') ? 30 : 0; },
      fait(){ return { texte:"<b>Caleb de Fort-aux-Princes</b> a fait savoir par trois canaux différents que sa maison n'a aucun lien avec celle de Karlsberg, ne l'a jamais eu, et considère la relève de sa bannière comme une imprudence. Il a raison sur le dernier point, ce qui rend le reste plus laid.",
                       flags:['caleb_desolidarise'], reputation:{parias:-8, humains:4} }; } },
    { id:'ferme_portes', poids(){ return hasFlag('lucius_edit_parias') ? 26 : 0; },
      fait(){ return { texte:"<b>Caleb de Fort-aux-Princes</b> a fermé sa ville aux Parias sans nom ni papiers. Il l'a fait pleurer, disent ceux qui l'ont vu signer. Ils ont dormi dehors quand même.",
                       flags:['caleb_ferme'], reputation:{parias:-12} }; } },
    { id:'alliance', poids(){ return pnjOpinion('caleb') >= 20 && !hasFlag('caleb_allie') ? 24 : 0; },
      fait(){ return { texte:"<b>Caleb de Fort-aux-Princes</b> a envoyé quarante hommes à Karlsberg, sans bannière, sans lettre et sans conditions. Le sergent qui les mène a pour ordre de dire qu'ils sont des mercenaires. Personne n'y croit, ce qui est probablement le but.",
                       flags:['caleb_allie'], reputation:{parias:6} }; } },
  ],
},

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'alarielle', nom:"Alarielle", portrait:'alarielle',
  age:213, peuple:'elfes', maison:"la cour lumineuse", lieu:"Cour d'Eltharion",
  traits:["empathique", "tenue par les siens", "elle porte une faute qui n'est pas la sienne"],
  ambitions:["protéger sa famille", "réparer la faute elfique", "éviter une seconde catastrophe", "aider les Parias"],
  objectif(){
    if(criseEtape('ELFES') >= 4)      return "empêcher que les deux cours se détruisent l'une l'autre";
    if(hasFlag('fleche_tyrion_veut_la_mort')) return "sauver une enfant que son propre camp veut morte";
    if(reputationDe('parias') >= 50)  return "faire dire tout haut, à sa cour, ce que les Elfes ont fait aux Parias";
    return "tenir sa place et gagner du temps";
  },
  retient:[
    { flag:'fleche_prise',        opinion:20, texte:"Vous avez mis l'enfant des lisières hors de portée." },
    { flag:'fleche_tyrion_veut_la_mort', opinion:-6, texte:"Vous savez ce que Tyrion veut, et vous n'avez rien fait ce jour-là." },
    { flag:'trois_chenes_traite', opinion:24, texte:"Le traité des Trois Chênes existe parce que vous étiez là." },
    { flag:'guerre_elfique',      opinion:-10, texte:"La guerre est venue. Elle vous en veut un peu, injustement." },
    { flag:'convoi_onze_femmes',  opinion:14, texte:"Onze femmes sont rentrées. Elle a lu leurs noms." },
    { flag:'anneau_karlsberg',    opinion:8,  texte:"Vous portez l'anneau. Elle sait ce que sa cour a fait à cette maison." },
  ],
  opinion(){
    let n = affiniteAvec('alarielle') * 5;
    n += Math.floor(reputationDe('elfes') / 5);
    if(hasFlag('valombre_dragon_mort')) n -= 8;
    return n;
  },
  actions:[
    { id:'mediation', poids(){ const n = criseEtape('ELFES'); return n >= 2 && n <= 3 ? 32 : 0; },
      fait(){ return { texte:"<b>Alarielle</b> est passée seule d'une cour à l'autre, sans héraut, sans escorte et sans mandat. Les deux l'ont reçue parce qu'aucune ne pouvait se permettre de la renvoyer. On ne saura jamais ce qu'elle a dit ; la mobilisation a été suspendue quatre mois.",
                       flags:['alarielle_mediation'], crise:{ id:'ELFES', n:-45 }, reputation:{elfes:6} }; } },
    { id:'parle_parias', poids(){ return reputationDe('parias') >= 55 && !hasFlag('alarielle_a_parle') ? 28 : 0; },
      fait(){ return { texte:"<b>Alarielle</b> a dit devant la cour lumineuse ce que les Elfes ont fait pendant la Purge : ni tout, ni assez, mais plus que ce que quiconque avait dit en quarante ans. Deux maisons elfiques ont quitté la salle. Elle est restée debout jusqu'au bout.",
                       flags:['alarielle_a_parle'], reputation:{parias:10, elfes:-6} }; } },
    { id:'rappelee', poids(){ return criseEtape('ELFES') >= 4 && !hasFlag('alarielle_rappelee') ? 30 : 0; },
      fait(){ return { texte:"<b>Alarielle</b> a été rappelée à la cour lumineuse et n'a pas le droit d'en repartir. Ce n'est pas une prison : c'est un devoir, ce qui tient mieux.",
                       flags:['alarielle_rappelee'], affinite:{ qui:'alarielle', n:-1 } }; } },
    { id:'choisit', poids(){ return pnjOpinion('alarielle') >= 35 && hasFlag('alarielle_rappelee') ? 36 : 0; },
      fait(){ return { texte:"<b>Alarielle</b> a quitté la cour lumineuse sans autorisation. Elle savait exactement ce que ça coûte : elle a laissé son nom de maison sur la table en partant, ce qui, chez les Elfes, se fait une seule fois.",
                       flags:['alarielle_a_choisi'], reputation:{elfes:-10, parias:8} }; } },
  ],
},

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'tyrion', nom:"Tyrion", portrait:'tyrion',
  age:340, peuple:'elfes', maison:"les lames de la cour lumineuse", lieu:"lisières du nord",
  traits:["intransigeant", "il a vu la première catastrophe", "il ne pardonne pas deux fois"],
  ambitions:["anéantir les Elfes noirs", "que rien de la Purge ne recommence"],
  objectif(){
    if(hasFlag('fleche_prise'))    return "retrouver l'enfant qu'on lui a soustraite";
    if(criseEtape('ELFES') >= 3)   return "porter la guerre chez Anarion avant qu'Anarion la porte ici";
    return "surveiller ce qui, dans le monde, ressemble à un déséquilibre";
  },
  retient:[
    { flag:'fleche_prise',       opinion:-30, texte:"Vous lui avez pris l'enfant. Il ne l'a pas dit deux fois." },
    { flag:'fleche_enfant',      opinion:-12, texte:"Vous savez ce qu'elle est, et vous ne l'avez pas rendue." },
    { flag:'tyrion_rapport_faux', opinion:-20, texte:"Vous lui avez menti par écrit. Il a gardé la feuille." },
    { flag:'trois_chenes_traite', opinion:-8, texte:"Vous avez fait signer un traité qu'il jugeait prématuré." },
    { flag:'valombre_dragon_mort', opinion:14, texte:"Un dragon de moins dans le monde. Il approuve, froidement." },
  ],
  opinion(){
    let n = -6;
    if((hero.suspicion || 0) >= 60) n -= 14;   // ce que Yohan porte est, pour lui, un déséquilibre
    if(reputationDe('elfes') >= 55) n += 10;
    return n;
  },
  actions:[
    { id:'traque', poids(){ return hasFlag('fleche_prise') && !hasFlag('tyrion_traque') ? 32 : 0; },
      fait(){ return { texte:"<b>Tyrion</b> a mis onze de ses lames sur les routes du sud avec un signalement d'enfant. Elles ne posent pas de questions dans les villages : elles regardent, elles comptent, et elles repartent.",
                       flags:['tyrion_traque'], suspicion:8 }; } },
    { id:'frappe_anarion', poids(){ return criseEtape('ELFES') >= 2 && !hasFlag('tyrion_frappe') ? 30 : 0; },
      fait(){ return { texte:"<b>Tyrion</b> a franchi les passes du sud avec trois cents archers et brûlé deux avant-postes d'Anarion avant que la cour lumineuse en soit informée. On ne le lui a pas reproché : on a antidaté l'ordre.",
                       flags:['tyrion_frappe'], crise:{ id:'ELFES', n:38 }, reputation:{elfes_noirs:-8} }; } },
    { id:'avertit', poids(){ return pnjOpinion('tyrion') <= -30 && !hasFlag('tyrion_avertit') ? 26 : 0; },
      fait(){ return { texte:"<b>Tyrion</b> a fait porter à Karlsberg un carreau d'arbalète elfique, sans lettre. Chez lui, ce n'est pas une menace : c'est un délai qu'on accorde.",
                       flags:['tyrion_avertit'], suspicion:6 }; } },
  ],
},

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'eltharion', nom:"Eltharion", portrait:'eltharion',
  age:612, peuple:'elfes', maison:"la cour lumineuse", lieu:"Cour lumineuse d'Eltharion",
  traits:["il pense en siècles", "il préfère perdre lentement", "il a peur d'avoir tort"],
  ambitions:["que son peuple existe encore dans mille ans", "vaincre Anarion sans y perdre ce qu'il défend"],
  objectif(){
    if(criseEtape('ELFES') >= 4) return "gagner une guerre qu'il n'a jamais voulue";
    if(hasFlag('alarielle_a_parle')) return "décider quoi faire d'une vérité dite trop tôt";
    return "gagner du temps, encore, comme depuis six cents ans";
  },
  retient:[
    { flag:'trois_chenes_traite', opinion:26, texte:"Vous avez obtenu ce que six cents ans de patience n'avaient pas obtenu." },
    { flag:'arquenay_sauves',     opinion:12, texte:"Des siens sont rentrés grâce à vous." },
    { flag:'guerre_elfique',      opinion:-8, texte:"La guerre est là. Il tient tout le monde pour un peu responsable, à commencer par lui." },
    { flag:'alarielle_a_choisi',  opinion:-16, texte:"Il a perdu Alarielle, et il sait pour qui." },
  ],
  opinion(){
    let n = 0;
    n += Math.floor(reputationDe('elfes') / 4);
    if(hasFlag('bataille_mille_cornes')) n -= 10;
    return n;
  },
  actions:[
    { id:'temporise', poids(){ const n = criseEtape('ELFES'); return n >= 1 && n <= 2 ? 24 : 0; },
      fait(){ return { texte:"<b>Eltharion</b> a refusé de rappeler ses archers des lisières malgré trois demandes de son propre conseil. Il a donné une raison en vers, ce qui chez lui veut dire qu'il n'en a pas de bonne et qu'il gagne du temps quand même.",
                       flags:['eltharion_temporise'], crise:{ id:'ELFES', n:-28 } }; } },
    { id:'reconnait_parias', poids(){ return hasFlag('alarielle_a_parle') && !hasFlag('eltharion_reconnait') ? 30 : 0; },
      fait(){ return { texte:"<b>Eltharion</b> a fait graver, sur la stèle des Trois Chênes, les noms des maisons Parias que sa cour avait aidé à effacer. Il n'a pas fait de discours. Il y avait quarante et un noms et il est resté jusqu'à la fin de la gravure.",
                       flags:['eltharion_reconnait'], reputation:{parias:14, elfes:4} }; } },
    { id:'appelle', poids(){ return criseEtape('ELFES') >= 4 && pnjOpinion('eltharion') >= 20 && !hasFlag('eltharion_appelle') ? 28 : 0; },
      fait(){ return { texte:"<b>Eltharion</b> a demandé à Karlsberg une compagnie d'hommes. Une cour elfique qui demande des hommes à des humains n'a plus rien à défendre que sa survie, et il le sait mieux que personne.",
                       flags:['eltharion_appelle'] }; } },
  ],
},

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'anarion', nom:"Anarion", portrait:'anarion',
  age:488, peuple:'elfes_noirs', maison:"la cour d'Anarion", lieu:"Cour d'Anarion",
  traits:["élégant", "il tient parole à la lettre", "il ne pardonne pas les humiliations publiques"],
  ambitions:["vaincre Eltharion", "s'étendre tant que personne ne l'arrête"],
  objectif(){
    if(hasFlag('anarion_offense'))  return "obtenir réparation d'une offense faite devant témoins";
    if(criseEtape('ELFES') >= 3)    return "finir en une saison ce que sa maison poursuit depuis trois siècles";
    return "acheter ce qui se vend et prendre ce qui ne se vend pas";
  },
  retient:[
    { flag:'anarion_offense',  opinion:-34, texte:"Vous l'avez humilié devant sa cour. Il tient les comptes à la lettre." },
    { flag:'convoi_echange',   opinion:12, texte:"Vous avez respecté les termes d'un échange. C'est ce qui compte le plus pour lui." },
    { flag:'convoi_plomb_rompu', opinion:-18, texte:"Vous avez rompu un plomb. Chez lui, c'est pire qu'un vol." },
    { flag:'tyrion_frappe',    opinion:6,  texte:"Vous n'étiez pas avec Tyrion quand il a brûlé les avant-postes." },
  ],
  opinion(){
    let n = 0;
    n += Math.floor(reputationDe('elfes_noirs') / 4);
    if(reputationDe('elfes') >= 60) n -= 12;
    return n;
  },
  actions:[
    { id:'enrole', poids(){ return pnjOpinion('anarion') >= 15 && !hasFlag('anarion_offre') ? 26 : 0; },
      fait(){ return { texte:"<b>Anarion</b> a fait porter à Karlsberg un contrat en trois exemplaires, rédigé dans les formes, offrant une somme précise pour une neutralité précise sur une durée précise. Il n'y a pas un mot de flatterie dedans, ce qui est sa façon d'être poli.",
                       flags:['anarion_offre'] }; } },
    { id:'represailles', poids(){ return hasFlag('anarion_offense') && !hasFlag('anarion_represailles') ? 32 : 0; },
      fait(){ return { texte:"<b>Anarion</b> a fait racheter, par trois intermédiaires, toutes les dettes que Karlsberg avait auprès des marchands de Chastel. Il ne les a pas appelées. Il les tient, et il attend, et c'est très exactement ce qu'il avait annoncé.",
                       flags:['anarion_represailles'], or:-400 }; } },
    { id:'guerre', poids(){ const n = criseEtape('ELFES'); return n >= 2 && n <= 3 ? 30 : 0; },
      fait(){ return { texte:"<b>Anarion</b> a fait déclarer la guerre à la cour lumineuse en vers, devant témoins, dans les formes anciennes, et a fait commencer les incendies avant que le héraut soit rentré. Les deux choses sont conformes à ce qu'il est.",
                       flags:['anarion_declare'], crise:{ id:'ELFES', n:44 } }; } },
  ],
},

/* ══════════════════════════════════════════════════════════════════════════ */
{
  id:'khalvaene', nom:"Khal-Vaene", portrait:'khalvaene',
  age:54, peuple:'khesh', maison:"les Dunes", lieu:"Les Dunes Khesh",
  traits:["une épaule qui ne se lève plus", "il tient parole même quand ça le tue", "il compte"],
  ambitions:["douze feux", "que les Dunes pèsent assez pour qu'on cesse de les acheter"],
  objectif(){
    if(hasFlag('khesh_douze_feux')) return "faire tenir ensemble douze tribus qui se haïssaient il y a un an";
    if(criseEtape('KHESH') >= 3)    return "obtenir les six dernières bannières sans brûler les Dunes";
    return "compter les puits, les hommes, et le temps qui lui reste";
  },
  retient:[
    { flag:'khesh_six_bannieres', opinion:26, texte:"Vous étiez le témoin étranger de son serment." },
    { flag:'feux_yohan_a_parle',  opinion:18, texte:"Vous avez parlé dans le cercle, et les tribus ont écouté." },
    { flag:'feux_yohan_champion', opinion:34, texte:"Vous êtes descendu dans le sel à sa place." },
    { flag:'khesh_ne_pas_intervenir', opinion:-16, texte:"Vous êtes resté dehors le jour où ça se décidait." },
    { flag:'khesh_astrah_paie',   opinion:-10, texte:"Vous saviez qui payait les tribus, et il l'a appris par un autre." },
  ],
  opinion(){
    let n = 0;
    n += Math.floor(reputationDe('khesh') / 3);
    return n;
  },
  actions:[
    { id:'cheval', poids(){ return pnjOpinion('khalvaene') >= 30 && !hasFlag('khesh_cheval_annuel') ? 20 : 0; },
      fait(){ return { texte:"Un cavalier khesh a laissé un cheval à la barrière de Karlsberg et est reparti sans descendre de selle. Il n'a rien dit d'autre que : « du khan ». Le cheval vaut plus que la barrière.",
                       flags:['khesh_cheval_annuel'], or:300 }; } },
    { id:'six_de_plus', poids(){ const n = criseEtape('KHESH'); return n >= 2 && n <= 4 && !hasFlag('khesh_douze_feux') ? 28 : 0; },
      fait(){ return { texte:"<b>Khal-Vaene</b> a acheté deux bannières avec des pâtures, en a gagné une à la loyale, et en a perdu une pour l'avoir trop poussée. Aux Dunes, on appelle ça une bonne saison.",
                       flags:['khesh_huit'], crise:{ id:'KHESH', n:30 } }; } },
    { id:'lances', poids(){ return hasFlag('khesh_douze_feux') && pnjOpinion('khalvaene') >= 25 && !hasFlag('khesh_lances_offertes') ? 32 : 0; },
      fait(){ return { texte:"<b>Khal-Vaene</b> a fait dire à Karlsberg que deux cents lances khesh peuvent traverser le désert en douze jours si on les appelle, et qu'elles n'ont pas besoin d'être payées. Il a ajouté une seule condition : qu'on les appelle pour quelque chose qui en vaille la peine.",
                       flags:['khesh_lances_offertes'], reputation:{khesh:8} }; } },
    { id:'meurt', poids(){ return pnjAge('khalvaene') >= 71 ? 50 : 0; },
      fait(){ return { texte:"<b>Khal-Vaene</b> est mort aux Dunes, dans une tente, de vieillesse et d'une épaule qui ne s'était jamais remise. Douze tribus ont brûlé leur feu la même nuit, ce qui ne s'était pas vu depuis quatre-vingts ans.",
                       flags:['khalvaene_mort'], mort:true, reputation:{khesh:4} }; } },
  ],
},

];

const PNJ_PAR_ID = id => PNJ_AUTONOMES.find(p => p.id === id) || null;
