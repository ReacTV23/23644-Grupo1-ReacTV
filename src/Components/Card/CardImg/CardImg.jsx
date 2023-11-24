import React from 'react'

const CardImg = ({peli, funcion}) => {
    const IMAGE_PATH = process.env.REACT_APP_URL_IMAGE_TMDB;
    return (
        <div key={peli.id} className="col-md-4" onClick={() =>funcion(peli)}>
            <img
                src={`${IMAGE_PATH + peli.poster_path}`}
                alt=""
                height={600}/>
        </div>
    )
}

export default CardImg
