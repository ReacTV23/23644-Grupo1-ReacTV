const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

// Configuración CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Ruta para realizar solicitudes a la API de TMDb
app.get('/tmdb-api', async (req, res) => {
  try {
    const response = await axios.get('https://api.themoviedb.org/3' + req.url);
    res.json(response.data);
  } catch (error) {
    res.status(error.response.status).json(error.response.data);
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
