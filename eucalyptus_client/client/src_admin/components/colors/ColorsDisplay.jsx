var React = require('react');
var Koala = require('../../../library.jsx');

var ColorsDisplay = React.createClass({
    getInitialState: function() {
        return {
            allPalettes:[]
        };
    },

    componentDidMount: function() {
        this.getAllPalettes();
    },

    getAllPalettes: function(){
        Koala.request("GET", this.props.site+"/colorschemes")
        .then(function(data) {
            console.log(data);
            this.setState({allPalettes: data});
        }.bind(this));
    },

    render: function() {
        var boxesofcolor = this.state.allPalettes.map(function(palette){
            var divStyle1 = {
                background: palette._background
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
                <div>
                    <h5>{paletteName}</h5>
                    <div className="color-div" style={divStyle1}></div>
                    <div className="color-div" style={divStyle2}></div>
                    <div className="color-div" style={divStyle3}></div>
                    <div className="color-div" style={divStyle4}></div>
                    <div className="color-div" style={divStyle5}></div>
                </div>
             )
        });

        return (
            <div>
                <h3>Lots of pretty colors below!</h3>
                {boxesofcolor}
            </div>
        );
    }

});

module.exports = ColorsDisplay;
