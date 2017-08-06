import { Cars, Orders, Customers } from './Data'
import request from 'superagent'

var URL = 'http://localhost:4000';

function handleErr(err) {
  console.warn(err);
}

function formatRes(res) {
  console.log('Formatting', res.text);
  return JSON.parse(res.text);
}

function getCars(cb) {
  console.log('Getting cars');
  request.get(URL + '/cars', function(err, res) {
    if(err) return handleErr(err);
    cb(formatRes(res));
  });
}

function getOrders() {
  return Orders;
}

function getCustomers() {
  return Customers;
}

function getCar(id, cb) {
  console.log('Getting car by id', id);
  request.get(URL + '/cars/' + id, function(err, res) {
    if(err) return handleErr(err);
    cb(formatRes(res));
  });
}

function addCar() {

}

function removeCar() {

}

function updateCar() {

}

function rentCar(carID, date, email, username) {
  if (!hasCarID(carID)) return alert('Invalid car ID');
  if (hasEmail(email)) {
    Orders.push({
      "id": nextOrderID(Orders),
      "customerEmail": email,
      "carID": carID,
      "date": date
    });
  }
}

function getAllRents(email, cb) {
  console.log('Getting rents');
  request.get(URL + '/rents')
    .query({email: email})
    .end(function(err, res) {
      if(err) return handleErr(err);
      cb(formatRes(res));
    });
}

function getRent(id, cb) {
  console.log('Getting rent by id');
  request.get(URL + '/rents/' + id, function(err, res) {
    if(err) return handleErr(err);
    cb(formatRes(res));
  });
  
}

export { getCars, getOrders, rentCar, getRent, getAllRents, getCar };