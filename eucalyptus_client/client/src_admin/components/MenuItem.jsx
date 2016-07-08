var React = require('react');

var MenuItem = React.createClass({

    render: function() {
        var clickFunction = function(e) {
            e.preventDefault();
            this.props.clickFunction(this.props.page)
        }.bind(this);

        return (
            <div onClick={clickFunction}>
                <p>{this.props.pageName}</p>
            </div>
        );
    }

});

module.exports = MenuItem;
