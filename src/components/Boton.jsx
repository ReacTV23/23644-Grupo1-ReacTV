import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const Boton = ({Contenido, texto, funcion, color, colorHover}) => {
  if(Contenido) {
    const Icono = Contenido;
    return (
     // Si hay un icono, renderiza un IconButton
      <IconButton className='IconoBoton' aria-label={Icono}>
        <Icono className='Icono'
        sx={{fontSize: {xs:'30px', sm:'40px'},
          color: {color},
          ':hover': {color: colorHover}
          }}/>
      </IconButton>
      )}
  else {
    return (
    // Si no hay un icono, renderiza un Button
      <Button sx={{
      width: { xs:'340px', sm:'360px' },
      height: '40px',
      margin: '10px 0',
      borderRadius: '20px',
      textTransform: 'uppercase',
      backgroundColor: '#003686',
      fontWeight: 'bold',
      ':hover': {backgroundColor: '#E08400'},
    }} 
    variant="contained"
    onClick={funcion}>
      {texto}
    </Button>
    )} 
}

export default Boton
