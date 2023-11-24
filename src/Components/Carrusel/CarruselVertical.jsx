import { useState, useEffect } from "react";
import ExpandMoreIcon from '@mui/icons-material/ChevronRight';
import Loader from '../Loader/Loader';
import Boton from '../Boton';
import "./CarruselVertical.css";

const videos = [
  { url: 'assets/videos/intro-1-usuario.mp4' },
  { url: 'assets/videos/video-1-intro.mp4' },
  { url: 'assets/videos/intro-2-usuario.mp4' },
];

const Carrusel = ({ selectMovie }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const moviesPerPage = 3;
  const startIndex = currentPage * moviesPerPage;
  const endIndex = startIndex + moviesPerPage;
  const peliculasPagina = videos.slice(startIndex, endIndex);

  useEffect(() => {
    let contenedor = document.querySelector(".container-carrusel");
    let arriba = document.querySelector("#flecha-arriba");
    let abajo = document.querySelector("#flecha-abajo");

    const handleArribaClick = () => {
      const videoHeight = document.querySelector('.container-video video').offsetHeight;
      contenedor.scrollTop -= videoHeight;
    };

    const handleAbajoClick = () => {
      const videoHeight = document.querySelector('.container-video video').offsetHeight;
      contenedor.scrollTop += videoHeight;
    };


    if (contenedor && arriba && abajo) {
      arriba.addEventListener("click", handleArribaClick);
      abajo.addEventListener("click", handleAbajoClick);

      return () => {
        // Limpiar los event listeners cuando el componente se desmonta
        arriba.removeEventListener("click", handleArribaClick);
        abajo.removeEventListener("click", handleAbajoClick);
      };
    }
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
  };  

  return (
    <section>
      {videos ? (
        <div className="contenedor-principal-vertical">
          <div id="flecha-arriba" className="flecha-arriba">
            <Boton Contenido={ExpandMoreIcon} funcion={prevPage} colorHover={'#003686'}/>
          </div>
          <div className="container-carrusel-vertical">
            <div className="container-video" id="container-video">
              {peliculasPagina.map((peli, i) => (
                <div key={i} className="col-md-4" onClick={() => selectMovie(peli)}>
                  <video id={`miVideo${i}`} controls>
                    <source src={peli.url} type="video/mp4" />
                    Tu navegador no soporta el elemento de video.
                  </video>
                </div>
              ))}
            </div>
          </div>
          <div id="flecha-abajo" className="flecha-abajo">
            <Boton Contenido={ExpandMoreIcon} funcion={nextPage} colorHover={'#003686'}/>
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </section>
  );
};

export default Carrusel;
