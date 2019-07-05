'use strict'
var urlSite = "http://localhost:50649";
var urlSite = "http://127.0.0.1:5500";
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');

var app = express();
app.use(cors({
    origin: urlSite
}));
//cargar archivos rutas
var usuarios_routes = require('./routes/usuarios')
var recursos_routes = require('./routes/Recursos')
var cursos_routes = require('./routes/Cursos')

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());



//configurar cabeceras y cors
//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', urlSite);
//    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
//    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
//    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
//    next();
//});
//app.use(function (req, res, next) {
//    res.header("Access-Control-Allow-Origin", "*");
//    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//    next();
//});

//rutas
app.use('/api', usuarios_routes);
app.use('/api', recursos_routes);
app.use('/api', cursos_routes);

//exportar
module.exports = app;