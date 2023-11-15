import React, { useEffect, useState } from 'react';
import './App.css';
import './IntroVideo.css';
import IntroVideo from './componentes/IntroVideo';
import Api from './componentes/Api.jsx'



function App() {
  const [videoVisible, setVideoVisible] = useState(true);

  useEffect(() => {
    const video = document.getElementById('introVideo');

    const handleEnded = () => {
      // Ocultar el video una vez que termine de reproducirse
      setVideoVisible(false);
    };

    video.addEventListener('ended', handleEnded);

    // Limpia el event listener cuando el componente se desmonta
    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  return (
    <div className="App">
      {videoVisible && <IntroVideo />}
      <Api/> 
          </div>
  );
}

export default App;











