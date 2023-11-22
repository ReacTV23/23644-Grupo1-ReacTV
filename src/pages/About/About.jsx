import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import Integrante from  '../../Components/Integrante/Integrante';

// datos recibidos desde base de datos
const integrantes = {
  'Antonela Borgogno': {
      'GitHub': 'https://github.com/antonela',
      'LinkedIn': 'https://www.linkedin.com/in/antonela'
  },
  'Hugo Segura': {
      'GitHub': 'https://github.com/hugo',
      'LinkedIn': 'https://www.linkedin.com/in/hugo'
  },
  'Horacio Porto': {
    'GitHub': 'https://github.com/horacio',
    'LinkedIn': 'https://www.linkedin.com/in/horacio'
  },
  'Casco Fani': {
    'GitHub': 'https://github.com/fani',
    'LinkedIn': 'https://www.linkedin.com/in/fani'
  },
  'Monica Crichton': {
    'GitHub': 'https://github.com/monica',
    'LinkedIn': 'https://www.linkedin.com/in/monica'
  },
  'Maria Fasce': {
      'GitHub': 'https://github.com/maria',
      'LinkedIn': 'https://www.linkedin.com/in/maria'
  },
  'Sofia Gandulfo': {
    'GitHub': 'https://github.com/sofia',
    'LinkedIn': 'https://www.linkedin.com/in/sofia'
  },
  'Alejo Piñero': {
    'GitHub': 'https://github.com/alejo',
    'LinkedIn': 'https://www.linkedin.com/in/alejo'
  },
  'Yasmin Pyrih': {
    'GitHub': 'https://github.com/yas',
    'LinkedIn': 'https://www.linkedin.com/in/yas'
  },
  'Agustin Haag': {
    'GitHub': 'https://github.com/agustin',
    'LinkedIn': 'https://www.linkedin.com/in/agustin'
  }
}

const About = () => {
  return (
    <LayoutSecundario textoBoton={'team'}>
        {/* mapeo del resultado de firebase: nombre: nombre del integrante y detalle link de redes sociales */}
        {Object.entries(integrantes).map(([nombre, detalles]) => (
        <Integrante key={nombre} nombre={nombre} detalles={detalles}/>
        ))}
        {/* Form Contacto */}
    </LayoutSecundario>   
  )
}

export default About
