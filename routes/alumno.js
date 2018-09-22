var router = require('express').Router();
var db = require('../db');


function obtenerValoresComoArreglo(string_a_separar) {
    return (string_a_separar.trim()).split(";");
}

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

//Devuelve la oferta academica POR AHORA sin importar en que carrera estas inscripto.
router.get('/oferta', function (req, res) {
    console.log("Un alumno consulto la oferta academica");
    var JSON_de_salida = {
        'oferta': []
    };
    //TODO: Que filtre por carrera
    //ACA habria que agregar la condicion para que busque por carrera.
    db.query('SELECT * FROM cursos', [], (error, respuesta) => {
        if (!error) {
            if (respuesta.rowCount != 0) {
                (respuesta.rows).forEach(curso => {
                    var aulas = obtenerValoresComoArreglo(curso.aulas)
                    var sede = obtenerValoresComoArreglo(curso.sede);
                    var dias = obtenerValoresComoArreglo(curso.dias);
                    var horarios = obtenerValoresComoArreglo(curso.horarios);
                    //var nombre_docente = obtenerNombreAPartirDeLegajo(curso.docente_a_cargo);
                    var elemento = {
                        'codigo': curso.codigo,
                        'nombre': curso.nombre,
                        'docente': curso.docente_a_cargo,
                        'sede': sede,
                        'aulas': aulas,
                        'cupos': curso.cupos_disponibles,
                        'dias': dias,
                        'horarios': horarios
                    };
                    JSON_de_salida.oferta.push(elemento);
                });
                res.send(JSON_de_salida);
            } else {
                res.send({
                    'oferta': 'undefined'
                });
            }
        }
    });
});
  
module.exports = router;