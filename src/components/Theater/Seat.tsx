import type { Seat } from "../../types/seat";

interface SeatProps {
  seat: Seat;
  onClick?: (seatId: number) => void;
}

export default function Seat({ seat, onClick }: SeatProps) {
  return (
    <button
      type="button"
      className={`seat seat--${seat.status}`}
      onClick={() => onClick?.(seat.id)}
      disabled={seat.status === "occupied"}
      aria-label={`Asiento fila ${seat.row}, número ${seat.number}, estado ${seat.status}`}
      title={`Fila ${seat.row} - Asiento ${seat.number}`}
    >
      {seat.number}
    </button>
  );
}