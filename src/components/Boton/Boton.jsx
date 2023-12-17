import React from 'react';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

const Boton = ({Contenido, texto, funcion, color, colorHover, fontSize = '2.2rem', margin='2rem', width='36rem', height='5rem', padding='1rem', backgroundColor, backgroundHover, disabled }) => {
  if(Contenido) {
    const Icono = Contenido;
    return (
     // Si hay un icono, renderiza un IconButton
      <IconButton className='IconoBoton' aria-label={Icono} onClick={funcion}>
        <Icono className='Icono'
          sx={{fontSize: {xs:'3rem', sm: `calc(${fontSize} + 1rem)`, md: `calc(${fontSize} + 0.5rem`},
          width: {height},
          height: height,
          padding: padding, 
          color: {color},
          borderRadius: {xs:'3rem', sm:`calc(${fontSize} + 1rem)`, md:`calc(${fontSize} + 1rem)`},
          backgroundColor: backgroundColor,
          disabled: disabled,
          ':hover': {color: colorHover, backgroundHover: backgroundHover}
          }}/>
      </IconButton>
      )}
  else {
    return (
    // Si no hay un icono, renderiza un Button
      <Button sx={{
      width: { xs:width, sm: `calc(${width} + 5rem)`, md: `calc(${width} + 10rem)`},
      color: color,
      height: height,
      margin: margin,
      padding: padding, 
      borderRadius: '3rem',
      fontFamily: 'Roboto',
      fontSize: fontSize,
      textTransform: 'uppercase',
      backgroundColor: backgroundColor,
      fontWeight: 'Normal',
      disabled: disabled,
      ':hover': {backgroundColor: backgroundHover, color: colorHover},
    }} 
    variant="contained"
    onClick={funcion}>
      {texto}
    </Button>
    )} 
}

export default Boton
