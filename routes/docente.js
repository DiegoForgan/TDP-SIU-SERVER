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

//Se debe aclarar el id_final para poder eliminarlo de la tabla
//No chequea si la fecha existe
router.delete('/finales', (req,res)=>{
    if(!req.query.final) res.send({'estado':false});
    else{
        db.query('DELETE FROM examenesfinales\
        WHERE examenesfinales.id_final = $1',[req.query.final]);
        res.send({'estado':true});
    }
});

//Obtiene las fechas de final asociadas a un curso en particular
router.get('/finales/:id_curso', (req,res)=>{
    if(!req.params.id_curso) res.send({'fechas':[]});
    else{
        db.query('SELECT * FROM getFinalesDeUnCurso($1)',[req.params.id_curso],(error,fechas_obtenidas)=>{
            if (error) {
                console.log(error);
                res.send({'fechas':[]});
            }
            else{
                if (fechas_obtenidas.rowCount == 0) res.send({'fechas':[]});
                else res.send({'fechas':fechas_obtenidas.rows});
            }
        })
    }
});

router.get('/periodos', (req, res) =>{
    db.query('SELECT * FROM periodos where activo',[],(err,resp_periodos)=>{
        if (err) res.send(err);
        else if (resp_periodos.rowCount != 0){
            var obj = [{
                'id': resp_periodos.rows[0].id,
                'descripcion_periodo': resp_periodos.rows[0].descripcion,
                'fechaInicioInscripcionCursadas': new Date(resp_periodos.rows[0].fechainicioinscripcioncursadas),
                'fechaFinInscripcionCursadas': new Date(resp_periodos.rows[0].fechafininscripcioncursadas),
                'fechaInicioDesinscripcionCursadas': new Date(resp_periodos.rows[0].fechainiciodesinscripcioncursadas),
                'fechaFinDesinscripcionCursadas': new Date(resp_periodos.rows[0].fechafindesinscripcioncursadas),
                'fechaInicioCursadas': new Date(resp_periodos.rows[0].fechainiciocursadas),
                'fechaFinCursadas': new Date(resp_periodos.rows[0].fechafincursadas),
                'fechaInicioFinales': new Date(resp_periodos.rows[0].fechainiciofinales),
                'fechaFinFinales': new Date(resp_periodos.rows[0].fechafinfinales)
            }];
            console.log(obj)
            res.send(obj);  
        } 
        else res.send([{}]);
    });
});


module.exports = router;