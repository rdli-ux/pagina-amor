const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Servir el HTML
app.use(express.static(__dirname));

// Base de datos
const db = new sqlite3.Database('database.db');

db.run(`
CREATE TABLE IF NOT EXISTS respuestas (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  nombre TEXT,
  razones TEXT
)
`);

// Guardar datos
app.post('/guardar', (req, res) => {
  const { nombre, razones } = req.body;
  db.run("INSERT INTO respuestas (nombre, razones) VALUES (?, ?)", [nombre, razones]);
  res.json({ status: 'ok' });
});

// Ver respuestas
app.get('/respuestas', (req, res) => {
  db.all("SELECT * FROM respuestas", [], (err, rows) => {
    if (err) return res.status(500).json(err);
    res.json(rows);
  });
});

// Iniciar servidor
app.listen(3000, () => {
  console.log('Servidor en http://localhost:3000');
});