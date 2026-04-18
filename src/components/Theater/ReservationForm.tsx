interface ReservationFormProps {
  requestedSeats: number;
  onRequestedSeatsChange: (value: number) => void;
  onConfirm: () => void;
}

export default function ReservationForm({
  requestedSeats,
  onRequestedSeatsChange,
  onConfirm,
}: ReservationFormProps) {
  return (
    <aside className="reservation-card">
      <h2>Tu reservación</h2>
      <p>Selecciona la cantidad de asientos que deseas apartar.</p>

      <div className="reservation-card__group">
        <label htmlFor="seatCount">Cantidad de asientos</label>
        <input
          id="seatCount"
          type="number"
          min={1}
          max={10}
          value={requestedSeats}
          onChange={(e) => onRequestedSeatsChange(Number(e.target.value))}
        />
      </div>

      <button type="button" onClick={onConfirm}>
        Confirmar reserva
      </button>

      <div className="reservation-summary">
        <h3>Detalle</h3>
        <p>
          Los asientos ocupados no pueden seleccionarse. Los asientos activos se
          muestran resaltados.
        </p>
      </div>
    </aside>
  );
}