var Producto = require('../models/producto');
var fs = require('fs');
var path = require('path');

function registrar(req , res){
    var data = req.body;

    if(req.files){
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name['2'];

        var producto = new Producto();
        producto.nombre = data.nombre;
        producto.descripcion = data.descripcion;
        producto.imagen = imagen_name;
        producto.preciofabrica = data.preciofabrica;
        producto.precioventa = data.precioventa;
        producto.stock = data.stock;
        producto.idcategoria = data.categoria;
        producto.puntos = data.puntos;

        producto.save((err , producto_save) =>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_save){
                    res.status(200).send({producto: producto_save});
                }else{
                    res.status(404).send({message: 'No se registró el producto =('});
                }
            }
        });
    }else{
        var producto = new Producto();
        producto.nombre = data.nombre;
        producto.descripcion = data.descripcion;
        producto.imagen = null;
        producto.preciofabrica = data.preciofabrica;
        producto.precioventa = data.precioventa;
        producto.stock = data.stock;
        producto.idcategoria = data.categoria;
        producto.puntos = data.puntos;

        producto.save((err , producto_save) =>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_save){
                    res.status(200).send({producto: producto_save});
                }else{
                    res.status(404).send({message: 'No se registró el producto =('});
                }
            }
        });
    }
}

function listarproducto(req , res){
    var nombre = req.params['nombre'];
    Producto.find({nombre: new RegExp(nombre , 'i')}).populate('idcategoria').exec((err , productos_listado) => {
        if(err){
            res.status(500).send({
                message: 'Error en el servidor'
            });
        }else{
            if(productos_listado){
                res.status(200).send({
                    productos: productos_listado
                });
            }else{
                res.status(404).send({
                    message: 'No hay ningun registro con ese título'
                });
            }
        }
    });
}

function editarproducto(req , res){
    var data = req.body;
    var id = req.params['id'];
    var img = req.params['img'];
    
    if(req.files){

        fs.unlink('./uploads/productos/'+ img , (err)=>{
            if(err)throw err
        });
        var imagen_path = req.files.imagen.path;
        var name = imagen_path.split('\\');
        var imagen_name = name[2];

        Producto.findByIdAndUpdate({_id: id} , {nombre: data.nombre , descripcion: data.descripcion, img: imagen_name ,
                                                preciofabrica : data.preciofabrica , precioventa: data.precioventa , stock: data.stock , idcategoria: data.idcategoria , 
                                                puntos: data.puntos} , (err , producto_edit) =>{
                if(err){
                    res.status(500).send({message: 'Error en el servidor'});
                }else{
                    if(producto_edit){
                        res.status(200).send({producto: producto_edit});
                    }else{
                        res.status(404).send({message: 'No se editó el producto'});
                    }

                }
            
        });
    }else{
        Producto.findByIdAndUpdate({_id: id} , {nombre: data.nombre , descripcion: data.descripcion,
            preciofabrica : data.preciofabrica , precioventa: data.precioventa , stock: data.stock , idcategoria: data.idcategoria , 
            puntos: data.puntos} , (err , producto_edit) =>{
            if(err){
                res.status(500).send({message: 'Error en el servidor'});
            }else{
                if(producto_edit){
                    res.status(200).send({producto: producto_edit});
                }else{
                    res.status(404).send({message: 'No se editó el producto'});
                }

            }

        });
    }
    
}

function getproducto(req , res){
    var id = req.params['id'];
    Producto.findOne({_id: id} , (err , producto_data) =>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_data){
                res.status(200).send({producto: producto_data});
            }else{
                res.status(404).send({message: 'No existe el registro =('});
            }

        }
    })
}

function deleteproduct(req , res){
    var id = req.params['id'];
    Producto.findOneAndRemove({_id: id} , (err, producto_delete) =>{
        if(err){
            res.status(500).send({message: 'Error en el servidor'});
        }else{
            if(producto_delete){
                fs.unlink('./uploads/productos/'+ producto_delete.imagen , (err)=>{
                    if(err)throw err
                });
                res.status(200).send({producto: producto_delete});
            }else{
                res.status(404).send({message: 'No existe el registro =('});
            }

        }
    })
}

function updatestock(req , res){
    let id = req.params['id'];
    let data = req.body;

    Producto.findById(id , (err , producto_data)=>{
        if(producto_data){
            Producto.findByIdAndUpdate(id , {stock: parseInt(producto_data.stock) + parseInt(data.stock) + parseInt(data.stock)} , (err,producto_edit) => {
                if(producto_edit){
                    res.status(200).send({producto: producto_edit});
                }
            })
        }else{
            res.status(500).send(err);
        }
    });
}

function getimg(req , res){
    var img = req.params['img'];
    if(img != "null"){
        let path_img = './uploads/productos/' + img
        res.status(200).sendFile(path.resolve(path_img));
    }else{
        let path_img = './uploads/productos/default.png';
        res.status(200).sendFile(path.resolve(path_img));
    }
}

module.exports = {
registrar,
listarproducto,
editarproducto,
getproducto,
deleteproduct,
updatestock,
getimg

}