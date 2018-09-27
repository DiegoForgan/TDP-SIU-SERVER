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
				carrera int not null);\
			\
			insert into alumnos values('96803', 'luques', 'agustin','agusluques', 'contrasecreta', 1, 10);\
			insert into alumnos values('10101', 'riquelme', 'juan roman','romi', 'capo', 10, 10);\
			insert into alumnos values('12345678', 'Martins', 'Diego','12345678', 'gil', 99, 10);\
			insert into alumnos values('38324264', 'Etcheverri', 'Franco','38324264', 'gil', 1, 10);\
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
				codigo varchar(6) ,\
				nombre varchar(40) ,\
				docente_a_cargo varchar(10) not null,\
				sede varchar not null,\
				aulas varchar not null,\
				cupos_disponibles int not null,\
				inscriptos int not null,\
				condicionales int not null,\
				dias varchar not null,\
				horarios varchar not null);\
			\
			insert into cursos values(DEFAULT, 1, '75.46','Taller de desarrollo de proyectos II','12345','PC','LAB C',2,0,0,'lunes','17:00-22:00');\
			insert into cursos values(DEFAULT, 2, '75.73','Arquitectura de Software','00000','PC;LH','201;LAB F',20,0,0,'lunes;jueves','18:00-22:00;19:00-21:00');\
			insert into cursos values(DEFAULT, 3,'75.04','Algoritmos y Programacion III','12345','PC;PC','400',50,0,0,'lunes;miercoles','18:00-21:00;19:00-22:00');\
			insert into cursos values(DEFAULT, 4,'12.34','Materia DE PRUEBA','12345','PC;PC','400',50,0,0,'lunes;miercoles','18:00-21:00;19:00-22:00');\
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
				nombre varchar(40) not null);\
			\
			insert into materias(codigo, nombre) values('75.46', 'Taller de desarrollo de proyectos II');\
			insert into materias(codigo, nombre) values('75.73', 'Arquitectura de Software');\
			insert into materias(codigo, nombre) values('75.04', 'Algoritmos y Programacion III');\
			\
			");
}