var React = require('react');

var PageStatus = React.createClass({

  render: function() {

    return (

      <div className="page-status">
          <button type="button" disabled={!this.props.changes} onClick={this.props.resetPage} id="reset-btn" className="status-btn">Reset Page</button>
          <button type="button" onClick={this.props.savePage} id="save-btn" className="status-btn">Save Page</button>
      </div>
    );
  }

});

module.exports = PageStatus;
