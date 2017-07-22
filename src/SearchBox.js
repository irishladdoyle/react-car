import React from 'react';

var SearchBox = React.createClass({
    getInitialState() {
        return { input: '' };
    },
    handleSubmit(e) {
        e.preventDefault();
        this.props.search(this.state.input);
    },
    handleChange(e) {
        this.setState({ input: e.target.value });
    },
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input type="text" value={this.state.input} onChange={this.handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
});

export default SearchBox;