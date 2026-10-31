# Règles pour coder sur ce dépôt (SEO et performance)

Site de Cap Désamiantage : mise en relation entre propriétaires et entreprises de désamiantage
certifiées amiante sous-section 3. Le site vit du référencement naturel : chaque règle ci-dessous
protège une page qui doit être lue par Google, Bing et les robots d'IA.

Depuis le 29 oct. 2026, le site est en **Astro 7, avec les composants React en îlots**. La
version Vite d'origine (`vite.config.ts`, `index.html`, `main.tsx`, tRPC, React Router) a été
retirée exprès : ne la réintroduis pas.

## 1. À ne jamais casser

1. **Tout le texte est dans le HTML au build.** Les composants React sont rendus côté serveur.
   `client:visible` ou `client:idle` seulement pour ce qui réagit au clic (formulaire, sélection
   du type de chantier). Jamais `client:only`, jamais de texte chargé par `fetch` dans le navigateur,
   jamais de contenu qui n'apparaît qu'après une action.
   Contrôle : après `npm run build`, le H1 et les paragraphes sont lisibles dans
   `.vercel/output/static/index.html`.
2. **Balises de tête : uniquement par `src/layouts/Base.astro`.** Chaque page passe `titre`,
   `description` et `chemin`. Canonical, Open Graph et données structurées en découlent.
   Pas de `<title>` ni de `<meta>` écrits ailleurs.
   - `titre` : 60 caractères au plus, mot-clé principal au début.
   - `description` : 140 à 160 caractères ; elle dit ce que la page apporte et donne un chiffre ou une preuve.
3. **URL.** Minuscules, mots séparés par des tirets, sans `/` final (`trailingSlash: 'never'`).
   Une URL publiée ne change plus. `/mentions-legales` et `/confidentialite` sont citées par le
   formulaire Meta : ne pas les renommer.
4. **Titres.** Un seul `<h1>` par page. Pas de saut de niveau (h2, puis h3). Un titre sert à
   structurer, pas à styler : les surtitres (« Comment ça marche », « Types de chantiers ») restent
   des `<span>` ou des `<p>`.
5. **Images.**
   - Fichiers dans `src/assets/`, passés par `astro:assets` (`getImage` ou `<Image>`) en WebP ou AVIF,
     avec plusieurs largeurs.
   - Jamais d'image chargée depuis un autre site.
   - `width` et `height` toujours renseignés.
   - `alt` descriptif en français pour une image qui montre quelque chose ; `alt=""` seulement
     pour une image décorative.
   - Image du premier écran : `fetchpriority="high"`, préchargée, sans `loading="lazy"`.
     Les autres images : `loading="lazy"`.
6. **Premier affichage.**
   - Le H1 et l'image du hero doivent être visibles dès le premier rendu. Pas d'animation d'entrée
     qui part de `opacity: 0` ou d'un `clip-path` masquant sur ces deux éléments : Google mesure
     l'affichage du plus gros élément (LCP) à la fin de l'animation.
   - Animer `transform` plutôt que l'opacité, en 300 ms au plus, et respecter
     `prefers-reduced-motion`.
   - Objectifs sur mobile : LCP sous 2,5 s, CLS sous 0,1, INP sous 200 ms.
7. **JavaScript.**
   - Aujourd'hui, React ne se charge qu'à l'arrivée sur le formulaire (`client:visible`). Garde ce
     fonctionnement : pas de nouvel îlot dans le premier écran, pas de `client:load` sur une grande
     section.
   - Pas de bibliothèque d'animation (framer-motion, GSAP) : les animations se font en CSS.
   - Un petit effet se fait dans un `<script>` Astro, comme la parallaxe de `index.astro`.
8. **Police.** Archivo, hébergée dans `public/fonts/`. Pas de Google Fonts (transfert d'adresse IP),
   pas de nouvelle famille de police.
9. **Liens internes.**
   - Toujours un vrai `<a href="/chemin">` : pas de navigation par `onClick`, pas de `<button>`
     pour changer de page.
   - Le texte du lien dit où il mène (« prix du désamiantage au m² »), jamais « en savoir plus » ni
     « cliquez ici ».
   - Pas de lien dans un lien : une carte entièrement cliquable ne peut pas contenir un second lien.
   - Pas d'`aria-label` sur un lien dont le texte visible suffit. S'il en faut un, il commence par
     le texte visible. À corriger sur l'accueil : les cartes de `ProjectTypes.tsx`, et le logo de
     `Hero.tsx`, où il manque une espace entre `cap` et `désamiantage`. Le correctif est déjà fait
     dans `SiteHeader.astro`.
10. **Données structurées.**
    - Elles passent par la prop `donnees` de `Base.astro`. `Organization` et `WebSite` y sont déjà :
      ne les duplique pas.
    - Interdits : `LocalBusiness` (on ne réalise pas les travaux), `Review`, `AggregateRating`
      (aucun avis inventé).
    - `FAQPage` seulement si la FAQ est affichée sur la page, mot pour mot.
11. **Texte.**
    - Espace insécable avant `: ; ! ?`, avant `€` et `%`, et entre un nombre et son unité.
      Séparateur de milliers : espace fine insécable (U+202F), par exemple 12 000 €.
    - Interdits de marque (PRODUCT.md) : pas de prix ferme, pas de couverture géographique promise
      (« partout en France », « près de chez vous »), pas de chiffre ni d'avis inventé, pas d'angle peur.
    - Chaque chiffre porte sa source et sa date, ou renvoie à la page qui les donne.
    - Seule exception, décidée par Maxime le 1er nov. 2026 : le bandeau de preuves
      (`src/sections/BandeauPreuves.astro`) affiche « +1 000 chantiers réalisés », chiffre déclaré
      par les entreprises partenaires, sans attribution. Ne le retire pas, ne le modifie pas, et
      n'ajoute pas d'autre chiffre de ce type sans lui demander.
    - La certification se formule comme une propriété des entreprises du réseau : elles sont toutes
      certifiées sous-section 3.
12. **Hors périmètre de l'accueil, ne pas modifier sans le demander :**
    - `astro.config.mjs`, `public/robots.txt`, `src/lib/site.ts` ;
    - `src/layouts/Guide.astro` et les cinq pages guides ;
    - `mentions-legales.astro`, `confidentialite.astro`, `src/pages/api/demande.ts` ;
    - refaits le 1er nov. 2026 à la demande de Maxime : `src/sections/Process.tsx` (ligne de temps
      façon Indemnis, texte des étapes inchangé), `src/sections/BandeauPreuves.astro` (sous le hero)
      et le nom en grand du pied de page (`SiteFooter.astro`, `.site-footer-wordmark`).

## 2. La page d'accueil

**Requête visée :** « entreprise désamiantage » (720 recherches/mois).
**Requêtes secondaires :** « société de désamiantage », « entreprise désamiantage pour
particulier », « désamiantage particulier », « retrait amiante particulier ».
Aucune autre page du site ne vise ces requêtes : l'accueil est la seule à pouvoir les gagner.

1. **Title.** Garder « Entreprise de désamiantage certifiée | Cap Désamiantage » (55 caractères),
   ou une variante qui commence par les mêmes mots.
2. **H1.** Il doit contenir « désamiantage », et si possible « entreprise » et « certifiée ».
   Aujourd'hui, « Votre désamiantage, sans le stress » ne dit pas ce qu'on propose. Le ton de marque
   peut rester, par exemple « Une entreprise de désamiantage certifiée, sans le stress ».
3. **Les deux premières phrases** disent ce qu'on fait et pour qui :
   - une mise en relation avec une entreprise certifiée sous-section 3 ;
   - pour les particuliers, les agriculteurs, les copropriétés et les entreprises ;
   - gratuite, devis après visite.
   Aujourd'hui, ni « particulier » ni « sous-section 3 » n'apparaissent sur l'accueil.
4. **Liens vers les guides dans le contenu** (aujourd'hui, seulement dans le pied de page) :
   - près de « Uniquement des entreprises certifiées » ou du badge : lien vers
     `/certification-sous-section-3` (« comment vérifier une certification sous-section 3 ») ;
   - près de « première fourchette de prix » : lien vers `/prix-desamiantage` ;
   - près du délai d'environ un mois : lien vers `/desamiantage-toiture-amiante`
     (le plan de retrait, déposé 30 jours avant) ;
   - une section « Avant de vous lancer » avec les cinq guides et leur titre en texte du lien.
     La liste est dans `PAGES_GUIDE` (`src/lib/site.ts`) : réutilise-la, ne recopie pas les URL.
     Les cartes « Quel est votre projet ? » pointent vers `#devis` : n'y imbrique pas de second lien.
5. **Sections à ajouter**, courtes, entre 900 et 1 500 mots en tout sur la page :
   - **Pour qui :** particuliers, agriculteurs, copropriétés, entreprises.
   - **Pourquoi une entreprise certifiée sous-section 3 :** trois phrases et un lien vers la page
     certification.
   - **Combien ça coûte :** trois lignes de fourchettes reprises de `/prix-desamiantage`, avec la
     source et la date, et un lien vers la page.
     - toiture en fibrociment : 40 à 100 €/m², déchets compris ;
     - dalles : 25 à 80 €/m² ;
     - flocage : 60 à 250 €/m² ;
     - sources : relevés du 29 oct. 2026.
   - **Questions fréquentes** (4 ou 5), avec un `FAQPage` en JSON-LD.
     - Exemples : « Qui peut retirer de l'amiante ? », « Combien coûte un désamiantage ? »,
       « Le service est-il payant ? », « Combien de temps avant le chantier ? ».
     - Les réponses ne contredisent pas les guides.
6. **Données structurées de l'accueil.** Ajoute un `FAQPage` si la FAQ existe, par la prop `donnees` :
   ```astro
   <Base titre="…" description="…" chemin="/" donnees={[{ '@type': 'FAQPage', mainEntity: faq.map(({ question, reponse }) => ({ '@type': 'Question', name: question, acceptedAnswer: { '@type': 'Answer', text: reponse } })) }]}>
   ```
   Le même tableau `faq` sert à afficher la FAQ, pour que le texte soit identique.
7. **Image du hero.** Donne-lui un `alt` descriptif, par exemple « Opérateur en combinaison
   retirant une plaque de fibrociment ». Retire le `aria-hidden` qui l'entoure si elle porte du sens.
   Supprime l'animation d'entrée qui la masque (`visual-enter`, `image-enter`) ainsi que celle du titre
   (`title-enter`). Voir la règle 1.6.
8. **Promesses de délai cohérentes.** Le bandeau dit « −24 h de temps de réponse », l'étape 2 et le
   formulaire « sous 24 h ». Aligne le hero, qui dit encore « dans la journée », sur 24 h.

## 3. Avant de rendre la main

1. `npm run build` passe sans erreur ni avertissement.
2. Le texte de l'accueil est dans `.vercel/output/static/index.html` : un `grep` sur une phrase
   du H1 doit la trouver.
3. Aucun lien interne cassé, aucune image sans `width`, `height` ou `alt`.
4. Lighthouse mobile sur l'accueil :
   - SEO à 100 ;
   - accessibilité à 95 ou plus ;
   - LCP sous 2,5 s, CLS sous 0,1.
5. Le JSON-LD passe sur https://validator.schema.org (coller le HTML de la page).
6. Le rendu visuel est vérifié sur mobile (390 px) et sur ordinateur.
