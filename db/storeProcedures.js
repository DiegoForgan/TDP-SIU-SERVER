module.exports = function(pool){
    
    
    //AGUSTIN: ACA ES LA FUNCION QUE NO SE COMO RESOLVER, PORQUE NO SE COMO DEVOLVER LAS VACANTES, LOS REGULARES Y LOS CONDICIONALES DE CADA CURSO EN UNA SOLA QUERY.
    
    //Esta query devuelve los cursos existentes a cargo del docente en la base de datos
    pool.query("DROP FUNCTION IF EXISTS verCursosAMiCargo(legajo_del_docente varchar(10));\
    \
    CREATE OR REPLACE FUNCTION verCursosAMiCargo(legajo_del_docente varchar(10))\
    RETURNS TABLE(id_curso int, codigo varchar(6),nombre varchar(40), vacantes bigint, regulares bigint, condicionales bigint, alumnos_totales bigint)\
    AS $$\
    DECLARE\
    BEGIN\
    RETURN QUERY\
        SELECT \
            sumas.id_curso,\
            sumas.codigo,\
            sumas.nombre,\
            sumas.vacantes - sumas.regulares - sumas.condicionales as vacantes,\
            sumas.regulares,\
            sumas.condicionales,\
            sumas.regulares + sumas.condicionales as alumnos_totales\
        FROM (\
            SELECT \
                cursos.id_curso as id_curso,\
                materias.codigo as codigo,\
                materias.nombre as nombre,\
                cursos.cupos_disponibles as vacantes,\
                sum(case when es_regular then 1 else 0 end) as regulares,\
                sum(case when es_regular = false then 1 else 0 end) as condicionales\
            FROM cursos\
            INNER JOIN materias ON cursos.id_materia = materias.id\
            INNER JOIN inscripciones ON cursos.id_curso = inscripciones.id_curso\
            WHERE '0001' = cursos.docente_a_cargo\
            GROUP BY\
                cursos.id_curso,\
                materias.codigo,\
                materias.nombre,\
                cursos.cupos_disponibles\
            ORDER BY materias.codigo ASC\
            ) as sumas;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );

    pool.query("DROP FUNCTION IF EXISTS guardarFechasPeriodos(\
                    _periodo varchar,\
                    _fechaInicioInscripcionCursadas timestamp,\
                    _fechaFinInscripcionCursadas timestamp,\
                    _fechaInicioDesinscripcionCursadas timestamp,\
                    _fechaFinDesinscripcionCursadas timestamp,\
                    _fechaInicioCursadas timestamp,\
                    _fechaFinCursadas timestamp,\
                    _fechaInicioFinales timestamp,\
                    _fechaFinFinales timestamp);\
    \
    CREATE OR REPLACE FUNCTION guardarFechasPeriodos(\
                    _periodo varchar,\
                    _fechaInicioInscripcionCursadas timestamp,\
                    _fechaFinInscripcionCursadas timestamp,\
                    _fechaInicioDesinscripcionCursadas timestamp,\
                    _fechaFinDesinscripcionCursadas timestamp,\
                    _fechaInicioCursadas timestamp,\
                    _fechaFinCursadas timestamp,\
                    _fechaInicioFinales timestamp,\
                    _fechaFinFinales timestamp)\
    RETURNS void\
    AS $$\
    DECLARE\
    BEGIN\
        IF EXISTS (SELECT 1 FROM PERIODOS WHERE DESCRIPCION = _PERIODO AND ACTIVO)\
        THEN\
            UPDATE PERIODOS\
            SET \
                fechaInicioInscripcionCursadas = _fechaInicioInscripcionCursadas,\
                fechaFinInscripcionCursadas = _fechaFinInscripcionCursadas,\
                fechaInicioDesinscripcionCursadas = _fechaInicioDesinscripcionCursadas,\
                fechaFinDesinscripcionCursadas = _fechaFinDesinscripcionCursadas,\
                fechaInicioCursadas = _fechaInicioCursadas,\
                fechaFinCursadas = _fechaFinCursadas,\
                fechaInicioFinales = _fechaInicioFinales,\
                fechaFinFinales = _fechaFinFinales\
            WHERE DESCRIPCION = _PERIODO;\
        ELSE\
            UPDATE PERIODOS\
            SET activo = FALSE;\
            \
            INSERT INTO PERIODOS(descripcion,\
                activo,\
                fechaInicioInscripcionCursadas,\
                fechaFinInscripcionCursadas,\
                fechaInicioDesinscripcionCursadas,\
                fechaFinDesinscripcionCursadas,\
                fechaInicioCursadas,\
                fechaFinCursadas,\
                fechaInicioFinales,\
                fechaFinFinales)\
            VALUES (\
                _periodo,\
                TRUE,\
                _fechaInicioInscripcionCursadas,\
                _fechaFinInscripcionCursadas,\
                _fechaInicioDesinscripcionCursadas,\
                _fechaFinDesinscripcionCursadas,\
                _fechaInicioCursadas,\
                _fechaFinCursadas,\
                _fechaInicioFinales,\
                _fechaFinFinales);\
        END IF;\
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
    RETURNS TABLE(prioridad int, f_update timestamp, fecha_inicio timestamp, descripcion_periodo varchar, fechaInicioInscripcionCursadas timestamp,\
                    fechaFinInscripcionCursadas timestamp,\
                    fechaInicioDesinscripcionCursadas timestamp,\
                    fechaFinDesinscripcionCursadas timestamp,\
                    fechaInicioCursadas timestamp,\
                    fechaFinCursadas timestamp,\
                    fechaInicioFinales timestamp,\
                    fechaFinFinales timestamp)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT a.prioridad, a.f_update, pp.fecha_inicio, p.descripcion, p.fechaInicioInscripcionCursadas,\
                    p.fechaFinInscripcionCursadas,\
                    p.fechaInicioDesinscripcionCursadas,\
                    p.fechaFinDesinscripcionCursadas,\
                    p.fechaInicioCursadas,\
                    p.fechaFinCursadas,\
                    p.fechaInicioFinales,\
                    p.fechaFinFinales\
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
    RETURNS TABLE(id_curso int, codigo varchar(6), nombre varchar(40), docente text, sede varchar, aulas varchar, dias varchar, horarios varchar)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT inscripciones.id_curso, materias.codigo, materias.nombre, docentes.apellido || ', ' || docentes.nombre, cursos.sede,cursos.aulas,cursos.dias,cursos.horarios\
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

    //Dado un id de curso, devuelve finales asociados.
    pool.query("DROP FUNCTION IF EXISTS getFinalesDeUnCurso(id_consultada int);\
    \
    CREATE OR REPLACE FUNCTION  getFinalesDeUnCurso(id_consultada int)\
    RETURNS TABLE(id_final int, fecha date, hora time)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT examenesfinales.id_final, examenesfinales.fecha_examen, examenesfinales.horario_examen\
        FROM examenesfinales\
        WHERE examenesfinales.id_curso = id_consultada;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );


    //Esta consulta devuelve los cursos donde se inscribio el alumno
    pool.query("DROP FUNCTION IF EXISTS obtenerFinalesDondeMeInscribi(padron_consultado text);\
    \
    CREATE OR REPLACE FUNCTION  obtenerFinalesDondeMeInscribi (padron_consultado text)\
    RETURNS TABLE(id_final int, codigo varchar(6), nombre varchar(40), docente text, fecha date, horario time)\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT inscripcionesfinal.id_final, materias.codigo, materias.nombre, docentes.apellido || ', ' || docentes.nombre, to_char(examenesfinales.fecha_examen, 'dd/mm/yyyy'), to_char(examenesfinales.horario_examen, 'HH:MM')\
        FROM inscripcionesfinal\
        INNER JOIN examenesfinales ON examenesfinales.id_final = inscripcionesfinal.id_final\
        INNER JOIN cursos ON examenesfinales.id_curso = cursos.id_curso\
        INNER JOIN docentes ON docentes.legajo = cursos.docente_a_cargo\
        INNER JOIN materias ON cursos.id_materia = materias.id\
        WHERE padron_consultado = inscripcionesfinal.padron\
        ORDER BY materias.codigo ASC;\
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
        FROM cursos c\
        INNER JOIN inscripciones i ON c.id_curso = i.id_curso\
        INNER JOIN materias m ON c.id_materia = m.id\
        WHERE c.id_curso = id_consultada\
        GROUP BY c.id_curso;\
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


