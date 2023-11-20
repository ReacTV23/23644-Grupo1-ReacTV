import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase } from '@mui/material';
import Boton from '../Boton'
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#003686' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Sección del logo (a la izquierda) */}
        <Typography variant="h6" component="div">
          <img
            src="/assets/img/imagen/logo-reactv.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '16px' }}
          />
        </Typography>

        {/* Sección de la barra de búsqueda (en el centro) */}
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '50px', padding: '0px' }}>
        <IconButton color="primary" size="large">
          <SearchIcon />
        </IconButton>
        <InputBase
          placeholder="Buscar..."
          inputProps={{ 'aria-label': 'buscar' }}
          style={{ width: '120px', color: 'black' }}
        />
      </div>

        {/* Sección del botón de inicio de sesión (a la derecha) */}
        <Boton Contenido={AccountCircle}/>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;