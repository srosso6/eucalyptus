var React = require('react');
var Koala = require('../../../library.jsx');
var ColorsDisplay = require('./ColorsDisplay.jsx');
var _ = require('lodash');

var ColorPickerBox = React.createClass({

    getInitialState: function() {
        return {
            currentcolor:"#ff0000",
            background: "#fcb421",
            headerBackground: "#1094ab",
            headerText: "#64c4d2",
            text: "#000000",
            feature: "#ffffff",
            palettename:"",
            changes: false
        };
    },

    handleColorChange: function(e){
        this.setState({currentcolor: e.target.value});
    },

    handleColorAdd: function(e){
        e.preventDefault();
        var newcolor = this.state.currentcolor;
        var stateObject = {};
        var state = e.target.className;
        stateObject[state] = newcolor;
        this.setState( stateObject );
    },

    handleAddName: function(e){
        this.setState({palettename: e.target.value, changes: true});
    },

    handleReset: function(){
        this.setState({palettename:"", changes: false, currentcolor:"#ff0000", background: "", headerBackground: "", headerText: "", text: "", feature: ""});
    },

    handleSave: function(){
        if(this.state.changes){
        var name = this.state.palettename;
        var background = this.state.background;
        var headerBackground = this.state.headerBackground;
        var headerText = this.state.headerText;
        var text = this.state.text;
        var feature = this.state.feature;
        var data = ({name:name, _background: background, _headerBackground: headerBackground, _headerText: headerText, _text: text, _feature: feature})
        Koala.request("POST", this.props.site+"/colorschemes", data);
        this.handleReset()
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

        return (
            <div>
                <p>Color Selector</p>
                <form onSubmit={this.handleColorAdd} className="background">
                    Choose your Page Background Color:
                    <input type="color" value={this.state.currentcolor} onChange={this.handleColorChange}/>
                    <input type="submit" value="Add this colour"/>
                </form>
                <div className="color-div" style={divStyle1} />
                <form onSubmit={this.handleColorAdd} className="headerBackground">
                    Choose your Header Background Color:
                    <input type="color" value={this.state.currentcolor} onChange={this.handleColorChange}/>
                    <input type="submit" value="Add this colour"/>
                </form>
                <div className="color-div" style={divStyle2} />
                <form onSubmit={this.handleColorAdd} className="headerText">
                    Choose your Header Text Color:
                    <input type="color" value={this.state.currentcolor} onChange={this.handleColorChange}/>
                    <input type="submit" value="Add this colour"/>
                </form>
                <div className="color-div" style={divStyle3} />
                <form onSubmit={this.handleColorAdd} className="text">
                    Choose your Text Color:
                    <input type="color" value={this.state.currentcolor} onChange={this.handleColorChange}/>
                    <input type="submit" value="Add this colour"/>
                </form>
                <div className="color-div" style={divStyle4} />
                <form onSubmit={this.handleColorAdd} className="feature">
                    Choose your Feature Color:
                    <input type="color" value={this.state.currentcolor} onChange={this.handleColorChange}/>
                    <input type="submit" value="Add this colour"/>
                </form>
                <div className="color-div" style={divStyle5} />
                <input type="text" onChange={this.handleAddName} value={this.state.palettename} placeholder="Color Palette Name"/>
                <input type="button" onClick={this.handleReset} value="Reset Color Palette"/>
                <input type="button" onClick={this.handleSave} value="Add Color Palette"/>
                <ColorsDisplay site={this.props.site} user={this.props.user}/>
            </div>
        );
    }

});

module.exports = ColorPickerBox;
