import { useState, useEffect } from "react";
import Loader from '../../Loader/Loader';
import Boton from '../../Boton/Boton';
import CardImg from '../../Card/CardImg/CardImg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Titulo from '../../Titulo/Titulo';
import colors from '../../../config/config.js';
import "./CarruselHorizontal.css";

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


  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(peliculas.length / moviesPerPage) - 1));
  };
  
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  

  return (
    <section>
      {peliculas ? (
        <div className='contenedor-carrusel-titulo'>
          <Titulo texto={texto}/>
          <div className="contenedor-principal">
            <Boton Contenido={ChevronLeftIcon} 
                    funcion={prevPage} 
                    colorHover={`${colors.naranja}`}/>
            <div className="container-carrusel">
              <div className="container-card" id="container-card">
                {peliculasPagina.map((peli, i) => (
                  <div key={i} className='card-carrusel--horizontal'>
                    <CardImg peli={peli} funcion={selectMovie} width={300} height={500}/>
                  </div>                
                ))}
              </div>
            </div>
            <Boton Contenido={ChevronRightIcon} 
                    funcion={nextPage} 
                    colorHover={`${colors.naranja}`}/>
          </div>
        </div>      
        ) : (
        <Loader />
      )}
    </section>
  );
};

export default Carrusel;
