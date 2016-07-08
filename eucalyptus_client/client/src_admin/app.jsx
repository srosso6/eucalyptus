var React = require('react');
var ReactDOM = require('react-dom');
var AdminBox = require('./components/AdminBox.jsx');
var Koala = require('../library.jsx');

window.onload = function(){
    var sitename = Koala.getSiteName(window.location.href);
    ReactDOM.render(
        <AdminBox site={sitename} />,
        document.getElementById('app')
    );
    console.log("helloworld -  i am admin");
}
