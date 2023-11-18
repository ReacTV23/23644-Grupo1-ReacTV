// Busqueda.jsx
import React, { useState, useEffect } from 'react';
import datosSimulados from './datosSimulados';
import './Busqueda.css'; // Ajusta la ruta según tu estructura de carpetas
// import Navbar from ./components/componente/Navbar
const Busqueda = ({ resultados }) => {
   /* const [estadoLocal, setEstadoLocal] = useState('');

  useEffect(() => {
    // Lógica del efecto, si es necesario
  }, [estadoLocal]); */

  return (
    <div className="busqueda-container">
      {/*<Navbar/>*/}
      <h2>Resultados de la búsqueda</h2>
      <div className="cards-container">
        {datosSimulados.map((pelicula) => (
          <div key={pelicula.id} className="card">
            <img src={pelicula.imagen} alt={pelicula.titulo} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Busqueda;

