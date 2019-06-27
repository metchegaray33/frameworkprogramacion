'use strict'

var Curso = require('../modelos/Cursos');
var fs = require('fs');

var controller = {

    //funcion para guardar cursos a la bd
    saveCursos: function(req, res) {
        var curso = new Curso();
        var params = req.body;

        curso.id = params.id;
        curso.nombre_curso = params.nombre_curso;
        curso.num_unidades = params.num_unidades;
        curso.introduccion = params.introduccion;
        curso.repaso = params.repaso;
        curso.activo = params.activo;
        curso.id_recurso = params.id_recurso;
        curso.descripcion = params.descripcion;

        curso.save((err, cursoStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!cursoStored) return res.status(404).sed({ message: 'No se ha podido guardar el curso' });

            return res.status(200).send({ curso: cursoStored });
        });
    },

    //devuelve un solo curso buscado por id
    getCurso: function(req, res) {
        var cursoId = req.params.id;

        if (cursoId == null) return res.status(404).send({ message: 'El curso no existe' });

        Curso.findById(cursoId, (err, curso) => {
            if (err) return res.status(500).send({ message: 'Error al devolver datos' });

            if (!curso) return res.status(404).send({ message: 'El curso no existe' });

            return res.status(200).send({
                curso
            });
        });
    },
    //devuelve todos los cursos de la BD
    getCursos: function(req, res) {

        Curso.find({}).exec((err, cursos) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!cursos) return res.status(404).send({ message: 'No hay cursos para mostrar' });

            return res.status(200).send({ cursos });
        });
    },

    //actualizar un recurso por id
    updateCurso: function(req, res) {
        var cursoId = req.params.id;
        var update = req.body;

        Curso.findByIdAndUpdate(cursoId, update, { new: true }, (err, cursoUpdate) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });
            if (!cursoUpdate) return res.status(404).send({ message: 'No se ha podido actualizar el curso' });

            return res.status(200).send({
                curso: cursoUpdate
            });
        });
    },

    //borrar un usuario
    deletedCurso: function(req, res) {
        var cursoId = req.params.id;

        Curso.findByIdAndRemove(cursoId, (err, cursoDeleted) => {
            if (err) return res.status(500).send({ message: 'Error al tratar de eliminar' });
            if (!cursoDeleted) return res.status(404).send({ message: 'No se ha podido eliminar el curso' });

            return res.status(200).send({
                curso: cursoDeleted
            });
        });
    }
}

module.exports = controller;