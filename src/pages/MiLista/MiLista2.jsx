import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import MediaSelector from '../../components/MediaSelector/MediaSelector'
import MyList from '../../components/Lists/MyList'

const MiLista = () => {

  return (
    <LayoutSecundario textoBoton={'mi lista'}>
      <MediaSelector/>
      <MyList/>
      {/* <Card/> mapeo de datos traidos desde firebase */}
    </LayoutSecundario>
  )
}

export default MiLista