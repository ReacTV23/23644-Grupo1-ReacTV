import React, { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import IntroVideo from './components/IntroVideo/IntroVideo.jsx';
import Home from './pages/Home/Home';
import {AuthProvider} from './Context/authContext'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {ProtectedRoute} from './components/ProtectedRuote/ProtectedRoute'
import LoginPage  from './pages/Login/Login.jsx'
import RegistroPage  from './pages/Registro/RegistroPage.jsx'
import Recientes from './pages/Recientes/Recientes.jsx'
import Categorias from './pages/Categorias/Categorias.jsx'
import Generos from './pages/Generos/Generos.jsx'
import MiLista from './pages/MiLista/MiLista.jsx'
import Lanzamientos from './pages/Lanzamientos/Lanzamientos.jsx'
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
      {showVideo ? (
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