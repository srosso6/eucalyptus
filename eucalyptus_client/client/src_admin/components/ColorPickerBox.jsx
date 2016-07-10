var React = require('react');
var Koala = require('../../library.jsx');
var _ = require('lodash');

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
        this.setState({colors:[], palettename:"", changes: false, currentcolor:"#ff0000"});
    },

    handleSave: function(){
        var name = this.state.palettename;
        var colors = this.state.colors;
        var data = ({name:name, colors:colors})
        Koala.request("POST", "testsite/colorschemes", data);
        this.handleReset()
    },

    removeColor: function(e){
        e.preventDefault();
        var color = e.target.className;
        var allcolors = this.state.colors;
        var newcolors = _.pull(allcolors, color);
        console.log(newcolors);
        this.setState({colors: newcolors});
    },

    render: function() {

        var divStyle = {
            background: '#ff0000',
            fontcolor: 'grey'
        }

        // var palettedisplay = "All the pretty colours";
        // if(this.state.colors > 0){
            var palettedisplay = this.state.colors.map(function(color, index){
                var divStyle = {
                    background: color
                }
                return (
                    <div key={index} className="color-div" style={divStyle}>
                        {/*<b style={divStyle} >{color.toUpperCase()}</b>*/}
                        <input type="button" key={index*0.013} className={color} onClick={this.removeColor} value="Remove Color" />
                    </div>
                );
            }.bind(this));
        // }


        return (
            <div>
                <p>Color Selector</p>
                <form onSubmit={this.handleColorAdd}>
                    Choose up to 5 colors for your palette:
                    <input type="color" value={this.state.currentcolor} onChange={this.handleColorChange}/>
                    <input type="submit" value="Add this colour"/>
                </form>
                <input type="text" onChange={this.handleAddName} value={this.state.palettename} placeholder="Color Palette Name"/>
                {palettedisplay}
                <input type="button" onClick={this.handleReset} value="Reset Color Palette"/>
                <input type="button" onClick={this.handleSave} value="Add Color Palette"/>
            </div>
        );
    }

});

module.exports = ColorPickerBox;
