import {Routes, Route} from 'react-router-dom';
import { Home } from '../Home/Home.js';
import { Inicio } from '../Login/Login.js';
import { Register } from '../Register/Register.js';
import { AuthProvider } from '../../Context/authContext.js';
import { ProtectedRoute } from '../ProtectedRuote/ProtectedRoute.js';
import { About } from '../About/About.jsx';

const Login = () => {
    return (
        <AuthProvider>
            <Routes>
                <Route path="/" element={
                    <ProtectedRoute>
                    <Home/>
                    </ProtectedRoute>
                } />
                <Route path='/home' element={<Home/>} />
                <Route path='/login' element={<Inicio/>} />
                <Route path='/register' element={<Register/>} />
                <Route path='/about' element={<About/>} />
                {/* <Route path='/Version' element={<Version/>} />
                <Route path='/Perfil' element={<Perfil/>} /> */}
            </Routes>    
        </AuthProvider>
    )
}

export default Login
