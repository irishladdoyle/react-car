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
	handleSearch(email) {
    if (this.state.mode === 'Find by email') {
      getAllRents(email, function(rents) {
        this.setState({results: rents});
      }.bind(this));
    }
    else {
      this.setState({ results: [getRent(email)] });
    }
	},
	render() {
		var rents = this.state.results.map(function (rent) {
			return (<RentItem rent={rent} />);
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