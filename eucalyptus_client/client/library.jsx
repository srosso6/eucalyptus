var React = require('react');

module.exports = {

    request: function(reqtype, url, data={}, isJSON=true) {
        return new Promise(function(resolve, reject) {
            var request = new XMLHttpRequest();
            request.onload = function() {
                if (request.status === 200) {
                    if(request.responseText === "") {
                        resolve(request.responseText)
                    } else {
                        if (isJSON) {
                          resolve(JSON.parse(request.responseText));
                        } else {
                          resolve(request.responseText);
                        }
                    }
                } else {
                    reject(request.status);
                }
            }
            var requrl = "http://localhost:5000/" + url;
            request.open(reqtype, requrl);
            if (reqtype !== "get" && reqtype !== "GET") {
                request.setRequestHeader('Content-Type', 'application/json');
            }
            request.send(JSON.stringify(data));
        });
    },

    generateHTML: function(data, onDoubleClickFunction, notEditing=true) {
        var extrasObj = {key: data._id, onDoubleClick: onDoubleClickFunction, className: `user_${data.etype}`};
        var hrefObj = {};
        var content = data.content;
        if (data.etype === "img") {
            hrefObj = {src: data.url, height: "100px", width: "100px"};
            content = null;
        } else if (data.etype === "a" && notEditing) {
            hrefObj = {href: data.url};
        }
        Object.assign(extrasObj, hrefObj);
        return React.createElement(data.etype, extrasObj, content);

    },

    getSiteName: function (url) {
        let urlparts = url.split("/");
        let sitename = urlparts[3];
        let test = sitename.split("#");
        return test[0];
    },

    getPageName: function(url) {
        let urlparts = url.split("#");
        console.log("url", urlparts);
        let pagename = urlparts[1];
        return pagename;
    },

    generateElements: function(elementsCore) {
        elementsCore = elementsCore.sort(function(a, b) {
            return a.order - b.order;
        });

        var elements = elementsCore.map(function(element) {
            return this.generateHTML(element);
        }.bind(this));

        return elements;
    },

    setCookie: function(name, value, expDays) {
        var expiryDate = new Date();
        expiryDate.setTime(expiryDate.getTime() + (expDays*24*60*60*1000));
        document.cookie = name+"="+value+"; "+"expires=" + expiryDate.toGMTString();
    },
    getCookie: function(name) {
        var re = new RegExp(`(?:(?:^|.*;\s*)${name}\s*\=\s*([^;]*).*$)|^.*$`);
        var cookieValue = document.cookie.replace(re, "$1");
        return cookieValue;
    },
    deleteCookie: function(name) {
        document.cookie = name+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    },
    loadCSS: function(sitename) {
      var styleTag = document.createElement("style");

      this.request("get", sitename+'/currenttheme', null, false)
      .then(function(data) {
        styleTag.innerHTML = data;
        var parent = document.getElementsByTagName('head')[0];
        parent.insertBefore(styleTag, parent.firstChild);
      });
    }

}
