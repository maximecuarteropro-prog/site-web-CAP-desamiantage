import type { APIRoute } from 'astro'
import { projectTypeIds, projectTypeLabels, type ProjectTypeId } from '@contracts/projects'

// Seule route exécutée sur le serveur : valide la demande du formulaire et la transmet au
// Lead Router. Variable Vercel LEAD_ROUTER_ENDPOINT : l'URL complète affichée par le Lead Router
// (Réglages, « Entrées API »), de la forme https://…/api/leads/<jeton>. Elle contient le jeton :
// elle reste côté serveur, jamais dans la page.
export const prerender = false

const CONTEXTES = ['travaux', 'vente', 'achat', 'sinistre', 'autre'] as const
const DIAGNOSTICS = ['oui', 'non', 'je-ne-sais-pas'] as const

const repondre = (corps: Record<string, unknown>, status = 200) =>
  new Response(JSON.stringify(corps), { status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' } })

const texte = (valeur: unknown, max: number) => (typeof valeur === 'string' ? valeur.trim().slice(0, max) : '')

export const POST: APIRoute = async ({ request }) => {
  let d: Record<string, unknown>
  try {
    d = await request.json()
  } catch {
    return repondre({ erreur: 'Corps JSON invalide' }, 400)
  }

  // Champ piège rempli : un robot. On répond comme si tout allait bien, sans rien transmettre.
  if (texte(d.website, 200)) return repondre({ ok: true, id: null })

  const projectType = texte(d.projectType, 60) as ProjectTypeId
  const contexte = texte(d.context, 20)
  const diagnostic = texte(d.diagnosis, 20)
  const codePostal = texte(d.postalCode, 5)
  const nom = texte(d.fullName, 120)
  const telephone = texte(d.phone, 20)
  const email = texte(d.email, 320)

  const valide =
    projectTypeIds.includes(projectType) &&
    (CONTEXTES as readonly string[]).includes(contexte) &&
    (DIAGNOSTICS as readonly string[]).includes(diagnostic) &&
    /^\d{5}$/.test(codePostal) &&
    nom.length >= 2 &&
    telephone.replace(/\D/g, '').length >= 8 &&
    d.consent === true
  if (!valide) return repondre({ erreur: 'Demande incomplète' }, 422)

  const endpoint = process.env.LEAD_ROUTER_ENDPOINT
  if (!endpoint) return repondre({ erreur: 'Réception des demandes non configurée' }, 503)

  const lead = {
    nom,
    telephone,
    email,
    code_postal: codePostal,
    type_chantier: projectTypeLabels[projectType],
    surface: texte(d.surface, 80),
    contexte,
    diagnostic,
    consentement: 'oui',
    page: texte(d.page, 300),
    source: 'site cap-desamiantage.fr',
  }

  try {
    const reponse = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(10_000),
    })
    if (!reponse.ok) return repondre({ erreur: 'Transmission impossible' }, 502)
    const resultat = (await reponse.json().catch(() => ({}))) as { id?: string }
    return repondre({ ok: true, id: resultat.id ?? null })
  } catch {
    return repondre({ erreur: 'Transmission impossible' }, 502)
  }
}
