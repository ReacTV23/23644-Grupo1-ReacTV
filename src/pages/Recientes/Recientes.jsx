import React, { useEffect, useState } from 'react';
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario';
import { getMovieById, getTVById } from "../../services/tmdbService";
import { collection } from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/Firebase.js';
import { useAuth } from '../../context/authContext.js';
import Children from '../../components/Children/Children'

const Recientes = () => {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState(null);
  const query = collection(db, 'Usuarios');
  const [docs, loading, error] = useCollectionData(query);

  const [peliculas, setPeliculas] = useState([]);
  const [series, setSeries] = useState([]);
  const [idPeliculas, setIdPeliculas] = useState([]);
  const [idSeries, setIdSeries] = useState([]);

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

  const handlePeliculaIds = (ids) => setIdPeliculas(ids);
  const handleSerieIds = (ids) => setIdSeries(ids);

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

    if (idPeliculas.length > 0) {
      getData(idPeliculas, getMovieById, setPeliculas);
    }

    if (idSeries.length > 0) {
      getData(idSeries, getTVById, setSeries);
    }
  }, [idPeliculas, idSeries]);

  return (
    <LayoutSecundario textoBoton={'recientes'}>
      {userEmail && (
        <>
          <ul>
            <Children path={`Usuarios/${userEmail}/RecentPeliculas`} onDataReceived={handlePeliculaIds} key={'RecentPeliculas'} />
            <Children path={`Usuarios/${userEmail}/RecentSeries`} onDataReceived={handleSerieIds} key={'RecentSeries'} />
          </ul>

          {loading ? (
            <p>Cargando...</p>
          ) : (
            <>
              {peliculas.map((pelicula) => (
                <div key={pelicula.id}>
                  <img src={`${process.env.REACT_APP_URL_IMAGE_TMDB + pelicula.poster_path}`} alt="" height={600} />
                  <p>{pelicula.title}</p>
                </div>
              ))}

              {series.map((serie) => (
                <div key={serie.id}>
                  <img src={`${process.env.REACT_APP_URL_IMAGE_TMDB + serie.poster_path}`} alt="" height={600} />
                  <p>{serie.name}</p>
                </div>
              ))}
            </>
          )}
        </>
      )}
    </LayoutSecundario>
  );
}

export default Recientes