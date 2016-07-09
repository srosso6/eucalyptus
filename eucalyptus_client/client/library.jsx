var React = require('react');

module.exports = {

    request: function(reqtype, url, data=null) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onload = function() {
                if (request.status === 200) {
                  if(request.responseText === "") {
                    resolve(request.responseText)
                  } else {
                    resolve(JSON.parse(request.responseText));
                  }
                } else {
                    reject(request.status);
                }
            }
            request.open(reqtype, "http://localhost:5000/" + url);
            if (reqtype !== "get" && reqtype !== "GET") {
                request.setRequestHeader('Content-Type', 'application/json');
            }
            request.send(JSON.stringify(data));
        });
    },

    generateHTML: function(data) {
        return React.createElement(data.etype, {key: data.order}, data.content);
    },

    getSiteName: function (url) {
        let urlparts = url.split("/");
        let sitename = urlparts[3];
        return sitename;
    }

}
