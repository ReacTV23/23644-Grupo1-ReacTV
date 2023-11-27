import React from 'react';
import { Link  } from 'react-router-dom';

const MovieCard = ({dato}) => {

  const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;

  const MediaTypeBadge = ({ mediaType }) => {
    const getMediaTypeClass = () => {
      return mediaType === 'movie' ? 'movie' : 'series';
    };
    return <h4 className={`text-center ${getMediaTypeClass()}`}>{mediaType === 'movie' ? 'Película' : 'Serie'}</h4>;
  };
  
  return (
    <div className='col-md-4 mb-3'>
      <Link to="/card" state={{ dato }}>
        <img src={`${URL_IMAGE + dato.poster_path}`} alt="" height={600} width="100%" />
        <MediaTypeBadge mediaType={dato.media_type} />
      </Link>
    </div>
  );
};


export default MovieCard;
