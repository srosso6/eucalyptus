var React = require('react');
var Koala = require('../../library.jsx');

var ColorPickerBox = React.createClass({

    getInitialState: function() {
        return {
            currentcolor:"#ff0000",
            colors:[],
            palettename:"",
            changes: false
        };
    },

    handleColorChange: function(e){
        this.setState({currentcolor: e.target.value});
    },

    handleColorAdd: function(e){
        e.preventDefault();
        var currentcolors = this.state.colors
        var newcolor = this.state.currentcolor;
        if(this.state.colors.length < 5){
            currentcolors.push(newcolor);
        }
        this.setState({colors: currentcolors})
        console.log("new", newcolor);
        console.log("all", this.state.colors);
    },

    handleAddName: function(e){
        this.setState({palettename: e.target.value, changes: true});
    },

    handleReset: function(){
        this.setState({colors:[], palettename:"", changes: false});
    },

    handleSave: function(){
        var name = this.state.palettename;
        var colors = this.state.colors;
        data = ({name:name, colors:colors})
        Koala.request("POST", "colorschemes", data);
        this.handleReset()
    },

    render: function() {
        return (
            <div>
                <p>Color Selector</p>
                <form onSubmit={this.handleColorAdd}>
                    Choose up to 5 colors for your palette:
                    <input type="color" value={this.state.currentcolor} onChange={this.handleColorChange}/>
                    <input type="submit" value="Add this colour"/>
                </form>
                <input type="text" onChange={this.handleAddName} value={this.state.palettename} placeholder="Color Palette Name"/>
                <p>{this.state.colors}</p>
                <input type="button" onClick={this.handleReset} value="Reset Color Palette"/>
                <input type="button" onClick={this.handleSave} value="Add Color Palette"/>
            </div>
        );
    }

});

module.exports = ColorPickerBox;
