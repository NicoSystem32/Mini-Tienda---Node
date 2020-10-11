var express = require('express');
var productoController = require('../controllers/ProductoController');
var api = express.Router();
var multipart = require('connect-multiparty');
var path = multipart({uploadDir: './uploads/productos'})

api.post('/producto/registrar' , path , productoController.registrar);
api.get('/productos/:nombre?' , productoController.listarproducto);
api.put('/productos/editar/:id/:img' , path , productoController.editarproducto);
api.get('/productos/registro/:id' , productoController.getproducto);
api.delete('/producto/:id' , productoController.deleteproduct);
api.put('/producto/stock/:id' , productoController.updatestock);
api.get('/producto/img/:img' , productoController.getimg);
module.exports = api;