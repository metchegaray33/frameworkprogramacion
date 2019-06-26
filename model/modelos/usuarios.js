'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UsuarioSchema = Schema({
    id: Number,
    nombre : String,
    apellido : String,
    dni : Number,
    matricula : Number,
    cargo : String,
    imagen : String
});

module.exports = mongoose.model('Usuarios', UsuarioSchema )