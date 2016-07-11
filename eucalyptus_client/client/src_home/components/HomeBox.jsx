const React = require('react');
const Koala = require('../../library.jsx');
const RegistrationForm = require('./RegistrationForm.jsx');

const HomeBox = React.createClass({

  registerUser: function (sitename, newUser) {
    var url = sitename + "/register";

    Koala.request("POST", url, newUser)
    .then(function () {
        window.location.href = "http://localhost:3000/" + sitename + "/admin";
    })
    .catch(function(error) {
        console.error("Cannot redirect");
    });
  },

  render: function() {
    return (
      <div>
        <RegistrationForm onRegistration={this.registerUser}/>
      </div>
    );
  }

});

module.exports = HomeBox;

// need to call a login method from Koala to log-in user once re-directed
