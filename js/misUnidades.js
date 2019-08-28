var tableId = "tablaUnidades";

$(function() {
    loadData();
});

function loadData() {
    ajaxCall("http://localhost:3700/api/Unidades", null, function(response) {
        loadGrid(response.unidades);
    }, undefined, undefined, "GET");
}

function populatePreviewUnidades(data) {
    setPreviewUnidadesTitulo(data.titulo);
    setPreviewUnidadesDescripcion(data.descripcion);
}

function setPreviewUnidadesTitulo(value) {
    $("#previewUnidadesTitulo").text(value);
}

function setPreviewUnidadesDescripcion(value) {
    $("#previewUnidadesDescripcion").text(value);
}


function generateGridButtons() {
    return "<button type='button' class= 'btn btn - success btn-sm preview' >Previsualizar</button>" +
        "<button type='button' class= 'btn btn-warning btn-sm seeUsage' data-toggle='popover' data-trigger='hover'> Ver usos</button>" +
        "<a href='admRecursos.html'><button type='button' class='btn btn-success ml-1 btn-sm'>Adm Recursos</button></a>"+
        "<button type='button' class='btn btn-danger ml-1 btn-sm'>Borrar</button>"+
        "<button type='button' class='btn btn-success ml-1 btn-sm'> Asociar </button></a>";
}

function loadGrid(data) {

    var table = $('#' + tableId).DataTable({
        data: data /*jsonRecursos*/ ,
        columns: [
            { title: "Titulo", data: "titulo" }
        ],
        "columnDefs": [{
            "targets": 1,
            "data": null,
            "defaultContent": generateGridButtons()
        }]
    });

    $("#tablaUnidades thead").addClass("thead-dark");

    $('#tablaUnidades tbody').on('click', 'button.btn.btn.-.success.btn-sm.preview', function() {
        var data = table.row($(this).parents('tr')).data();
        populatePreviewUnidades(data);
        $('#dialogPreview').modal("show");

    });

    $('#tablaUnidades tbody').on('click', 'button.btn.btn-danger.ml-1.btn-sm', function() {
        $(this).closest('tr').remove();   
    });

    $('[data-toggle="popover"]').popover({
        html: true,
        content: `
            <div class="container mt-2 d-flex justify-content-end">
                <button class="btn" id="btnClose"  ><img src="imagenes/borrar.png"/></button>
            </div>
            <table class = "table">
                <thead class = "thead-dark">
                    <tr>
                        <th scope = "col">Siendo Usado</th>
                        <th scope = "col">Frecuencia</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><label class="lableUsages"/>Programacion</td>
                        <td><label class="lableCantUsages"/>3</td>
                    </tr>
                </tbody>
            </table>
        `
    }).hover(function(e) {
        var data = table.row($(this).parents('tr')).data();
        $(".lableUsages").text(data.usages);
        $(".lableCantUsages").text(data.cantUSages);
        e.preventDefault();
    });
}



