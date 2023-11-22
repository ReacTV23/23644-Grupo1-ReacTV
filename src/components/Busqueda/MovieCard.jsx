// MovieCard.js
import React from 'react';
const URL_IMAGE = 'https://image.tmdb.org/t/p/original'; //

const MovieCard = ({ movie, handleSelectedMovie }) => {
  return (
    <div className="col-md-4 mb-3" onClick={() => handleSelectedMovie(movie)}>
      <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%" />
      <h4 className='text-center'>{movie.title}</h4>
    </div>
  );
};

export default MovieCard;
