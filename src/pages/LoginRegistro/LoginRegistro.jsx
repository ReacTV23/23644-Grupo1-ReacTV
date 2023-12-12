import React from 'react'
import LayoutForm from '../../layout/LayoutForm/LayoutForm'
import { Login } from '../../components/Ingreso/Login/Login'
import { Register } from '../../components/Ingreso/Register/Register'
import Boton from '../../components/Boton/Boton'
import './LoginRegistro.css'
import colors from '../../config/config.js'

const LoginRegistro = () => {
    return (
        <LayoutForm >
            <div className='ContenedorFormularios'>
                <div className='FormTitulos'>
                    <Boton texto={'iniciar sesion'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`}/>
                    <Boton texto={'registrarse'} backgroundColor={`${colors.azul}`} backgroundHover={`${colors.naranja}`}/>
                </div>
                <div className='Forms'>
                    <Login width={'36rem'}/>
                    <Register width={'36rem'}/>
                </div>
            </div>
        </LayoutForm>
    )
}

export default LoginRegistro;
