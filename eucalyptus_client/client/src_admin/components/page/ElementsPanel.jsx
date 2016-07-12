var React = require('react');

var ElementsPanel = React.createClass({

    addElement: function(e) {
        var element = { etype: e.target.id, content: e.target.value }
        this.props.addElement(element);
    },

    render: function() {
        return (
            <div className="elements">
                <button type="button" id="h1" className="elements-btn" onClick={this.addElement}>h1</button>
                <button type="button" id="h2" className="elements-btn" onClick={this.addElement}>h2</button>
                <button type="button" id="h3" className="elements-btn" onClick={this.addElement}>h3</button>
                <button type="button" id="p" className="elements-btn" onClick={this.addElement}>p</button>
                <button type="button" id="code" className="elements-btn" onClick={this.addElement}>Code</button>
            </div>
        );
    },

});

module.exports = ElementsPanel;
