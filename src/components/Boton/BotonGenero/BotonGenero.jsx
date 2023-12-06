import React, {useState} from 'react';
import './BotonGenero.css';

const BotonGenero = ({texto, onClick}) => {
    const [isSelected, setIsSelected] = useState(false)

    const handleButtonClick = () => {
        setIsSelected(!isSelected); // Cambia el estado al hacer clic
        onClick(); // Llama a la función onClick proporcionada desde el componente padre
    };

    return (
        <button type='submit' className={`BotonGenero ${isSelected ? 'clicked' : ''}`} onClick={handleButtonClick}>{texto}</button>
    )
}

export default BotonGenero
