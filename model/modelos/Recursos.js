'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecursosSchema = Schema({
    id: Number,
    titulo: String,
    descripcion: String,
    tipo: String,
    url: String,
    objetivo: String,
    aplicabilidad: Number,
    idioma: String,
    cant_uso: Number
});

module.exports = mongoose.model('Recursos', RecursosSchema)