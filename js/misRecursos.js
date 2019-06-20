$(function() {
  
    $('[data-toggle="popover"]').popover({
        html : true,
        content : `
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
                        <td>Programación</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
        `
    }).click(function(e) {
        $(this).popover('toggle');
        e.preventDefault();
    });

    $('.table tbody').on('click','#btnVisualizar',()=>{

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
        `);
    
       $('#modelId').modal("show");
        
    });
    loadGrid();
      
});

var jsonRecursos = [
    {
        descripcion: "aaaaa", tipo: "bbbb", autor: "pepito", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles."+
                                    "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png" },
    {
        descripcion: "aaa3", tipo: "eeee", autor: "pepote", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles." +
            "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png"},
    {
        descripcion: "aaa33", tipo: "bbbb", autor: "pepete", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles." +
            "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png"},
    {
        descripcion: "aa2", tipo: "uuuuu", autor: "pepon", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles." +
            "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png" }
];

function populatePreviewRecursos(data) {
    setPreviewRecursosTitulo(data.titulo);
    setPreviewRecursosLongDesc(data.longDescription);
    setPreviewRecursosImg(data.imgUrl);
}

function setPreviewRecursosTitulo(value) {
    $("#previewRecursosTitulo").val(value);
}

function setPreviewRecursosLongDesc(value) {
    $("#previewRecursosLongDesc").text(value);
}

function setPreviewRecursosImg(url) {
    $("#previewRecursosLongDesc").attr("src",url);
}


function loadGrid() {

    var table = $('#tablaRecursos').DataTable({
        data: jsonRecursos,
        columns: [
            { title: "Descripción", data: "descripcion" },
            { title: "Tipo", data: "tipo" },
            { title: "Autor", data: "autor" },
            { title: "buttons", data: "button" },
        ],
        "columnDefs": [{
            "targets": 3,
            "data": null,
            "defaultContent": "<button type='button' class= 'btn btn - success btn-sm preview' >Previsualizar</button>"+
                "<button type='button' class= 'btn btn-warning btn-sm seeUsage' data-toggle='popover' data - trigger='focus'> Ver usos</button>"

                
                    
        }]
    });


    $("#tablaRecursos thead").addClass("thead-dark");

    $('#tablaRecursos tbody').on('click', 'button.btn.btn.-.success.btn-sm.preview', function () {
        var data = table.row($(this).parents('tr')).data();
        alert(data[0] + "'s preview is: " + data[2]);
        populatePreviewRecursos(data);

        $("#dialogPreview").dialog({
        
            modal: true
        });
        //showModalForm(data.titulo, "dialogPreview");

    });

    $('#tablaRecursos tbody').on('click', 'button.btn.btn-warning.btn-sm.seeUsage', function () {
        var data = table.row($(this).parents('tr')).data();
        alert(data[0] + "'s usages is: " + data[1]);
    });
}

function reloadGrid() {
    var datatable = $('#tablaRecursos').DataTable();
    datatable.clear().draw();
    datatable.rows.add(jsonRecursos); // Add new data
    datatable.columns.adjust().draw();
}


//function setOnPreviewClickEvent() {
//    $('#tablaRecursos tbody').on('click', 'button', function () {
//        var data = table.row($(this).parents('tr')).data();
//        alert(data[0] + "'s salary is: " + data[5]);
//    });
//}