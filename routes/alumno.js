var router = require('express').Router();
var db = require('../db');
var separar = require('../auxiliares/separarValoresPuntoYComa');

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
        if (err) res.send('HUBO UN ERROR!');
        else if (resp_padron.rowCount != 0) res.send(resp_padron.rows[0]);
        else res.send({'prioridad':[]});
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
                            'vacantes': curso.cupos_disponibles,
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

//Recibe los cursos disponibles para una determinada materia.
router.get('/cursos/:id_materia',(req,res)=>{
    db.query('SELECT * FROM obtenerListadoDeCursosPorMateria($1)',[req.params.id_materia],(err,resp_cursos)=>{
        if (err) res.send('HUBO UN ERROR!');
        else if (resp_cursos.rowCount != 0) res.send({'cursos': resp_cursos.rows});
        else res.send({'cursos':[]});
    });
});

//Devuelve los cursos a los cuales se inscribio el alumno
router.get('/inscripciones/:padron',(req,res)=>{
    db.query('SELECT * FROM obtenerCursosDondeMeInscribi($1)',[req.params.padron],(err,resp_cursos)=>{
        if (err) res.send('HUBO UN ERROR!');
        else if (resp_cursos.rowCount != 0) res.send({'cursos':resp_cursos.rows});
        else res.send({'cursos':[]});
    });
});


//Inscribe al alumno que se identifica con el parametro "padron" al curso cuyo id es "id_curso".
//params: ?curso={id_curso}&padron={padron_alumno}
//Devuelve el estado de la inscripcion con un detalle
//ESTADOS POSIBLES:
/*
    -1 : IMPLICA UN ERROR EN LA BASE DE DATOS!
     1 : EL ALUMNO FUE INSCRIPTO EN EL CURSO QUE QUERIA DE FORMA REGULAR!
     2 : EL ALUMNO NO FUE INSCRIPTO YA QUE HAY MAS CURSOS PARA LA MATERIA DESEADA 
        (SE DEVUELVEN LOS CURSOS DISPONIBLES EN EL ITEM "cursos_disponibles")
     3 : SE CREA UN CURSO CONDICIONAL YA QUE NO HAY MAS VACANTES DISPONIBLES EN NINGUN CURSO
*/
router.post('/inscribir', (req, res) => {
    if (!req.query.curso || !req.query.padron) res.send({'estado':-1, 'detalles':'Faltan Datos para inscribir'});
    else{
        db.query('SELECT * FROM obtenerDatosDeInscripcionDelCurso($1)',[req.query.curso],(error,resp_curso)=>{
            if (error) res.send({'estado':-1, 'detalles':'error en la query del curso de la base'});
            else if (resp_curso.rowCount == 0) res.send({'estado':-1, 'detalles':'el curso no existe!'});
            else {
                //Chequeo las vacantes del curso donde se quiere inscribir el alumno
                var vacantes_disponibles = resp_curso.rows[0].vacantes;
                var regularesActuales = resp_curso.rows[0].regulares;
                var condicionales = resp_curso.rows[0].condicionales;
                var id_materia = resp_curso.rows[0].materia;
                if (vacantes_disponibles != 0){
                    //hay lugar para regulares todavia en este curso
                    regularesActuales++;
                    vacantes_disponibles--;
                    db.query('UPDATE cursos\
                    SET inscriptos = $1, cupos_disponibles = $2\
                    WHERE cursos.id_curso = $3',[regularesActuales,vacantes_disponibles,req.query.curso],(error,resp)=>{
                        if (error) res.send({'estado':-1, 'detalles':'error en la query de actualizar el curso en la base'})
                        db.query('INSERT INTO inscripciones VALUES ($1,$2,$3)',[req.query.padron,req.query.curso,true]);
                        res.send({'estado':1, 'detalles':'el alumno fue inscripto con exito!'});
                    });
                }
                else{
                    //Debo chequear si los otros cursos de la materia todavia tienen vacantes!
                    db.query('SELECT * FROM getOtrosCursosDeLaMismaMateria($1,$2)',[req.query.curso,id_materia],(error,resp_cursos)=>{
                        if (error) res.send({'estado':-1, 'detalles':'error en la query del curso de la base'});
                        else if (resp_cursos.rowCount != 0){
                            var todos_llenos = true;
                            var cursos_a_llenar = [];
                            (resp_cursos.rows).forEach(curso => {
                                if (curso.vacantes != 0) {
                                    todos_llenos = false;
                                    cursos_a_llenar.push(curso);
                                }
                            });
                            if(!todos_llenos){
                                //Todavia hay lugar en otros cursos para la misma materia, se devuelven los cursos que aun no estan llenos
                                res.send({'estado':2, 'detalles':'todavia hay cursos por llenar de la misma materia', 'cursos_disponibles':cursos_a_llenar});
                            }
                            else crearCursoCondicional(condicionales,id_materia,req.query.padron,req,res);
                        }else crearCursoCondicional(condicionales,id_materia,req.query.padron,req,res);
                    });
                }
            }
        });
    }
});
  
module.exports = router;

function crearCursoCondicional(condicionales,id_materia,padron_alumno,req,res) {
    condicionales++;
    db.query("INSERT INTO cursos VALUES (DEFAULT,$1, 'cond','.','.',10000,0,0,'.;.','.-.')",[id_materia],(error,resp)=>{
        if(error) res.send('HUBO UN ERROR CON LA BASE');
        else res.send({'estado':3, 'detalles':'se creo curso condicional'});
    });
}