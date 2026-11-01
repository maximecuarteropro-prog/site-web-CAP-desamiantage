import type { ProjectTypeId } from './projects'

// Questions du formulaire de demande : les mêmes que le formulaire instantané Meta « CAP — Désamiantage v1 »
// (vault : « Désamiantage — Kit test Meta »), avec les mêmes libellés de réponse au caractère près. Le Lead
// Router range ces réponses sous les clés internes de la verticale (profil, materiau, surface, projet) et
// qualifie dessus : profil ≠ « Locataire » et projet ≠ « Je me renseigne pour plus tard ».
export const questions = [
  { cle: 'profil', libelle: 'Vous êtes', options: ['Propriétaire particulier', 'Agriculteur', 'Entreprise ou collectivité', 'Copropriété ou syndic', 'Locataire'] },
  { cle: 'materiau', libelle: 'Qu’est-ce qui contient (ou pourrait contenir) de l’amiante ?', options: ['Toiture ou bardage en fibrociment', 'Sol, faux plafond ou conduits', 'Un bâtiment entier à démolir ou vider', 'Je ne sais pas encore'] },
  { cle: 'surface', libelle: 'Surface concernée, environ', options: ['Moins de 50 m²', '50 à 200 m²', '200 à 1 000 m²', 'Plus de 1 000 m²', 'Je ne sais pas'] },
  { cle: 'projet', libelle: 'Où en est votre projet ?', options: ['Travaux bloqués, c\'est urgent', 'Devis voulu dans les 3 mois', 'Vente ou achat du bien en cours', 'Je me renseigne pour plus tard'] },
] as const

export type CleQuestion = (typeof questions)[number]['cle']

// Une carte « Quel est votre projet ? » préremplit la deuxième question.
export const materiauParType: Record<ProjectTypeId, string> = {
  'toitures-fibrociment': 'Toiture ou bardage en fibrociment',
  'conduits-canalisations': 'Sol, faux plafond ou conduits',
  'dalles-revetements-sol': 'Sol, faux plafond ou conduits',
  'murs-plafonds-cloisons': 'Sol, faux plafond ou conduits',
  'flocages-calorifugeages': 'Sol, faux plafond ou conduits',
  'avant-travaux-vente-demolition': 'Un bâtiment entier à démolir ou vider',
  'autre-je-ne-sais-pas': 'Je ne sais pas encore',
}
