var jwt = require('jwt-simple');
var moment = require('moment');
const empleado = require('../models/empleado');
var crypte = 'kaprekar';

exports.createToken = function(user){
    var payload = {
        sub: user._id,
        nombres: empleado.nombres,
        apellidos: empleado.apellidos,
        correo: empleado.correo,
        rol: empleado.rol,
        iat: moment().unix(),//fecha de creación del token
        caduc: moment().add(30,'days').unix()//expiración del token
    }

    return jwt.encode(payload , crypte);// se codifican todos los datos y se obtiene un token
}