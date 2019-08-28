$(document).ready(function() {
    cargarControles();
});

jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});

function cargarControles() {
    cargarCombos();
    setBtnCrearOnCliclEvent();
}

function setBtnCrearOnCliclEvent() {
    $("#btnCrear").on("click", onCrearClick);
}

function cargarCombos() {

}

function onCrearClick() {
    guardar(getSaveItem());
}

function guardar(item) {
    var url = "http://localhost:3700/api/save-Archivos";

    ajaxCall(url, JSON.stringify(item), function(response) {
        try {
            var us = response.archivo;
            if (us._id != undefined)
                alert("Se creo la Unidade " + us.nombre_archivo);
        } catch (error) {
            alert("Ups! hubo un error! " + error) 
        }


    }, undefined, undefined, "POST");
}

function getSaveItem() {
    console.log($("#btnFile").val());
    return {
        id: 1,
        nombre_archivo: "asdf",
        tipo_archivo: "asdf"
    };
}