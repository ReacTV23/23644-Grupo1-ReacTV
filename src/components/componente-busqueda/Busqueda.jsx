import React, { useState, useEffect } from 'react';
import axios from 'axios';
import YouTube from 'react-youtube';
// import Busqueda from './components/componente-busqueda/Busqueda';
import './Busqueda.css';
// import { PanoramaSharp } from '@mui/icons-material';

function Busqueda() {
  const API_URL = 'https://api.themoviedb.org/3/search/multi?include_adult=false&language=en-US&page=1'
  const API_KEY = '8ba06faa25caf225b98752550c56718f'
  const IMAGE_PATH = 'https://image.tmdb.org/t/p/original'
  const URL_IMAGE = 'https://image.tmdb.org/t/p/original' //endpoint para las imagenes

  //variables de estado
  const [movies, setMovies] = useState([])
  const [searchKey, setSearchKey]= useState("")
  const [selectedMovie, setSelectedMovie] = useState({});
  const [trailer, setTrailer] = useState(null);
  const [movie, setMovie] = useState( {title: "Loading Movies"});
  const [playing, setPlaying] = useState(false);

  //Esta función es para realizar la petición por get a la API
  const fetchMovies = async (searchKey) => {
    const type = searchKey ? "search" : "discover";
    const {
      data: { results },
    } = await axios.get(`${API_URL}/${type}/movie`, {
      params: {
        api_key: API_KEY,
        query: searchKey,
      },
    });
  
  setMovies(results)
  setMovie(results[0])

  if (results.length) {
    await fetchMovie(results[0].id);
  }
};





//funcion para la peticion de un solo objeto y mostrar en reproductor de video
const fetchMovie = async(id)=>{
  const {data} = await axios.get(`${API_URL}/movie/${id}`, {
    params:{
      api_key: API_KEY,
      append_to_response: "videos"
    }
  });

  if(data.videos && data.videos.results) {
    const trailer = data.videos.results.find(
      (vid) => vid.name === "Official Trailer"
    );
     setTrailer(trailer ? trailer : data.videos.results[0])
  }
  setMovie(data)
}

const handleSelectedMovie = async(movie) => {
  fetchMovie(movie.id);
  setMovie(movie);
  window.scrollTo(0, 0);
}



// función para buscar películas
const searchMovies = (e)=>{
  e.preventDefault();
  fetchMovies(searchKey) //
}

useEffect(() => {
  fetchMovies();
}, []);

  return (
    <div>
      {/*buscador*/}
      <form className='container mb-4' onSubmit={searchMovies}>
      <input type="text" placeholder='search' onChange={(e)=> setSearchKey(e.target.value)}/> 
      <button className='btn btn-primary'>Buscar</button>
      </form>


        {/*aqui va todo el contenedor del banner y del reproductor de video*/} 
        <div>
        <main>
          {movie ? (
            <div
              className="viewtrailer"
              style={{
                backgroundImage: `url("${IMAGE_PATH}${movie.backdrop_path}")`,
              }}
            >
              {playing ? (
                <>
                  <YouTube
                    videoId={trailer.key}
                    className="reproductor container"
                    containerClassName={"youtube-container"}
                    opts={{
                      width: "100%",
                      height: "100%",
                      playerVars: {
                        autoplay: 1,
                        controls: 0,
                        cc_load_policy: 0,
                        fs: 0,
                        iv_load_policy: 0,
                        modestbranding: 0,
                      rel: 0,
                      showinfo: 0,
                    },
                  }}
                />
                <button onClick={() => setPlaying(false)} className="boton">
                   Close
                </button>
              </>

            ) : (
              <div className="container">
                <div className="">
                  {trailer ? (
                    <button
                      className="boton"
                      onClick={() => setPlaying(true)}
                      type="button"
                    >
                      Play Trailer
                    </button>
                  ) : (
                    "Sorry, no trailer available"
                  )}
                  <h1 className="text-white">{movie.title}</h1>
                  <p className="text-white">{movie.overview}</p>
                </div>
              </div>
            )}
          </div>
        ) : null}
      </main>
    </div>



      {/* contenedor que va a mostrar posters de las peliculas actuales */}
      <div className='container mt-3'>
  <div className='row'>
    {movies.map((movie) => (
      <div key={movie.id} className="col-md-4 mb-3" onClick={() => handleSelectedMovie(movie)}>
        <img src={`${URL_IMAGE + movie.poster_path}`} alt="" height={600} width="100%" />
        <h4 className='text-center'>{movie.title}</h4>
        {/* Otro contenido relacionado con la película */}
      </div>
    ))}
  </div>
</div>

      { /* <Busqueda resultados={resultadosDeBusqueda} />*/}
    </div>
  );
}


export default Busqueda;