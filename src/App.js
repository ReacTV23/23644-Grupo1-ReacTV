import './App.css';
import Sesion from './componentes/Sesion/Sesion.jsx'

import { BrowserRouter } from 'react-router-dom';
import Navbar from './Components/Navbar/Navbar.jsx';

import CssBaseline from '@mui/material/CssBaseline';
import Home from './pages/Home/Home';
// import Recientes from './pages/Recientes/Recientes';
// import Categorias from './pages/Categorias/Categorias';
// import Generos from './pages/Generos/Generos';
// import MiLista from './pages/MiLista/MiLista';
// import Lanzamientos from './pages/Lanzamientos/Lanzamientos';
// import About  from './pages/About/About';



function App() {
  return (
    <>
      <CssBaseline/>
      <Home/>
      {/* <Recientes/> */}
      {/* <Categorias/> */}
      {/* <Generos/> */}
      {/* <MiLista/> */}
      {/* <Lanzamientos/> */}
      {/* <About/> */}
   </>

import Filter from './components/filter/Filter'

function App() {
  return (
    <div className="App">
      
      <BrowserRouter>
        <Navbar/>
        <Sesion/> 
      </BrowserRouter>

      
            <Filter />
    </div>

  );
 
}

export default App;

