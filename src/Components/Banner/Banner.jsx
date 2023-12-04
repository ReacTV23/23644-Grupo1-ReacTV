import React, { useState, useEffect } from "react";
import { getMovieById, getPopularMovies, getTrailersById } from "../../services/tmdbService";
import YouTube from "react-youtube";
import CarruselHorizontal from "../Carrusel/CarruselHorizontal/CarruselHorizontal";
import Boton from '../Boton/Boton';
import "./Banner.css";

const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;

const CardContainer = ({ movies, selectMovie, actualPage }) => {
    return (
        <CarruselHorizontal
        texto={'peliculas mas populares'}
        peliculas={movies}
        selectMovie={selectMovie}
        actualPage={actualPage}
        />
    );
};

export const TrailerPlayer = ({ trailer, closeBanner }) => {
    return (
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
        <Boton texto={'close'} funcion={closeBanner}/>
    </div>
    );
};

const BannerContent = ({ movie, trailer, setPlaying, closeBanner }) => {
    return (
        <div className="container-banner">
            <div className="banner">
                {trailer ? (
                <div className="botones-banner">
                    <button
                        className="boton-banner"
                        onClick={() => setPlaying(true)}
                        type="button">
                        Play Trailer
                    </button>
                    <button
                        className="boton-banner"
                        onClick={() => closeBanner()}
                        type="button">
                        Volver al Listado
                    </button> 
                </div>
            ) : (
                "Lo sentimos, el trailer no está disponible"
            )}
            <h1 className="titulo-banner">{movie.title}</h1>
            <p className="descripcion-banner">{movie.overview}</p>
        </div>
    </div>
    );
};

function Banner() {
    const [showCardContainer, setShowCardContainer] = useState(true);
    const [selectedMovie, setSelectedMovie] = useState(null);

    const [movies, setMovies] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [actualPage, setActualPage] = useState(0);
    const [movie, setMovie] = useState({ title: "Loading Movies" });
    const [playing, setPlaying] = useState(false);

    const fetchMovies = async () => {
        try {
            const moviesData = await getPopularMovies(1);
            setMovies(moviesData);
            setMovie(moviesData[0]);

            if (moviesData.length) {
                await fetchMovie(moviesData[0].id);
                }
            } catch (error) {
                console.error(`Error buscando las películas: ${error.message}`);
        }
    };

    const fetchMovie = async (id) => {
        try {
            const movieData = await getMovieById(id);
            const trailersData = await getTrailersById(id);
                setTrailer(trailersData[0]);
                setMovie(movieData);
        } catch (error) {
            console.error(`Error buscando los trailers: ${error.message}`);
        }
    };

    const selectMovie = async (movie, actualPage) => {
        setActualPage(actualPage);
        fetchMovie(movie.id);
        setMovie(movie);
        setSelectedMovie(movie);
        setShowCardContainer(false);
        window.scrollTo(0, 0);
    };

    const closeBanner = () => {
        setPlaying(false);
        setShowCardContainer(true);
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <>
            {showCardContainer ? (
                <CardContainer movies={movies} selectMovie={selectMovie} actualPage={actualPage} />
            ) : (
                <div>
                    <div style={{ margin: "1rem" }}>
                        <main>
                            <div
                                className="viewtrailer"
                                style={{
                                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`}}>
                                {playing ? (
                                <TrailerPlayer trailer={trailer} closeBanner={closeBanner} />
                                ) : (
                                <BannerContent movie={movie} trailer={trailer} setPlaying={setPlaying} closeBanner={closeBanner} />
                                )}
                            </div>
                        </main>
                    </div>
                </div>
            )}
        </>
    );
}

export default Banner;
