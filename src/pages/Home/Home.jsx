import React, {useState} from 'react'
import LayoutMain from '../../layout/LayoutMain/LayoutMain'
import { ButtonGroup } from 'react-bootstrap';
import Boton from '../../components/Boton'
import './Home.css'

const Home = () => {
  const [mostrarDescripcion, setMostrarDescripcion] = useState(false);
  const [botonClicado, setBotonClicado] = useState('');
  const [isAuth, setIsAuth] = useState(false);

  const handleDescripcion = (textoBoton) => {
    setBotonClicado(textoBoton);
    setMostrarDescripcion(true);
  };

  const handleCerrarDescripcion = () => {
    setMostrarDescripcion(false);
  };

  const Descripcion = () => {
    return (
      <div className="contenedor">
        <Boton texto={botonClicado}/>
        <div className='descripcion'>
          ¡La descripción está aquí!
        </div>
        <Boton texto={'cerrar'}funcion={handleCerrarDescripcion}/>
      </div>
    )
  }

  const MainInvitado = () => {
    return (
      <LayoutMain>
      {/* <Banner/> */}
      {!mostrarDescripcion &&
      <ButtonGroup className='GrupoBoton'>
          <Boton texto={'recientes'} funcion={()=>handleDescripcion('recientes')}/>
          <Boton texto={'categorias'} funcion={()=>handleDescripcion('categorias')}/>
          <Boton texto={'generos'} funcion={()=>handleDescripcion('generos')}/>
          <Boton texto={'mi lista'} funcion={()=>handleDescripcion('mi lista')}/>
          <Boton texto={'lanzamientos'} funcion={()=>handleDescripcion('lanzamientos')}/>
      </ButtonGroup> } 
      {mostrarDescripcion && (<Descripcion/>)}
      </LayoutMain>
    )
  }

  const MainLogueado = () => {
    return (
      <LayoutMain>
      {/* <Banner/> */}
      {!mostrarDescripcion &&
      <ButtonGroup className='GrupoBoton'>
          <Boton texto={'recientes'} funcion={()=>console.log('recientes')}/>
          <Boton texto={'categorias'} funcion={()=>console.log('categorias')}/>
          <Boton texto={'generos'} funcion={()=>console.log('generos')}/>
          <Boton texto={'mi lista'} funcion={()=>console.log('mi lista')}/>
          <Boton texto={'lanzamientos'} funcion={()=>console.log('lanzamientos')}/>
      </ButtonGroup> } 
      {mostrarDescripcion && (<Descripcion/>)}
      </LayoutMain>
    )
  }

  return (
    <>
      {/* <Boton texto={'loguearse'} funcion={()=>setIsAuth(true)}/> */}
      {!isAuth && <MainInvitado/>}
      {isAuth && <MainLogueado/>}
    </>    
  )
}

export default Home