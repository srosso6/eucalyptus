var React = require('react');
var Koala = require('../../../library.jsx');

var ColorsDisplay = React.createClass({
    getInitialState: function() {
        return {
            currentPalette: null
        };
    },

    componentDidMount: function() {
        this.getCurrentPalette();
    },

    setPalette: function(e){
        // e.preventDefault();
        console.log(e.target);
    },

    getCurrentPalette: function(){
        this.setState({currentPalette: this.props.current}, function(){
            console.log(this.state.currentPalette);
        })
    },

    render: function() {
        var boxesofcolor = this.props.palettes.map(function(palette){
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
                    <h5>{paletteName}</h5>
                    <button onClick={this.deleteMe} className={paletteName}>Delete Me</button>
                    <div className="color-div" style={divStyle1} onClick={this.setPalette}></div>
                    <div className="color-div" style={divStyle2} onClick={this.setPalette}></div>
                    <div className="color-div" style={divStyle3} onClick={this.setPalette}></div>
                    <div className="color-div" style={divStyle4} onClick={this.setPalette}></div>
                    <div className="color-div" style={divStyle5} onClick={this.setPalette}></div>
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
