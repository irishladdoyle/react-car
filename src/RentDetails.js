import React from 'react';
import { getRent, getAllRents, getCar } from './tasks';
import SearchBox from './SearchBox';

var RentItem = React.createClass({
  getInitialState() {
    return {carName: ''};
  },
  componentDidMount() {
    getCar(this.props.rent.carID, function(car) {
      this.setState({carName: car.name});
    }.bind(this));
  },
	render() {
		return (<li>{this.state.carName}, date: {this.props.rent.date}</li>);
	}
});

var RentDetails = React.createClass({
	getInitialState() {
		return { mode: 'Find by email', results: [] };
	},
	handleChangeMode() {
		this.setState({ mode: this.state.mode === 'Find by email' ? 'Find by ID' : 'Find by email' })
	},
	handleSearch(query) {
    if (this.state.mode === 'Find by email') {
      getAllRents(query, function(rents) {
        this.setState({results: rents});
      }.bind(this));
    }
    else {
      getRent(query, function(rent) {
        this.setState({results: [rent]});
      }.bind(this));
    }
	},
	render() {
		var rents = this.state.results.map(function (rent) {
			return (<RentItem key={rent.id} rent={rent} />);
		});
		return (
			<div>
				<button onClick={this.handleChangeMode}>{this.state.mode}</button>
				<SearchBox search={this.handleSearch} />
				<ul>{rents}</ul>
			</div>
		);
	}
});

export default RentDetails;