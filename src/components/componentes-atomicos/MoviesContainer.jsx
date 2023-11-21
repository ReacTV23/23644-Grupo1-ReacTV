// MoviesContainer.js
import React from 'react';
import MovieCard from './MovieCard';

const MoviesContainer = ({ movies, handleSelectedMovie }) => {
  console.log("Movies in MoviesContainer:", movies);
  return (
    <div className='container mt-3'>
      <div className='row'>
        {movies.map((result) => {
          // Verifica si el resultado es una película o una serie antes de mostrar la tarjeta
          if (result.media_type === 'movie' || result.media_type === 'tv') {
            return (
              <MovieCard
                key={result.id}
                movie={result}
                handleSelectedMovie={handleSelectedMovie}
              />
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default MoviesContainer;
