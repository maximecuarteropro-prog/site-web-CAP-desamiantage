import { useEffect, useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react'
import { projectTypeLabels, type ProjectTypeId } from '@contracts/projects'
import { lireCampagne, materiauParType, questions, type CleQuestion } from '@contracts/demande'

// Envoi vers /api/demande (fonction Vercel), qui transmet la demande au Lead Router.
// 422 : la demande est incomplète ; toute autre erreur est technique et ne doit pas accuser le visiteur.
function useSubmitQuote(onSuccess: (result: { id: string | null }) => void) {
  const [status, setStatus] = useState<'idle' | 'pending' | 'incomplete' | 'error'>('idle')
  const mutate = async (payload: Record<string, unknown>) => {
    setStatus('pending')
    try {
      const response = await fetch('/api/demande', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) })
      if (response.status === 422) return setStatus('incomplete')
      if (!response.ok) throw new Error(String(response.status))
      const result = (await response.json()) as { id?: string | null }
      setStatus('idle')
      onSuccess({ id: result.id ?? null })
    } catch {
      setStatus('error')
    }
  }
  return { mutate, reset: () => setStatus('idle'), status }
}

type QuoteFormData = Record<CleQuestion, string> & { postalCode: string; firstName: string; lastName: string; phone: string; email: string; consent: boolean; website: string }
const initialData: QuoteFormData = { profil: '', materiau: '', surface: '', projet: '', postalCode: '', firstName: '', lastName: '', phone: '', email: '', consent: false, website: '' }

// Page par laquelle le visiteur est arrivé sur le site (posée par Base.astro), pour savoir quel guide amène des demandes.
const pageEntree = () => { try { return sessionStorage.getItem('cap-page-entree') ?? '' } catch { return '' } }

export default function QuoteForm({ selectedProject }: { selectedProject: ProjectTypeId | null }) {
  const [formData, setFormData] = useState<QuoteFormData>(initialData)
  const [requestId, setRequestId] = useState<string | null>(null)
  const submitQuote = useSubmitQuote(({ id }) => setRequestId(id ? id.slice(0, 8).toUpperCase() : ''))
  const updateField = <K extends keyof QuoteFormData>(field: K, value: QuoteFormData[K]) => {
    setFormData((current) => ({ ...current, [field]: value }))
    if (submitQuote.status === 'incomplete' || submitQuote.status === 'error') submitQuote.reset()
  }
  useEffect(() => {
    if (selectedProject) setFormData((current) => ({ ...current, materiau: materiauParType[selectedProject] }))
  }, [selectedProject])
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Le type de la carte choisie n'est transmis que s'il correspond encore à la réponse donnée.
    const typeChantier = selectedProject && materiauParType[selectedProject] === formData.materiau ? projectTypeLabels[selectedProject] : ''
    submitQuote.mutate({ ...formData, typeChantier, page: window.location.pathname, pageEntree: pageEntree(), ...lireCampagne(window.location.search) })
  }
  const startAnotherRequest = () => { setRequestId(null); setFormData(initialData); submitQuote.reset() }
  return (
    <section className="quote-section" id="devis" aria-labelledby="quote-title">
      <div className="quote-container">
        <div className="quote-intro">
          <span className="quote-kicker">Votre demande</span><h2 id="quote-title">Parlons de votre chantier.</h2>
          <p>4 questions, 1 minute. L’un de nos pros vous rappelle sous 24 h.</p>
          <div className="quote-reassurance"><Check aria-hidden="true" />Gratuit et sans engagement</div>
        </div>
        <div className="quote-form-panel">
          {requestId !== null ? (
            <div className="quote-success" role="status">
              <span className="success-check"><Check aria-hidden="true" /></span><span className="success-kicker">{requestId ? `Demande n° ${requestId}` : 'Demande enregistrée'}</span>
              <h3>Merci, c’est bien enregistré.</h3><p>L’un de nos pros vous rappelle sous 24 h (jours ouvrés). Si vous l’avez, gardez sous la main votre diagnostic amiante et l’année de construction du bâtiment.</p>
              <button type="button" onClick={startAnotherRequest}>Faire une autre demande<ArrowUpRight aria-hidden="true" /></button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              {questions.map((q) => (
                <fieldset className="form-question" key={q.cle}>
                  <legend>{q.libelle}</legend>
                  <div className="choix">
                    {q.options.map((option, i) => (
                      <label key={option}><input type="radio" name={q.cle} value={option} checked={formData[q.cle] === option} onChange={() => updateField(q.cle, option)} required={i === 0} />{option}</label>
                    ))}
                  </div>
                </fieldset>
              ))}
              <div className="form-grid">
                <div className="form-field"><label htmlFor="postal-code">Code postal du chantier</label><input id="postal-code" value={formData.postalCode} onChange={(event) => updateField('postalCode', event.target.value.replace(/\D/g, '').slice(0, 5))} inputMode="numeric" autoComplete="postal-code" pattern="\d{5}" placeholder="Ex. 33000" required /></div>
                <div className="form-field"><label htmlFor="phone">Téléphone</label><input id="phone" type="tel" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} autoComplete="tel" placeholder="06 00 00 00 00" minLength={8} maxLength={20} required /></div>
                <div className="form-field"><label htmlFor="first-name">Prénom</label><input id="first-name" value={formData.firstName} onChange={(event) => updateField('firstName', event.target.value)} autoComplete="given-name" maxLength={60} required /></div>
                <div className="form-field"><label htmlFor="last-name">Nom</label><input id="last-name" value={formData.lastName} onChange={(event) => updateField('lastName', event.target.value)} autoComplete="family-name" maxLength={80} required /></div>
                <div className="form-field form-field-full"><label htmlFor="email">E-mail <span>(facultatif)</span></label><input id="email" type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" maxLength={320} /></div>
              </div>
              <div className="honeypot" aria-hidden="true"><label htmlFor="website">Ne pas remplir</label><input id="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(event) => updateField('website', event.target.value)} /></div>
              <label className="consent-field"><input type="checkbox" checked={formData.consent} onChange={(event) => updateField('consent', event.target.checked)} required /><span>J’accepte que ma demande et mes coordonnées soient transmises à un seul de nos pros, une entreprise certifiée indépendante de mon secteur, pour qu’il me rappelle et me propose un devis.</span></label>
              {submitQuote.status === 'incomplete' && <p className="form-error" role="alert">Il manque une réponse ou une coordonnée. Vérifiez le formulaire et réessayez.</p>}
              {submitQuote.status === 'error' && <p className="form-error" role="alert">Un problème technique a empêché l’envoi, vos réponses sont conservées. Réessayez dans quelques minutes.</p>}
              <button className="quote-submit" type="submit" disabled={submitQuote.status === 'pending'}><span>{submitQuote.status === 'pending' ? 'Envoi en cours…' : 'Envoyer ma demande'}</span>{submitQuote.status === 'pending' ? <LoaderCircle className="submit-spinner" aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}</button>
              <p className="form-note">Vos informations servent uniquement à traiter votre demande.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
