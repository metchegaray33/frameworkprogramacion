'use strict'

var Unidade = require('../modelos/Unidades');
var fs = require('fs');

var controller = {

    //funcion para guardar unidades a la bd
    saveUnidades: function(req, res) {
        var unidade = new Unidade();
        var params = req.body;

        unidade.id = params.id;
        unidade.titulo = params.titulo;
        unidade.descripcion = params.descripcion;

        unidade.save((err, unidadeStored) => {

            if (err) return res.status(500).send({ error: err });

            if (!unidadeStored) return res.status(404).sed({ message: 'No se ha podido guardar la unidade' });

            return res.status(200).send({ unidade: unidadeStored });
        });
    },

    //devuelve una sola unidade buscado por id
    getUnidade: function(req, res) {
        var unidadeId = req.params.id;

        if (unidadeId == null) return res.status(404).send({ message: 'La unidade no existe' });

        Unidade.findById(unidadeId, (err, unidade) => {
            if (err) return res.status(500).send({ message: 'Error al devolver datos' });

            if (!unidade) return res.status(404).send({ message: 'La unidade no existe' });

            return res.status(200).send({unidade});
        });
    },
    //devuelve todos los recursos de la BD
    getUnidades: function(req, res) {

        Unidade.find({}).exec((err, unidades) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!unidades) return res.status(404).send({ message: 'No hay unidades para mostrar' });

            return res.status(200).send({ unidades });
        });
    },

    //actualizar una unidade por id
    updateUnidade: function(req, res) {
        var unidadeId = req.params.id;
        var update = req.body;

        Unidade.findByIdAndUpdate(unidadeId, update, { new: true }, (err, unidadeUpdate) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });
            if (!unidadeUpdate) return res.status(404).send({ message: 'No se ha podido actualizar la unidade' });

            return res.status(200).send({
                unidade: unidadeUpdate
            });
        });
    },

    //borrar una unidade
    deletedUnidade: function(req, res) {
        var unidadeId = req.params.id;

        Unidade.findByIdAndRemove(unidadeId, (err, unidadeDeleted) => {
            if (err) return res.status(500).send({ message: 'Error al tratar de eliminar' });
            if (!unidadeDeleted) return res.status(404).send({ message: 'No se ha podido eliminar la unidade' });

            return res.status(200).send({
                unidade: unidadeDeleted
            });
        });
    },
}

module.exports = controller;