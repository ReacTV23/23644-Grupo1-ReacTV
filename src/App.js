import React, {useState, useEffect} from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IntroVideo from './Components/IntroVideo/IntroVideo.jsx';
import Home from './Pages/Home/Home';
import {AuthProvider} from './Context/authContext'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import {ProtectedRoute} from './Components/ProtectedRuote/ProtectedRoute'
import LoginRegistro  from './Pages/LoginRegistro/LoginRegistro.jsx'
import Recientes from './Pages/Recientes/Recientes.jsx'
import Categorias from './Pages/Categorias/Categorias.jsx'
import Generos from './Pages/Generos/Generos.jsx'
import MiLista from './Pages/MiLista/MiLista.jsx'
import Lanzamientos from './Pages/Lanzamientos/Lanzamientos.jsx'
import About from './Pages/About/About.jsx'
import VideoPlayer from './Components/IntroVideo/VideoPlayer.jsx'
import './App.css';

function App() {
  const [showVideo, setShowVideo] = useState(true); //pasar a true una vez que se terminen las pruebas
  // estado ancho de ventana (renderizado responsive)
  const [anchoVentana, setAnchoVentana] = useState(window.innerWidth);

  // useEfectf para capturar el ancho de la ventana y pasarlo al estado
  useEffect(() => {
    const handleResize = () => {
      setAnchoVentana(window.innerWidth);
    };

     // Agregar event listener para el evento resize
    window.addEventListener('resize', handleResize);

    // Limpiar el event listener cuando el componente se desmonta
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // El array vacío asegura que el efecto se ejecute solo una vez al montar el componente

  // const toggleAuth = () => {
  //   setIsAuth((prevAuth) => !prevAuth);
  // };

  // funcion manejo de video
  const handleVideoEnd = () => {
    console.log('Video ended');
    setShowVideo(false);
  };

  return (
    <>
    <CssBaseline/>

      { showVideo ? (
        // <VideoPlayer/>
        <IntroVideo onVideoEnd={handleVideoEnd} />
      ) : (
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home anchoVentana={anchoVentana}/>} />
              <Route path="/login" element={<LoginRegistro />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
              <Route path="/recientes" element={<Recientes />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/generos" element={<Generos />} />
              <Route path="/milista" element={<MiLista />} />
              <Route path="/lanzamientos" element={<Lanzamientos />} />
              <Route path="/about" element={<About />} />
            </Routes>
          </Router>
        </AuthProvider>
      )} 
    </>
  )
}

export default App;

