var React = require('react');
var Koala = require('../../library.jsx');
var display = null

var LoginBox = React.createClass({
    getInitialState: function() {
        return {
            founduser: null,
            userlogin: null,
            userpassword: null,
            error: null
        };
    },
    userInput: function(e) {
        this.setState({userlogin: e.target.value })
    },
    passwordInput: function(e) {
        this.setState({userpassword: e.target.value})
    },
    setFind: function(data) {
        if (data.error) {
            this.setState({error: "Incorrect Email or Password"})
        } else {
            this.setState({founduser: data}, function() {
                console.log("founduser:", this.state.founduser)
                this.checkIfAdmin(this.state.founduser._id, this.props.admin_id);
            })
        }

    },
    findUser: function(user) {
        // var request = new XMLHttpRequest()
        // request.onload = function() {
        //     if (request.status === 200) {
        //         if (request.responseText === "") {
        //             this.setState({error: "Incorrect Email or Password"});
        //         } else {
        //             this.setFind(JSON.parse(request.responseText));
        //         }
        //     }
        // }.bind(this)
        //
        // request.open("POST", "http://localhost:5000/"+this.props.site+"/users");
        // request.setRequestHeader("Content-Type", "application/json");
        // request.send(JSON.stringify(user));

        Koala.request("POST", this.props.site + "/users", user)
        .then(function(data) {
            if (data === '') {
                this.setState({error: "Incorrect Email or Password"});
            } else {
                this.setFind(data);
            }
        }.bind(this));

        // SWITCH TO Koala.request!
    },
    login: function(e) {
        e.preventDefault();
        this.findUser({email: this.state.userlogin, password: this.state.userpassword})


        // return {error: "WHAT THE ERROR WAS"} in this.props.login()
    },
    checkIfAdmin: function (user_id, admin_id) {
        if(user_id === admin_id) {
            console.log('am admin');
            this.props.login({user: user_id});
        } else {
            this.setState({error: "You are not admin!"})
        }
    },
    componentWillReceiveProps: function(nextProps) {
        var cookie = Koala.getCookie('EucalyptusUser');
        if (cookie) {
            this.checkIfAdmin(cookie, nextProps.admin_id);
        }
    },
    render: function() {
        var errorText = null;
        if (this.state.error) {
            errorText = (<div className="error">{this.state.error}</div>)
        }
        return (
            <div className='loginDiv'>
                <div className='headerDivLogin'>
                    <h1 className='h1Login'></h1>
                    <img className='leafs' src='/static/home/images/leafs.png'></img>
                </div>
                <div className='loginForm'>
                    <form>
                        <h1>Login:</h1>
                        <label className='loginLabel'>Username:</label>
                        <input className='loginInput' type='text' value={this.state.userlogin} onChange={this.userInput}></input>
                        <label className='loginLabel'>Password:</label>
                        <input className='loginInput' type='password' value={this.state.userpassword} onChange={this.passwordInput}></input>
                        <button className='loginButton' onClick={this.login}>Login</button>
                    </form>
                    {errorText}
                </div>
            </div>
        );
    }

});

module.exports = LoginBox;
