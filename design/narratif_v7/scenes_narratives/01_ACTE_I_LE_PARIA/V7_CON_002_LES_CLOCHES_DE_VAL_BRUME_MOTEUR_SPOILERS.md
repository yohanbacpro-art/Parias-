# V7_CON_002 — MOTEUR / SPOILERS

**Nature réelle :** Bréval a sacrifié des prisonniers à une entité funéraire pour sauver Éléonore d'une maladie. Le confesseur a détourné le pacte afin de réveiller « la Veuve de Craie ». Éléonore ignore les sacrifices, mais sait que son père ment.

## Négociation

- N01/C1 : 300 or ; test marchandage pour acompte. Dette purement financière.
- N01/C2 : la maison reconnaît or, terre, faveur de sang ou tradition matrimoniale. Éléonore est adulte mais son consentement doit être demandé hors présence de son père. Elle peut refuser sans annuler les autres paiements. Flag `PARIA_PRICE_CUSTOM_INVOKED=true`.
- N01/C3 : ouvre indices complets et réduit difficulté d'enquête.
- N01/C4 : Bréval avoue un « rite de guérison » sans révéler les victimes ; contrat possible à 450 or.

## Enquête et confrontation

- Maison du confesseur : talisman neutralisant la cloche ; preuve contre Bréval.
- Faire sonner la cloche : COMBAT contre deux revenants, mais révèle le conduit d'Onde.
- Descente immédiate : compte à rebours court, six otages en danger.
- Brutaliser verbalement Éléonore : confiance -15 ; elle livre néanmoins l'information si devoir familial < sens moral.

N03/C1 → COMBAT_CON_002 contre confesseur puis Veuve partiellement éveillée.  
N03/C2 → test puissance ou outil trouvé ; succès affaiblit la Veuve, échec blesse deux otages.  
N03/C3 → test rapidité ; sauve 2–6 personnes, mais Veuve gagne une phase.  
N03/C4 → obtient confession enregistrable ; Veuve s'éveille entièrement.

Défaite : Yohan peut fuir avec survivants ; Val-Brume est évacué et la Veuve devient menace régionale. Ce n'est pas un game over.

## Retour et effets

- Secret gardé : or reçu, Bréval relation +20, `BREVAL_SECRET_KEPT=true`, corruption morale/rumeur future.
- Double paiement : test pression avec preuves ; 600–900 or, rancune Bréval +25.
- Vérité au village : révolte ou procès selon nombre de survivants ; réputation populaire +20.
- Éléonore décide : avec confiance ≥ 10, elle force l'abdication et devient alliée ; sinon elle brûle une preuve pour protéger sa maison tout en indemnisant les familles.
- Autorité religieuse : Bréval arrêté, mais l'Église confisque les archives sur l'Onde.

## Long terme

Éléonore peut devenir baronne, exilée, réformatrice ou adversaire. Les survivants forment une confrérie de guetteurs si au moins quatre ont vécu. La Veuve échappée réapparaît lors d'une bataille en Acte III, attirée par les charniers. Toute relation intime ultérieure avec Éléonore dépend de choix réciproques, de confiance et de temps ; le paiement traditionnel ne crée jamais une romance automatique.
