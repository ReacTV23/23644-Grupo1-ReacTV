import React from 'react';
import { IconButton, InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const Busqueda = ({value, funcion, onSubmit}) => {

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <form className='container' style={{width:'400px'}} onSubmit={handleSubmit}>
        <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '50px', padding: '0px', margin: '0' }}>
          <IconButton>
            <SearchIcon />
          </IconButton>
          <InputBase
            placeholder="Buscar..."
            inputProps={{ 'aria-label': 'buscar' }}
            style={{ width: '360px', color: 'black' }}
            value={value}
            onInput={funcion}/>
        </div>
      </form>
    </>
  );
}

export default Busqueda;