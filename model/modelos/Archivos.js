'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ArchivosSchema = Schema({
    id: Number,
    nombre_archivo: String,
    tipo_archivo: String,
    path: String
});

module.exports = mongoose.model('Archivos', ArchivosSchema)