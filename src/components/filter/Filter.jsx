import React, { useEffect, useState } from "react";
import { getAllMoviesByGenres, getGenres } from "../../services/tmdbService";
import MoviesByGenre from "./MovieByGenre";
// Meterial UI
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material/styles";
// Fin Material UI

const Filter = () => {
  const theme = useTheme();
  const [genresData, setGenresData] = useState([]);
  const [allMovies, setAllMovies] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  const getButtonStyle = (isSelected) => ({
    margin: theme.spacing(1),
    backgroundColor: isSelected
      ? theme.palette.primary.main
      : theme.palette.background.paper,
    color: isSelected
      ? theme.palette.primary.contrastText
      : theme.palette.text.primary,
  });

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const data = await getGenres();
        setGenresData(data);
      } catch (error) {
        console.error(`Error al obtener los géneros: ${error.message}`);
      }
    };

    const fetchAllMovies = async () => {
      try {
        const data = await getAllMoviesByGenres();
        setAllMovies(data);
      } catch (error) {
        console.error(`Error al obtener las películas: ${error.message}`);
      }
    };

    fetchGenres();
    fetchAllMovies();
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
      <h2>Pruebas de conexión</h2>
      {genresData.map((genreGroup) => (
        <div key={genreGroup.slug}>
          <h3>{genreGroup.title}</h3>
          <ul
            style={{
              listStyleType: "none",
              padding: 0,
              display: "flex",
              flexWrap: "wrap",
            }}
          >
            {genreGroup.items.map((genre) => (
              <li key={genre.id}>
                <Button
                  style={getButtonStyle(selectedGenres.includes(genre.name))}
                  onClick={() => handleCheckboxChange(genre.name)}
                >
                  {genre.name}
                </Button>
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
