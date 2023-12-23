import React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import IntroVideo from "./components/IntroVideo/IntroVideo.jsx";
import Home from "./pages/Home/Home";
import { AuthProvider, useAuth } from "./context/authContext";
import { AnchoVentanaProvider } from './context/responsiveContext'
import { MediaTypeProvider } from "./context/mediaTypeProvider.js";
import { BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRuote/ProtectedRoute";
import LoginRegistro from "./pages/LoginRegistro/LoginRegistro.jsx";
import Recientes from "./pages/Recientes/Recientes.jsx";
import Categorias from "./pages/Categorias/Categorias.jsx";
import Generos from "./pages/Generos/Generos.jsx";
import MiLista from "./pages/MiLista/MiLista.jsx";
import Lanzamientos from "./pages/Lanzamientos/Lanzamientos.jsx";
import About from "./pages/About/About.jsx";
import Search from "./pages/Search/Search.jsx";
import CardSinopsis from "./pages/Card/CardSinopsis.jsx";
import Error404 from "./pages/Error404/Error404.jsx"; //pagina error 404
import "./App.css";

function App() {
  const {showVideo} = useAuth()
  
    return (
      <>
        <CssBaseline />
        {showVideo ? (
          <IntroVideo/>
        ) : (
          <AuthProvider>
            <MediaTypeProvider>
              <AnchoVentanaProvider>
                <Router>
                  <Routes>
                    <Route path="/" element={<Home />}/>
                    <Route path="/login" element={<LoginRegistro />} />
                    <Route path="/home" element={
                        <ProtectedRoute>
                          <Home /> 
                        </ProtectedRoute>
                      } />
                    <Route path="/recientes" element={<Recientes />} />
                    <Route path="/categorias" element={<Categorias />} />
                    <Route path="/generos" element={<Generos />} />
                    <Route path="/lanzamientos" element={<Lanzamientos/>} />
                    <Route path="/about" element={<About />} />
                    <Route path="/search" element={<Search />} />
                    <Route path="/card/tv/:id" element={<CardSinopsis />} />
                    <Route path="/card/movie/:id" element={<CardSinopsis />} />
                    <Route path="/milista" element={<MiLista />} /> 
                    <Route path="/error404" element={<Error404 /> } /> 
                    <Route path="/*" element={<Navigate to="/Error404" /> } /> 
                  </Routes>
                </Router>
              </AnchoVentanaProvider>
            </MediaTypeProvider>
          </AuthProvider>
        )}
      </>
  );
}

export default App;
