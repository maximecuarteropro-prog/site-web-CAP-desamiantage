import { useState } from 'react'
import type { ProjectTypeId } from '@contracts/projects'
import ProjectTypes from '@/sections/ProjectTypes'
import QuoteForm from '@/sections/QuoteForm'

// Îlot interactif de la première page : le choix d'un type de chantier préremplit le formulaire.
export default function DemandeChantier() {
  const [selectedProject, setSelectedProject] = useState<ProjectTypeId>('autre-je-ne-sais-pas')

  return (
    <>
      <ProjectTypes onSelect={setSelectedProject} />
      <QuoteForm selectedProject={selectedProject} onProjectChange={setSelectedProject} />
    </>
  )
}
