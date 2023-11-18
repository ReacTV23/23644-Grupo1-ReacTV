import React, {useState} from 'react'
import LayoutMain from '../../layout/LayoutMain/LayoutMain'
import { ButtonGroup } from 'react-bootstrap';
import Boton from '../../components/Boton'
import './Home.css'

const Home = () => {
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
      <div className="contenedor">
        <Boton texto={botonClicado}/>
        <div className='descripcion'>
          ¡La descripción está aquí!
        </div>
        <Boton texto={'cerrar'}funcion={handleCerrarDescripcion}/>
      </div>
    )
  }

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

export default Home