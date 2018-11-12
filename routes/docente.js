var router = require('express').Router();
var db = require('../db');
var fb = require('../firebase');
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

//params: ?id_final={id_final}
router.put('/finales', (req,res)=>{
    if(!req.query.id_final) res.send({'estado':false});
    else{
        db.query('select * from cerrarFinal($1)',[req.query.id_final],
            (err, response)=>{
                if(!err){
                    var date = new Date(response.rows[0].fecha);
                    var date = date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
                    
                    var titulo = "Final Cerrado";
                    
                    var texto = "Se ha cerrado el final de la materia " + response.rows[0].codigo + " - " + response.rows[0].nombre + " del día " + date
                    
                    var topic = "final" + req.query.id_final;
                    
                    fb.notificar(titulo, texto, topic)
                    res.send({'estado':true});
                }else{
                    console.log(err);
                    res.send({'estado':false});
                }
            }
        );
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

//editar datos /perfil?legajo=95812&mail=francoetcheverri@gmail.com&pswactual=12345&pswnueva=1234556
// 1- cambio mail
// 2- cambio mail y contra
// 3- cambio contra
// 4- la contra es incorrecta
router.put('/perfil', (req, res) =>{
    if (req.query.legajo){
        db.query('SELECT editarDatosDocente($1, $2, $3, $4)', 
            [req.query.legajo, req.query.mail, req.query.pswactual, req.query.pswnueva], 
            (err, response)=>{
                if(!err){
                    res.send({
                        'result': response.rows[0].editardatosdocente
                    });
                }
                
            }
        );
    }
});

// alumno?padron={padron_del_alumno}
router.get('/alumno', (req, res) =>{
    if (req.query.padron){
        db.query("SELECT alumnos.padron, alumnos.apellido, alumnos.nombre as nombre, alumnos.prioridad, carreras.nombre as carrera, alumnos.email\
                    FROM alumnos\
                    INNER JOIN regexp_split_to_table(alumnos.carrera, ';') carreraaux on true\
                    INNER JOIN carreras ON cast(carreraaux as int) = carreras.id_carrera\
                    WHERE alumnos.padron = $1", 
                [req.query.padron],
                (err, response) => {
                    if(!err){
                        var carreras_del_alumno = '';
                        (response.rows).forEach(elemento => {
                            carreras_del_alumno += elemento.carrera + ",";
                        });
                        carreras_del_alumno = carreras_del_alumno.slice(0,-1);
                        carreras_del_alumno = carreras_del_alumno.trim();
                        carreras_del_alumno = carreras_del_alumno.split(",");
                        res.send(
                        {
                            'padron': response.rows[0].padron, 
                            'apellido': response.rows[0].apellido, 
                            'nombre': response.rows[0].nombre, 
                            'prioridad': response.rows[0].prioridad, 
                            'carrera': carreras_del_alumno, 
                            'email': response.rows[0].email
                        })
                    }
                });
    }
    else{
        res.send(
            {
                'padron': "", 
                'apellido': "", 
                'nombre': "", 
                'prioridad': -1, 
                'carrera': [], 
                'email': ""
            });
    }
});

// /condicional?id_curso={id_curso}
router.put('/condicional', (req, res)=>{
    if (req.body.padrones && req.query.id_curso){
        req.body.padrones.forEach(padron => {
            db.query('SELECT aceptarCondicionales($1, $2)', 
            [padron, req.query.id_curso])
        });
        res.send({'result':true});
    }
    else{
        res.send({'result':false});
    }
});

//params ?id_final={id}
router.get('/inscriptos',(req,res)=>{
    if (!req.query.id_final){
        console.log ('No hay ID de final!');
        res.send({'inscriptos':[]});
    }
    else{
       db.query('SELECT * FROM getInscriptosFinal($1)',[req.query.id_final],(error,inscriptos)=>{
           if (error) {
               console.log(error);
               res.send({'inscriptos':[]});
           }
           else if (inscriptos.rowCount == 0) {
               res.send({'inscriptos':[]});
           }
           else{
               res.send({'inscriptos':inscriptos.rows});
           }
       }) 
    }
});


router.get('/condicionales',(req,res)=>{
    if (req.query.id_curso){
        db.query('SELECT * FROM getcondicionalesdelamateria($1)',[req.query.id_curso],(error,listado)=>{
            if (error) {
                console.log(error);
                res.send({'condicionales':[]});
            }
            else if (listado.rowCount == 0) {
                res.send({'condicionales':[]});
            }
            else{
                res.send({'condicionales':listado.rows});
            }
        })
    }
    else{
        res.send({'condicionales':[]});
    }
});

//params id_final={id_final}
router.post('/notas',(req,res)=>{
    if (req.query.id_final){
        db.query('SELECT * FROM getInfoDeFinal($1)',[req.query.id_final],(error,informacion)=>{
            if (error) {
                console.log(error);
                res.send('HUBO UN ERROR!');
            }
            else{
                var listado_de_notas = JSON.parse(req.body.notas);
                listado_de_notas.forEach(alumno => {
                    if ((alumno.nota == 'D') || (alumno.nota == 'd')){
                        db.query('UPDATE inscripcionesfinal\
                        SET nota_del_final = $1\
                        WHERE id_final = $2 and padron = $3',[2,req.query.id_final,alumno.padron]);
                        cargarNota(alumno.padron, 2, informacion);
                    }
                    //Aca habria que ver que hacer con los ausentes!
                    else if ((alumno.nota == 'A') || (alumno.nota == 'a')){
                        db.query('UPDATE inscripcionesfinal\
                        SET nota_del_final = $1\
                        WHERE id_final = $2 and padron = $3',[-1,req.query.id_final,alumno.padron]);
                    }
                    else{
                        db.query('UPDATE inscripcionesfinal\
                        SET nota_del_final = $1\
                        WHERE id_final = $2 and padron = $3',[alumno.nota,req.query.id_final,alumno.padron]);
                        cargarNota(alumno.padron, alumno.nota, informacion);
                    }  
                });
                res.send({"notas":listado_de_notas});
            }
        })
    }
    else{
        res.send('Faltan valores en el endpoint!');
    }
});


module.exports = router;

function cargarNota(padron, nota, informacion) {
    db.query('INSERT INTO historialacademico (padron, id_materia, nota, fecha, completo_encuesta, resultados_encuesta)\
    VALUES ($1,$2,$3,$4,$5,$6)', [padron, informacion.rows[0].id_materia, nota, informacion.rows[0].fecha, false, null]);
}
