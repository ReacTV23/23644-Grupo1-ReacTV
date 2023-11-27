import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import html2canvas from 'html2canvas';
import Boton from '../Boton'
import DownloadForOfflineIcon from '@mui/icons-material/DownloadForOffline';
import { getUpcomingMovies } from '../../services/tmdbService.js'
import EventIcon from '@mui/icons-material/Event';
import CardImg from '../Card/CardImg/CardImg'
import 'react-calendar/dist/Calendar.css';
import './Calendar.css'

const WritableCalendar = ({onInfoChange }) => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const overlayRef = useRef(null);
  const [mostrarPoster, setMostrarPoster] = useState(false);

  const getdata = async () =>  {
    try {
      const data = await getUpcomingMovies();
      setUpcomingMovies(data);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }

  useEffect(() => {
    getdata()
  }, [])

  // useEffect(() => {
  //   // Fetch upcoming movies from TMDB API
  //   const fetchUpcomingMovies = async () => {
  //     const apiKey = '3e1d7bff8444d6e86809e57e9496b17c';
  //     const url = `https://api.themoviedb.org/3/movie/upcoming?language=es-AR&api_key=${apiKey}`;

  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();
  //       setUpcomingMovies(data.results || [])
  //     } catch (error) {
  //       console.error('Error fetching upcoming movies:', error);
  //     }
  //   };

  //   fetchUpcomingMovies();
  // }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handlePoster = (movie) => {
    onInfoChange(movie);
    setMostrarPoster(false);
  }


  console.log(upcomingMovies)
  if (mostrarPoster) {
    return <CardImg peli={upcomingMovies} funcion={handlePoster}/>
  }

  const downloadCalendar = async () => {
    try {
      const calendarContainer = document.getElementById('calendar-container');
      const overlayContainer = overlayRef.current;
  
      // Create a wrapper element to enclose the calendar and events
      const wrapperElement = document.createElement('div');
      wrapperElement.className = 'calendar-wrapper';
  
      // Clone the calendar container and append to the wrapper
      const clonedCalendar = calendarContainer.cloneNode(true);
      wrapperElement.appendChild(clonedCalendar);
  
      // Add events and upcoming movies to the wrapper
      const eventsDiv = document.createElement('div');
      eventsDiv.className = 'events-overlay';
      wrapperElement.appendChild(eventsDiv);
  
      // Add events to the wrapper
      Object.entries(events).forEach(([eventDate, eventText]) => {
        const dateCell = clonedCalendar.querySelector(
          `.react-calendar__tile[data-date="${eventDate.split('T')[0]}"]`
        );
        if (dateCell) {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'event-marker';
          eventDiv.textContent = eventText;
          eventsDiv.appendChild(eventDiv);
        }
      });
  
      // Add upcoming movies to the 
      console.log(upcomingMovies)
      upcomingMovies.forEach((movie) => {
        const movieDate = new Date(movie.release_date);
        const dateString = movieDate.toISOString().split('T')[0];
        const dateCell = clonedCalendar.querySelector(
          `.react-calendar__tile[data-date="${dateString}"]`
        );
        if (dateCell) {
          const movieDiv = document.createElement('div');
          movieDiv.className = 'movie-marker';
          movieDiv.textContent = movie.title;
          eventsDiv.appendChild(movieDiv);
        }
      });
  
      // Append the wrapper element to the overlay container
      overlayContainer.appendChild(wrapperElement);
  
      // Use html2canvas library to capture the combined content as an image
      const canvas = await html2canvas(wrapperElement, { scale: 2, allowTaint: true, useCORS: true });
  
      // Convert canvas to image data URL as JPEG
      const imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
      // Create a download link and trigger the download
      const a = document.createElement('a');
      a.href = imageDataUrl;
      a.download = 'estrenos_del_mes.jpg';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
  
      // Clear the overlay container for the next download
      overlayContainer.innerHTML = '';
    } catch (error) {
      console.error('Error capturing calendar:', error);
    }
  };
  
  const tileContent = ({ date, view }) => {

    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events[dateString] || [];
      const movieNames = upcomingMovies
        .filter((movie) => new Date(movie.release_date).toDateString() === date.toDateString())
        .map((movie) => movie.title);

      return (
        <div className="tile-content">
          {dayEvents.map((event, index) => (
            <p key={index} className="event-text">
              {event}
            </p>
          ))}
          {movieNames.map((movieName, index) => (
            <p key={index} className="movie-name" onClick={()=>{setMostrarPoster(true)}}>
              {movieName}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
      <div className="container mt-2" style={{width:'60%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center'}}>
        <h5 className="mb-2" style={{textAling:'center', textTransform: 'uppercase'}}>Calendario de estrenos</h5>
        <div className="row">
          <div style={{width:'100%'}}> 
            <div className="card p-3" id="calendar-container" style={{backgroundColor: '#003686'}}>
              <Calendar
                onChange={handleDateChange}
                value={date}
                tileContent={tileContent}
                className="custom-calendar"
              />
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Boton Contenido={DownloadForOfflineIcon} color={'#003686'} colorHover={'#E08400'} fontSize={'60px'} funcion={downloadCalendar} />
          <Boton Contenido={EventIcon} color={'#003686'} colorHover={'#E08400'} fontSize={'60px'} />
        </div>

        {/* Hidden overlay container for capturing the combined content */}
        <div ref={overlayRef} className="overlay-container" style={{ display:'none' }} />
      </div>
  );
};

export default WritableCalendar;
