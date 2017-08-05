import React from 'react';
import _ from 'lodash';
import { getCars, getOrders } from './tasks'
import { Link } from 'react-router';

var CarItem = React.createClass({
  render() {
    var car = this.props.car;
    return (
      <li>
        <Link to={"rent/" + car.id}>{car.name}</Link>
        <p>Status {this.props.status}</p>
      </li>);
  }
});

var CarList = React.createClass({
  render() {
    var displayedCars = this.props.cars.map(function (car) {
      var ordersForCar = this.props.orders.reduce(function (order) {
        return order.carID === car.id;
      }, []);
      var status = ordersForCar ? "rented" : "free";
      return (<CarItem key={car.id} car={car} status={status} />);
    }.bind(this));
    return (
      <div className="col-md-10">
        <ul>
          {displayedCars}
        </ul>
      </div>
    );
  }
});

var Catalogue = React.createClass({
  getInitialState() {
    return {cars: []}
  },
  componentDidMount() {
    getCars(function (cars) {
      console.warn(cars);
      this.setState({cars: cars})
    }.bind(this));
  },
  render() {
    return (
      <div className="view-container">
        <div className="view-frame">
          <div className="container-fluid">
            <div className="row">
              <CarList cars={this.state.cars} orders={getOrders()} />
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Catalogue;