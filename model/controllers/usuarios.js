'use strict'

var Usuario = require('../modelos/usuarios');
var fs = require('fs');

var controller = {

    home: function(req, res) {
        return res.status(200).send({
            message: 'soy la home'
        });
    },

    test: function(req, res) {
        return res.status(200).send({
            message: "Soy el metodo test"
        });
    },

    //funcion para guardar usuarios a la bd
    saveUsuarios: function(req, res) {
        var usuario = new Usuario();

        var params = req.body;
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.dni = params.dni;
        usuario.matricula = params.matricula;
        usuario.cargo = params.cargo;
        usuario.username = params.username;
        usuario.email = params.email;
        usuario.password = params.password;
        usuario.imagen = null;

        usuario.save((err, usuarioStored) => {
            if (err) return res.status(500).send({ message: 'Error al guardar' });

            if (!usuarioStored) return res.status(404).sed({ message: 'No se ha podido guardar el proyecto' });

            return res.status(200).send({ usuario: usuarioStored });
        });
    },

    //devuelve un solo usuario buscado por id
    getUsuario: function(req, res) {
        var usuarioId = req.params.id;

        if (usuarioId == null) return res.status(404).send({ message: 'El usuario no existe' });

        Usuario.findById(usuarioId, (err, usuario) => {
            if (err) return res.status(500).send({ message: 'Error al devolver datos' });

            if (!usuario) return res.status(404).send({ message: 'El usuario no existe' });

            return res.status(200).send({
                usuario
            });
        });
    },

    getUsuarios: function(req, res) {

        Usuario.find({}).exec((err, usuarios) => {
            if (err) return res.status(500).send({ message: 'Error al devolver los datos' });

            if (!usuarios) return res.status(404).send({ message: 'No hay usuarios para mostrar' });

            return res.status(200).send({ usuarios });
        });
    },

    //actualizar un usuario
    updateUsuario: function(req, res) {
        var usuarioId = req.params.id;
        var update = req.body;

        Usuario.findByIdAndUpdate(usuarioId, update, { new: true }, (err, usuarioUpdate) => {
            if (err) return res.status(500).send({ message: 'Error al actualizar' });
            if (!usuarioUpdate) return res.status(404).send({ message: 'No se ha podido actualizar el usuario' });

            return res.status(200).send({
                usuario: usuarioUpdate
            });
        });
    },

    //borrar un usuario
    deletedUsuario: function(req, res) {
        var usuarioId = req.params.id;

        Usuario.findByIdAndRemove(usuarioId, (err, usuarioDeleted) => {
            if (err) return res.status(500).send({ message: 'Error al tratar de eliminar' });
            if (!usuarioDeleted) return res.status(404).send({ message: 'No se ha podido eliminar el usuario' });

            return res.status(200).send({
                usuario: usuarioDeleted
            });
        });
    },

    //Funcion para subir imagenes
    uploadImage: function(req, res) {
        var usuarioId = req.params.id;
        var fileName = 'imagen no subida...';

        if (req.files) {
            var filepath = req.files.imagen.path;
            var fileSplit = filepath.split('\\');
            var fileName = fileSplit[1];
            var extSplit = fileName.split('\.');
            var fileExt = extSplit[1];

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg' || fileExt == 'gif') {
                Usuario.findByIdAndUpdate(usuarioId, { imagen: fileName }, { new: true }, (err, usuarioUpdate) => {
                    if (err) return res.status(500).send({ message: 'Error al subir imagen' });

                    if (!usuarioUpdate) return res.status(404).send({ message: 'No se ha podido subir la imagen' });

                    return res.status(200).send({
                        usuario: usuarioUpdate
                    });
                });
            } else {
                fs.unlink(filepath, (err) => {
                    return res.status(200).send({ message: 'la extension no es valida' });
                });
            }



        } else {
            return res.status(200).send({
                message: fileName
            });
        }
    }
}

module.exports = controller;