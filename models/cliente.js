var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ClienteSchema = Schema({
    nombres: String,
    documento: String,
    correo: String,
    puntos: Number,
    createAt: {type: Date , default: Date.now}//Sabemos la fecha de creación 
});

module.exports = mongoose.model('cliente' , ClienteSchema);