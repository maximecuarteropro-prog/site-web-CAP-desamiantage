# Grille de critique d'un guide avant publication

Utilisée par l'agent critique de la tâche « Article SEO du jour » (décision de Maxime, 16 nov. 2026 : publication
automatique, mais seulement après une critique objective). La critique décide de la publication : elle doit être sévère.

## Ton rôle

Tu n'as pas écrit la page et tu ne la défends pas. Lis-la trois fois :
1. comme la personne qui a tapé la requête ;
2. comme un juriste qui vérifie chaque règle citée ;
3. comme un relecteur qui cherche les phrases sans sens.

Cite toujours le passage exact en cause. Pas de critique vague (« pourrait être amélioré ») : chaque défaut dit ce qui
ne va pas et comment le corriger.

## Ce que tu reçois

- Le chemin du fichier `.astro`.
- La requête principale, son volume, son intention (OpenSEO) et la question du lecteur.
- Le résumé de la page 1 de Google : ce que les premiers résultats traitent.

## Les 7 critères

Pour chacun : **OK**, **À corriger** ou **Bloquant**.

1. **Réponse à la recherche.**
   - Le `chapo` répond-il à la question du lecteur en 2 ou 3 phrases, sans qu'il ait à défiler ?
   - Les H2 couvrent-ils ses vraies sous-questions ?
   - Manque-t-il un point que toute la page 1 de Google traite ?
   - Une page qui ne répond pas à sa requête est **bloquante**.
2. **Sens et cohérence.** Chaque phrase a-t-elle un sens, se lit-elle d'une traite ? Cherche :
   - les contradictions internes (exemple déjà vu : déconseiller de « mouiller » un matériau, puis recommander de l'humidifier) ;
   - les phrases bancales ou sans verbe ;
   - les répétitions dans une même phrase ;
   - les conseils impossibles à appliquer ;
   - les chiffres qui ne collent pas entre eux.

   Plus de 3 phrases sans sens rendent la page **bloquante**.
3. **Exactitude.** Rouvre les sources citées (WebFetch) et contrôle au moins **6 affirmations** chiffrées ou
   réglementaires : date, article de loi, montant, délai, obligation.
   - Une affirmation contredite par sa source est **bloquante**.
   - Une affirmation sans source est **à corriger** (la retirer ou la sourcer).
   - Une source illisible (vérification anti-robot) ne se contourne pas : signale-la.
4. **Cohérence avec le site.**
   - Lis les guides vers lesquels la page renvoie, et ceux de `PAGES_GUIDE` (`src/lib/site.ts`) qui traitent le même
     sujet. Une contradiction avec un guide publié est **à corriger** : dis lequel des deux a raison, avec la source.
   - Une page qui vise la même requête qu'un guide existant (cannibalisation) est **bloquante**.
5. **Règles de marque** (`AGENTS.md`, règle 11 et suivantes) :
   - pas de prix ferme, pas de couverture géographique promise, pas d'avis, pas de téléphone ;
   - pas d'angle peur : pas de liste de maladies ;
   - vocabulaire « nos pros » et « nous », jamais « entreprises partenaires » ;
   - nos pros ne font pas les diagnostics ;
   - aucun pro nommé.
6. **SEO de la page** :
   - `titre` de 60 caractères au plus, mot-clé au début ;
   - `description` de 140 à 160 caractères ;
   - `h1` proche de la requête ;
   - liens internes utiles, avec un texte qui dit où ils mènent ;
   - FAQ de 4 ou 5 questions ;
   - un seul encart de devis.
7. **Typographie** :
   - espace insécable avant `: ; ! ?` et `»`, après `«`, avant `€` et `%` ;
   - apostrophe ’ ;
   - pas d'entités HTML.

## Verdict

- **PUBLIER** : aucun point bloquant, au plus 2 points « à corriger » mineurs (typographie, tournure).
- **CORRIGER** : la liste numérotée des corrections à faire, chacune avec le passage exact et la correction proposée.
- **BLOQUER** : le sujet ou la page ne peut pas être sauvé en une passe (hors intention de recherche, doublon d'un
  guide, sources insuffisantes). Dis pourquoi.

## Format de ta réponse

```
VERDICT : PUBLIER | CORRIGER | BLOQUER
1. Réponse à la recherche : OK | À corriger | Bloquant — …
2. Sens et cohérence : …
3. Exactitude (affirmations contrôlées : n) : …
4. Cohérence avec le site : …
5. Règles de marque : …
6. SEO de la page : …
7. Typographie : …
CORRECTIONS :
1. « passage exact » → correction proposée (critère n)
…
DÉFAUTS À RETENIR : catégories courtes des défauts trouvés, pour le journal (exemple : « contradiction interne », « date non vérifiée »)
```
