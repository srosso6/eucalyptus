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
        .then(function(data) {
            this.setState({info: data[0], page: data[0].index})
            Koala.request("get", url + "pages/" + data[0].index)
            .then(function(data) {


                Koala.request("get", url + "elements/" + data[0]._id)
                .then(function(data) {
                    // var sortedData = data.sort(function(a, b) {
                    //     return a.order - b.order;
                    // });
                    //
                    // var elements = [];
                    //
                    // for (var element of sortedData) {
                    //     elements.push(Koala.generateHTML(element));
                    // }
                    this.setState({elements: Koala.generateElements(data)});
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
                <div key="shitworks">{this.state.elements}</div>
            </div>
        );
    }

});

module.exports = UserBox;
