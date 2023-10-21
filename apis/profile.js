import client from './_client';

export function get() {
  return client.get("/customer/profile");
}

export function update(data) {
  return client.post("/customer/profile", data);
}

export function changePassword(data) {
  return client.put("/customer/profile/password", data);
}
