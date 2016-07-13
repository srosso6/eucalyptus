var React = require('react');
var Koala = require('../../../library.jsx')



var FontBox = React.createClass({

    getInitialState: function() {
        return {
            fonts: [],
            selectedFont: null
        };
    },

    componentDidMount: function() {
        var url = this.props.site + '/'
        Koala.request('GET', url +'general').then(function(genData) {
            Koala.request('GET', url + 'fonts').then(function(data) {
                this.setState({fonts: data, selectedFont: genData.font_id}, function() {
                    console.log(this.state.fonts);

                })
            }.bind(this));
        }.bind(this));


    },

    saveFont: function(e) {
        var url = this.props.site + '/'
        e.preventDefault()
        console.log(e.target.className);
        Koala.request('POST', url + 'general', {font_id: e.target.value}).then(function() { //put in thing
            console.log('font change saved');
            Koala.loadCSS(this.props.site)
        }.bind(this))
    },

    render: function() {
        var buttons = this.state.fonts.map(function(font) {
            return (<button type='button' value={font._id} id={font._font} className={"elements-btn font-btn-stuff " + font._font.replace("+", "")} onClick={this.saveFont} >{font._font.replace("+", " ")}</button>)
        }.bind(this))
        return (
            <div className="fonts">
                {buttons}
            </div>
        );
    }

});

module.exports = FontBox;
