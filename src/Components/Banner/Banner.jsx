import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
import './Banner.css';

function Banner() {
  const API_URL = process.env.REACT_APP_API_URL_TMDB;
  const API_KEY = process.env.REACT_APP_API_KEY_TMDB;
  const IMAGE_PATH = "https://image.tmdb.org/t/p/original";
  const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;

  const [movies, setMovies] = useState([]);
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState({ title: "Loading Movies" });
  const [playing, setPlaying] = useState(false);

  const fetchMovies = async () => {
    const type = "discover";
    try {
      const { data: { results } } = await axios.get(`${API_URL}/${type}/movie`, {
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
        const trailer = data.videos.results.find((vid) => vid.name === "Official Trailer");
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
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      {/* <h2 className="text-center mt-5 mb-5">Trailer Popular Movies</h2> */}

      <div style={{margin:'1rem'}}>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
                width: "100%"
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container youtube-container"
                    opts={{
                      width: "150%",
                      height: "90%",
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
                  <button onClick={() => setPlaying(false)} className="boton">
                    Close
                  </button>
                </>
              ) : (
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
          ) : null}
        </main>
      </div>

      {/* <div className="container mt-3">
        <div className="row">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="col-md-4 mb-3"
              onClick={() => selectMovie(movie)}
            >
              <img
                src={`${URL_IMAGE + movie.poster_path}`}
                alt=""
                height={600}
                width="100%"
              />
              <h4 className="text-center">{movie.title}</h4>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default Banner;
