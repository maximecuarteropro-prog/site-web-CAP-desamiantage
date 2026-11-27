# File d'attente des guides SEO

Processus de publication automatique (décision de Maxime, 16 nov. 2026), tâche planifiée « Article SEO du jour » :

1. Vérifier le mot-clé avec OpenSEO : volume, intention, page 1 de Google, pas de doublon.
2. Rédiger le guide selon `contenu/consigne-redaction.md`.
3. Le faire critiquer par un agent indépendant selon `contenu/grille-critique.md`.
4. Corriger, avec au plus 2 tours de critique.
5. Publier si le verdict est PUBLIER.

Sinon, le guide reste en brouillon sur une branche `brouillon/<chemin>` et Maxime est prévenu. Chaque critique est
notée dans `contenu/journal-critiques.md`.

Volumes : recherches mensuelles en France (OpenSEO), relevées le 11 nov. 2026 et revérifiées avant chaque rédaction.

**Statuts :**
- `à faire` ;
- `brouillon` : bloqué par la critique, en attente de Maxime ;
- `publié` ;
- `écarté` : avec la raison.

## À faire

| Ordre | Chemin | Requête principale | Requêtes secondaires | Question du lecteur | Statut |
|---|---|---|---|---|---|
| 11 | `/mesure-empoussierement-amiante` | mesure empoussièrement amiante (70) | | Qu'est-ce qu'une mesure d'empoussièrement, quand est-elle obligatoire, qui la fait, combien coûte-t-elle ? | à faire |
| 12 | `/desamiantage-hangar-agricole` | toiture hangar amiante (10) | hangar amiante (10), bâtiment agricole amiante | Volume faible mais chantiers de grande valeur : retrait d'une toiture de hangar ou de stabulation, délais, déchets, aides éventuelles. | à faire |
| 13 | `/analyse-amiante` | analyse amiante (210, informationnelle) | prélèvement amiante (90, informationnelle) ; groupe de 300, vérifié le 27 nov. 2026 | Comment faire analyser un matériau pour savoir s'il contient de l'amiante : qui prélève, quel laboratoire, quel délai, quel prix ? (page 1 : laboratoires, diagnostiqueurs, service-public, sante.gouv ; ne pas refaire `/diagnostic-amiante-avant-travaux`) | à faire |
| 14 | `/bardage-amiante` | bardage amiante (50, intention transactionnelle selon OpenSEO), vérifié le 27 nov. 2026 | plaque ondulée amiante (50, non revérifiée en page 1) | J'ai un bardage ou des plaques en fibrociment amianté sur ma façade : le garder, le recouvrir ou le retirer, et à quel prix ? (page 1 : guides et désamianteurs) | à faire |

## Publiés

| Chemin | Requête principale | Publié le |
|---|---|---|
| `/prix-desamiantage` | prix désamiantage (590) | 29 oct. 2026 |
| `/prix-remplacement-toiture-amiante` | remplacer toiture fibro ciment amiante prix (390) | 29 oct. 2026 |
| `/desamiantage-toiture-amiante` | désamiantage toiture (720) | 29 oct. 2026 |
| `/toiture-amiante-que-faire` | toiture en amiante que faire (170) | 29 oct. 2026 |
| `/certification-sous-section-3` | sous section 3 amiante (170) | 29 oct. 2026 |
| `/dechetterie-amiante` | déchetterie amiante | 4 nov. 2026 |
| `/reconnaitre-toiture-amiante` | reconnaître amiante (1 000) | 11 nov. 2026 |
| `/vendre-maison-toiture-amiante` | peut-on vendre une maison avec un toit en amiante (390) | 11 nov. 2026 |
| `/diagnostic-amiante-avant-travaux` | diagnostic amiante avant travaux (880) | 11 nov. 2026 |
| `/retrait-dalles-sol-amiante` | dalle amiante (260) | 11 nov. 2026 |
| `/flocage-calorifugeage-amiante` | flocage amiante (480) | 11 nov. 2026 |
| `/amiante-maison` | amiante dans une maison (2 400) | 11 nov. 2026 |
| `/dossier-technique-amiante` | dta amiante (1 000) | 11 nov. 2026 |
| `/amiante-murs-platre-enduit` | amiante dans les murs (720) | 12 nov. 2026 |
| `/tuyau-conduit-amiante` | amiante tuyau (320) | 12 nov. 2026 |
| `/sous-section-4-amiante` | sous section 4 amiante (480) | 12 nov. 2026 |
| `/aides-desamiantage` | aide désamiantage particulier (110) | 12 nov. 2026 |
| `/carrelage-colle-amiante` | colle carrelage amiante (210) | 13 nov. 2026 |
| `/plan-de-retrait-amiante` | plan de retrait amiante (320) | 19 nov. 2026 (après 8 tours de critique) |
| `/amiante-location` | amiante location (110) | 23 nov. 2026 (brouillon repris, PUBLIER au tour 2) |
| `/demolition-amiante` | démolition amiante (40), groupe de 130 avec diagnostic amiante avant démolition (70), vérifiés le 24 nov. 2026 | 24 nov. 2026 (PUBLIER au tour 2) |
| `/nettoyage-toiture-amiante` | démoussage toiture amiante (40), groupe de 130 avec nettoyage toiture amiante (40), traitement toiture amiante (30), peinture toiture amiante (20), vérifiés le 25 nov. 2026 | 25 nov. 2026 (PUBLIER au tour 2) |
| `/toiture-amiante-voisin` | toiture amiante voisin (70), revérifié le 26 nov. 2026 | 26 nov. 2026 (brouillon repris, PUBLIER au tour 2) |

## Écartés

| Sujet | Raison |
|---|---|
| fibrociment sans amiante (390), plaque fibrociment sans amiante (210), tuile amiante (390), amiante ciment (390) | Déjà couverts par `/reconnaitre-toiture-amiante`, ou surtout des acheteurs de plaques neuves |
| encapsulage toiture amiante prix (210) | Requête secondaire de `/toiture-amiante-que-faire` : une seconde page se ferait concurrence |
| toiture fibrociment (1 600) | Surtout des acheteurs de plaques neuves |
| santé (« j'ai respiré de l'amiante ») | Sujet médical, aucune demande de chantier au bout, et règle « pas d'angle peur » |
| faux plafond amiante (320) | Page 1 du 27 nov. 2026 : surtout des fabricants et des prix de faux plafonds neufs ; le faux plafond amianté est déjà traité par `/flocage-calorifugeage-amiante` |
| conduit cheminée amiante (70) | Page 1 du 27 nov. 2026 : tubage, fabricants et forums ; sujet couvert par `/tuyau-conduit-amiante` |
| fibre amiante (320) | Page 1 du 27 nov. 2026 : banques d'images, Wikipédia, santé ; aucune demande de chantier au bout |
| désamiantage soi-même | Attire des personnes qui veulent justement ne pas faire appel à un pro |
