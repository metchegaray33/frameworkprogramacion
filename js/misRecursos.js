var tableId = "tablaRecursos";

$(function() {
    loadData();
    //loadGrid();
});
/*
var jsonRecursos = [
    {
        descripcion: "Libro Java", tipo: "Herramienta", autor: "M. Etchegaray", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles."+
            "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png",
            usages: "Programación", cantUSages: 4},
    {
        descripcion: "Aprender a Programar", tipo: "Sitio", autor: "A. Piccin", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles." +
            "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png",
        usages: "Programación 2", cantUSages: 5},
    {
        descripcion: "Inicios programación", tipo: "Plataforma cerrada", autor: "S. Aguilera", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles." +
            "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png",
        usages: "Programación 3", cantUSages: 43}
];
*/
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
        "<button type='button' class= 'btn btn-warning btn-sm seeUsage' data-toggle='popover' data-trigger='hover'> Ver usos</button>" +
        "<a href='admRecursos.html'><button type='button' class='btn btn-success ml-1 btn-sm'>Adm Recursos</button></a>"+
        "<div class='container'>"+
            "<nav class='navbar navbar-expand-lg navbar-light bg-light'>"+
                "<a class='navbar-brand' href='#'>Navbar</a>"+
            "</nav"+
        "</div>"
        
}

function loadGrid(data) {

    var table = $('#' + tableId).DataTable({
        data: data /*jsonRecursos*/ ,
        columns: [
            { title: "Título", data: "titulo" },
            { title: "Tipo", data: "tipo" },
            { title: "Autor", data: "autor" },
            { title: "Descripción", data: "descripcion", visible: true }
            //{ title: "buttons", data: "button" }
            // { title: "usages", data: "usages", visible: false },
            // { title: "cantUSages", data: "cantUSages", visible: false },

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

    $('#tablaRecursos tbody').on('click', 'button.btn.btn-danger.ml-1.btn-sm', function() {
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
/*
function reloadGrid() {
    var datatable = $('#tablaRecursos').DataTable();
    datatable.clear().draw();
    datatable.rows.add(jsonRecursos); // Add new data
    datatable.columns.adjust().draw();
}*/