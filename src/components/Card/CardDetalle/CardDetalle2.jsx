import React, { useRef, useState } from "react";
import Boton from "../../Boton/Boton";
import PlaylistAddCircleIcon from "@mui/icons-material/PlaylistAddCircle";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import DownloadForOfflineIcon from "@mui/icons-material/DownloadForOffline";
import html2canvas from "html2canvas";
//import Swal from "sweetalert2";
import Alert from '../../Alert/Alert';
import { TrailerPlayer } from '../../Banner/Banner2';
import "./CardDetalle.css";
import { db } from "../../../firebase/Firebase";
import { addDoc, getDocs, collection, query, where } from "firebase/firestore";
import { useAuth } from '../../../context/authContext2';
import colors from '../../../config/config.js';

const CardDetalle = ({ movie, trailer }) => {
    const info = movie;

    //console.log('cardDetalle:', trailer.key)
    //console.log("CardDetalle", info);
    const cardRef = useRef(null);

    const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;

    const { user } = useAuth();
    const [userEmail, setUserEmail] = useState(null);

    const [showAlert, setShowAlert] = useState(false);  // Nuevo estado para controlar la visibilidad del Alert
    const [alertConfig, setAlertConfig] = useState(null);

    

    //estado que maneja la visibilidad del trailer
    const [showTrailer, setShowTrailer] = useState(false);

    //funcion para descarga de card
    const downloadAsImage = async () => {
        setShowAlert(true);
        setAlertConfig({
            title: '¿Quieres descargar este poster?',
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Sí, descargar',
            cancelButtonText: 'Cancelar',
        })

        const result = await new Promise((resolve) => {
            setAlertConfig((prevConfig) => ({
                ...prevConfig,
                onConfirm: () => resolve(true),
                onCancel: () => resolve(false),
            }));
        });
    
        setShowAlert(false);

        if (result) {
            html2canvas(cardRef.current, { useCORS: true }).then((canvas) => {
            const link = document.createElement("a");
            link.href = canvas.toDataURL("image/png");
            link.download = "cardDetalle.png";
            link.click();
            setShowAlert(true);
            setAlertConfig({
                title: 'Descarga finalizada',
                icon: 'success',
                showCancelButton: false,
                confirmButtonText: 'Ok',
            });
            });
        } else {
            setShowAlert(true);
            setAlertConfig({
                title: 'Descarga cancelada',
                icon: 'error',
                showCancelButton: false,
                confirmButtonText: 'Ok',
            });
        }
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
            console.log('Agregado correctamente');
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
        const route2 = collection(db, `Usuarios/${userEmailValue}/ListaSeries`);

        const dataToAdd = {
            id: info.id,
            nombre: info.original_title || info.original_name,
        };

        if (info.original_title) {
            dataToAdd.nombre = info.original_title;
            await handleListOrRecent(route, dataToAdd, await getDocs(query(route, where("id", "==", info.id))));
        } else {
            dataToAdd.nombre = info.original_name;
            await handleListOrRecent(route2, dataToAdd, await getDocs(query(route2, where("id", "==", info.id))));
        }
    }

    //funcion para agregar a recientes
    const handleRecent = async () => {
        const userEmailValue = user.email;
        setUserEmail(userEmailValue);

        const route3 = collection(db, `Usuarios/${userEmailValue}/RecentPeliculas`);
        const route4 = collection(db, `Usuarios/${userEmailValue}/RecentSeries`);

        const dataToAdd2 = {
            id: info.id,
            nombre: info.original_title || info.original_name,
        };

        if (info.original_title) {
            dataToAdd2.nombre = info.original_title;
            await handleListOrRecent(route3, dataToAdd2, await getDocs(query(route3, where("id", "==", info.id))));
        } else {
            dataToAdd2.nombre = info.original_name;
            await handleListOrRecent(route4, dataToAdd2, await getDocs(query(route4, where("id", "==", info.id))));
        }
    }

    //funcion para reproducir el trailer
    const playTrailer = () => {
        // si trailer no es null: cambiar el estado
        if (trailer !== null) {
        setShowTrailer(true);

        //console.log(movieInfo)
        
        handleRecent();
        } else {
        // Mostrar SweetAlert si no hay trailer
            setShowAlert(true); 
            setAlertConfig({
                icon:"info",
                title:"Sin Trailer",
                text:"Lo siento, no hay trailer disponible para esta película",
                confirmButtonText:"OK",
                showCancelButton:false,
            })
        }
    }

    //console.log('Info:', movieInfo)
    //funcion para cambio de estado de visiblidad de trailer
    const closeTrailer = () => {
        setShowTrailer(false);
    };

    //componetes para majeno de informacion y posterior renderizado
    const ChangeLanguage = ({ lenguaje }) => {
        let lenguajeOriginal = "";
        if (lenguaje === "en") lenguajeOriginal = "Inglés";
        if (lenguaje === "es") lenguajeOriginal = "Español";
        return (
            <p className="idioma original">IDIOMA ORIGINAL: {lenguajeOriginal}</p>
        );
    };

    const GenerosListado = ({ generos }) => {
        return (
            <ul className='listado-generos'>
            <h5 className='titulo-generos'>generos:</h5>
                {generos.map((genero) => (
                <li className='generos' key={genero.id}>{genero.name}</li>
                ))}
            </ul>
        )
    }

    const Anio = () => {
        const fechaCompleta = info && (info.first_air_date || info.release_date);
        if (!fechaCompleta) {
          return null; // O manejar el caso en que la fecha no esté definida
        }
        const partesFecha = fechaCompleta.split("-");
        const soloAnio = partesFecha[0];
        return <p className="year">AÑO: {soloAnio}</p>;
    };

    //componente Card
    const Card = () => {
        return (
        <article className="card-movie" ref={cardRef}>
            <div className="img-container">
                {/* <img
                    className="img-pelicula"
                    src={`https://reactvserver--reactvstream.repl.co/imagen-proxy?imageUrl=${IMAGE_PATH}${info.poster_path}`}
                    alt={info.id}
                /> */}
                <img
                    className="img-pelicula"
                    src={`https://reactvserver--reactvstream.repl.co/imagen-proxy?imageUrl=${IMAGE_PATH}${info.backdrop_path}`}
                    alt={info.id}
                />
                <div className="info-container">
                    <div className="btn-container">
                        <Boton 
                            Contenido={PlaylistAddCircleIcon} 
                            fontSize={"4rem"} 
                            funcion={handleList}
                            colorHover={`${colors.naranja}`} />
                        <Boton 
                            Contenido={PlayCircleIcon} 
                            fontSize={"4rem"}
                            funcion={playTrailer}
                            colorHover={`${colors.naranja}`}
                            disabled={trailer === null}/>  
                            {/* Deshabilita el botón si trailer es null */}
                        <Boton
                            Contenido={DownloadForOfflineIcon}
                            fontSize={"4rem"}
                            colorHover={`${colors.naranja}`}
                            funcion={downloadAsImage}/>
                    </div>
                    <div className="datos-container">
                        <h5 className="titulo">{info.original_title}</h5>
                        <div className='datos'>
                            <div className="info-movie">
                                <ChangeLanguage lenguaje={info.original_language} />
                                {/* <p className="duracion">{info.duracion}</p> */}
                                <GenerosListado generos={info.genres}/>
                                <Anio />
                                {info.number_of_seasons ? (
                                    <p className="temporadas">
                                        {info.number_of_seasons} Temporadas: {" "}
                                        {info.number_of_episodes ? (
                                        <span className="capitulos">
                                            {info.number_of_episodes} capítulos: 
                                        </span>
                                    ) : null}
                                    </p>
                                ) : null}
                            </div>
                            <div className="descripcion">
                                <p className='descripcion-titulo'>Sinopsis:</p>
                                {info.overview}
                            </div>
                        </div>
                    </div>
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
            {showAlert && (
                <Alert
                    title={alertConfig.title}
                    text={alertConfig.text}
                    icon={alertConfig.icon}
                    showCancelButton={alertConfig.showCancelButton}
                    confirmButtonText={alertConfig.confirmButtonText}
                    cancelButtonText={alertConfig.cancelButtonText}
                    onConfirm={alertConfig.onConfirm}
                    onCancel= {alertConfig.onCancel}
                />
            )}
        </>
    );
};

export default CardDetalle;
