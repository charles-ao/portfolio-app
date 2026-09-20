/**
 * Decorative corner-bracket frame used around boxed content throughout the
 * design (the "At a glance" panel on Home, the map box on Contact, the
 * architecture image and empty-state panels).
 *
 * Wraps children in a `position: relative` container. `variant="full"`
 * (default) adds all four corner ticks; `variant="diagonal"` adds only the
 * top-left and bottom-right ticks, as used by Project Detail's result stat
 * cards and dashboard gallery figures. Apply layout/border/background
 * styles to the wrapped content via `className` on this component.
 */
export default function CornerFrame({ className = '', variant = 'full', children }) {
  return (
    <div className={`corner-frame ${className}`.trim()}>
      <span className="corner-frame__corner corner-frame__corner--tl" />
      {variant === 'full' && <span className="corner-frame__corner corner-frame__corner--tr" />}
      {variant === 'full' && <span className="corner-frame__corner corner-frame__corner--bl" />}
      <span className="corner-frame__corner corner-frame__corner--br" />
      {children}
    </div>
  )
}
