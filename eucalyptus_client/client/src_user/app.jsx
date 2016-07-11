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

    var css = Koala.loadCSS(sitename);
    var styleTag = document.createElement("style");
    // styleTag.setAttribute('type', 'text/css');
    // styleTag.setAttribute('rel', 'stylesheet');
    // styleTag.setAttribute('href', `/${sitename}/currenttheme`);
    styleTag.innerHTML = css;
    document.getElementsByTagName('head')[0].appendChild(styleTag);
}
