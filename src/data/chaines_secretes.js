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
