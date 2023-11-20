import { ButtonGroup } from 'react-bootstrap';
import Boton from '../../../components/Boton'
import './HomeDeskopt.css'

const MainDeskoptInvitado = () => {
    return (
      <>
        {/* <Banner-Vertical/> */}
        <ButtonGroup className='GrupoBotonDeskopt-Invitado'>
            <Boton texto={'recientes'}/>
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
            <Boton texto={'categorias'} />
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
            <Boton texto={'generos'} />
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
            <Boton texto={'mi lista'} />
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
            <Boton texto={'lanzamientos'}/>
            <div className='DescripcionDeskopt-Invitado'>
              ¡La descripción está aquí!
            </div>
        </ButtonGroup>
      </>
    )
  };

  const MainDeskoptLogueado = () => {
    return (
      <>
      {/* <Banner Horizontal/> */}
      {/* <Carrusel/> */} 
      <ButtonGroup className='GrupoBotonDeskopt-Logueado'>
          <Boton texto={'recientes'} funcion={()=>console.log('recientes')}/>
          <Boton texto={'categorias'} funcion={()=>console.log('categorias')}/>
          <Boton texto={'generos'} funcion={()=>console.log('generos')}/>
          <Boton texto={'mi lista'} funcion={()=>console.log('mi lista')}/>
          <Boton texto={'lanzamientos'} funcion={()=>console.log('lanzamientos')}/>
      </ButtonGroup> 
      </>
    )
  };

export const HomeDeskoptComponents = {
  MainDeskoptInvitado,
  MainDeskoptLogueado,
};

