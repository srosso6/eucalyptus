var React = require('react');
var PreviewPanel = require('./PreviewPanel.jsx');
var ElementsPanel = require('./ElementsPanel.jsx');
var Koala = require('../../library.jsx');

var EditPanel = React.createClass({
    getInitialState: function() {
        return {
            elements: []
        }
    },
    componentDidMount: function() {
        var url = this.props.site + "/";
        Koala.request("get", url + "pages/" + this.props.page)
        .then(function(data) {
            console.log('data', data);
            Koala.request("get", url + "elements/" + data[0]._id)
            .then(function(data) {
                this.setState({elements: data});
            }.bind(this))
        }.bind(this))
    },
    render: function() {
        return (
            <div>
                <PreviewPanel elements={this.state.elements} />
                <ElementsPanel addElement={this.addElement} />
            </div>
        );
    },
    addElement: function(element) {
        var elements = this.state.elements;
        elements.push(element);
        this.setState({elements: elements});
    }

});

module.exports = EditPanel;
