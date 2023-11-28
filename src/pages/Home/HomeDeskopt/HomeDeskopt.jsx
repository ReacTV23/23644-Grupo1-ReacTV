import {ButtonGroup} from 'react-bootstrap';
import Boton from '../../../Components/Boton'
import {useNavigate} from 'react-router'
import './HomeDeskopt.css'

const MainDeskoptInvitado = () => {
    return (
      <>
        {/* <Banner-Vertical/> */}
        <ButtonGroup className='GrupoBotonDeskopt-Invitado'>
            <Boton texto={'recientes'} backgroundColor={'#003686'} backgroundHover={'#E08400'}/>
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
            <Boton texto={'categorias'} backgroundColor={'#003686'} backgroundHover={'#E08400'}/>
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
            <Boton texto={'generos'} backgroundColor={'#003686'} backgroundHover={'#E08400'}/>
            <div className='DescripcionDeskopt-Invitado' >
              ¡La descripción está aquí!
            </div>
            <Boton texto={'mi lista'} backgroundColor={'#003686'} backgroundHover={'#E08400'}/>
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
            <Boton texto={'lanzamientos'} backgroundColor={'#003686'} backgroundHover={'#E08400'}/>
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
        </ButtonGroup>
      </>
    )
  };

  const MainDeskoptLogueado = () => {
    const navigate = useNavigate();

    const handleButtonClick = (ruta) => {
      console.log(`Navegando a ${ruta}`);
      navigate(ruta);
    };

    return (
      <>
      {/* <Banner Horizontal/> */}
      {/* <Carrusel/> */} 
      <ButtonGroup className='GrupoBotonDeskopt-Logueado'>
          <Boton texto={'recientes'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() =>handleButtonClick('/recientes')}/>
          <Boton texto={'categorias'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleButtonClick('/categorias')} />
          <Boton texto={'generos'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleButtonClick('/generos')} />
          <Boton texto={'mi lista'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleButtonClick('/milista')} />
          <Boton texto={'lanzamientos'} backgroundColor={'#003686'} backgroundHover={'#E08400'} funcion={() => handleButtonClick('/lanzamientos')} />
      </ButtonGroup> 
      </>
    )
  };

export const HomeDeskoptComponents = {
  MainDeskoptInvitado,
  MainDeskoptLogueado,
};

