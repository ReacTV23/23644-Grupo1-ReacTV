// tmdbService.js

// Defino las constantes para la URL de la API, la clave de API, el código de lenguaje y la URL base para las imágenes
const API_URL = process.env.REACT_APP_API_URL_TMDB;
const API_KEY = process.env.REACT_APP_API_KEY_TMDB;
const LANGUAGE_CODE = process.env.REACT_APP_LANGUAGE_CODE_TMDB;
// const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;

/**
 * Realiza una solicitud a la API utilizando el método fetch.
 *
 * @param {string} endpoint - La ruta del endpoint de la API.
 * @returns {Promise} Una promesa que se resolverá con los datos de la respuesta JSON.
 * @throws {Error} Si la respuesta no es exitosa (código de estado diferente de 200).
 *
 * @example
 * const data = await basicFetch('/some/endpoint');
 * console.log(data);
 */
export const basicFetch = async (endpoint) => {
    const req = await fetch(`${API_URL}${endpoint}`);

    if (!req.ok) {
        // Si la respuesta no es exitosa, lanzar una excepción con el código de estado
        throw new Error(`Error en la solicitud: ${req.status}`);
    }

    return req.json();
};


//Peliculas

/**
 * Obtiene la lista de géneros de películas desde la API de The Movie Database (TMDb).
 *
 * @async
 * @function
 * @returns {Promise<Array>} Una promesa que se resolverá con un array que contiene
 *                           un objeto con información sobre los géneros de películas.
 *                           El objeto tiene las propiedades: 'slug', 'title' y 'items'.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 *
 * @example
 * try {
 *   const genresData = await getGenres();
 *   console.log(genresData);
 * } catch (error) {
 *   console.error(`Error al obtener los géneros: ${error.message}`);
 * }
 */
export const getGenres = async () => {
    try {
        const { genres } = await basicFetch(
            `/genre/movie/list?language=${LANGUAGE_CODE}&api_key=${API_KEY}`
        );
        return [
            {
                slug: "genres",
                title: "Listado de géneros",
                items: genres || [] // Si genres es undefined, asigna un array vacío
            }
        ];
    } catch (error) {
        // Manejo de error en caso de que falle la petición
        console.error("Error al obtener los géneros:", error.message);
        return []; // Devuelve un array vacío en caso de error
    }
};

// Nueva función para obtener todas las películas con sus géneros
export const getAllMoviesByGenres = async () => {
    try {
        // Obtiene los géneros utilizando getGenres
        const genresData = await getGenres();

        // Extrae solo el array de géneros desde la propiedad 'items'
        const genres = genresData[0]?.items || [];

        // Recorre el array de géneros y construye el array deseado
        const moviesByGenre = await Promise.all(
            genres.map(async (genre) => {
                const slug = genre.name.toLowerCase();
                const title = genre.name.charAt(0).toUpperCase() + genre.name.slice(1);
                const withGenre = genre.id;

                // Construye la URL para obtener las películas por género
                const url = `/discover/movie?include_adult=false&include_video=false&language=${LANGUAGE_CODE}&page=1&sort_by=popularity.desc&api_key=${API_KEY}&with_genres=${withGenre}`;

                // Realiza la solicitud para obtener las películas
                const items = await basicFetch(url);

                // Retorna el objeto representando el género y sus películas
                return { slug, title, items };
            })
        );

        // Retorna el array final con la información de películas por género
        return moviesByGenre;
    } catch (error) {
        console.error(`Error al obtener todas las películas: ${error.message}`);
        throw error;
    }
};


// Series