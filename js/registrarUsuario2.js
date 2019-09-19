$(document).ready(function() {
    //cargarControles();
    $("#btnCrear").on("click", function(){
        guardar(getSaveItem()); 
        archive(getFile());
        //alert(id_usuario);
    });
});

function cargarControles() {
    setBtnCrearOnCliclEvent(); 
}

function setBtnCrearOnCliclEvent() {
    
}

function onCrearClick() {
    
}

//id_usuario = guardar(getSaveItem());

function archive(file){
    var u = 'http://localhost:3700/api/upload-image/'+id_usuario;
    var form = new FormData();
    form.append('file', fileInput.files[0]);
    xhr.send(form);

    ajaxCall(u, JSON.stringify(file), function(reponse){
        try {
            var elo = reponse._id;
            if (elo._id != undefined){
                alert("U")
            }

        } catch (error) {
            alert("Ups! hubo un error! " + error)
        }

    }, undefined,undefined, "POST" );
}

function getFile(){
    return document.querySelector('#exampleFormControlFile1').serializeFormJSON();
}

function guardar(item) {
    
    var url = "http://localhost:3700/api/save-Usuarios";
    //var id_usuario;

    ajaxCall(url, JSON.stringify(item), function(response) {
        try {
            var us = response.usuario;
            id_usuario=us._id;
            if (us._id != undefined)
            return id_usuario;

        } catch (error) {
            alert("Ups! hubo un error! " + error)
        }
        
    }, undefined, undefined, "POST");

}

function getSaveItem() {
    return $("#formRegistro").serializeFormJSON();
}
