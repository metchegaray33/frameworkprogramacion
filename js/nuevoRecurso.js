$(document).ready(function () {
    cargarControles();


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
    var item = getSaveItem();

    //if(validar(item)){
    guardar(item);

    //}
}

function guardar(item) {
    var url = "";



    //
    //AjaxCall(url, item, function (response) {


    //});
}

function getSaveItem() {
    return {
        descripcion:    
        idEstiloAprendizaje: getEstiloAprendizaje(),
        idAplicabilidad: getAplicabilidad(),
        idtipo: getTipo()

    };

}

function getEstiloAprendizaje() {
    return $("#cmbFormato").val();
}
function getAplicabilidad() {
    return $("#cmbFormato").val();
}

function getFormato() {
    return $("#cmbFormato").val();
}