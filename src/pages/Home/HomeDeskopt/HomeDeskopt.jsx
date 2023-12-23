import {ButtonGroup} from 'react-bootstrap';
import Boton from '../../../components/Boton/Boton'
import Banner from '../../../components/Banner/Banner'
import CarruselVertical from '../../../components/Carrusel/CarruselVertical/CarruselVertical'
import {useNavigate} from 'react-router'
import './HomeDeskopt.css'
import colors from '../../../config/config.js'

const MainDeskoptInvitado = () => {
  return (
    <div className="Contenedor-MainDeskoptInvitado">
      <CarruselVertical />
      <ButtonGroup className="GrupoBotonDeskopt-Invitado">
        <Boton
          texto={"recientes"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          ¡Pausa cuando quieras!.
          <br></br>
          ReacTV cuenta con avanzado sistema de reproduccion que te permite dejar de ver tu programa favorito, luego regresar y continuar donde estabas.
          <br></br>
          ¡Todo esto como si nunca te hubieras ido!.
        </div>
        <Boton
          texto={"categorias"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          Cada cosa en su lugar.
          <br></br>
          ¿Estas cansado de buscar y no encontrar nada?
          <br></br>
          Entonces prueba nuestro selector de categorias. Busca lo que quieras, encuentra lo que necesitas.
        </div>
        <Boton
          texto={"generos"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          Libreria adaptada a tus gustos.
          <br></br>
          <br></br>
          ¡Con nuestra ultima actualizacion puedes buscar SOLO los generos que deseas y dejar fuera todo aquello que no te interese ver en este momento!.
        </div>
        <Boton
          texto={"mi lista"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          ¿Todavia no salio esa pelicula que deseas?.
          <br></br>
          ¿Encontraste algo y no tienes tiempo?.
          <br></br>
          <br></br>
          Tranquilo, puedes guardarla aqui y verla luego sin olvidarte.
        </div>
        <Boton
          texto={"lanzamientos"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          El mas innovador sistema de lanzamientos hecho para vos.
          Cientos de peliculas ordenadas por dias para saber cuando sale esa nueva temporada que tanto esperas.
          ¡Hasta puedes descargar el calendario!.
        </div>
      </ButtonGroup>
    </div>
  );
};

const MainDeskoptLogueado = () => {
  const navigate = useNavigate();

  const handleButtonClick = (ruta) => {
    console.log(`Navegando a ${ruta}`);
    navigate(ruta);
  };

  return (
    <>
      <Banner/>
      <ButtonGroup className="GrupoBotonDeskopt-Logueado">
        <Boton
          texto={"recientes"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
          funcion={() => handleButtonClick("/recientes")}
        />
        <Boton
          texto={"categorias"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
          funcion={() => handleButtonClick("/categorias")}
        />
        <Boton
          texto={"generos"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
          funcion={() => handleButtonClick("/generos")}
        />
        <Boton
          texto={"mi lista"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
          funcion={() => handleButtonClick("/milista")}
        />
        <Boton
          texto={"lanzamientos"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
          funcion={() => handleButtonClick("/lanzamientos")}
        />
      </ButtonGroup>
    </>
  );
};

export const HomeDeskoptComponents = {
  MainDeskoptInvitado,
  MainDeskoptLogueado,
};
