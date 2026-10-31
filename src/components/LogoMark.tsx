// Pictogramme de la marque (toit et coche sur carré arrondi), repris de l'ancien site Cap.
// Couleurs tirées des jetons du site (--accent-primary, --accent-ink) via la classe .brand-logo.
export default function LogoMark() {
  return (
    <svg className="brand-logo" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
      <rect width="48" height="48" rx="11" />
      <path d="M10 23.5 24 12l14 11.5" fill="none" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16.5 30.5l5.5 5.5 10-11" fill="none" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}
