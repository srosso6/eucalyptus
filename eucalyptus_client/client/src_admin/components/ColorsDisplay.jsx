var React = require('react');
var Koala = require('../../library.jsx');

var ColorsDisplay = React.createClass({
    getInitialState: function() {
        return {
            allPalettes:[],
            name: "",
            colors:[]
        };
    },

    componentDidMount: function() {
        this.getAllPalettes();
    },

    getAllPalettes: function(){
        Koala.request("GET", this.props.site+"/colorschemes/1")
        .then(function(data) {
            console.log(data[6].colors);
            this.setState({colors: data[6].colors});
            this.setState({name: data[6].name});
            this.setState({allPalettes: data});
        }.bind(this));
    },

    render: function() {
        // var boxesofcolor = this.state.allPalettes.map(function(palette){
        //     // var paletteName = palette.name
        //     <h5>palette.name</h5>
        //     // palette.colors.map(function(color){
        //     //         var divStyle = {
        //     //             background: color
        //     //         }
        //     //         console.log(color);
        //     //         return(
        //     //             <div className="color-div" style={divStyle}></div>
        //     //             )
        //     // });
        // });

        var boxesofcolor = this.state.colors.map(function(color, index){
                                var divStyle = {
                                    background: color
                                }
                                return (
                                    <div className="color-div" style={divStyle} key={index}></div>
                                    )
                            }.bind(this))

        return (
            <div>
                <h3>Lots of pretty colors below!</h3>
                <h4>{this.state.name}</h4>
                {boxesofcolor}
            </div>
        );
    }

});

module.exports = ColorsDisplay;
