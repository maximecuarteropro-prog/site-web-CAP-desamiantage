import { CalendarClock, Check, CircleCheck, FileText, PhoneCall, SearchCheck, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Le parcours en quatre étapes, sur une ligne de temps verticale, comme sur le site d'Indemnis
 * (demande de Maxime, 1er nov. 2026). Le texte des étapes est inchangé.
 *
 * Chaque étape porte une vignette : une petite fiche de chantier sur fond d'encre quadrillé, aux couleurs
 * de Cap, qui montre un seul élément concret (les réponses du formulaire, l'appel, le devis, les
 * documents). Les vignettes sont décoratives (aria-hidden) : le texte de l'étape dit déjà tout.
 */

function Entete({ icone, gauche, droite }: { icone: ReactNode; gauche: string; droite: string }) {
  return (
    <div className="vignette-entete">
      <span className="vignette-entete-gauche">{icone}{gauche}</span>
      <span className="vignette-entete-droite">{droite}</span>
    </div>
  )
}

const processSteps = [
  {
    number: '01', title: 'Décrivez votre situation', duration: '2 minutes', description: 'Racontez-nous votre projet en quelques informations. C’est gratuit et sans engagement.',
    vignette: (
      <>
        <Entete icone={<FileText />} gauche="Votre demande" droite="2 min" />
        <div className="vignette-puces"><span className="vignette-puce-choisie">Propriétaire</span><span className="vignette-puce-choisie">Toiture</span><span>50 à 200 m²</span></div>
      </>
    ),
  },
  {
    number: '02', title: 'On vous rappelle sous 24 h', duration: 'Échange personnalisé', description: 'Un conseiller précise votre besoin, répond à vos questions et vous donne une première fourchette de prix.',
    vignette: (
      <>
        <Entete icone={<PhoneCall />} gauche="Appel entrant" droite="Sous 24 h" />
        <div className="vignette-appel"><span className="vignette-avatar">C</span><span className="vignette-appel-nom">Votre conseiller Cap<small>Première fourchette de prix</small></span><span className="vignette-onde"><i /><i /><i /><i /><i /></span></div>
      </>
    ),
  },
  {
    number: '03', title: 'Visite et devis gratuit', duration: 'Sans engagement', description: 'L’un de nos pros se déplace, évalue le chantier et vous remet un devis détaillé.',
    vignette: (
      <>
        <Entete icone={<SearchCheck />} gauche="Devis détaillé" droite="Gratuit" />
        <ul className="vignette-devis"><li><span>Visite du chantier</span><Check /></li><li><span>Retrait et évacuation</span><b>•••</b></li></ul>
      </>
    ),
  },
  {
    number: '04', title: 'Retrait sécurisé et documents remis', duration: 'Chantier encadré', description: 'Notre pro prépare le chantier, confine la zone, retire les matériaux et les évacue vers une filière agréée.',
    vignette: (
      <>
        <Entete icone={<ShieldCheck />} gauche="Documents remis" droite="Terminé" />
        <div className="vignette-documents"><span><Check />Plan de retrait</span><span><Check />Mesures d’air</span><span><Check />Bordereau</span></div>
      </>
    ),
  },
]

export default function Process() {
  return (
    <section className="process-section" id="comment-ca-marche" aria-labelledby="process-title">
      <div className="process-container">
        <div className="process-heading">
          <span className="section-kicker">Comment ça marche</span>
          <h2 id="process-title">De votre demande au chantier, <span>tout est clair.</span></h2>
          <p className="process-intro">Quatre étapes simples pour avancer sereinement, avec nos pros certifiés et aucun engagement de votre part.</p>
        </div>
        <ol className="process-steps">
          {processSteps.map((step) => (
            <li className="process-step" id={step.number === '01' ? 'premiere-etape' : undefined} key={step.number}>
              <span className="step-marker" aria-hidden="true">{step.number}</span>
              <div className="step-copy">
                <p className="step-duration">{step.duration}</p>
                <h3>{step.title}</h3>
                <p className="step-description">{step.description}</p>
              </div>
              <div className="step-visual" aria-hidden="true">
                <div className="vignette-panneau"><div className="vignette-carte">{step.vignette}</div></div>
              </div>
            </li>
          ))}
        </ol>
        <div className="process-assurances" aria-label="Informations importantes">
          <div className="process-assurance"><CircleCheck aria-hidden="true" /><p><strong>100 % gratuit</strong> et sans engagement pour vous</p></div>
          <div className="process-assurance process-timing"><CalendarClock aria-hidden="true" /><p><strong>Délai indicatif :</strong> prévoyez environ 1 mois entre le devis signé et le début du chantier <span>(délai réglementaire)</span></p></div>
        </div>
      </div>
    </section>
  )
}
