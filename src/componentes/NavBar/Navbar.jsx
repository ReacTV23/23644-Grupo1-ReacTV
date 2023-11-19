import React from 'react';
import { Link } from 'react-router-dom';
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
        <Button component={Link} to="../Login/Login.js" color="inherit" size="large" startIcon={<AccountCircle />} sx={{ color: '#E08400' }}>
          Login
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;





























/*import React from 'react'
import { Link } from 'react-router-dom'
import "./Nabvar.css"
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false) 

  return (
    <nav>
        <Link to="/Guest" className='title'>ReacTV</Link>
        <div className='menu' onClick={() => {setMenuOpen(!menuOpen)}}>
        <span></span>
        <span></span>
        <span></span>
        </div>
        <ul className= {menuOpen ? "open" : ""}>
            <li><NavLink to="Login">Log-In</NavLink></li>
            <li><NavLink to="About">About</NavLink></li>
            <li><NavLink to="Version">Version</NavLink></li>
            
        </ul>

    </nav>
  )
}
*/