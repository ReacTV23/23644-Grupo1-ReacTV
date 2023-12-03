import React, {useState, useEffect} from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import MediaSelector from '../../components/MediaSelector/MediaSelector'

const Recientes = () => {
  return (
    <LayoutSecundario textoBoton={'recientes'}>
      <MediaSelector/>  
    </LayoutSecundario>
  )
}

export default Recientes