import React from 'react';
import GitHubIcon from '@mui/icons-material/GitHub';
import Boton from '../Boton/Boton';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { ButtonGroup } from 'react-bootstrap';
import './Integrante.css';

const Integrante = ({nombre,apellido, Github, Linkedin}) => {
  return (
    <div className='Contenedor' key={nombre}>
      <div className='Nombre'>{nombre} {apellido}</div>
      <ButtonGroup className='GrupoBotones'
        aria-label="small button group">
        <a href={Github} target="_blank" rel="noopener noreferrer">
          <Boton Contenido={GitHubIcon} fontSize={'3rem'} padding={'0.5rem'}/>
        </a>
        <a href={Linkedin} target="_blank" rel="noopener noreferrer">
          <Boton Contenido={LinkedInIcon} fontSize={'3rem'} padding={'0.5rem'}/>
        </a>
      </ButtonGroup>
    </div> 
)}

export default  Integrante
  