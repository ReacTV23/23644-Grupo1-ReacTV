import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IntroVideo from './components/IntroVideo/IntroVideo.jsx';
import Home from './pages/Home/Home';
// import { BrowserRouter } from 'react-router-dom';
import './App.css';


function App() {
  const [showVideo, setShowVideo] = useState(false); //pasar a true una vez que se terminen las pruebas

  const handleVideoEnd = () => {
    console.log('Video ended');
    setShowVideo(false);
  };

  return (
    <>
      <CssBaseline/>
      {showVideo ? (
        <IntroVideo onVideoEnd={handleVideoEnd} />
      ) : (
      /*<BrowserRouter>*/
        <Home/>
      /*</BrowserRouter>*/
      )};
    </>
  );
}

export default App;