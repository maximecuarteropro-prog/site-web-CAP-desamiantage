export const projectTypeIds = [
  'toitures-fibrociment',
  'conduits-canalisations',
  'dalles-revetements-sol',
  'murs-plafonds-cloisons',
  'flocages-calorifugeages',
  'avant-travaux-vente-demolition',
  'autre-je-ne-sais-pas',
] as const

export type ProjectTypeId = (typeof projectTypeIds)[number]

export const projectTypeLabels: Record<ProjectTypeId, string> = {
  'toitures-fibrociment': 'Toitures et plaques en fibrociment',
  'conduits-canalisations': 'Conduits et canalisations',
  'dalles-revetements-sol': 'Dalles et revêtements de sol',
  'murs-plafonds-cloisons': 'Murs, plafonds et cloisons',
  'flocages-calorifugeages': 'Flocages et calorifugeages',
  'avant-travaux-vente-demolition': 'Désamiantage avant travaux, vente ou démolition',
  'autre-je-ne-sais-pas': 'Autre / je ne sais pas',
}
