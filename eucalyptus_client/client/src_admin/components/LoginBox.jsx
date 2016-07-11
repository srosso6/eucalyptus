var React = require('react');
// var Koala = require('../../library.jsx');
var display = null

var LoginBox = React.createClass({
    getInitialState: function() {
        return {
            founduser: null,
            userlogin: null,
            userpassword: null
        };
    },
    // componentDidMount: function() {
    //     if(this.state.userlogin) {
    //         this.findUser({email: this.state.userlogin, password: this.state.userpassword})
    //     }
    // },
    userInput: function(e) {
        this.setState({userlogin: e.target.value })
    },
    passwordInput: function(e) {
        this.setState({userpassword: e.target.value})
    },
    setFind: function(data) {
        this.setState({founduser: data}, function() {
            console.log("founduser:", this.state.founduser)
            this.checkIfAdmin();
            // this.findUser({email: this.state.userlogin, password: this.state.userpassword})

        })
    },
    findUser: function(user) {
        var request = new XMLHttpRequest()
        request.onload = function() {
            if (request.status === 200) {
                // console.log("User:", user);
                // console.log("founduser:", request.responseText);
            }
            this.setFind(JSON.parse(request.responseText));
            // console.log('here',this.state.founduser._id);
        }.bind(this)

        request.open("POST", "http://localhost:5000/"+this.props.site+"/users");
        request.setRequestHeader("Content-Type", "application/json");
        request.send(JSON.stringify(user));
    },
    login: function(e) {
        e.preventDefault();
        this.findUser({email: this.state.userlogin, password: this.state.userpassword})


        // return {error: "WHAT THE ERROR WAS"} in this.props.login()
    },
    checkIfAdmin: function () {
        if(this.state.founduser._id === this.props.admin_id) {
            this.props.login({user: this.state.founduser._id});
        } else {
            console.log(this.state.founduser._id);
            console.log(this.props.admin_id);
            display = <h1>WRONG</h1>
        }
    },
    render: function() {

        return (
            <div>
              <form>
                <h1>Login:</h1>
                <label>Username:</label>
                <input type='text' value={this.state.userlogin} onChange={this.userInput}></input>
                <label>Password:</label>
                <input type='text' value={this.state.userpassword} onChange={this.passwordInput}></input>
                <button onClick={this.login}>Login</button>
              </form>

            </div>

        );
    }

});

module.exports = LoginBox;
