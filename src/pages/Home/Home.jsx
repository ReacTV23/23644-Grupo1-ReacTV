import React, {useState, useEffect} from 'react';
import LayoutMain from '../../Layout/LayoutMain/LayoutMain'
import {HomeDeskoptComponents} from './HomeDeskopt/HomeDeskopt';
import HomeMobile  from './HomeMobile/HomeMobile';

import './Home.css';

const Home = () => {

  const [isAuth, setIsAuth] = useState(false);
  const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setAnchoVentana(window.innerWidth);
    };

    // Agregar event listener para el evento resize
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  const toggleAuth = () => {
    setIsAuth((prevAuth) => !prevAuth);
  };

  const renderDeskoptContent = () => {
    if (anchoVentana > 768) {
      return isAuth ? <HomeDeskoptComponents.MainDeskoptLogueado /> : <HomeDeskoptComponents.MainDeskoptInvitado />;
    }
    return isAuth ? <HomeMobile.MainMobileLogueado /> : <HomeMobile.MainMobileInvitado />;
  };


  return (
    <LayoutMain>
      {renderDeskoptContent()}
      {console.log(isAuth)}
    </LayoutMain>    
  )
}

export default Home
