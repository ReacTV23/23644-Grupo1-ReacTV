import React, { useState} from 'react';
import Loader from '../Loader/Loader'


const VideoPlayer = () => {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [videoPlaying, setVideoPlaying] = useState(false);

    const handleVideoLoad = () => {
        // Indicar que el video se ha cargado
        setVideoLoaded(true);
        // Iniciar la reproducción del video después de que se ha cargado y si está permitido
        if (videoPlaying) {
            const video = document.getElementById('miVideo');
            video.play();
        }
    };

    return (
        <div>
        {!videoLoaded && <Loader/>}

        <video id="miVideo" controls onLoadedData={handleVideoLoad}>
        <source src="/assets/videos/video-2-intro.mp4" type="video/mp4" />
        Tu navegador no soporta el elemento de video.
        </video>
    </div>
    );
};

export default VideoPlayer;

