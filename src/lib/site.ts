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
  { chemin: '/desamiantage-toiture-amiante', titreCourt: 'Désamiantage de toiture' },
  { chemin: '/toiture-amiante-que-faire', titreCourt: 'Toiture en amiante : que faire ?' },
  { chemin: '/certification-sous-section-3', titreCourt: 'Certification sous-section 3' },
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
