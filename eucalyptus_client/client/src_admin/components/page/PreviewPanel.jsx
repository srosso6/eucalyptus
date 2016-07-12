var React = require('react');
var Koala = require('../../../library.jsx');
var Element = require("./Element.jsx")

var PreviewPanel = React.createClass({

    render: function() {
        const elements = this.props.elements.map(function (element, index) {
          return <Element key={element._id} elIndex={index} element={element} edited={this.props.edited}/>
        }.bind(this));

        return (
            <div className="preview">
                <span className="user_body">
                  {elements}
                </span>
            </div>
        );
    }
});


module.exports = PreviewPanel;
