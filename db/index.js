const { Pool } = require('pg');

//Aqui hay que ver como se llama la variable de ambiente de heroku pero mientras tanto esta hardcodeado el string de mi base de pruebas
const string_de_coneccion = process.env.connectionString || 'postgresql://postgres:12345@localhost:5432/test';

//Se cambia a esta forma de configuracion que es mas adaptable a ser incorporada a Heroku
const pool = new Pool({
    connectionString: string_de_coneccion,
});

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}