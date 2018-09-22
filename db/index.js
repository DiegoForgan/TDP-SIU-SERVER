const { Pool } = require('pg');

//Inicializa la configuracion de la coneccion con la variable de ambiente de la base de datos, sino usa la local. 
const string_de_coneccion = process.env.DATABASE_URL || 'postgresql://postgres:12345@localhost:5432/test';

//Se cambia a esta forma de configuracion que es mas adaptable a ser incorporada a Heroku
const pool = new Pool({
    connectionString: string_de_coneccion,
    ssl: true,
    max: 1, //lo limito a 1 por temas de sincronismo pero lo ideal del pool seria trabajar con multiples
});

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
// sede: Se completa PC o LH para cada dia de cursada. Por ej: "PC-LH" (un dia en cada sede);
// aula: numero de 3 cifras o laboratorio designado
// dias: se coloca cada dia sepado por coma (,)
// horario: se coloca la franja como "HH-HH;HH-HH" 
pool.query("DROP TABLE IF EXISTS cursos;\
			\
			create table cursos(\
				id_curso SERIAL PRIMARY KEY,\
				codigo varchar(6) not null,\
				nombre varchar(40) not null,\
				docente_a_cargo varchar(10) not null,\
				sede varchar(10) not null,\
				aula varchar(10) not null,\
				cupos_disponibles int not null,\
				dias varchar(40) not null,\
				horario varchar(40) not null);\
			\
			insert into cursos values(DEFAULT,'75.46','Taller de desarrollo de proyectos II','12345','PC','201',30,'lunes','17-22');\
			insert into cursos values(DEFAULT,'75.73','Arquitectura de Software','00000','PC','LAB B',20,'jueves','18-22');\
			\
			");

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}