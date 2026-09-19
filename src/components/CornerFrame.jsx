/**
 * Decorative corner-bracket frame used around boxed content throughout the
 * design (the "At a glance" panel on Home, the map box on Contact, and
 * later the architecture/results/gallery boxes on Project Detail).
 *
 * Wraps children in a `position: relative` container and adds four small
 * tick marks at the corners. Apply layout/border/background styles to the
 * wrapped content via `className` on this component.
 */
export default function CornerFrame({ className = '', children }) {
  return (
    <div className={`corner-frame ${className}`.trim()}>
      <span className="corner-frame__corner corner-frame__corner--tl" />
      <span className="corner-frame__corner corner-frame__corner--tr" />
      <span className="corner-frame__corner corner-frame__corner--bl" />
      <span className="corner-frame__corner corner-frame__corner--br" />
      {children}
    </div>
  )
}
