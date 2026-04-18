export type SeatStatus = "available" | "occupied" | "selected";

export interface Seat {
  id: number;
  row: number;
  number: number;
  status: SeatStatus;
}