import type { Seat as SeatType } from "../../types/seat";
import Seat from "./Seat";

interface SeatRowProps {
  rowLabel: string;
  seats: SeatType[];
  onSeatClick: (seatId: number) => void;
}

export default function SeatRow({ rowLabel, seats, onSeatClick }: SeatRowProps) {
  return (
    <div className="seat-row">
      <div className="seat-row__label">{rowLabel}</div>

      <div className="seat-row__seats">
        {seats.map((seat) => (
          <Seat key={seat.id} seat={seat} onClick={onSeatClick} />
        ))}
      </div>
    </div>
  );
}