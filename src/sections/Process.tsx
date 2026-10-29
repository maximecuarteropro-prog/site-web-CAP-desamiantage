import { ArrowDownRight, BadgeCheck, CalendarClock, CircleCheck, FileText, PhoneCall, SearchCheck, ShieldCheck } from 'lucide-react'

const processSteps = [
  { number: '01', title: 'Décrivez votre situation', duration: '2 minutes', icon: FileText, description: 'Racontez-nous votre projet en quelques informations. C’est gratuit et sans engagement.' },
  { number: '02', title: 'On vous rappelle sous 24 h', duration: 'Échange personnalisé', icon: PhoneCall, description: 'Un conseiller précise votre besoin, répond à vos questions et vous donne une première fourchette de prix.' },
  { number: '03', title: 'Visite et devis gratuit', duration: 'Sans engagement', icon: SearchCheck, description: 'L’entreprise partenaire se déplace, évalue le chantier et vous remet un devis détaillé.' },
  { number: '04', title: 'Retrait sécurisé et documents remis', duration: 'Chantier encadré', icon: ShieldCheck, description: 'L’entreprise prépare le chantier, confine la zone, retire les matériaux et les évacue vers une filière agréée.' },
]

export default function Process() {
  return (
    <section className="process-section" id="comment-ca-marche" aria-labelledby="process-title">
      <div className="process-container">
        <div className="process-heading-grid">
          <div className="process-heading">
            <span className="section-kicker"><ArrowDownRight aria-hidden="true" />Comment ça marche</span>
            <h2 id="process-title">De votre demande au chantier, <span>tout est clair.</span></h2>
          </div>
          <p className="process-intro">Quatre étapes simples pour avancer sereinement, avec des professionnels certifiés et aucun engagement de votre part.</p>
        </div>
        <ol className="process-steps">
          {processSteps.map((step) => {
            const Icon = step.icon
            return (
              <li className="process-step" id={step.number === '01' ? 'premiere-etape' : undefined} key={step.number}>
                <div className="step-marker" aria-hidden="true"><span>{step.number}</span></div>
                <div className="step-content">
                  <div className="step-meta"><span className="step-icon"><Icon aria-hidden="true" /></span><span className="step-duration">{step.duration}</span></div>
                  <div className="step-copy"><h3>{step.title}</h3><p className="step-description">{step.description}</p></div>
                </div>
              </li>
            )
          })}
        </ol>
        <div className="process-assurances" aria-label="Informations importantes">
          <div className="process-assurance"><CircleCheck aria-hidden="true" /><p><strong>100 % gratuit</strong> et sans engagement pour vous</p></div>
          <div className="process-assurance"><BadgeCheck aria-hidden="true" /><p><strong>Uniquement</strong> des entreprises certifiées</p></div>
          <div className="process-assurance process-timing"><CalendarClock aria-hidden="true" /><p><strong>Délai indicatif :</strong> prévoyez environ 1 mois entre le devis signé et le début du chantier <span>(délai réglementaire)</span></p></div>
        </div>
      </div>
    </section>
  )
}
