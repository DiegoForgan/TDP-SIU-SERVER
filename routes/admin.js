var router = require('express').Router();
const db = require('../db');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Middleware says %s %s', req.method, req.url);
	next();
});

router.post('/alumnos', (req, res) => {
  var resp;
  db.query("TRUNCATE TABLE alumnos");
  for (var i = 0; i < req.body.listaAlumnos.length; i++) {
  	var alumno = req.body.listaAlumnos[i]
  	db.query("INSERT INTO alumnos(padron, apellido, nombre, usuario, contrasena, prioridad)\
  			VALUES($1, $2, $3, $4, $5, $6)", 
  			[alumno.padron, alumno.apellido, alumno.nombre, alumno.usuario, alumno.contrasena, alumno.prioridad]);
  
  }
  res.send("ok");
});

module.exports = router;