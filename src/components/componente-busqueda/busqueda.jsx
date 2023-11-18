import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import axios from 'axios';
import './busqueda.css'; // Importa los estilos CSS

const Busqueda = () => {
  const [resultados, setResultados] = useState([]);
  const [error, setError] = useState(null);

  // Función de búsqueda
  const buscar = async () => {
    try {
      // Utiliza la variable de entorno para la API key de TMDB
      const apiKey = process.env.REACT_APP_TMDB_API_KEY;
      const endpoint = 'https://api.themoviedb.org/3/search/movie';
      const query = 'peliculas'; // Puedes ajustar el término de búsqueda según tus necesidades

      // Agrega este log para verificar si se está leyendo el archivo .env correctamente
      console.log('Before reading .env file');

      const response = await axios.get(`${endpoint}?api_key=${apiKey}&query=${query}`);
      setResultados(response.data.results); // Actualiza el estado con los resultados de la búsqueda
    } catch (error) {
      console.error('Error al buscar:', error);
      setError('Error al realizar la búsqueda. Por favor, inténtalo de nuevo más tarde.');
    }
  };

  // Efecto para realizar la búsqueda al montar el componente
  useEffect(() => {
    // Agrega este log para verificar si se está leyendo el archivo .env correctamente
    console.log('Before searching');
    buscar();
    console.log('After searching');
  }, []);

  return (
    <div>
      <h2>Resultados de Búsqueda</h2>
      {error && <p className="error-message">{error}</p>}
      <div className="row row-cols-2 row-cols-md-3 g-4">
        {resultados.map((resultado) => (
          <div key={resultado.id} className="col">
            <Card>
              <Link to={`/ver-sinopsis/${resultado.id}`}>
                <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${resultado.poster_path}`} alt={resultado.title} />
              </Link>
              <Card.Body>
                <Card.Title>{resultado.title}</Card.Title>
                <Card.Text>{resultado.overview}</Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Busqueda;
