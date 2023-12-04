import React, { useRef, useState } from "react";
import Boton from "../../Boton/Boton";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import html2canvas from "html2canvas";
import Swal from "sweetalert2";
import { TrailerPlayer } from '../../Banner/Banner'
import "./CardDetalle.css";
import { db } from "../../../firebase/Firebase";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from '../../../context/authContext';

const CardDetalle = ({ movie, trailer }) => {
    const info = movie;

    //const isMovie = window.location.pathname.includes("/movie/");

    //console.log('cardDetalle:', trailer.key)
    //console.log("CardDetalle", info);
    const cardRef = useRef(null);

    const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;

    const { user } = useAuth();
    const [userEmail, setUserEmail] = useState(null);

    //estado que maneja la visibilidad del trailer
    const [showTrailer, setShowTrailer] = useState(false);
    // estado para almacenar id 
    //const [movieInfo, setMovieInfo] = useState(null);

    //funcion para descarga de card
    const downloadAsImage = () => {
        html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "cardDetalle.png";
        link.click();
        });
    };

    //funcion para agregar a lista
    const handleList = async () => {
        const userEmailValue = user.email;
        setUserEmail(userEmailValue);
        // console.log(userEmailValue);
        // console.log(info);
        // console.log(info.id);
        // console.log(info.original_title);
        // console.log(info.original_name);
    
        const route = collection(db, `Usuarios/${userEmailValue}/ListaPeliculas`);
        const route2 = collection(db, `Usuarios/${userEmailValue}/ListaSeries`);

        const dataToAdd = {
            id: info.id,
            nombre: info.original_title || info.original_name,
        };

        if (info.original_title) {
            dataToAdd.nombre = info.original_title;
            await addDoc(route, dataToAdd);
        } else {
            dataToAdd.nombre = info.original_name;
            await addDoc(route2, dataToAdd);
        }
        console.log('agregado a "Mi Lista"');
    }

  //funcion para agregar a recientes
    const handleRecent = async () => {
        const userEmailValue = user.email;
        setUserEmail(userEmailValue);
        // console.log(userEmailValue);
        // console.log(info);
        // console.log(info.id);
        // console.log(info.original_title);
        // console.log(info.original_name);
        
        const route3 = collection(db, `Usuarios/${userEmailValue}/RecentPeliculas`);
        const route4 = collection(db, `Usuarios/${userEmailValue}/RecentSeries`);

        const dataToAdd2 = {
            id: info.id,
            nombre: info.original_title || info.original_name,
        };

        if (info.original_title) {
            dataToAdd2.nombre = info.original_title;
            await addDoc(route3, dataToAdd2);
        } else {
            dataToAdd2.nombre = info.original_name;
            await addDoc(route4, dataToAdd2);
        }
        console.log('agregado a recientes');
    } 

    //funcion para reproducir el trailer
    const playTrailer = () => {
        // si trailer no es null: cambiar el estado
        if (trailer !== null) {
        // Guardar id y isMovie en el estado
        //setMovieInfo({ id: info.id, isMovie: isMovie });
        setShowTrailer(true);

        //console.log(movieInfo)
        
        handleRecent();
        } else {
      // Mostrar SweetAlert si no hay trailer
            Swal.fire({
                icon: "info",
                title: "Sin Trailer",
                text: "Lo siento, no hay trailer disponible para esta película/serie.",
            });
        }
    }

  // Enviar la información a Firebase

      //conectar a database
      //const database = firebase.database();
      //condicional: 
      //if (movieInfo.isMovie === true) {
      //    database.ref(`recientes/peliculas/${user.uid}`).push(movieInfo)
      //  } else {
      //    database.ref(`recientes/tv/${user.uid}`).push(movieInfo)
      //  }


    //console.log('Info:', movieInfo)
    //funcion para cambio de estado de visiblidad de trailer
    const closeTrailer = () => {
        setShowTrailer(false);
        // Limpiar la información de la película cuando se cierra el trailer
        //setMovieInfo(null);
    };

    //componetes para majeno de informacion y posterior renderizado
    const ChangeLanguage = ({ lenguaje }) => {
        let lenguajeOriginal = "";
        if (lenguaje === "en") lenguajeOriginal = "Inglés";
        if (lenguaje === "es") lenguajeOriginal = "Español";
        return (
            <p className="idioma original">Idioma Original: {lenguajeOriginal}</p>
        );
    };

    const Anio = () => {
        const fechaCompleta = info && (info.first_air_date || info.release_date);
        if (!fechaCompleta) {
          return null; // O manejar el caso en que la fecha no esté definida
        }
        const partesFecha = fechaCompleta.split("-");
        const soloAnio = partesFecha[0];
        return <p className="year">Año:{soloAnio}</p>;
    };

    //componente Card
    const Card = () => {
        return (
        <article className="card-movie" ref={cardRef}>
            <div className="img-container">
                <img
                    className="img-pelicula"
                    src={`https://reactvserver--reactvstream.repl.co/imagen-proxy?imageUrl=${IMAGE_PATH}${info.poster_path}`}
                    alt={info.id}
                />
            </div>
            <div className="info-container">
                <div className="btn-container">
                    <Boton 
                        Contenido={PlaylistAddCircleIcon} 
                        fontSize={"50px"} 
                        funcion={handleList} />
                    <Boton 
                        Contenido={PlayCircleIcon} 
                        fontSize={"50px"}
                        funcion={playTrailer}
                        disabled={trailer === null}/>  
                        {/* Deshabilita el botón si trailer es null */}
                    <Boton
                        Contenido={DownloadForOfflineIcon}
                        fontSize={"50px"}
                        funcion={downloadAsImage}/>
                </div>
                <div className="datos-container">
                    <h5 className="titulo">{info.name}</h5>
                    <div className="info-movie">
                        <ChangeLanguage lenguaje={info.original_language} />
                        <p className="duracion">{info.duracion}</p>
                        <p className="genero">{info.genre}</p>
                        <Anio />
                        {info.number_of_seasons ? (
                            <p className="temporadas">
                                {info.number_of_seasons} Temporadas{" "}
                                {info.number_of_episodes ? (
                                <span className="capitulos">
                                    {info.number_of_episodes} capítulos
                                </span>
                            ) : null}
                            </p>
                        ) : null}
                    </div>
                    <div className="descripcion">{info.overview}</div>
                </div>
            </div>
        </article>
        )
    }

  //renderizado en CardDetalle
    return (
        <>
            {showTrailer ? (
                <TrailerPlayer trailer={trailer} closeBanner={closeTrailer} />
            ) : (
                <Card/>
            ) }
        </>
    );
};

export default CardDetalle;
