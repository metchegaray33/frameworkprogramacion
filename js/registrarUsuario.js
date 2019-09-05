$(document).ready(function() {
    cargarControles();
});

function fileChangedEvent(event) {
    let file = document.getElementsByName("path")
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
    var url = "http://localhost:3700/api/save-Usuarios";

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


var fileInput = document.querySelector('#exampleFormControlFile1');

fileInput.addEventListener('change', function() {

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3700/api/upload-image/5d6eca5c5dd8bb04b84dab3f'); 

    xhr.addEventListener('load', function() {
        alert('Upload terminé !');
    });

    // Upload du fichier…
    var form = new FormData();

    form.append('file', fileInput.files[0]);

    xhr.send(form);

});




