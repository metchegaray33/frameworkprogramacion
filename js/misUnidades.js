$(document).ready(function(){
   
    var contador = 3;
    $('#btnEnviar').click(function(){
        contador ++;
        var unidad = $('#inputUnidad').val();
        var introduccion = $('#inputIntro').val();
        var repaso = $('#inputRepaso').val();

        $('#filas').append(`<tr>
            <th>${contador}</th>
            <td>${unidad}</td>
            <td>${introduccion}</td>
            <td>${repaso}</td>
            <td><input type="checkbox"></td>
            <td class="botonesCursos">
                <div class="containter row">
                    <button type="button" class="btn btn-warning mr-1 btn-sm">Editar</button>
                    <button type="button" class="btn btn-primary mr-1 btn-sm">Previsualizar</button>
                    <a href="admRecursos.html">
                        <button type="button" class="btn btn-success btn-sm">Adm Recursos</button>
                    </a>
                </div>
             </td>
        </tr>
        `);

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

  

});
