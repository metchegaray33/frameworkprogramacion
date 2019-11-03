$(document).ready(function() {
    $("#btnCrear").on("click", function(){
        guardar(getSaveItem());
        //alert(id_usuario);
        archive();
    });

    function guardar(item) {
    
        var url = "http://localhost:3700/api/save-Usuarios";
    
        ajaxCall(url, JSON.stringify(item), function(response) {
            try {
                var us = response.usuario;
                id_usuario=us._id;
                if (us._id != undefined)
                //alert("Ups! hubo un error! " + error)
                return id_usuario;
    
            } catch (error) {
                alert("Ups! hubo un error! " + error)
            }
            
        }, undefined, undefined, "POST");
        
    
    }
    
    function getSaveItem() {
        return $("#formRegistro").serializeFormJSON();
    }


function archive(){
    var fileInput = document.querySelector('#exampleFormControlFile1');

    var xhr = new XMLHttpRequest();

    xhr.open('POST', 'http://localhost:3700/api/upload-image/'+id_usuario); 

    var form = new FormData();

    form.append('file', fileInput.files[0]);

    xhr.send(form);
}





//}));
    /*var url = "http://localhost:3700/api/upload-image/" + id_usuario;

    ajaxCall(url, JSON.stringify(file), function(response) {
        try {
            var xhr = new XMLHttpRequest();
            var form = new FormData();

            form.append('file', fileInput.files[0]);

            xhr.send(form);
            var us = response.archivo;
            if (us._id != undefined)
            alert("Archivo ok");

        } catch (error) {
            alert(id_usuario)
        }
        
    }, undefined, undefined, "POST");*/

});
