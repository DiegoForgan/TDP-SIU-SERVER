var router = require('express').Router();
var db = require('../db');
var separar = require('../auxiliares/separarValoresPuntoYComa');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Se solicito %s en el endpoint /docente %s', req.method, req.url);
    next();
});


// ruta base del docente
router.get('/', function (req, res) {
    res.send('Bienvenido Docente!');
});

router.get('/cursos/:legajo', (req, res) => {
    console.log('Un docente esta consultado sus cursos');
    var legajo_del_docente = req.params.legajo;
    var listado_de_cursos_a_cargo = {
        'cursos': []
    };
    db.query('SELECT * FROM cursos WHERE $1 = cursos.docente_a_cargo', [legajo_del_docente], (error, respuesta) => {
        if (!error) {
            if (respuesta.rowCount != 0) {
                (respuesta.rows).forEach(curso => {
                    var nuevo_curso = {
                        'id_curso': curso.id_curso,
                        'codigo': curso.codigo,
                        'nombre': curso.nombre,
                        'sede': separar(curso.sede),
                        'aulas': separar(curso.aulas),
                        'cupos_totales': curso.cupos_disponibles,
                        'inscriptos': '0',
                        'condicionales': '0',
                        'dias': separar(curso.dias),
                        'horarios': separar(curso.horarios)
                    }
                    listado_de_cursos_a_cargo.cursos.push(nuevo_curso);
                });
                res.send(listado_de_cursos_a_cargo);
            } else {
                res.send({
                    'cursos': 'undefined'
                });
            }
        }
    });
});


module.exports = router;