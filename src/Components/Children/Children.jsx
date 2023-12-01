import React from 'react';
import {getFirestore, collection, getDocs} from '@firebase/firestore';
import {useCollectionData} from 'react-firebase-hooks/firestore';
import {db} from "../../firebase/Firebase.js";



const Children = ({path}) => {
  
  const query = collection(db, path);
  const [docs, loading, error] = useCollectionData(query);
  console.log(docs);




  return (
    <ul>
    {loading && "Loading..."}
    {docs?.map(doc => <li key={Math.random()} > {doc.id} </li> )}
    </ul>
  )
}

export default Children