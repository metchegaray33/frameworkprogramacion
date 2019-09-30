$(document).ready(function() {

    $("#btnCrear").on("click", function() {
        var id_rec = guardar(getSaveItem());
    });

    function guardar(item) {

        var url = "http://localhost:3700/api/save-Recursos";

        ajaxCall(url, JSON.stringify(item), function(response) {
            try {
                var us = response.recurso;
                id_recurso = us._id;
                if (us._id != undefined) {
                    archive(id_recurso);
                    alert("Se creo el Recurso " + us.titulo);
                }

            } catch (error) {
                alert("Ups! hubo un error! " + error)
            }

        }, undefined, undefined, "POST");


    }

    function getSaveItem() {
        return $("#formRecurso").serializeFormJSON();
    }


    function archive(id_rec) {
        var fileInput = document.querySelector('#file');

        if (fileInput.files.length > 0) {
            var xhr = new XMLHttpRequest();

            xhr.open('POST', 'http://localhost:3700/api/upload-imageRecurso/' + id_rec);

            var form = new FormData();

            form.append('file', fileInput.files[0]);

            xhr.send(form);
        }

    }





    //}));
    /*var url = "http://localhost:3700/api/upload-image/" + id_usuario;

    ajaxCall(url, JSON.stringify(file), function(response) {
        try {
            var xhr = new XMLHttpRequest();
            var form = new FormData();

            form.append('file', fileInput.files[0]);

            xhr.send(form);
            var us = response.archivo;
            if (us._id != undefined)
            alert("Archivo ok");

        } catch (error) {
            alert(id_usuario)
        }
        
    }, undefined, undefined, "POST");*/

});