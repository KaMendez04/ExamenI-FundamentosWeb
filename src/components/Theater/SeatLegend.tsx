export default function SeatLegend() {
  return (
    <div className="seat-legend">
      <div className="seat-legend__item">
        <span className="seat-legend__color seat-legend__color--available"></span>
        <span>Disponible</span>
      </div>

      <div className="seat-legend__item">
        <span className="seat-legend__color seat-legend__color--occupied"></span>
        <span>Ocupado</span>
      </div>

      <div className="seat-legend__item">
        <span className="seat-legend__color seat-legend__color--selected"></span>
        <span>Seleccionado</span>
      </div>
    </div>
  );
}