# Gabarit d'un combat textuel

## Couche JOUEUR

### Position

Décrire distance, terrain, adversaires visibles, état corporel de Yohan et danger immédiat. Ne jamais afficher la difficulté numérique.

### Choix

- action fiable issue de l'arme et de la position ;
- action ciblée plus risquée ;
- défense ou déplacement ;
- décor, objet, allié ou capacité spéciale ;
- parole, reddition ou fuite si cohérent.

### Résultat

Une nouvelle scène propre à chaque degré. Ne jamais écrire « test réussi ». Montrer la lame qui passe, le souffle perdu, la peur dans les yeux, la fonction corporelle atteinte et la nouvelle opportunité.

## Couche MOTEUR

```text
NODE: COMBAT_ID_EXCHANGE_01
STATE: distance=reach; yohan=stable; enemy=guard_high; terrain=wet

CHOICE thrust_throat
  check: agility + swords + weapon_precision
  opposed_by: enemy_agility + defense + throat_guard
  costs: stamina 8
  dominant -> E02_enemy_choking_disarmed
  success -> E02_enemy_throat_wound
  costly -> E02_mutual_wound
  failure -> E02_yohan_off_balance
  catastrophe -> E02_yohan_impaled
```

Chaque destination est un vrai nœud avec de nouveaux choix. Les blessures ajoutées sont enregistrées dans la sauvegarde avant l'affichage du texte.

## Exemple de sortie variable

**Dominante :** Yohan détourne la pointe d'un revers, entre dans la garde et pousse son épée sous la mâchoire. La lame ressort derrière l'oreille. Quand il la retire, l'homme tombe avant son propre sang.

**Coûteuse :** Yohan atteint la gorge, mais trop tard pour éviter le couteau. L'adversaire s'effondre en gargouillant tandis qu'une chaleur humide s'étend sous les côtes de Yohan.

**Échec :** l'homme ferme sa garde. L'acier glisse, arrache des étincelles, et son épaule heurte Yohan au sternum. Le mur lui coupe la retraite.

**Catastrophe :** la feinte était attendue. La pointe ennemie entre au-dessus de la hanche et racle l'intérieur du bassin. Les jambes de Yohan cèdent ; l'épée reste en lui lorsque l'homme recule.

