var React = require('react');
var LoginBox = require("./LoginBox.jsx");
var MenuBox = require("./MenuBox.jsx");
var PageEditPanel = require("./page/PageEditPanel.jsx");
var ErrorBox = require("./ErrorBox.jsx");

var AdminBox = React.createClass({
    getInitialState: function() {
        return {
            currentUser: null,
            error: null,
            page: "home"
        };
    },
    render: function() {

        var display = null;

        if (this.state.currentUser) {
            switch (this.state.page) {
                case "home":
                    display = (
                        <div>
                            <MenuBox setPage={this.setPage} />
                            <h1>Welcome to Admin</h1>
                        </div>
                    );
                    break;
                case "pages":
                    display = (
                        <div>
                            <MenuBox setPage={this.setPage} />
                            <PageEditPanel site={this.props.site} />
                        </div>
                    );
                    break;
                case "logout":
                    display = (<div>You wouldn't see this, it will destroy login session</div>);
                    break;
            }
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
