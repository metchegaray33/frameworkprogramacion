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
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Usuarios', UsuarioSchema )