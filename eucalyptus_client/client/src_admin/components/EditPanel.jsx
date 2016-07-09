var React = require('react');
var PreviewPanel = require('./PreviewPanel.jsx');
var ElementsPanel = require('./ElementsPanel.jsx');
var Koala = require('../../library.jsx');

var EditPanel = React.createClass({
    getInitialState: function() {
        return {
            elements: [],
            page_id: null,
            changes: false
        }
    },
    componentDidMount: function() {
        this.resetPage();
    },
    resetPage: function() {
        var url = this.props.site + "/";
        Koala.request("get", url + "pages/" + this.props.page)
        .then(function(page_data) {
            console.log('data', page_data);
            Koala.request("get", url + "elements/" + page_data[0]._id)
            .then(function(element_data) {
                this.setState({elements: element_data, changes:false, page_id: page_data[0]._id});
            }.bind(this))
        }.bind(this))
    },
    render: function() {
        return (
            <div>
                <PreviewPanel elements={this.state.elements} />
                <ElementsPanel addElement={this.addElement} savePage={this.savePage} resetPage={this.resetPage} changes={this.state.changes}/>
            </div>
        );
    },
    addElement: function(element) {
        var elements = this.state.elements;
        element.page_id = this.state.page_id;
        element.order = elements.length + 1;
        if (element.content) {
            element.medialibrary_id = null;
        } else {
            element.content = null;
        }
        elements.push(element);
        this.setState({elements: elements, changes:true});
    },
    savePage: function() {
        if (this.state.changes) {
            console.log("SAVE PAGE");
            console.log(this.state.elements);
            console.log('----');

            Koala.request("POST", "elements", this.state.elements)
            .then(function (){
                console.log("Saved");
            });

        } else {
            console.log("No changes to save");
        }
    }

});

module.exports = EditPanel;
