import React from "react";
import LayoutSecundario from "../../layout/LayoutSecundario/LayoutSecundario";
import MediaSelector from "../../components/MediaSelector/MediaSelector";

const Categorias = () => {
  return (
    <LayoutSecundario textoBoton={"categorias"}>
      <MediaSelector />
      {/* <ChecBox texto={['peliculas','series']}/>
      <Boton texto={'seleccionar'} según la opción que se elige se crea el carrusel correspondiente
      <Carrusel/> para pelis
      <Carrsuel/> para series */}
    </LayoutSecundario>
  );
};

export default Categorias;
