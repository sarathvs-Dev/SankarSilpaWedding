/**
 * One full-viewport "screen".
 *   .screen-bg    ambient mesh + `bg` layers — "camera" zooms/drifts with scroll
 *   .screen-inner content — gently scales down as the screen leaves focus
 *   .screen-fade  obsidian veil that softly fades the screen in/out
 *                 (a sibling veil, NOT filter/opacity on the content, so the
 *                 glass cards keep their backdrop blur)
 * All driven by --sp/--ap from useScreenFX.
 */
export default function Screen({ id, tone = 'dark', className = '', bg, children }) {
  return (
    <section id={id} data-screen className={`screen screen-${tone} ${className}`.trim()}>
      <div className="screen-bg" aria-hidden="true">{bg}</div>
      <div className="screen-inner">{children}</div>
      <div className="screen-fade" aria-hidden="true" />
    </section>
  )
}
