import React from 'react';
import { AppBar, Toolbar,IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#003686' }}>
      <Toolbar>
        {/* Sección del logo (a la izquierda) */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img
            src="../../../public/assets/img/imagen/logo-reactv.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '16px' }}
          />
        </div>

        {/* Sección de la barra de búsqueda y botón de inicio de sesión (a la derecha) */}
        <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
            <IconButton color="inherit" size="large">
              <SearchIcon />
            </IconButton>
            <InputBase
              placeholder="Buscar..."
              inputProps={{ 'aria-label': 'buscar' }}
              style={{ width: '200px', color: 'white' }}
            />
          </div>

          <Button color="inherit" size="large" startIcon={<AccountCircle />} sx={{ color: '#E08400' }}>
            Login
          </Button>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;