import React from 'react'
import LayoutSecundario from '../../layout/LayoutSecundario/LayoutSecundario'
import MoviesContainer from '../../components/Busqueda/MoviesContainer'
import { useSearch } from '../../context/searchContext';  // Importa el hook useSearch

const Search = () => {
    const { clearSearchQuery } = useSearch(); // Obtiene el estado y las funciones de búsqueda del contexto
    return (
        <LayoutSecundario textoBoton={'resultados'}>
            <MoviesContainer/>
            <button onClick={clearSearchQuery}>Limpiar búsqueda</button>
        </LayoutSecundario>
    )
}

export default Search
