var React = require('react');
var ReactDOM = require('react-dom');
var SiteBox = require('./components/SiteBox.jsx');

window.onload = function(){
  ReactDOM.render(
    <SiteBox url="http://localhost:5000/api/sites"/>,
    document.getElementById('app')
  );
}
