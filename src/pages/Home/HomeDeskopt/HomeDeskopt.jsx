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
          ¡La descripción está aquí!
        </div>
        <Boton
          texto={"categorias"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          ¡La descripción está aquí!
        </div>
        <Boton
          texto={"generos"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          ¡La descripción está aquí!
        </div>
        <Boton
          texto={"mi lista"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          ¡La descripción está aquí!
        </div>
        <Boton
          texto={"lanzamientos"}
          backgroundColor={`${colors.azul}`}
          backgroundHover={`${colors.naranja}`}
        />
        <div className="DescripcionDeskopt-Invitado">
          ¡La descripción está aquí!
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
