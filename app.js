var express = require('express');
var app = express();
const db = require('./db');

const PORT = process.env.PORT || 8080;

app.get('/base', (req, res) => {
    var resp = (db.query('INSERT INTO padron(dni, apellido, nombre) VALUES($1, $2, $3) RETURNING *', ['87654321', 'martinez', 'mariano'], function(){}));
    res.send('Ejecucion OK');
});


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log('Servido escuchando en el puerto: ' + PORT);
});
