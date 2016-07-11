var React = require('react');
var Koala = require('../../library.jsx');

var UserBox = React.createClass({
    getInitialState: function() {
        return {
          info: null,
          page: null,
          elements: []
        };
    },

    componentDidMount: function() {
        var url = this.props.sitename + "/";
        // var elements = [];
        Koala.request("get", url + "general/1")
        .then(function(gen_data) {

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
        }.bind(this));
        // .catch(function(error) {
        //     console.error(error);
        // });
    },

    render: function() {
        return (
            <div >
                <p>{this.props.sitename}</p>
                <div key="elements">{this.state.elements}</div>
            </div>
        );
    }

});

module.exports = UserBox;
