var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VentaSchema = Schema({
    idcliente: {type: Schema.ObjectId , ref: 'cliente'},
    idempleado: {type: Schema.ObjectId , ref: 'empleado'},
    fecha: {type: Date , default: Date.now}, 
    
});

module.exports = mongoose.model('venta' , VentaSchema);