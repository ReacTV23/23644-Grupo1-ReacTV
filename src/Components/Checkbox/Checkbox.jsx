import React from 'react'

const Checkbox = ({texto, onChange, checked, value, name }) => {
    return (
    <div style={{margin: '1rem'}}>
        <label>
            <input
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
