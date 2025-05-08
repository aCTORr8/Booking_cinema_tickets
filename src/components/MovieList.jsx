import React, { useState } from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('all');

  const filterMovies = () => {
    return movies
      .filter(movie => 
        movie.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedGenre === 'all' || movie.genre === selectedGenre)
      );
  };

  return (
    <div className="app">
      <div className="app-header">
        <h1>Доступні фільми для бронювання:</h1>
      </div>

      <div className="search-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Пошук за назвою"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <select 
          className="genre-select"
          onChange={(e) => setSelectedGenre(e.target.value)} 
          value={selectedGenre}
        >
          <option value="all">Всі жанри</option>
          <option value="Бойовик">Бойовик</option>
          <option value="Драма">Драма</option>
          <option value="Комедія">Комедія</option>
          <option value="Трилер">Трилер</option>
          <option value="Наукова фантастика">Наукова фантастика</option>
        </select>
      </div>

      <div className="movie-list">
        {filterMovies().map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default MovieList;
