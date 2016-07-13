var React = require('react');
var MenuItem = require("./MenuItem.jsx");

var MenuBox = React.createClass({

    clickFunction: function (item) {
        this.props.setMenuItem(item);
    },

    render: function() {

        return (
            <div className="menu-container">
                <MenuItem item="pages" itemName="Pages" clickFunction={this.clickFunction} />
                <MenuItem item="colors" itemName="Colours" clickFunction={this.clickFunction} />
                <MenuItem item="fonts" itemName="Fonts" clickFunction={this.clickFunction} />
                <MenuItem item="themes" itemName="Themes" clickFunction={this.clickFunction} />
                <MenuItem item="logout" itemName="Logout" clickFunction={this.clickFunction} />
            </div>
        );
    }

});

module.exports = MenuBox;
