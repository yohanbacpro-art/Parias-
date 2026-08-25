# V7_TAV_001 — MOTEUR / SPOILERS

**Type :** événement de taverne récurrent, résolution sociale ou combat.  
**Prérequis :** `ARMAND_ALIVE=true`, scène non jouée, lieu humain, réputation locale < 70.  
**Exclusion :** Mara mineure (interdit), Armand déjà emprisonné, guerre active dans la localité.

## Variables lues

`REPUTATION_LOCAL`, `INTIMIDATION`, `GOLD`, `PARIA_SUSPICION`, `PREVOT_CORRUPTION`, `MARA_TRUST`, titres publics de Yohan.

## Graphe

- N01/C1 → `TAV_001_IGNORED=true`, Mara confiance -15. Armand gagne `IMPUNITY+1`. Rappel possible sous 30–90 jours : une autre victime ou Mara devenue témoin hostile.
- N01/C2 → test intimidation. Succès : N02. Échec : COMBAT_TAV_001.
- N01/C3 → respect populaire +4, Armand humiliation +20 ; combat sauf si réputation locale ≥ 45.
- N01/C4 → coûte 12 or. Armand accepte seulement si cupidité + peur > orgueil. Sinon combat. Mara n'apprécie pas d'être « achetée » : confiance -3, mais sécurité immédiate.
- N01/C5 → combat immédiat ; réputation `VIOLENT` +6 et premier tour d'initiative à Yohan.

### N02

- C1 : Armand part ; dette de Mara +1, rancune Armand +10.
- C2 : Mara choisit selon ses traits. Par défaut, réparation et départ. Confiance Mara +12, réputation juste +5.
- C3 : test intimidation difficile. Succès : humiliation publique majeure. Échec : combat avec bonus de rage pour Armand.
- C4 : fin pacifique ; rancune faible, aucune dette.

### COMBAT_TAV_001

Participants : Yohan contre Armand et deux gardes. Terrain encombré ; civils présents ; attaques de zone risquent de blesser un témoin. Défaite non létale par défaut : Yohan dépouillé, blessé et jeté dehors ; Mara peut l'aider si confiance ≥ 5. Victoire → N03.

### N03

- C1 : `ARMAND_SPARED=true`, rancune +15 ; 35 % de repentir si respect de Yohan > peur.
- C2 : paiement 80 or réparti entre Mara et aubergiste ; `ARMAND_FORCED_REPARATION=true`; soutien populaire +12.
- C3 : si prévôt corrompu > 60, Armand est libéré sous 7 jours et connaît les témoins ; sinon procès local.
- C4 : `LORD_ARMAND_HUMILIATED_BY_YOHAN=true`, rancune +35, rumeur +20.
- C5 : `ARMAND_ALIVE=false`, suspicion noble +15, maison Velroc hostilité +40 ; déclenche succession.

## Conséquences longues

- 90–240 jours : Armand épargné peut provoquer Yohan en duel, engager des assassins ou renoncer selon peur/respect et pression familiale.
- Acte II : Maison Velroc rejoint une coalition anti-Karlsberg si humiliation ≥ 30 ; inversement Mara peut apporter le témoignage qui fracture cette coalition.
- 3–10 ans : si Mara a reçu autonomie et réparation, elle peut devenir propriétaire de l'auberge puis relais de renseignement. Si Yohan l'a ignorée, elle peut toutefois survivre et agir sans lui ; ne pas réduire son destin à sa relation avec Yohan.

