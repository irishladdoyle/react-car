import { Cars, Orders, Customers } from './Data'
import request from 'superagent'

var URL = 'http://localhost:4000';

// Utils

function hasCarID(carID) {
  return Cars.some(function (car) {
    return car.id == carID;
  });
}

function hasEmail(email) {
  return Customers.some(function (customer) {
    return customer.email === email;
  });
}

function nextCarID(Cars) {
  if (!Cars) return 0;
  var max = 0;
  Cars.forEach(function (car) {
    if (car.id > max)
      max = car.id;
  })
  return max + 1;
}

function nextOrderID(Orders) {
  if (!Orders) return 0;
  var max = 0;
  Orders.forEach(function (order) {
    if (order.id > max)
      max = order.id;
  })
  return max + 1;
}

// --

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