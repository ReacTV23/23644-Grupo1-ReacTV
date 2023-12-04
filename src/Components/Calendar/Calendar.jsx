import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import html2canvas from 'html2canvas';
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import EventIcon from '@mui/icons-material/Event';
import CardImg from '../Card/CardImg/CardImg';
import Boton from '../Boton/Boton';
import { getUpcomingMovies } from '../../services/tmdbService.js';
import { useNavigate } from 'react-router-dom';
import 'react-calendar/dist/Calendar.css';
import './Calendar.css';

const WritableCalendar = ({ onInfoChange }) => {
  const navigate = useNavigate();
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const calendarContainerRef = useRef(null);

  const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;

  useEffect(() => {
    getUpcomingMoviesData();
  }, []);

  const getUpcomingMoviesData = async () => {
    try {
      const data = await getUpcomingMovies();
      setUpcomingMovies(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDateChange = (newDate) => setDate(newDate);

  const handleMovieClick = (movieId) => {
    console.log('Clicked on movie with ID:', movieId);
    setSelectedMovieId(movieId);
  };

  const handleClick = (peli) => {
    if (peli.media_type === 'movie') {
      navigate(`/card/movie/${peli.id}`, { dato: peli });
    } else {
      navigate(`/card/tv/${peli.id}`, { dato: peli });
    }
  }

  const downloadImagesLocally = async () => {
    const promises = upcomingMovies.map(async (movie) => {
      const response = await fetch(`${IMAGE_PATH + movie.poster_path}`);
      const blob = await response.blob();
      const objectURL = URL.createObjectURL(blob);
      return { id: movie.id, imageDataUrl: objectURL };
    });

    const imageArray = await Promise.all(promises);
    return imageArray.reduce((map, item) => ({ ...map, [item.id]: item.imageDataUrl }), {});
  };

  const downloadCalendar = async () => {
    try {
      const calendarContainer = calendarContainerRef.current;

      if (!calendarContainer) {
        console.error('Calendario no encontrado');
        return;
      }

      const images = await downloadImagesLocally();
      const canvas = await html2canvas(calendarContainer, { scale: 1, allowTaint: true, useCORS: false });
      const context = canvas.getContext('2d');

      upcomingMovies.forEach((movie) => {
        const imageDataUrl = images[movie.id];
        const movieDate = new Date(movie.release_date);
        const dateString = movieDate.toISOString().split('T')[0];
        const dateCell = calendarContainer.querySelector(`.react-calendar__tile[data-date="${dateString}"]`);

        if (dateCell) {
          const img = new Image();
          img.src = imageDataUrl;
          context.drawImage(img, 0, 0, img.width, img.height);
        }
      });

      html2canvas(calendarContainerRef.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement('a');
        link.href = canvas.toDataURL('image/png');
        link.download = 'cardDetalle.png';
        link.click();
      });

      const imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
      const a = document.createElement('a');
      a.href = imageDataUrl;
      a.download = 'full_calendar.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error capturing calendar:', error);
    }
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events[dateString] || [];

      return (
        <div className="tile-content">
          {dayEvents.map((event, index) => <p key={index} className="event-text">{event}</p>)}
          {upcomingMovies
            .filter((movie) => new Date(movie.release_date).toDateString() === date.toDateString())
            .map((movie) => (
              <p
                key={movie.id}
                className="movie-name"
                onClick={() => handleMovieClick(movie.id)}
              >
                {movie.title}
              </p>
            ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="contenedorPrincipal_calendario">
      <div className="subcontenedorPrincipal_calendario" ref={calendarContainerRef}>
        <h5 className="titulo_calendario mb-2">Calendario de estrenos</h5>
        <div className="contenedor_calendario">
          <div className="subcontenedor_calendario" id="calendar-container">
            <Calendar
              onChange={handleDateChange}
              value={date}
              tileContent={tileContent}
              className="custom-calendar"
            />
          </div>
          {selectedMovieId && (
            <div className="poster_calendario">
              <CardImg peli={upcomingMovies.find((movie) => movie.id === selectedMovieId)} funcion={() => handleClick(upcomingMovies.find((movie) => movie.id === selectedMovieId))} />
            </div>
          )}
        </div>
      </div>
      <div className="mt-3">
        <Boton Contenido={DownloadForOfflineIcon} color={'#003686'} colorHover={'#E08400'} fontSize={'60px'} funcion={downloadCalendar} />
        <Boton Contenido={EventIcon} color={'#003686'} colorHover={'#E08400'} fontSize={'60px'} />
      </div>
    </div>
  );
};

export default WritableCalendar;
