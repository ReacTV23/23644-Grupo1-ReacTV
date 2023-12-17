import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import Calendar from '../../components/Calendar/Calendar2'

const Lanzamientos = ({anchoVentana}) => {
  return (
      <LayoutSecundario textoBoton={'lanzamientos'}>
          <Calendar/>
      </LayoutSecundario>
  )
}

export default Lanzamientos;