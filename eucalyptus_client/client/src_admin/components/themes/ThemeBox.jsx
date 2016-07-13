var React = require('react');
var Koala = require('../../../library.jsx')



var ThemeBox = React.createClass({

    getInitialState: function() {
        return {
            themes: [],
            selectedTheme: null
        };
    },

    componentDidMount: function() {
        var url = this.props.site + '/'
        Koala.request('GET', url +'general').then(function(genData) {
            Koala.request('GET', url + 'themes').then(function(data) {
                this.setState({themes: data, selectedTheme: genData.theme_id});
            }.bind(this));
        }.bind(this));


    },

    handleSelectChange: function(e) {
        e.preventDefault()
        this.setState({selectedTheme: e.target.options[e.target.selectedIndex].value})
    },

    saveTheme: function(e) {
        e.preventDefault()
        Koala.request('POST', this.props.site + '/general', {theme_id: e.target.value}).then(function() {
            Koala.loadCSS(this.props.site)
        }.bind(this))
    },
    render: function() {
        var buttons = this.state.themes.map(function(theme) {
            return (<button type='button' value={theme._id} id={theme._id} className={theme.name} onClick={this.saveTheme} >{theme.name}</button>)
        }.bind(this))
        return (
            <div className="themes">
                {buttons}
            </div>
        );
    }

});

module.exports = ThemeBox;
