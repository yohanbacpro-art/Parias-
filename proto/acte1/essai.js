/* PARIAS — l'entrée d'essai
 * ═══════════════════════════════════════════════════════════════════════
 *
 * L'Acte III commence après deux actes qui font plusieurs heures. Pour le
 * relire, l'équilibrer ou simplement le montrer, il faut pouvoir y entrer
 * sans rejouer tout ce qui précède.
 *
 * Ce fichier ne fait **rien** si l'adresse ne le demande pas. Un joueur qui
 * ouvre le jeu normalement ne le rencontre jamais : pas de bouton, pas de
 * mention au seuil, aucune trace à l'écran. C'est la règle du prompt — le
 * joueur ne voit jamais les coulisses — et une porte de service n'y déroge
 * que si elle est invisible.
 *
 *   index.html?essai=riche      une partie qui a beaucoup fait
 *   index.html?essai=pauvre     une partie qui n'a presque rien fait
 *   index.html?essai=chronique  directement la fin, sur l'état « riche »
 *
 * La différence entre les deux premières n'est pas cosmétique : l'Acte III
 * compose ses demandes, son siège et sa chanson à partir de l'état réel du
 * monde. Une partie pauvre n'a pas les mêmes fronts, pas les mêmes ennemis
 * et pas le même épilogue.
 * ═══════════════════════════════════════════════════════════════════════ */

/* Ce qu'une partie « riche » a fait : les neuf rencontrés, Karlsberg bâtie,
 * les chasses menées, des inimitiés vivantes, et cinq crises avancées. */
const ESSAI_RICHE = {
  renom:72, suspicion:64, or:900,
  blessures:[{ zone:"l'épaule gauche", type:"éclat de fer", fonction:['tir'] }],
  flags:[
    /* les neuf, rencontrés : c'est ce qui ouvre les demandes de l'Acte III */
    'a2_lucius_vu', 'a2_charles_vu', 'a2_anarion_vu', 'el_rencontree',
    'a2_kardurak_aide', 'kd_commande', 'a2_khesh_vu',
    /* l'Acte I, qui décide de l'intendant et des chasses */
    'ch_meute_faite', 'ch_duel_fait', 'ch_reine_faite', 'ch_re_sept',
    'wy_route_reouverte',
    /* l'Acte II : la maison, le nom, les liens */
    'a2_bannieres', 'a2_heritier', 'a2_epouse_choisie', 'a2_alycia_reste',
    'a2_onde_rendue', 'a2_reseau_protege', 'a2_liaison', 'a2_caleb_quarante',
    'cb_paye', 'a2_nom_trouve', 'a2_ysabel_laissee',
    /* des gens qu'on a contrariés : sans ça, le siège n'a pas de visage */
    'as_sorgue_vivant', 'as_sorgue_cede', 'ch_du_revoir',
    'wy_gassien_vivant', 'wy_gassien_confondu',
    /* Ce qui décide de qui monte **avec** vous, et de ce que le barde aura
     * à chanter. Une partie riche n'est pas une partie qui a beaucoup
     * d'or : c'est une partie qui a laissé des traces chez des gens. */
    'ar_signal', 'ar_ouvert', 'ar_trente_quatre', 'ar_tenu', 'ar_onde', 'ar_or_seul',
    'va_sait_quatre_vingts', 'va_trois', 'va_greffe', 'va_tenanciers',
    'va_marais_sauve', 'va_bertran_reste', 'va_or_seul',
    'ro_sait_anciens', 'ro_sait_beaufrere', 'ro_baudoin_avoue',
    'ro_arret', 'ro_laisse', 'ro_aldren_vivant', 'ro_or_seul',
    'ha_sait_pas_rancon', 'ha_sait_elle_paie', 'ha_sait_lettres',
    'ha_discret', 'ha_lettres_mouillees', 'ha_ramenee', 'ha_refus_comp',
    'wy_sait_onze', 'wy_soupcon_couvee', 'wy_heloise_franche',
    'wy_heloise_lucide', 'wy_heloise_dette', 'wy_discret',
    'ch_lu', 'ch_temoins', 'ch_colin', 'ch_co_lie', 'ch_co_reste',
    'ch_hameau_sorti', 'ch_re_vue', 'ch_re_su', 'ch_re_neuf_vivants',
    'ch_sault_vu', 'ch_liste_lue', 'ch_du_craie_gagne', 'ch_du_rendue',
    'tr_pont', 'tr_adelie', 'tr_essai_adelie', 'tr_reconnu', 'tr_harn_vivant', 'tr_passe',
    'assise', 'as_sait_regles', 'as_gagne', 'as_loys_parle', 'as_nom_nu',
    'kar_arrive', 'kar_crypte', 'kar_quatre_corps', 'kar_chevaliere',
    'a2_karlsberg_eau', 'a2_karlsberg_habitable', 'a2_bourg', 'a2_asile_declare',
    'al_rencontree', 'al_silence', 'al_gamin_vivant', 'aly_appat_su', 'aly_appat_tu',
    'el_jardin', 'el_silence_jardin', 'el_longevite', 'el_rien_du',
    'lu_offre', 'lu_franc', 'ls_pourquoi', 'cb_termes',
    'ca_droit_su', 'ca_droit_garde',
    'a2_montdraken_certain', 'a2_commission', 'cd_inscrit', 'cd_onze',
    'fi_parloir_su', 'fi_pourquoi', 'fi_preuve', 'fi_avoue', 'fi_hospices', 'fi_assis',
    'pa_cachet_cadet', 'pa_famille', 'pa_soeur',
    'kd_vu', 'kd_dette', 'kd_tenu', 'an_gue_su', 'an_gue_tenu', 'an_parias',
    'kh_puits', 'kh_trois_jours', 'kh_franc',
    'px_su_le_chiffre', 'px_alix_lucide', 'a2_prix_paye', 'a2_liaison_verneuil',
    'ma_termes', 'ma_installee',
    'enf_ne', 'onde_enferme', 'a2_incorruptible',
  ],
  crises:{ elfes:3, astrah:3, khesh:2, kardurak:3, hordes:2 },
  ouvrages:9,
};

/* Ce qu'une partie « pauvre » a fait : le strict nécessaire pour arriver
 * jusqu'ici. Personne ne demande rien, personne ne vient, et la chanson le
 * dit sans ménagement. */
const ESSAI_PAUVRE = {
  renom:22, suspicion:14, or:120,
  blessures:[],
  flags:['a2_nom_trouve'],
  crises:{ elfes:1, astrah:1, khesh:0, kardurak:1, hordes:0 },
  ouvrages:0,
};

function monterEssai(p){
  neuf();   /* la feuille canonique de Yohan, comme une partie neuve */
  Object.assign(ETAT.comp, { esquive:6, lettres:5, pistage:5, survie:5 });
  ETAT.renom = p.renom;
  ETAT.suspicion = p.suspicion;
  ETAT.or = p.or;
  ETAT.blessures = p.blessures.map(b => Object.assign({ saignement:0, traitement:null }, b));
  for(const f of p.flags) ETAT.flags.add(f);

  const A = A2();
  A.annee = 3; A.saison = 3;
  A.crises = Object.assign({}, p.crises);

  /* Le palier de Karlsberg se lit dans les ouvrages du chantier ; on en pose
   * autant que le préréglage en demande, avec les identifiants réels. */
  if(typeof CHANTIER === 'function' && typeof OUVRAGES !== 'undefined'){
    const C = CHANTIER();
    C.faits = OUVRAGES.slice(0, p.ouvrages).map(o => o.id);
    for(const id of C.faits) ETAT.flags.add('fait_' + id);
  }
  A3();
}

(function entreeDEssai(){
  /* Deux écritures, parce que la publication sert le jeu dans un cadre qui
   * peut manger la partie « ? » de l'adresse. Le « # » y survit mieux, et il
   * ne coûte rien de lire les deux. */
  let quoi = null;
  try {
    quoi = new URLSearchParams(location.search).get('essai')
        || new URLSearchParams((location.hash || '').replace(/^#/, '')).get('essai');
  } catch(e){ return; }
  if(!quoi) return;

  /* On attend que tout soit chargé : l'ordre des scripts est le contrat de
   * dépendances, et cette porte-là s'ouvre après tout le monde. */
  const ouvrir = () => {
    if(quoi === 'pauvre'){ monterEssai(ESSAI_PAUVRE); aller('a3_bascule'); return; }
    if(quoi === 'chronique'){
      monterEssai(ESSAI_RICHE);
      for(const f of ['a3_ouvert','a3_siege_tenu','a3_tenu','a3_lucius_tenu',
                      'a3_charles_tenu','a3_ch_declare','a3_fl_passes','a3_pont_tenu',
                      'a3_porte_ouverte','a3_escalier_vu','in_ys_lettre','in_so_epargne'])
        ETAT.flags.add(f);
      A2().crises = { elfes:4, astrah:4, khesh:4, kardurak:3, hordes:2 };
      aller('a3_chronique');
      return;
    }
    monterEssai(ESSAI_RICHE);
    aller('a3_bascule');
  };

  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', ouvrir);
  else ouvrir();
})();
