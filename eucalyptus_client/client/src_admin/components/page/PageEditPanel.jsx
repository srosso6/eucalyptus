var React = require('react');
var PreviewPanel = require('./PreviewPanel.jsx');
var EditPageSelector = require('./EditPageSelector.jsx');
var ElementsPanel = require('./ElementsPanel.jsx');
var NewPage = require('./NewPage.jsx');
var Koala = require('../../../library.jsx');

var PageEditPanel = React.createClass({
    getInitialState: function() {
        return {
            elements: [],
            page_id: null,
            changes: false,
            pages: null
        }
    },
    componentDidMount: function() {
        this.loadPages();
    },
    resetPage: function() {
        this.loadElements(this.state.page_id);
    },
    loadPages: function(page) {
        var url = this.props.site + "/";
        Koala.request("get", url + "pages")
        .then(function(page_data) {
            console.log('data', page_data);
            this.setState({pages: page_data, page_id: page_data[0]._id}, function() {
                this.loadElements(page_data[0]._id);
            }.bind(this))
        }.bind(this))
    },
    loadElements: function(page_id) {
        var url = this.props.site + "/";
        Koala.request("get", url + "elements/" + page_id)
        .then(function(element_data) {
            this.setState({elements: element_data, changes:false, page_id: page_id});
        }.bind(this))
    },
    render: function() {
        return (
            <div>
                <NewPage />
                <EditPageSelector pages={this.state.pages} setPage={this.setPage} />
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

            // Koala.request("POST", "elements", this.state.elements)
            // .then(function (){
            //     console.log("Saved");
            // });

            var req = new XMLHttpRequest();
            req.onload = function() {
                if (req.status === 200) {
                    console.log("Saved");
                }
            }
            req.open("POST", "http://localhost:5000/"+this.props.site+"/elements");
            req.setRequestHeader("Content-Type", "application/json");
            req.send(JSON.stringify(this.state.elements));

        } else {
            console.log("No changes to save");
        }
    },
    setPage: function(page_id) {
        this.setState({page_id: page_id});
    }

});

module.exports = PageEditPanel;


/*

    - Create a page (name / slug / etc)
    - Edit elements page

*/
