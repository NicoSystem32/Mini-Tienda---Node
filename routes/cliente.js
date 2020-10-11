var express = require('express');
var clienteController = require('../controllers/clienteController');

var api = express.Router();

api.post('/cliente' , clienteController.registrarcliente);
api.put('/cliente/editar/:id' , clienteController.editarcliente);
api.delete('/cliente/delete/:id' , clienteController.deletecliente);


module.exports = api;