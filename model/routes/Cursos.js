'use strict'

var express = require('express');
var CursosController = require('../controllers/Cursos');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save-Cursos', CursosController.saveCursos);
router.get('/Curso/:id?', CursosController.getCurso);
router.get('/Cursos', CursosController.getCursos);
router.put('/Curso/:id', CursosController.updateCurso);
router.delete('/Curso/:id', CursosController.deletedCurso);

module.exports = router;