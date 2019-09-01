'use strict'

var express = require('express');
var usuariosController = require('../controllers/usuarios');

var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './uploads' });

router.post('/save-usuarios', usuariosController.saveUsuarios);
router.get('/usuario/:id?', usuariosController.getUsuario);
router.get('/usuarios', usuariosController.getUsuarios);
router.put('/usuario/:id', usuariosController.updateUsuario);
router.delete('/usuario/:id', usuariosController.deletedUsuario);
router.post('/upload-image/:id', multipartMiddleware, usuariosController.uploadImage);

module.exports = router;