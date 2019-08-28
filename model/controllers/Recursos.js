 'use strict'

var Recurso = require('../modelos/Recursos');
var fs = require('fs');

var controller = {

    //funcion para guardar recursos a la bd
    saveRecursos: function(req, res) {
        var recurso = new Recurso();
        var params = req.body;

        recurso.id = params.id;
        recurso.titulo = params.titulo;
        recurso.descripcion = params.descripcion;
        recurso.tipo = params.tipo;
     
        recurso.url = params.url;
        recurso.objetivo = params.objetivo;
        recurso.aplicabilidad = params.aplicabilidad;

        recurso.idioma = params.idioma;
  
      
        recurso.cant_uso = params.cant_uso;




        recurso.save((err, recursoStored) => {

            if (err) return res.status(500).send({ error: err });

            if (!recursoStored) return res.status(404).sed({ message: 'No se ha podido guardar el curso' });

            return res.status(200).send({ recurso: recursoStored });
        });
    },

    //devuelve un solo recurso buscado por id
    getRecurso: function(req, res) {
        var recursoId = req.params.id;

        if (recursoId == null) return res.status(404).send({ message: 'El recurso no existe' });

        Recurso.findById(recursoId, (err, recurso) => {
            if (err) return res.status(500).send({ message: 'Error al devolver datos' });

            if (!recurso) return res.status(404).send({ message: 'El usuario no existe' });

            return res.status(200).send({
                recurso
            });
        });
    },
    //devuelve todos los recursos de la BD
    getRecursos: function(req, res) {

        Recurso.find({}).exec((err, recursos) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!recursos) return res.status(404).send({ message: 'No hay recursos para mostrar' });

            return res.status(200).send({ recursos });
        });
    },

    //actualizar un recurso por id
    updateRecurso: function(req, res) {
        var recursoId = req.params.id;
        var update = req.body;

        Recurso.findByIdAndUpdate(recursoId, update, { new: true }, (err, recursoUpdate) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });
            if (!recursoUpdate) return res.status(404).send({ message: 'No se ha podido actualizar el recurso' });

            return res.status(200).send({
                recurso: recursoUpdate
            });
        });
    },

    //borrar un usuario
    deletedRecurso: function(req, res) {
        var recursoId = req.params.id;

        Recurso.findByIdAndRemove(recursoId, (err, recursoDeleted) => {
            if (err) return res.status(500).send({ message: 'Error al tratar de eliminar' });
            if (!recursoDeleted) return res.status(404).send({ message: 'No se ha podido eliminar el recurso' });

            return res.status(200).send({
                recurso: recursoDeleted
            });
        });
    },


}

module.exports = controller;