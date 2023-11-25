// Ejemplo de cómo usar el contexto de búsqueda en un componente
import React from "react";
import { useSearch } from "../context/searchContext";

const SearchComponent = () => {
  const { searchQuery, updateSearchQuery, clearSearchQuery } = useSearch();

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => updateSearchQuery(e.target.value)}
        placeholder="Buscar..."
      />
      <button onClick={clearSearchQuery}>Limpiar búsqueda</button>
    </div>
  );
};
