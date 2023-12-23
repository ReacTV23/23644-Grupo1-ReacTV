import React from 'react'
import './CardImg.css'

const CardImg = ({peli, height = 600, width = 400, funcion, anchoVentana}) => {
    const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;

    let imageUrl = '';

    if (anchoVentana) {
        console.log('si hay props ancho ventana')
        imageUrl = anchoVentana > 768 ? peli.poster_path : peli.backdrop_path;
    } else {
        console.log('no hay props ancho ventana')
        imageUrl = peli.poster_path;
    } 

    return (
        <div className='CardImg' key={peli.id} onClick={() => funcion(peli)}>
            <img
                src={`${IMAGE_PATH + imageUrl}`}
                alt=""
                height={height}
                width={width}
                style={{ objectFit: 'cover', borderRadius: '1rem' }}
            />
        </div>
    )
}

export default CardImg
