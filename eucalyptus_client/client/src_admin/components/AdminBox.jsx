var React = require('react');
var LoginBox = require("./LoginBox.jsx");
var MenuBox = require("./MenuBox.jsx");
var EditPanel = require("./EditPanel.jsx");
var ErrorBox = require("./ErrorBox.jsx");

var AdminBox = React.createClass({
    getInitialState: function() {
        return {
            currentUser: null,
            error: null,
            page: null
        };
    },
    render: function() {

        var display = null;

        if (this.state.currentUser) {
            display = (
                <div>
                    <MenuBox setPage={this.setPage}/>
                    <EditPanel page={this.state.page}/>
                </div>
            );
        } else {
            display = (
                <div>
                    <LoginBox login={this.login}/>
                    <ErrorBox errorMessage={this.state.error} />
                </div>
            );
        }

        return (
            <div>
                {display}
            </div>
        );
    },
    login: function(confirmed) {
        if (confirmed) {
            this.setState({currentUser: confirmed.user});
        } else {
            this.setState({error: confirmed.error});
        }
    },
    setPage: function(page) {
        this.setState({page: page});
    }

});

module.exports = AdminBox;
