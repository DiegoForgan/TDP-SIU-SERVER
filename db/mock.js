module.exports = function(pool){
	pool.query("DROP TABLE IF EXISTS alumnos;\
			\
			create table alumnos(\
				padron varchar(10) not null,\
				apellido varchar(200) not null,\
				nombre varchar(200) not null,\
				usuario varchar(50) not null,\
				contrasena varchar(20) not null,\
				prioridad int not null,\
				carrera int not null,\
				f_update timestamp not null);\
			\
			do $$\
				declare dia_hoy timestamp := now();\
			begin\
			\
				insert into alumnos values('96803', 'luques', 'agustin','agusluques', 'contrasecreta', 1, 10, dia_hoy);\
				insert into alumnos values('10101', 'riquelme', 'juan roman','romi', 'capo', 10, 10, dia_hoy);\
				insert into alumnos values('12345', 'Martins', 'Diego','12345678', 'gil', 99, 10, dia_hoy);\
				insert into alumnos values('95812', 'Etcheverri', 'Franco','38324264', 'gil', 1, 10, dia_hoy);\
            end;\
            $$;\
            ");

	pool.query("DROP TABLE IF EXISTS periodos;\
			\
			create table periodos(\
				id serial,\
				descripcion varchar not null,\
				activo boolean not null,\
				fecha_cierre timestamp not null);\
			\
			insert into periodos values(DEFAULT, '1C-2018', FALSE, '2018-03-22 23:59:59');\
			insert into periodos values(DEFAULT, '2C-2018', TRUE, '2018-08-15 23:59:59');\
            ");

	pool.query("DROP TABLE IF EXISTS prioridad_periodo;\
			\
			create table prioridad_periodo(\
				prioridad int not null,\
				id_periodo int not null,\
				fecha_inicio timestamp not null);\
			\
			insert into prioridad_periodo values(1, 1, '2018-03-01 10:00:00');\
			insert into prioridad_periodo values(1, 2, '2018-08-01 10:00:00');\
			insert into prioridad_periodo values(2, 2, '2018-08-01 14:00:00');\
			insert into prioridad_periodo values(3, 2, '2018-08-01 18:00:00');\
			insert into prioridad_periodo values(4, 2, '2018-08-02 10:00:00');\
            insert into prioridad_periodo values(5, 2, '2018-08-02 14:00:00');\
			insert into prioridad_periodo values(6, 2, '2018-08-02 18:00:00');\
			insert into prioridad_periodo values(7, 2, '2018-08-03 10:00:00');\
			insert into prioridad_periodo values(8, 2, '2018-08-03 14:00:00');\
            insert into prioridad_periodo values(9, 2, '2018-08-03 18:00:00');\
			insert into prioridad_periodo values(10, 2, '2018-08-04 11:00:00');\
			insert into prioridad_periodo values(11, 2, '2018-08-04 15:00:00');\
			insert into prioridad_periodo values(12, 2, '2018-08-04 19:00:00');\
            ");

	pool.query("DROP TABLE IF EXISTS materias_carrera;\
			\
			create table materias_carrera(\
				id_carrera int not null,\
				id_materia int not null);\
			\
			insert into materias_carrera values(10, 1);\
			insert into materias_carrera values(10, 2);\
			insert into materias_carrera values(10, 3);\
			insert into materias_carrera values(9, 3);\
			\
            ");

	pool.query("DROP TABLE IF EXISTS docentes;\
			\
			create table docentes(\
				legajo varchar(10) not null,\
				apellido varchar(200) not null,\
				nombre varchar(200) not null,\
				usuario varchar(50) not null,\
				contrasena varchar(20) not null);\
			\
			insert into docentes values('12345', 'fontela', 'carlos','calitos10', 'tdplove');\
			insert into docentes values('00000', 'calonico', 'cristian','calo', 'pass123');\
			insert into docentes values('cond', 'unused', 'unused','unused', 'unused');\
			\
			");


	// formatos definidos para la tabla:
	// docente_a_cargo: contiene el numero de legajo del docente a cargo (por ahora se considera UNICO)
	// sede: Se completa PC o LH para cada dia de cursada. Por ej: "PC;LH" (un dia en cada sede);
	// aula: numero de 3 cifras o laboratorio designado
	// dias: se coloca cada dia sepado por punto y coma ";"
	// horario: se coloca la franja como "HH-HH;HH-HH" 
	pool.query("DROP TABLE IF EXISTS cursos;\
			\
			create table cursos(\
				id_curso SERIAL PRIMARY KEY,\
				id_materia int,\
				docente_a_cargo varchar(10) not null,\
				sede varchar not null,\
				aulas varchar not null,\
				cupos_disponibles int not null,\
				inscriptos int not null,\
				condicionales int not null,\
				dias varchar not null,\
				horarios varchar not null,\
				id_periodo int not null);\
			\
			insert into cursos values(DEFAULT, 1, '12345','PC','LAB C',2,0,0,'lunes','17:00-22:00', 2);\
			insert into cursos values(DEFAULT, 1, '12345','PC','LAB C',5,0,0,'lunes','17:00-22:00', 2);\
			insert into cursos values(DEFAULT, 2, '00000','PC;LH','201;LAB F',20,0,0,'lunes;jueves','18:00-22:00;19:00-21:00', 2);\
			insert into cursos values(DEFAULT, 3, '12345','PC;PC','400;400',3,0,0,'lunes;miercoles','18:00-21:00;19:00-22:00', 2);\
			insert into cursos values(DEFAULT, 2, '12345','PC;PC','400;400',50,0,0,'lunes;miercoles','18:00-21:00;19:00-22:00', 2);\
			\
			");
	pool.query("DROP TABLE IF EXISTS inscripciones;\
			\
			create table inscripciones(\
				padron varchar(10) not null,\
				id_curso int not null,\
				es_regular boolean not null);\
			"
			);

	pool.query("DROP TABLE IF EXISTS aulas;\
			\
			create table aulas(\
				id SERIAL,\
				aula varchar(200) not null);\
			\
			insert into aulas(aula) values('LAB C');\
			insert into aulas(aula) values('LAB F');\
			insert into aulas(aula) values('201');\
			insert into aulas(aula) values('400');\
			\
			");

	pool.query("DROP TABLE IF EXISTS materias;\
			\
			create table materias(\
				id serial,\
				codigo varchar(6) not null,\
				nombre varchar(40) not null,\
				creditos int not null);\
			\
			insert into materias(codigo, nombre, creditos) values('75.46', 'Taller de desarrollo de proyectos II',6);\
			insert into materias(codigo, nombre, creditos) values('75.73', 'Arquitectura de Software',4);\
			insert into materias(codigo, nombre, creditos) values('75.04', 'Algoritmos y Programacion III',6);\
			\
			");
}
