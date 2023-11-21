// App.js
import React from 'react';
import BusquedaNombre from './/components/componentes-atomicos/BusquedaNombre';
import './App.css';


function App() {
  return (
    <div>
      <h2 className='text-center mt-5 mb-5'>Posters</h2>
        {/* Use the Busqueda component */}
         <BusquedaNombre />
      {/* You can add other components or sections here if needed */}
    </div>
  );
}

export default App;
