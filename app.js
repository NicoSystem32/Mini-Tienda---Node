var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 4201;

//Rutas
var rutasEmpleados = require('./routes/empleado');
var rutasCategorias = require('./routes/categoria');
var rutasProducto = require('./routes/producto');
var rutasCliente = require('./routes/cliente');
var rutasventa = require('./routes/venta');

var app = express();

mongoose.connect('mongodb+srv://admin:admin@cluster0.a2zg4.mongodb.net/VentasDB?retryWrites=true&w=majority', {useUnifiedTopology: true , useNewUrlParser: true} ,(err , res)=>{
    if(err){
        throw err;
    }else{
        console.log('Conexión exitosa !');
        app.listen(port , function(){
            console.log(`Servidor arriba en ${port}`);
        })
    }
})
app. use(bodyparser.urlencoded({extended: true}));//analiza texto como datos codificados de la url
app.use(bodyparser.json());

app.use((req,res,next)=>{
    res.header('Content-Type: application/json');
    res.header('Access-Control-Allow-Origin','*'); 
    res.header('Access-Control-Allow-Headers','Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods','GET, PUT, POST, DELETE, OPTIONS');
    res.header('Allow','GET, PUT, POST, DELETE, OPTIONS');
    next();
});

app.use('/api' , rutasEmpleados);
app.use('/api' , rutasCategorias);
app.use('/api' , rutasProducto);
app.use('/api' , rutasCliente);
app.use('/api' , rutasventa);

module.exports = app;