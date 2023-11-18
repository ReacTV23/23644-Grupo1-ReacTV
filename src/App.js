import React, { useState } from 'react';
import './App.css';
import IntroVideo from './componentes/IntroVideo';
import Api from './componentes/Api';

function App() {
  const [showVideo, setShowVideo] = useState(true);

  const handleVideoEnd = () => {
    console.log('Video ended');
    setShowVideo(false);
  };

  return (
    <div className="App">
      {showVideo ? (
        <IntroVideo onVideoEnd={handleVideoEnd} />
      ) : (
        <Api />
      )}
    </div>
  );
}

export default App;
