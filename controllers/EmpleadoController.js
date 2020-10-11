var Empleado = require('../models/empleado');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

function registrar(req , res){
    var params = req.body;
    var empleado = new Empleado();

    if(params.password){
        bcrypt.hash(params.password , null , null , function(err , hash){
            if(hash){
                empleado.password = hash;
                empleado.nombres = params.nombres
                empleado.apellidos = params.apellidos
                empleado.correo = params.correo
                empleado.rol = params.rol

                empleado.save((err , empleado_save) => {
                    if(err){
                        res.status(500).send({error:'No se ha ingresado ningún empleado'});
                    }else{
                        res.status(200).send({empleado: empleado_save})
                    }
                })

            }
        })
    }else{
        res.status(403).send({error : 'No ha introducido ninguna contraseña'})
    }
}

function login(req , res){
    var data  = req.body;

    Empleado.findOne({correo: data.correo} , (err , empleado_data) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'})
        }else{
            if(empleado_data){
                bcrypt.compare(data.password, empleado_data.password , function(err , check){
                    if(check){
                        if(data.gettoken){
                            res.status(200).send({
                                jwt: jwt.createToken(empleado_data),
                                empleado: empleado_data
                            })
                        }else{
                            res.status(200).send({
                                empleado: empleado_data,
                                message: 'No Token',
                                jwt: jwt.createToken(empleado_data)
                            })
                        }
                        
                    }else{
                        res.status(200).send({message: 'Correo o contraseña no existen'})
                    }
                });
            }else{
                res.status(404).send({message: 'El correo ingresado no existe =('})
            }
        }
    })
}

module.exports = {
    registrar,
    login
}
