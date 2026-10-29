import { useState } from 'react'
import type { ProjectTypeId } from '@contracts/projects'
import Hero from '@/sections/Hero'
import Process from '@/sections/Process'
import ProjectTypes from '@/sections/ProjectTypes'
import QuoteForm from '@/sections/QuoteForm'
import '../App.css'

export default function Home() {
  const [selectedProject, setSelectedProject] = useState<ProjectTypeId>('autre-je-ne-sais-pas')

  return (
    <main>
      <Hero />
      <Process />
      <ProjectTypes onSelect={setSelectedProject} />
      <QuoteForm selectedProject={selectedProject} onProjectChange={setSelectedProject} />
    </main>
  )
}
