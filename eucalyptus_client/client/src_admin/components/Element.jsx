var React = require('react');
var Koala = require('../../library.jsx');

var Element = React.createClass({

  getInitialState: function() {
      return {
          editing: false,
          content: this.props.element.content
      }
  },

  componentDidUpdate: function(prevProps, prevState) {
      if(this.state.editing) {
          this.refs.input.focus();
      }
  },

  editElement: function (event) {
      console.log("I have been double clicked");
      this.setState({editing: true});
  },

  editContent: function (event) {
    console.log(event.type);

      if(event.type === "blur" || event.keyCode === 13) {
        this.setState({editing: false, content: event.target.value,});
      }

      this.props.element.content = event.target.value;
      this.props.edited();
  },

  render: function() {

      this.props.element.content = this.state.content;

      var element = Koala.generateHTML(this.props.element, this.editElement);

      if(this.state.editing) {
        element = <input defaultValue={this.state.content} type="text" ref="input" onKeyUp={this.editContent} onBlur={this.editContent} />
      }

      return (
        <div>
          {element}
        </div>
      );
    }

});

module.exports = Element;
