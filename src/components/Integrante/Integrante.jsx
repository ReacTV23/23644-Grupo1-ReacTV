import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Boton from '../Boton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
// import GrupoBotones from '../Botones/GrupoBotones';
import { ButtonGroup } from 'react-bootstrap';
import './Integrante.css';

const Integrante = ({nombre, detalles}) => {
  return (
    <div className='Contenedor' key={nombre}>
      <div className='Nombre'>{nombre}</div>
      <ButtonGroup className='GrupoBotones'
        aria-label="small button group">
          <Boton Contenido={GitHubIcon} color={'black'} />
          <Boton Contenido={LinkedInIcon} color={'black'}/>
    </ButtonGroup>
    </div> 

)}

export default  Integrante
  