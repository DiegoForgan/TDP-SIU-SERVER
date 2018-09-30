const { Pool } = require('pg');
var crearTablas = require('./tablas');
var cargarDatos = require('./mock');

var cargarStoreProcedures = require('./storeProcedures');

var cargaAlumnosCondicionales = require('./cargaAlumnosCondicionales');

//Inicializa la configuracion de la coneccion con la variable de ambiente de la base de datos, sino usa la local. 
const string_de_coneccion = process.env.DATABASE_URL || 'postgresql://postgres:12345@localhost:5432/test';

//Se cambia a esta forma de configuracion que es mas adaptable a ser incorporada a Heroku
const pool = new Pool({
    connectionString: string_de_coneccion,
    ssl: true,
    max: 1, //lo limito a 1 por temas de sincronismo pero lo ideal del pool seria trabajar con multiples
});

// carga la base de datos con mocks
crearTablas(pool);
cargarDatos(pool);

//carga las funciones para consultarle a la base de datos
cargarStoreProcedures(pool);


cargaAlumnosCondicionales(pool);


module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}