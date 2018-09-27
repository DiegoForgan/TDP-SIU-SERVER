var router = require('express').Router();
var db = require('../db');
var separar = require('../auxiliares/separarValoresPuntoYComa');

/*//Funcion que recibe un string separado por ";" (punto y coma) y devuelve un arreglo con cada uno de los parametros.
function obtenerValoresComoArreglo(string_a_separar) {
    return (string_a_separar.trim()).split(";");
}*/

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
//params: ?id_materia={id_materia}&filtro={filtro}
router.get('/oferta/:padron', function (req, res) {
    console.log("Un alumno consulto la oferta academica");
    var listado = [];

    var padron = req.params.padron;

    var filtro;
    if (req.query.filtro){
        filtro = '%' + req.query.filtro + '%';
    }else{
        filtro = '%%';
    }
    console.log(filtro)
    // envio materias
    if (!req.query.id_materia) {
        db.query("SELECT m.*\
                    FROM materias m\
                    INNER JOIN materias_carrera mc ON mc.id_materia = m.id\
                    INNER JOIN alumnos a ON a.carrera = mc.id_carrera\
                    WHERE a.padron = $1 AND (m.codigo ilike $2 or m.nombre ilike $2)\
                    ORDER BY m.nombre",
                [padron, filtro],
                (error, respuesta) => {
                    if (!error) {
                        if (respuesta.rowCount != 0) {
                            (respuesta.rows).forEach(materia => {
                                var elemento = {
                                    'id': materia.id,
                                    'codigo': materia.codigo,
                                    'nombre': materia.nombre,
                                };
                                listado.push(elemento);
                            });
                            console.log(listado);
                            res.send(listado);
                        }else{
                            res.send([{}]);
                        }
                    }
                })
    }else{
        db.query("SELECT c.*, docentes.apellido || ',' || docentes.nombre AS nombre_docente\
                 FROM cursos c\
                 INNER JOIN docentes ON docentes.legajo = c.docente_a_cargo\
                 WHERE docentes.apellido || ',' || docentes.nombre ilike $2 and c.id_materia = $1\
                 ORDER BY c.id_curso ASC", [req.query.id_materia, filtro], (error, respuesta) => {
            if (!error) {
                if (respuesta.rowCount != 0) {
                    (respuesta.rows).forEach(curso => {
                        var elemento = {
                            'id': curso.id_curso,
                            'docente': curso.nombre_docente,
                            'sede': separar(curso.sede),
                            'aulas': separar(curso.aulas),
                            'cupos': curso.cupos_disponibles,
                            'dias': separar(curso.dias),
                            'horarios': separar(curso.horarios)
                        };
                        listado.push(elemento);
                    });
                    console.log(listado);
                    res.send(listado);
                } else {
                    res.send([{}]);
                }
            }
        });
    }

});


//Inscribe al alumno que se identifica con el parametro "padron" al curso cuyo id es "id_curso".
router.post('/inscribir/:id_curso/:padron', (req, res) => {
    var padron_del_alumno = req.params.padron;
    var curso_a_inscribir = req.params.id_curso;
    db.query('SELECT * FROM cursos WHERE $1 = cursos.id_curso', [curso_a_inscribir], (error, respuesta) => {
        if (!error) {
            if (respuesta.rowCount != 0) {
                var inscriptos = respuesta.rows[0].inscriptos;
                var capacidad = respuesta.rows[0].cupos_disponibles;
                var condicionales = respuesta.rows[0].condicionales;
                var es_regular = true;

                // verifica si se lleno la capacidad del curso.
                if (inscriptos == capacidad) {
                    condicionales++;
                    es_regular = false;
                } else {
                    inscriptos++;
                }
                //Actualiza la informacion de inscriptos y condicionales para el curso al cual se incribio el alumno.
                db.query('UPDATE cursos\
                SET inscriptos = $1, condicionales = $2\
                WHERE cursos.id_curso = $3', [inscriptos, condicionales, curso_a_inscribir], (err, resp) => {
                    //Agrega la informacion de inscripcion a la tabla de inscripciones.
                    db.query("INSERT INTO inscripciones (padron, id_curso, es_regular)\
                    VALUES ($1, $2, $3)", [padron_del_alumno, curso_a_inscribir, es_regular]);
                    res.send("INSCRIPCION OK!");
                });
            } else {
                res.send("INSCRIPCION FALLIDA! (No existe el curso al que te queres inscribir)")
            }
        }
    });
    console.log("Finalizo la operacion de inscripcion!");
});
  
module.exports = router;