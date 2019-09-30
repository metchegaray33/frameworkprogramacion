 'use strict'

 var Recurso = require('../modelos/Recursos');
 var Archivo = require('../modelos/Archivos');
 var fs = require('fs');

 var controller = {

     //funcion para guardar recursos a la bd
     saveRecursos: function(req, res) {
         var recurso = new Recurso();
         //console.log(req.body);
         var params = req.body;

         recurso.id = params.id;
         recurso.titulo = params.titulo;
         recurso.autor = params.autor;
         recurso.formato = params.formato;
         recurso.tipo = params.tipo;
         recurso.url = params.url;
         recurso.tema = params.tema;
         recurso.palabras = params.palabras;
         recurso.palabras2 = params.palabras2;
         recurso.palabras3 = params.palabras3;
         recurso.palabras4 = params.palabras4;
         recurso.palabras5 = params.palabras5;
         recurso.idioma = params.idioma;
         recurso.id_archivo = null;



         //recurso.estilo = params.estilo;

         //recurso.objetivo = params.objetivo;
         //recurso.aplicabilidad = params.aplicabilidad;
         //recurso.formato = params.formato;
         //recurso.edad = params.edad;
         //recurso.nombre_archivo = null;
         //recurso.tipo_archivo = null;
         //recurso.formato_archivo = null;
         //recurso.path = null;
         //usuario.id_archivo = null;
         //recurso.cant_uso = params.cant_uso;
         //recurso.valoracion_pos = params.valoracion_pos;
         //recurso.valoracion_neg = params.valoracion_neg;

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

     //Funcion para subir imagenes
     uploadImage: function(req, res) {
         var archivo = new Archivo();
         var recursoId = req.params.id;
         var fileName = 'imagen no subida...';
         if (req.files) {

             //req.files.null --- hay que cambiar eso, aún no encontré porque cambia de nombre dependiendo de donde se lo llama. el nombre es arbitrario
             var filePath = req.files.file.path;
             //var name = filePath.split('uploads');
             var fileName = req.files.file.originalFilename;
             var extSplit = fileName.split('.');
             var fileExt = extSplit[1];

             archivo.nombre_archivo = fileName;
             //archivo.nombre = name;
             archivo.tipo_archivo = fileExt;
             archivo.path = filePath;

             //if (fileExt == 'png' || fileExt == 'jpg' || fileExt == 'jpeg') {

             archivo.save((err, archivoStored) => {
                 if (err) return res.status(500).send({ message: 'Error al subir imagen' });

                 if (!archivoStored) return res.status(404).send({ message: 'No se ha podido subir la imagen' });

                 Recurso.findByIdAndUpdate(recursoId, { id_archivo: archivoStored._id }, { new: true }, (err, recursoUpdate) => {

                     return res.status(200).send({
                         recurso: recursoUpdate
                     });
                 });
             });


             //} else {
             // fs.unlink(filepath, (err) => {
             //     return res.status(200).send({ message: 'la extension no es valida' });
             // });
             //}
         } else {
             return res.status(200).send({
                 message: fileName
             });
         }
     }
 }

 module.exports = controller;