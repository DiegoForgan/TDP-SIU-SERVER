var router = require('express').Router();
const db = require('../db');

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
	db.query("INSERT INTO alumnos(padron, apellido, nombre, usuario, contrasena, prioridad)\
			VALUES($1, $2, $3, $4, $5, $6)", 
			[alumno.padron, alumno.apellido, alumno.nombre, alumno.usuario, alumno.contrasena, alumno.prioridad]);
  
  }
  res.send("ok");
});

//carga docentes
router.post('/docentes', (req, res) => {
    db.query("TRUNCATE TABLE docentes");
    for (var i = 0; i < req.body.listaDocentes.length; i++) {
        var docente = req.body.listaDocentes[i]
        db.query("INSERT INTO docentes(legajo, apellido, nombre, usuario, contrasena)\
        		VALUES($1, $2, $3, $4, $5)", 
        		[docente.legajo, docente.apellido, docente.nombre, docente.usuario, docente.contrasena]);

        }
    res.send("ok");
});

//carga cursos
router.get('/cursos', (req, res) => {
    db.query("SELECT c.*, d.apellido || ', ' || d.nombre as nombre_docente FROM cursos c\
    		INNER JOIN docentes d ON d.legajo = c.docente_a_cargo", null, (err, response)=>{
        res.send(response.rows);
    })
});

router.post('/cursos/', (req, res) => {
    console.log(req.body)
    db.query('INSERT INTO cursos(dias, aulas, sede, docente_a_cargo)\
                VALUES($1, $2, $3, $4)', [req.body.dias, req.body.aulas, req.body.sedes, req.body.docente]);
    res.send("ok");
});

router.put('/cursos/:id', (req, res) => {
    console.log(req.body)
    db.query('UPDATE cursos\
                SET dias = $2, aulas = $3, sede = $4, docente_a_cargo = $5\
                WHERE id_curso = $1', [req.params.id, req.body.dias, req.body.aulas, req.body.sedes, req.body.docente]);
    res.send("ok");
});

router.delete('/cursos/:id', (req, res) => {
    db.query("DELETE FROM cursos WHERE id_curso = $1", [req.params.id]);
    res.send("ok");
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
            ORDER BY aula;", null, (err, response)=>{
                                    res.send(response);
                                }
    )
})

module.exports = router;