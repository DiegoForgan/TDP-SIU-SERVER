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
            ",null,(req,res)=>{console.log(res)});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}