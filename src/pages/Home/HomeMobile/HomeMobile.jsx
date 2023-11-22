import React, { useState } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import Boton from '../../../Components/Boton';
import Banner from '../../../Components/Banner/Banner'
import {useNavigate} from 'react-router'
import './HomeMobile.css';

  const MainMobileInvitado = () => {
    const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
    const [botonClicado, setBotonClicado] = useState('');

    const handleDescripcion = (textoBoton) => {
      setBotonClicado(textoBoton);
      setMostrarDescripcion(true);
    };

    const handleCerrarDescripcion = () => {
      setMostrarDescripcion(false);
    };

    const Descripcion = () => {
      return (
        <div className="ContenedorMobile">
          <Boton texto={botonClicado} backgroundColor={'#003686'} backgroundHover={'#E08400'} />
          <div className='DescripcionMobile-Invitado'>
            ¡La descripción está aquí!
          </div>
          <Boton texto={'cerrar'} funcion={handleCerrarDescripcion} backgroundColor={'#003686'} backgroundHover={'#E08400'} />
        </div>
      )
    }
    return (
      <>
        <Banner/>
        {!mostrarDescripcion &&
          <ButtonGroup className='GrupoBotonMobile'>
            <Boton texto={'recientes'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleDescripcion('recientes')} />
            <Boton texto={'categorias'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleDescripcion('categorias')} />
            <Boton texto={'generos'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleDescripcion('generos')} />
            <Boton texto={'mi lista'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleDescripcion('mi lista')} />
            <Boton texto={'lanzamientos'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleDescripcion('lanzamientos')} />
          </ButtonGroup>}
        {mostrarDescripcion && (<Descripcion />)}
      </>
    )
  };

  const MainMobileLogueado = () => {
    const navigate = useNavigate();

    const handleButtonClick = (ruta) => {
      console.log(`Navegando a ${ruta}`);
      navigate(ruta);
    };
    
    return (
      <>
        <Banner/>
        <ButtonGroup className='GrupoBotonMobile'>
        <Boton texto={'recientes'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() =>handleButtonClick('/recientes')}/>
          <Boton texto={'categorias'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleButtonClick('/categorias')} />
          <Boton texto={'generos'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleButtonClick('/generos')} />
          <Boton texto={'mi lista'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleButtonClick('/milista')} />
          <Boton texto={'lanzamientos'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleButtonClick('/lanzamientos')}/>
        </ButtonGroup>
      </>
    )
  };

  const HomeMobile = {
    MainMobileInvitado,
    MainMobileLogueado,
  };


export default HomeMobile;