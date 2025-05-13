import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getBookedSeats, saveBooking } from "./services/BookingService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CinemaHall = () => {
  const { id } = useParams();
  const [bookedSeats, setBookedSeats] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [userDetails, setUserDetails] = useState({ name: "", phone: "", email: "" });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const seats = getBookedSeats(id);
    setBookedSeats(seats);
  }, [id]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats((prev) =>
      prev.includes(seat) ? prev.filter((s) => s !== seat) : [...prev, seat]
    );
  };

  const handleBooking = () => {
    const { name, phone, email } = userDetails;
    if (!name || !phone || !email) {
      toast.error("Заповніть усі поля!");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Невірний формат email!");
      return;
    }

    saveBooking(id, userDetails, selectedSeats);
    setBookedSeats((prev) => [...prev, ...selectedSeats]);
    toast.success("Бронювання успішне!");

    setSelectedSeats([]);
    setUserDetails({ name: "", phone: "", email: "" });
    setShowForm(false);
  };

  const seats = Array.from({ length: 30 }, (_, i) => `Місце ${i + 1}`);

  return (
    <div className="home-container">
      <h2 className="home-title">Фільм ID: {id}</h2>

      <div className="cinema-hall">
        {seats.map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`seat 
              ${bookedSeats.includes(seat) ? "booked" : ""}
              ${selectedSeats.includes(seat) ? "selected" : "available"}
            `}
            disabled={bookedSeats.includes(seat)}
          >
            {seat}
          </button>
        ))}
      </div>

      {selectedSeats.length > 0 && (
        <div className="selected-seats">
          <strong>Вибрані місця:</strong>
          <div className="seats-list">
            {selectedSeats.map((s) => (
              <span key={s} className="seat-chip">{s}</span>
            ))}
          </div>
        </div>
      )}

      {!showForm && selectedSeats.length > 0 && (
        <button className="book-btn" onClick={() => setShowForm(true)}>
          Забронювати
        </button>
      )}

      {showForm && (
        <form className="booking-form show" onSubmit={(e) => { e.preventDefault(); handleBooking(); }}>
          <input
            type="text"
            placeholder="Ім'я"
            value={userDetails.name}
            onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Телефон"
            value={userDetails.phone}
            onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={userDetails.email}
            onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
            required
          />
          <button type="submit">Підтвердити бронювання</button>
        </form>
      )}
    </div>
  );
};

export default CinemaHall;
