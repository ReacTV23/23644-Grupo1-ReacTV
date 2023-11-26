// MoviesContainer.js
import React,  { useState, useEffect }  from 'react';
import MovieCard from './MovieCard';
import { searchTMDB} from '../../services/tmdbService.js'
//import { useSearch } from '../../context/searchContext';  // Importa el hook useSearch
import Loader from '../Loader/Loader'

const MoviesContainer = () => {

  // const { searchQuery } = useSearch(); // Obtiene el estado y las funciones de búsqueda del contexto

  //variables de estado
  const [searchTerm, setSearchTerm] = useState("");
  const [searchData, setSearchData] = useState([]);
  // const [movies, setMovies] = useState([]);
  // const [movie, setMovie] = useState( {title: "Loading Movies"});

 // Función para buscar películas en tiempo real
  // const searchMoviesRealTime = async (query) => {
  //   try {
  //     const endPoint = `https://api.themoviedb.org/3/search/multi`;
  //     const response = await axios.get(endPoint, {
  //       params: {
  //         api_key: API_KEY,
  //         language: LENGUAJE,
  //         page: 1,
  //         query: query,
  //       },
  //     });

//     const results = response.data.results;
//       const filteredResults = results.map((result) => {
//         if (result.poster_path) {
//           result.poster_path = `${IMAGE_BASE_URL}${result.poster_path}`;
//         }
//         return result;
//       });

//     setMovies(filteredResults);
//     setMovie(filteredResults[0]);
//   } catch (error) {
//     console.error('Error fetching movies:', error.message);
//   }
// };

  const getDataBusqueda = async () => {
    try {
      const data = await searchTMDB(searchTerm, "multi", 1);
      setSearchData(data);
      console.log(data)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      // Realiza la búsqueda solo si hay un término de búsqueda
      if (searchTerm.trim() !== "") {
        getDataBusqueda();
      } else {
        // Si el término de búsqueda está vacío, reinicio los resultados
        setSearchData([]);
      }
    };

    fetchData();
  }, [searchTerm]); // Ahora useEffect depende de searchTerm

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await searchTMDB(searchTerm, "multi", 1);
        setSearchData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Realiza la búsqueda solo si hay un término de búsqueda
    if (searchTerm.trim() !== "") {
      console.log('no se ingreso ninguna palabra')
      getData();
    } else {
      // Si el término de búsqueda está vacío, reincio los resultados
      setSearchData([]);
    }
  }, []);
// useEffect(() => {
//     const getData = async () => {
//       try {
//         const data = await searchTMDB(searchTerm, "multi", 1);
//         setSearchData(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     // Realiza la búsqueda solo si hay un término de búsqueda
//     if (searchTerm.trim() !== "") {
//       console.log('no se ingreso ninguna palabra')
//       getData();
//     } else {
//       // Si el término de búsqueda está vacío, reincio los resultados
//       setSearchData([]);
//     }
//   }, []);
  console.log("Movies in MoviesContainer:", searchData);

  // useEffect(() => {
  //   if (searchQuery) {
  //     searchMoviesRealTime(searchQuery);
  //   } else {
  //     // If no search query, show popular movies or other default logic
  //   }
  // }, [searchQuery]);

  return (
    <div className='container mt-3'>
      <input
        type="text"
        placeholder="Ingrese su búsqueda"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

    {searchData === null ? (
      <Loader />
      ) : searchData && searchData.length === 0 ? (
      <p>No hay resultados</p>
      ) : (
      <div className='row' style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {searchData.map((result) => (
          <MovieCard key={result.id} movie={result} />
        ))}
      </div>
      )}
    </div>
  );
};

export default MoviesContainer;
