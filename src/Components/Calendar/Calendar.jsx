import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import html2canvas from 'html2canvas';
import './Calendar.css';

const WritableCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [movieDataLoaded, setMovieDataLoaded] = useState(false);
  const overlayRef = useRef(null);

  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      const apiKey = '3e1d7bff8444d6e86809e57e9496b17c';
      const url = `https://api.themoviedb.org/3/movie/upcoming?language=es-AR&api_key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setUpcomingMovies(data.results || []);
        setMovieDataLoaded(true);
      } catch (error) {
        console.error('Error fetching upcoming movies:', error);
      }
    };

    fetchUpcomingMovies();
  }, []);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const downloadCalendar = async () => {
    try {
      if (!movieDataLoaded) {
        console.error('Movie data not loaded. Cannot download calendar.');
        return;
      }
  
      const overlayContainer = overlayRef.current;
  
      // Use window.requestAnimationFrame to wait for the next animation frame
      window.requestAnimationFrame(async () => {
        // Use html2canvas library to capture the entire document as an image
        const canvas = await html2canvas(document.documentElement, { scale: 2, allowTaint: true, useCORS: false });
  
        // Convert canvas to image data URL as JPEG
        const imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);
  
        // Create a download link and trigger the download
        const a = document.createElement('a');
        a.href = imageDataUrl;
        a.download = 'full_document.jpg';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
  
        // Clear the overlay container for the next download
        overlayContainer.innerHTML = '';
      });
    } catch (error) {
      console.error('Error capturing document:', error);
    }
  };
  

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      const dayEvents = events[dateString] || [];

      return (
        <div className="tile-content">
          {dayEvents.map((event, index) => (
            <p key={index} className="event-text">
              {event}
            </p>
          ))}
          {movieNames.map((movieName, index) => (
            <p key={index} className="movie-name">
              {movieName}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Calendario de estrenos</h1>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card p-3" id="calendar-container">
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
        <button className="btn btn-success" onClick={downloadCalendar}>
          Descargar el calendario
        </button>
      </div>

      {/* Hidden overlay container for capturing the combined content */}
      <div ref={overlayRef} className="overlay-container" style={{ display: 'none' }} />
    </div>
  );
};

export default WritableCalendar;
