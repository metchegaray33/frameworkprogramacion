'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CursosSchema = Schema({
    id: Number,
    nombre_curso: String,
    num_unidades: Number,
    introduccion: String,
    repaso: String,
    activo: Boolean,
    id_recurso: Number,
    descripcion: String,
    fecha_creacion: Date
});

module.exports = mongoose.model('Cursos', CursosSchema)