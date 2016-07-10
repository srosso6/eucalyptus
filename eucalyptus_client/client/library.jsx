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
            if (data) {
                data = JSON.stringify(data);
                console.log('new data', data);
            }
            request.send(data);
        });
    },

    generateHTML: function(data, onDoubleClickFunction) {
        return React.createElement(data.etype, {key: data.order, onDoubleClick: onDoubleClickFunction}, data.content);
    },

    getSiteName: function (url) {
        let urlparts = url.split("/");
        let sitename = urlparts[3];
        return sitename;
    },

    generateElements: function(elementsCore) {
        elementsCore = elementsCore.sort(function(a, b) {
            return a.order - b.order;
        });

        var elements = elementsCore.map(function(element) {
            return this.generateHTML(element);
        }.bind(this));

        return elements;
    }

}
