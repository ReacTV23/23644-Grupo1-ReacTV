// datosSimulados.js
const datosSimulados = [
  {
    id: 1,
    titulo: 'Inception',
    descripcion: 'Un ladrón especializado en el robo de secretos corporativos se embarca en una misión para plantar una idea en la mente de un CEO.',
    imagen: 'https://c8.alamy.com/compes/2jh2pw0/poster-de-pelicula-creacion-2010-2jh2pw0.jpg',
  },
  {
    id: 2,
    titulo: 'The Shawshank Redemption',
    descripcion: 'Dos hombres encuentran la redención mientras están encarcelados en la prisión de Shawshank.',
    imagen: 'https://c8.alamy.com/compes/2jh2myr/robbins-poster-la-redencion-de-shawshank-1994-2jh2myr.jpg',
  },
  {
    id: 3,
    titulo: 'The Godfather',
    descripcion: 'La historia de la familia mafiosa Corleone en Nueva York.',
    imagen: 'https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_.jpg',
  },
  {
    id: 4,
    titulo: 'The Dark Knight',
    descripcion: 'Batman se enfrenta al Joker, un criminal maestro que busca sumir Gotham City en la anarquía.',
    imagen: 'https://image.tmdb.org/t/p/w500/1hRoyzDtpgMU7Dz4JF22RANzQO7.jpg',
  },
  {
    id: 5,
    titulo: 'Pulp Fiction',
    descripcion: 'Varias historias entrelazadas que siguen la vida de criminales en Los Ángeles.',
    imagen: 'https://image.tmdb.org/t/p/w500/d5iIlFn5s0ImszYzBPb8JPIfbXD.jpg',
  },
  {
    id: 6,
    titulo: 'The Lord of the Rings: The Fellowship of the Ring',
    descripcion: 'Un grupo de aventureros se embarca en una misión para destruir un anillo mágico y derrotar al malvado Sauron.',
    imagen: 'https://image.tmdb.org/t/p/w500/6oom5QYQ2yQTMJIbnvbkBL9cHo6.jpg',
  },
  {
    id: 7,
    titulo: 'Fight Club',
    descripcion: 'Un hombre insomne y su nuevo amigo inician un club secreto donde los hombres pueden liberar su agresión reprimida.',
    imagen: 'https://image.tmdb.org/t/p/w500/bptfVGEQuv6vDTIMVCHjJ9Dz8Px.jpg',
  },
  {
    id: 8,
    titulo: 'Forrest Gump',
    descripcion: 'La vida de Forrest Gump, un hombre con una baja inteligencia pero con muchos talentos.',
    imagen: 'https://image.tmdb.org/t/p/w500/yE5d3BUhE8hCnkMUJOo1QDoOGNz.jpg',
  },
  {
    id: 9,
    titulo: 'The Matrix',
    descripcion: 'Un hacker descubre la verdad sobre su realidad y su papel en la guerra contra las máquinas.',
    imagen: 'https://image.tmdb.org/t/p/w500/lZpWprJqbIFpEV5uoHfoK0KCnTW.jpg',
  },
  {
    id: 10,
    titulo: 'Schindler\'s List',
    descripcion: 'La historia de Oskar Schindler, un empresario alemán que salva la vida de más de mil judíos durante el Holocausto.',
    imagen: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
  },
  {
    id: 11,
    titulo: 'Inglourious Basterds',
    descripcion: 'En la Francia ocupada por los nazis, un grupo de soldados judíos estadounidenses planea asesinar a líderes nazis.',
    imagen: 'https://image.tmdb.org/t/p/w500/ai0LXkzVM3hMjDhvFdKMUemoBev.jpg',
  },
  {
    id: 12,
    titulo: 'The Silence of the Lambs',
    descripcion: 'Una joven agente del FBI busca la ayuda de un psiquiatra para atrapar a un asesino en serie.',
    imagen: 'https://image.tmdb.org/t/p/w500/e1mjopzAS2KNsvpbpahQ1a6SkSn.jpg',
  },
  {
    id: 13,
    titulo: 'Titanic',
    descripcion: 'Un romance épico y trágico entre dos pasajeros a bordo del famoso transatlántico.',
    imagen: 'https://image.tmdb.org/t/p/w500/kHXEpyfl6zqn8a6YuozZUujufXf.jpg',
  },
  {
    id: 14,
    titulo: 'Goodfellas',
    descripcion: 'La ascensión y caída de un gángster italoamericano en Nueva York.',
    imagen: 'https://image.tmdb.org/t/p/w500/iKbNVXrZbJ1T60PvHjIwoD8xzue.jpg',
  },
  {
    id: 15,
    titulo: 'The Usual Suspects',
    descripcion: 'Un grupo de criminales es interrogado sobre un misterioso atraco y la identidad de un legendario criminal.',
    imagen: 'https://image.tmdb.org/t/p/w500/jrfvfW4lLFS3V4s4er5y4YcZQHS.jpg',
  },
  {
    id: 16,
    titulo: 'The Godfather: Part II',
    descripcion: 'La continuación de la historia de la familia mafiosa Corleone.',
    imagen: 'https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mTcZc.jpg',
  },
  {
    id: 17,
    titulo: 'The Green Mile',
    descripcion: 'Un guardia de la prisión descubre que un prisionero tiene poderes milagrosos.',
    imagen: 'https://image.tmdb.org/t/p/w500/velWPhVMQeQKcxggNEU8YmIo52R.jpg',
  },
  {
    id: 18,
    titulo: 'Se7en',
    descripcion: 'Dos detectives investigan una serie de asesinatos basados en los siete pecados capitales.',
    imagen: 'https://image.tmdb.org/t/p/w500/v2J6b9P2FPVQeXI5Vf7XZqoJa6g.jpg',
  },
  {
    id: 19,
    titulo: 'The Lord of the Rings: The Two Towers',
    descripcion: 'Continuación de la misión para destruir el anillo mágico y derrotar a Sauron.',
    imagen: 'https://image.tmdb.org/t/p/w500/5VTN0pR8gcqV3EPUHHfMGnJYN9L.jpg',
  },
  {
    id: 20,
    titulo: 'The Dark Knight Rises',
    descripcion: 'Batman debe enfrentarse a un nuevo y poderoso enemigo, Bane.',
    imagen: 'https://image.tmdb.org/t/p/w500/dEYnvnUfXrqvqeRSqvIEtmzhoA8.jpg',
  },
];

export default datosSimulados;

