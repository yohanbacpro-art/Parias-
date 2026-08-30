/* PARIAS — CE QUE YOHAN PORTE, ET CE QU'IL A DANS LE SANG
 * ═══════════════════════════════════════════════════════════════════════
 * Le dossier du personnage tient en une ligne et le prototype en avait
 * oublié les deux tiers :
 *
 *   « deux pistolets à silex, une épée bâtarde, et dans les veines une
 *     magie de l'Onde qui fatigue autant qu'elle détruit. »
 *
 * L'épée était là. Les pistolets et le Drain n'existaient nulle part.
 *
 * ── LES DEUX PISTOLETS ────────────────────────────────────────────────
 * Ce ne sont pas des armes de combat : ce sont deux décisions. Un pistolet
 * à silex se charge en quarante secondes dans un atelier bien éclairé, et
 * en une minute et demie quand on a les mains qui tremblent. Dans un
 * échange, ça n'existe pas. On a donc deux coups, deux, dans toute une
 * affaire — après quoi on porte deux masses inutiles à la ceinture.
 *
 * En échange, à moins de dix pas, une balle de plomb de trois quarts d'once
 * traverse tout ce que ce monde sait fabriquer, et fait un bruit qu'on
 * entend à une lieue. C'est l'arme qui règle un duel avant qu'il commence,
 * et qui apprend à toute une vallée qu'il s'est passé quelque chose.
 *
 * ── LE DRAIN ──────────────────────────────────────────────────────────
 * L'autre branche de l'Onde. Là où pousser déplace, le Drain PREND — la
 * chaleur, le souffle, ce qui fait qu'une chose est encore chaude — et le
 * rend à celui qui prend. C'est le seul pouvoir du jeu qui soigne, et
 * c'est la chose la plus incriminante qu'un homme puisse faire devant
 * témoins : on ne peut pas expliquer autrement quelqu'un qui se referme
 * pendant qu'un autre se vide.
 *
 * Sur une bête, c'est laid. Sur un homme, ça ne s'oublie pas, et celui qui
 * regarde change d'avis sur vous pour le reste de sa vie.
 * ═══════════════════════════════════════════════════════════════════════ */

/* ── Les pistolets ────────────────────────────────────────────────────── */
const PISTOLETS = () => (ETAT.pistolets = ETAT.pistolets === undefined ? 2 : ETAT.pistolets);
const charges   = () => PISTOLETS();
const tirer     = () => { ETAT.pistolets = Math.max(0, PISTOLETS() - 1); };
const recharger = () => { ETAT.pistolets = 2; };

/* Un choix de combat prêt à poser dans n'importe quelle scène. `dc` est la
 * difficulté de l'adversaire ; `pres` dit si l'on est à portée utile. */
function choixPistolet(o){
  const pres = o.pres !== false;
  return {
    t: charges() === 2 ? "Un pistolet" : "Le second pistolet",
    si: () => charges() > 0,
    detail: () => `${charges()} coup${charges() > 1 ? 's' : ''} · on ne recharge pas dans un échange`
      + (pres ? " · à bout portant, rien de ce monde n'arrête ça" : " · trop loin, le plomb tombe")
      + ` · Perception + tir contre ${o.dc}`,
    risque: "calculé",
    avant: tirer,
    test: { carac:'perception', comp:'tir', dc:o.dc, adversaire:o.adversaire, manoeuvre:'pistolet',
            equipement: pres ? 4 : 0, situation:o.situation },
    degres: o.degres,
  };
}

/* ── Le Drain ─────────────────────────────────────────────────────────── */
/* Il rend ce qu'il prend : c'est le seul soin du jeu, et il se paie en
 * concentration, en témoins, et en ce que les gens décident de vous. */
function drainer(part){
  const r = Math.round(part);
  ETAT.ressources.vitalite = Math.min(100, (ETAT.ressources.vitalite || 0) + r);
  ETAT.ressources.sang     = Math.min(100, (ETAT.ressources.sang || 0) + Math.round(r * 0.6));
  depenser({ concentration:Math.round(r * 1.2) });
  /* Une blessure qui saigne cesse de saigner : le Drain referme avant tout. */
  for(const b of ETAT.blessures) if(b.saignement) b.saignement = Math.max(0, b.saignement - 1);
  return r;
}

function choixDrain(o){
  return {
    t: o.humain ? "Le Drain — sur lui" : "Le Drain",
    detail: () => (o.humain
        ? "prendre ce qui le tient encore chaud, et le garder"
        : "prendre à la bête ce qu'il lui reste, et se refermer")
      + (o.temoins && o.temoins !== 'aucun' ? " · devant témoins, et ça ne s'oublie pas" : " · personne ne regarde")
      + ` · Volonté + Onde contre ${o.dc}`,
    risque: "définitif", definitif:true,
    ferme: o.temoins && o.temoins !== 'aucun'
      ? "Ferme : la version où vous êtes un homme d'armes qui a de la chance" : undefined,
    test: { carac:'volonte', comp:'onde', dc:o.dc, adversaire:o.adversaire, manoeuvre:'drain',
            cout:{ concentration:o.cout || 20 }, situation:o.situation },
    degres: o.degres,
  };
}

/* Le prix social. Un Drain vu par quelqu'un ne se range dans aucune case
 * connue : ce n'est pas de la sorcellerie de conte, c'est un homme qui se
 * referme pendant qu'un autre refroidit. */
const DRAIN_SUSPICION = { aucun:0, un:14, quelques:26, foule:38, province:52 };

function drainVu(temoins){
  const n = DRAIN_SUSPICION[temoins] || 0;
  if(n) ETAT.suspicion = Math.min(100, ETAT.suspicion + n);
  if(temoins && temoins !== 'aucun') ETAT.flags.add('a2_drain_vu');
  return n;
}
