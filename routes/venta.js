var express = require('express');
var ventaController = require('../controllers/ventaController');
var api = express.Router();

api.post('/venta/registrar' , ventaController.registrarventa);
api.get('/venta/datos/:id' , ventaController.datosVenta);

//var path = multipart({uploadDir: './uploads/productos'})


module.exports = api;