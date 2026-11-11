# Écrire un guide SEO pour Cap Désamiantage

Méthode suivie pour les guides publiés le 11 nov. 2026, et par la tâche planifiée « Article SEO du jour ».
Les règles du site sont dans `AGENTS.md` : elles priment sur ce fichier.

## 0. À lire avant d'écrire

- `AGENTS.md` en entier, surtout les règles 1.2 à 1.4, 1.9 à 1.11 et 12.
- `src/layouts/Guide.astro` (props, types `Source` et `Question`) et `src/components/EncartDevis.astro`.
- Deux guides modèles : `src/pages/toiture-amiante-que-faire.astro` et `src/pages/diagnostic-amiante-avant-travaux.astro`.
- `PAGES_GUIDE` dans `src/lib/site.ts` : la liste des guides déjà en ligne. Un sujet déjà traité ne se réécrit pas : on renvoie vers lui.

## 1. Trouver la question du lecteur

1. Lis la page 1 de Google sur mobile pour la requête principale, avec l'outil OpenSEO `get_serp_results`
   (projet « Cap Désamiantage », id `365a0841-3092-419f-b9ef-30a7ae675ac4`, `device: "mobile"`).
2. Note ce que les premiers résultats couvrent, et ce qui leur manque.
3. Écris en une phrase la question que se pose la personne qui tape la requête. Toute la page y répond.

## 2. Lire les sources

- Sources officielles d'abord, lues pour de vrai : Légifrance, service-public.fr, travail-emploi.gouv.fr, sante.gouv.fr,
  ecologie.gouv.fr, INRS, ADEME, ANIL, DREETS, Trackdéchets.
- Prix : guides de prix publiés et datés (Habitatpresto, ABC Travaux, Construires.fr…). Jamais le site d'un concurrent
  qui fait des travaux.
- Une page bloquée par une vérification anti-robot ne se contourne pas : on prend une autre source.
- **N'invente rien.** Pas d'article de loi cité sans l'avoir lu, pas de chiffre sans source datée. Si deux sources
  officielles se contredisent, la page donne les deux et le note dans le commentaire de tête. En cas de doute, écris moins.

## 3. Écrire la page `src/pages/<chemin>.astro`

- **`chapo`** : la réponse à la question, en 2 ou 3 phrases directes. C'est ce que Google reprend.
- **H2** : les sous-questions réelles du lecteur, formulées comme il les pose. Pas de saut de niveau (h2 puis h3).
- **Longueur** : 1 200 à 1 800 mots de corps.
- **Tableau** si une comparaison l'appelle, dans `<div class="tableau">`, avec une `caption` qui cite ses sources.
- **Sources** : chaque chiffre et chaque règle est cité dans le texte (article, fiche, guide de prix) et figure dans le
  tableau `sources` (`titre`, `url`, `date`).
- **Encart de devis** : un seul `<EncartDevis accroche="…" />`, après la section qui donne envie d'agir. L'accroche
  est liée à cette section, finit par un point et parle de « l'un de nos pros ».
- **FAQ** : 4 ou 5 questions voisines, passées par la prop `faq`, en texte sans HTML.
- **Liens internes** : vers les guides de `PAGES_GUIDE` qui servent vraiment le lecteur. Le texte du lien dit où il mène.
- **Props** :
  - `titre` : 60 caractères au plus, mot-clé au début ;
  - `description` : 140 à 160 caractères, avec un chiffre ou une preuve ;
  - `h1` : proche de la requête ;
  - `rubrique` : courte ;
  - `publie` et `misAJour` : la date du jour (AAAA-MM-JJ).
- **Commentaire de tête** : ce qui a été relu, quand, et les points incertains.
- **Interdits** (règle 11 de `AGENTS.md`) :
  - pas de prix ferme ;
  - pas de couverture géographique promise ;
  - pas d'avis ;
  - pas d'angle peur : on informe sur le risque sans lister les maladies ;
  - pas de téléphone ;
  - pas de pro nommé.

  Nos pros retirent l'amiante : ils ne font pas les diagnostics.
- **Vocabulaire** : « nos pros », « nous », jamais « entreprises partenaires ». Les travaux sont faits par nos pros,
  jamais par « nous ».
- **Typographie** :
  - apostrophe ’ ;
  - espace insécable avant `: ; ! ?` et `»`, après `«`, avant `€` et `%`, et entre un nombre et son unité ;
  - séparateur de milliers : espace fine insécable (U+202F) ;
  - de vrais caractères dans le fichier, pas d'entités HTML.

## 4. Relire face à la recherche

Relis la page comme la personne qui a tapé la requête :

1. Le `chapo` répond-il à sa question sans qu'elle ait à défiler ?
2. Chaque H2 répond-il à une question qu'elle se pose (ou que Google affiche dans « Autres questions ») ?
3. Chaque affirmation a-t-elle sa source, lue ? Retire ce qui n'en a pas.
4. La page contredit-elle un guide existant ? Aligne-la, ou explique l'écart avec sa source.
5. Les interdits, le vocabulaire et la typographie sont-ils respectés ?

Corrige avant de passer à la suite.

## 5. Intégrer et vérifier

1. Ajoute la page dans `PAGES_GUIDE` (`src/lib/site.ts`), près des guides du même thème.
2. `npm run build` passe sans erreur ni avertissement.
3. Dans `.vercel/output/static/<chemin>/index.html` :
   - un seul `<h1>`, pas de saut de niveau ;
   - title de 60 caractères au plus, description de 140 à 160 caractères ;
   - JSON-LD `BreadcrumbList`, `Article` et `FAQPage` ;
   - aucun lien interne cassé.
4. Dans `contenu/file-articles.md`, passe le sujet au bon statut.

Si plusieurs rédacteurs écrivent en parallèle, chacun ne fait que les étapes 1 à 4 sur sa page, sans toucher aux
autres fichiers, et l'étape 5 est faite une seule fois à la fin.
