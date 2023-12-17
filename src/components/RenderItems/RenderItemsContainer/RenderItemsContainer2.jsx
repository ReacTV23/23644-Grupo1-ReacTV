import React, { useEffect, useState } from 'react';
import Children from '../../Children/Children';
import RenderItems from '../RenderItems/RenderItems';
import { getMovieById, getTVById } from "../../../services/tmdbService.js";
import { collection, getDocs } from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../../firebase/Firebase.js';
import { deleteDoc, doc } from 'firebase/firestore';
import { useNavigate  } from 'react-router-dom';
import Loader from '../../Loader/Loader';
import Alert from '../../Alert/Alert'
//import Swal from "sweetalert2";
//import withReactContent from "sweetalert2-react-content";

const RenderItemsContainer = ({ userEmail, pathMovies, pathSeries }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [movieIds, setMovieIds] = useState([]);
    const query = collection(db, 'Usuarios');
    const [docs, loading, error] = useCollectionData(query);
    const [seriesIds, setSeriesIds] = useState([]);
    const [currentPageMovies, setCurrentPageMovies] = useState(1);
    const [currentPageSeries, setCurrentPageSeries] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const navigate = useNavigate();
    //const mySwal = withReactContent(Swal);

    const [showAlert, setShowAlert] = useState(false);  // Nuevo estado para controlar la visibilidad del Alert
    const [alertConfig, setAlertConfig] = useState(null);

    const handleMovieIds = (ids, setDataFunction) => {
        if (movieIds.length !== ids.length) {
            setDataFunction(ids);
        }
    };

    const handleSeriesIds = (ids, setDataFunction) => {
        if (seriesIds.length !== ids.length) {
            setDataFunction(ids);
        }
    };

    //paginación
    // const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    // const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    // const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
    // const currentSeries = series.slice(indexOfFirstItem, indexOfLastItem);

    const paginateMovies = (pageNumber) => setCurrentPageMovies(pageNumber);
    const paginateSeries = (pageNumber) => setCurrentPageSeries(pageNumber);

    const getData = async (ids, fetchDataFunction, setDataFunction) => {
        try {
            const promises = ids.map(async (id) => await fetchDataFunction(id));
            const data = await Promise.all(promises);
            setDataFunction(data);
        } catch (error) {
            console.error(`Error fetching data: ${error.message}`);
        }
    };

    useEffect(() => {
        if (userEmail && (movieIds.length > 0 || seriesIds.length > 0)) {
            getData(movieIds, getMovieById, setMovies);
            getData(seriesIds, getTVById, setSeries);
        }

        // Comprueba si se confirmó la eliminación
        if (showAlert && alertConfig) {
            // Actualiza el estado o realiza cualquier otra acción
            setShowAlert(false); // Restablece el estado de showAlert
            setAlertConfig(null); // Restablece el estado de alertConfig
        }
    }, [userEmail, movieIds, seriesIds, showAlert,  alertConfig]);

    const handleDelete = async (id, type, setDataFunction) => {
        try {
        //console.log(type)
        const path = type === 'peliculas' ? pathMovies : pathSeries;

        const querySnapshot = await getDocs(collection(db, path));
        const docToDelete = querySnapshot.docs.find((doc) => doc.data().id === id);

        if (docToDelete) {
            await deleteDoc(docToDelete.ref);
            setDataFunction((prevItems) => prevItems.filter((item) => item.id !== id));
            setShowAlert(true)
            setAlertConfig({
                title:"Eliminado!",
                text:"El item ha sido eliminado.",
                icon:"success",
                showCancelButton: false,
                confirmButtonText: "OK",
            })
            // console.log('Item deleted successfully');
            } else {
                setShowAlert(true)
                setAlertConfig({
                    title:"Advertencia!",
                    text:`Document not found for item with ID: ${id}`,
                    icon:"warning",
                    showCancelButton: false,
                    confirmButtonText: "OK",
                })
                //console.log('Document not found for item with ID:', id);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const confirmDelete = (id, type, setDataFunction) => {
        setShowAlert(true)
        setAlertConfig({
            title: "¿Estas seguro?",
            text: "¡No podrás revertir esto!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "¡Si, Eliminar!",
            cancelButtonText: "Cancelar",
            onConfirm: () => handleDelete(id, type, setDataFunction)
        })
    };

    return (
        <>
            <Children path={pathMovies} onDataReceived={(ids) => handleMovieIds(ids, setMovieIds)} />
            <Children path={pathSeries} onDataReceived={(ids) => handleSeriesIds(ids, setSeriesIds)} />

            {loading ? (
                <Loader />
            ) : (
                <div style={{width:'100%', display: 'flex', flexDirection: 'column'}}>
                    {movies.length > 0 && (
                        <RenderItems
                            items={movies.slice((currentPageMovies - 1) * ITEMS_PER_PAGE, currentPageMovies * ITEMS_PER_PAGE)}
                            itemsPaginado={movies}
                            type='peliculas'
                            setItemsFunction={setMovies}
                            handleDelete={(id) => confirmDelete(id, 'peliculas', setMovies)}
                            navigate={navigate}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            paginate={paginateMovies}/>
                    )}

                    {series.length > 0 && (
                        <RenderItems
                            items={series.slice((currentPageSeries - 1) * ITEMS_PER_PAGE, currentPageSeries * ITEMS_PER_PAGE)}
                            itemsPaginado={series}
                            type='series'
                            setItemsFunction={setSeries}
                            handleDelete={(id) => confirmDelete(id, 'series', setSeries)}
                            navigate={navigate}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            paginate={paginateSeries}/>
                    )}
                </div>
            )}
            {/* Alerta para eliminar */}
            {showAlert && alertConfig && (
                <Alert
                    title={alertConfig.title}
                    text={alertConfig.text}
                    icon={alertConfig.icon}
                    showCancelButton={alertConfig.showCancelButton}
                    confirmButtonText={alertConfig.confirmButtonText}
                    cancelButtonText={alertConfig.cancelButtonText}
                    onConfirm={alertConfig.onConfirm}
                />
            )}
        </>
    );
};

export default RenderItemsContainer;
