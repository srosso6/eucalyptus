var React = require('react');
var LoginBox = require("./LoginBox.jsx");
var MenuBox = require("./MenuBox.jsx");
var PageEditPanel = require("./page/PageEditPanel.jsx");
var ErrorBox = require("./ErrorBox.jsx");
var ColorPickerBox = require("./colors/ColorPickerBox.jsx");
var ThemeBox = require("./themes/ThemeBox.jsx");
var Koala = require('../../library.jsx');

var AdminBox = React.createClass({
    getInitialState: function() {
        return {
            admin_id: null,
            currentUser: null,
            error: null,
            page: "home"
        };
    },
    componentDidMount: function() {
        var url = this.props.site + "/";
        Koala.request("get", url + "general")
        .then(function(data) {
            this.setState({admin_id: data[0].admin_id})
        }.bind(this));
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
                case "colors":
                    display = (
                        <div>
                            <MenuBox setPage={this.setPage} />
                            <ColorPickerBox site={this.props.site} user={this.state.currentUser}/>
                        </div>
                    );
                    break;
                case "themes":
                    display = (
                        <div>
                            <MenuBox setPage={this.setPage} />
                            <ThemeBox site={this.props.site}/>
                        </div>
                    );
                    break;
                default:
                    display = (
                        <div>
                            <MenuBox setPage={this.setPage} />
                        </div>
                    );
                    break;
            }
        } else {
            display = (
                <div>
                    <LoginBox login={this.login} admin_id={this.state.admin_id} site={this.props.site}/>
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
        if (confirmed.user) {

            Koala.setCookie('EucalyptusUser', confirmed.user, 30);

            this.setState({currentUser: confirmed.user});
        } else {
            this.setState({error: confirmed.error});
        }
    },
    setPage: function(page) {
        console.log('click', page);
        if (page === "logout") {
            console.log('logout');
            Koala.deleteCookie('EucalyptusUser');
            this.setState({page: "home", currentUser: null});
        } else {
            this.setState({page: page});
        }
    }

});

module.exports = AdminBox;
