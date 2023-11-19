import React, { useState, useRef } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { toBlob } from 'html-to-image';

const WritableCalendar = () => {
  const [date, setDate] = useState(new Date());
  const [eventText, setEventText] = useState('');
  const [events, setEvents] = useState({});
  const overlayRef = useRef(null);

  const handleDateChange = (newDate) => {
    setDate(newDate);
  };

  const handleTextChange = (e) => {
    setEventText(e.target.value);
  };

  const addEvent = () => {
    const dateString = date.toISOString().split('T')[0];

    setEvents((prevEvents) => ({
      ...prevEvents,
      [dateString]: [...(prevEvents[dateString] || []), eventText],
    }));
    setEventText('');
  };

  const downloadCalendar = async () => {
    try {
      const overlayContainer = overlayRef.current;
  
      // Create a new container for events
      const eventsDiv = document.createElement('div');
      eventsDiv.className = 'events-overlay';
  
      // Add events to the overlay container
      Object.entries(events).forEach(([dateString, dayEvents]) => {
        const dateCell = document.querySelector(`.react-calendar__tile[data-date="${dateString}"]`);
        if (dateCell) {
          const eventDiv = document.createElement('div');
          eventDiv.className = 'event-marker';
          dayEvents.forEach((event, index) => {
            const eventParagraph = document.createElement('p');
            eventParagraph.textContent = event;
            eventDiv.appendChild(eventParagraph);
          });
          eventsDiv.appendChild(eventDiv);
        }
      });
  
      overlayContainer.appendChild(eventsDiv);
  
      // Use html-to-image library to capture the combined content as an image
      const canvas = await toBlob(overlayContainer);
  
      // Create a download link and trigger the download
      const a = document.createElement('a');
      a.href = URL.createObjectURL(canvas);
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
      const dayEvents = events[dateString];
      return (
        <div>
          {dayEvents && dayEvents.map((event, index) => <p key={index}>{event}</p>)}
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
        <div className="col-md-6 mb-3">
          <div className="card p-3">
            <h4>{date.toDateString()}</h4>
            <textarea
              className="form-control mb-3"
              value={eventText}
              onChange={handleTextChange}
              placeholder="Enter event text"
            />
            <button className="btn btn-primary" onClick={addEvent}>
              Add Event
            </button>
          </div>
        </div>
      </div>
      <div className="card p-3 mt-3" id="events-container">
        <h4>Events</h4>
        <ul>
          {Object.entries(events).map(([dateString, dayEvents]) => (
            <li key={dateString}>
              <strong>{new Date(dateString).toDateString()}:</strong>
              <ul>
                {dayEvents.map((event, index) => (
                  <li key={index}>{event}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
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
