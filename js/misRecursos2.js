$(document).ready(function(){
	tout();

var products = "";

function tout(){
ajaxCall("http://localhost:3700/api/Recursos", null, function(response) {

for(var n=0; n<response.recursos.length; n++) {if (window.CP.shouldStopExecution(1)){break;}

	var tipo = response.recursos[n].tipo,
		formato = response.recursos[n].formato,
		titulo = response.recursos[n].titulo,
		idioma = response.recursos[n].idioma;
		autor = response.recursos[n].autor;
		image = "imagenes/recursos.jpg";
		_id = response.recursos[n]._id;
		id_archivo = response.recursos[n].id_archivo;
	
	//create recursos cards
	products += "<div class='row product' id='recurso' data-id_archivo='"+id_archivo+"' data-tipo='"+tipo+"' data-formato='"+formato+"' data-titulo='"+titulo+"' data-idioma='"+idioma+"' data-_id='"+_id+"'><div class='col-sm-md-7'><img src='"+image+"'></div><div class='col-sm-md-5 ml-5'> <br/><h3>"+titulo+" </h3> <p id='titre'>Tipo: </p>"+tipo +"<br /><p id='titre'>Formato: </p> "+formato+"<br /><p id='titre'>Idioma: </p> "+idioma+"<br /><p id='titre'>Autor: </p> "+autor+" <div class='modal-footer mt-5 justify-content-start'><button class='btn btn-primary' id='1'>Ver el recurso</button><button class='btn btn-danger' id='2'>Borrar</button><button class='btn btn-success' id='3'>Modificar</button></div></div></div><br>";
}


window.CP.exitedLoop(1);

$("#pro").html(products);

var filtersObject = {};

//on filter change
$(".filter").on("change",function() {
	var filterName = $(this).data("filter"),
		filterVal = $(this).val();
	
	if (filterVal == "") {
		delete filtersObject[filterName];
	} else {
		filtersObject[filterName] = filterVal;
	}
	
	var filters = "";
	
	for (var key in filtersObject) {if (window.CP.shouldStopExecution(2)){break;}
	  	if (filtersObject.hasOwnProperty(key)) {
			filters += "[data-"+key+"='"+filtersObject[key]+"']";
	 	 }
	}

window.CP.exitedLoop(2);

	if (filters == "") {
		$(".product").show();
	} else {
		$(".product").hide();
		$(".product").hide().filter(filters).show();
	}
});

//on search form submit
$("#search-form").submit(function(e) {
	e.preventDefault();
	var query = $("#search-form input").val().toLowerCase();

	$(".product").hide();
	$(".product").each(function() {
		var tipo = $(this).data("tipo").toLowerCase(),
			formato = $(this).data("formato").toLowerCase(),
			idioma = $(this).data("idioma").toLowerCase();
			titulo = $(this).data("titulo").toLowerCase();

		if (tipo.indexOf(query) > -1 || formato.indexOf(query) > -1 || idioma.indexOf(query) > -1 || titulo.indexOf(query) > -1) {
			$(this).show();
		}
	});
});

$(".modal-footer").on("click", "#1", function(){
	var data = $(this).parents(".product").data();
		loadArchivo(data.id_archivo);
	});	

$(".modal-footer").on("click", "#2", function(){
	var data = $(this).parents(".product").data();
		borrar(getmodif(),"http://localhost:3700/api/Recurso/" + data._id);
	});	

$(".modal-footer").on("click", "#3", function(){
	$('#dialogPreview2').modal("show");
	var data = $(this).parents(".product").data();
	$('#dialogPreview2').on("click", "#btnModificar", function() {
	modif(getmodif(),"http://localhost:3700/api/Recurso/"+ data._id);
	})
})

}, undefined,undefined, "GET");
}

function borrar(item,url) {
	ajaxCall(url, JSON.stringify(item), function() {
		try {
			alert("Recurso correctamente borrado ");
			document.location.reload();

		} catch (error) {
			alert("Ups! hubo un error! " + error)
		}
	}, undefined, undefined, "DELETE");

}

function modif(item, url) {

	ajaxCall(url, JSON.stringify(item), function(response) {
		try {
			var us = response.recurso;
			if (us._id != undefined)
				alert("Recurso correctamente modificado " + us.titulo);

		} catch (error) {
			alert("Ups! hubo un error! " + error)
		}
	}, undefined, undefined, "PUT");
}


function getmodif() {
	return $("#formRecurso2").serializeFormJSON();
}

function loadArchivo(id) {
	ajaxCall("http://localhost:3700/api/Archivo/" + id, null, function(response) {
		if (response.archivo.tipo_archivo = "pdf") {
			window.open("model/" + response.archivo.path);
		} else if (response.archivo.tipo_archivo = "jpg" || "jpeg" || "png") {
			chargerImage(document.getElementById("lol"), "model/" + response.archivo.path);
		} else {
			Modif_SRC("model/" + response.archivo.path);
		}

	}, undefined, undefined, "GET");
}

var video = document.getElementById('audioPlayer');
//var src = video.getAttribute('src'); 

function Modif_SRC(src_video) {
	video.removeAttribute('src');
	video.setAttribute('src', src_video);
	alert(source.src);
}

function chargerImage(img, src) {
	// on crée l'objet
	var image = new Image();

	// événements : cas d'erreur
	image.onload = function() {
		alert("Chargement ok");
	}
	image.onerror = function() {
		alert("Erreur lors du chargement de l'image");
	}
	image.onabort = function() {
		alert("Chargement interrompu");
	}
	image.onload = function() {
			img.src = image.src;
			window.open(image.src);
			img.width = image.width;
			img.height = image.height;
		}
		// on modifie l'adresse de l'objet "image", ce qui lance le chargement
	image.src = src;
}

});