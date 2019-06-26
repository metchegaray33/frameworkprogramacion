'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursosSchema = Schema({
    id: Number,
    nombre_curso: String,
    num_unidades: Number,
    introduccion: String,
    repaso: String,
    Activo: Boolean,

    descripcion: String,

});

module.exports = mongoose.model('Recursos', CursosSchema)