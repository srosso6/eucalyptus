var React = require('react');
var Koala = require('../../../library.jsx');
var ColorsDisplay = require('./ColorsDisplay.jsx');
var _ = require('lodash');

var ColorPickerBox = React.createClass({

    getInitialState: function() {
        return {
            currentcolor:"#ffffff",
            background: "#fcb421",
            headerBackground: "#1094ab",
            headerText: "#64c4d2",
            text: "#000000",
            feature: "#ffffff",
            palettename:"",
            allPalettes:[{_id: 1}],
            changes: false
        };
    },

    componentDidMount: function() {
        this.props.getAllPalettes();
    },

    handleColorChange: function(e){
        this.setState({currentcolor: e.target.value});
    },

    handleColorAdd: function(e){
        e.preventDefault();
        var newcolor = this.state.currentcolor;
        var stateObject = {};
        var state = e.target.className.split(" ")[0];
        stateObject[state] = newcolor;
        this.setState( stateObject );
    },

    handleAddName: function(e){
        this.setState({palettename: e.target.value, changes: true});
    },

    handleReset: function(){
        this.setState({palettename:"", changes: false, currentcolor:"#ffffff", background: "#ffffff", headerBackground: "#ffffff", headerText: "#ffffff", text: "#ffffff", feature: "#ffffff"});
    },

    handleSave: function(){
        if(this.state.changes){
            var name = this.state.palettename;
            var background = this.state.background;
            var headerBackground = this.state.headerBackground;
            var headerText = this.state.headerText;
            var text = this.state.text;
            var feature = this.state.feature;

            if(name && background && headerBackground && headerText && text && feature) {
                var data = ({name:name, _background: background, _headerBackground: headerBackground, _headerText: headerText, _text: text, _feature: feature})
                Koala.request("POST", this.props.site+"/colorschemes", data)
                    .then(function() {
                        this.props.getAllPalettes();
                        Koala.loadCSS(this.props.site);
                    }.bind(this));
                this.handleReset();
            }
        }
    },

    render: function() {

        var divStyle1 = {
            background: this.state.background
        }
        var divStyle2 = {
            background: this.state.headerBackground
        }
        var divStyle3 = {
            background: this.state.headerText
        }
        var divStyle4 = {
            background: this.state.text
        }
        var divStyle5 = {
            background: this.state.feature
        }
        var picker = "click here -> "

        return (
                <div className="colours-picker">
                    <p className="colorpickertext">Click here to pick colours -></p>
                    <input className="picker" type="color" value={this.state.currentcolor} onChange={this.handleColorChange}/>

                    <div onClick={this.handleColorAdd} className="background color-div" style={divStyle1}>
                        <p className="colortext">Background Color</p>
                    </div>

                    <div onClick={this.handleColorAdd} className="headerBackground color-div" style={divStyle2}>
                        <p className="colortext">Header Background Color</p>
                    </div>

                    <div onClick={this.handleColorAdd} className="headerText color-div" style={divStyle3}>
                        <p className="colortext">Header Text Color</p>
                    </div>

                    <div onClick={this.handleColorAdd} className="text color-div" style={divStyle4}>
                        <p className="colortext">Text Color</p>
                    </div>

                    <div onClick={this.handleColorAdd} className="feature color-div" style={divStyle5}>
                        <p className="colortext">Feature Color</p>
                    </div>
                    <div className="colorinputbox">
                        <input type="text" className="colorinput" onChange={this.handleAddName} value={this.state.palettename} placeholder="Color Palette Name"/>
                        <input type="button" className="colorinput" onClick={this.handleSave} value="Add Color Palette"/>
                        <input type="button" className="colorinput" onClick={this.handleReset} value="Reset Color Palette"/>
                    </div>
                </div>
        );
    }

});

module.exports = ColorPickerBox;
