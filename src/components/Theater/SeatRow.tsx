import type { Seat as SeatType } from "../../types/seat";
import Seat from "./Seat";

interface SeatRowProps {
  rowLabel: string;
  rowIndex: number;
  seats: SeatType[];
  onSeatClick: (seatId: number) => void;
}

export default function SeatRow({ rowLabel, rowIndex, seats, onSeatClick }: SeatRowProps) {
  const totalSeats = seats.length;

  return (
    <div className="seat-row">
      <div className="seat-row__label">{rowLabel}</div>
      <div className="seat-row__seats">
        {seats.map((seat, seatIndex) => {
          // Calcula cuánto sube o baja cada asiento según su posición
          // El centro queda en 0, los extremos suben (valor negativo = sube)
          const center = (totalSeats - 1) / 2;
          const distance = Math.abs(seatIndex - center) / center; // 0 en centro, 1 en extremos
         const arcDepth = 22 - rowIndex * 2; // antes era 12 - rowIndex * 1.5 // fila A más curva (12px), fila F menos (3px)
          const offsetY = (1 - distance * distance) * arcDepth; // centro baja, extremos en 0
          
          return (
            <div key={seat.id} style={{ transform: `translateY(${offsetY}px)` }}>
              <Seat seat={seat} onClick={onSeatClick} />
            </div>
          );
        })}
      </div>
    </div>
  );
}