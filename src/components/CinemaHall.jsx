import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookedSeats } from '../services/BookingService';

const CinemaHall = () => {
  const { movieId } = useParams();
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
