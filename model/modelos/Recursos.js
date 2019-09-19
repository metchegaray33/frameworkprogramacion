'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecursosSchema = Schema({
    id: Number,
    titulo: String,
    autor: String,
    formato: String,
    tipo: String,
    url: String,
    tema: String,
    palabras: String,
    palabras2: String,
    palabras3: String,
    palabras4: String,
    palabras5: String,
    idioma: String,
    
    //estilo: String,
    //objetivo: String,
    //aplicabilidad: Number,
    //edad: Number,
    //nombre_archivo: String,
    //tipo_archivo: String,
    //formato_archivo: String,
    //path: String,
    //id_archivo: String,
    //cant_uso: Number,
    //valoracion_pos: Number,
    //valoracion_neg: Number
});

module.exports = mongoose.model('Recursos', RecursosSchema)