module.exports = function(pool){
    pool.query("DROP FUNCTION IF EXISTS VerTodosLosCursos();\
    \
    CREATE FUNCTION VerTodosLosCursos ()\
    RETURNS TABLE(id_materia int, codigo varchar(6), nombre varchar(40))\
    AS $$\
    BEGIN\
    RETURN QUERY\
        SELECT cursos.id_materia, cursos.codigo, cursos.nombre FROM cursos;\
    END; $$\
    \
    LANGUAGE 'plpgsql'"
    );
}


