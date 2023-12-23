import React, { useState, useEffect } from "react";
import { getMovieById, getPopularMovies, getTrailersById } from "../../services/tmdbService";
import YouTube from "react-youtube";
import CarruselHorizontal from "../Carrusel/CarruselHorizontal/CarruselHorizontal";
import Boton from '../Boton/Boton';
import Loader from '../Loader/Loader';
import Alert from '../Alert/Alert';
import { db } from "../../firebase/Firebase";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useAuth } from '../../context/authContext.js';
import colors from '../../config/config.js'
import "./Banner.css";

const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;

export const TrailerPlayer = ({ trailer, closeTrailer, onTrailerFinish }) => {
    const handleTrailerEnd = () => {
        if (onTrailerFinish) {
        onTrailerFinish();
        }
    };

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
        onEnd={handleTrailerEnd}  // Añade este manejo de evento
        />
        <Boton width={'100px'} texto={'close'} funcion={closeTrailer} backgroundColor={colors.azul} backgroundHover={colors.naranja}/>
    </div>
    );
};

const BannerContent = ({ movie, trailer, setPlaying, closeBanner, handleRecent, handleList, showAlert, setShowAlert, alertConfig, setAlertConfig}) => {
    const [playButtonClicked, setPlayButtonClicked] = useState(false);

    const handlePlayButtonClick = () => {
        setPlaying(true);
        setPlayButtonClicked(true);
    };

    useEffect(() => {
        if (playButtonClicked) {
            handleRecent();
        }
    }, [playButtonClicked]);

    useEffect(() => {
        // Mostrar la alerta cuando alertConfig se establezca
        if (showAlert && alertConfig) {
            setAlertConfig({
                title: alertConfig.title,
                text: alertConfig.text,
                icon: alertConfig.icon,
                confirmButtonText: alertConfig.confirmButtonText,
                showCancelButton: alertConfig.showCancelButton,
                onConfirm: alertConfig.onConfirm,
                onCancel: alertConfig.onCancel,
            });

            // Restablecer el estado de showAlert y alertConfig
            setShowAlert(false);
        }
    }, [showAlert, alertConfig]);


    return (
        <div className="container-banner">
            <div className="banner">
                <div className="botones-banner">
                    {/* Botón de Reproducir Trailer */}
                    {trailer ? (
                        <Boton  texto={'Play Trailer'} 
                                funcion={handlePlayButtonClick} 
                                width={'10rem'} 
                                fontSize={'1rem'}
                                margin={'0.5rem'}
                                height={'3rem'}
                                backgroundColor={colors.naranja}
                                backgroundHover={colors.azul}/>
                    ) : (
                        <Boton  texto={'Play Trailer'} 
                                funcion={() => setPlayButtonClicked(true)} 
                                width={'10rem'} 
                                fontSize={'1rem'}
                                margin={'0.5rem'}
                                height={'3rem'}
                                backgroundColor = {colors.naranja}
                                backgroundHover={colors.azul}/>
                    )}
                    {/* Botón de Agregar a Mi Lista */}
                    <Boton  texto={'Agregar a mi lista'} 
                                funcion={handleList} 
                                width={'10rem'} 
                                fontSize={'1rem'}
                                margin={'0.5rem'}
                                height={'3rem'}
                                backgroundColor = {colors.naranja}
                                backgroundHover={colors.azul}/>
                    {/* Botón de Volver al Listado */}
                    <Boton  texto={'Volver al Listado'} 
                                funcion={closeBanner} 
                                width={'10rem'} 
                                fontSize={'1rem'}
                                margin={'0.5rem'}
                                height={'3rem'}
                                backgroundColor = {colors.naranja}
                                backgroundHover={colors.azul}/>
                    {/* Alerta para No Hay Trailer */}
                    {playButtonClicked && !trailer && (
                        <Alert
                            title={"Sin trailer"}
                            text={"Lo sentimos, el trailer no está disponible"}
                            icon={"info"}
                            confirmButtonText={"OK"}
                            showCancelButton={false}
                            onCancel={() => setPlayButtonClicked(false)} // Restablecer el estado de playButtonClicked al cancelar
                        />
                    )}
                    {/* Alerta para Agregar a Lista o Recientes */}
                    {showAlert && (
                        <Alert
                            title={alertConfig.title}
                            text={alertConfig.text}
                            icon={alertConfig.icon}
                            confirmButtonText={alertConfig.confirmButtonText}
                            showCancelButton={alertConfig.showCancelButton}
                        />
                    )}
                </div>
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
    const [isLoadingMovies, setIsLoadingMovies] = useState(true);

    const [showAlert, setShowAlert] = useState(false);  // Nuevo estado para controlar la visibilidad del Alert
    const [alertConfig, setAlertConfig] = useState(null);
    const { user } = useAuth();
    const [userEmail, setUserEmail] = useState(null);

    // Función para manejar la finalización del trailer
    const handleTrailerFinish = () => {
        setShowAlert(true);
        setAlertConfig({
            icon: "success",
            title: "Agregado a recientes",
            text: "El vídeo se ha agregado a recientes.",
            confirmButtonText: "OK",
            showCancelButton: false,
        });
        handleRecent();
    };

    //funcion para agregar a lista o recientes
    const handleListOrRecent = async (route, dataToAdd, querySnapshot) => {
        if (querySnapshot.size === 0) {
            // No hay documentos con el mismo ID: agregarlo
            await addDoc(route, dataToAdd);
            setShowAlert(true);  // Mostrar el Alert después de agregar correctamente
            setAlertConfig({
                icon:"success",
                title:"Agregado correctamente",
                text:"La película o serie se ha agregado.",
                confirmButtonText:"OK",
                showCancelButton:false,
            }) 
        } else {
            // Ya existe un documento con el mismo ID
            setShowAlert(true);  // Mostrar el Alert en caso de ID repetido
            setAlertConfig({
                icon:"info",
                title:"Id repetido",
                text:"Lo siento, La película o serie ya está guardada en la sección correspondiente.",
                confirmButtonText:"OK",
                showCancelButton:false,
            })
        }
    }

    //funcion para agregar a lista
    const handleList = async () => {
        const userEmailValue = user.email;
        setUserEmail(userEmailValue);

        const route = collection(db, `Usuarios/${userEmailValue}/ListaPeliculas`);

        const dataToAdd = {
            id: movie.id,
            nombre: movie.original_title,
        };

        if (movie.original_title) {
            dataToAdd.nombre = movie.original_title;
            await handleListOrRecent(route, dataToAdd, await getDocs(query(route, where("id", "==", movie.id))));
        }
    }

    //funcion para agregar a recientes
    const handleRecent = async () => {
        const userEmailValue = user.email;
        setUserEmail(userEmailValue);

        const route2 = collection(db, `Usuarios/${userEmailValue}/RecentPeliculas`);

        const dataToAdd2 = {
            id: movie.id,
            nombre: movie.original_title
        };

        if (movie.original_title) {
            dataToAdd2.nombre = movie.original_title;
            await handleListOrRecent(route2, dataToAdd2, await getDocs(query(route2, where("id", "==", movie.id))));
            
        }
    }

    const fetchMovies = async () => {
        try {
            setIsLoadingMovies(true); // Iniciar la carga
            const moviesData = await getPopularMovies(1);
            setMovies(moviesData);
            setMovie(moviesData[0]);

            if (moviesData.length) {
                await fetchMovie(moviesData[0].id);
                setIsLoadingMovies(false);
                }
            } catch (error) {
                console.error(`Error buscando las películas: ${error.message}`);
                setIsLoadingMovies(false); // Finalizar la carga, ya sea éxito o error
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
        //setPlaying(false);
        setShowCardContainer(true);
       // setAlertConfig(null);  // Restablecer alertConfig cuando se cierra el banner
    };

    const closeTrailer = ( ) => {
        setPlaying(false);
    }

    // Efecto secundario para restablecer alertConfig cuando se desmonta el componente o cambia showCardContainer
    useEffect(() => {
        return () => {
            if (alertConfig !== null) {
                setAlertConfig(null);
            }
        };
        
    }, [showCardContainer]);

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <>
            {isLoadingMovies ? (
                // Muestra el loader mientras las películas están cargando
                <Loader />)  : 
            showCardContainer ? (
                <CarruselHorizontal texto={'peliculas mas populares'} peliculas={movies} selectMovie={selectMovie} actualPage={actualPage}/>
                ) : (
                <main
                    className="viewtrailer"
                    style={{
                    backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`}}>
                    {playing ? (
                    <TrailerPlayer 
                        trailer={trailer} 
                        closeTrailer={closeTrailer} 
                        onTrailerFinish={handleTrailerFinish} 
                    />
                    ) : (
                    <BannerContent 
                        movie={movie} 
                        trailer={trailer} 
                        setPlaying={setPlaying} 
                        closeBanner={closeBanner}
                        handleRecent={handleRecent}
                        handleList={handleList}
                        showAlert={showAlert}
                        setShowAlert={setShowAlert}
                        alertConfig={alertConfig}
                        setAlertConfig={setAlertConfig}
                    />                      
                    )}
                </main>
            )}
        </>
    );
}

export default Banner;
