import React, { useEffect } from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase/Firebase.js";

const Children = ({ path, onDataReceived }) => {
  const query = collection(db, path);
  const [docs, loading, error] = useCollectionData(query);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!loading && docs) {
          // Obtener todos los documentos sin límite
          const ids = docs.map((doc) => doc.id);
          onDataReceived(ids);
        }
      } catch (error) {
        console.error('Error al obtener datos:', error);
        // Manejar el error según tus necesidades
      }
    };

    fetchData();
  }, [loading, docs, onDataReceived]);

  // Puedes devolver algo opcionalmente, o simplemente no devolver nada (return null)
  return null;
};

export default Children;

