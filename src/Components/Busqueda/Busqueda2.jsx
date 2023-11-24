import React from 'react'
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';


const Busqueda2 = () => {
    return (
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '50px', padding: '0px' }}>
                <IconButton color="primary" size="large">
                    <SearchIcon />
                </IconButton>
                <InputBase
                placeholder="Buscar..."
                inputProps={{ 'aria-label': 'buscar' }}
                style={{ width: '360px', color: 'black' }}
                />
        </div>
    )
}

export default Busqueda2
