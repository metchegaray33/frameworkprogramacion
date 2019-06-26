$(document).ready(function(){
    var div = "";

    $('#cardPreguntas').click(function(){
      div = $('#divBusqueda').detach();
      $('main').html('<div class="container">\
         <div class="border-bottom border-dark">\
            <p class="text-primary">¿Como crear una cuenta nueva?</p>\
            <p>Para crear una cuenta nueva, es necesario hacer click en el boton "Crear Cuenta" y completar el formulario con los datos necesarios</p>\
         </div>\
         <div>\
            <button id="botonVolver" class="btn btn-outline-danger btn-sm mt-4">Volver</button>\
         </div>\
      </div>');
   });

   $('#cardContacto').click(function(){
      div = $('#divBusqueda').detach();
      $('main').html('<div class="container row">\
         <div class="col-md-6">\
            <h3 id="sedes">Sedes</h3>\
            <p class="mt-4">Zabala 1837 [C1426DQG], CABA, Argentina</p>\
            <p>Sede Belgrano: Zabala 1837 - CABA (C1426DQG)</p>\
            <p>Sede Villanueva: Villanueva 1324 - CABA.</p>\
            <p>Sede Lacroze: Federico Lacroze 1947 / 1959 - CABA.</p>\
            <p>Sede Tribunales: Tucumán 1489 - CABA.</p>\
            <p>Sede Tigre: Newton y Solís - Tigre, Buenos Aires.</p>\
            <p>Sede Córdoba: Mariano Moreno 410, 2° Piso - Córdoba.</p>\
         </div>\
         <div class="col-md-4">\
            <h3>Mail</h3>\
            <p class="mt-4">ingresos@ub.edu.ar</p>\
         </div>\
         <div class="col-md-2">\
            <h3>Telefono</h3>\
            <p class="mt-4">+54-11-4788-5400</p>\
         </div>\
         <div class="container" id="botonVolver">\
            <button class="btn btn-outline-danger btn-sm mt-4">Volver</button>\
         </div>\
      </div>');
   });


   $('main').on('click', '#botonVolver', function() {
      $('main').html(div);
   });

   
});