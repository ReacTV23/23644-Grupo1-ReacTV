import React from 'react';

function Footer() {
  // Variables let
  let companyName = "Tu Empresa";

  // Arrays en React
  let redesSociales = [
    { nombre: 'Twitter', enlace: 'https://twitter.com/tu_cuenta' },
    { nombre: 'Facebook', enlace: 'https://www.facebook.com/tu_cuenta' },
  ];

  // Componentes con props
  const RedesSociales = ({ redes }) => (
    <ul>
      {redes.map(red => (
        <li key={red.nombre}>
          <a href={red.enlace} target="_blank" rel="noopener noreferrer">
            {red.nombre}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <footer>
      <div>
        {/* Información de Contacto */}
        <p>Contáctanos: info@example.com</p>
        
        {/* Uso de Bootstrap 5 */}
        <p className="text-muted">&copy; 2023 {companyName}. Todos los derechos reservados.</p>
      </div>

      <div>
        {/* Enlaces de Ayuda y Preguntas Frecuentes */}
        <p><a href="/ayuda">Centro de Ayuda</a></p>
        <p><a href="/preguntas-frecuentes">Preguntas Frecuentes</a></p>

        {/* Información Legal */}
        <p><a href="/terminos-y-condiciones">Términos y Condiciones</a></p>
        <p><a href="/politica-de-privacidad">Política de Privacidad</a></p>
      </div>

      <div>
        {/* Componente con props */}
        <RedesSociales redes={redesSociales} />
      </div>
    </footer>
  );
}

export default Footer;
