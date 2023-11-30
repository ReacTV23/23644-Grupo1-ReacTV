import { useState, useEffect } from "react";
import Loader from '../../Loader/Loader'
import Boton from '../../Boton'
import CardImg from '../../Card/CardImg/CardImg'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Titulo from '../../Titulo/Titulo'
import "./CarruselHorizontal.css"

const Carrusel = ({ texto, peliculas, selectMovie }) => {
  const fila = document.querySelector(".container-carrusel");
  const derecha = document.querySelector("#flecha-derecha");
  const izquierda = document.querySelector("#flecha-izquierda");
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 3;
  const totalPages = Math.ceil(peliculas.length / moviesPerPage);

  useEffect(() => {
    const handleRightClick = () => {
      if (currentPage < totalPages - 1) {
        // Solo permitir desplazamiento si no estamos en la última página
        setCurrentPage((prevPage) => prevPage + 1);
      }
    };

    const handleLeftClick = () => {
      if (currentPage > 0) {
        // Solo permitir desplazamiento si no estamos en la primera página
        setCurrentPage((prevPage) => prevPage - 1);
      }
    };

    if (fila && derecha && izquierda) {
      derecha.addEventListener("click", handleRightClick);
      izquierda.addEventListener("click", handleLeftClick);

      return () => {
        derecha.removeEventListener("click", handleRightClick);
        izquierda.removeEventListener("click", handleLeftClick);
      };
    }
  }, [currentPage, fila, derecha, izquierda, totalPages]);

  const startIndex = currentPage * moviesPerPage;
  const endIndex = Math.min(startIndex + moviesPerPage, peliculas.length);
  const peliculasPagina = peliculas.slice(startIndex, endIndex);

  return (
    <section>
      {peliculas ? (
        <div className='contenedor-carrusel-titulo'>
          <Titulo texto={texto}/>
          <div className="contenedor-principal">
            <Boton Contenido={ChevronLeftIcon} funcion={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 0))} colorHover={'#003686'}/>
            <div className="container-carrusel">
              <div className="container-card" id="container-card">
                {peliculasPagina.map((peli, i) => (
                  <CardImg key={i} peli={peli} funcion={selectMovie}/>                
                ))}
              </div>
            </div>
            <Boton Contenido={ChevronRightIcon} funcion={() => setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages - 1))} colorHover={'#003686'}/>
          </div>
        </div>      
        ) : (
        <Loader />
      )}
    </section>
  );
};

export default Carrusel;
