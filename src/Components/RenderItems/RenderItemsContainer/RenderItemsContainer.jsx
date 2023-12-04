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


const RenderItemsContainer = ({ userEmail, pathMovies, pathSeries }) => {
    const [movies, setMovies] = useState([]);
    const [series, setSeries] = useState([]);
    const [movieIds, setMovieIds] = useState([]);
    const query = collection(db, 'Usuarios');
    const [docs, loading, error] = useCollectionData(query);
    const [seriesIds, setSeriesIds] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const ITEMS_PER_PAGE = 5;
    const navigate = useNavigate();

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
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentMovies = movies.slice(indexOfFirstItem, indexOfLastItem);
    const currentSeries = series.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
    }, [userEmail, movieIds, seriesIds]);

    const handleDelete = async (id, type, setDataFunction) => {
        try {
        const path = type === 'movies' ? pathMovies : pathSeries;

        const querySnapshot = await getDocs(collection(db, path));
        const docToDelete = querySnapshot.docs.find((doc) => doc.data().id === id);

        if (docToDelete) {
            await deleteDoc(docToDelete.ref);
            setDataFunction((prevItems) => prevItems.filter((item) => item.id !== id));
            console.log('Item deleted successfully');
            } else {
                console.log('Document not found for item with ID:', id);
            }
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <>
            <Children path={pathMovies} onDataReceived={(ids) => handleMovieIds(ids, setMovieIds)} />
            <Children path={pathSeries} onDataReceived={(ids) => handleSeriesIds(ids, setSeriesIds)} />

            {loading ? (
                <Loader />
            ) : (
                <>
                    {movies.length > 0 && (
                        <RenderItems
                            items={currentMovies}
                            itemsPaginado={movies}
                            type='movies'
                            setItemsFunction={setMovies}
                            handleDelete={handleDelete}
                            navigate={navigate}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            paginate={paginate}/>
                    )}

                    {series.length > 0 && (
                        <RenderItems
                            items={currentSeries}
                            type='series'
                            setItemsFunction={setSeries}
                            handleDelete={handleDelete}
                            navigate={navigate}
                            ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                            paginate={paginate}/>
                    )}
                </>
            )}
        </>
    );
};

export default RenderItemsContainer;
