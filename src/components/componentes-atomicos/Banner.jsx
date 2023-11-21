
// Banner.jsx
import React, { useEffect } from 'react';
import YouTube from 'react-youtube';
import IMAGE_PATH  from './BusquedayB';

const Banner = ({ movie, trailer, playing, setPlaying }) => {
  console.log('IMAGE_PATH:', IMAGE_PATH);
  console.log('movie:', movie);
  console.log('trailer:', trailer);
  console.log('playing:', playing);

  useEffect(() => {
    if (movie && movie.id && !trailer) {
      // Si la película no tiene trailer, puedes manejarlo aquí
      console.log(`La película ${movie.title} no tiene trailer.`);
    } else if (trailer && playing) {
      // Configuración para reproducir el trailer
      // Puedes ajustar las opciones según tus necesidades
      const opts = {
        width: '100%',
        height: '100%',
        playerVars: {
          autoplay: 1,
          controls: 0,
          cc_load_policy: 0,
          fs: 0,
          iv_load_policy: 0,
          modestbranding: 0,
          rel: 0,
          showinfo: 0,
        },
      };
      setPlaying(true); // Asegúrate de que playing esté configurado a true
    }
  }, [trailer, playing, setPlaying, movie]);

  return (
    <div>
      {/* Contenido del banner */}
      {movie && (
        <div
          className="viewtrailer"
          style={{
            backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
          }}
        >
          {playing ? (
            <>
              {trailer ? (
                <YouTube
                  videoId={trailer.key}
                  className="reproductor container"
                  containerClassName={"youtube-container"}
                  opts={{
                    width: "100%",
                    height: "100%",
                    playerVars: {
                      autoplay: 1,
                      controls: 0,
                      cc_load_policy: 0,
                      fs: 0,
                      iv_load_policy: 0,
                      modestbranding: 0,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                />
              ) : (
                "Sorry, no trailer available"
              )}
              <button onClick={() => setPlaying(false)} className="boton">
                Close
              </button>
            </>
          ) : (
            // Contenido del banner cuando no se está reproduciendo el trailer
            <div className="container">
              <div className="">
                {trailer ? (
                  <button
                    className="boton"
                    onClick={() => setPlaying(true)}
                    type="button"
                  >
                    Play Trailer
                  </button>
                ) : (
                  "Sorry, no trailer available"
                )}
                <h1 className="text-white">{movie.title}</h1>
                <p className="text-white">{movie.overview}</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Banner;
