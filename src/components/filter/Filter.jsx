import React, { useEffect, useState } from "react";
import { getAllMovies, getGenres } from "../../services/tmdbService";
import MoviesByGenre from "./MovieByGenre";

const Filter = () => {
  const [genresData, setGenresData] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenresData(data);
      } catch (error) {
        console.error(`Error al obtener los géneros: ${error.message}`);
      }
    };

    const fecthAllMovies = async () => {
      try {
        const data = await getAllMovies();
        setAllMovies(data);
      } catch (error) {
        console.error(`Error al obtener las peliculas: ${error.message}`);
      }
    };

    fetchGenres();
    fecthAllMovies();
  }, []);

  const handleCheckboxChange = (genreSlug) => {
    // Actualiza el estado de los géneros seleccionados
    if (selectedGenres.includes(genreSlug)) {
      // Si el género ya está seleccionado, quítalo
      setSelectedGenres(selectedGenres.filter((slug) => slug !== genreSlug));
    } else {
      // Si el género no está seleccionado, agrégalo
      setSelectedGenres([...selectedGenres, genreSlug]);
    }
  };

  return (
    <div>
      <h2>Pruebas de conexion</h2>
      {genresData.map((genreGroup) => (
        <div key={genreGroup.slug}>
          <h3>{genreGroup.title}</h3>
          <ul>
            {genreGroup.items.map((genre) => (
              <li key={genre.id}>
                <label>
                  <input
                    type="checkbox"
                    value={genre.id}
                    onChange={() => handleCheckboxChange(genre.name)}
                  />
                  {genre.name}
                </label>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <hr />
      {/* Nuevo componente que renderiza las películas */}
      <MoviesByGenre movies={allMovies} selectedGenres={selectedGenres} />
    </div>
  );
};

export default Filter;
