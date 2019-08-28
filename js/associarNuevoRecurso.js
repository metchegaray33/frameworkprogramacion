var tableId = "tablaRecursos";

$(function() {
    loadData();
    //loadGrid();
});

function loadData() {
    ajaxCall("http://localhost:3700/api/Recursos", null, function(response) {
        loadGrid(response.recursos);
    }, undefined, undefined, "GET");
}

function populatePreviewRecursos(data) {
    setPreviewRecursosTitulo(data.descripcion);
    setPreviewRecursosLongDesc(data.longDescription);
    setPreviewRecursosImg(data.imgUrl);
}

function setPreviewRecursosTitulo(value) {
    $("#previewRecursosTitulo").text(value);
}

function setPreviewRecursosLongDesc(value) {
    $("#previewRecursosLongDesc").text(value);
}

function setPreviewRecursosImg(url) {
    $("#previewRecursosLongDesc").attr("src", url);
}

function generateGridButtons() {
    return "<button type='button' class= 'btn btn - success btn-sm preview' >Previsualizar</button>" +
        "<button type='button' class='btn btn-success ml-1 btn-sm'> asociar </button></a>";
}

function loadGrid(data) {

    var table = $('#' + tableId).DataTable({
        data: data /*jsonRecursos*/ ,
        columns: [
            { title: "Título", data: "titulo" },
            { title: "Tipo", data: "tipo" },
            { title: "Autor", data: "autor" },
            { title: "Descripción", data: "descripcion", visible: true }

        ],
        "columnDefs": [{
            "targets": 4,
            "data": null,
            "defaultContent": generateGridButtons()
        }]
    });

    $("#tablaRecursos thead").addClass("thead-dark");

    $('#tablaRecursos tbody').on('click', 'button.btn.btn.-.success.btn-sm.preview', function() {
        var data = table.row($(this).parents('tr')).data();
        populatePreviewRecursos(data);
        $('#dialogPreview').modal("show");

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

     $().ready(function test1(){
        $ ('.table tbody').on('click','btn btn-success ml-1 btn-sm',function(){
            $().getScript("admRecursos.js", function(){
                ajout();
               });
        });
   

    $('.table tbody').on('click','#btnVisualizar',function(){

    // MODAL CON LA PREVISUALIZACION DE LOS OBJETOS

        $('main').append(`

        <div class="modal fade md-6 border rounded" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                        <div class="modal-header">
                            <button class="btn" id="btnClose" data-dismiss="modal"><img src="imagenes/borrar.png"/></button>
                         </div>
                        <div class="modal-body">
                            <div class="container row">
                                <div class="col-md-7">
                                    <h3>Introducción Java</h3>
                                    <p class = "justify-content">Java es un lenguaje de programación de propósito general, tipado, orientado a objetos,… que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles.
                                    Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)
                                    </p>
                                </div>
                                <div class = "col-md-5" >
                                    <img src= "imagenes/java.png" alt = "Imagen java" id ="imgJava">
                                </div>
                            </div>   
                        </div>   
            </div>
        </div>
    </div>
        
    <!--Fin Modal-->
    
    `);

    $('#modelId').modal("show");

    });
});
