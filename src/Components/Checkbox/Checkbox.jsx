import React from 'react'
import colors from '../../config/config.js'

const Checkbox = ({texto, onChange, checked, value, name }) => {
    return (
    <div style={{width:'100%',color:`${colors.blanco}` }}>
        <label>
            <input
                style={{width:'10%', marginRight:'1rem', fontsize:'1.5rem'}}
                type="radio"
                name={name}
                value={value}
                checked={checked}
                onChange={onChange}
            />
            {texto}
        </label>
    </div>
    )
}

export default Checkbox
