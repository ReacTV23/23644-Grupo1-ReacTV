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