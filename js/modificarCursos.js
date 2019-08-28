$(function () {
    loadData();
});

function loadData() {
    ajaxCall("http://localhost:3700/api/Cursos", null, function (response) {
        loadGrid(response.cursos);
    }, undefined, undefined, "GET");
}

$(function (){
    $('#txtTitulo').attr('placeholder', response.nombre_curso);
});
