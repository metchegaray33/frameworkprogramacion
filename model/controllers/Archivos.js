'use strict'

var Archivo = require('../modelos/Archivos');
var fs = require('fs');

var controller = {

    //funcion para guardar archivos a la bd
    saveArchivos: function(req, res) {
        var archivo = new Archivo();
        var fileName = 'Imagen no subida';
        if (req.files) {
            console.log(req.files);
            var filePath = req.files.path.path;
            var fileName = req.files.path.name;
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];

            archivo.nombre_archivo = fileName;
            archivo.tipo_archivo = fileExt;
            archivo.path = filePath;

            archivo.save((err, archivoStored) => {
                if (err) return res.status(500).send({ message: 'Error al subir imagen' });

                if (!archivoStored) return res.status(404).send({ message: 'No se ha podido subir la imagen' });

                return res.status(200).send({ archivo: archivoStored });

            });

        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    },

    //devuelve un solo curso buscado por id
    getArchivo: function(req, res) {
        var archivoId = req.params.id;

        if (archivoId == null) return res.status(404).send({ message: 'El archivo no existe' });

        Archivo.findById(archivoId, (err, archivo) => {
            if (err) return res.status(500).send({ message: 'Error al devolver datos' });

            if (!archivo) return res.status(404).send({ message: 'El archivo no existe' });

            return res.status(200).send({
                archivo
            });
        });
    },
    //devuelve todos los cursos de la BD
    getArchivos: function(req, res) {

        Archivo.find({}).exec((err, archivos) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!archivos) return res.status(404).send({ message: 'No hay cursos para mostrar' });

            return res.status(200).send({ archivos });
        });
    },

    //actualizar un recurso por id
    updateArchivo: function(req, res) {
        var archivoId = req.params.id;
        var update = req.body;

        Archivo.findByIdAndUpdate(archivoId, update, { new: true }, (err, archivoUpdate) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });
            if (!archivoUpdate) return res.status(404).send({ message: 'No se ha podido actualizar el archivo' });

            return res.status(200).send({
                curso: archivoUpdate
            });
        });
    },

    //borrar un usuario
    deletedArchivo: function(req, res) {
        var archivoId = req.params.id;

        Archivo.findByIdAndRemove(archivoId, (err, archivoDeleted) => {
            if (err) return res.status(500).send({ message: 'Error al tratar de eliminar' });
            if (!archivoDeleted) return res.status(404).send({ message: 'No se ha podido eliminar el archivo' });

            return res.status(200).send({
                archivo: archivoDeleted
            });
        });
    }


}

module.exports = controller;