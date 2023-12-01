import { useState, useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getMovieById, getTVById } from "../../services/tmdbService";
import LayoutForm from "../../layout/LayoutForm/LayoutForm";
import CardDetalle from "../../components/Card/CardDetalle/CardDetalle";
import Loader from "../../components/Loader/Loader";

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
      // console.error(
      //   `Error buscando ${
      //     isMovie ? "la película" : "la serie de televisión"
      //   } (CardSinopsis2)`,
      //   error,
      setInfo([]);
      // );
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  if (info !== null) {
    if (info.length !== 0) {
      return (
        <LayoutForm>
          <CardDetalle movie={info} />
        </LayoutForm>
      );
    } else {
      return <Navigate to="/error404" />;
    }
  } else {
    return (
      <LayoutForm>
        <Loader />
      </LayoutForm>
    );
  }
};

export default CardSinopsis;
