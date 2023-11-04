import client from './_client';

export function get(params = {}) {
  return client.get("/customer/orders", { params });
}
export function show(id) {
  return client.get("/customer/orders/" + id);
}

export function cancelOrder(id) {
  return client.post('/customer/orders/cancel/' + id)
}

export function reorder(id) {
  return client.post('/customer/orders/re-order/' + id)
}

export function rateOrder(data) {
  return client.post('/customer/add/review/', data)
}

export function complaintOrder(id, data) {
  return client.post(`/customer/orders/${id}/complain/`, data)
}

export function trackOrder(id) {
  return client.get('/customer/deliveryManLocation/' + id)
}

export function updateDate(data){
  return client.post('/customer/orders/update', data)
}