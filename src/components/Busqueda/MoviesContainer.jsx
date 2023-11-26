// MoviesContainer.js
import React,  { useState, useEffect }  from 'react';
import MovieCard from './MovieCard';
import { searchTMDB} from '../../services/tmdbService.js'
import { useSearch } from '../../context/searchContext';  // Importa el hook useSearch

const MoviesContainer = () => {

  const { searchQuery } = useSearch(); // Obtiene el estado y las funciones de búsqueda del contexto

  // const API_KEY = process.env.REACT_APP_API_KEY_TMDB
  // const IMAGE_BASE_URL = process.env.REACT_APP_URL_IMAGE_TMDB
  // const LENGUAJE = process.env.REACT_APP_LANGUAGE_CODE_TMDB

  //variables de estado
  const [searchData, setSearchData] = useState([]);
  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState( {title: "Loading Movies"});

  console.log("Movies in MoviesContainer:", movies);

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

  useEffect(() => {
  const getData = async () => {
    try {
      const data = await searchTMDB(searchTerm, "multi", 1);
      setSearchData(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  }, [])

  // useEffect(() => {
  //   if (searchQuery) {
  //     searchMoviesRealTime(searchQuery);
  //   } else {
  //     // If no search query, show popular movies or other default logic
  //   }
  // }, [searchQuery]);

  return (
    <div className='container mt-3'>
      <div className='row' style={{display:'flex', alingItems:'center', justifyContent:'center'}}>
        {movies.map((result) => {
            return (
              <MovieCard
                key={result.id}
                movie={result}
                // handleSelectedMovie={}
              />
        )})}
      </div>
    </div>
  );
};

export default MoviesContainer;
