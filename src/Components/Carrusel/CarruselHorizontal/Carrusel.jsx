import { useState, useEffect } from "react";
import Loader from '../../Loader/Loader'
import Boton from '../../Boton'
import CardImg from '../../Card/CardImg/CardImg'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import "./Carrusel.css"

const Carrusel = ({peliculas, selectMovie}) => {
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
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
    console.log('next')
  };
  
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
    console.log('prev')
  };  

  return (
    <section>
      {peliculas ? (
        <div className="contenedor-principal">
          <Boton Contenido={ChevronLeftIcon} funcion={prevPage} colorHover={'#003686'}/>
          <div className="container-carrusel">
            <div className="container-card" id="container-card">
              {peliculasPagina.map(peli => (
                <CardImg peli={peli} funcion={selectMovie}/>                
              ))}
            </div>
          </div>
          <Boton Contenido={ChevronRightIcon} funcion={nextPage} colorHover={'#003686'}/>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Carrusel;
