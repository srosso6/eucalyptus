var React = require('react');

var EditPageSelector = React.createClass({

    getInitialState: function() {
        return {
            selectedPage: null
        };
    },

    setPage: function(e) {
        this.setState({selectedPage: e.target.id});
        this.props.setPage(e.target.id);
    },

    render: function() {

        if (this.props.pages) {
            var pages = this.props.pages.map(function(page) {
                return <button className="page-btn" type="button" key={page._id} id={page._id} onClick={this.setPage}>{page.name}</button>
            }.bind(this));
        }

        return (
            <div>
                {pages}
            </div>
        );
    }

});

module.exports = EditPageSelector;
