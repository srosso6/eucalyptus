var React = require('react');

var PreviewPanel = React.createClass({

    render: function() {
        var elements = this.props.elements.map(function(element, index) {
            element.order = index;
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
