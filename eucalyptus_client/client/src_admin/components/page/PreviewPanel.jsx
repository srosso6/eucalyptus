var React = require('react');
var Koala = require('../../../library.jsx');
var Element = require("./Element.jsx")

var PreviewPanel = React.createClass({

    getInitialState: function() {
      return {
        over: null
      };
    },

    // onDragOver: function (e) {
    //   e.preventDefault();
    //   console.log("when do I get here", e.target);
    //
    //   // this.state.over = e.target;
    //   // e.target.parentNode.insertBefore("what do i want to insert here?", e.target);
    // },

    render: function() {
        const elements = this.props.elements.map(function (element, index) {
          console.log("element", element);
          return <Element key={element._id} elIndex={index} element={element} deleteElement={this.props.deleteElement} edited={this.props.edited}/>
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


// onDragOver={this.dragOver}>
