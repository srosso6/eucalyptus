var React = require('react');
var ReactDOM = require('react-dom');
var AdminBox = require('./components/AdminBox.jsx');
var Koala = require('../library.jsx');

window.onload = function(){
    var sitename = Koala.getSiteName(window.location.href);

    Koala.checkValidSiteName(sitename)
    .then(function(valid) {
        if (valid) {
            ReactDOM.render(
                <AdminBox site={sitename}/>,
                document.getElementById('app')
            );
            Koala.loadCSS(sitename);
            document.title = "Eucalyptus - " + sitename + " - Admin";
        } else {
            window.location.href = "/";
        }
    }.bind(this));

}
