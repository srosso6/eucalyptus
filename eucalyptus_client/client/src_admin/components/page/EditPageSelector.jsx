var React = require('react');

var EditPageSelector = React.createClass({
    getInitialState: function() {
        return {
            selectedPage: null
        };
    },
    componentWillReceiveProps: function(nextProps) {
        if (nextProps.pages) {
            this.setState({selectedPage: nextProps.pages[0]._id});
        }
    },
    render: function() {

        var options = (<option value={null}>Loading...</option>);
        if (this.props.pages) {
            options = this.props.pages.map(function(page, index) {
                return <option key={page._id} value={page._id}>{page.name}</option>
            });
        }

        return (
            <div>
                <select onChange={this.selectPage} value={this.state.selectedPage}>
                    {options}
                </select>
                <button onClick={this.setPage}>View/Edit Page</button>
            </div>
        );
    },
    selectPage: function(e) {
        e.preventDefault();
        this.setState({selectPage: e.target.options[e.target.selectedIndex].value});
    },
    setPage: function(e) {
        e.preventDefault();
        this.props.setPage(this.state.selectedPage);
    }

});

module.exports = EditPageSelector;
