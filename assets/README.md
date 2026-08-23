# Illustrations

Deux dossiers, deux formats. Les fichiers sont **facultatifs** : tant qu'un
fichier manque, le jeu dessine l'image à sa place, en SVG, à partir de ce
qu'elle représente — la palette du peuple et les attributs du personnage pour un
portrait, la famille de l'événement pour un bandeau. Déposer le fichier au bon
chemin suffit à le remplacer, aucun code à modifier.

> Ce fichier est **généré** : `node tools/manifest-assets.js`. Ne pas l'éditer à
> la main — ajouter un événement ou un personnage puis relancer la commande.

La colonne **Fourni** dit ce qui existe aujourd'hui dans `assets/`. Le reste est
dessiné par le jeu, et le restera tant qu'un fichier ne sera pas déposé au chemin
indiqué. Les découpes actuelles proviennent des planches de `assets/sources/`
et se refont avec `python3 tools/decoupe-affiche.py`.

## `events/` — bandeaux d'événements

- **Format** : `<id>.webp`, ratio **5:2**, 1200×480 recommandé.
- **Cadrage** : recadré en `object-fit: cover`, sujet centré verticalement.
- **id** : le champ `image` de l'événement.

### Événements de lieu

| Fichier attendu | Fourni | Illustre |
|---|---|---|
| `evt_peage.webp` | — | Le péage des Trois Clous |
| `evt_archives.webp` | — | Ce que gardent les archives |
| `evt_enfant.webp` | — | L'enfant qui fait trembler les vitres |
| `evt_cicatrice.webp` | — | Ce qui parle dans la Cicatrice |
| `evt_taverne.webp` | — | La table qui s'est tue |
| `evt_deux_maitres.webp` | — | Deux mains, un seul contrat |
| `evt_bannieres.webp` | — | Les bannières qu'on n'a plus le droit de coudre |
| `evt_lances.webp` | — | Le prix des trois lances |
| `evt_galerie.webp` | — | La galerie qu'on a murée deux fois |
| `evt_chapelle.webp` | — | La chapelle qu'on n'ouvre pas |
| `evt_orpailleur.webp` | — | Ce que l'orpailleur a remonté |
| `evt_tunnel.webp` | — | Le tunnel qui monte |
| `evt_harde.webp` | — | La harde qui laisse passer |
| `evt_epave.webp` | — | L'épave qui n'a pas coulé |
| `evt_pierres.webp` | — | Les pierres qui écoutent |
| `evt_port_noir.webp` | — | Le manifeste qui ne correspond pas |
| `evt_tambours.webp` | — | Les tambours qui comptent |
| `evt_phare.webp` | — | Le phare qu'on rallume |
| `evt2_forge.webp` | — | La forge qui ne chauffe pas pour tout le monde |
| `evt2_dette_naine.webp` | — | Ce qu'un nain refuse de devoir |
| `evt2_puits.webp` | — | Le puits qu'on ne partage pas deux fois |
| `evt2_tempete.webp` | — | Ce que la tempête met au jour |
| `evt2_ossements.webp` | — | Ce qui reste chaud dans les os |
| `evt2_chant.webp` | — | Le chant qu'on n'a pas le droit d'entendre |
| `evt2_jardin.webp` | — | Le jardin qu'on laisse mourir |
| `evt2_tribut.webp` | — | Le tribut des Profondeurs |
| `evt2_jeune_chef.webp` | — | Celui qui veut être vu perdre |
| `evt2_harde_blessee.webp` | — | Ce que les chasseurs ont laissé |
| `evt2_marque.webp` | — | La marque qu'on ne demande pas |
| `evt2_veine.webp` | — | La veine qui répond |
| `evt2_pelerin.webp` | — | Celui qui monte pour ne pas redescendre |
| `evt2_maree.webp` | — | Ce que la marée rend |
| `evt2_naufrages.webp` | — | Ceux qui ne veulent pas être sauvés |
| `evt2_ile.webp` | — | L'île qui n'était pas là |
| `evt2_echo.webp` | — | L'écho qui prend une voix connue |
| `evt2_pierre_blason.webp` | — | La pierre qu'on a retournée |
| `evt2_arene_truquee.webp` | — | Le combat qu'on vous demande de perdre |
| `evt2_receleur.webp` | — | Ce que le receleur ne veut plus garder |
| `evt2_convoi.webp` | — | Le convoi qui n'aurait pas dû passer là |
| `evt2_veillee.webp` | — | La veillée aux Pierres |
| `evt2_col_ferme.webp` | — | Le col qu'on a fermé sans le dire |
| `evt2_sans_ombre.webp` | — | L'homme qui marche sans ombre |
| `evt2_traduction.webp` | — | Le mot qu'on a traduit de travers |
| `evt2_moisson.webp` | — | La première moisson des Champs |

### Rencontres

| Fichier attendu | Fourni | Illustre |
|---|---|---|
| `rc_caleb.webp` | — | Le prince qui n'aime pas la concurrence |
| `rc_tyrion.webp` | — | La faute d'un autre peuple |
| `rc_charles.webp` | — | Le Sourire de Fer |
| `rc_kemval.webp` | — | Deux bannis sous le même soleil |
| `rc_khalvaene.webp` | — | L'usurpateur au milieu des os |
| `rc_anarion.webp` | — | Une invitation qu'on ne refuse pas |
| `rc_arene.webp` | — | Le Tenant du Sable Rouge |
| `rc_lucius.webp` | — | Le tacticien |

### Jalons de la trame

| Fichier attendu | Fourni | Illustre |
|---|---|---|
| `tr_courrier.webp` | — | Le courrier qui n'est jamais arrivé |
| `tr_alycia.webp` | — | Ce qu'elle n'a pas dit en arrivant |
| `tr_ruines.webp` | — | La statue qui garde encore |
| `tr_sans_nom.webp` | — | Ceux qui n'ont plus de nom |
| `tr_dette.webp` | — | Ce que son peuple doit |
| `tr_banniere.webp` | — | La bannière qu'il faut coudre |
| `tr_roi_cendre.webp` | — | Une audience qu'on ne refuse pas |
| `tr_suivait.webp` | — | Ce que l'Onde suivait |
| `tr_prix.webp` | — | Le prix du nom |
| `tr_maison.webp` | — | Ce qu'une maison doit choisir |
| `tr_le_nom.webp` | — | Le nom Karlsberg |

### L'arc du Livré

| Fichier attendu | Fourni | Illustre |
|---|---|---|
| `ne_trois_lettres.webp` | — | Le hameau qu'on n'a pas eu à brûler |
| `ne_sillage.webp` | — | Le registre du sillage |
| `ne_sans_nom.webp` | — | L'homme qui a rendu son nom |
| `ne_ce_quil_prend.webp` | — | Ce qu'il prend d'abord |
| `ne_le_nom.webp` | — | Le nom qu'on lui donne |

### Campagnes et affaires personnelles

| Fichier attendu | Fourni | Illustre |
|---|---|---|
| `cg_route.webp` | — | Rouvrir la Route Grise |
| `cg_cendre.webp` | — | Déloger la compagnie franche |
| `cg_defile.webp` | — | Boucher le Défilé |
| `cg_karlsberg.webp` | — | Reprendre les Ruines du Loup |
| `cg_tyrion.webp` | — | Le champ que Tyrion a choisi |
| `cg_lucius.webp` | — | Le calendrier de Lucius |
| `cg_khesh.webp` | — | L'Unification des Sables |
| `cg_kardurak.webp` | — | La Guerre des Profondeurs |
| `cg_surface.webp` | — | La Remontée |
| `cg_horde.webp` | — | La Grande Horde |
| `cg_eltharion.webp` | — | La Faute d'Eltharion |
| `cg_parias.webp` | — | La Renaissance des Parias |
| `cs_caleb.webp` | — | La faveur de Fort-aux-Princes |
| `cs_tyrion.webp` | — | La commission d'Eltharion |
| `cs_vauclair.webp` | — | Ce que Vauclair n'a pas oublié |

### Attachements

| Fichier attendu | Fourni | Illustre |
|---|---|---|
| `ro_alycia_1.webp` | — | Ce qu'on ne dit qu'à quelqu'un qui sait |
| `ro_alycia_2.webp` | — | Ce qu'elle demande vraiment |
| `ro_alycia_3.webp` | — | Trente-et-un noms, et un de plus |
| `ro_alarielle_1.webp` | — | Ce que coûte de réparer |
| `ro_alarielle_2.webp` | — | Ce qu'elle perdrait |
| `ro_eleonore_1.webp` | — | Ce qui n'était pas dans le contrat |
| `ro_eleonore_2.webp` | — | Une maison qui compte |

### Événements générés

Les 200 variantes de `src/data/events.js` cherchent un bandeau par
famille :

| Fichier attendu | Fourni | Famille |
|---|---|---|
| `evt_contrat.webp` | — | CONTRAT |
| `evt_elfe.webp` | ✅ | ELFE |
| `evt_elfe_noir.webp` | ✅ | ELFE_NOIR |
| `evt_guerre.webp` | — | GUERRE |
| `evt_homme_bete.webp` | ✅ | HOMME_BETE |
| `evt_khesh.webp` | ✅ | KHESH |
| `evt_nain.webp` | ✅ | NAIN |
| `evt_onde.webp` | ✅ | ONDE |
| `evt_paria.webp` | ✅ | PARIA |
| `evt_peau_verte.webp` | ✅ | PEAU_VERTE |
| `evt_politique.webp` | — | POLITIQUE |
| `evt_taverne.webp` | — | TAVERNE |
| `evt_ville.webp` | ✅ | VILLE |
| `evt_voyage.webp` | ✅ | VOYAGE |

## `portraits/` — portraits de personnages

- **Format** : `<id>.webp`, **carré**, 512×512 recommandé.
- Affiché en médaillon rond : cadrer le visage **au centre**, il est recadré en cercle.
- **id** : la clé dans `src/data/portraits.js`.

| Fichier attendu | Fourni | Personnage | Peuple | Attribut |
|---|---|---|---|---|
| `yohan.webp` | ✅ | Yohan de Karlsberg — *Paria · dernier héritier du Loup* | paria | nu · Onde |
| `alycia.webp` | ✅ | Alycia de Callensbourg — *Paria · vit cachée* | paria | capuche · Onde |
| `alarielle.webp` | ✅ | Princesse Alarielle — *Elfe · Cour d'Eltharion* | elfe | tresses |
| `eleonore.webp` | — | Lady Éléonore — *Maison de Valombre* | astrah | voile |
| `caleb.webp` | ✅ | Caleb de Fort-aux-Princes — *Prince Paria* | paria | couronne · Onde |
| `leopold.webp` | ✅ | Léopold IV d'Astrah — *Le Roi de Cendre* | astrah | couronne |
| `lucius.webp` | ✅ | Lucius Furius Augustus — *Prétendant impérial* | astrah | heaume |
| `tyrion.webp` | ✅ | Prince Tyrion — *Elfe · fils d'Eltharion* | elfe | couronne |
| `anarion.webp` | ✅ | Anarion le Magnifique — *Roi des Elfes noirs* | elfe_noir | couronne |
| `eltharion.webp` | ✅ | Eltharion le Grand — *Roi des Elfes* | elfe | couronne |
| `charles.webp` | ✅ | Charles de Mont-Draken — *Le Sourire de Fer* | astrah | barbe |
| `kemval.webp` | ✅ | Kem-Val — *Khesh · Le Banni* | khesh | voile |
| `khalvaene.webp` | ✅ | Khal-Vaene — *Khesh · usurpateur* | khesh | masque |
| `isolde.webp` | ✅ | Isolde de Varenne — *Duchesse · l'étincelle du Second Empire* | astrah | tresses |
| `baltus.webp` | — | Baltus Trois-Clous — *Chef de péage* | humain | chapeau |
| `mere_orsen.webp` | — | Mère Orsen — *Archiviste de Fort-aux-Princes* | humain | voile |
| `perrin.webp` | — | Perrin le Boiteux — *Ancien soldat d'Astrah* | astrah | barbe |
| `dame_sarre.webp` | — | Dame Sarre de Vauclair — *Commanditaire* | humain | tresses |
| `vieil_orpailleur.webp` | — | Hesken — *Orpailleur des Champs de Cendre* | humain | chapeau |
| `soeur_lisen.webp` | — | Sœur Lisen — *Gardienne de la chapelle* | humain | voile |
| `taverniere.webp` | — | Wenda — *Tenancière du Chaudron Fendu* | humain | nu |
| `gorm.webp` | — | Gorm fils de Gorik — *Nain · maître de galerie* | nain | barbe |
| `aza_khesh.webp` | — | Aza-Rhun — *Khesh · porteuse de lances* | khesh | tresses |
| `capitaine_ferre.webp` | — | Capitaine Ferré — *Officier d'Astrah* | astrah | heaume |
| `enfant_onde.webp` | — | L'enfant sans nom — *Touchée par l'Onde* | paria | nu · Onde |
| `chasseur_prime.webp` | — | Le Chasseur — *Prime sur un Paria* | humain | capuche |
| `tenant_arene.webp` | — | Le Tenant du Sable Rouge — *Invaincu de l'Arène Rouge* | humain | masque |
| `garde_astrah.webp` | — | Garde du Roi de Cendre — *Astrah · maison royale* | astrah | heaume |
| `lame_noire.webp` | — | Lame de la Cour Noire — *Duelliste d'Anarion* | elfe_noir | masque |
| `jardiniere.webp` | — | La jardinière — *Elfe · entretient ce que la Cour a laissé* | elfe | voile |
| `gruk.webp` | — | Gruk — *Peau-Verte · dix-sept ans* | peau_verte | nu |
| `le_livre.webp` | — | L'homme sans nom — *L.F.A. · Livré, Formé, Assermenté* | astrah | nu · Onde |

### Combattants nommés

Chaque champion affiche le portrait ci-dessous pendant un affrontement.

| Champion | Portrait utilisé |
|---|---|
| Caleb de Fort-aux-Princes | `caleb` |
| Prince Tyrion | `tyrion` |
| Khal-Vaene | `khalvaene` |
| Kem-Val le Banni | `kemval` |
| Charles le Sourire de Fer | `charles` |
| Lame de la Cour Noire | `lame_noire` |
| Le Tenant du Sable Rouge | `tenant_arene` |
| Garde du Roi de Cendre | `garde_astrah` |
| L'homme sans nom | `le_livre` |
| Aza-Rhun | `aza_khesh` |
| Gruk | `gruk` |
| Chasseur de Parias | `chasseur_prime` |

## Vérifier

`node tools/validate.js` signale tout `image` ou `pnj` référencé sans entrée
correspondante, tout champion dont le portrait n'existe pas au registre, et tout
portrait dont le peuple ou l'attribut ne serait pas dessinable. Il ne vérifie pas
la présence des fichiers eux-mêmes, puisqu'ils sont facultatifs par construction.
