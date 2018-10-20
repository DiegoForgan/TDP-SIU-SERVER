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
        if (err){
            console.log(err);
            res.send('HUBO UN ERROR!');
        }
        else if (resp_cursos.rowCount != 0){
            console.log(resp_cursos);
            res.send({'cursos': resp_cursos.rows}); 
        } 
        else res.send({'cursos': []});
    });
});

router.get('/inscriptos/:id_curso',(req,res)=>{
    db.query('SELECT * FROM obtenerListadoDeAlumnosPorCurso($1)',[req.params.id_curso],(err,resp_cursos)=>{
        if (err) res.send('HUBO UN ERROR!');
        else if (resp_cursos.rowCount != 0) res.send({'inscriptos': resp_cursos.rows});
        else res.send({'inscriptos':[]});
    });
});


//Se envia la informacion a traves de un JSON y por lo tanto obtengo los datos a traves de
//req.body.{id}
router.post('/finales', (req,res)=>{
    if(!req.body.id_curso || !req.body.fecha || !req.body.hora) res.send({'estado': false, 'id_final': null});
    else {
        db.query('INSERT INTO examenesfinales (id_curso, fecha_examen, horario_examen) VALUES($1,$2,$3) RETURNING id_final',[req.body.id_curso, req.body.fecha, req.body.hora],(err,resp)=>{
        if (err) res.send({'estado':false,'id_final': null});
        else res.send({'estado':true, 'id_final':resp.rows[0].id_final});
        });
    }
});


module.exports = router;