/* PARIAS — Quand un lieu n'a plus rien à raconter
 *
 * Le jeu retombait, quand le catalogue écrit d'un endroit était épuisé, sur
 * deux cents variantes générées : même texte à trois mots près, mêmes trois
 * choix — *Intervenir · Enquêter · Éviter* — et une issue tirée au sort.
 *
 * Ces variantes ont été supprimées. À leur place, huit passages courts qui
 * disent la vérité : il n'y a rien ici cette fois-ci. Un lieu qu'on a vidé
 * doit se sentir vidé — c'est ce qui donne envie de prendre la route.
 *
 * Ce sont des événements écrits ordinaires, sans marqueur et sans conséquence,
 * qui ne se retirent jamais du catalogue : ils sont là pour être relus.
 */

const EXPLORATIONS_VIDES = [
{
  id:"EV_RIEN_1", titre:"Rien", famille:"VOYAGE", rarete:"majeur", image:"evt_paria",
  scenes:{ start:{ fin:true, texte:[
    "Trois heures à retourner ce qui peut l'être, et rien.",
    "Ce n'est pas de la malchance : c'est ce qui arrive quand on a déjà tout retourné. Un endroit se vide comme une bourse."]}}
},
{
  id:"EV_RIEN_2", titre:"Les mêmes visages", famille:"VILLE", rarete:"majeur", image:"evt_taverne",
  scenes:{ start:{ fin:true, texte:[
    "Les mêmes visages, les mêmes conversations, et cette façon qu'ont les gens de saluer quelqu'un qu'ils ont assez vu.",
    "On a fait ici ce qu'il y avait à faire. Le reste est ailleurs."]}}
},
{
  id:"EV_RIEN_3", titre:"Le temps qu'il fait", famille:"VOYAGE", rarete:"majeur", image:"evt_pierres",
  scenes:{ start:{ fin:true, texte:[
    "Il pleut, puis il ne pleut plus, puis il pleut de nouveau.",
    "Yohan rentre trempé, sans une écorchure et sans une nouvelle. Il y a des journées comme ça, et elles comptent aussi."]}}
},
{
  id:"EV_RIEN_4", titre:"Une piste qui s'arrête", famille:"VOYAGE", rarete:"majeur", image:"evt_traque",
  scenes:{ start:{ fin:true, texte:[
    "Des traces, une heure de suivi, et un ruisseau. La piste s'arrête au ruisseau, comme s'arrêtent les pistes.",
    "Ce qui les a laissées est passé de l'autre côté, ou n'est jamais passé du tout."]}}
},
{
  id:"EV_RIEN_5", titre:"Ce qu'on a déjà entendu", famille:"VILLE", rarete:"majeur", image:"evt_receleur",
  scenes:{ start:{ fin:true, texte:[
    "Deux hommes vendent, pour trois sous, une histoire que Yohan connaît mieux qu'eux.",
    "Il paie quand même. Ce n'est pas pour l'histoire."]}}
},
{
  id:"EV_RIEN_6", titre:"Assis un moment", famille:"VOYAGE", rarete:"majeur", image:"evt_chapelle",
  scenes:{ start:{ fin:true, texte:[
    "Il n'y a rien à trouver, alors il s'assied.",
    "Le bourdonnement est bas aujourd'hui. Ce sont les seuls jours où il remarque qu'il est là."]}}
},
{
  id:"EV_RIEN_7", titre:"Le vent", famille:"VOYAGE", rarete:"majeur", image:"evt_harde",
  scenes:{ start:{ fin:true, texte:[
    "Quelque chose bouge à la lisière et ne se montre pas. Ça arrive quatre fois dans l'après-midi.",
    "La quatrième, Yohan cesse de se retourner. C'est probablement une erreur, et il ne se passe rien."]}}
},
{
  id:"EV_RIEN_8", titre:"Une carte qu'on relit", famille:"VOYAGE", rarete:"majeur", image:"evt_archives",
  scenes:{ start:{ fin:true, texte:[
    "Il déplie la carte, regarde les routes qui partent d'ici, et les compte.",
    "C'est ce qu'on fait dans un endroit où l'on a fini : on regarde les routes."]}}
},
];
