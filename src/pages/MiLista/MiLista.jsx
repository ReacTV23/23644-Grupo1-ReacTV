import React, { useEffect, useState } from 'react';
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario';
import RenderItemsContainer from '../../components/RenderItems/RenderItemsContainer/RenderItemsContainer'
import { useAuth } from '../../Context/authContext';

const MiLista = () => {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState(null);

  const fetchData = async () => {
    try {
      if (user) {
        setUserEmail(user.email);
      }
    } catch (error) {
      console.error('Error al obtener el correo electrónico del usuario:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [user]);


  return (
    <LayoutSecundario textoBoton={'mi lista'}>
      {userEmail && (
        <RenderItemsContainer 
          userEmail={userEmail} 
          pathMovies={`Usuarios/${userEmail}/ListaPeliculas`} 
          pathSeries={`Usuarios/${userEmail}/ListaSeries`}/>
      )}
    </LayoutSecundario>
  );
}

export default MiLista;
