import React from 'react';
import _ from 'lodash';
import moment from 'moment';
import { Cars, Orders, Customers } from './Data'
import { Link } from 'react-router';
import DayPicker from 'react-day-picker';
import { rentCar } from './tasks';
import 'react-day-picker/lib/style.css';

function date(momentObj) {
    return momentObj.format('YYYY-MM-DD');
}

function now() {
    return date(moment());
}

var RentForm = React.createClass({
    getInitialState() {
        return { name: '', email: '' };
    },
    handleNameChange(e) {
        this.setState({ name: e.target.value });
    },
    handleEmailChange(e) {
        this.setState({ email: e.target.value });
    },
    handleSubmit(e) {
        e.preventDefault();
        if(!this.state.name || !this.state.email || !this.props.date) return alert('Must pick date, name, and email');
        if(moment(this.props.date).isBefore(now())) return alert('Invalid date');
        rentCar(this.props.carID, this.props.date, this.state.email, this.state.name);
    },
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    Date:
                    <input type="text" name="date" value={this.props.date} />
                </label>
                <label>
                    Name:
                    <input type="text" name="name" value={this.state.name} onChange={this.handleNameChange} />
                </label>
                <label>
                    Email:
                    <input type="text" name="email" value={this.state.email} onChange={this.handleEmailChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        );
    }
});

var Rent = React.createClass({
    getInitialState() {
        return { date: '' }
    },
    handleDayClick(day) {
        this.setState({ date: date(moment(day)) });
    },
    render() {
        return (
            <div>
                <RentForm carID={this.props.routeParams.id} date={this.state.date} />
                <DayPicker onDayClick={this.handleDayClick} />
            </div>
        );
    }
});

export default Rent;