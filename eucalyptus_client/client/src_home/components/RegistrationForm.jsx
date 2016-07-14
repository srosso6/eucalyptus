const React = require('react');
const Koala = require('../../library.jsx');

const RegistrationForm = React.createClass({

  getInitialState: function() {
    return {
      name: "",
      password: "",
      confirmedPassword: null,
      email: "",
      sitename: "",
      error: null,
      validSitename: false
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
  addConfirmedPassword: function(e) {
      var password = e.target.value.trim();
      this.setState({confirmedPassword: password})
  },

  addEmail: function(event) {
    let email = event.target.value.trim();
    this.setState({email: email});
  },

  addSiteName: function(event) {
    let sitename = event.target.value.trim().toLowerCase().replace(/ /g, "");
    this.setState({sitename: sitename}, function() {
        this.confirmUnique();
    }.bind(this));
  },

  handleReg: function (event) {
    event.preventDefault();
    var sitename = this.state.sitename;
    if (this.state.name && this.state.password && this.state.email) {
        if(this.state.password === this.state.confirmedPassword) {
            if (this.state.validSitename) {
                let newUser = {
                  name: this.state.name,
                  access: 1,
                  password: this.state.password,
                  email: this.state.email
                }

                this.props.onRegistration(sitename, newUser);

                this.setState({
                  name: "",
                  password: "",
                  email: "",
                  sitename: ""
                });
            } else {
                // this.setState({error: "That site name is already taken"})
                this.setState({error: "taken"})
            }

        } else {
            // this.setState({error: "Passwords do not match!"})
            this.setState({error: "password"})
        }
    } else {
        this.setState({error: "alldata"})
    }

  },
  confirmUnique: function () {
      Koala.checkValidSiteName(this.state.sitename)
      .then(function(valid) {
          this.setState({validSitename: !valid});
      }.bind(this));
  },


  render: function() {
      var error = null
      if(this.state.error) {
          if(this.state.error === 'taken') {
              error = <img className='errorBubble2' src='/static/home/images/sitetaken.png'></img>
              setTimeout(function() {
                  this.setState({error: null}, function() {
                      error = null
                  }.bind(this))

              }.bind(this), 4000)
          }else if(this.state.error === 'password'){
              error = <img className='errorBubble2' src='/static/home/images/passwordstaken.png'></img>
              setTimeout(function() {
                  this.setState({error: null}, function() {
                      error = null
                  }.bind(this))

              }.bind(this), 4000)
          }else {
              error = <img className='errorBubble2' src='/static/home/images/alldata.png'></img>
              setTimeout(function() {
                  this.setState({error: null}, function() {
                      error = null
                  }.bind(this))

              }.bind(this), 4000)
          }
      }
    return (

      <div className='regBoxDiv'>
        <form onSubmit={this.handleReg}>

          <label htmlFor="name">Full Name:</label>
          <input type="text" name="name" onChange={this.addName}/><br/>

          <label htmlFor="password">Password:</label>
          <input type="password" name="password" onChange={this.addPassword}/><br/>

          <label htmlFor="password">Confirm password:</label>
          <input type="password" name="password" onChange={this.addConfirmedPassword}/><br/>

          <label htmlFor="email">Email:</label>
          <input type="email" name="email" onChange={this.addEmail}/><br/>

          <label htmlFor="sitename">Your Site Name:</label>
          <input type="text" name="sitename" onChange={this.addSiteName}/><br/>

          <button type="submit" className="sub-btn">Register</button>

        </form>
        {error}
      </div>
    );
  }

});

module.exports = RegistrationForm
