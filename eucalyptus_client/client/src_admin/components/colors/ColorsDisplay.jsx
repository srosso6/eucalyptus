var React = require('react');
var Koala = require('../../../library.jsx');

var ColorsDisplay = React.createClass({
    getInitialState: function() {
        return {
            currentPalette: null
        };
    },

    componentDidMount: function() {
        this.currentPalette();
    },

    setPalette: function(e){
        // console.log(e.target.getAttribute('data-palette'));
        // console.log(e.target.dataset.palette);
        var paletteId = e.target.dataset.palette
        Koala.request("POST", this.props.site+"/general", {colorscheme_id: paletteId})
        .then(function(){
            this.currentPalette();
                // console.log("state id", this.state.currentPalette._id);
            }.bind(this));
    },

    currentPalette: function(){
        Koala.request("GET", this.props.site+"/general")
        .then(function(data) {
            var colors_id = data[0].colorscheme_id
            Koala.request("GET", this.props.site+"/colorschemes/"+colors_id)
            .then(function(data) {
                this.setState({currentPalette: data[0]}, function(){
                    console.log("state id", this.state.currentPalette._id);
                }.bind(this));
            }.bind(this));
        }.bind(this));
    },

    // getCurrentPalette: function(){
    //     this.setState({currentPalette: this.props.current}, function(){
    //         console.log(this.state.currentPalette);
    //     })
    // },

    render: function() {
        var boxesofcolor = this.props.palettes.map(function(palette){
            var chosen = null;
            if(palette._id === this.state.currentPalette._id) {
                chosen = " This is your current theme"
            }
            var divStyle1 = {
                background: palette._background,
                color: palette._background
            }
            var divStyle2 = {
                background: palette._headerBackground
            }
            var divStyle3 = {
                background: palette._headerText
            }
            var divStyle4 = {
                background: palette._text
            }
            var divStyle5 = {
                background: palette._feature
            }
            var paletteName = palette.name
            return (
                <div key={paletteName} className={paletteName}>
                    <h5>{paletteName}{chosen}</h5>
                    <button onClick={this.deleteMe} data-palette={palette._id}>Delete Me</button>
                    {/*<button onClick={function() {this.setPalette(palette._id)}.bind(this)} className={paletteName}>Pick Me</button>*/}
                    <div className="color-div" data-palette={palette._id} style={divStyle1} onClick={this.setPalette}></div>
                    <div className="color-div" data-palette={palette._id} style={divStyle2} onClick={this.setPalette}></div>
                    <div className="color-div" data-palette={palette._id} style={divStyle3} onClick={this.setPalette}></div>
                    <div className="color-div" data-palette={palette._id} style={divStyle4} onClick={this.setPalette}></div>
                    <div className="color-div" data-palette={palette._id} style={divStyle5} onClick={this.setPalette}></div>
                </div>
             )
        }.bind(this));

        return (
            <div>
                <h3>Lots of pretty colors below!</h3>
                {boxesofcolor}
            </div>
        );
    }

});

module.exports = ColorsDisplay;
