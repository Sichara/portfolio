/**
 * Created by 1 on 24.11.2015.
 */
var API = {
    action: function (url, data, callback) {
        var xhr = new XMLHttpRequest();

        xhr.open('POST', url, true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=utf-8');

        xhr.send(JSON.stringify(data));

        xhr.onreadystatechange = function () {
            if (xhr.readyState != 4) return;

            if (xhr.status === 200) {
                callback(JSON.parse(xhr.response));
            } else {
                console.log(xhr.status, xhr.statusText);
            }
        };
    }
};