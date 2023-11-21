import React from 'react'
import './Card.css'

export function Card(children) {

  return (

      <article className='card-movie'>
        <div className='img-container'>
          <img className='img-pelicula' src={children.imgMovie} alt="" />
        </div>
        <div className='btn-container'>
          <button className='btn'>2</button>
          <button className='btn'>1</button>
        </div>
        <div className='info-container'>
          <p className='titulo'>{children.titulo}</p>
          <div className='info-movie'>
            <p className='edad'>{children.edad}</p>
            <p className='duracion'>{children.duracion}</p>
            <p className='genero'>{children.genero}</p>
            <p className='year'>{children.year}</p>
          </div>
          <p className='descripcion'>{children.descripcion}</p>
        </div>
      </article>
  )
}

