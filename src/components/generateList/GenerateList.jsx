const GenerateList = ({ movie }) => {
  // Aquí puedes usar la información de cada película (movie) para generar tu lista
  const movies = movie.items.results;
  return (
    <div>
      <h2>Título: {movie.title}</h2>
      <h4>Género: {movie.slug}</h4>
      <h3>Películas</h3>
      <hr style={{ borderStyle: "dashed" }} />
      {movies.map((currentMovie, index) => (
        <p key={index}>{currentMovie.title}</p>
      ))}
      <hr />
    </div>
  );
};

export default GenerateList;
