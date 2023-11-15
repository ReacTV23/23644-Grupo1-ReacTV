import React from 'react';
import '../IntroVideo.css';


const IntroVideo = () => {
  return (
    <div className="intro-video-container">
      <video id="introVideo" autoPlay muted>
        <source src="/assets/img/videos/intro-1-usuario.mp4" type="video/mp4" />
        Tu navegador no soporta el tag de video.
      </video>
    </div>
  );
};

export default IntroVideo;