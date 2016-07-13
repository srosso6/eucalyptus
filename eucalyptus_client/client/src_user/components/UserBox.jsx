var React = require('react');
var Koala = require('../../library.jsx');

var UserBox = React.createClass({
    getInitialState: function() {
        return {
          info: null,
          pages: [],
          page: null,
          elements: []
        };
    },

    componentDidMount: function() {
        var url = this.props.sitename + "/";
        Koala.request("get", url + "general")
        .then(function(gen_data) {
            var page = gen_data[0].index;
            if (this.props.pagename) {
                page = this.props.pagename;
            }

            this.setState({info: gen_data[0], page: page})
            Koala.request("get", url + "pages/" + page)
            .then(function(page_data) {
                Koala.request("get", url + "elements/" + page_data[0]._id)
                .then(function(element_data) {
                    this.setState({elements: Koala.generateElements(element_data)});
                }.bind(this));
            }.bind(this));

            Koala.request("GET", url + "pages/")
            .then(function(data){
                this.setState({pages: data});
            }.bind(this));

        }.bind(this));
    },

    changePage: function(e){
        this.setState({page: Koala.getPageName(e.target.href)}, function () {
            this.loadPage(this.state.page);
        }.bind(this));
    },

    loadPage: function (page) {
        Koala.request("get", this.props.sitename + "/pages/" + page)
        .then(function(page_data) {
            Koala.request("get", this.props.sitename + "/elements/" + page_data[0]._id)
            .then(function(element_data) {
                this.setState({elements: Koala.generateElements(element_data)});
            }.bind(this));
        }.bind(this));
    },

    render: function() {

        var pages = this.state.pages.map(function(page, index){
            var slug = this.props.sitename + "#" + page.slug
            return (
                <button><a href={slug} key={index} onClick={this.changePage}>{page.name}</a></button>
            )
        }.bind(this))

        var adminLink = null;

        if (Koala.getCookie("EucalyptusUser")) {
            adminLink = (<a href={"/"+this.props.sitename+"/admin"}
            className="edit-page"
            onClick={this.changePage}>EDIT YOUR SITE</a>);
        }


        return (
            <div>
                <div className="navbar">
                    {adminLink}
                    {pages}
                </div>
                <div key="elements">{this.state.elements}</div>
            </div>
        );
    }

});

module.exports = UserBox;
