import React from 'react'
import './CardImg.css'

const CardImg = ({peli, funcion}) => {
    const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;
    return (
        <div className='CardImg' key={peli.id} onClick={() =>funcion(peli)}>
            <img
                src={`${IMAGE_PATH + peli.poster_path}`}
                alt=""
                height={600}/>
        </div>
    )
}

export default CardImg
