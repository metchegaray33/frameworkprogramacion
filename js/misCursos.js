var tableId = "tablaCursos";

$(function () {
    loadData();
});

function loadData() {
    ajaxCall("http://localhost:3700/api/Cursos", null, function (response) {
        loadGrid(response.cursos);
    }, undefined, undefined, "GET");
}

function generateGridButtons() {
    return  '<button type="button" class="btn btn-warning ml-1 btn-sm ">Editar</button>' +
        '<button type="button" class="btn btn-primary ml-1 btn-sm">Previsualizar</button>' +
        '<a href="misUnidades.html">' +
        '<button type="button" class="btn btn-success ml-1 btn-sm">Adm Unidades</button>' +
        '</a>' +
        '<button type="button" class="btn btn-danger ml-1 btn-sm">Borrar</button>';
}


function loadGrid(data) {
    
    var table = $('#' + tableId).DataTable({
        data: data,
        columns: [
            { title: "Cursos", data: "nombre_curso" },
            { title: "Número de unidades", data: "num_unidades" },
            //{ title: "introduccion", data: "introduccion", visible: false },
            //{ title: "repaso", data: "repaso", visible: false },
            //{ title: "activo", data: "activo", visible: false },
            //{ title: "id_recurso", data: "id_recurso", visible: false }  
        ],
        "columnDefs": [{
            "targets": 2,
            "data": null,
            "defaultContent": generateGridButtons()
        }]
    });

    $("#" + tableId + " thead").addClass("thead-dark");
    
}