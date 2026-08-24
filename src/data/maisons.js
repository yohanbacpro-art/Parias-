/* PARIAS — Les maisons nobles, et qui les compose
 *
 * Le pack narratif est formel sur un point que le jeu tranchait à la légère :
 *
 *   « Pour une maison humaine noble, le moteur recherche une noble adulte
 *     réelle de la maison, disponible dans l'état courant de la sauvegarde.
 *     Elle doit consentir explicitement à entrer dans les termes ancestraux.
 *     Si aucune candidate adulte consentante n'existe, cette partie du prix
 *     est indisponible. »
 *
 * Autrement dit : le Prix du Paria n'est pas une option de menu. C'est une
 * femme qui a un nom, un âge, une position dans sa maison, et le droit de dire
 * non. Une maison peut n'avoir personne à offrir — elle paie alors en or, et
 * elle en est soulagée.
 *
 * Chaque candidate porte ce qu'elle exige avant de consentir. Ce ne sont pas
 * des serrures de gameplay : ce sont ses raisons. La cadette qui étouffe veut
 * qu'on soit quelqu'un ; la veuve qui tient les comptes ne veut pas d'un homme
 * traqué chez elle ; l'aînée promise ailleurs ne peut pas, quoi qu'elle pense.
 */

const MAISONS = {
  "Maison de Valombre": { region:'sylve', devise:"On ne prête qu'aux riches, et jamais gratuitement.",
    nobles:[
      { nom:"Dame Éléonore de Valombre", age:34, rang:"maîtresse des créances",
        note:"Elle tient les dettes de sept maisons humaines et le sait mieux qu'elles.",
        exige:{ renomMin:20, suspicionMax:65 },
        refus:"« Je prête à des gens dont je peux estimer la valeur. La vôtre est illisible. »",
        accord:"« Une créance sur un Paria vivant vaut mieux qu'une créance sur une maison morte. Je prends. »" },
      { nom:"Dame Ysabeau de Valombre", age:29, rang:"cousine, tenue à l'écart des comptes",
        note:"On lui a appris quatre langues et rien de ce qui compte dans cette maison.",
        exige:{ reputationMin:{ elfes_noirs:-30 } },
        refus:"« Ma famille a déjà assez d'ennemis chez les nôtres. Elle n'a pas besoin des vôtres. »",
        accord:"« On m'a appris quatre langues pour que je me taise dans toutes. Alors non, je ne vais pas me taire là-dessus. »" },
    ]},
  "Maison de Valcroix": { region:'nord', devise:"Ce qui brûle éclaire.",
    nobles:[
      { nom:"Dame Ysoré de Valcroix", age:31, rang:"cadette du seigneur",
        note:"Elle tient les greniers depuis la mort de sa mère et n'a jamais quitté la vallée.",
        exige:{ renomMin:10 },
        refus:"Elle vous regarde longuement, puis secoue la tête : « On ne connaît pas votre nom ici. Revenez quand on le connaîtra. »",
        accord:"« La coutume est la coutume », dit-elle sans baisser les yeux. « Et je préfère la payer moi-même plutôt que de la voir payer par une autre. »" },
      { nom:"Dame Aveline de Valcroix", age:44, rang:"veuve du frère aîné",
        note:"Veuve, sans enfant, et la seule de la maison à savoir combien elle doit exactement.",
        exige:{ suspicionMax:55 },
        refus:"« On vous cherche », dit-elle en refermant son registre. « Je ne fais pas entrer chez moi ce qu'on cherche. »",
        accord:"« Mon défunt mari trouvait la coutume barbare. Il trouvait aussi barbare de payer ses dettes. Asseyez-vous. »" },
    ]},
  "Maison Rochebrune": { region:'coeur', devise:"La pierre avant le sang.",
    nobles:[
      { nom:"Dame Constance de Rochebrune", age:27, rang:"sœur du seigneur",
        note:"On la marie depuis ses quinze ans à des hommes qui meurent avant les noces.",
        exige:{},
        accord:"« Trois fiancés enterrés, messire. Vous avez au moins l'avantage d'être vivant. »" },
    ]},
  "Maison d'Arquenay": { region:'nord', devise:"Sous la terre aussi.",
    nobles:[
      { nom:"Dame Mélisende d'Arquenay", age:23, rang:"fille cadette",
        note:"Élevée pour un couvent qu'elle refuse d'entendre nommer.",
        exige:{ reputationMin:{ humains:-20 } },
        refus:"Son père a répondu avant elle : « Pas celle-là. Pas à quelqu'un que la province déteste. »",
        accord:"« Le couvent ou vous », dit-elle. « Ce n'est pas un compliment, mais c'est un choix, et c'est le premier qu'on me laisse. »" },
      { nom:"Dame Blanche d'Arquenay", age:38, rang:"intendante des mines",
        note:"Elle connaît le poids exact de chaque galerie et le nom de chaque veuve.",
        exige:{ renomMin:25, suspicionMax:70 },
        refus:"« Vous ne pesez pas encore assez pour qu'on vous doive quelque chose », dit-elle sans méchanceté.",
        accord:"« Les mineurs disent du bien de vous. C'est plus rare que l'or, et ça se paie plus cher. »" },
    ]},
  "Maison de Vauclair": { region:'coeur', devise:"On tient ce qu'on prend.",
    nobles:[
      { nom:"Dame Mathilde de Vauclair", age:29, rang:"nièce du seigneur",
        note:"Élevée à la cour d'Astrah, renvoyée pour une raison que personne ne dit.",
        exige:{ suspicionMax:80 },
        refus:"« On m'a déjà renvoyée d'un endroit pour moins que ça. »",
        accord:"« À Astrah, on m'a appris que les coutumes anciennes servent à humilier les vieilles maisons. Celle-ci humilie la mienne. Alors oui. »" },
    ]},
  "Maison de Sombreval": { region:'sylve', devise:"Nous savons attendre.",
    nobles:[
      { nom:"Dame Héloïse de Sombreval", age:26, rang:"fille aînée",
        note:"Celle qui a disparu dans les marais, si elle en revient.",
        exige:{ flag:"sombreval_fille_ramenee" },
        refus:"La fille aînée de la maison n'est pas là pour répondre. C'est précisément le problème.",
        accord:"« Vous m'avez sortie de la boue. Je sais ce que la coutume demande, et je sais ce que mon père en pense. Ça ne me fait pas changer d'avis. »" },
      { nom:"Dame Clarisse de Sombreval", age:52, rang:"tante du seigneur",
        note:"Elle a passé l'âge d'en attendre quoi que ce soit et le dit à qui veut.",
        exige:{},
        accord:"« À mon âge, la coutume ne coûte plus rien à personne, sauf à l'orgueil de mon neveu. Raison suffisante. »" },
    ]},
  "Maison de Hauterive": { region:'nord', devise:"Plus haut que le vent.",
    nobles:[
      { nom:"Dame Ophélie de Hauterive", age:24, rang:"fille du seigneur",
        note:"Fiancée depuis l'enfance à un cousin qu'elle n'a vu que deux fois.",
        exige:{ renomMin:45 },
        refus:"« Je suis promise. Il faudrait que vous pesiez plus lourd qu'un contrat de mariage — et ce n'est pas le cas. »",
        accord:"« Mon fiancé a écrit trois lettres en neuf ans. Vous, vous êtes venu. »" },
    ]},
  "Maison de Cendrepont": { region:'brulees', devise:"Ce que le feu laisse.",
    nobles:[
      { nom:"Dame Diane de Cendrepont", age:33, rang:"sœur bâtarde reconnue",
        note:"Reconnue tard, tolérée mal, indispensable aux comptes de la maison.",
        exige:{ reputationMin:{ parias:20 } },
        refus:"« Vous ne défendez personne. Moi, je suis quelqu'un qu'on ne défend pas. Nous n'avons rien à faire ensemble. »",
        accord:"« On m'a reconnue à dix-neuf ans, comme on reconnaît une dette. Vous savez ce que c'est. »" },
    ]},
  "Maison de Bellac": { region:'sylve', devise:"Le sel et la parole.",
    nobles:[
      { nom:"Dame Rosamonde de Bellac", age:35, rang:"veuve, régente pour son fils",
        note:"Elle gouverne au nom d'un enfant de six ans et compte bien continuer.",
        exige:{ suspicionMax:45, renomMin:20 },
        refus:"« Je tiens cette maison à bout de bras pour un enfant. Je ne vais pas y faire entrer un scandale. »",
        accord:"« Mon fils héritera d'une maison qui aura tenu parole. C'est tout ce que j'ai à lui laisser. »" },
    ]},
  "Maison de Corven": { region:'coeur', devise:"Rien ne se perd.",
    nobles:[
      { nom:"Dame Agnès de Corven", age:28, rang:"fille du seigneur",
        note:"Elle a lu tous les registres de la maison, y compris ceux qu'on cache.",
        exige:{},
        accord:"« J'ai lu les actes de la Purge dans nos archives. Ma maison a signé. Considérez ceci comme un acompte. »" },
    ]},
  "Maison de Brézé": { region:'brulees', devise:"Debout dans le sable.",
    nobles:[
      { nom:"Dame Philippa de Brézé", age:41, rang:"cousine du seigneur",
        note:"Elle a mené une caravane pendant onze ans avant qu'on la rappelle au domaine.",
        exige:{ renomMin:15 },
        refus:"« J'ai commandé des hommes. Je ne me donne pas à quelqu'un dont personne n'a entendu parler. »",
        accord:"« Onze ans de sable, et on me rappelle pour me marier à un voisin. La coutume, au moins, ne ment pas sur ce qu'elle est. »" },
    ]},
  "Maison d'Orsenne": { region:'nord', devise:"Le fer chaud.",
    nobles:[
      { nom:"Dame Isabeau d'Orsenne", age:30, rang:"maîtresse des forges",
        note:"Elle dirige quatre forges rurales et n'a jamais laissé un homme parler à sa place.",
        exige:{ renomMin:30 },
        refus:"« Je choisis mes associés. Revenez quand on saura pourquoi je vous aurais choisi. »",
        accord:"« Vous avez sauvé mes forges. Mon frère aurait préféré payer. Il n'a pas voix au chapitre. »" },
    ]},
  "Maison de Clairmont": { region:'coeur', devise:"Sept fois plutôt qu'une.",
    nobles:[] },   // sept disparus : il ne reste plus d'adulte à offrir
  "Maison de Méricourt": { region:'coeur', devise:"Le nom d'abord.",
    nobles:[] },   // trois branches, aucun héritier reconnu, personne pour consentir
  "Maison de Ronceval": { region:'coeur', devise:"On escorte, on ne trahit pas.",
    nobles:[
      { nom:"Dame Aliénor de Ronceval", age:39, rang:"sœur du prince, maîtresse de l'escorte",
        note:"Elle a mené douze cortèges et perdu un seul homme, dont elle dit encore le nom.",
        exige:{ renomMin:35, suspicionMax:70 },
        refus:"« Je confie des vies à des gens dont je connais le dossier. Le vôtre est vide. »",
        accord:"« Vous avez ramené ma nièce vivante d'une escorte que j'avais montée moi-même. Je paie mes dettes en entier. »" },
    ]},
  "Maison d'Estrées": { region:'brulees', devise:"Tout se négocie.",
    nobles:[
      { nom:"Dame Béatrice d'Estrées", age:31, rang:"négociatrice de la maison",
        note:"Elle parle khesh, elfe et nain, et refuse d'apprendre à mentir dans aucune des trois.",
        exige:{ reputationMin:{ khesh:-10 } },
        refus:"« Je passe ma vie à réparer ce que les hommes cassent chez les Khesh. Je ne vais pas m'attacher à quelqu'un qui casse. »",
        accord:"« Une maison qui traite avec tout le monde finit par n'appartenir à personne. Autant choisir. »" },
    ]},
  "Maison de Chastel": { region:'sylve', devise:"Ce qui est écrit demeure.",
    nobles:[
      { nom:"Dame Célestine de Chastel", age:36, rang:"archiviste de la maison",
        note:"Elle a la garde des généalogies, et sait donc ce que Yohan est.",
        exige:{ reputationMin:{ parias:10 } },
        refus:"« Je sais lire un arbre généalogique, messire. Je sais donc à quoi je m'engagerais. Pas comme ça. »",
        accord:"« Je tiens les registres où votre maison a été rayée. Je peux aussi tenir celui où elle réapparaît. »" },
    ]},
  "Maison de Hautecour": { region:'nord', devise:"On ne rend pas les armes.",
    nobles:[
      { nom:"Dame Marguerite de Hautecour", age:25, rang:"fille du général",
        note:"Celle qui est passée à l'ennemi, si on la ramène — et si elle y consent.",
        exige:{ flag:"hautecour_fille_ramenee", reputationMin:{ humains:-10 } },
        refus:"Elle n'est pas ici, et son père n'a personne d'autre à proposer.",
        accord:"« Mon père croit m'avoir récupérée. Qu'il découvre ce que ça lui coûte. »" },
    ]},
  "Maison d'Artois-Noir": { region:'brulees', devise:"La boue aussi porte des couronnes.",
    nobles:[
      { nom:"Dame Ermengarde d'Artois-Noir", age:47, rang:"sœur du prétendant",
        note:"Elle a tenu la maison pendant les quatre ans où son frère était prisonnier.",
        exige:{ renomMin:40, suspicionMax:75 },
        refus:"« Nous avons une revendication à défendre. On ne la défend pas avec un inconnu. »",
        accord:"« Mon frère veut une couronne. Moi je veux que la maison existe encore quand il l'aura. Vous servez la seconde chose. »" },
    ]},
};

/* Les maisons qui ne figurent pas ici n'ont pas de rôle écrit : elles paient
 * en or, comme n'importe quel commanditaire. */
function maisonDe(nom){ return MAISONS[nom] || null; }
