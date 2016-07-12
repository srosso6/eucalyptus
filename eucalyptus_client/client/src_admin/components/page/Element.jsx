var React = require('react');
var Koala = require('../../../library.jsx');

var Element = React.createClass({

  getInitialState: function() {
      return {
          editing: false,
          content: this.props.element.content,
          url: this.props.element.url
      }
  },

  componentDidUpdate: function(prevProps, prevState) {
      if(this.state.editing) {
          this.refs.input.focus();
      }
  },

  editElement: function (event) {
      this.setState({editing: true});
  },

  editContent: function (event) {
      var stateObj = {content: event.target.value};

      if(event.keyCode === 13) {
        this.closeEdit();
        stateObj = Object.assign({}, stateObj, {editing: false})
      }

      this.setState(stateObj);


      this.props.element.content = event.target.value;
      this.props.edited();
  },

  editUrl: function(event) {

      var stateObj = {url: event.target.value};

      if(event.keyCode === 13) {
        this.closeEdit();
        stateObj = Object.assign({}, stateObj, {editing: false})
      }

      this.setState(stateObj);


      this.props.element.url = event.target.value;
      this.props.edited();
  }

  closeEdit: function(e) {
    //   this.setState({editing: false})
  },

  deleteElement: function(e) {
      console.log('id', e.target.dataset.cheese);
  },

  render: function() {

      this.props.element.content = this.state.content;

      var element = Koala.generateHTML(this.props.element, this.editElement);

      if(this.state.editing) {
        if (this.state.element.etype === "img" || this.state.element.etype === "a") {
            element = (
                <span onBlur={this.closeEdit}>
                    <input defaultValue={this.state.content} type="text" ref="input" onKeyUp={this.editContent}  />
                    <input defaultValue={this.state.url} type="text" onKeyUp={this.editUrl}  />
                    <button onClick={this.deleteElement} data-cheese={this.props.elIndex} id="reset-btn" className="delete-btn">Delete</button>
                </span>
            );
        } else {
            element = (
                <span onBlur={this.closeEdit}>
                    <input defaultValue={this.state.content} type="text" ref="input" onKeyUp={this.editContent}  />
                    <button onClick={this.deleteElement} data-cheese={this.props.elIndex} id="reset-btn" className="delete-btn">Delete</button>
                </span>
            );
        }

      }

      return (
        <div>
          {element}
        </div>
      );
    }

});

module.exports = Element;
