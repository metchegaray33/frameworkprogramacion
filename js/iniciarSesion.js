function hello(){
    alert("coucou");
}

function getInfo(){

    
ajaxCall("http://localhost:3700/api/usuarios", null, function(response) {

for (var n=0; n<response.usuarios.length; n++){
    var mail = response.usuarios[n].username;
    var mdp = response.usuarios[n].password;
    
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;

    if (username== mail && password == mdp){
        alert ("vous êtes connectés !");
        //location.replace("http://127.0.0.1:5500/index2.html");
        //$("#profil").text("Hola" + mail) ;
        $("#btnIniciarSesion").html('<p> Hola '+mail+'</p>')
        return;
    }
}
alert ("erreur de connexion");


}, undefined, undefined, "GET");

}
