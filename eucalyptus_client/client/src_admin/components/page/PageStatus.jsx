var React = require('react');

var PageStatus = React.createClass({

  render: function() {
    return (
      <div className="page-status">
          <button type="button" disabled={!this.props.changes} onClick={this.props.resetPage} id="reset-btn" className="status-btn">Reset Page</button>
          <button type="button" disabled={!this.props.onIndex} onClick={this.props.deletePage} id="reset-btn" className="status-btn">Delete Page</button>
          <button type="button" onClick={this.props.savePage} id="save-btn" className="status-btn">Save Page</button>
          <button type="button" onClick={this.props.setHomePage} id="save-btn" className="status-btn">Set as Home</button>
      </div>
    );
  }

});

module.exports = PageStatus;
