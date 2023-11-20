import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IntroVideo from './Components/IntroVideo/IntroVideo.jsx';
import Home from './Pages/Home/Home';
import {AuthProvider} from './Context/authContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ProtectedRoute} from './Components/ProtectedRuote/ProtectedRoute'
import LoginPage  from './Pages/Login/Login.jsx'
import RegistroPage  from './Pages/Registro/RegistroPage.jsx'
import Recientes from './Pages/Recientes/Recientes.jsx'
import Categorias from './Pages/Categorias/Categorias.jsx'
import Generos from './Pages/Generos/Generos.jsx'
import MiLista from './Pages/MiLista/MiLista.jsx'
import Lanzamientos from './Pages/Lanzamientos/Lanzamientos.jsx'
import './App.css';


function App() {
  const [showVideo, setShowVideo] = useState(false); //pasar a true una vez que se terminen las pruebas


  const handleVideoEnd = () => {
    console.log('Video ended');
    setShowVideo(false);
  };

  return (
    <>
      <CssBaseline/>
      { showVideo ? (
        <IntroVideo onVideoEnd={handleVideoEnd} />
      ) : (
        <AuthProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<LoginPage />} />}
              <Route path="/register" element={<RegistroPage />} />
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
              <Route path="/recientes" element={<Recientes />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/generos" element={<Generos />} />
              <Route path="/milista" element={<MiLista />} />
              <Route path="/lanzamientos" element={<Lanzamientos />} />
            </Routes>
          </Router>
        </AuthProvider>
      )}
    </>
  );
}

export default App;