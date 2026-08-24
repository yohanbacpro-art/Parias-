/* PARIAS — Les chaînes secrètes
 *
 * Le pilier « conséquences longues » du document fondateur, rendu visible.
 *
 *   « Une décision importante ne se réduit pas à relation −20. Elle pose un
 *     marqueur. Des mois plus tard, cet homme peut envoyer des tueurs,
 *     provoquer en duel, marcher sur Karlsberg — ou renoncer. »
 *
 * Une chaîne secrète ne se propose jamais et ne s'accepte jamais. Elle
 * **s'arme toute seule**, en silence, quand vous avez fait quelque chose — et
 * elle revient vous chercher des mois plus tard, en fin de tour, pendant que
 * vous êtes occupé ailleurs.
 *
 * Tirées de design/narratif/02_EVENEMENTS/CHAINES_SECRETS. Le pack donne le
 * titre, la prémisse, les cinq étapes et leurs fenêtres ; ce fichier écrit les
 * scènes, les choix et ce qu'ils coûtent.
 *
 * Format identique aux affaires, plus :
 *   declencheur : { flags:[…], sansFlags:[…], apres:[minSem, maxSem], … }
 *
 * Elles sont versées dans CHAINES à la fin du fichier : le moteur ne fait
 * aucune différence, sinon qu'il ne les propose pas.
 */

const CHAINES_SECRETES = [

/* ══════════════════════════════════════════════════════════════════════════
   01 — LE SEIGNEUR HUMILIÉ
   Une maison qu'on a fait parler devant sa cour ne l'oublie pas.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_SEIGNEUR", type:'secret', titre:"Le Seigneur humilié",
  declencheur:{ flags:["valcroix_humilie"], apres:[6,14] },
  issues:{
    vendetta_eteinte:"La vendetta de Valcroix s'est éteinte : le fils a renoncé.",
    vendetta_payee:"La vendetta de Valcroix a été soldée en or, ce qui n'éteint rien.",
    vendetta_sang:"La vendetta de Valcroix s'est terminée dans le sang, comme elle avait commencé.",
    heritier_retourne:"L'héritier de Valcroix a fini par prendre le parti de celui qui a humilié son père.",
  },
  etapes:[
    { id:"ombre", delai:[2,5], attente:"Quelque chose vous suit depuis deux relais.",
      ev:{ id:"SS_1", titre:"Les hommes dans l'ombre", famille:"VOYAGE", rarete:"majeur",
        image:"evt_traque",
        scenes:{
          start:{ texte:[
            "Ils sont trois et ils ne sont pas doués. Ils suivent depuis deux relais en changeant de manteau, ce qui ne sert à rien quand on garde les mêmes bottes.",
            "Ils attaquent dans une ruelle de relais, le soir, et le plus jeune tremble tellement qu'il lâche son couteau avant d'avoir frappé.",
            "Ce ne sont pas des tueurs. Ce sont des gens qu'on a payés pour être des tueurs."],
            combat:{ groupe:[{bst:"BST_041", n:2}, {bst:"BST_042", n:1}], victoire:"apres", defaite:"blesse" }},
          apres:{ fin:true, texte:[
            "Deux morts, un vivant, à genoux dans la boue, qui parle avant qu'on lui demande.",
            "« Valcroix. Le fils. Quarante couronnes chacun et une lettre qui dit : *l'homme qui a fait parler mon père devant sa cour.* »",
            "Il lève les yeux. « J'ai un frère à la forge. Je peux vous dire où il loge. »"],
            effets:{xp:20, flag:"seigneur_fils_paie"}},
          blesse:{ fin:true, texte:[
            "Trois hommes mauvais valent quand même trois hommes. Il s'en sort avec une entaille au flanc et l'un d'eux s'échappe.",
            "Sur le mort, une lettre pliée en quatre : *l'homme qui a fait parler mon père devant sa cour.* Signée d'un sceau de Valcroix."],
            effets:{pv:-16, fat:10, xp:14, flag:"seigneur_fils_paie"}},
        }}},

    { id:"dette", delai:[6,12], attente:"Valcroix n'a pas dit son dernier mot.",
      ev:{ id:"SS_2", titre:"La dette de sang", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Cette fois, ce n'est pas trois hommes mal payés : c'est un notaire, à cheval, avec une escorte et un document.",
            "« Assignation en réparation d'honneur. La maison de Valcroix réclame six mille écus ou un duel judiciaire, au choix du défendeur. »",
            "Il ajoute, sans plaisir : « Le seigneur de Valcroix est mort en février. C'est son fils qui poursuit. »"],
            choix:[
              {label:"Payer les six mille écus", detail:"−6000 or · l'affaire est close en droit",
               requis:{or:6000}, suite:"paye", effets:{or:-6000, issue:"vendetta_payee"}},
              {label:"Accepter le duel judiciaire", detail:"Le fils a vingt-quatre ans et il a été formé",
               suite:"duel"},
              {label:"Ignorer l'assignation", detail:"On ne signifie pas deux fois à un homme qui bouge",
               suite:"ignore", effets:{reputation:{humains:-8}}},
              {label:"Aller lui parler", detail:"Jet de Volonté (14) · il a perdu son père en février",
               test:{stat:"vol", dc:14}, reussite:"parle_ok", echec:"parle_ko"},
            ]},
          paye:{ fin:true, texte:[
            "Six mille écus, un reçu notarié, et une réparation d'honneur enregistrée devant la chancellerie.",
            "L'affaire est close en droit. En droit seulement : le fils de Valcroix encaisse et ne dit rien, et un homme qui encaisse sans rien dire n'a rien pardonné."]},
          duel:{ fin:true, texte:[
            "Le duel judiciaire se tient dans six semaines, en champ clos, devant témoins.",
            "Il y a des choses qu'on ne peut plus arrêter une fois qu'on a dit oui."],
            effets:{flag:"seigneur_duel_accepte"}},
          ignore:{ fin:true, texte:[
            "Il ne signe pas, il ne reçoit pas, il prend la route au matin.",
            "Le notaire fait constater le refus. La maison de Valcroix obtient une condamnation par défaut et le droit de se faire justice elle-même — ce qui, dans cette province, veut dire exactement ce que ça a l'air de vouloir dire."],
            effets:{flag:"seigneur_condamne"}},
          parle_ok:{ fin:true, texte:[
            "Il a vingt-quatre ans, il porte le deuil, et il reçoit debout dans la salle où son père a parlé.",
            "« Vous l'avez tué. Pas de votre main. Il n'a plus rien dit à personne pendant sept mois et il est mort en février. »",
            "Yohan ne se défend pas, ce qui est la seule chose à faire.",
            "Le fils finit par dire : « Je retire l'assignation. » Puis, plus bas : « Je ne retire rien du reste. »"],
            effets:{xp:26, flag:"seigneur_fils_parle"}},
          parle_ko:{ fin:true, texte:[
            "Il ne le reçoit pas. On laisse Yohan trois heures dans une antichambre, puis un intendant vient dire que le seigneur ne recevra pas.",
            "L'assignation suit son cours."],
            effets:{xp:8}},
        }}},

    { id:"heritier", delai:[10,20], attente:"Le fils de Valcroix a vingt-quatre ans et du temps.",
      ev:{ id:"SS_3", titre:"Le choix de l'héritier", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_chapelle",
        scenes:{
          start:{ texte:[
            "Il vient lui-même, avec deux hommes, et il attend qu'on ait fini de manger.",
            "« J'ai fait le compte. Trois hommes payés, une assignation, et un an de ma vie. »",
            "Il pose son gant sur la table. « Mon père a pillé un nid de dragon et laissé deux de ses gens là-haut. Il a menti à sa cour pendant quatre mois. Vous l'avez fait parler et il en est mort. »",
            "Il relève les yeux. « Ce que je n'arrive pas à décider, c'est lequel de vous deux je dois haïr. »"],
            choix:[
              {label:"Lui dire que son père a payé pour ce qu'il avait fait", detail:"Jet de Volonté (15) · c'est vrai et c'est brutal",
               test:{stat:"vol", dc:15}, reussite:"vrai_ok", echec:"vrai_ko"},
              {label:"Lui présenter des excuses", detail:"Ce n'est pas ce qu'on doit, et ça peut suffire",
               suite:"excuses", effets:{renom:-4}},
              {label:"Lui proposer de servir", detail:"Requiert du Renom · un jeune seigneur sans père a besoin d'un bras",
               requis:{renomMin:35}, suite:"servir"},
              {label:"Le renvoyer", detail:"On ne discute pas avec la deuxième génération d'une rancune",
               suite:"renvoie", effets:{issue:"vendetta_sang"}},
            ]},
          vrai_ok:{ fin:true, texte:[
            "« Votre père a envoyé des hommes piller un nid. Deux ne sont pas redescendus. Il le savait et il a laissé la vallée brûler quatre mois plutôt que de le dire. »",
            "« Je l'ai fait parler. Je ne l'ai pas tué. Ce qui l'a tué, c'est d'avoir eu à le dire à voix haute. »",
            "Le jeune homme reste très longtemps immobile. Puis il reprend son gant.",
            "« Bien », dit-il. Et il s'en va, et il n'enverra plus personne."],
            effets:{xp:34, renom:6, issue:"vendetta_eteinte", flag:"valcroix_fils_sait"}},
          vrai_ko:{ fin:true, texte:[
            "Il l'écoute jusqu'au bout et il n'entend rien, parce qu'un homme de vingt-quatre ans qui porte le deuil n'entend pas ce genre de phrase.",
            "« Alors c'est vous que je hais », dit-il en remettant son gant."],
            effets:{xp:12, issue:"vendetta_sang"}},
          excuses:{ fin:true, texte:[
            "Des excuses, dites simplement, sans se justifier, à un jeune homme qui n'en attendait aucune.",
            "Il ne s'y attendait tellement pas qu'il ne sait pas quoi en faire. Il repart sans avoir rien dit.",
            "Il n'enverra plus personne. Il ne pardonnera pas non plus."],
            effets:{xp:20, issue:"vendetta_eteinte"}},
          servir:{ fin:true, texte:[
            "« Vous avez vingt-quatre ans, une vallée, et personne à qui demander conseil. Vous avez surtout un dragon dans la montagne et une cour qui a vu votre père mentir. »",
            "« Je n'ai pas besoin de votre haine. Vous avez besoin de quelqu'un qui monte là-haut quand ça recommence. »",
            "Il met quatre jours à répondre. La réponse arrive par écrit, en trois mots : *Quand ça recommence.*",
            "La maison de Valcroix ne sera jamais une alliée. Elle sera quelque chose de plus utile : une maison qui vous doit."],
            effets:{xp:40, renom:10, reputation:{humains:10}, issue:"heritier_retourne",
                    flag:"valcroix_oblige"}},
          renvoie:{ fin:true, texte:[
            "« Vous avez fini ? »",
            "Le jeune homme remet son gant très lentement. « Non », dit-il. « Je n'ai pas commencé. »",
            "Il repart avec ses deux hommes. Ce qu'il enverra la prochaine fois ne tremblera pas."]},
        }}},

    { id:"table", delai:[16,30], attente:"Valcroix n'a jamais renoncé.",
      ev:{ id:"SS_4", titre:"La dernière table", famille:"TAVERNE", rarete:"majeur",
        requis:{ sansFlags:["valcroix_fils_sait","valcroix_oblige"] },
        image:"evt_taverne",
        scenes:{
          start:{ texte:[
            "Il est assis à la table du fond quand Yohan entre, et il est seul, ce qui est le pire signe possible.",
            "Il a vieilli de dix ans en deux. Il fait signe à l'aubergiste de servir deux verres et il attend qu'on s'assoie.",
            "« Deux ans. Onze hommes. Trois mille écus. » Il fait tourner son verre. « Et je n'ai jamais pu vous faire dire un seul mot devant témoins, ce qui était tout ce que je voulais. »",
            "Il pose une main sur la table. Sous la main, un couteau qu'il n'a manifestement pas l'habitude de porter."],
            choix:[
              {label:"Boire le verre", detail:"Jet de Volonté (14) · s'asseoir en face d'un homme qui a un couteau",
               test:{stat:"vol", dc:14}, reussite:"boit_ok", echec:"boit_ko"},
              {label:"Se lever et sortir", detail:"On ne finit pas ce genre de chose dans une taverne",
               suite:"sort", effets:{issue:"vendetta_eteinte", renom:-4}},
              {label:"Prendre le couteau", detail:"Il ne s'en servira pas bien",
               suite:"couteau"},
            ]},
          boit_ok:{ fin:true, texte:[
            "Il boit. Ils boivent tous les deux, en silence, pendant un temps déraisonnable.",
            "À la fin, le fils de Valcroix repousse le couteau au milieu de la table, du bout des doigts.",
            "« Mon père a menti à sa cour et il en est mort. J'ai mis deux ans à pouvoir le dire. »",
            "Il se lève. « C'est tout ce que j'avais. » Il laisse le couteau sur la table et il sort.",
            "On ne le reverra pas."],
            effets:{xp:40, renom:8, issue:"vendetta_eteinte", flag:"valcroix_fils_sait"}},
          boit_ko:{ texte:["Il tend la main vers le verre et le fils de Valcroix se lève d'un seul mouvement, et deux hommes entrent par la porte de service."],
            combat:{ groupe:[{bst:"BST_063", n:1}, {bst:"BST_061", n:2}], victoire:"gagne", defaite:"perd" }},
          couteau:{ texte:["Il prend le couteau sur la table avant l'autre. Le fils de Valcroix appelle, et deux hommes entrent par la porte de service."],
            combat:{ groupe:[{bst:"BST_063", n:1}, {bst:"BST_061", n:2}], victoire:"gagne", defaite:"perd" }},
          gagne:{ fin:true, texte:[
            "Il reste debout dans une salle où plus personne ne bouge, et le fils de Valcroix est par terre entre deux tables.",
            "Il a vingt-six ans. La maison de Valcroix n'a plus d'héritier mâle.",
            "L'aubergiste essuie le même gobelet depuis une minute. Quelqu'un, quelque part dans cette salle, racontera cette histoire pendant vingt ans."],
            effets:{xp:35, renom:-8, reputation:{humains:-14}, suspicion:10,
                    issue:"vendetta_sang", flag:"valcroix_eteinte"}},
          perd:{ fin:true, texte:[
            "Trois hommes dans une salle fermée, dont un duelliste de cour payé pour ça.",
            "Yohan sort par la fenêtre de l'arrière-cuisine avec une entaille qui met deux mois à se fermer.",
            "Le fils de Valcroix a eu ce qu'il voulait : quelqu'un a vu Yohan de Karlsberg fuir par une fenêtre."],
            effets:{pv:-30, fat:20, renom:-10, issue:"vendetta_sang"}},
          sort:{ fin:true, texte:[
            "Il se lève sans toucher au verre et il sort par la grande porte, lentement, en tournant le dos.",
            "Rien ne se passe. Le fils de Valcroix reste seul devant deux verres pleins.",
            "Il ne réessaiera pas. Ce n'était pas un guet-apens : c'était la dernière chose qu'il avait à offrir, et on l'a refusée."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   02 — LES ENFANTS DU FOSSÉ
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_ENFANTS", type:'secret', titre:"Les Enfants du fossé",
  declencheur:{ flags:["enfant_sauvee"], apres:[10,20] },
  issues:{
    dette_rendue:"L'enfant du fossé est revenue rendre ce qu'elle devait, et elle est repartie.",
    sous_banniere:"L'enfant du fossé sert désormais sous une bannière, et ce n'est pas la vôtre.",
    a_karlsberg:"L'enfant du fossé est à Karlsberg, et elle y commande quelque chose.",
    perdue:"On n'a plus de nouvelles de l'enfant du fossé.",
  },
  etapes:[
    { id:"famille", delai:[3,7], attente:"Une famille a peut-être été retrouvée.",
      ev:{ id:"SE_1", titre:"Une famille retrouvée", famille:"VOYAGE", rarete:"commun",
        image:"evt_enfant",
        scenes:{
          start:{ pnj:"enfant_onde", texte:[
            "C'est la femme du relais qui en parle, sans savoir à qui elle parle.",
            "« La petite du fossé ? Elle est chez les Marlin, à Combe-Basse. Ils avaient perdu un enfant l'hiver d'avant. Ça s'est fait tout seul. »",
            "Elle essuie une chope. « Elle demande encore, des fois, si l'homme qui l'a sortie du fossé va revenir. Les Marlin lui disent que non. C'est mieux comme ça. »"],
            choix:[
              {label:"Aller la voir", detail:"Elle demande encore",
               suite:"voir"},
              {label:"Ne pas y aller", detail:"Les Marlin ont raison",
               suite:"pas_y_aller", effets:{xp:10}},
              {label:"Laisser de l'argent aux Marlin sans se montrer", detail:"−200 or",
               requis:{or:200}, suite:"argent", effets:{or:-200, flag:"enfants_dot"}},
            ]},
          voir:{ fin:true, pnj:"enfant_onde", texte:[
            "Elle a sept ans, elle porte des sabots trop grands, et elle le reconnaît avant qu'il ait franchi la barrière.",
            "Elle ne dit rien. Elle le regarde depuis le seuil pendant tout le temps qu'il parle avec les Marlin — de la récolte, de la route, de rien.",
            "Quand il repart, elle est encore là. Elle lève la main. Elle ne l'agite pas : elle la lève, comme on fait un serment."],
            effets:{xp:20, flag:"enfants_vue"}},
          pas_y_aller:{ fin:true, texte:["Il ne va pas à Combe-Basse. C'est la chose raisonnable et il y pense encore trois semaines plus tard."]},
          argent:{ fin:true, texte:[
            "Deux cents écus laissés chez le prêtre de Combe-Basse, à charge pour les Marlin, sans nom.",
            "Le prêtre demande de qui. « De quelqu'un qui passait. »",
            "Cela paiera une dot dans onze ans, ou un apprentissage, ou l'hiver s'il est mauvais."]},
        }}},

    { id:"grandit", delai:[14,26], attente:"Le temps passe pour les enfants aussi.",
      ev:{ id:"SE_2", titre:"Le garçon grandit", famille:"VOYAGE", rarete:"majeur",
        image:"evt2_veillee",
        scenes:{
          start:{ texte:[
            "Combe-Basse a brûlé au printemps — une querelle de bornes entre deux maisons, et un village entre les deux.",
            "Les Marlin sont morts. La petite non : elle a douze ans, elle a passé l'été sur les routes, et elle est arrivée jusqu'à une compagnie franche qui l'a prise comme garçon de bagages.",
            "Elle porte les cheveux courts et un nom de garçon. C'est plus sûr."],
            choix:[
              {label:"La sortir de là", detail:"Une compagnie franche n'est pas un endroit pour une fille de douze ans",
               suite:"sort"},
              {label:"Payer la compagnie pour qu'on la traite correctement", detail:"−400 or",
               requis:{or:400}, suite:"paye", effets:{or:-400, flag:"enfants_protegee"}},
              {label:"La laisser choisir", detail:"Jet de Volonté (13) · elle a douze ans et une opinion",
               test:{stat:"vol", dc:13}, reussite:"choisit_ok", echec:"choisit_ko"},
            ]},
          sort:{ fin:true, texte:[
            "Il faut racheter son engagement — quatre-vingts écus, le prix d'un garçon de bagages — et la porter sur trente lieues parce qu'elle refuse de marcher dans la bonne direction.",
            "Elle finit chez une tante à Fort-aux-Princes qui ne l'attendait pas et qui la garde.",
            "Elle ne remercie pas. À douze ans, on ne remercie pas quelqu'un qui vous enlève l'endroit où vous aviez fini par tenir."],
            effets:{or:-80, xp:24, flag:"enfants_sortie"}},
          paye:{ fin:true, texte:[
            "Quatre cents écus au capitaine, et une phrase dite assez bas pour qu'il comprenne ce qui arriverait si elle était mal traitée.",
            "Elle reste à la compagnie. Elle apprend à monter, à panser, à compter les rations, et à ne jamais dormir loin des chevaux.",
            "C'est une éducation. Ce n'est pas celle qu'on aurait choisie."],
            effets:{xp:20}},
          choisit_ok:{ fin:true, texte:[
            "« Tu peux venir avec moi, ou rester. »",
            "Elle réfléchit longtemps pour quelqu'un de douze ans. Puis : « Je reste. Ici on me donne à manger et personne me demande d'où je viens. »",
            "Un temps. « Mais je saurai où vous trouver. »",
            "Elle le dit comme une menace, et c'est probablement une promesse."],
            effets:{xp:26, flag:"enfants_choix"}},
          choisit_ko:{ fin:true, texte:["Elle ne répond pas. Elle retourne aux chevaux et elle ne se retourne pas, et il faut bien partir à un moment."],
            effets:{xp:10}},
        }}},

    { id:"dette", delai:[20,34], attente:"Les enfants deviennent adultes.",
      ev:{ id:"SE_3", titre:"La dette ancienne", famille:"GUERRE", rarete:"majeur",
        image:"evt_lances",
        scenes:{
          start:{ texte:[
            "Elle a dix-neuf ans, elle porte le harnois d'une compagnie franche, et elle arrête sa monture en travers de la route.",
            "Elle ôte son casque pour qu'on la reconnaisse, ce qui est une politesse de soldat.",
            "« Vous m'avez sortie d'un fossé. J'ai mis onze ans à savoir votre nom. »",
            "Derrière elle, onze cavaliers attendent sans mettre pied à terre."],
            choix:[
              {label:"Lui demander ce qu'elle veut", detail:"Elle est venue avec onze hommes",
               suite:"veut"},
              {label:"Lui proposer de venir à Karlsberg", detail:"Requiert la bannière levée",
               requis:{flag:"banniere_haute"}, suite:"karlsberg",
               effets:{issue:"a_karlsberg", renom:8, reputation:{parias:12}}},
              {label:"Lui dire qu'elle ne doit rien", detail:"On ne sort pas un enfant d'un fossé pour être remboursé",
               suite:"rien", effets:{issue:"dette_rendue", renom:4}},
            ]},
          veut:{ fin:true, texte:[
            "« Rien. »",
            "Elle remet son casque. « Mon capitaine est mort à l'automne. La compagnie est à moi depuis six semaines. Onze lances, deux chariots, et de quoi tenir un hiver. »",
            "Elle fait tourner sa monture. « Je passe une fois par an sur cette route. Si un jour vous avez besoin de onze lances, faites-le savoir sur la route Grise. On saura. »",
            "Elle repart. Elle n'a rien demandé et elle n'a rien donné : elle a ouvert un compte."],
            effets:{xp:30, issue:"sous_banniere", flag:"enfants_onze_lances"}},
          karlsberg:{ fin:true, texte:[
            "Elle regarde longtemps la bannière quand elle arrive dans la cour, et elle ne dit rien pendant le premier jour.",
            "Le deuxième, elle fait le tour des murs avec le maître d'œuvre et lui explique où le mur nord est mauvais. Elle a raison.",
            "Le troisième, ses onze cavaliers sont logés et elle a pris en main la garde de la route du Loup sans que personne le lui demande.",
            "Elle n'a jamais reparlé du fossé. Elle n'en reparlera jamais."],
            effets:{xp:40, flag:"enfants_a_karlsberg"}},
          rien:{ fin:true, texte:[
            "« Vous ne me devez rien. On ne sort pas un enfant d'un fossé pour être remboursé. »",
            "Elle le regarde une seconde de trop, puis elle remet son casque.",
            "« Je sais », dit-elle. « C'est pour ça que je suis venue. »",
            "Elle repart avec ses onze cavaliers. On la reverra un jour, quelque part, sous une bannière ou sous une autre."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   03 — LE DRAGON DE CENDRE
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_DRAGON", type:'secret', titre:"Le Dragon de Cendre",
  declencheur:{ flags:["dragon_de_la_combe_sauve"], apres:[12,24] },
  issues:{
    tribut_accepte:"Le dragon de la Combe verse un tribut à Karlsberg. Personne ne sait quoi en penser.",
    dragon_parti:"Le dragon de la Combe est parti vers l'est et n'est jamais revenu.",
    dragon_mort:"Le dragon de la Combe est mort, et pas de la main de celui qui l'avait sauvé.",
  },
  etapes:[
    { id:"ombre", delai:[4,10], attente:"On parle d'une ombre sur les champs.",
      ev:{ id:"SD_1", titre:"L'ombre sur les champs", famille:"VOYAGE", rarete:"majeur",
        image:"evt2_moisson",
        scenes:{
          start:{ texte:[
            "Depuis six semaines, une ombre passe sur les champs de la vallée basse, toujours à la même heure, toujours dans le même sens.",
            "Elle ne descend pas. Elle ne brûle rien. Les paysans ont cessé de rentrer les bêtes.",
            "Ce qu'ils disent, tous, avec la même formule : « Elle regarde. »"],
            choix:[
              {label:"Monter voir", detail:"Il n'y a qu'une façon de savoir",
               suite:"monte"},
              {label:"Demander où elle va", detail:"Jet de Précision (12) · toujours le même sens",
               test:{stat:"precision", dc:12}, reussite:"ou_ok", echec:"ou_ko"},
            ]},
          monte:{ fin:true, texte:[
            "Il monte la crête et il attend, et à l'heure dite l'ombre passe à cent pieds au-dessus.",
            "L'aile gauche porte encore la cicatrice du harpon. Elle vole mal de ce côté et elle vole quand même.",
            "Elle fait un cercle, un seul, et repart vers l'est. Elle l'a vu."],
            effets:{xp:22, flag:"dragon_revenu"}},
          ou_ok:{ fin:true, texte:[
            "Toujours dans le même sens : de l'est vers l'ouest le matin, de l'ouest vers l'est le soir.",
            "À l'ouest, il y a les hauteurs de la Combe. À l'est, il y a Karlsberg.",
            "Elle ne survole pas les champs : elle fait la route entre les deux, tous les jours, depuis six semaines."],
            effets:{xp:26, flags:["dragon_revenu","dragon_regarde_karlsberg"]}},
          ou_ko:{ fin:true, texte:["Une ombre, six semaines, et des paysans qui ne savent pas dire l'heure à un quart près. On sait qu'elle passe, pas où elle va."],
            effets:{xp:8}},
        }}},

    { id:"tribut", delai:[12,22], attente:"L'ombre passe toujours.",
      ev:{ id:"SD_2", titre:"Le tribut du dragon", famille:"ONDE", rarete:"majeur",
        image:"evt2_ossements",
        scenes:{
          start:{ texte:[
            "On le trouve un matin dans la cour de Karlsberg, ou devant le poste où Yohan se trouve : un bœuf mort, entier, posé — pas jeté — au milieu de l'espace dégagé.",
            "Il n'a pas été tué par un homme. Il n'a pas été mangé. Il a été apporté.",
            "Le lendemain, il y en a un deuxième."],
            choix:[
              {label:"Monter le remercier", detail:"C'est absurde et c'est ce qu'il faut faire",
               suite:"monte"},
              {label:"Faire distribuer la viande au village", detail:"Deux bœufs, c'est un mois de viande",
               suite:"distribue", effets:{reputation:{parias:10, humains:6}, renom:4}},
              {label:"Faire enlever les carcasses et ne rien dire", detail:"On ne veut pas de ce genre de réputation",
               suite:"enleve", effets:{suspicion:-4}},
            ]},
          monte:{ fin:true, texte:[
            "Il monte la Combe, seul, et il le trouve couché sur la crête, l'aile gauche mal repliée.",
            "Il ne parle pas — celui-ci n'a jamais parlé — mais il redresse la tête quand Yohan arrive et il attend.",
            "Yohan dit merci à voix haute, parce qu'il n'y a rien d'autre à dire à une chose de trente pas qui vous apporte des bœufs.",
            "Le dragon le regarde repartir. Le troisième bœuf arrive le surlendemain."],
            effets:{xp:30, sang:6, flag:"dragon_tribut"}},
          distribue:{ fin:true, texte:[
            "Deux bœufs, c'est un mois de viande pour quarante feux. On ne pose pas de questions sur l'origine, dans une vallée où l'on a faim.",
            "Le troisième arrive la semaine suivante, et le quatrième. Puis un cerf. Puis, une fois, un cheval de guerre encore sellé, dont personne ne saura jamais d'où il venait."],
            effets:{xp:24, flag:"dragon_tribut"}},
          enleve:{ fin:true, texte:[
            "On enterre les carcasses à l'écart et on n'en parle pas.",
            "Il en arrive quatre de plus, puis plus rien pendant trois semaines, puis un dernier — plus petit, presque maladroit.",
            "Après celui-là, l'ombre cesse de passer sur les champs."],
            effets:{xp:16, flag:"dragon_ecarte"}},
        }}},

    { id:"vol", delai:[20,34], attente:"L'ombre a cessé de passer.",
      ev:{ id:"SD_3", titre:"Le dernier vol", famille:"ONDE", rarete:"majeur",
        image:"evt2_ossements",
        scenes:{
          start:{ texte:[
            "Des chasseurs de la vallée haute descendent avec une nouvelle : il est sur la crête depuis onze jours et il n'a pas bougé.",
            "Quand Yohan arrive, il est encore vivant. L'aile gauche ne se replie plus du tout et il y a du sang séché sous les écailles du poitrail — pas une plaie de combat : quelque chose qui vient de l'intérieur.",
            "Il est très vieux, et il est venu mourir à trois lieues de la seule personne qui lui ait retiré un harpon du flanc."],
            choix:[
              {label:"Rester", detail:"Il n'y a rien à faire et il y a quelque chose à faire",
               suite:"reste"},
              {label:"L'achever", detail:"Onze jours, c'est long",
               suite:"acheve"},
              {label:"Redescendre", detail:"Ce n'est pas une chose qu'on regarde",
               suite:"descend", effets:{issue:"dragon_parti"}},
            ]},
          reste:{ fin:true, texte:[
            "Il reste trois jours sur la crête, sans rien faire d'utile, à côté d'une chose de trente pas qui met du temps à finir.",
            "Le troisième soir, elle tourne la tête vers lui une dernière fois, et il y a dedans quelque chose qu'aucun mot humain ne va chercher.",
            "Il redescend au matin. Les chasseurs de la vallée haute ne poseront jamais de questions sur ce qu'un homme fait pendant trois jours sur une crête.",
            "Ils rapporteront quand même l'histoire, et elle voyagera."],
            effets:{xp:50, sang:12, renom:8, suspicion:6,
                    issue:"dragon_parti", flag:"dragon_veille"}},
          acheve:{ fin:true, texte:[
            "Il faut monter jusqu'à la tête et il ne se défend pas.",
            "C'est plus rapide que de le laisser durer onze jours de plus, et cela ne rend pas la chose facile.",
            "Il redescend avec une écaille de poitrail dans la sacoche, longue comme un avant-bras, que personne ne saura identifier et que tout le monde regardera."],
            effets:{xp:45, sang:10, item:"accessoire_totem", issue:"dragon_mort",
                    flag:"dragon_acheve"}},
          descend:{ fin:true, texte:[
            "Il redescend le jour même.",
            "Les chasseurs de la vallée haute disent qu'il a mis six jours de plus. Ils disent aussi qu'à la fin il regardait vers l'est.",
            "On ne sait pas ce que ça veut dire chez un dragon, et personne ne le saura jamais."]},
        }}},
  ]},

];

/* On verse les chaînes secrètes dans le catalogue général : le moteur ne fait
 * aucune différence, sinon qu'il ne les propose jamais en offre. */
CHAINES_SECRETES.forEach(c => CHAINES.push(c));

const CHAINES_SECRETES_2 = [
/* ══════════════════════════════════════════════════════════════════════════
   04 — LE SANG DE CALLENSBOURG
   Une piste presque invisible conduit progressivement vers Alycia.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_CALLENSBOURG", type:'secret', titre:"Le Sang de Callensbourg",
  declencheur:{ flags:["cause_parias"], sansFlags:["alycia_rencontree"], apres:[8,16] },
  issues:{
    piste_suivie:"La piste des chasseurs disparus menait à quelqu'un. On sait désormais qui.",
    piste_abandonnee:"La piste des chasseurs disparus s'est perdue, et c'était peut-être mieux.",
    reseau_trouve:"Un réseau de Parias survivants existe, et il sait désormais que Yohan existe aussi.",
  },
  etapes:[
    { id:"nom", delai:[3,8], attente:"Un nom revient là où on ne devrait entendre aucun nom.",
      ev:{ id:"SC_1", titre:"Un nom murmuré", famille:"PARIA", rarete:"majeur",
        image:"evt_paria",
        scenes:{
          start:{ texte:[
            "Le nom revient trois fois en deux mois, toujours dans la même bouche : celle des chasseurs de Parias, quand ils boivent.",
            "Ils ne le prononcent pas comme un nom de gibier. Ils le prononcent comme on prononce le nom d'une maladie.",
            "« Callensbourg. »",
            "Ce qu'on en dit tient en une phrase : depuis quatre ans, les chasseurs qui montent au nord ne redescendent pas tous."],
            choix:[
              {label:"Payer un chasseur pour qu'il parle", detail:"−150 or",
               requis:{or:150}, suite:"paye", effets:{or:-150}},
              {label:"Compter les disparus", detail:"Jet de Précision (13) · les compagnies tiennent des rôles",
               test:{stat:"precision", dc:13}, reussite:"compte_ok", echec:"compte_ko"},
              {label:"Ne pas s'en mêler", detail:"Une chose qui mange des chasseurs de Parias n'est pas une ennemie",
               suite:"rien", effets:{issue:"piste_abandonnee", xp:10}},
            ]},
          paye:{ fin:true, texte:[
            "Il prend l'argent et il boit avant de parler, ce qui est mauvais signe pour ce qui va suivre.",
            "« Onze en quatre ans. Toujours par deux ou par trois, toujours au nord de la Cicatrice. On retrouve les chevaux. Jamais les hommes. »",
            "Il vide son verre. « Et une fois, un seul, on a retrouvé un homme. Il avait plus de langue et plus de mains, et il vivait encore. Il a mis six jours à mourir. »",
            "Il regarde son verre vide. « Le mot qu'il écrivait avec ses moignons, c'était pas un nom d'homme. »"],
            effets:{xp:26, flag:"callens_onze"}},
          compte_ok:{ fin:true, texte:[
            "Les compagnies de chasseurs tiennent des rôles, parce qu'elles se paient à la prime et qu'une prime se partage.",
            "Onze noms rayés en quatre ans, tous au nord de la Cicatrice, tous par groupes de deux ou trois.",
            "Et une régularité que personne n'a relevée : ils disparaissent toujours dans les six semaines qui suivent une prise. Comme si quelqu'un attendait qu'ils aient un Paria avec eux."],
            effets:{xp:30, flags:["callens_onze","callens_apres_les_prises"]}},
          compte_ko:{ fin:true, texte:["Des rôles de compagnie, des noms rayés, et des sergents qui n'aiment pas qu'on lise leurs comptes. On apprend qu'il en manque et pas combien."],
            effets:{xp:8}},
          rien:{ fin:true, texte:["Il laisse tomber. Ce qui mange les chasseurs de Parias au nord de la Cicatrice peut continuer sans lui, et il a tort de penser que ça n'a pas de conséquence."]},
        }}},

    { id:"lettre", delai:[10,18], attente:"Le nord de la Cicatrice n'est pas loin.",
      ev:{ id:"SC_2", titre:"La lettre sans sceau", famille:"PARIA", rarete:"majeur",
        image:"evt_cicatrice",
        scenes:{
          start:{ texte:[
            "Elle est glissée sous la porte de la chambre, à un relais où Yohan n'avait dit son nom à personne.",
            "Pas de sceau, pas de signature, une écriture de femme instruite.",
            "*Vous comptez les mêmes morts que moi. Cessez : vous les comptez trop fort et vous allez finir compté.*",
            "*Si vous montez quand même, montez seul, et n'emmenez rien qui brille.*"],
            choix:[
              {label:"Monter", detail:"Seul, et sans rien qui brille",
               suite:"monte"},
              {label:"Chercher qui a glissé la lettre", detail:"Jet de Précision (14)",
               test:{stat:"precision", dc:14}, reussite:"qui_ok", echec:"qui_ko"},
              {label:"Répondre par écrit et laisser la lettre au relais", detail:"Elle repassera",
               suite:"repond"},
            ]},
          monte:{ fin:true, texte:[
            "Onze jours au nord de la Cicatrice, seul, sans rien qui brille.",
            "Au onzième, il trouve un campement de chasseurs de Parias vieux de trois semaines. Six hommes. Ils sont tous morts et aucun n'a été touché par une arme.",
            "Ils sont morts comme les cent quatre-vingts de Belrive : sans une plaie, les mains sur les oreilles."],
            effets:{xp:32, flags:["callens_campement","callens_sans_plaie"]}},
          qui_ok:{ fin:true, texte:[
            "La fille de salle l'a vue : une femme seule, manteau de voyage, arrivée à la nuit, repartie avant l'aube, qui a payé sa chambre en pièces d'Astrah neuves.",
            "« Elle a demandé quelle chambre vous aviez. Elle a payé pour le savoir. »",
            "La fille de salle hésite, puis : « Elle avait les yeux comme les vôtres, monsieur. Vous savez : quand la lumière tombe mal. »"],
            effets:{xp:34, flags:["callens_une_femme","callens_comme_les_votres"]}},
          qui_ko:{ fin:true, texte:["Un relais, quarante clients par nuit, et une lettre glissée sous une porte. Personne n'a rien vu, ce qui est probablement vrai."],
            effets:{xp:8}},
          repond:{ fin:true, texte:[
            "Il écrit six lignes et laisse le pli au relais, à l'attention de personne.",
            "Il repasse onze semaines plus tard. Le pli n'y est plus, et à sa place il y a une réponse de quatre mots :",
            "*Pas encore. Continuez d'être utile.*"],
            effets:{xp:28, flag:"callens_correspondance"}},
        }}},

    { id:"capuche", delai:[16,28], attente:"Quelqu'un vous surveille depuis un moment.",
      ev:{ id:"SC_3", titre:"La femme sous la capuche", famille:"PARIA", rarete:"majeur",
        image:"ro_alycia_1",
        scenes:{
          start:{ pnj:"alycia", texte:[
            "Elle s'assoit en face sans demander, dans une salle pleine, et elle repousse sa capuche juste assez pour qu'on voie ce qu'il faut voir.",
            "« Onze chasseurs en quatre ans. Vous les avez comptés. Vous êtes le premier. »",
            "Elle fait glisser un verre vers lui. « Je vous surveille depuis quatorze mois. Vous êtes plus difficile à suivre que vous ne le croyez et plus facile que vous ne le devriez. »",
            "Puis, sans changer de ton : « Vous relevez un nom qu'on a rayé. C'est la chose la plus dangereuse que quiconque ait tentée depuis la Purge, et vous la faites avec des murs et des maçons. »"],
            choix:[
              {label:"Lui demander qui elle est", detail:"Elle attend qu'on demande",
               suite:"qui"},
              {label:"Lui demander ce qu'elle fait des chasseurs", detail:"Jet de Volonté (14)",
               test:{stat:"vol", dc:14}, reussite:"chasseurs_ok", echec:"chasseurs_ko"},
              {label:"Se lever et partir", detail:"On ne s'assoit pas en face de quelqu'un qui vous suit depuis quatorze mois",
               suite:"part", effets:{issue:"piste_abandonnee"}},
            ]},
          qui:{ fin:true, pnj:"alycia", texte:[
            "« Quelqu'un qui n'est pas le dernier non plus. »",
            "Elle boit. « Alycia de Callensbourg. Le nom ne vous dira rien : il a été rayé douze ans avant le vôtre, et personne n'a jamais relevé de murs pour celui-là. »",
            "Elle repose le verre. « Nous nous reverrons. Pas ici, pas cette année. Quand vous aurez fini de croire que des pierres suffisent. »",
            "Elle est partie avant qu'il ait fini son verre."],
            effets:{xp:44, sang:8, reputation:{parias:12}, suspicion:4,
                    issue:"piste_suivie", flags:["alycia_rencontree","callens_alycia"]}},
          chasseurs_ok:{ fin:true, pnj:"alycia", texte:[
            "« Ce que j'en fais ? »",
            "Elle sourit, et c'est la première chose vraiment inquiétante de la conversation. « Je les écoute. Longtemps. Ils finissent toujours par dire pour qui ils travaillent, et ce ne sont jamais les mêmes maisons qu'on croit. »",
            "Elle se lève. « Onze chasseurs, quatre ans, et une carte que personne d'autre n'a. Un jour vous en aurez besoin. »",
            "À la porte, sans se retourner : « Alycia de Callensbourg. Retenez-le : vous êtes le seul vivant qui l'ait entendu de ma bouche. »"],
            effets:{xp:48, sang:8, reputation:{parias:14}, suspicion:4,
                    issue:"reseau_trouve", flags:["alycia_rencontree","callens_alycia","callens_carte"]}},
          chasseurs_ko:{ fin:true, pnj:"alycia", texte:[
            "« Vous posez la mauvaise question, et vous la posez à voix haute dans une salle pleine. »",
            "Elle remet sa capuche et s'en va. On ne la reverra pas cette année-là.",
            "Il reste un verre plein sur la table et un nom qu'elle n'a pas dit."],
            effets:{xp:20, issue:"piste_suivie", flag:"callens_ratee"}},
          part:{ fin:true, texte:[
            "Il se lève au milieu d'une phrase et il sort.",
            "Elle ne le suit pas. Elle ne le suivra plus : quelqu'un qui refuse de s'asseoir n'est pas quelqu'un avec qui on travaille.",
            "Les chasseurs continuent de disparaître au nord de la Cicatrice. C'est autant de moins pour tout le monde, et il n'en saura jamais rien."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   05 — LES FILS PERDUS DU LOUP
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_FILS", type:'secret', titre:"Les Fils perdus du Loup",
  declencheur:{ flags:["karlsberg_branche_cadette"], apres:[8,18] },
  issues:{
    rassembles:"Ce qui restait des Karlsberg s'est rassemblé. Ils sont plus nombreux qu'on ne croyait.",
    refuses:"Les derniers Karlsberg ont refusé de reprendre le nom, et ils avaient leurs raisons.",
    disperses:"Ce qui restait des Karlsberg est resté dispersé, et sous d'autres noms.",
  },
  etapes:[
    { id:"nom", delai:[4,10], attente:"Le sixième registre nommait une branche cadette.",
      ev:{ id:"SF_1", titre:"Un nom différent", famille:"PARIA", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "La branche cadette de Fort-aux-Princes n'existe plus sous ce nom. Elle existe sous celui de *Vaury*, depuis quarante et un ans, et il y a onze Vaury vivants.",
            "Ils sont charrons, tanneurs, une sage-femme, un sergent de la garde. Aucun n'a la moindre idée.",
            "Ou plutôt : aucun ne l'a jamais dit à voix haute, ce qui n'est pas la même chose."],
            choix:[
              {label:"Aller voir le sergent", detail:"Un homme d'armes sait ce qu'il doit taire",
               suite:"sergent"},
              {label:"Aller voir la sage-femme", detail:"Jet de Précision (12) · elles savent les naissances",
               test:{stat:"precision", dc:12}, reussite:"sage_ok", echec:"sage_ko"},
              {label:"Ne rien remuer", detail:"Ils sont vivants parce qu'ils sont Vaury",
               suite:"rien", effets:{issue:"disperses", xp:14}},
            ]},
          sergent:{ fin:true, texte:[
            "Il a quarante ans, il sert la garde de Fort-aux-Princes depuis dix-huit, et il comprend en trois phrases.",
            "Il ne nie pas. Il ferme la porte, ce qui est un aveu.",
            "« Mon grand-père a changé le nom en l'an vingt-deux. Il a payé un greffier trois ans de gages. Ma mère me l'a dit sur son lit de mort et m'a fait jurer de ne le dire à personne. »",
            "Il s'assoit. « Vous êtes la deuxième personne à qui je le dis. La première, c'était ma femme, il y a douze ans, et elle a pleuré trois jours. »"],
            effets:{xp:32, flag:"fils_sergent"}},
          sage_ok:{ fin:true, texte:[
            "Elle a soixante-huit ans et elle a mis au monde la moitié de Fort-aux-Princes.",
            "« Il y en a trois qui ont la marque », dit-elle sans qu'on lui ait rien demandé de précis. « Deux garçons et une fille. Je l'ai vue à la naissance, sur les trois. Je n'ai rien dit aux mères. »",
            "Elle continue de plier du linge. « Vous croyez que je ne sais pas ce que c'est ? J'en ai vu quatre en quarante ans. Les trois autres sont morts avant dix ans, et pas de maladie. »"],
            effets:{xp:36, sang:6, flags:["fils_sage_femme","fils_trois_marques"]}},
          sage_ko:{ fin:true, texte:["Elle a soixante-huit ans, elle est polie, et elle ne dira rien à un étranger sur les enfants de son village. C'est exactement ce qu'il faut attendre d'une bonne sage-femme."],
            effets:{xp:8}},
          rien:{ fin:true, texte:["Il referme le registre et il s'en va. Onze Vaury continuent d'être des Vaury, ce qui les a gardés vivants quarante et un ans."]},
        }}},

    { id:"refus", delai:[12,22], attente:"Onze personnes portent un nom qui n'est pas le leur.",
      ev:{ id:"SF_2", titre:"Ceux qui refusent Karlsberg", famille:"PARIA", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Ils sont sept dans l'arrière-salle d'une tannerie, parce que les quatre autres ont refusé de venir.",
            "Le sergent parle pour eux, parce qu'il est celui qui a une position.",
            "« On sait ce que vous relevez. On sait ce que ça veut dire pour nous. »",
            "Il pose les mains à plat. « Mon grand-père a payé un greffier pour qu'on cesse d'être des Karlsberg. Grâce à lui, onze personnes sont vivantes. Vous nous demandez de défaire ça. »"],
            choix:[
              {label:"Leur demander de venir à Karlsberg", detail:"Requiert la bannière levée",
               requis:{flag:"banniere_haute"}, test:{stat:"vol", dc:15},
               reussite:"vient_ok", echec:"vient_ko"},
              {label:"Leur dire qu'ils n'ont rien à faire", detail:"Ils ne doivent rien et personne ne leur demande rien",
               suite:"rien",
               effets:{issue:"disperses", reputation:{parias:6}, renom:2}},
              {label:"Leur laisser le choix pour plus tard", detail:"Une lettre, un lieu, et rien d'autre",
               suite:"plus_tard"},
              {label:"Insister", detail:"Le nom compte plus que onze personnes",
               suite:"insiste",
               effets:{issue:"refuses", reputation:{parias:-10}, renom:-4}},
            ]},
          vient_ok:{ fin:true, texte:[
            "Ce qui les décide n'est pas le nom : c'est la sage-femme, qui n'était pas invitée et qui entre au milieu.",
            "« Trois des vôtres ont la marque. Deux garçons et une fille. Ici, quelqu'un finira par la voir. Là-bas, personne ne la regardera. »",
            "Cinq viennent. Le sergent reste : « J'ai dix-huit ans de garde et une femme qui a pleuré trois jours. Je ne recommence pas. »",
            "Il ajoute, à la porte : « Mais je saurai toujours où vous êtes. Et je suis sergent de la garde de Fort-aux-Princes. »"],
            effets:{xp:44, renom:10, reputation:{parias:20}, suspicion:8,
                    issue:"rassembles", flags:["fils_a_karlsberg","fils_sergent_allie"]}},
          vient_ko:{ fin:true, texte:[
            "Ils écoutent, ils remercient, et ils disent non — les sept, l'un après l'autre, sans se concerter.",
            "« Vous relevez un nom », dit le sergent en le raccompagnant. « Nous, on a des enfants. Ce n'est pas la même arithmétique. »"],
            effets:{xp:16, issue:"refuses"}},
          rien:{ fin:true, texte:[
            "« Vous ne me devez rien. Je ne suis pas venu chercher des gens : je suis venu voir s'il en restait. »",
            "Le sergent met un moment à comprendre qu'on ne va rien lui demander. Quand il comprend, il tend la main.",
            "Onze Vaury restent des Vaury. Trois d'entre eux portent la marque et ne le sauront jamais, et c'est peut-être ce qu'il fallait."]},
          plus_tard:{ fin:true, texte:[
            "Une lettre, un lieu, une phrase : *si un jour ça devient nécessaire, la route du Loup part de Vaubien.*",
            "Ils ne viennent pas. Pas cette année.",
            "Trois ans plus tard, quand Fort-aux-Princes lèvera l'impôt de sang et que la garde ira chercher les hommes dans les tanneries, quatre Vaury prendront la route du Loup en pleine nuit avec ce qu'ils peuvent porter."],
            effets:{xp:34, reputation:{parias:14}, issue:"rassembles", flag:"fils_viendront"}},
          insiste:{ fin:true, texte:[
            "Il insiste. Il a des arguments et ils sont bons, et c'est précisément ce qui rend la chose laide.",
            "Ils disent non quand même, et ils le disent avec une froideur qui ne se réparera pas.",
            "« Vous êtes venu nous dire que notre grand-père a eu tort de nous sauver », dit le sergent en ouvrant la porte. « Bonne route. »"]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   06 — LA MAISON OFFENSÉE
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_OFFENSEE", type:'secret', titre:"La Maison offensée",
  declencheur:{ flags:["artois_trahie"], apres:[10,20] },
  issues:{
    guerre_ouverte:"La maison d'Artois-Noir a porté ses bannières contre Karlsberg.",
    reparation:"Ce qui avait été volé à Artois-Noir a été réparé, aussi mal que possible.",
    rancune_froide:"Artois-Noir n'a jamais rien fait. C'est ce qui inquiète.",
  },
  etapes:[
    { id:"espion", delai:[4,10], attente:"Quelqu'un s'intéresse à ce que vous faites.",
      ev:{ id:"SO_1", titre:"L'espion", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_traque",
        scenes:{
          start:{ texte:[
            "Il se fait embaucher comme charretier et il est bon charretier, ce qui rend la chose difficile à voir.",
            "Ce qui le trahit, c'est qu'il ne boit pas et qu'il compte. Il compte les hommes, les charges, les sorties, et il le fait avec les lèvres.",
            "Au bout de trois semaines, il a de quoi remplir un rapport."],
            choix:[
              {label:"Le laisser faire et lire son rapport", detail:"Jet de Précision (14)",
               test:{stat:"precision", dc:14}, reussite:"lit_ok", echec:"lit_ko"},
              {label:"Le retourner", detail:"−300 or · un espion payé deux fois compte pour deux",
               requis:{or:300}, suite:"retourne", effets:{or:-300}},
              {label:"Le renvoyer sans un mot", detail:"Il rapportera qu'on l'a vu, ce qui est aussi un message",
               suite:"renvoie"},
            ]},
          lit_ok:{ fin:true, texte:[
            "Le rapport tient sur trois feuillets, il est méthodique, et il est destiné à Artois-Noir.",
            "Il compte : les hommes en armes, les hauteurs de mur, les réserves, les jours où Yohan est absent.",
            "En marge, une seule note personnelle, de la main de l'espion : *l'endroit tient mieux qu'annoncé. Déconseille l'opération.*"],
            effets:{xp:30, flag:"offensee_rapport"}},
          lit_ko:{ fin:true, texte:["Il ne laisse rien traîner et il écrit la nuit. Trois semaines à le surveiller pour n'apprendre que ce qu'on savait déjà : quelqu'un compte."],
            effets:{xp:10}},
          retourne:{ fin:true, texte:[
            "Trois cents écus, et un homme qui accepte trop vite — ce qui veut dire qu'il était déjà mal payé.",
            "Il continue d'envoyer des rapports à Artois-Noir. Ils sont désormais faux d'un tiers, ce qui est le bon dosage : un rapport entièrement faux se repère."],
            effets:{xp:34, flag:"offensee_espion_retourne"}},
          renvoie:{ fin:true, texte:[
            "On le paie, on le remercie pour trois semaines de bon travail, et on le raccompagne jusqu'à la route sans rien dire d'autre.",
            "Il comprend qu'on a compris. Il partira en le sachant, et c'est exactement le message."],
            effets:{xp:22, flag:"offensee_message"}},
        }}},

    { id:"meurtre", delai:[12,24], attente:"Artois-Noir n'a pas encore bougé.",
      ev:{ id:"SO_2", titre:"Le meurtre attribué", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_chapelle",
        scenes:{
          start:{ texte:[
            "Un percepteur de la Couronne est retrouvé mort sur la route du Loup, à deux lieues de Karlsberg, avec une bourse intacte et une plaie qu'aucun brigand ne fait.",
            "Le lendemain, un placard sur la porte du prieuré accuse la maison Karlsberg — nommément, avec le mot *usurpateurs*.",
            "L'écriture est celle des trois feuillets."],
            choix:[
              {label:"Trouver le vrai coupable", detail:"Jet de Précision (14) · une plaie qu'aucun brigand ne fait",
               test:{stat:"precision", dc:14}, reussite:"vrai_ok", echec:"vrai_ko"},
              {label:"Aller le dire en face à Artois-Noir", detail:"Jet de Volonté (14)",
               test:{stat:"vol", dc:14}, reussite:"face_ok", echec:"face_ko"},
              {label:"Ne rien faire et laisser l'accusation vivre", detail:"Elle mourra ou pas",
               suite:"rien", effets:{reputation:{humains:-10}, suspicion:6}},
            ]},
          vrai_ok:{ fin:true, texte:[
            "La plaie est faite d'une lame à section triangulaire — une épée de duel, pas un couteau de route. Il n'y en a pas quarante dans la province.",
            "Il y en a une chez un duelliste de cour qui a passé l'hiver à Artois-Noir et qui est reparti pour Astrah le lendemain du meurtre.",
            "Le prévôt de la vallée écoute, note, et fait ce qu'un prévôt fait : il classe. Mais il classe *en nommant l'épée*, et un dossier qui nomme une épée peut se rouvrir."],
            effets:{xp:36, reputation:{humains:8}, flag:"offensee_epee"}},
          vrai_ko:{ fin:true, texte:["Un mort, une bourse intacte, et une vallée qui préfère croire un placard. On ne remonte pas une plaie sans un corps qu'on peut garder, et le prieuré a enterré vite."],
            effets:{xp:12, reputation:{humains:-6}}},
          face_ok:{ fin:true, texte:[
            "Dame Ermengarde d'Artois-Noir le reçoit, ce qui est déjà une surprise, et l'écoute jusqu'au bout, ce qui en est une autre.",
            "« Je n'ai pas fait tuer ce percepteur », dit-elle enfin. « Mon frère non plus : il n'a pas l'imagination. »",
            "Elle croise les mains. « J'ai fait écrire le placard. C'est tout ce que j'ai fait, et je le referais. »",
            "Un temps. « Vous avez vendu ce que ma maison vous avait payé pour retrouver. Il faudra vivre avec ce que ça produit. »"],
            effets:{xp:38, flag:"offensee_elle_admet"}},
          face_ko:{ fin:true, texte:[
            "On ne le reçoit pas. On le laisse deux jours à l'auberge du bourg et on lui fait dire, par un valet, que la maison n'a rien à discuter avec un homme qui n'a pas de titre.",
            "C'est la formule exacte qu'on emploie avant de porter des bannières."],
            effets:{xp:12, flag:"offensee_refus"}},
          rien:{ fin:true, texte:[
            "L'accusation vit. Elle vit très bien : au bout de six semaines, trois villages de la vallée ne vendent plus rien à Karlsberg et le prieuré a cessé d'enterrer les morts de la maison.",
            "Un placard ne tue personne. Il assèche."]},
        }}},

    { id:"bannieres", delai:[18,32], attente:"Artois-Noir compte ses hommes.",
      ev:{ id:"SO_3", titre:"Bannières aux frontières", famille:"GUERRE", rarete:"majeur",
        image:"evt_bannieres",
        scenes:{
          start:{ texte:[
            "Artois-Noir a levé trois cents hommes et les a mis en marche vers la vallée du Loup. Ce n'est pas assez pour prendre des murs et c'est assez pour brûler une récolte.",
            "Dame Ermengarde chevauche avec eux, ce qu'elle n'a pas fait depuis quatre ans."],
            choix:[
              {label:"Aller au-devant seul", detail:"Jet de Volonté (15) · elle est venue elle-même",
               test:{stat:"vol", dc:15}, reussite:"devant_ok", echec:"devant_ko"},
              {label:"Lui rendre ce qui a été gagné sur la couronne", detail:"−2800 or · rendre exactement le prix de la trahison",
               requis:{or:2800}, suite:"rend", effets:{or:-2800}},
              {label:"Les recevoir sous les murs", detail:"Trois cents hommes contre ce qu'on a",
               suite:"murs"},
            ]},
          devant_ok:{ fin:true, texte:[
            "Il sort à découvert, seul, à deux cents pas de trois cents hommes, et il attend qu'elle vienne.",
            "Elle vient, parce qu'elle est de cette espèce-là.",
            "« Vous m'avez coûté une province », dit-elle sans descendre de cheval.",
            "« Oui. »",
            "Le mot la prend de flanc — elle attendait une justification, elle reçoit un aveu. Elle reste très longtemps sans rien dire.",
            "« Alors dites-le devant mes capitaines. »",
            "Il le dit. Trois cents hommes entendent Yohan de Karlsberg reconnaître à voix haute qu'il a vendu ce qu'on lui avait payé pour retrouver.",
            "Ils font demi-tour à midi. Ce n'est pas un pardon : c'est un paiement."],
            effets:{xp:50, renom:-8, reputation:{humains:12, parias:-6},
                    issue:"reparation", flag:"offensee_aveu_public"}},
          devant_ko:{ texte:["Elle ne s'arrête pas. Elle passe à trente pas sans tourner la tête, et trois cents hommes passent derrière elle."],
            suite:"murs"},
          rend:{ fin:true, texte:[
            "Deux mille huit cents écus — exactement le prix de la trahison — portés au camp par un homme seul et posés devant la tente.",
            "Elle les compte. Elle compte deux fois, comme son frère.",
            "« Ce n'est pas la province », dit-elle.",
            "« Non. »",
            "« Mais c'est exact au sou près. » Elle referme le coffret. « Vous savez ce que vous m'avez pris et vous en connaissez le prix. C'est plus que ce que la plupart des gens savent d'eux-mêmes. »",
            "Elle lève le camp le lendemain."],
            effets:{xp:44, reputation:{humains:14}, issue:"reparation", flag:"offensee_rembourse"}},
          murs:{ texte:["Trois cents hommes devant la vallée du Loup, et ce qu'on a derrière les murs."],
            bataille:{ def:"BAT_KARLSBERG", victoire:"repousse", defaite:"brulee" }},
          repousse:{ fin:true, texte:[
            "Trois cents hommes ne prennent pas des murs relevés. Ils le savaient : ils venaient brûler.",
            "Ils brûlent deux fermes et une grange avant qu'on les repousse, et ils se retirent en bon ordre au troisième jour.",
            "Dame Ermengarde n'est pas prise et ne cherche pas à l'être. En repartant, elle fait planter une bannière d'Artois-Noir à la limite de la vallée, à l'endroit exact où commence la terre de Karlsberg.",
            "Elle y est encore. C'est une déclaration de guerre qui ne coûte rien et qui ne s'arrête jamais."],
            effets:{xp:55, renom:8, reputation:{humains:-8, parias:10},
                    issue:"guerre_ouverte", flag:"artois_banniere_plantee"}},
          brulee:{ fin:true, texte:[
            "Ils passent. Ils ne prennent pas les murs — ils ne sont pas venus pour ça — mais ils brûlent la récolte sur onze fermes et emmènent le bétail.",
            "Karlsberg tient debout et Karlsberg a faim tout l'hiver. Onze familles repartent avant le printemps.",
            "Dame Ermengarde n'a rien pris. Elle a seulement rendu l'endroit un peu moins vivable, et elle recommencera l'an prochain."],
            effets:{xp:35, renom:-6, reputation:{parias:-8},
                    issue:"guerre_ouverte", flag:"artois_recolte_brulee"}},
        }}},
  ]},

];
CHAINES_SECRETES_2.forEach(c => { CHAINES_SECRETES.push(c); CHAINES.push(c); });


/* ══════════════════════════════════════════════════════════════════════════
   Dernier lot : la route, le nain, les feux khesh, le portrait.
   ══════════════════════════════════════════════════════════════════════════ */
const CHAINES_SECRETES_3 = [

/* ══════════════════════════════════════════════════════════════════════════
   07 — LA ROUTE DU LOUP
   Sécuriser une route produit une histoire locale sur plusieurs années.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_ROUTE", type:'secret', titre:"La Route du Loup",
  declencheur:{ flags:["cg_route_fait"], apres:[8,18] },
  issues:{
    route_royale:"La route de la vallée du Loup est portée sur les cartes de la Couronne, et elle porte un nom.",
    route_tenue:"La route du Loup est tenue. Tout le monde sait par qui, et personne ne l'a écrit.",
    route_perdue:"La route du Loup est retombée à ceux qui la tenaient avant.",
  },
  etapes:[
    { id:"convois", delai:[3,8], attente:"Des charrettes passent où il n'en passait plus.",
      ev:{ id:"CRL_1", titre:"Les premiers convois", famille:"VOYAGE", rarete:"majeur",
        image:"evt_peage",
        scenes:{
          start:{ texte:[
            "Neuf charrettes la première semaine, quatorze la deuxième. Personne n'a rien annoncé : les marchands se sont simplement dit entre eux que la route passait de nouveau.",
            "Au troisième convoi, un meunier de la vallée et deux charretiers attendent Yohan sur le bas-côté, chapeau à la main, avec la question qu'on pose au propriétaire d'une chose.",
            "« La route est à vous, messire. Il faut nous dire ce qu'on doit, et à qui. »"],
            choix:[
              {label:"Fixer un péage modeste", detail:"Deux sous par essieu · une route entretenue coûte de l'argent",
               suite:"peage", effets:{or:180, reputation:{humains:-4}, flag:"route_peage"}},
              {label:"Ne rien demander", detail:"Une route franche attire plus de monde qu'une route sûre",
               suite:"franche", effets:{reputation:{humains:12}, renom:4, flag:"route_franche"}},
              {label:"Escorter le prochain convoi soi-même", detail:"Jet de Précision (13) · lire les hauteurs avant que quelqu'un les prenne",
               test:{stat:"precision", dc:13}, reussite:"escorte_ok", echec:"escorte_ko"},
              {label:"Leur dire qu'une route n'appartient à personne", detail:"C'est vrai, et ce n'est pas ce qu'ils demandent",
               suite:"personne"},
            ]},
          peage:{ fin:true, texte:[
            "Deux sous par essieu, une barrière de bois, un registre et un homme pour le tenir. Les charretiers grognent et paient, ce qui est la réaction normale et rassurante.",
            "En six semaines, la barrière rapporte de quoi payer l'homme, refaire deux gués et acheter du gravier.",
            "Un péage n'est pas populaire. Il est compris."],
            effets:{xp:24}},
          franche:{ fin:true, texte:[
            "« Rien. Passez. »",
            "Le meunier attend la suite, puis comprend qu'il n'y en a pas, et repart en secouant la tête comme devant un homme qui gâche quelque chose.",
            "Il se trompe. Au printemps, deux marchands de Chastel qui prenaient la route longue par le nord font le calcul et changent d'itinéraire, et ils ne sont pas les derniers."],
            effets:{xp:26}},
          escorte_ok:{ fin:true, texte:[
            "Quatre jours à cheval au pas d'une charrette, ce qui est la chose la plus ennuyeuse qu'un homme d'armes puisse faire, et la plus utile.",
            "Rien n'arrive. C'est exactement le résultat recherché : au retour, les charretiers racontent partout qu'ils ont fait la vallée du Loup sans même sortir une hachette.",
            "Une réputation de route sûre se fabrique convoi par convoi et se perd en une nuit."],
            effets:{xp:30, renom:6, fat:12, reputation:{humains:8}, flag:"route_escortee"}},
          escorte_ko:{ fin:true, texte:[
            "Au deuxième gué, une roue casse, et une roue cassée immobilise quatre jours un convoi qu'on croyait mener en quatre jours.",
            "Il pleut. On dort sous les bâches. On arrive avec une réputation d'homme sérieux et un dos qui s'en souviendra."],
            effets:{xp:12, fat:18}},
          personne:{ fin:true, texte:[
            "« Une route n'appartient à personne. »",
            "Le meunier hoche la tête poliment, remet son chapeau, et pose la vraie question : « Alors qui vient quand on nous prend nos bêtes ? »",
            "Il n'y a pas de réponse à ça qui ne soit pas un nom, et le nom, tout le monde ici l'a déjà en tête."],
            effets:{xp:14}},
        }}},

    { id:"brigands", delai:[8,16], attente:"Quelqu'un tenait cette route avant vous.",
      ev:{ id:"CRL_2", titre:"Le chef des brigands", famille:"GUERRE", rarete:"majeur",
        image:"evt_traque",
        scenes:{
          start:{ texte:[
            "Le message arrive par un gamin payé un quignon, et il est plus poli qu'attendu : *La route était mon métier avant d'être le vôtre. Parlons-en avant que ça se règle autrement.*",
            "Il s'appelle Ferrand le Boiteux. Sergent d'ordonnance jusqu'à la chute de Karlsberg, licencié sans solde avec deux cents autres, et depuis vingt ans il tient le défilé avec ce qui lui reste d'hommes.",
            "Ils sont trente-quatre. Onze ont plus de cinquante ans."],
            choix:[
              {label:"Aller le trouver seul", detail:"Jet de Volonté (14) · il a demandé à parler",
               test:{stat:"vol", dc:14}, reussite:"parle_ok", echec:"parle_ko"},
              {label:"Le prendre de vitesse", detail:"Trente-quatre hommes, et onze qui ne courent plus vite",
               suite:"assaut"},
              {label:"Lui acheter le défilé", detail:"−600 or · vingt ans de péage se rachètent",
               requis:{or:600}, suite:"achete", effets:{or:-600}},
              {label:"Ne rien répondre", detail:"Un homme qui demande à parler et qu'on ignore cesse de demander",
               suite:"silence"},
            ]},
          parle_ok:{ fin:true, texte:[
            "Ferrand reçoit dans une bergerie en ruine, assis, parce que se lever lui coûte.",
            "« On ne détroussait pas les paysans », dit-il d'entrée, avant même les salutations. « Les marchands de Chastel, oui. Les convois d'Astrah, tous. Les gens de la vallée, jamais. Vous pouvez demander. »",
            "C'est vrai. Yohan a déjà demandé.",
            "« Vous avez rouvert la route. Bien. Moi j'ai trente-quatre hommes qui savent où sont les sentiers et qui n'ont pas d'autre métier. Vous les pendez, ou vous les employez. »",
            "Il ne plaide pas. Il expose une arithmétique."],
            choix:[
              {label:"Les employer à tenir la route", detail:"Trente-quatre hommes, et personne qui les remplace",
               suite:"engage", effets:{renom:8, reputation:{humains:-6, parias:10},
                                       flags:["route_ferrand_engage","route_tenue_par_ferrand"]}},
              {label:"Lui offrir de partir vivant, lui et les siens", detail:"Vingt ans de défilé s'arrêtent aujourd'hui",
               suite:"partent", effets:{renom:4, reputation:{humains:8}, flag:"route_ferrand_parti"}},
              {label:"Le pendre lui et laisser filer les autres", detail:"Un chef pendu, trente-trois hommes libres et un serment de vengeance",
               suite:"pendu", effets:{renom:6, reputation:{humains:10, parias:-8}, flag:"route_ferrand_pendu"}},
            ]},
          parle_ko:{ texte:[
            "Il vient à la bergerie avec deux hommes. Yohan y trouve onze arbalètes en position haute et un vieux sergent qui n'a jamais eu l'intention de discuter debout.",
            "« Vous êtes venu seul », dit Ferrand, presque déçu. « Je pariais que non. J'ai perdu six sous. »"],
            suite:"assaut"},
          assaut:{ texte:["Le défilé est étroit, ils le connaissent, et ils y sont chez eux depuis vingt ans."],
            combat:{ groupe:[{bst:"BST_044", n:1}, {bst:"BST_042", n:2}, {bst:"BST_043", n:2}],
                     victoire:"pris", defaite:"repousse" }},
          pris:{ fin:true, texte:[
            "Ça dure moins longtemps que ce que méritent vingt ans de défilé.",
            "Ferrand tombe le troisième, la jambe la première, comme toujours. Il met encore un moment à mourir et il l'emploie à regarder ses hommes courir.",
            "Onze corps dans le défilé, dont quatre qui avaient l'âge d'être grands-pères. Le reste s'est dispersé vers le nord et n'a plus de chef, ce qui n'en fait pas des gens inoffensifs."],
            effets:{xp:46, renom:10, reputation:{humains:12, parias:-6},
                    flags:["route_ferrand_mort","route_bande_dispersee"]}},
          repousse:{ fin:true, texte:[
            "Ils lâchent les hauteurs quand il faut et reprennent le défilé dès qu'on redescend. C'est leur route : on ne la prend pas en une matinée.",
            "Ferrand fait porter les blessés jusqu'au premier hameau avant de se retirer, ce qui est une manière de dire qu'il n'est pas ce qu'on a voulu croire.",
            "Le lendemain, les convois recommencent à payer, et pas à Karlsberg."],
            effets:{xp:20, renom:-6, fat:16, flag:"route_ferrand_tient"}},
          achete:{ fin:true, texte:[
            "Six cents écus posés sur une pierre plate, comptés par un homme qui compte lentement parce qu'il a mal aux mains.",
            "« Vingt ans », dit Ferrand quand il a fini. « Ça fait deux sous par jour et par homme. C'est en dessous de la solde d'ordonnance. »",
            "Il empoche quand même. La bande descend vers le sud dans la semaine, et le défilé est vide pour la première fois depuis la chute de Karlsberg."],
            effets:{xp:34, reputation:{humains:6}, flag:"route_ferrand_parti"}},
          engage:{ fin:true, texte:[
            "Trente-quatre hommes qui connaissent chaque sentier passent du mauvais côté de la route au bon, ce qui, sur le terrain, change surtout à qui ils rendent des comptes.",
            "Deux marchands de Chastel reconnaissent leurs anciens détrousseurs en uniforme de Karlsberg et écrivent des lettres furieuses à qui veut les lire.",
            "Ferrand, lui, tient le défilé comme il l'a toujours tenu. La différence tient en une phrase qu'il répète à ses hommes : maintenant, on est payés."],
            effets:{xp:44}},
          partent:{ fin:true, texte:[
            "Ils partent en trois jours, sans rien brûler, en laissant la bergerie propre — un vieux réflexe d'ordonnance dont vingt ans de brigandage ne sont pas venus à bout.",
            "Ferrand s'arrête à la borne de la vallée, se retourne, et salue. Pas Yohan : la route."],
            effets:{xp:36}},
          pendu:{ fin:true, texte:[
            "On le pend au premier arbre du défilé, ce qui est l'usage, et on laisse partir les trente-trois autres, ce qui ne l'est pas.",
            "Ils partent. Ils regardent bien avant de partir.",
            "Un chef pendu devant sa bande fait deux choses en même temps : il rend la route sûre, et il fabrique trente-trois hommes qui savent où vous dormez."],
            effets:{xp:40}},
          silence:{ fin:true, texte:[
            "On ne répond pas. Le gamin revient une fois, puis plus.",
            "Trois semaines plus tard, un convoi de sel est vidé au défilé, proprement, sans un mort — et le charretier rapporte que le chef lui a fait dire une phrase, mot pour mot :",
            "« Dis-lui que j'avais demandé. »"],
            effets:{xp:14, reputation:{humains:-8}, flag:"route_ferrand_tient"}},
        }}},

    { id:"relais", delai:[20,40], attente:"La route vit sa vie. Elle finira par avoir un nom.",
      ev:{ id:"CRL_3", titre:"Le relais et le village neuf", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_pierres",
        scenes:{
          start:{ texte:[
            "Deux ans. À mi-chemin du défilé, quelqu'un a bâti un relais — une salle basse, une écurie, un puits — et autour du relais, sans que personne l'ait décidé, il y a maintenant onze feux, une forge et une femme qui vend du pain.",
            "Le village n'a pas de nom. Les charretiers l'appellent *le relais du Loup*, ce qui en tient lieu.",
            "Et ce printemps arrive ce qui arrive toujours quand un endroit se met à exister : un arpenteur de la Couronne, avec une chaîne, un carnet, et l'ordre de porter la route sur les cartes du royaume.",
            "Il a une question et une seule : au nom de qui."],
            choix:[
              {label:"Au nom de Karlsberg", detail:"La route prend le nom du Loup, et la carte le dit à tout le royaume",
               suite:"nom_karlsberg",
               effets:{issue:"route_royale", renom:16, suspicion:12, reputation:{humains:8, parias:12},
                       flags:["route_du_loup_nommee","karlsberg_route_ouverte"]}},
              {label:"Au nom du village", detail:"Une route ne doit rien à celui qui l'a rouverte",
               suite:"nom_village",
               effets:{issue:"route_royale", renom:6, suspicion:2, reputation:{humains:12},
                       flags:["route_du_loup_nommee"]}},
              {label:"Renvoyer l'arpenteur", detail:"Ce qui n'est pas sur une carte n'est pas imposé — ni protégé",
               suite:"renvoi",
               effets:{issue:"route_tenue", suspicion:-8, reputation:{humains:-10, parias:8}}},
              {label:"Laisser Ferrand recevoir l'arpenteur", detail:"Il tient le défilé · un ancien sergent d'ordonnance sait parler à un homme à chaîne",
               requis:{flag:"route_ferrand_engage"}, suite:"ferrand_recoit",
               effets:{issue:"route_tenue", renom:6, suspicion:-6, reputation:{humains:6}}},
            ]},
          nom_karlsberg:{ fin:true, texte:[
            "L'arpenteur écrit *route de Karlsberg, dite du Loup* et fait répéter l'orthographe deux fois, parce qu'un carnet d'arpenteur devient une carte et qu'une carte dure plus longtemps qu'un règne.",
            "Six mois plus tard, la route figure au registre des voies royales de la province. Elle est entretenue aux frais de la Couronne, protégée par le droit de haute route, et lisible par quiconque en ouvre une.",
            "Ce même document dit à Astrah, à Fort-aux-Princes et à qui sait lire qu'un nom qu'on croyait rayé tient une voie royale.",
            "On ne remet pas un nom sur une carte à moitié."]},
          nom_village:{ fin:true, texte:[
            "« Le relais du Loup », dit Yohan. « Le village s'appelle comme ça. Écrivez ce que les gens disent. »",
            "L'arpenteur, qui s'attendait à un nom de maison et à une gratification, met un moment à comprendre qu'on lui demande simplement la vérité d'usage.",
            "La route entre au registre royal sous le nom d'un village de onze feux. La femme qui vend du pain devient, sans le savoir, la première habitante nommée d'un lieu qui figure sur les cartes du royaume."]},
          renvoi:{ fin:true, texte:[
            "On le renvoie poliment, avec un repas et un cheval reposé, et rien pour son carnet.",
            "La route reste ce qu'elle est : un chemin que tout le monde emprunte et qui n'existe pas. Ni impôt, ni corvée, ni garnison royale, ni recours si quelqu'un vient la prendre.",
            "Les charretiers, eux, préfèrent ça. Ils l'ont dit franchement : une route sur une carte finit toujours par coûter plus cher qu'un péage."]},
          ferrand_recoit:{ fin:true, texte:[
            "Ferrand reçoit l'arpenteur au relais, l'assied près du feu, lui sert le vin de la maison et lui parle deux heures — d'ordonnance, de soldes en retard, de sergents licenciés, et de la difficulté qu'il y a à cartographier un défilé de montagne à la chaîne.",
            "L'arpenteur repart au matin, ravi, avec une carte approximative, deux fromages, et l'impression très nette d'avoir fait son travail.",
            "La route figure désormais quelque part dans un carton de province, mal tracée, sans propriétaire, entre deux vallées mal orthographiées. C'est exactement ce qu'on voulait.",
            "« Vingt ans à éviter les gens à chaîne », dit Ferrand en refermant la porte. « On finit par savoir. »"]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   08 — LE VIEUX NAIN
   Un service mineur rendu à un Nain peut changer une bataille beaucoup plus tard.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_NAIN", type:'secret', titre:"Le Vieux Nain",
  declencheur:{ flags:["gorm_ami"], apres:[10,22] },
  issues:{
    boucliers:"Kar-Durak a envoyé ses boucliers au défilé, et ils sont arrivés à temps.",
    dette_soldee:"La dette naine a été soldée en pierre et en fer, ce qui est la manière naine de solder.",
    dette_perdue:"Ce que Kar-Durak devait s'est perdu quelque part entre deux galeries.",
  },
  etapes:[
    { id:"chope", delai:[3,7], attente:"Une salle basse, trois charretiers, et un vieux qui ne dit rien.",
      ev:{ id:"CVN_1", titre:"La chope cassée", famille:"NAIN", rarete:"majeur",
        image:"evt_taverne",
        scenes:{
          start:{ texte:[
            "Le vieux nain boit seul au bout du banc, comme les nains boivent au jour : vite, sans lever les yeux, pour repartir.",
            "Un charretier trouve drôle de lui prendre sa chope. Un deuxième trouve plus drôle de la faire passer au-dessus de sa tête. Le troisième la laisse tomber, et l'étain se fend sur l'angle du foyer.",
            "Le vieux ne bouge pas. Il regarde le sol un long moment, puis ramasse les deux morceaux et les met dans sa besace.",
            "Sur le plus grand, avant la cassure, on lit quatre noms gravés et une date."],
            choix:[
              {label:"Faire payer les charretiers", detail:"Jet de Volonté (13)",
               test:{stat:"vol", dc:13}, reussite:"paie_ok", echec:"paie_ko"},
              {label:"Faire refondre la chope à Kar-Durak", detail:"−220 or · une chope naine ne se répare pas chez un étameur humain",
               requis:{or:220}, suite:"refonte", effets:{or:-220}},
              {label:"S'asseoir et lui offrir la sienne", detail:"Une chope pour une chope, sans un mot sur ce qui vient de se passer",
               suite:"assoit"},
              {label:"Ne pas s'en mêler", detail:"Ce n'est ni votre salle ni votre affaire",
               suite:"rien"},
            ]},
          paie_ok:{ fin:true, texte:[
            "Ils paient. Ils paient mal, en grommelant, en cherchant des yeux qui dans la salle trouve ça exagéré — et personne ne trouve, ce qui règle la question.",
            "Le vieux prend les pièces, les compte, en garde trois et repousse le reste.",
            "« Trois sous, c'est l'étain », dit-il. « Le reste n'est pas à vendre et vous ne pouviez pas le savoir. »",
            "Il s'appelle Dorin fils de Torbek. Il donne son nom parce que chez les nains, quand quelqu'un intervient, on lui doit au moins un nom."],
            effets:{xp:26, reputation:{nains:12}, flag:"nain_dorin_nomme"}},
          paie_ko:{ fin:true, texte:[
            "Le plus grand des trois éclate de rire, et un rire dans une salle pleine décide plus de choses qu'un argument.",
            "Le vieux se lève avant que ça dégénère, salue Yohan d'un signe de tête très bref — la reconnaissance d'un homme qui a essayé — et sort dans le froid avec sa besace.",
            "Il s'appelle Dorin fils de Torbek. Yohan ne l'apprendra que plus tard, et pas de sa bouche."],
            effets:{xp:12, reputation:{nains:4}, flag:"nain_dorin_nomme"}},
          refonte:{ fin:true, texte:[
            "Deux cent vingt écus pour faire descendre deux morceaux d'étain à Kar-Durak, les faire refondre par une main naine et les faire regraver aux mêmes noms, à la même profondeur.",
            "Le vieux nain regarde le prix, puis la chope, puis Yohan, et l'ordre dans lequel il regarde est important.",
            "« Vous avez payé un mois de solde pour de l'étain », dit-il enfin. « Un humain qui fait ça sait ce qu'il y a sur le métal. »",
            "Les quatre noms sont ceux de ses frères. La date est celle où la troisième galerie s'est effondrée sur eux.",
            "Il s'appelle Dorin fils de Torbek, et il note cette date-ci à côté de l'autre."],
            effets:{xp:38, reputation:{nains:24}, flags:["nain_dorin_nomme","nain_chope_refondue"]}},
          assoit:{ fin:true, texte:[
            "Yohan pose sa propre chope devant lui, s'assied, et ne dit rien de la scène — ni excuse, ni commentaire, ni cette pitié bruyante que les humains croient réconfortante.",
            "Le vieux met un moment. Puis il boit, et reste.",
            "Ils passent une heure à ne parler que de choses sans importance : le prix du fer, la pluie, l'incompétence des charretiers en général.",
            "En partant, il dit son nom. Dorin fils de Torbek. C'est tout ce qu'il donne, et chez les nains ce n'est pas rien."],
            effets:{xp:30, reputation:{nains:16}, flag:"nain_dorin_nomme"}},
          rien:{ fin:true, texte:[
            "Ce n'est pas la salle de Yohan et ce n'est pas son affaire. Le vieux ramasse ses deux morceaux et sort, et la salle a déjà oublié.",
            "Il s'arrête pourtant à la porte, une seconde, et regarde la table où personne ne s'est levé. Un nain enregistre ce genre de tables."],
            effets:{xp:8, reputation:{nains:-6}, flag:"nain_personne_ne_bouge"}},
        }}},

    { id:"dette", delai:[14,26], attente:"Les nains mettent longtemps à revenir. Ils reviennent.",
      ev:{ id:"CVN_2", titre:"Une dette naine", famille:"NAIN", rarete:"majeur",
        image:"evt_galerie", pnj:"gorm",
        scenes:{
          start:{ pnj:"gorm", texte:[
            "Dorin fils de Torbek remonte au jour pour la deuxième fois de l'année, ce qui pour lui relève de l'expédition, et il ne vient pas seul : Gorm fils de Gorik marche derrière lui, en retrait, ce qui dit tout de qui est le plus ancien des deux.",
            "« Il tient les registres de dette de la Halle », explique Gorm. « Depuis quarante ans. Il tient le mien aussi. »",
            "Dorin ouvre un livre à couverture de cuir noir, et lit une ligne à voix haute, avec la date, le lieu, et ce qui a été fait.",
            "« C'est inscrit. Une dette inscrite se solde, sinon elle se transmet, et je ne laisserai pas ça à mon fils. Dites ce qu'il vous faut. »"],
            choix:[
              {label:"De la pierre taillée pour Karlsberg", detail:"Des blocs d'appareil, descendus par la route · ce qu'un chantier ne peut pas acheter",
               suite:"pierre", effets:{xp:34, flags:["nain_pierre_taillee","karlsberg_pierre_naine"]}},
              {label:"Du fer et des armes", detail:"Quarante haches de Kar-Durak · le fer nain se reconnaît de loin",
               suite:"fer", effets:{xp:34, flags:["nain_quarante_haches"]}},
              {label:"Un maître d'œuvre", detail:"Un nain qui sait bâtir une muraille qui tienne · ils vivent assez longtemps pour la voir vieillir",
               suite:"maitre", effets:{xp:36, flags:["nain_maitre_oeuvre","karlsberg_architecte"]}},
              {label:"Rien. Que la ligne reste ouverte", detail:"Une dette naine non soldée est un lien qui dure",
               suite:"ouverte", effets:{xp:30, flag:"nain_dette_ouverte"}},
            ]},
          pierre:{ fin:true, texte:[
            "Onze charrois de blocs d'appareil sur deux saisons, taillés en bas, remontés par la route, posés en haut.",
            "Ce n'est pas de la pierre de carrière humaine : les faces sont sciées, les joints se ferment sans mortier, et un mur monté avec ça ne se prend pas au bélier.",
            "Dorin barre une demi-ligne dans son registre. Une demi-ligne seulement.",
            "« La pierre, c'est du matériau », dit-il. « Le reste se paie autrement. »"],
            effets:{issue:"dette_soldee", renom:6, reputation:{nains:10}}},
          fer:{ fin:true, texte:[
            "Quarante haches d'armes descendues d'un chariot bâché, poinçonnées à la marque de la troisième forge, avec les manches et les fourreaux de cuir bouilli.",
            "Le fer nain a une couleur qu'on ne confond pas. Un homme qui porte ça dans une vallée humaine se fait remarquer avant d'ouvrir la bouche.",
            "« C'est du fer d'en bas », prévient Dorin. « Il dit d'où il vient. Réfléchissez à qui vous les mettez dans les mains. »"],
            effets:{issue:"dette_soldee", renom:8, suspicion:6, reputation:{nains:10}}},
          maitre:{ fin:true, texte:[
            "Il s'appelle Brann, il a cent onze ans, il parle six mots par jour et il passe la première semaine à ne rien faire d'autre que marcher sur les ruines en tapant les murs du plat de la main.",
            "Au huitième jour, il annonce que l'enceinte nord a été bâtie sur du remblai par des gens pressés, qu'elle est tombée deux fois pour cette raison, et qu'elle retombera une troisième.",
            "Il a raison. Les archives le confirment.",
            "Il reste trois ans. Karlsberg n'aura plus jamais de mur qui tombe tout seul."],
            effets:{issue:"dette_soldee", renom:10, reputation:{nains:14}}},
          ouverte:{ fin:true, pnj:"gorm", texte:[
            "« Rien. »",
            "Dorin referme le registre sans écrire, ce qui pour lui est un effort visible.",
            "« Vous savez ce que vous faites ? Une ligne ouverte, ça ne dort pas. Ça se réveille au pire moment, et c'est nous qui choisissons le moment. »",
            "Gorm, derrière, ne dit rien du tout. Mais il sourit, ce qui chez lui est un événement documentable."],
            effets:{reputation:{nains:20}}},
        }}},

    { id:"boucliers", delai:[24,44], attente:"Le pire moment, ils l'ont dit, c'est eux qui le choisissent.",
      ev:{ id:"CVN_3", titre:"Les boucliers au défilé", famille:"NAIN", rarete:"majeur",
        image:"evt_bannieres", pnj:"gorm",
        scenes:{
          start:{ texte:[
            "La harde descend du nord en trois colonnes, et elle ne va pas contourner la vallée : elle va la traverser, parce que c'est le chemin le plus court vers les greniers.",
            "Il y a le défilé, et ce qu'on peut y mettre. Le compte est mauvais et tout le monde le sait, y compris les gens qui chargent des charrettes dans les hameaux d'en dessous.",
            "C'est à ce moment-là qu'on entend des tambours qui viennent d'en bas."],
            choix:[
              {label:"Tenir le défilé", detail:"Ce qu'on a, à l'endroit le plus étroit",
               suite:"tenir"},
              {label:"Envoyer un cavalier à Kar-Durak", detail:"Jet de Volonté (13) · une ligne ouverte, et le moment est arrivé",
               requis:{flag:"nain_dette_ouverte"},
               test:{stat:"vol", dc:13}, reussite:"appel_ok", echec:"appel_ko"},
              {label:"Évacuer la vallée et laisser passer", detail:"On sauve les gens, on perd les greniers, on garde l'hiver à passer",
               suite:"evacue",
               effets:{issue:"dette_perdue", reputation:{humains:-6, parias:6}, renom:-6}},
            ]},
          appel_ok:{ texte:[
            "Le cavalier part au soir et revient au surlendemain, à pied, son cheval crevé sous lui, avec quatre mots : *ils montent. Tenez trois jours.*",
            "On tient trois jours."],
            suite:"tenir"},
          appel_ko:{ texte:[
            "Le cavalier part au soir. Personne ne le revoit — ni lui, ni le cheval, ni de réponse.",
            "Il faudra tenir le défilé avec ce qu'on a."],
            suite:"tenir"},
          tenir:{ texte:["Le défilé, la harde, et ce qu'on a pu mettre entre les deux."],
            bataille:{ def:"BAT_DEFILE", victoire:"tenue", defaite:"forcee" }},
          tenue:{ pnj:"gorm", texte:[
            "Au matin du troisième jour, la ligne plie au centre et ne rompt pas, et personne dans le défilé ne saurait dire pourquoi.",
            "La raison monte par le sentier de la mine : deux cents boucliers de Kar-Durak en file, au pas, sans un cri, avec Gorm fils de Gorik en tête et le vieux Dorin quelque part au milieu, portant un bouclier trop lourd pour son âge parce qu'il n'était pas question qu'il reste en bas.",
            "Des boucliers nains dans un défilé, ça ne charge pas. Ça se pose, et plus rien ne passe.",
            "La harde s'écrase dessus deux fois, puis renonce et remonte vers le nord en laissant ses morts."],
            choix:[
              {label:"Remercier Gorm devant les deux troupes", detail:"Ce qui se dit devant témoins reste dit",
               suite:"merci", effets:{renom:14, reputation:{nains:16, humains:8}, suspicion:6}},
              {label:"Aller trouver Dorin", detail:"Il est venu avec un bouclier trop lourd pour lui",
               suite:"dorin", effets:{renom:6, reputation:{nains:22}}},
            ]},
          merci:{ fin:true, pnj:"gorm", texte:[
            "Gorm écoute jusqu'au bout, ce qui lui coûte, puis répond assez fort pour la ligne entière :",
            "« Nous ne sommes pas venus pour vous. Une dette de la Halle était ouverte. Elle est fermée. »",
            "Puis, plus bas, pour Yohan seul : « Et si elle avait été fermée, nous serions venus quand même. Mais ne le répétez pas : j'ai des registres à tenir. »"],
            effets:{xp:60, issue:"boucliers", flags:["nain_boucliers_venus","kardurak_dette_soldee"]}},
          dorin:{ fin:true, texte:[
            "On le trouve assis contre la paroi, le bouclier posé à plat sur les genoux, en train de reprendre son souffle avec l'application d'un très vieil homme qui sait exactement combien il lui en reste.",
            "Il sort de sa besace une chope d'étain, la remplit, et la tend.",
            "Les quatre noms sont dessus. Il y en a cinq maintenant : le sien a été ajouté en dessous, ce que les nains font quand ils décident d'avance auprès de qui ils veulent être comptés.",
            "« Buvez », dit-il. « Après on redescend. »"],
            effets:{xp:64, issue:"boucliers", flags:["nain_boucliers_venus","nain_chope_partagee"]}},
          forcee:{ fin:true, pnj:"gorm", texte:[
            "Le défilé est forcé au deuxième jour. On se replie en bon ordre, ce qui est la formule polie pour dire qu'on court en gardant la tête.",
            "La harde passe, prend les greniers de trois hameaux et poursuit vers le sud sans s'attarder.",
            "Les boucliers de Kar-Durak arrivent le lendemain à midi. Ils remontent le défilé, comptent les morts, et Gorm reste très longtemps devant la ligne où ça a lâché.",
            "« Un jour », dit-il enfin. « Nous avions un jour de retard. » Il ne dit rien d'autre, et il n'y a rien à dire d'autre."],
            effets:{xp:36, issue:"dette_perdue", renom:-8, reputation:{nains:8},
                    flag:"nain_un_jour_de_retard"}},
          evacue:{ fin:true, texte:[
            "On vide la vallée en deux jours et demi : les gens, les bêtes, les semences, et rien d'autre.",
            "La harde traverse, trouve des greniers pleins et des maisons vides, et se sert. Elle ne s'attarde pas : il n'y a personne à tuer.",
            "Onze hameaux passeront l'hiver sur la charité et la chasse. Aucun n'aura de mort à enterrer.",
            "Les deux comptes sont vrais en même temps, et il faudra vivre avec les deux."]},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   09 — DOUZE FEUX
   La réunification khesh progresse en arrière-plan.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_FEUX", type:'secret', titre:"Douze Feux",
  declencheur:{ flags:["khesh_six_bannieres"], apres:[10,22] },
  issues:{
    douze_feux:"Les douze tribus khesh brûlent le même feu. Khal-Vaene est khan des Dunes.",
    six_feux:"Khal-Vaene tient six bannières, et il n'en aura pas une de plus.",
    feux_eteints:"L'unification khesh s'est brisée au Conseil des Lances.",
  },
  etapes:[
    { id:"deux_tribus", delai:[4,10], attente:"Aux puits, deux tribus se regardent.",
      ev:{ id:"CDF_1", titre:"Deux tribus, un puits", famille:"KHESH", rarete:"majeur",
        image:"evt_tambours",
        scenes:{
          start:{ pnj:"khalvaene", texte:[
            "Les puits de Sar-Ekhen donnent pour deux cents bêtes. Il y en a onze cents, appartenant à deux tribus qui se sont mariées entre elles pendant six générations et qui se sont entretuées pendant les quatre dernières.",
            "Khal-Vaene veut les faire parler. Le problème est simple et n'a pas de solution khesh : celui qui tient le puits pendant qu'on parle prend un parti, et il n'existe pas de khesh qui ne soit d'aucune tribu.",
            "D'où l'étranger.",
            "« Tiens l'eau », dit l'émissaire. « Personne ne boit tant qu'ils parlent. Personne ne meurt de soif non plus. C'est tout ce qu'on te demande. »"],
            choix:[
              {label:"Tenir le puits", detail:"Jet d'Agilité (14) · deux jours et deux nuits à contenir onze cents bêtes assoiffées",
               test:{stat:"agi", dc:14}, reussite:"puits_ok", echec:"puits_ko"},
              {label:"Faire parler les femmes des deux tribus", detail:"Jet de Volonté (14) · elles sont sœurs, filles et mères des deux côtés",
               test:{stat:"vol", dc:14}, reussite:"femmes_ok", echec:"femmes_ko"},
              {label:"Rationner l'eau tribu par tribu, à la mesure", detail:"Jet de Précision (13) · une balance est une chose que tout le monde peut vérifier",
               test:{stat:"precision", dc:13}, reussite:"mesure_ok", echec:"mesure_ko"},
              {label:"Refuser : ce n'est pas la guerre d'un étranger", detail:"Six bannières resteront six bannières",
               suite:"refus", effets:{issue:"six_feux", reputation:{khesh:-12}}},
            ]},
          puits_ok:{ fin:true, texte:[
            "Deux jours et deux nuits assis sur la margelle, avec de l'eau derrière soi et onze cents bêtes qui hurlent devant.",
            "Trois fois, des jeunes des deux tribus s'approchent pour essayer. Trois fois, ils repartent — pas parce qu'ils ont peur, mais parce qu'ils ont compris ce qu'ils casseraient.",
            "Au deuxième soir, les chefs sortent de la tente. Ils ont un accord de pâture qui tiendra deux ans, ce qui aux Dunes est une éternité.",
            "En repartant, l'un des deux crache dans le sable devant Yohan, ce qui, on l'apprendra plus tard, est la façon dont sa tribu remercie."],
            effets:{xp:40, fat:20, reputation:{khesh:18}, flag:"feux_puits_tenu"}},
          puits_ko:{ fin:true, texte:[
            "Au premier soir, quatre bêtes crèvent de soif à trente pas de l'eau, et le bruit qu'elles font décide de la suite.",
            "La ruée dure une heure. Deux morts, une margelle effondrée, un puits à demi comblé.",
            "Les chefs sortent de la tente pour trouver l'eau perdue et leurs deux tribus mélangées dans la boue. Ils ne se sont pas battus. Ils n'ont rien conclu non plus."],
            effets:{xp:14, fat:22, reputation:{khesh:-6}}},
          femmes_ok:{ fin:true, texte:[
            "Les deux tribus se sont mariées entre elles pendant six générations. Cela veut dire que chaque femme du camp du nord a une sœur, une fille ou une mère au camp du sud.",
            "Personne ne leur a jamais demandé de compter. Yohan le demande, à voix haute, devant les deux chefs : combien de morts, ces quatre ans, ont été pleurés des deux côtés à la fois ?",
            "La réponse met une nuit à se faire, et elle est terrible : quarante et un.",
            "Les chefs ne peuvent plus dire qu'ils se battent contre des étrangers. C'est tout ce qu'il fallait leur enlever."],
            effets:{xp:44, reputation:{khesh:22}, flags:["feux_les_femmes_ont_compte","feux_accord_sar_ekhen"]}},
          femmes_ko:{ fin:true, pnj:"khalvaene", texte:[
            "Un étranger qui demande aux femmes de parler devant les chefs commet, en une phrase, deux fautes d'usage dont personne ne lui avait signalé l'existence.",
            "On ne le tue pas, parce qu'il est l'invité de Khal-Vaene. On l'écarte du cercle, ce qui revient à le rendre inutile.",
            "Les tribus concluent quand même — un accord de six mois, mauvais, que les deux comptent bien rompre."],
            effets:{xp:16, reputation:{khesh:-8}}},
          mesure_ok:{ fin:true, texte:[
            "Une outre étalon, une balance de marchand, un registre, et la même mesure pour tout le monde, comptée à voix haute devant les deux camps.",
            "C'est laid, c'est lent, ça sent le commerce, et aucun des deux chefs n'aime ça.",
            "Mais chaque berger des deux tribus peut vérifier lui-même qu'il reçoit exactement ce que reçoit son voisin, et un homme qui peut vérifier ne prend pas les armes.",
            "Les bêtes boivent. Les chefs parlent. Personne ne meurt."],
            effets:{xp:38, reputation:{khesh:14}, flag:"feux_mesure_etalon"}},
          mesure_ko:{ fin:true, texte:[
            "La balance est bonne, le registre est juste, et la troisième mesure part de travers parce qu'une outre étalon dans le sable ne reste pas étalon longtemps.",
            "Il suffit d'un doigt d'écart annoncé à voix haute pour que trois cents hommes soient certains d'avoir été volés.",
            "On sauve le puits. On ne sauve pas la confiance."],
            effets:{xp:16, fat:14, reputation:{khesh:-4}}},
          refus:{ fin:true, pnj:"khalvaene", texte:[
            "« Ce n'est pas ma guerre. »",
            "L'émissaire hoche la tête, remonte à cheval et repart sans discuter, ce qui est pire qu'une discussion.",
            "Les tribus de Sar-Ekhen ne concluent rien. Six semaines plus tard, elles se battent pour de bon, et les deux se rangent contre Khal-Vaene, parce qu'un homme qui n'a pas su faire boire onze cents bêtes ne fera pas boire douze tribus."]},
        }}},

    { id:"conseil", delai:[12,22], attente:"Le Conseil des Lances se réunit une fois par génération.",
      ev:{ id:"CDF_2", titre:"Le Conseil des Lances", famille:"KHESH", rarete:"majeur",
        image:"evt_lances", pnj:"khalvaene",
        scenes:{
          start:{ pnj:"khalvaene", texte:[
            "Onze chefs, un cercle de lances plantées, et au centre un feu qu'on ne rallume qu'une fois par génération.",
            "Khal-Vaene ne parle pas le premier, ce qui surprend tout le monde. Il attend, et il compte les silences.",
            "Ce qu'il attend est assis au troisième rang : un homme d'Astrah, en tenue de marchand de chevaux, qui n'a rien à faire dans un conseil khesh et que trois chefs sur onze ont déjà rencontré.",
            "Il apporte de l'argent impérial à qui refusera la bannière. Astrah préfère de loin douze tribus qui se battent à un khan qui compte."],
            choix:[
              {label:"Le dénoncer devant le cercle", detail:"Jet de Précision (15) · il faut des preuves, pas une accusation",
               test:{stat:"precision", dc:15}, reussite:"denonce_ok", echec:"denonce_ko"},
              {label:"Le payer plus cher qu'Astrah", detail:"−1400 or · un homme qui se vend une fois se vend deux",
               requis:{or:1400}, suite:"achete", effets:{or:-1400}},
              {label:"Parler pour Khal-Vaene devant les onze", detail:"Jet de Volonté (15) · un étranger qui parle dans un conseil khesh se fait remarquer très loin",
               test:{stat:"vol", dc:15}, reussite:"parle_ok", echec:"parle_ko"},
              {label:"Ne rien dire et regarder", detail:"Ce conseil n'a pas besoin d'un étranger de plus",
               suite:"muet"},
            ]},
          denonce_ok:{ fin:true, pnj:"khalvaene", texte:[
            "On ne dénonce pas un homme dans un conseil khesh : on montre. Yohan montre les fers de sa monture — frappés à la marque impériale d'un relais militaire, pas d'un marchand de chevaux — et laisse les onze chefs se pencher eux-mêmes.",
            "Le cercle met un long moment à se taire. Puis un des chefs du sud dit une phrase courte, et deux hommes emmènent l'Astrah derrière les tentes.",
            "On n'entend rien. Khal-Vaene ne se retourne pas.",
            "« Trois de mes chefs l'avaient reçu », dit-il plus tard. « Maintenant ils doivent choisir devant témoins entre lui et moi. Il ne pouvait pas me rendre un plus grand service. »"],
            effets:{xp:46, reputation:{khesh:20, humains:-8}, suspicion:6,
                    flags:["feux_astrah_demasque","khesh_astrah_denonce"]}},
          denonce_ko:{ fin:true, texte:[
            "L'accusation est juste et elle arrive nue. Un étranger qui accuse sans montrer, dans un cercle de lances, ne fait qu'une chose : il donne à l'accusé l'occasion de paraître calme.",
            "L'homme d'Astrah est très calme. Il s'excuse même d'avoir troublé le conseil, et repart le lendemain avec deux chefs qui l'accompagnent poliment jusqu'aux dunes.",
            "Deux bannières de moins."],
            effets:{xp:16, reputation:{khesh:-6}, flag:"feux_deux_bannieres_perdues"}},
          achete:{ fin:true, texte:[
            "Quatorze cents écus, dans une tente, sans témoin. Il accepte avant même d'avoir fini de compter, ce qui veut dire qu'Astrah le payait mal ou qu'Astrah lui faisait peur.",
            "Il repart le surlendemain vers l'ouest avec ses chevaux et son argent, et il fait porter à ses trois contacts la même lettre : *l'Empire retire son offre.*",
            "Ce n'est pas vrai. Cela le sera dans quatre mois, quand Astrah découvrira que son homme a disparu — et quatre mois, au Conseil des Lances, c'est tout ce qui manquait."],
            effets:{xp:40, reputation:{khesh:12}, flag:"feux_astrah_achete"}},
          parle_ok:{ fin:true, pnj:"khalvaene", texte:[
            "Un étranger ne parle pas dans le cercle. Yohan y va quand même, et il fait la seule chose qu'un étranger puisse y faire utilement : il ne parle pas de Khal-Vaene.",
            "Il parle des puits. De ce qui arrive à un peuple dont chaque tribu doit garder son eau contre onze autres. De ce que coûte, en hommes et en bêtes, un conseil qui ne conclut rien — chiffres à l'appui, tribu par tribu, parce qu'il a passé la semaine à les compter.",
            "Le cercle écoute un homme dire tout haut ce que tout le monde savait tout bas.",
            "Six bannières deviennent neuf avant la fin de la nuit. Et quelque part dans l'Empire, un rapport commence par : *un étranger a parlé au Conseil des Lances, et les tribus l'ont écouté.*"],
            effets:{xp:50, renom:12, suspicion:14, reputation:{khesh:24, humains:-6},
                    flags:["feux_neuf_bannieres","feux_yohan_a_parle"]}},
          parle_ko:{ fin:true, pnj:"khalvaene", texte:[
            "Un étranger ne parle pas dans le cercle. On le laisse aller au bout — par égard pour Khal-Vaene — et le silence qui suit est d'une politesse insupportable.",
            "« Vous avez bien parlé », lui dit un vieux chef après, sincèrement. « Mais vous avez parlé. »",
            "Khal-Vaene, lui, ne dit rien du tout, et ce sera l'unique fois."],
            effets:{xp:18, reputation:{khesh:-6}}},
          muet:{ fin:true, pnj:"khalvaene", texte:[
            "Yohan reste assis et se tait pendant deux jours et une nuit, ce qui est plus difficile que ça n'en a l'air.",
            "Khal-Vaene s'en sort seul : il achète deux bannières avec des pâtures, en gagne une à la loyale et en perd une pour l'avoir trop poussée.",
            "Six bannières restent six bannières. L'homme d'Astrah repart content, et il reviendra."],
            effets:{xp:20, flag:"feux_astrah_reviendra"}},
        }}},

    { id:"douze", delai:[26,48], attente:"Aux Dunes, un feu de plus s'allume ou s'éteint.",
      ev:{ id:"CDF_3", titre:"Les Douze Feux", famille:"KHESH", rarete:"majeur",
        image:"evt_tambours", pnj:"khalvaene",
        scenes:{
          start:{ pnj:"khalvaene", texte:[
            "Onze feux brûlent en cercle dans la plaine de sel. Le douzième emplacement est préparé, le bois est empilé, et il n'est pas allumé.",
            "La dernière tribu est celle des Sekh-Karad, et son chef, Uruk-Sekh, ne refuse pas la bannière. Il en demande le prix ancien : que celui qui prétend au titre de khan tienne debout contre son champion, seul, au centre du cercle, jusqu'à ce que l'un des deux tombe.",
            "Khal-Vaene a cinquante-quatre ans et une épaule qui ne se lève plus complètement. Il a dit oui devant tout le monde, parce qu'il ne pouvait pas dire autre chose.",
            "La nuit avant, il vient s'asseoir près du feu de Yohan et ne demande rien. Il vient s'asseoir, c'est tout."],
            choix:[
              {label:"Descendre dans le cercle à sa place", detail:"Un étranger qui se bat pour un khan · le titre sera à lui, et la dette aussi",
               suite:"duel"},
              {label:"Lui conseiller de céder le titre à un plus jeune", detail:"Jet de Volonté (15) · douze tribus valent mieux qu'un nom sur une bannière",
               test:{stat:"vol", dc:15}, reussite:"cede_ok", echec:"cede_ko"},
              {label:"Trouver ce qu'Uruk-Sekh veut vraiment", detail:"Jet de Précision (14) · personne ne demande un duel qu'il peut perdre",
               test:{stat:"precision", dc:14}, reussite:"veut_ok", echec:"veut_ko"},
              {label:"Le laisser descendre seul dans le cercle", detail:"C'est son titre, son peuple et son épaule",
               suite:"seul"},
            ]},
          duel:{ texte:[
            "Un étranger dans le cercle de sel : le camp entier se lève d'un coup, et Uruk-Sekh met une longue minute à accepter — non pas parce que c'est interdit, mais parce que c'est ancien, et que ce qui est ancien est permis.",
            "Le champion des Sekh-Karad a vingt-six ans, deux lances courtes, et il n'a jamais perdu devant témoins."],
            combat:{ groupe:[{bst:"BST_056", n:1}, {bst:"BST_057", n:2}],
                     victoire:"duel_ok", defaite:"duel_ko" }},
          duel_ok:{ fin:true, pnj:"khalvaene", texte:[
            "Ça finit dans le sel, au troisième assaut, et le champion des Sekh-Karad reste vivant parce que Yohan choisit de le laisser vivant devant douze tribus.",
            "Uruk-Sekh allume le douzième feu de sa propre main, et le cercle est fermé pour la première fois depuis quatre-vingts ans.",
            "Puis il fait ce que personne n'attendait : il se tourne vers Yohan et demande son nom devant tout le monde.",
            "Khal-Vaene répond à sa place, et ce qu'il dit sera répété jusqu'à Astrah : « C'est un homme du Nord. Il s'est battu pour nous et il n'a rien demandé. Aux Dunes, cela suffit à faire un nom. »"],
            effets:{xp:70, renom:18, suspicion:16, reputation:{khesh:30},
                    issue:"douze_feux", flags:["khesh_douze_feux","khalvaene_khan","feux_yohan_champion"]}},
          duel_ko:{ fin:true, pnj:"khalvaene", texte:[
            "Le sel colle au sang et rend tout plus lent. Yohan tient jusqu'au quatrième assaut, et le quatrième est de trop.",
            "On le relève. Personne ne rit : un étranger est descendu dans le cercle, et cela restera.",
            "Mais le douzième feu ne s'allume pas. Uruk-Sekh remporte ce qu'il voulait sans avoir eu à affronter Khal-Vaene lui-même, et repart avec sa tribu au matin.",
            "Onze feux. Khal-Vaene regarde l'emplacement vide très longtemps, puis fait démonter le bois.",
            "« Onze, c'est déjà plus que mon père », dit-il. Il ment mal."],
            effets:{xp:34, pv:-26, fat:20, reputation:{khesh:14},
                    issue:"six_feux", flag:"feux_onze"}},
          cede_ok:{ fin:true, pnj:"khalvaene", texte:[
            "Il faut une nuit entière pour lui faire dire à voix haute ce qu'il sait depuis deux ans : qu'il n'a plus l'épaule, et que douze tribus valent mieux qu'un nom sur une bannière.",
            "Au matin, Khal-Vaene se lève dans le cercle et annonce qu'il ne sera pas khan. Il désigne sa nièce, Aza fille de Khareth, vingt-neuf ans, qui tient les six bannières avec lui depuis le début et qu'aucun des onze ne peut accuser de lâcheté.",
            "Uruk-Sekh ne peut pas exiger d'elle un duel qu'il avait exigé d'un homme de cinquante-quatre ans sans passer pour ce qu'il est. Il allume le douzième feu en serrant les dents.",
            "Khal-Vaene regarde brûler le cercle entier depuis le deuxième rang, et il a l'air d'un homme à qui on a retiré une pierre du dos."],
            effets:{xp:64, reputation:{khesh:26}, suspicion:6,
                    issue:"douze_feux", flags:["khesh_douze_feux","khesh_khan_aza"]}},
          cede_ko:{ texte:[
            "Il écoute jusqu'au bout, poliment, et il répond une seule phrase :",
            "« Si je cède mon nom la veille du douzième feu, ce n'est plus une réunification. C'est une reddition. »",
            "Il descend dans le cercle au matin."],
            suite:"seul"},
          veut_ok:{ fin:true, texte:[
            "Personne ne demande un duel qu'il peut perdre. Uruk-Sekh a soixante et un ans, deux fils morts aux puits de Sar-Ekhen, et une tribu qui ne survivra pas à un troisième hiver sans pâtures d'eau douce.",
            "Il ne veut pas le titre. Il veut que ses gens ne meurent pas, et il ne sait pas comment le demander sans mendier devant onze tribus.",
            "Le duel est son prix pour pouvoir dire oui la tête haute.",
            "On lui offre les pâtures avant qu'il ait à les demander, publiquement, comme un dû ancien des Sekh-Karad reconnu par le khan.",
            "Il allume le douzième feu le soir même. Personne ne descend dans le cercle."],
            effets:{xp:66, reputation:{khesh:28},
                    issue:"douze_feux", flags:["khesh_douze_feux","khalvaene_khan","feux_paturages_sekh"]}},
          veut_ko:{ texte:[
            "Il y a quelque chose derrière ce duel — un vieux chef qui pose ses conditions et évite de regarder ses propres cavaliers ne demande pas seulement du sang.",
            "Mais on ne trouve pas en une nuit ce qu'une tribu cache depuis trois hivers.",
            "Au matin, le cercle se forme."],
            suite:"seul"},
          seul:{ pnj:"khalvaene", texte:[
            "Khal-Vaene descend dans le sel avec une lance courte et une épaule qui ne se lève plus complètement.",
            "Il tient six assauts, ce qui est six de plus que ce que tout le monde comptait."],
            choix:[
              {label:"Regarder jusqu'au bout", detail:"C'est ce qu'il est venu chercher en s'asseyant à votre feu",
               suite:"regarde"},
              {label:"Arrêter le duel", detail:"Jet de Volonté (16) · interrompre un cercle de sel devant douze tribus",
               test:{stat:"vol", dc:16}, reussite:"arret_ok", echec:"arret_ko"},
            ]},
          regarde:{ fin:true, pnj:"khalvaene", texte:[
            "Au septième assaut, la lance du jeune homme passe au-dessus de l'épaule qui ne se lève plus.",
            "Khal-Vaene tombe dans le sel, et il ne se relève pas seul.",
            "Le douzième feu ne s'allume pas. Six bannières se dispersent en trois nuits, chacune retournant à son puits, et la réunification des Dunes redevient ce qu'elle a été pendant quatre-vingts ans : une chose que les vieux racontent.",
            "Il survit. C'est presque pire : il aura le temps de voir ce que ça a coûté."],
            effets:{xp:30, reputation:{khesh:8},
                    issue:"feux_eteints", flags:["khesh_feux_eteints","khalvaene_brise"]}},
          arret_ok:{ fin:true, pnj:"khalvaene", texte:[
            "Yohan entre dans le cercle de sel entre les deux hommes, mains ouvertes, et dit la seule phrase qui puisse fonctionner devant douze tribus :",
            "« Ce n'est pas un duel. C'est un vieil homme qu'on fait tomber devant son peuple pour qu'on n'ait pas à lui dire non. Que celui qui trouve ça digne le dise maintenant. »",
            "Personne ne le dit. C'est là que ça se joue : pas dans le courage d'Uruk-Sekh, mais dans le silence des dix autres chefs.",
            "Le duel s'arrête. Le douzième feu s'allume trois jours plus tard, après des négociations laides, longues et sans gloire — c'est-à-dire de vraies négociations.",
            "Khal-Vaene ne remerciera jamais. Il enverra, chaque année, un cheval."],
            effets:{xp:60, renom:12, suspicion:12, reputation:{khesh:24},
                    issue:"douze_feux", flags:["khesh_douze_feux","khalvaene_khan","feux_cercle_interrompu"]}},
          arret_ko:{ texte:[
            "Yohan fait un pas dans le sel. Deux lances se posent en travers avant le deuxième, sans hostilité et sans discussion possible.",
            "Un étranger n'entre pas dans un cercle qui a commencé."],
            suite:"regarde"},
        }}},
  ]},

/* ══════════════════════════════════════════════════════════════════════════
   10 — LE PORTRAIT BRÛLÉ
   La chute de Karlsberg n'a pas été l'œuvre de monstres.
   ══════════════════════════════════════════════════════════════════════════ */
{
  id:"SEC_PORTRAIT", type:'secret', titre:"Le Portrait brûlé",
  declencheur:{ flags:["anneau_karlsberg"], apres:[6,16] },
  issues:{
    verite_publique:"On sait qui a ouvert les portes de Karlsberg, et on le sait publiquement.",
    verite_gardee:"Yohan sait qui a ouvert les portes de Karlsberg. Personne d'autre.",
    verite_perdue:"Le nom de celui qui a ouvert les portes de Karlsberg a brûlé une seconde fois.",
  },
  etapes:[
    { id:"toile", delai:[3,8], attente:"Une toile calcinée dans une salle de vente.",
      ev:{ id:"CPB_1", titre:"La toile calcinée", famille:"PARIA", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "Un brocanteur de Chastel vend au poids un lot de cadres sortis d'une grange, et dans le lot il y a une toile de trois pieds sur quatre, brûlée au centre.",
            "Le feu a mangé les visages. Il a laissé les mains, les bas de robes, un lévrier, et dans le coin gauche un blason qu'on ne peut pas confondre : le Loup de Karlsberg.",
            "Le brocanteur en demande quatre cents écus parce qu'il a vu Yohan la regarder trop longtemps.",
            "Au dos du châssis, à l'encre, de la main du peintre : la liste de ceux qui ont posé, dans l'ordre du tableau. Onze noms. Le dixième n'aurait jamais dû se trouver dans cette salle."],
            choix:[
              {label:"Acheter la toile", detail:"−400 or · il sait exactement ce qu'il vend",
               requis:{or:400}, suite:"achete", effets:{or:-400}},
              {label:"Relever les onze noms de mémoire", detail:"Jet de Précision (13) · onze noms, dans l'ordre, sans avoir l'air de lire",
               test:{stat:"precision", dc:13}, reussite:"memoire_ok", echec:"memoire_ko"},
              {label:"La prendre la nuit", detail:"Jet de Précision (15) · une grange, un chien, et un brocanteur qui dort mal",
               test:{stat:"precision", dc:15}, reussite:"vol_ok", echec:"vol_ko"},
              {label:"La laisser où elle est", detail:"Onze noms au dos d'un châssis dans une grange de Chastel",
               suite:"laisse", effets:{issue:"verite_perdue"}},
            ]},
          achete:{ fin:true, texte:[
            "Quatre cents écus pour une toile brûlée, payés sans marchander, ce qui apprend au brocanteur qu'il aurait dû demander mille.",
            "De retour à la lumière, la liste se lit entière. Dix noms de la maison, de la parenté et de la maisonnée — et au dixième rang, entre une tante et un chapelain, un nom qui n'est ni de la famille ni de la maison :",
            "*Aymon de Larsac, sénéchal de la vallée.*",
            "Un sénéchal royal ne pose pas dans le portrait d'une famille. Sauf si le peintre l'a mis là parce qu'il était là."],
            effets:{xp:34, sang:4, flag:"portrait_liste"}},
          memoire_ok:{ fin:true, texte:[
            "Onze noms, dans l'ordre, retenus en trois passages devant le châssis pendant qu'on discute d'autre chose avec le brocanteur.",
            "Recopiés le soir même à l'auberge, ils tiennent sur un demi-feuillet. Dix appartiennent à la maison ou à la maisonnée de Karlsberg.",
            "Le dixième, entre une tante et un chapelain : *Aymon de Larsac, sénéchal de la vallée.*",
            "La toile partira au poids avec le reste du lot. Le demi-feuillet, lui, restera."],
            effets:{xp:32, sang:4, flag:"portrait_liste"}},
          memoire_ko:{ fin:true, texte:[
            "Neuf noms sur onze, dont deux mal orthographiés, et un blanc exactement au milieu de la liste.",
            "Le lot part le lendemain matin pour une fonderie de cadres à deux jours de route. Quand on retrouve le brocanteur, il ne se souvient que d'une chose : qu'un autre acheteur était venu demander la même toile trois mois plus tôt, et qu'il n'était pas de Chastel."],
            effets:{xp:14, flag:"portrait_autre_acheteur"}},
          vol_ok:{ fin:true, texte:[
            "La grange, le chien qu'on endort avec un os, le châssis qu'on décroche sans le faire tomber : le métier de mercenaire prépare mal à tout sauf à ça.",
            "La liste se lit à la lanterne, à deux lieues de là. Dix noms de la maison — et au dixième rang *Aymon de Larsac, sénéchal de la vallée*, qui n'a rien à faire dans le portrait d'une famille.",
            "Le brocanteur criera au vol pendant une semaine. Il ne pourra dire à personne ce qu'on lui a pris, puisqu'il vendait au poids."],
            effets:{xp:36, sang:4, flag:"portrait_liste"}},
          vol_ko:{ fin:true, texte:[
            "Le chien n'était pas seul et le brocanteur dormait dans la grange, ce qui est la seule chose qu'on n'avait pas prévue.",
            "On repart sans la toile et sans être reconnu, ce qui est la moitié d'un succès.",
            "Le lendemain, la toile n'est plus en vente. Le brocanteur dit à qui l'interroge qu'un homme est passé la reprendre au nom de son propriétaire, et qu'il a payé sans discuter."],
            effets:{xp:14, flag:"portrait_autre_acheteur"}},
          laisse:{ fin:true, texte:[
            "Onze noms au dos d'un châssis, dans un lot vendu au poids, dans une grange de Chastel.",
            "Trois semaines plus tard, le lot part à la fonderie. Les cadres deviennent du plomb de gouttière, et la toile sert à couvrir un tas de bois pendant l'hiver.",
            "Ce qui est sur les tableaux finit toujours par brûler deux fois."]},
        }}},

    { id:"archives", delai:[8,16], attente:"Un nom, et une année qui manque dans un registre.",
      ev:{ id:"CPB_2", titre:"Les archives manquantes", famille:"POLITIQUE", rarete:"majeur",
        image:"evt_archives",
        scenes:{
          start:{ texte:[
            "La chancellerie de province conserve tout, et elle conserve mal : c'est ce qui la rend utile.",
            "Le registre de la vallée pour l'année de la chute est là, relié, coté, en règle — et amputé de trois cahiers, arrachés proprement, à la lame, entre le mois de septembre et le mois de janvier.",
            "Le copiste de service a soixante-huit ans et cinquante et un ans de maison. Il se souvient des cahiers manquants, et il se souvient surtout de la seule chose qui l'ait jamais choqué en cinquante et un ans : qu'on les ait sortis avec un ordre en règle, et qu'on ne les ait jamais rendus."],
            choix:[
              {label:"L'acheter", detail:"−250 or · cinquante et un ans de maison et une pension qui ne suffit pas",
               requis:{or:250}, suite:"achat", effets:{or:-250}},
              {label:"Lui demander simplement, en donnant son nom", detail:"Jet de Volonté (14) · un homme qui garde une chose depuis vingt ans attend qu'on la lui demande",
               test:{stat:"vol", dc:14}, reussite:"demande_ok", echec:"demande_ko"},
              {label:"Chercher la copie de contrôle au prieuré", detail:"Jet de Précision (14) · tout acte de chancellerie était copié deux fois",
               test:{stat:"precision", dc:14}, reussite:"copie_ok", echec:"copie_ko"},
              {label:"Ne pas insister", detail:"Un vieil homme, un registre amputé, et vingt ans",
               suite:"insiste_pas"},
            ]},
          achat:{ fin:true, texte:[
            "Deux cent cinquante écus posés sur un pupitre, ce qui pour lui représente onze mois de pension et, très visiblement, une humiliation.",
            "Il prend l'argent. Il donne le nom sur le bordereau de sortie et il le donne mal, en regardant ailleurs :",
            "« Ordre du sénéchal de la vallée. Aymon de Larsac. Il est venu lui-même. »",
            "Puis il ajoute, parce qu'un homme qui vient d'être acheté a besoin de dire une chose gratuitement : « Il ne les a pas fait porter. Il les a mis sous son manteau. »"],
            effets:{xp:32, flag:"portrait_larsac_nomme"}},
          demande_ok:{ fin:true, texte:[
            "Yohan donne son nom entier, ce qui dans une chancellerie de province est une imprudence considérable, et pose la question sans détour.",
            "Le vieux copiste le regarde par-dessus ses besicles pendant un temps très long.",
            "« Vingt-deux ans que j'attends que quelqu'un vienne me demander ça », dit-il enfin. « Je croyais que ce serait un juge. »",
            "Il sort le registre des sorties de son propre coffre, à sa propre place, sous son propre pupitre. Une seule ligne y est soulignée :",
            "*Ordre du sénéchal de la vallée, Aymon de Larsac, en personne, sans porteur.*",
            "« Il ne les a pas fait porter, messire. Il les a mis sous son manteau. J'avais quarante-six ans et je n'ai rien dit. »"],
            effets:{xp:40, sang:4, reputation:{humains:4},
                    flags:["portrait_larsac_nomme","portrait_temoin_vivant"]}},
          demande_ko:{ fin:true, texte:[
            "Il écoute la question, referme le registre, et redevient en une seconde ce que cinquante et un ans de maison ont fait de lui : un homme qui n'a jamais eu d'ennuis.",
            "« Les cahiers manquants sont signalés au bordereau, messire. Le bordereau est consultable sur ordre. Adressez-vous au bailli. »",
            "Il ne ment pas une seule fois. Il ne dit rien non plus."],
            effets:{xp:14}},
          copie_ok:{ fin:true, texte:[
            "Tout acte de chancellerie était copié deux fois : l'original à la province, la contre-écriture au prieuré le plus proche, pour les dîmes.",
            "Le prieuré de la vallée a brûlé. Mais le prieuré n'était pas le plus proche cette année-là — les crues avaient fait détourner les copies vers la maison-mère, à trente lieues, où personne n'a jamais rien brûlé et où personne n'a jamais rien classé non plus.",
            "Il faut onze jours de poussière pour retrouver la contre-écriture des trois cahiers.",
            "Elle est complète. Elle porte, au 3 novembre, l'ordre de retirer la garnison de la porte basse *pour cause de revue*, signé du sénéchal de la vallée, Aymon de Larsac. La revue n'a jamais eu lieu.",
            "Onze jours plus tard, Karlsberg tombait par la porte basse."],
            effets:{xp:46, sang:8, fat:10,
                    flags:["portrait_larsac_nomme","portrait_contre_ecriture","portrait_preuve_ecrite"]}},
          copie_ko:{ fin:true, texte:[
            "Onze jours de poussière, quatre greniers, deux moines aimables et incompétents, et rien.",
            "Les copies de l'année de la chute ont été transférées, dit le registre des transferts, vers une maison-mère qui a depuis été rattachée à une autre, laquelle a vendu ses fonds.",
            "Ce n'est pas un complot. C'est de l'administration, et l'administration efface mieux que le feu."],
            effets:{xp:16, fat:12}},
          insiste_pas:{ fin:true, texte:[
            "Un vieil homme derrière un pupitre, un registre amputé de trois cahiers, et vingt-deux ans.",
            "Yohan referme le volume et le repose sur la pile. Le copiste le regarde partir sans rien dire, et reste ensuite très longtemps immobile, la main posée sur son propre coffre."],
            effets:{xp:10}},
        }}},

    { id:"verite", delai:[10,20], attente:"Le sénéchal de la vallée n'est pas mort avec la vallée.",
      ev:{ id:"CPB_3", titre:"La vérité utile", famille:"PARIA", rarete:"majeur",
        image:"evt_chapelle",
        scenes:{
          start:{ texte:[
            "Aymon de Larsac est vivant. Il a soixante-dix-neuf ans, il s'appelle depuis vingt-deux ans Aymon Vaulnier, et il tient une maison de six feux au-dessus d'un vignoble qui ne rapporte rien, avec quatre hommes d'armes pour une maison qui n'en justifie pas un seul.",
            "Il ne se cache pas très bien. Il se cache depuis assez longtemps pour que plus personne ne cherche.",
            "Il reçoit dans une chapelle privée, assis, avec un livre d'heures qu'il ne lit pas, et il ne fait aucune difficulté pour reconnaître le visage.",
            "« Vous avez le menton de votre grand-mère », dit-il. « Asseyez-vous. Vous n'aurez pas besoin de me poser les questions. »"],
            choix:[
              {label:"Écouter jusqu'au bout", detail:"Il a préparé ça pendant vingt-deux ans",
               suite:"ecoute"},
              {label:"Exiger un aveu écrit et signé", detail:"Jet de Volonté (15) · une parole dans une chapelle ne vaut rien devant un tribunal",
               test:{stat:"vol", dc:15}, reussite:"aveu_ok", echec:"aveu_ko"},
              {label:"Le tuer maintenant", detail:"Quatre hommes d'armes et un vieillard assis",
               suite:"tuer"},
            ]},
          ecoute:{ texte:[
            "Il parle une heure et demie sans qu'on ait à l'interrompre, et ce qu'il dit est pire que ce qu'on venait chercher, parce que c'est raisonnable.",
            "La porte basse n'a pas été vendue à des monstres. Elle a été dégarnie pour une revue qui n'a jamais eu lieu, sur ordre écrit, parce que trois maisons de la province et un légat d'Astrah étaient convenus que la question Karlsberg devait se régler en une nuit plutôt qu'en une guerre de dix ans.",
            "« On ne m'a pas payé », dit-il. « C'est la seule chose que je tiens à ce que vous sachiez. On m'a convaincu. J'ai signé un ordre de revue. Il n'y avait pas de monstre dans la salle où ça s'est décidé, il y avait quatre hommes fatigués et une carte. »",
            "Il pose sur la table trois cahiers de chancellerie, cousus, jaunis, et le nom des trois maisons.",
            "« Je les ai gardés pour ce jour-ci. Faites-en ce que vous voudrez. Je ne demande rien, et surtout pas ce que vous pensez que je vais demander. »"],
            choix:[
              {label:"Rendre les trois cahiers publics", detail:"Trois maisons nommées, un légat d'Astrah, et le nom de Karlsberg de nouveau sur toutes les lèvres",
               suite:"public",
               effets:{issue:"verite_publique", renom:20, suspicion:22,
                       reputation:{humains:-18, parias:24},
                       flags:["portrait_verite_publique","karlsberg_trahison_prouvee"]}},
              {label:"Les garder", detail:"Trois maisons qui ne savent pas encore que quelqu'un tient leur nom",
               suite:"garde",
               effets:{issue:"verite_gardee", renom:4, suspicion:6,
                       flags:["portrait_verite_gardee","karlsberg_trois_maisons"]}},
              {label:"Les brûler dans la chapelle, devant lui", detail:"Vingt-deux ans d'attente, et rien au bout",
               suite:"brule",
               effets:{issue:"verite_perdue", sang:10, reputation:{parias:-10},
                       flags:["portrait_cahiers_brules"]}},
              {label:"Le tuer avec ce qu'il vient de dire", detail:"Il a préparé son aveu. Il n'a pas préparé ça",
               suite:"tuer"},
            ]},
          aveu_ok:{ texte:[
            "Il écrit. Il écrit lentement, d'une main de vieillard mais d'une écriture de chancellerie, et il n'omet rien : la date, l'ordre de revue, les trois maisons, le légat, et la phrase qui vaut plus que tout le reste — *je n'ai pas été payé, j'ai été convaincu.*",
            "Il signe des deux noms, l'ancien et le nouveau, ce que personne ne lui avait demandé.",
            "« Un aveu sans preuve n'est qu'un vieil homme qui radote », dit-il en repoussant la feuille. « Prenez aussi ce qu'il y a dans le coffre. »",
            "Il y a trois cahiers de chancellerie, cousus, jaunis, gardés vingt-deux ans."],
            effets:{xp:44, flag:"portrait_aveu_signe"}, suite:"ecoute"},
          aveu_ko:{ texte:[
            "Il refuse d'écrire, et il refuse bien : sans s'énerver, sans appeler ses quatre hommes, en expliquant posément qu'un aveu écrit ferait pendre trois maisons et lui-même, et qu'il n'a pas gardé le silence vingt-deux ans pour finir en pièce de procès.",
            "« Je vous dirai tout. Je ne signerai rien. C'est à prendre ou à laisser, et vous prendrez, parce que vous êtes venu pour savoir. »"],
            suite:"ecoute"},
          tuer:{ texte:[
            "Quatre hommes d'armes pour une maison de six feux, et un vieillard assis qui ne se lève même pas."],
            combat:{ groupe:[{bst:"BST_045", n:3}, {bst:"BST_048", n:1}],
                     victoire:"tue_ok", defaite:"tue_ko" }},
          tue_ok:{ fin:true, texte:[
            "Ça prend moins de temps qu'il n'en a mis à parler.",
            "Il est encore assis quand tout est fini. Il ne s'est pas levé, il n'a pas appelé, il n'a pas essayé la porte — un homme qui attend depuis vingt-deux ans ne court pas.",
            "Dans le coffre, sous le livre d'heures, il y a trois cahiers de chancellerie cousus, jaunis, et un billet plié dessus, écrit d'avance : *Si c'est le petit-fils qui les trouve, qu'il sache que je les ai gardés pour lui.*",
            "Les trois maisons y sont nommées. Personne ne saura jamais si Yohan les aurait obtenues autrement."],
            effets:{xp:52, sang:12, renom:6, suspicion:10, reputation:{humains:-10, parias:14},
                    issue:"verite_gardee", flags:["portrait_larsac_mort","karlsberg_trois_maisons"]}},
          tue_ko:{ fin:true, texte:[
            "Quatre hommes d'armes de maison ne sont pas quatre gardes de village, et le quatrième était un chevalier qui a servi.",
            "On sort du vignoble avec ce qu'on peut porter, c'est-à-dire soi-même.",
            "La maison est vidée dans la semaine. Le vieil homme part vers le sud, et cette fois il se cache bien : il n'y aura pas de second entretien.",
            "Vingt-deux ans qu'il attendait quelqu'un. Il aura fallu que ce soit quelqu'un de pressé."],
            effets:{xp:20, pv:-30, fat:20, issue:"verite_perdue", flag:"portrait_larsac_enfui"}},
          public:{ fin:true, texte:[
            "Trois cahiers de chancellerie recopiés onze fois, portés à Chastel, à Fort-aux-Princes, au prieuré de la maison-mère, et à deux hérauts qui ne savent pas encore ce qu'ils transportent.",
            "En six semaines, la province entière sait que Karlsberg n'est pas tombée sous des monstres : elle a été ouverte, sur ordre écrit, par des hommes qui avaient une carte et de la fatigue.",
            "Les trois maisons nient. Une d'elles nie si mal qu'elle se condamne toute seule. Le légat d'Astrah est rappelé, ce qui est la manière impériale d'admettre.",
            "Et partout, dans les salles où l'on nie, revient la même question : qui a sorti ces cahiers, et de quel droit.",
            "Le nom de Karlsberg redevient un nom vivant. On ne peut pas le rendre vivant à moitié."]},
          garde:{ fin:true, texte:[
            "Trois cahiers cousus, jaunis, qui tiennent dans une sacoche et qui pèsent une province.",
            "Trois maisons continuent de vivre, de marier leurs filles et de tenir leurs terres sans savoir qu'un homme sait, et cette ignorance vaut, au bout du compte, plus cher que n'importe quel scandale.",
            "Aymon de Larsac meurt vingt et un mois plus tard, dans son lit, sous un nom qui n'est pas le sien. Yohan n'y assiste pas.",
            "Il a laissé une lettre. Elle tient en une ligne : *Vous les avez gardés. C'est ce que j'aurais fait. Ce n'est pas un compliment.*"]},
          brule:{ fin:true, texte:[
            "Les trois cahiers brûlent dans la chapelle, devant lui, page par page, ce qui prend un temps considérable et que personne n'écourte.",
            "Il regarde jusqu'au dernier feuillet. Puis il ferme son livre d'heures.",
            "« Vingt-deux ans », dit-il. « Vous n'imaginez pas ce que ça fait de les garder. »",
            "« Si. »",
            "Le vieil homme mourra dans son lit sans que personne sache ce qu'il a fait. Trois maisons ne seront jamais inquiétées. Un légat d'Astrah finira sa carrière avec les honneurs.",
            "Et Karlsberg sera tombée sous des monstres, ce qui est ce qu'on raconte aux enfants, et ce qui est plus facile à porter que le reste."]},
        }}},
  ]},

];
CHAINES_SECRETES_3.forEach(c => { CHAINES_SECRETES.push(c); CHAINES.push(c); });
