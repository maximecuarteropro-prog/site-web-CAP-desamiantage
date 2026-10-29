import { useState, type FormEvent } from 'react'
import { ArrowUpRight, Check, LoaderCircle } from 'lucide-react'
import { projectTypeIds, projectTypeLabels, type ProjectTypeId } from '@contracts/projects'
import { trpc } from '@/providers/trpc'

type QuoteFormData = { projectType: ProjectTypeId; surface: string; context: 'travaux' | 'vente' | 'achat' | 'sinistre' | 'autre' | ''; postalCode: string; diagnosis: 'oui' | 'non' | 'je-ne-sais-pas' | ''; fullName: string; phone: string; email: string; consent: boolean; website: string }
const initialData: QuoteFormData = { projectType: 'autre-je-ne-sais-pas', surface: '', context: '', postalCode: '', diagnosis: '', fullName: '', phone: '', email: '', consent: false, website: '' }
type QuoteFormProps = { selectedProject: ProjectTypeId; onProjectChange: (projectType: ProjectTypeId) => void }

export default function QuoteForm({ selectedProject, onProjectChange }: QuoteFormProps) {
  const [formData, setFormData] = useState<QuoteFormData>(initialData)
  const [requestId, setRequestId] = useState<number | null>(null)
  const submitQuote = trpc.quote.submit.useMutation({ onSuccess: ({ id }: { id: number }) => setRequestId(id) })
  const updateField = <K extends keyof QuoteFormData>(field: K, value: QuoteFormData[K]) => {
    setFormData((current) => ({ ...current, [field]: value }))
    if (submitQuote.isError) submitQuote.reset()
  }
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!formData.context || !formData.diagnosis || !formData.consent) return
    submitQuote.mutate({ ...formData, context: formData.context, diagnosis: formData.diagnosis, consent: formData.consent, projectType: selectedProject })
  }
  const startAnotherRequest = () => { setRequestId(null); setFormData(initialData); submitQuote.reset() }
  return (
    <section className="quote-section" id="devis" aria-labelledby="quote-title">
      <div className="quote-container">
        <div className="quote-intro">
          <span className="quote-kicker">Votre demande</span><h2 id="quote-title">Parlons de votre chantier.</h2>
          <p>Quelques informations suffisent pour commencer. Un conseiller vous rappelle sous 24 h.</p>
          <div className="quote-reassurance"><Check aria-hidden="true" />Gratuit et sans engagement</div>
        </div>
        <div className="quote-form-panel">
          {requestId !== null ? (
            <div className="quote-success" role="status">
              <span className="success-check"><Check aria-hidden="true" /></span><span className="success-kicker">Demande n° {requestId}</span>
              <h3>Merci, c’est bien enregistré.</h3><p>Un conseiller vous rappellera sous 24 h pour préciser votre besoin.</p>
              <button type="button" onClick={startAnotherRequest}>Faire une autre demande<ArrowUpRight aria-hidden="true" /></button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-field form-field-full"><label htmlFor="project-type">Type de chantier</label><select id="project-type" value={selectedProject} onChange={(event) => onProjectChange(event.target.value as ProjectTypeId)} required>{projectTypeIds.map((id) => <option value={id} key={id}>{projectTypeLabels[id]}</option>)}</select></div>
              <div className="form-grid">
                <div className="form-field"><label htmlFor="surface">Surface approximative <span>(facultatif)</span></label><input id="surface" value={formData.surface} onChange={(event) => updateField('surface', event.target.value)} placeholder="Ex. 80 m²" maxLength={80} /></div>
                <div className="form-field"><label htmlFor="context">Votre contexte</label><select id="context" value={formData.context} onChange={(event) => updateField('context', event.target.value as QuoteFormData['context'])} required><option value="" disabled>Sélectionner</option><option value="travaux">Travaux</option><option value="vente">Vente</option><option value="achat">Achat</option><option value="sinistre">Sinistre</option><option value="autre">Autre</option></select></div>
                <div className="form-field"><label htmlFor="postal-code">Code postal du chantier</label><input id="postal-code" value={formData.postalCode} onChange={(event) => updateField('postalCode', event.target.value.replace(/\D/g, '').slice(0, 5))} inputMode="numeric" autoComplete="postal-code" pattern="\d{5}" placeholder="Ex. 33000" required /></div>
                <div className="form-field"><label htmlFor="diagnosis">Diagnostic amiante disponible&nbsp;?</label><select id="diagnosis" value={formData.diagnosis} onChange={(event) => updateField('diagnosis', event.target.value as QuoteFormData['diagnosis'])} required><option value="" disabled>Sélectionner</option><option value="oui">Oui</option><option value="non">Non</option><option value="je-ne-sais-pas">Je ne sais pas</option></select></div>
                <div className="form-field"><label htmlFor="full-name">Nom et prénom</label><input id="full-name" value={formData.fullName} onChange={(event) => updateField('fullName', event.target.value)} autoComplete="name" minLength={2} maxLength={120} required /></div>
                <div className="form-field"><label htmlFor="phone">Téléphone</label><input id="phone" type="tel" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} autoComplete="tel" placeholder="06 00 00 00 00" minLength={8} maxLength={20} required /></div>
                <div className="form-field form-field-full"><label htmlFor="email">E-mail <span>(facultatif)</span></label><input id="email" type="email" value={formData.email} onChange={(event) => updateField('email', event.target.value)} autoComplete="email" maxLength={320} /></div>
              </div>
              <div className="honeypot" aria-hidden="true"><label htmlFor="website">Ne pas remplir</label><input id="website" tabIndex={-1} autoComplete="off" value={formData.website} onChange={(event) => updateField('website', event.target.value)} /></div>
              <label className="consent-field"><input type="checkbox" checked={formData.consent} onChange={(event) => updateField('consent', event.target.checked)} required /><span>J’accepte d’être recontacté au sujet de cette demande.</span></label>
              {submitQuote.isError && <p className="form-error" role="alert">La demande n’a pas pu être envoyée. Vérifiez les informations et réessayez.</p>}
              <button className="quote-submit" type="submit" disabled={submitQuote.isPending}><span>{submitQuote.isPending ? 'Envoi en cours…' : 'Envoyer ma demande'}</span>{submitQuote.isPending ? <LoaderCircle className="submit-spinner" aria-hidden="true" /> : <ArrowUpRight aria-hidden="true" />}</button>
              <p className="form-note">Vos informations servent uniquement à traiter votre demande.</p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
