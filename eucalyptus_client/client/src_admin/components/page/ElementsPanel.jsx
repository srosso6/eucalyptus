var React = require('react');

var ElementsPanel = React.createClass({
    getInitialState: function() {
        return {
            type: "h1",
            content: null
        };
    },
    render: function() {
        return (
            <div>
                <div className="save-page">
                    <button enabled={!this.props.changes} onClick={this.props.resetPage}>Reset Page</button>
                    <button onClick={this.props.savePage}>Save Page</button>
                </div>
                <div className="add-element">
                    <select value={this.state.type} onChange={this.setType}>
                        <option value="h1">H1</option>
                        <option value="h2">H2</option>
                        <option value="p">P</option>
                        <option value="b">B</option>
                        <option value="code">Code</option>
                    </select>
                    <input type="text" onChange={this.setContent} value={this.state.content} />
                    <button onClick={this.addElement}>Add To Page</button>
                </div>

            </div>
        );
    },
    setType: function(e) {
        e.preventDefault();
        this.setState({type: e.target.options[e.target.selectedIndex].value});
    },
    setContent: function(e) {
        e.preventDefault();
        this.setState({content: e.target.value});
    },
    addElement: function() {
        var element = { etype: this.state.type, content: this.state.content }
        this.props.addElement(element);
        this.setState({type: "h1", content: null});
    }

});

module.exports = ElementsPanel;
