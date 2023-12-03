import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import MediaSelector from '../../components/MediaSelector/MediaSelector'

const Recientes = () => {
  return (
    <LayoutSecundario textoBoton={'recientes'}>
        <MediaSelector/>
        

      {/* <Carrusel/> para pelis
      <Carrsuel/> para series*/}
    </LayoutSecundario>
  )
}

export default Recientes