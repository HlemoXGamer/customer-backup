import client from './_client';

export function get() {
  return client.get("/customer/addresses");
}

export function show(id) {
  return client.get("/customer/addresses/" + id);
}

export function create(data) {
  return client.post("/customer/addresses", data);
}

// TODO: we can change it to `customer/set/default/location` 
export function setDefault (data) {
  return client.post(`customer/set/default/address/`, data)
}

export function getDefaultLocation () {
  return client.get('/customer/get-default-location')
}

export function remove (data){
  return client.delete(`customer/addresses/${data}`)
}

export function update(id, data) {
  return client.put("/customer/addresses/" + id, data);
}