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
    db.query('SELECT * FROM verCursosAMiCargo($1)',[req.params.legajo],(err,resp_cursos)=>{
        if (err) res.send('HUBO UN ERROR!');
        else if (resp_cursos.rowCount != 0){
            res.send({'cursos': resp_cursos.rows});
        }
        else{
            res.send({
                'cursos': 'undefined'
            });
        }
    });
});

router.get('/inscriptos/:id_curso',(req,res)=>{
    db.query('SELECT * FROM obtenerListadoDeAlumnosPorCurso($1)',[req.params.id_curso],(err,resp_cursos)=>{
        if (err) res.send('HUBO UN ERROR!');
        else if (resp_cursos.rowCount != 0) res.send({'inscriptos': resp_cursos.rows});
        else res.send({'inscriptos':[]});
    });
});


module.exports = router;