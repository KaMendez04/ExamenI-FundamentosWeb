import { useMemo, useState } from "react";
import Stage from "../components/Theater/Stage";
import SeatGrid from "../components/Theater/SeatGrid";
import SeatLegend from "../components/Theater/SeatLegend";
import ReservationForm from "../components/Theater/ReservationForm";
import Footer from "../components/Layout/Footer";
import { createInitialSeats } from "../data/seats";
import { applySuggestedSeats, suggest } from "../utils/theaterHelpers";

export default function TheaterPage() {
  const [seats, setSeats] = useState(createInitialSeats());
  const [requestedSeats, setRequestedSeats] = useState(1);
  const [message, setMessage] = useState("");

  const selectedSeats = useMemo(() => {
    return seats.flat().filter((seat) => seat.status === "selected");
  }, [seats]);

  const handleSeatClick = (seatId: number) => {
    setSeats((prevSeats) =>
      prevSeats.map((row) =>
        row.map((seat) =>
          seat.id === seatId
            ? {
                ...seat,
                status:
                  seat.status === "available"
                    ? "selected"
                    : seat.status === "selected"
                    ? "available"
                    : seat.status,
              }
            : seat
        )
      )
    );

    setMessage("");
  };

  const handleConfirmReservation = () => {
    const suggestedSeatIds = suggest(seats, requestedSeats);

    if (suggestedSeatIds.size === 0) {
      setMessage("No se encontraron asientos consecutivos disponibles para esa cantidad.");
      setSeats((prevSeats) =>
        prevSeats.map((row) =>
          row.map((seat) =>
            seat.status === "selected"
              ? { ...seat, status: "available" }
              : seat
          )
        )
      );
      return;
    }

    setSeats((prevSeats) => applySuggestedSeats(prevSeats, suggestedSeatIds));
    setMessage(`Se preseleccionaron ${suggestedSeatIds.size} asiento(s) automáticamente.`);
  };

  return (
    <main className="theater-page">
      <section className="hero">
        <span className="hero__badge">TEATRO-UNA</span>
        <h1>Selección de asientos</h1>
        <p>
          Reserva tus espacios en la sala principal con una vista clara,
          elegante y fácil de usar.
        </p>
      </section>

      <section className="theater-container">
        <div className="theater-layout">
          <SeatLegend />
          <Stage />
          <SeatGrid seats={seats} onSeatClick={handleSeatClick} />
        </div>

        <ReservationForm
          requestedSeats={requestedSeats}
          onRequestedSeatsChange={setRequestedSeats}
          onConfirm={handleConfirmReservation}
          selectedSeats={selectedSeats}
          message={message}
        />
      </section>

      <Footer />
    </main>
  );
}