'use strict'

var express = require('express');
var RecursosController = require('../controllers/Recursos');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save-Recursos', RecursosController.saveRecursos);
router.get('/Recurso/:id?', RecursosController.getRecurso);
router.get('/Recursos', RecursosController.getRecursos);
router.put('/Recurso/:id', RecursosController.updateRecurso);
router.delete('/Recurso/:id', RecursosController.deletedRecurso);
router.post('/upload-imageRecurso/:id', multipartMiddleware, RecursosController.uploadImage);

module.exports = router;