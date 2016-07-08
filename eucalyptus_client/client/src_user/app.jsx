var React = require('react');
var ReactDOM = require('react-dom');
var UserBox = require('./components/UserBox.jsx');
var Koala = require('../library.jsx');

window.onload = function(){
    var sitename = Koala.getSiteName(window.location.href);
    ReactDOM.render(
        <UserBox sitename={sitename}/>,
        document.getElementById('app')
    );
    console.log("helloworld - i am user");
}
