'use strict'

var express = require('express');
var usuariosController = require('../controllers/usuarios');

var router = express.Router();

router.get('/home', usuariosController.home);
router.post('/test', usuariosController.test);
router.post('/save-usuarios', usuariosController.saveUsuarios);

module.exports = router;
