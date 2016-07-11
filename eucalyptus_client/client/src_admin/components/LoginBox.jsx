var React = require('react');
var Koala = require('../../library.jsx');
var display = null

var LoginBox = React.createClass({
    getInitialState: function() {
        return {
            founduser: null,
            userlogin: null,
            userpassword: null
        };
    },
    userInput: function(e) {
        this.setState({userlogin: e.target.value })
    },
    passwordInput: function(e) {
        this.setState({userpassword: e.target.value})
    },
    setFind: function(data) {
        this.setState({founduser: data}, function() {
            console.log("founduser:", this.state.founduser)
            this.checkIfAdmin(this.state.founduser._id);
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

        // SWITCH TO Koala.request!
    },
    login: function(e) {
        e.preventDefault();
        this.findUser({email: this.state.userlogin, password: this.state.userpassword})


        // return {error: "WHAT THE ERROR WAS"} in this.props.login()
    },
    checkIfAdmin: function (user_id) {
        if(user_id === this.props.admin_id) {
            console.log('am admin');
            this.props.login({user: user_id});
        } else {
            console.log('not admin, f off');
            console.log('f_user',user_id);
            console.log('a_user',this.props.admin_id);
            display = <h1>WRONG</h1>
        }
    },
    render: function() {
        var cookie = Koala.getCookie('EucalyptusUser');
        if (cookie) {
            this.checkIfAdmin(cookie);
        }
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
