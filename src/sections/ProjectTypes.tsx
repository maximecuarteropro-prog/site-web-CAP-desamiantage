import { ArrowUpRight, Cable, CircleHelp, Flame, Grid3X3, Hammer, House, Layers3 } from 'lucide-react'
import { projectTypeIds, type ProjectTypeId } from '@contracts/projects'

const projectCards = [
  { id: 'toitures-fibrociment', title: 'Toitures et plaques en fibrociment', description: 'Garage, abri de jardin, carport, grange, hangar agricole. Le cas le plus courant : plaques ondulées posées avant 1997.', icon: House },
  { id: 'conduits-canalisations', title: 'Conduits et canalisations', description: 'Conduits de cheminée ou de ventilation, descentes d’eaux pluviales, tuyaux en fibrociment.', icon: Cable },
  { id: 'dalles-revetements-sol', title: 'Dalles et revêtements de sol', description: 'Dalles vinyle (souvent 30 × 30 cm) et colle noire bitumineuse, fréquentes dans les maisons et appartements des années 60 à 90.', icon: Grid3X3 },
  { id: 'murs-plafonds-cloisons', title: 'Murs, plafonds et cloisons', description: 'Enduits, plâtres, faux plafonds, cloisons et plaques contenant de l’amiante, à retirer avant rénovation.', icon: Layers3 },
  { id: 'flocages-calorifugeages', title: 'Flocages et calorifugeages', description: 'Isolation projetée sur structures, tuyaux de chauffage, chaufferies. Fréquent en copropriété et dans les bâtiments professionnels.', icon: Flame },
  { id: 'avant-travaux-vente-demolition', title: 'Désamiantage avant travaux, vente ou démolition', description: 'Retrait complet de tous les matériaux repérés dans le diagnostic, pour débloquer une rénovation, une vente ou une démolition.', icon: Hammer },
] satisfies Array<{ id: ProjectTypeId; title: string; description: string; icon: typeof House }>

type ProjectTypesProps = { onSelect: (projectType: ProjectTypeId) => void }

export default function ProjectTypes({ onSelect }: ProjectTypesProps) {
  return (
    <section className="projects-section" id="types-de-chantiers" aria-labelledby="projects-title">
      <div className="projects-container">
        <div className="projects-heading-grid">
          <div><span className="projects-kicker">Types de chantiers</span><h2 id="projects-title">Quel est votre projet&nbsp;?</h2></div>
          <p>Sélectionnez votre situation. Nous préremplirons votre demande pour vous faire gagner du temps.</p>
        </div>
        <div className="project-grid">
          {projectCards.map((project, index) => {
            const Icon = project.icon
            return (
              <a className="project-card" href="#devis" key={project.id} onClick={() => onSelect(project.id)} aria-label={`${project.title} — demander un devis`}>
                <div className="project-card-top"><Icon aria-hidden="true" /><span>0{index + 1}</span></div>
                <div className="project-card-copy"><h3>{project.title}</h3><p>{project.description}</p></div>
                <span className="project-card-action" aria-hidden="true">Décrire ce projet<ArrowUpRight /></span>
              </a>
            )
          })}
          <a className="project-card project-card-help" href="#devis" onClick={() => onSelect(projectTypeIds[6])} aria-label="Autre ou je ne sais pas — être orienté">
            <CircleHelp aria-hidden="true" />
            <div><h3>Autre / je ne sais pas</h3><p>Vous ne savez pas ce que vous avez&nbsp;? Décrivez-nous votre situation, on vous oriente.</p></div>
            <span className="project-help-arrow" aria-hidden="true"><ArrowUpRight /></span>
          </a>
        </div>
      </div>
    </section>
  )
}
