import React from 'react'
import LayoutSecundario from  '../../layout/LayoutSecundario/LayoutSecundario'
import { Register } from '../../components/Ingreso/Register/Register'

const RegistroPage = () => {
    return (
    <LayoutSecundario textoBoton={'registrarse'}>
        <Register/>
    </LayoutSecundario>
    )
}

export default RegistroPage
