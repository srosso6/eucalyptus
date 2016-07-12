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

    Koala.loadCSS(document, sitename);
}
