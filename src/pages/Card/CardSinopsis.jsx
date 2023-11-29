import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getMovieById, getTVById } from "../../services/tmdbService";
import LayoutForm from '../../layout/LayoutForm/LayoutForm'
import CardDetalle from '../../components/Card/CardDetalle/CardDetalle'

const CardSinopsis = () => {
  //   Leo el parametro id
  const { id } = useParams();
  const [info, setInfo] = useState(null);
  const isMovie = window.location.pathname.includes("/movie/"); // Corregido

  // Función para buscar la película o serie
  const fetchData = async () => {
    try {
      const result = isMovie ? await getMovieById(id) : await getTVById(id);
      setInfo(result);
    } catch (error) {
      console.error(
        `Error buscando ${
          isMovie ? "la película" : "la serie de televisión"
        } (CardSinopsis2)`,
        error
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  return (
    <LayoutForm>
      {/* Renderizo el componente solo si el estado es distinto de null */}
      {info !== null ? <CardDetalle movie={info} /> : null}
    </LayoutForm>
  );
};

export default CardSinopsis;
