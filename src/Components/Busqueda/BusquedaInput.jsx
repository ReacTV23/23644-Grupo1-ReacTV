import React, { useState, useEffect } from 'react';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const BusquedaInput = ({ onSearch, initialValue }) => {
    const [searchTerm, setSearchTerm] = useState(initialValue);

    useEffect(() => {
        setSearchTerm(initialValue);
    }, [initialValue]);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
        // Redirecciona a /busqueda y pasa la palabra como parámetro
        onSearch(searchTerm);
        }
    };

    return (
        <div
        style={{
            display: 'flex',
            alignItems: 'center',
            background: 'white',
            borderRadius: '50px',
            padding: '0px',
        }}>
        <IconButton color="primary" size="large">
            <SearchIcon />
        </IconButton>
        <InputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'buscar' }}
            style={{ width: '360px', color: 'black' }}
            value={searchTerm}
            onChange={handleChange}
            onKeyDown={handleKeyDown}/>
        </div>
    );
};

export default BusquedaInput;
