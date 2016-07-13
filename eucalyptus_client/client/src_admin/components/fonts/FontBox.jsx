var React = require('react');
var koala = require('../../../library.jsx')



var FontBox = React.createClass({

    getInitialState: function() {
        return {
            fonts: [],
            selectedFont: null
        };
    },

    componentDidMount: function() {
        var url = this.props.site + '/'
        koala.request('GET', url +'general').then(function(genData) {
            koala.request('GET', url + 'fonts').then(function(data) {
                this.setState({fonts: data, selectedFont: genData.font_id}, function() {
                    console.log(this.state.fonts);

                })
            }.bind(this));
        }.bind(this));


    },

    // handleSelectChange: function(e) {
    //     e.preventDefault()
    //     console.log(e.target.value);
    //     // this.setState({selectedFont: e.target.options[e.target.selectedIndex].value})
    //     this.setState({selectedFont: e.target.value}, function() {
    //         this.saveFont();
    //     })
    // },

    saveFont: function(e) {
        var url = this.props.site + '/'
        e.preventDefault()
        console.log(e.target.className);
        koala.request('POST', url + 'general', {font_id: e.target.value}).then(function() { //put in thing
            console.log('font change saved');
        })
    },

    render: function() {
        var buttons = this.state.fonts.map(function(font) {
            return (<button type='button' value={font._id} id={font._font} className={font._font.replace("+", "")} onClick={this.saveFont} >{font._font.replace("+", " ")}</button>)
        }.bind(this))
        return (
            <div className="fonts">
                {buttons}
            </div>
        );
    }

});

module.exports = FontBox;
