$(function() {
  
    

    loadGrid();
      
});

var jsonRecursos = [
    {
        descripcion: "Libro Java", tipo: "Herramienta", autor: "M. Etchegaray", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles."+
                                    "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png" },
    {
        descripcion: "Aprender a Programar", tipo: "Sitio", autor: "A. Piccin", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles." +
            "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png"},
    {
        descripcion: "Inicios programación", tipo: "Plataforma cerrada", autor: "S. Aguilera", longDescription: "Java es un lenguaje de programación de propósito general, tipado, orientado a objetos, … que permite el desarrollo desde aplicaciones básicas, pasando por aplicaciones empresariales hasta aplicaciones móviles." +
            "Java nacía como un lenguaje de programación que pudiese ser multiplataforma y multidispositivo, bajo el paradigma “Write Once Run Anywhere” (WORA)", imgUrl: "imagenes/java.png"}
];

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
        populatePreviewRecursos(data);
        $('#dialogPreview').modal("show");

    });

    //$('#tablaRecursos tbody').on('click', 'button.btn.btn-warning.btn-sm.seeUsage', function () {
    //    $(this).popover('toggle');

    //    var data = table.row($(this).parents('tr')).data();
    //    alert(data[0] + "'s usages is: " + data[1]);
    //});

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
                        <td>Programación</td>
                        <td>3</td>
                    </tr>
                </tbody>
            </table>
        `
    }).click(function (e) {
        $(this).popover('toggle');
        e.preventDefault();
    });

}

function reloadGrid() {
    var datatable = $('#tablaRecursos').DataTable();
    datatable.clear().draw();
    datatable.rows.add(jsonRecursos); // Add new data
    datatable.columns.adjust().draw();
}