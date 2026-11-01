import type { APIRoute } from 'astro'
import { questions } from '@contracts/demande'

// Seule route exécutée sur le serveur : valide la demande du formulaire et la transmet au Lead Router
// (source « Site cap-desamiantage.fr », créée par la migration 20261101000006 du dépôt lead-router-v2).
// Variable Vercel LEAD_ROUTER_ENDPOINT, marquée « Sensitive » : l'URL complète, de la forme
// https://lead-router-v2.vercel.app/api/leads/<jeton>. Elle contient le jeton : elle reste côté serveur.
export const prerender = false

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

  // Les quatre questions du formulaire Meta, sous les clés internes du Lead Router.
  const reponses: Record<string, string> = {}
  for (const q of questions) {
    const valeur = texte(d[q.cle], 80)
    if ((q.options as readonly string[]).includes(valeur)) reponses[q.cle] = valeur
  }
  const codePostal = texte(d.postalCode, 5)
  const prenom = texte(d.firstName, 60)
  const nom = texte(d.lastName, 80)
  const telephone = texte(d.phone, 20)
  const email = texte(d.email, 320)

  const valide =
    Object.keys(reponses).length === questions.length &&
    /^\d{5}$/.test(codePostal) &&
    prenom.length >= 1 &&
    nom.length >= 1 &&
    telephone.replace(/\D/g, '').length >= 8 &&
    (!email || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) &&
    d.consent === true
  if (!valide) return repondre({ erreur: 'Demande incomplète' }, 422)

  const endpoint = process.env.LEAD_ROUTER_ENDPOINT
  if (!endpoint) return repondre({ erreur: 'Réception des demandes non configurée' }, 503)

  const lead = {
    id: crypto.randomUUID(),
    prenom,
    nom,
    telephone,
    email,
    code_postal: codePostal,
    ...reponses,
    type_chantier: texte(d.typeChantier, 80),
    // Préfixe « suivi_ » : visible dans le Lead Router (fiche du lead), jamais envoyé au pro.
    suivi_page_entree: texte(d.pageEntree, 300),
    suivi_page: texte(d.page, 300),
    suivi_consentement: 'Rappel par Cap Désamiantage ; transmission à un pro avec accord',
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
