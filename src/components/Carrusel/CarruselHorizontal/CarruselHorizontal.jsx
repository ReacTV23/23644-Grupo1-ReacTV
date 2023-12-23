import { useState, useEffect } from "react";
import { useResponsive } from '../../../context/responsiveContext.js'
import Loader from '../../Loader/Loader';
import Boton from '../../Boton/Boton';
import CardImg from '../../Card/CardImg/CardImg';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Titulo from '../../Titulo/Titulo';
import colors from '../../../config/config.js';
import "./CarruselHorizontal.css";

const Carrusel = ({texto, peliculas, selectMovie}) => {
  const fila = document.querySelector(".container-carrusel");
  const derecha = document.querySelector("#flecha-derecha");
  const izquierda = document.querySelector("#flecha-izquierda");
  const [currentPage, setCurrentPage] = useState(0);
  const anchoVentana = useResponsive();
 
  const anchoCarruselCard = anchoVentana - 60
  console.log('anchoCarruselCard', anchoCarruselCard); 
  const anchoCard = 400;
  const margenes = 20;
  const nCards = Math.round(anchoCarruselCard/(anchoCard+margenes))
  console.log('nCards', nCards);

  const moviesPerPage = nCards;
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
  }, [currentPage, fila, derecha, izquierda]);


  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, Math.ceil(peliculas.length / moviesPerPage) - 1));
  };
  
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };
  

  return (
    <section className='carruselHorizontal-section'>
      {peliculas ? (
        <div className='contenedor-carrusel-titulo'>
          <Titulo texto={texto}/>
          <div className="contenedor-principal">
            <Boton Contenido={ChevronLeftIcon} 
                    funcion={prevPage} 
                    colorHover={`${colors.naranja}`}
                    fontSize={'5rem'}/>
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
                    colorHover={`${colors.naranja}`}
                    fontSize={'5rem'}/>
          </div>
        </div>      
        ) : (
        <Loader />
      )}
    </section>
  );
};

export default Carrusel;
