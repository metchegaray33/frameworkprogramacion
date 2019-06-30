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

(function ($) {
    $.fn.serializeFormJSON = function () {

        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name]) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };
})(jQuery);