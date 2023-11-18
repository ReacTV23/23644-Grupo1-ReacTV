import {useAuth} from '../../Context/authContext';
import { useNavigate } from "react-router-dom";
import './Home.css'
import { Perfil } from '../Perfil/Perfil';


export function Home() {

    const {user, logout, loading} = useAuth();
    const navigate = useNavigate();
   
    const handleLogout = async () => {
        try {
            await (logout);
            navigate("/login");
        }
        catch(error) {
            console.log(error);
        }
         
        };

    console.log(user);

    if(loading) return <h1>Cargando</h1>;

    return (
        <div className="w-full max-w-xs  text-black" >
            <div className='bg-white rounded shadow-md px-4 pt-2 pb-2 mainHome' >
                <h1 className='text-xl ' >Bienvenido {user.displayName || user.email} </h1>
                <button onClick={handleLogout} className='bg-slate-200 hover:bg-slate-300 rounded py-2 px-4 text-black' >logout</button>
            </div>
            <div>
                <Perfil/>
            </div>
        </div>
    );
}
