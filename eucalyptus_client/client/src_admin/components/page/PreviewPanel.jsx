var React = require('react');
var Koala = require('../../../library.jsx');

var PreviewPanel = React.createClass({

    render: function() {
        // var elements = this.props.elements.map(function(element, index) {
        //     if (!element.order) {
        //         element.order = index + 1;
        //     }
        //     return Koala.generateHTML(element);
        // });
        var elements = Koala.generateElements(this.props.elements);
        return (
            <div>
                {elements}
            </div>
        );
    }

});

module.exports = PreviewPanel;
