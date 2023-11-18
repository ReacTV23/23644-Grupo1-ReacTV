import './App.css';
import Sesion from './componentes/Sesion/Sesion.jsx'

import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';


function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar/>
        <Sesion/> 
      </BrowserRouter>

      
      
    </div>
  );
}

export default App;
