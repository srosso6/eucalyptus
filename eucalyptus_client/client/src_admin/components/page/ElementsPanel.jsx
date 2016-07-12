var React = require('react');

var ElementsPanel = React.createClass({

    addElement: function(e) {
        var element = { etype: e.target.id, content: e.target.value }
        this.props.addElement(element);
    },

    render: function() {
        return (
            <div className="elements">
                <button type="button" id="h1" className="elements-btn" onClick={this.addElement}>Header 1</button>
                <button type="button" id="h2" className="elements-btn" onClick={this.addElement}>Header 2</button>
                <button type="button" id="h3" className="elements-btn" onClick={this.addElement}>Header 3</button>
                <button type="button" id="p" className="elements-btn" onClick={this.addElement}>Paragraph</button>
                <button type="button" id="a" className="elements-btn" onClick={this.addElement}>Link</button>
                <button type="button" id="li" className="elements-btn" onClick={this.addElement}>List</button>
                <button type="button" id="img" className="elements-btn" onClick={this.addElement}>Image</button>
                <button type="button" id="code" className="elements-btn" onClick={this.addElement}>Code</button>
            </div>
        );
    },

});

module.exports = ElementsPanel;
