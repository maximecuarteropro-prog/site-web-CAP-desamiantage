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
   - Pas de légende « Photo d’illustration » (Maxime, 4 nov. 2026). Sur les pages par zone, l'habillage des photos est dans `.zone-photo`.
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
8. **Police.** Archivo, dans `src/assets/fonts/` (passée par Vite : nom versionné, cache illimité ; la licence
   reste dans `public/fonts/`). Pas de Google Fonts (transfert d'adresse IP), pas de nouvelle famille de police.
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
      (`src/sections/BandeauPreuves.astro`) affiche « +1 000 chantiers réalisés par nos pros », chiffre
      déclaré par nos pros. Ne le retire pas, ne le modifie pas, et
      n'ajoute pas d'autre chiffre de ce type sans lui demander.
    - **Vocabulaire (décision de Maxime, 1er nov. 2026) :** le site parle de « nos pros » et de « nous », comme un
      seul réseau. Jamais « entreprises partenaires » ni « entreprise » pour celui qui fait les travaux. Tous nos pros
      sont certifiés sous-section 3. Les travaux sont faits par « nos pros », jamais par « nous ».
      Exceptions : les titres des sources, les listes officielles (« liste des entreprises certifiées »), les clients
      (« entreprise ou collectivité ») et les pages légales, qui disent que nos pros sont des entreprises certifiées
      indépendantes (obligation d'information).
12. **Hors périmètre de l'accueil, ne pas modifier sans le demander :**
    - `astro.config.mjs`, `public/robots.txt`, `src/lib/site.ts` ;
    - `src/layouts/Guide.astro` et les cinq pages guides ;
    - `mentions-legales.astro`, `confidentialite.astro`, `src/pages/api/demande.ts` ;
    - refaits le 1er nov. 2026 à la demande de Maxime : `src/sections/Process.tsx` (ligne de temps
      façon Indemnis, texte des étapes inchangé), `src/sections/BandeauPreuves.astro` (sous le hero)
      et le nom en grand du pied de page (`SiteFooter.astro`, `.site-footer-wordmark`) ;
    - refaits le 1er nov. 2026 (suite) : le bandeau de menu collant (`SiteHeader.astro`, sur toutes les pages,
      accueil compris), le formulaire (`QuoteForm.tsx` et `contracts/demande.ts` : les questions du formulaire
      Meta, avec leurs libellés exacts, que le Lead Router qualifie), la route `src/pages/api/demande.ts`
      (branchée au Lead Router, variable Vercel `LEAD_ROUTER_ENDPOINT` ; les champs `suivi_…` y restent internes,
      jamais envoyés au pro) ;
    - ajouté le 1er nov. 2026 à la demande de Maxime : l'encart de devis au milieu des guides
      (`src/components/EncartDevis.astro`, un par guide, placé à la main avec une `accroche` liée à la section
      d'avant ; photo `src/assets/encart-devis.jpg` générée par kie.ai).
13. **Pas de numéro de téléphone** sur le site tant qu'il n'y a pas de standard (Maxime, 1er nov. 2026).
14. **Pages par zone** (`src/pages/desamiantage-<zone>.astro`, liste dans `src/lib/zones.ts`, décision de Maxime, 4 nov. 2026).
    - Page orientée devis : la personne cherche un pro. Le détail des déchets et des filières va dans `/dechetterie-amiante`,
      une phrase seulement sur les pages par zone.
    - Gabarit `src/layouts/ZoneDevis.astro` (validé par Maxime sur Toulon, 4 nov. 2026) : formulaire dans le premier écran,
      preuves, puis le texte, écrit à la main pour chaque page. La section avec photo passe par `src/components/BlocPro.astro`.
      - `src/components/FormulaireEtapes.astro` : une question à la fois, sans React (script Astro, règle 1.7). Mêmes questions, libellés
        et envoi que `QuoteForm.tsx`. La case de consentement est écrite aux deux endroits : changer les deux ensemble.
      - Réassurance reprise de l'accueil : badge, carte sur la photo, bandeau de preuves, gratuité et délai indicatif.
      - Menu réduit (`SiteHeader reduit`) et lien de devis du pied de page vers le formulaire de la page (`SiteFooter devis="#devis"`).
      - Les sources sont dans un `<details>`, seule exception à la règle 1.1 : leur texte reste dans le HTML. La FAQ reste affichée.
    - Une page partout où il y a de la demande (décision de Maxime, 4 nov. 2026) : les leads d'une zone sans pro sous contrat sont
      vendus au lead à des partenaires. La promesse du formulaire ne change pas : un pro certifié sous-section 3 rappelle sous 24 h.
    - Aucun pro nommé, signé ou non, ni sur le site, ni dans les données structurées, ni dans les créas par zone, sauf décision
      contraire de Maxime (4 nov. 2026). Le site ne promet pas de donner le nom : le pro se présente lui-même quand il rappelle.
    - Chaque page est écrite à la main avec des faits locaux sourcés et datés : Insee (tableaux LOG T3 et LOG T8), permis de
      démolir de Sitadel, annuaire ADEME des déchèteries, règlements des collectivités. Jamais de gabarit où seul le nom
      de la ville change : Google le classe en pages satellites.
    - Les règles locales changent vite (Aix-Marseille-Provence, Courrières) : relire les pages et leur date au moins
      une fois par an. Le chiffre de l'Insee s'arrête à 1990, il ne prouve pas la présence d'amiante : le dire sur la page.
    - Pas de prix par ville : renvoyer vers `/prix-desamiantage`.

## 2. La page d'accueil

**Requête visée :** « entreprise désamiantage » (720 recherches/mois).
**Requêtes secondaires :** « société de désamiantage », « entreprise désamiantage pour
particulier », « désamiantage particulier », « retrait amiante particulier ».
Aucune autre page du site ne vise ces requêtes : l'accueil est la seule à pouvoir les gagner.

1. **Title.** Garder « Entreprise de désamiantage certifiée | Cap Désamiantage » (55 caractères),
   ou une variante qui commence par les mêmes mots.
2. **H1.** Décision de Maxime (1er nov. 2026) : il reste « Votre désamiantage, sans le stress ». N'y touche pas.
3. **Les deux premières phrases** disent ce qu'on fait et pour qui :
   - nos pros, tous certifiés sous-section 3 ;
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
   - **Pas de prix sur l'accueil** (décision de Maxime, 1er nov. 2026) : les fourchettes restent sur
     `/prix-desamiantage`, vers laquelle l'accueil renvoie par un lien.
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
   Les animations d'entrée qui masquaient le titre, la photo et le bouton ont été retirées le 1er nov. 2026
   (LCP mesuré à 2,0 s) : ne les remets pas. Voir la règle 1.6.
8. **Une seule promesse de rappel** (décision de Maxime, 1er nov. 2026) : c'est **l'un de nos pros** qui
   rappelle, sous 24 h. Jamais « un conseiller » ni « Cap Désamiantage vous rappelle » : il n'y a pas de standard.
   Le hero, les étapes 2 et 3, le formulaire, la case de consentement et `/confidentialite` disent la même chose.
   La case de consentement couvre la transmission de la demande à un seul pro de son secteur (attribution du
   Lead Router) ; si ce parcours change, change aussi la case, `suivi_consentement` et `/confidentialite`.

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
