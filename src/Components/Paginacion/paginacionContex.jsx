// PaginationContext.jsx
import React, { createContext, useContext, useState } from 'react';

const PaginationContext = createContext();

export const usePagination = () => {
  const context = useContext(PaginationContext);
  if (!context) {
    throw new Error('usePagination debe ser utilizado dentro de un PaginationProvider');
  }
  return context;
};

export const PaginationProvider = ({ children }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const onPageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const value = {
    currentPage,
    totalPages,
    onPageChange,
    setTotalPages,
  };

  return (
    <PaginationContext.Provider value={value}>
      {children}
    </PaginationContext.Provider>
  );
};
