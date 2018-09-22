var router = require('express').Router();
var db = require('../db');

//Funcion que recibe un string separado por ";" (punto y coma) y devuelve un arreglo con cada uno de los parametros.
function obtenerValoresComoArreglo(string_a_separar) {
    return (string_a_separar.trim()).split(";");
}

//NO SE USA PORQUE FALLA POR ALGUN MOTIVO PERO LA IDEA ESTA!
function obtenerNombreAPartirDeLegajo(legajo_del_docente) {
    db.query('SELECT apellido,nombre FROM docentes WHERE legajo = $1', [legajo_del_docente], (error, respuesta) => {
        if (!error) {
            if (respuesta.rowCount != 0) {
                var apellido = respuesta.rows[0].apellido;
                var nombre = respuesta.rows[0].nombre;
                //console.log(apellido + "," + nombre);
                return (apellido + "," + nombre);
            }
        }
    });
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
                    //NO SE PORQUE NO FUNCIONA ESA FUNCION!!!!!!
                    //var nombre_docente = obtenerNombreAPartirDeLegajo(curso.docente_a_cargo);
                    var elemento = {
                        'codigo': curso.codigo,
                        'nombre': curso.nombre,
                        'docente': curso.docente_a_cargo,
                        'sede': obtenerValoresComoArreglo(curso.sede),
                        'aulas': obtenerValoresComoArreglo(curso.aulas),
                        'cupos': curso.cupos_disponibles,
                        'dias': obtenerValoresComoArreglo(curso.dias),
                        'horarios': obtenerValoresComoArreglo(curso.horarios)
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