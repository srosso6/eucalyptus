var React = require('react');
var PreviewPanel = require('./PreviewPanel.jsx');
var EditPageSelector = require('./EditPageSelector.jsx');
var ElementsPanel = require('./ElementsPanel.jsx');
var PageStatus = require('./PageStatus.jsx');
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

    loadPages: function(page_slug) {
        console.log("LOADING PAGES");
        var url = this.props.site + "/";
        Koala.request("get", url + "pages")
        .then(function(page_data) {
            console.log('data', page_data);
            var curPageId = page_data[0]._id;
            if (page_slug) {
                for (var pg_dta of page_data) {
                    if (pg_dta.slug === page_slug) {
                        curPageId = pg_dta._id
                        console.log('setting curPageId');
                    }
                }
            }
            this.setState({pages: page_data, page_id: curPageId}, function() {

                this.loadElements(page_data[0]._id);
            }.bind(this))
        }.bind(this))
    },

    setPage: function(page_id) {
        this.loadElements(page_id);
    },

    loadElements: function(page_id) {
        var url = this.props.site + "/";
        Koala.request("get", url + "elements/" + page_id)
        .then(function(element_data) {
            this.setState({elements: element_data, changes:false, page_id: page_id});
        }.bind(this))
    },


    editElement: function () {
      this.setState({changes:true});
    },

    addElement: function(element) {
        var elements = this.state.elements;
        element.content = `${element.etype} - click me to edit`;
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
            Koala.request("POST", this.props.site+"/elements", this.state.elements)
            .then(function (){
                console.log("Saved");
                this.setState({
                    changes:false
                });
            });

        } else {
            console.log("No changes to save");
        }
    },

    resetPage: function() {
        this.loadElements(this.state.page_id);
    },

    render: function() {
        return (
          <div className="container">
              <div className="pages">
                  <NewPage sitename={this.props.site} reloadPages={this.loadPages}/>
                  <a href={"/"+this.props.site}><button id="view-btn">View your page</button></a>
                  <PageStatus
                      changes={this.state.changes}
                      resetPage={this.resetPage}
                      savePage={this.savePage}
                  />
                  <EditPageSelector pages={this.state.pages} setPage={this.setPage} />
              </div>
                <PreviewPanel elements={this.state.elements} edited={this.editElement}></PreviewPanel>
                <ElementsPanel addElement={this.addElement}/>
          </div>
        );
    }
});

module.exports = PageEditPanel;
