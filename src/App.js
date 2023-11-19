import './App.css';
import CssBaseline from '@mui/material/CssBaseline';
import Filter from './components/filter/Filter';

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
      <CssBaseline />
      <Home />
      <Filter />
      {/* <Recientes/> */}
      {/* <Categorias/> */}
      {/* <Generos/> */}
      {/* <MiLista/> */}
      {/* <Lanzamientos/> */}
      {/* <About/> */}
    </>
  );

}

export default App;