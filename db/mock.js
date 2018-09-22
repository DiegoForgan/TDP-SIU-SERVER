module.exports = function(pool){
	pool.query("DROP TABLE IF EXISTS alumnos;\
			\
			create table alumnos(\
				padron varchar(10) not null,\
				apellido varchar(200) not null,\
				nombre varchar(200) not null,\
				usuario varchar(50) not null,\
				contrasena varchar(20) not null,\
				prioridad int not null);\
			\
			insert into alumnos values('96803', 'luques', 'agustin','agusluques', 'contrasecreta', 1);\
			insert into alumnos values('10101', 'riquelme', 'juan roman','romi', 'capo', 10);\
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
				codigo varchar(6) not null,\
				nombre varchar(40) not null,\
				docente_a_cargo varchar(10) not null,\
				sede varchar(10) not null,\
				aulas varchar(10) not null,\
				cupos_disponibles int not null,\
				dias varchar(40) not null,\
				horarios varchar(40) not null);\
			\
			insert into cursos values(DEFAULT,'75.46','Taller de desarrollo de proyectos II','12345','PC','201;LAB F',30,'lunes','17-22');\
			insert into cursos values(DEFAULT,'75.73','Arquitectura de Software','00000','PC;LH','LAB B',20,'lunes;jueves','18-22;19-21');\
			\
			");
}