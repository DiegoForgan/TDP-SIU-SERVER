var express = require('express');
var app = express();
const db = require('./db');
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

const PORT = process.env.PORT || 8080;

//librerias propias
var admin = require('./routes/admin.js');
var alumno = require('./routes/alumno.js');

//public
app.use('/admin', express.static("public"));

//router
app.use('/admin', admin);
app.use('/alumno', alumno);




app.get('/base', (request, response) => {
  //var resp = (db.query('INSERT INTO alumnos(padron, apellido, nombre, prioridad) VALUES($1, $2, $3, $4)', ['87654321', 'martinez', 'mariano', 76], function(){}));
  var resp;
  db.query("select * from alumnos", [], (err, res)=> {
  	resp = res.rows[0];
  	console.log(JSON.stringify(resp));
  	response.send(JSON.stringify(resp));
  });
  
  
});

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(PORT, function () {
  console.log('Servido escuchando en el puerto: ' + PORT);
});
