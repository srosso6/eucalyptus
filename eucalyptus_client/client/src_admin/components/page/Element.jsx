var React = require('react');
var Koala = require('../../../library.jsx');

var Element = React.createClass({

  getInitialState: function() {
      return {
          editing: false,
          currentTxtBox: 'content',
          content: this.props.element.content,
          url: this.props.element.url
      }
  },

  componentDidUpdate: function(prevProps, prevState) {
      if(this.state.editing) {
          this.refs[prevState.currentTxtBox].focus();
      }
  },

  editElement: function (event) {
      this.setState({editing: true});
  },

  editContent: function (event) {
      var stateObj = {content: event.target.value, currentTxtBox: 'content'};

      if(event.keyCode === 13) {
        Object.assign(stateObj, {editing: false})
      }

      this.setState(stateObj);


      this.props.element.content = event.target.value;
      this.props.edited();
  },

  editUrl: function(event) {

      var stateObj = {url: event.target.value, currentTxtBox: 'url'};

      if(event.keyCode === 13) {
        Object.assign(stateObj, {editing: false})
      }

      this.setState(stateObj);


      this.props.element.url = event.target.value;
      this.props.edited();
  },

  closeEdit: function(e) {
      this.setState({editing: false})
  },

  deleteElement: function(e) {
      var index = e.target.dataset.elIndex;
      console.log('id', index);
      this.props.deleteElement(index)
  },

  render: function() {

      this.props.element.content = this.state.content;

      var element = Koala.generateHTML(this.props.element, this.editElement, false);

      if(this.state.editing) {
        if (this.props.element.etype === "img" || this.props.element.etype === "a") {
            element = (
                <span>
                    <input defaultValue={this.state.content} type="text" ref="content" onKeyUp={this.editContent}  />
                    <input defaultValue={this.state.url} type="text" ref="url" onKeyUp={this.editUrl}  />
                    <button onClick={this.closeEdit} id="save-btn" className="">Save</button>
                    <button onClick={this.deleteElement} data-el-index={this.props.elIndex} id="reset-btn" className="delete-btn">Delete</button>
                </span>
            );
        } else {
            element = (
                <span>
                    <input defaultValue={this.state.content} type="text" ref="content" onKeyUp={this.editContent}  />
                        <button onClick={this.closeEdit} id="save-btn" className="">Save</button>
                    <button onClick={this.deleteElement} data-el-index={this.props.elIndex} id="reset-btn" className="delete-btn">Delete</button>
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
