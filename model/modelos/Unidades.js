'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UnidadesSchema = Schema({
    id: Number,
    titulo: String,
    descripcion : String
});

module.exports = mongoose.model('Unidades', UnidadesSchema)