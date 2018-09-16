var router = require('express').Router();
var db = require('../db');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Middleware says %s %s', req.method, req.url);
    next();
});

// ruta base de alumno
router.get('/', function(req, res) {
    res.send('Bienvenido alumno!');
});

// ruta para consultar prioridad del alumno con su padron
router.get('/prioridad/:padron', function(req, res) {
    var padron_del_alumno = req.params.padron;
    //aca iria el codigo con la query a la tabla de alumnos sobre su prioridad
    var prioridad_del_alumno = Math.floor((Math.random() * 100) + 1); //esto calcula una prioridad random entre 1 y 100 de forma provisoria
    var string_de_respuesta = "Tu padron es: " + padron_del_alumno + " y tu prioridad es: " + prioridad_del_alumno;
    res.send(string_de_respuesta);
});
  
module.exports = router;