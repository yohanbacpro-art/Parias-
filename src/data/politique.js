/* PARIAS — Les puissances, et ce qu'elles font pendant que vous travaillez
 *
 * Les *peuples* ont des tensions (lore.js) et une opinion de Yohan
 * (reputation.js). Ce sont deux choses lentes et larges. Ce qui manquait, c'est
 * ce qui se joue vraiment : cinq puissances qui se disputent l'après-Astrah, et
 * une sixième qui n'existe pas encore — la sienne, à Karlsberg.
 *
 * Chaque puissance a une **influence** (0–100) qui bouge toute seule selon
 * l'état du monde, une **posture** envers Yohan qui découle de ce qu'il fait, et
 * des **édits** : des décisions politiques qui tombent d'elles-mêmes quand leur
 * heure vient, et qui changent le jeu.
 *
 * Le Second Empire n'est pas un événement : c'est le nom qu'on donnera à celle
 * de ces puissances qui aura gagné.
 */

const POUVOIRS = [
  {
    id:'astrah', nom:"La Couronne d'Astrah", meneur:"Léopold IV — le Roi de Cendre",
    credo:"Tenir. Ne rien céder qu'on ne puisse reprendre.",
    depart:56,
    /* Elle s'effrite du seul fait que le temps passe et que personne n'y croit. */
    derive(){
      let d = -0.6;
      if((hero.tensions||{}).humains >= 60) d -= 0.8;
      if(hasFlag('lucius_reporte')) d += 0.4;
      if(influencePouvoir('varenne') > 60) d -= 0.5;
      return d;
    },
    posture(){
      let n = -reputationDe('humains') / 4 - (hero.suspicion || 0) / 3;
      if(hasFlag('su_demonstration_publique')) n -= 20;
      if(hasFlag('su_officier_achete')) n += 6;
      if(hasFlag('banniere_haute')) n -= 12;
      return n;
    },
  },
  {
    id:'lucius', nom:"Le parti de Lucius", meneur:"Lucius Furius Augustus",
    credo:"Un État ne se répare pas : il se refonde, et il se refonde par les armes.",
    depart:34,
    derive(){
      let d = 0.5;
      if((hero.tensions||{}).humains >= 50) d += 1.0;
      if(hasFlag('incident_frontiere')) d += 0.8;
      if(hasFlag('lucius_reporte')) d -= 1.2;
      if(influencePouvoir('astrah') < 40) d += 0.6;
      return d;
    },
    posture(){
      /* Il ne hait pas Yohan : il hait ce qu'il est. Plus Yohan compte, pire c'est. */
      let n = -20 - renomActuel() / 3 - (hero.chantier || []).length * 4;
      if(reputationDe('parias') > 50) n -= 12;
      if(hasFlag('lucius_reporte')) n += 25;
      return n;
    },
  },
  {
    id:'varenne', nom:"La maison de Varenne", meneur:"Isolde de Varenne",
    credo:"On ne prend pas un empire. On le laisse tomber dans la main qu'on tend.",
    depart:41,
    derive(){
      let d = 0.7;
      if(influencePouvoir('astrah') < 50) d += 0.5;
      if(hasFlag('su_dette_maison')) d += 1.0;
      if(hasFlag('vauclair_apaisee')) d += 0.4;
      if(hasFlag('isolde_rompue')) d -= 1.5;
      return d;
    },
    posture(){
      /* Elle collectionne ce qui est rare. Un Paria traqué a de la valeur. */
      let n = 10 + (hero.suspicion || 0) / 4 + renomActuel() / 5;
      if(hasFlag('su_dette_maison')) n += 25;
      if(hasFlag('su_affaires_maison')) n += 15;
      if(hasFlag('isolde_rompue')) n -= 60;
      return n;
    },
  },
  {
    id:'lisieres', nom:"La Cour des Lisières", meneur:"Le conseil des gardiens",
    credo:"Ce qui se décide chez les hommes finit toujours par entrer dans la forêt.",
    depart:38,
    derive(){
      let d = -0.1;
      if((hero.tensions||{}).elfes >= 55) d += 0.7;
      if((hero.tensions||{}).elfes_noirs >= 60) d += 0.5;
      return d;
    },
    posture(){ return reputationDe('elfes') / 1.5 + reputationDe('elfes_noirs') / 4; },
  },
  {
    id:'portes', nom:"Les Portes de Kar-Durak", meneur:"Le maître des Portes",
    credo:"On ne fait pas de politique. On fait des contrats, et on les tient.",
    depart:44,
    derive(){
      let d = 0.1;
      if((hero.tensions||{}).nains >= 60) d -= 0.8;
      if((hero.tensions||{}).peaux_vertes >= 70) d -= 0.5;
      return d;
    },
    posture(){ return reputationDe('nains') / 1.4 + (hero.chantier || []).length * 3; },
  },
  {
    id:'karlsberg', nom:"Karlsberg", meneur:"Yohan de Karlsberg",
    joueur:true,
    credo:"Un nom qu'on avait rayé, et des murs qu'on relève à la main.",
    depart:2,
    /* La seule puissance dont l'influence dépend entièrement de ce que fait le
     * joueur : les murs qu'il relève, les lieux qu'il a réglés, ce qu'on pense
     * de lui chez les Parias. */
    derive(){
      const murs = (hero.chantier || []).length;
      const clos = (typeof dossiersClos === 'function') ? dossiersClos() : 0;
      let d = -0.3 + murs * 0.45 + clos * 0.35 + renomActuel() / 90;
      if(reputationDe('parias') > 40) d += 0.4;
      if((hero.suspicion || 0) > 75) d -= 0.6;   // une capitale traquée n'attire personne
      return d;
    },
    posture(){ return 100; },
  },
];

function pouvoirParId(id){ return POUVOIRS.find(p => p.id === id); }

/* ============================= LES ÉDITS ============================= */
/* Une décision politique qui tombe quand ses conditions sont réunies. Elle a un
 * texte, un effet réel, et elle ne se produit qu'une fois. */

const EDITS = [
  {
    id:'ed_conscription', pouvoir:'astrah', influenceMin:0, requis:{ tension:{ humains:45 } },
    titre:"Édit de conscription",
    texte:"Astrah lève un homme sur douze dans les vallées du Nord. Les fermes perdent leurs bras, les routes se couvrent de colonnes mal nourries, et le prix du blé double en trois semaines.",
    effet:{ tension:{ humains:6 }, prixChoc:1.15, chronique:"Astrah lève un homme sur douze dans le Nord." },
  },
  {
    id:'ed_edit_purge', pouvoir:'lucius', influenceMin:55,
    titre:"Le rappel de la Purge",
    texte:"Lucius fait relire publiquement les édits de la Purge devant la garnison de Vaubien. Il ne demande rien, il ne signe rien : il rappelle simplement que le texte n'a jamais été abrogé. Dans la semaine, trois familles de Parias quittent la vallée.",
    effet:{ suspicion:12, reputation:{ parias:6, humains:-4 }, tension:{ parias:8 },
            chronique:"Lucius fait relire les édits de la Purge devant ses troupes." },
  },
  {
    id:'ed_mariage', pouvoir:'varenne', influenceMin:58,
    titre:"Le troisième mariage",
    texte:"Isolde de Varenne marie sa nièce au fils cadet d'Astrah. Aucune armée n'a bougé. Quatre provinces viennent pourtant de changer de main, sur du papier, devant notaire.",
    effet:{ tension:{ humains:5 }, chronique:"Un mariage fait passer quatre provinces à la maison de Varenne." },
  },
  {
    id:'ed_ferme_lisieres', pouvoir:'lisieres', influenceMin:52, requis:{ tension:{ elfes:50 } },
    titre:"Fermeture des lisières",
    texte:"La Cour ferme ses frontières aux hommes. Les routes du sud contournent désormais la Sylve, ce qui allonge tout de deux jours et rend certaines marchandises introuvables.",
    effet:{ prixChoc:1.10, chronique:"La Cour des Lisières ferme ses frontières aux hommes." },
  },
  {
    id:'ed_contrats_portes', pouvoir:'portes', influenceMin:55,
    titre:"Les Portes rouvrent leurs registres",
    texte:"Kar-Durak recommence à signer avec la surface. Les armes naines redeviennent achetables — cher, mais achetables.",
    effet:{ prixChoc:0.92, reputation:{ nains:4 },
            chronique:"Kar-Durak rouvre ses registres commerciaux à la surface." },
  },
  {
    id:'ed_karlsberg_nom', pouvoir:'karlsberg', influenceMin:25,
    titre:"On prononce le nom de nouveau",
    texte:"Un notaire de la vallée écrit « Karlsberg » dans un acte de vente, sans guillemets et sans commentaire, pour la première fois depuis quarante ans. Ce n'est rien. C'est aussi la seule chose qui compte.",
    effet:{ renom:8, reputation:{ parias:10 }, chronique:"Le nom de Karlsberg réapparaît dans un acte notarié." },
  },
  {
    id:'ed_karlsberg_refuge', pouvoir:'karlsberg', influenceMin:45,
    titre:"Ils arrivent par la route du bas",
    texte:"Ils sont onze le premier mois, vingt-neuf le deuxième. Des Parias, des familles de Parias, des gens qui n'ont plus de village. Personne ne les a appelés. Ils ont juste entendu qu'à Karlsberg on ne demandait pas ce que vous étiez.",
    effet:{ renom:10, reputation:{ parias:14 }, suspicion:8, tension:{ parias:-6 },
            chronique:"Des familles de Parias s'installent aux Ruines du Loup." },
  },
  {
    id:'ed_karlsberg_puissance', pouvoir:'karlsberg', influenceMin:65,
    titre:"On vous compte",
    texte:"Une carte dressée à Astrah pour l'usage du conseil porte, dans la marge du Cœur, une annotation à l'encre : « Karlsberg — à considérer ». Trois mots. C'est ainsi qu'on entre dans la politique d'un empire.",
    effet:{ renom:14, suspicion:10, chronique:"Astrah annote ses cartes : « Karlsberg — à considérer »." },
  },
];
