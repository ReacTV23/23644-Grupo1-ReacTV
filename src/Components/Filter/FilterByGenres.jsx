import React, { useState, useEffect } from "react";
import { useMediaType } from "../../context/mediaTypeProvider";
import MediaSelector from "../MediaSelector/MediaSelector";
import List from "../Lists/ListRow";
import {
  getGenres,
  getMoviesByGenres,
  getTVByGenres,
  getAllByGenres,
} from "../../services/tmdbService";

const FilterByGenres = () => {
  const [genres, setGenres] = useState([]);
  const { mediaType } = useMediaType();
  const [selectedGenres, setSelectedGenres] = useState([]);
  // Objeto que asocia funciones de obtención de datos con tipos de medios específicos
  const fetchDataFunction = {
    movie: getMoviesByGenres,
    tv: getTVByGenres,
    all: getAllByGenres,
  };

  // Efecto que se ejecuta al montar el componente o cuando cambia el tipo de medio
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await getGenres(mediaType);
        setGenres(genresData[0]?.items || []);
      } catch (error) {
        console.error(`Error al obtener los géneros: ${error.message}`);
      }
    };

    // Llamada a la función para obtener los géneros
    fetchGenres();

    // Reinicia la lista de géneros seleccionados
    setSelectedGenres([]);
  }, [mediaType]);

  // Maneja los clics en los botones de género
  const handleGenreClick = (genreId) => {
    const selectedGenre = genres.find((genre) => genre.id === genreId);

    if (selectedGenre) {
      // Si el género ya está seleccionado, lo quita; de lo contrario, lo agrega
      if (selectedGenres.includes(selectedGenre)) {
        setSelectedGenres((prevSelectedGenres) =>
          prevSelectedGenres.filter((genre) => genre.id !== selectedGenre.id)
        );
      } else {
        setSelectedGenres((prevSelectedGenres) => [
          ...prevSelectedGenres,
          selectedGenre,
        ]);
      }
    }
  };

  return (
    <div>
      <MediaSelector />

      <h2>Listado de Géneros ({mediaType})</h2>
      {/* Lista de botones para cada género */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {genres.map((genre) => (
          <button
            key={genre.id}
            style={{
              backgroundColor: selectedGenres.some((g) => g.id === genre.id)
                ? "blue"
                : "gray",
              color: "#fff",
            }}
            onClick={() => handleGenreClick(genre.id)}
          >
            {genre.name}
          </button>
        ))}
      </div>

      {/* Sección que muestra los géneros seleccionados */}
      <div style={{ marginTop: "20px" }}>
        <label>Géneros Seleccionados:</label>
        {selectedGenres.map((selectedGenre) => (
          <List
            key={selectedGenre.id}
            title={selectedGenre.name}
            fetchDataFunction={fetchDataFunction[mediaType]}
            genre={selectedGenre.id}
          />
        ))}
        {/* Mensaje si no hay géneros seleccionados */}
        {selectedGenres.length === 0 && <p>Ninguno seleccionado</p>}
      </div>
    </div>
  );
};

export default FilterByGenres;
