import React from 'react'
import LayoutSecundario from  '../../Layout/LayoutSecundario/LayoutSecundario'
import { Register } from '../../Components/Ingreso/Register/Register'

const RegistroPage = () => {
    return (
    <LayoutSecundario textoBoton={'registrarse'}>
        <Register/>
    </LayoutSecundario>
    )
}

export default RegistroPage
