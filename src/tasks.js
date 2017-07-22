import { Cars, Orders, Customers } from './Data'

// Utils

function hasCarID(carID) {
  return Cars.some(function(car) {
    alert(typeof carID)
    return car.id == carID;
  });
}

function hasEmail(email) {
  return Customers.some(function(customer) {
    return customer.email === email;
  });
}

function nextCarID(Cars) {
  if(!Cars) return 0;
  var max = 0;
  Cars.forEach(function(car) {
    if(car.id > max)
      max = car.id;
  })
  return max + 1;
}

function nextOrderID(Orders) {
  if(!Orders) return 0;
  var max = 0;
  Orders.forEach(function(order) {
    if(order.id > max)
      max = order.id;
  })
  return max + 1;
}

// --

function addCar() {

}

function removeCar() {

}

function updateCar() {

}

function rentCar(carID, date, email, username) {
  if(!hasCarID(carID)) return alert('Invalid car ID');
  if(hasEmail(email)) {
    Orders.push({
      "id": nextOrderID(Orders),
      "customerEmail": email,
      "carID": carID,
      "date": date
    });
  }
}

export {rentCar};