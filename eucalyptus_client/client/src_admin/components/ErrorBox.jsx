var React = require('react');

var ErrorBox = React.createClass({

    render: function() {
        return (
            <div>
                <h2 className="error">{this.props.errorMessage}</h2>
            </div>
        );
    }

});

module.exports = ErrorBox;
