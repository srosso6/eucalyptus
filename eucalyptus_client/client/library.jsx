var React = require('react');

module.exports = {

    request: function(reqtype, url, data=null) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onload = function() {
                if (request.status === 200) {
                    resolve(JSON.parse(request.responseText));
                } else {
                    reject(request.status);
                }
            }
            request.open(reqtype, "http://localhost:5000/" + url);
            if (reqtype !== "get" && reqtype !== "GET") {
                request.setRequestHeader('Content-Type', 'application/json');
            }
            request.send(data);
        });
    },

    generateHTML: function(data) {
        var el = React.createElement(data.etype, null, data.content);
        return el;
    },

    getSiteName: function (url) {
        let urlparts = url.split("/");
        let sitename = urlparts[3];
        return sitename;
    }

}
