$().ready(function(){
    $('.table tbody').on('click','#borrar',function(){
        $(this).closest('tr').remove();
    });

    $('.table tbody').on('click','#btnVisualizar',function(){

    // MODAL CON LA PREVISUALIZACION DE LOS OBJETOS

        $('main').append(`

        <div class="modal fade md-6 border rounded" id="modelId" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
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