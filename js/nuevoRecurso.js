﻿$(document).ready(function() {
    cargarControles();
});

jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});


/* function validar() {
    var form = $("#formRecurso");
    form.validate({
        rules: {
            titulo: {
                required: true
            },
            descripcion: {
                required: true
            },
            autor: {
                required: true
            },
            url: {
                required: true
            },
            objetivo: {
                required: true
            },
            estilo: {
                required: true
            },
            aplicabilidad: {
                required: true
            },
            idioma: {
                required: true
            },
            edad: {
                required: true
            }
        }
    });

    return form.valid();
} */


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
    //if (validar())
    guardar(getSaveItem());
}

function guardar(item) {
    var url = "http://localhost:3700/api/save-Recursos";

    ajaxCall(url, JSON.stringify(item), function(response) {
        try {
            var us = response.recurso;
            if (us._id != undefined)
                alert("Se creo el Recurso " + us.titulo);
        } catch (error) {
            alert("Ups! hubo un error! " + error)
        }


    }, undefined, undefined, "POST");
}

function getSaveItem() {
    return $("#formRecurso").serializeFormJSON();
    /*return {
        id: 1,
        descripcion: "asfddsafdsaf",
        tipo: "adf",
        autor: "adf",
        estilo: "adf",
        url: "adsf",
        objetivo: "asdf",
        aplicabilidad: 1,
        idioma: "asdf",
        edad: 1,
        nombre_archivo: "asdf",
        tipo_archivo: "asdf",
        formato_archivo: "adsf",
        path: "asdf",
        cant_uso: 1,
        valoracion_pos: 1,
        valoracion_neg: 1
    };*/
}