import React, { useState, useEffect } from "react";
import {
  getMovieById,
  getPopularMovies,
  getTrailersById,
} from "../../services/tmdbService";
import YouTube from "react-youtube";
import Carrusel from "../Carrusel/Carrusel";
import "./Banner.css";

function BannerConSelector() {
  // const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;
  const API_URL_IMAGE = "https://image.tmdb.org/t/p/original";

  const [showCardContainer, setShowCardContainer] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [actualPage, setActualPage] = useState(0);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async () => {
    try {
      // Traigo las peliculas populares
      const moviesData = await getPopularMovies(1);

      setMovies(moviesData);
      setMovie(moviesData[0]);

      if (moviesData.length) {
        await fetchMovie(moviesData[0].id);
      }
    } catch (error) {
      console.error(`Error buscando las peliculas: ${error.message}`);
    }
  };

  const fetchMovie = async (id) => {
    try {
      // busco los trailes
      const movieData = await getMovieById(id);
      const trailersData = await getTrailersById(id);
      // console.log("fetchMovie => ", trailersData);
      setTrailer(trailersData[0]);

      setMovie(movieData);
    } catch (error) {
      console.error(`Error buscando los trailers: ${error.message}`);
    }
  };

  const selectMovie = async (movie, actualPage) => {
    // console.log("BannerConSelector => selectMovie => actualPage:", actualPage);
    setActualPage(actualPage);
    fetchMovie(movie.id);
    setMovie(movie);
    setSelectedMovie(movie);
    setShowCardContainer(false);
    window.scrollTo(0, 0);
  };

  const closeBanner = () => {
    setPlaying(false); // Aseguramos que el reproductor de video esté cerrado
    setShowCardContainer(true); // Mostramos el contenedor de tarjetas
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // console.log('Movies:', movies)

  const CardContainer = () => {
    return (
      <div>
        <Carrusel
          peliculas={movies}
          selectMovie={selectMovie}
          actualPage={actualPage}
        />
      </div>
    );
  };

  return (
    <>
      {showCardContainer ? (
        <CardContainer />
      ) : (
        <div>
          <div style={{ margin: "1rem" }}>
            <main>
              <div
                className="viewtrailer"
                style={{
                  objectFit: "containt",
                  backgroundImage: `url("${API_URL_IMAGE}${movie.backdrop_path}")`,
                  width: "100%",
                  height: "100%",
                }}
              >
                {playing ? (
                  <div className="youtube-container">
                    <YouTube
                      className="reproductor"
                      videoId={trailer.key}
                      opts={{
                        playerVars: {
                          autoplay: 1,
                          controls: 1,
                          cc_load_policy: 0,
                          fs: 0,
                          iv_load_policy: 0,
                          modestbranding: 0,
                          rel: 0,
                          showinfo: 0,
                        },
                      }}
                    />
                    <button onClick={() => setPlaying(false)} className="boton">
                      Close
                    </button>
                  </div>
                ) : (
                  <div className="container">
                    <div className="">
                      {trailer ? (
                        <div>
                          <button
                            className="boton"
                            onClick={() => setPlaying(true)}
                            type="button"
                          >
                            Play Trailer
                          </button>
                          <button
                            className="boton"
                            onClick={closeBanner}
                            type="button"
                          >
                            Volver al Listado
                          </button>
                        </div>
                      ) : (
                        "Lo sentimos, el trailer no esta disponible"
                      )}
                      <h1 className="text-white">{movie.title}</h1>
                      <p className="text-white">{movie.overview}</p>
                    </div>
                  </div>
                )}
              </div>
            </main>
          </div>
        </div>
      )}
    </>
  );
}

export default BannerConSelector;
