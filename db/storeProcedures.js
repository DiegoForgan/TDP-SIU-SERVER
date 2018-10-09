module.exports = function(pool){
    
    
    //AGUSTIN: ACA ES LA FUNCION QUE NO SE COMO RESOLVER, PORQUE NO SE COMO DEVOLVER LAS VACANTES, LOS REGULARES Y LOS CONDICIONALES DE CADA CURSO EN UNA SOLA QUERY.
    
    //Esta query devuelve los cursos existentes a cargo del docente en la base de datos
    pool.query("DROP FUNCTION IF EXISTS verCursosAMiCargo(legajo_del_docente varchar(10));\
    \
    CREATE OR REPLACE FUNCTION verCursosAMiCargo(legajo_del_docente varchar(10))\
    RETURNS TABLE(id_curso int, codigo varchar(6),nombre varchar(40), vacantes int, regulares int, condicionales int, alumnos_totales int)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT cursos.id_curso, materias.codigo, materias.nombre,\
        cursos.cupos_disponibles, cursos.inscriptos, cursos.condicionales,\
        cursos.inscriptos + cursos.condicionales\
        FROM cursos\
        INNER JOIN materias ON cursos.id_materia = materias.id\
        INNER JOIN inscripciones ON cursos.id_curso = inscripciones.id_curso\
        WHERE legajo_del_docente = cursos.docente_a_cargo\
        ORDER BY materias.codigo ASC;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    //Esta funcion devuelve el listado de alumnos de un determinado curso
    //TODO: Que ordene a los regulares primero
    pool.query("DROP FUNCTION IF EXISTS obtenerListadoDeAlumnosPorCurso(id_curso_consultado int);\
    \
    CREATE OR REPLACE FUNCTION  obtenerListadoDeAlumnosPorCurso (id_curso_consultado int)\
    RETURNS TABLE(padron varchar(10), apellido_y_nombre text,  prioridad int, es_regular boolean)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT alumnos.padron, alumnos.apellido || ', ' || alumnos.nombre AS apellido_y_nombre, alumnos.prioridad, inscripciones.es_regular\
        FROM alumnos\
        INNER JOIN inscripciones ON alumnos.padron = inscripciones.padron\
        WHERE id_curso_consultado = inscripciones.id_curso\
        ORDER BY es_regular DESC, apellido_y_nombre ASC;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    //Esta funcion devuelve la prioridad del alumno a partir de su padron
    pool.query("DROP FUNCTION IF EXISTS obtenerPrioridadDelAlumno(padron_consultado text);\
    \
    CREATE OR REPLACE FUNCTION  obtenerPrioridadDelAlumno (padron_consultado text)\
    RETURNS TABLE(prioridad int, f_update timestamp, fecha_inicio timestamp, descripcion_periodo varchar, fecha_cierre timestamp)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT a.prioridad, a.f_update, pp.fecha_inicio, p.descripcion, p.fecha_cierre\
        FROM alumnos a\
        INNER JOIN prioridad_periodo pp ON pp.prioridad = a.prioridad\
        INNER JOIN periodos p ON p.id = pp.id_periodo\
        WHERE padron_consultado = a.padron and p.activo;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    //Esta consulta devuelve los cursos donde se inscribio el alumno
    pool.query("DROP FUNCTION IF EXISTS obtenerCursosDondeMeInscribi(padron_consultado text);\
    \
    CREATE OR REPLACE FUNCTION  obtenerCursosDondeMeInscribi (padron_consultado text)\
    RETURNS TABLE(codigo varchar(6), nombre varchar(40), docente text, sede varchar, aulas varchar, dias varchar, horarios varchar)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT materias.codigo,materias.nombre, docentes.apellido || ',' || docentes.nombre, cursos.sede,cursos.aulas,cursos.dias,cursos.horarios\
        FROM inscripciones\
        INNER JOIN cursos ON cursos.id_curso = inscripciones.id_curso\
        INNER JOIN materias ON materias.id = cursos.id_materia\
        INNER JOIN docentes ON docentes.legajo = cursos.docente_a_cargo\
        WHERE padron_consultado = inscripciones.padron\
        ORDER BY materias.codigo ASC;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    //Dado un usuario y contraseña de un alumno, devuelve sus datos.
    pool.query("DROP FUNCTION IF EXISTS obtenerAlumnoConCredenciales(usuario_consultado varchar(50),contrasena_consultada varchar(20));\
    \
    CREATE OR REPLACE FUNCTION  obtenerAlumnoConCredenciales (usuario_consultado varchar(50),contrasena_consultada varchar(20))\
    RETURNS TABLE(padron varchar(10), apellido varchar(200), nombre varchar(200), prioridad int, carrera int, email varchar(200))\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT alumnos.padron,alumnos.apellido, alumnos.nombre , alumnos.prioridad , alumnos.carrera, alumnos.email\
        FROM alumnos\
        WHERE usuario_consultado = alumnos.usuario AND contrasena_consultada = alumnos.contrasena;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    //Dado un usuario y contraseña de un docente, devuelve sus datos.
    pool.query("DROP FUNCTION IF EXISTS obtenerDocenteConCredenciales(usuario_consultado varchar(50),contrasena_consultada varchar(20));\
    \
    CREATE OR REPLACE FUNCTION  obtenerDocenteConCredenciales (usuario_consultado varchar(50),contrasena_consultada varchar(20))\
    RETURNS TABLE(legajo varchar(10), apellido varchar(200), nombre varchar(200), email varchar(200))\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT docentes.legajo,docentes.apellido, docentes.nombre, docentes.email\
        FROM docentes\
        WHERE usuario_consultado = docentes.usuario AND contrasena_consultada = docentes.contrasena;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    //Devuelve datos relevantes para saber si el alumno se puede inscribir al curso tales como: vacantes, inscriptos_regulares, inscriptos_condicionales y la materia.
    pool.query("DROP FUNCTION IF EXISTS getDatosDeInscripcion(id_consultada int);\
    \
    CREATE OR REPLACE FUNCTION  getDatosDeInscripcion(id_consultada int)\
    RETURNS TABLE(materia int, vacantes bigint, regulares bigint, condicionales bigint, legajo text)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT max(m.id),\
        max(c.cupos_disponibles) - sum(case when i.es_regular then 1 else 0 end),\
        sum(case when i.es_regular then 1 else 0 end), sum(case when not i.es_regular then 1 else 0 end),\
        max(c.docente_a_cargo)\
        FROM inscripciones i\
        INNER JOIN cursos c ON c.id_curso = i.id_curso\
        INNER JOIN materias m ON c.id_materia = m.id\
        WHERE i.id_curso = id_consultada\
        GROUP BY i.id_curso;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    pool.query("DROP FUNCTION IF EXISTS vacantesDeLaMateria(id_materia_consultada int);\
    \
    CREATE OR REPLACE FUNCTION  vacantesDeLaMateria(id_materia_consultada int)\
    RETURNS TABLE(restantes bigint)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT (select sum(cursos.cupos_disponibles) from cursos where cursos.id_materia = id_materia_consultada) - sum(case when i.es_regular then 1 else 0 end)\
        FROM inscripciones i\
        INNER JOIN cursos c ON c.id_curso = i.id_curso\
        INNER JOIN materias m ON c.id_materia = m.id\
        WHERE m.id = id_materia_consultada\
        GROUP BY m.id;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );
}


