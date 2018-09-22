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
            ")
}