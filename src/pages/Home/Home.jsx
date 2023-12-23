import React from 'react';
import LayoutMain from '../../layout/LayoutMain/LayoutMain'
import {HomeDeskoptComponents} from './HomeDeskopt/HomeDeskopt';
import HomeMobile  from './HomeMobile/HomeMobile';
import { useAuth } from '../../context/authContext2';  // Importa el hook useAuth
import { useResponsive } from '../../context/responsiveContext.js'

const Home = () => {
  const { isAuth } = useAuth();  // Obtiene el estado de autenticación del contexto
  const anchoVentana =  useResponsive();
  console.log('anchoVentanaHome', anchoVentana)

  const renderDeskoptContent = () => {
    if (anchoVentana > 768) {
      return isAuth ? <HomeDeskoptComponents.MainDeskoptLogueado /> : <HomeDeskoptComponents.MainDeskoptInvitado />;
    }
    return isAuth ? <HomeMobile.MainMobileLogueado /> : <HomeMobile.MainMobileInvitado />;
  };

  return (
    <LayoutMain>
      {renderDeskoptContent()}
    </LayoutMain>    
  )
}

export default Home

