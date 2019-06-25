'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecursosSchema = Schema({
    id: Number,
    descripcion: String,
    tipo: String,
    autor: String,
    estilo: String,
    url: String,
    objetivo: String,
    aplicabilidad: Number,
    idioma: String,
    edad: Number,
    nombre_archivo: String,
    tipo_archivo: String,
    formato_archivo: String,
    path: String,
    cant_uso: String,
    valoracion_pos: Number,
    valoracion_neg: Number
});

module.exports = mongoose.model('Recursos', RecursosSchema)