var React = require('react');
var Koala = require('../../../library.jsx');

var NewPage = React.createClass({
    getInitialState: function() {
        return {
            name: null,
            slug: null
        };
    },
    render: function() {
        return (
            <div>
                <input type="text" placeholder="Page Name" value={this.state.name} onChange={this.setName} />
                <input type="text" placeholder="Page Slug" value={this.state.slug} onChange={this.setSlug}/>
                <button onClick={this.createPage}>Add New Page</button>
            </div>
        );
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

        Koala.request("post", "pages", this.state)
        .then(function(data) {
            console.log("Page Added");
            // this.props.redoPagesList - setPage page_id
        });

        this.setState({name: null, slug:null})
    }

});

module.exports = NewPage;
