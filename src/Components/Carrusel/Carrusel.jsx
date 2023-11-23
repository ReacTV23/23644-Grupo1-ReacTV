import { useState, useEffect } from "react";
import Loader from '../Loader/Loader'
import Boton from '../Boton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "./carrusel.css"

const Carrusel = ({peliculas, selectMovie}) => {
  const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;
  const fila = document.querySelector(".container-carrusel");
  const derecha = document.querySelector("#flecha-derecha");
  const izquierda = document.querySelector("#flecha-izquierda");
  const [currentPage, setCurrentPage] = useState(0);
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
    console.log('next')
  };
  
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    console.log('prev')
  };  

  // const peliculasPagina = peliculas.slice(
  //   currentPage * moviesPerPage,
  //   (currentPage + 1) * moviesPerPage
  // );

  return (
    <section>
      {peliculas ? (
        <div className="contenedor-principal">
          <Boton Contenido={ChevronLeftIcon} funcion={prevPage} colorHover={'#003686'}/>
          {/* <button id="flecha-izquierda" className="flecha-izquierda" onClick={prevPage}>
            <i className="fa-solid fa-chevron-left"></i>
          </button> */}
          <div className="container-carrusel">
            <div className="container-card" id="container-card">
              {peliculasPagina.map(peli => (
                <div key={peli.id} className="col-md-4" onClick={() => selectMovie(peli)}>
                  <img
                    src={`${IMAGE_PATH + peli.poster_path}`}
                    alt=""
                    height={600}
                  />
                </div>
              ))}
            </div>
          </div>
          <Boton Contenido={ChevronRightIcon} funcion={nextPage} colorHover={'#003686'}/>
            {/* <button id="flecha-derecha" className="flecha-derecha" onClick={nextPage}>
              <i className="fa-solid fa-chevron-right"></i>
            </button> */}
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Carrusel;
