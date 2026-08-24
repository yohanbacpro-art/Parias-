/* PARIAS — Le Prix du Paria
 *
 * La coutume est ancienne et elle n'a jamais été abrogée, parce que personne
 * n'a jamais voulu l'écrire noir sur blanc : **une maison noble qui emploie un
 * Paria lui doit l'Or et le Sang.** De l'or comptant, et le consentement d'une
 * femme de son rang. C'est une humiliation pour la maison, et c'est exactement
 * pour cela que la coutume existe : on ne fait pas appel à un Paria de gaieté
 * de cœur.
 *
 * Ce qui n'allait pas :
 *   · vingt des cinquante affaires du registre étaient commanditées par les
 *     mêmes maisons nobles que les trente autres, sans offrir le Prix ;
 *   · réclamer l'Or seul, la noble seule, ou le Prix complet payait exactement
 *     la même chose : le choix n'existait pas ;
 *   · l'écran du lieu remplaçait le nom de la maison par « le prévôt de la
 *     place », si bien qu'aucune offre ne portait plus le Prix.
 *
 * Désormais : toute maison noble doit le Prix, un commanditaire du commun paie
 * en or (une veuve du quartier bas n'a pas de fille de rang à donner), et les
 * trois façons de réclamer mènent à trois situations différentes.
 */

/* ---- Qui est noble ---- */
const MARQUES_NOBLES = [
  /^Maison /i, /\bmaison mineure\b/i, /\bDuc\b/i, /\bDuchesse\b/i, /\bComte\b/i,
  /\bComtesse\b/i, /\bBaron\b/i, /\bBaronne\b/i, /\bSeigneur\b/i, /\bDame /i,
  /\bLady /i, /\bintendant\b/i, /\bdélégation d'Astrah\b/i, /\bconseiller de la Cour\b/i,
];
function commanditaireNoble(c){
  if(!c) return false;
  if(c.noble === false) return false;
  if(c.noble === true || c.prix_paria) return true;
  const q = c.maisonNoble || c.commanditaire || '';
  return MARQUES_NOBLES.some(r => r.test(q));
}

/* ---- Qui, dans la maison, peut consentir ----
 * Règle du pack narratif : une noble **adulte, réelle, de cette maison**, qui
 * consent explicitement. Faute de quoi cette moitié du Prix n'existe pas.
 *
 * Rend { candidate, refus } : `candidate` si quelqu'un accepte, sinon `refus`
 * porte la raison — celle de la personne qui a dit non, ou le fait que la
 * maison n'a personne d'adulte à proposer. */
const AGE_ADULTE = 18;

function nobleRefuse(n){
  const e = n.exige || {};
  if(e.renomMin !== undefined && renomActuel() < e.renomMin) return true;
  if(e.suspicionMax !== undefined && (hero.suspicion || 0) > e.suspicionMax) return true;
  if(e.flag && !hasFlag(e.flag)) return true;
  for(const [p, v] of Object.entries(e.reputationMin || {}))
    if(reputationDe(p) < v) return true;
  return false;
}

function dejaLiee(nom){
  return ((hero.lignee && hero.lignee.liaisons) || []).some(l => l.nom === nom);
}

function candidateDeLaMaison(nomMaison){
  const m = maisonDe(nomMaison);
  if(!m) return { refus:"Cette maison n'a personne dont le nom figure aux registres : elle paiera en or." };
  const adultes = (m.nobles || []).filter(n => n.age >= AGE_ADULTE && !dejaLiee(n.nom));
  if(!adultes.length)
    return { refus:`${nomMaison} n'a plus aucune femme adulte à engager. La coutume ne s'applique pas faute de personne pour la porter.` };
  const consentantes = adultes.filter(n => !nobleRefuse(n));
  if(consentantes.length) return { candidate: consentantes[0], maison: nomMaison };
  return { refus: adultes[0].refus || "Aucune n'y consent, et la coutume ne se prend pas de force." };
}

/* Le Prix d'une affaire : celui que sa maison doit, et la personne qui accepte
 * — ou la raison pour laquelle personne n'accepte. */
function prixPariaDe(c){
  if(!commanditaireNoble(c)) return null;
  const nomMaison = c.maisonNoble || c.commanditaire;
  const r = candidateDeLaMaison(nomMaison);
  return {
    negocie_avant_depart: true,
    maison: nomMaison,
    indisponible: r.refus || null,
    noble_proposee: r.candidate ? {
      nom: r.candidate.nom, maison: nomMaison, age: r.candidate.age,
      rang: r.candidate.rang, note: r.candidate.note, accord: r.candidate.accord,
      adulte: true, consentement_requis: true,
    } : null,
    choix: r.candidate
      ? ["OR", "NOBLE_CONSENTANTE", "OR_ET_NOBLE_CONSENTANTE", "NEGOCIER", "REFUSER"]
      : ["OR", "NEGOCIER", "REFUSER"],
  };
}

/* ---- Les trois façons de réclamer, et ce qu'elles font vraiment ---- */
/* orMult est appliqué au paiement ; le reste tombe au retour de mission. */
const TERMES_DU_PRIX = {
  OR: {
    label: "Réclamer l'Or seul",
    sub: c => `${Math.round(c.or * 1.25)} or · la maison paie et respire`,
    detail: "Une maison soulagée paie mieux. On vous prend pour un mercenaire, ce qui est un déguisement commode.",
    orMult: 1.25, liaison:false,
    reputation:{ humains:6, parias:-3 }, renom:0, suspicion:-2,
  },
  NOBLE_CONSENTANTE: {
    label: "Réclamer le consentement seul",
    sub: c => `Aucun or · une alliance, et une rente`,
    detail: "Renoncer à l'or pour du sang : la maison comprend qu'elle a affaire à quelqu'un qui pense en générations.",
    orMult: 0.15, liaison:true,
    reputation:{ humains:-4, parias:12 }, renom:6, suspicion:4,
  },
  OR_ET_NOBLE_CONSENTANTE: {
    label: "Réclamer le Prix entier",
    sub: c => `${c.or} or et le consentement · la coutume, en entier`,
    detail: "L'Or et le Sang, comme il est écrit nulle part et su de tous. La maison s'exécute, et ne l'oubliera pas.",
    orMult: 1, liaison:true,
    reputation:{ humains:-9, parias:20 }, renom:10, suspicion:9,
  },
};

function optionsDuPrix(c, prix){
  const p = prix.noble_proposee;
  const opts = Object.entries(TERMES_DU_PRIX)
    .filter(([id]) => p || id === 'OR')      // sans personne pour consentir, il ne reste que l'or
    .map(([id, t]) => ({
      id, label: id === 'NOBLE_CONSENTANTE' ? `Réclamer ${p.nom}` : t.label,
      sub: t.sub(c), detail: t.detail,
    }));
  opts.push({ id:"NEGOCIER", label:"Négocier les termes", sub:"Issue incertaine", detail:"On peut toujours essayer d'obtenir mieux. On obtient parfois moins." });
  opts.push({ id:"REFUSER", label:"Refuser l'affaire", sub:"Met fin à la mission", detail:"Une maison qu'on refuse s'en souvient." });
  return opts;
}

/* Le multiplicateur d'or dû au terme choisi. */
function multiplicateurDuPrix(choix){
  const t = TERMES_DU_PRIX[choix];
  return t ? t.orMult : 1;
}

/* Appliqué au retour d'une mission réussie. Rend la phrase à afficher. */
function appliquerPrix(c, choix, prix){
  const t = TERMES_DU_PRIX[choix];
  if(!t || !prix) return '';
  for(const [k, n] of Object.entries(t.reputation || {})) ajusterReputation(k, n);
  if(t.renom) ajusterRenom(t.renom);
  if(t.suspicion) adjustSuspicion(t.suspicion);

  if(!t.liaison){
    return ` La maison paie en or, sans un mot de plus. On n'a pas eu à parler du reste, et chacun préfère qu'il en soit ainsi.`;
  }
  const p = prix.noble_proposee;
  if(!p) return ` La maison n'avait personne à engager : tout s'est réglé en or.`;
  const liaison = nouerLiaison(p.nom, p.maison || c.commanditaire, c.titre);
  return liaison
    ? ` <b>${p.nom}</b> consent devant témoins, comme la coutume l'exige — et comme sa maison espérait n'avoir jamais à le faire.
       ${p.accord ? `<i>${p.accord}</i> ` : ''}${p.maison || c.commanditaire} soutient désormais celui à qui elle a donné l'Or et le Sang.`
    : ` La femme que la maison propose est déjà liée à Yohan. On règle en or, et l'on n'en reparle pas.`;
}

/* Ce qu'on écrit sur la carte d'une offre. */
function mentionDuPrix(c){
  return commanditaireNoble(c) ? "Prix du Paria" : (c.or + ' or');
}
