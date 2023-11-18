import {Routes, Route} from 'react-router-dom';
import { Home } from '../Home/Home.js';
import { Inicio } from '../Login/Login.js';
import { Register } from '../Register/Register.js';
import { AuthProvider } from '../../Context/authContext.js';
import { ProtectedRoute } from '../ProtectedRuote/ProtectedRoute.js';
import { Guest } from '../Guest/Guest.jsx';
import { About } from '../About/About.jsx';
import { Version } from '../Version/Version.jsx';
import { Perfil } from '../Perfil/Perfil.jsx';


const Login = () => {
    return (
        <div>
            <div>
               <AuthProvider>
                    <Routes>
                        <Route path="/" element={
                            <ProtectedRoute>
                            <Home/>
                            </ProtectedRoute>
                        } />
                        <Route path='/Home' element={<Home/>} />
                        <Route path='/login' element={<Inicio/>} />
                        <Route path='/register' element={<Register/>} />
                        <Route path='/Guest' element={<Guest/>} />
                        <Route path='/About' element={<About/>} />
                        <Route path='/Version' element={<Version/>} />
                        <Route path='/Perfil' element={<Perfil/>} />
                    </Routes>    
               </AuthProvider>
           
</div>
            
        </div>
    )
}

export default Login
