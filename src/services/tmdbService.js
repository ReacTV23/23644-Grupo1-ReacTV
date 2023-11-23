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