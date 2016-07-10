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
            Koala.request("get", url + "elements/" + page_data[0]._id)
            .then(function(element_data) {
                this.setState({elements: element_data, changes:false, page_id: page_data[0]._id});
            }.bind(this))
        }.bind(this))
    },

    render: function() {

      // var preview = null;

      // if(!this.state.elements === []) {
      //     var preview <PreviewPanel elements={this.state.elements}/>
      // }

        return (
            <div>
                <PreviewPanel elements={this.state.elements} edited={this.editElement}/>
                <ElementsPanel addElement={this.addElement} savePage={this.savePage} resetPage={this.resetPage} changes={this.state.changes}/>
            </div>
        );
    },

    editElement: function () {
      this.setState({changes:true});
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
        console.log(this.state.elements);
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
    }

});

module.exports = EditPanel;
