import React from 'react';
import Boton from '../../components/Boton';
import './LayoutSecundario.css';


const LayoutSecundario = ({children, textoBoton}) => {
  return (
    <div className='LayoutSecundario'>
        {/* <Nabvar/> */}
        <Boton texto={textoBoton}/>
        {children}
        <Boton texto={'volver'}/>
    </div>
  )
}

export default LayoutSecundario
