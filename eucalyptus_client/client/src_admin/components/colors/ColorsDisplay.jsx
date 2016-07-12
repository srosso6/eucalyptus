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

    // setPalette: function(id){
    //     // e.preventDefault();
    //     console.log(id);
    // },
    setPalette: function(e){
        // e.preventDefault();
        console.log('target', e.target);
        console.log(e.target.getAttribute('data-palette'));
        console.log(e.target.dataset.palette);


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
                    <button onClick={function() {this.setPalette(palette._id)}.bind(this)} className={paletteName}>Pick Me</button>
                    <div className="color-div" data-palette={palette._id} style={divStyle1} onClick={this.setPalette}></div>
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
