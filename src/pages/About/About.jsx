import React from 'react'
import { useState, useEffect } from 'react';
import LayoutSecundario from '../../Layout/LayoutSecundario/LayoutSecundario'
import Integrante from  '../../Components/Integrante/Integrante';
import {getFirestore, collection, getDocs} from 'firebase/firestore';

const About = () => {

  const [datos, setDatos] = useState ([]);

  useEffect (() => {
    const queryDb = getFirestore();
    const queryCollection = collection(queryDb, 'Integrantes');
    getDocs (queryCollection)
      .then(res => setDatos(res.docs.map(user => ({id:user.id, ...user.data()}))))
  }, [])

  return (
    <LayoutSecundario textoBoton={'team'}>
        {/* mapeo del resultado de firebase: nombre: nombre del integrante y detalle link de redes sociales */}
        {datos.map((dato, i) => (
        <Integrante key={i} nombre={dato.Nombre} apellido={dato.Apellido} Github={dato.Github} Linkedin={dato.Linkedin}/>
        ))}
        {/* Form Contacto */}
    </LayoutSecundario>   
  )
}

export default About