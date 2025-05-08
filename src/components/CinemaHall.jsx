// src/components/CinemaHall.jsx
import React, { useState } from 'react';
import './CinemaHall.css';

const CinemaHall = ({ movie }) => {
  const rows = 5;
  const seatsPerRow = 6;

  const generateSeats = () => {
    return Array.from({ length: rows }, (_, row) =>
      Array.from({ length: seatsPerRow }, (_, seat) => ({
        id: `${row + 1}-${seat + 1}`,
        selected: false,
        booked: Math.random() < 0.2,
      }))
    );
  };

  const [seats, setSeats] = useState(generateSeats());

  const toggleSeat = (rowIdx, seatIdx) => {
    setSeats((prevSeats) =>
      prevSeats.map((row, r) =>
        row.map((seat, s) =>
          r === rowIdx && s === seatIdx && !seat.booked
            ? { ...seat, selected: !seat.selected }
            : seat
        )
      )
    );
  };

  const selectedSeats = seats.flat().filter((seat) => seat.selected);

  return (
    <div>
      <div className="cinema-grid">
        {seats.map((row, rowIndex) =>
          row.map((seat, seatIndex) => (
            <div
              key={seat.id}
              className={`seat 
                ${seat.booked ? 'booked' : ''} 
                ${seat.selected ? 'selected' : ''}`}
              onClick={() => toggleSeat(rowIndex, seatIndex)}
            >
              {seat.id}
            </div>
          ))
        )}
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>Вибрані місця:</strong>{' '}
        {selectedSeats.length > 0
          ? selectedSeats.map((s) => s.id).join(', ')
          : 'немає'}
      </div>
    </div>
  );
};

export default CinemaHall;
