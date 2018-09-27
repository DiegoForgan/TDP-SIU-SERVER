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

//params: ?usuario={nombre_de_usuario}&contrasena={contraseña}
app.get('/login',(req,res)=>{
  if (!req.query.usuario || !req.query.contrasena){
    res.send("Login mal realizado! Faltan datos!");
  }
  else {
    db.query('SELECT * FROM obtenerAlumnoConCredenciales($1,$2)',[req.query.usuario, req.query.contrasena],(error,resp_alumnos)=>{
      if (error) res.send ('Hubo un error!');
      else {
        if (resp_alumnos.rowCount == 0) {
          db.query('SELECT * FROM obtenerDocenteConCredenciales($1,$2)',[req.query.usuario, req.query.contrasena],(err,resp_docentes)=>{
            if (err) res.send ('Hubo un error!');
            else{
              if (resp_docentes.rowCount == 0) res.send({'tipo':'inexistente'});
              else{
                (resp_docentes.rows[0]).tipo = 2;
                res.send(resp_docentes.rows[0]);
              }
            }
          });
        }
        else {
          (resp_alumnos.rows[0]).tipo = 1;
          res.send(resp_alumnos.rows[0]);
        }
      }
    });
  }
});

app.listen(PORT, function () {
  console.log('Servido escuchando en el puerto: ' + PORT);
});
