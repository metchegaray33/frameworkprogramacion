'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Arch = require('../modelos/Archivos');

var UsuarioSchema = Schema({
    id: Number,
    nombre: String,
    apellido: String,
    dni: Number,
    matricula: Number,
    cargo: String,
    id_archivo: String,
    username: String,
    email: String,
    password: String
});

module.exports = mongoose.model('Usuarios', UsuarioSchema)