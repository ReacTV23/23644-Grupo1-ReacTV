import React from "react";
import GenerateList from "../generateList/GenerateList";

const MoviesByGenre = ({ movies, selectedGenres }) => {
  if (selectedGenres.length === 0) {
    // Muestra el mensaje si no hay géneros seleccionados
    return <p>No hay géneros seleccionados</p>;
  }

  // Filtra las películas según los géneros seleccionados
  const filteredMovies = movies.filter((genre) =>
    selectedGenres.includes(genre.title)
  );

  // Muestra las películas filtradas en el componente GenerateList
  return (
    <div>
      {filteredMovies.map((movie) => (
        <GenerateList key={movie.slug} movie={movie} />
      ))}
    </div>
  );
};

export default MoviesByGenre;
