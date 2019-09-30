var tableId = "tablaRecursos";

$(document).ready(function() {
    loadData();

    function borrar(item, url) {
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

    function loadData() {
        ajaxCall("http://localhost:3700/api/Recursos", null, function(response) {
            loadGrid(response.recursos);
        }, undefined, undefined, "GET");
    }

    function loadArchivo(id) {
        ajaxCall("http://localhost:3700/api/Archivo/" + id, null, function(response) {
            if (response.archivo.tipo_archivo = "pdf") {
                location.replace("model/" + response.archivo.path);
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
                location.replace(image.src);
                img.width = image.width;
                img.height = image.height;
            }
            // on modifie l'adresse de l'objet "image", ce qui lance le chargement
        image.src = src;
    }

    function populatePreviewRecursos(data) {
        setPreviewRecursosTitulo(data.titulo);
        setPreviewRecursosLongDesc(data.tema);
    }


    function setPreviewRecursosTitulo(value) {
        $("#previewRecursosTitulo").text(value);
    }

    function setPreviewRecursosLongDesc(value) {
        $("#previewRecursosLongDesc").text(value);
    }

    function generateGridButtons() {
        return "<button type='button' class= 'btn btn - success btn-sm preview' >Previsualizar</button>" +
            "<button type='button' class= 'btn btn-warning btn-sm seeUsage' data-toggle='popover' data-trigger='hover'> Ver usos</button>" +
            "<button type='button' class='btn btn-success ml-1 btn-sm'>Modificar</button>" +
            '<button type="button" class="btn btn-danger ml-1 btn-sm">Borrar</button>';
    }


    function loadGrid(data) {

        var table = $('#' + tableId).DataTable({
            data: data /*jsonRecursos*/ ,
            columns: [
                { title: "Título", data: "titulo", visible: true },
                { title: "Tipo", data: "tipo" },
                { title: "Autor", data: "autor" },
                //{ title: "Tema", data: "tema", visible: true }
                //{ title: "buttons", data: "button" }
                // { title: "usages", data: "usages", visible: false },
                // { title: "cantUSages", data: "cantUSages", visible: false },

            ],
            "columnDefs": [{
                "targets": 3,
                "data": null,
                "defaultContent": generateGridButtons()
            }]
        });

        $('#tablaRecursos tbody').on('click', 'button.btn.btn.-.success.btn-sm.preview', function() {
            var data = table.row($(this).parents('tr')).data();
            populatePreviewRecursos(data);
            $('#dialogPreview').modal("show");
            if (data.url != "") {
                $('#previewRecursosLongUrl').css({ visibility: "visible" });
                $('#previewRecursosLongArchivo').css({ visibility: "hidden" });
            } else if (data.formato != "Sitio Web") {
                $('#previewRecursosLongUrl').css({ visibility: "hidden" });
                $('#previewRecursosLongArchivo').css({ visibility: "visible" });
            }
            $('#dialogPreview').on("click", "#previewRecursosLongUrl", function setPreviewRecursosUrl() {
                location.replace(data.url);
            });
            $('#dialogPreview').on("click", "#previewRecursosLongArchivo", function setPreviewRecursosUrl2() {
                loadArchivo(data.id_archivo);
            });
        });


        $('#tablaRecursos tbody').on('click', 'button.btn.btn-danger.ml-1.btn-sm', function() {
            var data = table.row($(this).parents('tr')).data();
            borrar(getmodif(), "http://localhost:3700/api/Recurso/" + data._id);
        });

        $('#tablaRecursos tbody').on('click', 'button.btn.btn-success.ml-1.btn-sm', function() {
            var data = table.row($(this).parents('tr')).data();
            $('#dialogPreview2').modal("show");
            $('#dialogPreview2').on("click", "#btnModificar", function() {
                modif(getmodif(), "http://localhost:3700/api/Recurso/" + data._id);
            });
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

        return data;
    }

});