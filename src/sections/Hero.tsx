import { ArrowUpRight, ShieldCheck } from 'lucide-react'

// Rendu en HTML statique (pas d'hydratation) : l'effet de parallaxe de l'image est
// branché par un petit script dans src/pages/index.astro.
export type HeroImage = { src: string; srcSet: string; sizes: string; width: number; height: number }

export default function Hero({ image }: { image: HeroImage }) {
  return (
    <div className="hero-shell" id="hero">
      <section className="hero-layout" aria-labelledby="hero-title">
        <div className="hero-copy-panel">
          <div className="hero-copy">
            <div className="hero-badge"><ShieldCheck className="badge-check" aria-hidden="true" /><span>Certifiés en désamiantage</span></div>
            <h1 className="hero-title" id="hero-title">
              <span className="title-line"><span className="title-line-inner">Votre désamiantage,</span></span>
              <span className="title-line"><span className="title-line-inner title-line-second">sans le stress</span></span>
            </h1>
            <p className="hero-description">Cap Désamiantage coordonne chaque étape de votre chantier avec des explications claires, du premier diagnostic à la restitution.</p>
            <div className="hero-action-group">
              <a className="hero-cta" href="#devis"><span>Obtenir un devis</span><span className="cta-icon" aria-hidden="true"><ArrowUpRight /></span></a>
              <p className="hero-cta-note">Nous vous répondons dans la journée.</p>
            </div>
          </div>
        </div>
        <div className="hero-visual-wrap">
          <div className="hero-visual">
            <div className="visual-parallax" aria-hidden="true"><img className="visual-image" src={image.src} srcSet={image.srcSet} sizes={image.sizes} alt="" width={image.width} height={image.height} fetchPriority="high" decoding="async" /></div>
            <div className="visual-shade" aria-hidden="true" />
            <div className="visual-topbar"><span className="visual-label">Expertise amiante</span><a className="visual-method" href="#comment-ca-marche">Notre méthode<ArrowUpRight aria-hidden="true" /></a></div>
            <div className="assurance-card"><ShieldCheck className="assurance-icon" aria-hidden="true" /><div><h2>Votre chantier, cadré de A à Z.</h2><p>Un interlocuteur unique et des étapes expliquées, pour avancer sans zone d’ombre.</p></div></div>
          </div>
        </div>
      </section>
    </div>
  )
}
