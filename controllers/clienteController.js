const cliente = require('../models/cliente');
var Cliente = require('../models/cliente');


function registrarcliente(req , res){
    let data = req.body;
    var cliente = new Cliente();
    cliente.nombres = data.nombres;
    cliente.correo = data.correo;
    cliente.puntos = 10;

    cliente.save((err, cliente_save)=>{
        if(cliente_save){
            res.status(200).send({cliente: cliente_save});
        }else{
            res.status(500).send(err);
        }
    })
}

function editarcliente(req , res){
    let id = req.params['id'];
    let data = req.body;

    cliente.findByIdAndUpdate(id, {nombres: data.nombres , correo: data.correo} , (err , cliente_edit)=>{
        if(cliente_edit){
            res.status(200).send({cliente: cliente_edit});
        }else{
            res.status(500).send(err);
        }
    })
}

function deletecliente(req , res){
    let id = req.params['id'];
    
    cliente.findByIdAndRemove(id, (err, cliente_delete) =>{
        if(cliente_delete){
            res.status(200).send({cliente: cliente_delete});
        }else{
            res.status(500).send(err);
        } 
    })
}
module.exports = {
    registrarcliente,
    editarcliente,
    deletecliente
}