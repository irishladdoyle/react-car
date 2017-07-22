import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Cars, Orders, Customers } from './Data'
import { Link } from 'react-router';
import { getRent, getAllRents, getCar } from './tasks';
import SearchBox from './SearchBox';

var RentItem = React.createClass({
    render() {
        return (<li>{this.props.carName}, date: {this.props.date}</li>);
    }
});

var RentDetails = React.createClass({
    getInitialState() {
        return { mode: 'Find by email', results: [] };
    },
    handleChangeMode() {
        this.setState({mode: this.state.mode === 'Find by email' ? 'Find by ID' : 'Find by email'})
    },
    handleSearch(query) {
        this.setState({ results: this.state.mode === 'Find by email' ? getAllRents(query) : [getRent(query)] });
    },
    render() {
        var rents = this.state.results.map(function(rent) {
            var carName = getCar(rent.carID).name;
            return (<RentItem carName={carName} date={rent.date}/>);
        });
        return (
            <div>
                <button onClick={this.handleChangeMode}>{this.state.mode}</button>
                <SearchBox search={this.handleSearch}/>
                <ul>{rents}</ul>
            </div>
        );
    }
});

export default RentDetails;