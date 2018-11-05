module.exports = function(pool){

    pool.query("DROP TABLE IF EXISTS docentes;\
			\
			create table docentes(\
				legajo varchar(10) not null,\
				apellido varchar(200) not null,\
				nombre varchar(200) not null,\
				usuario varchar(50) not null,\
				contrasena varchar(20) not null,\
				email varchar(200) not null);"
            );

    //CREO LA TABLA DE ALUMNOS EN LA BASE DE DATOS
    pool.query("DROP TABLE IF EXISTS alumnos;\
            \
			create table alumnos(\
				padron varchar(10) not null,\
				apellido varchar(200) not null,\
				nombre varchar(200) not null,\
				usuario varchar(50) not null,\
				contrasena varchar(20) not null,\
				prioridad int not null,\
				carrera varchar(50) not null,\
				f_update timestamp not null,\
				email varchar(200) not null);"
            );

    //CREO LA TABLA DE PERIODOS DE INSCRIPCION
    pool.query("DROP TABLE IF EXISTS periodos;\
			\
			create table periodos(\
				id serial,\
				descripcion varchar not null,\
				activo boolean not null,\
                fechaInicioInscripcionCursadas timestamp not null,\
                fechaFinInscripcionCursadas timestamp not null,\
             	fechaInicioDesinscripcionCursadas timestamp not null,\
             	fechaFinDesinscripcionCursadas timestamp not null,\
             	fechaInicioCursadas timestamp not null,\
             	fechaFinCursadas timestamp not null,\
             	fechaInicioFinales timestamp not null,\
             	fechaFinFinales timestamp not null);"
            );

    pool.query("DROP TABLE IF EXISTS prioridad_periodo;\
			\
			create table prioridad_periodo(\
				prioridad int not null,\
				id_periodo int not null,\
                fecha_inicio timestamp not null);"
            );

    pool.query("DROP TABLE IF EXISTS materias_carrera;\
			\
			create table materias_carrera(\
				id_carrera int not null,\
                id_materia int not null);"
            );

    
    pool.query("DROP TABLE IF EXISTS materias;\
			\
			create table materias(\
				id serial,\
				codigo varchar(6) not null,\
				nombre varchar(40) not null,\
                creditos int not null);"
            );


    pool.query("DROP TABLE IF EXISTS cursos;\
			\
			create table cursos(\
				id_curso SERIAL PRIMARY KEY,\
				id_materia int,\
				docente_a_cargo varchar(10) not null,\
				sede varchar not null,\
				aulas varchar not null,\
				cupos_disponibles int not null,\
				dias varchar not null,\
				horarios varchar not null,\
                id_periodo int not null);"
            );
    
    pool.query("DROP TABLE IF EXISTS inscripciones;\
			\
			create table inscripciones(\
				padron varchar(10) not null,\
				id_curso int not null,\
				es_regular boolean not null);"
            );

    pool.query("DROP TABLE IF EXISTS aulas;\
			\
			create table aulas(\
				id SERIAL,\
                aula varchar(200) not null);"
			);
			
	pool.query("DROP TABLE IF EXISTS examenesfinales;\
	\
	create table examenesfinales(\
			id_final SERIAL,\
			id_curso int not null,\
			fecha_examen date not null,\
			horario_examen time not null);"
			);
			
	pool.query("DROP TABLE IF EXISTS inscripcionesfinal;\
	\
	create table inscripcionesfinal(\
			padron varchar(10) not null,\
			id_final int not null,\
			es_regular boolean not null,\
			nota_del_final int);"
		);
		
	pool.query("DROP TABLE IF EXISTS historialacademico;\
	\
	create table historialacademico(\
			padron varchar(10) not null,\
			id_materia int not null,\
			nota int not null,\
			fecha date not null);"
		);
		
	pool.query("DROP TABLE IF EXISTS carreras;\
		\
		create table carreras(\
				id_carrera SERIAL,\
				nombre varchar(40) not null,\
				creditos_totales int not null);"
		);
}