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
