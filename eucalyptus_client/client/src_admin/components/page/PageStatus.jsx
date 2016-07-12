var React = require('react');

var PageStatus = React.createClass({

  render: function() {

    return (

      <div className="page-status">
          <button type="button" disabled={!this.props.changes} onClick={this.props.resetPage} className="status-btn">Reset Page</button>
          <button type="button" onClick={this.props.savePage} className="status-btn">Save Page</button>
      </div>
    );
  }

});

module.exports = PageStatus;
