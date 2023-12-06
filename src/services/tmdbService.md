## Servicio de Películas y Series

### Constantes

- `API_KEY`: Clave de API para acceder a The Movie Database (TMDb).
- `API_URL_BASE`: URL base para las solicitudes a la API de TMDb.
- `API_LANGUAGE`: Idioma de las solicitudes a la API (en este caso, español de Argentina).

### Funciones Principales

#### `getPopularMovies(page: number) => Promise<Array>`

Obtiene las películas populares.

- **Parámetros:**
  - `page` (number): El número de página para obtener resultados paginados.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan las películas populares.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getNowPlayingMovies(page: number) => Promise<Array>`

Obtiene las películas que están actualmente en cartelera.

- **Parámetros:**
  - `page` (number): El número de página para obtener resultados paginados.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan las películas en cartelera.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getTopRatedMovies(page: number) => Promise<Array>`

Obtiene las películas mejor valoradas.

- **Parámetros:**
  - `page` (number): El número de página para obtener resultados paginados.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan las películas mejor valoradas.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getTrendingMovies(page: number) => Promise<Array>`

Obtiene las películas de tendencia del día.

- **Parámetros:**
  - `page` (number): El número de página para obtener resultados paginados.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan las películas de tendencia.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getMoviesByGenres(page: number, genre: number) => Promise<Array>`

Obtiene películas según un género específico.

- **Parámetros:**
  - `page` (number): El número de página para obtener resultados paginados.
  - `genre` (number): El ID del género por el cual filtrar las películas.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan las películas del género especificado.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getPopularTV(page: number) => Promise<Array>`

Obtiene las series de televisión populares.

- **Parámetros:**
  - `page` (number): El número de página para obtener resultados paginados.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan las series de televisión populares.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getTopRatedTV(page: number) => Promise<Array>`

Obtiene las series de televisión mejor valoradas.

- **Parámetros:**
  - `page` (number): El número de página para obtener resultados paginados.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan las series de televisión mejor valoradas.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getTVByGenres(page: number, genre: number) => Promise<Array>`

Obtiene series de televisión según un género específico.

- **Parámetros:**
  - `page` (number): El número de página para obtener resultados paginados.
  - `genre` (number): El ID del género por el cual filtrar las series de televisión.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan las series de televisión del género especificado.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getGenres(type: string) => Promise<Array>`

Obtiene la lista de géneros desde la API de The Movie Database (TMDb).

- **Parámetros:**
  - `type` (string): El tipo de medios para el cual se obtendrán los géneros (puede ser 'movie', 'tv' o 'all').
- **Devuelve:** Una promesa que se resolverá con un array que contiene un objeto con información sobre los géneros.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.

#### `getAllByGenres(page: number, genre: number) => Promise<Array>`

Obtiene películas y series de televisión por género.

- **Parámetros:**
  - `page` (number, opcional): El número de página para obtener resultados paginados (por defecto es 1).
  - `genre` (number): El ID del género por el cual filtrar las películas y series de televisión.
- **Devuelve:** Una promesa que se resolverá con un array de objetos que representan películas y series de televisión del género especificado.
- **Excepciones:** Lanza un error si hay un problema al realizar la solicitud a la API.
