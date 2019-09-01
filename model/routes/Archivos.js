'use strict'

var express = require('express');
var ArchivosController = require('../controllers/Archivos');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save-Archivos', multipartMiddleware, ArchivosController.saveArchivos);
router.get('/Archivo/:id?', ArchivosController.getArchivo);
router.get('/Archivos', ArchivosController.getArchivos);
router.put('/Archivo/:id', ArchivosController.updateArchivo);
router.delete('/Archivo/:id', ArchivosController.deletedArchivo);


module.exports = router;