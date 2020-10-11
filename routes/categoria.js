var express = require('express');
const { get } = require('mongoose');
var categoriaController = require('../controllers/CategoriaController');

var api = express.Router();

api.post('/categoria/registrar' , categoriaController.registrar);
api.get('/categoria/:id' , categoriaController.getCategoria);
api.put('/categoria/editar/:id' , categoriaController.updatecategoria);
api.delete('/categoria/eliminar/:id' , categoriaController.deletecategoria);
api.get('/categorias/:nombre?' , categoriaController.listarcategoria);
module.exports = api;