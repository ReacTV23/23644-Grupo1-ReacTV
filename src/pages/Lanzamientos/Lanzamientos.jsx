import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import Calendar from '../../components/Calendar/Calendar'
// import {Card} from '../../components/Card/Card'
import './Lanzamientos.css'

const Lanzamientos = () => {
  return (
    <LayoutSecundario textoBoton={'lanzamientos'}>
      <div className='Contenedor_lanzamientos'>
        <Calendar/>
        {/* <div style={{display:'flex', flexDirection:'column'}}>
          <h5 className="mb-2 mt-2" style={{textTransform:'uppercase', textAling:'center'}}>poster</h5>
          <Card/>
        </div>   */}
      </div>
    </LayoutSecundario>
  )
}

export default Lanzamientos