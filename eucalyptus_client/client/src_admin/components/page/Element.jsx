var React = require('react');
var Koala = require('../../../library.jsx');

var Element = React.createClass({

  getInitialState: function() {
      return {
          editing: false,
          currentTxtBox: 'content',
          content: this.props.element.content,
          url: this.props.element.url,
          dragged: null
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

      var url = event.target.value;

      if (url.indexOf("http://") === -1 || url.indexOf("https://") === -1 ) {
          url = "http://" + url;
      }

      this.props.element.url = url;
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

  onDragStart: function (e) {
    console.log("start", "got here", e.target);
    var dragged = e.target;
    dragged.style.display = "block";
    this.setState({dragged: dragged});
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/html", e.target);
  },

  onDragEnd: function () {
    console.log("end", "got here", e.target);

    this.state.dragged.style.display = "none";

    // this.props.edited();

    // need to update elements array in page edit panel here - should be passing down a function! need to pass it an order position?

    // this.props.edited();
    // Update state
    // var data = this.state.data;
    // var from = Number(this.state.dragged.dataset.id);
    // var to = Number(this.over.dataset.id);
    // if(from < to) to--;
    // data.splice(to, 0, data.splice(from, 1)[0]);
    // this.setState({data: data});
  },

  render: function() {

      this.props.element.content = this.state.content;

      var element = Koala.generateHTML(this.props.element, this.editElement, this.onDragStart, this.onDragEnd, false);

      // var placeholder = document.createElement("h1");
      // placeholder.className = "placeholder";

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
