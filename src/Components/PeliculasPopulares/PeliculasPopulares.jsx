// En PeliculasPopulares.jsx
import React, { useState, useEffect } from 'react';
import { getPopularMovies } from '../../services/tmdbService';
import './PeliculasPopulares.css';

const PeliculasPopulares = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    const fetchPopularMovies = async () => {
        try {
            const results = await getPopularMovies(1);
            setPopularMovies(results);
        } catch (error) {
            console.error('Error fetching popular movies:', error.message);
        }
    };

    useEffect(() => {
        fetchPopularMovies();
    }, []);

    return (
        <div className="peliculas-populares">
            <h2>Películas Populares</h2>
            <div className="peliculas-list">
                {popularMovies.map((movie) => (
                    <div key={movie.id} className="pelicula-item">
                        <h3>{movie.title}</h3>
                        {movie.poster_path && (
                            <img
                                src={`https://tu-servidor-de-imagenes/${movie.poster_path}`}
                                alt={movie.title}
                            />
                        )}
                        {/* Agrega más detalles según tus necesidades */}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PeliculasPopulares;
