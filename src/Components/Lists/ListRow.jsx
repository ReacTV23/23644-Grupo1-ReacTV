// ListRow.js

import React, { useState, useEffect } from "react";
import Loader from "../Loader/CircleLoader";

const ListRow = ({ title, fetchDataFunction, page = 1, genre }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = genre
          ? await fetchDataFunction(page, genre)
          : await fetchDataFunction(page);
        setMovies(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, [fetchDataFunction, page, genre]);

  return (
    <div>
      <h3>{title}</h3>
      {isLoading ? (
        <Loader />
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ListRow;