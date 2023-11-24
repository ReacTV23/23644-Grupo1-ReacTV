import React from 'react'
import './BotonForm.css'

const BotonForm = ({texto,width}) => {
    return (
        <div className="cont-btn">
            <button type='submit' className='Boton' style={{width:width}}>{texto}</button>
        </div>
    )
}

export default BotonForm
