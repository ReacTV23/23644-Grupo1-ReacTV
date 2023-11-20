import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import { Login } from '../../components/Ingreso/Login/Login'

const LoginPage = () => {
    return (
        <LayoutSecundario textoBoton={'iniciar sesion'}>
            <Login/>
        </LayoutSecundario>
    )
}

export default LoginPage
