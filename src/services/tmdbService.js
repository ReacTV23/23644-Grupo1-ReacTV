import axios from "axios";

const API_KEY = process.env.REACT_APP_API_KEY_TMDB
const API_URL_BASE = process.env.REACT_APP_API_URL_TMDB
// const URL_IMAGE = process.env.REACT_APP_URL_IMAGE_TMDB
const API_LANGUAGE = process.env.REACT_APP_LANGUAGE_CODE_TMDB


const basicFetch = async (endPoint, genres = false) => {
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
        media_type: movieShow.media_type,
        genre_ids: movieShow.genre_ids,
        vote_average: movieShow.vote_average
    }));
};

const getPopularMovies = async (page) => {
    const endPoint = `movie/popular?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

const getNowPlayingMovies = async (page) => {
    const endPoint = `movie/now_playing?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

const getTopRatedMovies = async (page) => {
    const endPoint = `movie/top_rated?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

const getTrendingMovies = async (page) => {
    const endPoint = `trending/movie/day?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
};

const getMoviesByGenres = async (page, genre) => {
    const endPoint = `discover/movie?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}&with_genres=${genre}`;
    const movieResults = await basicFetch(endPoint);
    return transformMovieResults(movieResults);
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
        media_type: tvShow.media_type,
        genre_ids: tvShow.genre_ids,
        vote_average: tvShow.vote_average
    }));
};

const getPopularTV = async (page) => {
    const endPoint = `tv/popular?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const tvResults = await basicFetch(endPoint);
    return transformTVResults(tvResults);
};

const getTopRatedTV = async (page) => {
    const endPoint = `tv/top_rated?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}`;
    const tvResults = await basicFetch(endPoint);
    return transformTVResults(tvResults);
};

const getTVByGenres = async (page, genre) => {
    const endPoint = `discover/tv?api_key=${API_KEY}&language=${API_LANGUAGE}&page=${page}&sort_by=popularity.desc&with_genres=${genre}`;
    const tvResults = await basicFetch(endPoint);
    return transformTVResults(tvResults);
};

/**
 *
 * Generos
 *
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
                    true
                ),
                basicFetch(
                    `genre/tv/list?language=${API_LANGUAGE}&api_key=${API_KEY}`,
                    true
                )
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
                true
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
                items: uniqueGenres || [] // Si uniqueGenres es undefined, asigno un array vacío
            }
        ];
    } catch (error) {
        console.error(`Error al obtener los géneros para ${type}:`, error);
        return {
            error: true,
            message: `Hubo un error al obtener los géneros para ${type}`,
            details: error.message || "Detalles del error no disponibles"
        };
    }
};

const getAllByGenres = async (page = 1, genre) => {
    try {
        const [movies, tvShows] = await Promise.all([
            getMoviesByGenres(page, genre),
            getTVByGenres(page, genre)
        ]);

        // Puedes hacer algo con los resultados aquí, como combinarlos en un solo array
        const combinedResults = combineArraysGenres(movies, tvShows, 20);
        console.log(movies, tvShows, combinedResults);

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

export {
    getPopularMovies,
    getNowPlayingMovies,
    getTopRatedMovies,
    getTrendingMovies,
    getMoviesByGenres,
    getPopularTV,
    getTopRatedTV,
    getTVByGenres,
    getGenres,
    getAllByGenres
};
