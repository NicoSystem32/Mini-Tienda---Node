var express = require('express');

var empleadoController = require('../controllers/EmpleadoController');
var api = express.Router();
api.post('/registrar' , empleadoController.registrar);
api.post('/login' , empleadoController.login);

module.exports = api;