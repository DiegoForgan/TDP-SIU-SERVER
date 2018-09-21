var router = require('express').Router();
var db = require('../db');

function crearJSON(prioridad_del_alumno) {
    var salida = {
        'prioridad': ''
    };
    salida.prioridad = prioridad_del_alumno;
    return salida;
}

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Middleware says %s %s', req.method, req.url);
    next();
});

// ruta base de alumno
router.get('/', function (req, res) {
    res.send('Bienvenido alumno!');
});

// ruta para consultar prioridad del alumno con su padron
router.get('/prioridad/:padron', function (req, res) {
    var padron_del_alumno = req.params.padron;
    console.log('Estas buscando la prioridad del alumno cuyo padron es: ' + padron_del_alumno);
    
    db.query('SELECT prioridad FROM alumnos WHERE padron = $1', [padron_del_alumno], (error, respuesta) => {
        if (!error) res.send(respuesta.rows[0]);
    });
});
  
module.exports = router;