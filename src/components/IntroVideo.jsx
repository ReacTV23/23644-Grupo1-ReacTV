import React, { useEffect } from 'react';
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import '../IntroVideo.css';

const IntroVideo = ({ onVideoEnd }) => {
  useEffect(() => {
    const player = videojs('introVideo', {
      autoplay: true,
      muted: false,
      controls: false, // Desactiva los controles predeterminados
      sources: [
        {
          src: '/assets/img/videos/video-2-intro.mp4',
          type: 'video/mp4',
        },
      ],
    });

    // Muestra u oculta los controles personalizados al hacer clic en el video
    player.on('click', () => {
      player.controls(player.controls() ? false : true);
     
    });
   
    player.on('ended', onVideoEnd);

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [onVideoEnd]);

  return (
    <div className="intro-video-container">
      <video id="introVideo" className="video-js vjs-default-skin" />
    </div>
  );
};

export default IntroVideo;
