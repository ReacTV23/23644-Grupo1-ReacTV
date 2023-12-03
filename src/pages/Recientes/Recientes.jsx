import React, { useEffect, useState } from 'react';
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario';
import { getMovieById, getTVById } from "../../services/tmdbService";
import { collection } from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/Firebase.js';
import { getFirestore, deleteDoc, doc } from 'firebase/firestore';
import { useNavigate  } from 'react-router-dom';
import { useAuth } from '../../context/authContext.js';
import Children from '../../components/Children/Children'
import Loader from '../../components/Loader/Loader'
import CardImg from '../../components/Card/CardImg/CardImg'
import Titulo from '../../components/Titulo/Titulo'
import Boton from '../../components/Boton'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

const Recientes = () => {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState(null);
  const query = collection(db, 'Usuarios');
  const [docs, loading, error] = useCollectionData(query);
  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
  const [idPeliculas, setIdPeliculas] = useState([]);
  const [idSeries, setIdSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const ITEMS_PER_PAGE = 5;

  const fetchData = async () => {
    try {
      if (user) {
        setUserEmail(user.email);
      }
    } catch (error) {
      console.error('Error al obtener el correo electrónico del usuario:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);

  const handlePeliculaIds = (ids) => {
    if (idPeliculas.length !== ids.length) {
      setIdPeliculas(ids);
    }
  };

  const handleSerieIds = (ids) => {
    if (idSeries.length !== ids.length) {
      setIdSeries(ids);
    }
  }

  useEffect(() => {
    const getData = async (ids, fetchDataFunction, setDataFunction) => {
      try {
        const promises = ids.map(async (id) => await fetchDataFunction(id));
        const data = await Promise.all(promises);
        setDataFunction(data);
      } catch (error) {
        console.error(`Error al traer datos: ${error.message}`);
      }
    };

    if (userEmail && (idPeliculas.length > 0 || idSeries.length > 0)) {
      // Realizar llamadas a Firestore y TMDB solo si hay datos para obtener
      getData(idPeliculas, getMovieById, setPeliculas);
      getData(idSeries, getTVById, setSeries);
    }
  }, [userEmail, idPeliculas, idSeries]);

  // Lógica de paginación
  const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
  const currentPeliculas = peliculas.slice(indexOfFirstItem, indexOfLastItem);
  const currentSeries = series.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleDelete = async (id, type) => {
    try {
      // Eliminar la tarjeta de la base de datos
      const path = type === 'movie' ? `Usuarios/${userEmail}/RecentPeliculas` : `Usuarios/${userEmail}/RecentSeries`;
      const firestore = getFirestore();
      // Obtén la referencia del documento en Firestore
      const docRef = doc(firestore, path, id);
      await docRef.delete();

      // Actualizar el estado para que se refleje el cambio
      if (type === 'pelicula') {
        setPeliculas((prev) => prev.filter((pelicula) => pelicula.id !== id));
      } else {
        setSeries((prev) => prev.filter((serie) => serie.id !== id));
      }

      console.log('Tarjeta eliminada correctamente');
    } catch (error) {
      console.error('Error al eliminar la tarjeta:', error);
    }
  };


  return (
    <LayoutSecundario textoBoton={'recientes'}>
      {userEmail && (
        <>
          {/* Children para las películas recientes */}
          <Children path={`Usuarios/${userEmail}/RecentPeliculas`} onDataReceived={handlePeliculaIds} key={'RecentPeliculas'} />

          {/* Children para las series recientes */}
          <Children path={`Usuarios/${userEmail}/RecentSeries`} onDataReceived={handleSerieIds} key={'RecentSeries'} />
          {loading ? (
            <Loader/>
          ) : (
            <>
            {currentPeliculas.length > 0 && (
              <div style={{width: '100%',display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', margin: '1rem'}}>
                <Titulo texto={'peliculas vistas'}/>
                <div style={{width: '100%',display:'flex', alignItems:'center', justifyContent:'center', margin: '1rem'}}>
                  {currentPeliculas.map((pelicula) => (
                    <div style={{width: '200px', margin: '0.5rem', position:'relative'}} key={pelicula.id}>
                      <div style={{width: '100%', position: 'relative'}}>
                        <CardImg 
                          peli={pelicula} 
                          width={200} 
                          height={300} 
                          funcion={() => navigate(`/card/movie/${pelicula.id}`)}/>
                      </div>
                      <div style={{position:'absolute', top: '-25px', right: '-20px'}}>
                        <Boton 
                          Contenido={DeleteForeverIcon} 
                          fontSize={'30px'} 
                          height={'40px'} 
                          ccolor={'white'} 
                          backgroundColor={'#003686'} 
                          backgroundHover={'#E08400'}
                          funcion={() => handleDelete(pelicula.id, 'movie')} />
                      </div>
                    </div>
                  ))}
                </div>
                {/* Paginación */}
                {peliculas.length > ITEMS_PER_PAGE && (
                  <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {Array.from({ length: Math.ceil(peliculas.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
                      <Boton texto={page} funcion={() => paginate(page)} key={page} width={'30px'} color={'white'} backgroundColor={'#003686'} backgroundHover={'#E08400'}/>
                    ))}
                  </div>
                )}
              </div>
              )}

              {currentSeries.length > 0 && (
                <div style={{width: '100%',display:'flex',flexDirection:'column', alignItems:'center', justifyContent:'center', margin: '1rem'}}>
                  <Titulo texto={'series vistas'}/>
                  <div style={{width: '100%',display:'flex', alignItems:'center', justifyContent:'center', margin: '1rem'}}>
                    {currentSeries.map((serie) => (
                      <div style={{width: '200px', margin: '0.5rem', position:'relative'}} key={serie.id}>
                        <div style={{width: '100%', position: 'relative'}}>
                          <CardImg 
                            peli={serie} 
                            width={200} 
                            height={300} 
                            funcion={() => navigate(`/card/movie/${serie.id}`)}/>
                        </div>
                        <div style={{position:'absolute', top: '-25px', right: '-20px'}}>
                          <Boton 
                            Contenido={DeleteForeverIcon} 
                            fontSize={'30px'} 
                            height={'40px'} 
                            ccolor={'white'} 
                            backgroundColor={'#003686'} 
                            backgroundHover={'#E08400'}
                            funcion={() => handleDelete(serie.id, 'serie')} />
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Paginación */}
                  {series.length > ITEMS_PER_PAGE && (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                      {Array.from({ length: Math.ceil(series.length / ITEMS_PER_PAGE) }, (_, i) => i + 1).map((page) => (
                        <Boton texto={page} funcion={() => paginate(page)} key={page} width={'30px'} color={'white'} backgroundColor={'#003686'} backgroundHover={'#E08400'}/>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </>
          )}
        </>
      )}
    </LayoutSecundario>
  );
}

export default Recientes;
