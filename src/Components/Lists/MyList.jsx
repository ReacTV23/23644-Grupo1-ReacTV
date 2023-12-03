import React, { useEffect, useState } from "react";
import ListRow from "./ListRow";
import { useMediaType } from "../../context/mediaTypeProvider";
import { getMovieById, getTVById } from "../../services/tmdbService";

const MyList = () => {
  const { mediaType } = useMediaType();
  const [moviesComponent, setMoviesComponent] = useState(null);
  const [tvComponent, setTVComponent] = useState(null);

  useEffect(() => {
    if (mediaType === "movie" || mediaType === "all") {
      setMoviesComponent(
        <>
          <ListRow
            title="tus películas"
            fetchDataFunction={getMovieById}
            page={1}
          />
        </>
      );
    } else {
      setMoviesComponent(null);
    }

    if (mediaType === "tv" || mediaType === "all") {
      setTVComponent(
        <>
          <ListRow
            title="tus series"
            fetchDataFunction={getTVById}
            page={1}
          />
        </>
      );
    } else {
      setTVComponent(null);
    }
  }, [mediaType]);

  return (
    <>
      {moviesComponent}
      {tvComponent}
    </>
  );
};

export default MyList;
