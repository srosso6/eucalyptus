var React = require('react');
var Koala = require('../../../library.jsx');
var Element = require("./Element.jsx")

var PreviewPanel = React.createClass({

    render: function() {
        const elements = this.props.elements.map(function (element) {
          return <Element key={element._id} element={element} edited={this.props.edited}/>
        }.bind(this));

        return (
            <div className="test">
                {elements}
            </div>
        );
    }
});


module.exports = PreviewPanel;
