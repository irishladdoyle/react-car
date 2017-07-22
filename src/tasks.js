import { Cars, Orders, Customers } from './Data'

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

function getCars() {
  return Cars;
}

function getOrders() {
  return Orders;
}

function getCustomers() {
  return Customers;
}

function getCar(id) {
  return Cars.find(function (car) {
    return car.id == id;
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

function getAllRents(email) {
  return Orders.filter(function (order) {
    return order.customerEmail === email;
  });
}

function getRent(id) {
  return Orders.find(function (order) {
    return order.id == id;
  });
}

export { getCars, getOrders, rentCar, getRent, getAllRents, getCar };