import React from 'react'
import "./Guest.css"
import bgImage from '../../media/NeonCube.mp4'

export const Guest = () => {
  return (
    <div className='Guest'>

      <video autoPlay muted>
      <source src={bgImage} type='video/mp4'/>
      </video>

        <div className='text-wrapper'>
        <h1>Bienvenido a ReacTV</h1>  
        <p>
            Preparate para entrar en un mundo nuevo. Miles de peliculas 
            y series te estan esperando a vos y a toda tu familia.
        </p>    
        </div>  
    </div>
  )
}
