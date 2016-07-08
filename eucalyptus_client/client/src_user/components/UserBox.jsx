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
                var elements_id = data[0].elements_id
                for (var element_id of elements_id) {
                    Koala.request("get", url + "elements/" + element_id)
                    .then(function(data) {
                        var elements = this.state.elements;
                        console.log('before', elements);
                        elements.push(Koala.generateHTML(data[0]));
                        this.setState({elements: elements}, function() {
                            console.log('after1',this.state.elements);
                        }.bind(this));
                        console.log('after2',this.state.elements);

                    }.bind(this));
                }

            }.bind(this));
        }.bind(this));
        // .catch(function(error) {
        //     console.error(error);
        // });
    },

    render: function() {
        var elements = this.state.elements;
        
        return (
            <div>
                <p>{this.props.sitename}</p>
                {this.state.elements}
            </div>
        );
    }

});

module.exports = UserBox;
