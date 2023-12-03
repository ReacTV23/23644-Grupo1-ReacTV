import React, {useEffect} from 'react';
import { collection, getDocs } from '@firebase/firestore';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { db } from "../../firebase/Firebase.js";

const Children = ({ path, onDataReceived, limit = 5 }) => {
  const query = collection(db, path);
  const [docs, loading, error] = useCollectionData(query);
  console.log(docs);

  useEffect(() => {
    if (!loading && docs) {
         // Obtener solo los primeros 'limit' elementos
      const limitedDocs = docs.slice(0, limit);
      const ids = docs.map((doc) => doc.id);
      onDataReceived(ids);
    }
  }, [loading, docs, onDataReceived, limit]);

  return (
    // Puedes devolver algo opcionalmente, o simplemente no devolver nada (return null)
    null
  );
};

export default Children;
