var React = require('react');
var Koala = require('../../library.jsx');

var PreviewPanel = React.createClass({

    render: function() {
        var elements = this.props.elements.map(function(element, index) {

            if (!element.order) {
                element.order = index;
            }
            return Koala.generateHTML(element);
        });
        return (
            <div>
                {elements}
            </div>
        );
    }

});

module.exports = PreviewPanel;
