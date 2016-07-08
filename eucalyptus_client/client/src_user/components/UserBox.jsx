var React = require('react');
var Koala = require('../../library.jsx');

var UserBox = React.createClass({
  getInitialState: function() {
    return {
      info: null,
      sitename: null,
      page: null
    };
  },

  componentDidMount: function() {
    var url = this.props.sitename + "/general/1";
    Koala.getRequest(url, "GET", function(data){
      this.setState({info: data, sitename: this.props.sitename})
    }.bind(this));
  },

  render: function() {
    return (
      <p>{this.state.info}</p>
    );
  }

});

module.exports = UserBox;
