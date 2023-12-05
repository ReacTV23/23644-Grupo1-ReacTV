import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import Calendar from '../../components/Calendar/Calendar'
import './Lanzamientos.css'

const Lanzamientos = () => {
  return (
    <LayoutSecundario textoBoton={'lanzamientos'}>
      <div className='Contenedor_lanzamientos'>
        <Calendar />
      </div>
    </LayoutSecundario>
  )
}


export default Lanzamientos