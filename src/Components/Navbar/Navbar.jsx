import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#003686' }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {/* Sección del logo (a la izquierda) */}
        <Typography variant="h6" component="div">
          <img
            src="tu_logo.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '16px' }}
          />
        </Typography>

        {/* Sección de la barra de búsqueda (en el centro) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" size="large">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'buscar' }}
            style={{ width: '120px', color: 'white' }}
          />
        </div>

        {/* Sección del botón de inicio de sesión (a la derecha) */}
        <Button color="inherit" size="large" startIcon={<AccountCircle />} sx={{ color: '#E08400' }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;