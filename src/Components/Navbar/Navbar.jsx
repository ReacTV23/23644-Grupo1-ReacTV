import React from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: '#2196f3' }}>
      <Toolbar>
        {/* Logo */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <img
            src="tu_logo.png"
            alt="Logo"
            style={{ height: '40px', marginRight: '16px' }}
          />
        </Typography>

        {/* Barra de búsqueda */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
          <IconButton color="inherit" size="large">
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'buscar' }}
            style={{ width: '120px', color: 'white' }}
          />
        </div>

        {/* Botón de inicio de sesión */}
        <Button color="inherit" size="large" startIcon={<AccountCircle />} sx={{ color: 'white' }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
