var React = require('react');

var LoginBox = React.createClass({

    render: function() {
        var login = function(e) {
            e.preventDefault();
            this.props.login({user: "577fa983a82fe6af45c36864"});

            // return {error: "WHAT THE ERROR WAS"} in this.props.login()
        }.bind(this);

        return (
            <div>
                <button onClick={login}>Login</button>
            </div>
        );
    }

});

module.exports = LoginBox;
