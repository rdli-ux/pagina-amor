const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(__dirname));

const FILE = 'respuestas.json';

// crear archivo si no existe
if (!fs.existsSync(FILE)) {
  fs.writeFileSync(FILE, '[]');
}

// guardar datos
app.post('/guardar', (req, res) => {
  const { nombre, razones } = req.body;

  const data = JSON.parse(fs.readFileSync(FILE));
  data.push({ nombre, razones });

  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

  res.json({ status: 'ok' });
});

// ver respuestas
app.get('/respuestas', (req, res) => {
  const data = JSON.parse(fs.readFileSync(FILE));
  res.json(data);
});

app.listen(3000, () => {
  console.log('Servidor corriendo');
});