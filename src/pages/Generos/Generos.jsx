import React from "react";
import LayoutSecundario from "../../layout/LayoutSecundario/LayoutSecundario";
import FilterByGenres from "../../components/Filter/FilterByGenres";

const Generos = () => {
  return (
    <LayoutSecundario textoBoton={"generos"}>
      <FilterByGenres />
      {/* <ChecBox texto={item}/> mapeo de lso generos que se traen por api
      <Boton texto={'seleccionar'}/> según la opción que se elige se crea el carrusel correspondiente
      <CarruselGenero/>
      <CarrsuelSeries/> */}
    </LayoutSecundario>
  );
};

export default Generos;
