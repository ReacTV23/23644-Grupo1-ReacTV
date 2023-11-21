import React from 'react';
import './Footer.css'; // Importa los estilos CSS
import { FaGithub, FaFigma } from 'react-icons/fa'; // Importa los íconos necesarios

/**
 * Componente Footer.
 * @component
 * @return {JSX.Element} Elemento JSX que representa el footer.
 */

function Footer() {
  return (
    <footer>
      {/* Sección izquierda con el ícono de GitHub */}
      <div className="left">
        {/* Enlace a GitHub */}
        <a
          href="https://github.com/tu_usuario_en_github"
          target="_blank"
          rel="noopener noreferrer"
        >
          {/* Ícono de GitHub */}
          <FaGithub />
        </a>
      </div>

      {/* Sección central con el botón "Team" y el texto "CaC - React 2023" */}
      <div className="center">
        {/* Botón "Team" */}
        <button>Team</button>
        {/* Texto "CaC - React 2023" */}
        <p>CaC - React 2023</p>
      </div>

      {/* Sección derecha con el ícono de Figma */}
      <div className="right">
        {/* Enlace a Figma */}
        <a href="https://www.figma.com/" target="_blank" rel="noopener noreferrer">
          {/* Ícono de Figma */}
          <FaFigma />
        </a>
      </div>
    </footer>
  );
}

export default Footer;
