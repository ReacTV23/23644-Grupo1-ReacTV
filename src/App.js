// App.js
import React from 'react';
import Busqueda from './components/componente-busqueda/Busqueda.jsx';
import './App.css';

function App() {
  return (
    <div>
      <h2 className='text-center mt-5 mb-5'>Trailer Movies</h2>
      {/* Use the Busqueda component */}
      <Busqueda />

      {/* You can add other components or sections here if needed */}
    </div>
  );
}

export default App;
