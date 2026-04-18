import { useState } from "react";
import { createInitialSeats } from "../data/seats";
import Stage from "../components/Theater/Stage";
import SeatLegend from "../components/Theater/SeatLegend";
import SeatGrid from "../components/Theater/SeatGrid";
import ReservationForm from "../components/Theater/ReservationForm";
import Footer from "../components/Layout/Footer";


export default function TheaterPage() {
  const [seats, setSeats] = useState(createInitialSeats());
  const [requestedSeats, setRequestedSeats] = useState(1);

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
  };

  const handleConfirmReservation = () => {
    alert(`Reserva enviada para ${requestedSeats} asiento(s).`);
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
          <Stage />
          <SeatLegend />
          <SeatGrid seats={seats} onSeatClick={handleSeatClick} />
        </div>

        <ReservationForm
          requestedSeats={requestedSeats}
          onRequestedSeatsChange={setRequestedSeats}
          onConfirm={handleConfirmReservation}
        />
      </section>

      <Footer />
    </main>
  );
}