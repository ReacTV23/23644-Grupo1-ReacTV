import React from 'react';
const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;

const MovieCard = ({ dato }) => {

  const MediaTypeBadge = ({ mediaType }) => {
    const getMediaTypeClass = () => {
      return mediaType === 'movie' ? 'movie' : 'series';
    };
  
    return <h4 className={`text-center ${getMediaTypeClass()}`}>{mediaType === 'movie' ? 'Película' : 'Serie'}</h4>;
  };
  
  return (
    <div className='col-md-4 mb-3'>
      <img src={`${URL_IMAGE + dato.poster_path}`} alt="" height={600} width="100%" />
      <MediaTypeBadge mediaType={dato.media_type} />
    </div>
  );
};


export default MovieCard;
