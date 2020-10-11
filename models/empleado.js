var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var EmpleadoSchema = Schema({
    nombres: String,
    apellidos: String,
    correo: String,
    password: String,
    rol: String
});

module.exports = mongoose.model('empleados' , EmpleadoSchema);