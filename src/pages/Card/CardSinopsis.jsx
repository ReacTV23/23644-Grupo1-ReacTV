import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getTVById, getTrailersById, getTrailersTVById } from "../../services/tmdbService";
import LayoutForm from '../../layout/LayoutForm/LayoutForm'
import CardDetalle from '../../components/Card/CardDetalle/CardDetalle'

const CardSinopsis = () => {
  //   Leo el parametro id
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const [trailer, setTrailer] = useState(null)
  const isMovie = window.location.pathname.includes("/movie/"); // Corregido

  // Función para buscar la película o serie
  const fetchData = async () => {
    try {
      const result = isMovie ? await getMovieById(id) : await getTVById(id);
      const resultTrailer = isMovie ? await getTrailersById(id) : await getTrailersTVById(id);
      setInfo(result);

      // Manejar el caso en que resultTrailer sea undefined
      if (resultTrailer && resultTrailer.length > 0) {
        setTrailer(resultTrailer[0]);
      } else {
        console.log(`No se encontraron trailers para la ${isMovie ? 'película' : 'serie de televisión'} con ID ${id}`);
      }

      //console.log('result trailer:', resultTrailer)
    } catch (error) {
      console.error(
        `Error buscando ${
          isMovie ? "la película" : "la serie de televisión"
        } (CardSinopsis)`,
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  // console.log(trailer)

  return (
    <LayoutForm>
      {/* Renderizo el componente solo si el estado es distinto de null */}
      {info !== null  ? <CardDetalle movie={info} trailer={trailer} /> : null}
    </LayoutForm>
  );
};

export default CardSinopsis;
