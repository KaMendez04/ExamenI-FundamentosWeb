export default function Stage() {
  return (
    <section className="stage-wrapper" aria-label="Escenario del teatro">
      <div className="stage-curtains stage-curtains--left" />
      <div className="stage-curtains stage-curtains--right" />

      <div className="stage-glow" />

      <div className="stage">
        <span className="stage__label">ESCENARIO</span>
        <span className="stage__ornament" />
      </div>
    </section>
  );
}