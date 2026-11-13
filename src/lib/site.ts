// Données communes du site : identité, éditeur, pages éditoriales.
export const SITE = {
  nom: 'Cap Désamiantage',
  url: 'https://capdesamiantage.fr',
  editeur: 'France Acquisition',
  contact: 'quartzsolutions@gmail.com',
  description:
    'Cap Désamiantage met en relation les propriétaires, agriculteurs, entreprises et copropriétés avec nos pros du désamiantage, tous certifiés amiante sous-section 3.',
}

// Pages éditoriales, dans l'ordre du pied de page. `titreCourt` sert aux liens et au fil d'Ariane.
export const PAGES_GUIDE = [
  { chemin: '/prix-desamiantage', titreCourt: 'Prix du désamiantage' },
  { chemin: '/prix-remplacement-toiture-amiante', titreCourt: 'Changer une toiture en amiante : prix' },
  { chemin: '/aides-desamiantage', titreCourt: 'Aides au désamiantage' },
  { chemin: '/desamiantage-toiture-amiante', titreCourt: 'Désamiantage de toiture' },
  { chemin: '/amiante-maison', titreCourt: 'Amiante dans une maison' },
  { chemin: '/amiante-murs-platre-enduit', titreCourt: 'Amiante dans les murs et enduits' },
  { chemin: '/reconnaitre-toiture-amiante', titreCourt: 'Reconnaître une toiture en amiante' },
  { chemin: '/toiture-amiante-que-faire', titreCourt: 'Toiture en amiante : que faire ?' },
  { chemin: '/vendre-maison-toiture-amiante', titreCourt: 'Vendre une maison avec un toit en amiante' },
  { chemin: '/diagnostic-amiante-avant-travaux', titreCourt: 'Diagnostic amiante avant travaux' },
  { chemin: '/certification-sous-section-3', titreCourt: 'Certification sous-section 3' },
  { chemin: '/sous-section-4-amiante', titreCourt: 'Sous-section 4 amiante' },
  { chemin: '/dossier-technique-amiante', titreCourt: 'Dossier technique amiante (DTA)' },
  { chemin: '/retrait-dalles-sol-amiante', titreCourt: 'Dalles de sol en amiante' },
  { chemin: '/carrelage-colle-amiante', titreCourt: 'Carrelage, colle et lino amiantés' },
  { chemin: '/flocage-calorifugeage-amiante', titreCourt: 'Flocage et calorifugeage amiante' },
  { chemin: '/tuyau-conduit-amiante', titreCourt: 'Tuyau et conduit en amiante' },
  { chemin: '/dechetterie-amiante', titreCourt: 'Déchetterie et amiante' },
] as const

export const absolu = (chemin: string) => SITE.url + chemin

export const ORGANISATION = {
  '@type': 'Organization',
  '@id': `${SITE.url}/#organisation`,
  name: SITE.nom,
  legalName: SITE.editeur,
  url: SITE.url,
  logo: `${SITE.url}/logo-512.png`,
  email: SITE.contact,
  areaServed: { '@type': 'Country', name: 'France' },
  description: SITE.description,
}

export const SITE_WEB = {
  '@type': 'WebSite',
  '@id': `${SITE.url}/#site`,
  name: SITE.nom,
  url: SITE.url,
  inLanguage: 'fr-FR',
  publisher: { '@id': ORGANISATION['@id'] },
}
