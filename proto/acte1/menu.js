/* PARIAS — le seuil
 * ═══════════════════════════════════════════════════════════════════════
 * Un jeu qui démarre tout seul sur la dernière sauvegarde est un jeu qui
 * décide à la place du joueur. On ouvre donc sur un écran qui ne fait que
 * trois choses : reprendre, recommencer, régler la crudité.
 *
 * La reprise affiche ce qu'on reprend — le lieu, la saison, l'état du corps,
 * la dernière chose inscrite au journal. Sinon on rouvre à l'aveugle une
 * partie de trois heures dont on ne se souvient plus.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Ce qu'on lit d'une sauvegarde sans la charger : de quoi décider. */
function apercuSauvegarde(){
  let d = null;
  try{ d = JSON.parse(localStorage.getItem(CLE) || 'null'); }catch(e){ return null; }
  if(!d || !d.scene) return null;

  const flags = new Set(d.flags || []);
  const acte2 = d.acte2 && d.acte2.annee !== undefined;
  const ou = acte2 && typeof LIEUX === 'object' && LIEUX[d.acte2.lieu]
    ? LIEUX[d.acte2.lieu].nom : null;

  const saisons = ["printemps", "été", "automne", "hiver"];
  const annees = ["vingt-et-unième", "vingt-deuxième", "vingt-troisième", "vingt-quatrième"];

  return {
    acte: acte2 ? 'II' : 'I',
    quand: acte2
      ? `${saisons[d.acte2.saison] || 'printemps'} de la ${annees[d.acte2.annee] || 'vingt-et-unième'} année`
      : "dix-neuvième année après la Purge",
    ou: ou || (flags.has('as_arrivee') ? "Chastel" : "la Route Grise"),
    renom: d.renom || 0,
    suspicion: d.suspicion || 0,
    or: d.or || 0,
    blessures: (d.blessures || []).length,
    dernier: (d.faits || []).slice(-1)[0] || null,
    portes: (d.portes || []).length,
  };
}

const RANG_DIT = r =>
  r >= 95 ? "On dit : « Nous cherchons Yohan de Karlsberg. »"
  : r >= 45 ? "On dit : « Nous cherchons Yohan. »"
  : "On dit : « Nous cherchons un Paria. »";

const SUSPICION_DIT = s =>
  s >= 75 ? "Ce n'est plus une rumeur. C'est un dossier."
  : s >= 45 ? "On enquête. Deux maisons ont demandé des relevés."
  : "Personne ne sait encore ce que vous êtes.";

function rendreMenu(){
  const s = apercuSauvegarde();
  const el = document.getElementById('scene');

  el.innerHTML = `
    <div class="seuil">
      <p class="lieu">Chroniques de Vardhen</p>
      <h1>PARIAS</h1>
      <p class="recit seuil-sous">Dernier héritier connu d'une maison rayée pendant la
        Grande Purge. Deux pistolets à silex, une épée bâtarde, et dans les veines
        une chose qui fatigue autant qu'elle détruit.</p>

      ${s ? `
      <div class="seuil-reprise">
        <p class="etiquette">Une partie en cours — acte ${s.acte}</p>
        <p class="recit"><b>${s.ou}</b> · ${s.quand}</p>
        <p class="recit seuil-etat">${RANG_DIT(s.renom)} ${SUSPICION_DIT(s.suspicion)}</p>
        <p class="recit seuil-etat">${s.or} or · ${
          s.blessures ? `<span class="mal">${s.blessures} blessure${s.blessures > 1 ? 's' : ''} non refermée${s.blessures > 1 ? 's' : ''}</span>` : "aucune blessure ouverte"
        }${s.portes ? ` · ${s.portes} porte${s.portes > 1 ? 's' : ''} fermée${s.portes > 1 ? 's' : ''} pour de bon` : ''}</p>
        ${s.dernier ? `<p class="recit seuil-dernier">« ${s.dernier} »</p>` : ''}
      </div>` : `
      <div class="seuil-reprise seuil-vide">
        <p class="recit">Aucune partie enregistrée. Ce qui se décidera ici ne se reprendra pas.</p>
      </div>`}

      <div class="choix">
        ${s ? `<button data-m="reprendre">
          <span class="ch-t">Reprendre</span>
          <span class="ch-detail">là où vous vous êtes arrêté</span>
        </button>` : ''}
        <button data-m="neuf" ${s ? 'data-risque="définitif"' : ''} class="${s ? 'definitif' : ''}">
          <span class="ch-t">Nouvelle partie</span>
          ${s ? '<span class="ch-risque">définitif</span>' : ''}
          <span class="ch-detail">${s ? "efface la partie en cours · rien ne se récupère" : "commencer par le prologue"}</span>
        </button>
      </div>

      <div class="seuil-gore">
        <p class="etiquette">Crudité du récit</p>
        <p class="recit seuil-etat">Ce réglage change ce qui est décrit, jamais ce qui arrive :
          les conséquences sont les mêmes aux trois niveaux.</p>
        <div id="seuilGore">
          ${GORES.map(g => `<button data-g="${g}" aria-pressed="${String(ETAT.gore === g)}">${GORE_NOMS[g]}</button>`).join('')}
        </div>
      </div>
    </div>`;

  el.querySelector('[data-m="reprendre"]')?.addEventListener('click', () => {
    charger();
    document.querySelectorAll('#gore button').forEach(b =>
      b.setAttribute('aria-pressed', String(b.dataset.g === ETAT.gore)));
    majBandeau();
    aller(ETAT.scene);
  });

  el.querySelector('[data-m="neuf"]').addEventListener('click', () => {
    if(s && !confirm("Recommencer efface la partie en cours. Rien ne se récupère.")) return;
    nouvelle();
  });

  el.querySelectorAll('#seuilGore button').forEach(b =>
    b.addEventListener('click', () => {
      reglerGore(b.dataset.g);
      el.querySelectorAll('#seuilGore button').forEach(x =>
        x.setAttribute('aria-pressed', String(x.dataset.g === ETAT.gore)));
    }));

  window.scrollTo({ top:0, behavior:'instant' });
}
