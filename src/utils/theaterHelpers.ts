import type { Seat } from "../types/seat";

export const findBestCenteredBlockInRow = (
  row: Seat[],
  requestedSeats: number
): number[] => {
  if (requestedSeats <= 0 || requestedSeats > row.length) {
    return [];
  }

  const validBlocks: { ids: number[]; distanceToCenter: number }[] = [];
  const rowCenter = (row.length - 1) / 2;

  for (let start = 0; start <= row.length - requestedSeats; start++) {
    const block = row.slice(start, start + requestedSeats);
    const allAvailable = block.every((seat) => seat.status !== "occupied");

    if (!allAvailable) {
      continue;
    }

    const blockCenter = start + (requestedSeats - 1) / 2;
    const distanceToCenter = Math.abs(blockCenter - rowCenter);

    validBlocks.push({
      ids: block.map((seat) => seat.id),
      distanceToCenter,
    });
  }

  if (validBlocks.length === 0) {
    return [];
  }

  validBlocks.sort((a, b) => a.distanceToCenter - b.distanceToCenter);

  return validBlocks[0].ids;
};

export const suggest = (
  seats: Seat[][],
  requestedSeats: number
): Set<number> => {
  if (requestedSeats <= 0 || seats.length === 0) {
    return new Set<number>();
  }

  const maxRowSize = Math.max(...seats.map((row) => row.length), 0);

  if (requestedSeats > maxRowSize) {
    return new Set<number>();
  }

  // Recorre desde la primera fila (frente al escenario) hacia atrás
  for (const row of seats) {
    const bestBlock = findBestCenteredBlockInRow(row, requestedSeats);

    if (bestBlock.length > 0) {
      return new Set<number>(bestBlock);
    }
  }

  return new Set<number>();
};

export const applySuggestedSeats = (
  seats: Seat[][],
  suggestedSeatIds: Set<number>
): Seat[][] => {
  return seats.map((row) =>
    row.map((seat) => {
      if (seat.status === "occupied") {
        return seat;
      }

      if (suggestedSeatIds.has(seat.id)) {
        return { ...seat, status: "selected" };
      }

      return seat.status === "selected"
        ? { ...seat, status: "available" }
        : seat;
    })
  );
};