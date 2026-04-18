import type { Seat } from "../../types/seat";

interface ReservationFormProps {
  requestedSeats: number;
  onRequestedSeatsChange: (value: number) => void;
  onConfirm: () => void;
  selectedSeats: Seat[];
  message: string;
}

export default function ReservationForm({
  requestedSeats,
  onRequestedSeatsChange,
  onConfirm,
  selectedSeats,
  message,
}: ReservationFormProps) {
  return (
    <aside className="reservation-card">
      <h2>Tu reservación</h2>
      <p>Selecciona la cantidad de asientos que deseas apartar.</p>

      <div className="reservation-card__group">
        <label htmlFor="seatCount">Cantidad de asientos</label>
        <input
          id="seatCount"
          type="text"
          inputMode="numeric"
          pattern="[0-9]*"
          value={requestedSeats}
          onChange={(e) => {
            const digitsOnly = e.target.value.replace(/\D/g, "");
            onRequestedSeatsChange(digitsOnly === "" ? 0 : Number(digitsOnly));
          }}
        />
      </div>

      <button type="button" onClick={onConfirm}>
        Sugerir asientos
      </button>

      <div className="reservation-summary">
        <h3>Asientos seleccionados</h3>

        {selectedSeats.length > 0 ? (
          <p>
            {selectedSeats
              .map((seat) => `Fila ${String.fromCharCode(64 + seat.row)} - ${seat.number}`)
              .join(", ")}
          </p>
        ) : (
          <p>No hay asientos preseleccionados.</p>
        )}

        {message && <p className="reservation-message">{message}</p>}
      </div>
    </aside>
  );
}