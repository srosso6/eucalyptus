var React = require('react');
var Koala = require('../../../library.jsx');

var PreviewPanel = React.createClass({

    render: function() {
        var elements = Koala.generateElements(this.props.elements);
        return (
            <div>
                {elements}
            </div>
        );
    }

});

module.exports = PreviewPanel;
