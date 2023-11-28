import React from 'react'
import LayoutForm from '../../layout/LayoutForm/LayoutForm'
import CardDetalle from  '../../components/Card/CardDetalle/CardDetalle'
import { useLocation } from 'react-router-dom';

const CardSinopsis = () => { 
    const { state } = useLocation();
    const dato = state && state.dato;
    const selectedMovie = state && state.dato;

    if (!dato) {
        // Manejo si el objeto dato no está presente
        return <div>No hay datos disponibles.</div>;
    }

    if (!selectedMovie) {
        // Manejo si el objeto dato no está presente
        return <div>No hay datos disponibles.</div>;
    }

    return (
        <LayoutForm>
            <CardDetalle info={dato} />
            {/* {<Banner/>} Backdrop de la card en width 769px
            <Card/> poster titulo + subtitulo: genero + boton + sinopsis */}
        </LayoutForm>
    )
}

export default CardSinopsis
