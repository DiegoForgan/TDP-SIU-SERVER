var express = require('express');
var app = express();
const db = require('./db');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
  extended: true
})); // support encoded bodies

const PORT = process.env.PORT || 8080;

//librerias propias
var admin = require('./routes/admin.js');
var alumno = require('./routes/alumno.js');
var docente = require('./routes/docente.js');

//public
app.use('/admin', express.static("public"));

//router
app.use('/admin', admin);
app.use('/alumno', alumno);
app.use('/docente', docente);


app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log('Servido escuchando en el puerto: ' + PORT);
});
