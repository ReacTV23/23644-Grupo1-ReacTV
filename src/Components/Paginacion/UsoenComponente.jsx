// Ejemplo de uso en un componente
import React from 'react';
import { usePagination } from './PaginationContext';

const MyComponent = () => {
  const { currentPage, totalPages, onPageChange, setTotalPages } = usePagination();

  // Resto del componente...

  return (
    <div>
      {/* Contenido del componente */}
      {/* Ejemplo de uso del componente de paginación */}
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} />
    </div>
  );
};

export default MyComponent;

