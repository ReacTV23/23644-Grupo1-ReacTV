import React from 'react';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Busqueda = ({value, onChange, onSubmit}) => {

  return (
    <>
        <div style={{ width:'400px', display: 'flex', alignItems: 'center', background: 'white', borderRadius: '50px', padding: '0px', margin: '0' }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'buscar' }}
            style={{ width: '360px', color: 'black' }}
            value={value}
            onChange={onChange}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                onSubmit();
              }
            }}/>
        </div>
    </>
  );
}

export default Busqueda;