var React = require('react');
var Koala = require('../../../library.jsx');

var NewPage = React.createClass({

    getInitialState: function() {
        return {
            name: null,
            slug: null
        };
    },

    setName: function(e) {
        e.preventDefault();
        this.setState({name: e.target.value});
    },

    setSlug: function(e) {
        e.preventDefault();
        this.setState({slug: e.target.value});
    },

    createPage: function(e) {
        e.preventDefault();
        if (this.state.name && this.state.slug) {

            var siteDetails = this.state;

            siteDetails.slug = siteDetails.slug.replace(/ /g, "").toLowerCase();

            Koala.request("post", this.props.sitename+"/pages", siteDetails)
            .then(function(data) {
                // this.props.redoPagesList - setPage page_id
                this.props.reloadPages(this.state.slug);
            }.bind(this));
            this.setState({name: null, slug:null})
        }
    },

    render: function() {
        return (
            <div className="new-page">
                <div className="new-page-item">
                    <label htmlFor="page-name">Page Name:</label>
                    <input type="text" name="page-name" placeholder="Page Name" value={this.state.name} onChange={this.setName} />
                </div>
                <div className="new-page-item">
                    <label htmlFor="page-slug">Page Slug:</label>
                    <input type="text" name="page-slug" id="slug" placeholder="Page Slug" value={this.state.slug} onChange={this.setSlug}/>
                </div>
                  <button className="btn" onClick={this.createPage}>Add New Page</button>
            </div>
        );
    }

});

module.exports = NewPage;
