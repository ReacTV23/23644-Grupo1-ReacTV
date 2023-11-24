import React, { useState, useEffect } from "react";
import axios from "axios";
import YouTube from "react-youtube";
import Carrusel from '../Carrusel/Carrusel';
import "./Banner.css";

function BannerConSelector() {
  const API_URL = process.env.REACT_APP_API_URL_TMDB;
  const API_KEY = process.env.REACT_APP_API_KEY_TMDB;
  const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;
  // const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;

  const [showCardContainer, setShowCardContainer] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async () => {
    const type = "discover";
    try {
      const {
        data: { results },
      } = await axios.get(`${API_URL}/${type}/movie`, {
        params: {
          api_key: API_KEY,
        },
      });
      setMovies(results);
      setMovie(results[0]);

      if (results.length) {
        await fetchMovie(results[0].id);
      }
    } catch (error) {
      console.error(`Error fetching movies: ${error.message}`);
    }
  };

  const fetchMovie = async (id) => {
    try {
      const { data } = await axios.get(`${API_URL}/movie/${id}`, {
        params: {
          api_key: API_KEY,
          append_to_response: "videos",
        },
      });

      if (data.videos && data.videos.results) {
        const trailer = data.videos.results.find(
          (vid) => vid.name === "Official Trailer"
        );
        setTrailer(trailer ? trailer : data.videos.results[0]);
      }

      setMovie(data);
    } catch (error) {
      console.error(`Error fetching movie details: ${error.message}`);
    }
  };

  const selectMovie = async (movie) => {
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
        <Carrusel peliculas={movies} selectMovie={selectMovie} />
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
                  backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                  width: "100%",
                  height: "100%",
                }}
              >
                {playing ? (
                  <div className="youtube-container">
                    <YouTube
                      className='reproductor'
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
