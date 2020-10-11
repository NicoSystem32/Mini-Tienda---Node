var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ProductoSchema = Schema({
    nombre: String,
    descripcion: String,
    img: String,
    preciofabrica: Number,
    precioventa: Number,
    stock: Number,
    idcategoria: {type: Schema.ObjectId , ref: 'categoria'},
    puntos: Number
});

module.exports = mongoose.model('producto' , ProductoSchema);