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
        // var elements = [];
        Koala.request("get", url + "general")
        .then(function(gen_data) {
            // console.log("pages", gen_data);
            var page = gen_data[0].index;
            if (this.props.pagename) {
                page = this.props.pagename;
            }

            this.setState({info: gen_data[0], page: page})
            Koala.request("get", url + "pages/" + page)
            .then(function(page_data) {

                console.log('page', page_data);
                Koala.request("get", url + "elements/" + page_data[0]._id)
                .then(function(element_data) {
                    // var sortedData = element_data.sort(function(a, b) {
                    //     return a.order - b.order;
                    // });
                    //
                    // var elements = [];
                    //
                    // for (var element of sortedData) {
                    //     elements.push(Koala.generateHTML(element));
                    // }
                    this.setState({elements: Koala.generateElements(element_data)});
                }.bind(this));
            }.bind(this));

            Koala.request("GET", url + "pages/")
            .then(function(data){
                console.log("here are the pages", data);
                this.setState({pages: data}, function() {
                    console.log("state of pages", this.state.pages)
                }.bind(this));
            }.bind(this));

        }.bind(this));
    },

    changePage: function(e){
        console.log(Koala.getPageName(e.target.href));
        this.setState({page: Koala.getPageName(e.target.href)}, function () {
            this.loadPage(this.state.page);
        }.bind(this));
    },

    loadPage: function (page) {
        var url = this.props.sitename + "/";
        Koala.request("get", url + "pages/" + page)
        .then(function(page_data) {
            console.log('page', page_data);
            Koala.request("get", url + "elements/" + page_data[0]._id)
            .then(function(element_data) {
                this.setState({elements: Koala.generateElements(element_data)});
            }.bind(this));
        }.bind(this));
    },

    render: function() {

        var pages = this.state.pages.map(function(page, index){
            var slug = this.props.sitename + "#" + page.slug
            return (
                <a href={slug} key={index} onClick={this.changePage}>{page.slug}</a>
            )
        }.bind(this))


        return (
            <div >
                <div className="navbar">
                    {pages}
                </div>
                <div key="elements">{this.state.elements}</div>
            </div>
        );
    }

});

module.exports = UserBox;
