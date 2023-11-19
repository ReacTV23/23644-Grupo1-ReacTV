import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Perfil = () => {



    const [checkedValues, setValues] = useState([]) 

    function handleChange(event)   {
        const {value, checked} = event.target
        if(checked){
            setValues(pre => [...pre,value])
        }else{
            setValues(pre =>{
                return[...pre.filter(skill =>skill.value)]
            })
        }
    }
    console.log(checkedValues)
    
  return (
    
    <div>
    <div>
    <form onSubmit={(e) => e.preventDefault()}>
    <input type='checkbox' name='Terror' value='Terror' onChange={handleChange}/>Terror
    <br></br>
    <input type='checkbox' name='Drama' value='Drama' onChange={handleChange}/>Drama
    <br></br>
    <input type='checkbox' name='Suspenso' value='Suspenso' onChange={handleChange}/>Suspenso
    <br></br>
    <input type='checkbox' name='SciFi' value='SciFi' onChange={handleChange}/>SciFi
    <br></br>
    <input type='checkbox' name='Aventuras' value='Aventura' onChange={handleChange}/>Aventura
    <br></br>
    <input type='checkbox' name='Romance' value='Romance' onChange={handleChange}/>Romance
    <br></br>
    <input type='checkbox' name='Comedia' value='Comedia' onChange={handleChange}/>Comedia
    <br></br>
    <input type='checkbox' name='Documentales' value='Documentales' onChange={handleChange}/>Documentales
    
    </form> 
    </div>
<div>
    
    <button  className="bg-gray-500 hover:bg-rose-500 text-white font-bold text-sm py-2 px-4 rounded focus:outline-none focus:shadow-outline" >Aceptar</button>
</div>



    
    
    </div>
    
  )
}
