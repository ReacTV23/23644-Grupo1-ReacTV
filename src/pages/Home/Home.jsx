import React from 'react';
import LayoutMain from '../../Layout/LayoutMain/LayoutMain'
import {HomeDeskoptComponents} from './HomeDeskopt/HomeDeskopt';
import HomeMobile  from './HomeMobile/HomeMobile';
import { useAuth } from '../../Context/authContext';  // Importa el hook useAuth

import './Home.css';

const Home = ({anchoVentana}) => {
  const { isAuth } = useAuth();  // Obtiene el estado de autenticación del contexto

  const renderDeskoptContent = () => {
    if (anchoVentana > 768) {
      return isAuth ? <HomeDeskoptComponents.MainDeskoptLogueado /> : <HomeDeskoptComponents.MainDeskoptInvitado />;
    }
    return isAuth ? <HomeMobile.MainMobileLogueado /> : <HomeMobile.MainMobileInvitado />;
  };

  return (
    <LayoutMain>
      {renderDeskoptContent()}
      {/* {console.log(isAuth)} */}
    </LayoutMain>    
  )
}

export default Home
