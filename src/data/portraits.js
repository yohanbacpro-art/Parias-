/* PARIAS — Registre des personnages illustrés
 *
 * Chaque clé correspond à un fichier attendu dans assets/portraits/<clé>.webp
 * (512×512). En son absence, src/ui/art.js DESSINE le personnage à partir des
 * champs ci-dessous — le portrait n'est donc jamais anonyme, même sans fichier.
 *
 *   nom     affiché dans la vignette
 *   role    seconde ligne de la vignette
 *   peuple  palette du dessin : humain, paria, elfe, elfe_noir, nain, khesh,
 *           peau_verte, homme_bete, astrah (impérial)
 *   trait   silhouette : couronne, capuche, heaume, voile, barbe, cornes,
 *           masque, tresses, chapeau, nu
 *   onde    true si le personnage porte l'Onde — le regard et une marque
 *           passent alors dans le turquoise
 */
const PORTRAITS = {
  /* — Protagoniste et proches — */
  yohan:        {nom:"Yohan de Karlsberg", role:"Paria · dernier héritier du Loup",
                 peuple:"paria", trait:"nu", onde:true},
  alycia:       {nom:"Alycia de Callensbourg", role:"Paria · vit cachée",
                 peuple:"paria", trait:"capuche", onde:true},
  alarielle:    {nom:"Princesse Alarielle", role:"Elfe · Cour d'Eltharion",
                 peuple:"elfe", trait:"tresses"},
  eleonore:     {nom:"Lady Éléonore", role:"Maison de Valombre",
                 peuple:"astrah", trait:"voile"},

  /* — Figures du Codex — */
  caleb:        {nom:"Caleb de Fort-aux-Princes", role:"Prince Paria",
                 peuple:"paria", trait:"couronne", onde:true},
  leopold:      {nom:"Léopold IV d'Astrah", role:"Le Roi de Cendre",
                 peuple:"astrah", trait:"couronne"},
  lucius:       {nom:"Lucius Furius Augustus", role:"Prétendant impérial",
                 peuple:"astrah", trait:"heaume"},
  tyrion:       {nom:"Prince Tyrion", role:"Elfe · fils d'Eltharion",
                 peuple:"elfe", trait:"couronne"},
  anarion:      {nom:"Anarion le Magnifique", role:"Roi des Elfes noirs",
                 peuple:"elfe_noir", trait:"couronne"},
  eltharion:    {nom:"Eltharion le Grand", role:"Roi des Elfes",
                 peuple:"elfe", trait:"couronne"},
  charles:      {nom:"Charles de Mont-Draken", role:"Le Sourire de Fer",
                 peuple:"astrah", trait:"barbe"},
  kemval:       {nom:"Kem-Val", role:"Khesh · Le Banni",
                 peuple:"khesh", trait:"voile"},
  khalvaene:    {nom:"Khal-Vaene", role:"Khesh · usurpateur",
                 peuple:"khesh", trait:"masque"},

  /* — Personnages d'événements — */
  baltus:       {nom:"Baltus Trois-Clous", role:"Chef de péage",
                 peuple:"humain", trait:"chapeau"},
  mere_orsen:   {nom:"Mère Orsen", role:"Archiviste de Fort-aux-Princes",
                 peuple:"humain", trait:"voile"},
  perrin:       {nom:"Perrin le Boiteux", role:"Ancien soldat d'Astrah",
                 peuple:"astrah", trait:"barbe"},
  dame_sarre:   {nom:"Dame Sarre de Vauclair", role:"Commanditaire",
                 peuple:"humain", trait:"tresses"},
  vieil_orpailleur: {nom:"Hesken", role:"Orpailleur des Champs de Cendre",
                 peuple:"humain", trait:"chapeau"},
  soeur_lisen:  {nom:"Sœur Lisen", role:"Gardienne de la chapelle",
                 peuple:"humain", trait:"voile"},
  taverniere:   {nom:"Wenda", role:"Tenancière du Chaudron Fendu",
                 peuple:"humain", trait:"nu"},
  gorm:         {nom:"Gorm fils de Gorik", role:"Nain · maître de galerie",
                 peuple:"nain", trait:"barbe"},
  aza_khesh:    {nom:"Aza-Rhun", role:"Khesh · porteuse de lances",
                 peuple:"khesh", trait:"tresses"},
  capitaine_ferre:{nom:"Capitaine Ferré", role:"Officier d'Astrah",
                 peuple:"astrah", trait:"heaume"},
  enfant_onde:  {nom:"L'enfant sans nom", role:"Touchée par l'Onde",
                 peuple:"paria", trait:"nu", onde:true},
  chasseur_prime:{nom:"Le Chasseur", role:"Prime sur un Paria",
                 peuple:"humain", trait:"capuche"},

  /* — Combattants nommés qui n'ont pas de fiche ailleurs — */
  tenant_arene: {nom:"Le Tenant du Sable Rouge", role:"Invaincu de l'Arène Rouge",
                 peuple:"humain", trait:"masque"},
  garde_astrah: {nom:"Garde du Roi de Cendre", role:"Astrah · maison royale",
                 peuple:"astrah", trait:"heaume"},
  lame_noire:   {nom:"Lame de la Cour Noire", role:"Duelliste d'Anarion",
                 peuple:"elfe_noir", trait:"masque"},
};
