import { useState, useEffect } from "react";
import Loader from "../Loader/Loader";
import Boton from "../Boton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "./Carrusel.css";

const Carrusel = ({ peliculas, selectMovie, actualPage }) => {
  const API_URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;
  // const IMAGE_PATH = "https://image.tmdb.org/t/p/original";

  const fila = document.querySelector(".container-carrusel");
  const derecha = document.querySelector("#flecha-derecha");
  const izquierda = document.querySelector("#flecha-izquierda");
  const [currentPage, setCurrentPage] = useState(actualPage);
  const moviesPerPage = 3;
  const startIndex = currentPage * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const peliculasPagina = peliculas.slice(startIndex, endIndex);

  useEffect(() => {
    const handleRightClick = () => {
      fila.scrollLeft += fila.offsetWidth;
    };

    const handleLeftClick = () => {
      fila.scrollLeft -= fila.offsetWidth;
    };

    if (fila && derecha && izquierda) {
      derecha.addEventListener("click", handleRightClick);
      izquierda.addEventListener("click", handleLeftClick);

      return () => {
        // Limpiar los event listeners cuando el componente se desmonta
        derecha.removeEventListener("click", handleRightClick);
        izquierda.removeEventListener("click", handleLeftClick);
      };
    }
  }, [currentPage]); // Agrega las dependencias necesarias para evitar problemas de memoria

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };

  return (
    <section>
      {peliculas ? (
        <div className="contenedor-principal">
          <Boton
            Contenido={ChevronLeftIcon}
            funcion={prevPage}
            colorHover={"#003686"}
          />
          {/* <button id="flecha-izquierda" className="flecha-izquierda" onClick={prevPage}>
            <i className="fa-solid fa-chevron-left"></i>
          </button> */}
          <div className="container-carrusel">
            <div className="container-card" id="container-card">
              {peliculasPagina.map((peli) => (
                <div
                  key={peli.id}
                  className="col-md-4"
                  onClick={() => selectMovie(peli, currentPage)}
                >
                  <img
                    src={`${API_URL_IMAGE + peli.poster_path}`}
                    alt=""
                    height={600}
                  />
                </div>
              ))}
            </div>
          </div>
          <Boton
            Contenido={ChevronRightIcon}
            funcion={nextPage}
            colorHover={"#003686"}
          />
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Carrusel;
