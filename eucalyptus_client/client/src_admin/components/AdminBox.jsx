var React = require('react');
var LoginBox = require("./LoginBox.jsx");
var MenuBox = require("./MenuBox.jsx");
var PageEditPanel = require("./page/PageEditPanel.jsx");
var ElementsPanel = require("./page/ElementsPanel.jsx");
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
            menuItem: "pages"
        };
    },

    componentDidMount: function() {
        var url = this.props.site + "/";
        Koala.request("get", url + "general")
        .then(function(data) {
            this.setState({admin_id: data[0].admin_id})
        }.bind(this));
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
    },

    setMenuItem: function(item) {
        if (item === "logout") {
            Koala.deleteCookie('EucalyptusUser');
            this.setState({menuItem: "pages", currentUser: null});
        } else {
            this.setState({menuItem: item});
        }
    },

    render: function() {

        var display = null;

        if (this.state.currentUser) {
            switch (this.state.menuItem) {
                case "pages":
                    display = (
                        <div className="page-container">
                            <MenuBox setMenuItem={this.setMenuItem} />
                            <PageEditPanel site={this.props.site} />
                        </div>
                    );
                    break;
                case "colors":
                    display = (
                        <div className="page-container">
                            <MenuBox setMenuItem={this.setMenuItem} />
                            <ColorPickerBox site={this.props.site} user={this.state.currentUser}/>
                        </div>
                    );
                    break;
                case "fonts":
                    display = (
                        <div className="page-container">
                            <MenuBox setMenuItem={this.setMenuItem} />
                        </div>
                    );
                    break;
                case "themes":
                    display = (
                        <div className="page-container">
                            <MenuBox setPage={this.setPage} setMenuItem={this.setMenuItem}/>
                            <ThemeBox site={this.props.site}/>
                        </div>
                    );
                    break;
                default:
                    display = (
                        <div className="page-container">
                            <MenuBox setMenuItem={this.setMenuItem} />
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
            <div className="overall-container">
                {display}
            </div>
        );
    }

});

module.exports = AdminBox;
