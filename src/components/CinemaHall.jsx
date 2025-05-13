// src/components/CinemaHall.jsx
import React, { useEffect, useState } from 'react';
import { getBookedSeats } from '../services/BookingService';
import './CinemaHall.css';

const CinemaHall = ({ movieId }) => {
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    if (movieId) {
      const seats = getBookedSeats(movieId);
      setBookedSeats(seats);
    }
  }, [movieId]);

  const seats = Array.from({ length: 30 }, (_, i) => `Місце ${i + 1}`);

  return (
    <div className="cinema-grid">
      {seats.map((seat) => (
        <div
          key={seat}
          className={`seat ${bookedSeats.includes(seat) ? 'booked' : ''}`}
        >
          {seat}
        </div>
      ))}
    </div>
  );
};

export default CinemaHall;
