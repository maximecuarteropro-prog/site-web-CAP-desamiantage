import { BadgeCheck, CalendarClock, Check, CircleCheck, FileText, PhoneCall, SearchCheck, ShieldCheck } from 'lucide-react'
import type { ReactNode } from 'react'

/**
 * Le parcours en quatre étapes, sur une ligne de temps verticale, comme sur le site d'Indemnis
 * (demande de Maxime, 1er nov. 2026). Le texte des étapes est inchangé.
 *
 * Chaque étape porte une vignette : un fragment d'interface sur fond dégradé, qui rend l'étape
 * concrète. Les vignettes sont décoratives (aria-hidden) : le texte de l'étape dit déjà tout.
 */

function Entete({ icone, gauche, droite }: { icone: ReactNode; gauche: string; droite?: string }) {
  return (
    <div className="vignette-entete">
      <span className="vignette-entete-gauche">{icone}{gauche}</span>
      {droite && <span className="vignette-entete-droite">{droite}</span>}
    </div>
  )
}

function Ligne({ texte, faite = true }: { texte: string; faite?: boolean }) {
  return <li className={faite ? 'vignette-ligne' : 'vignette-ligne vignette-ligne-attente'}>{faite ? <Check className="vignette-coche" /> : <span className="vignette-rond" />}{texte}</li>
}

function Bulle({ texte, deVous = false }: { texte: string; deVous?: boolean }) {
  return <p className={deVous ? 'vignette-bulle vignette-bulle-vous' : 'vignette-bulle'}>{texte}</p>
}

const processSteps = [
  {
    number: '01', title: 'Décrivez votre situation', duration: '2 minutes', description: 'Racontez-nous votre projet en quelques informations. C’est gratuit et sans engagement.',
    vignette: (
      <>
        <Entete icone={<FileText />} gauche="Votre demande" droite="2 min" />
        <dl className="vignette-champs">
          <div><dt>Chantier</dt><dd>Toiture en fibrociment</dd></div>
          <div><dt>Surface</dt><dd>Environ 80 m²</dd></div>
          <div><dt>Bâtiment</dt><dd>Maison individuelle</dd></div>
        </dl>
        <p className="vignette-pied"><span className="vignette-point" />Demande envoyée</p>
      </>
    ),
  },
  {
    number: '02', title: 'On vous rappelle sous 24 h', duration: 'Échange personnalisé', description: 'Un conseiller précise votre besoin, répond à vos questions et vous donne une première fourchette de prix.',
    vignette: (
      <>
        <Entete icone={<PhoneCall />} gauche="Votre conseiller" droite="Sous 24 h" />
        <div className="vignette-bulles">
          <Bulle texte="Bonjour, c’est pour votre toiture. Elle fait combien de m² environ ?" />
          <Bulle texte="Environ 80 m²." deVous />
          <Bulle texte="Je vous donne une première fourchette." />
        </div>
      </>
    ),
  },
  {
    number: '03', title: 'Visite et devis gratuit', duration: 'Sans engagement', description: 'L’entreprise partenaire se déplace, évalue le chantier et vous remet un devis détaillé.',
    vignette: (
      <>
        <Entete icone={<SearchCheck />} gauche="Devis détaillé" droite="Gratuit" />
        <ul className="vignette-lignes">
          <Ligne texte="Visite du chantier" />
          <Ligne texte="Surface et accès évalués" />
          <Ligne texte="Retrait et évacuation chiffrés" />
          <Ligne texte="Devis remis" faite={false} />
        </ul>
      </>
    ),
  },
  {
    number: '04', title: 'Retrait sécurisé et documents remis', duration: 'Chantier encadré', description: 'L’entreprise prépare le chantier, confine la zone, retire les matériaux et les évacue vers une filière agréée.',
    vignette: (
      <>
        <Entete icone={<ShieldCheck />} gauche="Documents remis" droite="Terminé" />
        <ul className="vignette-lignes">
          <Ligne texte="Plan de retrait" />
          <Ligne texte="Mesures d’empoussièrement" />
          <Ligne texte="Bordereau de suivi des déchets" />
        </ul>
        <p className="vignette-pied"><span className="vignette-point" />Déchets évacués vers une filière agréée</p>
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
          <p className="process-intro">Quatre étapes simples pour avancer sereinement, avec des professionnels certifiés et aucun engagement de votre part.</p>
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
          <div className="process-assurance"><BadgeCheck aria-hidden="true" /><p><strong>Uniquement</strong> des entreprises certifiées</p></div>
          <div className="process-assurance process-timing"><CalendarClock aria-hidden="true" /><p><strong>Délai indicatif :</strong> prévoyez environ 1 mois entre le devis signé et le début du chantier <span>(délai réglementaire)</span></p></div>
        </div>
      </div>
    </section>
  )
}
