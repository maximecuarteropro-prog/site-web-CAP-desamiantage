import { useRef, type PointerEvent } from 'react'
import { ArrowUpRight, ShieldCheck } from 'lucide-react'

export default function Hero() {
  const visualRef = useRef<HTMLDivElement>(null)
  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const bounds = event.currentTarget.getBoundingClientRect()
    const x = (event.clientX - bounds.left) / bounds.width - 0.5
    const y = (event.clientY - bounds.top) / bounds.height - 0.5
    visualRef.current?.style.setProperty('--image-x', `${x * -12}px`)
    visualRef.current?.style.setProperty('--image-y', `${y * -10}px`)
  }
  const resetImagePosition = () => {
    visualRef.current?.style.setProperty('--image-x', '0px')
    visualRef.current?.style.setProperty('--image-y', '0px')
  }
  return (
    <div className="hero-shell" id="hero">
      <section className="hero-layout" aria-labelledby="hero-title">
        <div className="hero-copy-panel">
          <header className="hero-header">
            <a className="brand" href="#hero" aria-label="Cap Désamiantage, retour en haut"><span className="brand-cap">cap<span className="brand-dot" aria-hidden="true" /></span><span className="brand-name">désamiantage</span></a>
            <a className="mobile-method" href="#comment-ca-marche">Notre méthode<ArrowUpRight aria-hidden="true" /></a>
          </header>
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
          <p className="hero-footnote">La rigueur technique. <span>La tranquillité en plus.</span></p>
        </div>
        <div className="hero-visual-wrap">
          <div className="hero-visual" ref={visualRef} onPointerMove={handlePointerMove} onPointerLeave={resetImagePosition}>
            <div className="visual-parallax" aria-hidden="true"><img className="visual-image" src="https://www.alliance-enviro.com/wp-content/uploads/2026/04/asbestos_construction_worker.jpg" alt="" width="1000" height="667" fetchPriority="high" /></div>
            <div className="visual-shade" aria-hidden="true" />
            <div className="visual-topbar"><span className="visual-label">Expertise amiante</span><a className="visual-method" href="#comment-ca-marche">Notre méthode<ArrowUpRight aria-hidden="true" /></a></div>
            <div className="assurance-card"><ShieldCheck className="assurance-icon" aria-hidden="true" /><div><h2>Votre chantier, cadré de A à Z.</h2><p>Un interlocuteur unique et des étapes expliquées, pour avancer sans zone d’ombre.</p></div></div>
          </div>
        </div>
      </section>
    </div>
  )
}
