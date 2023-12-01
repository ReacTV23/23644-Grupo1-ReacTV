import React, { useEffect, useState } from 'react';
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario';
import { collection, getDocs } from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from '../../firebase/Firebase.js';
import Children from '../../components/Children/Children.jsx';
import { useAuth } from '../../context/authContext.js';

const MiLista = () => {
  const { user } = useAuth();
  const [userEmail, setUserEmail] = useState(null);
  const query = collection(db, 'Usuarios');
  const [docs, loading, error] = useCollectionData(query);

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

  console.log(userEmail);

  return (
    <LayoutSecundario textoBoton={'mi lista'}>
      
      {loading && 'Loading...'}
      <ul>
        {userEmail && (
          <div key={Math.random()}>
            <div className='mb-4'>{userEmail}</div>
            <h4>Peliculas</h4>
            <Children path={`Usuarios/${userEmail}/ListaPeliculas`} />
            <h4>Series</h4>
            <Children path={`Usuarios/${userEmail}/ListaSeries`} />
          </div>
        )}
      </ul>
    </LayoutSecundario>
  );
};

export default MiLista;
