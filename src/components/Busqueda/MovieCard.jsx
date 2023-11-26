// MovieCard.js
import React from 'react';
const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;

const MovieCard = ({ movie, handleSelectedMovie }) => {
  return (
    <div className="col-md-4 mb-3" onClick={() => handleSelectedMovie(movie)}>
      <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%" />
      { (movie.media_type === 'movie') ? <h4 className='text-center'>Película</h4> : <h4 className='text-center'>Series</h4>}
    </div>
  );
};

export default MovieCard;
