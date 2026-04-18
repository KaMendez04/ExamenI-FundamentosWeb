import type { Seat } from "../types/seat";

const TOTAL_ROWS = 6;
const SEATS_PER_ROW = 10;

export const createInitialSeats = (): Seat[][] => {
  const occupiedSeats = new Set([3, 7, 12, 18, 25, 26, 41, 49, 54]);

  let globalId = 1;

  return Array.from({ length: TOTAL_ROWS }, (_, rowIndex) => {
    return Array.from({ length: SEATS_PER_ROW }, (_, seatIndex) => {
      const seat: Seat = {
        id: globalId,
        row: rowIndex + 1,
        number: seatIndex + 1,
        status: occupiedSeats.has(globalId) ? "occupied" : "available",
      };

      globalId++;
      return seat;
    });
  });
};