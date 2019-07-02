$(document).ready(function () {
    cargarControles();
});

jQuery.validator.setDefaults({
    debug: true,
    success: "valid"
});


var formNuevoCursoId = "formularioNuevoCurso";

function validar() {
    var form = $("#" + formNuevoCursoId);
    form.validate({
        rules: {
            nombre: {
                required: true
            },
            num_unidades: {
                required: true
            },
            introduccion: {
                required: true
            },
            repaso: {
                required: true
            },
            id_recurso: {
                required: true
            }
        }
    });

    return form.valid();
}


function cargarControles() {
    cargarCombos();
    setBtnCrearOnCliclEvent();
}

function setBtnCrearOnCliclEvent() {
    $("#btnCrear").on("click", onCrearClick);
}

function cargarCombos() {
    cargarComboRecursos();
}
function cargarComboRecursos() {
    ajaxCall("http://localhost:3700/api/Recursos", null, function (response) {

        var listitems = '';

        for (var i = 0; i < response.recursos.length; i++) {
            listitems += "<option value='" + response.recursos[i].id + "'>" + response.recursos[i].descripcion + "</option>";
        }

        $("#cmbRecursos").append(listitems);

    }, undefined, undefined, "GET");
}

function onCrearClick() {
    if (validar()) {
        var item = getSaveItem();
        item.activo = true;
        guardar(item);
    } 
        
}

function guardar(item) {
    var url = "http://localhost:3700/api/save-Cursos";

    ajaxCall(url, JSON.stringify(item), function (response) {
        alert(response);

    },undefined,undefined,"POST");
}

function getSaveItem() {
    return $("#" + formNuevoCursoId).serializeFormJSON();
}