module.exports = function(pool){
    pool.query("DROP FUNCTION IF EXISTS verTodosLosCursos();\
    \
    CREATE OR REPLACE FUNCTION verTodosLosCursos ()\
    RETURNS TABLE(id_materia int, codigo varchar(6), nombre varchar(40))\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT cursos.id_materia, cursos.codigo, cursos.nombre FROM cursos;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    pool.query("DROP FUNCTION IF EXISTS obtenerListadoDeMaterias();\
    \
    CREATE OR REPLACE FUNCTION obtenerListadoDeMaterias ()\
    RETURNS TABLE(id_materia int, codigo varchar(6), nombre varchar(40))\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT materias.id, materias.codigo, materias.nombre FROM materias;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    pool.query("DROP FUNCTION IF EXISTS obtenerListadoDeCursosPorMateria(id_consultada int);\
    \
    CREATE OR REPLACE FUNCTION  obtenerListadoDeCursosPorMateria (id_consultada int)\
    RETURNS TABLE(id_curso int,docente text,  sede varchar, aulas varchar, vacantes integer, dias varchar, horarios varchar)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT cursos.id_curso, docentes.apellido || ',' || docentes.nombre AS nombre_docente , cursos.sede, cursos.aulas,cursos.cupos_disponibles, cursos.dias, cursos.horarios\
        FROM cursos\
        INNER JOIN docentes ON cursos.docente_a_cargo = docentes.legajo\
        WHERE id_consultada = cursos.id_materia;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    pool.query("DROP FUNCTION IF EXISTS obtenerListadoDeAlumnosPorCurso(id_curso_consultado int);\
    \
    CREATE OR REPLACE FUNCTION  obtenerListadoDeAlumnosPorCurso (id_curso_consultado int)\
    RETURNS TABLE(padron varchar(10), apellido_y_nombre text,  prioridad int, es_regular boolean)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT alumnos.padron, alumnos.apellido || ',' || alumnos.nombre AS apellido_y_nombre, alumnos.prioridad, inscripciones.es_regular\
        FROM alumnos\
        INNER JOIN inscripciones ON alumnos.padron = inscripciones.padron\
        WHERE id_curso_consultado = inscripciones.id_curso;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    pool.query("DROP FUNCTION IF EXISTS obtenerPrioridadDelAlumno(padron_consultado text);\
    \
    CREATE OR REPLACE FUNCTION  obtenerPrioridadDelAlumno (padron_consultado text)\
    RETURNS TABLE(prioridad int)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT alumnos.prioridad\
        FROM alumnos\
        WHERE padron_consultado = alumnos.padron;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );
    pool.query("DROP FUNCTION IF EXISTS obtenerCursosDondeMeInscribi(padron_consultado text);\
    \
    CREATE OR REPLACE FUNCTION  obtenerCursosDondeMeInscribi (padron_consultado text)\
    RETURNS TABLE(codigo varchar(6), nombre varchar(40), docente varchar, sede varchar, aulas varchar, dias varchar, horarios varchar)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT cursos.codigo,cursos.nombre, cursos.docente_a_cargo , cursos.sede,cursos.aulas,cursos.dias,cursos.horarios\
        FROM inscripciones\
        INNER JOIN cursos ON cursos.id_curso = inscripciones.id_curso\
        WHERE padron_consultado = inscripciones.padron;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );
}


