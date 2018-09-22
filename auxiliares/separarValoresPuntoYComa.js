//Funcion que recibe un string separado por ";" (punto y coma) y devuelve un arreglo con cada uno de los parametros.
module.exports = function (string_a_separar) {
    return (string_a_separar.trim()).split(";");
}
    
 
