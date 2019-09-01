'use strict'

var Usuario = require('../modelos/usuarios');
var Archivo = require('../modelos/Archivos');
var fs = require('fs');

var controller = {

    //funcion para guardar usuarios a la bd
    saveUsuarios: function(req, res) {
        var usuario = new Usuario();
        console.log(req.body);
        var params = req.body;
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.dni = params.dni;
        usuario.matricula = params.matricula;
        usuario.cargo = params.cargo;
        usuario.username = params.username;
        usuario.email = params.email;
        usuario.password = params.password;
        usuario.id_archivo = null;

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
        var archivo = new Archivo();
        var usuarioId = req.params.id;
        var fileName = 'imagen no subida...';

        if (req.files) {
            //console.log(req.files)
            //req.files.null --- hay que cambiar eso, aún no encontré porque cambia de nombre dependiendo de donde se lo llama. el nombre es arbitrario
            var filePath = req.files.null.path;
            var fileName = req.files.null.name;
            var extSplit = fileName.split('.');
            var fileExt = extSplit[1];

            archivo.nombre_archivo = fileName;
            archivo.tipo_archivo = fileExt;
            archivo.path = filePath;

            if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {

                archivo.save((err, archivoStored) => {
                    if (err) return res.status(500).send({ message: 'Error al subir imagen' });

                    if (!archivoStored) return res.status(404).send({ message: 'No se ha podido subir la imagen' });

                    Usuario.findByIdAndUpdate(usuarioId, { id_archivo: archivoStored._id }, { new: true }, (err, usuarioUpdate) => {

                        return res.status(200).send({
                            usuario: usuarioUpdate
                        });
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