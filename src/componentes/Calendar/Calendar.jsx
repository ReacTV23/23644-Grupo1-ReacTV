import React, { useState, useRef, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import html2canvas from 'html2canvas';

const WritableCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [events, setEvents] = useState({});
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const overlayRef = useRef(null);

  useEffect(() => {
    // Fetch upcoming movies from TMDB API
    const fetchUpcomingMovies = async () => {
      const apiKey = '3e1d7bff8444d6e86809e57e9496b17c';
      const url = `https://api.themoviedb.org/3/movie/upcoming?language=es-AR&api_key=${apiKey}`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setUpcomingMovies(data.results || []);
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
      const calendarContainer = document.getElementById('calendar-container');
      const overlayContainer = overlayRef.current;

      // Clone the calendar container to prevent changes to the original
      const clonedContainer = calendarContainer.cloneNode(true);

      // Append a new container for events to the cloned container
      const eventsDiv = document.createElement('div');
      eventsDiv.className = 'events-overlay';

      // Add events to the overlay container
      Object.entries(events).forEach(([eventDate, eventText]) => {
        const dateCell = clonedContainer.querySelector(
          `.react-calendar__tile[data-date="${eventDate.split('T')[0]}"]`
        );
        if (dateCell) {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'event-marker';
          eventDiv.textContent = eventText;
          eventsDiv.appendChild(eventDiv);
        }
      });

      // Add upcoming movies to the overlay container
      upcomingMovies.forEach((movie) => {
        const movieDate = new Date(movie.release_date);
        const dateString = movieDate.toISOString().split('T')[0];
        const dateCell = clonedContainer.querySelector(
          `.react-calendar__tile[data-date="${dateString}"]`
        );
        if (dateCell) {
          const movieDiv = document.createElement('div');
          movieDiv.className = 'movie-marker';
          movieDiv.textContent = movie.title;
          eventsDiv.appendChild(movieDiv);
        }
      });

      clonedContainer.appendChild(eventsDiv);

      overlayContainer.appendChild(clonedContainer);

      // Use html2canvas library to capture the combined content as an image
      const canvas = await html2canvas(overlayContainer, { scale: 2 });

      // Convert canvas to image data URL as JPEG
      const imageDataUrl = canvas.toDataURL('image/jpeg', 1.0);

      // Create a download link and trigger the download
      const a = document.createElement('a');
      a.href = imageDataUrl;
      a.download = 'writable_calendar.jpg';
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
        <div>
          {dayEvents.map((event, index) => (
            <p key={index}>{event}</p>
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
      <h1 className="mb-4">Writable Calendar</h1>
      <div className="row">
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <Calendar onChange={handleDateChange} value={date} tileContent={tileContent} />
          </div>
        </div>
      </div>
      <div className="mt-3">
        <button className="btn btn-success" onClick={downloadCalendar}>
          Download Calendar
        </button>
      </div>

      {/* Hidden overlay container for capturing the combined content */}
      <div ref={overlayRef} className="overlay-container" style={{ display: 'none' }} />
    </div>
  );
};

export default WritableCalendar;
