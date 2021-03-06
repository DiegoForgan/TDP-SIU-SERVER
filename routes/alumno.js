var router = require('express').Router();
var db = require('../db');
var separar = require('../auxiliares/separarValoresPuntoYComa');
var SHA256 = require('crypto-js/sha256');

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
    db.query('SELECT * FROM obtenerPrioridadDelAlumno($1)',[req.params.padron],(err,resp_padron)=>{
        if (err) res.send(err);
        else if (resp_padron.rowCount != 0){
            console.log(resp_padron)
            var obj = [{
                'prioridad': resp_padron.rows[0].prioridad,
                'fecha_actualizacion': new Date(resp_padron.rows[0].f_update),
                'fecha_inicio': new Date(resp_padron.rows[0].fecha_inicio),
                'descripcion_periodo': resp_padron.rows[0].descripcion_periodo,
                'fechaInicioInscripcionCursadas': new Date(resp_padron.rows[0].fechainicioinscripcioncursadas),
                'fechaFinInscripcionCursadas': new Date(resp_padron.rows[0].fechafininscripcioncursadas),
                'fechaInicioDesinscripcionCursadas': new Date(resp_padron.rows[0].fechainiciodesinscripcioncursadas),
                'fechaFinDesinscripcionCursadas': new Date(resp_padron.rows[0].fechafindesinscripcioncursadas),
                'fechaInicioCursadas': new Date(resp_padron.rows[0].fechainiciocursadas),
                'fechaFinCursadas': new Date(resp_padron.rows[0].fechafincursadas),
                'fechaInicioFinales': new Date(resp_padron.rows[0].fechainiciofinales),
                'fechaFinFinales': new Date(resp_padron.rows[0].fechafinfinales),
                'encuestas': resp_padron.rows[0].encuestas,
            }];
            res.send(obj);  
        } 
        else res.send([{}]);
    });
});

//Devuelve la oferta academica.
//params: ?id_materia={id_materia}&filtro={filtro}&id_carrera={id_carrera}
router.get('/oferta/:padron', function (req, res) {
    console.log("Un alumno consulto la oferta academica");
    var listado = [];

    var padron = req.params.padron;

    var filtro, filtro2, filtro3;
    if (req.query.filtro){
        filtro = '%' + req.query.filtro + '%';
        filtro2 = req.query.filtro + '%';
        filtro3 = '% ' + req.query.filtro + '%';
    }else{
        filtro = '%%';
        filtro2 = '%%';
        filtro3 = '%%';
    }
    // envio materias
    if (!req.query.id_materia) {
        db.query("SELECT m.*\
                    FROM materias m\
                    INNER JOIN materias_carrera mc ON mc.id_materia = m.id AND mc.id_carrera = $5\
                    INNER JOIN alumnos a ON true\
                    INNER JOIN regexp_split_to_table(a.carrera, ';') carreraaux on cast(carreraaux as int) = mc.id_carrera\
                    WHERE a.padron = $1 AND (replace(m.codigo, '.', '') ilike $2 or m.codigo ilike $2 or m.nombre ilike $3 or m.nombre ilike $4)\
                        AND m.id not in (\
                            select m.id\
                            from inscripciones i\
                            inner join cursos c on c.id_curso = i.id_curso\
                            inner join materias m on m.id = c.id_materia\
                            where i.padron = $1\
                            \
                            UNION\
                            \
                            SELECT materias.id\
                            FROM historialacademico\
                            INNER JOIN materias ON materias.id = historialacademico.id_materia\
                            INNER JOIN materias_carrera mc ON mc.id_materia = materias.id AND mc.id_carrera = $5\
                            WHERE $1 = historialacademico.padron\
                        )\
                    ORDER BY m.nombre",
                [padron, filtro, filtro2, filtro3, req.query.id_carrera],
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
                            res.send(listado);
                        }else{
                            res.send([{}]);
                        }
                    }
                })
    }else{
        // envio cursos
        db.query("SELECT c.*, docentes.apellido || ', ' || docentes.nombre AS nombre_docente, p.descripcion as descripcion_periodo, row_number() over (order by c.id_curso asc) as nro_curso\
                 FROM cursos c\
                 INNER JOIN docentes ON docentes.legajo = c.docente_a_cargo\
                 INNER JOIN periodos p ON p.id = c.id_periodo\
                 WHERE docentes.apellido || ', ' || docentes.nombre ilike $2 and c.id_materia = $1 and p.activo\
                 ORDER BY c.id_curso ASC", [req.query.id_materia, filtro], (error, respuesta) => {
            if (!error) {
                if (respuesta.rowCount != 0) {
                    (respuesta.rows).forEach(curso => {
                        var elemento = {
                            'id': curso.id_curso,
                            'nro_curso': curso.nro_curso,
                            'docente': curso.nombre_docente,
                            'sede': separar(curso.sede),
                            'aulas': separar(curso.aulas),
                            'vacantes': curso.cupos_disponibles,
                            'dias': separar(curso.dias),
                            'horarios': separar(curso.horarios),
                            'periodo': curso.descripcion_periodo
                        };
                        listado.push(elemento);
                    });
                    res.send(listado);
                } else {
                    res.send([{}]);
                }
            }
        });
    }

});

//Devuelve los cursos a los cuales se inscribio el alumno
router.get('/inscripciones/:padron',(req,res)=>{
    db.query('SELECT * FROM obtenerCursosDondeMeInscribi($1)',[req.params.padron],(err,resp_cursos)=>{
        if (err) res.send('HUBO UN ERROR!');
        else if (resp_cursos.rowCount != 0) res.send({'cursos':resp_cursos.rows});
        else res.send({'cursos':[]});
    });
});

//Devuelve los finales a los cuales se inscribio el alumno
//Devuelve los finales asociados a una materia
//params: ?padron={padron del alumno}
//params: ?id_materia={id de la materia}
router.get('/finales',(req,res)=>{
    if (req.query.padron) obtenerFinalesALosQueMeInscribi(req, res);
    else if (req.query.id_materia) obtenerFinalesDeLaMateria(req, res);
    else {res.send({'finales':[]})}
});

function obtenerFinalesALosQueMeInscribi(req, res) {
    db.query('SELECT * FROM obtenerFinalesDondeMeInscribi($1)', [req.query.padron], (err, resp_finales) => {
        console.log(resp_finales.rows);
        if (err) {
            console.log(err);
            res.send({ 'finales': [] });
        }
        else if (resp_finales.rowCount != 0)
            res.send({ 'finales': resp_finales.rows });
        else
            res.send({ 'finales': [] });
    });
}

function obtenerFinalesDeLaMateria(req, res) {
    db.query('SELECT * FROM obtenerFinalesDeLaMateria($1)', [req.query.id_materia], (error, oferta_finales)=>{
        if (error){
            console.log(error);
            res.send({'finales':[]});
        }
        else if (oferta_finales.rowCount == 0){
            res.send({'finales':[]});
        }
        else{
            res.send({'finales': oferta_finales.rows});
        }
    });
}


//Inscribe al alumno que se identifica con el parametro "padron" al curso cuyo id es "id_curso"
// o al final cuyo id es "id_final"
//params: ?curso={id_curso}&padron={padron_alumno} para inscripcion a CURSOS
//params: ?final={id_final}&padron={padron_alumno}&es_regular={regularOlibre} para inscripcion a FINALES
//Devuelve el estado de la inscripcion con un detalle
//ESTADOS POSIBLES:
/*
    -1 : IMPLICA UN ERROR EN LA BASE DE DATOS!
     1 : EL ALUMNO FUE INSCRIPTO EN EL CURSO QUE QUERIA DE FORMA REGULAR!
     2 : EL ALUMNO NO FUE INSCRIPTO YA QUE HAY MAS CURSOS PARA LA MATERIA DESEADA 
*/
router.post('/inscribir', (req, res) => {
    if (req.query.curso && req.query.padron) inscribirACurso(req, res);
    else if (req.query.final && req.query.padron && req.query.es_regular) inscribirAFinal(req,res);
    else res.send({'estado':-1, 'detalles':'Faltan parametros en el endpoint!'});
});


//ruta que desinscribe a un alumno de un curso o un final
//PRE CONDICION: EL PERIODO DE DESINSCRIPCION ES EL CORRECTO
//params: ?curso={id_curso}&padron={nro_padron} para CURSOS
//params: ?final={id_final}&padron={nro_padron} para FINALES
router.delete('/desinscribir',(req,res)=>{
    if (req.query.curso && req.query.padron) desinscribirDeUnCurso(req,res);
    else if (req.query.final && req.query.padron) desinscribirDeUnFinal(req,res);
    else res.send({'estado':false, 'detalle':'faltan parámetros en el endpoint!'});
});


//editar datos /perfil?padron=95812&mail=francoetcheverri@gmail.com&pswactual=12345&pswnueva=1234556
// 1- cambio mail
// 2- cambio mail y contra
// 3- cambio contra
// 4- la contra es incorrecta
router.put('/perfil', (req, res) =>{
    if (req.query.padron){
        db.query('SELECT alumnos.usuario \
        FROM alumnos \
        WHERE alumnos.padron = $1',[req.query.padron],(error,usuarioEncontrado) => {
            if (error) {
                console.log(error);
                res.send({
                    'result': 4
                });
            }
            else if (usuarioEncontrado.rowCount == 0) {
                res.send({
                    'result': 4
                });
            }
            else{
                var actual = null;
                var actual_encriptada = null;
                var nueva = null;
                var nueva_encriptada = null;

                if (req.query.pswactual && req.query.pswnueva) {
                    actual = usuarioEncontrado.rows[0].usuario+req.query.pswactual;
                    actual_encriptada = (SHA256(actual)).toString();

                    nueva = usuarioEncontrado.rows[0].usuario+req.query.pswnueva;
                    nueva_encriptada = (SHA256(nueva)).toString();
                }
                
                db.query('SELECT editarDatosAlumno($1, $2, $3, $4)', 
                [req.query.padron, req.query.mail, actual_encriptada, nueva_encriptada], 
                (err, response)=>{
                    if (!err) {
                        res.send({
                            'result': response.rows[0].editardatosalumno
                        }); 
                    }
                });
            }
        });
    }
    else{
        res.send('No mandaste el padron!');
    }
});

//params: ?padron={padron del alumno}&id_carrera={id_carrera}
router.get('/historial', (req, res) =>{
    if (!req.query.padron || !req.query.id_carrera) {
        res.send([{}]);
    }
    else{
        db.query('SELECT * FROM gethistorialdelalumno ($1, $2)',[req.query.padron, req.query.id_carrera],(error,historial)=>{
            if (error) {
                console.log(error);
                res.send([{}]);
            }
            else if (historial.rowCount == 0){
                res.send([{}]);
            }
            else{
                res.send(historial.rows);
            }
        })
    }
});

//params: ?padron={padron del alumno}&id_carrera={id_carrera}
router.get('/creditos', (req, res) =>{
    if (!req.query.padron || !req.query.id_carrera) {
        console.log("no mando el padron o carrera!");
        res.send({
            'creditos_totales': '0',
            'creditos_obtenidos': '0',
            'porcentaje': '0.00'
        });
    }
    else {
        db.query('SELECT * FROM getcreditosdelacarrera($1, $2)',[req.query.padron, req.query.id_carrera],(error,creditos_totales)=>{
            if (error){
                console.log(error);
                res.send({
                    'creditos_totales': '0',
                    'creditos_obtenidos': '0',
                    'porcentaje': '0.00'
                });
            }
            else{
                var creditos_totales = creditos_totales.rows[0].creditos_totales;
                
                db.query('SELECT * FROM getcreditosobtenidos($1, $2)',[req.query.padron, req.query.id_carrera],(error,avance)=>{
                    if (error){
                        console.log(error);
                        res.send({
                        'creditos_totales': '0',
                        'creditos_obtenidos': '0',
                        'porcentaje': '0'
                        });
                    }
                    else{
                        if (avance.rowCount == 0) creditos_obtenidos = 0;
                        else creditos_obtenidos = avance.rows[0].creditos_obtenidos;
                        
                        var porcentaje = (creditos_obtenidos/creditos_totales)*100;
                        res.send({
                            'creditos_totales': creditos_totales.toString(),
                            'creditos_obtenidos': creditos_obtenidos.toString(),
                            'porcentaje': (porcentaje.toFixed(2)).toString()
                        }); 
                    }
                })
            }
        })
    }
});


//params: ?padron={padron del alumno}
router.get('/regular', (req, res) =>{
    if (!req.query.padron) {
        console.log("no mando el padron!");
        res.send({});
    }
    else {
        db.query('SELECT esRegular($1)',[req.query.padron],(error,response)=>{
            if (error){
                console.log(error);
                res.send({});
            }
            else{
                res.send({
                    'es_regular': response.rows[0].esregular
                })
            }
        })
    }
});

//params: ?padron={padron del alumno}
router.get('/encuestas', (req, res) =>{
    if (!req.query.padron) {
        console.log("no mando el padron!");
        res.send([{}]);
    }
    else {
        db.query('SELECT * FROM getEncuestas($1)',[req.query.padron],(error,response)=>{
            if (error){
                console.log(error);
                res.send({});
            }
            else{
                var listado = [];
                if (response.rowCount != 0) {
                    (response.rows).forEach(encuesta => {
                        var elemento = {
                            'id': encuesta.id_materia,
                            'codigo': encuesta.codigo,
                            'nombre': encuesta.nombre,
                        };
                        listado.push(elemento);
                    });
                    res.send(listado);
                } else {
                    res.send([{}])
                }
            }
        })
    }
});

//params: ?padron={padron del alumno}&id_materia={id}&respuesta={respuesta}
router.post('/encuestas', (req, res) =>{
    if (!req.query.padron && !req.query.repsuesta) {
        console.log("no mando el padron o respuesta!");
        res.send("error");
    }
    else {
        db.query('UPDATE historialacademico\
                    SET completo_encuesta = true,\
                        resultados_encuesta = $3\
                    WHERE padron = $1 and id_materia = $2',[req.query.padron, req.query.id_materia, req.query.respuesta],(error,response)=>{
            if (error){
                console.log(error);
                res.send("error");
            }
            else{
                    res.send("ok");
                }             
        })
    }
});
  
module.exports = router;




function desinscribirDeUnFinal(req,res){
    db.query('SELECT * FROM inscripcionesfinal WHERE inscripcionesfinal.padron = $1 AND inscripcionesfinal.id_final = $2',
    [req.query.padron, req.query.final],(error,inscipcionExistente)=>{
        if (error) {
            res.send({
                'estado': false,
                'detalle': 'Hubo un error con la base de datos!'
            })
        }
        else if (inscipcionExistente.rowCount == 0){
            res.send({
                'estado': false,
                'detalle': 'No estas inscripto en este final!'
            })
        }else{
            db.query('DELETE FROM inscripcionesfinal\
            WHERE inscripcionesfinal.padron = $1 AND inscripcionesfinal.id_final = $2',
            [req.query.padron, req.query.final]);
            res.send({
                'estado': true,
                'detalle': 'Te desinscribiste de forma exitosa!'
            })
        }
    })
}

function inscribirAFinal(req, res) {
    db.query('SELECT * FROM examenesfinales WHERE examenesfinales.id_final = $1',[req.query.final],(err,existenciaDeFinal)=>{
        if (err) {
            res.send({
                'estado': false,
                'detalle': 'Hubo un error con la query de la base!'
            })
        }else if (existenciaDeFinal.rowCount == 0){
            res.send({
                'estado': false,
                'detalle': 'El final al que te queres inscribir no existe!'
            })
        }else{
            db.query('SELECT * FROM inscripcionesfinal WHERE inscripcionesfinal.padron = $1 AND inscripcionesfinal.id_final = $2',
            [req.query.padron,req.query.final],(error,finalInscripto)=>{
                if (error) { 
                    res.send({'estado':false, 'detalle':'hubo un error en la query de la base'});
                }
                else if (finalInscripto.rowCount != 0){
                    res.send({'estado':false, 'detalle':'Ya se encuentra inscripto a ese final'});
                }
                else{
                    db.query('INSERT INTO inscripcionesfinal (padron, id_final, es_regular) VALUES ($1,$2,$3)'
                    ,[req.query.padron,req.query.final,req.query.es_regular]);
                    res.send({'estado':true, 'detalle':'Inscripcion exitosa!'});
                }
            })
        }

    })
}

//Se supone que aca nunca va a elegir un curso al que no este inscripto ya que previamente ve sus inscripciones.
//Por ese motivo no verifica eso previamente
function desinscribirDeUnCurso(req, res) {
    db.query('DELETE FROM inscripciones\
        WHERE inscripciones.id_curso = $1 AND inscripciones.padron = $2', [req.query.curso, req.query.padron]);
    res.send({ 'estado': true });
}

function inscribirACurso(req, res) {
    db.query('SELECT * FROM getDatosDeInscripcion($1)', [req.query.curso], (error, resp_curso) => {
        if (error)
            res.send(error); //{'estado':-1, 'detalles':'error en la query del curso de la base'});
        else {
            //Chequeo las vacantes del curso donde se quiere inscribir el alumno
            var vacantes_disponibles = resp_curso.rows[0].vacantes;
            var condicionales = resp_curso.rows[0].condicionales;
            var id_materia = resp_curso.rows[0].materia;
            var es_inscripcion_regular = true;
            var estado_inscripcion = resp_curso.rows[0].legajo;
            if (estado_inscripcion == 'cond')
                es_inscripcion_regular = false;
            if (vacantes_disponibles > 0) {
                vacantes_disponibles--;
                db.query('INSERT INTO inscripciones VALUES ($1,$2,$3)', [req.query.padron, req.query.curso, es_inscripcion_regular]);
                res.send({ 'estado': 1, 'detalles': 'el alumno fue inscripto con exito!' });
                //Veo si con esta inscripcion se lleno este curso y por lo tanto debo ver los otros.
                if (vacantes_disponibles == 0) {
                    //Debo chequear si los otros cursos de la materia todavia tienen vacantes!
                    db.query('SELECT * FROM vacantesDeLaMateria($1)', [id_materia], (error, resp_cursos) => {
                        if (error)
                            res.send({ 'estado': -1, 'detalles': 'error en la query del curso de la base' });
                        else if (resp_cursos.rowCount == 0 || resp_cursos.rows[0].restantes <= 0) {
                            //No hay mas opcion que crear el curso condicional para los proximos alumnos!
                            console.log('creamos el condicional porque el proximo lo necesita!');
                            crearCursoCondicional(condicionales, id_materia, req.query.padron, req, res);
                        }
                    });
                }
            }
            else {
                //Debo chequear si los otros cursos de la materia todavia tienen vacantes!
                db.query('SELECT * FROM vacantesDeLaMateria($1)', [id_materia], (error, resp_cursos) => {
                    if (error)
                        res.send({ 'estado': -1, 'detalles': 'error en la query del curso de la base' });
                    else if (resp_cursos.rowCount == 0 || resp_cursos.rows[0].restantes > 0) {
                        console.log('Hay mas cursos para llenar!');
                        res.send({ 'estado': 2, 'detalles': 'Todavia quedan cursos de la materia por llenar!' });
                    }
                    else {
                        //No hay mas opcion que crear el curso condicional para los proximos alumnos!
                        console.log('se creo el curso condicional!');
                        crearCursoCondicional(condicionales, id_materia, req.query.padron, req, res);
                    }
                });
            }
        }
    });
}

function crearCursoCondicional(condicionales,id_materia,padron_alumno,req,res) {
    condicionales++;
    db.query("INSERT INTO cursos VALUES (DEFAULT,$1, 'cond','.','.',10000,'.;.','.-.',2)",[id_materia]);
}