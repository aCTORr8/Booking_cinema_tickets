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

  useEffect(() => {
    const seats = getBookedSeats(id);
    setBookedSeats(seats);
  }, [id]);

  const handleSeatClick = (seat) => {
    if (bookedSeats.includes(seat)) return;
    setSelectedSeats(prev =>
      prev.includes(seat) ? prev.filter(s => s !== seat) : [...prev, seat]
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
    setBookedSeats(prev => [...prev, ...selectedSeats]);
    toast.success("Бронювання успішне!");

    setSelectedSeats([]);
    setUserDetails({ name: "", phone: "", email: "" });
  };

  const seats = Array.from({ length: 30 }, (_, i) => `Місце ${i + 1}`);

  return (
    <div className="container">
      <div className='cinema-title'><h2>Фільм ID: {id}</h2></div>
        <div className="cinema-hall">
          {seats.map((seat) => (
            <button
              key={seat}
              onClick={() => handleSeatClick(seat)}
              className={`seat 
                ${bookedSeats.includes(seat) ? "booked" : ""}
                ${selectedSeats.includes(seat) ? 'selected' : 'available'}
              `}
              disabled={bookedSeats.includes(seat)}
            >
              {seat}
            </button>
          ))}
        </div>

      <div className="form">
        <h3>Вибрані місця:</h3>
        <p>{selectedSeats.join(", ") || "Немає"}</p>

        <input
          type="text"
          placeholder="Ім'я"
          value={userDetails.name}
          onChange={(e) => setUserDetails({ ...userDetails, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Телефон"
          value={userDetails.phone}
          onChange={(e) => setUserDetails({ ...userDetails, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={userDetails.email}
          onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
        />
        <button onClick={handleBooking}>Забронювати</button>
      </div>
    </div>
  );
};

export default CinemaHall;
