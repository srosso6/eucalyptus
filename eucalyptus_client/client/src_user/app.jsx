var React = require('react');
var ReactDOM = require('react-dom');
var UserBox = require('./components/UserBox.jsx');
var Koala = require('../library.jsx');

window.onload = function(){
    var sitename = Koala.getSiteName(window.location.href);
    var pagename = Koala.getPageName(window.location.href);
    ReactDOM.render(
        <UserBox sitename={sitename} pagename={pagename}/>,
        document.getElementById('app')
    );
    console.log("helloworld - i am user");

    // var css = Koala.loadCSS(sitename);
    var styleTag = document.createElement("style");
    // var linkTag = document.createElement("link");
    // linkTag.setAttribute('type', 'text/css');
    // linkTag.setAttribute('rel', 'stylesheet');
    // linkTag.setAttribute('href', `http://localhost:5000/${sitename}/currenttheme`);

    // Koala.request("get", sitename+"/currenttheme")
    // .then(function (data) {
    //     styleTag.innerHTML = data;
    //     document.getElementsByTagName('head')[0].appendChild(styleTag);
    // });
    var request = new XMLHttpRequest()
    request.onload = function() {
        if(request.status === 200) {
            styleTag.innerHTML = request.responseText
            document.getElementsByTagName('head')[0].appendChild(styleTag);
        }
    }
    request.open('GET', 'http://localhost:5000/'+sitename+'/currenttheme')
    request.send(null);

    // document.getElementsByTagName('head')[0].appendChild(styleTag);
    // document.getElementsByTagName('head')[0].appendChild(linkTag);
}
