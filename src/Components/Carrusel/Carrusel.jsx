import { useEffect } from "react";
import "./carrusel.css"

const Carrusel = (props) => {   //se debe pasar loas datos como prop 

    const peliculas = props.peliculas;

    useEffect(()=>{

        const fila = document.querySelector(".container-carrusel");
        const derecha = document.querySelector("#flecha-derecha");
        const izquierda = document.querySelector("#flecha-izquierda");
    
        derecha.addEventListener("click", () => {
          fila.scrollLeft += fila.offsetWidth;
        });
    
        izquierda.addEventListener("click", () => {
          fila.scrollLeft -= fila.offsetWidth;
        });
    
        function ajustarPosicionFlechas() {
            izquierda.style.top = "50%";
            derecha.style.top = "50%";
        }
        ajustarPosicionFlechas();
    },[peliculas])


   return(
         <section>
          <div className="contenedor-principal">
            <button id="flecha-izquierda" className="flecha-izquierda">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <div className="container-carrusel">
              <div className="container-card" id="container-card">
                {
                    peliculas.map(peli=>(
                         <div className="card-cont">
                 <div class="card-img"><img src={peli.image} alt={peli.title}/></div>
              </div>
                    ))
                }
             
              </div>
            </div>
            <button id="flecha-derecha" className="flecha-derecha">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        </section>
   )


};

export default Carrusel;
