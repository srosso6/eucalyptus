var React = require('react');
var LoginBox = require("./LoginBox.jsx");
var MenuBox = require("./MenuBox.jsx");
var EditPanel = require("./EditPanel.jsx");
var ErrorBox = require("./ErrorBox.jsx");
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
      // var elements = [];
      Koala.request("get", url + "general/1")
      .then(function(data) {
          this.setState({admin_id: data[0].admin_id})
      }.bind(this));
    },
    render: function() {

        var display = null;

        if (this.state.currentUser) {
            display = (
                <div>
                    <MenuBox setPage={this.setPage} />
                    <EditPanel page={this.state.page} site={this.props.site} />
                </div>
            );
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
