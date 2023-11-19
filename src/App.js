import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IntroVideo from './components/IntroVideo';
import Home from './pages/Home/Home';
import './App.css';

function App() {
  const [showVideo, setShowVideo] = useState(true);

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
      <Home />
      )};
    </>
  );
}

export default App;