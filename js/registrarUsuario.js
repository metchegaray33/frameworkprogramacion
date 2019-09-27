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

id_usuario = guardar(getSaveItem());

function guardar(item) {
    
    var url = "http://localhost:3700/api/save-Usuarios";
    //var id_usuario;

    ajaxCall(url, JSON.stringify(item), function(response) {
        try {
            var us = response.usuario;
            id_usuario=us._id;
            if (us._id != undefined)
            return id_usuario;


        } catch (error) {
            alert("Ups! hubo un error! " + error)
        }
        
    }, undefined, undefined, "POST");

}

function getSaveItem() {
    return $("#formRegistro").serializeFormJSON();
}

var fileInput = document.querySelector('#exampleFormControlFile1');

    fileInput.addEventListener($("#btnCrear").on("click", function() {
    //fileInput.addEventListener("change", function () {
    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3700/api/upload-image/'+id_usuario); 

    /*xhr.addEventListener('load', function() {
        alert(id_usuario);
    });*/

    // Upload du fichier…
    var form = new FormData();

    form.append('file', fileInput.files[0]);

    xhr.send(form);

}));














