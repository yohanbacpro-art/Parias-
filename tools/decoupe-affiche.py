#!/usr/bin/env python3
"""PARIAS — Découpe des illustrations depuis les planches sources.

    python3 tools/decoupe-affiche.py

Les deux originaux vivent dans assets/sources/. Ce script en extrait les
portraits et les bandeaux aux chemins que le jeu cherche :

    assets/portraits/<id>.webp   médaillon carré, recadré en rond à l'affichage
    assets/events/<id>.webp      bandeau d'événement, recadré en 5:2

Les coordonnées sont en pixels de l'affiche d'origine (1024×1536) et ont été
calées à la main. Elles sont ici pour que la découpe soit refaisable — si
l'affiche est régénérée, c'est ce fichier qu'il faut reprendre.

Dépendance : Pillow (pip install Pillow).
"""
import os
from PIL import Image

RACINE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(RACINE, 'assets', 'sources')
AFF = Image.open(os.path.join(SRC, 'affiche-lore.png'))
YOH = Image.open(os.path.join(SRC, 'yohan-de-karlsberg.png'))

# ---- Portraits : (identifiant, centre x, centre y, demi-côté) sur l'affiche ----
VISAGES = [
    ('charles',   586, 280, 74), ('lucius',    747, 267, 76),
    ('alycia',    919, 272, 79), ('tyrion',    443, 642, 75),
    ('alarielle', 658, 636, 75), ('caleb',     870, 655, 75),
    ('eltharion',  85, 932, 55), ('anarion',   251, 932, 55),
    ('kemval',    419, 934, 55), ('khalvaene', 570, 936, 55),
    ('leopold',   727, 945, 48), ('isolde',    899, 934, 55),
]
# Yohan a sa propre planche, bien mieux définie.
YOHAN_BOITE = (300, 150, 730, 580)

# ---- Bandeaux des familles d'événements : les huit panneaux « Peuples » ----
# Pas régulier mesuré sur l'affiche : 121,3 px, panneaux de 109 px de large.
PEUPLES = ['ville', 'paria', 'khesh', 'elfe', 'elfe_noir', 'nain', 'homme_bete', 'peau_verte']
PEUPLES_X = {p: int(11 + 121.3 * i) for i, p in enumerate(PEUPLES)}
PEUPLES_X['peau_verte'] = 872          # le dernier panneau dérive : recalé à la main
PEUPLES_Y = (1145, 1262)

# ---- Deux illustrations d'ambiance prises ailleurs sur l'affiche ----
AMBIANCES = {
    'evt_onde':   (208, 145, 330, 480),    # les deux frères et le choc de l'Onde
    'evt_voyage': (352, 1405, 672, 1530),  # la carte de Vardhen
}

def ecrire(img, chemin, taille, qualite=88):
    os.makedirs(os.path.dirname(chemin), exist_ok=True)
    img.resize(taille, Image.LANCZOS).convert('RGB').save(chemin, 'WEBP', quality=qualite)
    return os.path.getsize(chemin)

def main():
    total = 0
    portraits = os.path.join(RACINE, 'assets', 'portraits')
    events = os.path.join(RACINE, 'assets', 'events')

    total += ecrire(YOH.crop(YOHAN_BOITE), os.path.join(portraits, 'yohan.webp'), (512, 512), 90)
    n = 1
    for nom, cx, cy, r in VISAGES:
        total += ecrire(AFF.crop((cx-r, cy-r, cx+r, cy+r)),
                        os.path.join(portraits, nom + '.webp'), (384, 384))
        n += 1

    m = 0
    for peuple, x0 in PEUPLES_X.items():
        total += ecrire(AFF.crop((x0, PEUPLES_Y[0], x0+109, PEUPLES_Y[1])),
                        os.path.join(events, 'evt_%s.webp' % peuple), (436, 468))
        m += 1
    for nom, boite in AMBIANCES.items():
        c = AFF.crop(boite)
        total += ecrire(c, os.path.join(events, nom + '.webp'), (c.width*3, c.height*3))
        m += 1

    print('%d portraits · %d bandeaux · %.0f Ko au total' % (n, m, total/1024))

if __name__ == '__main__':
    main()
