var React = require('react');
var PreviewPanel = require('./PreviewPanel.jsx');
var EditPageSelector = require('./EditPageSelector.jsx');
var ElementsPanel = require('./ElementsPanel.jsx');
var FontBox = require('../fonts/FontBox.jsx');
var ThemeBox = require('../themes/ThemeBox.jsx');
var ColorsDisplay = require('../colors/ColorsDisplay.jsx');
var ColorPickerBox = require('../colors/ColorPickerBox.jsx');
var PageStatus = require('./PageStatus.jsx');
var NewPage = require('./NewPage.jsx');
var Koala = require('../../../library.jsx');

var PageEditPanel = React.createClass({

    getInitialState: function() {
        return {
            elements: [],
            page_id: null,
            onIndex: true,
            changes: false,
            pages: null,
            allPalettes:[{_id: 1}],
            itemBar: 'pages'
        }
    },

    componentDidMount: function() {
        this.loadPages();
        this.getAllPalettes();
    },

    loadPages: function(page_slug) {
        Koala.request("get", this.props.site + "/" + "pages")
        .then(function(page_data) {
            var curPageId = page_data[0]._id;
            var onIndex = true;
            if (page_slug) {
                for (var pg_dta of page_data) {
                    if (pg_dta.slug === page_slug) {
                        curPageId = pg_dta._id
                        if (page_slug !== "home") {
                            onIndex = false;
                        }
                    }
                }
            }
            this.setState({pages: page_data, page_id: curPageId, onIndex: onIndex}, function() {
            this.loadElements(page_data[0]._id);
            }.bind(this))
        }.bind(this))
    },

    setPage: function(page_id) {
        this.loadElements(page_id);
    },

    loadElements: function(page_id) {
        Koala.request("get", this.props.site + "/" + "elements/" + page_id)
        .then(function(element_data) {
            this.setState({elements: element_data, changes:false, page_id: page_id});
        }.bind(this))
    },

    editElement: function () {
      this.setState({changes:true});
    },

    addElement: function(element) {
        var elements = this.state.elements;
        element.content = `Double Click to Edit Content`;
        element.url = `Put your URL in here`;
        element.page_id = this.state.page_id;
        element.order = elements.length + 1;
        if (element.content) {
            element.url = null;
        } else {
            element.content = null;
        }
        elements.push(element);
        this.setState({elements: elements, changes:true});
    },

    deleteElement: function(index) {
        var elements = this.state.elements;
        var removedElement = elements.splice(index, 1)[0];
        if (removedElement._id) {
            Koala.request("post", this.props.site+"/elements/"+removedElement._id)
            .then(function(data) {
                this.setState({elements: elements});
            }.bind(this));
        } else {
            this.setState({elements: elements});
        }
    },

    savePage: function() {
        if (this.state.changes) {
            this.setState({ changes: false }, function() {
                Koala.request("POST", this.props.site+"/elements", this.state.elements)
                .then(function (){
                    this.loadElements();
                }.bind(this));
            });
        }
    },

    deletePage: function() {
        Koala.request("POST", this.props.site+"/pages/"+this.state.page_id)
        .then(function(data) {
            this.loadPages();
        }.bind(this));
    },

    resetPage: function() {
        this.loadElements(this.state.page_id);
    },
    setHomePage: function() {
        Koala.request("GET", this.props.site+"/pages/"+this.state.page_id)
        .then(function(data) {
            Koala.request("POST", this.props.site+"/general", {index: data[0].slug});
        }.bind(this));

    },
    getAllPalettes: function(){
        Koala.request("GET", this.props.site+"/colorschemes")
        .then(function(data) {
            this.setState({allPalettes: data});
        }.bind(this));
    },
    render: function() {
        var sideBar = null
        var topBar = (
            <div className="pages">
                <NewPage sitename={this.props.site} reloadPages={this.loadPages}/>
                <a href={"/"+this.props.site}><button id="view-btn">View your page</button></a>
                <PageStatus
                    changes={this.state.changes}
                    onIndex={this.state.onIndex}
                    resetPage={this.resetPage}
                    savePage={this.savePage}
                    setHomePage={this.setHomePage}
                    deletePage={this.deletePage}
                />
                <EditPageSelector pages={this.state.pages} setPage={this.setPage} />
            </div>
        );
        switch(this.props.menuItem) {
            case 'pages':
                sideBar = <ElementsPanel addElement={this.addElement}/>
                break;
            case 'colors':
                sideBar = <ColorsDisplay site={this.props.site} palettes={this.state.allPalettes} getAll={this.getAllPalettes}/>
                topBar = (<div className="pages"><ColorPickerBox site={this.props.site} getAllPalettes={this.getAllPalettes}/></div>);
                break;
            case 'fonts':
                sideBar = <FontBox site={this.props.site}/>
                break;
            case 'themes':
                sideBar = <ThemeBox site={this.props.site}/>
                break;
        }

        return (
          <div className="container">
              {topBar}
              <PreviewPanel elements={this.state.elements} edited={this.editElement} deleteElement={this.deleteElement}></PreviewPanel>
              {sideBar}
          </div>
        );
    }
});

module.exports = PageEditPanel;
