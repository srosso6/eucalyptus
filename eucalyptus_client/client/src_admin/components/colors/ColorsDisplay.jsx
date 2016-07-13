var React = require('react');
var Koala = require('../../../library.jsx');

var ColorsDisplay = React.createClass({
    getInitialState: function() {
        return {
            currentPalette: {_id: null}
        };
    },

    componentDidMount: function() {
        this.currentPalette();
    },

    componentWillReceiveProps: function(nextProps) {
        this.currentPalette();
    },

    setPalette: function(e){
        // console.log(e.target.getAttribute('data-palette'));
        // console.log(e.target.dataset.palette);
        var paletteId = e.target.dataset.palette
        Koala.request("POST", this.props.site+"/general", {colorscheme_id: paletteId})
        .then(function(){
            this.currentPalette();
            Koala.loadCSS(this.props.site);
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

    deleteMe: function(e){
        var paletteId = e.target.dataset.palette
        // console.log("palette to delete", paletteId);
        //
        // var request = new XMLHttpRequest();
        // request.open("post", "http://localhost:5000/"+this.props.site+"/colorschemes/"+paletteId);
        // request.send(null);

        Koala.request("post", this.props.site+"/colorschemes/"+paletteId)
        .then(function(data) {
            console.log('deleted palette');
            this.props.getAll();
            this.currentPalette();
        }.bind(this));

    },

    render: function() {
        var boxesofcolor = this.props.palettes.map(function(palette){
            var chosen = null;
            var buttonshow = null;
            if(palette._id === this.state.currentPalette._id) {
                // chosen = " This is your current Color Palette"
                chosen = "chosen"
                buttonshow = "disabled"
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
                <div key={palette._id} className="colorpalette">
                    <h3>{paletteName}</h3>
                    <button onClick={this.deleteMe} disabled={buttonshow} data-palette={palette._id}>Delete Me</button>
                    <div className={chosen}>
                        <div className="color-div" data-palette={palette._id} style={divStyle1} onClick={this.setPalette}></div>
                        <div className="color-div" data-palette={palette._id} style={divStyle2} onClick={this.setPalette}></div>
                        <div className="color-div" data-palette={palette._id} style={divStyle3} onClick={this.setPalette}></div>
                        <div className="color-div" data-palette={palette._id} style={divStyle4} onClick={this.setPalette}></div>
                        <div className="color-div" data-palette={palette._id} style={divStyle5} onClick={this.setPalette}></div>
                    </div>
                </div>
             )
        }.bind(this));

        return (
            <div className="colorpalettes">
                <h2>Color Palettes - </h2>
                <h3>Click on any palette below to use it!</h3>
                {boxesofcolor}
            </div>
        );
    }

});

module.exports = ColorsDisplay;
