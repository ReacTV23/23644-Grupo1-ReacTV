import React from 'react'
import Boton from '../../Boton'
import PlaylistAddCircleIcon from '@mui/icons-material/PlaylistAddCircle'
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import './CardDetalle.css'

const CardDetalle =({dato}) => {
    console.log(dato)

    const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;
    
    const ChangeLanguage= ({ lenguaje }) => {
        let lenguajeOriginal = ''; // Declarar la variable para evitar problemas
        if (lenguaje === 'en') lenguajeOriginal ='Inglés';
        if (lenguaje === 'es') lenguajeOriginal ='Español';
      return <p className='idioma original'>Idioma Original: {lenguajeOriginal}</p>
    }

  return (
      <article className='card-movie'>
        <div className='img-container'>
          <img className='img-pelicula' src={`${IMAGE_PATH}${dato.poster_path}`} alt={dato.id} />
        </div>
        <div className='btn-container'>
          <Boton Contenido={PlaylistAddCircleIcon}/>
          <Boton Contenido={PlayCircleIcon}/>
          <Boton Contenido={DownloadForOfflineIcon}/>
        </div>
        <div className='info-container'>
          <p className='titulo'>{dato.name}</p>
          <div className='info-movie'>
            <ChangeLanguage lenguaje={dato.original_language}/>
            <p className='duracion'>{dato.duracion}</p>
            <p className='genero'>{dato.genre}</p>
            <p className='year'>Año:{dato.first_air_date}</p>
          </div>
          <p className='descripcion'>{dato.overview}</p>
        </div>
      </article>
  )
}

export default CardDetalle
