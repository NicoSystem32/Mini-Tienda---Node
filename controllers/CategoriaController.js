const categoria = require('../models/categoria');
var Categoria = require('../models/categoria');

function registrar(req , res){
    var data = req.body;
    
    var categoria = new Categoria();
    categoria.titulo = data.titulo;
    categoria.detalle = data.detalle;

    categoria.save((err , categoria_save) => {
        if(err){
            res.status(500).send({message: 'Error en el servidor'});

        }else{
            if(categoria_save){
                res.status(200).send({
                    categoria: categoria_save
                })
            }else{
                res.status(404).send({
                    message: 'No se pudo registrar categoría =('
                })
            }
        }
    });
}

function getCategoria(req , res){
    var id = req.params['id'];
    categoria.findById({_id: id} , (err , categoria_data) =>{
        if(err){
            res.status(500).send({
                message: 'Error en el servidor =('
            });
        }else{
            if(categoria_data){
                res.status(200).send({
                    categoria: categoria_data
                })
            }else{
                res.status(200).send({
                    message: 'La categoría no existe'
                })
            }
        }
    })
}

function updatecategoria(req , res){
    var id =  req.params['id'];
    var data = req.body;

    Categoria.findByIdAndUpdate({_id: id} , {titulo: data.titulo , detalle: data.detalle} , (err , categoria_edit) =>{
        if(err){
            res.status(500).send({
                message: 'Error en el servidor =('
            });
        }else{
            if(categoria_edit){
                res.status(200).send({
                    categoria: categoria_edit
                });
            }else{
                res.status(403).send({
                    message: 'La categoría no se pudo actualizar'
                });
            }
        }
    });
}

function deletecategoria(req , res){
    var id =  req.params['id'];
    var data = req.body;

    Categoria.findByIdAndRemove({_id: id} , (err , categoria_delete) =>{
        if(err){
            res.status(500).send({
                message: 'Error en el servidor =('
            });
        }else{
            if(categoria_delete){
                res.status(200).send({
                    categoria: categoria_delete
                });
            }else{
                res.status(403).send({
                    message: 'La categoría no se pudo eliminar'
                });
            }
        }
    });
}

function listarcategoria(req , res){
    var nombre = req.params['nombre'];

    categoria.find({titulo: new RegExp(nombre , 'i')} , (err , categoria_listado) =>{
        if(err){
            res.status(500).send({
                message: 'Error en el servidor =('
            });
        }else{
            if(categoria_listado){
                res.status(200).send({
                    categoria: categoria_listado
                });
            }else{
                res.status(403).send({
                    message: 'No existen registros con ese título'
                });
            }
        } 
    })
}

module.exports = {
    registrar,
    getCategoria,
    updatecategoria,
    deletecategoria,
    listarcategoria
}