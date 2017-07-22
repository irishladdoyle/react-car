import React from 'react';
import _ from 'lodash';
import { Cars, Orders, Customers } from './Data'
import { Link } from 'react-router';
import NavigationBar from './NavigationBar';

console.log('App.js OK, renderring');

var SelectBox = React.createClass({
  handleChange: function (e, type, value) {
    e.preventDefault();
    this.props.onUserInput(type, value);
  },
  handleTextChange: function (e) {
    this.handleChange(e, 'search', e.target.value);
  },
  handleSortChange: function (e) {
    this.handleChange(e, 'sort', e.target.value);
  },
  render: function () {
    console.log('Filtered phone list OK');
    return (
      <div className="col-md-10">
        <input type="text" placeholder="Search" value={this.props.filterText} onChange={this.handleTextChange} />
        Sort by:
        <select id="sort" value={this.props.order} onChange={this.handleSortChange}>
          <option value="name">Alphabetical</option>
          <option value="age">Newest</option>
        </select>
      </div>
    );
  }
});

var CarItem = React.createClass({
  render: function () {
    var car = this.props.car;
    var status = this.props.status;
    return (
      <li>
        <Link to={"rent/" + car.id}>{car.name}</Link>
        <p>Status {status}</p>
      </li>);
  }
});

var FilteredCarList = React.createClass({
  render: function () {
    console.log(this.props);
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
  getInitialState: function () {
    return { search: '', sort: 'name' }
  },
  handleChange: function (type, value) {
    if (type == 'search') {
      console.log('search event detected');
      this.setState({ search: value });
    } else {
      this.setState({ sort: value });
    }
  },
  render: function () {
    var list = Cars.filter(function (p) {
      return p.name.toLowerCase().search(this.state.search.toLowerCase()) !== -1;
    }.bind(this));
    var filteredList = _.sortBy(list, this.state.sort);
    var orders = Orders;
    return (
      <div>
        <NavigationBar/>
        <div className="view-container">
          <div className="view-frame">
            <div className="container-fluid">
              <div className="row">
                <SelectBox onUserInput={this.handleChange} filterText={this.state.search} sort={this.state.sort} />
                <FilteredCarList cars={filteredList} orders={orders} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
});

export default Catalogue;