import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY_TMDB;
const API_URL_BASE = process.env.REACT_APP_API_URL_TMDB + "/";
const API_LANGUAGE = process.env.REACT_APP_LANGUAGE_CODE_TMDB;
// const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB;

const basicFetch = async (endPoint, genres = false) => {
    // console.log("basicFetch", `${API_URL_BASE}${endPoint}`);
    try {
        const response = await axios.get(`${API_URL_BASE}${endPoint}`);
        return genres ? response.data : response.data.results;
    } catch (error) {
        console.error(`Error fetching ${endPoint}:`, error.message);
        return [];
    }
};

/**
 *
 * Peliculas
 *
 */

// Función auxiliar para mapear y transformar los resultados
const transformMovieResults = (movieResults) => {
    return movieResults.map((movieShow) => ({
        id: movieShow.id,
        title: movieShow.title,
        backdrop_path: movieShow.backdrop_path,
        overview: movieShow.overview,
        poster_path: movieShow.poster_path,
        media_type: movieShow.media_type || "movie",
        genre_ids: movieShow.genre_ids,
        vote_average: movieShow.vote_average,
        release_date: movieShow.release_date,
    }));
};

/**
 * Obtiene las películas populares.
 *
 * @async
 * @function
 * @param {number} page - El número de página para obtener resultados paginados.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las películas populares.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getPopularMovies = async (page) => {
    const endPoint = `movie/popular?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

/**
 * Obtiene las películas que están actualmente en cartelera.
 *
 * @async
 * @function
 * @param {number} page - El número de página para obtener resultados paginados.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las películas en cartelera.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getNowPlayingMovies = async (page) => {
    const endPoint = `movie/now_playing?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

/**
 * Obtiene las películas mejor valoradas.
 *
 * @async
 * @function
 * @param {number} page - El número de página para obtener resultados paginados.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las películas mejor valoradas.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getTopRatedMovies = async (page) => {
    const endPoint = `movie/top_rated?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

/**
 * Obtiene las películas de tendencia del día.
 *
 * @async
 * @function
 * @param {number} page - El número de página para obtener resultados paginados.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las películas de tendencia.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getTrendingMovies = async (page) => {
    const endPoint = `trending/movie/day?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

/**
 * Obtiene películas próximas a estrenarse.
 *
 * @async
 * @function
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las películas que se estrenarán proximamente.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getUpcomingMovies = async () => {
    const endPoint = `movie/upcoming?language=${API_LANGUAGE}&api_key=${API_KEY}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

/**
 * Obtiene películas según un género específico.
 *
 * @async
 * @function
 * @param {number} page - El número de página para obtener resultados paginados.
 * @param {number} genre - El ID del género por el cual filtrar las películas.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las películas del género especificado.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getMoviesByGenres = async (page, genre) => {
    const endPoint = `discover/movie?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}&with_genres=${genre}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

/**
 * Obtiene una pélicula por su id.
 *
 * @async
 * @function
 * @param {number} id - El id de la película.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array que representa los datos de la pelicula solicitada.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getMovieById = async (id) => {
    // console.log("tmbdbService => getMovieById:", page, id);
    const endPoint = `movie/${id}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
    const movieResult = await basicFetch(endPoint, true);
    // console.log("tmbdbService => getMovieById:", movieResult);
    return movieResult;
};

/**
 * Obtiene los trailers de una pelicula por su id.
 *
 * @async
 * @function
 * @param {number} id - El id de la película.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representa los trailers de la pelicula solicitada.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getTrailersById = async (id) => {
    // console.log("tmbdbService => getMovieById:", page, id);
    const endPoint = `movie/${id}/videos?api_key=${API_KEY}&language=${API_LANGUAGE}`;
    const trailerResults = await basicFetch(endPoint, false);
    // console.log("tmbdbService => getMovieById:", movieResults);
    return trailerResults;
};

/**
 * Obtiene los trailers de una serie por su id.
 *
 * @async
 * @function
 * @param {number} id - El id de la seerie.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representa los trailers de la pelicula solicitada.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getTrailersTVById = async (id) => {
    // console.log("tmbdbService => getSeriesById:", page, id);
    //const endPoint = `tv/${id}/videos?api_key=${API_KEY}&language=${API_LANGUAGE}`; idioma español
    const endPoint = `tv/${id}/videos?api_key=${API_KEY}`; //por default idioma ingles
    const trailerResults = await basicFetch(endPoint, false);
    // console.log("tmbdbService => getSeriesById:", movieResults);
    return trailerResults;
};

/**
 *
 * Series
 *
 */

// Función auxiliar para mapear y transformar los resultados
const transformTVResults = (tvResults) => {
    return tvResults.map((tvShow) => ({
        id: tvShow.id,
        title: tvShow.name,
        backdrop_path: tvShow.backdrop_path,
        overview: tvShow.overview,
        poster_path: tvShow.poster_path,
        media_type: tvShow.media_type || "tv",
        genre_ids: tvShow.genre_ids,
        vote_average: tvShow.vote_average,
    }));
};

/**
 * Obtiene las series de televisión populares.
 *
 * @async
 * @function
 * @param {number} page - El número de página para obtener resultados paginados.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las series de televisión populares.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getPopularTV = async (page) => {
    const endPoint = `tv/popular?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const tvResults = await basicFetch(endPoint);
    return transformTVResults(tvResults);
};

/**
 * Obtiene las series de televisión mejor valoradas.
 *
 * @async
 * @function
 * @param {number} page - El número de página para obtener resultados paginados.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las series de televisión mejor valoradas.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getTopRatedTV = async (page) => {
    const endPoint = `tv/top_rated?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const tvResults = await basicFetch(endPoint);
    return transformTVResults(tvResults);
};

/**
 * Obtiene series de televisión según un género específico.
 *
 * @async
 * @function
 * @param {number} page - El número de página para obtener resultados paginados.
 * @param {number} genre - El ID del género por el cual filtrar las series de televisión.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan las series de televisión del género especificado.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getTVByGenres = async (page, genre) => {
    const endPoint = `discover/tv?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}&sort_by=popularity.desc&with_genres=${genre}`;
    const tvResults = await basicFetch(endPoint);
    return transformTVResults(tvResults);
};

/**
 * Obtiene una serie por su id.
 *
 * @async
 * @function
 * @param {number} id - El id de la película.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array que representa los datos de la serie solicitada.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 */
const getTVById = async (id) => {
    // console.log("tmbdbService => getTVById:", id);
    const endPoint = `tv/${id}?api_key=${API_KEY}&language=${API_LANGUAGE}`;
    const tvResult = await basicFetch(endPoint, true);
    // console.log("tmbdbService => getTVById:", tvResult);
    return tvResult;
};

/**
 *
 * Generos
 *
 */

/**
 * Obtiene la lista de géneros desde la API de The Movie Database (TMDb).
 *
 * @async
 * @function
 * @param {string} type - El tipo de medios para el cual se obtendrán los géneros.
 *                        Puede ser 'movie', 'tv' o 'all'.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array que contiene
 *                           un objeto con información sobre los géneros.
 *                           El objeto tiene las propiedades: 'slug', 'title', 'type' y 'items'.
 *                           'type' indicará si los géneros son de películas ('movie'),
 *                           series de televisión ('tv') o ambos ('all').
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 *
 * @example
 * try {
 *   // Obtiene los géneros de películas
 *   const movieGenresData = await getGenres('movie');
 *   console.log(movieGenresData);
 *
 *   // Obtiene los géneros de series de televisión
 *   const tvGenresData = await getGenres('tv');
 *   console.log(tvGenresData);
 *
 *   // Obtiene los géneros de películas y series de televisión combinados sin duplicados
 *   const allGenresData = await getGenres('all');
 *   console.log(allGenresData);
 * } catch (error) {
 *   console.error(`Error al obtener los géneros: ${error.message}`);
 * }
 */
const getGenres = async (type) => {
    try {
        let movieGenres = [];
        let tvGenres = [];

        // Verifico si el tipo es 'all'; en ese caso, realizo ambas llamadas a la API
        if (type === "all") {
            const [movieResponse, tvResponse] = await Promise.all([
                basicFetch(
                    `genre/movie/list?language=${API_LANGUAGE}&api_key=${API_KEY}`,
                    true,
                ),
                basicFetch(
                    `genre/tv/list?language=${API_LANGUAGE}&api_key=${API_KEY}`,
                    true,
                ),
            ]);

            // Verifico si obtuve los géneros de ambas llamadas
            if (movieResponse.genres) {
                // Almaceno los géneros de películas
                movieGenres = movieResponse.genres;
            }

            if (tvResponse.genres) {
                // Almaceno los géneros de series de televisión
                tvGenres = tvResponse.genres;
            }
        } else {
            // Si el tipo no es 'all', realizo la llamada a la API con el tipo correspondiente
            const response = await basicFetch(
                `genre/${type}/list?language=${API_LANGUAGE}&api_key=${API_KEY}`,
                true,
            );

            // Verifico si obtuve los géneros de la llamada
            if (response.genres) {
                if (type === "movie") {
                    // Almaceno los géneros de películas
                    movieGenres = response.genres;
                } else if (type === "tv") {
                    // Almaceno los géneros de series de televisión
                    tvGenres = response.genres;
                }
            }
        }

        // Combino los géneros y elimino duplicados
        const allGenres = [...movieGenres, ...tvGenres];

        const uniqueGenres = allGenres.reduce((unique, genre) => {
            const existingGenre = unique.find((g) => g.id === genre.id);
            if (!existingGenre) {
                unique.push(genre);
            }
            return unique;
        }, []);

        return [
            {
                slug: "genres",
                title: "Listado de géneros",
                type: type,
                items: uniqueGenres || [], // Si uniqueGenres es undefined, asigno un array vacío
            },
        ];
    } catch (error) {
        console.error(`Error al obtener los géneros para ${type}:`, error);
        return {
            error: true,
            message: `Hubo un error al obtener los géneros para ${type}`,
            details: error.message || "Detalles del error no disponibles",
        };
    }
};

/**
 * Obtiene películas y series de televisión por género.
 *
 * @async
 * @function
 * @param {number} [page=1] - El número de página para obtener resultados paginados (por defecto es 1).
 * @param {number} genre - El ID del género por el cual filtrar las películas y series de televisión.
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan películas y series de televisión del género especificado.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 *
 * @example
 * try {
 *   const results = await getAllByGenres(1, 28); // Obtiene películas y series de televisión del género de acción (ID 28) en la página 1
 *   console.log(results);
 * } catch (error) {
 *   console.error(`Error al obtener películas y series por género: ${error.message}`);
 * }
 */
const getAllByGenres = async (page = 1, genre) => {
    try {
        const [movies, tvShows] = await Promise.all([
            getMoviesByGenres(page, genre),
            getTVByGenres(page, genre),
        ]);

        // Puedes hacer algo con los resultados aquí, como combinarlos en un solo array
        const combinedResults = combineArraysGenres(movies, tvShows, 20);
        // console.log(movies, tvShows, combinedResults);

        return combinedResults;
    } catch (error) {
        console.error("Error al obtener películas y series por género:", error);
        // Puedes manejar el error de alguna manera, como lanzar una excepción o devolver un objeto de error
        throw error;
    }
};

function combineArraysGenres(array1, array2, numberOfElements) {
    if (array1.length === 0) return array2;
    if (array2.length === 0) return array1;

    const combinedArray = [];

    const iterator1 = array1.values();
    const iterator2 = array2.values();

    let element1 = iterator1.next().value;
    let element2 = iterator2.next().value;

    while (element1 !== undefined && element2 !== undefined) {
        combinedArray.push(element1, element2);
        element1 = iterator1.next().value;
        element2 = iterator2.next().value;
    }

    // Tomar los primeros 10 elementos del array resultante
    return combinedArray.slice(0, numberOfElements);
}

/**
 * Realiza una búsqueda en la base de datos de TMDB.
 *
 * @async
 * @function
 * @param {string} query - La cadena de búsqueda.
 * @param {string} context - El contexto de la búsqueda (por ejemplo, "movie" para buscar películas).
 * @param {number} [page=1] - El número de página (opcional, por defecto es 1).
 * @returns {Promise<Array>} Una promesa que se resolverá con un array de objetos que representan los resultados de la búsqueda.
 * @throws {Error} Si hay un error al realizar la solicitud a la API.
 *
 * @example
 * // Ejemplo de uso:
 * const results = await searchTMDB("Avengers", "movie", 1);
 * console.log(results); // Muestra la primera página de los resultados de la búsqueda de películas relacionadas con "Avengers".
 */
const searchTMDB = async (query, context, page = 1) => {
    const endPoint = `search/${context}?query=${query}&api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return movieResults;
};

export {
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getUpcomingMovies,
    getMoviesByGenres,
    getMovieById,
    getTrailersById,
    getTrailersTVById,
    getPopularTV,
    getTopRatedTV,
    getTVByGenres,
    getTVById,
    getGenres,
    getAllByGenres,
    searchTMDB,
};
