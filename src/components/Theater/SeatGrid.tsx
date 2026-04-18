import type { Seat } from "../../types/seat";
import SeatRow from "./SeatRow";

interface SeatGridProps {
  seats: Seat[][];
  onSeatClick: (seatId: number) => void;
}

export default function SeatGrid({ seats, onSeatClick }: SeatGridProps) {
  return (
    <section className="seat-grid">
      {seats.map((row, index) => (
        <SeatRow
          key={index}
          rowLabel={String.fromCharCode(65 + index)}
          seats={row}
          onSeatClick={onSeatClick}
        />
      ))}
    </section>
  );
}