var React = require('react');
var ReactDOM = require('react-dom');
var HomeBox = require('./components/HomeBox.jsx');

window.onload = function(){
    ReactDOM.render(
        <HomeBox/>,
        document.getElementById('app')
    );
}
