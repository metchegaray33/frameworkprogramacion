'use strict'

var express = require('express');
var UnidadesController = require('../controllers/Unidades');

var router = express.Router();

var multipart = require('connect-multiparty');


router.post('/save-Unidades', UnidadesController.saveUnidades);
router.get('/Unidade/:id?', UnidadesController.getUnidade);
router.get('/Unidades', UnidadesController.getUnidades);
router.put('/Unidade/:id', UnidadesController.updateUnidade);
router.delete('/Unidade/:id', UnidadesController.deletedUnidade);

module.exports = router;