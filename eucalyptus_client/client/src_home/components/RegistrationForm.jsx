const React = require('react');

const RegistrationForm = React.createClass({

  getInitialState: function() {
    return {
      name: "",
      password: "",
      email: "",
      sitename: ""
    }
  },

  addName: function(event) {
    let name = event.target.value.trim();
    this.setState({name: name});
  },

  addPassword: function(event) {
    let password = event.target.value.trim();
    this.setState({password: password});
  },

  addEmail: function(event) {
    let email = event.target.value.trim();
    this.setState({email: email});
  },

  addSiteName: function(event) {
    let sitename = event.target.value.trim().toLowerCase().replace(/ /g, "");
    this.setState({sitename: sitename}, function() {
        console.log("sitename", sitename);
    });
  },

  handleReg: function (event) {
    event.preventDefault();
    let sitename = this.state.sitename;

    console.log('sitename', sitename);

    let newUser = {
      name: this.state.name,
      access: 1,
      password: this.state.password,
      email: this.state.email
    }

  // check if not completed ... then don't contact server
    this.props.onRegistration(sitename, newUser);

    this.setState({
      name: "",
      password: "",
      email: "",
      sitename: ""
    });
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.handleReg}>

          <label htmlFor="name">Full Name:</label>
          <input type="text" name="name" onChange={this.addName}/><br/>

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={this.addPassword}/><br/>

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={this.addEmail}/><br/>

          <label htmlFor="sitename">Your Site Name:</label>
          <input type="text" name="sitename" onChange={this.addSiteName}/><br/>

          <button type="submit" className="sub-btn">Register</button>

        </form>
      </div>
    );
  }

});

module.exports = RegistrationForm
