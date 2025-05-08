import React from 'react';
import MovieList from '../components/MovieList';
import movies from '../data/movies';

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Список фільмів</h1>
      <MovieList movies={movies} />
    </div>
  );
};

export default Home;
