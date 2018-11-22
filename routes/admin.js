var router = require('express').Router();
const db = require('../db');
const fb = require('../firebase');
var SHA256 = require('crypto-js/sha256');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
	console.log('Middleware says %s %s', req.method, req.url);
	next();
});

// carga alumnos
router.post('/alumnos', (req, res) => {
  db.query("TRUNCATE TABLE alumnos");
  for (var i = 0; i < req.body.listaAlumnos.length; i++) {
	var alumno = req.body.listaAlumnos[i]
	db.query("INSERT INTO alumnos(padron, apellido, nombre, usuario, contrasena, prioridad, carrera, f_update, email)\
			VALUES($1, $2, $3, $4, $5, $6, $7, now(), $8)", 
			[alumno.padron, alumno.apellido, alumno.nombre, alumno.usuario, alumno.contrasena, alumno.prioridad, alumno.carrera, alumno.email], (err, response)=>{
                if (!err) {res.send("ok");}
                else res.send(err)  
            });
  
  }
});

//carga docentes
router.post('/docentes', (req, res) => {
    db.query("TRUNCATE TABLE docentes");
    for (var i = 0; i < req.body.listaDocentes.length; i++) {
        var docente = req.body.listaDocentes[i]
        db.query("INSERT INTO docentes(legajo, apellido, nombre, usuario, contrasena, email)\
        		VALUES($1, $2, $3, $4, $5, $6)", 
        		[docente.legajo, docente.apellido, docente.nombre, docente.usuario, docente.contrasena, docente.email], (err, response)=>{
                if (!err) {res.send("ok");}
                else res.send(err)  
            });

    }
});

//carga cursos
router.get('/cursos', (req, res) => {
    db.query("SELECT \
                c.id_curso,\
                c.sede,\
                c.aulas,\
                c.cupos_disponibles,\
                c.dias,\
                c.horarios,\
                d.legajo as docente_a_cargo,\
                d.apellido || ', ' || d.nombre as nombre_docente,\
                m.id as id_materia,\
                m.codigo,\
                m.nombre\
            FROM cursos c\
    		INNER JOIN docentes d ON d.legajo = c.docente_a_cargo\
            INNER JOIN materias m ON m.id = c.id_materia", null, (err, response)=>{
        res.send(response.rows);
    })
});

router.post('/cursos/', (req, res) => {
    db.query('INSERT INTO cursos(id_materia, docente_a_cargo, sede, aulas, cupos_disponibles, dias, horarios, id_periodo)\
                VALUES($1, $2, $3, $4, $5, $6, $7, $8)', [req.body.materia, req.body.docente, req.body.sedes, req.body.aulas, req.body.cupos, req.body.dias, req.body.horarios, 2], (err, response)=>{
        if (!err) {res.send("ok");}
        else res.send(err)  
    });
    
});

router.put('/cursos/:id', (req, res) => {
    db.query('UPDATE cursos\
                SET dias = $2, aulas = $3, sede = $4, docente_a_cargo = $5, cupos_disponibles = $6, id_materia = $7, horarios = $8\
                WHERE id_curso = $1', [req.params.id, req.body.dias, req.body.aulas, req.body.sedes, req.body.docente, req.body.cupos, req.body.materia, req.body.horarios], (err, response)=>{
        if (!err) {res.send("ok");}
        else res.send(err)  
    });
});

router.delete('/cursos/:id', (req, res) => {
    db.query("DELETE FROM cursos WHERE id_curso = $1", [req.params.id], (err, response)=>{
        if (!err) {res.send("ok");}
        else res.send(err)  
    });
});

//toda la info
router.get('/info', (req, res) => {
    db.query("SELECT\
                legajo as legajo,\
                apellido || ', ' || nombre as nombres\
            FROM docentes\
            ORDER BY nombres;\
            \
            SELECT\
                id as id,\
                aula as aula\
            FROM aulas\
            ORDER BY aula;\
            \
            SELECT\
                id,\
                codigo,\
                nombre\
            FROM materias\
            ORDER BY nombre;", null, (err, response)=>{
                                    res.send(response);
                                }
    )
});

//periodo beta
router.get('/periodoBETA', (req, res) => {
    db.query("SELECT \
                p.activo\
            FROM periodos p\
            WHERE p.id = 2", null, (err, response)=>{
        res.send(response.rows);
    })
});

router.put('/periodoBETA', (req, res) => {
    db.query("UPDATE periodos\
            SET activo = $1\
            WHERE id = 2", [req.body.activar], (err, response)=>{
        res.send("ok");
    })
});

//periodos
router.get('/periodoActual', (req, res) => {
    db.query("SELECT descripcion, activo\
            FROM periodos\
            ORDER BY id DESC\
            LIMIT 1", null, (err, response) => {
                res.send(response.rows);
            });
});
//para comit
router.post('/periodos', (req, res) => {
    db.query("SELECT guardarFechasPeriodos($1, $2, $3, $4, $5, $6, $7, $8, $9)",
            [req.body.periodo, req.body.fechaInicioInscripcionCursadas, req.body.fechaFinInscripcionCursadas,
             req.body.fechaInicioDesinscripcionCursadas, req.body.fechaFinDesinscripcionCursadas,
             req.body.fechaInicioCursadas, req.body.fechaFinCursadas,
             req.body.fechaInicioFinales, req.body.fechaFinFinales], (err, response)=>{
        res.send("ok");
    })
});

router.post('/notificaciones', (req, res) => {
    var titulo = new Date().toLocaleString() + " - " + req.body.titulo;
    var texto = req.body.texto;

    try {
        fb.notificar(titulo, texto, "all");
    } catch(e){
        res.status(500).send(e);
    } finally{
        res.send("ok");
    }
})

router.post('/login', (req, res) => {
    var usr = req.body.usr;
    var pwd = (SHA256(req.body.pwd)).toString();
    db.query("SELECT * from login($1, $2)",
            [usr, pwd], (err, response)=>{
            if (!err) {
                res.send({status: response.rows[0].status, role: response.rows[0].role});
            }else{
                res.send({status: 0, role: ""});
            }
    });
})

module.exports = router;