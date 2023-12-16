import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from "../../context/authContext2.js";
import 'video.js/dist/video-js.css';
import videojs from 'video.js';
import Boton from '../Boton/Boton';
import colors from '../../config/config.js';
import './IntroVideo2.css';

const IntroVideo = () => {

  const [skipIntro, setSkipIntro] = useState(false);
  const [showSkipButton, setShowSkipButton] = useState(true);
  const [showPlayButton, setShowPlayButton] = useState(true);

  const {setShowVideo}  = useAuth();
  const showVideoFromLocalStorage = localStorage.getItem("showVideo");
  console.log(showVideoFromLocalStorage);

  useEffect(() => {
    // Establecer el estado después del renderizado inicial
    setShowVideo(showVideoFromLocalStorage);
  }, [showVideoFromLocalStorage]);

  const videoRef = useRef(null);

  // función manejo de video
  const handleVideoEnd = () => {
    console.log("Video ended");
    setShowVideo(false);
    // Guardar el estado en el almacenamiento local
    localStorage.setItem("showVideo", "false");
  };

  useEffect(() => {
    const player = videojs(videoRef.current, {
      autoplay: true,
      muted: false,
      controls: false,
      sources: [
        {
          src: '/assets/videos/video-2-intro.mp4',
          type: 'video/mp4',
        },
      ],
    });

    player.on('click', () => {
      player.controls(player.controls() ? false : true);
    });

    // Oculta el botón solo después de que el video ha terminado
    player.on('ended', () => {
      if (!skipIntro) {
        setShowPlayButton(false);
        handleVideoEnd();
      }
    });

    // Muestra el botón "Omitir Intro" después de un breve retraso
    setTimeout(() => {
      setShowSkipButton(true);
    }, 1000); // Ajusta el tiempo de espera según sea necesario

    return () => {
      if (player) {
        player.dispose();
      }
    };
  }, [skipIntro]);

  const handleSkipIntro = () => {
    console.log("Skipping Intro");
    const player = videojs(videoRef.current);
      player.pause();
    setShowPlayButton(false); // Oculta el botón "Play Intro" cuando se omite la intro
    setShowSkipButton(false); // Oculta el botón "Omitir Intro" cuando se omite la intro
    handleVideoEnd();
  };

  const handlePlayIntro = () => {
    const player = videojs(videoRef.current);
    player.play();
    setShowPlayButton(false);
  };

  return (
    <div className="intro-video-container">
      <video ref={videoRef} className="video-js vjs-default-skin" />
      {!skipIntro && showSkipButton && (
        <div className="skip-intro-button">
          <Boton
            texto={'Omitir Intro'}
            width={'5rem'}
            fontSize={'1.5rem'}
            funcion={handleSkipIntro}
            backgroundColor={colors.naranja}
            backgroundHover={colors.azul}
          />
        </div>
      )}
      {!skipIntro && showPlayButton && (
        <div className="play-intro-button">
          <Boton
            texto={'Play Intro'}
            width={'5rem'}
            fontSize={'1.5rem'}
            funcion={handlePlayIntro}
            backgroundColor={colors.naranja}
            backgroundHover={colors.azul}
          />
        </div>
      )}
    </div>
  );
};

export default IntroVideo;
