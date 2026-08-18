/* PARIAS — Registre des personnages illustrés
 *
 * Chaque clé correspond à un fichier attendu dans assets/portraits/<clé>.webp
 * (512×512). En son absence, src/ui/art.js affiche un blason procédural stable.
 *
 * `role` s'affiche sous le nom dans la vignette d'un événement.
 */
const PORTRAITS = {
  /* — Protagoniste et proches — */
  yohan:        {nom:"Yohan de Karlsberg", role:"Paria · dernier héritier du Loup"},
  alycia:       {nom:"Alycia de Callensbourg", role:"Paria · vit cachée"},
  alarielle:    {nom:"Princesse Alarielle", role:"Elfe · Cour d'Eltharion"},

  /* — Figures du Codex — */
  caleb:        {nom:"Caleb de Fort-aux-Princes", role:"Prince Paria"},
  leopold:      {nom:"Léopold IV d'Astrah", role:"Le Roi de Cendre"},
  lucius:       {nom:"Lucius Furius Augustus", role:"Prétendant impérial"},
  tyrion:       {nom:"Prince Tyrion", role:"Elfe · fils d'Eltharion"},
  anarion:      {nom:"Anarion le Magnifique", role:"Roi des Elfes noirs"},
  eltharion:    {nom:"Eltharion le Grand", role:"Roi des Elfes"},
  charles:      {nom:"Charles de Mont-Draken", role:"Le Sourire de Fer"},
  kemval:       {nom:"Kem-Val", role:"Khesh · Le Banni"},
  khalvaene:    {nom:"Khal-Vaene", role:"Khesh · usurpateur"},

  /* — Personnages d'événements — */
  baltus:       {nom:"Baltus Trois-Clous", role:"Chef de péage"},
  mere_orsen:   {nom:"Mère Orsen", role:"Archiviste de Fort-aux-Princes"},
  perrin:       {nom:"Perrin le Boiteux", role:"Ancien soldat d'Astrah"},
  dame_sarre:   {nom:"Dame Sarre de Vauclair", role:"Commanditaire"},
  vieil_orpailleur: {nom:"Hesken", role:"Orpailleur des Champs de Cendre"},
  soeur_lisen:  {nom:"Sœur Lisen", role:"Gardienne de la chapelle"},
  taverniere:   {nom:"Wenda", role:"Tenancière du Chaudron Fendu"},
  gorm:         {nom:"Gorm fils de Gorik", role:"Nain · maître de galerie"},
  aza_khesh:    {nom:"Aza-Rhun", role:"Khesh · porteuse de lances"},
  capitaine_ferre:{nom:"Capitaine Ferré", role:"Officier d'Astrah"},
  enfant_onde:  {nom:"L'enfant sans nom", role:"Touché par l'Onde"},
  chasseur_prime:{nom:"Le Chasseur", role:"Prime sur un Paria"},
};
