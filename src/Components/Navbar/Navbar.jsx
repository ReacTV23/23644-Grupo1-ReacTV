import React, {useState} from 'react';
import { AppBar, Toolbar, Typography} from '@mui/material';
import { Link, useNavigate  } from 'react-router-dom';
import Boton from '../Boton'
import Busqueda from '../Busqueda/Busqueda'
import AccountCircle from '@mui/icons-material/AccountCircle';
import NoAccountsIcon from '@mui/icons-material/NoAccounts';
import { useAuth } from '../../context/authContext';  // Importa el hook useAuth
import { useSearch } from '../../context/searchContext';  // Importa el hook useSearch

const Navbar = ({onLoginButtonClick}) => {
  const { isAuth, setIsAuth  } = useAuth();  // Obtiene el estado de autenticación del contexto
  const { updateSearchQuery } = useSearch(); // Obtiene el estado y las funciones de búsqueda del contexto
  const navigate = useNavigate();
  const [query, setQuery] = useState('')

  const handleLoginClick = () => {
    // Navegar a la ruta "/login"
    setIsAuth(true);
    navigate('/login');
    // console.log(isAuth)
  };

  const handleLogoutClick = () => {
    // Cambiar el estado de autenticación a falso
    setIsAuth(false);
    // console.log(isAuth)
  };

  const handleSearchSubmit = (e) => {
    // Actualizar el contexto de búsqueda con la palabra escrita en la barra de búsqueda
    setQuery(e.target.value);
    updateSearchQuery(query);

    // Redireccionar a la página de búsqueda
    navigate('/search');
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#003686', width:'100%', height:'80px'}}>
      <Toolbar sx={{ width:'100%', height:'100%', display: 'flex', justifyContent: 'space-between', alignItems:'center'}}>
        {/* Sección del logo (a la izquierda) */}
        <Typography variant="h6" component="div">
          <img
            src="/assets/img/logo-circular-2.png"
            alt="Logo"
            style={{ height: '60px', marginRight: '16px' }}
          />
        </Typography>

        {/* Sección de la barra de búsqueda (en el centro) */}
        {isAuth && (

          <Busqueda value={query} funcion={handleSearchSubmit}/>
        )}

        {/* Sección del botón de inicio de sesión (a la derecha) */}
        { isAuth ? ( 
          <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
          <Boton Contenido={NoAccountsIcon} color={'white'} colorHover={'#E08400'} fontSize={'60px'} funcion={handleLogoutClick}/>
        </Link>
        ) : (
          <Link to="/login" style={{ textDecoration: 'none', color: 'inherit' }}>
            <Boton Contenido={AccountCircle} color={'white'} colorHover={'#E08400'} fontSize={'60px'} funcion={handleLoginClick}/>
          </Link>
        )}
      </Toolbar>
    </AppBar>
  )
};
export default Navbar;