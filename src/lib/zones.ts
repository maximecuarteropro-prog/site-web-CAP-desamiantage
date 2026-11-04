// Pages par zone, dans l'ordre du pied de page (décision de Maxime, 4 nov. 2026) : une page partout où il y a de
// la demande. Chaque page est écrite à la main, avec des données locales sourcées :
// pas de gabarit où seul le nom de la ville change (Google le traite comme des pages satellites).
export const PAGES_ZONE = [
  { chemin: '/desamiantage-ile-de-france', titreCourt: 'Désamiantage en Île-de-France' },
  { chemin: '/desamiantage-paris', titreCourt: 'Désamiantage à Paris' },
  { chemin: '/desamiantage-hauts-de-france', titreCourt: 'Désamiantage dans les Hauts-de-France' },
  { chemin: '/desamiantage-lille', titreCourt: 'Désamiantage à Lille' },
  { chemin: '/desamiantage-paca', titreCourt: 'Désamiantage en PACA' },
  { chemin: '/desamiantage-marseille', titreCourt: 'Désamiantage à Marseille' },
  { chemin: '/desamiantage-toulon', titreCourt: 'Désamiantage à Toulon' },
  { chemin: '/desamiantage-bretagne', titreCourt: 'Désamiantage en Bretagne' },
  { chemin: '/desamiantage-nantes', titreCourt: 'Désamiantage à Nantes' },
  { chemin: '/desamiantage-lyon', titreCourt: 'Désamiantage à Lyon' },
  { chemin: '/desamiantage-bordeaux', titreCourt: 'Désamiantage à Bordeaux' },
] as const
