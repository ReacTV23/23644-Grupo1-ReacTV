import React from 'react'
import LayoutSecundario from '../../Layout/LayoutSecundario/LayoutSecundario'
import { Login } from '../../Components/Ingreso/Login/Login'

const LoginPage = () => {
    return (
        <LayoutSecundario textoBoton={'iniciar sesion'}>
            <Login/>
        </LayoutSecundario>
    )
}

export default LoginPage
