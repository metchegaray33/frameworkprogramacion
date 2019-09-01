"use strict";
exports.__esModule = true;
var UploadService = /** @class */ (function() {
    function UploadService() {
        this.url = "http://localhost:3700/api/";
    }
    UploadService.prototype.makeFileRequest = function(url, params, files, name) {
        return new Promise(function(resolve, reject) {
            var formData = new FormData();
            var xhr = new XMLHttpRequest();
            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            };
            xhr.open('POST', url, true);
            xhr.send(formData);
        });
    };
    return UploadService;
}());
exports.UploadService = UploadService;