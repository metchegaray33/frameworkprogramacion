'use strict'

var usuarios = require('../modelos/usuarios');

var controller = {

    home: function(req, res){
        return res.status(200).send({
            message: 'soy la home'    
        });
    },

    test: function(req, res){
        return res.status(200).send({
            message:"Soy el metodo test"
        });
    },

    //funcion para guardar usuarios a la bd
    saveUsuarios: function(req, res){
        var usuario = new usuarios();

        var params = req.body;
        usuario.nombre = params.nombre;
        usuario.apellido = params.apellido;
        usuario.dni = params.dni;
        usuario.matricula = params.matricula;
        usuario.cargo = params.cargo;
        usuario.imagen = null;

        usuario.save((err, usuarioStored) => {
            if(err) return res.status(500).send({message: 'Error al guardar'});

            if(!usuarioStored) return res.status(404).sed({message: 'No se ha podido guardar el proyecto'});

            return res.status(200).send({usuario: usuarioStored});
        });
    }
};

module.exports = controller;