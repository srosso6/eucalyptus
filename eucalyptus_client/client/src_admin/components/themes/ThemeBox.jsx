var React = require('react');
var koala = require('../../../library.jsx')


var ThemeBox = React.createClass({
    getInitialState: function() {
        return {
            themes: []
        };
    },
    componentDidMount: function() {
        var url = this.props.site + '/'
        koala.request('GET', url + 'themes').then(function(data) {
            this.setState({themes: data}, function() {
                console.log(this.state.themes);
            })
        }.bind(this));
    },


    render: function() {
        return (
            <div>
                <select></select>
            </div>
        );
    }

});

module.exports = ThemeBox;
