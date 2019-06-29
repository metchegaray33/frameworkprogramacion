function ajaxCall(url, data, onSucced, onFailure, async,type) {
    //if (!VerificarSesion())
    //    return;

    if (type == undefined)
        type = 'POST';

    var oConfig = {
        type: type,
        contentType: "application/json; charset=utf-8",
        url: url,
        dataType: "json",
        success: function (response) {
            onSucced(response);
        },
        fail: function (d) {
            alert(d.responseText);
        }
    };

    if (data)
        oConfig.data = data;

    if (async != undefined)
        oConfig.async = async;

    $.ajax(oConfig);
};