var React = require('react');
var MenuItem = require("./MenuItem.jsx");

var MenuBox = React.createClass({

    render: function() {
        var clickFunction = function(page) {
            this.props.setPage(page)
        }.bind(this);

        return (
            <div className="menu-container">
                <MenuItem page="home" pageName="Home" clickFunction={clickFunction} />
                <MenuItem page="pages" pageName="Pages" clickFunction={clickFunction} />
                <MenuItem page="colors" pageName="Colors" clickFunction={clickFunction} />
                <MenuItem page="logout" pageName="Logout" clickFunction={clickFunction} />
            </div>
        );
    }

});

module.exports = MenuBox;