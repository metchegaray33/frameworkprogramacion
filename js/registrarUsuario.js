$(document).ready(function() {
    cargarControles();
});

function fileChangedEvent(event) {
    let file = document.getElementsByName("imagen")
    console.log(file);
}

function cargarControles() {

    setBtnCrearOnCliclEvent();
}

function setBtnCrearOnCliclEvent() {
    $("#btnCrear").on("click", onCrearClick);
}

function onCrearClick() {
    guardar(getSaveItem());
}

function guardar(item) {
    //var urlarchivo = "http://localhost:3700/api/save-Archivos";
    var url = "http://localhost:3700/api/save-Usuarios";
    /* 
        ajaxCall(urlarchivo, JSON.stringify(item), function(response) {
            try {
                var us_arch = response.archivo;
            } catch (error) {
                alert("Hubo un error al guardar la imagen");
            }
        }, undefined, undefined, "POST"); */

    ajaxCall(url, JSON.stringify(item), function(response) {
        try {
            var us = response.usuario;
            if (us._id != undefined)
                alert("Se creo el usuario " + us.username);

        } catch (error) {
            alert("Ups! hubo un error! " + error)
        }
    }, undefined, undefined, "POST");

}

function getSaveItem() {
    return $("#formRegistro").serializeFormJSON();
}