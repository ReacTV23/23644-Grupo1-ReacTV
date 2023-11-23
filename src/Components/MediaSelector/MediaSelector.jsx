import React from "react";
import { useMediaType } from "../../context/mediaTypeProvider";

const MediaSelector = () => {
  const { mediaType, changeMediaType } = useMediaType();

  const handleRadioChange = (event) => {
    const newType = event.target.value;
    changeMediaType(newType);
  };

  return (
    <div>
      <h2>Seleccione el tipo de medio</h2>
      <label>
        <input
          type="radio"
          name="mediaType"
          value="movie"
          checked={mediaType === "movie"}
          onChange={handleRadioChange}
        />
        Películas (Movie)
      </label>

      <label>
        <input
          type="radio"
          name="mediaType"
          value="tv"
          checked={mediaType === "tv"}
          onChange={handleRadioChange}
        />
        Series (TV)
      </label>

      <label>
        <input
          type="radio"
          name="mediaType"
          value="all"
          checked={mediaType === "all"}
          onChange={handleRadioChange}
        />
        Todos (All)
      </label>
    </div>
  );
};

export default MediaSelector;
