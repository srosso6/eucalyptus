var React = require('react');

var MenuItem = React.createClass({

    clickFunction: function (e) {
        e.preventDefault();
        this.props.clickFunction(this.props.item);
    },

    render: function() {

        return (
            <button
              className="menu-btn"
              type="button"
              onClick={this.clickFunction}>{this.props.itemName}
            </button>
        );
    }

});

module.exports = MenuItem;
