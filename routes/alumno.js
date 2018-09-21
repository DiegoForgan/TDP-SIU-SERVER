var router = require('express').Router();
var db = require('../db');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Se solicito %s en el endpoint /alumno %s', req.method, req.url);
    next();
});

// ruta base de alumno
router.get('/', function (req, res) {
    res.send('Bienvenido alumno!');
});

// ruta para consultar prioridad del alumno con su padron
// Si el padron del alumno existe en la base de datos, devuelve un JSON con el campo prioridad y su valor
// Si el padron NO EXISTE en la base de datos, devuelve un JSON con el campo prioridad y valor "undefined"
router.get('/prioridad/:padron', function (req, res) {
    var padron_del_alumno = req.params.padron;
    console.log('Estas buscando la prioridad del alumno cuyo padron es: ' + padron_del_alumno);
    db.query('SELECT prioridad FROM alumnos WHERE padron = $1', [padron_del_alumno], (error, respuesta) => {
        if (!error) {
            if (respuesta.rowCount != 0) {
                res.send(respuesta.rows[0]);
            } else {
                res.send({
                    "prioridad": "undefined"
                });
            }
        }
    });
});
  
module.exports = router;